import React from 'react';
import { ArrowRight } from 'lucide-react';
import TypewriterText from './TypewriterText';
import HeroCarousel from './HeroCarousel';

const stats = [
  { value: '15+', label: 'Years of Craft' },
  { value: '72+', label: 'Projects Delivered' },
  { value: '150+', label: 'Client Partnerships' },
];


export default function Hero({ timeText, setAllocationModal, combined = false }) {
  return (
    <section
      id="hero"
      className={`relative pt-20 sm:pt-24 md:pt-24 lg:pt-24 pb-6 lg:pb-8 px-4 sm:px-6 md:px-8 lg:px-12 min-h-screen w-full z-10 text-white ${!combined ? 'luxury-grain overflow-hidden' : 'overflow-visible'}`}
      style={{ background: combined ? 'transparent' : '#0b1115' }}
    >
      {!combined && (
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
          style={{
            backgroundImage: "url('/hero_bg_local_construction.png')",
            filter: 'brightness(0.35) contrast(1.18) grayscale(18%)'
          }}
        />
      )}

      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(90deg, rgba(11, 17, 21, 0.92) 0%, rgba(11, 17, 21, 0.7) 35%, rgba(11, 17, 21, 0.82) 100%)'
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          background: 'repeating-linear-gradient(130deg, transparent, transparent 140px, rgba(255, 255, 255, 0.02) 140px, rgba(255, 255, 255, 0.02) 280px)',
          mixBlendMode: 'overlay',
          opacity: 0.8,
        }}
      />

      <div
        className="absolute right-6 md:right-12 bottom-6 md:bottom-10 font-display font-black text-[10vw] leading-none pointer-events-none select-none z-0 text-white/[0.03] uppercase tracking-tighter"
        aria-hidden="true"
      >
        NCS
      </div>

      <div className="relative z-10 mx-auto mt-2 md:mt-4 lg:mt-6 grid w-full max-w-7xl gap-6 md:gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
        <div className="flex flex-col justify-center reveal-on-scroll">
          <div
            className="mb-3 sm:mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-200 backdrop-blur-sm"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Design • Build • Deliver
          </div>

          <h1
            className="font-display font-extrabold leading-[0.95] tracking-[-0.06em] text-white"
            style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5.2rem)' }}
          >
            Constructing
            <br />
            <span className="font-serif italic font-normal text-[#ff6200]">
              <TypewriterText
                words={['Legacy Spaces.', 'Better Futures.', 'Enduring Value.']}
                speed={95}
                delay={2000}
                eraseSpeed={55}
                loop={true}
              />
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-neutral-300">
            We partner with clients to shape premium residential and commercial spaces through disciplined planning, precise execution, and a clear focus on long-term value.
          </p>

          <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3">
            <a
              href="#estimator"
              className="glow-btn btn-gold px-6 py-3 sm:px-7 sm:py-3.5 text-[11px] sm:text-[12px] font-bold tracking-[0.12em] uppercase flex items-center gap-2.5 rounded-sm cursor-pointer"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#architecture"
              className="btn-ghost px-6 py-3 sm:px-7 sm:py-3.5 text-[11px] sm:text-[12px] font-bold tracking-[0.12em] uppercase flex items-center gap-2 rounded-sm cursor-pointer"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Explore Portfolio
            </a>
          </div>

          <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-4 sm:gap-5 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>
            <span>Licensed team</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff6200]" />
            <span>Transparent process</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff6200]" />
            <span>On-time delivery</span>
          </div>

          <div
            className="mt-4 sm:mt-5 grid w-full max-w-2xl grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-4"
            style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="pr-1 sm:pr-4 relative">
                <div
                  className="font-display font-extrabold mb-0.5"
                  style={{ fontSize: 'clamp(1.3rem, 2.3vw, 2.2rem)', color: '#ff6200', lineHeight: 1 }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase leading-tight"
                  style={{ color: 'rgba(255, 255, 255, 0.65)', fontFamily: 'var(--font-mono)' }}
                >
                  {stat.label}
                </div>
                {i < stats.length - 1 && (
                  <div
                    className="absolute right-0 top-1 bottom-1 w-px"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full mt-6 sm:mt-8 lg:mt-0 flex justify-center lg:justify-center xl:justify-start lg:-translate-x-6 xl:-translate-x-12 px-2 sm:px-0">
          <HeroCarousel />
        </div>
      </div>

      {!combined && (
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to top, #0b1115, transparent)' }}
        />
      )}
    </section>
  );
}
