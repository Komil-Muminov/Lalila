import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Augment the JSX namespace to include React Three Fiber intrinsic elements
// This fixes TypeScript errors when the R3F types are not automatically picked up
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      boxGeometry: any;
      sphereGeometry: any;
      torusGeometry: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
    }
  }
}

interface ModelProps {
  shape: 'box' | 'sphere' | 'torus';
  color: string;
}

const Model: React.FC<ModelProps> = ({ shape, color }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, Math.cos(t / 2) / 10 + 0.25, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, Math.sin(t / 4) / 10, 0.1);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, Math.sin(t / 4) / 20, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
        {shape === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {shape === 'sphere' && <sphereGeometry args={[0.7, 32, 32]} />}
        {shape === 'torus' && <torusGeometry args={[0.6, 0.2, 16, 100]} />}
        <MeshDistortMaterial
          color={color}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.5}
          roughness={0.2}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

interface ProductStageProps {
  shape: 'box' | 'sphere' | 'torus';
  color: string;
  interactive?: boolean;
}

export const ProductStage: React.FC<ProductStageProps> = ({ shape, color, interactive = true }) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full">
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <Model shape={shape} color={color} />
      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
      <Environment preset="city" />
      {interactive && <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />}
    </Canvas>
  );
};