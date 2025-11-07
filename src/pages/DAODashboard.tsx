import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Vote, Users, Wallet, TrendingUp, Clock, CheckCircle, 
  XCircle, Calendar, DollarSign, Activity, ArrowLeft, Plus,
  Shield, Coins, FileText, Eye, Heart, Zap
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { FooterSection } from "@/components/FooterSection";
import { useNavigate } from "react-router-dom";
import { useModal } from "@/contexts/ModalContext";
import { toast } from "@/hooks/use-toast";

const proposals = [
  {
    id: "PROP-001",
    title: "Sacred Site Preservation Initiative",
    description: "Allocate 50,000 BGN for the restoration of the ancient Thracian sanctuary at Perperikon",
    status: "active",
    votesFor: 1247,
    votesAgainst: 89,
    timeLeft: "3 days",
    category: "Heritage"
  },
  {
    id: "PROP-002", 
    title: "Digital Archive Expansion",
    description: "Fund creation of 3D scans and virtual reality experiences for Bulgarian monasteries",
    status: "active",
    votesFor: 892,
    votesAgainst: 156,
    timeLeft: "1 week",
    category: "Technology"
  },
  {
    id: "PROP-003",
    title: "Cultural Education Program",
    description: "Launch educational initiatives in 100 schools across Bulgaria",
    status: "passed",
    votesFor: 2341,
    votesAgainst: 234,
    timeLeft: "Passed",
    category: "Education"
  }
];

const daoStats = [
  { label: "Total Members", value: "2,847", icon: Users, color: "text-primary" },
  { label: "Active Proposals", value: "12", icon: Vote, color: "text-amber" },
  { label: "Funds Allocated", value: "€234K", icon: Wallet, color: "text-rose" },
  { label: "Success Rate", value: "94%", icon: CheckCircle, color: "text-secondary" }
];

const recentActivity = [
  { type: "vote", user: "0x7a89...4f2e", action: "Voted FOR proposal", proposal: "PROP-001", time: "2h ago" },
  { type: "proposal", user: "0x9b12...8c3d", action: "Created new proposal", proposal: "PROP-004", time: "5h ago" },
  { type: "donation", user: "0x3c45...1a7b", action: "Donated €500", proposal: null, time: "1d ago" },
  { type: "member", user: "0x6d78...9e4f", action: "Joined DAO", proposal: null, time: "2d ago" },
];

const DAODashboard = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [isConnected, setIsConnected] = useState(false);
  const [votedProposals, setVotedProposals] = useState<Set<string>>(new Set());

  const handleVote = (proposalId: string, voteFor: boolean) => {
    if (!isConnected) {
      openModal("wallet");
      return;
    }
    setVotedProposals(prev => new Set(prev).add(proposalId));
    toast({
      title: "Vote Recorded",
      description: `You voted ${voteFor ? "FOR" : "AGAINST"} proposal ${proposalId}`,
    });
  };

  const handleConnect = () => {
    openModal("wallet");
    setTimeout(() => setIsConnected(true), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mystical opacity-10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Sacred Council
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-aurora bg-clip-text text-transparent">
              DAO Dashboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Participate in decisions, vote on proposals, and shape the future of Bulgarian spiritual heritage
            </p>
            
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
              <Button
                onClick={isConnected ? () => setIsConnected(false) : handleConnect}
                className={isConnected ? "bg-secondary" : "bg-primary"}
              >
                <Wallet className="w-4 h-4 mr-2" />
                {isConnected ? "Disconnect" : "Connect Wallet"}
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6">
            {daoStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="bg-card/30 backdrop-blur-sm rounded-xl text-center border border-border">
                    <CardContent className="p-6">
                      <Icon className={`w-12 h-12 ${stat.color} mx-auto mb-3`} />
                      <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <motion.div 
        className="max-w-7xl mx-auto px-6 pb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Governance Section */}
        <Tabs defaultValue="proposals" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="treasury">Treasury</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="create">Create</TabsTrigger>
          </TabsList>

          {/* Proposals Tab */}
          <TabsContent value="proposals">
            <div className="space-y-6">
              {proposals.map((proposal, index) => {
                const totalVotes = proposal.votesFor + proposal.votesAgainst;
                const supportPercentage = (proposal.votesFor / totalVotes) * 100;
                
                return (
                  <motion.div
                    key={proposal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-card/70 backdrop-blur-sm border-border hover:border-primary transition-all">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Badge 
                              variant={proposal.status === "active" ? "default" : "secondary"}
                              className={proposal.status === "active" ? "bg-primary" : "bg-secondary"}
                            >
                              {proposal.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{proposal.id}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {proposal.timeLeft}
                          </div>
                        </div>
                        <CardTitle className="text-xl mt-2">
                          {proposal.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {proposal.description}
                        </p>
                        
                        <div className="mb-6">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-foreground">Support: {supportPercentage.toFixed(1)}%</span>
                            <span className="text-muted-foreground">{totalVotes} votes</span>
                          </div>
                          <Progress value={supportPercentage} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>For: {proposal.votesFor}</span>
                            <span>Against: {proposal.votesAgainst}</span>
                          </div>
                        </div>
                        
                        {proposal.status === "active" && (
                          <>
                            {votedProposals.has(proposal.id) ? (
                              <div className="flex items-center justify-center p-4 bg-primary/10 rounded-lg mt-4">
                                <CheckCircle className="w-5 h-5 text-primary mr-2" />
                                <span className="text-primary font-medium">Vote Recorded</span>
                              </div>
                            ) : isConnected ? (
                              <div className="flex gap-3 mt-4">
                                <Button 
                                  className="flex-1"
                                  onClick={() => handleVote(proposal.id, true)}
                                >
                                  <Vote className="w-4 h-4 mr-2" />
                                  Vote For
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className="flex-1"
                                  onClick={() => handleVote(proposal.id, false)}
                                >
                                  <Vote className="w-4 h-4 mr-2" />
                                  Against
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                className="w-full mt-4"
                                onClick={handleConnect}
                              >
                                <Wallet className="w-4 h-4 mr-2" />
                                Connect to Vote
                              </Button>
                            )}
                          </>
                        )}
                        
                        {proposal.status === "passed" && (
                          <div className="flex items-center justify-center p-4 bg-secondary/20 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-secondary mr-2" />
                            <span className="text-secondary font-medium">Proposal Passed & Implemented</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Treasury Tab */}
          <TabsContent value="treasury">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Treasury Overview
                </CardTitle>
                <CardDescription>
                  Transparent management of community funds
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-sm text-muted-foreground mb-1">Total Assets</p>
                    <p className="text-2xl font-bold text-primary">€487,234</p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-sm text-muted-foreground mb-1">Allocated</p>
                    <p className="text-2xl font-bold">€215,890</p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-sm text-muted-foreground mb-1">Available</p>
                    <p className="text-2xl font-bold">€271,344</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Allocation Breakdown
                  </h4>
                  {[
                    { name: "Infrastructure", amount: 125000, percent: 44 },
                    { name: "Education", amount: 67890, percent: 31 },
                    { name: "Operations", amount: 23000, percent: 11 }
                  ].map((item) => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="font-semibold">€{item.amount.toLocaleString()}</span>
                      </div>
                      <Progress value={item.percent} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest community actions and events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-primary/10 hover:border-primary/20 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {activity.type === 'vote' && <Vote className="w-5 h-5 text-primary" />}
                      {activity.type === 'proposal' && <Zap className="w-5 h-5 text-primary" />}
                      {activity.type === 'donation' && <Heart className="w-5 h-5 text-primary" />}
                      {activity.type === 'member' && <Users className="w-5 h-5 text-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.action}
                        {activity.proposal && ` • ${activity.proposal}`}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground flex-shrink-0">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Proposal Tab */}
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Create New Proposal
                </CardTitle>
                <CardDescription>
                  Submit a proposal for community voting. Requires 1000 governance tokens.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isConnected ? (
                  <form 
                    className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Proposal Submitted",
                        description: "Your proposal is now under community review.",
                      });
                    }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="title">Proposal Title</Label>
                      <Input 
                        id="title"
                        placeholder="e.g., Fund Rila Monastery Restoration"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select 
                        id="category"
                        className="w-full h-10 rounded-md border border-input bg-background px-3"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="heritage">Heritage Preservation</option>
                        <option value="technology">Technology & Innovation</option>
                        <option value="education">Education & Outreach</option>
                        <option value="governance">Governance & Operations</option>
                        <option value="treasury">Treasury Management</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description"
                        placeholder="Provide a detailed description of your proposal..."
                        rows={6}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Requested Amount (EUR)</Label>
                        <Input 
                          id="amount"
                          type="number"
                          placeholder="50000"
                          min="0"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Voting Duration (days)</Label>
                        <Input 
                          id="duration"
                          type="number"
                          placeholder="7"
                          min="3"
                          max="30"
                          required
                        />
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-semibold mb-1">Proposal Requirements</p>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Minimum 1000 governance tokens required</li>
                            <li>• 5% quorum needed for proposal to pass</li>
                            <li>• Simple majority (50%+) required for approval</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button type="submit" className="flex-1">
                        <FileText className="w-4 h-4 mr-2" />
                        Submit Proposal
                      </Button>
                      <Button type="button" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <Wallet className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
                    <p className="text-muted-foreground mb-6">
                      You need to connect your wallet to create proposals
                    </p>
                    <Button onClick={handleConnect}>
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect Wallet
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <FooterSection />
    </div>
  );
};

export default DAODashboard;
