import { motion } from 'framer-motion';

export const Experience = () => {
  const experiences = [
    {
      id: 1,
      org: 'AlgoUniversity',
      role: 'MTS Intern (Backend)',
      date: 'May 2026–Present',
      bullets: [
        'Microservice scaling',
        'Python/Bash automation pipelines'
      ]
    },
    {
      id: 2,
      org: 'IIIT Bhopal',
      role: 'ZKP Researcher',
      date: 'Aug 2025–May 2026',
      bullets: [
        'Lattice-based zero-knowledge proof systems',
        'Hybrid blockchain storage'
      ]
    },
    {
      id: 3,
      org: 'MANIT',
      role: 'Research Intern',
      date: 'Nov 2023–Apr 2024',
      bullets: [
        'C++ testing frameworks',
        'Telemetry optimization'
      ]
    }
  ];

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      {/* Background Numeral */}
      <div className="absolute top-0 right-0 font-display font-extrabold text-[20vw] leading-none opacity-[0.03] text-white pointer-events-none select-none">
        01
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.h2 
          className="font-display font-bold text-3xl md:text-4xl mb-24 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          EXPERIENCE
        </motion.h2>

        <div className="relative">
          {/* Amber Spine */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-amber shadow-[0_0_10px_rgba(245,158,11,0.5)] -translate-x-1/2" />

          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={exp.id} className={`relative flex flex-col md:flex-row items-center justify-between mb-16 last:mb-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-surface-base border-2 border-amber -translate-x-1/2 z-10" />

                {/* Content Card */}
                <motion.div 
                  className={`w-full md:w-[45%] pl-8 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.div 
                    className={`bg-surface-card border border-border-amber p-6 relative group transition-colors duration-300 ${isEven ? 'border-r-2 border-r-amber' : 'border-l-2 border-l-amber'}`}
                    whileHover={{ y: -6, boxShadow: "0 0 32px rgba(245,158,11,0.18)" }}
                  >
                    <div className={`font-mono text-xs text-text-muted mb-4 ${isEven ? 'md:justify-end md:pr-2' : ''} flex`}>
                      {exp.date}
                    </div>
                    <div className="mb-4">
                      <span className="font-display font-bold text-xl text-text-primary mr-2 block md:inline-block">
                        {exp.role}&nbsp;
                      </span>
                      <span className="font-mono text-amber text-sm block md:inline-block md:before:content-['·'] md:before:mx-2 md:before:text-text-muted">
                        {exp.org}&nbsp;
                      </span>
                    </div>
                    <ul className={`flex flex-col gap-2 font-body text-text-muted text-sm ${isEven ? 'md:items-end' : ''}`}>
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className={`flex items-start gap-2 ${isEven ? 'md:pr-2' : ''}`}>
                          <span className={`text-amber mt-1 ${isEven ? 'md:hidden' : ''}`}>-</span>
                          <span>{bullet}</span>
                          <span className={`text-amber mt-1 hidden ${isEven ? 'md:inline-block' : ''}`}>-</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
