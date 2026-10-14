import React from 'react';
import {
  Compass,
  Award,
  ShieldCheck,
  Building2
} from 'lucide-react';

const WHATSAPP_NUMBER = '917200629949';
const WHATSAPP_MESSAGE = 'Hello Noor Infrastructure, I would like to enquire about a site or construction project for my property.';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.436.002 9.858-4.384 9.86-9.8 0-2.623-1.02-5.088-2.871-6.941-1.852-1.853-4.319-2.87-6.939-2.871-5.438 0-9.861 4.386-9.864 9.802 0 1.547.414 3.055 1.2 4.4l-.794 2.899 2.97-.779.803.438zm11.287-6.953c-.302-.15-1.787-.88-2.062-.98-.276-.1-.477-.15-.677.15-.2.3-.777.98-.95 1.18-.175.2-.35.225-.652.075-.302-.15-1.276-.47-2.43-1.499-.896-.8-1.5-1.787-1.676-2.087-.175-.3-.019-.462.13-.611.135-.134.302-.35.453-.525.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.677-1.63-.927-2.23-.244-.589-.493-.51-.677-.52l-.578-.01c-.2 0-.525.075-.8.375-.276.3-1.053 1.03-1.053 2.5 0 1.475 1.078 2.899 1.228 3.1.15.2 2.11 3.22 5.11 4.516.714.309 1.271.493 1.703.63.717.228 1.368.196 1.883.12.574-.085 1.787-.73 2.037-1.43.25-.7.25-1.3.175-1.43-.075-.125-.275-.2-.578-.35z" />
  </svg>
);

export default function ArchitectureSection({ setAllocationModal }) {
  return (
    <section
      id="architecture"
      className="relative w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-12 overflow-hidden tech-grid-light"
      style={{ background: '#FED8B1' }}
    >
      {/* Decorative oversized background chapter number */}
      <div
        className="section-number absolute -right-6 top-20 pointer-events-none select-none hidden xl:block"
        style={{ WebkitTextStroke: '1px rgba(255, 98, 0, 0.14)' }}
        aria-hidden="true"
      >
        ARCH
      </div>

      {/* Subtle gold radial aura */}
      <div
        className="absolute top-1/4 left-1/3 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 98, 0, 0.08) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="max-w-7xl w-full mx-auto relative z-10">

        {/* ── SECTION HEADER ── */}
        <div className="mb-14 sm:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[2px]" style={{ background: '#ff6200' }} />
            <span
              className="text-[10px] sm:text-[11px] tracking-[0.35em] font-bold uppercase"
              style={{ color: '#ff6200', fontFamily: 'var(--font-mono)' }}
            >
              The Philosophy of Craft & Engineering
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2
                className="font-display font-extrabold leading-[1.04] tracking-tight mb-3"
                style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.8rem)', color: '#1c1c1f' }}
              >
                THE WAY OF{' '}
                <span className="font-serif italic font-normal text-[#ff6200]">
                  ARCHITECTURE
                </span>
              </h2>
              <p className="font-sans text-sm sm:text-base max-w-2xl leading-relaxed text-[#5c5850]">
                Where ancient Tamil Nadu climate wisdom meets 2026 digital twin engineering. We craft bespoke living legacies engineered to conquer coastal monsoons and endure for generations.
              </p>
            </div>

            {/* Quick architectural accreditation badge */}
            <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md border border-[#ff6200]/20 px-5 py-3.5 rounded-2xl shadow-sm shrink-0">
              <Award className="w-8 h-8 text-[#ff6200] shrink-0" />
              <div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-[#9A9080] font-bold">
                  Council of Architecture // TN
                </div>
                <div className="font-display font-extrabold text-xs sm:text-sm text-neutral-900">
                  Registered Structural Master Builders
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── ARCHITECT SPOTLIGHT: LEADERSHIP OF TAMIL NADU ARCHITECTURE ── */}
        <div
          className="relative rounded-3xl overflow-hidden border border-black/8 shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #1c1c22 0%, #121216 100%)' }}
        >
          {/* Subtle blueprint grid watermark on dark card */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 98, 0, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 98, 0, 0.3) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10">

            {/* LEFT: High Quality Tamil Nadu Architect Portrait */}
            <div className="lg:col-span-5 relative min-h-[380px] sm:min-h-[460px] lg:min-h-full overflow-hidden">
              <img
                src="/tamilnadu_architect.jpg"
                alt="Chief Principal Architect & Master Builder in Tamil Nadu"
                className="w-full h-full object-cover object-top filter contrast-[1.05]"
              />
              {/* Gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/30 lg:to-[#121216]" />

              {/* Technical CAD Drawing Stamp Overlay */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-[#ff6200]/40 px-3 py-1.5 rounded-lg flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                <span className="font-mono text-[9px] font-bold tracking-widest text-white uppercase">
                  LEAD ARCHITECT // ECR SITE ACTIVE
                </span>
              </div>

              {/* Architect Name Badge for Mobile/Tablet overlay */}
              <div className="absolute bottom-4 left-4 right-4 lg:hidden bg-black/75 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <span className="font-mono text-[8px] tracking-[0.25em] text-[#ff6200] uppercase font-bold block mb-0.5">
                  CHIEF PRINCIPAL ARCHITECT & MASTER BUILDER
                </span>
                <h3 className="font-display font-extrabold text-lg text-white">
                  Er. K. Noor Mohammed, M.Arch., F.I.E.
                </h3>
              </div>
            </div>

            {/* RIGHT: Architect's Philosophy, Credentials & Novelty Statement */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-white">
              <div>
                <div className="hidden lg:flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-[#ff6200] uppercase font-bold">
                    ARCHITECTURAL DIRECTION // TAMIL NADU
                  </span>
                  <div className="h-px w-12 bg-[#ff6200]/40" />
                </div>

                <div className="hidden lg:block mb-4">
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                    Er. K. Noor Mohammed
                  </h3>
                  <div className="font-mono text-xs text-neutral-400 mt-1 flex flex-wrap gap-x-4">
                    <span>M.Arch (Urban Design) • B.E. (Structural)</span>
                    <span className="text-[#ff6200]">COA Reg. CA/2008/42189</span>
                    <span>TN Structural Engineer Class-I</span>
                  </div>
                </div>

                {/* Personal Manifesto on Architectural Novelty */}
                <div className="relative pl-5 border-l-2 border-[#ff6200] my-5">
                  <p className="font-serif italic text-base sm:text-lg lg:text-xl text-neutral-200 leading-relaxed">
                    "Architecture along the East Coast of Tamil Nadu is not merely about pouring concrete. It is an enduring dialogue with the sea breeze, the path of the sun, and the sacred geometry of Vāstu. Our novelty lies in bridging centuries of Dravidian climate mastery with zero-tolerance digital twin engineering."
                  </p>
                </div>

                <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                  With over 15 years overseeing bespoke residences and commercial landmarks in Pudupattinam, Kalpakkam, and the East Coast Road, Noor Architecture designs homes engineered to thrive in tropical coastal microclimates while delivering unprecedented spatial luxury.
                </p>

                {/* Trust & Scale Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-white/10 my-4">
                  <div className="text-left">
                    <div className="font-display font-extrabold text-2xl text-[#ff6200] leading-none mb-1">
                      150+
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                      Happy Customers
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="font-display font-extrabold text-2xl text-white leading-none mb-1">
                      72+
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                      Projects Delivered
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="font-display font-extrabold text-2xl text-[#ff6200] leading-none mb-1">
                      15+
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                      Years Heritage
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="font-display font-extrabold text-2xl text-white leading-none mb-1">
                      100%
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                      RERA Compliant
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Strip */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => setAllocationModal?.(true)}
                  className="glow-btn btn-gold px-6 py-3 rounded-lg font-mono text-[11px] font-bold tracking-widest uppercase flex items-center gap-2 cursor-pointer transition-all shadow-md"
                >
                  <Compass className="w-4 h-4" />
                  CONSULT CHIEF ARCHITECT
                </button>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-lg border border-white/20 hover:border-[#ff6200] text-white hover:text-[#ff6200] font-mono text-[11px] font-bold tracking-widest uppercase flex items-center gap-2 transition-all bg-white/5 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#ff6200]" />
                  DIRECT ARCHITECT WHATSAPP
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
