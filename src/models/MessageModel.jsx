import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const MessageModel = ({
  position,
  path = "/models/message.glb",
  scale = 4 ,
  intensity = 25000,
  lightColor = "#000000",
  transmission = 0.99,
  roughness = 0.1,
  thickness = 0.1,
  ior = 1.3
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

      <pointLight
        color={lightColor}
        intensity={intensity}
        distance={1}
        decay={0}
        position={[20, 20, 0]}
      />
    </group>
  );
};