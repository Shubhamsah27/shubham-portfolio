import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = ['SYSTEMS', 'EXPERIENCE', 'RESEARCH', 'ACHIEVEMENTS', 'CONTACT'];

export const Navigation = () => {
  const [time, setTime] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simple scroll spy setup
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => item.toLowerCase());
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
            break;
          }
        }
      }
      
      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 glass-panel z-50 px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="font-display font-extrabold text-2xl text-amber shrink-0 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          S/
        </div>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-body text-sm text-text-muted">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`relative py-2 hover:text-amber transition-colors ${isActive ? 'text-amber' : ''}`}
              >
                {item}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 bottom-0 h-[1px] bg-amber"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Clock (Desktop) */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <span className="font-mono text-sm text-text-muted">{time}</span>
          <div className="w-2 h-2 rounded-full bg-amber animate-pulse-fast" />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-text-muted hover:text-text-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-surface-base border-l border-border-amber md:hidden flex flex-col"
          >
            <div className="h-16 px-6 flex items-center justify-end border-b border-border-amber">
              <button
                className="p-2 text-text-muted hover:text-text-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col p-8 gap-6">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-left font-body text-xl text-text-muted hover:text-amber transition-colors py-2"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
