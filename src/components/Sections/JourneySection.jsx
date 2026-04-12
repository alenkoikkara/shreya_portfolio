import React from "react";
import { Text, Image, Float } from "@react-three/drei";
import { JOURNEY_DATA } from "../../config/carouselConfig";

export const JourneySection = ({
  journeyGroupRef,
  journeyGroupsRef,
  journeyItemsRef,
  journeySubRefs,
  journeySubLogosRef,
  journeyLogosWrapperRef,
  journeyLogosRef
}) => {
  return (
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

          {/* BIG LOGO Wrapper */}
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
  );
};
