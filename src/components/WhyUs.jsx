import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Clock, HardHat, FileText, HeartPulse, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';

const cards = [
  {
    id: 1,
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Grade-A Materials',
    tag: 'QUALITY',
    desc: 'Fe-550 TMT bars, ACC OPC 53 cement, and Fosroc waterproofing — same spec as IGCAR projects on ECR.',
    brands: ['Fe-550 TMT', 'ACC OPC 53', 'Fosroc WP'],
  },
  {
    id: 2,
    icon: <HardHat className="w-6 h-6" />,
    title: 'Clear M-Sand & Aggregates',
    tag: 'MATERIALS',
    desc: 'TAMIN-approved Zone-II M-Sand and 20mm blue metal — zero sea-salt contamination for lasting coastal strength.',
    brands: ['TAMIN M-Sand', '20mm Blue Metal', 'River Sand'],
  },
  {
    id: 3,
    icon: <Cpu className="w-6 h-6" />,
    title: 'Expert Engineering',
    tag: 'ENGINEERING',
    desc: 'IIT-Madras certified engineers with BIM digital twins — walk through your home before a single beam is cast.',
    brands: ['IIT-M Certified', 'BIM Twin', 'AutoCAD'],
  },
  {
    id: 4,
    icon: <FileText className="w-6 h-6" />,
    title: 'Transparent Costing',
    tag: 'PROCESS',
    desc: 'Itemized BOQ before work begins — every rod and bag of cement accounted for. Zero hidden charges.',
    brands: ['Itemized BOQ', 'Fixed Rates', 'No Hidden Fees'],
  },
  {
    id: 5,
    icon: <Clock className="w-6 h-6" />,
    title: 'On-Time Delivery',
    tag: 'TIMELINE',
    desc: 'Gantt-scheduled milestones, weekly WhatsApp updates, and contractual SLAs — your handover date is a guarantee.',
    brands: ['Gantt Schedule', 'Weekly Updates', 'SLA Contract'],
  },
  {
    id: 6,
    icon: <HeartPulse className="w-6 h-6" />,
    title: 'Safety & Compliance',
    tag: 'SAFETY',
    desc: 'RERA-registered, OSHA-aligned protocols, and mandatory site insurance on every ECR project.',
    brands: ['RERA Registered', 'OSHA Safety', 'Site Insurance'],
  },
];

export default function WhyUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const touchStartX = useRef(null);
  const TOTAL_CARDS = cards.length;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Card width: on mobile fill most of screen, desktop fixed
  const isMobile = windowWidth < 640;
  const CARD_GAP = 16;
  const SIDE_PEEK = isMobile ? 24 : 40; // peek of next card on edge
  const CARD_WIDTH = Math.min(
    isMobile ? windowWidth - SIDE_PEEK * 2 - 32 : 320,
    isMobile ? 360 : 340
  );

  // translateX: center active card in viewport
  const getTranslateX = (index) => {
    const viewportCenter = windowWidth / 2;
    const cardCenter = index * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2;
    return viewportCenter - cardCenter;
  };

  const translateX = getTranslateX(activeIndex);

  const handlePrev = () => {
    if (activeIndex > 0) setActiveIndex(i => i - 1);
  };
  const handleNext = () => {
    if (activeIndex < TOTAL_CARDS - 1) setActiveIndex(i => i + 1);
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
        <div className="max-w-7xl w-full mx-auto px-6 mb-8 lg:mb-10">
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
          className="relative w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Track — centered on active card */}
          <div
            className="flex py-4"
            style={{
              gap: `${CARD_GAP}px`,
              paddingLeft: `${SIDE_PEEK}px`,
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
