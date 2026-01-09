import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, Loader2, AlertCircle, CheckCircle, 
  Coins, FileText, Wallet, ExternalLink
} from 'lucide-react';
import { useCreateProposal, useVotingPower, useGovernanceInfo } from '@/hooks/useGovernance';
import { formatEther, parseEther, isAddress } from 'viem';
import { toast } from '@/hooks/use-toast';

interface ProposalFormData {
  title: string;
  description: string;
  category: string;
  type: 'simple' | 'transfer' | 'custom';
  // Transfer proposal fields
  recipient: string;
  amount: string;
  // Custom proposal fields
  targetAddress: string;
  calldata: string;
  value: string;
}

export const CreateProposalForm = () => {
  const { isConnected, address } = useAccount();
  const { votingPower, formattedVotingPower, tokenBalance, formattedTokenBalance } = useVotingPower();
  const { proposalThreshold, formattedThreshold, isConfigured } = useGovernanceInfo();
  const { createProposal, createTransferProposal, isPending, isConfirming, isSuccess, hash } = useCreateProposal();

  const [formData, setFormData] = useState<ProposalFormData>({
    title: '',
    description: '',
    category: 'general',
    type: 'simple',
    recipient: '',
    amount: '',
    targetAddress: '',
    calldata: '',
    value: '0',
  });

  const hasEnoughVotingPower = votingPower >= proposalThreshold;
  const isProcessing = isPending || isConfirming;

  const handleInputChange = (field: keyof ProposalFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      toast({ title: "Error", description: "Title is required", variant: "destructive" });
      return false;
    }
    if (!formData.description.trim()) {
      toast({ title: "Error", description: "Description is required", variant: "destructive" });
      return false;
    }

    if (formData.type === 'transfer') {
      if (!isAddress(formData.recipient)) {
        toast({ title: "Error", description: "Invalid recipient address", variant: "destructive" });
        return false;
      }
      if (!formData.amount || parseFloat(formData.amount) <= 0) {
        toast({ title: "Error", description: "Invalid transfer amount", variant: "destructive" });
        return false;
      }
    }

    if (formData.type === 'custom') {
      if (!isAddress(formData.targetAddress)) {
        toast({ title: "Error", description: "Invalid target address", variant: "destructive" });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to create a proposal.",
        variant: "destructive",
      });
      return;
    }

    if (!hasEnoughVotingPower) {
      toast({
        title: "Insufficient Voting Power",
        description: `You need at least ${formattedThreshold} tokens to create a proposal.`,
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) return;

    try {
      if (formData.type === 'transfer') {
        await createTransferProposal(
          formData.recipient as `0x${string}`,
          formData.amount,
          formData.title,
          `**Category:** ${formData.category}\n\n${formData.description}`
        );
      } else if (formData.type === 'custom') {
        const description = `# ${formData.title}\n\n**Category:** ${formData.category}\n\n${formData.description}`;
        await createProposal(
          [formData.targetAddress as `0x${string}`],
          [parseEther(formData.value || '0')],
          [(formData.calldata || '0x') as `0x${string}`],
          description
        );
      } else {
        // Simple proposal - no on-chain action, just governance signal
        const description = `# ${formData.title}\n\n**Category:** ${formData.category}\n\n${formData.description}`;
        await createProposal(
          [address as `0x${string}`],
          [BigInt(0)],
          ['0x' as `0x${string}`],
          description
        );
      }

      if (isSuccess) {
        toast({
          title: "Proposal Created",
          description: "Your proposal has been submitted to the blockchain.",
        });
        // Reset form
        setFormData({
          title: '',
          description: '',
          category: 'general',
          type: 'simple',
          recipient: '',
          amount: '',
          targetAddress: '',
          calldata: '',
          value: '0',
        });
      }
    } catch (error) {
      console.error('Proposal creation error:', error);
    }
  };

  if (!isConfigured) {
    return (
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-amber-500">
            <AlertCircle className="w-5 h-5" />
            <p>Governance contracts are not configured. Please set the contract addresses in environment variables.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Proposal
          </CardTitle>
          <CardDescription>
            Submit a proposal for community voting. Requires {formattedThreshold} governance tokens.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Voting Power Display */}
          <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Your Voting Power</span>
              <Badge variant={hasEnoughVotingPower ? "default" : "destructive"}>
                {hasEnoughVotingPower ? "Eligible" : "Insufficient"}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-primary" />
                <span className="text-xl font-bold">{formattedVotingPower}</span>
                <span className="text-sm text-muted-foreground">votes</span>
              </div>
              <div className="text-sm text-muted-foreground">
                ({formattedTokenBalance} tokens)
              </div>
            </div>
            {!hasEnoughVotingPower && (
              <p className="text-sm text-destructive mt-2">
                You need {formattedThreshold} tokens to create proposals. 
                Consider delegating tokens to yourself or acquiring more.
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Proposal Type */}
            <div className="space-y-2">
              <Label>Proposal Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select proposal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Simple (Governance Signal)
                    </div>
                  </SelectItem>
                  <SelectItem value="transfer">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      Treasury Transfer
                    </div>
                  </SelectItem>
                  <SelectItem value="custom">
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Custom Action
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter proposal title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="heritage">Heritage</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="treasury">Treasury</SelectItem>
                  <SelectItem value="governance">Governance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your proposal in detail..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="min-h-[150px]"
                required
              />
              <p className="text-xs text-muted-foreground">
                Markdown formatting is supported
              </p>
            </div>

            {/* Transfer Fields */}
            {formData.type === 'transfer' && (
              <div className="space-y-4 p-4 rounded-lg bg-muted/30 border border-border">
                <h4 className="font-medium">Transfer Details</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Recipient Address</Label>
                    <Input
                      id="recipient"
                      placeholder="0x..."
                      value={formData.recipient}
                      onChange={(e) => handleInputChange('recipient', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (ETH)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.001"
                      placeholder="0.0"
                      value={formData.amount}
                      onChange={(e) => handleInputChange('amount', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Custom Action Fields */}
            {formData.type === 'custom' && (
              <div className="space-y-4 p-4 rounded-lg bg-muted/30 border border-border">
                <h4 className="font-medium">Custom Action</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetAddress">Target Contract Address</Label>
                    <Input
                      id="targetAddress"
                      placeholder="0x..."
                      value={formData.targetAddress}
                      onChange={(e) => handleInputChange('targetAddress', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="calldata">Calldata (hex)</Label>
                      <Input
                        id="calldata"
                        placeholder="0x..."
                        value={formData.calldata}
                        onChange={(e) => handleInputChange('calldata', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">Value (ETH)</Label>
                      <Input
                        id="value"
                        type="number"
                        step="0.001"
                        placeholder="0"
                        value={formData.value}
                        onChange={(e) => handleInputChange('value', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={!isConnected || !hasEnoughVotingPower || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isPending ? 'Confirm in Wallet...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Proposal
                </>
              )}
            </Button>

            {/* Transaction Hash */}
            {hash && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 text-sm">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Transaction: </span>
                <a
                  href={`https://etherscan.io/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-mono text-xs"
                >
                  {hash.slice(0, 10)}...{hash.slice(-8)}
                </a>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
