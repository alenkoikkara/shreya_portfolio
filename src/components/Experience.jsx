import { OrbitControls } from "@react-three/drei";
import { Carousel3D } from "./Carousel3D";

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls enableZoom={false} />
      <Carousel3D />
    </>
  );
};
