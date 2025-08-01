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
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-20 left-10 text-8xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          📜
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-6xl"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          🌿
        </motion.div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-8 text-foreground"
            variants={itemVariants}
          >
            Our Sacred Mission
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-amber mx-auto mb-8"
            variants={itemVariants}
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
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
                className="space-y-6 group"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="text-4xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className={`text-2xl font-semibold ${item.color} group-hover:scale-105 transition-transform`}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed pl-16">
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
                <p className="text-muted-foreground">Spirit of Bulgaria Foundation</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};