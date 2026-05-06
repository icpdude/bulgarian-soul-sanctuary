import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 heritage-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">
            Four Sacred Pillars
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The foundation of our digital sanctuary rests on these interconnected pillars,
            each essential to preserving and sharing Bulgarian spiritual heritage.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer h-full heritage-border-top overflow-hidden">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="text-5xl mb-4 inline-block group-hover:scale-110 transition-transform duration-300">
                    {pillar.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  
                  <div className={`text-xs font-medium uppercase tracking-[0.2em] mb-4 text-${pillar.color}`}>
                    {pillar.subtitle}
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
                  >
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};