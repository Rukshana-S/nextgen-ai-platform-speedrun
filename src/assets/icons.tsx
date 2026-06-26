// Centralised SVG icon exports — no external icon libraries used.
// Every SVG is inlined and tree-shakeable.

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

/* ── Logo mark ─────────────────────────────────────────────────── */
export const LogoMark: React.FC<IconProps> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect width="32" height="32" rx="8" fill="#114C5A" />
    <path
      d="M8 16C8 11.582 11.582 8 16 8s8 3.582 8 8-3.582 8-8 8"
      stroke="#FFC801"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="16" cy="16" r="3" fill="#FF9932" />
    <path d="M16 10v2M16 20v2M10 16h2M20 16h2" stroke="#F1F6F4" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ── Menu (hamburger) ──────────────────────────────────────────── */
export const MenuIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 6h16M4 12h16M4 18h16" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ── Close (X) ─────────────────────────────────────────────────── */
export const CloseIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* ── Arrow right ───────────────────────────────────────────────── */
export const ArrowRightIcon: React.FC<IconProps> = ({ className = '', size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 10h12M11 5l5 5-5 5" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Sparkle / AI star ─────────────────────────────────────────── */
export const SparkleIcon: React.FC<IconProps> = ({ className = '', size = 20, color = '#FFC801' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10 2l1.8 5.5H17l-4.6 3.3 1.8 5.5L10 13l-4.2 3.3 1.8-5.5L3 7.5h5.2L10 2z"
      fill={color}
    />
  </svg>
);

/* ── Check circle ──────────────────────────────────────────────── */
export const CheckIcon: React.FC<IconProps> = ({ className = '', size = 20, color = '#114C5A' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M6.5 10.5l2.5 2.5 4.5-4.5" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Trending up ───────────────────────────────────────────────── */
export const TrendingUpIcon: React.FC<IconProps> = ({ className = '', size = 20, color = '#114C5A' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M3 14l5-5 3 3 6-6M13 6h4v4" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Shield (Security) ─────────────────────────────────────────── */
export const ShieldIcon: React.FC<IconProps> = ({ className = '', size = 20, color = '#114C5A' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10 2l7 3v5c0 4-3.5 7-7 8-3.5-1-7-4-7-8V5l7-3z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M7 10l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Zap / Lightning ───────────────────────────────────────────── */
export const ZapIcon: React.FC<IconProps> = ({ className = '', size = 20, color = '#FF9932' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M11 2L4 11h6l-1 7 7-9h-6l1-7z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

/* ── Play ──────────────────────────────────────────────────────── */
export const PlayIcon: React.FC<IconProps> = ({ className = '', size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="1.5" />
    <path d="M8 7.5l5 2.5-5 2.5V7.5z" fill={color} />
  </svg>
);

/* ── Globe ─────────────────────────────────────────────────────── */
export const GlobeIcon: React.FC<IconProps> = ({ className = '', size = 20, color = '#114C5A' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.5" />
    <path d="M2 10h16M10 2c-2 2-3 5-3 8s1 6 3 8M10 2c2 2 3 5 3 8s-1 6-3 8" stroke={color} strokeWidth="1.5" />
  </svg>
);

/* ── Users ─────────────────────────────────────────────────────── */
export const UsersIcon: React.FC<IconProps> = ({ className = '', size = 20, color = '#114C5A' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="8" cy="6" r="3" stroke={color} strokeWidth="1.5" />
    <path d="M2 18c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="15" cy="7" r="2.5" stroke={color} strokeWidth="1.5" />
    <path d="M18 18c0-2.8-1.3-5-3.5-5.8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

/* ── Chart bar ─────────────────────────────────────────────────── */
export const ChartBarIcon: React.FC<IconProps> = ({ className = '', size = 20, color = '#114C5A' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="11" width="4" height="7" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="8" y="7" width="4" height="11" rx="1" stroke={color} strokeWidth="1.5" />
    <rect x="14" y="3" width="4" height="15" rx="1" stroke={color} strokeWidth="1.5" />
  </svg>
);

/* ── Chevron Down ──────────────────────────────────────────────── */
export const ChevronDownIcon: React.FC<IconProps> = ({ className = '', size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M6 9L12 15L18 9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Target ────────────────────────────────────────────────────── */
export const TargetIcon: React.FC<IconProps> = ({ className = '', size = 20, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
);

