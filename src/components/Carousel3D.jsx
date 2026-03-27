import { Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const RADIUS = 200;
export const THETA = Math.PI / 20;
export const PIN_DURATION = 0.3;

const NUM_CARDS = 6;

export function Carousel3D(props) {
  const ref = useRef();
  const tl = useRef();
  const text1 = useRef();
  const text2 = useRef();
  const text3 = useRef();
  const text4 = useRef();
  const text5 = useRef();
  const text6 = useRef();

  const { size } = useThree();
  const responsiveScale = size.width / 1440;

  useLayoutEffect(() => {
    // ─── Setup GSAP Timeline with ScrollTrigger ─────────────────────────────
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 3, // Smooth lag for a heavy/draggy feel
      }
    });

    // ── Ferris-wheel drum rotation (with flat spots for pinning) ───────────
    for (let i = 0; i < NUM_CARDS - 1; i++) {
      tl.current.to(
        ref.current.rotation,
        {
          duration: 1 - PIN_DURATION,
          x: THETA * (i + 1),
          ease: "power2.inOut",
        },
        i + PIN_DURATION / 2
      );
    }

    // ── Unified entry/exit helper ─────────────────────────
    function animateCard(textRef, peakTime, exitTime, exitUp = false) {
      // ENTRY ANIMATION
      // Finish entry just before the pin starts
      const entryEndTime = peakTime - PIN_DURATION / 2;
      const entryStartTime = Math.max(0, entryEndTime - 1.2);

      if (entryStartTime >= 0 && entryStartTime < entryEndTime) {
        const inDur = entryEndTime - entryStartTime;
        tl.current.fromTo(
          textRef.current.scale,
          { x: 0.4, y: 0.4, z: 0.4 },
          { duration: inDur, x: 1, y: 1, z: 1, ease: "sine.out" },
          entryStartTime
        );
        tl.current.fromTo(
          textRef.current.rotation,
          { z: -0.15, y: -0.2 },
          { duration: inDur, z: 0, y: 0, ease: "sine.out" },
          entryStartTime
        );
        tl.current.fromTo(
          textRef.current.position,
          { x: 2, y: 0 },
          { duration: inDur, x: 0, y: 0, ease: "sine.out" },
          entryStartTime
        );
      }

      // EXIT ANIMATION
      // Start exit just after the pin ends
      if (exitTime !== null) {
        const exitStartTime = peakTime + PIN_DURATION / 2;
        const outDur = exitTime - exitStartTime;

        tl.current.to(
          textRef.current.scale,
          { duration: outDur, x: 1.8, y: 1.8, z: 1.8, ease: "sine.in" },
          exitStartTime
        );
        tl.current.to(
          textRef.current.rotation,
          { duration: outDur, z: exitUp ? -0.05 : 0.05, y: exitUp ? -0.05 : 0.05, ease: "sine.inOut" },
          exitStartTime
        );
        tl.current.to(
          textRef.current.position,
          { duration: outDur, x: -2, y: exitUp ? 2 : -0.2, ease: exitUp ? "power2.in" : "back.in(2.5)" },
          exitStartTime
        );
      }
    }

    // ── Card timings ──────────────────────────────────────────────────────
    animateCard(text1, 0, 1);
    animateCard(text2, 1, 2);
    animateCard(text3, 2, 3);
    animateCard(text4, 3, 4);
    animateCard(text5, 4, 5, true);
    animateCard(text6, 5, null);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <group scale={responsiveScale}>
      <group
        {...props}
        dispose={null}
        ref={ref}
        position={[0, 0, -RADIUS]}
      >
        <group rotation={[0, 0, 0]}>
          <Text ref={text1} lineHeight={.9} maxWidth={42} position={[0, 0, RADIUS]} fontSize={4} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
            EVERY MEANINGFUL DESIGN BEGINS WITH CURIOSITY
          </Text>
        </group>
        <group rotation={[-THETA, 0, 0]}>
          <Text ref={text2} position={[0, 0, RADIUS]} fontSize={6} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
            RESEARCH
          </Text>
        </group>
        <group rotation={[-THETA * 2, 0, 0]}>
          <Text ref={text3} position={[0, 0, RADIUS]} fontSize={5} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
            OPTIMISATION
          </Text>
        </group>
        <group rotation={[-THETA * 3, 0, 0]}>
          <Text ref={text4} position={[0, 0, RADIUS]} fontSize={6} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
            STRATEGY
          </Text>
        </group>
        <group rotation={[-THETA * 4, 0, 0]}>
          <Text ref={text5} position={[0, 0, RADIUS]} fontSize={4.5} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
            PARTNERSHIP
          </Text>
        </group>
        <group rotation={[-THETA * 5, 0, 0]}>
          <Text ref={text6} maxWidth={24} position={[0, 0, RADIUS]} fontSize={3} color="#000000" anchorX="center" anchorY="middle" textAlign="start" font="./fonts/NeueMachina-Regular.otf">
            SKILLS GATHERED OVER THE YEARS
          </Text>
        </group>
      </group>
    </group>
  );
}
