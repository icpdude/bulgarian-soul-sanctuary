import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Users, Loader2, CheckCircle, Coins, 
  ArrowRight, UserCheck, AlertCircle
} from 'lucide-react';
import { useVotingPower, useDelegateVotes } from '@/hooks/useGovernance';
import { isAddress } from 'viem';
import { toast } from '@/hooks/use-toast';

export const DelegationPanel = () => {
  const { isConnected, address } = useAccount();
  const { 
    votingPower, 
    tokenBalance, 
    delegate,
    formattedVotingPower, 
    formattedTokenBalance,
    refetch
  } = useVotingPower();
  const { delegateTo, isPending, isConfirming, isSuccess, hash } = useDelegateVotes();

  const [delegateeAddress, setDelegateeAddress] = useState('');

  const isSelfDelegated = delegate?.toLowerCase() === address?.toLowerCase();
  const hasDelegated = delegate && delegate !== '0x0000000000000000000000000000000000000000';
  const needsDelegation = tokenBalance > BigInt(0) && votingPower === BigInt(0);
  const isProcessing = isPending || isConfirming;

  const handleDelegateToSelf = async () => {
    if (!address) return;
    await delegateTo(address);
    if (isSuccess) {
      toast({
        title: "Delegation Successful",
        description: "You have delegated voting power to yourself.",
      });
      refetch();
    }
  };

  const handleDelegateToAddress = async () => {
    if (!isAddress(delegateeAddress)) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid Ethereum address.",
        variant: "destructive",
      });
      return;
    }

    await delegateTo(delegateeAddress as `0x${string}`);
    if (isSuccess) {
      toast({
        title: "Delegation Successful",
        description: `You have delegated voting power to ${delegateeAddress.slice(0, 6)}...${delegateeAddress.slice(-4)}`,
      });
      refetch();
      setDelegateeAddress('');
    }
  };

  if (!isConnected) {
    return (
      <Card className="border-muted">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Users className="w-5 h-5" />
            <p>Connect your wallet to manage delegation.</p>
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
            <Users className="w-5 h-5" />
            Voting Power & Delegation
          </CardTitle>
          <CardDescription>
            Delegate your voting power to yourself or another address to participate in governance.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Token & Voting Power Display */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Coins className="w-4 h-4" />
                Token Balance
              </div>
              <div className="text-2xl font-bold">{formattedTokenBalance}</div>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <UserCheck className="w-4 h-4" />
                Voting Power
              </div>
              <div className="text-2xl font-bold text-primary">{formattedVotingPower}</div>
            </div>
          </div>

          {/* Delegation Warning */}
          {needsDelegation && (
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-500">Delegation Required</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    You have tokens but no voting power. Delegate to yourself or another address to activate your votes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Current Delegation Status */}
          {hasDelegated && (
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Currently Delegated To</p>
                  <p className="font-mono text-sm mt-1">
                    {isSelfDelegated ? (
                      <Badge variant="secondary">Self</Badge>
                    ) : (
                      <span>{delegate?.slice(0, 10)}...{delegate?.slice(-8)}</span>
                    )}
                  </p>
                </div>
                {isSelfDelegated && (
                  <CheckCircle className="w-5 h-5 text-primary" />
                )}
              </div>
            </div>
          )}

          {/* Delegate to Self */}
          <div className="space-y-3">
            <Button
              onClick={handleDelegateToSelf}
              disabled={isProcessing || isSelfDelegated}
              className="w-full"
              variant={isSelfDelegated ? "secondary" : "default"}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isPending ? 'Confirm in Wallet...' : 'Delegating...'}
                </>
              ) : isSelfDelegated ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Already Self-Delegated
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4 mr-2" />
                  Delegate to Myself
                </>
              )}
            </Button>
          </div>

          {/* Delegate to Another Address */}
          <div className="space-y-3 pt-4 border-t border-border">
            <Label>Delegate to Another Address</Label>
            <div className="flex gap-2">
              <Input
                placeholder="0x..."
                value={delegateeAddress}
                onChange={(e) => setDelegateeAddress(e.target.value)}
                className="flex-1 font-mono text-sm"
              />
              <Button
                onClick={handleDelegateToAddress}
                disabled={isProcessing || !delegateeAddress}
                variant="outline"
              >
                {isProcessing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Delegating to another address gives them your voting power while you keep your tokens.
            </p>
          </div>

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
        </CardContent>
      </Card>
    </motion.div>
  );
};
