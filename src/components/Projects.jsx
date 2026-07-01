import React, { useState, useEffect, useRef } from 'react';
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
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        {/* Image Section */}
        <div className="relative h-[220px] sm:h-[260px] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
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
              {isComplete ? 'Completed' : `${project.progress}%`}
            </span>
          </div>

          {/* Progress Arc */}
          <div className="absolute top-4 right-4">
            <svg className="w-10 h-10" viewBox="0 0 36 36">
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

          {/* Location Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#ff6200]" />
            <span className="text-[11px] font-sans text-white/90">{project.location}</span>
          </div>

          {/* Year Badge */}
          <div className="absolute bottom-4 right-4">
            <span
              className="text-[10px] font-mono font-bold tracking-widest text-white/60 uppercase"
            >
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
            className="w-full py-3 rounded-lg font-mono text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-500 group-hover:shadow-lg"
            style={{
              background: '#ff6200',
              color: '#ffffff',
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
                { num: totalCount, label: 'Projects' },
                { num: completedCount, label: 'Completed', gold: true },
                { num: totalCount - completedCount, label: 'Active' },
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

      {/* Mobile Details Drawer */}
      {mobileDrawerProject && (
        <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden bg-black/60 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setMobileDrawerProject(null)} />

          <div className="w-full bg-white rounded-t-2xl p-6 relative z-10 max-h-[85vh] overflow-y-auto shadow-2xl border-t border-neutral-200 animate-card-reveal">
            <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto mb-4" />

            <button
              onClick={() => setMobileDrawerProject(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-neutral-100 text-neutral-500 hover:text-black transition-colors cursor-pointer"
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
              <img src={mobileDrawerProject.image} alt={mobileDrawerProject.title} className="w-full h-full object-cover" />
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
              className="w-full py-3.5 bg-[#ff6200] text-white font-mono text-xs font-bold tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              OPEN BLUEPRINT DETAILS
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
