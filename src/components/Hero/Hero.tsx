import React, { memo, useCallback } from 'react';
import {
  ArrowRightIcon,
  SparkleIcon,
  PlayIcon,
  ZapIcon,
  TrendingUpIcon,
  CheckIcon,
} from '../../assets/icons';
import { HERO_STATS } from '../../data/siteData';
import { scrollToId } from '../../utils/helpers';
import './Hero.css';

/* ================================================================
   SUB-COMPONENTS — all memo'd to prevent unnecessary re-renders
   ================================================================ */

/** Animated line chart drawn with SVG — static, never re-renders */
const MiniChart = memo(() => (
  <div className="dashboard-card__chart" aria-hidden="true">
    <svg
      className="chart-svg"
      viewBox="0 0 400 100"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      width="400"
      height="100"
    >
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#114C5A" />
          <stop offset="100%" stopColor="#FF9932" />
        </linearGradient>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#114C5A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#114C5A" stopOpacity="0"    />
        </linearGradient>
      </defs>

      {/* Area fill */}
      <path
        className="chart-area"
        d="M0,85 C40,70 80,60 120,45 C160,30 200,50 240,35 C280,20 320,28 360,18 L400,12 L400,100 L0,100 Z"
      />

      {/* Line */}
      <path
        className="chart-path"
        d="M0,85 C40,70 80,60 120,45 C160,30 200,50 240,35 C280,20 320,28 360,18 L400,12"
      />

      {/* Current point dot */}
      <circle cx="400" cy="12" r="4" fill="#FF9932" opacity="0.9">
        <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
));
MiniChart.displayName = 'MiniChart';

/** Metric chips grid — static data, never re-renders */
const MetricChips = memo(() => (
  <div className="dashboard-card__metrics">
    <div className="metric-chip">
      <span className="metric-chip__label">Revenue</span>
      <span className="metric-chip__value">$2.4M</span>
      <span className="metric-chip__delta">↑ 18.2%</span>
    </div>
    <div className="metric-chip">
      <span className="metric-chip__label">Users</span>
      <span className="metric-chip__value">84.3k</span>
      <span className="metric-chip__delta">↑ 9.7%</span>
    </div>
    <div className="metric-chip">
      <span className="metric-chip__label">Churn</span>
      <span className="metric-chip__value">1.2%</span>
      <span className="metric-chip__delta metric-chip__delta--down">↓ 0.3%</span>
    </div>
  </div>
));
MetricChips.displayName = 'MetricChips';

/** AI Insight banner — static, never re-renders */
const InsightBanner = memo(() => (
  <div className="dashboard-card__insight">
    <div className="dashboard-card__insight-icon" aria-hidden="true">
      <SparkleIcon size={14} color="#FFC801" />
    </div>
    <p className="dashboard-card__insight-text">
      <strong>AI Insight:</strong> Revenue is projected to grow{' '}
      <strong>23% this quarter</strong> — top driver is organic search.
    </p>
  </div>
));
InsightBanner.displayName = 'InsightBanner';

/** Dashboard mock card — static, never re-renders */
const DashboardCard = memo(() => (
  <div className="hero__dashboard">
    {/* Floating badges */}
    <div className="hero__badge-float hero__badge-float--1">
      <span className="hero__badge-dot hero__badge-dot--yellow" aria-hidden="true" />
      <TrendingUpIcon size={12} color="#114C5A" />
      Model accuracy 98.4%
    </div>

    <div className="hero__badge-float hero__badge-float--2">
      <span className="hero__badge-dot hero__badge-dot--orange" aria-hidden="true" />
      <CheckIcon size={12} />
      247 predictions run today
    </div>

    {/* Main card */}
    <article className="dashboard-card" aria-label="AI Analytics dashboard preview">
      {/* Header */}
      <div className="dashboard-card__header">
        <div className="dashboard-card__title-group">
          <h3 className="dashboard-card__title">Analytics Overview</h3>
          <p className="dashboard-card__subtitle">Last 30 days · All regions</p>
        </div>
        <div className="dashboard-card__live">
          <span className="dashboard-card__live-dot" aria-hidden="true" />
          Live
        </div>
      </div>

      <MiniChart />
      <MetricChips />
      <InsightBanner />
    </article>
  </div>
));
DashboardCard.displayName = 'DashboardCard';

/* ================================================================
   HERO COMPONENT
   ================================================================ */
const Hero: React.FC = () => {
  /* useCallback prevents new function refs on every render */
  const handleGetStarted = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToId('get-started', 80);
  }, []);

  const handleWatchDemo = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToId('demo', 80);
  }, []);

  return (
    <section id="hero" className="hero" aria-labelledby="hero-heading">
      {/* Background layer — decorative, aria-hidden */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>

      {/* Content grid */}
      <div className="container hero__content">
        {/* Left — copy */}
        <div className="hero__left">
          {/* Eyebrow badge */}
          <div className="hero__eyebrow" aria-label="New product announcement">
            <ZapIcon size={12} color="#FF9932" />
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            Introducing NexGen AI v2.0
          </div>

          {/*
            LCP element — h1 with explicit font-size so the browser reserves
            accurate layout space before the web-font finishes loading.
            This eliminates font-swap CLS.
          */}
          <h1 id="hero-heading" className="hero__heading">
            Intelligence That{' '}
            <span className="hero__heading-accent">Transforms</span>
            {' '}Your Data Into Action
          </h1>

          <p className="hero__subtitle">
            Enterprise-grade AI analytics platform that turns raw data into decisive
            strategies — in real-time. Predictive insights, automated workflows, zero
            guesswork.
          </p>

          {/* CTAs */}
          <div className="hero__ctas">
            <a
              id="hero-cta-primary"
              href="#get-started"
              className="btn btn-primary btn-lg"
              onClick={handleGetStarted}
            >
              Start for Free
              <ArrowRightIcon size={18} color="currentColor" />
            </a>

            <a
              id="hero-cta-secondary"
              href="#demo"
              className="btn btn-ghost btn-lg"
              onClick={handleWatchDemo}
            >
              <PlayIcon size={18} />
              Watch Demo
            </a>
          </div>

          {/* Stats */}
          <div className="hero__stats" role="list" aria-label="Platform statistics">
            {HERO_STATS.map(stat => (
              <div key={stat.label} className="hero__stat" role="listitem">
                <div className="hero__stat-value">{stat.value}</div>
                <div className="hero__stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — dashboard card */}
        <div className="hero__right">
          <DashboardCard />
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
