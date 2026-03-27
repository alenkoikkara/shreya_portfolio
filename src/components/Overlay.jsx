import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PIN_DURATION } from "./Carousel3D";

gsap.registerPlugin(ScrollTrigger);

const texts = [
  {
    title: "",
    subTitle: ""
  },
  {
    title: "Primary Reasearch",
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
    title: "A foundation built on experience",
    subTitle: "I love the process of discovering the real problem statement it gives me purpose, and more importantly, it gives the team clarity and direction. When we understand the core issue, every design decision becomes more intentional, and the impact becomes more meaningful."
  }
]

export const Overlay = () => {
  const subRefs = useRef([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

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
        end: "bottom bottom",
        scrub: 1.5
      }
    });

    tl.to({}, { duration: 5 });
    texts.forEach((_, i) => {
      const el = subRefs.current[i];
      if (!el) return;

      const peakTime = i;

      // Animate In (except first which is already visible)
      if (i > 0) {
        const entryEndTime = peakTime - PIN_DURATION / 2;
        const entryStartTime = peakTime - 0.4; // Starts well after previous card exits

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

      // Animate Out (except the last one)
      if (i < texts.length - 1) {
        const exitStartTime = peakTime + PIN_DURATION / 2;
        const exitEndTime = peakTime + 0.4; // Ends well before next card enters
        const outDur = exitEndTime - exitStartTime;

        tl.to(
          el,
          { opacity: 0, duration: outDur, ease: "power2.in" },
          exitStartTime
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="fixed top-[60vh] right-0 w-full flex justify-end px-4 pointer-events-none z-[999]">
      {texts.map((txt, i) => (
        <div
          key={i}
          ref={(el) => subRefs.current[i] = el}
          className="absolute right-0 text-[clamp(0.65rem,1vw,1.05rem)] tracking-wide font-sans flex items-end justify-between w-full"
          style={{ transform: i === 0 ? 'translateY(0)' : 'translateY(20px)', opacity: i === 0 ? 1 : 0 }}
        >
          <div className="flex flex-col items-end max-w-sm opacity-0">
            <div className="font-medium text-left w-full">
              {txt.title}
            </div>
            <div className="font-normal max-w-sm">
              {txt.subTitle}
            </div>
          </div>
          {txt.title &&
            <div
              className="relative overflow-hidden rounded-full cursor-pointer pointer-events-auto group"
              style={{ background: 'black' }}
            >

              <div className="relative z-10 px-5 py-3 text-[12px] font-light text-white group-hover:text-black transition-colors duration-300 whitespace-nowrap">
                VIEW PROJECT →
              </div>
            </div>
          }
          <div className="flex flex-col items-end max-w-sm mr-10">
            <div className="font-medium text-left w-full">
              {txt.title}
            </div>
            <div className="font-light max-w-sm">
              {txt.subTitle}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
