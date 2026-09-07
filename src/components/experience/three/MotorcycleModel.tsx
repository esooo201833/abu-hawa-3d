"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";

type MotorcycleModelProps = {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  visible?: boolean;
};

export function MotorcycleModel({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  visible = true,
}: MotorcycleModelProps) {
  const { scene } = useGLTF(url);

  const clonedScene = useMemo(() => {
    /*
     * IMPORTANT:
     * This motorcycle is a rigged/skinned GLB.
     *
     * SkeletonUtils.clone() preserves:
     * - Bones
     * - Skeleton
     * - SkinnedMesh
     * - Bone relationships
     *
     * Using scene.clone(true) here can break
     * the relationship between the motorcycle body
     * and its wheels.
     */
    const clone = cloneSkeleton(scene);

    /*
     * Calculate the complete model bounds.
     */
    const box = new THREE.Box3().setFromObject(clone);

    const center = new THREE.Vector3();

    box.getCenter(center);

    /*
     * Center the motorcycle horizontally
     * and place its lowest point on Y = 0.
     */
    clone.position.x -= center.x;
    clone.position.y -= box.min.y;
    clone.position.z -= center.z;

    /*
     * Configure all meshes.
     */
    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) {
        return;
      }

      object.castShadow = true;
      object.receiveShadow = true;

      /*
       * Clone materials so each motorcycle
       * has independent material instances.
       */
      if (Array.isArray(object.material)) {
        object.material = object.material.map((material) =>
          material.clone()
        );
      } else if (object.material) {
        object.material = object.material.clone();
      }
    });

    return clone;
  }, [scene]);

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
      visible={visible}
    />
  );
}