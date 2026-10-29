import React, { Suspense, lazy } from 'react';
import { PORTFOLIO_DATA } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionHeading from '../components/SectionHeading';

const SkillsSphere = lazy(() => import('../three/SkillsSphere'));

export default function Skills() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading index="02" label="Skills" title="A categorized" accent="stack" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="hidden md:block lg:col-span-5 sticky top-28">
            <Suspense
              fallback={
                <div className="w-full h-[460px] flex items-center justify-center eyebrow">
                  Loading
                </div>
              }
            >
              <SkillsSphere skills={PORTFOLIO_DATA.skills} reducedMotion={reducedMotion} />
            </Suspense>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {PORTFOLIO_DATA.skills.map((group, idx) => (
              <div key={group.category} className="glass-card rounded-2xl p-6">
                <div className="flex items-baseline justify-between mb-5">
                  <h3 className="font-display text-xl font-semibold text-cream">
                    {group.category}
                  </h3>
                  <span className="font-display text-2xl text-amber/60">0{idx + 1}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full text-xs text-cream/80 border border-white/10 hover:border-amber/60 hover:text-amber hover:shadow-[0_0_18px_-4px_rgba(232,162,74,0.5)] transition-all duration-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
