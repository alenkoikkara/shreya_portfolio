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
      <BokehBackground ref={bokehRef} />
      <Carousel3D bokehRef={bokehRef} />
    </>
  );
};
