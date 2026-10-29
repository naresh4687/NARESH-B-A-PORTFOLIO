import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import StudioEnv from './StudioEnv';

const goldMat = { color: '#d9a441', metalness: 1, roughness: 0.3, envMapIntensity: 1.6 };

const RADIUS = 2.1;
const worldPos = new THREE.Vector3();

function Orb({ skill, position, hovered, onHover, radius }) {
  const isHovered = hovered === skill.name;
  const groupRef = useRef();
  const labelRef = useRef();

  // Fade labels on the far side of the sphere so the front ones read cleanly.
  useFrame(() => {
    if (!groupRef.current || !labelRef.current) return;
    groupRef.current.getWorldPosition(worldPos);
    const depth = THREE.MathUtils.clamp((worldPos.z + radius) / (2 * radius), 0, 1);
    labelRef.current.style.opacity = isHovered ? 1 : 0.15 + 0.85 * depth;
    labelRef.current.style.pointerEvents = depth < 0.35 && !isHovered ? 'none' : 'auto';
  });

  return (
    <group ref={groupRef} position={position}>
      {/* glass sphere */}
      <mesh scale={isHovered ? 1.5 : 1}>
        <sphereGeometry args={[0.05, 20, 20]} />
        <meshPhysicalMaterial
          color={isHovered ? '#ffcf85' : '#1a1a1c'}
          emissive="#E8A24A"
          emissiveIntensity={isHovered ? 1.6 : 0.05}
          metalness={0.1}
          roughness={0.05}
          transmission={0}
          transparent
          opacity={0.75}
          clearcoat={1}
          envMapIntensity={1.4}
        />
      </mesh>
      {/* gold edge ring */}
      <mesh scale={isHovered ? 1.5 : 1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.085, 0.006, 12, 36]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
      <Html center zIndexRange={[10, 0]}>
        <button
          ref={labelRef}
          type="button"
          onMouseEnter={() => onHover(skill.name)}
          onMouseLeave={() => onHover(null)}
          onFocus={() => onHover(skill.name)}
          onBlur={() => onHover(null)}
          className={`px-2.5 py-1 rounded-full text-[11px] leading-none tracking-wide whitespace-nowrap transition-all duration-500 select-none cursor-grab active:cursor-grabbing border backdrop-blur-sm ${
            isHovered
              ? 'bg-amber/15 text-amber-light border-amber shadow-[0_0_22px_rgba(232,162,74,0.6)] scale-110'
              : 'bg-black/60 text-cream/85 border-white/15 hover:border-amber/50'
          }`}
        >
          {skill.name}
        </button>
      </Html>
    </group>
  );
}

function Orbits({ items, reducedMotion }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(null);

  const nodes = useMemo(() => {
    const count = items.length;
    const radius = RADIUS;
    return items.map((skill, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      return {
        skill,
        position: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        )
      };
    });
  }, [items]);

  useFrame((_, delta) => {
    if (groupRef.current && !reducedMotion && !hovered) {
      groupRef.current.rotation.y += delta * 0.16;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* faint gold lattice and orbit rings */}
      <mesh>
        <icosahedronGeometry args={[RADIUS * 0.6, 1]} />
        <meshBasicMaterial color="#E8A24A" wireframe transparent opacity={0.16} />
      </mesh>
      {[0, Math.PI / 3, -Math.PI / 3].map((tilt, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + tilt, tilt * 0.5, 0]}>
          <torusGeometry args={[RADIUS, 0.006, 8, 140]} />
          <meshStandardMaterial {...goldMat} />
        </mesh>
      ))}

      {nodes.map(({ skill, position }) => (
        <Orb
          key={skill.name}
          skill={skill}
          position={position}
          hovered={hovered}
          onHover={setHovered}
          radius={RADIUS}
        />
      ))}
    </group>
  );
}

export default function SkillsSphere({ skills, reducedMotion }) {
  const flatSkills = useMemo(
    () =>
      skills.flatMap((group) =>
        group.items.map((name) => ({ name, category: group.category }))
      ),
    [skills]
  );

  return (
    <div className="relative w-full h-[460px] lg:h-[520px]">
      <div className="absolute top-4 left-4 z-10 eyebrow !text-muted !tracking-[0.22em] flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-amber shadow-[0_0_10px_#E8A24A]" />
        Drag to rotate
      </div>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 13], fov: 25 }}>
        <StudioEnv />
        <ambientLight intensity={0.2} color="#ffe6c2" />
        <pointLight position={[3, 3, 4]} intensity={30} color="#ffab4a" />
        <Orbits items={flatSkills} reducedMotion={reducedMotion} />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} dampingFactor={0.08} />
      </Canvas>
    </div>
  );
}
