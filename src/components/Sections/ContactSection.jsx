import React from "react";
import { Text, Html } from "@react-three/drei";
import { LinkModel } from "../../models/LinkModel";
import { MessageModel } from "../../models/MessageModel";
import { LinkedinModel } from "../../models/LinkedinModel";

export const ContactSection = ({
  contactGroupRef,
  contactTitleRef
}) => {
  return (
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
      <LinkModel
        position={[10, -4, 0]}
        scale={3}
      />
      <MessageModel
        position={[16, -0, 10]}
        scale={.15}
      />
      <LinkedinModel
        position={[20, 1, 10]}
        scale={.15}
      />

      {/* Action Buttons Linkage */}
      <Html position={[34, 0, 0]} transform distanceFactor={10} pointerEvents="auto">
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "350px",
          fontFamily: "sans-serif",
          color: "#1A1A1A"
        }}>
          <a href="mailto:AR.SHREYA18@GMAIL.COM" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="linkage-item pointer flex justify-between" style={{ borderBottom: "1px solid #1A1A1A", padding: "35px 0", cursor: "pointer" }}>
              <span style={{ fontSize: "20px", fontWeight: "300", cursor: "pointer" }}>AR.SHREYA18@GMAIL.COM</span>
              <div className="linkage-arrow" style={{ background: "black", borderRadius: "50%", width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>→</div>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/shreyashreya/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="linkage-item pointer flex justify-between" style={{ borderBottom: "1px solid #1A1A1A", padding: "25px 0", fontSize: "20px", fontWeight: "300", cursor: "pointer" }}>
              <span>LINKEDIN</span>
              <div className="linkage-arrow" style={{ background: "black", borderRadius: "50%", width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>→</div>
            </div>
          </a>
          <div className="linkage-item pointer flex justify-between" style={{ borderBottom: "1px solid #1A1A1A", padding: "25px 0", fontSize: "20px", fontWeight: "300", cursor: "pointer" }}>
            <span>DOWNLOAD RESUME</span>
            <div className="linkage-arrow" style={{ background: "black", borderRadius: "50%", width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>→</div>
          </div>
        </div>
      </Html>

      {/* Bottom center buttons using absolute to sit above/fixed context */}
      <Html position={[18, -9, 0]} transform distanceFactor={10} center pointerEvents="auto">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "20px" }}>
          <button
            onClick={() => window.location.href = "https://pages.shreyauxfolio.net/expertise_v1"}
            className="hover-mask-button group"
            style={{
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "30px",
              padding: "0",
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
            background: "rgba(255, 255, 255, 0.6)",
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
  );
};
