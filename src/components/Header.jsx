import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import PillNav from './PillNav';

const navItems = [
  { label: 'About Us', href: '#about' },
  { label: 'Projects', href: '#projects' },
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
    <header className="sticky top-0 z-[100] w-full px-6 py-2.5 md:py-3 border-b border-white/10" style={{ background: 'linear-gradient(135deg, #f7f0eeff 0%, #e6dfddff 60%, rgba(244, 240, 239, 1) 100%)', transform: 'translate3d(0, 0, 0)', zIndex: 100 }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* Left: Brand Logo (Order-1) */}
        <a href="#hero" className="flex items-center gap-3 group z-50 shrink-0 order-1">
          <img
            src="/logo.png.png"
            alt="NCS Logo"
            className="h-11 md:h-12 w-auto object-contain drop-shadow-md group-hover:opacity-80 transition-opacity"
          />
          <span className="text-lg md:text-2xl font-black tracking-tight text-[#8b0000] drop-shadow-sm group-hover:text-[#cc0000] transition-colors uppercase">
            Noor Infrastructure
          </span>
        </a>

        {/* Right-aligned Navigation */}
        <div className="z-50 order-3 md:order-2 flex-1 flex justify-end">
          <PillNav
            items={navItems}
            activeHref={activeHash}
            baseColor="#faf9f6"
            pillColor="#ffffff"
            pillTextColor="#8b0000"
            hoveredPillTextColor="#ffffff"
            hoverCircleColor="#cc0000"
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
