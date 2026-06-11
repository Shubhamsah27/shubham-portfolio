import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

// Official High-Fidelity SVG Brand Icons
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

const CodeChefIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    {/* Clean chef hat path representing official CodeChef identity */}
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.32 12.18c-.28.18-.54.34-.78.47-.24.13-.49.23-.74.31-.25.08-.51.13-.78.14-.27 0-.53-.02-.79-.06-.26-.04-.52-.12-.76-.22l-.4-.18c-.14-.06-.28-.1-.4-.13-.13-.03-.27-.04-.41-.02-.14.02-.27.06-.4.12-.13.06-.24.15-.34.26s-.18.25-.23.4l-.06.2c-.06.2-.08.41-.06.61.02.2.07.4.15.59.08.19.19.36.33.51.14.15.3.28.48.37l.48.24c.24.1.5.17.76.22.26.04.53.06.79.05.27-.01.53-.05.79-.12.25-.07.5-.18.73-.31.23-.13.45-.29.65-.47.2-.18.38-.38.54-.6s.29-.45.38-.7.13-.5.12-.76c.01-.26-.04-.52-.14-.76l-.16-.38c-.06-.14-.14-.26-.24-.37zm-3.32-6.52c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z" />
  </svg>
);

export const Contact = () => {
  const socials = [
    { name: 'GitHub', url: 'https://github.com/Shubhamsah27', icon: GithubIcon },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shubham-sah2005/', icon: LinkedinIcon },
    { name: 'Codeforces', url: 'https://codeforces.com/profile/_shubham__sah', icon: CodeforcesIcon },
    { name: 'CodeChef', url: 'https://www.codechef.com/users/fair_truce_14', icon: CodeChefIcon }
  ];

  return (
    <section id="contact" className="relative py-48 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
      <div className="absolute top-0 right-0 font-display font-extrabold text-[20vw] leading-none opacity-[0.03] text-white pointer-events-none select-none">
        06
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center w-full">
        <motion.h2 
          className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Interested in systems,<br />
          infrastructure,<br />
          or applied cryptography?<br />
          <span className="text-text-muted mt-6 block text-lg md:text-xl font-normal font-mono">// CONTACT</span>
        </motion.h2>

        {/* Centered Email Card (inspired by user provided photo) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-surface-card/60 border border-white/[0.04] rounded-xl p-8 max-w-lg mx-auto shadow-2xl backdrop-blur-sm"
        >
          <div className="flex items-center justify-center space-x-3 text-lg md:text-xl text-amber mb-8 select-all cursor-pointer hover:opacity-85 transition-opacity">
            <Mail className="w-5 h-5 text-amber" />
            <a 
              href="mailto:shubhamsah869@gmail.com" 
              className="font-mono border-b border-transparent hover:border-amber transition-colors"
            >
              shubhamsah869@gmail.com
            </a>
          </div>

          {/* Social Brand button pills */}
          <div className="flex flex-wrap justify-center gap-4">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a 
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-surface-base/80 border border-white/[0.06] hover:border-amber/40 hover:text-amber rounded-lg px-4 py-2.5 text-xs text-text-primary transition-all font-mono"
                  style={{ minHeight: '44px' }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{s.name}</span>
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Footer (inspired by user provided photo) */}
        <div className="text-center text-[10px] md:text-xs text-text-muted mt-20 space-y-4">
          <p>© {new Date().getFullYear()} Shubham Sah. All rights reserved.</p>
          <div className="flex justify-center space-x-6 text-text-muted/65">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a 
                  key={s.name} 
                  href={s.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber transition-colors p-1"
                  aria-label={s.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
