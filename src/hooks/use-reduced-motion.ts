import { useEffect, useState } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', onChange);
    
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);
  
  return prefersReducedMotion;
}