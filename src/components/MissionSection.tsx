import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

export const MissionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-dusk opacity-20" />
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 heritage-pattern opacity-40 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight"
            variants={itemVariants}
          >
            Our Sacred Mission
          </motion.h2>
          <motion.div 
            className="w-20 h-px bg-gradient-to-r from-transparent via-amber to-transparent mx-auto mb-8"
            variants={itemVariants}
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="space-y-8">
            {[
              {
                title: "Preserving Bulgarian Heritage",
                description: "We safeguard the spiritual essence of Bulgaria through blockchain technology, ensuring our cultural treasures remain accessible for future generations.",
                color: "text-primary",
                icon: "🏛️"
              },
              {
                title: "Building Digital Bridges",
                description: "Connecting ancient wisdom with modern innovation, we create pathways between traditional Bulgarian spirituality and contemporary digital communities.",
                color: "text-rose",
                icon: "🌉"
              },
              {
                title: "Empowering Communities",
                description: "Through decentralized governance and NFT-backed archives, we empower Bulgarians worldwide to participate in preserving their cultural identity.",
                color: "text-amber",
                icon: "👥"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="space-y-4 group"
                variants={itemVariants}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl shrink-0">{item.icon}</div>
                  <h3 className={`text-2xl font-semibold ${item.color} group-hover:scale-105 transition-transform`}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed pl-14">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            <motion.div 
              className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border warm-shadow"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <Quote className="absolute -top-4 -left-4 w-8 h-8 text-primary/30" />
                <blockquote className="text-xl font-light text-center leading-relaxed relative z-10">
                  The soul of a nation lives not in its monuments, 
                  but in the hearts of its people and the stories they preserve.
                </blockquote>
                <Quote className="absolute -bottom-4 -right-4 w-8 h-8 text-primary/30 rotate-180" />
              </div>
              <div className="text-center mt-6">
                <motion.div 
                  className="w-16 h-1 bg-gradient-dawn mx-auto mb-4"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 64 } : { width: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                />
                <p className="text-muted-foreground">Bulgarian Spiritual Treasury Foundation</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};