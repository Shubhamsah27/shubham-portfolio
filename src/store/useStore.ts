import { create } from 'zustand';

interface AppState {
  renderMode: 'webgl' | 'standard' | null;
  terminalOpen: boolean;
  scrollProgress: number;
  activeSection: string;
  reducedMotion: boolean;
  activeProjectIndex: number;
  isPlaying: boolean;
  currentTrack: number;
  volume: number;
  setRenderMode: (mode: 'webgl' | 'standard' | null) => void;
  toggleTerminal: () => void;
  setScrollProgress: (progress: number) => void;
  setActiveSection: (section: string) => void;
  setReducedMotion: (reduced: boolean) => void;
  setActiveProjectIndex: (index: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTrack: (trackIndex: number) => void;
  setVolume: (volume: number) => void;
  starfieldPulseTrigger: number;
  triggerStarfieldPulse: () => void;
}

export const useStore = create<AppState>((set) => ({
  renderMode: null,
  terminalOpen: false,
  scrollProgress: 0,
  activeSection: 'hero',
  reducedMotion: false,
  activeProjectIndex: 0,
  isPlaying: false,
  currentTrack: 0,
  volume: 0.5,
  starfieldPulseTrigger: 0,
  setRenderMode: (mode) => set({ renderMode: mode }),
  toggleTerminal: () => set((state) => ({ terminalOpen: !state.terminalOpen })),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setActiveSection: (section) => set({ activeSection: section }),
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
  setActiveProjectIndex: (index) => set({ activeProjectIndex: index }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTrack: (currentTrack) => set({ currentTrack }),
  setVolume: (volume) => set({ volume }),
  triggerStarfieldPulse: () => set((state) => ({ starfieldPulseTrigger: state.starfieldPulseTrigger + 1 })),
}));
