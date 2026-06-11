/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: '#f59e0b',
        violet: '#8b5cf6',
        surface: {
          base: '#080608',
          raised: '#0f0d10',
          card: '#161318',
        },
        text: {
          primary: '#faf5ff',
          muted: '#6b5f7a',
        },
        border: {
          amber: 'rgba(245, 158, 11, 0.08)',
          'amber-bright': 'rgba(245, 158, 11, 0.18)',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'amber-glow': 'radial-gradient(circle at center, rgba(245,158,11,0.1) 0%, transparent 70%)',
        'amber-violet-gradient': 'linear-gradient(to right, #f59e0b, #8b5cf6)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'latency-spike': 'latencySpike 0.2s ease-in-out',
      },
      keyframes: {
        latencySpike: {
          '0%, 100%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: '#ef4444' }, // Red for spike
        }
      }
    },
  },
  plugins: [],
}
