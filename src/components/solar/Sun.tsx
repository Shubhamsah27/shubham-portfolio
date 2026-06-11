import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Sun = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
    if (coronaRef.current) {
      // Pulsing scale 1.0 -> 1.15, 3s sine loop
      const scale = 1.0 + Math.abs(Math.sin(state.clock.elapsedTime * (Math.PI / 1.5))) * 0.15;
      coronaRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[0, 0, 1800]}>
      {/* Sun Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[40, 64, 64]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.8}
          toneMapped={false} // Ensure it glows softly for Bloom
        />
      </mesh>

      {/* Sun Light Source */}
      <pointLight color="#f59e0b" intensity={1.5} distance={800} decay={2} />

      {/* Corona Glow */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[42, 64, 64]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
