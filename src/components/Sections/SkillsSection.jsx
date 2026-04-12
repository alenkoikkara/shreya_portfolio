import React, { useRef, useState } from "react";
import { Text, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { HashModel } from "../../models/HashModel";

import barchart from '../../assets/icons/bar_chart.png';
import braille from '../../assets/icons/braille.png';
import braincircuit from '../../assets/icons/brain-circuit.png';
import chess from '../../assets/icons/chess.png';
import circlesext from '../../assets/icons/circles_ext.png';
import database from '../../assets/icons/database.png';
import diagramproject from '../../assets/icons/diagram-project.png';
import lightbulb from '../../assets/icons/lightbulb.png';
import qrcode from '../../assets/icons/qrcode.png';
import solarsystem from '../../assets/icons/solar-system.png';
import sparkle from '../../assets/icons/sparkle.png';
import table from '../../assets/icons/table.png';

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
          occlude={false}
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            width: `${width}px`,
            background: "rgba(255, 255, 255, 0.5)",
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

export const SkillsSection = ({
  skillsGroupRef,
  skillsContentRef,
  skillsTitleRef,
  skillsSubRef,
  skillCardsRef
}) => {
  return (
    <group ref={skillsGroupRef} position={[0, 0, 0]}>
      <group ref={skillsContentRef} position={[-18, 0, 0]}>
        <Text
          ref={skillsTitleRef}
          position={[-3, 0, 0]}
          fontSize={3}
          color="#1A1A1A"
          font="./fonts/NeueMachina-Regular.otf"
          maxWidth={22}
          lineHeight={.92}
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
          lineHeight={1.1}
          anchorX="left"
          anchorY="top"
        >
          Over the years, I’ve learned that great design isn’t just about screens, it’s about truly understanding people, questioning what’s given, and reshaping complexity into something that feels simple, intuitive, and genuinely useful in the real world.
        </Text>
        <HashModel
          position={[12, 0, 0]}
          scale={3}
        />
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
  );
};
