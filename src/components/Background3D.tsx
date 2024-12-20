import React from 'react';
import { Canvas } from '@react-three/fiber';
import AnimatedSphere from './three/AnimatedSphere';
import ConnectionLines from './three/ConnectionLines';
import { sphereColors } from '../constants/colors';

export default function Background3D() {
  const spherePositions: [number, number, number][] = Array.from({ length: 15 }).map(() => [
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 10
  ]);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f3f4f6 100%)' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <ConnectionLines positions={spherePositions} />
        
        {spherePositions.map((position, i) => (
          <AnimatedSphere
            key={i}
            position={position}
            color={sphereColors[i % sphereColors.length]}
          />
        ))}
      </Canvas>
    </div>
  );
}