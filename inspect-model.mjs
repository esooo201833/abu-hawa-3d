import fs from "fs";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const filePath = "./public/models/cbr650r.glb";

const loader = new GLTFLoader();

const buffer = fs.readFileSync(filePath);

loader.parse(
  buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  ),
  "./public/models/",
  (gltf) => {
    console.log("\n==============================");
    console.log("CBR650R GLB NODES");
    console.log("==============================\n");

    gltf.scene.traverse((object) => {
      const p = object.position;
      const s = object.scale;
      const r = object.rotation;

      console.log(
        `[${object.type}]`,
        object.name || "(no name)",
        "| position:",
        `x=${p.x.toFixed(4)}`,
        `y=${p.y.toFixed(4)}`,
        `z=${p.z.toFixed(4)}`,
        "| scale:",
        `x=${s.x.toFixed(4)}`,
        `y=${s.y.toFixed(4)}`,
        `z=${s.z.toFixed(4)}`,
        "| rotation:",
        `x=${r.x.toFixed(4)}`,
        `y=${r.y.toFixed(4)}`,
        `z=${r.z.toFixed(4)}`
      );
    });

    console.log("\n==============================");
    console.log("DONE");
    console.log("==============================\n");
  },
  (error) => {
    console.error("GLB PARSE ERROR:");
    console.error(error);
  }
);