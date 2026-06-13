import React, { useEffect, useRef } from 'react';
import { ShieldCheck, Users, Award, Building2 } from 'lucide-react';

export default function AboutUs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('about-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll('.about-reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => elements?.forEach((el) => observer.unobserve(el));
  }, []);

  const milestones = [
    { year: '2010', label: 'Founded' },
    { year: '2012', label: 'Incorporated' },
    { year: '2018', label: 'Smart Homes' },
    { year: '2024', label: 'Net-Zero' },
    { year: '2026', label: 'Expanding' },
  ];

  const stats = [
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      value: '99.88%',
      label: 'Structural Integrity',
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      value: '450K+',
      label: 'Sq Ft Delivered',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative lg:min-h-screen flex flex-col justify-center py-10 lg:py-14 px-6 w-full luxury-grain"
      style={{ background: '#18181b' }}
    >
      {/* Decorative oversized background chapter number */}
      <div
        className="section-number absolute -right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
        aria-hidden="true"
      >
        01
      </div>

      {/* Subtle gold radial */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255, 98, 0,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-7xl w-full mx-auto relative z-10">

        {/* ── MAIN CONTENT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-12">

          {/* LEFT: Header + Image */}
          <div className="lg:col-span-5 about-reveal">

            {/* Gold tag */}
            <div className="gold-tag mb-5">Who We Are</div>

            <h2
              className="font-display font-extrabold leading-[1.05] tracking-tight mb-4"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#ffffff' }}
            >
              Building Your Vision
              <br />
              <span className="font-serif italic font-normal" style={{ color: '#ff6200' }}>
                On Trust
              </span>
            </h2>

            <p className="font-sans text-[14px] leading-relaxed mb-7" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Since 2010, we've partnered with families and businesses to create spaces that feel as exceptional as they look — blending precision engineering with timeless design.
            </p>

            {/* Image */}
            <div
              className="relative overflow-hidden group"
              style={{ border: '1px solid rgba(255, 98, 0,0.15)' }}
            >
              <img
                src="/about_inspection.png"
                alt="Noor Infrastructure site inspection"
                className="w-full h-[260px] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                style={{ filter: 'grayscale(20%)' }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Bottom caption */}
              <div className="absolute bottom-0 inset-x-0 p-5">
                <div className="gold-tag mb-1" style={{ fontSize: '8px' }}>Structural Inspection</div>
                <p className="font-sans text-[12px] text-[#ffffff]/70">
                  Senior civil architects & certified structural designers on every site.
                </p>
              </div>

              {/* Gold corner marks */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l" style={{ borderColor: 'rgba(255, 98, 0,0.5)' }} />
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r" style={{ borderColor: 'rgba(255, 98, 0,0.5)' }} />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l" style={{ borderColor: 'rgba(255, 98, 0,0.5)' }} />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r" style={{ borderColor: 'rgba(255, 98, 0,0.5)' }} />
            </div>
          </div>

          {/* RIGHT: Stats + Mission */}
          <div className="lg:col-span-7">

            {/* Two stat cards */}
            <div className="grid grid-cols-2 gap-4 mb-6 about-reveal">
              {stats.map((item, i) => (
                <div
                  key={i}
                  className="group relative p-6 overflow-hidden"
                  style={{
                    background: '#27272a',
                    border: '1px solid rgba(255, 98, 0, 0.12)',
                    transition: 'all 0.4s ease',
                    animationDelay: `${0.1 + i * 0.1}s`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(255, 98, 0, 0.3)';
                    e.currentTarget.style.background = 'rgba(255, 98, 0, 0.04)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255, 98, 0, 0.12)';
                    e.currentTarget.style.background = '#27272a';
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center mb-4"
                    style={{ background: 'rgba(255, 98, 0, 0.1)', color: '#ff6200' }}
                  >
                    {item.icon}
                  </div>
                  {/* Value */}
                  <div
                    className="font-display font-extrabold mb-1"
                    style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#ff6200', lineHeight: 1 }}
                  >
                    {item.value}
                  </div>
                  {/* Label */}
                  <div
                    className="text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'var(--font-mono)' }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Mission Statement */}
            <div
              className="about-reveal p-7 relative overflow-hidden"
              style={{
                background: '#27272a',
                border: '1px solid rgba(255, 98, 0, 0.12)',
                animationDelay: '0.3s',
              }}
            >
              {/* Subtle grid overlay */}
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255, 98, 0, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 98, 0, 0.2) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="relative z-10">
                <div className="gold-tag mb-4" style={{ fontSize: '9px' }}>Our Commitment</div>
                <blockquote
                  className="font-serif italic leading-relaxed mb-4"
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255, 255, 255, 0.85)' }}
                >
                  "We build more than structures — we create enduring spaces where lives unfold, families grow, and businesses thrive."
                </blockquote>
                <div className="flex flex-wrap gap-5">
                  {['Residential', 'Commercial', 'Coastal'].map((type, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-2 text-[10px] tracking-wider uppercase"
                      style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'var(--font-mono)' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: i === 0 ? '#ff6200' : i === 1 ? '#ff8c39' : '#cc4e00' }}
                      />
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── HAIRLINE ── */}
        <div className="hairline mb-10" />

        {/* ── MILESTONE TIMELINE ── */}
        <div className="about-reveal">
          <div className="gold-tag mb-8" style={{ fontSize: '9px' }}>Our Journey</div>

          <div className="relative">
            {/* Horizontal connector */}
            <div
              className="hidden lg:block absolute top-[14px] left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 98, 0, 0.2), transparent)' }}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
              {milestones.map((m, i) => (
                <div key={i} className="relative flex flex-col items-center text-center group">
                  {/* Circle node */}
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center z-10 mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{
                      border: `1px solid ${i === milestones.length - 1 ? '#ff6200' : 'rgba(255, 98, 0, 0.3)'}`,
                      background: i === milestones.length - 1 ? 'rgba(255, 98, 0, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${i === milestones.length - 1 ? 'animate-pulse' : ''}`}
                      style={{ background: i === milestones.length - 1 ? '#ff6200' : 'rgba(255, 98, 0, 0.4)' }}
                    />
                  </div>
                  {/* Year */}
                  <span
                    className="font-display font-extrabold text-lg tracking-tight mb-1"
                    style={{ color: i === milestones.length - 1 ? '#ff6200' : '#ffffff' }}
                  >
                    {m.year}
                  </span>
                  {/* Label */}
                  <span
                    className="text-[9px] tracking-[0.18em] uppercase"
                    style={{ color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'var(--font-mono)' }}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* CSS for reveal animations */}
      <style>{`
        .about-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-reveal.about-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
