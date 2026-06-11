import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// Micro-particles component for WebGL mode
const FloatingParticles = ({ count, color }: { count: number; color: string }) => {
  const [isWebGL, setIsWebGL] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mode = sessionStorage.getItem('renderMode');
    setIsWebGL(mode === 'webgl' && !prefersReducedMotion);
  }, []);

  if (!isWebGL) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full opacity-15"
          style={{ 
            backgroundColor: color,
            left: `${Math.random() * 100}%`,
            top: `${100 + Math.random() * 20}%`
          }}
          animate={{
            y: [0, -150 - Math.random() * 100],
            opacity: [0, 0.15, 0]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

interface Pulse {
  id: string;
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
  duration: number;
  delay: number;
  createdAt: number;
}

export const Topology = () => {
  const categories = [
    {
      name: 'Languages',
      accent: 'amber',
      items: [
        { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg', color: '#00599C' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', color: '#3776AB' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', color: '#F7DF1E' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', color: '#3178C6' },
      ]
    },
    {
      name: 'Backend Services',
      accent: 'amber',
      items: [
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', color: '#339933' },
        { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', invert: true, color: '#ffffff' },
        { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg', color: '#009688' },
        { name: 'WebSockets', type: 'text' }
      ]
    },
    {
      name: 'Infrastructure',
      accent: 'amber',
      items: [
        { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg', color: '#FCC624' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', color: '#2496ED' },
        { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg', color: '#DC382D' }
      ]
    },
    {
      name: 'Dev Tools',
      accent: 'amber',
      items: [
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', color: '#F05032' },
        { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', invert: true, color: '#ffffff' },
        { name: 'GitLab', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg', color: '#FCA121' },
        { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg', color: '#FF6C37' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', color: '#47A248' },
        { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg', color: '#007ACC' },
        { name: 'Neovim', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/neovim/neovim-original.svg', color: '#57A143' },
        { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', invert: true, color: '#ffffff' },
        { name: 'Cloudinary', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/cloudinary.svg', simple: true, color: '#3448C5' },
        { name: 'Chart.js', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/chartdotjs.svg', simple: true, color: '#FF6384' },
        { name: 'Bash', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg', color: '#4EAA25' }
      ]
    },
    {
      name: 'CS Fundamentals',
      accent: 'amber',
      isTextOnly: true,
      items: [
        { name: 'Data Structures' }, { name: 'Algorithms' }, { name: 'Operating Systems' },
        { name: 'Computer Networks' }, { name: 'DBMS' }, { name: 'OOP' }, { name: 'Distributed Systems' }
      ]
    },
    {
      name: 'Cryptography',
      accent: 'violet',
      isResearch: true,
      items: [
        { name: 'Zero Knowledge Proofs' }, { name: 'Post-Quantum Cryptography' },
        { name: 'Lattice Cryptography' }, { name: 'Blockchain Security' }
      ]
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [coords, setCoords] = useState<{
    dots: { [key: number]: { x: number; y: number } };
    cards: { [key: string]: { x: number; y: number } };
  }>({ dots: {}, cards: {} });

  const getNodeCoordinates = () => {
    if (!containerRef.current) return { dots: {}, cards: {} };
    const containerRect = containerRef.current.getBoundingClientRect();
    const dots: { [key: number]: { x: number; y: number } } = {};
    const cards: { [key: string]: { x: number; y: number } } = {};

    const elements = containerRef.current.querySelectorAll('[data-constellation-node]');
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const x = rect.left + rect.width / 2 - containerRect.left;
      const y = rect.top + rect.height / 2 - containerRect.top;
      
      const type = el.getAttribute('data-node-type');
      const catIdxStr = el.getAttribute('data-cat-idx');
      const itemIdxStr = el.getAttribute('data-item-idx');
      
      if (catIdxStr !== null) {
        const catIdx = parseInt(catIdxStr, 10);
        if (type === 'dot') {
          dots[catIdx] = { x, y };
        } else if (type === 'card' && itemIdxStr !== null) {
          cards[`${catIdx}-${itemIdxStr}`] = { x, y };
        }
      }
    });

    return { dots, cards };
  };

  const updateCoords = () => {
    setCoords(getNodeCoordinates());
  };

  useEffect(() => {
    updateCoords();
    window.addEventListener('resize', updateCoords);
    const timer = setTimeout(updateCoords, 600);
    return () => {
      window.removeEventListener('resize', updateCoords);
      clearTimeout(timer);
    };
  }, []);

  // Cleanup completed pulses to prevent memory leak
  useEffect(() => {
    if (pulses.length === 0) return;
    const interval = setInterval(() => {
      const now = Date.now();
      setPulses((prev) =>
        prev.filter((p) => now - p.createdAt < (p.delay + p.duration) * 1000 + 200)
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [pulses]);

  const propagateAlongTimeline = (
    centerIdx: number,
    initialDelay: number,
    currentCoords: typeof coords,
    newPulses: Pulse[],
    makeId: () => string
  ) => {
    const numCategories = categories.length;

    // Upwards propagation
    let delayUp = initialDelay;
    for (let i = centerIdx; i > 0; i--) {
      const fromDot = currentCoords.dots[i];
      const toDot = currentCoords.dots[i - 1];
      if (fromDot && toDot) {
        const stepColor = i - 1 === 5 ? '#8b5cf6' : '#f59e0b';
        newPulses.push({
          id: makeId(),
          from: fromDot,
          to: toDot,
          color: stepColor,
          duration: 1.2,
          delay: delayUp,
          createdAt: Date.now(),
        });
        
        const destCatIdx = i - 1;
        delayUp += 1.2;
        
        Object.keys(currentCoords.cards).forEach((key) => {
          if (key.startsWith(`${destCatIdx}-`)) {
            const cardPos = currentCoords.cards[key];
            if (cardPos) {
              newPulses.push({
                id: makeId(),
                from: toDot,
                to: cardPos,
                color: stepColor,
                duration: 1.2,
                delay: delayUp,
                createdAt: Date.now(),
              });
            }
          }
        });
      }
    }

    // Downwards propagation
    let delayDown = initialDelay;
    for (let i = centerIdx; i < numCategories - 1; i++) {
      const fromDot = currentCoords.dots[i];
      const toDot = currentCoords.dots[i + 1];
      if (fromDot && toDot) {
        const stepColor = i + 1 === 5 ? '#8b5cf6' : '#f59e0b';
        newPulses.push({
          id: makeId(),
          from: fromDot,
          to: toDot,
          color: stepColor,
          duration: 1.2,
          delay: delayDown,
          createdAt: Date.now(),
        });

        const destCatIdx = i + 1;
        delayDown += 1.2;

        Object.keys(currentCoords.cards).forEach((key) => {
          if (key.startsWith(`${destCatIdx}-`)) {
            const cardPos = currentCoords.cards[key];
            if (cardPos) {
              newPulses.push({
                id: makeId(),
                from: toDot,
                to: cardPos,
                color: stepColor,
                duration: 1.2,
                delay: delayDown,
                createdAt: Date.now(),
              });
            }
          }
        });
      }
    }
  };

  const triggerChainReaction = (startCatIdx: number, startItemIdx?: number) => {
    // Get fresh coordinates at the time of click
    const currentCoords = getNodeCoordinates();
    setCoords(currentCoords);
    const newPulses: Pulse[] = [];
    const pulseColor = startCatIdx === 5 ? '#8b5cf6' : '#f59e0b';

    const makeId = () => Math.random().toString(36).substring(2, 9);

    if (startItemIdx !== undefined) {
      const cardKey = `${startCatIdx}-${startItemIdx}`;
      const startPos = currentCoords.cards[cardKey];
      const dotPos = currentCoords.dots[startCatIdx];

      if (startPos && dotPos) {
        // Step 1: Card to Dot
        newPulses.push({
          id: makeId(),
          from: startPos,
          to: dotPos,
          color: pulseColor,
          duration: 1.2,
          delay: 0,
          createdAt: Date.now(),
        });

        // Step 2: Dot to all other cards in same category
        Object.keys(currentCoords.cards).forEach((key) => {
          if (key.startsWith(`${startCatIdx}-`) && key !== cardKey) {
            const targetCardPos = currentCoords.cards[key];
            if (targetCardPos) {
              newPulses.push({
                id: makeId(),
                from: dotPos,
                to: targetCardPos,
                color: pulseColor,
                duration: 1.2,
                delay: 1.2,
                createdAt: Date.now(),
              });
            }
          }
        });

        // Step 3: Propagate along timeline
        propagateAlongTimeline(startCatIdx, 1.2, currentCoords, newPulses, makeId);
      }
    } else {
      const dotPos = currentCoords.dots[startCatIdx];
      if (dotPos) {
        // Step 1: Dot to all cards in this category
        Object.keys(currentCoords.cards).forEach((key) => {
          if (key.startsWith(`${startCatIdx}-`)) {
            const targetCardPos = currentCoords.cards[key];
            if (targetCardPos) {
              newPulses.push({
                id: makeId(),
                from: dotPos,
                to: targetCardPos,
                color: pulseColor,
                duration: 1.2,
                delay: 0,
                createdAt: Date.now(),
              });
            }
          }
        });

        // Step 2: Propagate along timeline
        propagateAlongTimeline(startCatIdx, 0, currentCoords, newPulses, makeId);
      }
    }

    setPulses((prev) => [...prev, ...newPulses]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' as const }
    }
  };

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute top-0 right-0 font-display font-extrabold text-[20vw] leading-none opacity-[0.03] text-white pointer-events-none select-none">
        04
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.h2 
          className="font-display font-bold text-3xl md:text-4xl mb-24 tracking-tight uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Technology Stack
        </motion.h2>

        <div ref={containerRef} className="relative pl-8 md:pl-12">
          {/* SVG Constellation Connections Layer */}
          <svg className="absolute inset-0 pointer-events-none w-full h-full z-30 overflow-visible">
            {/* Timeline Dots Connections */}
            {categories.map((_, idx) => {
              if (idx === categories.length - 1) return null;
              const from = coords.dots[idx];
              const to = coords.dots[idx + 1];
              if (!from || !to) return null;
              const isViolet = idx >= 4;
              return (
                <line
                  key={`timeline-line-${idx}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={isViolet ? "rgba(139, 92, 246, 0.15)" : "rgba(245, 158, 11, 0.15)"}
                  strokeWidth={1.5}
                />
              );
            })}

            {/* Dot to Card Connections */}
            {categories.map((cat, catIdx) => {
              const dot = coords.dots[catIdx];
              if (!dot) return null;
              return cat.items.map((_, itemIdx) => {
                const card = coords.cards[`${catIdx}-${itemIdx}`];
                if (!card) return null;
                return (
                  <line
                    key={`card-line-${catIdx}-${itemIdx}`}
                    x1={dot.x}
                    y1={dot.y}
                    x2={card.x}
                    y2={card.y}
                    stroke={cat.isResearch ? "rgba(139, 92, 246, 0.1)" : "rgba(245, 158, 11, 0.1)"}
                    strokeWidth={1}
                    strokeDasharray="4 4"
                  />
                );
              });
            })}

            {/* Animated Pulses Layer */}
            {pulses.map((pulse) => (
              <g key={pulse.id}>
                {/* Glowing line segment */}
                <motion.line
                  x1={pulse.from.x}
                  y1={pulse.from.y}
                  x2={pulse.to.x}
                  y2={pulse.to.y}
                  stroke={pulse.color}
                  strokeWidth={2}
                  initial={{ pathLength: 0, opacity: 0.8 }}
                  animate={{ pathLength: 1, opacity: [0.8, 1, 0] }}
                  transition={{
                    duration: pulse.duration,
                    delay: pulse.delay,
                    ease: "easeInOut"
                  }}
                />
                {/* Traveling node particle */}
                <motion.circle
                  r={4}
                  fill={pulse.color}
                  style={{
                    filter: `drop-shadow(0 0 6px ${pulse.color})`
                  }}
                  initial={{ cx: pulse.from.x, cy: pulse.from.y, opacity: 0 }}
                  animate={{ 
                    cx: [pulse.from.x, pulse.to.x], 
                    cy: [pulse.from.y, pulse.to.y],
                    opacity: [0, 1, 1, 0] 
                  }}
                  transition={{
                    duration: pulse.duration,
                    delay: pulse.delay,
                    ease: "easeInOut"
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Timeline Line (Visual Backdrop fallback) */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[rgba(245,158,11,0.1)] to-[rgba(139,92,246,0.1)] pointer-events-none"
          />

          {categories.map((cat, catIdx) => {
            const isResearch = cat.isResearch;
            const particleColor = isResearch ? '#8b5cf6' : '#f59e0b';

            return (
              <div key={cat.name} className="relative mb-20 last:mb-0">
                <FloatingParticles count={6} color={particleColor} />
                
                {/* Timeline Dot */}
                <div 
                  data-constellation-node
                  data-node-type="dot"
                  data-cat-idx={catIdx}
                  onClick={() => triggerChainReaction(catIdx)}
                  className={`absolute -left-[37px] md:-left-[53px] top-2 w-4 h-4 rounded-full bg-surface-base border-2 z-10 flex items-center justify-center cursor-pointer hover:scale-125 transition-transform duration-200 ${isResearch ? 'border-violet shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 'border-amber shadow-[0_0_10px_rgba(245,158,11,0.5)]'}`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${isResearch ? 'bg-violet' : 'bg-amber'} animate-pulse-slow`} />
                </div>

                <div className="mb-8 flex items-center">
                  <div className="font-mono font-bold text-lg tracking-wider text-[#faf5ff] whitespace-nowrap">
                    {cat.name}
                  </div>
                  {/* Fading line to the right */}
                  <div className={`ml-6 h-[1px] w-full max-w-[200px] bg-gradient-to-r ${isResearch ? 'from-[rgba(139,92,246,0.3)]' : 'from-[rgba(245,158,11,0.3)]'} to-transparent`} />
                </div>
                
                <motion.div 
                  className="flex flex-wrap gap-4 relative z-10"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {cat.items.map((item: any, itemIdx: number) => {
                    
                    if (item.icon) {
                      // Icon Card Upgrade
                      return (
                        <motion.div
                          key={item.name}
                          variants={itemVariants}
                          data-constellation-node
                          data-node-type="card"
                          data-cat-idx={catIdx}
                          data-item-idx={itemIdx}
                          onClick={() => triggerChainReaction(catIdx, itemIdx)}
                          className="group relative flex items-center justify-center w-[72px] h-[72px] rounded-[12px] cursor-pointer transition-all duration-300"
                          style={{ 
                            background: 'linear-gradient(135deg, #161318 0%, #1a1520 100%)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                            ['--brand-color' as string]: item.color || '#f59e0b',
                            ['--brand-color-rgb' as string]: item.color 
                              ? `${parseInt(item.color.slice(1,3),16)}, ${parseInt(item.color.slice(3,5),16)}, ${parseInt(item.color.slice(5,7),16)}`
                              : '245, 158, 11'
                          }}
                        >
                          <style>{`
                            .group:hover {
                              transform: translateY(-8px) scale(1.08);
                              border-color: rgba(var(--brand-color-rgb), 0.6) !important;
                              box-shadow: 0 0 24px rgba(var(--brand-color-rgb), 0.3), 0 12px 40px rgba(0,0,0,0.5) !important;
                            }
                            .group:hover .bg-radial-glow {
                              opacity: 0.08;
                            }
                            .group:hover .logo-img {
                              opacity: 1 !important;
                              filter: saturate(1) !important;
                            }
                            ${item.invert || item.simple ? `
                              .group:hover .logo-img.invert { filter: saturate(1) invert(1) !important; }
                            ` : ''}
                          `}</style>

                          <div 
                            className="bg-radial-glow absolute inset-0 rounded-[12px] opacity-0 transition-opacity duration-300 pointer-events-none"
                            style={{ background: `radial-gradient(circle at center, var(--brand-color) 0%, transparent 70%)` }}
                          />

                          <img 
                            src={item.icon} 
                            alt={item.name} 
                            className={`logo-img w-9 h-9 object-contain opacity-75 saturate-[0.8] transition-all duration-300 relative z-10 ${item.invert || item.simple ? 'invert opacity-50 saturate-0' : ''}`}
                          />

                          {/* Tooltip */}
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap font-mono text-xs text-text-primary bg-surface-base border border-border-amber px-2 py-1 rounded z-20">
                            {item.name}
                          </div>
                        </motion.div>
                      );
                    } else if (cat.isTextOnly) {
                      // CS Fundamentals (Monospace, muted, amber hover)
                      return (
                        <motion.div
                          key={item.name}
                          variants={itemVariants}
                          data-constellation-node
                          data-node-type="card"
                          data-cat-idx={catIdx}
                          data-item-idx={itemIdx}
                          onClick={() => triggerChainReaction(catIdx, itemIdx)}
                          className="group flex items-center justify-center px-4 py-2 bg-[#161318] rounded-[8px] transition-all duration-300 cursor-pointer"
                          style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                        >
                          <span className="font-mono text-xs text-text-muted group-hover:text-amber transition-colors duration-300">
                            {item.name}
                          </span>
                          <style>{`
                            .group:hover {
                              transform: translateY(-4px);
                              border-color: rgba(245, 158, 11, 0.3) !important;
                            }
                          `}</style>
                        </motion.div>
                      );
                    } else if (cat.isResearch) {
                      // Cryptography Chips
                      return (
                        <motion.div
                          key={item.name}
                          variants={itemVariants}
                          data-constellation-node
                          data-node-type="card"
                          data-cat-idx={catIdx}
                          data-item-idx={itemIdx}
                          onClick={() => triggerChainReaction(catIdx, itemIdx)}
                          className="group flex items-center justify-center px-5 py-3 rounded-[8px] transition-all duration-300 cursor-pointer"
                          style={{ 
                            background: 'rgba(139, 92, 246, 0.06)',
                            border: '1px solid rgba(139, 92, 246, 0.4)'
                          }}
                        >
                          <span className="font-body font-medium text-sm text-[#faf5ff] transition-colors duration-300 group-hover:text-violet">
                            {item.name}
                          </span>
                          <style>{`
                            .group:hover {
                              transform: translateY(-4px) scale(1.05);
                              box-shadow: 0 0 20px rgba(139, 92, 246, 0.3), 0 8px 30px rgba(0,0,0,0.4);
                            }
                          `}</style>
                        </motion.div>
                      );
                    } else {
                      // General Text Chip fallback (e.g. WebSockets)
                      return (
                        <motion.div
                          key={item.name}
                          variants={itemVariants}
                          data-constellation-node
                          data-node-type="card"
                          data-cat-idx={catIdx}
                          data-item-idx={itemIdx}
                          onClick={() => triggerChainReaction(catIdx, itemIdx)}
                          className="group flex items-center justify-center px-4 py-2 bg-[#161318] rounded-[8px] transition-all duration-300 cursor-pointer"
                          style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                        >
                          <span className="font-mono text-xs text-text-primary group-hover:text-amber transition-colors duration-300">
                            {item.name}
                          </span>
                          <style>{`
                            .group:hover {
                              transform: translateY(-4px);
                              border-color: rgba(245, 158, 11, 0.3) !important;
                            }
                          `}</style>
                        </motion.div>
                      );
                    }
                  })}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

