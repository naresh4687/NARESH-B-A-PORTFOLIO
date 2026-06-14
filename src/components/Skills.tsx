"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import ElasticGrid from "./ElasticGrid";

const skills = [
  { category: "Programming Languages", items: ["Python", "Java", "SQL", "C", "JavaScript"] },
  { category: "Frontend Development", items: ["React.js", "HTML5", "CSS3", "Bootstrap", "Responsive Design"] },
  { category: "Backend Development", items: ["Node.js", "Express.js", "Flask", "FastAPI", "REST APIs"] },
  { category: "Databases", items: ["MongoDB", "MySQL"] },
  { category: "AI & Machine Learning", items: ["TensorFlow", "Keras", "PyTorch", "Scikit-Learn", "OpenCV", "Hugging Face"] },
  { category: "Big Data & Analytics", items: ["Hadoop", "Hive", "Data Analytics", "Power BI"] },
  { category: "DevOps & Cloud", items: ["Linux Administration", "Ubuntu", "Shell Scripting", "Docker", "Git & GitHub", "AWS Fundamentals"] },
  { category: "Cross-Platform", items: ["Electron.js", "Capacitor.js"] },
];

const CARD_WIDTH = 340;
const GAP = 28;

function CarouselCard({ group, idx, x, containerWidth }: any) {
  const cardOffset = idx * (CARD_WIDTH + GAP);
  
  // rotate (Z-axis fanning): tilt outwards as cards move away from the center
  const rotate = useTransform(x, (latestX: number) => {
    if (!containerWidth) return 0;
    const cardCenter = latestX + cardOffset + CARD_WIDTH / 2;
    const distToCenter = cardCenter - containerWidth / 2;
    const percentage = distToCenter / (containerWidth / 2);
    const clamped = Math.max(-1, Math.min(1, percentage));
    return clamped * 12; // Rotate clockwise on right, counter-clockwise on left
  });

  // y (Y-axis dome curve): translate cards downwards as they slide away from the center
  const y = useTransform(x, (latestX: number) => {
    if (!containerWidth) return 0;
    const cardCenter = latestX + cardOffset + CARD_WIDTH / 2;
    const distToCenter = cardCenter - containerWidth / 2;
    const percentage = Math.abs(distToCenter) / (containerWidth / 2);
    const clamped = Math.max(0, Math.min(1, percentage));
    return clamped * clamped * 45; // Curved dome height offset
  });

  // rotateY (3D inward tilt): rotate cards inwards to give a spherical look
  const rotateY = useTransform(x, (latestX: number) => {
    if (!containerWidth) return 0;
    const cardCenter = latestX + cardOffset + CARD_WIDTH / 2;
    const distToCenter = cardCenter - containerWidth / 2;
    const percentage = distToCenter / (containerWidth / 2);
    const clamped = Math.max(-1, Math.min(1, percentage));
    return clamped * -25;
  });

  const scale = useTransform(x, (latestX: number) => {
    if (!containerWidth) return 1;
    const cardCenter = latestX + cardOffset + CARD_WIDTH / 2;
    const distToCenter = cardCenter - containerWidth / 2;
    const percentage = Math.abs(distToCenter) / (containerWidth / 2);
    const clamped = Math.max(0, Math.min(1, percentage));
    return 1 - clamped * 0.15;
  });

  const opacity = useTransform(x, (latestX: number) => {
    if (!containerWidth) return 1;
    const cardCenter = latestX + cardOffset + CARD_WIDTH / 2;
    const distToCenter = cardCenter - containerWidth / 2;
    const percentage = Math.abs(distToCenter) / (containerWidth / 2);
    const clamped = Math.max(0, Math.min(1, percentage));
    return 1 - clamped * 0.4;
  });

  return (
    <motion.div
      style={{
        rotate,
        y,
        rotateY,
        scale,
        opacity,
        transformStyle: "preserve-3d",
        width: CARD_WIDTH,
      }}
      className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shrink-0 flex flex-col justify-between h-[300px] shadow-[0_20px_45px_rgba(0,0,0,0.7)] cursor-grab active:cursor-grabbing select-none hover:border-white/20 transition-colors relative overflow-hidden"
    >
      {/* Background Graphic Pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.07] pointer-events-none"
        style={{ backgroundImage: `url('/gallery/tech_card_bg.png')` }}
      />
      
      {/* Subtle overlay glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-lg font-bold text-blue-300 mb-6 uppercase tracking-wider leading-snug">{group.category}</h3>
          <div className="flex flex-wrap gap-2">
            {group.items.map((skill: string, sIdx: number) => (
              <span
                key={sIdx}
                className="px-3 py-1.5 bg-black/40 rounded-full text-xs text-gray-300 border border-white/10 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  
  const rawX = useMotionValue(0);
  // Inertia spring transform logic
  const springX = useSpring(rawX, { stiffness: 140, damping: 22 });

  const totalWidth = skills.length * CARD_WIDTH + (skills.length - 1) * GAP;

  useEffect(() => {
    if (containerRef.current) {
      const w = containerRef.current.offsetWidth;
      setContainerWidth(w);
      // Center the first card on load
      rawX.set((w - CARD_WIDTH) / 2);
    }
  }, []);

  const rightDragLimit = containerWidth ? (containerWidth - CARD_WIDTH) / 2 : 0;
  const leftDragLimit = containerWidth ? containerWidth - totalWidth - rightDragLimit : 0;

  return (
    <section className="relative z-20 bg-[#0a0a0a] min-h-screen py-32 px-4 md:px-12 overflow-hidden" id="skills">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-purple-500/25 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/25 rounded-full blur-[110px]" />
        <ElasticGrid />
      </div>

      <div className="max-w-7xl mx-auto relative flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 text-center md:text-left w-full"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Arsenal</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            A comprehensive set of tools, languages, and frameworks enabling AI engineering, data analytics, and full-stack system architecture.
          </p>
        </motion.div>

        {/* Arc Deck Carousel Pro Container */}
        <div 
          ref={containerRef} 
          className="relative w-full overflow-visible py-16 [perspective:1400px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: leftDragLimit, right: rightDragLimit }}
            dragElastic={0.25}
            style={{ x: rawX, transformStyle: "preserve-3d" }}
            className="flex gap-7 w-max"
          >
            {skills.map((group, idx) => (
              <CarouselCard
                key={idx}
                group={group}
                idx={idx}
                x={springX}
                containerWidth={containerWidth}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
