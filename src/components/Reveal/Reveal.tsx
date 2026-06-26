import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Reveal.css';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  className?: string;
  threshold?: number;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  threshold = 0.15,
}) => {
  const { ref, isRevealed } = useScrollReveal(threshold, true);
  const [isDone, setIsDone] = useState(false);

  // Remove will-change after animation to save compositor memory
  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setIsDone(true);
      }, delay + 600); // 600ms is the CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isRevealed, delay]);

  const classes = [
    'reveal',
    `reveal--${direction}`,
    isRevealed ? 'is-revealed' : '',
    isDone ? 'is-done' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div ref={ref as any} className={classes} style={style}>
      {children}
    </div>
  );
};

export default Reveal;
