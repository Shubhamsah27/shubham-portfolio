import { motion } from 'framer-motion';

export const Contact = () => {
  const socials = [
    { name: 'GitHub', url: 'https://github.com/Shubhamsah27' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shubham-sah2005/' },
    { name: 'Codeforces', url: 'https://codeforces.com/profile/_shubham__sah' },
    { name: 'CodeChef', url: 'https://www.codechef.com/users/fair_truce_14' }
  ];

  return (
    <section id="contact" className="relative py-48 overflow-hidden flex items-center justify-center min-h-[80vh]">
      <div className="absolute top-0 right-0 font-display font-extrabold text-[20vw] leading-none opacity-[0.03] text-white pointer-events-none select-none">
        06
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.h2 
          className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Interested in systems,<br />
          infrastructure,<br />
          or applied cryptography?<br />
          <span className="text-text-muted mt-8 block">Let's talk.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a 
            href="mailto:shubhamsah869@gmail.com" 
            className="inline-block font-body text-xl md:text-2xl text-amber border-b border-amber pb-1 hover:text-amber/80 hover:border-amber/80 transition-colors mb-20"
          >
            shubhamsah869@gmail.com
          </a>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center items-center gap-8 font-mono text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {socials.map((s, i) => (
            <div key={s.name} className="flex items-center gap-8">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-amber transition-colors"
              >
                {s.name}
              </a>
              {i < socials.length - 1 && (
                <span className="text-border-amber pointer-events-none">·</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
