import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-xl border text-card-foreground shadow-sm transition-elegant",
  {
    variants: {
      variant: {
        default: "bg-card border-border hover:shadow-md",
        spiritual: "bg-card/70 backdrop-blur-md border-border hover:border-primary/60 hover:shadow-glow hover:-translate-y-1 hover:scale-[1.02]",
        mystic: "bg-gradient-to-br from-card/80 via-card/70 to-primary/8 backdrop-blur-lg border-primary/25 hover:border-primary/50 hover:shadow-warm hover:-translate-y-2 hover:scale-[1.02]",
        ethereal: "bg-card/40 backdrop-blur-xl border-border/40 hover:bg-card/60 hover:border-primary/40 hover:shadow-ambient hover:-translate-y-1",
        divine: "bg-gradient-to-br from-primary/5 via-rose/5 to-amber/5 backdrop-blur-xl border-2 border-primary/30 hover:border-primary/60 hover:shadow-elevated hover:-translate-y-2 hover:scale-[1.02]",
        premium: "bg-gradient-to-br from-card via-card/95 to-primary/10 border-2 border-primary/40 shadow-elevated hover:shadow-deep hover:-translate-y-3 hover:scale-[1.03] hover:border-primary/70",
        glass: "bg-card/30 backdrop-blur-2xl border border-border/30 hover:bg-card/50 hover:border-primary/50 hover:shadow-glow hover:-translate-y-1",
        aurora: "bg-gradient-to-br from-card/60 via-primary/5 to-rose/5 backdrop-blur-xl border-2 border-transparent bg-clip-padding hover:shadow-elevated hover:-translate-y-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
