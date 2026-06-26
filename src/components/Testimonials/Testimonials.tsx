import React, { memo } from 'react';
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

const TestimonialCard: React.FC<TestimonialCardProps> = memo(({ item }) => (
  <article
    className="testimonials__card"
    aria-labelledby={`testimonial-author-${item.id}`}
  >
    {/* Decorative quote mark */}
    <span className="testimonials__quote-mark" aria-hidden="true">&ldquo;</span>

    {/* Stars */}
    <div className="testimonials__stars" aria-label="5 star rating" role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>

    {/* Quote text */}
    <blockquote className="testimonials__quote">
      <p>{item.quote}</p>
    </blockquote>

    {/* Author */}
    <footer className="testimonials__author">
      <div
        className="testimonials__avatar"
        aria-hidden="true"
      >
        {item.initials}
      </div>
      <div className="testimonials__author-info">
        <cite
          id={`testimonial-author-${item.id}`}
          className="testimonials__author-name"
          style={{ fontStyle: 'normal' }}
        >
          {item.name}
        </cite>
        <span className="testimonials__author-role">
          {item.role} · {item.company}
        </span>
      </div>
    </footer>
  </article>
));
TestimonialCard.displayName = 'TestimonialCard';

/* ================================================================
   TESTIMONIALS SECTION
   ================================================================ */
const Testimonials: React.FC = memo(() => (
  <section
    id="testimonials"
    className="testimonials"
    aria-labelledby="testimonials-heading"
  >
    <div className="container testimonials__container">
      <div className="testimonials__header">
        <div className="testimonials__badge">Customer Stories</div>
        <h2 id="testimonials-heading" className="testimonials__title">
          Trusted by the teams that build tomorrow.
        </h2>
        <p className="testimonials__subtitle">
          From startups to global enterprises — hear what our customers say about what NexGen AI makes possible.
        </p>
      </div>

      <div className="testimonials__grid">
        {TESTIMONIALS.map((item) => (
          <TestimonialCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  </section>
));
Testimonials.displayName = 'Testimonials';

export default Testimonials;
