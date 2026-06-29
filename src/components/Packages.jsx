import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const PACKAGES_DATA = [
  {
    id: 'standard',
    name: 'Standard Package',
    price: '2399',
    headerBg: 'bg-[#ff9c54]',
    textColor: 'text-neutral-900',
    accentColor: 'text-neutral-800',
    surveyColor: 'border-black/20',
    buttonBg: 'bg-[#ff9c54] hover:bg-[#ff8c39] text-neutral-900',
    categories: [
      {
        title: 'Structure',
        items: [
          'Steel: Fe 500 / 550 grade (TATA Tiscon / JSW / Kamachi)',
          'Cement: Grade 43 / 53 (Dalmia / Coromandel / Zuari)',
          'Concrete Mix: M20 Grade structural design',
          'Walls: Premium Red clay bricks (9" outer walls & 4.5" partition walls)',
          'Basement Height: 3 feet from road level'
        ]
      },
      {
        title: 'Bathroom & Plumbing',
        items: [
          'Pipes: Supreme / Ashirvad CPVC & PVC conduits',
          'Sanitaryware: Parryware / Hindware floor-mounted closets',
          'CP Fittings: Parryware / Jaquar basic range',
          'Provisions: Hot water line & exhaust fan sockets in all bathrooms'
        ]
      },
      {
        title: 'Flooring',
        items: [
          'Living & Dining: Double-charged vitrified tiles (₹55/sq.ft budget)',
          'Bedrooms & Kitchen: Premium vitrified tiles (₹50/sq.ft budget)',
          'Toilets & Balconies: Anti-skid ceramic tiles (₹35/sq.ft budget)',
          'Staircase: Polished Kota stone / premium Granite tiles'
        ]
      },
      {
        title: 'Kitchen & Dining',
        items: [
          'Countertop: 20mm thick Black Granite slab (₹120/sq.ft budget)',
          'Wall Dado: Glazed ceramic tiles up to 2 feet height (₹45/sq.ft budget)',
          'Sink: Single bowl stainless steel sink (Diamond / Carysil)',
          'Electricals: Power outlets for Chimney & Water Purifier'
        ]
      },
      {
        title: 'Door, Windows and Railing',
        items: [
          'Main Door: Teakwood frame with modular laminate flush shutter',
          'Internal Doors: Salwood frame with solid skin shutters',
          'Windows: UPVC sliding windows with MS safety grills',
          'Railing: MS safety handrail for staircase & balconies'
        ]
      },
      {
        title: 'Painting',
        items: [
          'Internal: 2 coats wall putty, 1 coat primer, 2 coats Tractor Emulsion',
          'External: 1 coat external primer, 2 coats Apex Weatherproof paint',
          'Doors & Grills: Synthetic enamel paint for all metal and wood items'
        ]
      },
      {
        title: 'Electrical',
        items: [
          'Wiring: Finolex / Havells fire-retardant copper cables',
          'Switches: Anchor Roma / Cona modular switches',
          'Distribution: Legrand DB & MCBs, 3-phase connection setup',
          'Air Conditioning: Split AC provision in Master Bedroom only'
        ]
      },
      {
        title: "What's Not Included",
        items: [
          'Borewell drilling, submersible pump & electrical motor',
          'TNEB electricity meter deposit and liaisoning charges',
          'Compound wall, gate, and exterior landscaping',
          'Interior modular wardrobes, lofts, or kitchen cabinets',
          'Architectural elevations updates beyond standard 3D plan'
        ]
      }
    ]
  },
  {
    id: 'premium',
    name: 'Premium Package',
    price: '2649',
    headerBg: 'bg-[#ff6200]',
    textColor: 'text-white',
    accentColor: 'text-white/85',
    surveyColor: 'border-white/20',
    buttonBg: 'bg-[#ff6200] hover:bg-[#e05600] text-white',
    categories: [
      {
        title: 'Structure',
        items: [
          'Steel: Fe 550D primary grade (TATA Tiscon / JSW Neo)',
          'Cement: Grade 53 premium (Ultratech / Ramco)',
          'Concrete Mix: M25 Grade design mix',
          'Walls: High-strength Solid concrete blocks / fly ash bricks',
          'Basement Height: 3.5 feet from road level with waterproofing treatment'
        ]
      },
      {
        title: 'Bathroom & Plumbing',
        items: [
          'Pipes: Astral / Supreme premium CPVC & PVC lines',
          'Sanitaryware: Jaquar / Kohler wall-mounted closets with concealed flush tank',
          'CP Fittings: Jaquar (Opal/Lyric series) with single lever diverter',
          'Ceiling: Moisture-resistant grid false ceiling in all toilets'
        ]
      },
      {
        title: 'Flooring',
        items: [
          'Living & Dining: Kajaria / Somany double-charged vitrified tiles (₹85/sq.ft budget)',
          'Bedrooms: Large format vitrified / wooden-finish tiles (₹70/sq.ft budget)',
          'Toilets & Balconies: Premium anti-skid vitrified tiles (₹50/sq.ft budget)',
          'Staircase: Premium Granite slab (Imperial Red / Steel Grey)'
        ]
      },
      {
        title: 'Kitchen & Dining',
        items: [
          'Countertop: Premium Black Pearl Granite / engineered Quartz (₹180/sq.ft budget)',
          'Wall Dado: Designer tiles up to 3 feet height (₹65/sq.ft budget)',
          'Sink: Double bowl stainless steel sink with drainboard',
          'Electricals: Outlets for chimney, water purifier, microwave & dishwasher'
        ]
      },
      {
        title: 'Door, Windows and Railing',
        items: [
          'Main Door: Teakwood frame & solid teakwood panelled designer shutter',
          'Internal Doors: Teakwood frames with laminated water-resistant flush doors',
          'Windows: Premium UPVC windows with fly mesh and safety MS grills',
          'Railing: SS 304 grade safety railings for staircase & balconies'
        ]
      },
      {
        title: 'Painting',
        items: [
          'Internal: 3 coats wall putty, 1 coat primer, 2 coats Royale Luxury Emulsion',
          'External: 1 coat primer, 2 coats Apex Ultima dirt-resistant paint',
          'Polish: Melamine polish for Main Door, premium paint for inner doors'
        ]
      },
      {
        title: 'Electrical',
        items: [
          'Wiring: Finolex / Kundan low-smoke fire-resistant cables',
          'Switches: Legrand Lyncus / Havells Crabtree modular series',
          'Distribution: Legrand DX3 DB & MCBs, RCCB shock protection',
          'Air Conditioning: Dedicated AC cabling in all bedrooms and living area'
        ]
      },
      {
        title: "What's Not Included",
        items: [
          'Borewell excavation & pump machinery',
          'TNEB liaisoning fees and statutory connection charges',
          'Interior wardrobes, loft doors, or kitchen modular cabinets',
          'Premium elevations elements like CNC panels, stone wall cladding'
        ]
      }
    ]
  },
  {
    id: 'luxury',
    name: 'Ultra Luxury',
    price: '3199',
    headerBg: 'bg-[#cc4e00]',
    textColor: 'text-white',
    accentColor: 'text-white/85',
    surveyColor: 'border-white/20',
    buttonBg: 'bg-[#cc4e00] hover:bg-[#b23a00] text-white',
    categories: [
      {
        title: 'Structure',
        items: [
          'Steel: TATA Tiscon Fe 550D premium primary steel exclusively',
          'Cement: Premium grade (Ultratech Super / Lafarge Concreto)',
          'Concrete Mix: M25/M30 Grade architectural ready-mix concrete',
          'Walls: High-density Red clay bricks / Thermal insulated aerated blocks',
          'Waterproofing: Multi-layered structural waterproofing (Fosroc/Dr. Fixit)'
        ]
      },
      {
        title: 'Bathroom & Plumbing',
        items: [
          'Pipes: Geberit / Astral noise-reduction silent plumbing systems',
          'Sanitaryware: Kohler / Grohe / Toto premium rimless wall-hung closets',
          'CP Fittings: Grohe / Kohler thermostatic controllers & overhead rain showers',
          'Partitions: Frameless 10mm toughened glass shower enclosures'
        ]
      },
      {
        title: 'Flooring',
        items: [
          'Living & Dining: Italian Marble (Dyna / Boticino, ₹220/sq.ft budget)',
          'Master Bedroom: Premium Engineered wooden flooring / Large format Glazed tiles',
          'Toilets & Balconies: Anti-skid full-body slab tiles (₹100/sq.ft budget)',
          'Staircase: High-end Italian Marble / Premium Leather-finished Granite'
        ]
      },
      {
        title: 'Kitchen & Dining',
        items: [
          'Countertop: Luxury Quartz / Caesarstone countertop (₹350/sq.ft budget)',
          'Wall Dado: Lacquered glass / designer tiles up to 4 feet height',
          'Sink: Carysil Quartz double bowl kitchen sink with pull-out mixer faucet',
          'Utility: Integrated dishwashing inlet & premium washing machine points'
        ]
      },
      {
        title: 'Door, Windows and Railing',
        items: [
          'Main Door: Grand pivot Teakwood door (8\'x4.5\') with Samsung Biometric lock',
          'Internal Doors: Teakwood frames with 8-feet veneer-finished solid core doors',
          'Windows: Fenesta / Schüco premium acoustic double-glazed UPVC windows',
          'Railing: Frameless toughened glass railing (12mm) with SS 316 channels'
        ]
      },
      {
        title: 'Painting',
        items: [
          'Internal: Level 5 finish putty, Royale Aspira / Silk luxury paint',
          'External: Apex Ultima Protek with 10-year warranty & textured wall panels',
          'Polish: Premium PU (Polyurethane) polish for all wooden features'
        ]
      },
      {
        title: 'Electrical',
        items: [
          'Wiring: Polycab / Finolex shielded FRLS wires',
          'Switches: Legrand Arteor / Schneider glass smart touch switches',
          'Automation: Smart home automation hub preparation & video door phone',
          'EV Port: Dedicated 15A electric vehicle charging port in parking garage'
        ]
      },
      {
        title: "What's Not Included",
        items: [
          'External landscaping, swimming pools, or custom waterfalls',
          'Bespoke light chandeliers, ceiling fans, or indoor furniture items',
          'Government connection deposits (actual charges billed directly to client)'
        ]
      }
    ]
  }
];

export default function Packages({ setAllocationModal, setSelectedProject }) {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (packageId, categoryTitle) => {
    const key = `${packageId}-${categoryTitle}`;
    setOpenSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleCtaClick = (pkgName) => {
    setSelectedProject({
      title: `${pkgName.toUpperCase()} SPECIFICATION`,
      location: 'CHENNAI',
      area: 'Custom Sq Ft Request',
      year: '2026',
      progress: 100,
      specifications: {
        sqFt: 'Detailed breakdown requested'
      }
    });
    setAllocationModal(true);
  };

  return (
    <section
      id="packages"
      className="relative w-full py-16 px-6 luxury-grain select-none"
      style={{ background: '#18181b' }}
    >
      {/* Subtle orange radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 98, 0, 0.04) 0%, transparent 65%)',
          filter: 'blur(80px)'
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header Block */}
        <div className="text-center mb-16 shrink-0">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-8 h-[1px]" style={{ background: '#ff6200' }} />
            <span
              className="text-[10px] tracking-[0.35em] font-bold uppercase text-[#ff6200] font-mono"
            >
              Construction Packages
            </span>
            <div className="w-8 h-[1px]" style={{ background: '#ff6200' }} />
          </div>

          <h2
            className="font-display font-extrabold leading-none mb-3 text-white"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
          >
            Home Construction{' '}
            <span className="font-serif italic font-normal text-gold-gradient">
              Packages
            </span>
          </h2>
          <p
            className="font-sans text-[13px] leading-relaxed max-w-md mx-auto"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            Compare our specifications and package details, curated for structural durability and high-end design.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col lg:flex-row gap-8 justify-center lg:items-stretch items-stretch w-full">
          {PACKAGES_DATA.map((pkg) => (
            <div
              key={pkg.id}
              className="w-full lg:w-[370px] flex flex-col bg-white text-neutral-800 rounded-2xl overflow-hidden shadow-xl border border-neutral-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5"
            >
              {/* Card Header */}
              <div className={`${pkg.headerBg} py-8 px-6 text-center flex flex-col items-center justify-center relative`}>
                {/* Visual Survey Lines */}
                <div className={`absolute top-2 left-2 w-1.5 h-1.5 border-t border-l ${pkg.surveyColor}`}></div>
                <div className={`absolute top-2 right-2 w-1.5 h-1.5 border-t border-r ${pkg.surveyColor}`}></div>
                <div className={`absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l ${pkg.surveyColor}`}></div>
                <div className={`absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r ${pkg.surveyColor}`}></div>

                <h3 className={`font-mono text-[11px] font-black tracking-[0.2em] uppercase mb-2 ${pkg.textColor}`}>
                  {pkg.name}
                </h3>
                <div className={`flex items-baseline justify-center font-mono ${pkg.textColor}`}>
                  <span className="text-3xl font-extrabold">₹ {pkg.price}</span>
                  <span className={`text-[10px] ml-1 font-semibold ${pkg.accentColor}`}>/ sqft</span>
                </div>
              </div>

              {/* Card Body - Accordion categories */}
              <div className="p-5 flex-grow bg-white flex flex-col justify-between">
                <div className="space-y-0">
                  {pkg.categories.map((cat, idx) => {
                    const isOpen = !!openSections[`${pkg.id}-${cat.title}`];
                    return (
                      <div
                        key={idx}
                        className="border-b border-neutral-200/80 py-2.5 font-sans"
                      >
                        {/* Toggle Bar */}
                        <div
                          onClick={() => toggleSection(pkg.id, cat.title)}
                          className="flex justify-between items-center cursor-pointer py-1 group select-none text-neutral-800 hover:text-[#ff6200] transition-colors"
                        >
                          <span className="font-bold text-[12.5px] tracking-wide">
                            {cat.title}
                          </span>
                          <span className="text-neutral-400 group-hover:text-[#ff6200] transition-colors">
                            {isOpen ? (
                              <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                            ) : (
                              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            )}
                          </span>
                        </div>

                        {/* Accordion Content */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isOpen ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <ul className="pl-4 pr-1 py-1 space-y-1.5 text-neutral-600 list-disc text-[11px] leading-relaxed select-text">
                            {cat.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="marker:text-[#ff6200]">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Card Button */}
                <div className="mt-8 flex justify-center w-full">
                  <button
                    onClick={() => handleCtaClick(pkg.name)}
                    className={`${pkg.buttonBg} w-full py-3.5 font-mono text-[10.5px] font-bold tracking-widest rounded-xl shadow-md transition-all duration-300 uppercase hover:scale-[1.02] active:scale-[0.98] cursor-pointer`}
                  >
                    Get Detailed Specification
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
