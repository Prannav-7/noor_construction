import React from 'react';
import { ArrowRight } from 'lucide-react';
import TypewriterText from './TypewriterText';

const stats = [
  { value: '15+', label: 'Years of Craft' },
  { value: '72+', label: 'Projects Delivered' },
  { value: '150+', label: 'Client Partnerships' },
];

const projectHighlights = [
  'Design-led construction planning',
  'Transparent budgeting and delivery',
  'Tailored execution for premium spaces',
];

export default function Hero({ timeText, setAllocationModal, combined = false }) {
  return (
    <section
      id="hero"
      className={`relative pt-48 pb-8 md:pt-32 lg:pt-36 lg:pb-12 px-4 md:px-8 lg:px-12 min-h-screen w-full z-10 text-white ${!combined ? 'luxury-grain overflow-hidden' : 'overflow-visible'}`}
      style={{ background: combined ? 'transparent' : '#101316' }}
    >
      {!combined && (
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
          style={{
            backgroundImage: "url('/hero_bg_local_construction.png')",
            filter: 'brightness(0.38) contrast(1.15) grayscale(18%)'
          }}
        />
      )}

      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(16, 19, 22, 0.3) 0%, rgba(16, 19, 22, 0.68) 55%, rgba(16, 19, 22, 0.96) 100%)'
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

      <div className="relative z-10 mx-auto mt-6 grid w-full max-w-7xl gap-10 md:mt-10 lg:mt-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="flex flex-col justify-center reveal-on-scroll">
          <div
            className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-200 backdrop-blur-sm"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Trusted construction partner
          </div>

          <h1
            className="font-display font-extrabold leading-[0.97] tracking-[-0.06em] text-white"
            style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)' }}
          >
            Building
            <br />
            <span className="font-serif italic font-normal text-[#ff6200]">
              <TypewriterText
                words={['Legacy Homes.', 'Better Spaces.', 'Enduring Value.']}
                speed={95}
                delay={2000}
                eraseSpeed={55}
                loop={true}
              />
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-300 md:text-base">
            We create refined, high-performance spaces with disciplined execution, transparent communication, and craftsmanship that stands the test of time.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#estimator"
              className="glow-btn btn-gold px-7 py-3.5 text-[12px] font-bold tracking-[0.12em] uppercase flex items-center gap-2.5 rounded-sm cursor-pointer"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#architecture"
              className="btn-ghost px-7 py-3.5 text-[12px] font-bold tracking-[0.12em] uppercase flex items-center gap-2 rounded-sm cursor-pointer"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              View Projects
            </a>
          </div>

          <div
            className="mt-8 grid w-full max-w-2xl grid-cols-3 gap-2 sm:gap-4 pt-6 sm:pt-8"
            style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="pr-1 sm:pr-4 relative">
                <div
                  className="font-display font-extrabold mb-0.5"
                  style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.4rem)', color: '#ff6200', lineHeight: 1 }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase leading-tight"
                  style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'var(--font-mono)' }}
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

        <div className="relative hidden lg:block">
          <div
            className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm"
            style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.45)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff6200]/10 via-transparent to-white/5" />
            <div className="relative">
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ff6200]/30 bg-[#ff6200]/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#ffb38a]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Project Delivery
              </div>

              <div className="mb-6 rounded-2xl border border-white/10 bg-[#171b1d] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>
                      Active portfolio
                    </div>
                    <div className="mt-2 text-3xl font-display font-extrabold text-white">28</div>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-300" style={{ fontFamily: 'var(--font-mono)' }}>
                    On track
                  </div>
                </div>
                <div className="space-y-3">
                  {projectHighlights.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-neutral-200">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#ff6200]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm text-neutral-200">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>
                    Budget clarity
                  </div>
                  <div className="mt-2 text-xl font-semibold text-white">98%</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>
                    Client retention
                  </div>
                  <div className="mt-2 text-xl font-semibold text-white">89%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!combined && (
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to top, #101316, transparent)' }}
        />
      )}
    </section>
  );
}
