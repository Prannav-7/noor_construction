import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { MapPin, ChevronRight } from 'lucide-react';
import { ALL_PROJECTS } from '../data/projects';
import './Carousel.css';

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, round, trackItemOffset, x, transition }) {
  const navigate = useNavigate();
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  const isDone = item.progress === 100;

  const backgroundStyle = item.image
    ? {
      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.80) 100%), url(${item.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
    : { background: 'linear-gradient(135deg, #2d2d35 0%, #222227 50%, #f8f9fa 100%)' };

  return (
    <motion.div
      key={`${item?.id ?? index}-${index}`}
      className={`carousel-item ${round ? 'round' : ''} cursor-pointer group`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : '100%',
        rotateY,
        ...backgroundStyle,
        ...(round && { borderRadius: '50%' }),
        position: 'relative',
        overflow: 'hidden',
      }}
      transition={transition}
      onClick={() => item.id && navigate(`/project/${item.id}`)}
      whileHover={{ scale: 1.02 }}
    >
      {/* Status badge */}
      {item.progress !== undefined && (
        <div className={`absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono text-[9px] font-bold tracking-wider ${isDone ? 'bg-green-500 text-white' : 'bg-[#8b0000] text-white'}`}>
          {isDone ? '✓ DONE' : `${item.progress}%`}
        </div>
      )}

      {/* Click hint on hover */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/20 backdrop-blur-sm rounded-full p-1.5">
        <ChevronRight className="w-3 h-3 text-white" />
      </div>

      {/* Content */}
      <div className="carousel-item-content">
        {item.tagline && (
          <p className="font-mono text-[8px] tracking-[0.3em] text-[#ff9999] font-bold mb-1 uppercase">{item.tagline}</p>
        )}
        <div className="carousel-item-title">{item.title}</div>
        <p className="carousel-item-description">{item.description}</p>

        {/* Location tag */}
        {item.location && (
          <div className="flex items-center gap-1 mt-2 text-white/60">
            <MapPin className="w-2.5 h-2.5 text-[#ff9999]" />
            <span className="font-mono text-[8px] tracking-wider">{item.location}</span>
          </div>
        )}

        {/* View Details button */}
        <div className="mt-3 flex items-center gap-1.5 text-white font-mono text-[9px] font-bold tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
          <span>VIEW DETAILS</span>
          <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Carousel({
  items,
  baseWidth = 300,
  autoplay = true,
  autoplayDelay = 5500,
  pauseOnHover = true,
  loop = true,
  round = false
}) {
  // Use ALL_PROJECTS from data if no items prop provided
  const defaultItems = ALL_PROJECTS.map(p => ({
    id: p.id,
    title: p.title,
    description: p.tagline,
    tagline: p.location,
    location: p.location,
    image: p.image,
    progress: p.progress,
  }));

  const resolvedItems = items || defaultItems;

  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const itemsForRender = useMemo(() => {
    if (!loop) return resolvedItems;
    if (resolvedItems.length === 0) return [];
    return [resolvedItems[resolvedItems.length - 1], ...resolvedItems, resolvedItems[0]];
  }, [resolvedItems, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;
    const timer = setInterval(() => {
      setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
  }, [resolvedItems.length, loop, trackItemOffset, x]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => setIsAnimating(true);

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) { setIsAnimating(false); return; }
    const lastCloneIndex = itemsForRender.length - 1;
    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false); });
      return;
    }
    if (position === 0) {
      setIsJumping(true);
      const target = resolvedItems.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => { setIsJumping(false); setIsAnimating(false); });
      return;
    }
    setIsAnimating(false);
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD ? -1
          : 0;
    if (direction === 0) return;
    setPosition(prev => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = loop ? {} : {
    dragConstraints: {
      left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
      right: 0,
    },
  };

  const activeIndex =
    resolvedItems.length === 0 ? 0
      : loop ? (position - 1 + resolvedItems.length) % resolvedItems.length
        : Math.min(position, resolvedItems.length - 1);

  return (
    <div
      ref={containerRef}
      className={`carousel-container ${round ? 'round' : ''}`}
      style={{ width: `${baseWidth}px`, ...(round && { height: `${baseWidth}px`, borderRadius: '50%' }) }}
    >
      <motion.div
        className="carousel-track"
        drag={isAnimating ? false : 'x'}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            round={round}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>

      <div className={`carousel-indicators-container ${round ? 'round' : ''}`}>
        <div className="carousel-indicators">
          {resolvedItems.map((_, index) => (
            <motion.button
              type="button"
              key={index}
              className={`carousel-indicator ${activeIndex === index ? 'active' : 'inactive'}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index}
              animate={{ scale: activeIndex === index ? 1.2 : 1 }}
              onClick={() => setPosition(loop ? index + 1 : index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
