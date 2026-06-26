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

