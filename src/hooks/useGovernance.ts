import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { keccak256, toBytes, parseEther, formatEther } from 'viem';
import { GovernorABI, ProposalState, VoteType, getProposalStateLabel } from '@/contracts/GovernorABI';
import { GovernanceTokenABI } from '@/contracts/GovernanceTokenABI';
import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { analytics } from '@/lib/analytics';

// Contract addresses (set via env vars in production)
const GOVERNOR_ADDRESS = import.meta.env.VITE_GOVERNOR_ADDRESS as `0x${string}` | undefined;
const TOKEN_ADDRESS = import.meta.env.VITE_GOVERNANCE_TOKEN_ADDRESS as `0x${string}` | undefined;

// Hook to get voting power
export const useVotingPower = () => {
  const { address } = useAccount();

  const { data: votingPower, isLoading, refetch } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: GovernanceTokenABI,
    functionName: 'getVotes',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!TOKEN_ADDRESS },
  });

  const { data: tokenBalance } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: GovernanceTokenABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!TOKEN_ADDRESS },
  });

  const { data: delegate } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: GovernanceTokenABI,
    functionName: 'delegates',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!TOKEN_ADDRESS },
  });

  return {
    votingPower: votingPower ?? BigInt(0),
    tokenBalance: tokenBalance ?? BigInt(0),
    delegate: delegate as `0x${string}` | undefined,
    isLoading,
    refetch,
    formattedVotingPower: votingPower ? formatEther(votingPower) : '0',
    formattedTokenBalance: tokenBalance ? formatEther(tokenBalance) : '0',
  };
};

// Hook to delegate voting power
export const useDelegateVotes = () => {
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const delegateTo = useCallback(async (delegatee: `0x${string}`) => {
    if (!TOKEN_ADDRESS) {
      toast({ title: "Configuration Error", description: "Token address not configured", variant: "destructive" });
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await writeContractAsync({
        address: TOKEN_ADDRESS,
        abi: GovernanceTokenABI,
        functionName: 'delegate',
        args: [delegatee],
      } as any);
      analytics.track('delegate_votes', { delegatee });
    } catch (err) {
      console.error('Delegation error:', err);
      toast({ title: "Delegation Failed", description: error?.message || "Failed to delegate", variant: "destructive" });
    }
  }, [writeContractAsync, error]);

  return { delegateTo, isPending, isConfirming, isSuccess, hash };
};

// Hook to get proposal state
export const useProposalState = (proposalId: bigint | undefined) => {
  const { address } = useAccount();

  const { data: state, isLoading: isLoadingState } = useReadContract({
    address: GOVERNOR_ADDRESS,
    abi: GovernorABI,
    functionName: 'state',
    args: proposalId ? [proposalId] : undefined,
    query: { enabled: !!proposalId && !!GOVERNOR_ADDRESS },
  });

  const { data: votes, isLoading: isLoadingVotes } = useReadContract({
    address: GOVERNOR_ADDRESS,
    abi: GovernorABI,
    functionName: 'proposalVotes',
    args: proposalId ? [proposalId] : undefined,
    query: { enabled: !!proposalId && !!GOVERNOR_ADDRESS },
  });

  const { data: deadline } = useReadContract({
    address: GOVERNOR_ADDRESS,
    abi: GovernorABI,
    functionName: 'proposalDeadline',
    args: proposalId ? [proposalId] : undefined,
    query: { enabled: !!proposalId && !!GOVERNOR_ADDRESS },
  });

  const { data: hasVoted } = useReadContract({
    address: GOVERNOR_ADDRESS,
    abi: GovernorABI,
    functionName: 'hasVoted',
    args: proposalId && address ? [proposalId, address] : undefined,
    query: { enabled: !!proposalId && !!address && !!GOVERNOR_ADDRESS },
  });

  return {
    state: state as ProposalState | undefined,
    stateLabel: state !== undefined ? getProposalStateLabel(state as ProposalState) : 'Unknown',
    forVotes: votes ? (votes as [bigint, bigint, bigint])[1] : BigInt(0),
    againstVotes: votes ? (votes as [bigint, bigint, bigint])[0] : BigInt(0),
    abstainVotes: votes ? (votes as [bigint, bigint, bigint])[2] : BigInt(0),
    deadline: deadline as bigint | undefined,
    hasVoted: hasVoted ?? false,
    isLoading: isLoadingState || isLoadingVotes,
  };
};

// Hook to cast a vote
export const useCastVote = () => {
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const castVote = useCallback(async (proposalId: bigint, support: VoteType, reason?: string) => {
    if (!GOVERNOR_ADDRESS) {
      toast({ title: "Configuration Error", description: "Governor not configured", variant: "destructive" });
      return;
    }
    try {
      if (reason) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await writeContractAsync({
          address: GOVERNOR_ADDRESS,
          abi: GovernorABI,
          functionName: 'castVoteWithReason',
          args: [proposalId, support, reason],
        } as any);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await writeContractAsync({
          address: GOVERNOR_ADDRESS,
          abi: GovernorABI,
          functionName: 'castVote',
          args: [proposalId, support],
        } as any);
      }
      analytics.track('cast_vote', { proposalId: proposalId.toString(), support: VoteType[support] });
    } catch (err) {
      console.error('Vote error:', err);
      toast({ title: "Vote Failed", description: error?.message || "Failed to cast vote", variant: "destructive" });
    }
  }, [writeContractAsync, error]);

  return { castVote, isPending, isConfirming, isSuccess, hash };
};

// Hook to create a proposal
export const useCreateProposal = () => {
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const createProposal = useCallback(async (
    targets: `0x${string}`[], values: bigint[], calldatas: `0x${string}`[], description: string
  ) => {
    if (!GOVERNOR_ADDRESS) {
      toast({ title: "Configuration Error", description: "Governor not configured", variant: "destructive" });
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await writeContractAsync({
        address: GOVERNOR_ADDRESS,
        abi: GovernorABI,
        functionName: 'propose',
        args: [targets, values, calldatas, description],
      } as any);
      analytics.track('create_proposal', { description: description.substring(0, 100) });
    } catch (err) {
      console.error('Proposal creation error:', err);
      toast({ title: "Proposal Creation Failed", description: error?.message || "Failed", variant: "destructive" });
    }
  }, [writeContractAsync, error]);

  const createTransferProposal = useCallback(async (
    recipient: `0x${string}`, amount: string, title: string, description: string
  ) => {
    await createProposal([recipient], [parseEther(amount)], ['0x' as `0x${string}`], `# ${title}\n\n${description}`);
  }, [createProposal]);

  return { createProposal, createTransferProposal, isPending, isConfirming, isSuccess, hash };
};

// Hook to execute a proposal
export const useExecuteProposal = () => {
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const executeProposal = useCallback(async (
    targets: `0x${string}`[], values: bigint[], calldatas: `0x${string}`[], description: string
  ) => {
    if (!GOVERNOR_ADDRESS) {
      toast({ title: "Configuration Error", description: "Governor not configured", variant: "destructive" });
      return;
    }
    try {
      const descriptionHash = keccak256(toBytes(description));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await writeContractAsync({
        address: GOVERNOR_ADDRESS,
        abi: GovernorABI,
        functionName: 'execute',
        args: [targets, values, calldatas, descriptionHash],
      } as any);
      analytics.track('execute_proposal', { description: description.substring(0, 100) });
    } catch (err) {
      console.error('Execution error:', err);
      toast({ title: "Execution Failed", description: error?.message || "Failed", variant: "destructive" });
    }
  }, [writeContractAsync, error]);

  return { executeProposal, isPending, isConfirming, isSuccess, hash };
};

// Combined hook for governance info
export const useGovernanceInfo = () => {
  const { data: proposalThreshold } = useReadContract({
    address: GOVERNOR_ADDRESS,
    abi: GovernorABI,
    functionName: 'proposalThreshold',
    query: { enabled: !!GOVERNOR_ADDRESS },
  });

  return {
    proposalThreshold: proposalThreshold ?? BigInt(0),
    formattedThreshold: proposalThreshold ? formatEther(proposalThreshold) : '0',
    isConfigured: !!GOVERNOR_ADDRESS && !!TOKEN_ADDRESS,
    governorAddress: GOVERNOR_ADDRESS,
    tokenAddress: TOKEN_ADDRESS,
  };
};
