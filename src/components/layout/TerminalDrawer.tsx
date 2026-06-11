import { Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

export const TerminalDrawer = () => {
  const isOpen = useStore((state) => state.terminalOpen);
  const toggleTerminal = useStore((state) => state.toggleTerminal);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleTerminal}
        className="fixed bottom-6 right-6 z-50 p-3 bg-surface-card border border-border-amber text-text-muted hover:text-amber hover:border-amber transition-colors rounded shadow-lg hidden md:block"
        aria-label="Toggle terminal"
      >
        <Terminal size={20} />
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-0 left-0 right-0 h-64 bg-surface-card border-t border-amber z-40 hidden md:flex flex-col font-mono text-sm shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center justify-between px-6 py-3 border-b border-border-amber bg-surface-base">
              <span className="text-text-muted text-xs">SYS_CONSOLE</span>
              <button 
                onClick={toggleTerminal}
                className="text-text-muted hover:text-amber transition-colors text-xs"
              >
                CLOSE [X]
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-2">
              <div className="text-text-muted">
                <span className="text-amber">[{new Date().toLocaleTimeString()}]</span> [INIT] Portfolio loaded...
              </div>
              <div className="text-text-muted">
                <span className="text-amber">[{new Date().toLocaleTimeString()}]</span> [SYS]  Infrastructure canvas active
              </div>
              <div className="text-text-muted">
                <span className="text-amber">[{new Date().toLocaleTimeString()}]</span> [NET]  GitHub: connected
              </div>
              <div className="text-text-muted">
                <span className="text-amber">[{new Date().toLocaleTimeString()}]</span> [MEM]  Stack: Node.js · C++ · Python · Bash
              </div>
              <div className="text-text-primary mt-2">
                <span className="text-amber">[{new Date().toLocaleTimeString()}]</span> [RDY]  Shubham Sah — online <span className="text-amber animate-pulse-fast inline-block ml-1">●</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
