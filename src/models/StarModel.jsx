import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import starModel from "../assets/models/star.glb";

export const StarModel = ({
  position,
  path = starModel,
  scale = 3,
  transmission = 1.5,
  roughness = 0.1,
  thickness = 0.3,
  ior = 2
}) => {
  const { nodes } = useGLTF(path);
  const lightningRef = useRef();

  useFrame((state) => {
    if (lightningRef.current) {
      // lightningRef.current.rotation.y = state.clock.elapsedTime * 0.1;
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