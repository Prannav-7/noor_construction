import React, { useState } from 'react';
import { Sun, Droplet, Clock, Shield, Coins, FileSpreadsheet, Ruler } from 'lucide-react';

const PACKAGES = {
  luminosity: {
    rate: 4500,
    name: 'Noor Luminosity Villa Package @ ₹4,500/sqft',
    desc: 'Futuristic Eco-Living (Villas & Premium Residences)',
    image: '/coastal_villa.png'
  },
  nova: {
    rate: 3800,
    name: 'Nova Apex Smart Home Package @ ₹3,800/sqft',
    desc: 'High-Density Decarbonized Living (Apartments & Custom Homes)',
    image: '/smart_home.png'
  },
  helix: {
    rate: 5800,
    name: 'Tech-Helix Corporate Package @ ₹5,800/sqft',
    desc: 'Heavy Structural Commercial Nexus (Offices & Tech Parks)',
    image: '/tech_park.png'
  },
  oceanic: {
    rate: 6500,
    name: 'Oceanic Horizon Net-Zero Package @ ₹6,500/sqft',
    desc: 'Marine-Grade Off-Grid Luxury (Coastal & High-Exposure)',
    image: '/coastal_villa.png'
  }
};

const SQFT_MIN = 1500;
const SQFT_MAX = 4500;

export default function SmartHUD({
  calculator,
  updateCalculator,
  estimates,
  setAllocationModal
}) {
  const [sliderSqft, setSliderSqft] = useState(2000);
  const currentPackage = calculator.package;
  const packageDetails = PACKAGES[currentPackage] || PACKAGES.luminosity;
  const currentRate = packageDetails.rate;

  // Meter derived values
  const sliderPrice = sliderSqft * currentRate;
  const sliderPercent = ((sliderSqft - SQFT_MIN) / (SQFT_MAX - SQFT_MIN)) * 100;

  // Row total calculations
  const getGroundTotal = () => Number(calculator.groundFloor || 0) * currentRate;
  const getFirstTotal = () => Number(calculator.firstFloor || 0) * currentRate;
  const getSecondTotal = () => Number(calculator.secondFloor || 0) * currentRate;
  const getThirdTotal = () => Number(calculator.thirdFloor || 0) * currentRate;
  const getFourthTotal = () => Number(calculator.fourthFloor || 0) * currentRate;
  const getSumpTotal = () => Number(calculator.waterSump || 0) * 24;
  const getSepticTotal = () => Number(calculator.septicTank || 0) * 24;
  const getCompoundTotal = () => {
    const area = Number(calculator.compoundLength || 0) * Number(calculator.compoundHeight || 0);
    return area * 400;
  };

  const totalCost = estimates.totalCostInRs;

  return (
    <section id="estimator" className="bg-[#ff4e00] text-white py-16 lg:py-20 px-4 md:px-8 relative overflow-hidden">

      {/* Safety Stripe Header Bar */}
      <div className="safety-stripe-thin w-full h-[6px] absolute top-0 left-0 right-0 z-20"></div>

      {/* Hide number input spin buttons */}
      <style>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>

      {/* Blinds Shadow Overlay */}
      <div className="window-shadow-overlay absolute inset-0 pointer-events-none"></div>

      {/* Rebar pattern behind everything */}
      <div className="absolute inset-0 rebar-pattern opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT COLUMN: Section Title, Project Spotlight & Telemetry (Span 4) */}
        <div className="lg:col-span-4 space-y-6 reveal-on-scroll">
          <div>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-[#4c1300] leading-none mb-1">
              Smart HUD
            </h2>
            <h2 className="font-serif italic font-normal text-3xl md:text-4xl text-[#4c1300] leading-none">
              estimator.
            </h2>
          </div>

          {/* Project Spotlight linked to selected package */}
          <div className="bg-[#4c1300]/10 border border-[#4c1300]/20 rounded p-4 relative overflow-hidden backdrop-blur-sm">
            <span className="font-mono text-[9px] text-white/70 tracking-widest block mb-2 font-bold uppercase">// ACTIVE PROJECT ALIGNMENT</span>

            <div className="flex gap-4 items-center">
              <div className="w-20 h-20 rounded bg-neutral-900 border border-white/10 overflow-hidden shrink-0 relative pin-mark">
                <img
                  src={packageDetails.image}
                  alt={packageDetails.label}
                  className="w-full h-full object-cover opacity-90 transition-all duration-500"
                />
              </div>
              <div>
                <h4 className="font-sans font-bold text-sm text-white">{packageDetails.label}</h4>
                <p className="font-sans text-[11px] text-white/80 leading-snug mt-1">{packageDetails.desc}</p>
              </div>
            </div>

            <div className="mt-3.5 pt-3 border-t border-white/10 font-mono text-[10px] text-white/70 flex justify-between">
              <span>UNIT SPEC RATE:</span>
              <span className="font-bold text-white">₹{currentRate.toLocaleString('en-IN')}/SQFT</span>
            </div>
          </div>

          {/* Live Telemetry Display */}
          <div className="bg-black/10 border border-white/10 rounded p-4 font-mono text-[10px] space-y-2.5 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="text-white/70 uppercase tracking-wider font-bold shrink-0">EST. VALUATION</span>
              <span key={estimates.cost} className="text-lg font-bold text-white animate-recalc whitespace-nowrap">₹{estimates.cost} Lakhs</span>
            </div>
            <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-2">
              <span className="text-white/70 uppercase tracking-wider font-bold shrink-0">TIMELINE</span>
              <span key={estimates.timeline} className="text-white font-bold animate-recalc whitespace-nowrap">{estimates.timeline} Months</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-white/70 uppercase tracking-wider font-bold shrink-0">SOLAR YIELD</span>
              <span key={estimates.energy} className="text-white font-bold animate-recalc whitespace-nowrap">{estimates.energy} kWp</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-white/70 uppercase tracking-wider font-bold shrink-0">CARBON OFFSET</span>
              <span key={estimates.carbon} className="text-white font-bold animate-recalc whitespace-nowrap">{estimates.carbon} T/Yr</span>
            </div>
          </div>

          {/* ── SQFT / PRICE METER SLIDER ── */}
          <div className="bg-black/15 border border-white/15 rounded p-4 backdrop-blur-sm relative overflow-hidden">
            {/* Label row */}
            <div className="flex items-center gap-2 mb-3">
              <Ruler className="w-3.5 h-3.5 text-white/70" />
              <span className="font-mono text-[9px] text-white/70 tracking-widest font-bold uppercase">// Area Estimator Meter</span>
            </div>

            {/* Live display: two big values side by side */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {/* SQFT */}
              <div className="bg-black/20 rounded p-3 border border-white/10 text-center flex flex-col items-center justify-center gap-0.5">
                <div className="font-mono text-[8px] text-white/50 uppercase tracking-widest">Built Area</div>
                <div className="font-mono font-bold text-white text-2xl leading-none">
                  {sliderSqft.toLocaleString('en-IN')}
                </div>
                <div className="font-mono text-[9px] text-white/60">sqft</div>
              </div>
              {/* PRICE */}
              <div className="bg-black/20 rounded p-3 border border-white/10 text-center flex flex-col items-center justify-center gap-0.5">
                <div className="font-mono text-[8px] text-white/50 uppercase tracking-widest">Est. Cost</div>
                <div className="font-mono font-bold text-white text-xl leading-none">
                  ₹{(sliderPrice / 100000).toFixed(1)}L
                </div>
                <div className="font-mono text-[9px] text-white/60">approx</div>
              </div>
            </div>

            {/* Slider track + thumb */}
            <div className="relative h-5 flex items-center">
              {/* Background track */}
              <div className="absolute inset-x-0 top-1/2 h-[4px] rounded-full bg-white/20 -translate-y-1/2 pointer-events-none" />
              {/* Filled track */}
              <div
                className="absolute left-0 top-1/2 h-[4px] rounded-full -translate-y-1/2 pointer-events-none transition-all duration-100"
                style={{
                  width: `${sliderPercent}%`,
                  background: 'linear-gradient(90deg, #ff7832, #ffb347)'
                }}
              />
              <input
                id="sqft-meter-slider"
                type="range"
                min={SQFT_MIN}
                max={SQFT_MAX}
                step={50}
                value={sliderSqft}
                onChange={(e) => setSliderSqft(Number(e.target.value))}
                className="hud-slider w-full relative z-10"
                style={{ background: 'transparent' }}
              />
            </div>

            {/* Min / Max labels */}
            <div className="flex justify-between font-mono text-[8px] text-white/40 mt-1">
              <span>{SQFT_MIN.toLocaleString()} sqft</span>
              <span>{SQFT_MAX.toLocaleString()} sqft</span>
            </div>
          </div>

          {/* ── Mini Trust Stats ── */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-black/15 border border-white/15 rounded p-3 text-center backdrop-blur-sm">
              <div className="font-mono font-bold text-white text-2xl leading-none">12+</div>
              <div className="font-mono text-[8px] text-white/50 uppercase tracking-widest mt-1">Certified Engineers</div>
            </div>
            <div className="bg-black/15 border border-white/15 rounded p-3 text-center backdrop-blur-sm">
              <div className="font-mono font-bold text-white text-2xl leading-none">6+</div>
              <div className="font-mono text-[8px] text-white/50 uppercase tracking-widest mt-1">Happy Customers</div>
            </div>
            <div className="bg-black/15 border border-white/15 rounded p-3 text-center backdrop-blur-sm">
              <div className="font-mono font-bold text-white text-2xl leading-none">10yr</div>
              <div className="font-mono text-[8px] text-white/50 uppercase tracking-widest mt-1">Structure Warranty</div>
            </div>
            <div className="bg-black/15 border border-white/15 rounded p-3 text-center backdrop-blur-sm">
              <div className="font-mono font-bold text-white text-2xl leading-none">ISO</div>
              <div className="font-mono text-[8px] text-white/50 uppercase tracking-widest mt-1">Quality Certified</div>
            </div>
          </div>

          {/* CTA Action */}
          <button
            onClick={() => setAllocationModal(true)}
            className="w-full py-4 bg-white text-[#ff4e00] hover:bg-neutral-50 transition-all font-mono text-xs font-bold tracking-widest rounded-none shadow-lg hover:shadow-xl active:scale-[0.98] transition-transform steel-beam-border border-white flex items-center justify-center gap-2"
          >
            <Coins className="w-4 h-4" />
            TRANSMIT ALLOCATION DEED
          </button>

          {/* Approved Stamp Watermark */}
          <div className="flex justify-center pt-2">
            <div className="stamp-seal border-white text-white opacity-85">
              APPROVED<br />FOR<br />CONSTRUCTION
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Construction Cost Calculator Spreadsheet (Span 8) */}
        <div className="lg:col-span-8 reveal-on-scroll">
          <div className="bg-white text-black rounded shadow-2xl p-4 md:p-5 border border-black/10 relative overflow-hidden rivet-corners">

            {/* Corner Ticks inside the sheet */}
            <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-black/20"></div>
            <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-black/20"></div>
            <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-black/20"></div>
            <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-black/20"></div>

            {/* Header — Title Row */}
            <div className="flex items-center gap-3 pb-3 border-b border-neutral-100 mb-0">
              <div className="w-9 h-9 rounded bg-[#ff4e00]/10 flex items-center justify-center shrink-0">
                <FileSpreadsheet className="w-5 h-5 text-[#ff4e00]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-mono font-bold text-sm uppercase tracking-tight text-neutral-900 leading-none">
                  Construction Cost Calculator
                </h3>
                <p className="font-sans text-[11px] text-neutral-400 mt-0.5 truncate">
                  Arrive at your premium construction estimate dynamically
                </p>
              </div>
            </div>

            {/* Package Selector Bar */}
            <div className="flex items-center gap-3 bg-neutral-50 border-b border-neutral-200 px-1 py-2.5 mb-4 -mx-4 md:-mx-5 px-4 md:px-5">
              <span className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-widest shrink-0">Package:</span>
              <select
                value={currentPackage}
                onChange={(e) => updateCalculator('package', e.target.value)}
                className="flex-1 min-w-0 px-2.5 py-1.5 border border-neutral-200 rounded text-[11px] font-sans font-semibold bg-white focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00] text-neutral-800 cursor-pointer"
              >
                <option value="luminosity">Luminosity Villa — ₹4,500/sqft</option>
                <option value="nova">Nova Apex Smart Home — ₹3,800/sqft</option>
                <option value="helix">Tech-Helix Corporate — ₹5,800/sqft</option>
                <option value="oceanic">Oceanic Net-Zero — ₹6,500/sqft</option>
              </select>
              <span className="font-mono text-[10px] font-bold text-[#ff4e00] shrink-0 whitespace-nowrap">
                ₹{currentRate.toLocaleString('en-IN')}<span className="text-neutral-400 font-normal">/sqft</span>
              </span>
            </div>

            {/* Mobile View List (visible only on mobile) */}
            <div className="block md:hidden space-y-3.5">
              {/* Ground Floor */}
              <div className="flex items-center justify-between gap-3 py-3 border-b border-neutral-100">
                <div className="flex-1 min-w-0">
                  <div className="font-sans font-bold text-xs text-neutral-800 break-words">Ground Floor Built-up Area</div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-0.5">Rate: ₹{currentRate.toLocaleString('en-IN')}/sqft</div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      placeholder="Area"
                      value={calculator.groundFloor || ''}
                      onChange={(e) => updateCalculator('groundFloor', e.target.value)}
                      className="w-24 px-2 py-1 text-center font-mono text-xs border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                    />
                    <span className="text-[10px] text-neutral-500 font-mono w-7">sqft</span>
                  </div>
                  <div className="font-mono text-[11px] font-bold text-neutral-900">
                    ₹{getGroundTotal().toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* First Floor */}
              <div className="flex items-center justify-between gap-3 py-3 border-b border-neutral-100">
                <div className="flex-1 min-w-0">
                  <div className="font-sans font-bold text-xs text-neutral-800 break-words">First Floor Built-up Area</div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-0.5">Rate: ₹{currentRate.toLocaleString('en-IN')}/sqft</div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      placeholder="Area"
                      value={calculator.firstFloor || ''}
                      onChange={(e) => updateCalculator('firstFloor', e.target.value)}
                      className="w-24 px-2 py-1 text-center font-mono text-xs border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                    />
                    <span className="text-[10px] text-neutral-500 font-mono w-7">sqft</span>
                  </div>
                  <div className="font-mono text-[11px] font-bold text-neutral-900">
                    ₹{getFirstTotal().toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Second Floor */}
              <div className="flex items-center justify-between gap-3 py-3 border-b border-neutral-100">
                <div className="flex-1 min-w-0">
                  <div className="font-sans font-bold text-xs text-neutral-800 break-words">Second Floor Built-up Area</div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-0.5">Rate: ₹{currentRate.toLocaleString('en-IN')}/sqft</div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      placeholder="Area"
                      value={calculator.secondFloor || ''}
                      onChange={(e) => updateCalculator('secondFloor', e.target.value)}
                      className="w-24 px-2 py-1 text-center font-mono text-xs border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                    />
                    <span className="text-[10px] text-neutral-500 font-mono w-7">sqft</span>
                  </div>
                  <div className="font-mono text-[11px] font-bold text-neutral-900">
                    ₹{getSecondTotal().toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Third Floor */}
              <div className="flex items-center justify-between gap-3 py-3 border-b border-neutral-100">
                <div className="flex-1 min-w-0">
                  <div className="font-sans font-bold text-xs text-neutral-800 break-words">Third Floor Built-up Area</div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-0.5">Rate: ₹{currentRate.toLocaleString('en-IN')}/sqft</div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      placeholder="Area"
                      value={calculator.thirdFloor || ''}
                      onChange={(e) => updateCalculator('thirdFloor', e.target.value)}
                      className="w-24 px-2 py-1 text-center font-mono text-xs border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                    />
                    <span className="text-[10px] text-neutral-500 font-mono w-7">sqft</span>
                  </div>
                  <div className="font-mono text-[11px] font-bold text-neutral-900">
                    ₹{getThirdTotal().toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Fourth Floor */}
              <div className="flex items-center justify-between gap-3 py-3 border-b border-neutral-100">
                <div className="flex-1 min-w-0">
                  <div className="font-sans font-bold text-xs text-neutral-800 break-words">Fourth Floor Built-up Area</div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-0.5">Rate: ₹{currentRate.toLocaleString('en-IN')}/sqft</div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      placeholder="Area"
                      value={calculator.fourthFloor || ''}
                      onChange={(e) => updateCalculator('fourthFloor', e.target.value)}
                      className="w-24 px-2 py-1 text-center font-mono text-xs border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                    />
                    <span className="text-[10px] text-neutral-500 font-mono w-7">sqft</span>
                  </div>
                  <div className="font-mono text-[11px] font-bold text-neutral-900">
                    ₹{getFourthTotal().toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* RCC Water Sump Size */}
              <div className="flex items-center justify-between gap-3 py-3 border-b border-neutral-100">
                <div className="flex-1 min-w-0">
                  <div className="font-sans font-bold text-xs text-neutral-800 break-words">RCC Water Sump Size</div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-0.5">Rate: ₹24/ltr</div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      placeholder="Liters"
                      value={calculator.waterSump || ''}
                      onChange={(e) => updateCalculator('waterSump', e.target.value)}
                      className="w-24 px-2 py-1 text-center font-mono text-xs border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                    />
                    <span className="text-[10px] text-neutral-500 font-mono w-7">ltr</span>
                  </div>
                  <div className="font-mono text-[11px] font-bold text-neutral-900">
                    ₹{getSumpTotal().toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* RCC Septic Tank Size */}
              <div className="flex items-center justify-between gap-3 py-3 border-b border-neutral-100">
                <div className="flex-1 min-w-0">
                  <div className="font-sans font-bold text-xs text-neutral-800 break-words">RCC Septic Tank Size</div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-0.5">Rate: ₹24/ltr</div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      placeholder="Liters"
                      value={calculator.septicTank || ''}
                      onChange={(e) => updateCalculator('septicTank', e.target.value)}
                      className="w-24 px-2 py-1 text-center font-mono text-xs border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                    />
                    <span className="text-[10px] text-neutral-500 font-mono w-7">ltr</span>
                  </div>
                  <div className="font-mono text-[11px] font-bold text-neutral-900">
                    ₹{getSepticTotal().toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Compound Wall Size */}
              <div className="flex items-center justify-between gap-3 py-3 border-b border-neutral-100">
                <div className="flex-1 min-w-0">
                  <div className="font-sans font-bold text-xs text-neutral-800 break-words">Compound Wall Size</div>
                  <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                    Rate: ₹400/sqft | Area: {(Number(calculator.compoundLength || 0) * Number(calculator.compoundHeight || 0)).toLocaleString()} sqft
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      placeholder="L"
                      value={calculator.compoundLength || ''}
                      onChange={(e) => updateCalculator('compoundLength', e.target.value)}
                      className="w-12 px-1 py-1 text-center font-mono text-xs border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                    />
                    <span className="text-neutral-400 font-mono text-[10px]">×</span>
                    <input
                      type="number"
                      min="0"
                      placeholder="H"
                      value={calculator.compoundHeight || ''}
                      onChange={(e) => updateCalculator('compoundHeight', e.target.value)}
                      className="w-12 px-1 py-1 text-center font-mono text-xs border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                    />
                    <span className="text-[10px] text-neutral-500 font-mono w-7">ft</span>
                  </div>
                  <div className="font-mono text-[11px] font-bold text-neutral-900">
                    ₹{getCompoundTotal().toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Mobile Grand Total */}
              <div className="bg-neutral-50 p-3 rounded mt-4 border border-neutral-200 flex flex-col gap-1 items-end">
                <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 font-bold">Grand Total</div>
                <div className="font-mono text-base font-bold text-[#ff4e00]">
                  ₹{totalCost.toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-neutral-500 font-sans">
                  ({estimates.cost} Lakhs)
                </div>
              </div>
            </div>

            {/* Spreadsheet Table (Desktop/Tablet View) */}
            <div className="hidden md:block overflow-x-auto -mx-4 md:-mx-5">
              <table className="w-full text-left border-collapse text-xs font-sans min-w-[550px]">
                <thead>
                  <tr className="bg-neutral-50 border-t border-b border-neutral-200 text-neutral-700 font-mono text-[10px] font-bold uppercase tracking-wider">
                    <th className="py-2.5 px-3 w-[40%]">Type of Construction</th>
                    <th className="py-2.5 px-3 w-[20%] text-center">Area / Capacity</th>
                    <th className="py-2.5 px-3 w-[10%] text-center">Unit</th>
                    <th className="py-2.5 px-3 w-[15%] text-right">Price</th>
                    <th className="py-2.5 px-3 w-[15%] text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">

                  {/* Ground Floor */}
                  <tr className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2 px-3 font-semibold text-neutral-800">Ground Floor Built-up Area</td>
                    <td className="py-2 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        placeholder="Area in sqft"
                        value={calculator.groundFloor || ''}
                        onChange={(e) => updateCalculator('groundFloor', e.target.value)}
                        className="w-24 px-2 py-0.5 text-center font-mono border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                      />
                    </td>
                    <td className="py-2 px-3 text-center text-neutral-500 font-mono">sqft</td>
                    <td className="py-2 px-3 text-right text-neutral-700 font-mono">₹{currentRate.toLocaleString('en-IN')}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900">₹{getGroundTotal().toLocaleString('en-IN')}</td>
                  </tr>

                  {/* First Floor */}
                  <tr className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2 px-3 font-semibold text-neutral-800">First Floor Built-up Area</td>
                    <td className="py-2 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        placeholder="Area in sqft"
                        value={calculator.firstFloor || ''}
                        onChange={(e) => updateCalculator('firstFloor', e.target.value)}
                        className="w-24 px-2 py-0.5 text-center font-mono border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                      />
                    </td>
                    <td className="py-2 px-3 text-center text-neutral-500 font-mono">sqft</td>
                    <td className="py-2 px-3 text-right text-neutral-700 font-mono">₹{currentRate.toLocaleString('en-IN')}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900">₹{getFirstTotal().toLocaleString('en-IN')}</td>
                  </tr>

                  {/* Second Floor */}
                  <tr className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2 px-3 font-semibold text-neutral-800">Second Floor Built-up Area</td>
                    <td className="py-2 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        placeholder="Area in sqft"
                        value={calculator.secondFloor || ''}
                        onChange={(e) => updateCalculator('secondFloor', e.target.value)}
                        className="w-24 px-2 py-0.5 text-center font-mono border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                      />
                    </td>
                    <td className="py-2 px-3 text-center text-neutral-500 font-mono">sqft</td>
                    <td className="py-2 px-3 text-right text-neutral-700 font-mono">₹{currentRate.toLocaleString('en-IN')}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900">₹{getSecondTotal().toLocaleString('en-IN')}</td>
                  </tr>

                  {/* Third Floor */}
                  <tr className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2 px-3 font-semibold text-neutral-800">Third Floor Built-up Area</td>
                    <td className="py-2 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        placeholder="Area in sqft"
                        value={calculator.thirdFloor || ''}
                        onChange={(e) => updateCalculator('thirdFloor', e.target.value)}
                        className="w-24 px-2 py-0.5 text-center font-mono border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                      />
                    </td>
                    <td className="py-2 px-3 text-center text-neutral-500 font-mono">sqft</td>
                    <td className="py-2 px-3 text-right text-neutral-700 font-mono">₹{currentRate.toLocaleString('en-IN')}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900">₹{getThirdTotal().toLocaleString('en-IN')}</td>
                  </tr>

                  {/* Fourth Floor */}
                  <tr className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2 px-3 font-semibold text-neutral-800">Fourth Floor Built-up Area</td>
                    <td className="py-2 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        placeholder="Area in sqft"
                        value={calculator.fourthFloor || ''}
                        onChange={(e) => updateCalculator('fourthFloor', e.target.value)}
                        className="w-24 px-2 py-0.5 text-center font-mono border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                      />
                    </td>
                    <td className="py-2 px-3 text-center text-neutral-500 font-mono">sqft</td>
                    <td className="py-2 px-3 text-right text-neutral-700 font-mono">₹{currentRate.toLocaleString('en-IN')}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900">₹{getFourthTotal().toLocaleString('en-IN')}</td>
                  </tr>

                  {/* RCC Water Sump Size */}
                  <tr className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2 px-3 font-semibold text-neutral-800">RCC Water Sump Size</td>
                    <td className="py-2 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        placeholder="No. of Liters"
                        value={calculator.waterSump || ''}
                        onChange={(e) => updateCalculator('waterSump', e.target.value)}
                        className="w-24 px-2 py-0.5 text-center font-mono border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                      />
                    </td>
                    <td className="py-2 px-3 text-center text-neutral-500 font-mono">ltr</td>
                    <td className="py-2 px-3 text-right text-neutral-700 font-mono">₹24</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900">₹{getSumpTotal().toLocaleString('en-IN')}</td>
                  </tr>

                  {/* RCC Septic Tank Size */}
                  <tr className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2 px-3 font-semibold text-neutral-800">RCC Septic Tank Size</td>
                    <td className="py-2 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        placeholder="No. of Liters"
                        value={calculator.septicTank || ''}
                        onChange={(e) => updateCalculator('septicTank', e.target.value)}
                        className="w-24 px-2 py-0.5 text-center font-mono border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                      />
                    </td>
                    <td className="py-2 px-3 text-center text-neutral-500 font-mono">ltr</td>
                    <td className="py-2 px-3 text-right text-neutral-700 font-mono">₹24</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900">₹{getSepticTotal().toLocaleString('en-IN')}</td>
                  </tr>

                  {/* Compound Wall Size */}
                  <tr className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-2 px-3 font-semibold text-neutral-800">Compound Wall Size</td>
                    <td className="py-2 px-3 text-center">
                      <div className="flex gap-1 justify-center items-center">
                        <input
                          type="number"
                          min="0"
                          placeholder="L (ft)"
                          value={calculator.compoundLength || ''}
                          onChange={(e) => updateCalculator('compoundLength', e.target.value)}
                          className="w-14 px-1 py-0.5 text-center font-mono border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                        />
                        <span className="text-neutral-400 font-mono">×</span>
                        <input
                          type="number"
                          min="0"
                          placeholder="H (ft)"
                          value={calculator.compoundHeight || ''}
                          onChange={(e) => updateCalculator('compoundHeight', e.target.value)}
                          className="w-14 px-1 py-0.5 text-center font-mono border border-neutral-200 rounded focus:outline-none focus:border-[#ff4e00] focus:ring-1 focus:ring-[#ff4e00]"
                        />
                      </div>
                    </td>
                    <td className="py-2 px-3 text-center text-neutral-500 font-mono">
                      {(Number(calculator.compoundLength || 0) * Number(calculator.compoundHeight || 0)).toLocaleString()} sqft
                    </td>
                    <td className="py-2 px-3 text-right text-neutral-700 font-mono">₹400</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-neutral-900">₹{getCompoundTotal().toLocaleString('en-IN')}</td>
                  </tr>

                  {/* Grand Total Row */}
                  <tr className="bg-neutral-50 font-bold border-t-2 border-neutral-300">
                    <td colSpan="4" className="py-3 px-3 text-right font-mono text-xs uppercase tracking-wider text-neutral-800">
                      Grand Total:
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-sm text-[#ff4e00]">
                      ₹{totalCost.toLocaleString('en-IN')} <span className="text-[10px] text-neutral-500 font-normal">({estimates.cost} Lakhs)</span>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Stripe Bottom Bar */}
      <div className="safety-stripe-thin w-full h-[6px] absolute bottom-0 left-0 right-0 z-20"></div>
    </section>
  );
}
