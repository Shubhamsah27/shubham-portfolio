import { useState, useEffect, useRef } from 'react';
import { Menu, X, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

const NAV_ITEMS = ['HOME', 'SKILLS', 'SYSTEMS', 'EXPERIENCE', 'RESEARCH', 'CONTACT'];

const TRACKS = [
  { artist: 'Travis Scott', title: 'FEIN', src: '/audio/fein.mp3', duration: '3:12', gradient: 'from-[#ff2d55] to-[#5856d6]' },
  { artist: 'Markul & GSPD', title: 'Lose My Mind (F1 edit)', src: '/audio/lose-my-mind.mp3', duration: '2:45', gradient: 'from-[#ff9500] to-[#ffcc00]' },
  { artist: 'The Weeknd ft. Playboi Carti', title: 'Timeless', src: '/audio/timeless.mp3', duration: '3:24', gradient: 'from-[#4cd964] to-[#5ac8fa]' }
];

export const Navigation = () => {
  const [time, setTime] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useStore((state) => state.activeSection);
  const setActiveSection = useStore((state) => state.setActiveSection);

  // Music Player Zustand State
  const isPlaying = useStore((state) => state.isPlaying);
  const setIsPlaying = useStore((state) => state.setIsPlaying);
  const currentTrack = useStore((state) => state.currentTrack);
  const setCurrentTrack = useStore((state) => state.setCurrentTrack);
  const volume = useStore((state) => state.volume);
  const setVolume = useStore((state) => state.setVolume);
  const triggerStarfieldPulse = useStore((state) => state.triggerStarfieldPulse);

  // UI state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobilePlayerOpen, setIsMobilePlayerOpen] = useState(false);

  // Audio Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Cycling name box on left state
  const names = ['SHUBHAM', 'SAH', 'S/'];
  const [nameIndex, setNameIndex] = useState(0);
  const [fadeName, setFadeName] = useState(true);

  // Clock update
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cycling name box timer logic
  useEffect(() => {
    let timer: number;
    let fadeTimer: number;

    const holdTime = nameIndex === 0 || nameIndex === 1 ? 1200 : 800;

    fadeTimer = window.setTimeout(() => {
      setFadeName(false);
    }, holdTime);

    timer = window.setTimeout(() => {
      setNameIndex((prev) => (prev + 1) % names.length);
      setFadeName(true);
    }, holdTime + 300);

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, [nameIndex]);

  // Scroll spy setup
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      
      if (scrollPos < 250) {
        setActiveSection('home');
        return;
      }

      const sections = ['skills', 'systems', 'experience', 'research', 'contact'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            current = section;
            break;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  // Click outside and Escape handler for dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Audio HTML5 setup & sync
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    // Handle auto-advance
    audio.addEventListener('ended', () => {
      setCurrentTrack((currentTrack + 1) % TRACKS.length);
    });

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [currentTrack, setCurrentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = TRACKS[currentTrack].src;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log('Audio playback error:', err));
    }
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log('Audio playback error:', err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  const scrollToSection = (section: string) => {
    if (section.toLowerCase() === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
    } else {
      const element = document.getElementById(section.toLowerCase());
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(section.toLowerCase());
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    triggerStarfieldPulse();
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prev = (currentTrack - 1 + TRACKS.length) % TRACKS.length;
    setCurrentTrack(prev);
    setIsPlaying(true);
    triggerStarfieldPulse();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = (currentTrack + 1) % TRACKS.length;
    setCurrentTrack(next);
    setIsPlaying(true);
    triggerStarfieldPulse();
  };

  const currentTrackObj = TRACKS[currentTrack];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#080608]/90 backdrop-blur-[20px] border-b border-[#f59e0b]/[0.08] z-50 px-6 flex items-center justify-between">
        
        {/* Left: Animated Name Box */}
        <div 
          onClick={() => scrollToSection('HOME')}
          className="border border-[#f59e0b]/30 bg-[#f59e0b]/[0.05] rounded-lg px-4 py-1.5 font-mono font-bold text-amber w-28 text-center inline-flex items-center justify-center overflow-hidden h-9 shrink-0 cursor-pointer select-none"
        >
          <div 
            className={`transition-all duration-300 ease-out transform ${
              fadeName ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            }`}
          >
            {names[nameIndex]}
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-body text-sm text-text-muted">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`relative py-2 text-text-muted hover:text-amber transition-colors duration-150 ${
                  isActive ? 'text-amber font-medium' : ''
                }`}
              >
                {item}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 bottom-0 h-[1px] bg-amber shadow-[0_0_8px_#f59e0b]"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Section: Player & Clock */}
        <div className="hidden md:flex items-center gap-4 relative">
          
          {/* Navigation Music Player Pill */}
          <div className="border border-[#f59e0b]/30 bg-[#f59e0b]/[0.05] rounded-full px-3.5 py-1 flex items-center gap-3 h-9 backdrop-blur-md relative select-none">
            
            {/* Album Art Circle */}
            <div 
              className={`w-7 h-7 rounded-full border border-[#f59e0b]/20 bg-gradient-to-tr ${currentTrackObj.gradient} flex items-center justify-center overflow-hidden shrink-0 animate-spin-slow`}
              style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-surface-base border border-[#f59e0b]/20" />
            </div>

            {/* Media Controls */}
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrev} 
                className="text-amber opacity-60 hover:opacity-100 hover:scale-125 transition-all duration-150 p-1 flex items-center justify-center"
                aria-label="Previous track"
              >
                <SkipBack size={14} />
              </button>
              <button 
                onClick={handlePlayPause} 
                className="text-amber opacity-60 hover:opacity-100 hover:scale-125 transition-all duration-150 p-1 flex items-center justify-center"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-[1px]" />}
              </button>
              <button 
                onClick={handleNext} 
                className="text-amber opacity-60 hover:opacity-100 hover:scale-125 transition-all duration-150 p-1 flex items-center justify-center"
                aria-label="Next track"
              >
                <SkipForward size={14} />
              </button>
            </div>

            {/* Divider */}
            <div className="w-[1px] h-4 bg-[#f59e0b]/20" />

            {/* Track Info Marquee & Equalizer */}
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center max-w-[120px] overflow-hidden cursor-pointer"
            >
              <div className="relative overflow-hidden w-[90px] h-4 select-none">
                <div className="absolute whitespace-nowrap font-mono text-[11px] text-[#faf5ff] animate-marquee pr-4">
                  {currentTrackObj.artist} — {currentTrackObj.title}
                </div>
              </div>

              {/* Equalizer animation */}
              <div className="flex items-end gap-[2px] h-3 ml-1.5 shrink-0 select-none">
                <div className={`w-[3px] bg-amber rounded-t-[1px] transition-all duration-300 ${isPlaying ? 'animate-eq-1' : 'h-[4px]'}`} />
                <div className={`w-[3px] bg-amber rounded-t-[1px] transition-all duration-300 ${isPlaying ? 'animate-eq-2' : 'h-[6px]'}`} />
                <div className={`w-[3px] bg-amber rounded-t-[1px] transition-all duration-300 ${isPlaying ? 'animate-eq-3' : 'h-[3px]'}`} />
              </div>
            </div>

            {/* Volume range slider */}
            <div className="hidden xl:flex items-center gap-2">
              <div className="w-[1px] h-4 bg-[#f59e0b]/20" />
              <Volume2 size={12} className="text-amber opacity-50" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-[60px] h-1 bg-[#f59e0b]/20 accent-amber rounded-lg appearance-none cursor-pointer outline-none transition-all"
                style={{
                  background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${volume * 100}%, rgba(245, 158, 11, 0.2) ${volume * 100}%, rgba(245, 158, 11, 0.2) 100%)`
                }}
              />
            </div>

          </div>

          {/* Track Switcher Dropdown */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                ref={dropdownRef}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-[140px] top-full mt-2 w-64 bg-surface-card border border-[#f59e0b]/20 rounded-[10px] p-2 shadow-2xl z-[60] select-none"
              >
                <div className="flex flex-col gap-1">
                  {TRACKS.map((t, idx) => {
                    const isTrackActive = currentTrack === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentTrack(idx);
                          setIsPlaying(true);
                          setIsDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between px-3 py-2 rounded-md hover:bg-[#f59e0b]/[0.06] transition-colors ${
                          isTrackActive ? 'border-l-2 border-[#f59e0b] text-amber pl-2 bg-[#f59e0b]/[0.02]' : 'text-text-muted'
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          {isTrackActive && isPlaying ? (
                            <Pause size={10} className="text-amber shrink-0 animate-pulse" />
                          ) : (
                            <Play size={10} className="text-amber shrink-0" />
                          )}
                          <span className="font-mono text-[11px] truncate text-left">
                            {t.artist} — {t.title}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] opacity-65 shrink-0 ml-2">
                          {t.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Live Clock Box */}
          <div className="border border-[#f59e0b]/30 bg-[#f59e0b]/[0.05] rounded-lg px-4 py-1.5 font-mono text-amber h-9 gap-2.5 shrink-0 select-none flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
            <span>{time}</span>
          </div>

        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden p-2 text-text-muted hover:text-text-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open mobile menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Floating Circular Mobile Play Button */}
      <div className="fixed bottom-6 left-6 z-40 md:hidden select-none">
        <button
          onClick={() => setIsMobilePlayerOpen(true)}
          className="w-12 h-12 rounded-full bg-[#f59e0b] text-surface-base flex items-center justify-center shadow-lg border border-[#f59e0b]/30 shadow-[#f59e0b]/25 hover:scale-105 active:scale-95 transition-all"
          aria-label="Open Mobile Audio Player"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-[#080608]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 10H5m4 9H5" />
          </svg>
        </button>
      </div>

      {/* Mobile Mini Player Sheet Drawer */}
      <AnimatePresence>
        {isMobilePlayerOpen && (
          <>
            {/* Sheet backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobilePlayerOpen(false)}
              className="fixed inset-0 bg-black z-[70] md:hidden"
            />
            {/* Bottom sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[80] bg-[#080608]/95 border-t border-[#f59e0b]/20 rounded-t-2xl p-6 select-none md:hidden flex flex-col items-center gap-6"
            >
              {/* Close bar */}
              <div className="w-12 h-1.5 bg-[#f59e0b]/20 rounded-full cursor-pointer" onClick={() => setIsMobilePlayerOpen(false)} />
              
              <div className="w-full flex items-center justify-between">
                <span className="font-mono text-[10px] text-amber uppercase tracking-wider">Now Playing</span>
                <button 
                  onClick={() => setIsMobilePlayerOpen(false)}
                  className="p-1 text-text-muted hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Album Art */}
              <div 
                className={`w-32 h-32 rounded-full border-2 border-[#f59e0b]/30 bg-gradient-to-tr ${currentTrackObj.gradient} flex items-center justify-center shadow-2xl animate-spin-slow`}
                style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
              >
                <div className="w-10 h-10 rounded-full bg-surface-base border-2 border-[#f59e0b]/30" />
              </div>

              {/* Title / Artist */}
              <div className="text-center w-full overflow-hidden px-4">
                <h3 className="text-base font-bold text-white font-sans truncate">{currentTrackObj.title}</h3>
                <p className="text-xs text-[#f59e0b] font-mono mt-1">{currentTrackObj.artist}</p>
              </div>

              {/* Mobile controls */}
              <div className="flex items-center justify-center gap-8 w-full mt-2">
                <button 
                  onClick={handlePrev} 
                  className="w-12 h-12 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-amber flex items-center justify-center active:bg-[#f59e0b]/20 active:scale-95 transition-all"
                  aria-label="Previous Track"
                >
                  <SkipBack size={18} />
                </button>
                <button 
                  onClick={handlePlayPause} 
                  className="w-16 h-16 rounded-full bg-[#f59e0b] text-[#080608] flex items-center justify-center active:scale-95 transition-all shadow-lg shadow-[#f59e0b]/20"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </button>
                <button 
                  onClick={handleNext} 
                  className="w-12 h-12 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-amber flex items-center justify-center active:bg-[#f59e0b]/20 active:scale-95 transition-all"
                  aria-label="Next Track"
                >
                  <SkipForward size={18} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-surface-card border-l border-border-amber md:hidden flex flex-col h-full"
          >
            <div className="h-16 px-6 flex items-center justify-end border-b border-white/[0.04]">
              <button
                className="p-2 text-text-muted hover:text-text-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col p-8 gap-6 overflow-y-auto">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-left font-body text-xl text-text-muted hover:text-amber transition-colors py-3"
                  style={{ minHeight: '44px' }}
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
