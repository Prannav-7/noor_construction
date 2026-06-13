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
      className="relative py-8 lg:py-12 px-6 min-h-screen flex items-center justify-center w-full z-10 overflow-hidden luxury-grain"
      style={{ background: 'linear-gradient(160deg, #18181b 0%, #0c0c0e 100%)' }}
    >
      {/* Background Image — cinematic overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: "url('/hero_bg_local_construction.png')",
          opacity: 0.35,
          filter: 'grayscale(80%) brightness(0.65) contrast(1.15)',
        }}
      />

      {/* Radial orange vignette from top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255, 98, 0, 0.05) 0%, transparent 65%)',
        }}
      />

      {/* Blind shadow overlay */}
      <div className="window-shadow-overlay absolute inset-0 pointer-events-none" />

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full w-full max-w-7xl mx-auto relative z-10">

        {/* ── LEFT: Text ── */}
        <div className="lg:col-span-6 flex flex-col justify-center reveal-on-scroll relative z-10">

          {/* Gold section tag */}
          <div className="gold-tag mb-6">
            Premium Construction
          </div>

          {/* Headline */}
          <h1
            className="font-display font-extrabold leading-[1.0] tracking-tight mb-5 text-white"
            style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
          >
            BUILDING
            <br />
            <span className="font-serif italic font-normal" style={{ color: '#ff6200' }}>
              <TypewriterText
                words={['Excellence.', 'Your Future.', 'Dreams.', 'Legacies.']}
                speed={95}
                delay={2000}
                eraseSpeed={55}
                loop={true}
              />
            </span>
            <br />
            <span style={{ color: 'rgba(255, 255, 255, 0.08)' }}>TRUST.</span>
          </h1>

          <p
            className="font-sans text-base md:text-lg mb-8 leading-relaxed max-w-md"
            style={{ color: '#d1d5db' }}
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
              className="btn-gold glow-btn px-7 py-3.5 text-[12px] font-bold tracking-[0.12em] uppercase flex items-center gap-2.5"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              View Projects
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#estimator"
              className="btn-ghost px-7 py-3.5 text-[12px] tracking-[0.12em] uppercase flex items-center gap-2"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Cost Estimator
            </a>
          </div>

          {/* Stat Strip */}
          <div
            className="flex items-center gap-0 pt-8"
            style={{ borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}
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
                    style={{ color: '#9ca3af', fontFamily: 'var(--font-mono)' }}
                  >
                    {stat.label}
                  </div>
                </div>
                {i < stats.length - 1 && (
                  <div
                    className="w-px self-stretch mx-2 shrink-0"
                    style={{ background: 'rgba(255, 255, 255, 0.15)' }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Visual Panel ── */}
        <div className="lg:col-span-6 relative flex items-center justify-center reveal-on-scroll z-10">

          {/* Ambient orange glow behind panel */}
          <div
            className="absolute w-72 h-72 rounded-full blur-[100px] pointer-events-none z-0"
            style={{ background: 'rgba(255, 98, 0, 0.06)' }}
          />

          {/* Elegant thin-bordered panel */}
          <div
            className="relative w-full max-w-[440px] aspect-[4/5] overflow-hidden flex flex-col justify-center z-10 lg:-translate-y-10"
            style={{
              border: '1px solid rgba(255, 98, 0, 0.25)',
              background: 'rgba(39, 39, 42, 0.65)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 40px 100px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 98, 0, 0.1)',
            }}
          >
            {/* Corner tick marks — gold */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l" style={{ borderColor: 'rgba(255, 98, 0, 0.4)' }} />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r" style={{ borderColor: 'rgba(255, 98, 0, 0.4)' }} />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l" style={{ borderColor: 'rgba(255, 98, 0, 0.4)' }} />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r" style={{ borderColor: 'rgba(255, 98, 0, 0.4)' }} />

            {/* Carousel */}
            <div className="relative flex-1 overflow-hidden m-4 rounded-sm" style={{ background: '#ffffff' }}>
              <Carousel baseWidth={400} autoplay={true} loop={true} autoplayDelay={3800} />

              {/* Subtle annotation overlays */}
              <div
                className="absolute top-5 left-5 font-serif italic text-[9px] -rotate-6 pointer-events-none"
                style={{ color: 'rgba(255, 98, 0, 0.8)' }}
              >
                ↖ LOAD BEARING WALL
              </div>
              <div
                className="absolute bottom-7 right-5 font-serif italic text-[9px] rotate-3 pointer-events-none"
                style={{ color: 'rgba(255, 98, 0, 0.8)' }}
              >
                FOUNDATION: 12.4m →
              </div>
            </div>

            {/* Bottom info strip */}
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{ borderTop: '1px solid rgba(255, 98, 0, 0.15)' }}
            >
              <div>
                <span
                  className="text-[9px] tracking-[0.25em] uppercase block mb-0.5"
                  style={{ color: '#ff6200', fontFamily: 'var(--font-mono)' }}
                >
                  Live Preview
                </span>
                <span className="text-[11px] font-medium" style={{ color: '#e5e7eb' }}>
                  Current Portfolio
                </span>
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
