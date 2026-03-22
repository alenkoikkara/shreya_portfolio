import { useScroll, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import React, { useLayoutEffect, useRef } from "react";

export const RADIUS = 200;
export const THETA = Math.PI / 20;

export function Office(props) {
  const ref = useRef();
  const tl = useRef();
  const text1 = useRef();
  const text2 = useRef();
  const text3 = useRef();
  const text4 = useRef();
  const text5 = useRef();
  const text6 = useRef();

  const scroll = useScroll();

  useFrame(() => {
    if (tl.current) {
      tl.current.seek(scroll.offset * tl.current.duration());
    }
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    // ============================================
    // 3D CIRCLE ANIMATION (Ferris Wheel Revolution)
    // ============================================
    // Revolve the entire drum containing 6 text elements
    tl.current.to(
      ref.current.rotation,
      {
        duration: 5,
        x: THETA * 5, // Rotates exactly far enough to smoothly stop when the 6th text reaches the apex
      },
      0
    );

    // ============================================
    // TEXT 1 (Starts at center)
    // ============================================
    tl.current.to(text1.current.scale, { duration: 1, x: 2, y: 2, z: 2 }, 0);
    tl.current.to(text1.current.rotation, { duration: 1, z: 10 * (Math.PI / 180) }, 0);
    tl.current.to(text1.current.position, { duration: 1, x: 6 }, 0);

    // ============================================
    // TEXT 2
    // ============================================
    tl.current.from(text2.current.scale, { duration: 1, x: 0.8, y: 0.8, z: 0.8 }, 0);
    tl.current.from(text2.current.rotation, { duration: 2, z: -1 * (Math.PI / 180) }, 0);

    tl.current.to(text2.current.scale, { duration: 1, x: 2, y: 2, z: 2 }, 1);
    tl.current.to(text2.current.rotation, { duration: 1, z: 10 * (Math.PI / 180) }, 1);
    tl.current.to(text2.current.position, { duration: 1, x: 6 }, 1);

    // ============================================
    // TEXT 3
    // ============================================
    tl.current.from(text3.current.scale, { duration: 1, x: 0.8, y: 0.8, z: 0.8 }, 1);
    tl.current.from(text3.current.rotation, { duration: 1, z: -1 * (Math.PI / 180) }, 1);

    tl.current.to(text3.current.scale, { duration: 1, x: 2, y: 2, z: 2 }, 2);
    tl.current.to(text3.current.rotation, { duration: 1, z: 10 * (Math.PI / 180) }, 2);
    tl.current.to(text3.current.position, { duration: 1, x: 6 }, 2);

    // ============================================
    // TEXT 4
    // ============================================
    tl.current.from(text4.current.scale, { duration: 1, x: 0.8, y: 0.8, z: 0.8 }, 2);
    tl.current.from(text4.current.rotation, { duration: 1, z: -1 * (Math.PI / 180) }, 2);

    tl.current.to(text4.current.scale, { duration: 1, x: 2, y: 2, z: 2 }, 3);
    tl.current.to(text4.current.rotation, { duration: 1, z: 10 * (Math.PI / 180) }, 3);
    tl.current.to(text4.current.position, { duration: 1, x: 6 }, 3);

    // ============================================
    // TEXT 5
    // ============================================
    tl.current.from(text5.current.scale, { duration: 1, x: 0.8, y: 0.8, z: 0.8 }, 3);
    tl.current.from(text5.current.rotation, { duration: 1, z: -1 * (Math.PI / 180) }, 3);

    tl.current.to(text5.current.scale, { duration: 1, x: 2, y: 2, z: 2 }, 4);
    tl.current.to(text5.current.rotation, { duration: 1, z: 10 * (Math.PI / 180) }, 4);
    tl.current.to(text5.current.position, { duration: 1, x: 6 }, 4);

    // ============================================
    // TEXT 6 (Final Text)
    // ============================================
    tl.current.from(text6.current.scale, { duration: 1, x: 0.8, y: 0.8, z: 0.8 }, 4);
    tl.current.from(text6.current.rotation, { duration: 1, z: -1 * (Math.PI / 180) }, 4);

  }, []);

  return (
    <group
      {...props}
      dispose={null}
      ref={ref}
      position={[0, 0, -RADIUS]}
    >
      <group rotation={[0, 0, 0]}>
        <Text ref={text1} maxWidth={41} position={[0, 0, RADIUS]} fontSize={4} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
          EVERY MEANINGFUL DESIGN BEGINS WITH CURIOSITY
        </Text>
      </group>
      <group rotation={[-THETA, 0, 0]}>
        <Text ref={text2} position={[0, 0, RADIUS]} fontSize={4} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
          RESEARCH
        </Text>
      </group>
      <group rotation={[-THETA * 2, 0, 0]}>
        <Text ref={text3} position={[0, 0, RADIUS]} fontSize={4} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
          OPTIMISATION
        </Text>
      </group>
      <group rotation={[-THETA * 3, 0, 0]}>
        <Text ref={text4} position={[0, 0, RADIUS]} fontSize={4} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
          STRATEGY
        </Text>
      </group>
      <group rotation={[-THETA * 4, 0, 0]}>
        <Text ref={text5} position={[0, 0, RADIUS]} fontSize={4} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
          PARTNERSHIP
        </Text>
      </group>
      <group rotation={[-THETA * 5, 0, 0]}>
        <Text ref={text6} position={[0, 0, RADIUS]} fontSize={4} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
          SKILLS {"\n"} GATHERED {"\n"}OVER {"\n"}THE {"\n"}YEARS
        </Text>
      </group>
    </group>
  );
}
