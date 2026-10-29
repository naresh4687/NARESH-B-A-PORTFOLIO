import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// Letter-by-letter serif reveal. `parts` lets one heading mix styles
// ([{ text, className }]). `on` is 'scroll' (default) or 'load' (waits for `enabled`).
export default function SplitReveal({
  parts,
  as: Tag = 'h2',
  className = '',
  on = 'scroll',
  enabled = true,
  delay = 0
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const label = parts.map((p) => p.text).join(' ');

  useEffect(() => {
    if (reducedMotion || !enabled) return;
    const chars = ref.current.querySelectorAll('[data-char]');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.3,
          delay,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger:
            on === 'scroll'
              ? { trigger: ref.current, start: 'top 85%', once: true }
              : undefined
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [reducedMotion, enabled, on, delay]);

  return (
    <Tag ref={ref} aria-label={label} className={className}>
      {parts.map((part, pi) => (
        <span key={pi} aria-hidden="true" className={part.italic ? 'italic' : undefined}>
          {part.text.split(' ').map((word, wi, words) => (
            <React.Fragment key={wi}>
              <span className="inline-block whitespace-nowrap overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
                {word.split('').map((ch, ci) => (
                  <span
                    key={ci}
                    data-char
                    className={`inline-block will-change-transform ${part.className || ''}`}
                    style={{
                      ...(!reducedMotion && enabled ? { opacity: 0 } : null),
                      ...(part.shine ? { animationDelay: `${(wi * 4 + ci) * 0.18}s` } : null)
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
              {wi < words.length - 1 && ' '}
            </React.Fragment>
          ))}
          {pi < parts.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  );
}
