import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Compass } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 gradient-mystical opacity-30" />
      <div className="absolute inset-0 bg-gradient-dusk opacity-20" />
      
      <motion.div 
        className="relative z-10 text-center max-w-2xl mx-auto px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-9xl md:text-[12rem] font-display font-bold text-gradient-dawn leading-none">
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
            Sacred Path Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you're seeking has wandered beyond the spiritual realm. 
            Let us guide you back to the sanctuary.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            asChild
            size="lg"
            variant="default"
            className="min-w-[200px] group"
          >
            <Link to="/">
              <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Return Home
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="min-w-[200px] group"
          >
            <Link to="/#mission">
              <Compass className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
              Explore Mission
            </Link>
          </Button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-4xl"
        >
          🏛️ ✨ 🌿
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
