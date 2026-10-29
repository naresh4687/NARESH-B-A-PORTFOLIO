import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileDown, Eye } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/content';

const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const offsets = NAV_LINKS.map((link) => {
        const el = document.getElementById(link.id);
        if (!el) return { id: link.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: link.id, top: Math.abs(rect.top - 180) };
      });

      const closest = offsets.reduce((prev, curr) =>
        curr.top < prev.top ? curr : prev
      );
      if (closest?.id) setActiveSection(closest.id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Primary Navigation"
          className="rounded-full bg-black/60 backdrop-blur-xl px-4 sm:px-6 py-2.5 flex items-center justify-between border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, 'hero')}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-lg"
          >
            <img
              src="/images/avatar-64.webp"
              srcSet="/images/avatar-64.webp 1x, /images/avatar-96.webp 1.5x, /images/avatar-192.webp 3x"
              alt="Portrait of Naresh B A"
              width={36}
              height={36}
              className="w-9 h-9 rounded-full ring-1 ring-amber/60 group-hover:ring-amber transition-all duration-700"
            />
            <span className="font-display text-xl font-semibold tracking-wide whitespace-nowrap text-cream group-hover:text-amber transition-colors duration-700">
              Naresh <span className="italic">B A</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="relative">
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => scrollToSection(e, link.id)}
                    className={`relative z-10 px-3.5 py-2 rounded-md text-[11px] uppercase tracking-[0.2em] transition-colors duration-700 block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber ${
                      isActive ? 'text-cream' : 'text-muted hover:text-cream'
                    }`}
                  >
                    {link.label}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-x-3.5 bottom-0.5 h-px bg-amber shadow-[0_0_10px_rgba(232,162,74,0.9)]"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden sm:flex items-center gap-2">
            <a
              href={PORTFOLIO_DATA.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold !px-5 !py-2.5 !text-[11px] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              <Eye className="w-3.5 h-3.5" />
              Resume
            </a>
            <a
              href={PORTFOLIO_DATA.personal.resumeUrl}
              download
              aria-label="Download resume"
              title="Download resume"
              className="p-2.5 rounded-full border border-white/25 text-cream hover:border-amber hover:text-amber transition-colors duration-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              <FileDown className="w-4 h-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            aria-expanded={mobileOpen}
            className="lg:hidden p-2 rounded-full text-cream hover:text-amber focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden mt-2 bg-black/80 backdrop-blur-xl rounded-3xl p-4 border border-white/10"
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => scrollToSection(e, link.id)}
                      className={`block px-4 py-3 text-xs uppercase tracking-[0.2em] transition-colors duration-500 border-l ${
                        activeSection === link.id
                          ? 'text-amber border-amber'
                          : 'text-muted border-transparent hover:text-cream'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-white/10 flex gap-2">
                <a
                  href={PORTFOLIO_DATA.personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold flex-1 !px-4"
                >
                  <Eye className="w-4 h-4" />
                  View
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.resumeUrl}
                  download
                  className="btn-outline flex-1 !px-4"
                >
                  <FileDown className="w-4 h-4" />
                  Download
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
