import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const SECTION_COUNT = 7;
const TRACK = 15; // world-units the camera travels from top to bottom of the page

// Polished obsidian and brushed gold, lit by the studio environment.
const obsidian = {
  color: '#060606',
  metalness: 0.92,
  roughness: 0.1,
  clearcoat: 1,
  clearcoatRoughness: 0.05,
  envMapIntensity: 1.4
};
const gold = {
  color: '#d9a441',
  metalness: 1,
  roughness: 0.3,
  envMapIntensity: 1.6
};

// y runs 0 (hero) to -TRACK (contact). x is kept toward the edges so copy stays clear.
const SHAPES = [
  { kind: 'ico', mat: 'obsidian', pos: [3.6, 0.6, -2], scale: 1.25 },
  { kind: 'ring', mat: 'gold', pos: [-5.2, 4.1, -4], scale: 1 },
  { kind: 'cube', mat: 'obsidian', pos: [-3.4, -1.2, -1.5], scale: 0.7 },
  { kind: 'oct', mat: 'gold', pos: [4.4, -3, -2.5], scale: 0.8 },
  { kind: 'ring', mat: 'gold', pos: [-4, -5, -2], scale: 1.1 },
  { kind: 'ico', mat: 'gold', pos: [4, -6.8, -3], scale: 0.9 },
  { kind: 'cube', mat: 'obsidian', pos: [-4.4, -8.5, -2.5], scale: 0.9 },
  { kind: 'ring', mat: 'gold', pos: [4.2, -10, -2], scale: 1.3 },
  { kind: 'ico', mat: 'obsidian', pos: [-3.8, -11.8, -2], scale: 1.1 },
  { kind: 'oct', mat: 'gold', pos: [3.8, -13, -2.5], scale: 0.7 },
  { kind: 'cube', mat: 'gold', pos: [-4, -14.5, -3], scale: 0.6 },
  { kind: 'ring', mat: 'obsidian', pos: [3.6, -15, -2], scale: 1 }
];

function Shape({ kind, mat, pos, scale, spin, reducedMotion, isMobile }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (reducedMotion || !ref.current) return;
    ref.current.rotation.x += delta * spin * 0.6;
    ref.current.rotation.y += delta * spin;
  });

  const Material = mat === 'gold' ? gold : obsidian;
  // Push shapes to the frame edges on wide screens so they never sit behind copy;
  // on phones keep them inside the narrow frustum, smaller and quieter.
  const place = [pos[0] * (isMobile ? 0.4 : 1.45), pos[1], pos[2]];
  const size = scale * (isMobile ? 0.7 : 1);
  return (
    <Float
      speed={reducedMotion ? 0 : 0.8}
      rotationIntensity={0}
      floatIntensity={reducedMotion ? 0 : 0.9}
      position={place}
    >
      <mesh ref={ref} scale={size}>
        {kind === 'ico' && <icosahedronGeometry args={[1, 0]} />}
        {kind === 'oct' && <octahedronGeometry args={[1, 0]} />}
        {kind === 'cube' && <boxGeometry args={[1.2, 1.2, 1.2]} />}
        {kind === 'ring' && <torusGeometry args={[1, 0.11, 32, 96]} />}
        <meshPhysicalMaterial {...Material} flatShading={kind !== 'ring'} />
      </mesh>
    </Float>
  );
}

export default function Scene({ scrollData, reducedMotion, isMobile }) {
  const { camera, pointer } = useThree();
  const keyLight = useRef();
  const dustRef = useRef();

  const shapes = useMemo(() => {
    const list = isMobile ? SHAPES.filter((_, i) => i % 2 === 0) : SHAPES;
    return list.map((s, i) => ({ ...s, spin: 0.08 + (i % 4) * 0.04 }));
  }, [isMobile]);

  useFrame((state, delta) => {
    const progress = scrollData.current?.progress || 0;
    const t = state.clock.elapsedTime;
    const k = Math.min(1, delta * 2);

    // Scroll-driven camera with pointer parallax and a gentle idle drift.
    const driftX = reducedMotion ? 0 : Math.sin(t * 0.12) * 0.25;
    const driftY = reducedMotion ? 0 : Math.cos(t * 0.1) * 0.18;
    const px = reducedMotion ? 0 : pointer.x * 0.5;
    const py = reducedMotion ? 0 : pointer.y * 0.3;
    const camY = -progress * TRACK;
    camera.position.x += (px + driftX - camera.position.x) * k;
    camera.position.y += (camY + py + driftY - camera.position.y) * k;
    camera.lookAt(camera.position.x * 0.3, camera.position.y - 0.1, 0);

    // Dust follows the camera so it is always in frame.
    if (dustRef.current) dustRef.current.position.y = camera.position.y;

    // Amber key light follows the camera and sweeps across as each section enters.
    if (keyLight.current) {
      const phase = (progress * SECTION_COUNT) % 1;
      const sweep = Math.sin(phase * Math.PI);
      keyLight.current.position.set(
        THREE.MathUtils.lerp(-5, 5, phase),
        camera.position.y + 3,
        3
      );
      keyLight.current.intensity = 55 + sweep * 90;
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} color="#ffe6c2" />
      <pointLight ref={keyLight} color="#ffab4a" distance={22} decay={2} intensity={60} />
      <directionalLight position={[0, 4, 6]} intensity={0.9} color="#ffffff" />

      {shapes.map((s, i) => (
        <Shape key={i} {...s} reducedMotion={reducedMotion} isMobile={isMobile} />
      ))}

      {!reducedMotion && (
        <group ref={dustRef}>
          <Sparkles
            count={isMobile ? 40 : 110}
            scale={[14, 12, 8]}
            size={isMobile ? 5 : 7}
            speed={0.25}
            opacity={0.55}
            color="#ffbf6b"
          />
        </group>
      )}
    </>
  );
}
