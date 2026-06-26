import React, { useState, useEffect, useRef, memo } from 'react';
import { PLANS } from '../../data/pricing';
import { calculatePrice } from '../../utils/calculatePrice';
import type { CurrencyCode } from '../../utils/calculatePrice';
import { CheckIcon } from '../../assets/icons';
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
  priceRef: React.RefObject<HTMLSpanElement | null>;
  periodRef: React.RefObject<HTMLSpanElement | null>;
  savingsRef: React.RefObject<HTMLDivElement | null>;
}

const PricingCard: React.FC<PricingCardProps> = memo(({
  plan,
  priceRef,
  periodRef,
  savingsRef,
}) => {
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
          <span ref={priceRef} className="pricing__price-val">
            {/* Set via direct DOM updates */}
          </span>
          <span ref={periodRef} className="pricing__price-period">
            {/* Set via direct DOM updates */}
          </span>
        </div>

        {/* Savings tag */}
        <div
          ref={savingsRef}
          className="pricing__savings"
          aria-live="polite"
          style={{ opacity: 0 }}
        >
          {/* Set via direct DOM updates */}
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

  // Refs to avoid page or card re-renders when updating values
  const priceRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const periodRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const savingsRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const timeoutsRef = useRef<number[]>([]);

  // Function to apply direct DOM updates to price labels with animation
  const updatePrices = (period: 'monthly' | 'annual', curr: CurrencyCode) => {
    // Clear pending timeouts to avoid race conditions
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];

    PLANS.forEach((plan) => {
      const priceEl = priceRefs.current[plan.id];
      const periodEl = periodRefs.current[plan.id];
      const savingsEl = savingsRefs.current[plan.id];

      if (!priceEl) return;

      const { formattedPrice, formattedPeriod, savingsText } = calculatePrice(
        plan.prices[curr],
        period,
        curr
      );

      // Trigger fade transition by adding class
      priceEl.classList.add('price-updating');

      // Update text contents mid-transition (after fade out)
      const timeoutId = window.setTimeout(() => {
        priceEl.textContent = formattedPrice;
        if (periodEl) {
          periodEl.textContent = formattedPeriod;
        }
        if (savingsEl) {
          savingsEl.textContent = savingsText || '';
          savingsEl.style.opacity = savingsText ? '1' : '0';
        }
        // Fade back in
        priceEl.classList.remove('price-updating');
      }, 150);

      timeoutsRef.current.push(timeoutId);
    });
  };

  // Perform initial paint on mount and update on toggles
  useEffect(() => {
    updatePrices(billingPeriod, currency);
    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t));
    };
  }, [billingPeriod, currency]);

  return (
    <section
      id="pricing"
      className="pricing"
      aria-labelledby="pricing-section-heading"
    >
      <div className="container pricing__container">
        {/* Section Header */}
        <div className="pricing__header">
          <div className="pricing__badge">Pricing Plans</div>
          <h2 id="pricing-section-heading" className="pricing__title">
            Flexible pricing for any scale.
          </h2>
          <p className="pricing__subtitle">
            Choose the plan that fits your analytics requirements. Switch currencies or billing cycles instantly.
          </p>
        </div>

        {/* Controls */}
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

        {/* Cards Grid */}
        <div className="pricing__grid">
          {PLANS.map((plan) => {
            // Helper to assign refs dynamically
            const priceRef = {
              get current() {
                return priceRefs.current[plan.id] || null;
              },
              set current(el) {
                priceRefs.current[plan.id] = el;
              }
            };
            const periodRef = {
              get current() {
                return periodRefs.current[plan.id] || null;
              },
              set current(el) {
                periodRefs.current[plan.id] = el;
              }
            };
            const savingsRef = {
              get current() {
                return savingsRefs.current[plan.id] || null;
              },
              set current(el) {
                savingsRefs.current[plan.id] = el;
              }
            };

            return (
              <PricingCard
                key={plan.id}
                plan={plan}
                priceRef={priceRef}
                periodRef={periodRef}
                savingsRef={savingsRef}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
});
Pricing.displayName = 'Pricing';

export default Pricing;
