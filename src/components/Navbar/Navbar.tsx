import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { LogoMark, MenuIcon, CloseIcon } from '../../assets/icons';
import { NAV_LINKS } from '../../data/siteData';
import { useScrolled, useToggle, useLockBodyScroll } from '../../hooks/useScrolled';
import { scrollToId } from '../../utils/helpers';
import './Navbar.css';

/* ================================================================
   TYPES
   ================================================================ */
interface NavbarProps {
  /** Force solid background regardless of scroll position */
  alwaysSolid?: boolean;
}

/* ================================================================
   NAVBAR COMPONENT
   memo() — only re-renders when scrolled or menuOpen state changes.
   ================================================================ */
const Navbar: React.FC<NavbarProps> = memo(({ alwaysSolid = false }) => {
  const scrolled = useScrolled(20);
  const [menuOpen, toggleMenu, setMenuOpen] = useToggle(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(menuOpen);

  /* Close on Escape key */
  useEffect(() => {
    if (!menuOpen) return; // skip listener when menu is closed
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, setMenuOpen]);

  /* Trap focus inside drawer when open */
  useEffect(() => {
    if (menuOpen && drawerRef.current) {
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      focusable[0]?.focus();
    }
  }, [menuOpen]);

  /* useCallback — stable refs prevent child re-renders */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMenuOpen(false);
      scrollToId(href.replace('#', ''), 80);
    },
    [setMenuOpen]
  );

  const closeMenu = useCallback(() => setMenuOpen(false), [setMenuOpen]);

  const isSolid = alwaysSolid || scrolled;

  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    NAV_LINKS.forEach(link => {
      const el = document.getElementById(link.href.replace('#', ''));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Main navbar ─────────────────────────────── */}
      <header
        className={`navbar ${isSolid ? 'navbar--solid' : 'navbar--transparent'}`}
        role="banner"
      >
        <div className="container navbar__inner">
          {/* Logo */}
          <a
            href="/"
            className="navbar__logo"
            aria-label="NexGen AI – go to homepage"
          >
            <LogoMark size={36} />
            <span className="navbar__logo-text">
              Nex<span>Gen</span>
            </span>
          </a>

          {/* Desktop navigation */}
          <nav className="navbar__nav" aria-label="Main navigation">
            {NAV_LINKS.map(link => (
              <a
                key={link.id}
                href={link.href}
                className={`navbar__link ${activeSection === link.href ? 'navbar__link--active' : ''}`}
                onClick={e => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="navbar__actions">
            <a
              href="#contact"
              className="btn btn-ghost btn-sm"
              onClick={e => handleNavClick(e, '#contact')}
            >
              Sign in
            </a>
            <a
              href="#get-started"
              className="btn btn-primary btn-sm"
              onClick={e => handleNavClick(e, '#get-started')}
            >
              Get Started
            </a>
          </div>

          {/* Hamburger */}
          <button
            id="mobile-menu-btn"
            className="navbar__hamburger"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={toggleMenu}
          >
            {menuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ───────────────────────────── */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Backdrop */}
        <div
          className="mobile-menu__backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />

        {/* Panel */}
        <div className="mobile-menu__panel" ref={drawerRef}>
          {/* Header */}
          <div className="mobile-menu__header">
            <a
              href="/"
              className="navbar__logo"
              aria-label="NexGen AI"
              onClick={closeMenu}
            >
              <LogoMark size={30} />
              <span className="navbar__logo-text">
                Nex<span>Gen</span>
              </span>
            </a>
            <button
              className="navbar__hamburger"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <CloseIcon size={22} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="mobile-menu__nav" aria-label="Mobile navigation">
            {NAV_LINKS.map(link => (
              <a
                key={link.id}
                href={link.href}
                className={`mobile-menu__link ${activeSection === link.href ? 'mobile-menu__link--active' : ''}`}
                onClick={e => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Footer CTA */}
          <div className="mobile-menu__footer">
            <a
              href="#contact"
              className="btn btn-outline"
              onClick={e => handleNavClick(e, '#contact')}
            >
              Sign in
            </a>
            <a
              href="#get-started"
              className="btn btn-primary"
              onClick={e => handleNavClick(e, '#get-started')}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
