import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, Crown, Shield, Star, Loader2, 
  CheckCircle, Wallet, ExternalLink 
} from 'lucide-react';
import { useNFTCollection, useMembershipStatus, useMintNFT } from '@/hooks/useNFT';
import { MembershipTier, getMembershipTierLabel, getMembershipTierColor } from '@/contracts/MembershipNFTABI';
import { parseEther } from 'viem';

interface TierOption {
  tier: MembershipTier;
  name: string;
  price: string;
  priceWei: bigint;
  icon: React.ReactNode;
  benefits: string[];
  color: string;
}

const tierOptions: TierOption[] = [
  {
    tier: MembershipTier.Basic,
    name: 'Basic',
    price: '0.01',
    priceWei: parseEther('0.01'),
    icon: <Shield className="w-6 h-6" />,
    benefits: ['DAO voting rights', 'Community access', 'Member badge'],
    color: 'from-slate-500 to-slate-600',
  },
  {
    tier: MembershipTier.Silver,
    name: 'Silver',
    price: '0.05',
    priceWei: parseEther('0.05'),
    icon: <Star className="w-6 h-6" />,
    benefits: ['All Basic benefits', 'Priority proposals', 'Exclusive events'],
    color: 'from-gray-400 to-gray-500',
  },
  {
    tier: MembershipTier.Gold,
    name: 'Gold',
    price: '0.1',
    priceWei: parseEther('0.1'),
    icon: <Sparkles className="w-6 h-6" />,
    benefits: ['All Silver benefits', '2x voting power', 'Governance council'],
    color: 'from-yellow-500 to-amber-600',
  },
  {
    tier: MembershipTier.Platinum,
    name: 'Platinum',
    price: '0.25',
    priceWei: parseEther('0.25'),
    icon: <Crown className="w-6 h-6" />,
    benefits: ['All Gold benefits', '5x voting power', 'Treasury oversight', 'Founding member status'],
    color: 'from-purple-500 to-indigo-600',
  },
];

export const MembershipMint = () => {
  const { isConnected } = useAccount();
  const [selectedTier, setSelectedTier] = useState<MembershipTier>(MembershipTier.Basic);
  
  const { 
    name, 
    totalSupply, 
    maxSupply, 
    isSoldOut, 
    isConfigured,
    contractAddress 
  } = useNFTCollection();
  
  const { isMember, tier: currentTier, tierLabel } = useMembershipStatus();
  const { mintWithTier, isPending, isConfirming, isSuccess } = useMintNFT();

  const mintProgress = maxSupply > BigInt(0) 
    ? Number((totalSupply * BigInt(100)) / maxSupply) 
    : 0;

  const handleMint = async () => {
    const option = tierOptions.find(t => t.tier === selectedTier);
    if (option) {
      await mintWithTier(option.tier, option.priceWei);
    }
  };

  const isProcessing = isPending || isConfirming;

  if (!isConfigured) {
    return (
      <Card className="bg-card/70 backdrop-blur-sm border-border">
        <CardContent className="p-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            Membership NFT contract not configured. Add VITE_MEMBERSHIP_NFT_ADDRESS to enable minting.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Collection Info */}
      <Card className="bg-card/70 backdrop-blur-sm border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{name || 'Membership NFT'}</CardTitle>
              <CardDescription>
                Mint your membership NFT to join the DAO
              </CardDescription>
            </div>
            {isMember && (
              <Badge className={`${getMembershipTierColor(currentTier!)} text-white`}>
                {tierLabel} Member
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Minted</span>
              <span>{totalSupply.toString()} / {maxSupply.toString()}</span>
            </div>
            <Progress value={mintProgress} className="h-2" />
          </div>
          
          {contractAddress && (
            <a 
              href={`https://etherscan.io/address/${contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              View Contract <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </CardContent>
      </Card>

      {/* Already Member */}
      {isMember && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-6 flex items-center gap-4">
              <CheckCircle className="w-8 h-8 text-primary" />
              <div>
                <p className="font-semibold text-primary">You're a {tierLabel} Member!</p>
                <p className="text-sm text-muted-foreground">
                  Enjoy your membership benefits and participate in DAO governance.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Tier Selection */}
      {!isMember && !isSoldOut && (
        <div className="grid gap-4 md:grid-cols-2">
          {tierOptions.map((option, index) => (
            <motion.div
              key={option.tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transition-all hover:scale-[1.02] ${
                  selectedTier === option.tier 
                    ? 'ring-2 ring-primary border-primary' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedTier(option.tier)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${option.color} text-white`}>
                      {option.icon}
                    </div>
                    <Badge variant="outline" className="font-mono">
                      {option.price} ETH
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{option.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {option.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-primary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Mint Button */}
      {!isMember && (
        <Card className="bg-card/70 backdrop-blur-sm border-border">
          <CardContent className="p-6">
            {isSoldOut ? (
              <div className="text-center py-4">
                <Badge variant="destructive" className="text-lg py-2 px-4">
                  Sold Out
                </Badge>
                <p className="text-muted-foreground mt-2">
                  All membership NFTs have been minted.
                </p>
              </div>
            ) : isConnected ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">Selected: {getMembershipTierLabel(selectedTier)}</p>
                    <p className="text-sm text-muted-foreground">
                      Price: {tierOptions.find(t => t.tier === selectedTier)?.price} ETH
                    </p>
                  </div>
                  <Button 
                    size="lg"
                    onClick={handleMint}
                    disabled={isProcessing}
                    className="min-w-[140px]"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {isPending ? 'Confirm...' : 'Minting...'}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Mint NFT
                      </>
                    )}
                  </Button>
                </div>

                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-primary/10 rounded-lg text-center"
                  >
                    <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="font-medium text-primary">Successfully Minted!</p>
                    <p className="text-sm text-muted-foreground">
                      Welcome to the DAO community.
                    </p>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center p-6 bg-muted/50 rounded-lg">
                <Wallet className="w-5 h-5 text-muted-foreground mr-2" />
                <span className="text-muted-foreground">Connect wallet to mint</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
