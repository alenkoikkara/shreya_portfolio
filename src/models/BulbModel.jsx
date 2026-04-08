import { useGLTF, MeshTransmissionMaterial, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import bulbModel from "../assets/models/bulb.gltf";

export const BulbModel = ({
  position,
  path = bulbModel,
  scale = 3.9,
  transmission = 1,
  roughness = 0,
  thickness = 20,
  ior = 1.4
}) => {
  const { nodes } = useGLTF(path);
  const bulbRef = useRef();

  useFrame((state, delta) => {
    if (bulbRef.current) {
      bulbRef.current.rotation.y += delta * 0.2;
      bulbRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * .05;
    }
  });

  return (
    <group
      ref={bulbRef}
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
                anisotropicBlur={1.5}
                distortion={0.5}
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