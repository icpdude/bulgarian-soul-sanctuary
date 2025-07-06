import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const membershipTiers = [
  {
    name: "Sympathizer",
    description: "Support our mission and stay connected",
    badge: "🌟",
    benefits: [
      "Newsletter access",
      "Community updates",
      "Event invitations"
    ],
    nftReward: "Supporter Badge NFT",
    action: "Join Free"
  },
  {
    name: "Volunteer", 
    description: "Actively contribute to preservation efforts",
    badge: "🤝",
    benefits: [
      "Project participation",
      "Volunteer recognition",
      "Exclusive content access",
      "Governance participation"
    ],
    nftReward: "Volunteer Role NFT",
    action: "Apply Now"
  },
  {
    name: "Donor",
    description: "Financial support for our initiatives", 
    badge: "❤️",
    benefits: [
      "Tax deductible receipts",
      "Impact reports",
      "Donor recognition",
      "Priority event access"
    ],
    nftReward: "Patron NFT + Donation Receipt",
    action: "Donate"
  },
  {
    name: "Partner",
    description: "Strategic collaboration and major support",
    badge: "👑", 
    benefits: [
      "Strategic input",
      "Brand partnership",
      "Co-creation opportunities",
      "Advisory board invitation"
    ],
    nftReward: "Partnership Certificate NFT",
    action: "Partner With Us"
  }
];

export const MembershipSection = () => {
  return (
    <section className="py-24 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-navy/20" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Join Our Sacred Circle
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Become part of the Spirit of Bulgaria community. Each membership tier comes with 
            unique NFT badges and exclusive access to our cultural preservation efforts.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {membershipTiers.map((tier, index) => (
            <Card 
              key={index} 
              className="bg-card/70 backdrop-blur-sm border-border hover:border-primary transition-spiritual group h-full"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4 animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
                    {tier.badge}
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-spiritual">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {tier.description}
                  </p>
                </div>
                
                <div className="space-y-3 mb-6 flex-grow">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
                
                <div className="bg-muted/30 rounded-lg p-3 mb-6">
                  <div className="text-xs text-muted-foreground mb-1">NFT Reward:</div>
                  <div className="text-sm font-medium text-amber">{tier.nftReward}</div>
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  variant={tier.name === "Partner" ? "default" : "outline"}
                >
                  {tier.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};