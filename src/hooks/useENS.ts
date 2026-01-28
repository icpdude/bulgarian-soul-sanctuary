import { useEnsName, useEnsAvatar } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { normalize } from 'viem/ens';

// Hook to get ENS name for an address
export const useENSName = (address: `0x${string}` | undefined) => {
  const { data: ensName, isLoading } = useEnsName({
    address,
    chainId: mainnet.id,
    query: { enabled: !!address },
  });

  return {
    ensName: ensName ?? undefined,
    isLoading,
    displayName: ensName || (address ? truncateAddress(address) : ''),
  };
};

// Hook to get ENS avatar for an address or name
export const useENSAvatar = (addressOrName: `0x${string}` | string | undefined) => {
  const isAddress = addressOrName?.startsWith('0x');
  
  const { data: ensName } = useEnsName({
    address: isAddress ? (addressOrName as `0x${string}`) : undefined,
    chainId: mainnet.id,
    query: { enabled: isAddress && !!addressOrName },
  });

  const nameToUse = isAddress ? ensName : addressOrName;

  const { data: avatar, isLoading } = useEnsAvatar({
    name: nameToUse ? normalize(nameToUse) : undefined,
    chainId: mainnet.id,
    query: { enabled: !!nameToUse },
  });

  return {
    avatar: avatar ?? undefined,
    isLoading,
  };
};

// Combined hook for full ENS profile
export const useENSProfile = (address: `0x${string}` | undefined) => {
  const { ensName, isLoading: isLoadingName, displayName } = useENSName(address);
  const { avatar, isLoading: isLoadingAvatar } = useENSAvatar(address);

  return {
    ensName,
    avatar,
    displayName,
    isLoading: isLoadingName || isLoadingAvatar,
    hasENS: !!ensName,
  };
};

// Utility to truncate address
export const truncateAddress = (address: string, startChars = 6, endChars = 4): string => {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

// Utility to format address or ENS name for display
export const formatAddressOrENS = (
  address: string | undefined,
  ensName: string | undefined | null
): string => {
  if (ensName) return ensName;
  if (address) return truncateAddress(address);
  return '';
};
