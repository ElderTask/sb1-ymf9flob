import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedSphereProps {
  position: [number, number, number];
  color: string;
}

export default function AnimatedSphere({ position, color }: AnimatedSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const speed = Math.random() * 0.5 + 0.2;
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    meshRef.current.position.x = position[0] + Math.sin(time * speed) * 3;
    meshRef.current.position.y = position[1] + Math.cos(time * speed) * 2;
    meshRef.current.position.z = position[2] + Math.sin(time * speed * 0.5);
    
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.003;
  });

  return (
    <Trail
      width={2}
      length={8}
      color={new THREE.Color(color)}
      attenuation={(t) => t * t}
    >
      <Sphere
        ref={meshRef}
        args={[0.3, 32, 32]}
        position={position}
      >
        <meshPhongMaterial
          color={color}
          transparent
          opacity={0.7}
          shininess={90}
        />
      </Sphere>
    </Trail>
  );
}