import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overlay";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app-container">
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Canvas
          camera={{
            fov: 64,
            position: [0, 0.5, 20],
          }}
        >
          <color attach="background" args={["#D0DDF3"]} />
          <Experience />
        </Canvas>
      </div>

      <Overlay />

      {/* Scroll area for GSAP ScrollTrigger (3D Carousel) */}
      <div style={{ height: "1600vh", width: "100%" }}></div>
    </div>
  );
}

export default App;
