"use client";

import { useMemo } from "react";
import * as THREE from "three";

type ShowroomEnvironmentProps = {
  progress: number;
};

export function ShowroomEnvironment({
  progress,
}: ShowroomEnvironmentProps) {
  const showroomProgress = THREE.MathUtils.smoothstep(
    progress,
    0.62,
    1
  );

  const floorOpacity = Math.min(
    1,
    showroomProgress * 1.5
  );

  const floorY = THREE.MathUtils.lerp(
    -3,
    -0.8,
    showroomProgress
  );

  const panels = useMemo(
    () => [
      [-8, 3, -3],
      [8, 3, -3],
      [-11, 3, -10],
      [11, 3, -10],
    ] as [number, number, number][],
    []
  );

  return (
    <group>
      {/* Infinite-feeling floor */}
      <mesh
        position={[0, floorY, -4]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          color="#111111"
          roughness={0.78}
          metalness={0.15}
          transparent
          opacity={floorOpacity}
        />
      </mesh>

      {/* Floor grid */}
      <gridHelper
        args={[40, 40, "#242424", "#111111"]}
        position={[0, floorY + 0.01, -4]}
        rotation={[0, 0, 0]}
      />

      {/* Vertical architecture */}
      {panels.map((position, index) => (
        <mesh
          key={index}
          position={[
            position[0],
            position[1],
            THREE.MathUtils.lerp(
              4,
              position[2],
              showroomProgress
            ),
          ]}
        >
          <boxGeometry args={[0.08, 6, 8]} />
          <meshStandardMaterial
            color="#181818"
            roughness={0.55}
            metalness={0.3}
            transparent
            opacity={showroomProgress * 0.8}
          />
        </mesh>
      ))}

      {/* Ceiling beams */}
      <group
        position={[
          0,
          THREE.MathUtils.lerp(8, 6, showroomProgress),
          -4,
        ]}
      >
        {[-8, -4, 0, 4, 8].map((x) => (
          <mesh key={x} position={[x, 0, 0]}>
            <boxGeometry args={[0.06, 0.06, 24]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={showroomProgress * 0.15}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}