import { cn } from "@/lib/utils";

interface BulgarianRoseProps {
  className?: string;
  size?: number;
}

/**
 * Stylised eight-petal rosette inspired by Bulgarian embroidery (шевица).
 * Rendered with currentColor so it inherits text color tokens.
 */
export const BulgarianRose = ({ className, size = 24 }: BulgarianRoseProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={cn("inline-block", className)}
  >
    <g stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2.4" fill="currentColor" fillOpacity="0.18" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        const x1 = 12 + Math.cos(a) * 3;
        const y1 = 12 + Math.sin(a) * 3;
        const x2 = 12 + Math.cos(a) * 9;
        const y2 = 12 + Math.sin(a) * 9;
        const cx = 12 + Math.cos(a) * 6.5;
        const cy = 12 + Math.sin(a) * 6.5;
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} />
            <circle cx={cx} cy={cy} r="1.1" fill="currentColor" fillOpacity="0.35" />
          </g>
        );
      })}
      <circle cx="12" cy="12" r="10" strokeOpacity="0.35" strokeDasharray="1.4 2.2" />
    </g>
  </svg>
);