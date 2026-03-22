import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Experience } from "./components/Experience";

function App() {
  return (
    <Canvas
      camera={{
        fov: 64,
        position: [0, 0.5, 20],
      }}
    >
      <color attach="background" args={["#D0DDF3"]} />
      <Experience />
    </Canvas>
  );
}

export default App;
