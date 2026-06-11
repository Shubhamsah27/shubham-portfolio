import { useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import * as THREE from 'three';

export const useCameraPosition = () => {
  useFrame((state) => {
    const scrollProgress = useStore.getState().scrollProgress;
    const totalZTravel = 2000;
    const targetZ = (1 - scrollProgress) * totalZTravel;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.06);
  });
};
