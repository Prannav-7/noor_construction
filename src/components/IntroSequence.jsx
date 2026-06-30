import React, { useEffect, useRef, useState } from 'react';
import { motion, useTransform, useMotionValue, animate } from 'framer-motion';
import Hero from './Hero';

export default function IntroSequenceSection({ timeText, setAllocationModal, onComplete }) {
    const progress = useMotionValue(0);
    const virtualScrollY = useRef(0);
    const touchStartRef = useRef(0);
    const [transitionFinished, setTransitionFinished] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const timeoutRef = useRef(null);

    // Virtual scroll track height
    const maxScrollDistance = 1000;

    // Body scroll locking while the intro sequence is active (and during the 1.5s look delay)
    useEffect(() => {
        if (!isCompleted) {
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, [isCompleted]);

    // Handle virtual scroll inputs
    useEffect(() => {
        if (transitionFinished) return;

        const handleWheel = (e) => {
            // Block actual browser scroll
            e.preventDefault();

            const delta = e.deltaY;
            const currentY = virtualScrollY.current;
            const newY = Math.min(Math.max(0, currentY + delta), maxScrollDistance);
            virtualScrollY.current = newY;

            const nextProgress = newY / maxScrollDistance;

            // Animate progress smoothly
            animate(progress, nextProgress, {
                duration: 0.25,
                ease: "easeOut"
            });

            if (nextProgress >= 1.0) {
                setTransitionFinished(true);
                // Once transition completes, wait 1.5s before unlocking scrolling
                timeoutRef.current = setTimeout(() => {
                    setIsCompleted(true);
                    if (onComplete) onComplete();
                }, 1500);
            }
        };

        const handleTouchStart = (e) => {
            touchStartRef.current = e.touches[0].pageY;
        };

        const handleTouchMove = (e) => {
            // Block native swipe scrolling/bounce
            e.preventDefault();

            const currentTouchY = e.touches[0].pageY;
            const delta = touchStartRef.current - currentTouchY;
            touchStartRef.current = currentTouchY;

            const currentY = virtualScrollY.current;
            const newY = Math.min(Math.max(0, currentY + delta * 2.5), maxScrollDistance);
            virtualScrollY.current = newY;

            const nextProgress = newY / maxScrollDistance;

            animate(progress, nextProgress, {
                duration: 0.25,
                ease: "easeOut"
            });

            if (nextProgress >= 1.0) {
                setTransitionFinished(true);
                // Once transition completes, wait 1.5s before unlocking scrolling
                timeoutRef.current = setTimeout(() => {
                    setIsCompleted(true);
                    if (onComplete) onComplete();
                }, 1500);
            }
        };

        // Bind global non-passive listeners
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [transitionFinished, progress]);

    // 1. THE TRANSFORMATION ENGINE (Sequential Background Reveal)
    // Color fades in over B&W
    const modernOpacity = useTransform(progress, [0.05, 0.3], [0, 1]);

    // 2. TEXT EVOLUTION & CENTERING (Intro text)
    const taglineOpacity = useTransform(progress, [0.05, 0.25, 0.45, 0.55], [0, 1, 1, 0]);
    const textColor = useTransform(progress, [0.05, 0.3], ["#FFFFFF", "#ff6200"]);
    const lineColor = useTransform(progress, [0.05, 0.3], ["rgba(255, 255, 255, 0.4)", "rgba(255, 98, 0, 0.6)"]);
    const brandY = useTransform(progress, [0.05, 0.3], [-100, 0]);
    const scale = 1;

    // 3. HERO CONTENT TRANSITION
    const heroOpacity = useTransform(progress, [0.55, 0.75], [0, 1]);
    const heroY = useTransform(progress, [0.55, 0.75], [80, 0]);
    
    // Enable interaction only when Hero content has faded in
    const isHeroInteractive = useTransform(progress, (p) => p > 0.55 ? "auto" : "none");

    return (
        <div className="relative h-screen w-full overflow-hidden bg-zinc-950 font-sans flex items-center justify-center">

            {/* --- CORE BRAND IDENTITY: NOOR Constructions & Tagline (Phase 1) --- */}
            <motion.div 
                style={{ 
                    opacity: taglineOpacity,
                    pointerEvents: useTransform(progress, (p) => p < 0.55 ? "auto" : "none")
                }}
                className="absolute inset-0 z-40 flex flex-col items-center justify-center"
            >
                <motion.div
                    style={{
                        y: brandY,
                        scale: scale,
                        willChange: "opacity, transform, color"
                    }}
                    className="px-6 text-center max-w-[95vw] flex flex-col items-center overflow-visible"
                >
                    {/* Building Legacies - Pre-title */}
                    <div className="flex items-center justify-center gap-4 mb-6 opacity-85">
                        <motion.div style={{ backgroundColor: textColor }} className="h-[1px] w-6 md:w-10" />
                        <motion.span
                            style={{ color: textColor }}
                            className="text-[9px] md:text-[11px] font-mono font-bold tracking-[0.6em] uppercase"
                        >
                            Building Legacies
                        </motion.span>
                        <motion.div style={{ backgroundColor: textColor }} className="h-[1px] w-6 md:w-10" />
                    </div>

                    {/* Brand Title: Cinematic Scale & Dual Typography */}
                    <motion.h1
                        style={{
                            color: textColor,
                            fontSize: "clamp(2.5rem, 9vw, 11vw)"
                        }}
                        className="font-sans font-extralight text-white leading-none tracking-[-0.02em] mb-6 whitespace-nowrap uppercase"
                    >
                        NOOR <span className="font-display italic font-normal tracking-normal text-gold-shimmer">Constructions</span>
                    </motion.h1>

                    {/* Unified Tagline in Single Line */}
                    <div className="flex items-center gap-4 md:gap-8 justify-center w-full">
                        <motion.div
                            style={{ backgroundColor: lineColor }}
                            className="h-[1px] flex-1 max-w-[40px] md:max-w-[100px]"
                        />
                        <motion.p
                            style={{
                                color: textColor,
                                fontSize: "clamp(0.65rem, 1.8vw, 1.25rem)"
                            }}
                            className="font-mono font-bold tracking-[0.25em] md:tracking-[0.35em] uppercase whitespace-nowrap"
                        >
                            Design Engineering Trust
                        </motion.p>
                        <motion.div
                            style={{ backgroundColor: lineColor }}
                            className="h-[1px] flex-1 max-w-[40px] md:max-w-[100px]"
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* --- HERO CONTENT GRID (Phase 2) --- */}
            <motion.div
                style={{ 
                    opacity: heroOpacity, 
                    y: heroY,
                    pointerEvents: isHeroInteractive
                }}
                className="absolute inset-0 z-50 w-full h-full overflow-y-auto overflow-x-hidden scrollbar-none"
            >
                <Hero 
                    combined={true} 
                    timeText={timeText} 
                    setAllocationModal={setAllocationModal} 
                />
            </motion.div>

            {/* --- THE TRANSFORMATION ENGINE (Background, visible all the time) --- */}
            <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
                {/* 1. THE FOUNDATION (B&W) */}
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src="/hero_bg_local_construction.png"
                        alt="Foundational Space"
                        loading="eager"
                        decoding="sync"
                        className="w-full h-full object-cover object-center grayscale brightness-[0.4]"
                    />
                </div>

                {/* 2. THE EVOLUTION (COLOR) */}
                <motion.div
                    style={{
                        opacity: modernOpacity,
                        willChange: "opacity"
                    }}
                    className="absolute inset-0 w-full h-full z-10"
                >
                    <img
                        src="/local_villa_project.png"
                        alt="Evolved Luxury Space"
                        loading="eager"
                        decoding="sync"
                        className="w-full h-full object-cover object-center brightness-[0.5]"
                    />
                </motion.div>
            </div>

            {/* SCROLL INDICATOR */}
            <motion.div
                style={{ opacity: useTransform(progress, [0, 0.15], [1, 0]) }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4 pointer-events-none mix-blend-difference"
            >
                <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-white"
                    />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-light text-white/40">Scroll</span>
            </motion.div>
        </div>
    );
}
