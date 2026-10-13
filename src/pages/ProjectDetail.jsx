import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Calendar, Ruler, Compass, Car,
  CheckCircle2, Clock, ChevronRight, Home, Building2, X, HardHat
} from 'lucide-react';
import { ALL_PROJECTS } from '../data/projects';

function ProgressRing({ value, size = 90 }) {
  const strokeWidth = 9;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const color = value === 100 ? '#22c55e' : value >= 70 ? '#ff6200' : '#ffa166';
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)' }}
      />
    </svg>
  );
}

export default function ProjectDetail({ setAllocationModal, setSelectedProject }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = ALL_PROJECTS.find(p => p.id === id);

  // Always scroll to top when this page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f6] gap-4">
        <h2 className="font-display font-extrabold text-3xl text-black">Project Not Found</h2>
        <button
          onClick={() => { window.scrollTo(0, 0); navigate('/'); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#ff6200] hover:bg-[#e05600] text-white rounded-lg font-mono text-xs font-bold tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      </div>
    );
  }

  const isDone = project.progress === 100;

  const handleBack = () => {
    navigate('/#projects');
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] font-sans">
      {/* ── TOP FLOATING BACK BUTTON ── */}
      <button
        onClick={handleBack}
        className="fixed top-20 sm:top-24 left-4 sm:left-6 z-50 flex items-center gap-2 px-3.5 py-1.5 bg-neutral-900/90 hover:bg-[#ff6200] text-white border border-white/20 rounded-full font-mono text-[10px] font-bold tracking-wider backdrop-blur-md shadow-xl transition-all cursor-pointer active:scale-95"
        aria-label="Back to projects"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-[#ff6200]" />
        <span>BACK</span>
      </button>

      {/* ── ARCHITECTURAL BLUEPRINT HERO BANNER (NO PHOTO) ── */}
      <div 
        className="relative h-[48vh] min-h-[340px] max-h-[520px] overflow-hidden p-6 md:p-12 flex flex-col justify-between"
        style={{ background: 'linear-gradient(135deg, #111116 0%, #1a1a24 60%, #121217 100%)' }}
      >
        {/* Technical Blueprint Grid Background */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 98, 0, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 98, 0, 0.35) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Blueprint CAD Vector Schematic Artwork in Background */}
        <div className="absolute right-4 sm:right-16 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden md:block">
          <svg viewBox="0 0 320 220" className="w-80 h-56 text-[#ff6200]" stroke="currentColor" fill="none" strokeWidth="1.2">
            <rect x="20" y="20" width="280" height="180" strokeDasharray="6 3" />
            <line x1="20" y1="90" x2="300" y2="90" />
            <line x1="160" y1="20" x2="160" y2="200" />
            <rect x="40" y="40" width="80" height="40" />
            <rect x="180" y="110" width="100" height="70" />
            <circle cx="230" cy="55" r="22" strokeDasharray="3 3" />
            <text x="30" y="15" fill="currentColor" fontSize="8" fontFamily="monospace">NCS STRUCTURAL ARCHITECTURE // METRIC 1:100</text>
            <text x="185" y="105" fill="currentColor" fontSize="7" fontFamily="monospace">ZONE-III SEISMIC MONOLITHIC FRAME</text>
          </svg>
        </div>

        {/* Corner Survey Registration Marks */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#ff6200]/40 pointer-events-none" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#ff6200]/40 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#ff6200]/40 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#ff6200]/40 pointer-events-none" />

        {/* Top Blueprint Data Header */}
        <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between pt-8 sm:pt-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-[#ff6200] tracking-widest uppercase bg-black/60 px-2.5 py-1 rounded border border-[#ff6200]/30 font-bold">
              CAD SPECIFICATION SHEET // DWG #{project.id?.toUpperCase()}-2026
            </span>
            <span className="hidden sm:inline-block font-mono text-[9px] text-neutral-400">
              SCALE: 1:100 METRIC
            </span>
          </div>
          <span className="font-mono text-[9px] text-[#4ade80] tracking-wider uppercase bg-green-500/10 px-2.5 py-1 rounded border border-green-500/20">
            ✓ TN RERA VALIDATED
          </span>
        </div>

        {/* Bottom Hero Info */}
        <div className="relative z-10 max-w-5xl mx-auto w-full pb-2">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-wider ${isDone ? 'bg-green-500 text-white' : 'bg-[#ff6200] text-white'}`}>
              {isDone ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
              {isDone ? 'COMPLETED' : `${project.progress}% IN PROGRESS`}
            </span>
            {project.category && (
              <span className="font-mono text-[9px] text-white/70 tracking-widest uppercase bg-white/10 px-2.5 py-1 rounded border border-white/10">
                {project.category} ARCHITECTURE
              </span>
            )}
          </div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[#ff6200] font-bold uppercase mb-2">{project.tagline}</p>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
            {project.title}
          </h1>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Meta strip */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 pb-6 border-b border-black/10">
          <div className="flex items-center gap-2 text-neutral-600">
            <MapPin className="w-4 h-4 text-[#ff6200] shrink-0" />
            <span className="font-sans text-sm">{project.location}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600">
            <Calendar className="w-4 h-4 text-[#ff6200] shrink-0" />
            <span className="font-sans text-sm">Est. {project.year}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600">
            <Ruler className="w-4 h-4 text-[#ff6200] shrink-0" />
            <span className="font-sans text-sm">{project.area}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── LEFT COLUMN (3/5) ── */}
          <div className="lg:col-span-3 space-y-10">

            {/* Overview */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-[2px] bg-[#ff6200]" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#ff6200] font-bold uppercase">Project Overview</span>
              </div>
              <p className="font-sans text-base text-neutral-700 leading-[1.85]">
                {project.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-[2px] bg-[#ff6200]" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#ff6200] font-bold uppercase">Key Features</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3.5 p-4.5 bg-white rounded-xl border border-black/6 shadow-sm hover:shadow-md hover:border-[#ff6200]/20 transition-all animate-card-reveal"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#ff6200]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4 text-[#ff6200]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sans text-sm font-bold text-neutral-800 leading-snug">{f.title}</span>
                      <span className="font-sans text-[11.5px] text-neutral-500 leading-relaxed mt-1">{f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── ARCHITECTURAL BLUEPRINT SPECIFICATION ── */}
            <div className="bg-[#0a1628] text-white rounded-2xl p-5 sm:p-7 border border-[#1a3a5c] relative overflow-hidden shadow-xl blueprint-grid">
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#1a3a5c]/60">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff6200] animate-pulse" />
                    <span className="font-mono text-[10px] tracking-[0.25em] text-[#ff6200] font-bold uppercase">
                      ARCHITECTURAL BLUEPRINT // CAD-V2
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-[#5a8ab5] tracking-wider uppercase">
                    DOC #{project.id?.toUpperCase()}-2026
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-5 font-mono text-[10px]">
                  <div className="bg-[#0d1f38]/90 p-3 rounded-lg border border-[#1a3a5c]/50">
                    <span className="text-[#5a8ab5] block text-[8px] uppercase tracking-wider mb-0.5">Built-up Area</span>
                    <span className="font-bold text-white text-xs">{project.specifications?.area || project.area}</span>
                  </div>
                  <div className="bg-[#0d1f38]/90 p-3 rounded-lg border border-[#1a3a5c]/50">
                    <span className="text-[#5a8ab5] block text-[8px] uppercase tracking-wider mb-0.5">Structural Steel</span>
                    <span className="font-bold text-white text-xs">Fe-550 TMT Grade</span>
                  </div>
                  <div className="bg-[#0d1f38]/90 p-3 rounded-lg border border-[#1a3a5c]/50">
                    <span className="text-[#5a8ab5] block text-[8px] uppercase tracking-wider mb-0.5">Concrete Mix</span>
                    <span className="font-bold text-white text-xs">M25/M30 Ready-Mix</span>
                  </div>
                  <div className="bg-[#0d1f38]/90 p-3 rounded-lg border border-[#1a3a5c]/50">
                    <span className="text-[#5a8ab5] block text-[8px] uppercase tracking-wider mb-0.5">Orientation</span>
                    <span className="font-bold text-white text-xs">{project.specifications?.facing || 'East Facing'}</span>
                  </div>
                  <div className="bg-[#0d1f38]/90 p-3 rounded-lg border border-[#1a3a5c]/50">
                    <span className="text-[#5a8ab5] block text-[8px] uppercase tracking-wider mb-0.5">Parking Allocation</span>
                    <span className="font-bold text-white text-xs">{project.specifications?.parking || 'Covered'}</span>
                  </div>
                  <div className="bg-[#0d1f38]/90 p-3 rounded-lg border border-[#1a3a5c]/50">
                    <span className="text-[#5a8ab5] block text-[8px] uppercase tracking-wider mb-0.5">BIM Twin Sync</span>
                    <span className="font-bold text-[#4ade80] text-xs">✓ 100% CAD Verified</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#1a3a5c]/50 text-neutral-400 font-mono text-[9px]">
                  <span className="text-[#8baac4]">STAMP: APPROVED FOR STRUCTURAL EXECUTION</span>
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setAllocationModal(true);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#ff6200] hover:bg-[#e05600] text-white font-bold rounded-lg tracking-wider text-[10px] transition-all cursor-pointer shadow-md"
                  >
                    REQUEST FULL BLUEPRINT PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Quality Assurance Block */}
            <div
              className="p-6 rounded-xl text-neutral-800 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)', border: '1px solid rgba(255, 98, 0, 0.15)' }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
                  backgroundSize: '28px 28px'
                }}
              />
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#ff6200]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <HardHat className="w-5 h-5 text-[#ff6200]" />
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] text-[#ff6200] font-bold mb-2 uppercase">Quality Assurance — NCS Standard</p>
                  <p className="font-serif italic text-neutral-800 leading-relaxed text-sm md:text-base">
                    "All NCS projects are built with grade-A cement, rust-resistant TMT steel, and undergo certified structural inspections at every milestone."
                  </p>
                </div>
              </div>
            </div>

            {/* Back button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-3 px-6 py-3.5 border-2 border-[#ff6200] text-[#ff6200] rounded-xl font-mono text-[11px] font-bold tracking-widest hover:bg-[#ff6200] hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO ALL PROJECTS
            </button>
          </div>

          {/* ── RIGHT COLUMN (2/5) ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Progress Ring */}
            <div className="bg-white rounded-2xl border border-black/8 p-6 shadow-sm text-center">
              <p className="font-mono text-[9px] tracking-[0.3em] text-[#ff6200] font-bold uppercase mb-5">Construction Status</p>
              <div className="flex items-center justify-center mb-2 relative">
                <ProgressRing value={project.progress} size={100} />
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="font-display font-extrabold text-2xl text-black leading-none">{project.progress}<span className="text-sm">%</span></span>
                </div>
              </div>
              <p className="font-mono text-[10px] text-neutral-500 tracking-wider">
                {isDone ? '✓ HANDED OVER TO CLIENT' : 'UNDER ACTIVE CONSTRUCTION'}
              </p>
            </div>

            {/* Specs */}
            <div className="bg-white rounded-2xl border border-black/8 p-6 shadow-sm">
              <p className="font-mono text-[9px] tracking-[0.3em] text-[#ff6200] font-bold uppercase mb-5">Specifications</p>
              <div className="divide-y divide-black/6">
                {[
                  { icon: <Home className="w-4 h-4 text-[#ff6200]" />, label: 'Project Type', value: project.specifications.type },
                  { icon: <Ruler className="w-4 h-4 text-amber-500" />, label: 'Built-up Area', value: project.specifications.area },
                  { icon: <Compass className="w-4 h-4 text-green-500" />, label: 'Facing', value: project.specifications.facing },
                  { icon: <Car className="w-4 h-4 text-blue-500" />, label: 'Parking', value: project.specifications.parking },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2.5 text-neutral-600">
                      {item.icon}
                      <span className="font-sans text-sm">{item.label}</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-black">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => {
                setSelectedProject(project);
                setAllocationModal(true);
              }}
              className="w-full py-4 rounded-xl font-mono text-[11px] font-bold tracking-widest flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all text-white cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #ff6200 0%, #d35400 100%)' }}
            >
              <Building2 className="w-4 h-4" />
              INQUIRE NOW
            </button>

            {/* Doc tag */}
            <p className="text-center font-mono text-[8px] text-neutral-300 tracking-[0.25em]">
              DOC: NCS_{project.id?.toUpperCase()} — CERTIFIED BUILD
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
