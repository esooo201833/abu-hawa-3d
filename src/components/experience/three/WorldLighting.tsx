"use client";

export function WorldLighting() {
  return (
    <>
      <ambientLight intensity={0.45} />

      <directionalLight
        position={[5, 8, 6]}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <pointLight
        position={[-5, 3, 3]}
        intensity={20}
        distance={14}
        decay={2}
      />

      <pointLight
        position={[6, 2, -4]}
        intensity={15}
        distance={12}
        decay={2}
      />
    </>
  );
}