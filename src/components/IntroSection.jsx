import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function Circle({ bgColor = 'bg-zinc-700', borderRadius = 'rounded-full' }) {
  return (
    <div className={`h-12 w-12 md:h-20 md:w-20 shrink-0 ${borderRadius} ${bgColor}`} />
  );
}

function Cylinder({ text, logo, bgColor = 'bg-zinc-800', width = 'w-24 md:w-48', textColor = 'text-white', textRef }) {
  return (
    <div
      className={`h-12 md:h-20 shrink-0 relative flex items-center justify-center rounded-full overflow-hidden px-5 md:px-8 ${width} ${bgColor}`}
    >
      <div ref={textRef} className={`flex items-center gap-2.5 md:gap-4 opacity-0 translate-y-5 ${textColor}`}>
        {logo && <img src={logo} alt="Logo" className="h-6 md:h-11 w-auto object-contain" />}
        {text && (
          <span className="font-mono font-bold text-[10px] md:text-xl lg:text-2xl tracking-widest uppercase whitespace-nowrap">
            {text}
          </span>
        )}
      </div>
    </div>
  );
}

export default function IntroSection({ onStartReveal, onComplete }) {
  const containerRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const linesWrapperRef = useRef(null);
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const glowLineRef = useRef(null);

  // References for individual lines to animate position
  const lineRefs = useRef([]);
  // References for texts to animate fade-in
  const textRefs = useRef([]);

  // Use refs to avoid recreating GSAP timeline on callback reference changes
  const onStartRevealRef = useRef(onStartReveal);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onStartRevealRef.current = onStartReveal;
    onCompleteRef.current = onComplete;
  }, [onStartReveal, onComplete]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // ── PHASE 1: Initial Logo Reveal ──
      tl.set(logoWrapperRef.current, { opacity: 0, scale: 0.85 })
        .set(linesWrapperRef.current, { display: 'none' })
        .to(logoWrapperRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' })
        .to(logoWrapperRef.current, { opacity: 0, scale: 0.95, duration: 0.6, ease: 'power3.in', delay: 0.6 });

      // ── PHASE 2: Setup Lines for Slide-in ──
      tl.add(() => {
        gsap.set(logoWrapperRef.current, { display: 'none' });
        gsap.set(linesWrapperRef.current, { display: 'flex' });
        
        // Setup initial off-screen positions
        lineRefs.current.forEach((line, idx) => {
          if (!line) return;
          const direction = idx % 2 === 0 ? 1 : -1; // alternate slide directions
          gsap.set(line, { x: `${direction * 100}vw` });
        });
      });

      // ── PHASE 3: Slide-in Lines ──
      tl.to(lineRefs.current, {
        x: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.08
      });

      // ── PHASE 4: Reveal Texts ──
      tl.to(textRefs.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1
      }, '-=0.5');

      // ── PHASE 5: Hold and Slide-out Lines ──
      tl.add(() => {
        // Prepare opposite directions for slide out
        lineRefs.current.forEach((line, idx) => {
          if (!line) return;
        });
      }, '+=1.6');

      tl.to(lineRefs.current, {
        x: (idx) => {
          const direction = idx % 2 === 0 ? -1 : 1;
          return `${direction * 100}vw`;
        },
        duration: 0.9,
        ease: 'power3.in',
        stagger: 0.05
      });

      // ── PHASE 6: Curtain Split (Unfold Website) ──
      tl.add(() => {
        // Hide the lines wrapper immediately so no stray elements float in center
        gsap.set(linesWrapperRef.current, { display: 'none' });
        // Trigger the parent callback to start fading/scaling in the homepage
        if (onStartRevealRef.current) {
          onStartRevealRef.current();
        }
      });

      // Dissolve the central glow line
      tl.to(glowLineRef.current, {
        opacity: 0,
        scaleY: 0,
        duration: 0.5,
        ease: 'power3.in'
      }, '<');

      // Split the curtains left and right
      tl.to(curtainLeftRef.current, {
        xPercent: -100,
        duration: 1.2,
        ease: 'power3.inOut'
      }, '<')
      .to(curtainRightRef.current, {
        xPercent: 100,
        duration: 1.2,
        ease: 'power3.inOut',
        onComplete: () => {
          if (onCompleteRef.current) {
            onCompleteRef.current(); // Unmount the intro section completely
          }
        }
      }, '<');

    }, containerRef);

    return () => ctx.revert();
  }, []); // Run exactly once on mount!

  const commonLineClass = "flex gap-3 md:gap-5 shrink-0 items-center justify-center w-full";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen z-[99999] overflow-hidden"
      style={{ backgroundColor: '#121214' }}
    >
      {/* Left Curtain half */}
      <div
        ref={curtainLeftRef}
        className="absolute top-0 bottom-0 left-0 w-[50vw] luxury-grain border-r border-zinc-800/20 z-10"
        style={{ backgroundColor: '#121214' }}
      />

      {/* Right Curtain half */}
      <div
        ref={curtainRightRef}
        className="absolute top-0 bottom-0 right-0 w-[50vw] luxury-grain border-l border-zinc-800/20 z-10"
        style={{ backgroundColor: '#121214' }}
      />

      {/* Center split glow line */}
      <div
        ref={glowLineRef}
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-transparent via-[#ff6200] to-transparent z-20 shadow-[0_0_10px_rgba(255,98,0,0.6)]"
      />

      {/* Centered Content Wrapper */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">

        {/* ── CENTRAL INTRO LOGO ── */}
        <div
          ref={logoWrapperRef}
          className="flex flex-col items-center gap-4 text-center px-6 pointer-events-auto"
        >
          <img
            src="/logo.png.png"
            alt="NCS Logo"
            className="h-20 md:h-32 w-auto object-contain filter drop-shadow-[0_0_30px_rgba(255,98,0,0.15)]"
          />
          <div className="flex flex-col gap-1 items-center">
            <span className="font-display font-extrabold text-2xl md:text-4xl text-white tracking-widest uppercase">
              NOOR
            </span>
            <span className="font-mono text-[9px] md:text-[11px] text-[#ff6200] font-bold tracking-[0.4em] uppercase">
              Constructions
            </span>
          </div>
        </div>

        {/* ── CYLINDER SLIDING MATRIX ── */}
        <div
          ref={linesWrapperRef}
          className="w-full flex flex-col gap-3 md:gap-5 items-center justify-center hidden pointer-events-auto"
        >
          {/* Line 1: Orange/Grey Accents */}
          <div
            ref={el => { lineRefs.current[0] = el; }}
            className={commonLineClass}
          >
            <Circle bgColor="bg-[#ff6200]" />
            <Circle bgColor="bg-white" />
            <Cylinder bgColor="bg-zinc-800" width="w-24 md:w-44" />
            <Cylinder bgColor="bg-[#ff6200]" width="w-36 md:w-72" />
            <Cylinder bgColor="bg-zinc-800" width="w-24 md:w-44" />
          </div>

          {/* Line 2: Introducing Text */}
          <div
            ref={el => { lineRefs.current[1] = el; }}
            className={commonLineClass}
          >
            <Circle bgColor="bg-zinc-700" />
            <Cylinder
              text="Introducing"
              bgColor="bg-white"
              width="w-[180px] md:w-[460px]"
              textColor="text-zinc-950"
              textRef={el => { textRefs.current[0] = el; }}
            />
            <Circle bgColor="bg-[#ff6200]" />
            <Circle bgColor="bg-zinc-700" />
            <Cylinder bgColor="bg-[#ff6200]" width="w-24 md:w-52" />
          </div>

          {/* Line 3: Brand Logo + NCS Noor Constructions */}
          <div
            ref={el => { lineRefs.current[2] = el; }}
            className={commonLineClass}
          >
            <Cylinder bgColor="bg-zinc-800" width="w-24 md:w-44" />
            <Circle bgColor="bg-[#ff6200]" />
            <Circle bgColor="bg-white" />
            <Cylinder
              text="NCS Noor Constructions"
              logo="/logo.png.png"
              bgColor="bg-[#ff6200]"
              width="w-[280px] md:w-[780px]"
              textColor="text-white font-extrabold"
              textRef={el => { textRefs.current[1] = el; }}
            />
            <Circle bgColor="bg-[#ff6200]" />
            <Cylinder bgColor="bg-zinc-800" width="w-24 md:w-44" />
          </div>

          {/* Line 4: Premium Eco-Living Tagline */}
          <div
            ref={el => { lineRefs.current[3] = el; }}
            className={commonLineClass}
          >
            <Circle bgColor="bg-white" />
            <Cylinder
              text="Premium Sustainable Living"
              bgColor="bg-white"
              width="w-[280px] md:w-[780px]"
              textColor="text-zinc-950"
              textRef={el => { textRefs.current[2] = el; }}
            />
            <Circle bgColor="bg-[#ff6200]" />
          </div>

          {/* Line 5: Closing shapes */}
          <div
            ref={el => { lineRefs.current[4] = el; }}
            className={commonLineClass}
          >
            <Cylinder bgColor="bg-[#ff6200]" width="w-28 md:w-56" />
            <Cylinder bgColor="bg-zinc-800" width="w-40 md:w-[480px]" />
            <Circle bgColor="bg-white" />
            <Cylinder bgColor="bg-[#ff6200]" width="w-24 md:w-52" />
          </div>
        </div>

      </div>
    </div>
  );
}
