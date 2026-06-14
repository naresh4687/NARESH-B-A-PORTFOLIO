"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const IMAGES = [
  {
    src: "/gallery/photo1.jpg",
    title: "Campus Peer Connections",
    description: "Collaborative learning and outdoor moments with peers at Nandha Engineering College.",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/gallery/photo2.jpg",
    title: "Innovation Day 2025 Victory",
    description: "Receiving the award for developing the AI Speech-to-Text web application.",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    src: "/gallery/photo3.jpg",
    title: "Symposium Achievements",
    description: "Celebrating contest successes and presentations on the college stage.",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/gallery/photo5.jpg",
    title: "Cultural Day Celebrations",
    description: "Embracing cultural traditions with college peers in traditional attire.",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/gallery/photo4.jpg",
    title: "Department Community",
    description: "Special department gathers with classmates and faculty mentors in the IT block.",
    span: "md:col-span-1 md:row-span-1",
  },
];

export default function Gallery() {
  const [rotateY, setRotateY] = useState(0);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);

  const activeImg = IMAGES.find(img => img.src === selectedImg);
  const angleStep = 360 / IMAGES.length;

  // Smooth continuous rolling animation frame loop
  useEffect(() => {
    if (selectedImg !== null || isPanning) return;

    let lastTime = performance.now();
    let animationFrameId: number;

    const updateRotation = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      // Rotate by 20 degrees per second (0.02 degrees per ms)
      setRotateY((prev) => prev - delta * 0.02);
      animationFrameId = requestAnimationFrame(updateRotation);
    };

    animationFrameId = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedImg, isPanning]);

  return (
    <section className="relative z-20 bg-[#0a0a0a] py-32 px-4 md:px-12 overflow-hidden" id="gallery-section">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[650px] h-[650px] bg-blue-600/5 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[5%] w-[550px] h-[550px] bg-purple-600/5 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Moments & <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Milestones</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A glimpse into my academic environment, hackathon victories, cultural participation, and peer collaborations.
          </p>
        </motion.div>

        {/* 3D Circular Carousel Container */}
        <div className="relative h-[400px] w-full flex flex-col items-center justify-center overflow-visible [perspective:1400px] mb-8">
          <motion.div
            onPanStart={() => setIsPanning(true)}
            onPan={(e, info) => {
              // Directly rotate the carousel according to drag delta
              setRotateY((prev) => prev + info.delta.x / 4);
            }}
            onPanEnd={() => {
              setIsPanning(false);
            }}
            animate={{ rotateY: rotateY }}
            transition={{ type: "tween", ease: "linear", duration: 0 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-[450px] h-[330px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            {IMAGES.map((img, index) => {
              const cardAngle = index * angleStep;
              
              // Calculate relative angle to determine if this card is currently in front
              const relativeAngle = ((cardAngle + rotateY) % 360 + 360) % 360;
              const isFront = relativeAngle < 36 || relativeAngle > 324;
              
              const distToFront = Math.min(relativeAngle, 360 - relativeAngle);
              const zIndex = Math.round(100 - distToFront);

              return (
                <div
                  key={index}
                  style={{
                    transform: `rotateY(${cardAngle}deg) translateZ(380px)`,
                    transformStyle: "preserve-3d",
                    position: "absolute",
                    zIndex: zIndex,
                  }}
                  className="absolute flex items-center justify-center"
                >
                  <motion.div
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isFront) {
                        setSelectedImg(img.src);
                      } else {
                        // Click to center this card smoothly
                        setIsPanning(true);
                        const targetSnap = -index * angleStep;
                        const currentNormalized = rotateY % 360;
                        let difference = ((targetSnap - currentNormalized + 180) % 360 + 360) % 360 - 180;
                        const finalTarget = rotateY + difference;
                        
                        // We animate the rotation state directly
                        let start = performance.now();
                        const initialY = rotateY;
                        const duration = 500; // 0.5s snap transition

                        const animateSnap = (time: number) => {
                          const elapsed = time - start;
                          const progress = Math.min(elapsed / duration, 1);
                          // Ease out cubic
                          const ease = 1 - Math.pow(1 - progress, 3);
                          
                          setRotateY(initialY + difference * ease);

                          if (progress < 1) {
                            requestAnimationFrame(animateSnap);
                          } else {
                            setIsPanning(false);
                          }
                        };
                        requestAnimationFrame(animateSnap);
                      }
                    }}
                    animate={{
                      opacity: isFront ? 1 : 0.8,
                      scale: isFront ? 1 : 0.85,
                    }}
                    transition={{ duration: 0.4 }}
                    className="w-[320px] sm:w-[450px] h-[240px] sm:h-[330px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.7)] select-none cursor-pointer"
                  >
                    {/* Image */}
                    <img
                      src={img.src}
                      alt={img.title}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 pointer-events-none"
                    />
                    {/* Subtle hover overlay glow */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>




      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedImg && activeImg && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-60 cursor-zoom-out"
            />
            <div className="fixed inset-0 flex items-center justify-center z-70 pointer-events-none p-4 md:p-8">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#121212] w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative pointer-events-auto flex flex-col"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImg(null);
                  }}
                  className="absolute top-6 right-6 z-30 p-2.5 bg-black/60 hover:bg-black/90 rounded-full text-white/80 hover:text-white transition-all cursor-pointer border border-white/10 pointer-events-auto hover:scale-105 active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <img
                  src={activeImg.src}
                  alt={activeImg.title}
                  className="w-full max-h-[70vh] object-contain bg-black"
                />

                <div className="p-6 md:p-8 bg-[#121212]">
                  <h3 className="text-2xl font-bold text-white mb-2">{activeImg.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {activeImg.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
