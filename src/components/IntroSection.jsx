import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function IntroSection({ onStartReveal, onComplete }) {
  const containerRef = useRef(null);
  const topHalfRef = useRef(null);
  const bottomHalfRef = useRef(null);
  const strikeLineRef = useRef(null);
  const logoGroupRef = useRef(null);
  const svgRef = useRef(null);
  const scannerLineRef = useRef(null);
  const statusTextRef = useRef(null);

  const [skipped, setSkipped] = useState(false);
  const tlRef = useRef(null);

  const onStartRevealRef = useRef(onStartReveal);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onStartRevealRef.current = onStartReveal;
    onCompleteRef.current = onComplete;
  }, [onStartReveal, onComplete]);

  useEffect(() => {
    // 1. Setup path lengths for the sketch drawing effect
    const paths = containerRef.current.querySelectorAll('.draw-path');
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });

    // 2. Setup the GSAP timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tlRef.current = tl;

      // Initial state
      gsap.set(logoGroupRef.current, { opacity: 0, y: 25 });
      gsap.set(svgRef.current, { opacity: 0, scale: 0.88 });
      gsap.set(strikeLineRef.current, { scaleX: 0 });
      gsap.set('.telemetry-hud', { opacity: 0 });

      // PHASE 1: Strike line initial tap + Fade in blueprint grid
      tl.to(strikeLineRef.current, { scaleX: 0.15, duration: 0.35, ease: 'power2.out' })
        .to(svgRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, '-=0.15')
        .to('.telemetry-hud', { opacity: 0.4, duration: 0.3, stagger: 0.04 }, '-=0.35');

      // PHASE 2: Sketch lines draw in (total 1.2s)
      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 1.2,
        stagger: 0.02,
        ease: 'sine.inOut'
      }, '-=0.1');

      // Scanner line animation sweeping across the height
      tl.fromTo(scannerLineRef.current,
        { attr: { y1: 10, y2: 10 }, opacity: 0 },
        { attr: { y1: 150, y2: 150 }, opacity: 1, duration: 1.2, ease: 'sine.inOut' },
        '-=1.2'
      );
      tl.to(scannerLineRef.current, { opacity: 0, duration: 0.15 }, '-=0.1');

      // Dynamic Status Callouts
      tl.call(() => {
        if (statusTextRef.current) statusTextRef.current.textContent = "STATUS: ERECTING STRUCTURE_";
      }, null, 0.3);

      tl.call(() => {
        if (statusTextRef.current) statusTextRef.current.textContent = "STATUS: RESOLVING RENDER_";
      }, null, 0.9);

      tl.call(() => {
        if (statusTextRef.current) statusTextRef.current.textContent = "STATUS: BUILD COMPLETED";
        if (statusTextRef.current) {
          statusTextRef.current.classList.remove('text-[#ff6200]');
          statusTextRef.current.classList.add('text-green-400');
        }
      }, null, 1.2);

      // PHASE 3: Ambient fill fades in + Brand Logo reveal
      tl.to('.house-fill', { fillOpacity: 0.08, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .to(logoGroupRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.2')
        .to('.telemetry-hud', { opacity: 0.12, duration: 0.5 }, '-=0.6');

      // Final Hold for dramatic resolution
      tl.to({}, { duration: 0.6 });

      // PHASE 4: Big Slash strike & Vertical Split reveal
      tl.to(strikeLineRef.current, { scaleX: 1, duration: 0.3, ease: 'power2.inOut' })
        .to('.parallax-target, .skip-btn', {
          opacity: 0,
          scale: 1.03,
          duration: 0.3,
          ease: 'power2.inOut'
        }, '-=0.1')
        .add(() => {
          if (onStartRevealRef.current) onStartRevealRef.current();
        })
        .to(topHalfRef.current, {
          yPercent: -100,
          duration: 0.75,
          ease: 'power4.inOut'
        }, 'split')
        .to(bottomHalfRef.current, {
          yPercent: 100,
          duration: 0.75,
          ease: 'power4.inOut',
          onComplete: () => {
            if (onCompleteRef.current) onCompleteRef.current();
          }
        }, 'split')
        .to(strikeLineRef.current, {
          opacity: 0,
          duration: 0.15
        }, 'split+=0.05');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSkip = () => {
    if (skipped) return;
    setSkipped(true);

    if (tlRef.current) {
      tlRef.current.kill();
    }

    if (onStartRevealRef.current) onStartRevealRef.current();

    const skipTimeline = gsap.timeline();
    skipTimeline.to(containerRef.current.querySelectorAll('.telemetry-hud, .skip-btn, .parallax-target'), {
      opacity: 0,
      scale: 0.98,
      duration: 0.25,
      ease: 'power2.out'
    });

    skipTimeline.to(topHalfRef.current, {
      yPercent: -100,
      duration: 0.6,
      ease: 'power3.inOut'
    }, 0.05)
    .to(bottomHalfRef.current, {
      yPercent: 100,
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        if (onCompleteRef.current) onCompleteRef.current();
      }
    }, 0.05)
    .to(strikeLineRef.current, {
      opacity: 0,
      duration: 0.1
    }, 0.05);
  };

  const handleMouseMove = (e) => {
    if (skipped) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xPos = (clientX / innerWidth - 0.5) * 24; // Limit rotation to +/- 12 degrees
    const yPos = (clientY / innerHeight - 0.5) * 24;

    gsap.to('.parallax-target', {
      rotateY: xPos,
      rotateX: -yPos,
      transformPerspective: 1200,
      ease: 'power2.out',
      duration: 0.6
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 w-screen h-screen z-[99999] overflow-hidden bg-transparent select-none"
    >
      {/* ── SKIP INTRO ACTION BUTTON ── */}
      <button
        onClick={handleSkip}
        className="skip-btn absolute top-6 right-6 px-4 py-2 text-[10px] font-mono tracking-widest text-[#ff6200] hover:text-white border border-[#ff6200]/30 hover:border-[#ff6200] bg-[#111111]/85 hover:bg-[#ff6200] rounded-full transition-all duration-300 z-50 pointer-events-auto cursor-pointer shadow-[0_0_15px_rgba(255,98,0,0.15)] hover:shadow-[0_0_20px_rgba(255,98,0,0.4)]"
      >
        SKIP INTRO →
      </button>

      {/* ── SPLIT BACKGROUND PANELS ── */}
      <div
        ref={topHalfRef}
        className="absolute top-0 left-0 right-0 h-[50vh] bg-[#111111] z-10 origin-top"
      />
      <div
        ref={bottomHalfRef}
        className="absolute bottom-0 left-0 right-0 h-[50vh] bg-[#111111] z-10 origin-bottom"
      />

      {/* ── CENTER STRIKE LINE ── */}
      <div
        ref={strikeLineRef}
        className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-[#ff6200] z-30 shadow-[0_0_15px_rgba(255,98,0,1)] origin-center"
      />

      {/* ── TELEMETRY HUD LABELS (DESKTOP ONLY) ── */}
      <div className="telemetry-hud absolute top-12 left-12 font-mono text-[9px] text-zinc-500 tracking-[0.2em] uppercase z-20 pointer-events-none hidden md:block">
        <div className="text-zinc-600 mb-0.5">SYS.LOC</div>
        <div className="text-[#ff6200]/80 font-bold">13.0827° N // 80.2707° E</div>
      </div>
      <div className="telemetry-hud absolute bottom-12 left-12 font-mono text-[9px] text-zinc-500 tracking-[0.2em] uppercase z-20 pointer-events-none hidden md:block">
        <div className="text-zinc-600 mb-0.5">SCALE.MODEL</div>
        <div className="text-white">1 : 150 (METRIC)</div>
      </div>
      <div className="telemetry-hud absolute top-12 right-12 font-mono text-[9px] text-zinc-500 tracking-[0.2em] uppercase z-20 pointer-events-none hidden md:block text-right">
        <div className="text-zinc-600 mb-0.5">GRID.UNIT</div>
        <div className="text-zinc-400 font-semibold">ACTIVE SUB-GRID</div>
      </div>
      <div className="telemetry-hud absolute bottom-12 right-12 font-mono text-[9px] text-zinc-500 tracking-[0.2em] uppercase z-20 pointer-events-none hidden md:block text-right">
        <div className="text-zinc-600 mb-0.5">BIM.ENGINE</div>
        <div className="text-[#ff6200]/80 font-bold">v2.06_ONLINE</div>
      </div>

      {/* ── HOLOGRAM CONTENT CONTAINER ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-6">
        <div 
          className="relative flex flex-col items-center justify-center parallax-target"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* SVG Wireframe Canvas */}
          <div className="relative w-72 h-72 md:w-[380px] md:h-[380px] flex items-center justify-center overflow-visible">
            {/* Ambient grid bg under house */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-[110%] h-[110%] bg-[radial-gradient(#ff6200_1px,transparent_1px)] [background-size:14px_14px] rounded-full" />
            </div>

            <svg
              ref={svgRef}
              viewBox="0 0 200 160"
              className="w-full h-full object-contain overflow-visible"
            >
              <defs>
                <filter id="orange-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <linearGradient id="scan-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(255, 98, 0, 0)" />
                  <stop offset="50%" stopColor="rgba(255, 98, 0, 0.85)" />
                  <stop offset="100%" stopColor="rgba(255, 98, 0, 0)" />
                </linearGradient>
              </defs>

              {/* Blueprint Reference Circles & Crosshairs */}
              <g opacity="0.18">
                <circle cx="100" cy="80" r="72" stroke="#ff6200" strokeWidth="0.5" strokeDasharray="3,3" fill="none" />
                <circle cx="100" cy="80" r="48" stroke="#ff6200" strokeWidth="0.5" fill="none" />
                <circle cx="100" cy="80" r="24" stroke="#ff6200" strokeWidth="0.5" fill="none" />
                <line x1="20" y1="80" x2="180" y2="80" stroke="#ff6200" strokeWidth="0.5" strokeDasharray="6,4" />
                <line x1="100" y1="5" x2="100" y2="155" stroke="#ff6200" strokeWidth="0.5" strokeDasharray="6,4" />
              </g>

              {/* Architectural Ambient Fills */}
              <polygon points="50,105 50,95 80,82 80,92" fill="#ff6200" className="house-fill" fillOpacity="0" />
              <polygon points="80,42 80,35 95,29 95,36" fill="#ff6200" className="house-fill" fillOpacity="0" />
              <polygon points="105,42 105,35 120,42 120,49" fill="#ff6200" className="house-fill" fillOpacity="0" />
              <polygon points="30,80 100,45 170,80 100,110" fill="rgba(255, 98, 0, 0.06)" className="house-fill" fillOpacity="0" />

              {/* Wireframe Paths to be Drawn */}
              {/* Foundation */}
              <path d="M 20,130 L 100,90 L 180,130" stroke="#ff6200" strokeWidth="1" fill="none" className="draw-path" />
              <path d="M 20,130 L 100,160 L 180,130 Z" stroke="#ff6200" strokeWidth="0.75" strokeDasharray="3,3" fill="none" className="draw-path" />

              {/* Main Structural Verticals */}
              <path d="M 30,125 V 80" stroke="#ff6200" strokeWidth="1.5" fill="none" className="draw-path" />
              <path d="M 100,155 V 110" stroke="#ff6200" strokeWidth="1.5" fill="none" className="draw-path" />
              <path d="M 170,125 V 80" stroke="#ff6200" strokeWidth="1.5" fill="none" className="draw-path" />
              <path d="M 100,90 V 45" stroke="#ff6200" strokeWidth="1.5" fill="none" className="draw-path" />

              {/* Floor Slab Division */}
              <path d="M 30,80 L 100,45 L 170,80 L 100,110 Z" stroke="#ff6200" strokeWidth="1.5" fill="none" className="draw-path" />

              {/* Upper Level Verticals */}
              <path d="M 65,62 V 30" stroke="#ff6200" strokeWidth="1.5" fill="none" className="draw-path" />
              <path d="M 135,62 V 30" stroke="#ff6200" strokeWidth="1.5" fill="none" className="draw-path" />
              <path d="M 100,80 V 45" stroke="#ff6200" strokeWidth="0.75" strokeDasharray="2,2" fill="none" className="draw-path" />

              {/* Roof Frame Slab */}
              <path d="M 65,30 L 100,12 L 135,30 L 100,48 Z" stroke="#ff6200" strokeWidth="1.5" fill="none" className="draw-path" />

              {/* Roof Apex & Ridge */}
              <path d="M 65,30 L 100,0 L 135,30" stroke="#ff6200" strokeWidth="1.5" fill="none" className="draw-path" />
              <path d="M 100,12 V 0" stroke="#ff6200" strokeWidth="1" fill="none" className="draw-path" />

              {/* Secondary Details & Openings */}
              <path d="M 115,130 L 115,115 L 140,105 L 140,120" stroke="#ff6200" strokeWidth="1" fill="none" className="draw-path" />
              <path d="M 100,90 L 170,90" stroke="#ff6200" strokeWidth="1.2" fill="none" className="draw-path" />
              <path d="M 100,110 L 170,80" stroke="#ff6200" strokeWidth="0.75" strokeDasharray="2,1" fill="none" className="draw-path" />
              <path d="M 50,105 L 50,95 L 80,82 L 80,92 Z" stroke="#ff6200" strokeWidth="1" fill="none" className="draw-path" />
              <path d="M 80,42 L 80,35 L 95,29 L 95,36 Z" stroke="#ff6200" strokeWidth="1" fill="none" className="draw-path" />
              <path d="M 105,42 L 105,35 L 120,42 L 120,49 Z" stroke="#ff6200" strokeWidth="1" fill="none" className="draw-path" />
              <path d="M 75,25 L 90,18 L 105,25 L 90,32 Z" stroke="#ff6200" strokeWidth="0.75" fill="none" className="draw-path" />
              <path d="M 80,24 L 90,28" stroke="#ff6200" strokeWidth="0.5" fill="none" className="draw-path" />
              <path d="M 85,21 L 95,25" stroke="#ff6200" strokeWidth="0.5" fill="none" className="draw-path" />

              {/* Hologram Laser Scanner */}
              <line
                ref={scannerLineRef}
                x1="10"
                y1="10"
                x2="190"
                y2="10"
                stroke="url(#scan-gradient)"
                strokeWidth="2"
                filter="url(#orange-glow)"
                opacity="0"
              />
            </svg>

            {/* Float HUD Status Indicators */}
            <div
              ref={statusTextRef}
              className="telemetry-hud absolute bottom-2 font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-[#ff6200] border border-[#ff6200]/25 px-3 py-1 bg-black/75 backdrop-blur-md rounded shadow-[0_0_10px_rgba(255,98,0,0.1)] transition-all duration-300"
            >
              STATUS: INITIALIZING_
            </div>
          </div>

          {/* Logo, Name & Corporate Tagline */}
          <div ref={logoGroupRef} className="flex flex-col items-center mt-6 text-center select-none">
            <div className="flex items-center justify-center gap-3 mb-2.5">
              <img
                src="/ncs-logo.png"
                alt="NCS Logo"
                className="h-10 md:h-12 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(255,98,0,0.4)]"
              />
              <div className="w-[1px] h-8 bg-zinc-800" />
              <span className="font-display font-black text-2xl md:text-4xl text-white tracking-[0.1em] uppercase">
                NOOR <span className="text-[#ff6200]">Constructions</span>
              </span>
            </div>
            <div className="text-zinc-400 font-mono text-[9px] md:text-[10px] tracking-[0.35em] uppercase">
              Vision <span className="text-[#ff6200] font-bold">•</span> Precision <span className="text-[#ff6200] font-bold">•</span> Excellence
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
