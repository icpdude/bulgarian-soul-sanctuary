import { motion } from "framer-motion";

interface SectionDividerProps {
  icon?: string;
}

export const SectionDivider = ({ icon = "✦" }: SectionDividerProps) => {
  return (
    <div className="flex items-center justify-center py-12 px-6">
      <motion.div
        className="flex items-center gap-4 max-w-2xl w-full"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-primary to-primary/50 flex-1 shadow-glow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        />
        <motion.span
          className="text-3xl text-primary drop-shadow-glow"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.3, 1, 1.3, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {icon}
        </motion.span>
        <motion.div
          className="h-px bg-gradient-to-r from-primary/50 via-primary to-transparent flex-1 shadow-glow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        />
      </motion.div>
    </div>
  );
};
