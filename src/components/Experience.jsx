import { OrbitControls, ScrollControls, Scroll } from "@react-three/drei";
import { Carousel3D } from "./Carousel3D";
import { Overlay } from "./Overlay";

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls enableZoom={false} />
      <ScrollControls pages={6} damping={0.05} distance={1.5} style={{ scrollSnapType: "y mandatory" }}>
        <Carousel3D />
        <Overlay />
      </ScrollControls>
    </>
  );
};
