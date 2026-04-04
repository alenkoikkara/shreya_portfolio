import { OrbitControls, Environment } from "@react-three/drei";
import { Carousel3D } from "./Carousel3D";
import { BokehBackground } from "./BokehBackground";
import { useRef } from "react";

export const Experience = () => {
  const bokehRef = useRef();

  return (
    <>
      <Environment preset="city" blur={1.1} />
      <ambientLight intensity={0.4} />
      <pointLight 
        position={[0, 20, 40]} 
        intensity={20000} 
        distance={200} 
        decay={2} 
        color="#ffffff" 
      />
      <BokehBackground ref={bokehRef} />
      <Carousel3D bokehRef={bokehRef} />
    </>
  );
};
