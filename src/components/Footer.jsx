import React from 'react';
import { MapPin, Phone, Clock, ArrowUpRight, Shield } from 'lucide-react';

export default function Footer({ timeText }) {
  const mapUrl = "https://maps.google.com/?q=Noor+Infrastructure+Kalpakkam";

  return (
    <footer
      id="contact"
      className="py-12 lg:py-16 px-6 h-full relative z-10 flex flex-col justify-center luxury-grain"
      style={{
        background: '#18181b',
        borderTop: '1px solid rgba(255, 98, 0, 0.2)',
      }}
    >
      {/* Top gold hairline accent */}
      <div className="hairline absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 relative z-10">

        {/* ── Brand / Contact ── */}
        <div className="lg:col-span-5 reveal-on-scroll">

          {/* Brand logo */}
          <div className="mb-8">
            <img
              src="/logo.png.png"
              alt="NCS Noor Constructions"
              className="h-10 md:h-12 w-auto object-contain opacity-95"
            />
            <div
              className="h-[1px] w-24 mt-3"
              style={{ background: 'linear-gradient(90deg, #ff6200, transparent)' }}
            />
          </div>

          <p
            className="font-sans text-[13px] mb-8 leading-relaxed max-w-sm"
            style={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            Premium sustainable properties on the East Coast Road, Pudupattinam. Certified A-Grade infrastructure developers since 2010.
          </p>

          {/* Contact details */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#ff6200' }} />
              <span
                className="text-[12px] leading-relaxed"
                style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-mono)' }}
              >
                5, East Coast Rd, Pudupattinam,<br />
                Kalpakkam, Tamil Nadu 603102
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 shrink-0" style={{ color: '#ff6200' }} />
              <a
                href="tel:+917305130207"
                className="text-[12px] font-medium transition-colors"
                style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-mono)' }}
                onMouseEnter={e => e.target.style.color = '#ff6200'}
                onMouseLeave={e => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
              >
                073051 30207
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 shrink-0" style={{ color: 'rgba(255, 98, 0,0.4)' }} />
              <span className="text-[12px]" style={{ color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'var(--font-mono)' }}>
                Open · Closes 7:30 pm · {timeText} IST
              </span>
            </div>
          </div>

          {/* Certification badges */}
          <div className="flex flex-wrap gap-2.5 mt-7">
            {[
              { icon: <Shield className="w-3 h-3" />, label: 'RERA Registered' },
              { icon: <Shield className="w-3 h-3" />, label: 'ISO 9001:2015' },
              { icon: <Shield className="w-3 h-3 text-green-400" />, label: 'IGBC Green' },
            ].map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] uppercase"
                style={{
                  border: '1px solid rgba(255, 98, 0,0.25)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <span style={{ color: i === 2 ? '#4ade80' : '#ff6200' }}>{badge.icon}</span>
                {badge.label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Navigation Links ── */}
        <div className="lg:col-span-3 grid grid-cols-2 gap-8 reveal-on-scroll">
          <div>
            <div
              className="text-[10px] tracking-[0.3em] font-bold uppercase mb-5"
              style={{ color: '#ff6200', fontFamily: 'var(--font-mono)' }}
            >
              Navigation
            </div>
            <ul className="space-y-3">
              {[
                { label: 'Projects', href: '#projects' },
                { label: 'Process', href: '#ecosystem' },
                { label: 'Estimator', href: '#estimator' },
                { label: 'Reviews', href: '#reviews' },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-[11px] tracking-[0.1em] uppercase transition-colors duration-200"
                    style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-mono)' }}
                    onMouseEnter={e => e.target.style.color = '#ff6200'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div
              className="text-[10px] tracking-[0.3em] font-bold uppercase mb-5"
              style={{ color: '#ff6200', fontFamily: 'var(--font-mono)' }}
            >
              Legal
            </div>
            <ul className="space-y-3">
              {[
                { label: 'Google Maps', href: mapUrl, external: true },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Use', href: '#' },
              ].map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-[11px] tracking-[0.1em] uppercase transition-colors duration-200 flex items-center gap-1"
                    style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-mono)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ff6200'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
                  >
                    {link.label}
                    {link.external && <ArrowUpRight className="w-3 h-3" style={{ color: '#ff6200' }} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Map ── */}
        <div className="lg:col-span-4 reveal-on-scroll">
          <div
            className="relative overflow-hidden aspect-square group"
            style={{ border: '1px solid rgba(255, 98, 0, 0.25)', transition: 'border-color 0.3s ease' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255, 98, 0,0.5)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255, 98, 0,0.25)'}
          >
            {/* Map label */}
            <div
              className="absolute top-3 left-3 z-20 text-[9px] font-semibold px-2 py-1 flex items-center gap-1.5 pointer-events-none"
              style={{
                background: 'rgba(8,8,8,0.75)',
                border: '1px solid rgba(255, 98, 0,0.25)',
                color: '#ff6200',
                fontFamily: 'var(--font-mono)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <MapPin className="w-3 h-3" />
              Kalpakkam, TN
            </div>

            {/* Google Map iframe */}
            <iframe
               title="Noor Infrastructure Location"
               src="https://maps.google.com/maps?q=East+Coast+Road,+Kalpakkam,+Tamil+Nadu&t=m&z=13&output=embed&iwloc=near"
               className="absolute inset-0 w-full h-full border-0"
               allowFullScreen=""
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
               style={{ filter: 'grayscale(0.4) contrast(1.05) brightness(1.0)' }}
             />

            {/* Bottom coords strip */}
            <div
              className="absolute bottom-0 inset-x-0 p-2 flex justify-between items-center text-[9px]"
              style={{
                background: 'rgba(8,8,8,0.85)',
                borderTop: '1px solid rgba(255, 98, 0,0.15)',
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span>G46W+J8 Kalpakkam</span>
              <span style={{ color: '#ff6200' }}>ECR</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── Bottom Bar ── */}
      <div
        className="max-w-7xl mx-auto w-full mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 relative z-10"
        style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}
      >
        <div
          className="text-[10px] tracking-[0.2em]"
          style={{ color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'var(--font-mono)' }}
        >
          © 2026 Noor Infrastructure Pvt. Ltd. All rights reserved.
        </div>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Contact'].map((item, i) => (
            <a
              key={i}
              href="#"
              className="text-[10px] tracking-[0.15em] uppercase transition-colors duration-200"
              style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'var(--font-mono)' }}
              onMouseEnter={e => e.target.style.color = '#ff6200'}
              onMouseLeave={e => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
