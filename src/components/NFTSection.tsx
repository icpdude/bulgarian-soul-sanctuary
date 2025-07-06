import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const nftCollection = [
  {
    title: "Ancient Rose Ritual",
    type: "Audio Recording",
    region: "Valley of Roses",
    year: "1952",
    status: "Available"
  },
  {
    title: "Thracian Sun Dance",
    type: "Folk Song",
    region: "Rhodope Mountains", 
    year: "1934",
    status: "Minted"
  },
  {
    title: "Grandmother's Wisdom",
    type: "Story Collection",
    region: "Pirin Region",
    year: "1960s",
    status: "Available"
  },
  {
    title: "Fire Dancing Chant",
    type: "Ceremonial Music",
    region: "Strandzha Mountains",
    year: "1945",
    status: "Available"
  }
];

export const NFTSection = () => {
  return (
    <section className="py-24 px-6 relative">
      {/* Background effect */}
      <div className="absolute inset-0 gradient-mystical" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Voices of the Spirit
          </h2>
          <div className="text-2xl text-amber mb-4">Volume I Collection</div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Our inaugural NFT collection features rare audio recordings, folk songs, and stories 
            from Bulgarian spiritual traditions, permanently preserved on ScrollChain.
          </p>
          
          {/* Collection Stats */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">24</div>
              <div className="text-sm text-muted-foreground">Total Items</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-rose">8</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber">16</div>
              <div className="text-sm text-muted-foreground">Minted</div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {nftCollection.map((item, index) => (
            <Card key={index} className="bg-card/70 backdrop-blur-sm border-border hover:border-primary transition-spiritual group">
              <CardContent className="p-6">
                <div className="aspect-square bg-gradient-dusk rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-4xl animate-glow">
                    {item.type === "Audio Recording" ? "🎵" : 
                     item.type === "Folk Song" ? "🎶" : 
                     item.type === "Story Collection" ? "📖" : "🔥"}
                  </div>
                </div>
                
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-spiritual">
                  {item.title}
                </h3>
                
                <div className="space-y-1 text-sm text-muted-foreground mb-4">
                  <div>{item.type}</div>
                  <div>{item.region}</div>
                  <div>{item.year}</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.status === "Available" 
                      ? "bg-primary/20 text-primary" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {item.status}
                  </span>
                  
                  {item.status === "Available" && (
                    <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Mint
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" className="bg-gradient-dawn text-background hover:opacity-90 px-8 py-4">
            View Full Collection
          </Button>
        </div>
      </div>
    </section>
  );
};