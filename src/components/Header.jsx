import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { HardHat } from './ConstructionIcons';

export default function Header({ activeNav, setActiveNav, setAllocationModal }) {
  return (
    <header className="sticky top-0 z-50 w-full px-6 py-5 border-b border-black/5 bg-[#faf9f6]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo with HardHat icon */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded bg-black p-[1px] flex items-center justify-center overflow-hidden">
            <HardHat className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-extrabold text-xl tracking-wider text-black group-hover:text-neutral-500 transition-colors">
            NOOR<span className="font-serif italic font-normal text-lg text-neutral-500">.infra</span>
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] tracking-widest text-neutral-600">
          <a 
            href="#projects" 
            onClick={() => setActiveNav('projects')}
            className={`hover:text-black transition-colors ${activeNav === 'projects' ? 'text-black font-semibold' : ''}`}
          >
            [ 01_PROJECTS ]
          </a>
          <a 
            href="#ecosystem" 
            onClick={() => setActiveNav('ecosystem')}
            className={`hover:text-black transition-colors ${activeNav === 'ecosystem' ? 'text-black font-semibold' : ''}`}
          >
            [ 02_ECOSYSTEM ]
          </a>
          <a 
            href="#estimator" 
            onClick={() => setActiveNav('estimator')}
            className={`hover:text-black transition-colors ${activeNav === 'estimator' ? 'text-black font-semibold' : ''}`}
          >
            [ 03_SMART_HUD ]
          </a>
          <a 
            href="#reviews" 
            onClick={() => setActiveNav('reviews')}
            className={`hover:text-black transition-colors ${activeNav === 'reviews' ? 'text-black font-semibold' : ''}`}
          >
            [ 04_REVIEWS ]
          </a>
          <a 
            href="#contact" 
            onClick={() => setActiveNav('contact')}
            className={`hover:text-black transition-colors ${activeNav === 'contact' ? 'text-black font-semibold' : ''}`}
          >
            [ 05_SITE_OFFICE ]
          </a>
        </nav>

        {/* Action Button */}
        <button 
          onClick={() => setAllocationModal(true)}
          className="glow-btn flex items-center gap-2 px-5 py-2.5 font-mono text-[11px] font-bold tracking-wider text-white bg-black rounded-none hover:bg-neutral-850 transition-all steel-beam-border"
        >
          ACCESS PORTAL
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
