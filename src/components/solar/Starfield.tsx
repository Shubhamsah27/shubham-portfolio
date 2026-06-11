import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';

export const Starfield = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const activeProjectIndex = useStore((state) => state.activeProjectIndex);
  
  // Track transition flash value
  const transitionRef = useRef(0);
  const lastIndexRef = useRef(activeProjectIndex);

  // Trigger flash on project change
  useEffect(() => {
    if (activeProjectIndex !== lastIndexRef.current) {
      transitionRef.current = 1.0; // trigger full flash
      lastIndexRef.current = activeProjectIndex;
    }
  }, [activeProjectIndex]);

  const count = 2500;

  // Generate star positions, colors, twinkling properties, and constellation lines
  const { 
    positions, 
    colors, 
    twinkleSpeeds, 
    twinkleOffsets,
    linePositions,
    lineColors 
  } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Place stars in a large bounding box
      pos[i * 3] = (Math.random() - 0.5) * 3500;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3500;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3500;

      // Color scheme: mostly white/amber with occasional cyan/purple sparks matching the theme
      const rand = Math.random();
      if (rand > 0.95) {
        color.setHSL(0.08, 0.9, 0.8); // Amber spark
      } else if (rand > 0.90) {
        color.setHSL(0.5, 0.9, 0.8);  // Cyan spark
      } else {
        const brightness = 0.6 + Math.random() * 0.4;
        color.setRGB(brightness, brightness, brightness);
      }
      
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;

      // Twinkle speed and offset
      speeds[i] = 2.0 + Math.random() * 4.0;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    // Build dense, highly visible constellation lines in the camera path
    // We generate specific constellation nodes confined to the camera's path
    const constNodesCount = 160;
    const nodes: THREE.Vector3[] = [];
    const nodeCols: THREE.Color[] = [];
    const linePosArr: number[] = [];
    const lineColArr: number[] = [];

    for (let i = 0; i < constNodesCount; i++) {
      // Distribute nodes across the entire viewport width
      const x = (Math.random() - 0.5) * 1400;
      const y = (Math.random() - 0.5) * 800;
      const z = Math.random() * 2000;
      nodes.push(new THREE.Vector3(x, y, z));
      
      const col = new THREE.Color();
      // Amber/gold or cyan nodes
      if (Math.random() > 0.5) {
        col.setRGB(0.96, 0.62, 0.04); // Amber (#f59e0b)
      } else {
        col.setRGB(0.54, 0.36, 0.96); // Violet (#8b5cf6)
      }
      nodeCols.push(col);
    }

    // Connect nodes that are within 300 units of each other
    const maxDist = 300;
    for (let i = 0; i < constNodesCount; i++) {
      for (let j = i + 1; j < constNodesCount; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < maxDist) {
          linePosArr.push(nodes[i].x, nodes[i].y, nodes[i].z);
          linePosArr.push(nodes[j].x, nodes[j].y, nodes[j].z);

          lineColArr.push(nodeCols[i].r, nodeCols[i].g, nodeCols[i].b);
          lineColArr.push(nodeCols[j].r, nodeCols[j].g, nodeCols[j].b);
        }
      }
    }

    // Include the constellation nodes into the positions array so they render as star points too!
    for (let i = 0; i < constNodesCount; i++) {
      const idx = i;
      pos[idx * 3] = nodes[i].x;
      pos[idx * 3 + 1] = nodes[i].y;
      pos[idx * 3 + 2] = nodes[i].z;
      cols[idx * 3] = nodeCols[i].r;
      cols[idx * 3 + 1] = nodeCols[i].g;
      cols[idx * 3 + 2] = nodeCols[i].b;
      // Make constellation stars twinkle faster
      speeds[idx] = 6.0;
    }

    return {
      positions: pos,
      colors: cols,
      twinkleSpeeds: speeds,
      twinkleOffsets: offsets,
      linePositions: new Float32Array(linePosArr),
      lineColors: new Float32Array(lineColArr)
    };
  }, [count]);

  // Shaders for twinkling points
  const pointsShader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uTransitionProgress: { value: 0 }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uTransitionProgress;
      attribute float aTwinkleSpeed;
      attribute float aTwinkleOffset;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vColor = color;
        
        // Dynamic twinkling effect
        float twinkle = sin(uTime * aTwinkleSpeed + aTwinkleOffset) * 0.45 + 0.55;
        
        // Transition flash effect
        float flash = uTransitionProgress * 0.8;
        
        vAlpha = twinkle * (0.7 + flash);
        
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        
        // Attenuate point size by distance and enlarge during slide transition
        gl_PointSize = (2.0 + flash * 3.5) * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        // Render smooth circular dots
        vec2 coord = gl_PointCoord - vec2(0.5);
        if (length(coord) > 0.5) discard;
        
        float intensity = 1.0 - (length(coord) * 2.0);
        gl_FragColor = vec4(vColor, vAlpha * intensity);
      }
    `
  }), []);

  // Shaders for constellation lines
  const linesShader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uTransitionProgress: { value: 0 }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uTransitionProgress;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vColor = color;
        
        // Propagating chain-reaction wave effect radiating outwards from center
        float distToCenter = length(position);
        float wave = sin(uTime * 6.0 - distToCenter * 0.015) * 0.4 + 0.6;
        
        // Transition pulse radiating outwards like a chain reaction wavefront
        float pulseTime = uTransitionProgress * 4.0;
        float waveFront = pulseTime - (distToCenter * 0.003);
        float pulse = 0.0;
        if (waveFront > 0.0 && waveFront < 1.0) {
          pulse = sin(waveFront * 3.14159) * 2.5;
        }
        
        vAlpha = wave * (0.35 + pulse);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        gl_FragColor = vec4(vColor, vAlpha);
      }
    `
  }), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Decay transition flash smoothly
    if (transitionRef.current > 0) {
      transitionRef.current = THREE.MathUtils.lerp(transitionRef.current, 0, 0.04);
      if (transitionRef.current < 0.001) transitionRef.current = 0;
    }

    // Update shader uniforms
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.ShaderMaterial;
      if (mat.uniforms) {
        mat.uniforms.uTime.value = time;
        mat.uniforms.uTransitionProgress.value = transitionRef.current;
      }

      // Parallax effect with mouse
      const mx = (state.pointer.x * Math.PI) / 80;
      const my = (state.pointer.y * Math.PI) / 80;
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, mx, 0.05);
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -my, 0.05);
    }

    if (linesRef.current) {
      const mat = linesRef.current.material as THREE.ShaderMaterial;
      if (mat.uniforms) {
        mat.uniforms.uTime.value = time;
        mat.uniforms.uTransitionProgress.value = transitionRef.current;
      }
      
      // Match line rotation to stars
      if (pointsRef.current) {
        linesRef.current.rotation.x = pointsRef.current.rotation.x;
        linesRef.current.rotation.y = pointsRef.current.rotation.y;
      }
    }
  });

  return (
    <group>
      {/* Constellation lines */}
      {linePositions.length > 0 && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[linePositions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[lineColors, 3]}
            />
          </bufferGeometry>
          <shaderMaterial
            transparent
            depthWrite={false}
            vertexColors
            blending={THREE.AdditiveBlending}
            vertexShader={linesShader.vertexShader}
            fragmentShader={linesShader.fragmentShader}
            uniforms={linesShader.uniforms}
          />
        </lineSegments>
      )}

      {/* Stars points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
          <bufferAttribute
            attach="attributes-aTwinkleSpeed"
            args={[twinkleSpeeds, 1]}
          />
          <bufferAttribute
            attach="attributes-aTwinkleOffset"
            args={[twinkleOffsets, 1]}
          />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          vertexColors
          blending={THREE.AdditiveBlending}
          vertexShader={pointsShader.vertexShader}
          fragmentShader={pointsShader.fragmentShader}
          uniforms={pointsShader.uniforms}
        />
      </points>
    </group>
  );
};
