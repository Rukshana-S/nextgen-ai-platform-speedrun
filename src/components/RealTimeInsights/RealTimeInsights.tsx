import React, { memo, useState, useEffect } from 'react';
import Reveal from '../Reveal/Reveal';
import { SparkleIcon, TrendingUpIcon, ZapIcon, TargetIcon, ShieldIcon } from '../../assets/icons';
import './RealTimeInsights.css';

/* ================================================================
   HOOKS
   ================================================================ */
function useContinuousCounter(startValue: number, growthRatePerSec: number) {
  const [count, setCount] = useState(startValue);
  
  useEffect(() => {
    let lastTime = performance.now();
    let animationFrame: number;
    
    const step = (timestamp: number) => {
      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;
      setCount(c => c + growthRatePerSec * delta);
      animationFrame = requestAnimationFrame(step);
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [growthRatePerSec]);
  
  return Math.floor(count);
}

function useTicker(messages: string[], intervalMs: number = 3000) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [messages, intervalMs]);
  return messages[index];
}

/* ================================================================
   DATA & PATHS
   ================================================================ */
const GRAPH_PATH = "M 0,350 C 100,350 150,320 200,320 C 250,320 300,340 400,280 C 500,220 550,260 600,240 C 650,220 700,180 800,160 C 900,140 950,100 1000,80";
const PREDICT_PATH = "M 1000,80 C 1050,60 1100,40 1150,20";
const AREA_PATH = `${GRAPH_PATH} L 1000,400 L 0,400 Z`;

const DATA_POINTS = [
  { x: 0, y: 350, label: '09:00', value: 12040 },
  { x: 200, y: 320, label: '09:30', value: 24500 },
  { x: 400, y: 280, label: '10:00', value: 52100 },
  { x: 600, y: 240, label: '10:30', value: 89000 },
  { x: 800, y: 160, label: '11:00', value: 138000 },
  { x: 1000, y: 80, label: 'Now', value: 163862 },
];

const TICKER_MESSAGES = [
  "✓ New deep learning model deployed to edge nodes",
  "✓ Prediction accuracy increased to 98.7% globally",
  "✓ 1.2M automated workflows executed today",
  "✓ Latency reduced by 12% in EU regions",
  "✓ AI detected and mitigated anomalous traffic spike",
];

const FLOATING_NOTIFICATIONS = [
  { text: "+3.2% Accuracy", delay: 3000 },
  { text: "Dataset Synced", delay: 8000 },
  { text: "Workflow Optimized", delay: 15000 },
  { text: "Inference Completed", delay: 22000 },
];

/* ================================================================
   SUB-COMPONENTS
   ================================================================ */
const FloatingNotifications = memo(() => {
  const [activeNote, setActiveNote] = useState<string | null>(null);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    
    // Cycle through notifications
    const cycle = () => {
      FLOATING_NOTIFICATIONS.forEach((note) => {
        const t1 = setTimeout(() => {
          setActiveNote(note.text);
          const t2 = setTimeout(() => setActiveNote(null), 2500); // stay 2.5s
          timeouts.push(t2);
        }, note.delay);
        timeouts.push(t1);
      });
    };

    cycle();
    const interval = setInterval(cycle, 28000); // Repeat cycle
    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className={`rt-insights__notification ${activeNote ? 'is-visible' : ''}`}>
      <SparkleIcon size={14} color="var(--color-yellow)" />
      {activeNote}
    </div>
  );
});
FloatingNotifications.displayName = 'FloatingNotifications';

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
const RealTimeInsights: React.FC = () => {
  const predictions = useContinuousCounter(163800, 15);
  const accuracy = useContinuousCounter(98.2, 0.01);
  const latency = useContinuousCounter(1.8, -0.001);
  
  const tickerMsg = useTicker(TICKER_MESSAGES, 4000);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <section id="real-time" className="rt-insights" aria-labelledby="rt-heading">
      
      {/* Background Ambience */}
      <div className="rt-insights__bg" aria-hidden="true">
        <div className="rt-insights__bg-glow rt-insights__bg-glow--1" />
        <div className="rt-insights__bg-glow rt-insights__bg-glow--2" />
      </div>

      <div className="container rt-insights__container">
        
        {/* Section Header */}
        <Reveal direction="up">
          <div className="rt-insights__header">
            <span className="rt-insights__badge">
              <span className="rt-insights__badge-dot" /> LIVE AI METRICS
            </span>
            <h2 id="rt-heading" className="rt-insights__title">
              Watch your AI grow in real time.
            </h2>
            <p className="rt-insights__subtitle">
              Every prediction, inference, and automation is visualized instantly—helping your team make confident decisions faster.
            </p>
          </div>
        </Reveal>

        {/* Dashboard Grid */}
        <Reveal delay={200} direction="up" className="rt-insights__dashboard-wrapper">
          <div className="rt-insights__dashboard">
            
            <FloatingNotifications />

            {/* LIVE Badge */}
            <div className="rt-insights__live-status">
              <span className="rt-insights__live-dot" /> LIVE
            </div>

            {/* Left Column: Graph */}
            <div className="rt-insights__graph-area">
              
              <div className="rt-insights__svg-container">
                <svg viewBox="0 0 1200 400" className="rt-insights__svg" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-yellow)" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="var(--color-yellow)" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--color-teal)" />
                      <stop offset="100%" stopColor="var(--color-yellow)" />
                    </linearGradient>
                    <filter id="glowEffect">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Grid Lines */}
                  <g className="rt-insights__grid">
                    <line x1="0" y1="80" x2="1200" y2="80" />
                    <line x1="0" y1="160" x2="1200" y2="160" />
                    <line x1="0" y1="240" x2="1200" y2="240" />
                    <line x1="0" y1="320" x2="1200" y2="320" />
                  </g>

                  {/* Area Fill */}
                  <path d={AREA_PATH} className="rt-insights__area" fill="url(#areaGradient)" />

                  {/* Primary Graph Line */}
                  <path d={GRAPH_PATH} className="rt-insights__path" stroke="url(#lineGradient)" />

                  {/* Prediction Line */}
                  <path d={PREDICT_PATH} className="rt-insights__predict-path" />
                  
                  {/* AI Prediction Marker */}
                  <g className="rt-insights__predict-marker" transform="translate(1150, 20)">
                    <circle r="6" className="rt-insights__predict-dot" />
                    <circle r="16" className="rt-insights__predict-pulse" />
                    <text y="-16" className="rt-insights__predict-label" textAnchor="middle">AI Forecast</text>
                  </g>

                  {/* Live Current Point */}
                  <g className="rt-insights__live-point" transform="translate(1000, 80)">
                    <circle r="12" className="rt-insights__live-pulse" />
                    <circle r="6" fill="#FFC801" filter="url(#glowEffect)" />
                  </g>

                  {/* Inference Stream Dots */}
                  <g className="rt-insights__inference-stream">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <circle key={i} r="3" fill="#ffffff" filter="url(#glowEffect)">
                        <animateMotion 
                          dur="6s" 
                          repeatCount="indefinite" 
                          path={GRAPH_PATH} 
                          begin={`${i * 1.2}s`} 
                        />
                      </circle>
                    ))}
                  </g>

                  {/* Hover Guide Line */}
                  {hoverIndex !== null && (
                    <line 
                      x1={DATA_POINTS[hoverIndex].x} 
                      y1="0" 
                      x2={DATA_POINTS[hoverIndex].x} 
                      y2="400" 
                      className="rt-insights__guide-line" 
                    />
                  )}

                  {/* Hover Hit Zones */}
                  {DATA_POINTS.map((pt, i) => (
                    <rect
                      key={i}
                      x={Math.max(0, pt.x - 100)}
                      y="0"
                      width="200"
                      height="400"
                      fill="transparent"
                      className="rt-insights__hitbox"
                      onMouseEnter={() => setHoverIndex(i)}
                      onMouseLeave={() => setHoverIndex(null)}
                    />
                  ))}
                </svg>

                {/* Hover Tooltip (HTML overlaid on SVG for crisp text) */}
                {hoverIndex !== null && (
                  <div 
                    className="rt-insights__tooltip"
                    style={{ 
                      left: `${(DATA_POINTS[hoverIndex].x / 1200) * 100}%`,
                      top: `${(DATA_POINTS[hoverIndex].y / 400) * 100}%` 
                    }}
                  >
                    <div className="rt-insights__tooltip-val">
                      {DATA_POINTS[hoverIndex].value.toLocaleString()}
                    </div>
                    <div className="rt-insights__tooltip-lbl">
                      Predictions
                    </div>
                  </div>
                )}
              </div>

              {/* Ticker & Timeline */}
              <div className="rt-insights__graph-footer">
                <div className="rt-insights__ticker">
                  <div key={tickerMsg} className="rt-insights__ticker-text">
                    {tickerMsg}
                  </div>
                </div>
                <div className="rt-insights__timeline">
                  {DATA_POINTS.map((pt, i) => (
                    <span 
                      key={i} 
                      className={`rt-insights__time-lbl ${i === DATA_POINTS.length - 1 ? 'is-now' : ''}`}
                    >
                      {pt.label}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: KPIs */}
            <div className="rt-insights__kpis">
              <div className="rt-insights__kpi-card">
                <TargetIcon size={20} color="var(--color-yellow)" />
                <div className="rt-insights__kpi-val">{accuracy.toFixed(2)}%</div>
                <div className="rt-insights__kpi-lbl">Model Accuracy</div>
              </div>
              
              <div className="rt-insights__kpi-card">
                <ZapIcon size={20} color="var(--color-teal)" />
                <div className="rt-insights__kpi-val">{latency.toFixed(2)}ms</div>
                <div className="rt-insights__kpi-lbl">Avg Latency</div>
              </div>

              <div className="rt-insights__kpi-card">
                <TrendingUpIcon size={20} color="var(--color-orange)" />
                <div className="rt-insights__kpi-val">{predictions.toLocaleString()}</div>
                <div className="rt-insights__kpi-lbl">Events / sec</div>
              </div>

              <div className="rt-insights__kpi-card">
                <ShieldIcon size={20} color="var(--color-mint)" />
                <div className="rt-insights__kpi-val rt-insights__kpi-val--active">ACTIVE</div>
                <div className="rt-insights__kpi-lbl">Auto Mitigation</div>
              </div>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
};

export default memo(RealTimeInsights);
