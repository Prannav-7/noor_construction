import React from 'react';
import { Building2, MapPin, Phone, Clock, FileText, ArrowUpRight, Shield } from 'lucide-react';

export default function Footer({ timeText }) {
  const mapUrl = "https://maps.google.com/?q=Noor+Infrastructure+Kalpakkam";

  return (
    <footer id="contact" className="py-8 lg:py-12 px-6 h-full relative z-10 border-t border-white/5 bg-black text-white flex flex-col justify-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 relative z-10">
        
        {/* Brand/Contact Details */}
        <div className="lg:col-span-5 reveal-on-scroll">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative w-8 h-8 rounded bg-white p-[1px] flex items-center justify-center">
              <Building2 className="w-4 h-4 text-black" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-wider text-white">
              NOOR<span className="font-serif italic font-normal text-lg text-neutral-400">.infra</span>
            </span>
          </div>
          <p className="text-neutral-300 text-sm mb-8 leading-relaxed max-w-sm font-sans">
            Constructing premium sustainable smart properties on the East Coast Road, Pudupattinam. Certified A-Grade infrastructure developers.
          </p>

          <div className="space-y-4 font-mono text-[12px]">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#ff4e00] shrink-0 mt-0.5" />
              <span className="text-neutral-300">
                5, East Coast Rd, Pudupattinam,<br />
                Dhawood Nagar, Kalpakkam, Meiyur,<br />
                Tamil Nadu 603102
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#ff4e00]" />
              <a href="tel:+917305130207" className="text-neutral-300 hover:text-white transition-colors font-medium">
                073051 30207
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-neutral-550" />
              <span className="text-neutral-400">
                Open · Closes 7:30 pm
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-neutral-300 bg-neutral-900 px-2 py-0.5 rounded border border-white/10 font-mono font-medium">
                PLUS CODE: G46W+J8 Kalpakkam, Tamil Nadu
              </span>
            </div>
          </div>

          {/* Construction Permit Badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-white/10 bg-neutral-950 font-mono text-[8px] font-bold tracking-widest text-neutral-300 uppercase">
              <Shield className="w-3 h-3 text-[#ff4e00]" />
              RERA REGISTERED
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-white/10 bg-neutral-950 font-mono text-[8px] font-bold tracking-widest text-neutral-300 uppercase">
              <Shield className="w-3 h-3 text-[#ff4e00]" />
              ISO 9001:2015
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-white/10 bg-neutral-950 font-mono text-[8px] font-bold tracking-widest text-neutral-300 uppercase">
              <Shield className="w-3 h-3 text-green-500" />
              IGBC GREEN
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="lg:col-span-3 grid grid-cols-2 gap-8 font-mono text-[11px] tracking-wider reveal-on-scroll">
          <div>
            <div className="text-white font-bold tracking-widest mb-4">// CORE_LINKS</div>
            <ul className="space-y-2.5 text-neutral-400">
              <li><a href="#projects" className="hover:text-white transition-colors">PROJECTS</a></li>
              <li><a href="#ecosystem" className="hover:text-white transition-colors">PROCESS</a></li>
              <li><a href="#estimator" className="hover:text-white transition-colors">HUD ESTIMATOR</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">REVIEWS</a></li>
            </ul>
          </div>
          <div>
            <div className="text-white font-bold tracking-widest mb-4">// TELEMETRY</div>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <a 
                  href={mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  GOOGLE MAPS <ArrowUpRight className="w-3 h-3 text-[#ff4e00]" />
                </a>
              </li>
              <li><a href="#contact" className="hover:text-white transition-colors">SUPPORT_DECK</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1">WHITEPAPER <FileText className="w-3 h-3" /></a></li>
            </ul>
          </div>
        </div>

        {/* Real Embedded Google Map */}
        <div className="lg:col-span-4 reveal-on-scroll">
          <div className="group rounded p-1 border border-white/10 relative bg-neutral-950 aspect-square flex flex-col overflow-hidden hover:border-[#ff4e00]/50 transition-all duration-300">
            <div className="absolute top-3 left-3 z-20 text-[10px] font-mono text-white font-semibold bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-white/10 flex items-center gap-1.5 pointer-events-none">
              <span>// REGIONAL_MAP_LINK</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#ff4e00]" />
            </div>

            {/* Embedded Google Map */}
            <div className="flex-1 w-full relative bg-[#0a1628] rounded-sm overflow-hidden pointer-events-auto">
              <iframe
                title="Google Maps Location"
                src="https://maps.google.com/maps?q=East+Coast+Road,+Kalpakkam,+Tamil+Nadu&t=m&z=13&output=embed&iwloc=near"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ filter: 'grayscale(1) invert(1) contrast(1.2)' }}
              ></iframe>
            </div>

            {/* Coordinate telemetry metadata */}
            <div className="p-3 font-mono text-[10px] text-neutral-300 flex justify-between font-medium bg-neutral-950">
              <span>COORDS: G46W+J8 KALPAKKAM</span>
              <span className="text-neutral-400">PUDUPATTINAM SEC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety-Stripe Bottom Border */}
      <div className="construction-tape w-full mt-6 relative z-10"></div>

      {/* Copyright/Contract details */}
      <div className="max-w-7xl mx-auto w-full mt-4 pt-4 flex flex-col md:flex-row justify-between items-center font-mono text-[10px] text-neutral-400 gap-3 tracking-widest relative z-10">
        <div>
          © 2026 NOOR INFRASTRUCTURE FOUNDATION, LTD. ALL SYSTEM DATA SECURED.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">PRIVACY_LEDGER</a>
          <a href="#" className="hover:text-white transition-colors">TERMS_OF_GRID</a>
          <span className="text-neutral-500">DEED_CONTRACT: 0x5d6...ba4</span>
        </div>
      </div>
    </footer>
  );
}
