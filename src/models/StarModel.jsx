import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const StarModel = ({
  position,
  path = "/models/star.glb",
  scale = 3,
  intensity = 5000,
  lightColor = "#ffffff",
  transmission = 1,
  roughness = 0.25,
  thickness = 0.5,
  ior = 1.2
}) => {
  const { nodes } = useGLTF(path);
  const lightningRef = useRef();

  useFrame((state) => {
    if (lightningRef.current) {
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
        distance={20}
        decay={2}
        position={[0, 20, 0]}
      />
    </group>
  );
};