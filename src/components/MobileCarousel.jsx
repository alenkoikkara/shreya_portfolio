import React from "react";

export const MobileCarousel = () => {
  return (
    <div
      className="w-full bg-transparent text-[#1A1A1A] flex flex-col items-center justify-center px-8 z-10 relative pb-32"
      style={{ fontFamily: "'NeueMachina-Regular', sans-serif" }}
    >
      {/* Fixed SVG Bokeh Background */}
      <svg
        className="fixed inset-0 z-[-1] w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="bokehBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="50" />
          </filter>
        </defs>
        <circle cx="85%" cy="40%" r="25%" fill="#FFCAB1" filter="url(#bokehBlur)" opacity="0.6" />
        <circle cx="10%" cy="80%" r="35%" fill="#FFCAB1" filter="url(#bokehBlur)" opacity="0.7" />
      </svg>

      {/* CURIOSITY SECTION */}
      <div className="w-full h-[100vh] flex flex-col items-center justify-center pb-12 border-black/10">
        <h2 className="text-5xl text-left">
          EVERY MEANINGFUL DESIGN BEGINS WITH CURIOSITY
        </h2>
      </div>

      {/* RESEARCH SECTION */}
      <div className="w-full flex flex-col items-center justify-center py-12 border-black/10">
        <h2 className="text-5xl text-center leading-tight mb-4">
          RESEARCH
        </h2>
        <h3 className="text-xl font-bold uppercase mb-4 text-center">
          Primary Research
        </h3>
        <p className="text-left font-sans font-light mb-8 opacity-80 leading-relaxed text-sm">
          I love the process of discovering the real problem statement it gives me purpose, and more importantly, it gives the team clarity and direction. When we understand the core issue, every design decision becomes more intentional, and the impact becomes more meaningful.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-full text-xs tracking-wider">
          VIEW PROJECT →
        </button>
      </div>

      {/* OPTIMISATION SECTION */}
      <div className="w-full flex flex-col items-center justify-center py-12 border-black/10">
        <h2 className="text-4xl text-center leading-tight mb-4">
          OPTIMISATION
        </h2>
        <h3 className="text-xl font-bold uppercase mb-4 text-center">
          Performance & optimization
        </h3>
        <p className="text-left font-sans font-light mb-8 opacity-80 leading-relaxed text-sm">
          Designing and delivering a product is an incredibly fulfilling experience, but assuming users will engage with it exactly as intended is just wishful thinking.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-full text-xs tracking-wider">
          VIEW PROJECT →
        </button>
      </div>

      {/* STRATEGY SECTION */}
      <div className="w-full flex flex-col items-center justify-center py-12 border-black/10">
        <h2 className="text-5xl text-center leading-tight mb-4">
          STRATEGY
        </h2>
        <h3 className="text-xl font-bold uppercase mb-4 text-center">
          North Stars & Strategy
        </h3>
        <p className="text-left font-sans font-light mb-8 opacity-80 leading-relaxed text-sm">
          As I gained more experience in product design, I realized that strategy isn’t optional it’s essential for a product’s success. A great design means little if it doesn’t align with business goals and user needs.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-full text-xs tracking-wider">
          VIEW PROJECT →
        </button>
      </div>

      {/* PARTNERSHIP SECTION */}
      <div className="w-full flex flex-col items-center justify-center py-12 border-black/10">
        <h2 className="text-5xl text-center leading-tight mb-4">
          PARTNERSHIP
        </h2>
        <h3 className="text-xl font-bold uppercase mb-4 text-center">
          Partnership & Collaboration
        </h3>
        <p className="text-left font-sans font-light mb-8 opacity-80 leading-relaxed text-sm">
          My design work thrives through meaningful collaboration across teams. With Product Managers, I leverage deep product knowledge to define clear priorities and acceptance criteria. Engineering partnerships involve finding the optimal balance between design vision and technical feasibility without compromising user value
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-full text-xs tracking-wider">
          VIEW PROJECT →
        </button>
      </div>

      {/* SKILLS SECTION */}
      <div className="w-full flex flex-col items-center justify-center py-12 border-black/10">
        <h2 className="text-4xl leading-tight mb-4 text-left w-full">
          SKILLS GATHERED OVER THE YEARS
        </h2>
        <p className="text-lg w-full text-left mb-10 opacity-70">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
        <div className="flex flex-col gap-4 w-full">
          {["DESIGN THINKING", "DATA INSIGHT", "SYSTEMS THINKING", "BRAINSTORMING", "EMPATHY", "OOUX", "UX MATRIX", "ARCHITECTURE"].map((skill, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-md border border-white/20 rounded-[10px] p-[15px_30px] flex items-center gap-[18px] text-black shadow-lg shadow-black/5 text-xl">
              <span className="uppercase tracking-wider font-bold">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TOOLS SECTION */}
      <div className="w-full flex flex-col items-center justify-center py-12 border-black/10">
        <h2 className="text-4xl leading-tight mb-4 text-left w-full">
          CHAPTERS OF MY DESIGN JOURNEY
        </h2>
        <p className="text-lg w-full text-left opacity-70">
          A curated selection of the software and frameworks I use to bring ideas to life. From design prototyping to high-performance 3D web experiences.
        </p>
      </div>

      {/* JOURNEY LIST */}
      <div className="w-full flex flex-col items-center justify-center py-12 border-black/10 gap-16">
        {["AZUGA", "OPTUM", "TML", "ISRO"].map((role, i) => (
          <div key={i} className="text-5xl text-center font-bold tracking-widest">{role}</div>
        ))}
      </div>

      {/* CONTACT */}
      <div className="w-full flex flex-col pt-24 gap-12">
        <h2 className="text-5xl leading-tight mb-8">
          LET'S TALK DESIGN
        </h2>

        <div className="flex flex-col gap-2 w-full font-sans">
          <div className="linkage-item flex justify-between items-center border-b border-[#1A1A1A] py-8 cursor-pointer">
            <span className="text-xl font-light text-left">AR.SHREYA18@GMAIL.COM</span>
            <div className="linkage-arrow bg-black rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center text-white">→</div>
          </div>
          <div className="linkage-item flex justify-between items-center border-b border-[#1A1A1A] py-8 cursor-pointer">
            <span className="text-xl font-light">LINKEDIN</span>
            <div className="linkage-arrow bg-black rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center text-white">→</div>
          </div>
          <div className="linkage-item flex justify-between items-center border-b border-[#1A1A1A] py-8 cursor-pointer">
            <span className="text-xl font-light">DOWNLOAD RESUME</span>
            <div className="linkage-arrow bg-black rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center text-white">→</div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-12 gap-4">
          <button className="hover-mask-button group bg-black text-white border-none rounded-[30px] p-0 text-sm cursor-pointer overflow-hidden">
            <div className="relative z-10 px-[30px] py-[12px] flex items-center gap-2 group-hover:text-black transition-colors duration-700">
              Next Page →
            </div>
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-[#D0DDF3]/80 text-[#1A1A1A] border border-white/40 rounded-[30px] px-[25px] py-[10px] text-sm cursor-pointer flex items-center gap-2 backdrop-blur-md"
          >
            Go to the top ↑
          </button>
        </div>
      </div>

    </div>
  );
};
