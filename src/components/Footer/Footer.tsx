import React, { memo, useState, useCallback, useMemo } from 'react';
import { LogoMark } from '../../assets/icons';
import './Footer.css';

/* ── Social icon SVGs — module-level, not recreated per render ── */
const TwitterSVG = memo(() => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M13 1H15L10.5 6.3L15.8 13H11.5L8.2 8.8L4.4 13H2.4L7.2 7.3L2 1H6.4L9.4 4.9L13 1Z" fill="currentColor" />
  </svg>
));
TwitterSVG.displayName = 'TwitterSVG';

const LinkedInSVG = memo(() => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3.5 5.5h-2v8h2v-8zM2.5 4.5a1 1 0 100-2 1 1 0 000 2zM14 9c0-2-1-3.5-3-3.5-1 0-1.8.5-2.5 1.3V5.5h-2v8h2v-4c0-1.1.9-2 2-2s2 .9 2 2v4h1.5V9z" fill="currentColor" />
  </svg>
));
LinkedInSVG.displayName = 'LinkedInSVG';

const GithubSVG = memo(() => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M8 1C4.1 1 1 4.1 1 8c0 3.1 2 5.7 4.8 6.6.3.1.4-.2.4-.4v-1.4c-1.8.4-2.2-.9-2.2-.9-.3-.8-.7-1-.7-1-.6-.4.1-.4.1-.4.6.1 1 .6 1 .6.6 1 1.5.7 1.9.5.1-.4.2-.7.4-.9-1.4-.2-2.9-.7-2.9-3.2 0-.7.2-1.3.6-1.7-.1-.2-.3-.9.1-1.8 0 0 .5-.2 1.8.6.5-.1 1-.2 1.6-.2s1.1.1 1.6.2C10.5 4 11 4.2 11 4.2c.4.9.2 1.6.1 1.8.4.4.6 1 .6 1.7 0 2.5-1.5 3-2.9 3.1.2.2.4.6.4 1.2v1.8c0 .2.1.5.4.4C13 13.7 15 11.1 15 8c0-3.9-3.1-7-7-7z" fill="currentColor" />
  </svg>
));
GithubSVG.displayName = 'GithubSVG';

/* ── Static data — defined outside component (zero GC cost) ──── */
const FOOTER_LINKS = {
  Product: [
    { label: 'Features',      href: '#features'  },
    { label: 'Pricing',       href: '#pricing'   },
    { label: 'Changelog',     href: '#changelog' },
    { label: 'Roadmap',       href: '#roadmap'   },
    { label: 'Status',        href: '#status'    },
  ],
  Company: [
    { label: 'About',         href: '#about'     },
    { label: 'Blog',          href: '#blog'      },
    { label: 'Careers',       href: '#careers'   },
    { label: 'Contact',       href: '#contact'   },
    { label: 'Press Kit',     href: '#press'     },
  ],
  Resources: [
    { label: 'Documentation', href: '#docs'      },
    { label: 'API Reference', href: '#api'       },
    { label: 'Community',     href: '#community' },
    { label: 'Tutorials',     href: '#tutorials' },
    { label: 'Security',      href: '#security'  },
  ],
} as const;

const SOCIALS = [
  { label: 'Twitter / X', href: 'https://twitter.com/', Icon: TwitterSVG  },
  { label: 'LinkedIn',    href: 'https://linkedin.com/',Icon: LinkedInSVG },
  { label: 'GitHub',      href: 'https://github.com/',  Icon: GithubSVG  },
] as const;

const LEGAL_LINKS = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] as const;

const FOOTER_LINK_ENTRIES = Object.entries(FOOTER_LINKS) as [
  string,
  readonly { label: string; href: string }[]
][];

/* ================================================================
   FOOTER COMPONENT
   memo() — only re-renders when email/subscribed local state changes
   ================================================================ */
const Footer: React.FC = memo(() => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  /* useMemo — copyright year computed once at mount */
  const year = useMemo(() => new Date().getFullYear(), []);

  /* useCallback — stable ref, won't cause child re-renders */
  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  );

  const handleSubscribe = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (email.trim()) {
        setSubscribed(true);
        setEmail('');
      }
    },
    [email]
  );

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        {/* ── Main grid ────────────────────────────── */}
        <div className="footer__grid">
          {/* Brand column */}
          <div className="footer__brand">
            <a href="/" className="footer__logo" aria-label="NexGen AI — home">
              <LogoMark size={34} />
              <span className="footer__logo-text">
                Nex<span>Gen</span>
              </span>
            </a>

            <p className="footer__tagline">
              AI-powered analytics that turns your data into unstoppable growth. Built for
              teams who demand intelligence at scale.
            </p>

            {/* Newsletter */}
            <div className="footer__newsletter">
              <p className="footer__newsletter-label">Stay updated</p>
              {subscribed ? (
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-yellow)' }}>
                  ✓ You're subscribed! We'll be in touch.
                </p>
              ) : (
                <form className="footer__newsletter-form" onSubmit={handleSubscribe} noValidate>
                  <input
                    id="newsletter-email"
                    type="email"
                    className="footer__newsletter-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    aria-label="Email address for newsletter"
                    required
                  />
                  <button
                    type="submit"
                    className="footer__newsletter-btn"
                    aria-label="Subscribe to newsletter"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINK_ENTRIES.map(([title, links]) => (
            <nav key={title} className="footer__col" aria-label={`${title} links`}>
              <h3 className="footer__col-title">{title}</h3>
              <ul className="footer__links">
                {links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ── Bottom bar ───────────────────────────── */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} NexGen AI, Inc. All rights reserved.
          </p>

          {/* Social links */}
          <div className="footer__socials">
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                className="footer__social-btn"
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <s.Icon />
              </a>
            ))}
          </div>

          {/* Legal links */}
          <div className="footer__legal" role="list" aria-label="Legal links">
            {LEGAL_LINKS.map(l => (
              <a key={l} href="#legal" className="footer__legal-link" role="listitem">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
