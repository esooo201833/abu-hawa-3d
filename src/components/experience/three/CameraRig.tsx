"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type CameraRigProps = {
  progress: number;
};

export function CameraRig({ progress }: CameraRigProps) {
  const { camera } = useThree();

  const currentPosition = useRef(
    new THREE.Vector3(0, 2.2, 11)
  );

  const currentTarget = useRef(
    new THREE.Vector3(0, 1, 0)
  );

  const desiredPosition = new THREE.Vector3();
  const desiredTarget = new THREE.Vector3();

  const smoothStep = (value: number) => {
    return value * value * (3 - 2 * value);
  };

  useFrame((_, delta) => {
    let targetX = 0;
    let targetY = 2.2;
    let targetZ = 11;

    let lookX = 0;
    let lookY = 1;
    let lookZ = 0;

    /*
     * INTRO
     */
    if (progress < 0.18) {
      const p = smoothStep(progress / 0.18);

      targetX = THREE.MathUtils.lerp(0, 0.5, p);
      targetY = THREE.MathUtils.lerp(2.2, 1.5, p);
      targetZ = THREE.MathUtils.lerp(11, 7, p);

      lookX = THREE.MathUtils.lerp(0, 0, p);
      lookY = 1;
    }

    /*
     * CBR650R
     */
    else if (progress < 0.42) {
      const p = smoothStep((progress - 0.18) / 0.24);

      targetX = THREE.MathUtils.lerp(0.5, -2.8, p);
      targetY = THREE.MathUtils.lerp(1.5, 1.8, p);
      targetZ = THREE.MathUtils.lerp(7, 5.1, p);

      lookX = THREE.MathUtils.lerp(0, 0.3, p);
      lookY = 1;
    }

    /*
     * TRANSITION TO AFRICA TWIN
     */
    else if (progress < 0.68) {
      const p = smoothStep((progress - 0.42) / 0.26);

      targetX = THREE.MathUtils.lerp(-2.8, 3.2, p);
      targetY = THREE.MathUtils.lerp(1.8, 2.5, p);
      targetZ = THREE.MathUtils.lerp(5.1, 7.2, p);

      lookX = THREE.MathUtils.lerp(0.3, 0.5, p);
      lookY = THREE.MathUtils.lerp(1, 1.3, p);
    }

    /*
     * SHOWROOM
     */
    else {
      const p = smoothStep(
        Math.min(1, (progress - 0.68) / 0.32)
      );

      targetX = THREE.MathUtils.lerp(3.2, 0, p);
      targetY = THREE.MathUtils.lerp(2.5, 3.2, p);
      targetZ = THREE.MathUtils.lerp(7.2, 10.5, p);

      lookX = THREE.MathUtils.lerp(0.5, 0, p);
      lookY = THREE.MathUtils.lerp(1.3, 0.5, p);
    }

    desiredPosition.set(targetX, targetY, targetZ);
    desiredTarget.set(lookX, lookY, lookZ);

    const damping = 1 - Math.exp(-5 * delta);

    currentPosition.current.lerp(
      desiredPosition,
      damping
    );

    currentTarget.current.lerp(
      desiredTarget,
      damping
    );

    camera.position.copy(currentPosition.current);

    camera.lookAt(currentTarget.current);
  });

  return null;
}