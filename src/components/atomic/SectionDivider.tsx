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
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-primary to-transparent flex-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        />
        <motion.span
          className="text-2xl text-primary"
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          {icon}
        </motion.span>
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-primary to-transparent flex-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        />
      </motion.div>
    </div>
  );
};
