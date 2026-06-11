import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { HardHat } from './ConstructionIcons';
import PillNav from './PillNav';

const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

export default function Header({ setAllocationModal }) {
  const [activeHash, setActiveHash] = useState('#hero');

  // Track dynamic header height
  useEffect(() => {
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth !== lastWidth) {
        lastWidth = currentWidth;
        const header = document.querySelector('header');
        if (header) {
          document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
        }
      }
    };
    const header = document.querySelector('header');
    if (header) {
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // IntersectionObserver Scroll Spy to auto-highlight active section pill
  useEffect(() => {
    const sections = ['hero', 'projects', 'about', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Triggers when section is centered in viewport
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveHash(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Sync with hash clicks
    const handleHashChange = () => {
      if (window.location.hash) {
        setActiveHash(window.location.hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <header className="sticky top-0 z-[100] w-full px-6 py-3.5 md:py-4 border-b border-white/10 bg-[#1c1a17]" style={{ transform: 'translate3d(0, 0, 0)', zIndex: 100 }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo (Order-1) */}
        <a href="#hero" className="flex items-center gap-3 group z-50 shrink-0 order-1">
          <div className="relative w-8 h-8 rounded bg-white/10 p-[1px] flex items-center justify-center overflow-hidden">
            <HardHat className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-extrabold text-xl tracking-wider text-white group-hover:text-white/70 transition-colors">
            NOOR<span className="font-serif italic font-normal text-lg text-white/60">.infrastructure</span>
          </span>
        </a>

        {/* Right-aligned Navigation */}
        <div className="z-50 order-3 md:order-2 flex-1 flex justify-end">
          <PillNav
            items={navItems}
            activeHref={activeHash}
            baseColor="#faf9f6"
            pillColor="#ffffff"
            pillTextColor="#111115"
            hoveredPillTextColor="#ffffff"
            hoverCircleColor="#444"
            wrapperClassName="w-auto flex items-center justify-end"
            className="w-auto"
            initialLoadAnimation={true}
          />
        </div>

        {/* Right: CTA Access Portal Button (Order-2 on mobile, Order-3 on desktop) */}
        <div className="flex items-center gap-2 md:gap-4 z-50 shrink-0 order-2 md:order-3">
          <button 
            onClick={() => setAllocationModal(true)}
            className="glow-btn flex items-center justify-center p-3 font-bold text-white bg-black rounded-none hover:bg-neutral-850 transition-all steel-beam-border"
            title="Access Portal"
          >
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>
      </div>
    </header>
  );
}
