import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useModal } from "@/contexts/ModalContext";
import { 
  Users, 
  Vote, 
  TrendingUp, 
  Coins, 
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Wallet,
  Heart,
  Shield,
  Zap
} from "lucide-react";

const proposals = [
  {
    id: 1,
    title: "Establish Spiritual Retreat Center in Rila Mountains",
    description: "Fund the construction of a year-round retreat facility near the Seven Rila Lakes",
    status: "active",
    votes: { for: 87, against: 13 },
    ends: "3 days",
    category: "Infrastructure"
  },
  {
    id: 2,
    title: "Launch Bulgarian Heritage NFT Collection",
    description: "Create digital art showcasing Bulgarian monasteries and spiritual sites",
    status: "active",
    votes: { for: 142, against: 28 },
    ends: "5 days",
    category: "Culture"
  },
  {
    id: 3,
    title: "Fund Spiritual Education Scholarships",
    description: "Provide 50 scholarships for spiritual studies and meditation courses",
    status: "passed",
    votes: { for: 234, against: 12 },
    ends: "Ended",
    category: "Education"
  },
];

const stats = [
  { label: "Active Members", value: "2,847", icon: Users, change: "+12%" },
  { label: "Total Treasury", value: "€487K", icon: Coins, change: "+8%" },
  { label: "Active Proposals", value: "12", icon: Vote, change: "+3" },
  { label: "Avg Participation", value: "67%", icon: TrendingUp, change: "+5%" },
];

const recentActivity = [
  { type: "vote", user: "0x7a89...4f2e", action: "Voted FOR", proposal: "Retreat Center", time: "2h ago" },
  { type: "proposal", user: "0x9b12...8c3d", action: "Created proposal", proposal: "Heritage NFT", time: "5h ago" },
  { type: "donation", user: "0x3c45...1a7b", action: "Donated €500", proposal: "Scholarships", time: "1d ago" },
  { type: "member", user: "0x6d78...9e4f", action: "Joined DAO", proposal: null, time: "2d ago" },
];

export default function DAODashboard() {
  const { openModal } = useModal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mystical opacity-10" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              DAO Dashboard
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-aurora bg-clip-text text-transparent">
              Governance Hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Participate in decisions, vote on proposals, and shape the future of our spiritual community
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button variant="spiritual" size="lg" onClick={() => openModal('wallet')}>
              <Wallet className="w-5 h-5 mr-2" />
              Connect Wallet
            </Button>
            <Button variant="outline" size="lg">
              <Vote className="w-5 h-5 mr-2" />
              Create Proposal
            </Button>
            <Button variant="outline" size="lg" onClick={() => openModal('donation')}>
              <Heart className="w-5 h-5 mr-2" />
              Contribute
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="relative overflow-hidden bg-gradient-to-br from-card to-card/50 border-primary/20">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardDescription>{stat.label}</CardDescription>
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end justify-between">
                        <p className="text-3xl font-bold">{stat.value}</p>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {stat.change}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <Tabs defaultValue="proposals" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="treasury">Treasury</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="proposals" className="space-y-6">
            {proposals.map((proposal, index) => (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardTitle className="text-xl">{proposal.title}</CardTitle>
                          <Badge 
                            variant={proposal.status === 'active' ? 'default' : 'secondary'}
                            className={proposal.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}
                          >
                            {proposal.status === 'active' ? <Clock className="w-3 h-3 mr-1" /> : <CheckCircle2 className="w-3 h-3 mr-1" />}
                            {proposal.status}
                          </Badge>
                          <Badge variant="outline">{proposal.category}</Badge>
                        </div>
                        <CardDescription>{proposal.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Voting Progress</span>
                        <span className="font-semibold">
                          {proposal.votes.for} FOR / {proposal.votes.against} AGAINST
                        </span>
                      </div>
                      <Progress 
                        value={(proposal.votes.for / (proposal.votes.for + proposal.votes.against)) * 100} 
                        className="h-2"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {proposal.status === 'active' ? `Ends in ${proposal.ends}` : proposal.ends}
                      </span>
                      {proposal.status === 'active' && (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="border-red-500/20 hover:bg-red-500/10">
                            <XCircle className="w-4 h-4 mr-1" />
                            Against
                          </Button>
                          <Button variant="spiritual" size="sm">
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Support
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="treasury" className="space-y-6">
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

          <TabsContent value="activity" className="space-y-4">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
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
                        {activity.proposal && `: ${activity.proposal}`}
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
        </Tabs>
      </section>
    </div>
  );
}
