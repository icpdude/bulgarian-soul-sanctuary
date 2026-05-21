import { motion, useReducedMotion } from "framer-motion";
import { BulgarianRose } from "@/components/atomic/BulgarianRose";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  label?: string;
  size?: number;
  className?: string;
  minHeight?: string;
}

/**
 * Unified loading indicator used across TokenGate, wallet verification,
 * and dashboard cards. Respects prefers-reduced-motion.
 */
export const LoadingState = ({
  label = "Loading",
  size = 48,
  className,
  minHeight = "min-h-[240px]",
}: LoadingStateProps) => {
  const reduce = useReducedMotion();

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "flex flex-col items-center justify-center gap-4 px-6 py-10",
        minHeight,
        className,
      )}
    >
      <motion.div
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="text-primary/60"
        aria-hidden="true"
      >
        <BulgarianRose size={size} />
      </motion.div>
      <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </p>
      <span className="sr-only">{label}…</span>
    </div>
  );
};

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  minHeight?: string;
}

/**
 * Unified empty state used across dashboard cards and lists.
 */
export const EmptyState = ({
  title,
  description,
  icon,
  action,
  className,
  minHeight = "min-h-[200px]",
}: EmptyStateProps) => (
  <div
    role="status"
    className={cn(
      "flex flex-col items-center justify-center gap-3 text-center px-6 py-10",
      minHeight,
      className,
    )}
  >
    <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary/10 via-rose/5 to-amber/5 flex items-center justify-center border border-primary/15">
      <BulgarianRose size={40} className="absolute text-primary/20" aria-hidden="true" />
      {icon && <div className="relative text-primary/70">{icon}</div>}
    </div>
    <h3 className="text-base font-display font-semibold tracking-tight">{title}</h3>
    {description && (
      <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
        {description}
      </p>
    )}
    {action && <div className="pt-1">{action}</div>}
  </div>
);