import React, { useState } from 'react';
import { Sun, Droplet, Clock, Shield, Coins, FileSpreadsheet, Ruler, Leaf } from 'lucide-react';

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

function BentoCard({ children, className = '' }) {
  return (
    <div className={`relative h-full w-full overflow-hidden rounded-2xl p-4 bg-white border border-neutral-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#ff6200]/20 ${className}`}>
      {children}
    </div>
  );
}

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
    <section id="estimator" className="text-[#1c1c1f] lg:min-h-screen flex flex-col justify-center py-10 lg:py-12 px-4 md:px-8 relative" style={{ background: '#FED8B1' }}>

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

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT COLUMN: Bento grid & HUD controls (Span 5) */}
        <div className="lg:col-span-5 space-y-5 reveal-on-scroll">
          <div>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-[#ff6200] leading-none mb-1">
              Smart HUD
            </h2>
            <h2 className="font-serif italic font-normal text-3xl md:text-4xl text-neutral-800 leading-none">
              estimator.
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* FeatureOne: Slider & Active Project Alignment (Row span 2) */}
            <BentoCard className="sm:row-span-2 flex flex-col justify-between">
              {/* Active Project Alignment */}
              <div className="mb-4">
                <span className="font-mono text-[8px] text-neutral-500 tracking-widest block mb-2 font-bold uppercase">// ACTIVE PROJECT</span>
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0 relative">
                    <img src={packageDetails.image} alt={packageDetails.name} className="w-full h-full object-cover opacity-90" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-sans font-bold text-[11px] text-neutral-900 truncate">{packageDetails.name}</h4>
                    <p className="font-mono text-[9px] text-[#ff6200] font-bold mt-0.5">₹{currentRate.toLocaleString('en-IN')}/SQFT</p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-neutral-100 my-3" />

              {/* Area Estimator Meter */}
              <div>
                <span className="font-mono text-[8px] text-neutral-500 tracking-widest block mb-2 font-bold uppercase">// AREA ESTIMATOR METER</span>
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <span className="font-mono text-lg font-extrabold text-neutral-800 leading-none">{sliderSqft.toLocaleString()}</span>
                    <span className="font-mono text-[9px] text-neutral-500 ml-0.5">SQFT</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-[#ff6200]">₹{((sliderSqft * currentRate) / 100000).toFixed(2)}</span>
                    <span className="font-mono text-[9px] text-neutral-500 ml-0.5">LAKHS</span>
                  </div>
                </div>

                <div className="relative flex items-center mb-2">
                  <div className="absolute left-0 right-0 h-1 rounded bg-neutral-200"></div>
                  <div className="absolute left-0 h-1 rounded" style={{ width: `${sliderPercent}%`, background: 'linear-gradient(90deg, #ff8c39, #ff6200)' }}></div>
                  <input
                    type="range"
                    min={SQFT_MIN}
                    max={SQFT_MAX}
                    step="50"
                    value={sliderSqft}
                    onChange={(e) => setSliderSqft(Number(e.target.value))}
                    className="hud-slider relative z-10 w-full"
                  />
                </div>

                <div className="flex justify-between font-mono text-[8px] text-neutral-500">
                  <span>{SQFT_MIN.toLocaleString()} sqft</span>
                  <span>{SQFT_MAX.toLocaleString()} sqft</span>
                </div>
              </div>
            </BentoCard>

            {/* FeatureTwo: Total Valuation */}
            <BentoCard className="flex flex-col justify-between">
              <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-neutral-500">// EST. VALUATION</span>
              <div className="mt-2 text-2xl font-black text-[#ff6200] leading-none whitespace-nowrap animate-recalc">
                ₹{estimates.cost} <span className="text-[10px] font-mono font-bold text-neutral-500">LAKHS</span>
              </div>
              <div className="mt-2 text-[9px] font-mono text-neutral-550">
                Total: ₹{estimates.totalCostInRs.toLocaleString('en-IN')}
              </div>
            </BentoCard>

            {/* FeatureThree: Telemetry Breakdown */}
            <BentoCard className="flex flex-col gap-2">
              <span className="font-mono text-[8px] font-semibold uppercase tracking-wider text-neutral-500">// TELEMETRY</span>
              <div className="space-y-1.5">
                <div className="flex w-full items-center gap-1.5">
                  <Clock size={11} className="text-[#ff6200]" />
                  <span className="text-[9px] text-neutral-650 font-mono">Timeline</span>
                  <span className="ml-auto text-[10px] font-black text-neutral-900 font-mono">{estimates.timeline} Mos</span>
                </div>
                <div className="flex w-full items-center gap-1.5">
                  <Sun size={11} className="text-amber-500" />
                  <span className="text-[9px] text-neutral-650 font-mono">Solar Yield</span>
                  <span className="ml-auto text-[10px] font-black text-neutral-900 font-mono">{estimates.energy} kWp</span>
                </div>
                <div className="flex w-full items-center gap-1.5">
                  <Leaf size={11} className="text-green-500" />
                  <span className="text-[9px] text-neutral-650 font-mono">Carbon Offset</span>
                  <span className="ml-auto text-[10px] font-black text-neutral-900 font-mono">{estimates.carbon} T/Yr</span>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Mini Trust Stats */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-white border border-neutral-200 rounded p-2.5 text-center shadow-sm">
              <div className="font-mono font-bold text-neutral-900 text-lg leading-none">12+</div>
              <div className="font-mono text-[8px] text-neutral-450 uppercase tracking-widest mt-0.5">Certified Engineers</div>
            </div>
            <div className="bg-white border border-neutral-200 rounded p-2.5 text-center shadow-sm">
              <div className="font-mono font-bold text-neutral-900 text-lg leading-none">6+</div>
              <div className="font-mono text-[8px] text-neutral-450 uppercase tracking-widest mt-0.5">Happy Customers</div>
            </div>
            <div className="bg-white border border-neutral-200 rounded p-2.5 text-center shadow-sm">
              <div className="font-mono font-bold text-neutral-900 text-lg leading-none">10yr</div>
              <div className="font-mono text-[8px] text-neutral-450 uppercase tracking-widest mt-0.5">Structure Warranty</div>
            </div>
            <div className="bg-white border border-neutral-200 rounded p-2.5 text-center shadow-sm">
              <div className="font-mono font-bold text-neutral-900 text-lg leading-none">ISO</div>
              <div className="font-mono text-[8px] text-neutral-450 uppercase tracking-widest mt-0.5">Quality Certified</div>
            </div>
          </div>

          {/* CTA Action */}
          <button
            onClick={() => setAllocationModal(true)}
            className="w-full py-4 bg-[#ff6200] text-white hover:bg-[#e05600] transition-all font-mono text-xs font-bold tracking-widest rounded shadow-md hover:shadow-lg active:scale-[0.98] transition-transform steel-beam-border border-transparent flex items-center justify-center gap-2 cursor-pointer"
          >
            <Coins className="w-4 h-4" />
            TRANSMIT ALLOCATION DEED
          </button>

          {/* Approved Stamp Watermark */}
          <div className="flex justify-center pt-1">
            <div className="stamp-seal border-[#ff6200] text-[#ff6200] opacity-85">
              APPROVED<br />FOR<br />CONSTRUCTION
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Construction Cost Calculator Spreadsheet (Span 7) */}
        <div className="lg:col-span-7 reveal-on-scroll">
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
            <div className="flex items-center gap-3 bg-neutral-50 border-b border-neutral-200 px-1 py-2 mb-3 -mx-4 md:-mx-5 px-4 md:px-5">
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
                    <td className="py-3 px-3 text-right font-mono text-sm text-[#ff6200]">
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
