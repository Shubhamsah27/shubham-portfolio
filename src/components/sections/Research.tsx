import { motion } from 'framer-motion';

export const Research = () => {
  const papers = [
    {
      journal: 'CLUSTER_COMPUTING_JOURNAL',
      title: 'Quantum-Safe Blockchain Assisted Data Encryption Protocol for IoT Networks',
      desc: 'Research on integrating post-quantum cryptographic primitives within distributed ledger architectures.',
      github: '#'
    },
    {
      journal: 'IEEE_SCEECS_2024',
      title: 'Lattice-Based Zero-Knowledge Proof Architecture for Secure Verification',
      desc: 'Novel approach to zero-knowledge proofs utilizing lattice structures for enhanced security guarantees.',
      github: 'https://github.com/Shubhamsah27/Quantum-safe-ZKP-batch-verification'
    }
  ];

  return (
    <section id="research" className="relative py-32 overflow-hidden bg-surface-card border-y border-border-amber">
      <div className="absolute top-0 right-0 font-display font-extrabold text-[20vw] leading-none opacity-[0.03] text-white pointer-events-none select-none">
        05
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.h2 
          className="font-display font-bold text-3xl md:text-4xl mb-16 tracking-tight uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Research
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {papers.map((paper, i) => (
            <motion.div 
              key={paper.journal}
              className="bg-surface-base border border-border-amber p-6 group flex flex-col justify-between"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 0 20px rgba(245,158,11,0.1)" }}
            >
              <div>
                <div className="font-mono text-amber text-xs mb-4">
                  {`> ${paper.journal}`}
                </div>
                <h3 className="font-body font-medium text-text-primary text-lg mb-3">
                  {paper.title}
                </h3>
                <p className="font-body text-text-muted text-sm leading-relaxed mb-6">
                  {paper.desc}
                </p>
              </div>
              {paper.github && paper.github !== '#' && (
                <a 
                  href={paper.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center self-start font-mono text-xs text-amber border border-amber/30 px-3 py-1.5 hover:bg-amber/10 transition-colors mt-auto"
                >
                  {'> GITHUB'}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
