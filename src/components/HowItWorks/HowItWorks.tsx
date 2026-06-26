import React, { memo } from 'react';
import { HOW_IT_WORKS_STEPS } from '../../data/siteData';
import * as Icons from '../../assets/icons';
import './HowItWorks.css';

/* ── Single Step ────────────────────────────────────────────────── */
interface StepProps {
  item: typeof HOW_IT_WORKS_STEPS[number];
}

const Step: React.FC<StepProps> = memo(({ item }) => {
  const IconComponent = (Icons as Record<string, React.FC<{ size?: number }>>)[item.iconName] || Icons.SparkleIcon;

  return (
    <div className="hiw__step">
      <div className="hiw__step-icon" aria-hidden="true">
        <IconComponent size={22} />
        <span className="hiw__step-num">{item.step}</span>
      </div>
      <div className="hiw__step-content">
        <h3 className="hiw__step-title">{item.title}</h3>
        <p className="hiw__step-desc">{item.description}</p>
      </div>
    </div>
  );
});
Step.displayName = 'Step';

import Reveal from '../Reveal/Reveal';

/* ================================================================
   HOW IT WORKS SECTION
   ================================================================ */
const HowItWorks: React.FC = memo(() => (
  <section
    id="how-it-works"
    className="hiw"
    aria-labelledby="hiw-heading"
  >
    <div className="container hiw__container">
      <Reveal direction="up">
        <div className="hiw__header">
          <div className="hiw__badge">How It Works</div>
          <h2 id="hiw-heading" className="hiw__title">
            From data chaos to clear decisions.
          </h2>
          <p className="hiw__subtitle">
            Get started in minutes. Our guided onboarding connects your stack and starts surfacing insights immediately.
          </p>
        </div>
      </Reveal>

      <ol className="hiw__steps" aria-label="How NexGen AI works — step by step">
        {HOW_IT_WORKS_STEPS.map((item, index) => (
          <Reveal key={item.id} delay={index * 150} direction="up">
            <Step item={item} />
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
));
HowItWorks.displayName = 'HowItWorks';

export default HowItWorks;
