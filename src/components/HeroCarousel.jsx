import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CAROUSEL_IMAGES = [
  { 
    id: 'coastal-highway', 
    src: '/infra_highway.jpg', 
    alt: 'Highway & Road Infrastructure Development' 
  },
  { 
    id: 'solar-infrastructure', 
    src: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/KamuthiSolarPark.jpg', 
    fallback: '/infra_highway.jpg',
    alt: 'Clean Solar Renewable Energy Infrastructure' 
  },
  { 
    id: 'state-highway-ecr', 
    src: 'https://upload.wikimedia.org/wikipedia/commons/2/24/2017_four_lane_state_highway_SH_49_Tamil_Nadu_India.jpg', 
    fallback: '/infra_highway.jpg',
    alt: '4-Lane State Highway Infrastructure' 
  },
  { 
    id: 'earthworks-civil', 
    src: '/about_inspection.png', 
    alt: 'Civil Earthworks & Infrastructure Logistics' 
  },
  { 
    id: 'infrastructure-planning', 
    src: '/hero_bg_workers_colored.png', 
    alt: 'Civil Infrastructure Technical Engineering' 
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
    if (Math.abs(diff) > 40) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
    setTouchStartX(null);
  };

  const currentImg = CAROUSEL_IMAGES[currentIndex];

  return (
    <div
      className="relative w-full max-w-[390px] lg:max-w-[420px] mx-auto select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Noor Infrastructure Carousel"
    >
      {/* Subtle brand glow behind carousel */}
      <div 
        className="absolute -inset-1 rounded-[24px] opacity-25 blur-lg transition-opacity duration-500 group-hover:opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 98, 0, 0.4) 0%, transparent 70%)'
        }}
      />

      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-[20px] border border-white/15 bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.55)] backdrop-blur-md aspect-[4/3] w-full">
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

        {/* Left Arrow Button */}
        <button
          onClick={goToPrev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white border border-white/20 backdrop-blur-md shadow-md transition-all duration-200 hover:bg-[#ff6200] hover:border-[#ff6200] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={goToNext}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white border border-white/20 backdrop-blur-md shadow-md transition-all duration-200 hover:bg-[#ff6200] hover:border-[#ff6200] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Minimal dot indicators (Zero words) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
          {CAROUSEL_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? 'w-5 bg-[#ff6200]' : 'w-1.5 bg-white/40 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
