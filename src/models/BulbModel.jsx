import { useGLTF, MeshTransmissionMaterial, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import bulbModel from "../assets/models/bulb.gltf";

export const BulbModel = ({
  position,
  path = bulbModel,
  scale = 3.9,
  transmission = 1,
  roughness = 0.05,
  thickness = 0.8,
  ior = 1.5
}) => {
  const { nodes } = useGLTF(path);
  const bulbRef = useRef();

  useFrame((state, delta) => {
    if (bulbRef.current) {
      bulbRef.current.rotation.y += delta * 0.2;
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
                  chromaticAberration={0}
                  anisotropicBlur={50}
                  distortion={0}
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