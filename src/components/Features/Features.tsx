import React, { useState, useEffect, useRef, memo } from 'react';
import { FEATURES } from '../../data/siteData';
import { useMediaQuery } from '../../hooks/useScrolled';
import * as Icons from '../../assets/icons';
import './Features.css';

/* ── Simple Local Chevron Icon ─────────────────────────────────── */
const ChevronIcon: React.FC<{ className?: string }> = memo(({ className = '' }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M3 6l5 5 5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
ChevronIcon.displayName = 'ChevronIcon';

/* ── Individual Feature Card ───────────────────────────────────── */
interface FeatureCardProps {
  item: typeof FEATURES[number];
  isActive: boolean;
  isMobile: boolean;
  onActivate: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = memo(({
  item,
  isActive,
  isMobile,
  onActivate,
}) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | number>(0);

  // Dynamic height calculation for smooth accordion transition on mobile
  useEffect(() => {
    if (!isMobile) {
      setHeight('auto');
      return;
    }

    if (isActive && bodyRef.current) {
      setHeight(bodyRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isActive, isMobile]);

  // Recalculate height on window resize when open on mobile
  useEffect(() => {
    if (!isMobile || !isActive) return;

    const handleResize = () => {
      if (bodyRef.current) {
        setHeight(bodyRef.current.scrollHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isActive, isMobile]);

  // Dynamically resolve the icon component
  const IconComponent = (Icons as any)[item.iconName] || Icons.SparkleIcon;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onActivate();
    }
  };

  return (
    <div
      className={`features__card ${item.gridClass} ${isActive ? 'features__card--active' : ''}`}
      onClick={onActivate}
      onKeyDown={handleKeyDown}
      role={isMobile ? 'none' : 'button'}
      tabIndex={isMobile ? undefined : 0}
      aria-label={isMobile ? undefined : `${item.title} feature. Click to highlight.`}
    >
      {/* Decorative border gradient animation overlay */}
      <div className="features__card-border" aria-hidden="true" />

      <div className="features__card-inner">
        {/* Accordion header button (mobile) / Visual header wrapper (desktop) */}
        <button
          className="features__card-header"
          onClick={(e) => {
            if (isMobile) {
              e.stopPropagation();
              onActivate();
            }
          }}
          aria-expanded={isMobile ? isActive : undefined}
          aria-controls={isMobile ? `feature-panel-${item.id}` : undefined}
          id={`feature-header-${item.id}`}
          disabled={!isMobile} // Disable button interaction on desktop, where the card wrapper acts as the interactive element
          tabIndex={isMobile ? 0 : -1} // Only tab-focusable on mobile
        >
          <div className="features__card-icon-wrap">
            <IconComponent size={24} />
          </div>
          <h3 className="features__card-title" id={`feature-title-${item.id}`}>
            {item.title}
          </h3>
          <ChevronIcon className="features__card-chevron" />
        </button>

        {/* Content panel */}
        <div
          id={`feature-panel-${item.id}`}
          className="features__card-body"
          role={isMobile ? 'region' : undefined}
          aria-labelledby={isMobile ? `feature-header-${item.id}` : undefined}
          style={{ height }}
        >
          <div ref={bodyRef} className="features__card-body-inner">
            <p className="features__card-description">{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
});
FeatureCard.displayName = 'FeatureCard';

import Reveal from '../Reveal/Reveal';

/* ================================================================
   MAIN FEATURES SECTION
   ================================================================ */
const Features: React.FC = memo(() => {
  const [activeId, setActiveId] = useState<string | null>('analytics');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const handleCardActivate = (id: string) => {
    if (isMobile) {
      // Accordion toggle behavior on mobile
      setActiveId(current => (current === id ? null : id));
    } else {
      // Active state highlight behavior on desktop
      setActiveId(id);
    }
  };

  return (
    <section
      id="features"
      className="features"
      aria-labelledby="features-section-heading"
    >
      <div className="features__bg-glow" aria-hidden="true" />
      <div className="features__bg-glow-2" aria-hidden="true" />

      <div className="container features__container">
        {/* Section Header */}
        <Reveal direction="up">
          <div className="features__header">
            <div className="features__badge">Platform Capabilities</div>
            <h2 id="features-section-heading" className="features__title">
              Intelligent features, built for scale.
            </h2>
            <p className="features__subtitle">
              NextGen AI delivers high-performance analytics, bulletproof security, and seamless collaboration tools straight to your workflow.
            </p>
          </div>
        </Reveal>

        {/* Desktop Bento Grid / Mobile Accordion Container */}
        <div className="features__items">
          {FEATURES.map((item, index) => (
            <Reveal key={item.id} delay={index * 80} direction="up" className={item.gridClass}>
              <FeatureCard
                item={item}
                isActive={activeId === item.id}
                isMobile={isMobile}
                onActivate={() => handleCardActivate(item.id)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
});
Features.displayName = 'Features';

export default Features;
