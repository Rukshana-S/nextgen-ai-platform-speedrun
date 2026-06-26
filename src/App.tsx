import React, { lazy, Suspense, memo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LazySection from './components/LazySection';

/* ================================================================
   LAZY-LOADED BELOW-THE-FOLD COMPONENTS
   ================================================================
   TrustedCompanies and Footer are never in the initial viewport.
   We lazy-load them so their JS + CSS is split into a separate chunk
   that the browser only downloads after the Hero has painted.
   This directly reduces initial JS parse/exec time → better TBT/FCP.
   ================================================================ */
const RealTimeInsights = lazy(() =>
  import('./components/RealTimeInsights')
);

const TrustedCompanies = lazy(() =>
  import('./components/TrustedCompanies')
);

const Footer = lazy(() =>
  import('./components/Footer')
);

const Features = lazy(() =>
  import('./components/Features')
);

const Pricing = lazy(() =>
  import('./components/Pricing')
);

const Statistics = lazy(() =>
  import('./components/Statistics')
);

const HowItWorks = lazy(() =>
  import('./components/HowItWorks')
);

const Testimonials = lazy(() =>
  import('./components/Testimonials')
);

const FAQ = lazy(() =>
  import('./components/FAQ')
);

const CTA = lazy(() =>
  import('./components/CTA')
);

/* ── Suspense fallback — invisible, zero-height placeholder ──── */
const SectionFallback = memo(() => (
  <div aria-hidden="true" style={{ minHeight: '1px' }} />
));
SectionFallback.displayName = 'SectionFallback';

/* ================================================================
   APP ROOT
   ================================================================ */
const App: React.FC = () => {
  return (
    <>
      {/* Skip-to-content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only"
        style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          zIndex: 9999,
          padding: '12px 20px',
          background: 'var(--color-teal)',
          color: 'var(--color-white)',
          borderRadius: 'var(--radius-md)',
          fontWeight: 600,
          textDecoration: 'none',
        }}
        onFocus={e => (e.currentTarget.style.clipPath = 'none')}
        onBlur={e => (e.currentTarget.style.clipPath = '')}
      >
        Skip to content
      </a>

      {/* Critical-path: Navbar renders synchronously */}
      <Navbar />

      <main id="main-content">
        {/* Hero is critical-path — synchronous, no lazy */}
        <Hero />

        {/*
          Below-fold sections: deferred via React.lazy() and IntersectionObserver.
          LazySection ensures the chunk is not even requested until the section
          scrolls near the viewport. This radically improves mobile TBT and LCP.
        */}
        <Suspense fallback={<SectionFallback />}>
          <LazySection fallbackHeight="800px">
            <RealTimeInsights />
          </LazySection>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <LazySection fallbackHeight="200px">
            <TrustedCompanies />
          </LazySection>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <LazySection fallbackHeight="800px">
            <Features />
          </LazySection>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <LazySection fallbackHeight="800px">
            <Pricing />
          </LazySection>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <LazySection fallbackHeight="400px">
            <Statistics />
          </LazySection>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <LazySection fallbackHeight="600px">
            <HowItWorks />
          </LazySection>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <LazySection fallbackHeight="500px">
            <Testimonials />
          </LazySection>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <LazySection fallbackHeight="600px">
            <FAQ />
          </LazySection>
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <LazySection fallbackHeight="400px">
            <CTA />
          </LazySection>
        </Suspense>
      </main>

      <Suspense fallback={<SectionFallback />}>
        <LazySection fallbackHeight="300px">
          <Footer />
        </LazySection>
      </Suspense>
    </>
  );
};

export default App;
