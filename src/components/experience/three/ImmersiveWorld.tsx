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

  /*
   * Desktop positions
   */
  const desktopCbrX = THREE.MathUtils.lerp(
    1.8,
    -0.5,
    cbrProgress
  );

  const desktopCbrZ = THREE.MathUtils.lerp(
    1.5,
    0,
    cbrProgress
  );

  /*
   * Mobile positions
   *
   * Keep the motorcycle much closer to the
   * center of the scene.
   */
  const mobileCbrX = THREE.MathUtils.lerp(
    0.2,
    -0.15,
    cbrProgress
  );

  const mobileCbrZ = THREE.MathUtils.lerp(
    0.5,
    0,
    cbrProgress
  );

  /*
   * Preserve the CBR orientation.
   */
  const cbrRotationY = THREE.MathUtils.lerp(
    Math.PI,
    Math.PI + 0.5,
    cbrProgress
  );

  /*
   * Africa Twin
   */
  const desktopAfricaX =
    THREE.MathUtils.lerp(
      7,
      0.8,
      africaProgress
    );

  const desktopAfricaZ =
    THREE.MathUtils.lerp(
      -3,
      -1,
      africaProgress
    );

  const mobileAfricaX =
    THREE.MathUtils.lerp(
      2.5,
      0.3,
      africaProgress
    );

  const mobileAfricaZ =
    THREE.MathUtils.lerp(
      -2,
      -0.8,
      africaProgress
    );

  const africaRotationY =
    THREE.MathUtils.lerp(
      -0.7,
      -0.15,
      africaProgress
    );

  const cbrVisibility = progress < 0.55;
  const africaVisibility = progress > 0.38;

  /*
   * CSS viewport detection is not available inside
   * the R3F render calculation, so we use a responsive
   * camera-safe scale strategy.
   *
   * The camera is responsible for fitting the model.
   */
  const isMobile =
    typeof window !== "undefined" &&
    window.innerWidth < 768;

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
        args={[
          "#050505",
          10,
          32,
        ]}
      />

      <ShowroomEnvironment
        progress={progress}
      />

      {cbrVisibility && (
        <group
          position={[
            isMobile
              ? mobileCbrX
              : desktopCbrX,

            -0.02,

            isMobile
              ? mobileCbrZ
              : desktopCbrZ,
          ]}
        >
          <MotorcycleModel
            url="/models/cbr650r.glb"
            scale={
              isMobile
                ? 1.25
                : 1.6
            }
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
            isMobile
              ? mobileAfricaX
              : desktopAfricaX,

            -0.02,

            isMobile
              ? mobileAfricaZ
              : desktopAfricaZ,
          ]}
        >
          <MotorcycleModel
            url="/models/africa-twin.glb"
            scale={
              isMobile
                ? 1.1
                : 1.35
            }
            rotation={[
              0,
              africaRotationY,
              0,
            ]}
          />
        </group>
      )}

      <mesh
        position={[
          0,
          -0.78,
          -1,
        ]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <circleGeometry
          args={[5, 64]}
        />

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