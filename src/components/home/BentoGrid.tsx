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
        "relative overflow-hidden rounded-2xl border border-border/50",
        "bg-card/50 backdrop-blur-sm p-6",
        gradient && "bg-gradient-to-br from-card/80 via-card/50 to-muted/30",
        hover && "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300",
        spanClass,
        rowSpanClass,
        className
      )}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
