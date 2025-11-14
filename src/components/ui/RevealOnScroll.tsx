"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.5,
}: RevealOnScrollProps) {
  const { ref: scrollRef, isVisible } = useScrollReveal({ threshold: 0.1, triggerOnce: true });

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  return (
    <motion.div
      ref={scrollRef as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={
        isVisible
          ? { opacity: 1, y: 0, x: 0 }
          : { opacity: 0, ...directions[direction] }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
