import React, { useState, useRef, useEffect } from 'react';
import { 
  Compass, 
  Sun, 
  Wind, 
  ShieldCheck, 
  Ruler, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Hammer, 
  PenTool, 
  Eye, 
  ArrowRight, 
  Building,
  Maximize2,
  X
} from 'lucide-react';

export default function Architecture({ setAllocationModal }) {
  const [activeTab, setActiveTab] = useState('details');
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('arch-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll('.arch-reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => elements?.forEach((el) => observer.unobserve(el));
  }, []);

  const hotspots = [
    {
      id: 'muttram',
      title: 'Open-Air Muttram (Courtyard)',
      shortDesc: 'Microclimate temperature regulation & passive air well',
      desc: 'Central courtyard acting as an evaporative cooling lung that extracts hot air upward and circulates sea breezes through the entire residence.',
      pos: { top: '55%', left: '48%' },
      metric: '4-6°C Passive Cooling'
    },
    {
      id: 'thoongal',
      title: 'Carved Teak Thoongal (Pillars)',
      shortDesc: 'Load-bearing heritage wood joinery with stone plinths',
      desc: 'Hand-carved seasoned Burma teak pillars anchored onto monolithic Mahabalipuram granite plinths using classical Mortise & Tenon joinery.',
      pos: { top: '48%', left: '23%' },
      metric: 'Century-Grade Timber'
    },
    {
      id: 'jaali',
      title: 'Geometric Stone Jaali Screens',
      shortDesc: 'Venturi air acceleration & sunlight diffusion',
      desc: 'Precision-carved natural stone lattices that transform harsh tropical afternoon glare into soothing ambient luminosity while cooling incoming breeze.',
      pos: { top: '42%', left: '8%' },
      metric: '85% Glare Reduction'
    },
    {
      id: 'athangudi',
      title: 'Handmade Athangudi Tile Flooring',
      shortDesc: 'Artisanal Karaikudi mineral-oxide floor craft',
      desc: 'Authentic handmade tiles crafted from local river sand, lime, and mineral oxides, naturally cool to the touch without artificial glazing.',
      pos: { top: '82%', left: '80%' },
      metric: '100% Eco-Natural'
    }
  ];

  const architectureDetails = [
    {
      num: '01',
      title: 'Dravidian & Chettinad Spatial Geometry',
      tamilTerm: 'முற்றம் & திண்ணை (Muttram & Thinnai)',
      subtitle: 'Passive convective cooling without 24/7 HVAC dependency',
      desc: 'Rooted in centuries of Tamil vernacular wisdom, our layouts center around the iconic Muttram (open-to-sky central courtyard). Acting as a natural low-pressure thermal flue, it draws fresh breezes in from the perimeter Thinnai (raised veranda) and exhausts heated air upward, maintaining pleasant ambient temperatures even during peak Tamil Nadu summers.',
      highlights: [
        'Central muttram creates natural air draft ventilation',
        'Deep sloping eaves (Thazhvaaram) block fierce sun & monsoon rains',
        'Raised Thinnai veranda acts as a thermal buffer and community threshold',
        'Orientation strictly aligned with Manaiyadi Shastram (Ayadi math)'
      ]
    },
    {
      num: '02',
      title: 'Mahabalipuram Granite & Teak Joinery',
      tamilTerm: 'தூண்கள் & கல் வேலைப்பாடு (Pillars & Stonework)',
      subtitle: 'Artisanal structural joinery fused with RCC longevity',
      desc: 'We collaborate directly with master sthapatis and generational stone carvers from Mahabalipuram to craft solid granite plinths, jaali screens, and threshold doorways. Heavy-timber roof trusses crafted from seasoned teak wood are interlocked with Mortise and Tenon woodcraft, resting securely on engineered concrete ring-beams.',
      highlights: [
        'Solid seasoned Burma teakwood load-bearing pillars',
        'Granite upapitha plinths resistant to ground dampness & coastal salinity',
        'Intricate geometric stone jaali screens casting dynamic light patterns',
        'Concealed seismic steel dowels ensuring modern safety compliance'
      ]
    },
    {
      num: '03',
      title: 'Athangudi Heritage & Natural Thermal Shell',
      tamilTerm: 'ஆத்தங்குடி & சுண்ண பூச்சு (Athangudi & Lime Shell)',
      subtitle: 'Natural materials keeping interiors 4°C to 6°C cooler',
      desc: 'Every villa incorporates authentic handmade Athangudi tiles sourced straight from Karaikudi, pressed using glass-top molds, local river sand, and vibrant mineral oxides. Paired with breathable traditional lime plaster (Sunnambu) and terracotta Mangalore roof tiles, the structure breathes naturally, warding off coastal salt efflorescence.',
      highlights: [
        'Directly sourced handmade Athangudi tiles from Chettinad',
        'Multi-layer terracotta clay roofing that insulates against radiant heat',
        'Lime plaster finish that prevents wall dampness & fungal mold',
        'Natural stone and terracotta courtyards aiding groundwater recharge'
      ]
    },
    {
      num: '04',
      title: 'Vastu Shastra & Manaiyadi Science',
      tamilTerm: 'மனையடி சாஸ்திரம் & திசை அமைவு (Vastu & Spatial Harmony)',
      subtitle: 'Micro-climate science codified through traditional wisdom',
      desc: 'Far from superstition, traditional Tamil Manaiyadi Shastram represents sophisticated environmental civil engineering. We calibrate every axis — from the Ishanya (Northeast) water element and Agni (Southeast) culinary hearth to the Vayu (Northwest) wind portals — to optimize solar angles and seasonal air movement.',
      highlights: [
        'Solar trajectory analysis matching room functions to daylight hours',
        'Brahmasthan (sacred center) kept unobstructed for air circulation',
        'Ayadi mathematical ratios calculated for dimensional harmony',
        '100% certified Vastu compliance without compromising modern ergonomics'
      ]
    }
  ];

  const howWeDoItSteps = [
    {
      step: 'STEP 01',
      title: 'Micro-Climate & Vastu Site Mapping',
      icon: <Compass className="w-5 h-5 text-[#ff6200]" />,
      desc: 'Before drawing a single line, we analyze your plot’s solar trajectory, wind quadrants from the Bay of Bengal, soil load capacity, and Manaiyadi Shastram coordinates to locate the optimal Muttram axis.'
    },
    {
      step: 'STEP 02',
      title: '3D Parametric CAD/BIM Blueprinting',
      icon: <PenTool className="w-5 h-5 text-[#ff6200]" />,
      desc: 'We translate vernacular proportions into millimeter-accurate AutoCAD and Revit BIM models. Courtyard rainwater drainage, concealed smart HVAC, and hidden structural concrete beams are virtually tested.'
    },
    {
      step: 'STEP 03',
      title: 'Artisanal Material Curation in Karaikudi',
      icon: <Hammer className="w-5 h-5 text-[#ff6200]" />,
      desc: 'We directly procure handmade Athangudi tiles from heritage workshops in Sivaganga/Karaikudi, inspect seasoned timber lots, and commission custom stone jaali carvings from Mahabalipuram sculptors.'
    },
    {
      step: 'STEP 04',
      title: 'Monolithic Precision & Modern Infrastructure',
      icon: <ShieldCheck className="w-5 h-5 text-[#ff6200]" />,
      desc: 'Our certified civil engineers cast corrosion-resistant Fe-550 TMT foundations with anti-saline water-proofing, integrating concealed home automation and rainwater harvesting directly beneath the heritage facade.'
    }
  ];

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 overflow-hidden text-white tech-grid-container"
      style={{ background: '#121214' }}
    >
      {/* Background Decorative Chapter Number */}
      <div
        className="section-number absolute -right-6 top-24 pointer-events-none select-none hidden lg:block opacity-35"
        style={{ WebkitTextStroke: '1px rgba(255, 98, 0, 0.15)' }}
        aria-hidden="true"
      >
        ARCH
      </div>

      {/* Warm Ambient Radial Glow */}
      <div
        className="absolute top-1/4 left-1/3 w-[650px] h-[650px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255, 98, 0, 0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div className="w-full max-w-7xl mx-auto z-10 relative">

        {/* ── HEADER BLOCK ── */}
        <div className="mb-10 sm:mb-14">
          <div className="gold-tag mb-3">TAMIL NADU ARCHITECTURAL MASTERY</div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2
                className="font-display font-extrabold leading-[1.05] tracking-tight mb-3 text-white"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)' }}
              >
                Where Dravidian Heritage Meets{' '}
                <span className="font-serif italic font-normal text-[#ff6200]">
                  Modern Civil Engineering
                </span>
              </h2>
              <p className="font-sans text-sm sm:text-base max-w-2xl text-neutral-400 leading-relaxed">
                We craft spaces inspired by timeless Chettinad mansions and Tamil coastal architecture — featuring open-air courtyards, carved teak pillars, and handmade Athangudi tiles, reinforced with modern structural precision.
              </p>
            </div>

            {/* Quick Stat Pill */}
            <div className="flex items-center gap-4 bg-neutral-900/90 border border-white/10 px-5 py-3 rounded-xl backdrop-blur-md shrink-0 shadow-lg">
              <div>
                <div className="font-display font-black text-2xl text-[#ff6200] leading-none">4°–6°C</div>
                <div className="font-mono text-[8px] uppercase tracking-widest text-neutral-400 mt-1">Passive Air Cooling</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <div className="font-display font-black text-2xl text-white leading-none">100%</div>
                <div className="font-mono text-[8px] uppercase tracking-widest text-neutral-400 mt-1">Vastu / Manaiyadi</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FEATURED HERO IMAGE SHOWCASE: TAMIL NADU ARCHITECTURE ── */}
        <div className="mb-14 arch-reveal">
          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl group">
            {/* The Image */}
            <div className="relative aspect-[16/9] w-full max-h-[580px] overflow-hidden">
              <img
                src="/tamilnadu_architecture.jpg"
                alt="Authentic Tamil Nadu Chettinad & Dravidian Architecture by Noor Construction"
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
              />

              {/* Gradient Vignette & Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

              {/* Corner CAD Marks */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#ff6200]/80 pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#ff6200]/80 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#ff6200]/80 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#ff6200]/80 pointer-events-none" />

              {/* Interactive Hotspot Markers on the Image */}
              {hotspots.map((h) => {
                const isSelected = activeHotspot?.id === h.id;
                return (
                  <button
                    key={h.id}
                    onClick={() => setActiveHotspot(isSelected ? null : h)}
                    className="absolute z-20 group/spot cursor-pointer transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                    style={{ top: h.pos.top, left: h.pos.left }}
                    aria-label={h.title}
                  >
                    <span className="relative flex h-8 w-8 items-center justify-center">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isSelected ? 'bg-[#ff6200] opacity-75' : 'bg-white opacity-40'}`} />
                      <span className={`relative inline-flex rounded-full h-5 w-5 border-2 border-white items-center justify-center font-mono text-[9px] font-black text-white shadow-xl ${isSelected ? 'bg-[#ff6200]' : 'bg-neutral-900/90'}`}>
                        +
                      </span>
                    </span>

                    {/* Tooltip on Hover / Touch */}
                    <div className="hidden sm:block absolute left-1/2 bottom-full -translate-x-1/2 mb-2 w-48 p-2 rounded bg-neutral-950/95 border border-[#ff6200]/50 text-white text-left opacity-0 group-hover/spot:opacity-100 transition-opacity pointer-events-none z-30 shadow-2xl backdrop-blur-md">
                      <div className="font-mono text-[8px] text-[#ff6200] font-bold uppercase">{h.metric}</div>
                      <div className="font-display text-xs font-bold leading-tight">{h.title}</div>
                      <div className="text-[9px] text-neutral-400 mt-0.5 leading-snug">{h.shortDesc}</div>
                    </div>
                  </button>
                );
              })}

              {/* Lightbox / Fullscreen trigger button */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-lg bg-black/60 hover:bg-[#ff6200] text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer"
                title="View Full High-Resolution Image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Bottom Blueprint Title Strip */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded font-mono text-[9px] font-bold tracking-wider bg-[#ff6200]/25 text-[#ff6200] border border-[#ff6200]/40">
                      <Sparkles className="w-3 h-3" />
                      MASTER ARCHITECTURAL REFERENCE
                    </span>
                    <span className="font-mono text-[9px] text-neutral-300 tracking-widest uppercase">
                      TAMIL NADU VERNACULAR SERIES
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-white">
                    Chettinad Central Muttram & Dravidian Teak Pillars
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-300 max-w-xl mt-1">
                    Authentic Thinnai veranda with carved thoongal, open water reflection basin, Athangudi floor tiles, and natural stone jaali screens.
                  </p>
                </div>

                {/* Hotspot Help Cue */}
                <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-mono text-[10px] text-neutral-200">
                  <span className="w-2 h-2 rounded-full bg-[#ff6200] animate-pulse" />
                  Click (+) pins to inspect elements
                </div>
              </div>
            </div>

            {/* Selected Hotspot Detailed Banner (Mobile/Desktop dynamic callout) */}
            {activeHotspot && (
              <div className="p-4 sm:p-5 bg-neutral-950 border-t border-[#ff6200]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-[#ff6200]/20 border border-[#ff6200]/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Eye className="w-4 h-4 text-[#ff6200]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-sm text-white">{activeHotspot.title}</span>
                      <span className="font-mono text-[8px] bg-[#ff6200] text-black px-1.5 py-0.5 rounded font-bold">{activeHotspot.metric}</span>
                    </div>
                    <p className="font-sans text-xs text-neutral-300 mt-0.5 max-w-2xl">{activeHotspot.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-neutral-400 hover:text-white p-1 rounded font-mono text-xs flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-4 h-4" /> Close
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── SECTION TABS: "ARCHITECTURE DETAILS" vs "HOW WE DO IT" ── */}
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-xl bg-neutral-900 border border-white/10 shadow-lg">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-2.5 rounded-lg font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'details'
                  ? 'bg-[#ff6200] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Building className="w-4 h-4" />
              Architecture Details
            </button>
            <button
              onClick={() => setActiveTab('process')}
              className={`px-6 py-2.5 rounded-lg font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'process'
                  ? 'bg-[#ff6200] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              How We Do It (Process)
            </button>
          </div>
        </div>

        {/* ── TAB 1: ARCHITECTURE DETAILS ── */}
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {architectureDetails.map((detail, idx) => (
              <div
                key={idx}
                className="arch-reveal p-6 sm:p-8 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-[#ff6200]/40 transition-all duration-300 relative overflow-hidden group shadow-lg"
              >
                {/* Subtle CAD Background Ticks */}
                <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-white/20" />
                <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-white/20" />

                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-mono text-2xl font-black text-[#ff6200]/60 group-hover:text-[#ff6200] transition-colors">
                    {detail.num}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-orange-400 font-bold">
                    {detail.tamilTerm}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-1.5 leading-tight">
                  {detail.title}
                </h3>
                <p className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider mb-4">
                  {detail.subtitle}
                </p>

                <p className="font-sans text-sm text-neutral-300 leading-relaxed mb-6">
                  {detail.desc}
                </p>

                <div className="space-y-2 pt-4 border-t border-white/10">
                  <div className="font-mono text-[9px] text-[#ff6200] font-bold uppercase tracking-widest mb-1.5">
                    // KEY ARCHITECTURAL PRINCIPLES
                  </div>
                  {detail.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-300 leading-snug">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ff6200] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TAB 2: HOW WE DO IT (PROCESS) ── */}
        {activeTab === 'process' && (
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {howWeDoItSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="arch-reveal p-6 rounded-2xl bg-neutral-900/80 border border-white/10 hover:border-[#ff6200]/50 transition-all duration-300 flex flex-col justify-between relative group"
                >
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] font-bold text-[#ff6200] tracking-widest">
                        {step.step}
                      </span>
                      <div className="p-2 rounded-lg bg-[#ff6200]/10 border border-[#ff6200]/30">
                        {step.icon}
                      </div>
                    </div>
                    <h4 className="font-display font-bold text-lg text-white mb-2 leading-tight">
                      {step.title}
                    </h4>
                    <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center gap-1.5 text-[9px] font-mono text-[#ff6200]">
                    <span>QUALITY VERIFIED</span>
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>

            {/* In-depth Engineering Blueprint Guarantee */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 border border-white/15 relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8">
                  <div className="gold-tag mb-2">HOW OUR CIVIL ENGINEERS DELIVER IT</div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-2">
                    Zero Compromise: Traditional Aesthetics, Fe-550 Structural Core
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Unlike amateur builds that use cosmetic plaster moldings, Noor Infrastructure ensures all heritage columns and courtyards are backed by certified structural calculations. Pillars carry actual loads down to isolated RCC footings, waterproofed with crystalline barriers suited for coastal Tamil Nadu soil.
                  </p>
                </div>
                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <div className="p-3 bg-black/40 rounded-xl border border-white/10">
                    <div className="text-[10px] font-mono text-[#ff6200] font-bold uppercase">Foundation Seal</div>
                    <div className="text-xs text-white font-sans mt-0.5">Anti-saline subterranean coating</div>
                  </div>
                  <div className="p-3 bg-black/40 rounded-xl border border-white/10">
                    <div className="text-[10px] font-mono text-[#ff6200] font-bold uppercase">Timber Curation</div>
                    <div className="text-xs text-white font-sans mt-0.5">Kiln-dried seasoned hardwood joinery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── BOTTOM CTA BLOCK ── */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#18181b] to-black border border-[#ff6200]/30 shadow-2xl relative overflow-hidden text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="relative z-10 max-w-xl">
            <span className="font-mono text-[10px] text-[#ff6200] uppercase tracking-widest font-bold">
              PLANNING YOUR RESIDENCE?
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1 mb-2">
              Discuss Your Architectural Vision With Our Chief Civil Designer
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-400">
              Get an authentic Manaiyadi Vastu plot evaluation, 3D courtyard layout blueprint, and fixed transparent bill of quantities for your dream home.
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex flex-wrap gap-3">
            <button
              onClick={() => {
                if (typeof setAllocationModal === 'function') {
                  setAllocationModal(true);
                }
              }}
              className="glow-btn btn-gold px-8 py-4 text-xs font-bold tracking-widest uppercase flex items-center gap-2 rounded cursor-pointer shadow-xl"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Consult On Architecture
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#estimator"
              className="btn-ghost px-7 py-4 text-xs font-bold tracking-widest uppercase flex items-center gap-2 rounded cursor-pointer"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Cost Estimator
            </a>
          </div>
        </div>

      </div>

      {/* ── LIGHTBOX MODAL FOR ULTRA-HIGH RESOLUTION IMAGE ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[99999] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-xl animate-fadeIn"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src="/tamilnadu_architecture.jpg"
              alt="High Quality Tamil Nadu Architecture"
              className="w-full h-auto max-h-[82vh] object-contain rounded-xl border border-white/20 shadow-2xl"
            />
            <div className="mt-3 text-center">
              <span className="font-mono text-xs text-[#ff6200] uppercase tracking-widest font-bold">
                Authentic Chettinad & Dravidian Residential Masterpiece
              </span>
              <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
                Featuring Muttram open courtyard, Athangudi floor tiles, hand-carved thoongal pillars, and stone jaali screens.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
