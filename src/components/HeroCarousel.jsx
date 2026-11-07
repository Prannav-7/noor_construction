import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CAROUSEL_IMAGES = [
  { 
    id: 'structural-slab-inspection', 
    src: '/hero_bg_workers_colored.png', 
    alt: 'Site Engineers & Structural Slab Construction' 
  },
  { 
    id: 'multi-story-construction', 
    src: '/local_apartment_construction.png', 
    alt: 'Multi-Story Residential Framing & Masonry Site' 
  },
  { 
    id: 'ground-civil-construction', 
    src: '/hero_bg_local_construction.png', 
    alt: 'Ground Structural Framing & Active Brickwork' 
  },
  { 
    id: 'engineering-supervision', 
    src: '/about_inspection.png', 
    alt: 'Civil Engineers Blueprint & Rebar Framework Inspection' 
  },
  { 
    id: 'commercial-structural-development', 
    src: '/rough_skyscraper.png', 
    alt: 'High-Rise Commercial Concrete Framing & Construction' 
  },
];

const AUTO_INTERVAL = 3800; // 3.8s automatic interval

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const timerRef = useRef(null);

  const total = CAROUSEL_IMAGES.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Automatic carousel timer
  useEffect(() => {
    if (isHovered) return;

    timerRef.current = setInterval(() => {
      goToNext();
    }, AUTO_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, goToNext]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
    setTouchStartX(null);
  };

  const currentImg = CAROUSEL_IMAGES[currentIndex];

  return (
    <div
      className="relative w-full max-w-[320px] xs:max-w-[340px] sm:max-w-[380px] md:max-w-[400px] lg:max-w-[480px] xl:max-w-[530px] 2xl:max-w-[650px] mx-auto select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Noor Infrastructure Carousel"
    >
      {/* Subtle brand glow behind carousel */}
      <div 
        className="absolute -inset-0.5 sm:-inset-1 rounded-[18px] sm:rounded-[24px] opacity-20 sm:opacity-25 blur-md sm:blur-lg transition-opacity duration-500 group-hover:opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 98, 0, 0.4) 0%, transparent 70%)'
        }}
      />

      {/* Carousel Container - Fully responsive aspect ratio on mobile & laptop */}
      <div className="relative overflow-hidden rounded-[16px] sm:rounded-[20px] lg:rounded-[22px] xl:rounded-[24px] 2xl:rounded-[28px] border border-white/15 bg-black/60 shadow-[0_15px_40px_rgba(0,0,0,0.55)] lg:shadow-[0_20px_50px_rgba(0,0,0,0.7)] 2xl:shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-md aspect-[16/10] sm:aspect-[4/3] w-full">
        {/* Animated Image Slides */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImg.id}
            src={currentImg.src}
            alt={currentImg.alt}
            onError={(e) => {
              if (currentImg.fallback && e.currentTarget.src !== currentImg.fallback) {
                e.currentTarget.src = currentImg.fallback;
              }
            }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </AnimatePresence>

        {/* Soft edge vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15 pointer-events-none" />

        {/* Left Arrow Button - Scaled for touch targets on mobile & desktop */}
        <button
          onClick={goToPrev}
          aria-label="Previous image"
          className="absolute left-2 sm:left-3 lg:left-4 2xl:left-5 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 sm:h-9 sm:w-9 lg:h-10 lg:w-10 2xl:h-12 2xl:w-12 items-center justify-center rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-md shadow-md transition-all duration-200 hover:bg-[#ff6200] hover:border-[#ff6200] active:scale-90 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
        </button>

        {/* Right Arrow Button - Scaled for touch targets on mobile & desktop */}
        <button
          onClick={goToNext}
          aria-label="Next image"
          className="absolute right-2 sm:right-3 lg:right-4 2xl:right-5 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 sm:h-9 sm:w-9 lg:h-10 lg:w-10 2xl:h-12 2xl:w-12 items-center justify-center rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-md shadow-md transition-all duration-200 hover:bg-[#ff6200] hover:border-[#ff6200] active:scale-90 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
        </button>

        {/* Minimal dot indicators (Zero words) - Responsive sizing */}
        <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 2xl:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 sm:gap-1.5 lg:gap-2 2xl:gap-2.5 px-2 sm:px-2.5 lg:px-3 2xl:px-4 py-0.5 sm:py-1 2xl:py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/10">
          {CAROUSEL_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1 sm:h-1.5 lg:h-2 2xl:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? 'w-4 sm:w-5 lg:w-6 2xl:w-8 bg-[#ff6200]' : 'w-1 sm:w-1.5 lg:w-2 2xl:w-2.5 bg-white/40 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
