import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

// Official SVG Brand Icons
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const CodeforcesIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M4.5 7.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 10.5 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 4.5 16.5v-9zM10.5 3a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 16.5 3v13.5a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5V3zM16.5 9a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 22.5 9v7.5a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5V9z"/>
  </svg>
);

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } }
  };

  const socials = [
    { name: 'GitHub', url: 'https://github.com/Shubhamsah27', icon: GithubIcon },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shubham-sah2005/', icon: LinkedinIcon },
    { name: 'Codeforces', url: 'https://codeforces.com/profile/_shubham__sah', icon: CodeforcesIcon }
  ];

  // HERO — Cycling Role Title (Typewriter) state
  const [typedText, setTypedText] = useState('');
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const roles = [
      'BACKEND_ENGINEER',
      'SOFTWARE_ENGINEER',
      'QUANTUM_RESEARCHER',
      'COMPETITIVE_PROGRAMMER',
      'SYSTEMS_ARCHITECT'
    ];
    
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId: number;

    const tick = () => {
      const currentFullText = roles[roleIdx];
      
      if (!isDeleting) {
        // Typing phase
        setIsBlinking(false);
        setTypedText(currentFullText.slice(0, charIdx + 1));
        charIdx++;

        if (charIdx === currentFullText.length) {
          // Finished typing: start hold phase
          isDeleting = true;
          setIsBlinking(true);
          timeoutId = setTimeout(tick, 1800); // Hold for 1800ms
        } else {
          timeoutId = setTimeout(tick, 80); // 80ms per char typing
        }
      } else {
        // Deleting phase or pause
        if (charIdx === currentFullText.length) {
          // We are at the end, first char to delete:
          setIsBlinking(false);
        }
        
        setTypedText(currentFullText.slice(0, charIdx));
        charIdx--;

        if (charIdx < 0) {
          // Finished deleting: pause before typing next role
          isDeleting = false;
          charIdx = 0;
          roleIdx = (roleIdx + 1) % roles.length;
          setIsBlinking(true);
          timeoutId = setTimeout(tick, 400); // Pause 400ms before next
        } else {
          timeoutId = setTimeout(tick, 40); // 40ms per char erasing
        }
      }
    };

    tick();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[1200px] h-[1200px] bg-amber-glow blur-[160px] opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full px-6 relative z-10 flex flex-col items-start">
        
        {/* Main Panel */}
        <motion.div 
          className="w-full max-w-4xl flex flex-col justify-center items-start text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="font-mono text-text-muted text-xs md:text-sm tracking-[4px] mb-4">
            Hello! I'm
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-6 tracking-wide select-none"
          >
            <span className="text-gradient">SHUBHAM SAH</span>
          </motion.h1>

          {/* Cycling Role Title (Typewriter) */}
          <motion.div 
            variants={itemVariants} 
            className="font-mono text-lg md:text-[28px] font-bold text-amber mb-6 uppercase flex items-center min-h-[40px] select-none"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: '#f59e0b' }}
          >
            &gt;_ {typedText}
            <span className={`w-3 h-7 bg-[#f59e0b] ml-1 inline-block ${isBlinking ? 'animate-pulse' : 'opacity-100'}`} />
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="font-mono text-xs md:text-sm text-text-primary tracking-[3px] mb-8 uppercase"
          >
            Backend & Distributed Systems
          </motion.div>

          <motion.p variants={itemVariants} className="text-text-muted max-w-xl font-body mb-10 leading-relaxed">
            I engineer backend microservices that remain reliable under load,
            automate operational pipelines,
            and design quantum-safe cryptographic protocols.
          </motion.p>

          {/* Action buttons & socials */}
          <motion.div variants={itemVariants} className="flex flex-col items-start gap-6 w-full">
            <div className="flex flex-wrap gap-4">
              <a 
                href="#systems"
                className="px-6 py-3 bg-amber text-surface-base font-body font-medium hover:bg-amber/90 transition-colors"
                style={{ minHeight: '44px' }}
              >
                View Systems →
              </a>
              <a 
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-border-amber text-text-primary hover:border-amber hover:text-amber transition-colors flex items-center gap-2"
                style={{ minHeight: '44px' }}
              >
                Resume ↗
              </a>
            </div>

            {/* Social pills in Hero */}
            <div className="flex flex-wrap gap-4 mt-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a 
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-surface-card border border-white/[0.06] hover:border-amber/40 hover:text-amber rounded-lg px-4 py-2.5 text-xs text-text-muted hover:text-text-primary transition-all font-mono"
                    style={{ minHeight: '44px' }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{s.name}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
