import { useState, useEffect, useRef } from 'react';

export const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down - Hide
        setIsVisible(false);
      } else {
        // Scrolling up - Show
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[1001] px-10 py-8 flex justify-between items-center transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Translucent background layer */}
      <div className="absolute inset-0 pointer-events-none" />

      {/* Branding */}
      <div className="relative z-10 flex items-center space-x-2 cursor-pointer group">
        <span className="text-md font-normal tracking-[0.2em] transition-all duration-300">
          <b>Design.</b>Shreya
        </span>
      </div>

      {/* Navigation Links (Placeholders) */}
      <div className="relative z-10 flex space-x-28">
        {['Home', 'Expertise', 'Work', 'About'].map((item) => (
          <div 
            key={item} 
            className="text-[14px] font-normal tracking-widest cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            {item}
          </div>
        ))}
      </div>
    </nav>
  );
};
