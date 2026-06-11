import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

interface EntryScreenProps {
  onExitStart?: () => void;
}

export const EntryScreen = ({ onExitStart }: EntryScreenProps) => {
  const prefersReduced = useStore((state) => state.reducedMotion);
  const setRenderMode = useStore((state) => state.setRenderMode);

  const [isVisible, setIsVisible] = useState(true);
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [line3, setLine3] = useState('');
  const [line4, setLine4] = useState('');
  const [currentLine, setCurrentLine] = useState(1);
  
  // Animation Phase States
  const [typewriterVisible, setTypewriterVisible] = useState(true);
  const [showModeSelect, setShowModeSelect] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [exitBgStarted, setExitBgStarted] = useState(false);
  const [unmount, setUnmount] = useState(false);

  // Auto-skip if previously selected in this session
  useEffect(() => {
    const savedMode = sessionStorage.getItem('renderMode');
    if (savedMode === 'webgl' || savedMode === 'standard') {
      setIsVisible(false);
      setUnmount(true);
      setRenderMode(savedMode as 'webgl' | 'standard');
      if (onExitStart) onExitStart();
    }
  }, [setRenderMode, onExitStart]);

  useEffect(() => {
    if (unmount) return;

    const isMobile = window.innerWidth < 768;

    // Do NOT show on mobile if prefers-reduced-motion is set
    if (isMobile && prefersReduced) {
      setIsVisible(false);
      setUnmount(true);
      setRenderMode(isMobile ? 'standard' : 'webgl');
      if (onExitStart) onExitStart();
      return;
    }

    // Typewriter helper function
    const typeText = (fullText: string, setFn: (val: string) => void, startDelay: number, speed: number) => {
      for (let i = 0; i < fullText.length; i++) {
        setTimeout(() => {
          setFn(fullText.substring(0, i + 1));
        }, startDelay + i * speed);
      }
    };

    // Animation timeline sequence
    // Step 2: "ERROR 404:" types out at 300ms (80ms per char)
    typeText("ERROR 404:", setLine1, 300, 80);

    // Step 3: line break + 200ms pause at 900ms
    setTimeout(() => {
      setCurrentLine(2);
    }, 900);

    // Step 4: "Conventional" types out at 1100ms (80ms per char)
    typeText("Conventional", setLine2, 1100, 80);

    // Step 5: line break + 200ms pause at 2000ms
    setTimeout(() => {
      setCurrentLine(3);
    }, 2000);

    // Step 6: "developer not" types out at 2200ms (80ms per char)
    typeText("developer not", setLine3, 2200, 80);

    // Step 7: line break + 200ms pause at 2900ms
    setTimeout(() => {
      setCurrentLine(4);
    }, 2900);

    // Step 8: "found." types out at 3100ms (80ms per char)
    typeText("found.", setLine4, 3100, 80);

    // Fade typewriter text out at 3800ms
    setTimeout(() => {
      setTypewriterVisible(false);
    }, 3800);

    // Fade mode select dialogue in at 4100ms
    setTimeout(() => {
      setShowModeSelect(true);
    }, 4100);

  }, [prefersReduced, unmount, setRenderMode, onExitStart]);

  const handleSelectMode = (mode: 'webgl' | 'standard') => {
    sessionStorage.setItem('renderMode', mode);
    setIsGlitching(true);
    
    // 3-frame glitch effect sequence
    setTimeout(() => {
      setIsGlitching(false);
      setExitBgStarted(true);
      if (onExitStart) onExitStart();

      // Complete unmount after bg transition completes
      setTimeout(() => {
        setUnmount(true);
        setIsVisible(false);
        setRenderMode(mode);
      }, 400);
    }, 150);
  };

  if (!isVisible || unmount) return null;

  return (
    <div 
      className={`fixed inset-0 bg-[#080608] z-[9999] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-300 ease-in ${
        exitBgStarted ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* SVG Turbulence Grain Overlay (Opacity 2%) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.02] z-50">
        <filter id="entryNoiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#entryNoiseFilter)" />
      </svg>

      {/* Faint Amber Radial Glow (300px, 8% opacity) */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-[#f59e0b] blur-[60px] opacity-[0.08] pointer-events-none z-0" />

      {/* Style blocks for cursor animations */}
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .custom-cursor {
          display: inline-block;
          width: 0.6em;
          height: 1.1em;
          background-color: #f59e0b;
          margin-left: 2px;
          vertical-align: middle;
        }
        .cursor-active {
          animation: cursor-blink 1s step-end infinite;
        }
      `}</style>

      {/* Phase 1: Typewriter Text Container */}
      <AnimatePresence>
        {typewriterVisible && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeIn' }}
            className="font-mono font-bold text-3xl md:text-5xl text-[#faf5ff] leading-[1.6] tracking-[0.02em] text-center z-10 max-w-4xl px-6 flex flex-col items-center justify-center"
          >
            <div className="min-h-[1.6em] flex items-center justify-center">
              <span>{line1}</span>
              {currentLine === 1 && (
                <span className="custom-cursor cursor-active" />
              )}
            </div>
            <div className="min-h-[1.6em] flex items-center justify-center">
              <span>{line2}</span>
              {currentLine === 2 && (
                <span className="custom-cursor cursor-active" />
              )}
            </div>
            <div className="min-h-[1.6em] flex items-center justify-center">
              <span>{line3}</span>
              {currentLine === 3 && (
                <span className="custom-cursor cursor-active" />
              )}
            </div>
            <div className="min-h-[1.6em] flex items-center justify-center">
              <span>{line4}</span>
              {currentLine === 4 && (
                <span className="custom-cursor cursor-active" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Mode Select dialogue */}
      <AnimatePresence>
        {showModeSelect && !exitBgStarted && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="z-20 w-full max-w-2xl px-4"
          >
            <div
              className={`relative w-full p-8 border border-[#f59e0b]/20 bg-[#0e0e14] rounded-lg shadow-2xl transition-all duration-75 ${
                isGlitching ? 'hue-rotate-90 brightness-150 scale-[1.01] skew-x-1' : ''
              }`}
            >
              <div className="flex flex-col items-center text-center mb-10 select-none">
                <h1 className="font-display font-extrabold text-4xl md:text-5xl text-gradient tracking-tight mb-2 whitespace-nowrap">
                  SHUBHAM SAH&nbsp;
                </h1>
                <p className="font-mono text-amber text-sm tracking-widest">
                  SYS_INIT_v1.0
                </p>
              </div>

              <div className="border-t border-b border-[#f59e0b]/10 py-6 mb-8 select-none">
                <h2 className="font-mono text-white text-sm mb-6 tracking-widest">
                  SELECT RENDER MODE
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h3 className="font-body font-medium text-white mb-1">WebGL Mode</h3>
                    <p className="font-body text-text-muted text-sm leading-relaxed">
                      Full infrastructure canvas.<br/>Recommended for desktop.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-body font-medium text-white mb-1">Standard Mode</h3>
                    <p className="font-body text-text-muted text-sm leading-relaxed">
                      Lightweight. Battery-safe.<br/>Mobile optimized.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => handleSelectMode('webgl')}
                  className="px-6 py-3 border border-amber text-amber font-mono text-sm hover:bg-amber/10 transition-colors"
                  style={{ minHeight: '44px' }}
                >
                  {'> WEBGL_ENABLED'}
                </button>
                <button
                  onClick={() => handleSelectMode('standard')}
                  className="px-6 py-3 border border-[#f59e0b]/20 text-text-muted font-mono text-sm hover:border-amber hover:text-amber transition-colors"
                  style={{ minHeight: '44px' }}
                >
                  {'> STANDARD_MODE'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
