import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import brainModel from "../assets/models/brain.gltf";
import { DEFAULT_MATERIAL_CONFIG, MODELS_CONFIG } from "../config/modelsConfig";

const MODEL_NAME = "Brain";
const config = { ...DEFAULT_MATERIAL_CONFIG, ...MODELS_CONFIG[MODEL_NAME] };

export const BrainModel = ({
  position,
  path = brainModel,
  scale = config.scale,
  transmission = config.transmission,
  roughness = config.roughness,
  thickness = config.thickness,
  ior = config.ior,
  color = config.color,
  chromaticAberration = config.chromaticAberration,
  anisotropicBlur = config.anisotropicBlur,
  distortion = config.distortion,
  distortionScale = config.distortionScale,
  samples = config.samples,
  resolution = config.resolution,
  backside = config.backside,
}) => {
  const { nodes } = useGLTF(path);
  const bulbRef = useRef();

  useFrame((state) => {
    if (bulbRef.current) {
      bulbRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      bulbRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * .005;
    }
  });

  return (
    <group
      ref={bulbRef}
      position={position}
      scale={scale}
      renderOrder={50}
    >
      {Object.values(nodes).map((node, i) => {
        if (node.isMesh) {
          return (
            <mesh
              key={i}
              geometry={node.geometry}
              position={node.position}
              rotation={node.rotation}
              scale={node.scale}
            >
              <MeshTransmissionMaterial
                transmission={transmission}
                roughness={roughness}
                thickness={thickness}
                ior={ior}
                chromaticAberration={chromaticAberration}
                anisotropicBlur={anisotropicBlur}
                distortion={distortion}
                distortionScale={distortionScale}
                backside={backside}
                samples={samples}
                resolution={resolution}
                color={color}
              />
            </mesh>
          );
        }
        return null;
      })}
    </group>
  );
};