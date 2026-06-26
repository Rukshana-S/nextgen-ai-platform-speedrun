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
