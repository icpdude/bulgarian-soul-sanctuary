import { motion } from "framer-motion";
import { BulgarianRose } from "./BulgarianRose";

interface SectionDividerProps {
  icon?: string;
}

export const SectionDivider = ({ icon = "✦" }: SectionDividerProps) => {
  return (
    <div className="flex items-center justify-center py-10 px-6">
      <motion.div
        className="flex items-center gap-4 max-w-2xl w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-rose/40" />
        <div className="flex items-center gap-2 text-primary/80">
          <BulgarianRose size={18} className="opacity-70" />
          <span className="text-sm tracking-[0.4em] uppercase font-display text-muted-foreground" aria-hidden>
            {icon}
          </span>
          <BulgarianRose size={18} className="opacity-70" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-rose/40 via-primary/40 to-transparent" />
      </motion.div>
    </div>
  );
};
