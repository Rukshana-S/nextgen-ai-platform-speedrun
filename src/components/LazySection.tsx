import React, { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  fallbackHeight?: string;
}

/**
 * LazySection uses IntersectionObserver to defer rendering of its children
 * until they are close to entering the viewport. This vastly improves initial
 * page load performance (FCP, LCP, TBT) by completely skipping rendering,
 * JS execution, and network chunk fetching for off-screen components.
 */
const LazySection: React.FC<LazySectionProps> = ({ children, fallbackHeight = '1px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If the browser doesn't support IntersectionObserver, render immediately.
    if (!window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once it becomes visible, we can disconnect the observer
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px 0px', // Pre-load slightly before it enters the viewport
        threshold: 0.01,
      }
    );

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  if (isVisible) {
    return <>{children}</>;
  }

  return (
    <div
      ref={placeholderRef}
      style={{ minHeight: fallbackHeight }}
      aria-hidden="true"
    />
  );
};

export default LazySection;
