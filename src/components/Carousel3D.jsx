import { Text, Html, Float, Image } from "@react-three/drei";

import { ArrowModel } from "../models/ArrowModel";
import { BulbModel } from "../models/BulbModel";
import { BrainModel } from "../models/BrainModel";
import { MessageModel } from "../models/MessageModel";
import { SettingModel } from "../models/SettingModel";
import { BarCharModel } from "../models/BarCharModel";
import { StarModel } from "../models/StarModel";
import { CrownModel } from "../models/CrownModel";
import { Face1Model } from "../models/Face1";
import { Face2Model } from "../models/Face2";
import { Face3Model } from "../models/Face3";
import { Face4Model } from "../models/Face4";
import { Face5Model } from "../models/Face5";

import barchart from '../assets/icons/bar_chart.png';
import braille from '../assets/icons/braille.png';
import braincircuit from '../assets/icons/brain-circuit.png';
import chess from '../assets/icons/chess.png';
import circlesext from '../assets/icons/circles_ext.png';
import database from '../assets/icons/database.png';
import diagramproject from '../assets/icons/diagram-project.png';
import lightbulb from '../assets/icons/lightbulb.png';
import qrcode from '../assets/icons/qrcode.png';
import solarsystem from '../assets/icons/solar-system.png';
import sparkle from '../assets/icons/sparkle.png';
import table from '../assets/icons/table.png';

import azugaLogo from '../assets/logo/azugalogo.png';
import optumLogo from '../assets/logo/optumlogo.png';
import tmlLogo from '../assets/logo/techmachinerylogo.png';
import isroLogo from '../assets/logo/isrologo.png';

import bridgeston from '../assets/icons/bridgestone.png';
import unitedhealthcare from '../assets/icons/uhc.png';


const JOURNEY_DATA = [
  { role: "AZUGA", subtext: "BY BRIDGESTONE", logo: azugaLogo, subIcon: bridgeston, position: [4.5, 0, 0], logoScale: [3.26 * 1.2, 1.2], subIconScale: [0.8, 0.8] },
  { role: "OPTUM", subtext: "UNITED HEALTHCARE", logo: optumLogo, subIcon: unitedhealthcare, position: [5.5, 0, 0], logoScale: [3.43 * 1.2, 1.2], subIconScale: [1.57 * 0.8, 0.8] },
  { role: "TML", subtext: "TECH MACHINERY LABS", logo: tmlLogo, subIcon: '', position: [0, 0, 0], logoScale: [2.2, 2.2], subIconScale: [0.8, 0.8] },
  { role: "ISRO", subtext: "INDIAN SPACE RESEARCH ORGANISATION", logo: isroLogo, subIcon: '', position: [0, 0, 0], logoScale: [2.2, 2.2], subIconScale: [0.8, 0.8] },
];

import { useThree, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useMemo, ud } from "react";
import * as THREE from "three";
import { QuoteModel } from "../models/QuoteModel";

gsap.registerPlugin(ScrollTrigger);

export const RADIUS = 200;
export const THETA = Math.PI / 20;
export const PIN_DURATION = 0.01;

const NUM_CARDS = 5;

const SkillCard = ({ text, icon, index, width, setRef }) => {
  const floatingRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const shearX = useRef(0);
  const shearY = useRef(0);

  useFrame(() => {
    if (!floatingRef.current) return;
    const targetX = hovered ? mouse.x * 0.05 : 0;
    const targetY = hovered ? mouse.y * 0.05 : 0;

    shearX.current = THREE.MathUtils.lerp(shearX.current, targetX, 0.005);
    shearY.current = THREE.MathUtils.lerp(shearY.current, targetY, 0.005);

    floatingRef.current.matrix.set(
      1, 0, 0, 0,
      0, 1, 0, 0,
      shearX.current, shearY.current, 1, 0,
      0, 0, 0, 1
    );
    floatingRef.current.matrixAutoUpdate = false;
  });

  return (
    <group
      ref={setRef}
      position={[-20, -10, -5]} // Initial off-screen
    >
      <group ref={floatingRef}>
        <mesh
          visible={false}
          onPointerMove={(e) => {
            e.stopPropagation();
            setMouse({ x: e.uv.x * 2 - 1, y: e.uv.y * 2 - 1 });
            setHovered(true);
          }}
          onPointerLeave={() => setHovered(false)}
        >
          <planeGeometry args={[width * 0.0266, 2]} />
        </mesh>
        <Html
          transform
          distanceFactor={10}
          portal={undefined}
          occlude={false}
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            width: `${width}px`,
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(308px)",
            WebkitBackdropFilter: "blur(308px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "10px",
            padding: "12px 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "18px",
            color: "black",
            whiteSpace: "nowrap",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.1)",
            fontSize: "16px",
            fontWeight: "400",
            fontFamily: "NeueMachina-Regular, sans-serif",
            userSelect: "none",
            zIndex: 100
          }}>
            <img src={icon} alt="icon" style={{ width: "1.2em", height: "1.2em", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }} />
            <span style={{ fontSize: "1.2em", letterSpacing: "0.08em", textTransform: "uppercase" }}>{text}</span>
          </div>
        </Html>
      </group>
    </group>
  );
};

const DrumText = ({ children, floatingRef, textRef, ...props }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const shearX = useRef(0);
  const shearY = useRef(0);

  useFrame(() => {
    if (!floatingRef.current) return;
    const targetX = hovered ? mouse.x * 0.04 : 0;
    const targetY = hovered ? mouse.y * 0.04 : 0;

    shearX.current = THREE.MathUtils.lerp(shearX.current, targetX, 0.009);
    shearY.current = THREE.MathUtils.lerp(shearY.current, targetY, 0.009);

    floatingRef.current.matrix.set(
      1, 0, 0, 0,
      0, 1, 0, 0,
      shearX.current, shearY.current, 1, 0,
      0, 0, 0, 1
    );
    floatingRef.current.matrixAutoUpdate = false;
  });

  return (
    <group ref={floatingRef}>
      <Text
        {...props}
        ref={textRef}
        onPointerMove={(e) => {
          e.stopPropagation();
          if (e.uv) {
            setMouse({ x: e.uv.x * 2 - 1, y: e.uv.y * 2 - 1 });
            setHovered(true);
          }
        }}
        onPointerLeave={() => setHovered(false)}
      >
        {children}
      </Text>
    </group>
  );
};


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

  const { size } = useThree();
  const responsiveScale = size.width / 1440;

  useGSAP(() => {
    // ─── Setup GSAP Timeline with ScrollTrigger ─────────────────────────────
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: () => window.innerHeight * 20, // Tightened scroll length
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
          duration: 1 - PIN_DURATION,
          x: THETA * (i + 1),
          ease: "power2.inOut",
        },
        i + PIN_DURATION / 2
      );
    }

    // ── Unified entry/exit helper ─────────────────────────
    function animateCard(textRef, peakTime, exitTime, exitUp = false, extraRef = null) {
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
    animateCard(text1, 0, 1);
    animateCard(text2, 1, 2);
    animateCard(text3, 2, 3);
    animateCard(text4, 3, 4);
    animateCard(text5, 4, 5, true, face1ModelRef);

    // ── SKILLS SECTION ANIMATION (Starts at t=5) ───────────────────────────
    const skillsStart = 5;
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
      {/* Global lighting for models */}
      {/* <pointLight position={[0, 10, 20]} intensity={50300} color="#ffffff" />
      <pointLight position={[0, 10, 20]} intensity={50300} color="#ffffff" /> */}

      {/* Drum Wheel */}
      <group
        {...props}
        dispose={null}
        ref={ref}
        position={[0, 0, -RADIUS]}
      >
        <group rotation={[0, 0, 0]}>
          <BulbModel
            position={[-2, -.2, RADIUS + 17]}
            scale={8}
          />
          <DrumText floatingRef={text1Floating} textRef={text1} lineHeight={.9} maxWidth={42} position={[0, 0, RADIUS]} fontSize={4} color="#000000" anchorX="center" anchorY="middle" textAlign="left" font="./fonts/NeueMachina-Regular.otf">
            EVERY MEANINGFUL DESIGN BEGINS WITH CURIOSITY
          </DrumText>
          <ArrowModel
            position={[3, 2, RADIUS + 13]}
            scale={20}
          />
        </group>
        <group rotation={[-THETA, 0, 0]}>
          <MessageModel
            position={[-2, -0.3, RADIUS + 16]}
            scale={50}
            intensity={8000}
            lightColor="#fff4cc"
          />
          <DrumText floatingRef={text2Floating} textRef={text2} position={[0, 0, RADIUS]} fontSize={6} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
            RESEARCH
          </DrumText>
          {/* <BrainModel
            position={[1, 1, RADIUS + 17]}
            intensity={5000}
            scale={.8}
            lightColor="#ffffff"
          /> */}
        </group>
        <group rotation={[-THETA * 2, 0, 0]}>
          <SettingModel
            position={[1.9, 0.2, RADIUS + 16.5]}
            scale={14}
            intensity={8000}
            lightColor="#ffffff"
          />
          <DrumText floatingRef={text3Floating} textRef={text3} position={[0, 0, RADIUS]} fontSize={5} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
            OPTIMISATION
          </DrumText>
          {/* <BarCharModel
            position={[2, 1, RADIUS + 17]}
            scale={.8}
            intensity={3000}
            lightColor="#ffffff"
          /> */}
        </group>
        <group rotation={[-THETA * 3, 0, 0]}>
          {/* <StarModel
            position={[-1, 0, RADIUS + 17]}
            scale={.8}
            intensity={8000}
            lightColor="#ffffff"
          /> */}
          <DrumText floatingRef={text4Floating} textRef={text4} position={[0, 0, RADIUS]} fontSize={6} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
            STRATEGY
          </DrumText>
          <CrownModel
            position={[1, 0.5, RADIUS + 17]}
            scale={28}
            intensity={8000}
            lightColor="#ffffff"
          />
        </group>
        <group ref={text5Group} rotation={[-THETA * 4, 0, 0]}>
          <DrumText floatingRef={text5Floating} textRef={text5} position={[0, 0, RADIUS]} fontSize={6} color="#000000" anchorX="center" anchorY="middle" textAlign="justify" font="./fonts/NeueMachina-Regular.otf">
            PARTNERSHIP
          </DrumText>
          <group ref={face1ModelRef}>
            {/* <Face1Model
              position={[-4, 1, RADIUS + 14.5]}
              scale={.8}
              intensity={8000}
              lightColor="#ffffff"
            />
            <Face2Model
              position={[-1, -.5, RADIUS + 14.5]}
              scale={.8}
              intensity={8000}
              lightColor="#ffffff"
            />
            <Face3Model
              position={[0, 1.5, RADIUS + 14.5]}
              scale={.8}
              intensity={8000}
              lightColor="#ffffff"
            />
            <Face4Model
              position={[2, -.2, RADIUS + 14.5]}
              scale={.8}
              intensity={8000}
              lightColor="#ffffff"
            /> */}
            <QuoteModel
              position={[3, -.5, RADIUS + 13.5]}
              scale={70}
              intensity={8000}
              lightColor="#ffffff"
            />
          </group>
        </group>
      </group>

      {/* Skills Section */}
      <group ref={skillsGroupRef} position={[0, 0, 0]}>
        <group ref={skillsContentRef} position={[-18, 0, 0]}>
          <Text
            ref={skillsTitleRef}
            position={[-3, 0, 0]}
            fontSize={3}
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
            fontSize={.5}
            color="#1A1A1A"
            maxWidth={12}
            lineHeight={1}
            anchorX="left"
            anchorY="top"
          >
            Over the years, I’ve learned that great design isn’t just about screens, it’s about truly understanding people, questioning what’s given, and reshaping complexity into something that feels simple, intuitive, and genuinely useful in the real world.
          </Text>
        </group>
        <group position={[-3.5, -6.5, 0]}>
          <SkillCard index={0} width={400} text="DESIGN THINKING" icon={chess} setRef={el => skillCardsRef.current[0] = el} />
          <SkillCard index={1} width={400} text="DATA INSIGHT" icon={barchart} setRef={el => skillCardsRef.current[1] = el} />
          <SkillCard index={2} width={400} text="SYSTEMS THINKING" icon={database} setRef={el => skillCardsRef.current[2] = el} />
          <SkillCard index={3} width={400} text="EMPATHY" icon={circlesext} setRef={el => skillCardsRef.current[3] = el} />
          <SkillCard index={4} width={400} text="BRAINSTORMING" icon={braincircuit} setRef={el => skillCardsRef.current[4] = el} />
          <SkillCard index={5} width={400} text="OOUX" icon={braille} setRef={el => skillCardsRef.current[5] = el} />
          <SkillCard index={6} width={400} text="UX MATRIX" icon={qrcode} setRef={el => skillCardsRef.current[6] = el} />
          <SkillCard index={7} width={400} text="INFORMATION ARCHITECTURE" icon={diagramproject} setRef={el => skillCardsRef.current[7] = el} />
          <SkillCard index={8} width={400} text="SYSTEM DESIGN" icon={solarsystem} setRef={el => skillCardsRef.current[8] = el} />
          <SkillCard index={9} width={400} text="INNOVATION" icon={lightbulb} setRef={el => skillCardsRef.current[9] = el} />
          <SkillCard index={10} width={400} text="JOURNEY MAPPING" icon={table} setRef={el => skillCardsRef.current[10] = el} />
          <SkillCard index={11} width={400} text="THOUGHT LEADERSHIP" icon={sparkle} setRef={el => skillCardsRef.current[11] = el} />
        </group>
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
            fontSize={.5}
            color="#1A1A1A"
            maxWidth={12}
            lineHeight={1}
            anchorX="left"
            anchorY="top"
          >
            A curated selection of the software and frameworks I use to bring ideas to life. From design prototyping to high-performance 3D web experiences.
          </Text>
        </group>
      </group>

      {/* Design Journey List */}
      <group ref={journeyGroupRef}>
        {JOURNEY_DATA.map((journey, i) => (
          <group key={i}>
            <group ref={el => journeyGroupsRef.current[i] = el} position={[0, -30, 0]}>
              <Text
                ref={el => journeyItemsRef.current[i] = el}
                position={[0, 0, 0]}
                fontSize={3.5}
                color="#1A1A1A"
                font="./fonts/NeueMachina-Regular.otf"
                anchorX="center"
                anchorY="middle"
                transparent
                opacity={0}
              >
                {journey.role}
              </Text>

              <group position={[0, -2.5, 0]}>
                <Text
                  ref={el => journeySubRefs.current[i] = el}
                  position={[-0.5, 0, 0]}
                  fontSize={1}
                  color="#666666"
                  font="./fonts/NeueMachina-Light.otf"
                  anchorX="center"
                  anchorY="middle"
                  transparent
                  opacity={0}
                >
                  {journey.subtext}
                </Text>
                {journey?.subIcon && (
                  <Image
                    ref={el => journeySubLogosRef.current[i] = el}
                    url={journey?.subIcon}
                    transparent
                    opacity={0}
                    scale={journey.subIconScale}
                    position={journey.position}
                    fit="contain"
                  />
                )}
              </group>
            </group>

            {/* RESTORED BIG LOGO Wrapper */}
            <group ref={el => journeyLogosWrapperRef.current[i] = el} position={[0, 30, 2]}>
              <Float floatIntensity={.5} speed={.5} rotationIntensity={.5}>
                <Image
                  ref={el => journeyLogosRef.current[i] = el}
                  url={journey.logo}
                  transparent
                  opacity={1}
                  scale={journey.logoScale}
                  fit="contain"
                />
              </Float>
            </group>
          </group>
        ))}
      </group>

      {/* Contact Section */}
      <group ref={contactGroupRef} position={[-18, 0, 0]}>
        {/* Main Title */}
        <Text
          ref={contactTitleRef}
          position={[-3, 0, 0]}
          fontSize={4.5}
          lineHeight={0.8}
          color="#1A1A1A"
          font="./fonts/NeueMachina-Regular.otf"
          anchorX="left"
          anchorY="middle"
          maxWidth={25}
        >
          LET'S TALK DESIGN
        </Text>

        {/* Overlaid Floating Icons */}
        {/* <Html position={[-6, 12, 0.5]} transform distanceFactor={10}>
          <div style={{
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(20px)",
            borderRadius: "15px",
            padding: "15px",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "60px",
            height: "60px"
          }}>
            <svg viewBox="0 0 24 24" fill="#0077B5" width="40" height="40">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </div>
        </Html> */}

        {/* <Html position={[-4, 2, 0.8]} transform distanceFactor={10}>
          <div style={{
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(20px)",
            borderRadius: "15px",
            padding: "15px",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "60px",
            height: "60px"
          }}>
            <svg viewBox="0 0 24 24" fill="#1A1A1A" width="40" height="40">
              <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 8.817h-18.779l5.513-8.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
            </svg>
          </div>
        </Html> */}

        {/* Action Buttons Linkage */}
        <Html position={[34, 0, 0]} transform distanceFactor={10}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "350px",
            fontFamily: "sans-serif",
            color: "#1A1A1A"
          }}>
            <div className="linkage-item pointer flex justify-between" style={{ borderBottom: "1px solid #1A1A1A", padding: "35px 0", cursor: "pointer" }}>
              <span style={{ fontSize: "20px", fontWeight: "300", cursor: "pointer" }}>AR.SHREYA18@GMAIL.COM</span>
              <div className="linkage-arrow" style={{ background: "black", borderRadius: "50%", width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>→</div>
            </div>
            <div className="linkage-item pointer flex justify-between" style={{ borderBottom: "1px solid #1A1A1A", padding: "25px 0", fontSize: "20px", fontWeight: "300", cursor: "pointer" }}>
              <span>LINKEDIN</span>
              <div className="linkage-arrow" style={{ background: "black", borderRadius: "50%", width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>→</div>
            </div>
            <div className="linkage-item pointer flex justify-between" style={{ borderBottom: "1px solid #1A1A1A", padding: "25px 0", fontSize: "20px", fontWeight: "300", cursor: "pointer" }}>
              <span>DOWNLOAD RESUME</span>
              <div className="linkage-arrow" style={{ background: "black", borderRadius: "50%", width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>→</div>
            </div>
          </div>
        </Html>

        {/* Bottom center buttons using absolute to sit above/fixed context */}
        <Html position={[18, -9, 0]} transform distanceFactor={10} center>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "20px" }}>
            <button
              className="hover-mask-button group"
              style={{
                background: "black",
                color: "white",
                border: "none",
                borderRadius: "30px",
                padding: "0", // Handled by inner container for easier z-index management
                fontSize: "14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                overflow: "hidden"
              }}
            >
              <div className="relative z-10 px-[30px] py-[12px] flex items-center gap-[10px] group-hover:text-black transition-colors duration-700">
                Next Page →
              </div>
            </button>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
              background: "rgba(208, 221, 243, 0.8)",
              color: "#1A1A1A",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: "30px",
              padding: "10px 25px",
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backdropFilter: "blur(10px)"
            }}>
              Go to the top ↑
            </button>
          </div>
        </Html>
      </group>
    </group>
  );
}
