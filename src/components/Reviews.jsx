import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

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
    <div className="w-full h-full p-4 flex flex-col justify-between text-left select-text pointer-events-auto">
      {/* Top Header */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="font-sans font-bold text-[10.5px] text-neutral-800 truncate max-w-[130px]" title={review.name}>
            {review.name}
          </span>
          <span className="font-mono text-[7px] text-neutral-400 shrink-0">
            {review.date}
          </span>
        </div>
        {/* Stars */}
        <div className="flex gap-0.5 mb-1.5">
          {[...Array(5)].map((_, idx) => (
            <Star key={idx} className="w-2.5 h-2.5 fill-current text-orange-500" />
          ))}
        </div>
        {/* Comment */}
        <p className="font-serif italic text-[9.5px] text-neutral-600 leading-relaxed line-clamp-4">
          "{review.comment}"
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-1.5 border-t border-neutral-100 flex justify-between items-center text-[7px] font-mono text-neutral-400">
        <span className="truncate max-w-[110px]" title={review.metadata}>{review.metadata}</span>
        <span className="text-[#ff6200] font-bold shrink-0">{review.authTag}</span>
      </div>
    </div>
  );
}

const Folder = ({ color = '#5227FF', category = 'RESIDENTIAL', items = [], className = '' }) => {
  const maxItems = 3;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const folderBackColor = darkenColor(color, 0.12);
  const paper1 = darkenColor('#ffffff', 0.08);
  const paper2 = darkenColor('#ffffff', 0.04);
  const paper3 = '#ffffff';

  const handleMouseEnter = () => {
    if (!isMobile) setOpen(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setOpen(false);
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e, index) => {
    if (!open || isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.18;
    const offsetY = (e.clientY - centerY) * 0.18;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (e, index) => {
    if (isMobile) return;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const getOpenTransform = index => {
    if (isMobile) {
      // Stack rising straight up vertically like index cards on mobile
      if (index === 0) return 'translate(-50%, -75%) rotate(-4deg) scale(1.05)';
      if (index === 1) return 'translate(-50%, -48%) rotate(3deg) scale(1.05)';
      if (index === 2) return 'translate(-50%, -20%) rotate(-1deg) scale(1.05)';
    } else {
      // Fan out horizontally on desktop
      if (index === 0) return 'translate(-112%, -58%) rotate(-12deg) scale(1.15)';
      if (index === 1) return 'translate(12%, -58%) rotate(12deg) scale(1.15)';
      if (index === 2) return 'translate(-50%, -95%) rotate(2deg) scale(1.18)';
    }
    return '';
  };

  return (
    <div className={`relative ${className}`} style={{ perspective: '1000px' }}>
      <div
        className={`group relative transition-all duration-300 ease-out cursor-pointer ${
          !open ? 'hover:-translate-y-2' : ''
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setOpen(prev => !prev)}
        style={{
          transform: open ? 'translateY(-8px)' : undefined
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
            let sizeClasses = '';
            if (i === 0) sizeClasses = 'w-[88%] h-[92%]';
            if (i === 1) sizeClasses = 'w-[88%] h-[92%]';
            if (i === 2) sizeClasses = 'w-[90%] h-[92%]';

            const transformStyle = open
              ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
              : 'translate(-50%, 0)';

            return (
              <div
                key={i}
                onMouseMove={e => handlePaperMouseMove(e, i)}
                onMouseLeave={e => handlePaperMouseLeave(e, i)}
                className={`absolute z-20 bottom-[10%] left-1/2 transition-all duration-350 ease-out border border-neutral-100 ${
                  !open ? 'transform translate-y-[5%] group-hover:translate-y-0' : 'hover:scale-[1.3] hover:z-50 hover:rotate-0'
                } ${sizeClasses}`}
                style={{
                  transform: transformStyle,
                  backgroundColor: i === 0 ? paper1 : i === 1 ? paper2 : paper3,
                  borderRadius: '12px',
                  boxShadow: open ? '0 12px 32px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)',
                  transformOrigin: 'center center'
                }}
              >
                {item}
              </div>
            );
          })}

          {/* Folder front flap 1 */}
          <div
            className={`absolute inset-0 origin-bottom transition-all duration-300 ease-out z-30 ${
              !open ? 'group-hover:[transform:skew(12deg)_scaleY(0.55)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '5px 12px 12px 12px',
              transform: open ? 'skew(12deg) scaleY(0.55)' : undefined
            }}
          ></div>

          {/* Folder front flap 2 */}
          <div
            className={`absolute inset-0 origin-bottom transition-all duration-300 ease-out z-30 ${
              !open ? 'group-hover:[transform:skew(-12deg)_scaleY(0.55)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '5px 12px 12px 12px',
              transform: open ? 'skew(-12deg) scaleY(0.55)' : undefined
            }}
          ></div>
        </div>
      </div>

      {/* Tutorial Label under the folder */}
      <div className="text-center mt-5 h-5 select-none pointer-events-none">
        <span
          className="font-mono text-[9px] tracking-[0.25em] uppercase transition-all duration-300"
          style={{
            color: open ? '#ff6200' : 'rgba(255, 255, 255, 0.4)',
            opacity: open ? 0.95 : 0.7,
            animation: !open ? 'pulseText 2s infinite ease-in-out' : 'none'
          }}
        >
          {open ? (isMobile ? 'Tap folder to close' : '← Hover papers to expand →') : (isMobile ? 'Tap to Explore' : 'Click to Explore')}
        </span>
      </div>

      <style>{`
        @keyframes pulseText {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default function Reviews() {
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

  return (
    <section
      id="reviews"
      className="relative w-full lg:min-h-screen flex flex-col justify-center py-12 px-6 luxury-grain"
      style={{ background: '#18181b' }}
    >
      {/* Subtle orange radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255, 98, 0, 0.05) 0%, transparent 65%)', filter: 'blur(80px)' }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-center h-full">
        {/* Header Block */}
        <div className="text-center mb-24 shrink-0">
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
          <p className="font-sans text-[13px] leading-relaxed max-w-md mx-auto" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Hover over the category folders to open verified client feedback for each project section.
          </p>
        </div>

        {/* Folders Layout Grid */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-20 lg:gap-28 mt-8 w-full overflow-visible">
          <Folder
            color="#ff6200"
            category="Residential"
            items={residentialReviews.map((r, i) => <ReviewPaper key={i} review={r} />)}
          />
          <Folder
            color="#27272a"
            category="Commercial"
            items={commercialReviews.map((r, i) => <ReviewPaper key={i} review={r} />)}
          />
          <Folder
            color="#cc4e00"
            category="Coastal"
            items={coastalReviews.map((r, i) => <ReviewPaper key={i} review={r} />)}
          />
        </div>
      </div>
    </section>
  );
}
