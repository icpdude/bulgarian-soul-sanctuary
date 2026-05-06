import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-spiritual-bulgaria.jpg";
import { BulgarianRose } from "@/components/atomic/BulgarianRose";

export const HeroSection = () => {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, reduce ? 0 : 80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: `url(${heroImage})`,
          y
        }}
      />
      
      {/* Layered overlay for depth + readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/55 to-background/85" />
      <div className="absolute inset-0 bg-gradient-radial-mystical opacity-30" />
      
      {/* Subtle heritage rosettes — calm decorative layer */}
      <div className="absolute inset-0 overflow-hidden text-primary/15 pointer-events-none">
        {[
          { left: "8%", top: "18%", size: 70, delay: 0 },
          { left: "85%", top: "22%", size: 90, delay: 1.2 },
          { left: "12%", top: "75%", size: 110, delay: 0.6 },
          { left: "82%", top: "78%", size: 60, delay: 1.8 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: p.left, top: p.top }}
            animate={reduce ? undefined : { y: [-6, 6, -6], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          >
            <BulgarianRose size={p.size} />
          </motion.div>
        ))}
      </div>
      
      {/* Soft glow halos */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-primary/15 rounded-full blur-3xl"
          animate={reduce ? undefined : { opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-rose/15 rounded-full blur-3xl"
          animate={reduce ? undefined : { opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>
      
      {/* Content */}
      <motion.div 
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
        style={{ opacity }}
      >
        <motion.div
          className="inline-flex items-center gap-3 mb-6 text-primary/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-primary/50" />
          <BulgarianRose size={20} />
          <span className="text-xs uppercase tracking-[0.5em] text-muted-foreground font-display">
            Foundation · Est. 2024
          </span>
          <BulgarianRose size={20} />
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-primary/50" />
        </motion.div>
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient-dawn tracking-tight leading-[1.05]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          Bulgarian Spiritual Treasury
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl mb-6 text-foreground/90 font-display italic"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          A digital sanctuary for Bulgarian soul and memory
        </motion.p>
        
        <motion.p
          className="text-base md:text-lg mb-12 text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Connecting ancestral wisdom with Web3 permanence. Preserving our cultural heritage through
          blockchain technology and community governance.
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          <Button
            variant="spiritual"
            size="lg"
            className="px-8 py-6 text-base hover:scale-[1.02] transition-elegant"
            onClick={() => document.getElementById('dao')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join the DAO
          </Button>
          <Button
            variant="mystic"
            size="lg"
            className="px-8 py-6 text-base hover:scale-[1.02] transition-elegant"
            onClick={() => document.getElementById('nft')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Archives
          </Button>
        </motion.div>
      </motion.div>
      
      {/* Animated Scroll Indicator */}
      <motion.button
        type="button"
        aria-label="Scroll to mission"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/60 hover:text-primary transition-colors"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        onClick={() => document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <motion.div 
          className="flex flex-col items-center"
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-[0.3em] mb-2">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
};