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
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-9xl"
            style={{
              left: `${20 + i * 20}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {['🕯️', '📜', '🤝', '🌍'][i]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
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
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer h-full">
                <CardContent className="p-8 text-center space-y-4">
                  <motion.div 
                    className="text-6xl mb-6 inline-block"
                    whileHover={{ 
                      scale: 1.2,
                      rotate: [0, -10, 10, 0],
                    }}
                    transition={{ duration: 0.3 }}
                    animate={{
                      y: [-5, 5, -5],
                    }}
                    style={{
                      animationDuration: `${3 + index * 0.5}s`,
                      animationIterationCount: "infinite",
                    }}
                  >
                    {pillar.icon}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  
                  <div className={`text-sm font-medium mb-4 text-${pillar.color}`}>
                    {pillar.subtitle}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
                    >
                      Explore {pillar.title}
                    </Button>
                  </motion.div>
                  
                  <motion.div 
                    className={`w-12 h-1 bg-${pillar.color} mx-auto transition-all duration-300`}
                    whileHover={{ width: 64 }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};