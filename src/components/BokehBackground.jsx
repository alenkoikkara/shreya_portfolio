import { useMemo, useRef, forwardRef, useImperativeHandle } from "react";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const BokehBlob = forwardRef(({ offset, color, size, speed }, ref) => {
  const groupRef = useRef();
  const meshRef = useRef();
  const colorObj = useMemo(() => new THREE.Color(color), []);

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uColor: { value: colorObj },
      uOpacity: { value: 0.2 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform vec3 uColor;
      uniform float uOpacity;
      void main() {
        float dist = distance(vUv, vec2(0.5));
        float alpha = smoothstep(0.5, 0.0, dist);
        gl_FragColor = vec4(uColor, alpha * uOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
  }), []);

  useImperativeHandle(ref, () => ({
    setColor: (newColor) => {
      meshRef.current.material.uniforms.uColor.value.lerp(new THREE.Color(newColor), 0.05);
    },
    get group() { return groupRef.current; },
    get material() { return meshRef.current.material; }
  }));

  return (
    <group ref={groupRef}>
      <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef} position={offset}>
          <circleGeometry args={[size, 64]} />
          <shaderMaterial args={[shaderArgs]} />
          <directionalLight
            color={color}
            intensity={1000 * (size / 1)}
            distance={150}
            decay={.1}
          />
        </mesh>
      </Float>
    </group>
  );
});

export const BokehBackground = forwardRef((props, ref) => {
  const groupRef = useRef();
  const blob1 = useRef();
  const blob2 = useRef();

  useImperativeHandle(ref, () => ({
    get group() { return groupRef.current; },
    // Direct access to blobs for GSAP
    get blobs() {
      return [blob1.current, blob2.current];
    }
  }));

  return (
    <group ref={groupRef} position={[30, -30, -50]}>
      {/* Stationary point lights that don't move with scroll */}
      <ambientLight
        color="#FFE5B4"
        intensity={10000}
        distance={150}
        decay={0.8}
      />
      <ambientLight
        color="#FFE5B4"
        intensity={10000}
        distance={150}
        decay={0.8}
      />

      <BokehBlob
        ref={blob1}
        offset={[-68, -2, 0]}
        color="#FFE5B4"
        size={25}
        speed={1}
      />
      <BokehBlob
        ref={blob2}
        offset={[8, 5, 0]}  
        color="#FFE5B4"
        size={15}
        speed={1.2}
      />
    </group>
  );
});
