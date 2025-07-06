import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fundingGoals = [
  {
    category: "Digital Archive",
    current: 12500,
    target: 25000,
    description: "Digitizing rare Bulgarian folk recordings and manuscripts",
    icon: "📚"
  },
  {
    category: "Educational Programs", 
    current: 8300,
    target: 15000,
    description: "Scholarships and cultural education initiatives",
    icon: "🎓"
  },
  {
    category: "Podcast Production",
    current: 3400,
    target: 8000,
    description: "Monthly podcast series on Bulgarian spirituality",
    icon: "🎙️"
  },
  {
    category: "Community Events",
    current: 6700,
    target: 12000,
    description: "Cultural festivals and spiritual gatherings", 
    icon: "🎭"
  }
];

export const DonationSection = () => {
  return (
    <section className="py-24 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dusk opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Support Our Sacred Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Your contribution helps preserve Bulgarian spiritual heritage for future generations. 
            Choose your preferred focus area and receive exclusive NFT certificates.
          </p>
        </div>
        
        {/* Funding Goals */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {fundingGoals.map((goal, index) => (
            <Card key={index} className="bg-card/70 backdrop-blur-sm border-border hover:border-primary transition-spiritual group">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                    {goal.icon}
                  </div>
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-spiritual">
                    {goal.category}
                  </h3>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground">{((goal.current / goal.target) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-dawn h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(goal.current / goal.target) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-2 text-muted-foreground">
                    <span>${goal.current.toLocaleString()}</span>
                    <span>${goal.target.toLocaleString()}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {goal.description}
                </p>
                
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Support This Cause
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Donation Methods */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Choose Your Donation Method</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-primary/10 border border-primary/20">
              <div className="text-3xl mb-4">💳</div>
              <h4 className="font-semibold text-foreground mb-2">Traditional Payment</h4>
              <p className="text-sm text-muted-foreground mb-4">Credit card, PayPal, bank transfer</p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Donate Now
              </Button>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-amber/10 border border-amber/20">
              <div className="text-3xl mb-4">₿</div>
              <h4 className="font-semibold text-foreground mb-2">Cryptocurrency</h4>
              <p className="text-sm text-muted-foreground mb-4">ETH, BTC, USDC, and more</p>
              <Button variant="outline" className="border-amber text-amber hover:bg-amber hover:text-amber-foreground">
                Crypto Donate
              </Button>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-rose/10 border border-rose/20">
              <div className="text-3xl mb-4">🎨</div>
              <h4 className="font-semibold text-foreground mb-2">NFT Donation</h4>
              <p className="text-sm text-muted-foreground mb-4">Donate & receive exclusive NFT</p>
              <Button variant="outline" className="border-rose text-rose hover:bg-rose hover:text-rose-foreground">
                NFT Donate
              </Button>
            </div>
          </div>
        </div>
        
        {/* Impact Statement */}
        <div className="text-center bg-gradient-dawn rounded-2xl p-8 text-background">
          <h3 className="text-2xl font-bold mb-4">Your Impact</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">2,847</div>
              <div className="opacity-90">Artifacts Preserved</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">156</div>
              <div className="opacity-90">Scholars Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">43</div>
              <div className="opacity-90">Communities Reached</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};