import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export const useReducedMotion = () => {
  const setReducedMotion = useStore((state) => state.setReducedMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setReducedMotion]);
};
