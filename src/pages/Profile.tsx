import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { Navigation } from "@/components/Navigation";
import { PageHead } from "@/components/PageHead";
import { trackPageView } from "@/lib/analytics";
import { FooterSection } from "@/components/FooterSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  User, Wallet, History, Settings, Shield, Crown, Star,
  Vote, CheckCircle, XCircle, Image, ExternalLink, Gem
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useMembershipStatus, useNFTCollection } from "@/hooks/useNFT";
import { getMembershipTierLabel, getMembershipTierColor, MembershipTier } from "@/contracts/MembershipNFTABI";

const tierIcons: Record<number, typeof Crown> = {
  [MembershipTier.Basic]: Shield,
  [MembershipTier.Silver]: Star,
  [MembershipTier.Gold]: Crown,
  [MembershipTier.Platinum]: Gem,
};

const mockNFTs = [
  { id: 1, name: "Rila Monastery Guardian", tier: MembershipTier.Gold, mintDate: "2025-01-15", image: null },
  { id: 2, name: "Thracian Heritage Token", tier: MembershipTier.Basic, mintDate: "2025-01-20", image: null },
  { id: 3, name: "Sacred Valley Protector", tier: MembershipTier.Silver, mintDate: "2025-02-01", image: null },
];

const mockVotingHistory = [
  { id: "PROP-001", title: "Sacred Site Preservation Initiative", voted: "for", date: "2025-02-10", result: "passed", votesFor: 1247, votesAgainst: 89 },
  { id: "PROP-002", title: "Digital Archive Expansion", voted: "for", date: "2025-02-05", result: "active", votesFor: 892, votesAgainst: 156 },
  { id: "PROP-003", title: "Cultural Education Program", voted: "against", date: "2025-01-28", result: "passed", votesFor: 2341, votesAgainst: 234 },
  { id: "PROP-004", title: "Community Outreach Funding", voted: "for", date: "2025-01-15", result: "rejected", votesFor: 320, votesAgainst: 890 },
];

const Profile = () => {
  const { address, isConnected } = useAccount();
  const { isMember, tier, tierLabel, balance } = useMembershipStatus();
  const { totalSupply, isConfigured } = useNFTCollection();

  const [userData, setUserData] = useState({
    name: "Elena Dimitrova",
    email: "elena@example.com",
    role: "member",
    votingPower: 25,
    joinedDate: "2024-11-10"
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    trackPageView('/profile');
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    toast({ title: "Profile Updated", description: "Your changes have been saved successfully" });
  };

  const currentTier = tier as MembershipTier | undefined;
  const TierIcon = currentTier !== undefined ? tierIcons[currentTier] ?? Shield : Shield;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <PageHead
        title="Profile"
        description="View your NFTs, membership tier, voting history, and manage your DAO profile."
        keywords="user profile, DAO member, NFT collection, voting history, membership tier"
        canonicalUrl="https://foundation-bst.org/profile"
      />
      <Navigation />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarFallback className="bg-gradient-aurora text-white text-2xl">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {currentTier !== undefined && (
                <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full ${getMembershipTierColor(currentTier)} flex items-center justify-center border-2 border-background`}>
                  <TierIcon className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold bg-gradient-aurora bg-clip-text text-transparent mb-2">
                {userData.name}
              </h1>
              {isConnected && address && (
                <p className="text-sm font-mono text-muted-foreground mb-3">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {tierLabel ? (
                  <Badge className={`${getMembershipTierColor(currentTier!)} text-white flex items-center gap-1`}>
                    <TierIcon className="w-3 h-3" />
                    {tierLabel} Member
                  </Badge>
                ) : (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    No Membership
                  </Badge>
                )}
                <Badge variant="secondary">
                  Voting Power: {userData.votingPower}
                </Badge>
                <Badge variant="outline">
                  Member since {new Date(userData.joinedDate).toLocaleDateString()}
                </Badge>
                {balance > BigInt(0) && (
                  <Badge variant="default" className="flex items-center gap-1">
                    <Image className="w-3 h-3" />
                    {balance.toString()} NFTs
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Membership Tier Card */}
          {currentTier !== undefined && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Card className="border-primary/20 overflow-hidden">
                <div className={`h-1 ${getMembershipTierColor(currentTier)}`} />
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Tier</p>
                      <p className="text-lg font-bold">{tierLabel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">NFTs Held</p>
                      <p className="text-lg font-bold">{balance.toString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Votes Cast</p>
                      <p className="text-lg font-bold">{mockVotingHistory.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Proposals Won</p>
                      <p className="text-lg font-bold">
                        {mockVotingHistory.filter(v => v.voted === "for" && v.result === "passed").length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <Tabs defaultValue="nfts" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="nfts" className="flex items-center gap-2">
                <Image className="w-4 h-4" />
                <span className="hidden sm:inline">My NFTs</span>
              </TabsTrigger>
              <TabsTrigger value="voting" className="flex items-center gap-2">
                <Vote className="w-4 h-4" />
                <span className="hidden sm:inline">Voting</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            {/* NFTs Tab */}
            <TabsContent value="nfts">
              <div className="grid md:grid-cols-3 gap-4">
                {mockNFTs.map((nft, index) => {
                  const NftTierIcon = tierIcons[nft.tier] ?? Shield;
                  return (
                    <motion.div
                      key={nft.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-border hover:border-primary/40 transition-all group">
                        <div className="aspect-square bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 flex items-center justify-center rounded-t-lg">
                          <NftTierIcon className="w-16 h-16 text-primary/40 group-hover:text-primary/60 transition-colors" />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-sm mb-2">{nft.name}</h3>
                          <div className="flex items-center justify-between">
                            <Badge className={`${getMembershipTierColor(nft.tier)} text-white text-xs`}>
                              {getMembershipTierLabel(nft.tier)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              #{nft.id}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Minted {new Date(nft.mintDate).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
              {mockNFTs.length === 0 && (
                <Card className="border-dashed border-2 border-muted">
                  <CardContent className="py-12 text-center">
                    <Image className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No NFTs Yet</h3>
                    <p className="text-muted-foreground mb-4">Mint a membership NFT to get started</p>
                    <Button onClick={() => window.location.href = '/#nft-archives'}>
                      Browse NFT Collection
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Voting History Tab */}
            <TabsContent value="voting">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Voting History</CardTitle>
                  <CardDescription>Your participation across all DAO proposals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockVotingHistory.map((item, index) => {
                    const total = item.votesFor + item.votesAgainst;
                    const support = (item.votesFor / total) * 100;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 rounded-lg border border-border/50 hover:bg-accent/30 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-mono text-muted-foreground">{item.id}</span>
                              <Badge
                                variant={item.result === "passed" ? "default" : item.result === "active" ? "secondary" : "outline"}
                                className="text-xs"
                              >
                                {item.result}
                              </Badge>
                            </div>
                            <p className="font-semibold text-sm">{item.title}</p>
                          </div>
                          <Badge
                            className={`flex items-center gap-1 text-xs ${
                              item.voted === "for"
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-destructive/10 text-destructive border-destructive/20"
                            }`}
                            variant="outline"
                          >
                            {item.voted === "for" ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            Voted {item.voted}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={support} className="h-1.5 flex-1" />
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {support.toFixed(0)}% support
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your account details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userData.name}
                      disabled={!isEditing}
                      onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      disabled={!isEditing}
                      onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="flex gap-2">
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                    ) : (
                      <>
                        <Button onClick={handleSave}>Save Changes</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Connected Wallet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                    <div>
                      <p className="font-mono text-sm">
                        {isConnected && address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isConnected ? "Connected" : "Connect your wallet to see on-chain data"}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      {isConnected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: "Email Notifications", desc: "Receive updates via email", enabled: true },
                    { label: "Proposal Alerts", desc: "Get notified of new proposals", enabled: true },
                    { label: "Treasury Updates", desc: "Financial activity notifications", enabled: false },
                  ].map((pref) => (
                    <div key={pref.label} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{pref.label}</p>
                        <p className="text-sm text-muted-foreground">{pref.desc}</p>
                      </div>
                      <Button variant="outline" size="sm">{pref.enabled ? "Enabled" : "Disabled"}</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-destructive/50 mt-6">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions for your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" className="w-full">Delete Account</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <FooterSection />
    </div>
  );
};

export default Profile;
