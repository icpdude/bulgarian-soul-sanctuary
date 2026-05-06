import { ReactNode } from "react";

interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

export const LegalSection = ({ title, children }: LegalSectionProps) => (
  <section className="scroll-mt-28">
    <h2 className="relative text-xl md:text-2xl font-display font-semibold text-foreground mb-3 pl-4 border-l-2 border-primary/40">
      {title}
    </h2>
    <div className="space-y-3 text-foreground/80">{children}</div>
  </section>
);