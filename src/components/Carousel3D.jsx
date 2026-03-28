import { Text, Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const RADIUS = 200;
export const THETA = Math.PI / 20;
export const PIN_DURATION = 0.1;

const NUM_CARDS = 5;

const SkillCard = ({ text, icon, index, setRef }) => {
  return (
    <group
      ref={setRef}
      position={[-20, -10, -5]} // Initial off-screen
    >
      <Html
        transform
        distanceFactor={10}
        portal={undefined}
        occlude={false}
      >
        <div style={{
          background: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(308px)",
          WebkitBackdropFilter: "blur(308px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "10px",
          padding: "12px 30px",
          display: "flex",
          alignItems: "center",
          gap: "18px",
          color: "black",
          whiteSpace: "nowrap",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.1)",
          fontSize: "20px",
          fontWeight: "400",
          fontFamily: "NeueMachina-Regular, sans-serif",
          userSelect: "none",
          zIndex: 100
        }}>
          <span style={{ fontSize: "1.2em", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>{icon}</span>
          <span style={{ fontSize: "1.2em", letterSpacing: "0.08em", textTransform: "uppercase" }}>{text}</span>
        </div>
      </Html>
    </group>
  );
};

export function Carousel3D(props) {
  const ref = useRef();
  const tl = useRef();
  const text1 = useRef();
  const text2 = useRef();
  const text3 = useRef();
  const text4 = useRef();
  const text5 = useRef();
  const text5Group = useRef();
  const skillsTitleRef = useRef();
  const skillsSubRef = useRef();
  const skillsContentRef = useRef();
  const skillCardsRef = useRef([]);
  const skillsGroupRef = useRef();
  
  const toolsTitleRef = useRef();
  const toolsSubRef = useRef();
  const toolsContentRef = useRef();
  const toolsGroupRef = useRef();

  const { size } = useThree();
  const responsiveScale = size.width / 1440;

  useLayoutEffect(() => {
    // ─── Setup GSAP Timeline with ScrollTrigger ─────────────────────────────
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: () => window.innerHeight * 16, // Adjusted for Skills and simplified Tools sections
        scrub: 3,
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
          { duration: outDur, z: exitUp ? -0 : 0.05, y: exitUp ? 0 : 0.05, ease: "sine.inOut" },
          exitStartTime
        );
        tl.current.to(
          textRef.current.position,
          { duration: outDur, x: -2, y: exitUp ? 20 : -0.2, ease: exitUp ? "power2.in" : "back.in(2.5)" },
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

    const exit5Start = 4 + PIN_DURATION / 2;
    const exit5Dur = 5 - exit5Start;
    tl.current.to(
      text5Group.current.rotation,
      { duration: exit5Dur, x: -THETA * 4, y: -0, ease: "power2.inOut" },
      exit5Start
    );

    // ── SKILLS SECTION ANIMATION (Starts at t=5) ───────────────────────────
    const skillsStart = 5;
    const cardStagger = 0.4;

    // 1. Skills Title & Subtitle Slide Up to Center
    tl.current.fromTo(
      skillsContentRef.current.position,
      { y: -30 },
      { y: 7, duration: 1, ease: "power2.out" },
      skillsStart
    );

    // 2. Skill Cards Sequential Flow (Continuous Ferris-Wheel Motion)
    const cardTravelDuration = 2.5; // Total time for one card to cross the screen
    let lastCardExitTime = skillsStart;

    skillCardsRef.current.forEach((card, i) => {
      if (!card) return;

      const startTime = skillsStart + 1.2 + i * cardStagger;
      const peakX = 3 + i * 0.5; // Mid-point offsets
      const peakY = 2 + i * 0.6;
      const endTime = startTime + cardTravelDuration;

      lastCardExitTime = Math.max(lastCardExitTime, endTime);

      // Entire Path: Bottom Right -> Peak -> Bottom Left
      // We use two segments with no pause back-to-back
      const segmentDuration = cardTravelDuration / 2;

      // Segment 1: Bottom Right to Peak
      tl.current.fromTo(
        card.position,
        { x: 30, y: -25, z: -10 },
        {
          duration: segmentDuration,
          x: peakX,
          y: 0,
          z: 0,
          ease: "sine.inOut"
        },
        startTime
      );
      tl.current.fromTo(
        card.rotation,
        { z: -0.3, y: 0.4 },
        { duration: segmentDuration, z: 0, y: 0, ease: "sine.inOut" },
        startTime
      );

      // Segment 2: Peak to Bottom Left
      tl.current.to(
        card.position,
        {
          duration: segmentDuration,
          x: -30,
          y: -25,
          z: -10,
          ease: "sine.inOut"
        },
        startTime + segmentDuration
      );

      tl.current.to(
        card.rotation,
        { duration: segmentDuration, z: 0.3, y: -0.4, ease: "sine.inOut" },
        startTime + segmentDuration
      );

      tl.current.to(
        card.scale,
        { duration: segmentDuration, x: 0, y: 0, z: 0, ease: "sine.in" },
        startTime + segmentDuration
      );
    });

    // 3. Final Exit (Title scrolls up after last card)
    tl.current.to(
      skillsGroupRef.current.position,
      { y: 40, duration: 1.5, ease: "power2.in" },
      lastCardExitTime + 0.5
    );

    // ── TOOLS SECTION ANIMATION (Starts after Skills) ────────────────────────
    const toolsStart = lastCardExitTime + 1.5;

    // 1. Tools Title & Subtitle Slide Up to Center
    tl.current.fromTo(
      toolsContentRef.current.position,
      { y: -30 },
      { y: 7, duration: 1, ease: "power2.out" },
      toolsStart
    );

    // 2. Tool Cards Animation Removed
    let lastToolExitTime = toolsStart + 1.5; // Text stays for 1.5 units

    // 3. Final Exit (Tools title scrolls up)
    tl.current.to(
      toolsGroupRef.current.position,
      { y: 40, duration: 1.5, ease: "power2.in" },
      lastToolExitTime + 0.5
    );

    // Ensure the timeline has enough total duration for both sections
    tl.current.to({}, { duration: 1 }, lastToolExitTime + 2);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <group scale={responsiveScale}>
      {/* Drum Wheel */}
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
        <group ref={text5Group} rotation={[-THETA * 4, 0, 0]}>
          <Text ref={text5} position={[0, 0, RADIUS]} fontSize={4.5} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
            PARTNERSHIP
          </Text>
        </group>
      </group>

      {/* Skills Section */}
      <group ref={skillsGroupRef} position={[0, 0, 0]}>
        <group ref={skillsContentRef} position={[-18, 0, 0]}>
          <Text
            ref={skillsTitleRef}
            position={[-3, 0, 0]}
            fontSize={4.5}
            color="#1A1A1A"
            font="./fonts/NeueMachina-Regular.otf"
            maxWidth={22}
            lineHeight={0.8}
            anchorX="left"
            anchorY="top"
          >
            SKILLS GATHERED OVER THE YEARS
          </Text>
          <Text
            ref={skillsSubRef}
            position={[25, 0, 0]}
            fontSize={.7}
            color="#1A1A1A"
            font="sans"
            maxWidth={12}
            lineHeight={0.9}
            anchorX="left"
            anchorY="top"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </Text>
        </group>
        <SkillCard index={0} text="DESIGN THINKING" icon="♛" setRef={el => skillCardsRef.current[0] = el} />
        <SkillCard index={1} text="DATA INSIGHT" icon="📊" setRef={el => skillCardsRef.current[1] = el} />
        <SkillCard index={2} text="SYSTEMS THINKING" icon="☰" setRef={el => skillCardsRef.current[2] = el} />
        <SkillCard index={3} text="BRAINSTORMING" icon="⋮" setRef={el => skillCardsRef.current[3] = el} />
        <SkillCard index={4} text="EMPATHY" icon="⋮" setRef={el => skillCardsRef.current[4] = el} />
        <SkillCard index={5} text="OOUX" icon="⋮" setRef={el => skillCardsRef.current[5] = el} />
        <SkillCard index={6} text="UX MATRIX" icon="⋮" setRef={el => skillCardsRef.current[6] = el} />
        <SkillCard index={7} text="ARCHITECTURE" icon="⋮" setRef={el => skillCardsRef.current[7] = el} />
      </group>

      {/* Tools Section */}
      <group ref={toolsGroupRef} position={[0, 0, 0]}>
        <group ref={toolsContentRef} position={[-18, 0, 0]}>
          <Text
            ref={toolsTitleRef}
            position={[-3, 0, 0]}
            fontSize={4.5}
            color="#1A1A1A"
            font="./fonts/NeueMachina-Regular.otf"
            maxWidth={22}
            lineHeight={0.8}
            anchorX="left"
            anchorY="top"
          >
            CHAPTERS OF MY DESIGN JOURNEY
          </Text>
          <Text
            ref={toolsSubRef}
            position={[25, 0, 0]}
            fontSize={.7}
            color="#1A1A1A"
            font="sans"
            maxWidth={12}
            lineHeight={0.9}
            anchorX="left"
            anchorY="top"
          >
            A curated selection of the software and frameworks I use to bring ideas to life. From design prototyping to high-performance 3D web experiences.
          </Text>
        </group>
      </group>
    </group>
  );
}
