import { useGLTF, Center, Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import hashModel from "../assets/models/hash.glb";
import { DEFAULT_MATERIAL_CONFIG, MODELS_CONFIG } from "../config/modelsConfig";

const MODEL_NAME = "Hash";
const config = { ...DEFAULT_MATERIAL_CONFIG, ...MODELS_CONFIG[MODEL_NAME] };

export const HashModel = ({
  position,
  path = hashModel,
  scale = config.scale,
}) => {
  const { scene } = useGLTF(path);
  const lightningRef = useRef();

  useFrame((state, delta) => {
    if (lightningRef.current) {
      lightningRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group
      ref={lightningRef}
      position={position}
      rotation={config.groupRotation || [0, 0, 0]}
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