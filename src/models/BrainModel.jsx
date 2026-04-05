import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import brainModel from "../assets/models/brain.glb";

export const BrainModel = ({
  position,
  path = brainModel,
  scale = 3,
  intensity = 35000,
  lightColor = "#ffffff",
  transmission = 1,
  roughness = 0,
  thickness = 0.8,
  ior = 1.2
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
                chromaticAberration={0.0}
                anisotropicBlur={0.1}
                distortion={0.5}
                distortionScale={0.5}
                backside={true}
                samples={10}
                resolution={1024}
                color="#ffffff"
              />
            </mesh>
          );
        }
        return null;
      })}
    </group>
  );
};