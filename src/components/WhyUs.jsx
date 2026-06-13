import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Clock, HardHat, FileText, HeartPulse, Cpu } from 'lucide-react';

const cards = [
  {
    id: 1,
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Quality Construction',
    desc: 'Grade-A cement, rust-resistant TMT steel, and double-tested aggregates — built to outlast generations.',
  },
  {
    id: 2,
    icon: <Clock className="w-6 h-6" />,
    title: 'On-Time Delivery',
    desc: 'Gantt-scheduled milestones with transparent weekly progress reports — every deadline respected.',
  },
  {
    id: 3,
    icon: <HardHat className="w-6 h-6" />,
    title: 'Expert Engineering',
    desc: 'Certified structural engineers and senior planners on every project, from blueprint to handover.',
  },
  {
    id: 4,
    icon: <FileText className="w-6 h-6" />,
    title: 'Transparent Process',
    desc: 'Itemized estimations before foundation — zero hidden fees, complete financial clarity.',
  },
  {
    id: 5,
    icon: <HeartPulse className="w-6 h-6" />,
    title: 'Safety Standards',
    desc: 'Strict occupational safety protocols, PPE enforcement, and weekly site drills.',
  },
  {
    id: 6,
    icon: <Cpu className="w-6 h-6" />,
    title: 'Modern Technology',
    desc: 'Building Information Modeling (BIM) lets clients visualize structures before a single beam is cast.',
  },
];

const getElementTranslationY = (el) => {
  if (!el) return 0;
  const style = window.getComputedStyle(el);
  const transform = style.transform || style.webkitTransform;
  if (!transform || transform === 'none') return 0;
  const matrix = transform.match(/^matrix\((.+)\)$/);
  if (matrix) {
    const values = matrix[1].split(/\s*,\s*/);
    return parseFloat(values[5]) || 0;
  }
  const matrix3d = transform.match(/^matrix3d\((.+)\)$/);
  if (matrix3d) {
    const values = matrix3d[1].split(/\s*,\s*/);
    return parseFloat(values[13]) || 0;
  }
  return 0;
};

export default function WhyUs() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const rafRef = useRef(null);

  const CARD_WIDTH = 320;
  const CARD_GAP = 20;
  const TOTAL_CARDS = cards.length;

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const viewH = window.innerHeight;
    const scrollRange = viewH * 0.8;
    const card = section.closest('.scroll-stack-card');
    let traveled = 0;
    if (card) {
      traveled = getElementTranslationY(card);
    } else {
      const rect = section.getBoundingClientRect();
      const headerEl = document.querySelector('header');
      const headerH = headerEl ? headerEl.offsetHeight : 0;
      traveled = Math.max(0, headerH - rect.top);
    }
    const rawProgress = traveled / scrollRange;
    const progress = Math.max(0, Math.min(1, rawProgress));
    setScrollProgress(progress);
    const idx = Math.floor(progress * TOTAL_CARDS);
    setActiveIndex(Math.min(idx, TOTAL_CARDS - 1));
  }, [TOTAL_CARDS]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(handleScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  const totalTrackWidth = TOTAL_CARDS * (CARD_WIDTH + CARD_GAP) - CARD_GAP;
  const viewportPadding = 48;
  const maxTranslate = Math.max(0, totalTrackWidth - (typeof window !== 'undefined' ? window.innerWidth : 1200) + viewportPadding + 80);
  const translateX = -scrollProgress * maxTranslate;

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative h-full flex flex-col justify-center overflow-hidden luxury-grain"
      style={{ background: '#18181b' }}
    >
      {/* Decorative oversized chapter number */}
      <div
        className="section-number absolute -left-4 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
        aria-hidden="true"
      >
        02
      </div>

      {/* Ambient orange glow */}
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255, 98, 0, 0.05) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="w-full relative z-10 flex flex-col justify-center h-full px-6">

        {/* ── HEADER ── */}
        <div className="max-w-7xl w-full mx-auto mb-8 lg:mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <div className="gold-tag mb-5">Why Choose Us</div>
              <h2
                className="font-display font-extrabold leading-[1.05] tracking-tight mb-2"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#ffffff' }}
              >
                Why Partner with{' '}
                <span className="font-serif italic font-normal text-gold-gradient">
                  Noor
                </span>
              </h2>
              <p className="font-sans text-[14px] max-w-lg leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Six pillars that define every project — from foundation to finish.
              </p>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {cards.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-500"
                  style={{
                    width: i === activeIndex ? 20 : 6,
                    height: 6,
                    background: i === activeIndex ? '#ff6200' : 'rgba(255,255,255,0.1)',
                  }}
                />
              ))}
              <span
                className="text-[10px] tracking-[0.2em] ml-2"
                style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'var(--font-mono)' }}
              >
                {String(activeIndex + 1).padStart(2, '0')} / {String(TOTAL_CARDS).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* ── CARD TRACK ── */}
        <div className="relative overflow-hidden w-screen -ml-6">
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-20 pointer-events-none transition-opacity duration-300"
            style={{
              background: 'linear-gradient(90deg, #18181b 0%, transparent 100%)',
              opacity: scrollProgress > 0.02 ? 1 : 0,
            }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-20 pointer-events-none transition-opacity duration-300"
            style={{
              background: 'linear-gradient(270deg, #18181b 0%, transparent 100%)',
              opacity: scrollProgress < 0.95 ? 1 : 0,
            }}
          />

          {/* Track */}
          <div
            ref={trackRef}
            className="flex gap-5 pl-6 pr-12 py-4"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
              willChange: 'transform',
            }}
          >
            {cards.map((card, i) => {
              const distance = Math.abs(i - scrollProgress * (TOTAL_CARDS - 1));
              const isNear = distance < 1.2;
              const cardOpacity = isNear ? 1 : 0.5;
              const cardScale = isNear ? 1 : 0.97;

              return (
                <div
                  key={card.id}
                  className="flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    width: `${CARD_WIDTH}px`,
                    opacity: cardOpacity,
                    transform: `scale(${cardScale})`,
                  }}
                >
                  <div
                    className="h-full relative overflow-hidden transition-all duration-500 hover:-translate-y-2"
                    style={{
                      background: isNear
                        ? '#27272a'
                        : '#1e1e20',
                      border: `1px solid ${isNear ? 'rgba(255, 98, 0, 0.25)' : 'rgba(255, 255, 255, 0.08)'}`,
                      boxShadow: isNear
                        ? '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 98, 0, 0.08)'
                        : '0 4px 20px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    {/* Orange top accent line */}
                    <div
                      className="h-[1px] w-full transition-all duration-500"
                      style={{
                        background: isNear
                          ? 'linear-gradient(90deg, transparent, #ff6200, transparent)'
                          : 'rgba(255, 255, 255, 0.05)',
                      }}
                    />

                    <div className="p-7">
                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded flex items-center justify-center mb-6 transition-all duration-300"
                        style={{
                          background: isNear ? 'rgba(255, 98, 0, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                          color: isNear ? '#ff6200' : 'rgba(255, 255, 255, 0.4)',
                          border: `1px solid ${isNear ? 'rgba(255, 98, 0, 0.2)' : 'rgba(255, 255, 255, 0.08)'}`,
                        }}
                      >
                        {card.icon}
                      </div>

                      {/* Title */}
                      <h3
                        className="font-display font-extrabold text-xl leading-tight mb-3 tracking-tight transition-colors duration-300"
                        style={{ color: isNear ? '#ffffff' : '#6b7280' }}
                      >
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="font-sans text-[13px] leading-[1.75] transition-colors duration-300"
                        style={{ color: isNear ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.4)' }}
                      >
                        {card.desc}
                      </p>

                      {/* Bottom orange hairline */}
                      <div
                        className="mt-8 h-[1px] transition-all duration-500"
                        style={{
                          background: isNear ? 'rgba(255, 98, 0, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
