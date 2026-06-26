import React, { memo, useState, useEffect } from 'react';
import { TESTIMONIALS } from '../../data/siteData';
import './Testimonials.css';

/* ── Star Rating SVG ────────────────────────────────────────────── */
const StarIcon: React.FC = memo(() => (
  <svg
    className="testimonials__star"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M10 1l2.39 6.26H19l-5.19 3.77 1.98 6.26L10 13.77l-5.79 3.52 1.98-6.26L1 7.26h6.61L10 1z" />
  </svg>
));
StarIcon.displayName = 'StarIcon';

/* ── Single Testimonial Card ────────────────────────────────────── */
interface TestimonialCardProps {
  item: typeof TESTIMONIALS[number];
}

const TestimonialCard: React.FC<TestimonialCardProps> = memo(({ item }) => {
  const [displayItem, setDisplayItem] = useState(item);
  const [isFading, setIsFading] = useState(false);

  // Handle smooth crossfade when the item prop changes
  useEffect(() => {
    if (displayItem.id !== item.id) {
      setIsFading(true);
      const timer = setTimeout(() => {
        setDisplayItem(item);
        setIsFading(false);
      }, 300); // 300ms fade out duration
      return () => clearTimeout(timer);
    }
  }, [item, displayItem.id]);

  return (
    <article
      className="testimonials__card"
      aria-labelledby={`testimonial-author-${displayItem.id}`}
    >
      {/* Decorative quote mark */}
      <span className="testimonials__quote-mark" aria-hidden="true">&ldquo;</span>

      {/* Stars */}
      <div className="testimonials__stars" aria-label="5 star rating" role="img">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="testimonials__star-wrapper" style={{ animationDelay: `${i * 100}ms` }}>
            <StarIcon />
          </span>
        ))}
      </div>

      <div className="testimonials__content-wrap" style={{ 
        opacity: isFading ? 0 : 1, 
        transition: 'opacity 300ms ease',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
        {/* Quote text */}
        <blockquote className="testimonials__quote">
          <p>{displayItem.quote}</p>
        </blockquote>

        {/* Author */}
        <footer className="testimonials__author">
          <div
            className="testimonials__avatar"
            aria-hidden="true"
          >
            {displayItem.initials}
          </div>
          <div className="testimonials__author-info">
            <cite
              id={`testimonial-author-${displayItem.id}`}
              className="testimonials__author-name"
              style={{ fontStyle: 'normal' }}
            >
              {displayItem.name}
            </cite>
            <span className="testimonials__author-role">
              {displayItem.role} · {displayItem.company}
            </span>
          </div>
        </footer>
      </div>
    </article>
  );
});
TestimonialCard.displayName = 'TestimonialCard';

import Reveal from '../Reveal/Reveal';

/* ================================================================
   TESTIMONIALS SECTION
   ================================================================ */
const Testimonials: React.FC = memo(() => {
  const [offset, setOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const rotatedTestimonials = [
    ...TESTIMONIALS.slice(offset),
    ...TESTIMONIALS.slice(0, offset)
  ];

  return (
    <section
      id="testimonials"
      className="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="container testimonials__container">
        <Reveal direction="up">
          <div className="testimonials__header">
            <div className="testimonials__badge">Customer Stories</div>
            <h2 id="testimonials-heading" className="testimonials__title">
              Trusted by the teams that build tomorrow.
            </h2>
            <p className="testimonials__subtitle">
              From startups to global enterprises — hear what our customers say about what NexGen AI makes possible.
            </p>
          </div>
        </Reveal>

        <div 
          className="testimonials__grid"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {rotatedTestimonials.map((item, index) => (
            // We use the index as the key so the component instances stay in place
            // and only the props change, triggering the internal crossfade.
            <Reveal key={index} delay={index * 150} direction="up">
              <TestimonialCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
});
Testimonials.displayName = 'Testimonials';

export default Testimonials;
