import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import "./App.css";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overlay";
import { Navbar } from "./components/Navbar";
import { MobileCarousel } from "./components/MobileCarousel";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";

function GradientBackground() {
  const { scene } = useThree();
  
  useEffect(() => {
    const canvas = document.createElement("canvas");
    // Using a reliable size to prevent pixelation while mapping smoothly
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    
    // Diagonal gradient to match 135deg CSS angle
    const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
    gradient.addColorStop(0, "#FDECFF");
    gradient.addColorStop(1, "#E4D1F8");
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 1024);
    
    const texture = new THREE.CanvasTexture(canvas);
    if (THREE.SRGBColorSpace) texture.colorSpace = THREE.SRGBColorSpace;
    else if (THREE.sRGBEncoding) texture.encoding = THREE.sRGBEncoding;
    
    scene.background = texture;
    
    return () => {
      scene.background = null;
      texture.dispose();
    };
  }, [scene]);

  return null;
}

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
      <div className="app-container" style={{ background: "linear-gradient(135deg, #FDECFF, #E4D1F8)", minHeight: "100vh" }}>
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
          <GradientBackground />
          <Experience />
        </Canvas>
      </div>

      <Navbar />
      <Overlay />

      {/* Scroll area for GSAP ScrollTrigger (3D Carousel) */}
      <div style={{ height: "3500vh", width: "100%" }}></div>
    </div>
  );
}

export default App;
