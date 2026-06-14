"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 100; // Increased count for a stronger effect

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const createParticle = (initY = false): Particle => {
      const parentWidth = canvas.width;
      const parentHeight = canvas.height;
      return {
        x: Math.random() * parentWidth,
        y: initY ? Math.random() * parentHeight : parentHeight + 10,
        size: Math.random() * 4.5 + 1.0, // Increased size range (from 0.5-3.0 to 1.0-5.5)
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -(Math.random() * 0.6 + 0.3), // Slightly faster drift
        opacity: Math.random() * 0.75 + 0.25, // Increased opacity (minimum 0.25, max 1.0)
        fadeSpeed: Math.random() * 0.005 + 0.002,
      };
    };

    // Populate initial particles randomly across the screen height
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;

        // Draw particle with soft glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5); // Wider glow radius
        gradient.addColorStop(0, `rgba(168, 85, 247, ${p.opacity})`); // Vibrant purple center
        gradient.addColorStop(0.4, `rgba(59, 130, 246, ${p.opacity * 0.6})`); // Stronger blue outer glow
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // If particle moves off top or fades out, regenerate from bottom
        if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[index] = createParticle(false);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
}
