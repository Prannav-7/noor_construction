import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function IntroSection({ onStartReveal, onComplete }) {
  const containerRef = useRef(null);
  const topHalfRef = useRef(null);
  const bottomHalfRef = useRef(null);
  const strikeLineRef = useRef(null);
  
  // Animation elements
  const word1Ref = useRef(null);
  const word2Ref = useRef(null);
  const word3Ref = useRef(null);
  const logoGroupRef = useRef(null);

  const onStartRevealRef = useRef(onStartReveal);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onStartRevealRef.current = onStartReveal;
    onCompleteRef.current = onComplete;
  }, [onStartReveal, onComplete]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial setup
      gsap.set([word1Ref.current, word2Ref.current, word3Ref.current], { opacity: 0, scale: 0.9 });
      gsap.set(logoGroupRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(strikeLineRef.current, { scaleX: 0 });

      // ── PHASE 1: Punchy Flash Words ──
      const flashDuration = 0.15;
      const holdDuration = 0.25;

      tl.to(word1Ref.current, { opacity: 1, scale: 1, duration: flashDuration, ease: 'power2.out' })
        .to(word1Ref.current, { opacity: 0, scale: 1.1, duration: flashDuration, ease: 'power2.in' }, `+=${holdDuration}`)
        
        .to(word2Ref.current, { opacity: 1, scale: 1, duration: flashDuration, ease: 'power2.out' })
        .to(word2Ref.current, { opacity: 0, scale: 1.1, duration: flashDuration, ease: 'power2.in' }, `+=${holdDuration}`)
        
        .to(word3Ref.current, { opacity: 1, scale: 1, duration: flashDuration, ease: 'power2.out' })
        .to(word3Ref.current, { opacity: 0, scale: 1.1, duration: flashDuration, ease: 'power2.in' }, `+=${holdDuration}`);

      // ── PHASE 2: Logo Slam ──
      tl.to(logoGroupRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.5)'
      });

      // ── PHASE 3: Hold ──
      tl.to({}, { duration: 1.2 });

      // ── PHASE 4: Strike Cut & Exit ──
      tl.to(strikeLineRef.current, {
        scaleX: 1,
        duration: 0.4,
        ease: 'power4.inOut'
      });

      tl.to(logoGroupRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.inOut'
      }, '-=0.2');

      // ── PHASE 5: Dramatic Vertical Split Reveal ──
      tl.add(() => {
        if (onStartRevealRef.current) onStartRevealRef.current();
      });

      tl.to(topHalfRef.current, {
        yPercent: -100,
        duration: 1.0,
        ease: 'power4.inOut'
      }, 'split')
      .to(bottomHalfRef.current, {
        yPercent: 100,
        duration: 1.0,
        ease: 'power4.inOut',
        onComplete: () => {
          if (onCompleteRef.current) onCompleteRef.current();
        }
      }, 'split')
      .to(strikeLineRef.current, {
        opacity: 0,
        duration: 0.2
      }, 'split+=0.1');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Shared font styling for the flashing words
  const flashWordClass = "absolute inset-0 flex items-center justify-center font-display font-black text-4xl md:text-7xl lg:text-8xl text-white tracking-[0.2em] uppercase";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen z-[99999] overflow-hidden bg-transparent"
    >
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

      {/* ── ANIMATION CONTENT WRAPPER ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        
        {/* Flashing Words Container */}
        <div className="relative w-full h-32 flex items-center justify-center">
          <div ref={word1Ref} className={flashWordClass}>
            VISION<span className="text-[#ff6200]">.</span>
          </div>
          <div ref={word2Ref} className={flashWordClass}>
            PRECISION<span className="text-[#ff6200]">.</span>
          </div>
          <div ref={word3Ref} className={flashWordClass}>
            EXCELLENCE<span className="text-[#ff6200]">.</span>
          </div>

          {/* Main Logo Container */}
          <div ref={logoGroupRef} className="absolute inset-0 flex flex-col items-center justify-center">
            <img 
              src="/ncs-logo.png" 
              alt="NCS Logo" 
              className="h-16 md:h-24 w-auto object-contain mb-4 filter drop-shadow-[0_0_20px_rgba(255,98,0,0.3)]" 
            />
            <div className="flex flex-col items-center">
              <span className="font-display font-extrabold text-3xl md:text-5xl text-white tracking-[0.1em] uppercase">
                NOOR <span className="text-[#ff6200]">Constructions</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
