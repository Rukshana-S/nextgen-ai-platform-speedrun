import { useEffect, useRef, useState } from 'react';

/**
 * A hook that uses IntersectionObserver to detect when an element enters the viewport.
 * Once the element intersects, it returns true and optionally disconnects the observer.
 */
export function useScrollReveal(threshold = 0.15, triggerOnce = true) {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!window.IntersectionObserver) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsRevealed(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce]);

  return { ref, isRevealed };
}
