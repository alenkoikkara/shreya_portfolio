import React, { useState, useRef } from "react";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RADIUS, THETA } from "../../config/carouselConfig";

import { ArrowModel } from "../../models/ArrowModel";
import { BulbModel } from "../../models/BulbModel";
import { EmailModel } from "../../models/EmailModel";
import { SettingModel } from "../../models/SettingModel";
import { RocketModel } from "../../models/RocketModel";
import { LabModel } from "../../models/LabModel";
import { ChessModel } from "../../models/ChessModel";
import { CrownModel } from "../../models/CrownModel";
import { BoyGirlModel } from "../../models/BoyGirlModel";
import { QuoteModel } from "../../models/QuoteModel";

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

export const DrumSection = ({ 
  drumRef, 
  textRefs, 
  textFloatingRefs, 
  text5Group, 
  face1ModelRef,
  ...props 
}) => {
  return (
    <group
      {...props}
      dispose={null}
      ref={drumRef}
      position={[0, 0, -RADIUS]}
    >
      <group rotation={[0, 0, 0]}>
        <BulbModel
          position={[-2, -.2, RADIUS + 17]}
          scale={.1}
        />
        <DrumText 
          floatingRef={textFloatingRefs.text1} 
          textRef={textRefs.text1} 
          lineHeight={.9} 
          maxWidth={42} 
          position={[0, 0, RADIUS]} 
          fontSize={4} 
          color="#000000" 
          anchorX="center" 
          anchorY="middle" 
          textAlign="left" 
          font="./fonts/NeueMachina-Regular.otf"
        >
          EVERY MEANINGFUL DESIGN BEGINS WITH CURIOSITY
        </DrumText>
        <ArrowModel
          position={[3, 2, RADIUS + 13]}
          scale={0.25}
        />
      </group>
      <group rotation={[-THETA, 0, 0]}>
        <EmailModel
          position={[-8, -1, RADIUS + 6]}
          scale={.4}
          intensity={8000}
          lightColor="#fff4cc"
        />
        <DrumText 
          floatingRef={textFloatingRefs.text2} 
          textRef={textRefs.text2} 
          position={[0, 0, RADIUS]} 
          fontSize={6} 
          color="#000000" 
          anchorX="center" 
          anchorY="middle" 
          textAlign="justify" 
          font="./fonts/NeueMachina-Regular.otf"
        >
          RESEARCH
        </DrumText>
        <LabModel
          position={[0, -.5, RADIUS + 14]}
          scale={.7}
        />
      </group>
      <group rotation={[-THETA * 2, 0, 0]}>
        <SettingModel
          position={[6.5, 0.2, RADIUS + 10]}
          scale={.3}
          intensity={8000}
          lightColor="#ffffff"
        />
        <DrumText 
          floatingRef={textFloatingRefs.text3} 
          textRef={textRefs.text3} 
          position={[0, 0, RADIUS]} 
          fontSize={5} 
          color="#000000" 
          anchorX="center" 
          anchorY="middle" 
          textAlign="justify" 
          font="./fonts/NeueMachina-Regular.otf"
        >
          OPTIMISATION
        </DrumText>
        <RocketModel
          position={[0, -.5, RADIUS + 15]}
          scale={1}
        />
      </group>
      <group rotation={[-THETA * 3, 0, 0]}>
        <ChessModel
          position={[0, -.5, RADIUS + 15]}
          scale={.7}
        />
        <DrumText 
          floatingRef={textFloatingRefs.text4} 
          textRef={textRefs.text4} 
          position={[0, 0, RADIUS]} 
          fontSize={6} 
          color="#000000" 
          anchorX="center" 
          anchorY="middle" 
          textAlign="justify" 
          font="./fonts/NeueMachina-Regular.otf"
        >
          STRATEGY
        </DrumText>
        <CrownModel
          position={[4, 1.5, RADIUS + 12]}
          scale={.25}
          intensity={8000}
          lightColor="#ffffff"
        />
      </group>
      <group ref={text5Group} rotation={[-THETA * 4, 0, 0]}>
        <DrumText 
          floatingRef={textFloatingRefs.text5} 
          textRef={textRefs.text5} 
          position={[0, 0, RADIUS]} 
          fontSize={6} 
          color="#000000" 
          anchorX="center" 
          anchorY="middle" 
          textAlign="justify" 
          font="./fonts/NeueMachina-Regular.otf"
        >
          PARTNERSHIP
        </DrumText>
        <group ref={face1ModelRef}>
          <BoyGirlModel
            position={[-2, -.5, RADIUS + 15]}
            scale={.6}
          />
          <QuoteModel
            position={[3, .5, RADIUS + 13.5]}
            scale={.2}
            intensity={8000}
            lightColor="#ffffff"
          />
        </group>
      </group>
    </group>
  );
};
