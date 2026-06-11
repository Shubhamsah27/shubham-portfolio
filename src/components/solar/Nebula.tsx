import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Nebula = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate a procedural radial gradient texture for soft nebula puffs
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  // Define 4 large nebulas
  const nebulas = useMemo(() => [
    { pos: [400, 200, 1000] as [number, number, number], color: '#8b5cf6', scale: 600, opacity: 0.08 },
    { pos: [-300, -100, 800] as [number, number, number], color: '#f59e0b', scale: 500, opacity: 0.06 },
    { pos: [200, -300, 400] as [number, number, number], color: '#8b5cf6', scale: 800, opacity: 0.1 },
    { pos: [-500, 400, 100] as [number, number, number], color: '#f59e0b', scale: 700, opacity: 0.05 },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      // Very slow drift
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.03) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {nebulas.map((n, i) => (
        <sprite key={i} position={n.pos} scale={[n.scale, n.scale, 1]}>
          <spriteMaterial
            map={texture}
            color={n.color}
            transparent
            opacity={n.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      ))}
    </group>
  );
};
