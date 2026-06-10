import React, { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { HardHat } from './ConstructionIcons';

export default function Header({ setAllocationModal }) {
  useEffect(() => {
    const handleResize = () => {
      const header = document.querySelector('header');
      if (header) {
        document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-[100] w-full px-6 py-3.5 md:py-5 border-b border-black/5 bg-[#faf9f6]/80 backdrop-blur-md" style={{ transform: 'translate3d(0, 0, 0)', zIndex: 100 }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo with HardHat icon */}
        <a href="#hero" className="flex items-center gap-3 group z-50">
          <div className="relative w-8 h-8 rounded bg-black p-[1px] flex items-center justify-center overflow-hidden">
            <HardHat className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-extrabold text-xl tracking-wider text-black group-hover:text-neutral-500 transition-colors">
            NOOR<span className="font-serif italic font-normal text-lg text-neutral-500">.infra</span>
          </span>
        </a>

        {/* Action Button */}
        <div className="flex items-center gap-4 z-50">
          <button 
            onClick={() => setAllocationModal(true)}
            className="glow-btn flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] font-bold tracking-wider text-white bg-black rounded-none hover:bg-neutral-850 transition-all steel-beam-border"
          >
            ACCESS PORTAL
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
