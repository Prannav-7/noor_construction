import React from 'react';

export default function Ecosystem() {
  const stages = [
    {
      step: '01',
      title: 'BIM DIGITAL TWIN',
      image: '/rough_coastal_villa.png',
      desc: 'Millimeter-accurate pre-construction CAD mapping.'
    },
    {
      step: '02',
      title: 'CARBON-NEGATIVE BUILD',
      image: '/rough_smart_home.png',
      desc: 'Eco-concrete building materials & structural blocks.'
    },
    {
      step: '03',
      title: 'CYBERNETIC IOT MESH',
      image: '/rough_tech_park.png',
      desc: 'Embedded sensory mesh layers for real-time telemetry.'
    },
    {
      step: '04',
      title: 'FRACTIONAL DEED',
      image: '/rough_skyscraper.png',
      desc: 'Smart deeds registered on decentralized ledgers.'
    }
  ];

  return (
    <section id="ecosystem" className="blueprint-grid text-white py-8 lg:py-12 px-6 h-full flex flex-col items-center justify-center relative overflow-hidden blueprint-fold">

      {/* Fold crease top-left */}
      <div className="absolute top-0 left-0 w-[60px] h-[60px] bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none z-[3]"></div>

      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Row 1: Horizontal Image Grid with stage connector */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full mb-16 relative">
          {stages.map((stage, i) => (
            <div key={i} className="relative">
              {/* Stage card */}
              <div className="relative h-24 sm:h-28 lg:h-32 w-full bg-[#0d1f38] border border-[#1a3a5c]/50 overflow-hidden group">
                <img 
                  src={stage.image} 
                  alt={stage.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-101 transition-all duration-500"
                />
                {/* Bottom text overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a1628]/95 via-[#0a1628]/60 to-transparent p-4 flex flex-col justify-end">
                  <span className="font-mono text-[11px] text-[#ff4e00] tracking-widest font-bold mb-1">STAGE_{stage.step}</span>
                  <h4 className="font-mono text-[11px] text-white font-bold tracking-widest uppercase">{stage.title}</h4>
                </div>
              </div>

              {/* Circled Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#ff4e00] border-2 border-[#0a1628] flex items-center justify-center text-white font-mono text-[10px] font-bold z-10 shadow-lg shadow-orange-500/20">
                {stage.step}
              </div>

              {/* Connector dashed line (except last) */}
              {i < stages.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 w-4 border-t-2 border-dashed border-[#1a3a5c] z-5"></div>
              )}
            </div>
          ))}
        </div>

        {/* Row 2: Large Display Serif Title */}
        <div className="text-center mb-8">
          <h2 className="font-serif italic font-normal text-4xl md:text-5xl text-[#ff4e00] tracking-tight">
            Infrastructure Ecosystem
          </h2>
          <div className="w-24 h-[2px] bg-[#1a3a5c] mx-auto mt-4"></div>
        </div>

        {/* Row 3: Centered Description */}
        <div className="max-w-2xl text-center mx-auto mb-12">
          <p className="font-sans font-normal text-sm md:text-base text-[#8baac4] leading-relaxed">
            Millimeter-accurate synchronization of physical coordinates with BIM twin systems. Noor Infrastructure unifies sustainable green building blocks, dynamic IoT sensor grids, and secure fractional deed registries.
          </p>
        </div>

        {/* Row 4: Two-column key-value telemetry data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 font-mono text-[11px] max-w-lg mx-auto border-t border-[#1a3a5c]/50 pt-8 w-full">
          <div className="flex justify-between items-baseline border-b border-[#1a3a5c]/30 pb-1">
            <span className="text-[#5a8ab5] uppercase tracking-widest font-bold">Ecosystem Phase</span>
            <span className="text-white">: 05_Active Deployments</span>
          </div>
          <div className="flex justify-between items-baseline border-b border-[#1a3a5c]/30 pb-1">
            <span className="text-[#5a8ab5] uppercase tracking-widest font-bold">Registry Ledger</span>
            <span className="text-white">: ERC-721 Smart Deed</span>
          </div>
          <div className="flex justify-between items-baseline border-b border-[#1a3a5c]/30 pb-1">
            <span className="text-[#5a8ab5] uppercase tracking-widest font-bold">Audit Standard</span>
            <span className="text-white">: Net-Zero Alabaster</span>
          </div>
          <div className="flex justify-between items-baseline border-b border-[#1a3a5c]/30 pb-1">
            <span className="text-[#5a8ab5] uppercase tracking-widest font-bold">Location Focus</span>
            <span className="text-white">: ECR Corridor, Pudupattinam</span>
          </div>
        </div>

        {/* Blueprint revision tag */}
        <div className="text-center mt-10 font-mono text-[9px] text-[#1a3a5c] tracking-[0.3em]">
          REV. 05 — BLUEPRINT MASTER PLAN — SHEET 1 OF 4
        </div>

      </div>
    </section>
  );
}
