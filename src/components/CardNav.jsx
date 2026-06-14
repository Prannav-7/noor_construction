import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';

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
  items,
  className = '',
  ease = 'power3.out',
  menuColor = '#ff6200',
  buttonBgColor = '#ff6200',
  buttonTextColor = '#ffffff',
  onCtaClick
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Track scroll to adapt navbar appearance on dark/light backgrounds
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const calculateHeight = () => {
    const dropdownEl = dropdownRef.current;
    if (!dropdownEl) return 0;

    const wasDisplay = dropdownEl.style.display;
    const wasHeight = dropdownEl.style.height;
    const wasOpacity = dropdownEl.style.opacity;

    dropdownEl.style.display = 'flex';
    dropdownEl.style.height = 'auto';
    dropdownEl.style.opacity = '1';

    const contentHeight = dropdownEl.scrollHeight;

    dropdownEl.style.display = wasDisplay;
    dropdownEl.style.height = wasHeight;
    dropdownEl.style.opacity = wasOpacity;

    return contentHeight;
  };

  const createTimeline = () => {
    const dropdownEl = dropdownRef.current;
    if (!dropdownEl) return null;

    gsap.set(dropdownEl, { height: 0, opacity: 0, display: 'none' });
    gsap.set(cardsRef.current, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(dropdownEl, {
      height: calculateHeight,
      opacity: 1,
      duration: 0.35,
      ease,
      onStart: () => {
        gsap.set(dropdownEl, { display: 'flex' });
      },
      onReverseComplete: () => {
        gsap.set(dropdownEl, { display: 'none' });
      }
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.3, ease, stagger: 0.06 }, '-=0.15');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  const handleLinkClick = (e, href) => {
    if (href === '#enquire') {
      e.preventDefault();
      onCtaClick?.();
      toggleMenu();
    } else if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/' + href);
      toggleMenu();
    } else {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
      toggleMenu();
    }
  };

  // Adaptive colors based on scroll position
  const navBg = scrolled
    ? 'rgba(24, 24, 27, 0.88)'
    : 'rgba(24, 24, 27, 0.75)';
  const navBorder = scrolled
    ? 'rgba(255, 98, 0, 0.25)'
    : 'rgba(255, 98, 0, 0.12)';

  return (
    <div
      className={`card-nav-container fixed left-4 md:left-8 z-[950] top-[1.2em] md:top-[1.8em] w-[calc(100vw-2rem)] sm:w-[320px] ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''} block h-[56px] p-0 rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-2xl transition-all duration-500`}
        style={{
          backgroundColor: navBg,
          border: `1px solid ${navBorder}`,
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,98,0,0.08)'
            : '0 4px 24px rgba(0,0,0,0.3)'
        }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[56px] flex items-center gap-2.5 p-2 px-3 z-[2]">
          {/* Hamburger Icon */}
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-[36px] w-[36px] flex flex-col items-center justify-center cursor-pointer gap-[5px] shrink-0 rounded-lg transition-colors duration-200 hover:bg-white/10`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: menuColor }}
          >
            <div
              className={`hamburger-line w-[18px] h-[2px] bg-current transition-all duration-300 ease-out [transform-origin:50%_50%] ${
                isHamburgerOpen ? 'translate-y-[3.5px] rotate-45' : ''
              } group-hover:opacity-80`}
            />
            <div
              className={`hamburger-line w-[18px] h-[2px] bg-current transition-all duration-300 ease-out [transform-origin:50%_50%] ${
                isHamburgerOpen ? '-translate-y-[3.5px] -rotate-45' : ''
              } group-hover:opacity-80`}
            />
          </div>

          {/* Logo container — NCS logo already contains brand name */}
          <div className="logo-container flex items-center shrink-0">
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              className="flex items-center cursor-pointer group"
            >
              <img
                src={logo}
                alt={logoAlt}
                className="logo h-[28px] sm:h-[32px] object-contain drop-shadow-[0_0_8px_rgba(255,98,0,0.15)] transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>

          {/* Social CTA Links */}
          <div className="flex items-center gap-1.5 ml-auto shrink-0">
            {/* WhatsApp */}
            <a
              href="https://wa.me/917305130207"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-350 hover:scale-105 hover:bg-[#ff6200] text-[#ff6200] hover:text-white border border-[#ff6200]/25 bg-white/5 cursor-pointer"
              aria-label="Contact on WhatsApp"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/noor_constructions"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-350 hover:scale-105 hover:bg-[#ff6200] text-[#ff6200] hover:text-white border border-[#ff6200]/25 bg-white/5 cursor-pointer"
              aria-label="Follow on Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* Floating Dropdown Menu Content Grid */}
      <div
        ref={dropdownRef}
        className="card-nav-dropdown-panel mt-2 rounded-2xl shadow-2xl p-3 flex flex-col items-stretch gap-3 justify-start backdrop-blur-2xl will-change-[height,opacity]"
        style={{
          backgroundColor: 'rgba(24, 24, 27, 0.92)',
          border: '1px solid rgba(255, 98, 0, 0.2)',
          display: 'none',
          overflow: 'hidden'
        }}
      >
        {(items || []).slice(0, 3).map((item, idx) => (
          <div
            key={`${item.label}-${idx}`}
            className="nav-card select-none relative flex flex-col gap-2.5 p-4 rounded-xl border border-white/8 min-w-0 transition-all duration-200 hover:border-[#ff6200]/30"
            ref={setCardRef(idx)}
            style={{ backgroundColor: item.bgColor, color: item.textColor }}
          >
            <div className="nav-card-label font-display font-bold tracking-tight text-[17px] border-b border-white/10 pb-1.5">
              {item.label}
            </div>
            <div className="nav-card-links mt-auto flex flex-col gap-[3px]">
              {item.links?.map((lnk, i) => (
                <a
                  key={`${lnk.label}-${i}`}
                  className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-all duration-300 hover:translate-x-1 hover:opacity-100 opacity-80 text-[13px] font-mono tracking-wider font-semibold"
                  href={lnk.href}
                  onClick={(e) => handleLinkClick(e, lnk.href)}
                  aria-label={lnk.ariaLabel}
                >
                  <ArrowUpRight className="nav-card-link-icon w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  {lnk.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardNav;

