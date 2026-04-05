import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overlay";
import { Navbar } from "./components/Navbar";
import { MobileCarousel } from "./components/MobileCarousel";
import { useEffect, useState } from "react";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="app-container" style={{ background: "#D0DDF3", minHeight: "100vh" }}>
        <Navbar />
        <MobileCarousel />
      </div>
    );
  }

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

      <Navbar />
      <Overlay />

      {/* Scroll area for GSAP ScrollTrigger (3D Carousel) */}
      <div style={{ height: "2000vh", width: "100%" }}></div>
    </div>
  );
}

export default App;
