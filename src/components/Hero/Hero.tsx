import React, { memo, useCallback, useState, useEffect } from 'react';
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
import Reveal from '../Reveal/Reveal';
import './Hero.css';

/* ================================================================
   SUB-COMPONENTS — all memo'd to prevent unnecessary re-renders
   ================================================================ */

/** Animated line chart drawn with SVG — static, never re-renders */
const MiniChart = memo(() => (
  <div className="dashboard-card__chart" aria-hidden="true">
    <svg
      className="chart-svg"
      viewBox="0 0 400 120"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      width="100%"
      height="120"
    >
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#114C5A" />
          <stop offset="100%" stopColor="#FF9932" />
        </linearGradient>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#114C5A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#114C5A" stopOpacity="0"    />
        </linearGradient>
        <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FF9932" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FF9932" stopOpacity="0"    />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(17,76,90,0.1)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(17,76,90,0.1)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(17,76,90,0.1)" strokeWidth="1" strokeDasharray="4 4" />

      {/* Secondary Background line (Competitor / Previous Period) */}
      <path
        fill="url(#areaGrad2)"
        d="M0,100 C50,85 100,95 150,75 C200,55 250,80 300,60 C350,40 375,50 400,35 L400,120 L0,120 Z"
      />
      <path
        fill="none"
        stroke="rgba(255, 153, 50, 0.4)"
        strokeWidth="2"
        strokeDasharray="6 6"
        d="M0,100 C50,85 100,95 150,75 C200,55 250,80 300,60 C350,40 375,50 400,35"
      />

      {/* Primary Area fill */}
      <path
        className="chart-area"
        d="M0,85 C40,70 80,60 120,45 C160,30 200,50 240,35 C280,20 320,28 360,18 L400,12 L400,120 L0,120 Z"
      />

      {/* Primary Line */}
      <path
        className="chart-path"
        d="M0,85 C40,70 80,60 120,45 C160,30 200,50 240,35 C280,20 320,28 360,18 L400,12"
      />

      {/* Current point dots */}
      <circle cx="400" cy="12" r="5" fill="#FFC801" stroke="#fff" strokeWidth="2" opacity="0.9">
        <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="400" cy="35" r="4" fill="#FF9932" opacity="0.5" />
    </svg>
  </div>
));
MiniChart.displayName = 'MiniChart';

/** Metric chips grid — dynamically updates every 3-5s for 'live' feel */
const MetricChips = memo(() => {
  const [revenue, setRevenue] = useState(2400000);
  const [users, setUsers] = useState(84300);
  const [churn, setChurn] = useState(1.2);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live data ticks
      setRevenue(r => r + Math.floor(Math.random() * 5000));
      setUsers(u => u + Math.floor(Math.random() * 20));
      setChurn(c => Math.max(0.8, +(c - 0.01).toFixed(2))); // Slowly drop churn
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const formattedRev = `$${(revenue / 1000000).toFixed(2)}M`;
  const formattedUsers = `${(users / 1000).toFixed(1)}k`;

  return (
    <div className="dashboard-card__metrics">
      <div className="metric-chip">
        <span className="metric-chip__label">Revenue</span>
        <span className="metric-chip__value" style={{ transition: 'opacity 300ms' }}>{formattedRev}</span>
        <span className="metric-chip__delta">↑ 18.2%</span>
      </div>
      <div className="metric-chip">
        <span className="metric-chip__label">Users</span>
        <span className="metric-chip__value" style={{ transition: 'opacity 300ms' }}>{formattedUsers}</span>
        <span className="metric-chip__delta">↑ 9.7%</span>
      </div>
      <div className="metric-chip">
        <span className="metric-chip__label">Churn</span>
        <span className="metric-chip__value" style={{ transition: 'opacity 300ms' }}>{churn}%</span>
        <span className="metric-chip__delta metric-chip__delta--down">↓ 0.3%</span>
      </div>
    </div>
  );
});
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

/** Dashboard mock card */
const DashboardCard = memo(() => {
  const [status, setStatus] = useState<'Live' | 'Processing'>('Live');

  useEffect(() => {
    const pInterval = setInterval(() => {
      setStatus('Processing');
      setTimeout(() => setStatus('Live'), 1000);
    }, 4500);
    return () => clearInterval(pInterval);
  }, []);

  return (
    <article className="dashboard-card" aria-label="AI Analytics dashboard preview">
      {/* Header */}
      <div className="dashboard-card__header">
        <div className="dashboard-card__title-group">
          <h3 className="dashboard-card__title">Analytics Overview</h3>
          <p className="dashboard-card__subtitle">Last 30 days · All regions</p>
        </div>
        <div className="dashboard-card__live">
          <span className={`dashboard-card__live-dot ${status === 'Processing' ? 'pulse-live' : ''}`} aria-hidden="true" />
          {status}
        </div>
      </div>

      <MiniChart />
      <MetricChips />
      <InsightBanner />
    </article>
  );
});
DashboardCard.displayName = 'DashboardCard';

/** Floating Badges for Hero (Moved out of DashboardCard to prevent clipping) */
const HeroBadges = memo(() => {
  const [predictions, setPredictions] = useState(247);
  const [accuracy, setAccuracy] = useState(98.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setPredictions(p => p + Math.floor(Math.random() * 3) + 1);
      setAccuracy(a => Math.min(99.9, +(a + 0.1).toFixed(1)));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="hero__badge-float hero__badge-float--1">
        <span className="hero__badge-dot hero__badge-dot--yellow" aria-hidden="true" />
        <TrendingUpIcon size={12} color="#114C5A" />
        Model accuracy {accuracy}%
      </div>

      <div className="hero__badge-float hero__badge-float--2">
        <span className="hero__badge-dot hero__badge-dot--orange" aria-hidden="true" />
        <CheckIcon size={12} />
        {predictions} predictions run today
      </div>
    </>
  );
});
HeroBadges.displayName = 'HeroBadges';

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
        <div className="hero__glow" />
        <div className="hero__particles">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`hero__particle hero__particle--${i + 1}`} />
          ))}
        </div>
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>

      {/* Content grid */}
      <div className="container hero__content">
        {/* Left — copy */}
        <div className="hero__left">
          {/* Eyebrow badge */}
          <Reveal delay={0} direction="up">
            <div className="hero__eyebrow" aria-label="New product announcement">
              <ZapIcon size={12} color="#FF9932" />
              <span className="hero__eyebrow-dot" aria-hidden="true" />
              Introducing NexGen AI v2.0
            </div>
          </Reveal>

          {/* Staggered Heading */}
          <Reveal delay={150} direction="up">
            <h1 id="hero-heading" className="hero__heading">
              Intelligence That{' '}
              <span className="hero__heading-accent">Transforms</span>
              {' '}Your Data Into Action
            </h1>
          </Reveal>

          <Reveal delay={300} direction="up">
            <p className="hero__subtitle">
              Enterprise-grade AI analytics platform that turns raw data into decisive
              strategies — in real-time. Predictive insights, automated workflows, zero
              guesswork.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={450} direction="up">
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
          </Reveal>

          {/* Stats */}
          <Reveal delay={600} direction="up">
            <div className="hero__stats" role="list" aria-label="Platform statistics">
              {HERO_STATS.map(stat => (
                <div key={stat.label} className="hero__stat" role="listitem">
                  <div className="hero__stat-value">{stat.value}</div>
                  <div className="hero__stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right — dashboard card */}
        <div className="hero__right">
          <Reveal delay={750} direction="up" className="hero__dashboard">
            <DashboardCard />
          </Reveal>
          {/* Badges rendered outside Reveal to prevent clipping by overflow wrappers */}
          <HeroBadges />
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
