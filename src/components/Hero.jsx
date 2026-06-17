import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import TypewriterText from './TypewriterText';
import Carousel from './Carousel';

const stats = [
  { value: '15+', label: 'Years of Excellence' },
  { value: '450K+', label: 'Sq Ft Delivered' },
  { value: '6+', label: 'Happy Clients' },
];

export default function Hero({ timeText, setAllocationModal }) {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-8 lg:pt-48 lg:pb-12 px-6 min-h-screen w-full z-10 overflow-hidden text-white luxury-grain"
      style={{ background: '#18181b' }}
    >
      {/* Real-time Construction Workers Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
        style={{
          backgroundImage: "url('/hero_bg_local_construction.png')",
          filter: 'brightness(0.4) contrast(1.1) grayscale(15%)'
        }}
      />

      {/* Dark gradient overlay to ensure text contrast and seamless footer/section transition */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(24, 24, 27, 0.3) 0%, rgba(24, 24, 27, 0.6) 60%, #18181b 100%)'
        }}
      />

      {/* Blind shadow overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          background: 'repeating-linear-gradient(130deg, transparent, transparent 140px, rgba(255, 255, 255, 0.015) 140px, rgba(255, 255, 255, 0.015) 280px)',
          mixBlendMode: 'overlay',
          opacity: 0.8,
        }}
      />

      {/* Background Watermark — brand identity */}
      <div
        className="absolute right-6 md:right-12 bottom-6 md:bottom-10 font-display font-black text-[10vw] leading-none pointer-events-none select-none z-0 text-white/[0.03] uppercase tracking-tighter"
        aria-hidden="true"
      >
        NCS
      </div>

      {/* Floating brand badge */}
      <div
        className="absolute top-28 md:top-36 right-6 md:right-12 flex items-center gap-2 z-20 pointer-events-none"
        aria-hidden="true"
      >
        <img
          src="/logo.png"
          alt=""
          className="h-6 md:h-8 w-auto object-contain opacity-25"
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full max-w-7xl mx-auto relative z-10 mt-12 lg:mt-24">

        {/* ── LEFT: Text ── */}
        <div className="lg:col-span-6 flex flex-col justify-center reveal-on-scroll relative z-10">

          {/* Headline */}
          <h1
            className="font-display font-extrabold leading-[1.0] tracking-tight mb-5 text-white"
            style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
          >
            BUILDING
            <br />
            <span className="font-serif italic font-normal text-[#ff6200]">
              <TypewriterText
                words={['Excellence.', 'Your Future.', 'Dreams.', 'Legacies.']}
                speed={95}
                delay={2000}
                eraseSpeed={55}
                loop={true}
              />
            </span>
          </h1>

          <p
            className="font-sans text-base md:text-lg mb-8 leading-relaxed max-w-md text-neutral-400"
          >
            Precision-engineered luxury properties on the East Coast Road — where architecture meets artistry.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 items-center mb-10">
            <button
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="glow-btn btn-gold px-7 py-3.5 text-[12px] font-bold tracking-[0.12em] uppercase flex items-center gap-2.5 rounded-sm cursor-pointer"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#estimator"
              className="btn-ghost px-7 py-3.5 text-[12px] font-bold tracking-[0.12em] uppercase flex items-center gap-2 rounded-sm cursor-pointer"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Cost Estimator
            </a>
          </div>

          {/* Stat Strip */}
          <div
            className="flex items-center gap-0 pt-8"
            style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            {stats.map((stat, i) => (
              <React.Fragment key={i}>
                <div className="flex-1 pr-6">
                  <div
                    className="font-display font-extrabold mb-0.5"
                    style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#ff6200', lineHeight: 1 }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'var(--font-mono)' }}
                  >
                    {stat.label}
                  </div>
                </div>
                {i < stats.length - 1 && (
                  <div
                    className="w-px self-stretch mx-2 shrink-0"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Visual Panel ── */}
        <div className="lg:col-span-6 relative flex items-center justify-center reveal-on-scroll z-10">

          {/* Ambient gold glow behind panel */}
          <div
            className="absolute w-72 h-72 rounded-full blur-[100px] pointer-events-none z-0"
            style={{ background: 'rgba(255, 98, 0, 0.05)' }}
          />

          {/* Elegant thin-bordered panel */}
          <div
            className="relative w-full max-w-[440px] aspect-[4/5] overflow-hidden flex flex-col justify-center z-10 lg:-translate-y-10"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(24, 24, 27, 0.75)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 40px 100px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Corner tick marks — gold */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l" style={{ borderColor: 'rgba(255, 98, 0, 0.4)' }} />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r" style={{ borderColor: 'rgba(255, 98, 0, 0.4)' }} />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l" style={{ borderColor: 'rgba(255, 98, 0, 0.4)' }} />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r" style={{ borderColor: 'rgba(255, 98, 0, 0.4)' }} />

            {/* Carousel */}
            <div className="relative flex-1 overflow-hidden m-4 rounded-sm" style={{ background: '#18181b' }}>
              <Carousel baseWidth={400} autoplay={true} loop={true} autoplayDelay={3800} />

              {/* Subtle annotation overlays */}
              <div
                className="absolute top-5 left-5 font-serif italic text-[9px] -rotate-6 pointer-events-none"
                style={{ color: 'rgba(255, 98, 0, 0.7)' }}
              >
                ↖ LOAD BEARING WALL
              </div>
              <div
                className="absolute bottom-7 right-5 font-serif italic text-[9px] rotate-3 pointer-events-none"
                style={{ color: 'rgba(255, 98, 0, 0.7)' }}
              >
                FOUNDATION: 12.4m →
              </div>
            </div>

            {/* Bottom info strip */}
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}
            >
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="NCS" className="h-4 w-auto object-contain opacity-60" />
                <div>
                  <span
                    className="text-[9px] tracking-[0.25em] uppercase block mb-0.5"
                    style={{ color: '#ff6200', fontFamily: 'var(--font-mono)' }}
                  >
                    Live Preview
                  </span>
                  <span className="text-[11px] font-medium" style={{ color: '#ffffff' }}>
                    Current Portfolio
                  </span>
                </div>
              </div>
              <div
                className="text-[10px] font-mono"
                style={{ color: '#ff6200' }}
              >
                {timeText} IST
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #18181b, transparent)' }}
      />
    </section>
  );
}
