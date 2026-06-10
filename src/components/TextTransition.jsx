import React, { useState, useEffect } from 'react';

export default function TextTransition({
  children,
  className = '',
  duration = 200, // Duration of fade-out in ms
  mode = 'fade' // 'fade', 'slide-fade', etc.
}) {
  const [displayText, setDisplayText] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (children !== displayText) {
      setIsTransitioning(true);
      const fadeOutTimer = setTimeout(() => {
        setDisplayText(children);
        setIsTransitioning(false);
      }, duration);

      return () => clearTimeout(fadeOutTimer);
    }
  }, [children, displayText, duration]);

  // CSS classes based on state
  const transitionClass = isTransitioning
    ? 'opacity-0 scale-[0.99] translate-y-[2px]'
    : 'opacity-100 scale-100 translate-y-0';

  return (
    <div
      className={`transition-all cubic-bezier(0.16, 1, 0.3, 1) ${className} ${transitionClass}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {displayText}
    </div>
  );
}
