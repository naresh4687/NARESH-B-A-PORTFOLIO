import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/content';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 bg-void/80 backdrop-blur-md">
      <div className="light-strip mx-auto max-w-5xl mb-12 opacity-70" aria-hidden="true" />
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="text-center sm:text-left">
          <p className="font-display text-2xl font-semibold text-cream">
            {PORTFOLIO_DATA.personal.name}
          </p>
          <p className="text-xs text-muted mt-1">
            &copy; {new Date().getFullYear()} Naresh B A. {PORTFOLIO_DATA.personal.title}
          </p>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-[11px] uppercase tracking-[0.2em] text-cream hover:border-amber hover:text-amber transition-colors duration-700"
        >
          Back to Top
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
