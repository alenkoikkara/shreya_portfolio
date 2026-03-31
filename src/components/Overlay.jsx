import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PIN_DURATION } from "./Carousel3D";

gsap.registerPlugin(ScrollTrigger);

const texts = [
  {
    title: "",
    subTitle: ""
  },
  {
    title: "Primary Research",
    subTitle: "I love the process of discovering the real problem statement it gives me purpose, and more importantly, it gives the team clarity and direction. When we understand the core issue, every design decision becomes more intentional, and the impact becomes more meaningful."
  },
  {
    title: "Performance & optimization",
    subTitle: "Designing and delivering a product is an incredibly fulfilling experience, but assuming users will engage with it exactly as intended is just wishful thinking."
  },
  {
    title: "North Stars & Strategy",
    subTitle: "As I gained more experience in product design, I realized that strategy isn’t optional it’s essential for a product’s success. A great design means little if it doesn’t align with business goals and user needs."
  },
  {
    title: "Partnership & Collaboration",
    subTitle: "My design work thrives through meaningful collaboration across teams. With Product Managers, I leverage deep product knowledge to define clear priorities and acceptance criteria. Engineering partnerships involve finding the optimal balance between design vision and technical feasibility without compromising user value"
  },
  {
    title: "",
    subTitle: ""
  },
  {
    title: "",
    subTitle: ""
  },
  {
    title: "",
    subTitle: ""
  }
]

export const Overlay = () => {
  const container = useRef();
  const subRefs = useRef([]);

  useGSAP(() => {
    // Initialize state
    subRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === 0) {
        gsap.set(el, { opacity: 1, y: 0 }); // First is visible
      } else {
        gsap.set(el, { opacity: 0, y: 10 }); // Others start hidden/displaced
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: () => window.innerHeight * 5, // Ends when partnership card exits
        scrub: 1.5
      }
    });

    // Each 'unit' in this timeline is 1 window height.
    texts.forEach((_, i) => {
      const el = subRefs.current[i];
      if (!el) return;

      const peakTime = i;

      // Animate In (except first which is already visible)
      if (i > 0) {
        const entryEndTime = peakTime - PIN_DURATION / 2;
        const entryStartTime = peakTime - 0.4;

        if (entryStartTime < entryEndTime) {
          const inDur = entryEndTime - entryStartTime;
          tl.fromTo(
            el,
            { opacity: 0 },
            { opacity: 1, duration: inDur, ease: "power2.out" },
            entryStartTime
          );
        }
      }

      // Animate Out (all items including last)
      {
        const exitStartTime = peakTime + PIN_DURATION / 2;
        const exitEndTime = peakTime + 0.4;
        const outDur = exitEndTime - exitStartTime;

        tl.to(
          el,
          { opacity: 0, duration: outDur, ease: "power2.in" },
          exitStartTime
        );
      }
    });

    // Scroll Indicator Animation
    gsap.to(".scroll-indicator-arrow", {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "power1.inOut"
    });

    gsap.to(".scroll-indicator", {
      opacity: 0,
      y: 20,
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "2% top",
        scrub: true
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className="fixed top-[60vh] right-0 w-full flex justify-end px-4 pointer-events-none z-[999]">
      {texts.map((txt, i) => (
        <div
          key={i}
          ref={(el) => subRefs.current[i] = el}
          className="absolute right-0 text-[clamp(0.65rem,1vw,1.05rem)] tracking-wide font-sans flex items-center justify-between w-full"
          style={{ transform: i === 0 ? 'translateY(0)' : 'translateY(20px)', opacity: i === 0 ? 1 : 0 }}
        >
          {/* Corrected Text Block (Single instance) */}
          <div className="flex flex-col items-end max-w-sm mr-12 text-black opacity-0">
            <div className="font-bold text-left w-full uppercase mb-1">
              {txt.title}
            </div>
            <div className="font-light max-w-[320px] text-right">
              {txt.subTitle}
            </div>
          </div>
          
          {txt.title && (
            <div
              className="relative overflow-hidden rounded-full cursor-pointer pointer-events-auto group mr-10"
              style={{ background: 'black' }}
            >
              <div className="relative z-10 px-5 py-2 text-[11px] font-light text-white group-hover:text-black transition-colors duration-300 whitespace-nowrap">
                VIEW PROJECT →
              </div>
            </div>
          )}

          {/* Corrected Text Block (Single instance) */}
          <div className="flex flex-col items-end max-w-sm mr-12 text-black">
            <div className="font-bold text-left w-full uppercase mb-1">
              {txt.title}
            </div>
            <div className="font-light  max-w-[320px] text-left">
              {txt.subTitle}
            </div>
          </div>
        </div>
      ))}
      
      {/* Scroll Indicator */}
      <div className="scroll-indicator fixed bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-[1000]">
        <span className="opacity-0 text-[10px] font-light tracking-[0.3em] uppercase">Scroll to explore</span>
        <div className="scroll-indicator-arrow">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges' }}>
            <path d="M4 8h2v2H4V8zM6 10h2v2H6v-2zM8 12h2v2H8v-2zM10 14h4v2h-4v-2zM14 12h2v2h-2v-2zM16 10h2v2h-2v-2zM18 8h2v2h-2V8z" fill="black" fillOpacity="1" />
          </svg>
        </div>
      </div>
    </div>
  );
};

