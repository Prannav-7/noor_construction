import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CheckCircle2, Clock, ArrowRight, Home, Compass, Ruler, Car, X } from 'lucide-react';
import { gsap } from 'gsap';
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
    <div className="w-full h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.08)' }}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  );
}

function MenuItem({
  project,
  textColor = '#1c1c1f',
  marqueeBgColor = '#ff6200',
  marqueeTextColor = '#ffffff',
  borderColor = 'rgba(0, 0, 0, 0.08)',
  isFirst,
  onHover,
  onClick,
  isActive
}) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const tlRef = useRef(null);

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = (mouseX - width / 2) ** 2 + mouseY ** 2;
    const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const handleMouseEnter = ev => {
    onHover();
    if (window.innerWidth < 1024) return;
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    if (tlRef.current) {
      tlRef.current.kill();
    }

    tlRef.current = gsap
      .timeline({ defaults: { duration: 0.5, ease: 'power2.out' } })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = ev => {
    if (window.innerWidth < 1024) return;
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    if (tlRef.current) {
      tlRef.current.kill();
    }

    tlRef.current = gsap
      .timeline({ defaults: { duration: 0.5, ease: 'power2.out' } })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  useEffect(() => {
    if (window.innerWidth >= 1024) return;
    if (!marqueeRef.current || !marqueeInnerRef.current) return;

    if (tlRef.current) {
      tlRef.current.kill();
    }

    if (isActive) {
      tlRef.current = gsap
        .timeline({ defaults: { duration: 0.5, ease: 'power2.out' } })
        .set(marqueeRef.current, { y: '101%' }, 0)
        .set(marqueeInnerRef.current, { y: '-101%' }, 0)
        .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
    } else {
      tlRef.current = gsap
        .timeline({ defaults: { duration: 0.5, ease: 'power2.out' } })
        .to(marqueeRef.current, { y: '101%' }, 0)
        .to(marqueeInnerRef.current, { y: '-101%' }, 0);
    }
  }, [isActive]);

  useEffect(() => {
    return () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className="menu-item-row flex-1 min-h-[65px] relative overflow-hidden flex items-center justify-start transition-colors duration-300"
      style={{ borderTop: isFirst ? 'none' : `1px solid ${borderColor}` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="w-full flex items-center justify-between px-6 py-4 cursor-pointer no-underline select-none">
        <span
          className="font-display font-extrabold text-[2.2vh] lg:text-[2.6vh] tracking-tight uppercase transition-transform duration-300 text-left shrink-0 max-w-[70%]"
          style={{ color: textColor }}
        >
          {project.title}
        </span>
        <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase font-bold text-right shrink-0">
          {project.category} // {project.year}
        </span>
      </div>

      {/* Marquee hover/active layer */}
      <div
        ref={marqueeRef}
        className="marquee-layer absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-20 flex items-center"
        style={{ backgroundColor: marqueeBgColor }}
      >
        <div ref={marqueeInnerRef} className="h-full w-max flex items-center animate-marquee-scroll">
          {/* Render 4 parts to guarantee it fills the viewport and scrolls infinitely */}
          {[...Array(4)].map((_, partIdx) => (
            <div
              className="flex items-center shrink-0"
              key={partIdx}
              style={{ color: marqueeTextColor }}
            >
              <span className="whitespace-nowrap uppercase font-display font-extrabold text-base md:text-lg lg:text-[2.6vh] leading-none px-4 md:px-8">
                {project.title}
              </span>
              <div
                className="w-16 h-8 md:w-24 md:h-10 my-1 mx-2 md:mx-4 rounded bg-cover bg-center border border-white/20 shrink-0"
                style={{ backgroundImage: `url(${project.image})` }}
              />
            </div>
          ))}
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

  const [hoveredProject, setHoveredProject] = useState(displayed[0] || null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Sync selected hovered project when filter tab changes
  useEffect(() => {
    if (displayed.length > 0) {
      setHoveredProject(displayed[0]);
    } else {
      setHoveredProject(null);
    }
  }, [activeTab]);

  return (
    <section
      id="projects"
      className="relative w-full h-screen flex flex-col p-6 lg:p-12 overflow-hidden tech-grid-light"
      style={{ background: '#FED8B1' }}
    >
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-marquee-scroll {
          display: flex;
          width: max-content;
          animation: marquee-scroll 16s linear infinite;
        }
        .marquee-layer {
          transform: translateY(101%);
        }
      `}</style>
      <div className="w-full mx-auto z-10 flex flex-col justify-between h-full px-4 md:px-8 lg:px-12 max-w-none">
        {/* Header Block */}
        <div className="shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-[1px]" style={{ background: '#ff6200' }} />
            <span
              className="text-[10px] tracking-[0.35em] font-bold uppercase"
              style={{ color: '#ff6200', fontFamily: 'var(--font-mono)' }}
            >
              Our Portfolio
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-4">
            <div>
              <h2
                className="font-display font-extrabold leading-[1.05] tracking-tight mb-1"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#1c1c1f' }}
              >
                Projects{' '}
                <span className="font-serif italic font-normal" style={{ color: '#6e6e73' }}>
                  We've Built
                </span>
              </h2>
              <p className="font-sans text-[13px] max-w-lg leading-relaxed" style={{ color: '#6e6e73' }}>
                From smart residential villas to eco-coastal retreats — hover to explore details.
              </p>
            </div>

            {/* Stat bar */}
            <div className="flex items-center gap-6 shrink-0 bg-white/40 backdrop-blur-sm border border-black/5 px-4 py-2 rounded">
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
            className="flex flex-wrap gap-0 mb-4"
            style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
          >
            {TAB_CONFIG.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="relative px-4 py-2 text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300"
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

        {/* Main Split Layout */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-4">
          {/* LEFT: Flowing Menu (Span 7) */}
          <div className="lg:col-span-7 flex flex-col bg-white/25 backdrop-blur-sm border border-black/5 rounded-xl lg:overflow-hidden min-h-0">
            <div className="w-full lg:h-full lg:overflow-y-auto">
              <nav className="flex flex-col h-full divide-y divide-black/5">
                {displayed.map((project, idx) => (
                  <MenuItem
                    key={project.id}
                    project={project}
                    isActive={hoveredProject?.id === project.id}
                    textColor="#1c1c1f"
                    marqueeBgColor="#ff6200"
                    marqueeTextColor="#ffffff"
                    borderColor="rgba(0, 0, 0, 0.05)"
                    isFirst={idx === 0}
                    onHover={() => setHoveredProject(project)}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        if (hoveredProject?.id === project.id) {
                          setMobileDrawerOpen(true);
                        } else {
                          setHoveredProject(project);
                        }
                      } else {
                        navigate(`/project/${project.id}`);
                      }
                    }}
                  />
                ))}
                {displayed.length === 0 && (
                  <div className="flex items-center justify-center p-12 text-neutral-500 font-mono text-xs">
                    NO PROJECTS IN THIS CATEGORY
                  </div>
                )}
              </nav>
            </div>
          </div>

          {/* RIGHT: Dynamic HUD Detail Panel (Span 5) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-6 bg-white border border-neutral-200/80 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-neutral-100 rounded-full blur-2xl opacity-50" />
            
            {hoveredProject ? (
              <div className="h-full flex flex-col justify-between z-10 relative">
                <div className="flex-1 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                  {/* Category + Status Pill */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-[9px] tracking-widest text-[#ff6200] font-bold uppercase">
                      {hoveredProject.category} // {hoveredProject.year}
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[8px] font-bold tracking-wider"
                      style={{
                        background: hoveredProject.progress === 100 ? 'rgba(74,222,128,0.15)' : 'rgba(255, 98, 0, 0.15)',
                        color: hoveredProject.progress === 100 ? '#22c55e' : '#ff6200',
                        border: `1px solid ${hoveredProject.progress === 100 ? 'rgba(74,222,128,0.25)' : 'rgba(255, 98, 0, 0.25)'}`
                      }}
                    >
                      {hoveredProject.progress === 100 ? 'Completed' : `${hoveredProject.progress}% Progress`}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display font-extrabold text-2xl text-neutral-900 leading-tight mb-1">
                    {hoveredProject.title}
                  </h3>
                  <p className="font-mono text-[10px] tracking-wider text-neutral-400 uppercase mb-4">
                    {hoveredProject.tagline}
                  </p>

                  {/* Image Preview */}
                  <div className="w-full h-32 rounded-lg overflow-hidden border border-neutral-200 mb-4 relative">
                    <img src={hoveredProject.image} alt={hoveredProject.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-white">
                      <MapPin className="w-3.5 h-3.5 text-[#ff6200]" />
                      <span className="text-[11px] font-sans">{hoveredProject.location}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-mono text-[8px] tracking-wider text-neutral-500 uppercase">Construction Progress</span>
                      <span className="font-mono text-[9px] font-bold text-neutral-800">{hoveredProject.progress}%</span>
                    </div>
                    <ProgressBar value={hoveredProject.progress} />
                  </div>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-2 gap-2.5 mb-4">
                    {[
                      { icon: <Home className="w-3.5 h-3.5 text-[#ff6200]" />, label: 'Project Type', val: hoveredProject.specifications.type },
                      { icon: <Ruler className="w-3.5 h-3.5 text-amber-500" />, label: 'Built-up Area', val: hoveredProject.specifications.area },
                      { icon: <Compass className="w-3.5 h-3.5 text-green-500" />, label: 'Facing', val: hoveredProject.specifications.facing },
                      { icon: <Car className="w-3.5 h-3.5 text-blue-500" />, label: 'Parking', val: hoveredProject.specifications.parking },
                    ].map((spec, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-2 bg-neutral-50 rounded border border-neutral-100">
                        {spec.icon}
                        <div>
                          <div className="text-[8px] tracking-wider text-neutral-400 uppercase font-mono">{spec.label}</div>
                          <div className="text-[10px] font-bold text-neutral-800 font-mono">{spec.val}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features Bullet List */}
                  <div className="space-y-1.5">
                    <div className="font-mono text-[8px] tracking-widest text-neutral-400 uppercase mb-1">// MAIN ASSURANCE KEYSTONES</div>
                    {hoveredProject.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="text-[10px] leading-snug">
                        <span className="font-bold text-[#ff6200] font-sans">✓ {feat.title}</span>: <span className="text-neutral-500">{feat.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* View Details CTA */}
                <button
                  onClick={() => navigate(`/project/${hoveredProject.id}`)}
                  className="w-full mt-4 py-3 bg-[#ff6200] hover:bg-[#e05600] text-white font-mono text-xs font-bold tracking-widest rounded flex items-center justify-center gap-2 shadow-sm transition-all duration-300 hover:shadow cursor-pointer"
                >
                  OPEN BLUEPRINT DETAILS
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-neutral-400 font-mono text-xs">
                HOVER OVER A PROJECT TO LOAD TELEMETRY
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Details Drawer */}
      {mobileDrawerOpen && hoveredProject && (
        <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden bg-black/60 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setMobileDrawerOpen(false)} />
          
          <div className="w-full bg-white rounded-t-2xl p-6 relative z-10 max-h-[85vh] overflow-y-auto shadow-2xl border-t border-neutral-200 animate-card-reveal">
            <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto mb-4" />
            
            <button
              onClick={() => setMobileDrawerOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full bg-neutral-100 text-neutral-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[9px] tracking-widest text-[#ff6200] font-bold uppercase">
                {hoveredProject.category} // {hoveredProject.year}
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[8px] font-bold tracking-wider"
                style={{
                  background: hoveredProject.progress === 100 ? 'rgba(74,222,128,0.15)' : 'rgba(255, 98, 0, 0.15)',
                  color: hoveredProject.progress === 100 ? '#22c55e' : '#ff6200',
                  border: `1px solid ${hoveredProject.progress === 100 ? 'rgba(74,222,128,0.25)' : 'rgba(255, 98, 0, 0.25)'}`
                }}
              >
                {hoveredProject.progress === 100 ? 'Completed' : `${hoveredProject.progress}% Progress`}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-xl text-neutral-900 leading-tight mb-1">
              {hoveredProject.title}
            </h3>
            <p className="font-mono text-[10px] tracking-wider text-neutral-450 uppercase mb-4">
              {hoveredProject.tagline}
            </p>

            <div className="w-full h-40 rounded-lg overflow-hidden border border-neutral-200 mb-4 relative">
              <img src={hoveredProject.image} alt={hoveredProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-white">
                <MapPin className="w-3.5 h-3.5 text-[#ff6200]" />
                <span className="text-[11px] font-sans">{hoveredProject.location}</span>
              </div>
            </div>

            <div className="mb-4 bg-neutral-50 p-3 rounded-lg border border-neutral-100">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-[8px] tracking-wider text-[#ff6200] uppercase">Construction Progress</span>
                <span className="font-mono text-[9px] font-bold text-neutral-800">{hoveredProject.progress}%</span>
              </div>
              <ProgressBar value={hoveredProject.progress} />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { icon: <Home className="w-3.5 h-3.5 text-[#ff6200]" />, label: 'Project Type', val: hoveredProject.specifications.type },
                { icon: <Ruler className="w-3.5 h-3.5 text-amber-500" />, label: 'Built-up Area', val: hoveredProject.specifications.area },
                { icon: <Compass className="w-3.5 h-3.5 text-green-500" />, label: 'Facing', val: hoveredProject.specifications.facing },
                { icon: <Car className="w-3.5 h-3.5 text-blue-500" />, label: 'Parking', val: hoveredProject.specifications.parking },
              ].map((spec, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-neutral-50 rounded border border-neutral-100">
                  {spec.icon}
                  <div>
                    <div className="text-[8px] tracking-wider text-neutral-450 uppercase font-mono">{spec.label}</div>
                    <div className="text-[10px] font-bold text-neutral-800 font-mono">{spec.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileDrawerOpen(false);
                navigate(`/project/${hoveredProject.id}`);
              }}
              className="w-full py-3 bg-[#ff6200] text-white font-mono text-xs font-bold tracking-widest rounded flex items-center justify-center gap-2"
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
