import React from 'react';
import { Activity, ChevronRight, HardHat } from 'lucide-react';
import TypewriterText from './TypewriterText';

export default function Hero({ timeText, setAllocationModal }) {
  return (
    <section id="hero" className="relative py-8 lg:py-12 px-6 h-full max-w-7xl mx-auto z-10">
      
      {/* Light-beam Blind Shadow Overlay across the Hero section (casts real-time shadow slats) */}
      <div className="window-shadow-overlay absolute inset-0"></div>

      {/* Grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:items-center h-full w-full relative z-10">
        {/* Hero Left Content — Concrete textured background */}
        <div className="lg:col-span-7 flex flex-col justify-start lg:justify-center reveal-on-scroll relative z-10 concrete-texture pt-2 lg:pt-0">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-black/10 bg-black/5 text-neutral-700 font-mono text-[11px] tracking-widest mb-8 w-fit relative z-10">
          <Activity className="w-3.5 h-3.5 text-black animate-pulse" />
          SECURE DECENTRALIZED INFRASTRUCTURE // V5.0
        </div>
        
        {/* Mixed Uppercase & Lowercase Italic Serif Header */}
        <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-[1.02] tracking-tight mb-8 text-black relative z-10">
          ENGINEERING <br />
          THE PHYSICAL <br />
          <span className="font-serif italic font-normal text-neutral-500">
            <TypewriterText 
              words={['layer', 'grid', 'nexus', 'future']} 
              speed={100}
              delay={2200}
              eraseSpeed={60}
              loop={true}
            />
          </span>
        </h1>

        <p className="font-sans text-base md:text-lg text-neutral-700 max-w-xl mb-12 leading-relaxed relative z-10">
          Sustainable real estate, millimeter-accurate BIM twin systems, and green-grid layouts. Noor Infrastructure deploys carbon-negative smart developments across the East Coast Road, Tamil Nadu.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 items-center mb-16 font-mono text-[11px] relative z-10">
          <a 
            onClick={() => setAllocationModal(true)}
            style={{ cursor: 'pointer' }}
            className="glow-btn px-6 py-3.5 rounded bg-black text-white font-bold tracking-widest flex items-center gap-2 hover:bg-neutral-850 transition-all text-[12px]"
          >
            EXPLORE ACTIVE VAULTS
            <ChevronRight className="w-4 h-4 text-white" />
          </a>
          <a 
            href="#estimator" 
            className="px-6 py-3.5 rounded border border-black/15 text-neutral-700 hover:text-black hover:border-black/30 tracking-widest flex items-center gap-2 transition-all bg-white/50 text-[12px]"
          >
            CALCULATE ESTIMATE [HUD]
          </a>
        </div>

        {/* Mini-Stats Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-10 border-t border-black/5 font-mono text-sm relative z-10">
          <div>
            <div className="text-xl sm:text-2xl font-bold text-black mb-1">450K+</div>
            <div className="text-[10px] sm:text-[11px] text-neutral-500 tracking-wider font-medium">SQ FT DEVELOPED</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-neutral-700 mb-1">5.0 ★</div>
            <div className="text-[10px] sm:text-[11px] text-neutral-500 tracking-wider font-medium">6 ACTIVE RATINGS</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-black mb-1">94.2%</div>
            <div className="text-[10px] sm:text-[11px] text-neutral-500 tracking-wider font-medium">SOLAR ENERGY DEP</div>
          </div>
        </div>
      </div>

      {/* Hero Right Visuals */}
      <div className="lg:col-span-5 relative flex items-center justify-center reveal-on-scroll z-10">
        {/* Soft Radial ambient lighting shadow */}
        <div className="absolute w-80 h-80 rounded-full bg-black/5 blur-[120px] z-0"></div>

        {/* HUD Frame — Blueprint frame with rivet corners */}
        <div className="relative w-full max-w-[450px] aspect-[4/5] rounded overflow-hidden steel-beam-border rivet-corners p-4 flex flex-col justify-between z-10 bg-white">
          
          {/* Top Frame Bar */}
          <div className="flex justify-between items-center border-b border-black/5 pb-2.5 font-mono text-[11px] text-neutral-500">
            <span>MODEL_ID: ECO_TWR_01</span>
            <span className="text-black animate-pulse">● LIVE_FEED</span>
          </div>

          {/* Render Visual with corner telemetry marks */}
          <div className="relative flex-1 my-4 overflow-hidden rounded bg-[#f3f3f5] flex items-center justify-center border border-black/5">
            <img 
              src="/rough_skyscraper.png" 
              alt="Noor Skyscraper Render" 
              className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-102 transition-all duration-700"
            />
            
            {/* Corner Ticks */}
            <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-black/20"></div>
            <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-black/20"></div>
            <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-black/20"></div>
            <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-black/20"></div>

            {/* Handwritten Annotation Overlays */}
            <div className="absolute top-6 left-6 font-serif italic text-[10px] text-black/40 -rotate-6 pointer-events-none">
              ↖ LOAD BEARING WALL
            </div>
            <div className="absolute bottom-8 right-6 font-serif italic text-[10px] text-black/40 rotate-3 pointer-events-none">
              FOUNDATION: 12.4m →
            </div>
            <div className="absolute top-1/2 left-8 font-serif italic text-[9px] text-black/30 -rotate-90 pointer-events-none">
              ELEV. +42.6m
            </div>
          </div>

          {/* Site Status Badge */}
          <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-neutral-500">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/5 border border-black/10">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              SITE STATUS: ACTIVE
            </span>
            <span className="px-2.5 py-1 rounded bg-black/5 border border-black/10">
              ZONE: ECR-04
            </span>
          </div>

          {/* Construction Progress Bar */}
          <div className="mb-2">
            <div className="flex justify-between font-mono text-[9px] text-neutral-500 mb-1">
              <span>OVERALL SITE PROGRESS</span>
              <span className="text-black font-bold">78%</span>
            </div>
            <div className="progress-bar-construction">
              <div className="progress-fill" style={{ width: '78%' }}></div>
            </div>
          </div>

          {/* Bottom Diagnostics HUD */}
          <div className="bg-[#faf9f6] rounded p-3.5 font-mono text-[11px] border border-black/5 space-y-2">
            <div className="flex justify-between text-neutral-700">
              <span>STRUCTURAL_INTEGRITY:</span>
              <span className="text-black font-bold">
                <TypewriterText words="99.88% NOMINAL" speed={40} loop={false} cursor={true} delay={50000} />
              </span>
            </div>
            <div className="w-full bg-neutral-200 h-1 rounded-full overflow-hidden">
              <div className="bg-black h-full" style={{ width: '99.88%' }}></div>
            </div>
            <div className="flex justify-between text-neutral-700 pt-1">
              <span>ESTIMATED OFFSETS:</span>
              <span className="text-neutral-900 font-bold">
                <TypewriterText words="384.2 TONS CO2 / YR" speed={45} loop={false} cursor={true} delay={50000} />
              </span>
            </div>
            <div className="flex justify-between text-neutral-700">
              <span>BUILDER CLASSIFICATION:</span>
              <span className="text-black">
                <TypewriterText words="REAL ESTATE BUILDERS" speed={50} loop={false} cursor={true} delay={50000} />
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Rivet Corners (extra pair) */}
        <div className="absolute bottom-0 left-[calc(50%-225px)] w-2 h-2 rounded-full border border-black/20 bg-black/5 hidden lg:block"></div>
        <div className="absolute bottom-0 right-[calc(50%-225px)] w-2 h-2 rounded-full border border-black/20 bg-black/5 hidden lg:block"></div>
      </div>
      </div>
    </section>
  );
}
