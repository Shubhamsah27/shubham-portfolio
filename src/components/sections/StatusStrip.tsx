import { motion } from 'framer-motion';

export const StatusStrip = () => {
  const metrics = [
    { label: 'Region', value: 'AP South' },
    { label: 'Focus', value: 'Systems' },
    { label: 'Research', value: 'Active' },
    { label: 'Availability', value: 'Open' },
    { label: 'Codeforces', value: '1863', isGradient: true },
    { label: 'Uptime', value: '99.99%', isOnline: true },
  ];

  return (
    <div className="w-full bg-surface-card border-y border-border-amber font-mono text-sm py-4">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-4 divide-x-0 md:divide-x divide-border-amber"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {metrics.map((metric, i) => (
            <div key={metric.label} className={`flex flex-col ${i !== 0 ? 'md:pl-6' : ''}`}>
              <span className="text-text-muted text-xs mb-1 uppercase tracking-wider">
                {metric.label}
              </span>
              <span className={`flex items-center gap-2 ${metric.isGradient ? 'text-gradient font-bold' : 'text-text-primary'}`}>
                {metric.value}
                {metric.isOnline && (
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-slow" />
                )}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
