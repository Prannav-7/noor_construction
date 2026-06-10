import React from 'react';

// Construction-specific inline SVG icons
// No external dependencies — pure SVG paths

export function HardHat({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M2 18h20" />
      <path d="M4 18v-2a8 8 0 0 1 16 0v2" />
      <path d="M12 4v4" />
      <path d="M4 14h16" />
    </svg>
  );
}

export function Crane({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M6 22V4" />
      <path d="M6 4l14-2v6l-14 2" />
      <path d="M20 8v4" />
      <path d="M18 12h4" />
      <path d="M20 12v6" />
      <path d="M2 22h8" />
      <path d="M6 14l-4 8" />
      <path d="M6 14l4 8" />
    </svg>
  );
}

export function Scaffolding({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M4 2v20" />
      <path d="M20 2v20" />
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
      <path d="M4 6l16 6" />
      <path d="M4 12l16 6" />
    </svg>
  );
}

export function ConcreteMixer({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M2 16h4" />
      <circle cx="8" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M10 18h6" />
      <path d="M20 18h2v-4l-4-8H6v12" />
      <path d="M6 6h8l2 4" />
      <ellipse cx="11" cy="4" rx="5" ry="2" />
    </svg>
  );
}

export function BlueprintRoll({ className = 'w-4 h-4', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M4 4h16v16H4z" />
      <path d="M4 4l4 4" />
      <path d="M8 4v4H4" />
      <path d="M8 8h8v8" />
      <path d="M16 16l4 4" />
      <path d="M16 20h4v-4" />
      <path d="M12 12h.01" />
    </svg>
  );
}

export default { HardHat, Crane, Scaffolding, ConcreteMixer, BlueprintRoll };
