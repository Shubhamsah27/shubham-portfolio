import { motion } from 'framer-motion';

export const DesignPrinciples = () => {
  const principles = [
    {
      title: 'RELIABILITY',
      desc: 'Systems should degrade gracefully.'
    },
    {
      title: 'PERFORMANCE',
      desc: 'Latency is a feature.'
    },
    {
      title: 'OBSERVABILITY',
      desc: 'You cannot improve what you cannot measure.'
    },
    {
      title: 'SECURITY',
      desc: 'Cryptography should be built in, not added later.'
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute top-0 right-0 font-display font-extrabold text-[20vw] leading-none opacity-[0.03] text-white pointer-events-none select-none">
        03
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.h2 
          className="font-display font-bold text-3xl md:text-4xl mb-16 tracking-tight uppercase text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          System Design Principles
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              className="bg-surface-card border-t-2 border-t-transparent p-6 lg:p-8 group transition-colors duration-300 min-w-0 break-words"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                y: -4, 
                borderTopColor: '#f59e0b',
                boxShadow: '0 -10px 30px -15px rgba(245,158,11,0.3)'
              }}
            >
              <h3 className="font-display font-bold text-lg lg:text-xl text-amber mb-4 tracking-wide">
                {p.title}
              </h3>
              <p className="font-body text-text-muted text-base lg:text-lg leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
