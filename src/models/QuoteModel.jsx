import { useGLTF, MeshTransmissionMaterial, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import quoteModel from "../assets/models/quote.gltf";

export const QuoteModel = ({
  position,
    path = quoteModel,
   scale = 3,
  transmission = 0.4,
  roughness = 0.01,
  thickness = 3,
  ior = 1.4
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
                chromaticAberration={0.0}
                anisotropicBlur={0}
                distortion={0}
                distortionScale={0}
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
      </Center>
    </group>
  );
};