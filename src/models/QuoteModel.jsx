import { useGLTF, MeshTransmissionMaterial, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import quoteModel from "../assets/models/quote.gltf";

export const QuoteModel = ({
  position,
  path = quoteModel,
  scale = 3,
  transmission = 1,
  roughness = 0.05,
  thickness = 0.8,
  ior = 1.5
}) => {
  const { nodes } = useGLTF(path);
  const lightningRef = useRef();

  useFrame((state, delta) => {
    if (lightningRef.current) {
      lightningRef.current.rotation.y += delta * 0.5;
      lightningRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * .005;
    }
  });

  return (
    <group
      ref={lightningRef}
      position={position}
      scale={scale}
      renderOrder={50}
    >
      <Center>
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
                  chromaticAberration={0}
                  anisotropicBlur={0.1}
                  distortion={0.1}
                  distortionScale={0.1}
                  backside={true}
                  samples={16}
                  resolution={1024}
                  color="#ffffff"
                />
              </mesh>
            );
          }
          return null;
        })}
      </Center>
    </group>
  );
};