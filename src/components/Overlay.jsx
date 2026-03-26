import { Html, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export const Overlay = () => {
  const scroll = useScroll();
  const subRefs = useRef([]);
  const activeSubIndex = useRef(-1);
  const smoothOffset = useRef(0);
  const [mounted, setMounted] = useState(false);
  
  const portalRef = useRef(null);

  useEffect(() => {
    portalRef.current = document.body;
    setMounted(true);
  }, []);

  const texts = [
    "",
    "Understanding users, markets & possibilities",
    "Refining flows and maximizing performance",
    "Defining clear goals and actionable roadmaps",
    "Collaborating to build lasting value",
    "A foundation built on experience"
  ];

  const showSub = (index) => {
    const sRef = subRefs.current[index];
    if (sRef) {
      gsap.killTweensOf(sRef);
      gsap.fromTo(sRef, 
        { y: 10, opacity: 0 },
        { y: -0, opacity: 1, duration: 1, ease: "power4.out" }
      );
      return true;
    }
    return false;
  };

  const hideSub = (index) => {
    const sRef = subRefs.current[index];
    if (sRef) {
      gsap.killTweensOf(sRef);
      gsap.to(sRef, { y: 30, opacity: 0, duration: 0.4, ease: "power3.in" });
    }
  };

  useFrame(() => {
    if (!mounted) return;

    const raw = scroll.offset;
    const NUM_CARDS = 6;
    const LERP_SPEED = 0.055;
    const step = 1 / (NUM_CARDS - 1);
    
    let nearest = Math.round(raw / step) * step;
    let rawDist = Math.abs(raw - nearest);

    let pullFactor = Math.max(0, 1 - (rawDist / (step / 2)));
    pullFactor = Math.pow(pullFactor, 3);

    let targetOffset = raw * (1 - pullFactor * 0.45) + nearest * (pullFactor * 0.45);

    smoothOffset.current += (targetOffset - smoothOffset.current) * LERP_SPEED;
    smoothOffset.current = Math.max(0, Math.min(1, smoothOffset.current));

    const currentRender = smoothOffset.current;
    const renderedIndex = Math.round(currentRender / step);
    const dist = Math.abs(currentRender - (renderedIndex * step));
    
    if (dist < 0.015) {
      if (activeSubIndex.current !== renderedIndex) {
        if (activeSubIndex.current !== -1) hideSub(activeSubIndex.current);
        if (showSub(renderedIndex)) {
            activeSubIndex.current = renderedIndex;
        }
      }
    } else if (dist > 0.035) {
      if (activeSubIndex.current !== -1) {
        hideSub(activeSubIndex.current);
        activeSubIndex.current = -1;
      }
    }
  });

  if (!mounted || !portalRef.current) return null;

  return (
    <Html portal={portalRef} className="pointer-events-none z-[999]">
      <div className="fixed top-[0vh] right-10 w-full flex justify-center text-center px-4 pointer-events-none">
        {texts.map((txt, i) => (
          <p 
            key={i} 
            ref={(el) => subRefs.current[i] = el}
            className="absolute left-0 w-full text-lg md:text-xl font-medium text-gray-700 tracking-wide font-sans opacity-0 translate-y-[30px]"
          >
            {txt}
          </p>
        ))}
      </div>
    </Html>
  );
};
