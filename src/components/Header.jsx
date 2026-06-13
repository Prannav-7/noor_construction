import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import PillNav from './PillNav';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
];

export default function Header({ setAllocationModal }) {
  const [activeHash, setActiveHash] = useState('#hero');
  const [scrolled, setScrolled] = useState(false);

  // Local clock for sidebar telemetry
  const [timeText, setTimeText] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      setTimeText(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track scroll depth for header opacity
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track dynamic header height
  useEffect(() => {
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth !== lastWidth) {
        lastWidth = currentWidth;
        const header = document.querySelector('header');
        if (header) {
          document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
        }
      }
    };
    const header = document.querySelector('header');
    if (header) {
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll Spy
  useEffect(() => {
    const sections = ['hero', 'projects', 'about', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };
    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveHash(`#${entry.target.id}`);
      });
    };
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const handleHashChange = () => {
      if (window.location.hash) setActiveHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className="hidden lg:flex flex-col justify-between fixed left-0 top-0 bottom-0 w-[240px] bg-[#111113] border-r border-[#ff6200]/15 z-[100] p-6 selection:bg-[#ff6200] selection:text-white"
      >
        <div className="flex flex-col h-full justify-between">
          {/* Top Brand Logo */}
          <div className="flex flex-col items-center text-center gap-4 py-4 border-b border-zinc-800/40">
            <a href="#hero" className="flex items-center shrink-0">
              <img
                src="/logo.png.png"
                alt="NCS Logo"
                className="h-16 w-auto object-contain"
              />
            </a>
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-display font-extrabold text-lg text-white tracking-widest uppercase">
                NOOR
              </span>
              <span className="font-mono text-[8px] text-[#ff6200] font-bold tracking-[0.4em] uppercase">
                Constructions
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-3 my-auto py-8">
            {navItems.map((item) => {
              const isActive = activeHash === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-3 text-[11px] font-bold tracking-[0.2em] uppercase font-mono transition-all duration-300 flex items-center justify-between group rounded-lg ${
                    isActive 
                      ? 'text-[#ff6200] bg-zinc-900/80 shadow-[inset_0_1px_0_rgba(255,98,0,0.08)]' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className={`w-1.5 h-1.5 rounded-full bg-[#ff6200] transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-100 shadow-[0_0_8px_#ff6200]' : 'opacity-0 scale-50 group-hover:opacity-40 group-hover:scale-75'
                  }`} />
                </a>
              );
            })}
          </nav>

          {/* Bottom Telemetry & CTA */}
          <div className="flex flex-col gap-5 py-4 border-t border-zinc-800/40">
            {/* Live Clock */}
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>IST Telemetry</span>
              <span className="text-[#ff6200] font-bold">{timeText}</span>
            </div>

            {/* Enquire CTA */}
            <button
              onClick={() => setAllocationModal(true)}
              className="w-full btn-gold glow-btn py-3.5 text-[11px] font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2 rounded-sm"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span>Enquire</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── MOBILE HEADER ── */}
      <header
        className="lg:hidden sticky top-0 z-[100] w-full px-6 py-3 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(255, 255, 255, 0.92)'
            : 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* Brand Logo */}
          <a href="#hero" className="flex items-center group z-50 shrink-0">
            <img
              src="/logo.png.png"
              alt="NCS Noor Constructions"
              className="h-9 md:h-10 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </a>

          {/* Navigation */}
          <div className="z-50 flex-1 flex justify-center">
            <PillNav
              items={navItems}
              activeHref={activeHash}
              baseColor="#ffffff"
              pillColor="rgba(255, 98, 0,0.08)"
              pillTextColor="#ff6200"
              hoveredPillTextColor="#ff6200"
              hoverCircleColor="rgba(255, 98, 0,0.12)"
              wrapperClassName="w-auto flex items-center justify-center"
              className="w-auto"
              initialLoadAnimation={true}
            />
          </div>

          {/* CTA Button */}
          <div className="flex items-center z-50 shrink-0">
            <button
              onClick={() => setAllocationModal(true)}
              className="glow-btn btn-ghost flex items-center gap-2 px-4 py-2 text-[11px] font-bold tracking-[0.12em] uppercase"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span>Enquire</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
