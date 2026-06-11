import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export const useScrollProgress = () => {
  const setScrollProgress = useStore((state) => state.setScrollProgress);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(scrollY / scrollHeight);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrollProgress]);
};
