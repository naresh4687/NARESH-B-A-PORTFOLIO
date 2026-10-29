import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './hooks/useReducedMotion';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import SceneCanvas from './three/SceneCanvas';

import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import AmberDivider from './components/AmberDivider';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const reducedMotion = useReducedMotion();
  const scrollData = useRef({ progress: 0 });

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      scrollData.current.progress =
        maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    if (reducedMotion) {
      return () => window.removeEventListener('scroll', updateProgress);
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);

    const ticker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return (
    <div className="relative min-h-screen bg-void text-cream">
      <Loader onComplete={() => setIsLoaded(true)} />
      <CustomCursor />

      <SceneCanvas scrollData={scrollData} reducedMotion={reducedMotion} />
      <div aria-hidden="true" className="vignette pointer-events-none fixed inset-0 z-[5]" />
      <div aria-hidden="true" className="film-grain pointer-events-none fixed inset-0 z-[70]" />

      <Navbar />
      <main className="relative z-10">
        <Hero isLoaded={isLoaded} />
        <AmberDivider />
        <About />
        <AmberDivider />
        <Skills />
        <AmberDivider />
        <Experience />
        <AmberDivider />
        <Projects />
        <AmberDivider />
        <Education />
        <AmberDivider />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
