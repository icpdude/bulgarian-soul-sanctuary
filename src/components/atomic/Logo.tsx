import { motion } from "framer-motion";

export const Logo = () => {
  return (
    <motion.div
      className="flex items-center space-x-2"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        className="text-primary"
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 15 }}
        transition={{ duration: 0.3 }}
      >
        <motion.path
          d="M20 5 L35 15 L35 25 L20 35 L5 25 L5 15 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.circle
          cx="20"
          cy="20"
          r="6"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        />
      </motion.svg>
      <motion.span
        className="text-xl font-bold text-foreground"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Spirit of Bulgaria
      </motion.span>
    </motion.div>
  );
};