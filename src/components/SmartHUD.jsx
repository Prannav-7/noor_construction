import React from 'react';
import { Sun, Droplet, Clock, Shield } from 'lucide-react';

export default function SmartHUD({ 
  buildType, 
  setBuildType, 
  sqFt, 
  setSqFt, 
  smartLevel, 
  setSmartLevel, 
  greenGrade, 
  setGreenGrade, 
  estimates, 
  setAllocationModal 
}) {
  return (
    <section id="estimator" className="bg-[#ff4e00] text-white py-8 lg:py-12 px-6 h-full relative overflow-hidden">
      
      {/* Safety Stripe Header Bar */}
      <div className="safety-stripe-thin w-full h-[6px] absolute top-0 left-0 right-0 z-20"></div>

      {/* Blinds Shadow Overlay */}
      <div className="window-shadow-overlay absolute inset-0"></div>

      {/* Rebar pattern behind images */}
      <div className="absolute inset-0 rebar-pattern opacity-50"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 h-full">
        
        {/* Column 1 - Display Serif Title (Left) */}
        <div className="lg:col-span-3 reveal-on-scroll">
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-[#4c1300] leading-none mb-1">
            Smart HUD
          </h2>
          <h2 className="font-serif italic font-normal text-4xl md:text-5xl text-[#4c1300] leading-none">
            estimator.
          </h2>

          {/* "Approved" Stamp Watermark */}
          <div className="mt-8 stamp-seal border-[#4c1300] text-[#4c1300]">
            APPROVED<br/>FOR<br/>CONSTRUCTION
          </div>
        </div>

        {/* Column 2 - Staggered Vertical Photo Collage (Middle) */}
        <div className="lg:col-span-5 flex justify-center reveal-on-scroll">
          <div className="grid grid-cols-3 gap-3 w-full max-w-[420px] items-start relative">
            
            {/* Col 1 */}
            <div className="flex flex-col gap-3">
              <div className="aspect-[3/4] w-full rounded overflow-hidden bg-neutral-900 border border-white/10 pin-mark">
                <img src="/rough_coastal_villa.png" alt="Build aspect" className="w-full h-full object-cover opacity-90" />
              </div>
              <div className="aspect-square w-full rounded overflow-hidden bg-neutral-900 border border-white/10 pin-mark">
                <img src="/rough_smart_home.png" alt="Build aspect" className="w-full h-full object-cover opacity-90" />
              </div>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-3 mt-4">
              <div className="aspect-square w-full rounded overflow-hidden bg-neutral-900 border border-white/10 pin-mark">
                <img src="/rough_tech_park.png" alt="Build aspect" className="w-full h-full object-cover opacity-90" />
              </div>
              <div className="aspect-[3/4] w-full rounded overflow-hidden bg-neutral-900 border border-white/10 pin-mark">
                <img src="/rough_skyscraper.png" alt="Build aspect" className="w-full h-full object-cover opacity-90" />
              </div>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-3">
              <div className="aspect-[3/4] w-full rounded overflow-hidden bg-neutral-900 border border-white/10 pin-mark">
                <img src="/rough_coastal_villa.png" alt="Build aspect" className="w-full h-full object-cover opacity-90" />
              </div>
              <div className="aspect-square w-full rounded overflow-hidden bg-neutral-900 border border-white/10 pin-mark">
                <img src="/rough_smart_home.png" alt="Build aspect" className="w-full h-full object-cover opacity-90" />
              </div>
            </div>

          </div>
        </div>

        {/* Column 3 - Interactive Sliders & Live Estimates (Right) */}
        <div className="lg:col-span-4 reveal-on-scroll">
          <div className="space-y-6">
            
            {/* Telemetry metadata header */}
            <div className="grid grid-cols-1 gap-2 font-mono text-[11px] text-white border-b border-white/10 pb-4 w-full">
              <div className="flex justify-between items-baseline">
                <span className="text-white/80 uppercase tracking-widest font-bold">Simulator Core</span>
                <span>: V5.0 Active</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-white/80 uppercase tracking-widest font-bold">Estimation Code</span>
                <span>: HUD_EST_09</span>
              </div>
            </div>

            {/* Slider Configurator Inputs */}
            <div className="space-y-5 pt-2 font-sans text-sm">
              
              {/* Footprint */}
              <div>
                <div className="flex justify-between items-center font-mono text-[11px] mb-1.5">
                  <span className="text-white/90 font-semibold">FOOTPRINT:</span>
                  <span key={sqFt} className="text-white font-bold animate-recalc">{sqFt.toLocaleString()} SQ FT</span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="10000" 
                  step="100"
                  value={sqFt} 
                  onChange={(e) => setSqFt(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-none appearance-none cursor-pointer accent-white"
                />
              </div>

              {/* Smart Tiers */}
              <div>
                <div className="flex justify-between items-center font-mono text-[11px] mb-1.5">
                  <span className="text-white/90 font-semibold">TELEMETRY:</span>
                  <span key={smartLevel} className="text-white font-bold animate-recalc">{smartLevel}% INTEGRATED</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  step="5"
                  value={smartLevel} 
                  onChange={(e) => setSmartLevel(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-none appearance-none cursor-pointer accent-white"
                />
              </div>

              {/* Grade selector radio tabs */}
              <div>
                <label className="block font-mono text-[10px] text-white/90 tracking-widest mb-2 font-semibold">SUSTAINABILITY GRADE</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'standard', label: 'STANDARD' },
                    { key: 'platinum', label: 'PLATINUM' },
                    { key: 'netzero', label: 'NET-ZERO' }
                  ].map((grade) => (
                    <button
                      key={grade.key}
                      type="button"
                      onClick={() => setGreenGrade(grade.key)}
                      className={`py-2 rounded-none border font-mono text-[10px] tracking-widest font-semibold transition-all ${
                        greenGrade === grade.key
                          ? 'border-white text-black bg-white'
                          : 'border-white/20 text-white hover:border-white/50 bg-transparent'
                      }`}
                    >
                      {grade.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Calculations results */}
            <div className="border-t border-white/10 pt-4 mt-4 font-mono text-[11px] space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-white/80 uppercase tracking-widest font-bold">ESTIMATED CAPITAL</span>
                <span key={estimates.cost} className="text-xl font-bold text-white animate-recalc">₹{estimates.cost} Lakhs</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-white/80 uppercase tracking-widest font-bold">SOLAR YIELD</span>
                <span key={estimates.energy} className="text-white font-bold animate-recalc">{estimates.energy} kWp</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-white/80 uppercase tracking-widest font-bold">CARBON OFFSET</span>
                <span key={estimates.carbon} className="text-white font-bold animate-recalc">{estimates.carbon} T/Yr</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-white/80 uppercase tracking-widest font-bold">BUILD TIMELINE</span>
                <span key={estimates.timeline} className="text-white font-bold animate-recalc">{estimates.timeline} Months</span>
              </div>
            </div>

            {/* CTA action trigger */}
            <button 
              onClick={() => setAllocationModal(true)}
              className="w-full py-3 bg-white text-[#ff4e00] hover:bg-neutral-100 transition-all font-mono text-[11px] font-bold tracking-widest rounded-none mt-2 steel-beam-border border-white"
            >
              TRANSMIT ALLOCATION DEED
            </button>

          </div>
        </div>

      </div>

      {/* Safety Stripe Bottom Bar */}
      <div className="safety-stripe-thin w-full h-[6px] absolute bottom-0 left-0 right-0 z-20"></div>
    </section>
  );
}
