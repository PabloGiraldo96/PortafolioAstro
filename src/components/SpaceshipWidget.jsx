import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";

function Ship(props) {
  const { scene } = useGLTF("/models/Spaceship.glb");
  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/Spaceship.glb");

export default function SpaceshipWidget({ size = 300 }) {
  return (
    <div style={{ width: size, height: size }}>
      <Canvas camera={{ position: [0, 1, 6], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
            <Ship scale={1} />
          </Float>
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
}