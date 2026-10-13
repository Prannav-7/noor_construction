import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { ArrowUpRight, X, Compass, PhoneCall, MapPin } from 'lucide-react';

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.436.002 9.858-4.384 9.86-9.8 0-2.623-1.02-5.088-2.871-6.941-1.852-1.853-4.319-2.87-6.939-2.871-5.438 0-9.861 4.386-9.864 9.802 0 1.547.414 3.055 1.2 4.4l-.794 2.899 2.97-.779.803.438zm11.287-6.953c-.302-.15-1.787-.88-2.062-.98-.276-.1-.477-.15-.677.15-.2.3-.777.98-.95 1.18-.175.2-.35.225-.652.075-.302-.15-1.276-.47-2.43-1.499-.896-.8-1.5-1.787-1.676-2.087-.175-.3-.019-.462.13-.611.135-.134.302-.35.453-.525.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.677-1.63-.927-2.23-.244-.589-.493-.51-.677-.52l-.578-.01c-.2 0-.525.075-.8.375-.276.3-1.053 1.03-1.053 2.5 0 1.475 1.078 2.899 1.228 3.1.15.2 2.11 3.22 5.11 4.516.714.309 1.271.493 1.703.63.717.228 1.368.196 1.883.12.574-.085 1.787-.73 2.037-1.43.25-.7.25-1.3.175-1.43-.075-.125-.275-.2-.578-.35z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const CardNav = ({
  logo,
  logoAlt = 'Logo',
  className = '',
  onCtaClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  const handleLinkClick = (e, href, isDrawerClick = false) => {
    if (href === '#enquire') {
      e.preventDefault();
      onCtaClick?.();
      if (isDrawerClick) setIsMenuOpen(false);
    } else if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/' + href);
      if (isDrawerClick) setIsMenuOpen(false);
    } else {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
      if (isDrawerClick) setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'About Us', href: '#about', tag: '01' },
    { label: 'The Way of Architecture', href: '#architecture', tag: '02' },
    { label: 'Portfolio', href: '#projects', tag: '03' },
    { label: 'Cost Estimator', href: '#estimator', tag: '04' },
    { label: 'Packages', href: '#packages', tag: '05' },
    { label: 'Reviews', href: '#reviews', tag: '06' },
    { label: 'Contact', href: '#contact', tag: '07' },
  ];

  return (
    <>
      {/* ── MINIMALIST LUXURY NAVIGATION BAR ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] w-full flex items-center justify-between px-6 sm:px-10 md:px-14 transition-all duration-300 ${scrolled
            ? 'h-16 bg-neutral-950/85 backdrop-blur-md border-b border-white/8 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
            : 'h-20 bg-transparent border-b border-white/5'
          } ${className}`}
      >
        {/* LOGO: ALWAYS ANCHORED ON THE LEFT */}
        <div className="flex items-center">
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
          >
            <img
              src={logo}
              alt={logoAlt}
              className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-[13px] sm:text-[14px] text-white tracking-widest uppercase">
                NOOR
              </span>
              <span className="font-mono text-[7px] text-[#ff6200] font-bold tracking-[0.25em] uppercase mt-0.5">
                Infrastructure
              </span>
            </div>
          </a>
        </div>

        {/* TOP RIGHT: MINIMALIST MENU TRIGGER */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/917200629949"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full text-white/70 hover:text-[#ff6200] hover:bg-white/5 transition-all cursor-pointer"
            aria-label="Contact on WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>

          {/* Minimalist Architectural Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/15 hover:border-[#ff6200] bg-black/40 hover:bg-[#ff6200] text-white transition-all cursor-pointer backdrop-blur-md shadow-sm group"
            aria-label="Open Menu"
          >
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold text-white/90 group-hover:text-white">
              MENU
            </span>
            <div className="flex flex-col gap-1 w-3.5">
              <span className="w-full h-[1.5px] bg-[#ff6200] group-hover:bg-white transition-colors rounded-full" />
              <span className="w-2.5 h-[1.5px] bg-[#ff6200] group-hover:bg-white transition-colors rounded-full ml-auto" />
            </div>
          </button>
        </div>
      </header>

      {/* ── EXPANSIVE LUXURY ARCHITECTURAL MENU DRAWER ── */}
      {isMenuOpen && createPortal(
        <div className="fixed inset-0 z-[10000] bg-neutral-950/98 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto animate-fadeIn">
          {/* Top Bar inside Drawer */}
          <div className="h-20 flex items-center justify-between px-6 sm:px-12 border-b border-white/8 bg-neutral-950/80 shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <img src={logo} alt={logoAlt} className="h-8 w-auto object-contain" />
              <div className="flex flex-col leading-none">
                <span className="font-display font-extrabold text-[13px] text-white tracking-widest uppercase">
                  NOOR
                </span>
                <span className="font-mono text-[7px] text-[#ff6200] font-bold tracking-[0.25em] uppercase mt-0.5">
                  Infrastructure
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/917200629949"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xl text-[#ff6200] border border-[#ff6200]/25 bg-white/5 hover:bg-[#ff6200] hover:text-white transition-colors"
                aria-label="Contact on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#ff6200] text-white border border-white/15 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest">CLOSE</span>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="max-w-6xl w-full mx-auto px-6 sm:px-12 py-10 my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left: Architectural Credentials & Scale */}
            <div className="lg:col-span-5 space-y-6 hidden sm:block">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#ff6200]" />
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#ff6200] uppercase font-bold">
                  ARCHITECTURAL DIRECTORY
                </span>
              </div>

              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-tight">
                Engineering Legacies Along the Tamil Nadu Coast.
              </h2>

              <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Supervised by Er. K. Noor Mohammed (Chief Principal Architect). From passive Dravidian courtyards to 2026 4D BIM digital twin construction.
              </p>

              {/* Verified Metrics */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div>
                  <div className="font-display font-extrabold text-xl text-[#ff6200] leading-none mb-1">150+</div>
                  <div className="font-mono text-[8px] text-neutral-400 uppercase tracking-wider">Happy Customers</div>
                </div>
                <div>
                  <div className="font-display font-extrabold text-xl text-white leading-none mb-1">72+</div>
                  <div className="font-mono text-[8px] text-neutral-400 uppercase tracking-wider">Projects Built</div>
                </div>
                <div>
                  <div className="font-display font-extrabold text-xl text-[#ff6200] leading-none mb-1">15+</div>
                  <div className="font-mono text-[8px] text-neutral-400 uppercase tracking-wider">Years Heritage</div>
                </div>
              </div>

              <div className="text-neutral-400 font-mono text-[10px] space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#ff6200]" />
                  <span>East Coast Road, Pudupattinam & Kalpakkam, Tamil Nadu</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-[#ff6200]" />
                  <span>+91 72006 29949 • info@noorconstruction.com</span>
                </div>
              </div>
            </div>

            {/* Right: Navigation Links */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <nav className="flex flex-col space-y-3 sm:space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href, true)}
                    className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[11px] font-bold text-[#ff6200] group-hover:scale-110 transition-transform">
                        {link.tag} //
                      </span>
                      <span className="font-display font-extrabold text-xl sm:text-2xl text-white group-hover:text-[#ff6200] transition-colors">
                        {link.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-[#ff6200] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </a>
                ))}
              </nav>

              <div className="pt-6 mt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onCtaClick?.();
                  }}
                  className="glow-btn btn-gold flex-1 py-3.5 rounded-xl font-mono text-xs font-bold tracking-widest uppercase cursor-pointer"
                >
                  TRANSMIT ALLOCATION DEED
                </button>

                <div className="flex items-center justify-center gap-3">
                  <a
                    href="https://wa.me/917200629949"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-xl text-[#ff6200] border border-[#ff6200]/25 bg-white/5 hover:bg-[#ff6200] hover:text-white transition-colors"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/noor_constructions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-xl text-[#ff6200] border border-[#ff6200]/25 bg-white/5 hover:bg-[#ff6200] hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Drawer Bottom Bar */}
          <div className="py-4 px-6 sm:px-12 border-t border-white/8 text-center text-neutral-500 font-mono text-[9px] uppercase tracking-widest shrink-0">
            NOOR INFRASTRUCTURE & ARCHITECTURAL SOLUTIONS • RERA GOVT OF TAMIL NADU REGISTERED
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default CardNav;
