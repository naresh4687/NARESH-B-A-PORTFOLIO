import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Globe2, Compass } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/content';
import SectionHeading from '../components/SectionHeading';
import ScrollMarquee from '../components/ScrollMarquee';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const countersRef = useRef([]);
  const { summary } = PORTFOLIO_DATA.personal;
  const lead = 'AI & Data Science developer';
  const intro = summary.startsWith(lead) ? lead : null;
  const rest = intro ? summary.slice(lead.length) : '';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      gsap.fromTo(
        '.stat-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.stat-grid', start: 'top 85%' }
        }
      );

      countersRef.current.forEach((el, idx) => {
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: PORTFOLIO_DATA.personal.stats[idx].value,
          duration: 2.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val);
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          index="01"
          label="About"
          title="Bridging"
          accent="Deep Learning"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="contents">
            <div className="about-card lg:col-span-7 relative glass-card rounded-3xl p-7 sm:p-10 space-y-6 overflow-hidden">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-4 right-6 font-display text-[11rem] leading-none text-amber/10 select-none"
              >
                &ldquo;
              </span>
              <p className="eyebrow">The short version</p>
              <p className="relative font-display text-2xl sm:text-3xl leading-snug text-cream">
                {intro ? (
                  <>
                    <span className="text-gold italic">{intro}</span>
                    {rest}
                  </>
                ) : (
                  summary
                )}
              </p>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                Based in <strong className="text-cream font-medium">{PORTFOLIO_DATA.personal.location}</strong>, I specialize in transforming raw datasets and deep neural models into production-grade web and mobile applications, combining <span className="text-amber">Python, TensorFlow, PyTorch, and Flask/FastAPI</span> with modern <span className="text-amber">React, Next.js, and Node.js</span> architectures.
              </p>
              <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  { Icon: Cpu, label: 'Focus', value: 'AI/ML inference & pipelines' },
                  { Icon: Globe2, label: 'Build', value: 'End-to-end scalable web systems' },
                  { Icon: Compass, label: 'Status', value: 'Open to AI & full-stack roles' }
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                    <div>
                      <p className="eyebrow !text-[10px] !text-muted mb-1">{label}</p>
                      <p className="text-xs text-cream/80 leading-snug">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="stat-grid lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-6">
              {PORTFOLIO_DATA.personal.stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className="about-card glass-card rounded-2xl p-5 flex flex-col justify-between"
                >
                  <div className="stat-line mb-4 h-px origin-left bg-gradient-to-r from-amber-light to-transparent" />
                  <div className="font-display text-4xl sm:text-5xl font-medium text-gold leading-none">
                    <span ref={(el) => (countersRef.current[idx] = el)}>{stat.value}</span>
                    <span className="text-2xl">{stat.suffix}</span>
                  </div>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-muted leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ScrollMarquee />
    </section>
  );
}
