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
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "16px",
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
          userSelect: "none"
        }}>
          <span style={{ fontSize: "1.2em", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>{icon}</span>
          <span style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>{text}</span>
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
  const skillCardsRef = useRef([]);
  const skillsGroupRef = useRef();

  const { size } = useThree();
  const responsiveScale = size.width / 1440;

  useLayoutEffect(() => {
    // ─── Setup GSAP Timeline with ScrollTrigger ─────────────────────────────
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: () => window.innerHeight * 12, // Adjusted for 3D animation only
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
    const cardDuration = 1.0;
    const cardStagger = 0.4;
    const cardHold = 1.2;
    const cardExitDuration = 0.8;
    
    // 1. Skills Title Slide Up to Center
    tl.current.fromTo(
      skillsTitleRef.current.position,
      { y: -30, x: -12 },
      { y: 0, x: -12, duration: 1, ease: "power2.out" },
      skillsStart
    );

    // 2. Skill Cards Sequential Flow
    let lastCardExitTime = skillsStart;

    skillCardsRef.current.forEach((card, i) => {
      if (!card) return;
      
      const entryTime = skillsStart + 0.8 + i * cardStagger;
      const exitTime = entryTime + cardDuration + cardHold;
      const finalX = 1.5 + i * 1.5; // More compact layout
      const finalY = -5 + i * 1.2;
      
      lastCardExitTime = Math.max(lastCardExitTime, exitTime + cardExitDuration);

      // Entry
      tl.current.fromTo(
        card.position,
        { x: 30, y: finalY - 5, z: -10 },
        { 
          duration: cardDuration, 
          x: finalX,
          y: finalY,
          z: 0,
          ease: "power2.out"
        },
        entryTime
      );
      
      tl.current.fromTo(
        card.scale,
        { x: 0, y: 0, z: 0 },
        { duration: cardDuration, x: 1, y: 1, z: 1, ease: "back.out(1.5)" },
        entryTime
      );

      // Exit
      tl.current.to(
        card.position,
        { 
          duration: cardExitDuration, 
          x: finalX - 40, 
          y: finalY + 15, 
          ease: "power2.in" 
        },
        exitTime
      );

      tl.current.to(
        card.scale,
        { duration: cardExitDuration, x: 0, y: 0, z: 0, ease: "power2.in" },
        exitTime
      );
    });

    // 3. Final Exit (Title scrolls up after last card)
    tl.current.to(
      skillsGroupRef.current.position,
      { y: 40, duration: 1.5, ease: "power2.in" },
      lastCardExitTime + 0.5
    );

    // Ensure the timeline has enough total duration
    tl.current.to({}, { duration: 1 }, lastCardExitTime + 2); 

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
        <Text
          ref={skillsTitleRef}
          position={[-12, -30, 0]} 
          fontSize={4.5}
          color="#1A1A1A"
          font="./fonts/NeueMachina-Regular.otf"
          maxWidth={12}
          lineHeight={0.8}
          anchorX="left"
          anchorY="middle"
        >
          SKILLS{"\n"}GATHERED{"\n"}OVER THE{"\n"}YEARS
        </Text>

        <SkillCard index={0} text="DESIGN THINKING" icon="♛" setRef={el => skillCardsRef.current[0] = el} />
        <SkillCard index={1} text="DATA INSIGHT" icon="📊" setRef={el => skillCardsRef.current[1] = el} />
        <SkillCard index={2} text="SYSTEMS THINKING" icon="☰" setRef={el => skillCardsRef.current[2] = el} />
        <SkillCard index={3} text="BRAINSTORMING" icon="⋮" setRef={el => skillCardsRef.current[3] = el} />
        <SkillCard index={4} text="EMPATHY" icon="⋮" setRef={el => skillCardsRef.current[4] = el} />
        <SkillCard index={5} text="OOUX" icon="⋮" setRef={el => skillCardsRef.current[5] = el} />
        <SkillCard index={6} text="UX MATRIX" icon="⋮" setRef={el => skillCardsRef.current[6] = el} />
        <SkillCard index={7} text="ARCHITECTURE" icon="⋮" setRef={el => skillCardsRef.current[7] = el} />
      </group>
    </group>
  );
}
