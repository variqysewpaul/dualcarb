"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Accelerate loading progressively
      const increment = Math.max(1, Math.floor(Math.random() * 8));
      current += increment;

      if (current >= 100) {
        current = 100;
        setProgress(current);
        clearInterval(interval);
        setTimeout(() => setLoading(false), 500); // Brief pause at 100%
      } else {
        setProgress(current);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#050505]"
        >
          {/* Noise/Grain */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

          <div className="relative z-10 flex flex-col items-center">
            {/* The brand logo */}
            <div className="flex items-center gap-[0.3rem] font-display font-black text-2xl tracking-tighter uppercase mb-6 text-[#f0ece4] opacity-80">
              <span className="tracking-tight">DUAL</span>
              <span className="text-transparent" style={{ WebkitTextStroke: "2px #f97316" }}>CARB</span>
            </div>

            {/* Progress Counter */}
            <div className="font-mono text-8xl md:text-[12rem] text-[#f97316] font-bold tracking-tighter leading-none mb-8">
              {progress}<span className="text-4xl md:text-8xl text-white outline-text opacity-40">%</span>
            </div>

            {/* Awwwards style tiny loading bar under text */}
            <div className="w-64 h-[2px] bg-white/10 overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#f97316]"
                style={{ width: `${progress}%` }}
                layout
              />
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-xs font-mono tracking-widest text-[#f0ece4] opacity-50 uppercase"
            >
              Initializing Sequence
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
