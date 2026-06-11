import * as THREE from 'three';

export const Rings = () => {
  return (
    <mesh rotation={[Math.PI * 0.15, 0, 0]}>
      <torusGeometry args={[38, 10, 3, 80]} />
      <meshStandardMaterial
        color="#8b5cf6"
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
