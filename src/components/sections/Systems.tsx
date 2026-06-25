import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedArchitecture } from '../visualizations/AnimatedArchitecture';
import { useStore } from '../../store/useStore';

export const Systems = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const setActiveProjectIndex = useStore((state) => state.setActiveProjectIndex);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setActiveProjectIndex(currentIndex);
  }, [currentIndex, setActiveProjectIndex]);

  const projects = [
    {
      id: 1,
      type: 'featured',
      badge: 'SYSTEM',
      name: 'Remote Browser Control System',
      desc: 'A distributed architecture enabling low-latency remote control of headless Chromium instances over WebSockets.',
      metrics: ['<50ms Latency', '30 FPS', 'WebSocket Transport', 'CDP Controlled'],
      stack: ['Node.js', 'Redis', 'WebSockets', 'C++'],
      github: 'https://github.com/Shubhamsah27/remote-browser-control',
      live: 'http://65.2.153.220/',
      image: '/projects/remote-browser.png'
    },
    {
      id: 2,
      type: 'standard',
      badge: 'SYSTEM',
      name: 'PulseAPI Deployment Pipeline',
      desc: 'Self-reporting deployment service and health monitoring pipeline providing automated build triggers, heartbeat checks, and real-time operational telemetry.',
      metrics: ['Heartbeat Check', 'Real-time Metrics', 'Self-Reporting UI', 'ZeroDeploy Integration'],
      stack: ['Python', 'FastAPI', 'Docker', 'WebSockets', 'Render'],
      github: 'https://github.com/Shubhamsah27/Automated_Deployment',
      live: 'https://pulseapi-zu03.onrender.com/',
      image: '/projects/automated-deployment.png',
      terminalLogs: [
        { className: 'text-text-muted/50 text-xs mb-2', text: '> initializing zerodeploy pipeline...' },
        { className: 'text-amber/70 text-xs mb-2', text: '> loading config from main branch [OK]' },
        { className: 'text-amber/70 text-xs mb-2', text: '> running automated health check...' },
        { className: 'text-amber/70 text-xs mb-2', text: '> health status check: 200 OK [OK]' },
        { className: 'text-[#faf5ff] text-xs', text: '> pulse telemetry online', cursor: true }
      ]
    },
    {
      id: 3,
      type: 'standard',
      badge: 'WEB',
      name: 'Carbon Ingestion & Review Ledger',
      desc: 'High-throughput data ingestion pipeline handling millions of events for carbon tracking and verification.',
      metrics: ['50% Faster Loads', 'High Throughput', 'REST Architecture'],
      stack: ['Django', 'React', 'SQLite', 'REST APIs'],
      github: 'https://github.com/Shubhamsah27/breathe-esg-assignment',
      live: 'https://breathe-esg-frontend.onrender.com/',
      api: 'https://breathe-esg-backend-u610.onrender.com/',
      image: '/projects/carbon-ledger.png'
    },
    {
      id: 4,
      type: 'standard',
      badge: 'BACKEND',
      name: 'Personal Finance Manager API',
      desc: 'Enterprise-grade financial backend — Spring Boot, session auth, multi-user data isolation, savings analytics, reporting workflows.',
      metrics: ['25+ Tests', 'Session Auth', '100% Service Coverage', 'Financial Analytics'],
      stack: ['Java', 'Spring Boot', 'Spring Security', 'JPA', 'H2', 'Docker'],
      github: 'https://github.com/Shubhamsah27/personal-finance-manager',
      live: 'https://personal-finance-manager-ztbc.onrender.com/',
      image: '/projects/personal-finance.png',
      terminalLogs: [
        { className: 'text-text-muted/50 text-xs mb-2', text: '> booting finance management services...' },
        { className: 'text-amber/70 text-xs mb-2', text: '> loading security context [OK]' },
        { className: 'text-amber/70 text-xs mb-2', text: '> initializing transaction engine [OK]' },
        { className: 'text-amber/70 text-xs mb-2', text: '> session isolation enabled [OK]' },
        { className: 'text-[#faf5ff] text-xs', text: '> analytics pipeline online', cursor: true }
      ]
    },
    {
      id: 5,
      type: 'standard',
      badge: 'WEB',
      name: 'HFT Landing Page',
      desc: 'A high-fidelity landing page for a High-Frequency Trading platform, featuring responsive layouts and smooth animations.',
      metrics: ['Responsive Design', 'Amplify Hosted', 'Animations'],
      stack: ['React', 'CSS', 'Framer Motion'],
      github: 'https://github.com/Shubhamsah27/HFT-Landing-Page',
      live: 'https://main.d1yuxj39z40zcr.amplifyapp.com/',
      image: '/projects/hft.png',
      terminalLogs: [
        { className: 'text-text-muted/50 text-xs mb-2', text: '> deploying high-frequency trading interface...' },
        { className: 'text-amber/70 text-xs mb-2', text: '> checking order book streams [OK]' },
        { className: 'text-[#faf5ff] text-xs', text: '> trade engine UI online', cursor: true }
      ]
    },
    {
      id: 6,
      type: 'standard',
      badge: 'WEB',
      name: 'Interior Design Landing Page',
      desc: 'A modern, visually stunning landing page for an interior design studio showcasing project portfolios.',
      metrics: ['Modern Aesthetic', 'Responsive Layout', 'Amplify Hosted'],
      stack: ['React', 'CSS', 'Vite'],
      github: 'https://github.com/Shubhamsah27/Interior-Design-Landing-Page',
      live: 'https://main.d3tsvxzs0a7a5s.amplifyapp.com/',
      image: '/projects/interior.png',
      terminalLogs: [
        { className: 'text-text-muted/50 text-xs mb-2', text: '> rendering architectural designs...' },
        { className: 'text-amber/70 text-xs mb-2', text: '> asset pipeline loading [OK]' },
        { className: 'text-[#faf5ff] text-xs', text: '> portfolio grid active', cursor: true }
      ]
    },
    {
      id: 7,
      type: 'standard',
      badge: 'WEB',
      name: 'Law Firm Landing Page',
      desc: 'A professional and clean landing page designed for law firms, with client intake forms and service sections.',
      metrics: ['Professional Design', 'Intake Forms', 'Render Hosted'],
      stack: ['React', 'CSS', 'Render'],
      github: 'https://github.com/Shubhamsah27/Law-Firm-Landing-page',
      live: 'https://law-firm-template-qtuy.onrender.com/',
      image: '/projects/law-firm.png',
      terminalLogs: [
        { className: 'text-text-muted/50 text-xs mb-2', text: '> connecting secure legal portal...' },
        { className: 'text-amber/70 text-xs mb-2', text: '> verification handshake established [OK]' },
        { className: 'text-[#faf5ff] text-xs', text: '> client portal operational', cursor: true }
      ]
    },
    {
      id: 8,
      type: 'standard',
      badge: 'RESEARCH',
      name: 'Quantum-Safe Encryption Platform',
      desc: 'Experimental platform implementing lattice-based cryptography for secure message transmission.',
      metrics: ['Lattice-based ZKP', 'Quantum-Resistant'],
      stack: ['Python', 'C++', 'Lattice Systems'],
      github: 'https://github.com/Shubhamsah27/Quantum-safe-ZKP-batch-verification',
      live: '#'
    },
    {
      id: 9,
      type: 'standard',
      badge: 'SYSTEM',
      name: 'MineOps Dashboard',
      desc: 'Real-time telemetry and operational dashboard for remote monitoring of mining infrastructure.',
      metrics: ['Real-time Telemetry', 'Low Latency', 'WebSocket Streaming'],
      stack: ['React', 'WebSocket', 'Express'],
      github: '#',
      live: '#'
    }
  ];

  const paginate = (newDirection: number) => {
    const nextIndex = currentIndex + newDirection;
    if (nextIndex >= 0 && nextIndex < projects.length) {
      setDirection(newDirection);
      setCurrentIndex(nextIndex);
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const getCardStyle = (index: number) => {
    if (isMobile) {
      return index === currentIndex 
        ? { x: 0, scale: 1, opacity: 1, zIndex: 10, filter: 'blur(0px)' } 
        : { x: index > currentIndex ? 300 : -300, scale: 0.8, opacity: 0, zIndex: 0, filter: 'blur(8px)' };
    }

    const diff = index - currentIndex;
    if (diff === 0) {
      return { x: 0, scale: 1, opacity: 1, zIndex: 10, filter: 'blur(0px)' };
    } else if (diff < 0) {
      return { x: -340, scale: 0.75, opacity: 0.25, zIndex: 5, filter: 'blur(4px)' };
    } else {
      return { x: 340, scale: 0.75, opacity: 0.25, zIndex: 5, filter: 'blur(4px)' };
    }
  };

  return (
    <section id="systems" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 right-0 font-display font-extrabold text-[20vw] leading-none opacity-[0.03] text-white pointer-events-none select-none">
        02
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        <motion.h2 
          className="font-display font-bold text-3xl md:text-4xl mb-16 tracking-tight uppercase self-start lg:ml-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Systems I Have Built
        </motion.h2>

        {/* Carousel Container */}
        <div className="relative w-full h-[600px] flex items-center justify-center perspective-[1000px]">
          <AnimatePresence initial={false} custom={direction}>
            {projects.map((project, index) => {
              const isCenter = index === currentIndex;
              const style = getCardStyle(index);

              return (
                <motion.div
                  key={project.id}
                  className="absolute w-full max-w-4xl cursor-grab active:cursor-grabbing"
                  initial={style}
                  animate={style}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(_, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) paginate(1);
                    else if (swipe > swipeConfidenceThreshold) paginate(-1);
                  }}
                  style={{
                    pointerEvents: isCenter ? 'auto' : 'none'
                  }}
                >
                  <div 
                    className={`bg-[#161318] rounded-[16px] border border-[rgba(245,158,11,0.15)] overflow-hidden transition-shadow duration-400 ${isCenter ? 'shadow-[0_0_60px_rgba(245,158,11,0.15)]' : 'shadow-none'}`}
                  >
                    {project.type === 'featured' ? (
                      // Featured Layout (Split)
                      <div className="flex flex-col lg:flex-row h-full min-h-[500px]">
                        <div className="w-full lg:w-1/2 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[rgba(245,158,11,0.15)] flex flex-col justify-center">
                          <div className="font-mono text-amber text-xs mb-4">
                            [{project.badge}]
                          </div>
                          <h3 className="font-display font-bold text-3xl md:text-4xl mb-4 text-text-primary">
                            {project.name.split(' ').slice(0,2).join(' ')}<br/>
                            {project.name.split(' ').slice(2).join(' ')}
                          </h3>
                          <p className="text-text-muted font-body mb-8 max-w-md text-sm md:text-base">
                            {project.desc}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.metrics?.map(m => (
                              <span key={m} className="px-2 md:px-3 py-1 bg-surface-base border border-amber/20 text-amber font-mono text-[10px] md:text-xs">
                                {m}
                              </span>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-3 font-mono text-xs text-text-muted mb-8">
                            {project.stack.map(s => <span key={s}>[{s}]</span>)}
                          </div>

                          <div className="flex gap-4 mt-auto">
                            {project.github && project.github !== '#' && (
                              <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-4 md:px-6 py-2 md:py-3 border border-amber text-amber font-mono text-xs md:text-sm hover:bg-amber/10 transition-colors">
                                {'> GITHUB'}
                              </a>
                            )}
                            {project.live && project.live !== '#' && (
                              <a href={project.live} target="_blank" rel="noopener noreferrer" className="px-4 md:px-6 py-2 md:py-3 border border-border-amber text-text-muted font-mono text-xs md:text-sm hover:text-amber transition-colors">
                                {'> LIVE'}
                              </a>
                            )}
                            {(project as any).api && (
                              <a href={(project as any).api} target="_blank" rel="noopener noreferrer" className="px-4 md:px-6 py-2 md:py-3 border border-border-amber text-text-muted font-mono text-xs md:text-sm hover:text-amber transition-colors">
                                {'> API'}
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="w-full lg:w-1/2 bg-surface-base flex items-center justify-center p-6 min-h-[300px] lg:min-h-auto relative overflow-hidden group/img-container">
                          {(project as any).image ? (
                            <div className="w-full h-full max-h-[380px] rounded-lg border border-[rgba(245,158,11,0.2)] shadow-[0_0_30px_rgba(245,158,11,0.15)] overflow-hidden relative">
                              <img 
                                src={(project as any).image} 
                                alt={project.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover/img-container:scale-105"
                              />
                            </div>
                          ) : (
                            <AnimatedArchitecture />
                          )}
                        </div>
                      </div>
                    ) : (
                      // Standard Layout
                      <div className="p-8 md:p-12 flex flex-col h-full min-h-[500px]">
                        <div className="flex items-center justify-between mb-6">
                          <div className={`font-mono text-xs ${project.badge === 'RESEARCH' ? 'text-violet' : 'text-amber'}`}>
                            [{project.badge}]
                          </div>
                        </div>
                        
                        {/* Project Visual / Screenshot / Terminal */}
                        {(project as any).image ? (
                          <div className="w-full h-48 bg-[#080608] rounded-lg border border-[rgba(255,255,255,0.05)] relative overflow-hidden mb-8 group/img-container">
                            {/* Window Top Bar */}
                            <div className="absolute top-0 left-0 right-0 h-6 bg-[#161318]/90 border-b border-[rgba(255,255,255,0.05)] flex items-center gap-1.5 px-3 z-20">
                              <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                              <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                              <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                              <span className="font-mono text-[9px] text-text-muted/50 ml-2">localhost:3000</span>
                            </div>
                            <img 
                              src={(project as any).image} 
                              alt={project.name}
                              className="w-full h-full object-cover object-top pt-6 transition-transform duration-500 group-hover/img-container:scale-105"
                            />
                          </div>
                        ) : (
                          /* Terminal Mockup */
                          <div className="w-full h-48 bg-[#080608] rounded-lg border border-[rgba(255,255,255,0.05)] relative overflow-hidden font-mono p-4 flex flex-col justify-end mb-8 group">
                            {/* Scanlines */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10 opacity-30 group-hover:opacity-10 transition-opacity" />
                            
                            {(project as any).terminalLogs ? (project as any).terminalLogs.map((log: any, idx: number) => (
                              <div key={idx} className={log.className}>
                                {log.text}
                                {log.cursor && <span className="animate-pulse-fast"> _</span>}
                              </div>
                            )) : (
                              <>
                                <div className="text-text-muted/50 text-xs mb-2">&gt; initializing sequence for {project.name.toLowerCase()}...</div>
                                <div className="text-amber/70 text-xs mb-2">&gt; building distributed graph nodes [OK]</div>
                                <div className="text-[#faf5ff] text-xs">&gt; system online <span className="animate-pulse-fast">_</span></div>
                              </>
                            )}
                          </div>
                        )}

                        <h3 className="font-display font-bold text-2xl md:text-3xl mb-4 text-text-primary">
                          {project.name}
                        </h3>
                        <p className="text-text-muted font-body mb-6 text-sm md:text-base flex-1">
                          {project.desc}
                        </p>

                        {project.metrics && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.metrics.map(m => (
                              <span key={m} className="px-2 md:px-3 py-1 bg-surface-base border border-amber/20 text-amber font-mono text-[10px] md:text-xs">
                                {m}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-3 font-mono text-xs text-text-muted mb-8">
                          {project.stack.map(s => <span key={s}>[{s}]</span>)}
                        </div>

                        <div className="flex gap-4 mt-auto">
                          {project.github && project.github !== '#' && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-4 md:px-6 py-2 md:py-3 border border-amber text-amber font-mono text-xs hover:bg-amber/10 transition-colors">
                              {'> GITHUB'}
                            </a>
                          )}
                          {project.live && project.live !== '#' && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="px-4 md:px-6 py-2 md:py-3 border border-border-amber text-text-muted font-mono text-xs hover:text-amber transition-colors">
                              {'> LIVE'}
                            </a>
                          )}
                          {(project as any).api && (
                            <a href={(project as any).api} target="_blank" rel="noopener noreferrer" className="px-4 md:px-6 py-2 md:py-3 border border-border-amber text-text-muted font-mono text-xs hover:text-amber transition-colors">
                              {'> API'}
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Carousel Navigation */}
        <div className="mt-12 flex items-center bg-[#161318] rounded-full border border-border-amber p-2 shadow-lg">
          <button 
            onClick={() => paginate(-1)}
            disabled={currentIndex === 0}
            className="p-2 text-text-muted hover:text-amber disabled:opacity-30 disabled:hover:text-text-muted transition-colors rounded-full"
            aria-label="Previous project"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex items-center gap-3 px-4">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${i === currentIndex ? 'bg-amber' : 'bg-surface-card border border-border-amber'}`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={() => paginate(1)}
            disabled={currentIndex === projects.length - 1}
            className="p-2 text-text-muted hover:text-amber disabled:opacity-30 disabled:hover:text-text-muted transition-colors rounded-full"
            aria-label="Next project"
          >
            <ChevronRight size={24} />
          </button>
        </div>

      </div>
    </section>
  );
};
