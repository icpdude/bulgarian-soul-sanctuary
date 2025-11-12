import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen = ({ message = "Loading..." }: LoadingScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <Loader2 className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
        <p className="text-muted-foreground">{message}</p>
      </motion.div>
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  );
};
