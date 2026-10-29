import React, { useRef } from 'react';

// 3D tilt on hover with an optional amber glare that follows the cursor.
export default function Tilt({ children, max = 8, glare = true, className = '', ...rest }) {
  const ref = useRef(null);
  const glareRef = useRef(null);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ref.current.style.transition = 'transform 0.15s ease-out';
    ref.current.style.transform = `perspective(1100px) rotateX(${((0.5 - py) * max * 2).toFixed(2)}deg) rotateY(${((px - 0.5) * max * 2).toFixed(2)}deg) scale3d(1.015,1.015,1.015)`;
    if (glareRef.current) {
      glareRef.current.style.opacity = '1';
      glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(245,199,126,0.22), transparent 55%)`;
    }
  };

  const onLeave = () => {
    ref.current.style.transition = 'transform 1.1s cubic-bezier(0.22,1,0.36,1)';
    ref.current.style.transform = 'perspective(1100px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    if (glareRef.current) glareRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative ${className}`}
      {...rest}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-700"
        />
      )}
    </div>
  );
}
