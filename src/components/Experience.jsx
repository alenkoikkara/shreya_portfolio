import { OrbitControls, ScrollControls, Scroll } from "@react-three/drei";
import { Office } from "./Office";
import { Overlay } from "./Overlay";

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls enableZoom={false} />
      <ScrollControls pages={6} damping={0.05} distance={1.5} style={{ scrollSnapType: "y mandatory" }}>

        <Scroll html style={{ width: "100%" }}>
          <div style={{ height: "100vh", scrollSnapAlign: "center" }} />
          <div style={{ height: "100vh", scrollSnapAlign: "center" }} />
          <div style={{ height: "100vh", scrollSnapAlign: "center" }} />
          <div style={{ height: "100vh", scrollSnapAlign: "center" }} />
          <div style={{ height: "100vh", scrollSnapAlign: "center" }} />
          <div style={{ height: "100vh", scrollSnapAlign: "center" }} />
        </Scroll>

        <Office />
      </ScrollControls>
    </>
  );
};
