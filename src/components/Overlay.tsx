"use client";

import { useState, useEffect } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";

const ROTATING_TITLES = [
  "AI/ML Enthusiast",
  "Full Stack Developer",
  "Linux & DevOps Learner",
  "Cloud Computing Explorer",
  "Data Analytics Practitioner",
  "Open Source Enthusiast",
  "Problem Solver"
];

export default function Overlay({ scrollYProgress }: { scrollYProgress: any }) {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % ROTATING_TITLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Opacity transforms
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);

  // Parallax Y movement (optional polish)
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [50, -50]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [50, -50]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center text-white">
        {/* Section 1 */}
        <motion.div 
            style={{ opacity: opacity1, y: y1 }}
            className="absolute inset-0 flex items-center justify-start p-8 md:p-24"
        >
            <div className="text-left flex flex-col items-start max-w-2xl">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-2">Naresh B A</h1>
                
                {/* Rotating Title */}
                <div className="h-10 md:h-12 overflow-hidden mb-4 relative w-full flex justify-start items-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={titleIndex}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-2xl md:text-3xl font-semibold text-blue-400 absolute left-0"
                    >
                      {ROTATING_TITLES[titleIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <p className="text-lg md:text-xl font-light text-gray-300 mb-2">
                  AI Engineer . Full Stack Developer
                </p>
                
                <p className="text-sm md:text-md font-mono text-gray-400 flex items-center gap-1.5 mb-8">
                  <svg className="w-4.5 h-4.5 text-red-500 fill-red-500/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  Tamil Nadu, India
                </p>

            </div>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
            style={{ opacity: opacity2, y: y2 }}
            className="absolute inset-0 flex items-center justify-start p-8 md:p-24"
        >
            <div className="max-w-3xl">
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                  Building intelligent systems, <br />
                  <span className="text-blue-500">scalable applications</span>, and modern digital experiences.
                </h2>
            </div>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
            style={{ opacity: opacity3, y: y3 }}
            className="absolute inset-0 flex items-center justify-end p-8 md:p-24 text-right"
        >
            <div className="max-w-3xl">
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                  Transforming ideas using Machine Learning, <br />
                  <span className="text-purple-500">MERN Stack</span> & DevOps.
                </h2>
            </div>
        </motion.div>
    </div>
  );
}
