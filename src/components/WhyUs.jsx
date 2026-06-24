import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Clock, HardHat, FileText, HeartPulse, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';

const cards = [
  {
    id: 1,
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Strong Steel & Cement',
    tag: 'QUALITY',
    desc: 'We use DMD Fe-550 TMT steel bars — the strongest available — and Ultratech OPC 53 cement. Your walls and pillars will be rock solid and last for generations.',
    brands: ['DMD Fe-550 Steel', 'Ultratech OPC 53', 'ACC Cement'],
  },
  {
    id: 2,
    icon: <HardHat className="w-6 h-6" />,
    title: 'Pure, Verified M-Sand',
    tag: 'MATERIALS',
    desc: 'We use only clean, government-approved M-Sand (manufactured sand) — no dirt, no salt, no sea sand. Combined with tested 20mm blue metal stone for extra strength.',
    brands: ['Pure Verified M-Sand', '20mm Blue Metal', 'Clean River Sand'],
  },
  {
    id: 3,
    icon: <Cpu className="w-6 h-6" />,
    title: 'Skilled Site Engineers',
    tag: 'ENGINEERING',
    desc: 'Our structural engineers check every column, beam and slab on-site. Before building starts, we show you a 3D model of your home so you know exactly what you are getting.',
    brands: ['Certified Engineers', '3D Home Preview', 'AutoCAD Plans'],
  },
  {
    id: 4,
    icon: <FileText className="w-6 h-6" />,
    title: 'Clear, Fixed Pricing',
    tag: 'PROCESS',
    desc: 'Before we start, you get a full written list of every material and its cost. No surprise bills later. What we quote is what you pay — nothing more.',
    brands: ['Written Cost Sheet', 'Fixed Rates', 'Zero Extra Charges'],
  },
  {
    id: 5,
    icon: <Clock className="w-6 h-6" />,
    title: 'Work Done On Time',
    tag: 'TIMELINE',
    desc: 'We give you a date and we stick to it. You will get weekly photos of your construction progress on WhatsApp so you always know what is happening on your site.',
    brands: ['Weekly Photo Updates', 'Fixed Handover Date', 'Written Agreement'],
  },
  {
    id: 6,
    icon: <HeartPulse className="w-6 h-6" />,
    title: 'Safe & Government Approved',
    tag: 'SAFETY',
    desc: 'All our projects are registered with RERA (Government of Tamil Nadu). Workers wear safety gear, and every site is insured. You are always protected.',
    brands: ['RERA Registered', 'Worker Safety Gear', 'Site Insurance'],
  },
];

export default function WhyUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const touchStartX = useRef(null);
  const TOTAL_CARDS = cards.length;

  useEffect(() => {
    setIsVisible(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Auto-advance every 4 s (loops back to card 0 from last) ──
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex(i => (i + 1) % TOTAL_CARDS);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, TOTAL_CARDS]);

  // ── Responsive card width ──────────────────────────────────
  // mobile (<640)  → fill viewport with small side peek
  // tablet (640-1023) → 380px
  // laptop (1024-1279) → 400px
  // desktop (≥1280) → 440px
  const isMobile = windowWidth < 640;
  const CARD_GAP = 20;
  let CARD_WIDTH;
  if (windowWidth < 640) {
    CARD_WIDTH = Math.min(windowWidth - 64, 340);
  } else if (windowWidth < 1024) {
    CARD_WIDTH = 380;
  } else if (windowWidth < 1280) {
    CARD_WIDTH = 400;
  } else {
    CARD_WIDTH = 440;
  }

  // ── Alignment logic ────────────────────────
  const getTranslateX = (index) => {
    if (isMobile) {
      // Center active card on mobile
      const viewportCenter = windowWidth / 2;
      const cardCenter = index * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2;
      return viewportCenter - cardCenter;
    } else {
      // Align active card with the left edge of the max-w-7xl container on desktop
      const containerLeft = Math.max(24, (windowWidth - 1280) / 2 + 24);
      return containerLeft - (index * (CARD_WIDTH + CARD_GAP));
    }
  };
  const translateX = getTranslateX(activeIndex);

  const handlePrev = () => {
    setActiveIndex(i => (i - 1 + TOTAL_CARDS) % TOTAL_CARDS);
  };
  const handleNext = () => {
    setActiveIndex(i => (i + 1) % TOTAL_CARDS);
  };

  // Touch swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="why-us"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden luxury-grain py-16 lg:py-24"
      style={{ background: '#18181b' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative chapter number */}
      <div
        className="section-number absolute -left-4 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
        aria-hidden="true"
      >
        02
      </div>

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 98, 0, 0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="w-full relative z-10 flex flex-col h-full">

        {/* ── HEADER ── */}
        <div 
          className="max-w-7xl w-full mx-auto px-6 mb-8 lg:mb-10 transition-all duration-1000 ease-out"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(40px)' }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <div className="gold-tag mb-4">Why Choose Us</div>
              <h2
                className="font-display font-extrabold leading-[1.05] tracking-tight mb-2"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#ffffff' }}
              >
                Why Partner with{' '}
                <span className="font-serif italic font-normal text-gold-gradient">
                  Noor
                </span>
              </h2>
              <p
                className="font-sans text-[13px] max-w-lg leading-relaxed"
                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              >
                Local brands, proven materials, six pillars — ECR built to outlast generations.
              </p>
            </div>

            {/* Navigation control */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm self-start lg:self-auto">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="p-1 hover:bg-white/10 rounded-md transition-colors disabled:opacity-30 disabled:pointer-events-none text-white cursor-pointer border-0 bg-transparent"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 px-1">
                {cards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className="h-1.5 rounded-full transition-all duration-500 cursor-pointer border-0 p-0"
                    style={{
                      width: i === activeIndex ? 16 : 6,
                      background: i === activeIndex ? '#ff6200' : 'rgba(255,255,255,0.25)',
                    }}
                    aria-label={`Card ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={activeIndex === TOTAL_CARDS - 1}
                className="p-1 hover:bg-white/10 rounded-md transition-colors disabled:opacity-30 disabled:pointer-events-none text-white cursor-pointer border-0 bg-transparent"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <span className="text-[10px] tracking-[0.15em] ml-1 font-mono text-white/60 select-none border-l border-white/10 pl-3">
                {String(activeIndex + 1).padStart(2, '0')} / {String(TOTAL_CARDS).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* ── CARD TRACK ── */}
        <div
          className="relative w-full overflow-hidden transition-all duration-1000 ease-out"
          style={{ 
            opacity: isVisible ? 1 : 0, 
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '200ms'
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Track */}
          <div
            className="flex py-4"
            style={{
              gap: `${CARD_GAP}px`,
              transform: `translate3d(${translateX}px, 0, 0)`,
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform',
            }}
          >
            {cards.map((card, i) => {
              const isActive = i === activeIndex;

              return (
                <div
                  key={card.id}
                  className="flex-shrink-0 transition-all duration-500 cursor-pointer"
                  style={{
                    width: `${CARD_WIDTH}px`,
                    opacity: isActive ? 1 : 0.45,
                    transform: `scale(${isActive ? 1 : 0.95})`,
                  }}
                  onClick={() => {
                    if (!isActive) setActiveIndex(i);
                  }}
                >
                  <div
                    className="h-full relative overflow-hidden transition-all duration-500"
                    style={{
                      background: isActive ? '#27272a' : '#1c1c1e',
                      border: `1px solid ${isActive ? 'rgba(255, 98, 0, 0.3)' : 'rgba(255, 255, 255, 0.06)'}`,
                      boxShadow: isActive
                        ? '0 24px 64px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 98, 0, 0.1)'
                        : 'none',
                    }}
                  >
                    {/* Top accent */}
                    <div
                      className="h-[2px] w-full transition-all duration-500"
                      style={{
                        background: isActive
                          ? 'linear-gradient(90deg, transparent, #ff6200 50%, transparent)'
                          : 'transparent',
                      }}
                    />

                    <div className="p-5 lg:p-6">
                      {/* Tag + Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="text-[8px] tracking-[0.25em] font-bold uppercase px-2 py-1"
                          style={{
                            color: isActive ? '#ff6200' : 'rgba(255,255,255,0.25)',
                            fontFamily: 'var(--font-mono)',
                            border: `1px solid ${isActive ? 'rgba(255,98,0,0.2)' : 'rgba(255,255,255,0.06)'}`,
                          }}
                        >
                          {card.tag}
                        </span>
                        <div
                          className="w-9 h-9 flex items-center justify-center"
                          style={{
                            background: isActive ? 'rgba(255,98,0,0.12)' : 'rgba(255,255,255,0.04)',
                            color: isActive ? '#ff6200' : 'rgba(255,255,255,0.25)',
                            border: `1px solid ${isActive ? 'rgba(255,98,0,0.2)' : 'rgba(255,255,255,0.06)'}`,
                          }}
                        >
                          {card.icon}
                        </div>
                      </div>

                      {/* Title */}
                      <h3
                        className="font-display font-extrabold leading-tight mb-3 tracking-tight"
                        style={{
                          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                          color: isActive ? '#ffffff' : 'rgba(255,255,255,0.35)',
                        }}
                      >
                        {card.title}
                      </h3>

                      {/* Desc */}
                      <p
                        className="font-sans text-[12.5px] leading-[1.7] mb-4"
                        style={{ color: isActive ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.25)' }}
                      >
                        {card.desc}
                      </p>

                      {/* Brand pills */}
                      <div
                        className="pt-3 flex flex-wrap gap-1.5"
                        style={{ borderTop: `1px solid ${isActive ? 'rgba(255,98,0,0.12)' : 'rgba(255,255,255,0.04)'}` }}
                      >
                        {card.brands.map((brand, j) => (
                          <span
                            key={j}
                            className="text-[8.5px] font-bold tracking-[0.12em] uppercase px-2 py-[3px]"
                            style={{
                              fontFamily: 'var(--font-mono)',
                              color: isActive ? '#ff8c39' : 'rgba(255,255,255,0.2)',
                              border: `1px solid ${isActive ? 'rgba(255,98,0,0.18)' : 'rgba(255,255,255,0.05)'}`,
                              background: isActive ? 'rgba(255,98,0,0.06)' : 'transparent',
                            }}
                          >
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile swipe hint */}
        {isMobile && (
          <p className="text-center text-[10px] tracking-[0.2em] uppercase mt-3 font-mono"
            style={{ color: 'rgba(255,255,255,0.25)' }}>
            ← Swipe or tap to explore →
          </p>
        )}

      </div>
    </section>
  );
}
