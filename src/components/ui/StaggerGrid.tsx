'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
};

export function StaggerGrid({
  children,
  className,
  staggerDelay = 0.1,
  initialDelay = 0.2
}: StaggerGridProps) {
  const customContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={customContainer}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

// Export variants for direct use
export { container as staggerContainer, item as staggerItem };
