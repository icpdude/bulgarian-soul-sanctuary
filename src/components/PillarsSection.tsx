import { Card, CardContent } from "@/components/ui/card";

const pillars = [
  {
    title: "Spiritual Education",
    subtitle: "Academy",
    description: "Immersive learning experiences exploring Bulgarian spiritual traditions, folklore, and ancient wisdom.",
    icon: "🕯️",
    color: "primary"
  },
  {
    title: "Audio/Visual Archive", 
    subtitle: "NFT Collection",
    description: "Digitized cultural artifacts, folk songs, and stories preserved permanently on the blockchain.",
    icon: "📜",
    color: "rose"
  },
  {
    title: "Community Participation",
    subtitle: "DAO Governance", 
    description: "Decentralized decision-making for cultural preservation initiatives and resource allocation.",
    icon: "🤝",
    color: "amber"
  },
  {
    title: "Multilingual Outreach",
    subtitle: "Global Connection",
    description: "Sharing Bulgarian culture worldwide through Bulgarian and English content and programs.",
    icon: "🌍",
    color: "navy"
  }
];

export const PillarsSection = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Four Sacred Pillars
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The foundation of our digital sanctuary rests on these interconnected pillars,
            each essential to preserving and sharing Bulgarian spiritual heritage.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <Card 
              key={index} 
              className={`bg-card/50 backdrop-blur-sm border-border hover:border-${pillar.color} transition-spiritual group cursor-pointer`}
            >
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-6 animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                  {pillar.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-spiritual">
                  {pillar.title}
                </h3>
                
                <div className={`text-sm font-medium mb-4 text-${pillar.color}`}>
                  {pillar.subtitle}
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
                
                <div className={`w-12 h-1 bg-${pillar.color} mx-auto mt-6 transition-spiritual group-hover:w-16`} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};