import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import face3Model from "../assets/models/face3.glb";
import { DEFAULT_MATERIAL_CONFIG, MODELS_CONFIG } from "../config/modelsConfig";

const MODEL_NAME = "Face3";
const config = { ...DEFAULT_MATERIAL_CONFIG, ...MODELS_CONFIG[MODEL_NAME] };

export const Face3Model = ({
  position,
  path = face3Model,
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
  const lightningRef = useRef();

  useFrame((state) => {
    if (lightningRef.current) {
      lightningRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * .05;
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