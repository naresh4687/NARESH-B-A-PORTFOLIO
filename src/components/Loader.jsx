import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 14) + 6;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => onComplete?.(), 900);
        }, 300);
      } else {
        setProgress(current);
      }
    }, 55);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-void p-8 md:p-14 select-none"
          role="status"
          aria-live="polite"
          aria-label="Loading Naresh B A portfolio"
        >
          <div className="absolute inset-x-0 top-6 light-strip mx-[6vw]" aria-hidden="true" />
          <div className="absolute inset-x-0 top-0 h-56 light-bloom" aria-hidden="true" />

          <div className="relative w-full flex items-center justify-between eyebrow !text-muted">
            <span>Portfolio</span>
            <span>{new Date().getFullYear()}</span>
          </div>

          <div className="relative flex flex-col items-center">
            <span className="font-display text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight whitespace-nowrap text-gold">
              Naresh <span className="italic">B A</span>
            </span>
            <div className="mt-8 w-56 md:w-72 h-px bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-light to-amber-dark shadow-[0_0_12px_rgba(232,162,74,0.9)] transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-4 eyebrow !text-muted">{progress}%</p>
          </div>

          <div className="relative w-full flex items-center justify-between eyebrow !text-muted">
            <span>Erode, TN, IN</span>
            <span>{progress === 100 ? 'Ready' : 'Loading'}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
