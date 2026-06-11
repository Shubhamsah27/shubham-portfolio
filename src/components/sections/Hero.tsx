import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[1200px] h-[1200px] bg-amber-glow blur-[160px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 flex flex-col lg:flex-row relative z-10">
        
        {/* Main Panel */}
        <motion.div 
          className="w-full max-w-4xl flex flex-col justify-center py-20 lg:py-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="font-mono text-amber text-xs md:text-sm tracking-[4px] mb-8">
            AVAILABLE FOR ROLES · IIIT BHOPAL '27
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="font-display font-extrabold text-[12vw] sm:text-6xl md:text-7xl lg:text-[88px] leading-tight mb-8 flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-4"
          >
            <span className="text-gradient pr-1 md:pr-2">SHUBHAM</span>
            <span className="text-gradient pr-1 md:pr-2">SAH</span>
          </motion.h1>

          <div className="flex flex-col gap-2 mb-8 text-text-muted font-body text-lg md:text-xl">
            <motion.div variants={itemVariants}>Software Engineer</motion.div>
            <motion.div variants={itemVariants}>Backend Engineer</motion.div>
            <motion.div variants={itemVariants}>Researcher</motion.div>
          </div>

          <motion.p variants={itemVariants} className="text-text-muted max-w-md font-body mb-12">
            I engineer backend microservices that remain reliable under load,
            automate operational pipelines,
            and design quantum-safe cryptographic protocols.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <a 
              href="#systems"
              className="px-6 py-3 bg-amber text-surface-base font-body font-medium hover:bg-amber/90 transition-colors"
            >
              View Systems →
            </a>
            <a 
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-border-amber text-text-primary hover:border-amber hover:text-amber transition-colors flex items-center gap-2"
            >
              Resume ↗
            </a>
            <a 
              href="https://github.com/Shubhamsah27"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-transparent text-text-muted hover:text-text-primary transition-colors"
            >
              GitHub
            </a>
          </motion.div>
        </motion.div>


      </div>
    </section>
  );
};
