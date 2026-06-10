import React, { useState } from 'react';
import { Star, Quote } from 'lucide-react';
import Stack from './Stack';
import TextTransition from './TextTransition';

export default function Reviews({ reviews }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeReview = reviews[activeIdx] || reviews[0];

  // Build review cards for the stack
  const cards = reviews.map((review, idx) => (
    <div 
      key={idx}
      className="relative h-full w-full rounded-2xl overflow-hidden select-none cursor-grab active:cursor-grabbing"
      style={{
        background: 'linear-gradient(135deg, #2d2d35 0%, #222227 50%, #18181c 100%)'
      }}
    >
      {/* Card Cover Image (top half) */}
      <div className="w-full h-[55%] relative overflow-hidden">
        <img 
          src={review.image} 
          alt={review.title} 
          className="w-full h-full object-cover select-none pointer-events-none opacity-90" 
        />
        {/* Gradient fade into card bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#222227] to-transparent"></div>
        
        {/* Project name badge floating on image */}
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 font-mono text-[10px] text-white/90 tracking-widest uppercase font-semibold">
          {review.title}
        </div>
      </div>

      {/* Card Details (bottom half) */}
      <div className="px-5 pb-5 -mt-4 relative z-10">
        {/* Stars Row */}
        <div className="flex items-center gap-0.5 mb-2">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          ))}
        </div>

        {/* Quote excerpt */}
        <p className="text-white/90 text-[12px] leading-relaxed font-sans mb-3 line-clamp-3">
          "{review.comment}"
        </p>

        {/* Client row */}
        <div className="flex items-center gap-3 pt-3 border-t border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff4e00] to-[#ec9f05] flex items-center justify-center text-white text-[11px] font-bold shrink-0">
            {review.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="text-white text-[12px] font-semibold">{review.name}</div>
            <div className="text-white/60 text-[10px] font-mono">{review.role}</div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <section 
      id="reviews" 
      className="h-full relative overflow-hidden flex flex-col justify-center"
      style={{
        background: 'linear-gradient(160deg, #3d3d45 0%, #2a2a30 50%, #1e1e24 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          
          {/* Left Column: Clipboard Document Style */}
          <div className="flex flex-col justify-center">
            
            {/* Clipboard Document Panel */}
            <div className="clipboard-doc rounded-lg p-6 pt-8 relative">
              
              {/* Tiny label */}
              <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#ff4e00] mb-4 font-semibold">
                CLIENT SIGN-OFF
              </div>

              {/* Big Project Title */}
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[#111115] tracking-tight leading-none mb-6">
                <TextTransition>{activeReview.title}</TextTransition>
              </h2>

              {/* Star Rating Row */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(activeReview.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#ff4e00] fill-[#ff4e00]" />
                ))}
                <span className="ml-2 font-mono text-[11px] text-neutral-500 font-medium">5.0 RATED</span>
              </div>

              {/* Big Quote Block */}
              <div className="relative mb-8">
                <Quote className="absolute -top-2 -left-1 w-8 h-8 text-[#ff4e00]/20" />
                <blockquote className="pl-8 text-neutral-700 font-serif italic text-base md:text-lg leading-relaxed">
                  <TextTransition duration={250}>
                    {activeReview.comment}
                  </TextTransition>
                </blockquote>
              </div>

              {/* Client Info Bar */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-white border border-neutral-200">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff4e00] to-[#ec9f05] flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-lg shadow-orange-500/20">
                  <TextTransition duration={150}>
                    {activeReview.name.split(' ').map(n => n[0]).join('')}
                  </TextTransition>
                </div>
                <div className="flex-1">
                  <div className="text-[#111115] font-semibold text-sm">
                    <TextTransition duration={180}>{activeReview.name}</TextTransition>
                  </div>
                  <div className="text-neutral-500 text-xs font-medium">
                    <TextTransition duration={200}>{activeReview.role}</TextTransition>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] text-neutral-400 tracking-wider font-medium">
                    <TextTransition duration={200}>{activeReview.date}</TextTransition>
                  </div>
                  {/* Document Reference Number */}
                  <div className="font-mono text-[9px] text-[#ff4e00] tracking-wider mt-1 font-bold border border-[#ff4e00]/30 px-2 py-0.5 rounded inline-block">
                    <TextTransition duration={220}>REF: {activeReview.authTag}</TextTransition>
                  </div>
                </div>
              </div>

              {/* Verification Stamp (absolute positioned) */}
              <div className="absolute top-6 right-6 stamp-seal">
                VERIFIED<br/>✓
              </div>

              {/* "Signed & Approved" watermark */}
              <div className="absolute bottom-4 right-6 font-serif italic text-[10px] text-neutral-300 rotate-[-8deg] pointer-events-none select-none">
                SIGNED & APPROVED
              </div>
            </div>

          </div>

          {/* Right Column: Card Stack */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-[300px] h-[420px] relative">
              <Stack 
                cards={cards}
                randomRotation={true}
                sensitivity={130}
                autoplay={true}
                autoplayDelay={4500}
                pauseOnHover={true}
                sendToBackOnClick={true}
                onChange={setActiveIdx}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-400/5 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-neutral-300/5 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
}
