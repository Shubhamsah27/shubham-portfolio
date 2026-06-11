import { motion } from 'framer-motion';

export const Achievements = () => {
  const stats = [
    { label: 'Problems Solved', value: '670+', desc: 'Across platforms including Codeforces, LeetCode, and HackerRank' },
    { label: 'Internships', value: '3', desc: 'Hands-on roles in backend engineering and systems infrastructure' },
    { label: 'Publications', value: '2', desc: 'Peer-reviewed research on post-quantum cryptography' },
    { label: 'System Uptime', value: '100%', desc: 'Proven reliability in production environments' }
  ];

  return (
    <section id="achievements" className="relative py-32 overflow-hidden bg-surface-base border-y border-border-amber/40">
      {/* Background Graphic Element */}
      <div className="absolute top-0 left-0 font-display font-extrabold text-[20vw] leading-none opacity-[0.02] text-white pointer-events-none select-none">
        06
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.h2 
          className="font-display font-bold text-3xl md:text-4xl mb-16 tracking-tight uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Achievements
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Large Hero Codeforces Card */}
          <div className="w-full lg:w-5/12 bg-[#161318] border border-border-amber p-8 md:p-12 relative overflow-hidden group shadow-[0_0_40px_rgba(245,158,11,0.05)]">
            {/* Radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber blur-[100px] opacity-15 pointer-events-none" />
            
            {/* Scanline pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
            
            <div className="relative z-10">
              <span className="font-mono text-amber text-xs block mb-4">&gt; RATING_METRIC</span>
              <h3 className="inline-block font-display font-extrabold text-[90px] md:text-[110px] leading-none text-gradient mb-4 pr-8">
                1863
              </h3>
              <div className="font-mono text-text-primary tracking-widest text-sm uppercase mb-2 font-bold">
                Codeforces · Expert
              </div>
              <p className="text-text-muted text-xs font-mono leading-relaxed">
                Ranked in the top tier of competitive programmers globally, solving complex algorithmic challenges under strict time constraints.
              </p>
            </div>
          </div>

          {/* Grid of stats */}
          <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="bg-surface-card border border-border-amber/20 p-6 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, borderColor: 'rgba(245, 158, 11, 0.4)' }}
              >
                <div>
                  <span className="font-mono text-xs text-text-muted mb-2 block">{stat.label}</span>
                  <div className="font-display font-bold text-4xl text-amber mb-3">{stat.value}</div>
                </div>
                <p className="font-body text-text-muted text-xs leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
