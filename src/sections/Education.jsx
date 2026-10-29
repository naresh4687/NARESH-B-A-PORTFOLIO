import { ArrowUpRight } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PORTFOLIO_DATA } from '../data/content';
import SectionHeading from '../components/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.edu-card',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading index="05" label="Education" title="Education &" accent="certifications" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 space-y-6">
            <h3 className="eyebrow">Academic Foundation</h3>
            {PORTFOLIO_DATA.education.map((edu) => {
              const Wrapper = edu.url ? 'a' : 'div';
              const linkProps = edu.url
                ? {
                    href: edu.url,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    'aria-label': `${edu.institution} (opens in a new tab)`
                  }
                : {};
              return (
                <Wrapper
                  key={edu.id}
                  {...linkProps}
                  className={`edu-card glass-card group relative block rounded-3xl p-7 sm:p-9 ${
                    edu.url ? 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber' : ''
                  }`}
                >
                  {edu.url && (
                    <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-muted transition-all duration-700 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber" />
                  )}
                  <p className="eyebrow !text-muted mb-3">{edu.period}</p>
                  <h4 className="font-display text-2xl sm:text-3xl font-semibold text-cream leading-tight">
                    {edu.degree}
                  </h4>
                  <p className="mt-2 text-sm text-amber">{edu.institution}</p>
                  <p className="mt-4 text-sm text-muted leading-relaxed">{edu.description}</p>
                </Wrapper>
              );
            })}
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h3 className="eyebrow">Certifications &amp; Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PORTFOLIO_DATA.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="edu-card glass-card rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] mb-4">
                      <span className="text-amber">{cert.type}</span>
                      <span className="text-muted">{cert.date}</span>
                    </div>
                    <h4 className="font-display text-xl font-semibold text-cream leading-snug">
                      {cert.title}
                    </h4>
                  </div>
                  <p className="mt-5 pt-3 border-t border-white/10 text-xs text-muted">
                    {cert.issuer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
