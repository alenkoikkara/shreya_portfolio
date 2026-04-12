import React from "react";
import { Text } from "@react-three/drei";
import { FolderModel } from "../../models/FolderModel";

export const ToolsSection = ({
  toolsGroupRef,
  toolsContentRef,
  toolsTitleRef,
  toolsSubRef,
  isToolsActive
}) => {
  return (
    <group ref={toolsGroupRef} position={[0, 0, 0]}>
      <group ref={toolsContentRef} position={[-18, 0, 0]}>
        <Text
          ref={toolsTitleRef}
          position={[-3, 0, 0]}
          fontSize={4}
          color="#1A1A1A"
          font="./fonts/NeueMachina-Regular.otf"
          maxWidth={22}
          lineHeight={0.92}
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
          lineHeight={1.1}
          anchorX="left"
          anchorY="top"
        >
          A journey through the teams and companies that have shaped my perspective, each one adding to how I think, learn, and design today.
        </Text>
        <FolderModel
          position={[15, -6, 0]}
          scale={3}
          active={isToolsActive}
        />
      </group>
    </group>
  );
};
