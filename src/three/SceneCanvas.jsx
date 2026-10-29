import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import StudioEnv from './StudioEnv';

export default function SceneCanvas({ scrollData, reducedMotion }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <Canvas
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <StudioEnv />
          <Scene scrollData={scrollData} reducedMotion={reducedMotion} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
