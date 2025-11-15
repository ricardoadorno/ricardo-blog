"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ScrollProgressProps {
  className?: string;
  showPercentage?: boolean;
}

export function ScrollProgress({
  className,
  showPercentage = false
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      // Get scroll position
      const scrollTop = window.scrollY;
      // Get total scrollable height
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Calculate progress percentage
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    // Initial calculation
    updateProgress();

    // Update on scroll
    window.addEventListener("scroll", updateProgress, { passive: true });
    // Update on resize (content might reflow)
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-1 bg-muted/30 backdrop-blur-sm",
        className
      )}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Progress bar with gradient */}
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-purple-500 to-blue-500"
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        {/* Glow effect */}
        <div className="h-full w-full bg-gradient-to-r from-primary/50 via-purple-500/50 to-blue-500/50 blur-sm" />
      </motion.div>

      {/* Optional percentage display */}
      <AnimatePresence>
        {showPercentage && progress > 5 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-2 right-4 text-xs font-medium text-foreground/70 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-border/50"
            aria-live="polite"
          >
            {Math.round(progress)}%
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
