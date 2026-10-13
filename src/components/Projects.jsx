import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Home, Compass, Ruler, Car, X, CheckCircle2, Clock } from 'lucide-react';
import { PROJECTS_BY_CATEGORY } from '../data/projects';

const TAB_CONFIG = [
  { key: 'all',         label: 'All' },
  { key: 'residential', label: 'Residential' },
  { key: 'commercial',  label: 'Commercial' },
  { key: 'coastal',     label: 'Coastal' },
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
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
      }}
    >
      {/* Card Container */}
      <div
        className="relative overflow-hidden rounded-2xl border transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1"
        style={{
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        {/* Technical Blueprint Header (No photo) */}
        <div
          className="relative p-5 sm:p-6 border-b transition-colors duration-500 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
            borderBottom: '1px solid rgba(255, 98, 0, 0.25)',
          }}
        >
          {/* Subtle blueprint CAD grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255, 98, 0, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 98, 0, 0.2) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          {/* Corner CAD drafting ticks */}
          <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-[#ff6200]/60" />
          <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-[#ff6200]/60" />
          <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-[#ff6200]/40" />
          <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-[#ff6200]/40" />

          {/* Top badges row */}
          <div className="flex items-center justify-between gap-2 mb-3.5 relative z-10">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-[9px] font-bold tracking-widest uppercase"
              style={{
                background: 'rgba(255, 98, 0, 0.15)',
                color: '#ff6200',
                border: '1px solid rgba(255, 98, 0, 0.3)',
              }}
            >
              {project.category} // {project.year}
            </span>

            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-[9px] font-bold tracking-wider uppercase"
              style={{
                background: isComplete ? 'rgba(74,222,128,0.15)' : 'rgba(255, 98, 0, 0.15)',
                color: isComplete ? '#4ade80' : '#ff6200',
                border: `1px solid ${isComplete ? 'rgba(74,222,128,0.3)' : 'rgba(255, 98, 0, 0.3)'}`,
              }}
            >
              {isComplete ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
              {isComplete ? 'Completed' : `${project.progress}% In Progress`}
            </span>
          </div>

          {/* Blueprint Title & ID */}
          <div className="relative z-10">
            <div className="flex items-baseline justify-between gap-2 mb-1.5">
              <span className="font-mono text-[9px] tracking-[0.2em] text-neutral-400 uppercase">
                SPEC #{project.id.toUpperCase()}
              </span>
              <div className="flex items-center gap-1 text-[11px] font-sans text-neutral-300">
                <MapPin className="w-3 h-3 text-[#ff6200]" />
                <span>{project.location}</span>
              </div>
            </div>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white leading-tight transition-colors duration-300 group-hover:text-[#ff6200]">
              {project.title}
            </h3>
            <p className="font-mono text-[10px] tracking-wider text-orange-400 uppercase mt-1">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 sm:p-6">
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
                style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}
              >
                {spec.icon}
                <div>
                  <div className="text-[7px] tracking-wider text-neutral-400 uppercase font-mono">{spec.label}</div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-neutral-800 font-mono leading-tight">{spec.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Highlight */}
          <div className="space-y-1 mb-5">
            {project.features.slice(0, 2).map((feat, i) => (
              <div key={i} className="text-[10px] leading-snug">
                <span className="font-bold text-[#ff6200] font-sans">✓ {feat.title}</span>
                <span className="text-neutral-600">: {feat.desc.slice(0, 60)}{feat.desc.length > 60 ? '…' : ''}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div
            className="w-full py-3 rounded-lg font-mono text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-500 group-hover:shadow-lg group-hover:bg-[#e05600]"
            style={{
              background: '#ff6200',
              color: '#ffffff',
            }}
          >
            View Blueprint & Specs
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
            <div className="flex items-center gap-6 shrink-0 bg-white/60 backdrop-blur-sm border border-black/10 px-6 py-3.5 rounded-xl shadow-sm">
              {[
                { num: '72+', label: 'Projects Built' },
                { num: '150+', label: 'Happy Customers', gold: true },
                { num: '100%', label: 'RERA Certified' },
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
                      className="text-[8px] tracking-[0.2em] uppercase font-bold"
                      style={{ color: '#6e6e73', fontFamily: 'var(--font-mono)' }}
                    >
                      {s.label}
                    </div>
                  </div>
                  {i < 2 && <div className="w-px h-6" style={{ background: 'rgba(0,0,0,0.12)' }} />}
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
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

            <div className="w-full h-44 rounded-xl overflow-hidden border border-neutral-200 mb-4 relative">
              <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-4">
                <span className="font-mono text-[9px] text-[#ff6200] tracking-widest uppercase font-bold">// BLUEPRINT SPEC #{mobileDrawerProject.id.toUpperCase()}</span>
                <span className="font-display font-bold text-base text-white text-center mt-1">{mobileDrawerProject.title}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-white">
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
