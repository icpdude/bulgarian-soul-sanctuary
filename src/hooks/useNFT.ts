import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { formatEther } from 'viem';
import { MembershipNFTABI, MembershipTier, getMembershipTierLabel } from '@/contracts/MembershipNFTABI';
import { useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { analytics } from '@/lib/analytics';

const NFT_ADDRESS = import.meta.env.VITE_MEMBERSHIP_NFT_ADDRESS as `0x${string}` | undefined;

// Hook to get NFT collection info
export const useNFTCollection = () => {
  const { data: name } = useReadContract({
    address: NFT_ADDRESS,
    abi: MembershipNFTABI,
    functionName: 'name',
    query: { enabled: !!NFT_ADDRESS },
  });

  const { data: symbol } = useReadContract({
    address: NFT_ADDRESS,
    abi: MembershipNFTABI,
    functionName: 'symbol',
    query: { enabled: !!NFT_ADDRESS },
  });

  const { data: totalSupply, refetch: refetchSupply } = useReadContract({
    address: NFT_ADDRESS,
    abi: MembershipNFTABI,
    functionName: 'totalSupply',
    query: { enabled: !!NFT_ADDRESS },
  });

  const { data: maxSupply } = useReadContract({
    address: NFT_ADDRESS,
    abi: MembershipNFTABI,
    functionName: 'maxSupply',
    query: { enabled: !!NFT_ADDRESS },
  });

  const { data: mintPrice } = useReadContract({
    address: NFT_ADDRESS,
    abi: MembershipNFTABI,
    functionName: 'mintPrice',
    query: { enabled: !!NFT_ADDRESS },
  });

  return {
    name: name as string | undefined,
    symbol: symbol as string | undefined,
    totalSupply: totalSupply ?? BigInt(0),
    maxSupply: maxSupply ?? BigInt(0),
    mintPrice: mintPrice ?? BigInt(0),
    formattedMintPrice: mintPrice ? formatEther(mintPrice) : '0',
    remainingSupply: maxSupply && totalSupply ? maxSupply - totalSupply : BigInt(0),
    isSoldOut: maxSupply && totalSupply ? totalSupply >= maxSupply : false,
    isConfigured: !!NFT_ADDRESS,
    contractAddress: NFT_ADDRESS,
    refetchSupply,
  };
};

// Hook to get user's membership status
export const useMembershipStatus = () => {
  const { address } = useAccount();

  const { data: balance, isLoading: isLoadingBalance, refetch } = useReadContract({
    address: NFT_ADDRESS,
    abi: MembershipNFTABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!NFT_ADDRESS },
  });

  const { data: isMember, isLoading: isLoadingMember } = useReadContract({
    address: NFT_ADDRESS,
    abi: MembershipNFTABI,
    functionName: 'isMember',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!NFT_ADDRESS },
  });

  const { data: tier, isLoading: isLoadingTier } = useReadContract({
    address: NFT_ADDRESS,
    abi: MembershipNFTABI,
    functionName: 'getMembershipTier',
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!NFT_ADDRESS },
  });

  return {
    balance: balance ?? BigInt(0),
    isMember: isMember ?? false,
    tier: tier as MembershipTier | undefined,
    tierLabel: tier !== undefined ? getMembershipTierLabel(tier as MembershipTier) : undefined,
    isLoading: isLoadingBalance || isLoadingMember || isLoadingTier,
    refetch,
  };
};

// Hook to mint membership NFT
export const useMintNFT = () => {
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });
  const { mintPrice } = useNFTCollection();

  const mint = useCallback(async () => {
    if (!NFT_ADDRESS) {
      toast({ title: "Configuration Error", description: "NFT contract not configured", variant: "destructive" });
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await writeContractAsync({
        address: NFT_ADDRESS,
        abi: MembershipNFTABI,
        functionName: 'mint',
        value: mintPrice,
      } as any);
      analytics.track('nft_mint', { type: 'basic' });
      toast({ title: "Minting Started", description: "Your membership NFT is being minted..." });
    } catch (err) {
      console.error('Mint error:', err);
      toast({ title: "Mint Failed", description: error?.message || "Failed to mint NFT", variant: "destructive" });
    }
  }, [writeContractAsync, mintPrice, error]);

  const mintWithTier = useCallback(async (tier: MembershipTier, tierPrice: bigint) => {
    if (!NFT_ADDRESS) {
      toast({ title: "Configuration Error", description: "NFT contract not configured", variant: "destructive" });
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await writeContractAsync({
        address: NFT_ADDRESS,
        abi: MembershipNFTABI,
        functionName: 'mintWithTier',
        args: [tier],
        value: tierPrice,
      } as any);
      analytics.track('nft_mint', { type: getMembershipTierLabel(tier) });
      toast({ title: "Minting Started", description: `Your ${getMembershipTierLabel(tier)} membership NFT is being minted...` });
    } catch (err) {
      console.error('Mint error:', err);
      toast({ title: "Mint Failed", description: error?.message || "Failed to mint NFT", variant: "destructive" });
    }
  }, [writeContractAsync, error]);

  return { mint, mintWithTier, isPending, isConfirming, isSuccess, hash };
};

// Hook to get token metadata
export const useTokenMetadata = (tokenId: bigint | undefined) => {
  const { data: tokenURI, isLoading } = useReadContract({
    address: NFT_ADDRESS,
    abi: MembershipNFTABI,
    functionName: 'tokenURI',
    args: tokenId ? [tokenId] : undefined,
    query: { enabled: !!tokenId && !!NFT_ADDRESS },
  });

  const { data: owner } = useReadContract({
    address: NFT_ADDRESS,
    abi: MembershipNFTABI,
    functionName: 'ownerOf',
    args: tokenId ? [tokenId] : undefined,
    query: { enabled: !!tokenId && !!NFT_ADDRESS },
  });

  return {
    tokenURI: tokenURI as string | undefined,
    owner: owner as `0x${string}` | undefined,
    isLoading,
  };
};
