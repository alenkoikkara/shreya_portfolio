import { useGLTF, Center, Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import folderModel from "../assets/models/folder.glb";
import { DEFAULT_MATERIAL_CONFIG, MODELS_CONFIG } from "../config/modelsConfig";

const MODEL_NAME = "Folder";
const config = { ...DEFAULT_MATERIAL_CONFIG, ...MODELS_CONFIG[MODEL_NAME] };

export const FolderModel = ({
  position,
  path = folderModel,
  scale = config.scale,
  active = true,
}) => {
  const { scene } = useGLTF(path);
  const lightningRef = useRef();

  useFrame((state, delta) => {
    if (lightningRef.current && active) {
      lightningRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group
      ref={lightningRef}
      position={position}
      rotation={config.groupRotation || [0 * (Math.PI / 180), 140 * (Math.PI / 180), -25 * (Math.PI / 180)]}
      scale={scale}
      renderOrder={50}
    >
      <Environment preset="city" />
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
};