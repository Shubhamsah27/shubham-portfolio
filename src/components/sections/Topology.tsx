import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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

        <div className="relative pl-8 md:pl-12">
          {/* Timeline Line */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[rgba(245,158,11,0.3)] to-[rgba(139,92,246,0.3)]"
            style={{ filter: 'drop-shadow(0 0 4px rgba(245,158,11,0.4))' }}
          />

          {categories.map((cat) => {
            const isResearch = cat.isResearch;
            const particleColor = isResearch ? '#8b5cf6' : '#f59e0b';

            return (
              <div key={cat.name} className="relative mb-20 last:mb-0">
                <FloatingParticles count={6} color={particleColor} />
                
                {/* Timeline Dot */}
                <div className={`absolute -left-[37px] md:-left-[53px] top-2 w-4 h-4 rounded-full bg-surface-base border-2 z-10 flex items-center justify-center ${isResearch ? 'border-violet shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 'border-amber shadow-[0_0_10px_rgba(245,158,11,0.5)]'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${isResearch ? 'bg-violet' : 'bg-amber'} animate-pulse-slow`} />
                </div>

                <div className="mb-8 flex items-center">
                  <div className={`font-mono font-bold text-lg tracking-wider ${isResearch ? 'text-violet' : 'text-amber'}`}>
                    //
                  </div>
                  <div className="font-mono font-bold text-lg tracking-wider text-[#faf5ff] ml-2 whitespace-nowrap">
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
                  {cat.items.map((item: any) => {
                    
                    if (item.icon) {
                      // Icon Card Upgrade
                      return (
                        <motion.div
                          key={item.name}
                          variants={itemVariants}
                          className="group relative flex items-center justify-center w-[72px] h-[72px] rounded-[12px] cursor-default transition-all duration-300"
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
                          className="group flex items-center justify-center px-4 py-2 bg-[#161318] rounded-[8px] transition-all duration-300 cursor-default"
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
                          className="group flex items-center justify-center px-5 py-3 rounded-[8px] transition-all duration-300 cursor-default"
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
                          className="group flex items-center justify-center px-4 py-2 bg-[#161318] rounded-[8px] transition-all duration-300 cursor-default"
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
