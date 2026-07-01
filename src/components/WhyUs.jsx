import React, { useRef, useState, useEffect } from 'react';
import { ShieldCheck, Clock, HardHat, FileText, HeartPulse, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const directionRef = useRef(1); // 1 = forward, -1 = backward
  const TOTAL_CARDS = cards.length;

  useEffect(() => {
    setIsVisible(true);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Auto-advance with ping-pong direction (slow gliding back and forth) ──
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex(current => {
        if (current >= TOTAL_CARDS - 1) {
          directionRef.current = -1;
          return Math.max(0, current - 1);
        }
        if (current <= 0) {
          directionRef.current = 1;
          return Math.min(TOTAL_CARDS - 1, current + 1);
        }
        const next = current + directionRef.current;
        if (next >= TOTAL_CARDS) {
          directionRef.current = -1;
          return current - 1;
        }
        if (next < 0) {
          directionRef.current = 1;
          return current + 1;
        }
        return next;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, TOTAL_CARDS]);

  // ── Responsive card width ──────────────────────────────────
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

  const TOTAL_WIDTH = TOTAL_CARDS * CARD_WIDTH + (TOTAL_CARDS - 1) * CARD_GAP;

  const getTranslateBounds = () => {
    if (isMobile) {
      const mobileStart = (windowWidth - CARD_WIDTH) / 2;
      const max = mobileStart;
      const min = Math.min(mobileStart, (windowWidth - mobileStart) - TOTAL_WIDTH);
      return { min, max };
    } else {
      const containerLeft = Math.max(24, (windowWidth - 1280) / 2 + 24);
      const max = containerLeft;
      const min = Math.min(containerLeft, (windowWidth - containerLeft) - TOTAL_WIDTH);
      return { min, max };
    }
  };

  const { min: minTranslateX, max: maxTranslateX } = getTranslateBounds();

  const getTranslateX = (index) => {
    if (isMobile) {
      const viewportCenter = windowWidth / 2;
      const cardCenter = index * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2;
      const rawX = viewportCenter - cardCenter;
      return Math.max(minTranslateX, Math.min(maxTranslateX, rawX));
    } else {
      const containerLeft = Math.max(24, (windowWidth - 1280) / 2 + 24);
      const rawX = containerLeft - (index * (CARD_WIDTH + CARD_GAP));
      return Math.max(minTranslateX, Math.min(maxTranslateX, rawX));
    }
  };

  const translateX = getTranslateX(activeIndex);

  const handlePrev = () => {
    setActiveIndex(i => (i - 1 + TOTAL_CARDS) % TOTAL_CARDS);
  };
  const handleNext = () => {
    setActiveIndex(i => (i + 1) % TOTAL_CARDS);
  };

  const handleDragEnd = (event, info) => {
    const { offset, velocity } = info;
    const swipeThreshold = 50;
    const velocityThreshold = 500;

    if (offset.x < -swipeThreshold || velocity.x < -velocityThreshold) {
      if (activeIndex < TOTAL_CARDS - 1) {
        setActiveIndex(prev => prev + 1);
      }
    } else if (offset.x > swipeThreshold || velocity.x > velocityThreshold) {
      if (activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
      }
    }
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
          className="max-w-7xl w-full mx-auto px-6 mb-8 lg:mb-12 transition-all duration-1000 ease-out"
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
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: minTranslateX, right: maxTranslateX }}
            dragElastic={0.1}
            animate={{ x: translateX }}
            transition={{ type: 'spring', stiffness: 35, damping: 18 }}
            onDragEnd={handleDragEnd}
            className="flex py-4 cursor-grab active:cursor-grabbing"
            style={{
              gap: `${CARD_GAP}px`,
              willChange: 'transform',
            }}
          >
            {cards.map((card, i) => {
              const isActive = i === activeIndex;

              return (
                <div
                  key={card.id}
                  className="flex-shrink-0 why-us-card relative overflow-hidden cursor-pointer"
                  style={{
                    width: `${CARD_WIDTH}px`,
                    opacity: isActive ? 1 : 0.65,
                    transform: `scale(${isActive ? 1 : 0.97})`,
                  }}
                  onClick={() => setActiveIndex(i)}
                >
                  {/* Top accent line */}
                  <div className="card-top-accent" />

                  <div className="p-5 lg:p-6">
                    {/* Tag + Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[8px] tracking-[0.25em] font-bold uppercase px-2 py-1 card-tag font-mono">
                        {card.tag}
                      </span>
                      <div className="w-9 h-9 flex items-center justify-center card-icon-container">
                        {card.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-extrabold leading-tight mb-3 tracking-tight card-title" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>
                      {card.title}
                    </h3>

                    {/* Desc */}
                    <p className="font-sans text-[12.5px] leading-[1.7] mb-4 card-desc">
                      {card.desc}
                    </p>

                    {/* Brand pills */}
                    <div className="pt-3 flex flex-wrap gap-1.5 card-divider">
                      {card.brands.map((brand, j) => (
                        <span
                          key={j}
                          className="text-[8.5px] font-bold tracking-[0.12em] uppercase px-2 py-[3px] card-brand-pill font-mono"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile swipe hint */}
        {isMobile && (
          <p className="text-center text-[10px] tracking-[0.2em] uppercase mt-4 font-mono"
            style={{ color: 'rgba(255,255,255,0.25)' }}>
            ← Swipe or drag to explore →
          </p>
        )}

      </div>
    </section>
  );
}
