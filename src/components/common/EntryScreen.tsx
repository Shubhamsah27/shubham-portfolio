import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';

interface EntryScreenProps {
  onExitStart?: () => void;
}

export const EntryScreen = ({ onExitStart }: EntryScreenProps) => {
  const prefersReduced = useStore((state) => state.reducedMotion);
  const setRenderMode = useStore((state) => state.setRenderMode);
  const renderMode = useStore((state) => state.renderMode);

  const [isVisible, setIsVisible] = useState(true);
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [line3, setLine3] = useState('');
  const [line4, setLine4] = useState('');
  const [currentLine, setCurrentLine] = useState(1);
  const [exitStarted, setExitStarted] = useState(false);
  const [exitBgStarted, setExitBgStarted] = useState(false);
  const [unmount, setUnmount] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    // Reset sessionStorage flag on refresh/load so it plays again
    sessionStorage.removeItem('entryPlayed');

    // Auto-detect and set render mode if not initialized
    if (!renderMode) {
      const defaultMode = isMobile ? 'standard' : 'webgl';
      setRenderMode(defaultMode);
    }

    // Do NOT show on mobile if prefers-reduced-motion is set
    if (isMobile && prefersReduced) {
      setIsVisible(false);
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

    // Exit Sequence starts at 3800ms
    setTimeout(() => {
      setExitStarted(true);
      if (onExitStart) onExitStart();
    }, 3800);

    // Overlay bg fade starts at 4000ms (200ms after text fade starts)
    setTimeout(() => {
      setExitBgStarted(true);
    }, 4000);

    // Total exit completes at 4400ms (600ms total duration)
    setTimeout(() => {
      setUnmount(true);
      sessionStorage.setItem('entryPlayed', 'true');
    }, 4400);

  }, [prefersReduced, renderMode, setRenderMode, onExitStart]);

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

      {/* Typewriter Text Container */}
      <div 
        className={`font-mono font-bold text-3xl md:text-5xl text-[#faf5ff] leading-[1.6] tracking-[0.02em] text-center z-10 max-w-4xl px-6 flex flex-col items-center justify-center transition-all duration-400 ease-in ${
          exitStarted ? 'opacity-0 -translate-y-3' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="min-h-[1.6em] flex items-center justify-center">
          <span>{line1}</span>
          {currentLine === 1 && (
            <span className={`custom-cursor ${exitStarted ? '' : 'cursor-active'}`} />
          )}
        </div>
        <div className="min-h-[1.6em] flex items-center justify-center">
          <span>{line2}</span>
          {currentLine === 2 && (
            <span className={`custom-cursor ${exitStarted ? '' : 'cursor-active'}`} />
          )}
        </div>
        <div className="min-h-[1.6em] flex items-center justify-center">
          <span>{line3}</span>
          {currentLine === 3 && (
            <span className={`custom-cursor ${exitStarted ? '' : 'cursor-active'}`} />
          )}
        </div>
        <div className="min-h-[1.6em] flex items-center justify-center">
          <span>{line4}</span>
          {currentLine === 4 && (
            <span className={`custom-cursor ${exitStarted ? '' : 'cursor-active'}`} />
          )}
        </div>
      </div>
    </div>
  );
};
