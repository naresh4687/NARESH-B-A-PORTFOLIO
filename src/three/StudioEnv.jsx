import React from 'react';
import { Environment, Lightformer } from '@react-three/drei';

// Procedural warm studio "HDRI": amber strip above, soft white rim, dim warm fill.
// Built from Lightformers so no external HDR file is fetched.
export default function StudioEnv() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={['#050505']} />
      <Lightformer form="rect" intensity={6} color="#ffb454" position={[0, 6, -4]} scale={[16, 1.2, 1]} />
      <Lightformer form="circle" intensity={3} color="#ffd9a0" position={[-7, 5, 2]} scale={3} />
      <Lightformer form="circle" intensity={3} color="#ffd9a0" position={[7, 5, 2]} scale={3} />
      <Lightformer form="rect" intensity={2.2} color="#ffffff" position={[0, 1, 8]} scale={[10, 3, 1]} />
      <Lightformer form="rect" intensity={1.4} color="#ff9d3c" position={[-9, -1, -2]} rotation-y={Math.PI / 2} scale={[6, 4, 1]} />
      <Lightformer form="rect" intensity={1} color="#fff1dc" position={[9, 0, -2]} rotation-y={-Math.PI / 2} scale={[6, 4, 1]} />
    </Environment>
  );
}
