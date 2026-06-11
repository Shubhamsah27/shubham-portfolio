import { create } from 'zustand';

interface AppState {
  renderMode: 'webgl' | 'standard' | null;
  terminalOpen: boolean;
  scrollProgress: number;
  activeSection: string;
  reducedMotion: boolean;
  activeProjectIndex: number;
  setRenderMode: (mode: 'webgl' | 'standard' | null) => void;
  toggleTerminal: () => void;
  setScrollProgress: (progress: number) => void;
  setActiveSection: (section: string) => void;
  setReducedMotion: (reduced: boolean) => void;
  setActiveProjectIndex: (index: number) => void;
}

export const useStore = create<AppState>((set) => ({
  renderMode: null,
  terminalOpen: false,
  scrollProgress: 0,
  activeSection: 'hero',
  reducedMotion: false,
  activeProjectIndex: 0,
  setRenderMode: (mode) => set({ renderMode: mode }),
  toggleTerminal: () => set((state) => ({ terminalOpen: !state.terminalOpen })),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setActiveSection: (section) => set({ activeSection: section }),
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
  setActiveProjectIndex: (index) => set({ activeProjectIndex: index }),
}));
