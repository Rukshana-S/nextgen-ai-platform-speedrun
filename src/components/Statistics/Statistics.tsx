import React, { memo, useEffect, useRef } from 'react';
import { STATISTICS } from '../../data/siteData';
import * as Icons from '../../assets/icons';
import './Statistics.css';

import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

interface StatCardProps {
  item: typeof STATISTICS[number];
  index: number;
}

const StatCard: React.FC<StatCardProps> = memo(({ item, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(false);
  const animatedValue = useAnimatedCounter(item.value, 1200, inView);
  const IconComponent = (Icons as Record<string, React.FC<{ size?: number }>>)[item.iconName] || Icons.SparkleIcon;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            card.classList.add('in-view');
            setInView(true);
          }, index * 120);
          observer.unobserve(card);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="stats__card"
      role="figure"
      aria-label={`${item.value} — ${item.label}`}
    >
      <div className="stats__card-icon" aria-hidden="true">
        <IconComponent size={24} />
      </div>
      <strong className="stats__card-value">{animatedValue}</strong>
      <span className="stats__card-label">{item.label}</span>
      <span className="stats__card-desc">{item.description}</span>
    </div>
  );
});
StatCard.displayName = 'StatCard';

/* ================================================================
   STATISTICS SECTION
   ================================================================ */
const Statistics: React.FC = memo(() => (
  <section
    id="statistics"
    className="stats"
    aria-labelledby="stats-heading"
  >
    <div className="container stats__container">
      <div className="stats__header">
        <div className="stats__badge">By the Numbers</div>
        <h2 id="stats-heading" className="stats__title">
          Performance you can measure.
        </h2>
        <p className="stats__subtitle">
          Real-world metrics from thousands of production deployments running NexGen AI at scale.
        </p>
      </div>

      <div className="stats__grid" role="list" aria-label="Platform statistics">
        {STATISTICS.map((item, index) => (
          <StatCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  </section>
));
Statistics.displayName = 'Statistics';

export default Statistics;
