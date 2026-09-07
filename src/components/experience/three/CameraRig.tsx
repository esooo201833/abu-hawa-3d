"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type CameraRigProps = {
  progress: number;
};

export function CameraRig({ progress }: CameraRigProps) {
  const { camera, size } = useThree();

  const [isMobile, setIsMobile] = useState(false);

  const currentPosition = useRef(
    new THREE.Vector3(0, 2.2, 11)
  );

  const currentTarget = useRef(
    new THREE.Vector3(0, 1, 0)
  );

  const desiredPosition = useRef(
    new THREE.Vector3()
  );

  const desiredTarget = useRef(
    new THREE.Vector3()
  );

  useEffect(() => {
    setIsMobile(size.width < 768);
  }, [size.width]);

  const smoothStep = (value: number) => {
    const clamped = THREE.MathUtils.clamp(value, 0, 1);

    return clamped * clamped * (3 - 2 * clamped);
  };

  useFrame((_, delta) => {
    let targetX = 0;
    let targetY = 2.2;
    let targetZ = 11;

    let lookX = 0;
    let lookY = 1;
    let lookZ = 0;

    if (!isMobile) {
      /*
       * DESKTOP
       * Keep the existing cinematic camera exactly as it was.
       */

      if (progress < 0.18) {
        const p = smoothStep(progress / 0.18);

        targetX = THREE.MathUtils.lerp(0, 0.5, p);
        targetY = THREE.MathUtils.lerp(2.2, 1.5, p);
        targetZ = THREE.MathUtils.lerp(11, 7, p);

        lookX = 0;
        lookY = 1;
      } else if (progress < 0.42) {
        const p = smoothStep(
          (progress - 0.18) / 0.24
        );

        targetX = THREE.MathUtils.lerp(
          0.5,
          -2.8,
          p
        );

        targetY = THREE.MathUtils.lerp(
          1.5,
          1.8,
          p
        );

        targetZ = THREE.MathUtils.lerp(
          7,
          5.1,
          p
        );

        lookX = THREE.MathUtils.lerp(
          0,
          0.3,
          p
        );

        lookY = 1;
      } else if (progress < 0.68) {
        const p = smoothStep(
          (progress - 0.42) / 0.26
        );

        targetX = THREE.MathUtils.lerp(
          -2.8,
          3.2,
          p
        );

        targetY = THREE.MathUtils.lerp(
          1.8,
          2.5,
          p
        );

        targetZ = THREE.MathUtils.lerp(
          5.1,
          7.2,
          p
        );

        lookX = THREE.MathUtils.lerp(
          0.3,
          0.5,
          p
        );

        lookY = THREE.MathUtils.lerp(
          1,
          1.3,
          p
        );
      } else {
        const p = smoothStep(
          (progress - 0.68) / 0.32
        );

        targetX = THREE.MathUtils.lerp(
          3.2,
          0,
          p
        );

        targetY = THREE.MathUtils.lerp(
          2.5,
          3.2,
          p
        );

        targetZ = THREE.MathUtils.lerp(
          7.2,
          10.5,
          p
        );

        lookX = THREE.MathUtils.lerp(
          0.5,
          0,
          p
        );

        lookY = THREE.MathUtils.lerp(
          1.3,
          0.5,
          p
        );
      }
    } else {
      /*
       * MOBILE
       *
       * Mobile screens are much narrower.
       * Keep the camera centered around the motorcycle
       * and increase the distance so the complete model
       * fits inside the viewport.
       */

      if (progress < 0.18) {
        const p = smoothStep(progress / 0.18);

        targetX = THREE.MathUtils.lerp(
          0,
          0,
          p
        );

        targetY = THREE.MathUtils.lerp(
          2.0,
          1.6,
          p
        );

        targetZ = THREE.MathUtils.lerp(
          14,
          10.5,
          p
        );

        lookX = 0;
        lookY = 0.9;
      } else if (progress < 0.42) {
        const p = smoothStep(
          (progress - 0.18) / 0.24
        );

        targetX = THREE.MathUtils.lerp(
          0,
          -1.2,
          p
        );

        targetY = THREE.MathUtils.lerp(
          1.6,
          1.8,
          p
        );

        targetZ = THREE.MathUtils.lerp(
          10.5,
          8.5,
          p
        );

        lookX = THREE.MathUtils.lerp(
          0,
          0.1,
          p
        );

        lookY = 0.9;
      } else if (progress < 0.68) {
        const p = smoothStep(
          (progress - 0.42) / 0.26
        );

        targetX = THREE.MathUtils.lerp(
          -1.2,
          1.4,
          p
        );

        targetY = THREE.MathUtils.lerp(
          1.8,
          2.1,
          p
        );

        targetZ = THREE.MathUtils.lerp(
          8.5,
          10,
          p
        );

        lookX = THREE.MathUtils.lerp(
          0.1,
          0.2,
          p
        );

        lookY = 1;
      } else {
        const p = smoothStep(
          (progress - 0.68) / 0.32
        );

        targetX = THREE.MathUtils.lerp(
          1.4,
          0,
          p
        );

        targetY = THREE.MathUtils.lerp(
          2.1,
          2.6,
          p
        );

        targetZ = THREE.MathUtils.lerp(
          10,
          13,
          p
        );

        lookX = THREE.MathUtils.lerp(
          0.2,
          0,
          p
        );

        lookY = THREE.MathUtils.lerp(
          1,
          0.7,
          p
        );
      }
    }

    desiredPosition.current.set(
      targetX,
      targetY,
      targetZ
    );

    desiredTarget.current.set(
      lookX,
      lookY,
      lookZ
    );

    const damping =
      1 - Math.exp(-5 * delta);

    currentPosition.current.lerp(
      desiredPosition.current,
      damping
    );

    currentTarget.current.lerp(
      desiredTarget.current,
      damping
    );

    camera.position.copy(
      currentPosition.current
    );

    camera.lookAt(
      currentTarget.current
    );
  });

  return null;
}