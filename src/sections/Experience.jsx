import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '../data/content';
import SectionHeading from '../components/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.exp-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
          stagger: 0.25,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.exp-list', start: 'top 78%' }
        }
      );
      // Amber timeline line draws as the list scrolls through
      gsap.fromTo(
        '.exp-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.exp-list',
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.6
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading index="03" label="Experience" title="Production" accent="engineering" />

        <div className="exp-list relative pl-8 sm:pl-14 space-y-12">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-white/10" aria-hidden="true" />
          <div
            className="exp-line absolute left-0 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-amber-light via-amber to-amber-dark shadow-[0_0_12px_rgba(232,162,74,0.8)]"
            aria-hidden="true"
          />

          {PORTFOLIO_DATA.experience.map((exp) => (
            <div key={exp.id} className="exp-item relative group">
              <div className="absolute -left-[37px] sm:-left-[63px] top-7 w-3 h-3 rounded-full bg-amber shadow-[0_0_0_4px_#0b0b0c,0_0_20px_4px_rgba(232,162,74,0.7)] group-hover:scale-125 transition-transform duration-700" />

              <div className="glass-card rounded-3xl p-6 sm:p-9">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                  <div>
                    <h3 className="font-display text-3xl sm:text-4xl font-semibold text-cream leading-tight">
                      {exp.role}
                    </h3>
                    <p className="mt-1 eyebrow">{exp.company}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-3">
                  {exp.highlights.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm sm:text-base text-cream/75 leading-relaxed">
                      <span className="mt-2.5 h-px w-4 shrink-0 bg-amber" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 pt-5 border-t border-white/10 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.12em] text-amber border border-amber/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
