import React, { memo } from 'react';
import './CTA.css';

const CTA: React.FC = memo(() => {
  return (
    <section className="cta" aria-labelledby="cta-heading">
      <div className="container cta__container">
        <h2 id="cta-heading" className="cta__title">
          Ready to supercharge your data?
        </h2>
        <p className="cta__subtitle">
          Join thousands of engineering teams building the next generation of intelligent applications. Start your free trial today — no credit card required.
        </p>
        <div className="cta__actions">
          <a href="#signup" className="btn btn--primary cta__btn-primary">
            Start Free Trial
          </a>
          <a href="#contact" className="btn btn--outline" style={{ borderColor: 'rgba(255, 255, 255, 0.3)', color: 'var(--color-white)' }}>
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
});
CTA.displayName = 'CTA';

export default CTA;
