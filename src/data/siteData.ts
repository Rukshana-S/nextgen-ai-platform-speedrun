// Static site-wide data — nav links, trusted companies, etc.

export const NAV_LINKS = [
  { id: 'features',  label: 'Features',  href: '#features'  },
  { id: 'pricing',   label: 'Pricing',   href: '#pricing'   },
  { id: 'about',     label: 'About',     href: '#about'     },
  { id: 'contact',   label: 'Contact',   href: '#contact'   },
] as const;

export const TRUSTED_COMPANIES = [
  { id: 'vercel',     name: 'Vercel',      width: 88  },
  { id: 'stripe',     name: 'Stripe',      width: 68  },
  { id: 'notion',     name: 'Notion',      width: 78  },
  { id: 'linear',     name: 'Linear',      width: 72  },
  { id: 'figma',      name: 'Figma',       width: 62  },
  { id: 'supabase',   name: 'Supabase',    width: 96  },
  { id: 'planetscale',name: 'PlanetScale', width: 108 },
] as const;

export const HERO_STATS = [
  { value: '10x',  label: 'Faster Decisions'  },
  { value: '98%',  label: 'Accuracy Rate'      },
  { value: '5M+',  label: 'Data Points Daily'  },
] as const;

export const SITE_META = {
  title:       'NexGen AI — Intelligent Analytics Platform',
  description: 'Transform raw data into decisive action with NexGen AI. Enterprise-grade machine learning, real-time insights, and predictive analytics — all in one platform.',
  url:         'https://nexgenai.app',
  image:       'https://nexgenai.app/og-image.png',
  twitterHandle: '@nexgenai',
} as const;

export const FEATURES = [
  {
    id: 'analytics',
    iconName: 'TrendingUpIcon',
    title: 'Intelligent Analytics',
    description: 'Leverage predictive machine learning models to forecast market trends and user behavior before they happen.',
    gridClass: 'features__card--wide-1'
  },
  {
    id: 'security',
    iconName: 'ShieldIcon',
    title: 'Enterprise Security',
    description: 'Rest easy with end-to-end encryption, multi-tenant isolation, and continuous compliance monitoring.',
    gridClass: 'features__card--tall'
  },
  {
    id: 'performance',
    iconName: 'ZapIcon',
    title: 'Real-Time Pipeline',
    description: 'Process millions of events per second with sub-millisecond latency for live streaming dashboards.',
    gridClass: 'features__card--normal-1'
  },
  {
    id: 'scale',
    iconName: 'GlobeIcon',
    title: 'Global Edge Scale',
    description: 'Deploy intelligence closer to users with edge-optimized inference pipelines spanning 30+ regions.',
    gridClass: 'features__card--normal-2'
  },
  {
    id: 'collaboration',
    iconName: 'UsersIcon',
    title: 'Team Collaboration',
    description: 'Share insights, leave interactive annotations, and build custom dashboards collaboratively in real time.',
    gridClass: 'features__card--normal-3'
  },
  {
    id: 'bi-reporting',
    iconName: 'ChartBarIcon',
    title: 'Interactive Reports',
    description: 'Generate publication-ready BI reporting metrics and visualisations automatically with natural language prompts.',
    gridClass: 'features__card--wide-2'
  }
] as const;

export const STATISTICS = [
  {
    id: 'uptime',
    iconName: 'ShieldIcon',
    value: '99.99%',
    label: 'Uptime SLA',
    description: 'Guaranteed availability'
  },
  {
    id: 'datapoints',
    iconName: 'ChartBarIcon',
    value: '5B+',
    label: 'Data Points Processed',
    description: 'Daily across all clients'
  },
  {
    id: 'latency',
    iconName: 'ZapIcon',
    value: '<2ms',
    label: 'Average Latency',
    description: 'Edge inference response'
  },
  {
    id: 'customers',
    iconName: 'UsersIcon',
    value: '12k+',
    label: 'Active Customers',
    description: 'Across 60+ countries'
  }
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    id: 'connect',
    step: '01',
    title: 'Connect Your Data',
    description: 'Integrate any data source in minutes — from databases and APIs to live event streams — with zero-code connectors.',
    iconName: 'GlobeIcon'
  },
  {
    id: 'analyze',
    step: '02',
    title: 'AI Analyzes & Learns',
    description: 'Our ML engine automatically discovers patterns, trains custom models, and surfaces anomalies across your entire dataset.',
    iconName: 'SparkleIcon'
  },
  {
    id: 'insights',
    step: '03',
    title: 'Get Actionable Insights',
    description: 'Receive clear predictive dashboards, real-time alerts, and narrative reports your entire team can act on immediately.',
    iconName: 'TrendingUpIcon'
  },
  {
    id: 'scale',
    step: '04',
    title: 'Scale Effortlessly',
    description: 'As your business grows, NexGen AI scales automatically — from startup to enterprise without re-architecting your stack.',
    iconName: 'ArrowRightIcon'
  }
] as const;

export const TESTIMONIALS = [
  {
    id: 'testimonial-1',
    quote: "NexGen AI transformed how we handle data. What used to take our analysts a week now surfaces automatically in real time. It's like having a world-class data science team built in.",
    name: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'Vercel',
    initials: 'SC'
  },
  {
    id: 'testimonial-2',
    quote: 'The predictive accuracy is outstanding. We reduced churn by 34% in the first quarter by acting on the early-warning signals NexGen AI delivered before they became visible in traditional reporting.',
    name: 'Marcus Reid',
    role: 'Head of Growth',
    company: 'Stripe',
    initials: 'MR'
  },
  {
    id: 'testimonial-3',
    quote: 'Our compliance team finally sleeps at night. The automated governance layer handles audit trails, data residency, and access controls without any manual overhead from our side.',
    name: 'Priya Nair',
    role: 'Chief Data Officer',
    company: 'PlanetScale',
    initials: 'PN'
  }
] as const;

export const FAQS = [
  {
    id: 'faq-1',
    question: 'How quickly can I integrate NexGen AI with my existing stack?',
    answer: 'Integration takes minutes, not months. We provide zero-code connectors for most major databases (Postgres, MySQL, MongoDB) and data warehouses (Snowflake, BigQuery). For custom applications, our REST and GraphQL APIs can be fully integrated within a few hours.'
  },
  {
    id: 'faq-2',
    question: 'Is my data secure and private?',
    answer: 'Absolutely. We employ end-to-end encryption for data both in transit and at rest. Every customer receives a fully isolated single-tenant environment. We are SOC2 Type II, GDPR, and HIPAA compliant.'
  },
  {
    id: 'faq-3',
    question: 'Do I need a data science team to use this platform?',
    answer: 'No. NexGen AI is designed to democratize machine learning. Our auto-ML engine handles feature engineering, model training, and deployment behind the scenes. Your team can focus entirely on acting on the insights generated.'
  },
  {
    id: 'faq-4',
    question: 'What kind of latency can I expect for real-time inference?',
    answer: 'Our globally distributed edge network processes events with an average latency of under 2ms. This allows you to build truly real-time responsive applications like fraud detection and dynamic pricing without noticeable delay.'
  },
  {
    id: 'faq-5',
    question: 'How does the pricing scale as my traffic grows?',
    answer: 'We charge based on events processed, with generous volume discounts built in. You only pay for what you use, and you can set hard caps to ensure you never exceed your budget. Enterprise plans include unlimited seats.'
  }
] as const;



