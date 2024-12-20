import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ConnectionLinesProps {
  positions: [number, number, number][];
}

export default function ConnectionLines({ positions }: ConnectionLinesProps) {
  const lineRef = useRef<THREE.LineSegments>(null);

  useFrame(() => {
    if (!lineRef.current) return;
    lineRef.current.rotation.y += 0.001;
  });

  const vertices = positions.flatMap((pos, i) => {
    const connections = positions.slice(i + 1).map(nextPos => [
      ...pos,
      ...nextPos
    ]);
    return connections;
  }).flat();

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={vertices.length / 3}
          array={new Float32Array(vertices)}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#4F46E5" transparent opacity={0.1} />
    </lineSegments>
  );
}