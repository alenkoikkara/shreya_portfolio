import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overlay";
import { Navbar } from "./components/Navbar";
import { MobileCarousel } from "./components/MobileCarousel";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    // Loading screen timer
    const timer = setTimeout(() => {
      setIsFinished(true); // Triggers fade-out
    }, 2000);

    // Remove from DOM after transition
    const cleanupTimer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
      clearTimeout(cleanupTimer);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="app-container" style={{ background: "#D0DDF3", minHeight: "100vh" }}>
        {isLoading && <LoadingScreen isFinished={isFinished} />}
        <Navbar />
        <MobileCarousel />
      </div>
    );
  }

  return (
    <div className="app-container">
      {isLoading && <LoadingScreen isFinished={isFinished} />}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Canvas
          camera={{
            fov: 64,
            position: [0, 0.5, 20],
          }}
        >
          <color attach="background" args={["#E4D1F8"]} />
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
