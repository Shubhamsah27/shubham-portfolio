import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';

export const CameraRig = () => {
  const { camera } = useThree();
  const scrollProgress = useStore((state) => state.scrollProgress);
  const targetZ = useRef(2000);

  useFrame(() => {
    // Total Z travel = 2000 units
    const totalZTravel = 2000;
    // Map scrollProgress (0 to 1) to camera Z (2000 to 0)
    targetZ.current = (1 - scrollProgress) * totalZTravel;
    
    // Smooth lerp for camera
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ.current, 0.06);
  });

  return null;
};
