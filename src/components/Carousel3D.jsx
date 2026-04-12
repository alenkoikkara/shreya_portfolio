import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import * as THREE from "three";

import { RADIUS, THETA, PIN_DURATION, DRUM_SPEED, NUM_CARDS, JOURNEY_DATA } from "../config/carouselConfig";

import { DrumSection } from "./Sections/DrumSection";
import { SkillsSection } from "./Sections/SkillsSection";
import { ToolsSection } from "./Sections/ToolsSection";
import { JourneySection } from "./Sections/JourneySection";
import { ContactSection } from "./Sections/ContactSection";

gsap.registerPlugin(ScrollTrigger);

export function Carousel3D({ bokehRef, ...props }) {
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

  const journeyGroupRef = useRef();
  const journeyGroupsRef = useRef([]);
  const journeyItemsRef = useRef([]);
  const journeySubRefs = useRef([]);
  const journeySubLogosRef = useRef([]);
  const journeyLogosWrapperRef = useRef([]);
  const journeyLogosRef = useRef([]);

  const contactGroupRef = useRef();
  const contactTitleRef = useRef();

  const text1Floating = useRef();
  const text2Floating = useRef();
  const text3Floating = useRef();
  const text4Floating = useRef();
  const text5Floating = useRef();
  const face1ModelRef = useRef();

  const [isToolsActive, setIsToolsActive] = useState(false);

  const { size } = useThree();
  const responsiveScale = size.width / 1440;

  useGSAP(() => {
    // ─── Setup GSAP Timeline with ScrollTrigger ─────────────────────────────
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: () => window.innerHeight * 35, // Lengthened scroll length to slow animations
        scrub: 3,
      }
    });

    // ── Bokeh Background Randomized 3D Path Scrolling ────────────────────────
    if (bokehRef.current && bokehRef.current.blobs) {
      const fullTime = 30;

      // Blob 1: Spiral descent on the leftish side
      tl.current.fromTo(bokehRef.current.blobs[0].group.position,
        { y: 25, z: -10 },
        { y: -25, z: 10, duration: fullTime, ease: "none" }, 0
      );
      tl.current.fromTo(bokehRef.current.blobs[0].group.rotation,
        { z: 0 },
        { z: Math.PI * 6, duration: fullTime, ease: "none" }, 0
      );

      // Blob 2: Spiral descent on the rightish side (opposite start)
      tl.current.fromTo(bokehRef.current.blobs[1].group.position,
        { y: 30, z: 10 },
        { y: -30, z: -10, duration: fullTime, ease: "none" }, 0
      );
      tl.current.fromTo(bokehRef.current.blobs[1].group.rotation,
        { z: Math.PI },
        { z: Math.PI * 7, duration: fullTime, ease: "none" }, 0
      );
    }

    const peachPalette = { c1: "#FFCAB1", c2: "#FFCAB1", c3: "#FFCAB1" };

    function animateBokehColors(index, time) {
      if (!bokehRef.current || !bokehRef.current.blobs) return;
      const colors = peachPalette; // Always use peach palette
      bokehRef.current.blobs.forEach((blob, i) => {
        if (!blob) return;
        const targetColor = i === 0 ? colors.c1 : colors.c2;
        tl.current.to(blob.material.uniforms.uColor.value, {
          r: new THREE.Color(targetColor).r,
          g: new THREE.Color(targetColor).g,
          b: new THREE.Color(targetColor).b,
          duration: 1.5,
          ease: "power2.inOut"
        }, time);
      });
    }

    // Initial peach setup
    animateBokehColors(0, 0);

    // ── Ferris-wheel drum rotation (with flat spots for pinning) ───────────
    for (let i = 0; i < NUM_CARDS - 1; i++) {
      tl.current.to(
        ref.current.rotation,
        {
          duration: (1 - PIN_DURATION) * DRUM_SPEED,
          x: THETA * (i + 1),
          ease: "power2.inOut",
        },
        i * DRUM_SPEED + (PIN_DURATION / 2) * DRUM_SPEED
      );
    }

    // ── Unified entry/exit helper ─────────────────────────
    function animateCard(textRef, peakTime, exitTime, exitUp = false, extraRef = null) {
      const entryEndTime = peakTime - (PIN_DURATION / 2) * DRUM_SPEED;
      const entryStartTime = Math.max(0, entryEndTime - 1.2 * DRUM_SPEED);

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
        const exitStartTime = peakTime + (PIN_DURATION / 2) * DRUM_SPEED;
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

        if (extraRef && extraRef.current) {
          tl.current.to(
            extraRef.current.scale,
            { duration: outDur, x: 1.8, y: 1.8, z: 1.8, ease: "sine.in" },
            exitStartTime
          );
          tl.current.to(
            extraRef.current.position,
            { duration: outDur, x: -2, y: exitUp ? 20 : -0.2, ease: exitUp ? "power2.in" : "back.in(2.5)" },
            exitStartTime
          );
        }
      }
    }

    // ── Card timings ──────────────────────────────────────────────────────
    animateCard(text1, 0 * DRUM_SPEED, 1 * DRUM_SPEED);
    animateCard(text2, 1 * DRUM_SPEED, 2 * DRUM_SPEED);
    animateCard(text3, 2 * DRUM_SPEED, 3 * DRUM_SPEED);
    animateCard(text4, 3 * DRUM_SPEED, 4 * DRUM_SPEED);
    animateCard(text5, 4 * DRUM_SPEED, 5 * DRUM_SPEED, true, face1ModelRef);

    // ── SKILLS SECTION ANIMATION (Starts at t=5 * DRUM_SPEED) ───────────────
    const skillsStart = 5 * DRUM_SPEED;
    animateBokehColors(1, skillsStart);
    const cardStagger = 1;

    // 1. Skills Title & Subtitle Slide Up to Center
    tl.current.fromTo(
      skillsContentRef.current.position,
      { y: -30 },
      { y: 7, duration: 1, ease: "power2.out" },
      skillsStart
    );

    // 2. Skill Cards Stacking Flow (3x4 Grid)
    const cardTravelDuration = 1.5;
    let lastCardExitTime = skillsStart;

    skillCardsRef.current.forEach((card, i) => {
      if (!card) return;

      const startTime = skillsStart + 0.5 + i * 0.6; // Stagger them in quickly
      const endTime = startTime + cardTravelDuration;

      lastCardExitTime = Math.max(lastCardExitTime, endTime);

      const actualCardWidth = 400 * 0.0266;

      const cols = 4;
      const col = i % cols;
      const row = Math.floor(i / cols);

      const gapX = 0.3;
      const gapY = 0.5;

      const startX = -18; // Adjusted startX for full 400px width uniformity
      const targetX = startX + col * (actualCardWidth + gapX) + (actualCardWidth / 2);

      const cardHeight = 1.5;
      const ySpacing = cardHeight + gapY;
      const targetY = 1.5 - row * ySpacing;

      // Move into Grid Position
      tl.current.fromTo(
        card.position,
        { x: 30, y: -25, z: -10 },
        {
          duration: cardTravelDuration,
          x: targetX,
          y: targetY,
          z: 0,
          ease: "power2.out"
        },
        startTime
      );
    });

    // Add extra time to appreciate the stacked grid before tools start
    lastCardExitTime += 1;

    // 3. Final Exit (Title scrolls up after last card)
    tl.current.to(
      skillsGroupRef.current.position,
      { y: 40, duration: 1.5, ease: "power2.in" },
      lastCardExitTime + 0.5
    );

    // ── TOOLS SECTION ANIMATION (Starts after Skills) ────────────────────────
    const toolsStart = lastCardExitTime + 1.5;
    animateBokehColors(2, toolsStart);

    // 1. Tools Title & Subtitle Slide Up to Center
    tl.current.fromTo(
      toolsContentRef.current.position,
      { y: -30 },
      { 
        y: 7, 
        duration: 1, 
        ease: "power2.out",
        onStart: () => setIsToolsActive(true),
        onReverseComplete: () => setIsToolsActive(false)
      },
      toolsStart
    );

    // 2. Tool Cards Animation Removed
    let lastToolExitTime = toolsStart + 1.5; // Text stays for 1.5 units

    // 3. Final Exit (Tools title scrolls up)
    tl.current.to(
      toolsGroupRef.current.position,
      { 
        y: 40, 
        duration: 1.5, 
        ease: "power2.in",
        onStart: () => setIsToolsActive(false),
        onReverseComplete: () => setIsToolsActive(true)
      },
      lastToolExitTime + 0.5
    );

    // ── JOURNEY LIST ANIMATION (Starts after Tools) ────────────────────────
    const journeyStart = lastToolExitTime + 1.5;
    animateBokehColors(3, journeyStart);

    let lastJourneyExitTime = journeyStart;

    JOURNEY_DATA.forEach((_, i) => {
      const grpRef = journeyGroupsRef.current[i];
      const itemRef = journeyItemsRef.current[i];
      const subRef = journeySubRefs.current[i];
      const subLogoRef = journeySubLogosRef.current[i];
      const logoWrapRef = journeyLogosWrapperRef.current[i];
      const logoMatRef = journeyLogosRef.current[i];
      if (!grpRef || !itemRef || !subRef || !logoWrapRef || !logoMatRef) return;

      const startTime = journeyStart + i * 1.5;
      const duration = 4;
      const endTime = startTime + duration;

      lastJourneyExitTime = Math.max(lastJourneyExitTime, endTime);

      // Continuous vertical scroll for the FULL TITLE GROUP
      tl.current.fromTo(
        grpRef.position,
        { y: -25 },
        { y: 25, duration: duration, ease: "none" },
        startTime
      );

      // Scale up and down for the FULL TITLE GROUP
      tl.current.fromTo(
        grpRef.scale,
        { x: 0.6, y: 0.6, z: 0.6 },
        { x: 1, y: 1, z: 1, duration: duration / 2, ease: "power2.out" },
        startTime
      );
      tl.current.to(
        grpRef.scale,
        { x: 0.6, y: 0.6, z: 0.6, duration: duration / 2, ease: "power2.in" },
        startTime + duration / 2
      );

      // Fade in/out for text materials & subLogo
      [itemRef, subRef, subLogoRef].forEach(ref => {
        if (!ref) return;
        tl.current.fromTo(
          ref.material,
          { opacity: 0 },
          { opacity: 1, duration: duration / 4, ease: "power1.in" },
          startTime
        );
        tl.current.to(
          ref.material,
          { opacity: 1, duration: duration / 4, ease: "power1.out" },
          endTime - duration / 4
        );
      });

      // RESTORED BIG LOGO ANIMATIONS
      // Moves vertically independently, drifting above the text
      tl.current.fromTo(
        logoWrapRef.position,
        { y: -25, z: 2 },
        { y: 35, z: 2, duration: duration, ease: "none" },
        startTime
      );

      // Giant logo scale pop
      tl.current.fromTo(
        logoWrapRef.scale,
        { x: 0, y: 0, z: 0 },
        { x: 3, y: 3, z: 3, duration: duration / 2, ease: "back.out(2)" },
        startTime
      );
      tl.current.to(
        logoWrapRef.scale,
        { x: 0, y: 0, z: 0, duration: duration / 2, ease: "power2.in" },
        startTime + duration / 2
      );

      // Giant logo fade
      tl.current.fromTo(
        logoMatRef.material,
        { opacity: 0 },
        { opacity: 1, duration: duration / 6, ease: "power1.in" },
        startTime
      );
      tl.current.to(
        logoMatRef.material,
        { opacity: 1, duration: duration / 4, ease: "power1.out" },
        endTime - duration / 4
      );
    });

    // ── CONTACT SECTION ANIMATION (Starts after Journey) ────────────────────
    const contactStart = lastJourneyExitTime - 2.0; // Tighter overlap for zero perceived gap
    animateBokehColors(4, contactStart);

    tl.current.fromTo(
      contactGroupRef.current.position,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, ease: "power2.out" },
      contactStart
    );

    tl.current.fromTo(
      contactGroupRef.current.scale,
      { x: 0.8, y: 0.8, z: 0.8 },
      { x: 1, y: 1, z: 1, duration: 2, ease: "power2.out" },
      contactStart
    );

    // Final buffer
    tl.current.to({}, { duration: 2 }, contactStart + 4);
  }, []);


  return (
    <group scale={responsiveScale}>
      <DrumSection 
        drumRef={ref}
        textRefs={{ text1, text2, text3, text4, text5 }}
        textFloatingRefs={{ 
          text1: text1Floating, 
          text2: text2Floating, 
          text3: text3Floating, 
          text4: text4Floating, 
          text5: text5Floating 
        }}
        text5Group={text5Group}
        face1ModelRef={face1ModelRef}
        {...props}
      />

      <SkillsSection 
        skillsGroupRef={skillsGroupRef}
        skillsContentRef={skillsContentRef}
        skillsTitleRef={skillsTitleRef}
        skillsSubRef={skillsSubRef}
        skillCardsRef={skillCardsRef}
      />

      <ToolsSection 
        toolsGroupRef={toolsGroupRef}
        toolsContentRef={toolsContentRef}
        toolsTitleRef={toolsTitleRef}
        toolsSubRef={toolsSubRef}
        isToolsActive={isToolsActive}
      />

      <JourneySection 
        journeyGroupRef={journeyGroupRef}
        journeyGroupsRef={journeyGroupsRef}
        journeyItemsRef={journeyItemsRef}
        journeySubRefs={journeySubRefs}
        journeySubLogosRef={journeySubLogosRef}
        journeyLogosWrapperRef={journeyLogosWrapperRef}
        journeyLogosRef={journeyLogosRef}
      />

      <ContactSection 
        contactGroupRef={contactGroupRef}
        contactTitleRef={contactTitleRef}
      />
    </group>
  );
}
