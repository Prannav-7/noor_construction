import React, { useState } from 'react';
import { MapPin, CheckCircle2, Clock, ChevronRight, Zap, Leaf, Home, Building2, Waves } from 'lucide-react';

const TAB_CONFIG = [
  { key: 'all',         label: 'All Projects', icon: <Home className="w-3.5 h-3.5" /> },
  { key: 'residential', label: 'Residential',  icon: <Home className="w-3.5 h-3.5" /> },
  { key: 'commercial',  label: 'Commercial',   icon: <Building2 className="w-3.5 h-3.5" /> },
  { key: 'coastal',     label: 'Coastal',      icon: <Waves className="w-3.5 h-3.5" /> },
];

function ProgressBar({ value }) {
  const color = value === 100 ? '#22c55e' : value >= 70 ? '#8b0000' : '#cc6600';
  return (
    <div className="w-full h-1.5 bg-black/8 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const isDone = project.progress === 100;

  return (
    <div className="group bg-white border border-black/8 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col">

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Status badge */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider ${isDone ? 'bg-green-500 text-white' : 'bg-[#8b0000] text-white'}`}>
          {isDone ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
          {isDone ? 'COMPLETED' : `${project.progress}% DONE`}
        </div>

        {/* Year badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white font-mono text-[10px] tracking-wider px-2 py-1 rounded">
          {project.year}
        </div>

        {/* Bottom title area */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="font-mono text-[9px] tracking-[0.3em] text-[#ff9999] font-bold mb-0.5 uppercase">
            {project.tagline}
          </p>
          <h3 className="font-display font-extrabold text-white text-[1.05rem] leading-tight">
            {project.title}
          </h3>
        </div>

        {/* Survey corner ticks */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/30 pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/30 pointer-events-none" />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">

        {/* Location + area */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-neutral-500">
            <MapPin className="w-3.5 h-3.5 text-[#8b0000] shrink-0" />
            <span className="font-sans text-[12px]">{project.location}</span>
          </div>
          <span className="font-mono text-[10px] text-neutral-400 shrink-0">{project.area}</span>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-400 uppercase">Construction Progress</span>
            <span className="font-mono text-[10px] font-bold text-neutral-700">{project.progress}%</span>
          </div>
          <ProgressBar value={project.progress} />
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-[#faf9f6] rounded p-2.5 border border-black/5">
            <span className="font-mono text-[8px] text-neutral-400 tracking-wider block mb-0.5 uppercase">Built-up Area</span>
            <span className="font-mono text-[11px] font-bold text-black">{project.specifications.sqFt}</span>
          </div>
          <div className="bg-[#faf9f6] rounded p-2.5 border border-black/5">
            <div className="flex items-center gap-1 mb-0.5">
              <Zap className="w-2.5 h-2.5 text-amber-500" />
              <span className="font-mono text-[8px] text-neutral-400 tracking-wider uppercase">Solar</span>
            </div>
            <span className="font-mono text-[11px] font-bold text-black">{project.specifications.solarCapacity}</span>
          </div>
          <div className="bg-[#faf9f6] rounded p-2.5 border border-black/5">
            <div className="flex items-center gap-1 mb-0.5">
              <Leaf className="w-2.5 h-2.5 text-green-500" />
              <span className="font-mono text-[8px] text-neutral-400 tracking-wider uppercase">Carbon</span>
            </div>
            <span className="font-mono text-[11px] font-bold text-black">{project.specifications.carbonReduction}</span>
          </div>
          <div className="bg-[#faf9f6] rounded p-2.5 border border-black/5">
            <span className="font-mono text-[8px] text-neutral-400 tracking-wider block mb-0.5 uppercase">Smart Index</span>
            <span className="font-mono text-[11px] font-bold text-black">{project.specifications.smartIndex}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.features.map((f, i) => (
            <span
              key={i}
              className="bg-[#8b0000]/8 text-[#8b0000] font-mono text-[9px] tracking-wide px-2 py-0.5 rounded font-bold border border-[#8b0000]/15"
            >
              {f}
            </span>
          ))}
        </div>

        {/* Expandable description */}
        <div className="mt-auto">
          <button
            onClick={() => setExpanded(e => !e)}
            className="flex items-center gap-1.5 text-[#8b0000] font-mono text-[10px] font-bold tracking-wider hover:underline transition-all"
          >
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-90' : ''}`} />
            {expanded ? 'HIDE DETAILS' : 'VIEW DETAILS'}
          </button>
          {expanded && (
            <p className="mt-3 font-sans text-[12px] text-neutral-600 leading-relaxed border-t border-black/6 pt-3">
              {project.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects }) {
  const [activeTab, setActiveTab] = useState('all');

  const allProjects = [
    ...(projects.residential || []),
    ...(projects.commercial || []),
    ...(projects.coastal || []),
  ];

  const displayed = activeTab === 'all' ? allProjects : (projects[activeTab] || []);
  const totalCount = allProjects.length;
  const completedCount = allProjects.filter(p => p.progress === 100).length;

  return (
    <section
      id="projects"
      className="relative py-10 lg:py-14 px-6 min-h-screen flex flex-col justify-center"
      style={{ background: 'linear-gradient(180deg, #faf9f6 0%, #f0ece3 50%, #faf9f6 100%)' }}
    >
      {/* Blueprint rebar pattern */}
      <div className="rebar-pattern absolute inset-0 pointer-events-none z-0" />

      <div className="max-w-7xl w-full mx-auto relative z-10">

        {/* ── SECTION HEADER ── */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#8b0000]" />
            <span className="font-mono text-[10px] tracking-[0.35em] text-[#8b0000] font-bold uppercase">
              Our Portfolio
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight text-black mb-2">
                Projects{' '}
                <span className="font-serif italic font-normal text-neutral-400">We've Built</span>
              </h2>
              <p className="font-sans text-base text-neutral-500 max-w-lg leading-relaxed">
                From smart residential villas to eco-coastal retreats — every project reflects our commitment to precision and sustainability.
              </p>
            </div>

            {/* Stats bar */}
            <div className="flex items-center gap-6 shrink-0">
              <div className="text-center">
                <div className="font-display font-extrabold text-3xl text-black">{totalCount}</div>
                <div className="font-mono text-[9px] tracking-[0.2em] text-neutral-400 uppercase">Projects</div>
              </div>
              <div className="w-px h-10 bg-black/10" />
              <div className="text-center">
                <div className="font-display font-extrabold text-3xl text-green-600">{completedCount}</div>
                <div className="font-mono text-[9px] tracking-[0.2em] text-neutral-400 uppercase">Completed</div>
              </div>
              <div className="w-px h-10 bg-black/10" />
              <div className="text-center">
                <div className="font-display font-extrabold text-3xl text-[#8b0000]">{totalCount - completedCount}</div>
                <div className="font-mono text-[9px] tracking-[0.2em] text-neutral-400 uppercase">Active</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TAB_CONFIG.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[11px] font-bold tracking-wider transition-all border ${
                activeTab === tab.key
                  ? 'bg-[#8b0000] text-white border-[#8b0000] shadow-md'
                  : 'bg-white text-neutral-600 border-black/10 hover:border-[#8b0000]/40 hover:text-[#8b0000]'
              }`}
            >
              {tab.icon}
              {tab.label.toUpperCase()}
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-black/6 text-neutral-500'}`}>
                {tab.key === 'all' ? totalCount : (projects[tab.key] || []).length}
              </span>
            </button>
          ))}
        </div>

        {/* ── PROJECT GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayed.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Bottom tag */}
        <div className="text-center mt-10 font-mono text-[9px] text-neutral-300 tracking-[0.3em]">
          DOC: NOOR_PROJECT_PORTFOLIO — REV. 01 — SHEET 1 OF 1
        </div>
      </div>
    </section>
  );
}
