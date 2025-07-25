import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export const ScrollChainStatus = () => {
  const currentTime = new Date().toLocaleString("en-GB", {
    timeZone: "Europe/Sofia",
    hour12: false,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="flex items-center space-x-2 text-xs text-muted-foreground"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        📜
      </motion.div>
      <span>Synced • {currentTime} UTC+3</span>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-2 h-2 bg-green-500 rounded-full"
      />
    </motion.div>
  );
};