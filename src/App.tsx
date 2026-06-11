import { useState } from 'react';
import { useStore } from './store/useStore';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useReducedMotion } from './hooks/useReducedMotion';
import { SolarCursor } from './components/cursor/SolarCursor';
import { EntryScreen } from './components/common/EntryScreen';
import { Navigation } from './components/layout/Navigation';
import { TerminalDrawer } from './components/layout/TerminalDrawer';
import { Hero } from './components/sections/Hero';
import { StatusStrip } from './components/sections/StatusStrip';
import { Experience } from './components/sections/Experience';
import { Systems } from './components/sections/Systems';
import { DesignPrinciples } from './components/sections/DesignPrinciples';
import { Topology } from './components/sections/Topology';
import { Research } from './components/sections/Research';
import { Achievements } from './components/sections/Achievements';
import { Contact } from './components/sections/Contact';
import { SolarScene } from './components/solar/SolarScene';
import { StaticStarfield } from './components/solar/StaticStarfield';

function App() {
  const renderMode = useStore((state) => state.renderMode);
  const scrollProgress = useStore((state) => state.scrollProgress);
  const prefersReducedMotion = useStore((state) => state.reducedMotion);
  const [portfolioVisible, setPortfolioVisible] = useState(false);
  
  // Use our custom scroll progress hook which updates Zustand
  useScrollProgress();
  useReducedMotion();

  return (
    <>
      <SolarCursor />
      <EntryScreen onExitStart={() => setPortfolioVisible(true)} />
      <div className="bg-grain" />
      
      {/* Background Rendering Logic */}
      {!prefersReducedMotion && renderMode === 'webgl' && <SolarScene />}
      {!prefersReducedMotion && renderMode === 'standard' && <StaticStarfield />}

      {renderMode && (
        <div className={`relative z-10 transition-opacity duration-500 ease-out ${portfolioVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Navigation />
          
          <main>
            <Hero />
            <StatusStrip />
            <Experience />
            <Systems />
            <DesignPrinciples />
            <Topology />
            <Research />
            <Achievements />
            <Contact />
          </main>

          <TerminalDrawer />
          
          {/* Scroll Progress Rail */}
          <div className="hidden md:flex fixed right-6 top-16 bottom-16 w-[3px] bg-amber/15 rounded-full z-50 flex-col justify-start">
            {/* The Filled Line */}
            <div 
              className="w-full bg-gradient-to-b from-amber-600 via-amber-400 to-yellow-300 rounded-full transition-all duration-75 ease-out relative shadow-[0_0_12px_rgba(245,158,11,0.6)]"
              style={{ height: `${scrollProgress * 100}%` }}
            >
              {/* Sparkling Tip */}
              {scrollProgress > 0 && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-6 h-6 z-50 pointer-events-none">
                  {/* Central glowing core */}
                  <div className="w-3.5 h-3.5 bg-yellow-300 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-75" />
                  <div className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_#ffd700,0_0_22px_#f59e0b] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  
                  {/* Sparkling rays */}
                  <div className="absolute w-[1.5px] h-6 bg-white/90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse duration-700" />
                  <div className="absolute h-[1.5px] w-6 bg-white/90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse duration-700" />
                  
                  {/* Diagonals */}
                  <div className="absolute w-[1px] h-4 bg-white/70 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 animate-pulse duration-1000" />
                  <div className="absolute h-[1px] w-4 bg-white/70 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 animate-pulse duration-1000" />
                  
                  {/* Small floating sparkles */}
                  <div className="absolute w-1 h-1 bg-yellow-300 rounded-full top-[-10px] left-[4px] animate-bounce opacity-90" />
                  <div className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full bottom-[-8px] left-[-6px] animate-ping opacity-80" />
                  <div className="absolute w-1.5 h-1.5 bg-white rounded-full top-[6px] right-[-6px] animate-pulse opacity-90" />
                </div>
              )}
            </div>
            
            {/* Percentage Indicator */}
            <div className="absolute right-4 bottom-8 font-mono text-xs text-amber translate-y-1/2 rotate-90 origin-right tracking-widest font-bold">
              {Math.round(scrollProgress * 100)}%
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
