import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";

export const WalletConnect = () => {
  const { openModal } = useModal();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => openModal("wallet")}
        className="relative overflow-hidden"
      >
        <motion.div className="flex items-center space-x-2">
          <Wallet className="w-4 h-4" />
          <span className="hidden md:inline">Connect</span>
        </motion.div>
      </Button>
    </motion.div>
  );
};