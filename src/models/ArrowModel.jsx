import { useGLTF, MeshTransmissionMaterial, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import arrowModel from "../assets/models/msg.glb";

export const ArrowModel = ({
  position,
  path = arrowModel,
  scale = 3,
  transmission = 1,
  roughness = 0.09,
  thickness = 8.9,
  ior = 1.2
}) => {
  const { nodes } = useGLTF(path);
  const lightningRef = useRef();

  useFrame((state, delta) => {
    if (lightningRef.current) {
      lightningRef.current.rotation.y += delta * 0.4;
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
      <Center>
        {Object.values(nodes).map((node, i) => {
          if (node.isMesh) {
            return (
              <mesh
                key={i}
              geometry={node.geometry}
              position={node.position}
              rotation={[90 * (Math.PI / 180), -2 * (Math.PI / 180), 0 * (Math.PI / 180)]}
              scale={node.scale}
            >
              <MeshTransmissionMaterial
                transmission={transmission}
                roughness={roughness}
                thickness={thickness}
                ior={ior}
                chromaticAberration={0}
                anisotropicBlur={1}
                distortion={0}
                temporalDistortion={3}
                // backside={true}
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