import React, { useRef } from 'react';
import gsap from 'gsap';

// Wraps a button/link so it drifts toward the cursor on hover.
export default function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    gsap.to(ref.current, { x, y, duration: 0.6, ease: 'power3.out' });
  };
  const onLeave = () =>
    gsap.to(ref.current, { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1, 0.5)' });

  return (
    <span
      ref={ref}
      data-magnetic
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </span>
  );
}
