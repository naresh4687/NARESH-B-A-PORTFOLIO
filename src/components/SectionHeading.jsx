import React from 'react';
import SplitReveal from './SplitReveal';

export default function SectionHeading({ index, label, title, accent, className = '' }) {
  const parts = [{ text: title }];
  if (accent) parts.push({ text: accent, className: 'text-gold', italic: true });
  return (
    <div className={`max-w-3xl mb-16 ${className}`}>
      <p className="eyebrow mb-5">
        {index} &mdash; {label}
      </p>
      <SplitReveal
        parts={parts}
        className="font-display text-4xl sm:text-6xl font-medium leading-[1.02] tracking-[-0.02em] text-cream"
      />
    </div>
  );
}
