import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

function ReviewPaper({ review }) {
  if (!review) return null;
  return (
    <div className="w-full h-full p-3.5 sm:p-4 flex flex-col justify-between text-left select-text pointer-events-auto">
      {/* Top Header */}
      <div>
        <div className="flex justify-between items-baseline mb-1 gap-1.5">
          <span className="font-sans font-bold text-[11.5px] sm:text-xs text-neutral-900 leading-tight">
            {review.name}
          </span>
          <span className="font-mono text-[7.5px] sm:text-[8px] text-neutral-400 shrink-0">
            {review.date}
          </span>
        </div>
        {/* Stars */}
        <div className="flex gap-0.5 mb-1.5">
          {[...Array(5)].map((_, idx) => (
            <Star key={idx} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current text-[#ff6200]" />
          ))}
        </div>
        {/* Comment - fully readable */}
        <p className="font-serif italic text-[10px] sm:text-[10.5px] text-neutral-700 leading-relaxed">
          "{review.comment}"
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-1.5 border-t border-neutral-100 flex justify-between items-center text-[7.5px] sm:text-[8px] font-mono text-neutral-400">
        <span className="truncate max-w-[115px]" title={review.metadata}>{review.metadata}</span>
        <span className="text-[#ff6200] font-bold shrink-0">{review.authTag}</span>
      </div>
    </div>
  );
}

const Folder = ({
  color = '#5227FF',
  category = 'RESIDENTIAL',
  rawReviews = [],
  isOpen = false,
  onOpen,
  onClose,
  className = ''
}) => {
  const maxItems = 3;
  const papers = rawReviews.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

  const folderBackColor = darkenColor(color, 0.12);
  const paper1 = darkenColor('#ffffff', 0.08);
  const paper2 = darkenColor('#ffffff', 0.04);
  const paper3 = '#ffffff';

  // Keyboard navigation when folder is open
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setActiveIndex(prev => (prev === maxItems - 1 ? 0 : prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex(prev => (prev === 0 ? maxItems - 1 : prev - 1));
      } else if (e.key === 'Escape') {
        if (onClose) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const getCardStyle = index => {
    if (!isOpen) {
      return {
        transform: 'translate(-50%, 0)',
        zIndex: 20,
        opacity: 1,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        pointerEvents: 'none'
      };
    }

    // Relative offset from currently active spotlight card
    const offset = (index - activeIndex + maxItems) % maxItems;
    const isHovered = hoveredCardIndex === index;

    if (offset === 0) {
      // Active / Spotlight Card: elevated, centered, perfectly straight, fully readable
      return {
        transform: isHovered
          ? 'translate(-50%, -96%) rotate(0deg) scale(1.18)'
          : 'translate(-50%, -90%) rotate(0deg) scale(1.14)',
        zIndex: isHovered ? 55 : 42,
        opacity: 1,
        boxShadow: '0 24px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(255, 98, 0, 0.3)',
        pointerEvents: 'auto',
        cursor: 'default'
      };
    } else if (offset === 1) {
      // Next Card: peeking out to the right wing
      return {
        transform: isHovered
          ? 'translate(-15%, -82%) rotate(0deg) scale(1.1)'
          : 'translate(-18%, -72%) rotate(7deg) scale(0.96)',
        zIndex: isHovered ? 52 : 25,
        opacity: isHovered ? 1 : 0.9,
        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.25)',
        pointerEvents: 'auto',
        cursor: 'pointer'
      };
    } else {
      // Previous Card: peeking out to the left wing
      return {
        transform: isHovered
          ? 'translate(-85%, -82%) rotate(0deg) scale(1.1)'
          : 'translate(-82%, -72%) rotate(-7deg) scale(0.96)',
        zIndex: isHovered ? 52 : 24,
        opacity: isHovered ? 1 : 0.9,
        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.25)',
        pointerEvents: 'auto',
        cursor: 'pointer'
      };
    }
  };

  return (
    <div
      className={`relative ${className} ${isOpen ? 'pt-24 lg:pt-28 pb-4' : 'pt-0 pb-0'} transition-all duration-300 ease-out`}
      style={{ perspective: '1000px' }}
      onMouseEnter={() => {
        if (!isOpen && onOpen) onOpen();
      }}
    >
      <button
        type="button"
        className={`group relative text-left transition-all duration-300 ease-out cursor-pointer border-0 bg-transparent p-0 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6200] rounded-xl ${
          !isOpen ? 'hover:-translate-y-2' : ''
        }`}
        onClick={() => {
          if (isOpen && onClose) {
            onClose();
          } else if (onOpen) {
            setActiveIndex(0);
            onOpen();
          }
        }}
        aria-expanded={isOpen}
        aria-label={`Toggle verified reviews for ${category}`}
        style={{
          transform: isOpen ? 'translateY(-8px)' : undefined,
        }}
      >
        <div
          className="relative w-[240px] h-[170px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[12px]"
          style={{ backgroundColor: folderBackColor }}
        >
          {/* Top Folder Tab */}
          <span
            className="absolute bottom-[98%] left-0 w-[70px] h-[15px] rounded-tl-[6px] rounded-tr-[6px]"
            style={{ backgroundColor: folderBackColor }}
          ></span>

          {/* Folder Stencil Label */}
          <div className="absolute inset-x-0 bottom-4 px-5 z-40 pointer-events-none flex flex-col items-start select-none">
            <span className="font-mono text-[9px] tracking-widest text-white/30 mb-0.5 uppercase">// NCS_VERIFIED_DEED</span>
            <span className="font-display font-extrabold text-xl text-white tracking-widest uppercase">{category}</span>
          </div>

          {/* Papers nested inside */}
          {papers.map((item, i) => {
            const cardStyle = getCardStyle(i);

            return (
              <div
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(i);
                  if (!isOpen && onOpen) onOpen();
                }}
                onMouseEnter={() => setHoveredCardIndex(i)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                title={isOpen ? "Click to view full feedback" : "Click to open folder"}
                className={`absolute bottom-[10%] left-1/2 transition-all duration-350 ease-out border border-neutral-100/90 w-[90%] h-[94%] ${
                  !isOpen ? 'transform translate-y-[5%] group-hover:translate-y-0' : ''
                }`}
                style={{
                  ...cardStyle,
                  backgroundColor: i === 0 ? paper1 : i === 1 ? paper2 : paper3,
                  borderRadius: '12px',
                  transformOrigin: 'center center'
                }}
              >
                <ReviewPaper review={item} />
              </div>
            );
          })}

          {/* Folder front flap 1 */}
          <div
            className={`absolute inset-0 origin-bottom transition-all duration-300 ease-out z-30 pointer-events-none ${
              !isOpen ? 'group-hover:[transform:skew(12deg)_scaleY(0.55)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '5px 12px 12px 12px',
              transform: isOpen ? 'skew(12deg) scaleY(0.55)' : undefined
            }}
          ></div>

          {/* Folder front flap 2 */}
          <div
            className={`absolute inset-0 origin-bottom transition-all duration-300 ease-out z-30 pointer-events-none ${
              !isOpen ? 'group-hover:[transform:skew(-12deg)_scaleY(0.55)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '5px 12px 12px 12px',
              transform: isOpen ? 'skew(-12deg) scaleY(0.55)' : undefined
            }}
          ></div>
        </div>
      </button>

      {/* Unified Feedback Navigation Bar (Available on Desktop & Mobile) */}
      {isOpen ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-6 flex flex-col items-center gap-2 relative z-50 select-none animate-fadeIn"
        >
          <div className="flex items-center gap-2.5 sm:gap-3 bg-neutral-900/95 border border-[#ff6200]/40 px-3.5 py-1.5 rounded-full shadow-2xl backdrop-blur-md">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(prev => (prev === 0 ? maxItems - 1 : prev - 1));
              }}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#ff6200]/30 active:scale-90 flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Previous Feedback"
              title="Previous feedback (or Left Arrow key)"
            >
              <ChevronLeft className="w-4 h-4 text-[#ff6200]" />
            </button>

            {/* Quick Dot Selectors */}
            <div className="flex items-center gap-1.5 px-1">
              {[0, 1, 2].map((dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(dotIdx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    activeIndex === dotIdx
                      ? 'bg-[#ff6200] w-5'
                      : 'bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Jump to feedback ${dotIdx + 1}`}
                  title={rawReviews[dotIdx]?.name || `Feedback ${dotIdx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5 px-1 font-mono text-[10px] text-neutral-300">
              <span className="font-bold text-[#ff6200]">{activeIndex + 1}</span>
              <span className="text-neutral-500">/</span>
              <span>{maxItems}</span>
              <span className="text-white/90 font-medium ml-1 truncate max-w-[90px] sm:max-w-[120px]" title={rawReviews[activeIndex]?.name}>
                {rawReviews[activeIndex]?.name}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(prev => (prev === maxItems - 1 ? 0 : prev + 1));
              }}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#ff6200]/30 active:scale-90 flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Next Feedback"
              title="Next feedback (or Right Arrow key)"
            >
              <ChevronRight className="w-4 h-4 text-[#ff6200]" />
            </button>
          </div>

          <div className="flex items-center gap-3 text-[9px] font-mono">
            <span className="text-neutral-400">
              Click cards or arrows to flip
            </span>
            <span className="text-neutral-600">•</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onClose) onClose();
              }}
              className="text-[#ff6200] hover:text-[#ff8c39] uppercase tracking-wider font-bold cursor-pointer underline underline-offset-2"
            >
              Close Folder
            </button>
          </div>
        </div>
      ) : (
        /* Tutorial / Click Label under folder */
        <div className="text-center mt-5 h-5 select-none pointer-events-none">
          <span
            className="font-mono text-[9px] tracking-[0.25em] uppercase transition-all duration-300 text-white/40"
            style={{
              animation: 'pulseText 2s infinite ease-in-out'
            }}
          >
            Click or Hover to Explore
          </span>
        </div>
      )}

      <style>{`
        @keyframes pulseText {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.85; }
        }
      `}</style>
    </div>
  );
};

export default function Reviews() {
  const [openCategory, setOpenCategory] = useState(null);

  const residentialReviews = [
    {
      name: "Yesrin Julias",
      date: "3 months ago",
      comment: "Professional craftsmanship. They constructed our dream residential villa with amazing smart features and completed it on-schedule. Excellent project management!",
      authTag: "DEED#0326-YSR",
      metadata: "1 review · Verified Owner"
    },
    {
      name: "Batra Kannaalan",
      date: "4 months ago",
      comment: "Professional design, itemized blueprints, and excellent execution. Every milestone was met with detailed digital twins.",
      authTag: "DEED#0426-BTR",
      metadata: "5 reviews · Client ID: RA2552001020236"
    },
    {
      name: "Senthil Kumar",
      date: "May 2026",
      comment: "Noor Infrastructure built a masterpiece for our family. The smart home integration is light years ahead of standard builders. Every wall feels engineered.",
      authTag: "DEED#0924-ECR",
      metadata: "5.0 RATED · Villa Owner"
    }
  ];

  const commercialReviews = [
    {
      name: "Kingpin Rental cars",
      date: "4 months ago",
      comment: "Noor Infrastructure provided excellent service. The quality of work was very good and the project was completed on time. The team was professional and cooperative. Highly recommended.",
      authTag: "DEED#0426-KPG",
      metadata: "4 reviews · 5 photos"
    },
    {
      name: "abdul wadood",
      date: "7 months ago",
      comment: "Great communication, premium finishing, and on-time completion. Recommended for commercial and high-end residential works.",
      authTag: "DEED#0725-ABD",
      metadata: "1 review · 4 photos"
    },
    {
      name: "Farhan Dhawood",
      date: "March 2026",
      comment: "The digital twin technology allowed us to walk through our commercial park before a single block was cast. Milestone transparency is unmatched.",
      authTag: "DEED#1102-DHW",
      metadata: "Managing Director"
    }
  ];

  const coastalReviews = [
    {
      name: "Afru Dheen",
      date: "4 months ago",
      comment: "Excellent response time and build quality. Noor's salt-resistant materials are perfect for coastal properties. Very satisfied!",
      authTag: "DEED#0426-AFR",
      metadata: "3 reviews · 3 photos"
    },
    {
      name: "Sarah Joshua",
      date: "Jan 2026",
      comment: "Building along ECR demands salt resistance and wind-rated structures. Noor's advanced materials and elevated architecture have kept our coastal home pristine.",
      authTag: "DEED#0442-ECR",
      metadata: "Coastal Resident"
    },
    {
      name: "Dr. Ananya Ramakrishnan",
      date: "April 2026",
      comment: "The structural precision and eco-concrete choices reflect genuine engineering excellence. Their BIM digital twin let us inspect every beam before it was poured.",
      authTag: "DEED#0714-KAL",
      metadata: "Scientific Consultant"
    }
  ];

  // Close folder if clicking outside
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (openCategory && !e.target.closest('#reviews-folders-container')) {
        setOpenCategory(null);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [openCategory]);

  return (
    <section
      id="reviews"
      className="relative w-full lg:min-h-screen flex flex-col justify-center py-16 px-6 luxury-grain"
      style={{ background: '#18181b' }}
    >
      {/* Subtle orange radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255, 98, 0, 0.05) 0%, transparent 65%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-center h-full">
        {/* Header Block */}
        <div className="text-center mb-10 sm:mb-14 shrink-0">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-8 h-[1px]" style={{ background: '#ff6200' }} />
            <span
              className="text-[10px] tracking-[0.35em] font-bold uppercase"
              style={{ color: '#ff6200', fontFamily: 'var(--font-mono)' }}
            >
              Client Reviews
            </span>
            <div className="w-8 h-[1px]" style={{ background: '#ff6200' }} />
          </div>

          <h2
            className="font-display font-extrabold leading-none mb-3 text-white"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
          >
            Client{' '}
            <span className="font-serif italic font-normal text-gold-gradient">
              Sign-Off
            </span>
          </h2>
          <p className="font-sans text-[13px] leading-relaxed max-w-lg mx-auto" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Hover over or click the category folders to open verified client feedback for each project section.
          </p>
        </div>

        {/* Folders Layout */}
        <div className="flex flex-col items-center w-full">
          <div
            id="reviews-folders-container"
            className="flex flex-col lg:flex-row justify-center items-center gap-20 lg:gap-24 w-full overflow-visible"
          >
            <Folder
              color="#ff6200"
              category="Residential"
              rawReviews={residentialReviews}
              isOpen={openCategory === 'Residential'}
              onOpen={() => setOpenCategory('Residential')}
              onClose={() => setOpenCategory(null)}
            />
            <Folder
              color="#27272a"
              category="Commercial"
              rawReviews={commercialReviews}
              isOpen={openCategory === 'Commercial'}
              onOpen={() => setOpenCategory('Commercial')}
              onClose={() => setOpenCategory(null)}
            />
            <Folder
              color="#cc4e00"
              category="Coastal"
              rawReviews={coastalReviews}
              isOpen={openCategory === 'Coastal'}
              onOpen={() => setOpenCategory('Coastal')}
              onClose={() => setOpenCategory(null)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
