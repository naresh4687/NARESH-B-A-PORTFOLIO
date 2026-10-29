import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const ROWS = [
  ['Deep Learning', 'Full-Stack', 'Data Science', 'Python', 'React', 'Scalable Systems'],
  ['TensorFlow', 'Node.js', 'PyTorch', 'Flask', 'Next.js', 'Linux']
];

const BASE_SPEED = 45; // px/s drift when the page is idle

// Two rows of display type that drift on their own, then surge with scroll speed and
// follow scroll direction (scroll down: row 1 left / row 2 right; scroll up reverses).
export default function ScrollMarquee() {
  const rowRefs = useRef([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const x = [0, 0];
    let dir = 1;
    let targetDir = 1;
    let velocity = 0;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        velocity = self.getVelocity();
        if (Math.abs(velocity) > 20) targetDir = velocity > 0 ? 1 : -1;
      }
    });

    const tick = (_, deltaMs) => {
      const dt = Math.min(deltaMs, 64) / 1000;
      dir += (targetDir - dir) * Math.min(1, dt * 4);
      velocity *= 0.92;
      const boost = 1 + Math.min(Math.abs(velocity) / 350, 8);

      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const half = el.scrollWidth / 2;
        x[i] -= BASE_SPEED * dt * dir * boost * (i % 2 ? -1 : 1) * (i ? 0.8 : 1);
        if (x[i] <= -half) x[i] += half;
        if (x[i] > 0) x[i] -= half;
        el.style.transform = `translate3d(${x[i]}px,0,0)`;
      });
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      trigger.kill();
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="mt-24 space-y-2 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
    >
      {ROWS.map((words, r) => (
        <div
          key={r}
          ref={(el) => (rowRefs.current[r] = el)}
          className="flex w-max items-center gap-10 whitespace-nowrap will-change-transform"
        >
          {[0, 1].map((dup) =>
            words.map((word, i) => {
              const filled = (i + r) % 2 === 1;
              return (
                <React.Fragment key={`${dup}-${i}`}>
                  <span
                    className={`font-display font-semibold leading-[1.25] pb-3 tracking-[-0.02em] ${
                      r === 0 ? 'text-6xl sm:text-8xl' : 'text-4xl sm:text-6xl'
                    } ${filled ? 'text-gold italic' : 'outline-text-strong'}`}
                  >
                    {word}
                  </span>
                  <span className="font-display text-2xl text-amber">&#10022;</span>
                </React.Fragment>
              );
            })
          )}
        </div>
      ))}
    </div>
  );
}
