import { useState, useEffect, useRef } from 'react';

const NAV_ITEMS = [
  { name: 'Home', url: '/' },
  { name: 'Expertise', url: 'https://www.pages.shreyauxfolio.net/expertise_v1' },
  { name: 'Work', url: 'https://www.pages.shreyauxfolio.net/work_v1' },
  { name: 'About', url: 'https://www.pages.shreyauxfolio.net/about_v1' },
];

export const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100 && !isMenuOpen) {
        // Scrolling down - Hide (but don't hide if menu is open)
        setIsVisible(false);
      } else {
        // Scrolling up - Show
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[1002] px-[30px] md:px-10 h-[60px] md:h-[100px] md:py-8 flex justify-between items-center transition-transform duration-500 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* Mobile: Branding Left | Menu Right */}
        <div className="flex w-full items-center justify-between md:hidden">
          <div className="relative z-10 flex items-center space-x-2 cursor-pointer group">
            <span className="text-[16px] transition-all duration-300">
              <span className="font-bold group-hover:font-normal transition-all duration-300">Design.</span>
              <span className="font-normal group-hover:font-bold transition-all duration-300">Shreya</span>
            </span>
          </div>
          <div 
            className="text-[16px] font-sans cursor-pointer" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 'CLOSE' : 'MENU'}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex items-center space-x-2 cursor-pointer group relative z-10">
          <span className="text-[18px] transition-all duration-300">
            <span className="font-[600] group-hover:font-[200] transition-all duration-300">Design.</span>
            <span className="font-[200] group-hover:font-[600] transition-all duration-300">Shreya</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex relative z-10 space-x-14">
          {NAV_ITEMS.map((item) => (
            <a 
              href={item.url}
              key={item.name} 
              className="group relative text-[14px] hover:text-[#475569] hover:font-[400] transition-all duration-300 ease-in-out uppercase font-[200] cursor-pointer text-inherit"
            >
              {item.name}
              <div 
                className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#1A1A1A] transition-transform duration-300 ease-in-out ${
                  item.name === 'Home' 
                    ? 'scale-x-100 origin-left' 
                    : 'origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100'
                }`}
              ></div>
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Fullscreen Dropdown */}
      <div 
        className={`fixed inset-0 bg-[#D0DDF3] z-[1001] flex flex-col justify-start items-left px-8 pt-32 transition-all duration-500 ease-in-out md:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <div className="flex flex-col gap-5 text-left text-[#000000]">
          {NAV_ITEMS.map((item) => (
            <a 
              href={item.url}
              key={item.name} 
              className="text-lg font-normal tracking-widest cursor-pointer hover:opacity-50 transition-opacity duration-300 font-sans uppercase no-underline text-inherit"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
