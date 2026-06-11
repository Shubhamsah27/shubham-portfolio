import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useStore } from '../../store/useStore';

export const EntryScreen = () => {
  const setRenderMode = useStore((state) => state.setRenderMode);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-skip if previously selected in this session
  useEffect(() => {
    const savedMode = sessionStorage.getItem('renderMode');
    if (savedMode === 'webgl' || savedMode === 'standard') {
      setIsVisible(false);
      setRenderMode(savedMode as 'webgl' | 'standard');
    }
  }, [setRenderMode]);

  const handleSelect = (mode: 'webgl' | 'standard') => {
    sessionStorage.setItem('renderMode', mode);
    setIsGlitching(true);
    
    // 3-frame glitch effect sequence
    setTimeout(() => {
      setIsGlitching(false);
      setIsVisible(false);
      setTimeout(() => setRenderMode(mode), 400); // Wait for fade out
    }, 150);
  };

  if (!isVisible && !isGlitching) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-base"
        >
          <div
            className={`relative w-full max-w-2xl p-8 mx-4 border border-border-amber bg-surface-card transition-all duration-75 ${
              isGlitching ? 'hue-rotate-90 brightness-150 scale-[1.01] skew-x-1' : ''
            }`}
          >
            <div className="flex flex-col items-center text-center mb-10">
              <h1 className="font-display font-extrabold text-4xl md:text-5xl text-gradient tracking-tight mb-2 whitespace-nowrap">
                SHUBHAM SAH&nbsp;
              </h1>
              <p className="font-mono text-amber text-sm tracking-widest">
                SYS_INIT_v1.0
              </p>
            </div>

            <div className="border-t border-b border-border-amber py-6 mb-8">
              <h2 className="font-mono text-text-primary text-sm mb-6 tracking-widest">
                SELECT RENDER MODE
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-body font-medium text-text-primary mb-1">WebGL Mode</h3>
                  <p className="font-body text-text-muted text-sm">
                    Full infrastructure canvas.<br/>Recommended for desktop.
                  </p>
                </div>
                <div>
                  <h3 className="font-body font-medium text-text-primary mb-1">Standard Mode</h3>
                  <p className="font-body text-text-muted text-sm">
                    Lightweight. Battery-safe.<br/>Mobile optimized.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => handleSelect('webgl')}
                className="px-6 py-3 border border-amber text-amber font-mono text-sm hover:bg-amber/10 transition-colors"
              >
                {'> WEBGL_ENABLED'}
              </button>
              <button
                onClick={() => handleSelect('standard')}
                className="px-6 py-3 border border-border-amber text-text-muted font-mono text-sm hover:border-amber hover:text-amber transition-colors"
              >
                {'> STANDARD_MODE'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
