import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Vote, Clock, CheckCircle, XCircle, Minus, 
  Loader2, AlertCircle, Wallet
} from 'lucide-react';
import { useCastVote, useProposalState } from '@/hooks/useGovernance';
import { VoteType, ProposalState } from '@/contracts/GovernorABI';
import { formatEther } from 'viem';
import { toast } from '@/hooks/use-toast';

interface VotingPanelProps {
  proposalId: bigint;
  title: string;
  description: string;
  category?: string;
}

export const VotingPanel = ({ proposalId, title, description, category }: VotingPanelProps) => {
  const { isConnected } = useAccount();
  const [reason, setReason] = useState('');
  const [showReasonInput, setShowReasonInput] = useState(false);

  const { 
    state, 
    stateLabel, 
    forVotes, 
    againstVotes, 
    abstainVotes,
    deadline,
    hasVoted,
    isLoading: isLoadingState 
  } = useProposalState(proposalId);

  const { castVote, isPending, isConfirming, isSuccess } = useCastVote();

  const totalVotes = forVotes + againstVotes + abstainVotes;
  const forPercentage = totalVotes > BigInt(0) 
    ? Number((forVotes * BigInt(100)) / totalVotes) 
    : 0;
  const againstPercentage = totalVotes > BigInt(0) 
    ? Number((againstVotes * BigInt(100)) / totalVotes) 
    : 0;

  const handleVote = async (support: VoteType) => {
    if (!isConnected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to vote.",
        variant: "destructive",
      });
      return;
    }

    await castVote(proposalId, support, reason || undefined);
    
    if (isSuccess) {
      toast({
        title: "Vote Submitted",
        description: "Your vote has been submitted to the blockchain.",
      });
    }
  };

  const getDeadlineDisplay = () => {
    if (!deadline) return 'Unknown';
    const deadlineDate = new Date(Number(deadline) * 1000);
    const now = new Date();
    const diff = deadlineDate.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  const getStateBadgeVariant = () => {
    switch (state) {
      case ProposalState.Active:
        return 'default';
      case ProposalState.Succeeded:
      case ProposalState.Executed:
        return 'secondary';
      case ProposalState.Defeated:
      case ProposalState.Canceled:
      case ProposalState.Expired:
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const isVotingActive = state === ProposalState.Active;
  const isProcessing = isPending || isConfirming;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="bg-card/70 backdrop-blur-sm border-border hover:border-primary/50 transition-all">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {category && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {category}
                </Badge>
              )}
              <Badge variant={getStateBadgeVariant()}>
                {stateLabel}
              </Badge>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{getDeadlineDisplay()}</span>
            </div>
          </div>
          <CardTitle className="text-xl mt-2">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Vote Breakdown */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  For: {forPercentage.toFixed(1)}%
                </span>
                <span>{formatEther(forVotes)} votes</span>
              </div>
              <Progress value={forPercentage} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  Against: {againstPercentage.toFixed(1)}%
                </span>
                <span>{formatEther(againstVotes)} votes</span>
              </div>
              <Progress value={againstPercentage} className="h-2 [&>div]:bg-destructive" />
            </div>

            <div className="flex justify-between text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Minus className="w-4 h-4" />
                Abstain
              </span>
              <span>{formatEther(abstainVotes)} votes</span>
            </div>

            <div className="text-xs text-muted-foreground text-right">
              Total: {formatEther(totalVotes)} votes
            </div>
          </div>

          {/* Voting Actions */}
          {isVotingActive && (
            <>
              {hasVoted ? (
                <div className="flex items-center justify-center p-4 bg-primary/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  <span className="text-primary font-medium">You have voted on this proposal</span>
                </div>
              ) : isConnected ? (
                <div className="space-y-4">
                  {showReasonInput && (
                    <div className="space-y-2">
                      <Label htmlFor="reason">Vote Reason (Optional)</Label>
                      <Textarea
                        id="reason"
                        placeholder="Explain your vote..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      className="flex-1"
                      onClick={() => handleVote(VoteType.For)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      )}
                      Vote For
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleVote(VoteType.Against)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <XCircle className="w-4 h-4 mr-2" />
                      )}
                      Against
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleVote(VoteType.Abstain)}
                      disabled={isProcessing}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReasonInput(!showReasonInput)}
                    className="w-full text-muted-foreground"
                  >
                    {showReasonInput ? 'Hide reason input' : 'Add reason to vote'}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center p-4 bg-muted/50 rounded-lg">
                  <Wallet className="w-5 h-5 text-muted-foreground mr-2" />
                  <span className="text-muted-foreground">Connect wallet to vote</span>
                </div>
              )}
            </>
          )}

          {/* Proposal Execution */}
          {state === ProposalState.Succeeded && (
            <div className="flex items-center justify-center p-4 bg-secondary/20 rounded-lg">
              <AlertCircle className="w-5 h-5 text-secondary mr-2" />
              <span className="text-secondary font-medium">Ready for execution</span>
            </div>
          )}

          {state === ProposalState.Executed && (
            <div className="flex items-center justify-center p-4 bg-secondary/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-secondary mr-2" />
              <span className="text-secondary font-medium">Proposal Executed</span>
            </div>
          )}

          {state === ProposalState.Defeated && (
            <div className="flex items-center justify-center p-4 bg-destructive/20 rounded-lg">
              <XCircle className="w-5 h-5 text-destructive mr-2" />
              <span className="text-destructive font-medium">Proposal Defeated</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
