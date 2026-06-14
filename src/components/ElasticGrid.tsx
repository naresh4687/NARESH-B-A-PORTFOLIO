"use client";

import { useEffect, useRef } from "react";

interface GridPoint {
  x: number;
  y: number;
  ox: number; // original X
  oy: number; // original Y
  vx: number; // velocity X
  vy: number; // velocity Y
}

export default function ElasticGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let points: GridPoint[][] = [];
    const spacing = 45; // Grid spacing in pixels
    const mouseRadius = 160; // Influence radius
    const mouseForce = 0.55; // Repulsion force multiplier
    const springStrength = 0.045; // Pull back strength
    const damping = 0.88; // Velocity decay

    let mouseX = -9999;
    let mouseY = -9999;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const initGrid = () => {
      if (!canvas) return;
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      points = [];
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      for (let r = 0; r < rows; r++) {
        const rowPoints: GridPoint[] = [];
        for (let c = 0; c < cols; c++) {
          const x = (c - 0.5) * spacing;
          const y = (r - 0.5) * spacing;
          rowPoints.push({
            x,
            y,
            ox: x,
            oy: y,
            vx: 0,
            vy: 0,
          });
        }
        points.push(rowPoints);
      }
    };

    initGrid();
    window.addEventListener("resize", initGrid);

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rows = points.length;
      if (rows === 0) return;
      const cols = points[0].length;

      // 1. Update Physics
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];

          // Spring force back to home position
          const ax = (p.ox - p.x) * springStrength;
          const ay = (p.oy - p.y) * springStrength;

          p.vx += ax;
          p.vy += ay;

          // Mouse interaction (repulsion)
          if (mouseX !== -9999) {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouseRadius && dist > 0) {
              const force = (mouseRadius - dist) / mouseRadius;
              const angle = Math.atan2(dy, dx);
              // Push point away from cursor
              p.vx += Math.cos(angle) * force * mouseForce * 6.5;
              p.vy += Math.sin(angle) * force * mouseForce * 6.5;
            }
          }

          // Apply damping & update position
          p.vx *= damping;
          p.vy *= damping;
          p.x += p.vx;
          p.y += p.vy;
        }
      }

      // 2. Render Grid Lines
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];

          // Draw horizontal connection
          if (c < cols - 1) {
            const right = points[r][c + 1];
            const dx = p.x - p.ox;
            const dy = p.y - p.oy;
            const stretch = Math.sqrt(dx * dx + dy * dy);
            
            // Brightened alpha bounds and more vibrant colors
            const alpha = Math.min(0.45, 0.15 + stretch * 0.012);
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`; // More vibrant purple
            
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(right.x, right.y);
            ctx.stroke();
          }

          // Draw vertical connection
          if (r < rows - 1) {
            const down = points[r + 1][c];
            const dx = p.x - p.ox;
            const dy = p.y - p.oy;
            const stretch = Math.sqrt(dx * dx + dy * dy);
            
            const alpha = Math.min(0.45, 0.15 + stretch * 0.012);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`; // More vibrant blue

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(down.x, down.y);
            ctx.stroke();
          }

          // Draw small grid intersections
          const dx = p.x - p.ox;
          const dy = p.y - p.oy;
          const displacement = Math.sqrt(dx * dx + dy * dy);
          if (displacement > 0.5) {
            ctx.fillStyle = `rgba(168, 85, 247, ${Math.min(0.8, displacement * 0.03 + 0.1)})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.0, 0, Math.PI * 2); // Larger dots
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", initGrid);
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
