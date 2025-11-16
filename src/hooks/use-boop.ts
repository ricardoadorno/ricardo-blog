'use client';

import { useState, useCallback, useEffect } from 'react';

export interface BoopConfig {
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
  timing?: number;
  springConfig?: {
    tension?: number;
    friction?: number;
  };
}

export function useBoop({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  timing = 300,
}: BoopConfig = {}) {
  const [isBooped, setIsBooped] = useState(false);

  const trigger = useCallback(() => {
    setIsBooped(true);
  }, []);

  useEffect(() => {
    if (!isBooped) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsBooped(false);
    }, timing);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped, timing]);

  const style = isBooped
    ? {
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`,
        transition: `transform ${timing}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
      }
    : {
        transform: 'translate(0px, 0px) rotate(0deg) scale(1)',
        transition: `transform ${timing}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
      };

  return { style, trigger, isBooped };
}

// Animation variants for Framer Motion
export const boopVariants = {
  wiggle: {
    rest: { rotate: 0 },
    booped: {
      rotate: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    }
  },
  bounce: {
    rest: { y: 0 },
    booped: {
      y: [0, -10, 0],
      transition: { duration: 0.3, type: 'spring', stiffness: 400, damping: 10 }
    }
  },
  grow: {
    rest: { scale: 1 },
    booped: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 }
    }
  },
  spin: {
    rest: { rotate: 0 },
    booped: {
      rotate: 360,
      transition: { duration: 0.5, ease: 'easeInOut' }
    }
  },
  shake: {
    rest: { x: 0 },
    booped: {
      x: [-5, 5, -5, 5, 0],
      transition: { duration: 0.4 }
    }
  },
  tada: {
    rest: { scale: 1, rotate: 0 },
    booped: {
      scale: [1, 0.9, 1.1, 1.1, 1.1, 1],
      rotate: [0, -3, 3, -3, 3, 0],
      transition: { duration: 0.8 }
    }
  }
};
