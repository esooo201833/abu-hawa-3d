"use client";

import { Environment } from "@react-three/drei";
import * as THREE from "three";

import { MotorcycleModel } from "./MotorcycleModel";
import { CameraRig } from "./CameraRig";
import { ShowroomEnvironment } from "./ShowroomEnvironment";
import { WorldLighting } from "./WorldLighting";

type ImmersiveWorldProps = {
  progress: number;
};

export function ImmersiveWorld({
  progress,
}: ImmersiveWorldProps) {
  const cbrProgress = THREE.MathUtils.smoothstep(
    progress,
    0.08,
    0.42
  );

  const africaProgress = THREE.MathUtils.smoothstep(
    progress,
    0.42,
    0.7
  );

  const cbrX = THREE.MathUtils.lerp(
    1.8,
    -0.5,
    cbrProgress
  );

  const cbrZ = THREE.MathUtils.lerp(
    1.5,
    0,
    cbrProgress
  );

  const cbrRotationY = THREE.MathUtils.lerp(
    Math.PI,
    Math.PI + 0.5,
    cbrProgress
  );

  const africaX = THREE.MathUtils.lerp(
    7,
    0.8,
    africaProgress
  );

  const africaZ = THREE.MathUtils.lerp(
    -3,
    -1,
    africaProgress
  );

  const africaRotationY = THREE.MathUtils.lerp(
    -0.7,
    -0.15,
    africaProgress
  );

  const cbrVisibility = progress < 0.55;
  const africaVisibility = progress > 0.38;

  return (
    <>
      <CameraRig progress={progress} />

      <WorldLighting />

      <Environment
        preset="studio"
        environmentIntensity={0.55}
      />

      <fog
        attach="fog"
        args={["#050505", 10, 32]}
      />

      <ShowroomEnvironment
        progress={progress}
      />

      {cbrVisibility && (
        <group
          position={[
            cbrX,
            -0.02,
            cbrZ,
          ]}
        >
          <MotorcycleModel
            url="/models/cbr650r.glb"
            scale={1.6}
            rotation={[
              0,
              cbrRotationY,
              0,
            ]}
          />
        </group>
      )}

      {africaVisibility && (
        <group
          position={[
            africaX,
            -0.02,
            africaZ,
          ]}
        >
          <MotorcycleModel
            url="/models/africa-twin.glb"
            scale={1.35}
            rotation={[
              0,
              africaRotationY,
              0,
            ]}
          />
        </group>
      )}

      <mesh
        position={[0, -0.78, -1]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <circleGeometry args={[5, 64]} />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.035}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}