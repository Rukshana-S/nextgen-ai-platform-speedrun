import React, { memo } from 'react';
import './CTA.css';

import Reveal from '../Reveal/Reveal';

const CTA: React.FC = memo(() => {
  return (
    <section className="cta" aria-labelledby="cta-heading">
      <div className="container cta__container">
        <Reveal direction="up">
          <h2 id="cta-heading" className="cta__title">
            Ready to supercharge your data?
          </h2>

          <p className="cta__subtitle">
            Join thousands of engineering teams building the next generation of
            intelligent applications. Start your free trial today — no credit
            card required.
          </p>

          <div className="cta__actions">
            <a
              href="#signup"
              className="btn btn-primary cta-primary-btn"
            >
              Start Free Trial
            </a>

            <a
              href="#contact"
              className="btn btn-outline cta-outline-btn"
            >
              Contact Sales
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
});

CTA.displayName = 'CTA';

export default CTA;