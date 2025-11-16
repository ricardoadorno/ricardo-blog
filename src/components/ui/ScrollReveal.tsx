'use client';

import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 }
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{
        opacity: 0,
        ...directions[direction]
      }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : directions[direction].y,
        x: isInView ? 0 : directions[direction].x
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

// Multiple reveal variants
export function FadeIn({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: isInView ? 1 : 0,
        scale: isInView ? 1 : 0.9
      }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function BlurIn({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{
        opacity: isInView ? 1 : 0,
        filter: isInView ? 'blur(0px)' : 'blur(10px)'
      }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}
