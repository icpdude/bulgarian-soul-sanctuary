import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { User, Wallet, History, Settings, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
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
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully",
    });
  };

  const proposals = [
    { id: "1", title: "Expand Educational Programs", voted: "for", date: "2025-01-10" },
    { id: "2", title: "Community Garden Initiative", voted: "for", date: "2025-01-08" },
    { id: "3", title: "Digital Archive Project", voted: "against", date: "2025-01-12" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHead 
        title="Profile"
        description="Manage your DAO membership profile, view voting history, and configure account settings."
        keywords="user profile, DAO member, voting history, account settings"
        canonicalUrl="https://foundation-bst.org/profile"
      />
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarFallback className="bg-gradient-aurora text-white text-2xl">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold bg-gradient-aurora bg-clip-text text-transparent mb-2">
                {userData.name}
              </h1>
              <p className="text-muted-foreground mb-3">{userData.email}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default" className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  {userData.role}
                </Badge>
                <Badge variant="secondary">
                  Voting Power: {userData.votingPower}
                </Badge>
                <Badge variant="outline">
                  Member since {new Date(userData.joinedDate).toLocaleDateString()}
                </Badge>
              </div>
            </div>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">Activity</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Manage your account details and preferences
                  </CardDescription>
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
                      <Button onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button onClick={handleSave}>Save Changes</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
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
                      <p className="font-mono text-sm">0x742d...5a9c</p>
                      <p className="text-xs text-muted-foreground mt-1">MetaMask</p>
                    </div>
                    <Button variant="outline" size="sm">Disconnect</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Voting History</CardTitle>
                  <CardDescription>
                    Your participation in DAO proposals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {proposals.map((proposal) => (
                      <div
                        key={proposal.id}
                        className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-accent/30 transition-colors"
                      >
                        <div>
                          <p className="font-semibold">{proposal.title}</p>
                          <p className="text-sm text-muted-foreground">{proposal.date}</p>
                        </div>
                        <Badge variant={proposal.voted === "for" ? "default" : "secondary"}>
                          Voted {proposal.voted}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how you receive updates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Proposal Alerts</p>
                      <p className="text-sm text-muted-foreground">Get notified of new proposals</p>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Treasury Updates</p>
                      <p className="text-sm text-muted-foreground">Financial activity notifications</p>
                    </div>
                    <Button variant="outline" size="sm">Disabled</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive/50 mt-6">
                <CardHeader>
                  <CardTitle className="text-destructive">Danger Zone</CardTitle>
                  <CardDescription>
                    Irreversible actions for your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
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
