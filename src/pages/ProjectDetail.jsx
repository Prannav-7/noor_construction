import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, Calendar, Ruler, Zap, Leaf, Shield,
  CheckCircle2, Clock, ChevronRight, Home, Building2, X, HardHat
} from 'lucide-react';
import { ALL_PROJECTS } from '../data/projects';

function ProgressRing({ value, size = 90 }) {
  const strokeWidth = 9;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const color = value === 100 ? '#22c55e' : value >= 70 ? '#8b0000' : '#d97706';
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

export default function ProjectDetail() {
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
          className="flex items-center gap-2 px-5 py-2.5 bg-[#8b0000] text-white rounded-lg font-mono text-xs font-bold tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      </div>
    );
  }

  const isDone = project.progress === 100;

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] font-sans">

      {/* ── ABSOLUTE TRANSPARENT OVERLAY NAVBAR ── */}
      <header
        className="absolute top-0 left-0 right-0 z-50 w-full px-6 py-4 flex items-center justify-between gap-4 bg-gradient-to-b from-black/80 via-black/35 to-transparent"
      >
        {/* Logo */}
        <a href="/" className="flex items-center shrink-0">
          <img src="/logo.png.png" alt="NCS" className="h-11 w-auto object-contain" />
        </a>

        {/* Title in center */}
        <div className="flex-1 flex flex-col items-center">
          <span className="font-mono text-[8px] tracking-[0.3em] text-white/40 uppercase hidden md:block">Project Detail</span>
          <span className="font-display font-bold text-sm text-white tracking-tight hidden md:block truncate max-w-sm">{project.title}</span>
        </div>

        {/* Back + Close buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/25 text-white bg-black/20 backdrop-blur-sm font-mono text-[10px] font-bold tracking-wider hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">BACK TO HOME</span>
          </button>
          <button
            onClick={handleBack}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-black/20 backdrop-blur-sm hover:bg-white/20 transition-colors text-white"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── HERO BANNER ── */}
      <div className="relative h-[50vh] min-h-[300px] max-h-[500px] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

        {/* Corner survey marks */}
        <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-white/30 pointer-events-none" />
        <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-white/30 pointer-events-none" />

        {/* Text overlay - bottom left */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-wider ${isDone ? 'bg-green-500 text-white' : 'bg-[#8b0000] text-white'}`}>
                {isDone ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {isDone ? 'COMPLETED' : `${project.progress}% IN PROGRESS`}
              </span>
              {project.category && (
                <span className="font-mono text-[9px] text-white/50 tracking-widest uppercase bg-white/10 px-2 py-1 rounded">
                  {project.category} PROJECT
                </span>
              )}
            </div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-red-300 font-bold uppercase mb-2">{project.tagline}</p>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Meta strip */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 pb-6 border-b border-black/10">
          <div className="flex items-center gap-2 text-neutral-600">
            <MapPin className="w-4 h-4 text-[#8b0000] shrink-0" />
            <span className="font-sans text-sm">{project.location}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600">
            <Calendar className="w-4 h-4 text-[#8b0000] shrink-0" />
            <span className="font-sans text-sm">Est. {project.year}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600">
            <Ruler className="w-4 h-4 text-[#8b0000] shrink-0" />
            <span className="font-sans text-sm">{project.area}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* ── LEFT COLUMN (3/5) ── */}
          <div className="lg:col-span-3 space-y-10">

            {/* Overview */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-[2px] bg-[#8b0000]" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#8b0000] font-bold uppercase">Project Overview</span>
              </div>
              <p className="font-sans text-base text-neutral-700 leading-[1.85]">
                {project.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-[2px] bg-[#8b0000]" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#8b0000] font-bold uppercase">Key Features</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3.5 p-4.5 bg-white rounded-xl border border-black/6 shadow-sm hover:shadow-md hover:border-[#8b0000]/20 transition-all animate-card-reveal"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#8b0000]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4 text-[#8b0000]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-sans text-sm font-bold text-neutral-800 leading-snug">{f.title}</span>
                      <span className="font-sans text-[11.5px] text-neutral-500 leading-relaxed mt-1">{f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Assurance Block */}
            <div
              className="p-6 rounded-xl text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1a0a06 0%, #3d1208 100%)' }}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                  backgroundSize: '28px 28px'
                }}
              />
              <div className="relative z-10 flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-[#8b0000] flex items-center justify-center shrink-0 mt-0.5">
                  <HardHat className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] text-red-300 font-bold mb-2 uppercase">Quality Assurance — NCS Standard</p>
                  <p className="font-serif italic text-white/90 leading-relaxed text-sm md:text-base">
                    "All NCS projects are built with grade-A cement, rust-resistant TMT steel, and undergo certified structural inspections at every milestone."
                  </p>
                </div>
              </div>
            </div>

            {/* Back button */}
            <button
              onClick={handleBack}
              className="flex items-center gap-3 px-6 py-3.5 border-2 border-[#8b0000] text-[#8b0000] rounded-xl font-mono text-[11px] font-bold tracking-widest hover:bg-[#8b0000] hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO ALL PROJECTS
            </button>
          </div>

          {/* ── RIGHT COLUMN (2/5) ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Progress Ring */}
            <div className="bg-white rounded-2xl border border-black/8 p-6 shadow-sm text-center">
              <p className="font-mono text-[9px] tracking-[0.3em] text-[#8b0000] font-bold uppercase mb-5">Construction Status</p>
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
              <p className="font-mono text-[9px] tracking-[0.3em] text-[#8b0000] font-bold uppercase mb-5">Specifications</p>
              <div className="divide-y divide-black/6">
                {[
                  { icon: <Home className="w-4 h-4 text-neutral-400" />, label: 'Built-up Area', value: project.specifications.sqFt },
                  { icon: <Zap className="w-4 h-4 text-amber-400" />, label: 'Solar Capacity', value: project.specifications.solarCapacity },
                  { icon: <Leaf className="w-4 h-4 text-green-500" />, label: 'Carbon Reduction', value: project.specifications.carbonReduction },
                  { icon: <Shield className="w-4 h-4 text-blue-500" />, label: 'Smart Index', value: project.specifications.smartIndex },
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
              onClick={handleBack}
              className="w-full py-4 rounded-xl font-mono text-[11px] font-bold tracking-widest flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all text-white"
              style={{ background: 'linear-gradient(135deg, #8b0000 0%, #5a0000 100%)' }}
            >
              <Building2 className="w-4 h-4" />
              VIEW ALL PROJECTS
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
