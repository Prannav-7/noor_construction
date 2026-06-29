import React, { useState } from 'react';
import { MapPin, Phone, Clock, ArrowUpRight, Shield, X } from 'lucide-react';

/* ─── Modal content ─────────────────────────────────────────── */
const PRIVACY_CONTENT = {
  title: 'Privacy Policy',
  updated: 'June 2026',
  sections: [
    {
      heading: 'What We Collect',
      body: 'We only collect what you give us — your name, phone number, and project details when you submit an enquiry or cost estimate. Nothing is collected without your consent.',
    },
    {
      heading: 'How We Use It',
      body: 'Your data is used only to respond to enquiries and share relevant Noor Infrastructure updates. We never sell or share your information with third parties.',
    },
    {
      heading: 'Your Rights & Contact',
      body: 'You may request access, correction, or deletion of your data at any time by calling +91 73051 30207 or visiting our office at 5, East Coast Rd, Kalpakkam, Tamil Nadu 603102.',
    },
  ],
};

const TERMS_CONTENT = {
  title: 'Terms of Use',
  updated: 'June 2026',
  sections: [
    {
      heading: 'Use of This Website',
      body: 'By using this site you agree to these terms. All content — images, estimates, and text — is the intellectual property of Noor Infrastructure Pvt. Ltd. Reproduction without written consent is prohibited.',
    },
    {
      heading: 'Cost Estimates',
      body: 'The interactive estimator gives indicative figures only. Actual costs depend on site conditions, material prices, and agreed design specifications — always confirmed in a formal quotation.',
    },
    {
      heading: 'Governing Law',
      body: 'These terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of the courts in Tamil Nadu.',
    },
  ],
};

/* ─── Reusable Policy Modal ──────────────────────────────────── */
function PolicyModal({ content, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-xl rounded-t-2xl sm:rounded-none"
        style={{
          background: '#18181b',
          border: '1px solid rgba(255, 98, 0, 0.2)',
          boxShadow: '0 -20px 60px rgba(0,0,0,0.5)',
          maxHeight: '82vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{ borderBottom: '1px solid rgba(255,98,0,0.12)' }}
        >
          <div>
            <div
              className="text-[8px] tracking-[0.3em] font-bold uppercase mb-1"
              style={{ color: '#ff6200', fontFamily: 'var(--font-mono)' }}
            >
              Noor Infrastructure · Legal
            </div>
            <h2
              className="font-display font-extrabold text-white"
              style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)' }}
            >
              {content.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 shrink-0 ml-3"
            style={{ border: '1px solid rgba(255,98,0,0.2)', color: 'rgba(255,255,255,0.5)', background: 'transparent', borderRadius: 0, cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff6200'; e.currentTarget.style.color = '#ff6200'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,98,0,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div
          className="px-5 py-5 space-y-5 overflow-y-auto"
          style={{ WebkitOverflowScrolling: 'touch', userSelect: 'text', cursor: 'text' }}
        >
          {content.sections.map((sec, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.25rem' }}>
              <div className="flex items-center gap-2.5 mb-2">
                <span
                  className="text-[9px] font-bold"
                  style={{ color: '#ff6200', fontFamily: 'var(--font-mono)', minWidth: '1.5rem' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className="font-display font-bold text-white"
                  style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}
                >
                  {sec.heading}
                </h3>
              </div>
              <p
                className="text-[13px] leading-relaxed"
                style={{
                  color: 'rgba(255,255,255,0.62)',
                  fontFamily: 'var(--font-sans)',
                  paddingLeft: '1.6rem',
                  userSelect: 'text',
                }}
              >
                {sec.body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="px-5 py-4 flex justify-end shrink-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button
            onClick={onClose}
            className="glow-btn btn-gold px-6 py-2.5 text-[11px] font-bold tracking-[0.12em] uppercase cursor-pointer"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
export default function Footer({ timeText }) {
  const mapUrl = "https://maps.google.com/?q=Noor+Infrastructure+Kalpakkam";
  const [modal, setModal] = useState(null); // 'privacy' | 'terms' | null

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Policy Modals ── */}
      {modal === 'privacy' && (
        <PolicyModal content={PRIVACY_CONTENT} onClose={() => setModal(null)} />
      )}
      {modal === 'terms' && (
        <PolicyModal content={TERMS_CONTENT} onClose={() => setModal(null)} />
      )}

      <footer
        id="contact"
        className="py-12 lg:py-16 px-6 min-h-screen relative z-10 flex flex-col justify-center luxury-grain"
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
                src="/ncs-logo.png"
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
                  { label: 'Projects', action: () => scrollTo('projects') },
                  { label: 'Process', action: () => scrollTo('why-us') },
                  { label: 'Estimator', action: () => scrollTo('estimator') },
                  { label: 'Reviews', action: () => scrollTo('reviews') },
                  { label: 'Packages', action: () => scrollTo('packages') },
                ].map((link, i) => (
                  <li key={i}>
                    <button
                      onClick={link.action}
                      className="text-[11px] tracking-[0.1em] uppercase transition-colors duration-200 text-left"
                      style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-mono)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      onMouseEnter={e => e.currentTarget.style.color = '#ff6200'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
                    >
                      {link.label}
                    </button>
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
                <li>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] tracking-[0.1em] uppercase transition-colors duration-200 flex items-center gap-1"
                    style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-mono)' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ff6200'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
                  >
                    Google Maps
                    <ArrowUpRight className="w-3 h-3" style={{ color: '#ff6200' }} />
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setModal('privacy')}
                    className="text-[11px] tracking-[0.1em] uppercase transition-colors duration-200 text-left"
                    style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-mono)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ff6200'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setModal('terms')}
                    className="text-[11px] tracking-[0.1em] uppercase transition-colors duration-200 text-left"
                    style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-mono)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ff6200'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
                  >
                    Terms of Use
                  </button>
                </li>
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
            <button
              onClick={() => setModal('privacy')}
              className="text-[10px] tracking-[0.15em] uppercase transition-colors duration-200"
              style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'var(--font-mono)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              onMouseEnter={e => e.currentTarget.style.color = '#ff6200'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
            >
              Privacy
            </button>
            <button
              onClick={() => setModal('terms')}
              className="text-[10px] tracking-[0.15em] uppercase transition-colors duration-200"
              style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'var(--font-mono)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              onMouseEnter={e => e.currentTarget.style.color = '#ff6200'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
            >
              Terms
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="text-[10px] tracking-[0.15em] uppercase transition-colors duration-200"
              style={{ color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'var(--font-mono)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              onMouseEnter={e => e.currentTarget.style.color = '#ff6200'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
            >
              Contact
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
