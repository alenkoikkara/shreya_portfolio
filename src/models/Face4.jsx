import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import face4Model from "../assets/models/face4.glb";

export const Face4Model = ({
  position,
  path = face4Model,
  scale = 3,
  transmission = 1,
  roughness = 0.05,
  thickness = 0.8,
  ior = 1.5
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
      rotation={[100 * (Math.PI / 180), 180 * (Math.PI / 180), 0]}
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
                chromaticAberration={0.03}
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
    </group>
  );
};