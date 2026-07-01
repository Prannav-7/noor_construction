import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.436.002 9.858-4.384 9.86-9.8 0-2.623-1.02-5.088-2.871-6.941-1.852-1.853-4.319-2.87-6.939-2.871-5.438 0-9.861 4.386-9.864 9.802 0 1.547.414 3.055 1.2 4.4l-.794 2.899 2.97-.779.803.438zm11.287-6.953c-.302-.15-1.787-.88-2.062-.98-.276-.1-.477-.15-.677.15-.2.3-.777.98-.95 1.18-.175.2-.35.225-.652.075-.302-.15-1.276-.47-2.43-1.499-.896-.8-1.5-1.787-1.676-2.087-.175-.3-.019-.462.13-.611.135-.134.302-.35.453-.525.15-.175.2-.3.301-.5.1-.2.05-.375-.025-.525-.075-.15-.677-1.63-.927-2.23-.244-.589-.493-.51-.677-.52l-.578-.01c-.2 0-.525.075-.8.375-.276.3-1.053 1.03-1.053 2.5 0 1.475 1.078 2.899 1.228 3.1.15.2 2.11 3.22 5.11 4.516.714.309 1.271.493 1.703.63.717.228 1.368.196 1.883.12.574-.085 1.787-.73 2.037-1.43.25-.7.25-1.3.175-1.43-.075-.125-.275-.2-.578-.35z"/>
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
  showNav: propShowNav
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);
  
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
      setScrolled(scrollY > 40);
      setShowNav(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  const handleLinkClick = (e, href, isMobileClick = false) => {
    if (href === '#enquire') {
      e.preventDefault();
      onCtaClick?.();
      if (isMobileClick) setIsMenuOpen(false);
    } else if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/' + href);
      if (isMobileClick) setIsMenuOpen(false);
    } else {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
      if (isMobileClick) setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Portfolio', href: '#projects' },
    { label: 'Packages', href: '#packages' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[950] w-full flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
          (propShowNav !== undefined ? (propShowNav && showNav) : showNav)
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
        } ${
          scrolled 
            ? 'h-16 bg-neutral-950/85 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]' 
            : 'h-20 bg-transparent border-b border-white/5'
        } ${className}`}
      >
        {/* LOGO CONTAINER */}
        <div className="flex items-center">
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="flex items-center gap-2.5 group"
          >
            <img
              src={logo}
              alt={logoAlt}
              className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-[13px] md:text-[15px] text-white tracking-widest uppercase">
                NOOR
              </span>
              <span className="font-mono text-[7px] md:text-[8px] text-[#ff6200] font-bold tracking-[0.25em] uppercase mt-0.5">
                Infrastructure
              </span>
            </div>
          </a>
        </div>

        {/* DESKTOP NAV LINKS & ACTIONS (Right aligned) */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 hover:text-[#ff6200] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="h-4 w-px bg-white/15" />

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/917305130207"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-105 hover:bg-[#ff6200] text-[#ff6200] hover:text-white border border-[#ff6200]/25 bg-white/5 cursor-pointer"
              aria-label="Contact on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/noor_constructions"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-105 hover:bg-[#ff6200] text-[#ff6200] hover:text-white border border-[#ff6200]/25 bg-white/5 cursor-pointer"
              aria-label="Follow on Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            
            <button
              onClick={() => onCtaClick?.()}
              className="btn-gold px-6 py-2.5 rounded-lg font-mono text-[11px] font-bold tracking-widest uppercase transition-all shadow-md hover:shadow-orange-500/10 cursor-pointer"
            >
              INQUIRE NOW
            </button>
          </div>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="flex lg:hidden items-center gap-3">
          <a
            href="https://wa.me/917305130207"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#ff6200] border border-[#ff6200]/20 bg-white/5"
            aria-label="Contact on WhatsApp"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN MENU DRAWER */}
      {isMenuOpen && createPortal(
        <div className="fixed inset-0 z-[9999] lg:hidden bg-neutral-950/98 backdrop-blur-xl flex flex-col justify-center px-8">
          {/* Top Bar inside mobile drawer to close */}
          <div className="absolute top-0 inset-x-0 h-20 flex items-center justify-between px-6 border-b border-white/5 bg-neutral-950/50">
            <div className="flex items-center gap-2.5">
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
                href="https://wa.me/917305130207"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#ff6200] border border-[#ff6200]/20 bg-white/5"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <nav className="flex flex-col gap-6 text-center mt-12">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, true)}
                className="font-display font-extrabold text-2xl tracking-tight text-white hover:text-[#ff6200] transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="h-px bg-white/10 my-4" />

            <button
              onClick={() => {
                setIsMenuOpen(false);
                onCtaClick?.();
              }}
              className="btn-gold w-full py-3.5 rounded-xl font-mono text-xs font-bold tracking-widest uppercase"
            >
              INQUIRE NOW
            </button>

            <div className="flex items-center justify-center gap-4 mt-6">
              <a
                href="https://wa.me/917305130207"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl text-[#ff6200] border border-[#ff6200]/25 bg-white/5"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/noor_constructions"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl text-[#ff6200] border border-[#ff6200]/25 bg-white/5"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </nav>
        </div>,
        document.body
      )}
    </>
  );
};

export default CardNav;

