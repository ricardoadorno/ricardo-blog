"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(200px,auto)] gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  span?: "1" | "2" | "3" | "4" | "full";
  rowSpan?: "1" | "2" | "3";
  gradient?: boolean;
  hover?: boolean;
}

export function BentoCard({
  children,
  className,
  span = "1",
  rowSpan = "1",
  gradient = false,
  hover = true,
}: BentoCardProps) {
  const spanClass = {
    "1": "md:col-span-1",
    "2": "md:col-span-2",
    "3": "lg:col-span-3",
    "4": "lg:col-span-4",
    "full": "col-span-full",
  }[span];

  const rowSpanClass = {
    "1": "row-span-1",
    "2": "md:row-span-2",
    "3": "lg:row-span-3",
  }[rowSpan];

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/50",
        "bg-card/50 backdrop-blur-sm p-6",
        "shadow-lg shadow-black/5",
        gradient && "bg-gradient-to-br from-card/80 via-card/50 to-muted/30",
        hover && "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300",
        spanClass,
        rowSpanClass,
        className
      )}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <svg className="w-full h-full">
          <filter id={`noise-${span}-${rowSpan}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#noise-${span}-${rowSpan})`} />
        </svg>
      </div>

      {/* Gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ opacity: 0 }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
