import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-spiritual-bulgaria.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/30" />
      
      {/* Mystical Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gradient-dawn animate-fade-in">
          Spirit of Bulgaria
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-foreground/90 font-light">
          A digital sanctuary for Bulgarian soul and memory
        </p>
        
        <p className="text-lg mb-12 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Connecting ancestral wisdom with Web3 permanence. Preserving our cultural heritage through blockchain technology and community governance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg spiritual-glow transition-spiritual"
          >
            Join the DAO
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="border-amber text-amber hover:bg-amber hover:text-amber-foreground px-8 py-4 text-lg transition-spiritual"
          >
            Explore Archives
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground/30 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};