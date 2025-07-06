export const MissionSection = () => {
  return (
    <section className="py-24 px-6 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-dusk opacity-20" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground">
            Our Sacred Mission
          </h2>
          <div className="w-24 h-1 bg-amber mx-auto mb-8" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary">
                Preserving Bulgarian Heritage
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We safeguard the spiritual essence of Bulgaria through blockchain technology, 
                ensuring our cultural treasures remain accessible for future generations.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-rose">
                Building Digital Bridges
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Connecting ancient wisdom with modern innovation, we create pathways 
                between traditional Bulgarian spirituality and contemporary digital communities.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-amber">
                Empowering Communities
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through decentralized governance and NFT-backed archives, we empower 
                Bulgarians worldwide to participate in preserving their cultural identity.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border warm-shadow">
              <blockquote className="text-xl font-light text-center leading-relaxed">
                <span className="text-4xl text-primary font-serif">"</span>
                The soul of a nation lives not in its monuments, 
                but in the hearts of its people and the stories they preserve.
                <span className="text-4xl text-primary font-serif">"</span>
              </blockquote>
              <div className="text-center mt-6">
                <div className="w-16 h-1 bg-gradient-dawn mx-auto mb-4" />
                <p className="text-muted-foreground">Spirit of Bulgaria Foundation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};