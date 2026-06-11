import { motion } from 'framer-motion';

export const AnimatedArchitecture = () => {
  const nodes = [
    { id: 'client', label: 'Client', y: 0 },
    { id: 'gateway', label: 'WebSocket Gateway', y: 1 },
    { id: 'session', label: 'Session Manager', y: 2 },
    { id: 'cdp', label: 'CDP Controller', y: 3 },
    { id: 'chromium', label: 'Chromium', y: 4 },
  ];

  return (
    <div className="relative w-full h-[600px] flex justify-center items-center font-mono text-sm">
      {/* Connecting Line */}
      <div className="absolute top-[100px] bottom-[100px] w-[1px] bg-border-amber left-1/2 -translate-x-1/2">
        {/* Packets */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber"
            initial={{ top: 0, opacity: 0 }}
            animate={{ top: '100%', opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col justify-between h-[400px] z-10 w-48">
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            className="bg-surface-card border border-border-amber text-text-muted px-4 py-3 text-center relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 bg-amber opacity-0 pointer-events-none"
              animate={{ opacity: [0, 0.1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
            {node.label}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
