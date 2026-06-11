import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SolarCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const trailRef = useRef<{ x: number; y: number; id: number }[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      // Check if device has touch capability
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Update trail
      trailIdRef.current += 1;
      const newDot = { x: e.clientX, y: e.clientY, id: trailIdRef.current };
      trailRef.current = [newDot, ...trailRef.current].slice(0, 10);
      setTrail(trailRef.current);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track hover over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if we're hovering over a link, button, or interactive element
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
        setIsText(false);
      } else if (
        target.tagName.toLowerCase() === 'p' ||
        target.tagName.toLowerCase() === 'span' ||
        target.tagName.toLowerCase() === 'h1' ||
        target.tagName.toLowerCase() === 'h2' ||
        target.tagName.toLowerCase() === 'h3' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea'
      ) {
        setIsText(true);
        setIsHovering(false);
      } else {
        setIsHovering(false);
        setIsText(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Initial visibility
    setIsVisible(true);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Trailing Dots */}
      {trail.map((dot, index) => (
        <div
          key={dot.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: dot.x,
            top: dot.y,
            width: '4px',
            height: '4px',
            backgroundColor: '#f59e0b',
            transform: 'translate(-50%, -50%)',
            opacity: Math.max(0, 1 - index * 0.1),
            transition: 'opacity 0.1s linear',
          }}
        />
      ))}

      {/* Core Cursor */}
      <motion.div
        className="absolute pointer-events-none flex items-center justify-center"
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
        animate={{
          x: "-50%",
          y: "-50%",
          scale: isText ? 0.5 : (isHovering ? 1.5 : 1),
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
      >
        <div 
          className={`relative rounded-full transition-all duration-300 ${
            isClicking 
              ? 'bg-white shadow-[0_0_20px_#fff,0_0_40px_rgba(255,255,255,0.6)]' 
              : 'bg-[radial-gradient(circle,#ffd700_0%,#f59e0b_50%,#d97706_100%)] shadow-[0_0_8px_#f59e0b,0_0_20px_rgba(245,158,11,0.4)]'
          } ${isText ? 'w-[6px] h-[6px]' : 'w-[12px] h-[12px]'}`}
          style={{
            animation: !isHovering && !isText ? 'cursorPulse 2s infinite' : 'none'
          }}
        >
          {/* I-beam for text */}
          <AnimatePresence>
            {isText && (
              <motion.div 
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-5 bg-amber"
              />
            )}
          </AnimatePresence>

          {/* Shockwave on click */}
          <AnimatePresence>
            {isClicking && (
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-amber"
              />
            )}
          </AnimatePresence>

          {/* Orbiting Particles (Hidden when on text) */}
          {!isText && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              {/* Particle 1 */}
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
                style={{ animation: `spin ${isHovering ? 0.9 : 1.8}s linear infinite` }}
              >
                <div 
                  className="w-[4px] h-[4px] rounded-full bg-[#f59e0b]"
                  style={{ transform: 'translateX(18px)' }}
                />
              </div>

              {/* Particle 2 */}
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
                style={{ animation: `spinReverse ${isHovering ? 1.6 : 3.2}s linear infinite` }}
              >
                <div 
                  className="w-[3px] h-[3px] rounded-full bg-[#8b5cf6]"
                  style={{ transform: 'translateX(26px)' }}
                />
              </div>

              {/* Particle 3 */}
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center"
                style={{ animation: `spin ${isHovering ? 2.5 : 5}s linear infinite` }}
              >
                <div 
                  className="w-[2px] h-[2px] rounded-full bg-amber/50"
                  style={{ transform: 'translateX(34px)' }}
                />
              </div>

              {/* Orbit Rings */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[36px] h-[36px] rounded-full border border-amber/10 border-dashed" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] rounded-full border border-amber/5 border-dashed" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[68px] h-[68px] rounded-full border border-amber/5 border-dashed" />
            </div>
          )}
        </div>

        {/* Hover Label */}
        <AnimatePresence>
          {isHovering && !isText && (
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 20 }}
              exit={{ opacity: 0, x: 0 }}
              className="absolute left-full top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] text-amber tracking-widest font-bold"
            >
              [ ENTER ]
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
