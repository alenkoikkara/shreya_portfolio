import { useEffect, useState } from "react";

/**
 * LoadingScreen component that displays a full-screen overlay with branding.
 * Features a bold-switching animation that cycles multiple times.
 */
export const LoadingScreen = ({ isFinished }) => {
  const [isBold, setIsBold] = useState(false);

  useEffect(() => {
    // Cycle the bold state every 400ms
    const interval = setInterval(() => {
      setIsBold((prev) => !prev);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-[2000] bg-[#FDECFF] flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
        isFinished ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className={`text-[24px] md:text-[32px] tracking-tight md:tracking-normal transition-all duration-1000 ease-in-out ${
        isFinished ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-none'
      }`}>
        <span 
          className={`transition-all duration-300 inline-block ${
            isBold ? 'font-[200]' : 'font-[600]'
          }`}
        >
          Design.
        </span>
        <span 
          className={`transition-all duration-300 inline-block ${
            isBold ? 'font-[600]' : 'font-[200]'
          }`}
        >
          Shreya
        </span>
      </div>
    </div>
  );
};
