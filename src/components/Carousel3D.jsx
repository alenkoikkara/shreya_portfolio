import { useScroll, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export const RADIUS = 200;
export const THETA = Math.PI / 20;

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

  const scroll = useScroll();

  // Smoothed scroll offset — gives the heavy/draggy elastic feel
  const smoothOffset = useRef(0);

  useFrame(() => {
    if (!tl.current) return;

    const raw = scroll.offset;

    // ─── Elastic / draggy smoothing ───────────────────────────────────────
    // Low lerp factor = heavy, laggy, elastic feel. Tune between 0.03–0.09.
    const LERP_SPEED = 0.055;

    // ─── Smooth "gravity" snapping ─────────────────────────────────────────────
    // Instead of fighting the scroll offset with abrupt distance boundaries,
    // we smoothly warp the scroll target towards the nearest integer step.
    const step = 1 / (NUM_CARDS - 1);
    let nearest = Math.round(raw / step) * step;
    let rawDist = Math.abs(raw - nearest);

    // Smoothly increase magnetic pull closer to the snap point
    let pullFactor = Math.max(0, 1 - (rawDist / (step / 2)));
    pullFactor = Math.pow(pullFactor, 3); // curve the pull significantly near center

    // Mix raw scroll with magnetic pull: 60% raw, 40% nearest at max pull
    let targetOffset = raw * (1 - pullFactor * 0.45) + nearest * (pullFactor * 0.45);

    smoothOffset.current += (targetOffset - smoothOffset.current) * LERP_SPEED;
    smoothOffset.current = Math.max(0, Math.min(1, smoothOffset.current));

    tl.current.seek(smoothOffset.current * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    // ── Ferris-wheel drum rotation (unchanged) ────────────────────────────
    tl.current.to(
      ref.current.rotation,
      { duration: 5, x: THETA * 5, ease: "none" },
      0
    );

    // ── Unified entry/exit helper ─────────────────────────
    // Each card enters over the 1 second before its peakTime, and exits over the 1 second after.
    function animateCard(textRef, peakTime, exitTime) {
      // Start entry animation earlier to make it slower, but ensure it doesn't drop below time 0
      const entryTime = Math.max(0, peakTime - 1.5);

      // ENTRY ANIMATION
      if (entryTime >= 0 && entryTime < peakTime) {
        const inDur = peakTime - entryTime;
        tl.current.fromTo(
          textRef.current.scale,
          { x: 0.5, y: 0.5, z: 0.5 },
          { duration: inDur, x: 1, y: 1, z: 1, ease: "sine.in" },
          entryTime
        );
        tl.current.fromTo(
          textRef.current.rotation,
          // Fixed: set both z and y to avoid jumping since they are animated on exit
          { z: -0.05, y: -0.05 },
          { duration: inDur, z: 0, y: 0, ease: "sine.in" },
          entryTime
        );
        tl.current.fromTo(
          textRef.current.position,
          { x: 2, y: 0 },
          { duration: inDur, x: 0, y: 0, ease: "sine.in" },
          entryTime
        );
      }

      // EXIT ANIMATION
      if (exitTime !== null) {
        const outDur = exitTime - peakTime;
        tl.current.fromTo(
          textRef.current.scale,
          { x: 1, y: 1, z: 1 },
          { duration: outDur, x: 1.4, y: 1.4, z: 1.4, ease: "sine.out" },
          peakTime
        );
        tl.current.fromTo(
          textRef.current.rotation,
          // Fixed: explicitly define both start properties instead of just y
          { z: 0, y: 0 },
          { duration: outDur, z: 0.05, y: 0.05, ease: "sine.inOut" },
          peakTime
        );
        tl.current.fromTo(
          textRef.current.position,
          { x: 0, y: 0 },
          // Fixed: back.in achieves the 'move slight left' pull-back effect you wanted, with a curved y
          { duration: outDur, x: 2, y: -0.2, ease: "back.in(2.5)" },
          peakTime
        );
      }
    }

    // ── Card timings ──────────────────────────────────────────────────────
    // Timeline duration = 5 (matches drum rotation).
    // Card i is centred at time i (0, 1, 2, 3, 4, 5… but drum ends at 5).
    // The exit animation happens between its peakTime and the next card's peakTime (duration 1).
    animateCard(text1, 0, 1); // peaks at t=0, exits from 0 to 1
    animateCard(text2, 1, 2); // peaks at t=1, exits from 1 to 2
    animateCard(text3, 2, 3); // peaks at t=2, exits from 2 to 3
    animateCard(text4, 3, 4); // peaks at t=3, exits from 3 to 4
    animateCard(text5, 4, 5); // peaks at t=4, exits from 4 to 5
    animateCard(text6, 5, null); // peaks at t=5 (end, no exit animation)
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
        <Text ref={text2} position={[0, 0, RADIUS]} fontSize={6} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
          RESEARCH
        </Text>
      </group>
      <group rotation={[-THETA * 2, 0, 0]}>
        <Text ref={text3} position={[0, 0, RADIUS]} fontSize={6} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
          OPTIMISATION
        </Text>
      </group>
      <group rotation={[-THETA * 3, 0, 0]}>
        <Text ref={text4} position={[0, 0, RADIUS]} fontSize={6} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
          STRATEGY
        </Text>
      </group>
      <group rotation={[-THETA * 4, 0, 0]}>
        <Text ref={text5} position={[0, 0, RADIUS]} fontSize={6} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
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
