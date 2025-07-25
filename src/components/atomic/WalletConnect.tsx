import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // TODO: Implement actual wallet connection
    setIsConnected(!isConnected);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Button
        variant={isConnected ? "spiritual" : "outline"}
        size="sm"
        onClick={handleConnect}
        className="relative overflow-hidden"
      >
        <motion.div
          initial={false}
          animate={isConnected ? { rotate: 0 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center space-x-2"
        >
          <Wallet className="w-4 h-4" />
          <span className="hidden md:inline">
            {isConnected ? "Connected" : "Connect"}
          </span>
        </motion.div>
        {isConnected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
          />
        )}
      </Button>
    </motion.div>
  );
};