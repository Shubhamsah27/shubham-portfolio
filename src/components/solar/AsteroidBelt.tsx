import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';

export const AsteroidBelt = () => {
  const count = 800;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const scrollProgress = useStore((state) => state.scrollProgress);
  
  // Base properties
  const zPos = 700;
  const innerRadius = 80;
  const outerRadius = 250;

  // Generate instances
  const { positions, rotations, scales } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rot = new Float32Array(count * 3);
    const sca = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Random position in a donut shape around Z=700
      const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 40; // slight vertical scatter
      
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius;

      // Random rotation
      rot[i * 3] = Math.random() * Math.PI;
      rot[i * 3 + 1] = Math.random() * Math.PI;
      rot[i * 3 + 2] = Math.random() * Math.PI;

      // Random scale 0.5 to 1.5
      sca[i] = 0.5 + Math.random() * 1.0;
    }

    return { positions: pos, rotations: rot, scales: sca };
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Animate the entire belt very slowly rotating + add scroll-driven rotation
    // Multiplying scrollProgress * 2.5 gives a responsive, noticeable spin on scroll
    meshRef.current.rotation.y = time * 0.02 + scrollProgress * 2.5;
    
    // Faint vertical drift + scroll-driven vertical shift to feel extra 3D
    meshRef.current.position.y = Math.sin(time * 0.5) * 3 + scrollProgress * 15;
  });

  // Initialize matrices once
  useMemo(() => {
    if (!meshRef.current) return;
    
    for (let i = 0; i < count; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.rotation.set(rotations[i * 3], rotations[i * 3 + 1], rotations[i * 3 + 2]);
      dummy.scale.set(scales[i], scales[i], scales[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy, positions, rotations, scales, count]);

  return (
    <group position={[0, 0, zPos]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <icosahedronGeometry args={[0.4, 1]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.8} metalness={0.2} emissive="#d97706" emissiveIntensity={0.15} />
      </instancedMesh>
    </group>
  );
};

