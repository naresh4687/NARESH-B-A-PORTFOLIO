import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// Thin amber light strip that draws itself in from the centre, with a soft bloom below.
export default function AmberDivider() {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.divider-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true }
        }
      );
      gsap.fromTo(
        '.divider-bloom',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={ref} aria-hidden="true" className="relative z-10 h-24 pointer-events-none">
      <div className="divider-line light-strip mx-auto max-w-5xl origin-center" />
      <div className="divider-bloom light-bloom absolute inset-x-0 top-0 h-24 opacity-60" />
    </div>
  );
}
