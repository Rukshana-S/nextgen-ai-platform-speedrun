export const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individuals and small teams exploring AI analytics.',
    prices: {
      USD: 19,
      EUR: 17,
      INR: 1499
    },
    features: [
      'Up to 10k data points/day',
      'Basic predictive models',
      'Real-time analytics dashboard',
      'Community support',
      'Single integration'
    ],
    recommended: false
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Advanced capabilities for growing organizations scaling insights.',
    prices: {
      USD: 49,
      EUR: 45,
      INR: 3999
    },
    features: [
      'Up to 1M data points/day',
      'Advanced predictive forecasting',
      'Multi-tenant collaboration',
      'Priority email & chat support',
      'Unlimited integrations',
      'Custom alerts & triggers'
    ],
    recommended: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Enterprise-grade custom throughput, governance, and compliance.',
    prices: {
      USD: 149,
      EUR: 139,
      INR: 11999
    },
    features: [
      'Unlimited data points',
      'Custom LLM & ML model training',
      'Dedicated compliance manager',
      '24/7 phone & SLA support',
      'Custom ingestion pipelines',
      'On-premise deployment options'
    ],
    recommended: false
  }
] as const;

export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  INR: '₹'
} as const;
