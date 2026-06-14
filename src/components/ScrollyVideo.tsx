"use client";

import { useScroll, useSpring, useMotionValueEvent, motion, MotionValue } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";

interface ScrollyVideoProps {
  src: string;
  children?: (progress: MotionValue<number>) => ReactNode;
}

export default function ScrollyVideo({ src, children }: ScrollyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Softer spring configuration to damp rapid changes and smooth out scrubbing
  const springScroll = useSpring(scrollYProgress, {
    damping: 80,
    stiffness: 50,
    mass: 1.5,
    restDelta: 0.001
  });

  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure the video metadata is loaded so duration is available
    const handleLoadedMetadata = () => {
      if (video) {
        targetTimeRef.current = springScroll.get() * video.duration;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      // Seek again only if the target time has drifted significantly
      if (video && Math.abs(video.currentTime - targetTimeRef.current) > 0.04) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("seeked", handleSeeked);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [springScroll]);

  // Update video time based on the smooth spring scroll
  useMotionValueEvent(springScroll, "change", (latest) => {
    const video = videoRef.current;
    if (video && video.duration && video.readyState >= 1) {
      targetTimeRef.current = latest * video.duration;
      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    }
  });

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
        />
        {/* Soft vignette gradient overlay to ensure text readability on both sides of the screen */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/80 pointer-events-none z-5" />
        
        {/* Render children (Overlay) passing the springScroll value */}
        {children && children(springScroll)}
      </div>
    </div>
  );
}

