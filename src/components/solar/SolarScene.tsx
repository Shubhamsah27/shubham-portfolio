import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import { CameraRig } from './CameraRig';
import { Starfield } from './Starfield';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { Rings } from './Rings';
import { AsteroidBelt } from './AsteroidBelt';
import { Nebula } from './Nebula';

export const SolarScene = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 3000, position: [0, 0, 2000] }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Optimize pixel ratio
      >
        <color attach="background" args={['#080608']} />
        <fogExp2 attach="fog" args={['#080608', 0.0008]} />

        <CameraRig />

        {/* Environment Lights */}
        <ambientLight intensity={0.1} color="#ffffff" />

        {/* Core Elements */}
        <Starfield />
        <Nebula />
        <Sun />

        {/* Planets */}
        <Planet
          name="Mercury"
          radius={2}
          color="#888888"
          zPos={1600}
          orbitRadius={50}
          orbitSpeed={0.8}
          rotationSpeed={0.01}
        />

        <Planet
          name="Venus"
          radius={4}
          color="#fcd34d"
          zPos={1400}
          orbitRadius={70}
          orbitSpeed={0.6}
          rotationSpeed={-0.005} // retrograde
        />

        <Planet
          name="Earth"
          radius={4.5}
          color="#3b82f6"
          zPos={1150}
          orbitRadius={90}
          orbitSpeed={0.4}
          rotationSpeed={0.02}
          fact="Blue-green. The system where we host our microservices."
        />

        <Planet
          name="Mars"
          radius={3}
          color="#dc2626"
          zPos={900}
          orbitRadius={120}
          orbitSpeed={0.3}
          rotationSpeed={0.018}
        />

        <AsteroidBelt />

        <Planet
          name="Jupiter"
          radius={16}
          color="#f59e0b"
          zPos={500}
          orbitRadius={200}
          orbitSpeed={0.15}
          rotationSpeed={0.04}
          fact="Jupiter's storm = your uptime. Uninterrupted."
        />

        <Planet
          name="Saturn"
          radius={12}
          color="#d97706"
          zPos={300}
          orbitRadius={280}
          orbitSpeed={0.1}
          rotationSpeed={0.035}
          fact="Saturn's rings ~ Redis cluster replication rings."
        >
          <Rings />
        </Planet>

        <Planet
          name="Uranus"
          radius={8}
          color="#06b6d4"
          zPos={150}
          orbitRadius={340}
          orbitSpeed={0.07}
          rotationSpeed={0.025}
        />

        <Planet
          name="Neptune"
          radius={8}
          color="#4338ca"
          zPos={50}
          orbitRadius={400}
          orbitSpeed={0.05}
          rotationSpeed={0.025}
        />

        {/* Post Processing */}
        <EffectComposer {...{ disableNormalPass: true } as any}>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            intensity={1.2}
            mipmapBlur
          />
          <Noise opacity={0.025} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
