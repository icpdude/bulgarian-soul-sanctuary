// ERC721 Membership NFT ABI
export const MembershipNFTABI = [
  // Read functions
  {
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSupply",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mintPrice",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "owner", type: "address" }],
    name: "isMember",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "owner", type: "address" }],
    name: "getMembershipTier",
    outputs: [{ name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  // Write functions
  {
    inputs: [],
    name: "mint",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "to", type: "address" }],
    name: "mintTo",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "tier", type: "uint8" }],
    name: "mintWithTier",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  // Events
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: true, name: "tokenId", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "member", type: "address" },
      { indexed: false, name: "tokenId", type: "uint256" },
      { indexed: false, name: "tier", type: "uint8" },
    ],
    name: "MembershipMinted",
    type: "event",
  },
] as const;

// Membership tiers
export enum MembershipTier {
  Basic = 0,
  Silver = 1,
  Gold = 2,
  Platinum = 3,
}

export const getMembershipTierLabel = (tier: MembershipTier): string => {
  const labels: Record<MembershipTier, string> = {
    [MembershipTier.Basic]: 'Basic',
    [MembershipTier.Silver]: 'Silver',
    [MembershipTier.Gold]: 'Gold',
    [MembershipTier.Platinum]: 'Platinum',
  };
  return labels[tier] || 'Unknown';
};

export const getMembershipTierColor = (tier: MembershipTier): string => {
  const colors: Record<MembershipTier, string> = {
    [MembershipTier.Basic]: 'bg-slate-500',
    [MembershipTier.Silver]: 'bg-gray-400',
    [MembershipTier.Gold]: 'bg-yellow-500',
    [MembershipTier.Platinum]: 'bg-purple-500',
  };
  return colors[tier] || 'bg-muted';
};
