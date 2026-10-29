import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDownRight, Eye, FileDown, MapPin, Github, Linkedin, Code2, ChevronDown } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';
import Portrait from '../components/Portrait';
import SplitReveal from '../components/SplitReveal';
import Magnetic from '../components/Magnetic';

export default function Hero({ isLoaded }) {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const portraitRef = useRef(null);
  const spotsRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const roles = PORTFOLIO_DATA.personal.roles;
    const currentRole = roles[roleIndex % roles.length];
    const speed = isDeleting ? 35 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1600);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayedText(
          currentRole.substring(0, displayedText.length + (isDeleting ? -1 : 1))
        );
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  useEffect(() => {
    if (!isLoaded) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-reveal',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3, stagger: 0.14, delay: 0.3, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-portrait',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.8, ease: 'power3.out' }
      );
    }, heroRef);
    return () => ctx.revert();
  }, [isLoaded]);

  // Mouse parallax: outlined name, portrait tilt and spotlights move at different depths.
  useEffect(() => {
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (reducedMotion || touch) return;

    const nameX = gsap.quickTo(nameRef.current, 'x', { duration: 1.4, ease: 'power3.out' });
    const nameY = gsap.quickTo(nameRef.current, 'y', { duration: 1.4, ease: 'power3.out' });
    const pX = gsap.quickTo(portraitRef.current, 'x', { duration: 1.2, ease: 'power3.out' });
    const pY = gsap.quickTo(portraitRef.current, 'y', { duration: 1.2, ease: 'power3.out' });
    const pRY = gsap.quickTo(portraitRef.current, 'rotationY', { duration: 1.2, ease: 'power3.out' });
    const pRX = gsap.quickTo(portraitRef.current, 'rotationX', { duration: 1.2, ease: 'power3.out' });
    const sX = gsap.quickTo(spotsRef.current, 'x', { duration: 1.8, ease: 'power3.out' });

    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      nameX(nx * -50);
      nameY(ny * -18);
      pX(nx * 22);
      pY(ny * 12);
      pRY(nx * 6);
      pRX(ny * -5);
      sX(nx * 16);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col lg:flex-row items-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Light strip, bloom and corner spotlights */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0">
        <div className="light-bloom absolute inset-x-0 top-0 h-72" />
        <div className="light-strip absolute inset-x-0 top-[22px] mx-[4vw]" />
        <div ref={spotsRef}>
          <div className="absolute left-[7%] top-3 -translate-x-1/2">
            <div className="spot-lamp" />
            <div className="spot-cone absolute left-1/2 top-2 -translate-x-1/2 hidden sm:block" />
          </div>
          <div className="absolute right-[7%] top-3 translate-x-1/2">
            <div className="spot-lamp" />
            <div className="spot-cone absolute left-1/2 top-2 -translate-x-1/2 hidden sm:block" />
          </div>
        </div>
      </div>

      {/* Portrait: its own light strip meets the page strip; edges dissolve into the page */}
      <div
        className="hero-portrait relative lg:absolute lg:right-[2%] lg:top-0 z-[2] w-[92vw] max-w-[540px] -mt-28 lg:mt-0 mx-auto lg:mx-0 pointer-events-none"
        style={{ perspective: 1000, mixBlendMode: 'lighten' }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-10 top-10 bottom-10 rounded-full bg-amber/15 blur-[100px]"
        />
        <div ref={portraitRef} className="relative will-change-transform">
          <Portrait
            priority
            className="relative w-full h-auto select-none"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, #000 22%, #000 78%, transparent 100%), linear-gradient(to bottom, #000 0%, #000 62%, transparent 96%)',
              WebkitMaskComposite: 'source-in',
              maskImage:
                'linear-gradient(to right, transparent 0%, #000 22%, #000 78%, transparent 100%), linear-gradient(to bottom, #000 0%, #000 62%, transparent 96%)',
              maskComposite: 'intersect'
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-4 items-center relative z-10">
        <div className="lg:col-span-7 space-y-7">
          <h1 aria-label="Naresh B A" className="relative -ml-1 select-none whitespace-nowrap">
            {/* outlined echo, drifts against the mouse for depth */}
            <div
              ref={nameRef}
              aria-hidden="true"
              className="outline-text pointer-events-none absolute left-2 top-2 sm:left-4 sm:top-4 font-display font-semibold leading-[1.05] tracking-[-0.03em] text-[clamp(3.25rem,8.6vw,8.5rem)]"
            >
              Naresh <span className="italic">B A</span>
            </div>
            <SplitReveal
              as="div"
              on="load"
              enabled={isLoaded}
              delay={0.2}
              parts={[
                { text: 'Naresh', className: 'text-cream' },
                { text: 'B A', className: 'text-shine', italic: true, shine: true }
              ]}
              className="relative font-display font-semibold leading-[1.05] tracking-[-0.03em] text-[clamp(3.25rem,8.6vw,8.5rem)]"
            />
          </h1>

          <p className="hero-reveal eyebrow">AI &amp; Data Science Developer</p>

          <p className="hero-reveal flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted">
            <MapPin className="w-3.5 h-3.5 text-amber" />
            {PORTFOLIO_DATA.personal.location}
          </p>

          <div className="hero-reveal h-10 flex items-center">
            <span className="font-display italic text-3xl sm:text-4xl text-cream">
              {displayedText}
              <span className="inline-block w-px h-7 ml-1 bg-amber animate-pulse align-middle" />
            </span>
          </div>

          <p className="hero-reveal max-w-md text-base text-muted leading-relaxed">
            {PORTFOLIO_DATA.personal.summary}
          </p>

          <div className="hero-reveal pt-2 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href="#projects" className="btn-gold">
                View Work
                <ArrowDownRight className="w-4 h-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={PORTFOLIO_DATA.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Eye className="w-4 h-4" />
                Resume
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={PORTFOLIO_DATA.personal.resumeUrl}
                download
                aria-label="Download resume"
                title="Download resume"
                className="btn-outline !px-4"
              >
                <FileDown className="w-4 h-4" />
              </a>
            </Magnetic>
          </div>

          <div className="hero-reveal pt-2 flex items-center gap-3 text-muted">
            {[
              { href: PORTFOLIO_DATA.personal.socials.github, label: 'GitHub Profile', Icon: Github },
              { href: PORTFOLIO_DATA.personal.socials.linkedin, label: 'LinkedIn Profile', Icon: Linkedin },
              { href: PORTFOLIO_DATA.personal.socials.leetcode, label: 'LeetCode Profile', Icon: Code2 }
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-full border border-white/10 hover:border-amber/60 hover:text-amber transition-colors duration-700"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

      </div>

      <a
        href="#about"
        aria-label="Scroll to About Section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted hover:text-amber transition-colors duration-700"
      >
        <span className="eyebrow !text-[10px] !text-inherit">Scroll</span>
        <ChevronDown className="w-4 h-4 text-amber" />
      </a>
    </section>
  );
}
