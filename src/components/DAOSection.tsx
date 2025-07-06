import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const proposals = [
  {
    id: "SOP-001",
    title: "Fund Digital Archive Expansion",
    description: "Allocate 50 ETH for digitizing 200 new folk songs from Dobrudja region",
    status: "Active",
    votes: { for: 156, against: 23, total: 179 },
    timeLeft: "3 days"
  },
  {
    id: "SOP-002", 
    title: "Partnership with Bulgarian National Museum",
    description: "Establish collaboration for artifact digitization and NFT creation",
    status: "Passed",
    votes: { for: 203, against: 12, total: 215 },
    timeLeft: "Completed"
  },
  {
    id: "SOP-003",
    title: "Scholarship Program Launch",
    description: "Create educational scholarships for Bulgarian cultural studies",
    status: "Pending",
    votes: { for: 0, against: 0, total: 0 },
    timeLeft: "Starts in 2 days"
  }
];

export const DAOSection = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            DAO Governance Portal
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Shape the future of Bulgarian cultural preservation through decentralized governance. 
            Connect your wallet to participate in community decisions.
          </p>
        </div>
        
        {/* Wallet Connection Status */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 mb-12 border border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-dawn rounded-full flex items-center justify-center">
                <span className="text-2xl">🔗</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Wallet Status</h3>
                <p className="text-muted-foreground">Connect your wallet to participate in governance</p>
              </div>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Connect Wallet
            </Button>
          </div>
        </div>
        
        {/* Current Proposals */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8 text-center text-foreground">Current Proposals</h3>
          
          <div className="space-y-6">
            {proposals.map((proposal, index) => (
              <Card key={index} className="bg-card/70 backdrop-blur-sm border-border">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-muted-foreground">{proposal.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          proposal.status === "Active" ? "bg-primary/20 text-primary" :
                          proposal.status === "Passed" ? "bg-green-500/20 text-green-400" :
                          "bg-amber/20 text-amber"
                        }`}>
                          {proposal.status}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">{proposal.title}</h4>
                      <p className="text-muted-foreground">{proposal.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">{proposal.timeLeft}</div>
                      <div className="text-xs text-muted-foreground">
                        {proposal.votes.total} votes cast
                      </div>
                    </div>
                  </div>
                  
                  {proposal.status === "Active" && (
                    <div className="flex gap-3">
                      <Button variant="outline" className="border-green-500/50 text-green-400 hover:bg-green-500/20">
                        Vote For ({proposal.votes.for})
                      </Button>
                      <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/20">
                        Vote Against ({proposal.votes.against})
                      </Button>
                    </div>
                  )}
                  
                  {proposal.status === "Passed" && (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <div className="text-sm text-green-400">
                        ✓ Proposal passed with {((proposal.votes.for / proposal.votes.total) * 100).toFixed(1)}% approval
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* DAO Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 text-center border border-border">
            <div className="text-3xl font-bold text-primary mb-2">247</div>
            <div className="text-muted-foreground">Active Members</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 text-center border border-border">
            <div className="text-3xl font-bold text-rose mb-2">12</div>
            <div className="text-muted-foreground">Proposals Passed</div>
          </div>
          <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 text-center border border-border">
            <div className="text-3xl font-bold text-amber mb-2">89%</div>
            <div className="text-muted-foreground">Participation Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};