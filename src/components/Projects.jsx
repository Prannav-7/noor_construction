import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Home, Compass, Ruler, Car, X, CheckCircle2, Clock } from 'lucide-react';
import GlassFolder from './ui/glass-folder-cards';
import { PROJECTS_BY_CATEGORY } from '../data/projects';

const TAB_CONFIG = [
  { key: 'all', label: 'All' },
  { key: 'residential', label: 'Residential' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'coastal', label: 'Coastal' },
];

function ProgressBar({ value }) {
  const color = value === 100 ? '#4ade80' : value >= 70 ? '#ff6200' : '#cc4e00';
  return (
    <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.08)' }}>
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  );
}

function ProjectCard({ project, index, onClick }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the reveal based on index
          setTimeout(() => setIsVisible(true), index * 120);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const isComplete = project.progress === 100;

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="group cursor-pointer transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)',
        perspective: '1200px',
      }}
    >
      {/* Card Container */}
      <div
        className="relative overflow-hidden rounded-2xl border transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_28px_70px_rgba(15,23,42,0.14)]"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.92) 100%)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 14px 32px rgba(15,23,42,0.08)',
          transformStyle: 'preserve-3d',
          transform: 'rotateX(0deg) rotateY(0deg)',
        }}
      >
        <div
          className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(135deg, rgba(255,98,0,0.18) 0%, rgba(255,255,255,0.04) 38%, rgba(255,255,255,0.14) 100%)',
            filter: 'blur(0px)',
          }}
        />
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6200]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {/* Architectural Blueprint Schematic Section (No Photo) */}
        <div
          className="relative h-[220px] sm:h-[260px] overflow-hidden p-5 flex flex-col justify-between"
          style={{
            background: 'linear-gradient(135deg, #131318 0%, #1c1c24 100%)',
          }}
        >
          {/* Blueprint Drafting Grid Overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 98, 0, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 98, 0, 0.4) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          />

          {/* Corner Drafting Crosshairs */}
          <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#ff6200]/50" />
          <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#ff6200]/50" />
          <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#ff6200]/50" />
          <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#ff6200]/50" />

          {/* Blueprint Elevation / Floorplan Vector Diagram in Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
            <svg viewBox="0 0 200 120" className="w-52 h-32 text-[#ff6200]" stroke="currentColor" fill="none" strokeWidth="1">
              <rect x="20" y="20" width="160" height="80" strokeDasharray="4 2" />
              <line x1="20" y1="60" x2="180" y2="60" />
              <line x1="80" y1="20" x2="80" y2="100" />
              <line x1="130" y1="60" x2="130" y2="100" />
              <circle cx="50" cy="40" r="14" strokeDasharray="2 2" />
              <path d="M90 30 L115 30 L115 50 L90 50 Z" />
              <text x="25" y="15" fill="currentColor" fontSize="6" fontFamily="monospace">CAD // AXIS: A-1 // ELEV: +12.4M</text>
            </svg>
          </div>

          {/* Top Bar: Status Badge + Drawing Code + Progress Ring */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[9px] font-bold tracking-wider uppercase"
                style={{
                  background: isComplete ? 'rgba(74,222,128,0.2)' : 'rgba(255, 98, 0, 0.2)',
                  color: isComplete ? '#4ade80' : '#ff6200',
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${isComplete ? 'rgba(74,222,128,0.3)' : 'rgba(255, 98, 0, 0.3)'}`,
                }}
              >
                {isComplete ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {isComplete ? 'Completed' : `${project.progress}% In Progress`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[8px] text-[#ff6200] tracking-widest uppercase bg-black/60 px-2 py-0.5 rounded border border-[#ff6200]/30">
                DWG #{project.id?.toUpperCase()}
              </span>
              {/* Progress Arc */}
              <svg className="w-9 h-9" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={isComplete ? '#4ade80' : '#ff6200'}
                  strokeWidth="2.5"
                  strokeDasharray={`${project.progress}, 100`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <text
                  x="18" y="20.5"
                  textAnchor="middle"
                  fill="white"
                  className="text-[8px] font-bold"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {project.progress}%
                </text>
              </svg>
            </div>
          </div>

          {/* Middle: Architectural Blueprint Technical Stamp */}
          <div className="relative z-10 my-auto py-2">
            <span className="font-mono text-[9px] text-[#ff6200] tracking-[0.25em] uppercase font-bold block mb-1">
              ARCHITECTURAL SPECIFICATION
            </span>
            <div className="font-mono text-xs text-neutral-300 flex items-center gap-3">
              <span>SCALE 1:100</span>
              <span className="text-white/30">•</span>
              <span>TN RERA APPROVED</span>
            </div>
          </div>

          {/* Bottom Bar: Location & Category */}
          <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-white/90">
              <MapPin className="w-3.5 h-3.5 text-[#ff6200]" />
              <span className="text-[11px] font-sans truncate max-w-[170px]">{project.location}</span>
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#ff6200] uppercase">
              {project.category} // {project.year}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 sm:p-6">
          {/* Title & Tagline */}
          <h3
            className="font-display font-extrabold text-lg sm:text-xl leading-tight mb-1 transition-colors duration-300 group-hover:text-[#ff6200]"
            style={{ color: '#1c1c1f' }}
          >
            {project.title}
          </h3>
          <p
            className="font-mono text-[10px] tracking-wider uppercase mb-4"
            style={{ color: '#9A9080' }}
          >
            {project.tagline}
          </p>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-mono text-[8px] tracking-wider text-neutral-500 uppercase">
                Construction Progress
              </span>
              <span className="font-mono text-[9px] font-bold" style={{ color: '#1c1c1f' }}>
                {project.progress}%
              </span>
            </div>
            <ProgressBar value={project.progress} />
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { icon: <Home className="w-3.5 h-3.5 text-[#ff6200]" />, label: 'Type', val: project.specifications.type },
              { icon: <Ruler className="w-3.5 h-3.5 text-amber-600" />, label: 'Area', val: project.specifications.area },
              { icon: <Compass className="w-3.5 h-3.5 text-green-600" />, label: 'Facing', val: project.specifications.facing },
              { icon: <Car className="w-3.5 h-3.5 text-blue-600" />, label: 'Parking', val: project.specifications.parking },
            ].map((spec, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 rounded-lg transition-colors duration-300"
                style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)' }}
              >
                {spec.icon}
                <div>
                  <div className="text-[7px] tracking-wider text-neutral-400 uppercase font-mono">{spec.label}</div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-neutral-800 font-mono leading-tight">{spec.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Summary Cards */}
          <div className="mb-4 grid grid-cols-3 gap-2">
            {[
              { label: 'Status', value: isComplete ? 'Complete' : `${project.progress}%` },
              { label: 'Timeline', value: project.year },
              { label: 'Area', value: project.area },
            ].map((meta, i) => (
              <div
                key={i}
                className="rounded-xl border border-neutral-200 bg-white p-2.5 text-center shadow-[0_8px_18px_rgba(15,23,42,0.03)]"
              >
                <div className="text-[7px] uppercase tracking-[0.16em] text-neutral-400 font-mono">{meta.label}</div>
                <div className="mt-1 text-[10px] font-bold text-neutral-800 font-mono leading-tight">{meta.value}</div>
              </div>
            ))}
          </div>

          {/* Features Highlight */}
          <div className="space-y-1 mb-4">
            {project.features.slice(0, 2).map((feat, i) => (
              <div key={i} className="text-[10px] leading-snug">
                <span className="font-bold text-[#ff6200] font-sans">✓ {feat.title}</span>
                <span className="text-neutral-500">: {feat.desc.slice(0, 60)}{feat.desc.length > 60 ? '…' : ''}</span>
              </div>
            ))}
          </div>

          {/* CTA Button (Visual only to avoid nested interactive elements) */}
          <div
            className="w-full py-3 rounded-lg font-mono text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-500 group-hover:shadow-[0_12px_20px_rgba(255,98,0,0.28)] group-hover:translate-y-[-1px]"
            style={{
              background: 'linear-gradient(135deg, #ff6200 0%, #f26b1d 100%)',
              color: '#ffffff',
              boxShadow: '0 8px 18px rgba(255,98,0,0.18)',
            }}
          >
            View Blueprint Details
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const resolvedProjects = projects || PROJECTS_BY_CATEGORY;

  const allProjects = [
    ...(resolvedProjects.residential || []),
    ...(resolvedProjects.commercial || []),
    ...(resolvedProjects.coastal || []),
  ];

  const displayed = activeTab === 'all' ? allProjects : (resolvedProjects[activeTab] || []);
  const totalCount = allProjects.length;
  const completedCount = allProjects.filter(p => p.progress === 100).length;

  const categoryCards = [
    {
      key: 'residential',
      label: 'Villas',
      tone: 'light',
      art: 'aurora',
      action: 'add',
      labelPlacement: 'bottom-left',
      files: (resolvedProjects.residential || []).slice(0, 3).map(project => ({
        name: project.title,
        meta: project.location?.split(',')[0] || project.year,
        image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
      })),
    },
    {
      key: 'commercial',
      label: 'Commercial',
      tone: 'dark',
      art: 'dusk',
      action: 'more',
      labelPlacement: 'top-left',
      files: (resolvedProjects.commercial || []).slice(0, 3).map((project, idx) => ({
        name: project.title,
        meta: project.location?.split(',')[0] || `${project.progress}% built`,
        image: [
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
        ][idx % 3],
      })),
    },
    {
      key: 'coastal',
      label: 'Coastal',
      tone: 'light',
      art: 'verdant',
      action: 'none',
      labelPlacement: 'top-right',
      files: (resolvedProjects.coastal || []).slice(0, 3).map((project, idx) => ({
        name: project.title,
        meta: project.location?.split(',')[0] || project.area,
        image: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
          'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=900&q=80',
        ][idx % 3],
      })),
    },
  ];

  const [mobileDrawerProject, setMobileDrawerProject] = useState(null);

  useEffect(() => {
    if (mobileDrawerProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileDrawerProject]);

  const handleCardClick = (project) => {
    if (window.innerWidth < 1024) {
      setMobileDrawerProject(project);
    } else {
      navigate(`/project/${project.id}`);
    }
  };

  return (
    <section
      id="projects"
      className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 overflow-hidden tech-grid-light"
      style={{ background: '#FED8B1' }}
    >
      <div className="w-full max-w-7xl mx-auto z-10 relative">
        {/* Header Block */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px]" style={{ background: '#ff6200' }} />
            <span
              className="text-[10px] tracking-[0.35em] font-bold uppercase"
              style={{ color: '#ff6200', fontFamily: 'var(--font-mono)' }}
            >
              Our Portfolio
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6">
            <div>
              <h2
                className="font-display font-extrabold leading-[1.05] tracking-tight mb-2"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#1c1c1f' }}
              >
                Projects{' '}
                <span className="font-serif italic font-normal" style={{ color: '#6e6e73' }}>
                  We've Built
                </span>
              </h2>
              <p className="font-sans text-sm max-w-lg leading-relaxed" style={{ color: '#6e6e73' }}>
                From smart residential villas to eco-coastal retreats — explore our portfolio of premium constructions.
              </p>
            </div>

            {/* Stat bar */}
            <div className="flex items-center gap-6 shrink-0 bg-white/40 backdrop-blur-sm border border-black/5 px-5 py-3 rounded-xl">
              {[
                { num: '72+', label: 'Projects Delivered' },
                { num: '150+', label: 'Happy Customers', gold: true },
                { num: '100%', label: 'RERA Compliance' },
              ].map((s, i) => (
                <React.Fragment key={i}>
                  <div className="text-center">
                    <div
                      className="font-display font-extrabold text-2xl mb-0.5"
                      style={{ color: s.gold ? '#ff6200' : '#1c1c1f' }}
                    >
                      {s.num}
                    </div>
                    <div
                      className="text-[8px] tracking-[0.2em] uppercase"
                      style={{ color: '#6e6e73', fontFamily: 'var(--font-mono)' }}
                    >
                      {s.label}
                    </div>
                  </div>
                  {i < 2 && <div className="w-px h-6" style={{ background: 'rgba(0,0,0,0.08)' }} />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Tab buttons */}
          <div
            className="flex flex-wrap gap-0"
            style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
          >
            {TAB_CONFIG.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="relative px-5 py-2.5 text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: activeTab === tab.key ? '#ff6200' : '#9A9080',
                  background: 'transparent',
                }}
              >
                {tab.label}
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-300"
                  style={{ background: activeTab === tab.key ? '#ff6200' : 'transparent' }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {categoryCards.map((card, index) => (
            <div
              key={card.key}
              className="cursor-pointer"
              onClick={() => setActiveTab(card.key)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setActiveTab(card.key);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open ${card.label} projects`}
            >
              <GlassFolder
                label={card.label}
                art={card.art}
                tone={card.tone}
                action={card.action}
                labelPlacement={card.labelPlacement}
                files={card.files}
                menu={[
                  { label: 'View all', onSelect: () => setActiveTab(card.key) },
                  { label: 'Open category', onSelect: () => setActiveTab(card.key) },
                ]}
                onFileSelect={() => setActiveTab(card.key)}
                onOpenChange={(nextOpen) => {
                  if (nextOpen) setActiveTab(card.key);
                }}
                width={330}
                appearDelay={60 + index * 100}
              />
            </div>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayed.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onClick={() => handleCardClick(project)}
            />
          ))}
          {displayed.length === 0 && (
            <div className="col-span-full flex items-center justify-center p-16 text-neutral-500 font-mono text-xs">
              NO PROJECTS IN THIS CATEGORY
            </div>
          )}
        </div>
      </div>

      {/* Mobile Details Drawer via Portal */}
      {mobileDrawerProject && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-end justify-center lg:hidden bg-black/75 backdrop-blur-md">
          <div className="absolute inset-0" onClick={() => setMobileDrawerProject(null)} />

          <div className="w-full max-w-lg bg-white rounded-t-3xl p-5 sm:p-6 relative z-10 max-h-[88vh] overflow-y-auto shadow-2xl border-t border-neutral-200 animate-card-reveal text-neutral-900 pb-8">
            <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto mb-4" />

            <button
              onClick={() => setMobileDrawerProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 text-neutral-500 hover:text-black transition-colors cursor-pointer"
              aria-label="Close Drawer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[9px] tracking-widest text-[#ff6200] font-bold uppercase">
                {mobileDrawerProject.category} // {mobileDrawerProject.year}
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[8px] font-bold tracking-wider"
                style={{
                  background: mobileDrawerProject.progress === 100 ? 'rgba(74,222,128,0.15)' : 'rgba(255, 98, 0, 0.15)',
                  color: mobileDrawerProject.progress === 100 ? '#22c55e' : '#ff6200',
                  border: `1px solid ${mobileDrawerProject.progress === 100 ? 'rgba(74,222,128,0.25)' : 'rgba(255, 98, 0, 0.25)'}`,
                }}
              >
                {mobileDrawerProject.progress === 100 ? 'Completed' : `${mobileDrawerProject.progress}% Progress`}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-xl text-neutral-900 leading-tight mb-1">
              {mobileDrawerProject.title}
            </h3>
            <p className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase mb-4">
              {mobileDrawerProject.tagline}
            </p>

            {/* Blueprint Header (No Photo) */}
            <div
              className="w-full h-44 rounded-xl overflow-hidden border border-neutral-800 mb-4 relative p-4 flex flex-col justify-between"
              style={{ background: 'linear-gradient(135deg, #131318 0%, #1c1c24 100%)' }}
            >
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255, 98, 0, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 98, 0, 0.4) 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-[8px] text-[#ff6200] tracking-widest uppercase bg-black/60 px-2 py-0.5 rounded border border-[#ff6200]/30">
                  DWG #{mobileDrawerProject.id?.toUpperCase()}
                </span>
                <span className="font-mono text-[9px] text-neutral-400">SCALE 1:100</span>
              </div>
              <div className="relative z-10">
                <div className="font-mono text-[9px] text-orange-400 uppercase tracking-widest font-bold">ARCHITECTURAL BLUEPRINT</div>
                <div className="font-mono text-[10px] text-white">GOVT RERA REGISTERED // STRUCTURAL ENGINEER CLASS-I</div>
              </div>
              <div className="relative z-10 flex items-center gap-1.5 text-white">
                <MapPin className="w-3.5 h-3.5 text-[#ff6200]" />
                <span className="text-[11px] font-sans">{mobileDrawerProject.location}</span>
              </div>
            </div>

            <div className="mb-4 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-[8px] tracking-wider text-[#ff6200] uppercase">Construction Progress</span>
                <span className="font-mono text-[9px] font-bold text-neutral-800">{mobileDrawerProject.progress}%</span>
              </div>
              <ProgressBar value={mobileDrawerProject.progress} />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { icon: <Home className="w-3.5 h-3.5 text-[#ff6200]" />, label: 'Type', val: mobileDrawerProject.specifications.type },
                { icon: <Ruler className="w-3.5 h-3.5 text-amber-500" />, label: 'Area', val: mobileDrawerProject.specifications.area },
                { icon: <Compass className="w-3.5 h-3.5 text-green-500" />, label: 'Facing', val: mobileDrawerProject.specifications.facing },
                { icon: <Car className="w-3.5 h-3.5 text-blue-500" />, label: 'Parking', val: mobileDrawerProject.specifications.parking },
              ].map((spec, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg border border-neutral-100">
                  {spec.icon}
                  <div>
                    <div className="text-[8px] tracking-wider text-neutral-400 uppercase font-mono">{spec.label}</div>
                    <div className="text-[10px] font-bold text-neutral-800 font-mono">{spec.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 mb-4">
              <div className="font-mono text-[8px] tracking-widest text-neutral-400 uppercase mb-1">// KEY FEATURES</div>
              {mobileDrawerProject.features.slice(0, 3).map((feat, i) => (
                <div key={i} className="text-[10px] leading-snug">
                  <span className="font-bold text-[#ff6200] font-sans">✓ {feat.title}</span>: <span className="text-neutral-500">{feat.desc}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileDrawerProject(null);
                navigate(`/project/${mobileDrawerProject.id}`);
              }}
              className="w-full py-3.5 bg-[#ff6200] hover:bg-[#e05600] text-white font-mono text-xs font-bold tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors"
            >
              OPEN BLUEPRINT DETAILS
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
