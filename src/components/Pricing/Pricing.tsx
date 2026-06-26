import React, { useState, memo } from 'react';
import { PLANS } from '../../data/pricing';
import { calculatePrice } from '../../utils/calculatePrice';
import type { CurrencyCode } from '../../utils/calculatePrice';
import { CheckIcon } from '../../assets/icons';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import Reveal from '../Reveal/Reveal';
import './Pricing.css';

/* ── Chevron Down Icon for Dropdown ────────────────────────────── */
const ChevronDownIcon: React.FC<{ className?: string }> = memo(({ className = '' }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M2.5 4.5l3.5 3.5 3.5-3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));
ChevronDownIcon.displayName = 'ChevronDownIcon';

/* ── Memoized Static Pricing Card ──────────────────────────────── */
interface PricingCardProps {
  plan: typeof PLANS[number];
  billingPeriod: 'monthly' | 'annual';
  currency: CurrencyCode;
}

const PricingCard: React.FC<PricingCardProps> = memo(({
  plan,
  billingPeriod,
  currency
}) => {
  const { formattedPrice, formattedPeriod, savingsText } = calculatePrice(
    plan.prices[currency],
    billingPeriod,
    currency
  );

  const animatedPrice = useAnimatedCounter(formattedPrice, 300, true);

  return (
    <article
      className={`pricing__card ${plan.recommended ? 'pricing__card--recommended' : ''}`}
      aria-labelledby={`plan-title-${plan.id}`}
    >
      {plan.recommended && (
        <span className="pricing__card-badge">Most Popular</span>
      )}

      <header>
        <h3 id={`plan-title-${plan.id}`} className="pricing__card-name">
          {plan.name}
        </h3>
        <p className="pricing__card-desc">{plan.description}</p>
        
        <div className="pricing__card-price-wrap">
          <span className="pricing__price-val">
            {animatedPrice}
          </span>
          <span className="pricing__price-period">
            {formattedPeriod}
          </span>
        </div>

        {/* Savings tag */}
        <div
          className="pricing__savings"
          aria-live="polite"
          style={{ opacity: savingsText ? 1 : 0 }}
        >
          {savingsText || 'No savings'}
        </div>
      </header>

      <hr className="pricing__card-divider" aria-hidden="true" />

      <ul className="pricing__features-list" aria-label={`Features included in ${plan.name} plan`}>
        {plan.features.map((feature, idx) => (
          <li key={idx} className="pricing__feature-item">
            <CheckIcon
              className="pricing__feature-icon"
              size={18}
              color={plan.recommended ? 'var(--color-orange)' : 'var(--color-teal)'}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <footer>
        <button
          className={`pricing__btn ${plan.recommended ? 'pricing__btn--recommended' : 'pricing__btn--standard'}`}
          onClick={() => alert(`Starting setup for ${plan.name} plan`)}
        >
          Get Started
        </button>
      </footer>
    </article>
  );
});
PricingCard.displayName = 'PricingCard';

/* ================================================================
   MAIN PRICING SECTION
   ================================================================ */
const Pricing: React.FC = memo(() => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  return (
    <section
      id="pricing"
      className="pricing"
      aria-labelledby="pricing-section-heading"
    >
      <div className="container pricing__container">
        {/* Section Header */}
        <Reveal direction="up">
          <div className="pricing__header">
            <div className="pricing__badge">Pricing Plans</div>
            <h2 id="pricing-section-heading" className="pricing__title">
              Flexible pricing for any scale.
            </h2>
            <p className="pricing__subtitle">
              Choose the plan that fits your analytics requirements. Switch currencies or billing cycles instantly.
            </p>
          </div>
        </Reveal>

        {/* Controls */}
        <Reveal direction="up" delay={150}>
          <div className="pricing__controls">
            {/* Monthly / Annual Toggle Switch */}
            <div className="pricing__toggle-wrap">
              <button
                className={`pricing__toggle-btn ${billingPeriod === 'monthly' ? 'pricing__toggle-btn--active' : ''}`}
                onClick={() => setBillingPeriod('monthly')}
                aria-pressed={billingPeriod === 'monthly'}
              >
                Monthly
              </button>
              <button
                className={`pricing__toggle-btn ${billingPeriod === 'annual' ? 'pricing__toggle-btn--active' : ''}`}
                onClick={() => setBillingPeriod('annual')}
                aria-pressed={billingPeriod === 'annual'}
              >
                Annual
              </button>
            </div>

            {/* Currency Dropdown Selector */}
            <div className="pricing__select-wrap">
              <label htmlFor="pricing-currency" className="sr-only">
                Select Currency
              </label>
              <select
                id="pricing-currency"
                className="pricing__select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="INR">INR (₹)</option>
              </select>
              <ChevronDownIcon className="pricing__select-icon" />
            </div>
          </div>
        </Reveal>

        <div className="pricing__grid">
          {PLANS.map((plan, index) => {
            return (
              <Reveal key={plan.id} delay={index * 150} direction="up">
                <PricingCard
                  plan={plan}
                  billingPeriod={billingPeriod}
                  currency={currency}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
});
Pricing.displayName = 'Pricing';

export default Pricing;
