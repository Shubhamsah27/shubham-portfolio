import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetProps {
  name: string;
  radius: number;
  color: string;
  emissive?: string;
  zPos: number;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  fact?: string;
  children?: React.ReactNode;
}

export const Planet = ({
  name,
  radius,
  color,
  emissive,
  zPos,
  orbitRadius,
  orbitSpeed,
  rotationSpeed,
  fact,
  children
}: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Self-rotation
      meshRef.current.rotation.y += rotationSpeed;
    }
    if (orbitGroupRef.current) {
      // Orbit around the center (Z-axis offset is applied to the group's position)
      // The group is placed at z=zPos, and we rotate it over time to orbit the planet
      orbitGroupRef.current.rotation.y = state.clock.elapsedTime * orbitSpeed;
    }
  });

  return (
    <group position={[0, 0, zPos]}>
      {/* Orbit Ring (Faint dashed ring) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orbitRadius - 0.5, orbitRadius + 0.5, 64]} />
        <meshBasicMaterial color="white" transparent opacity={0.04} side={THREE.DoubleSide} />
      </mesh>

      <group ref={orbitGroupRef}>
        <mesh
          ref={meshRef}
          position={[orbitRadius, 0, 0]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
            setClicked(false);
            document.body.style.cursor = 'none'; // Fallback to none for custom cursor
          }}
          onClick={(e) => {
            e.stopPropagation();
            setClicked(!clicked);
          }}
        >
          <sphereGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={emissive || '#000000'}
            emissiveIntensity={0.3}
            roughness={0.7}
          />
          
          {/* Easter Egg Tooltip */}
          {fact && (hovered || clicked) && (
            <Html distanceFactor={100} center>
              <div className="bg-[#080608]/90 backdrop-blur-md border border-amber/40 px-3 py-2 rounded-sm whitespace-nowrap font-mono text-xs shadow-[0_0_15px_rgba(245,158,11,0.2)] pointer-events-none text-text-primary z-50 transition-opacity duration-300">
                <div className="text-amber font-bold mb-1 uppercase text-[10px] tracking-wider">{name}</div>
                <div className="text-[#faf5ff]/80">{fact}</div>
              </div>
            </Html>
          )}

          {children}
        </mesh>
      </group>
    </group>
  );
};
