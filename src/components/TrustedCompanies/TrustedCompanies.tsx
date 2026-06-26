import React, { memo, useMemo } from 'react';
import { TRUSTED_COMPANIES } from '../../data/siteData';
import { stringToColor } from '../../utils/helpers';
import './TrustedCompanies.css';

/* ── Inline SVG wordmark per company ─────────────────────────── */
/*
  memo() — CompanyWordmark receives the same `name` prop each render.
  Memoizing prevents re-rendering 14 SVGs on every scroll event.
*/
const CompanyWordmark = memo<{ name: string }>(({ name }) => {
  const color = stringToColor(name);
  const viewBoxWidth = name.length * 11 + 10;
  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} 28`}
      width={viewBoxWidth}
      height="22"
      aria-label={name}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <text
        x="5"
        y="21"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="700"
        fontSize="18"
        fill={color}
        letterSpacing="-0.5"
      >
        {name}
      </text>
    </svg>
  );
});
CompanyWordmark.displayName = 'CompanyWordmark';

/* ================================================================
   TRUSTED COMPANIES
   memo() — section never changes after mount
   ================================================================ */
const TrustedCompanies: React.FC = memo(() => {
  /*
    useMemo — the duplicated array is computed once at mount,
    not on every re-render. Saves GC pressure from array spread.
  */
  const loopItems = useMemo(
    () => [
      ...TRUSTED_COMPANIES,
      ...TRUSTED_COMPANIES,
      ...TRUSTED_COMPANIES,
      ...TRUSTED_COMPANIES
    ],
    []
  );

  return (
    <section
      id="trusted"
      className="trusted"
      aria-labelledby="trusted-heading"
    >
      <div className="container">
        {/* Header */}
        <div className="trusted__header">
          <p className="trusted__label">Trusted by teams at</p>
          <div className="trusted__divider-row">
            <span className="trusted__divider" aria-hidden="true" />
            <h2 id="trusted-heading" className="visually-hidden">
              Trusted Companies
            </h2>
            <span className="trusted__divider" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Marquee — full-width, no container padding */}
      <div
        className="trusted__track-wrap"
        role="region"
        aria-label="Trusted companies marquee"
      >
        <div className="trusted__track" aria-hidden="true">
          {loopItems.map((company, idx) => (
            <div
              key={`${company.id}-${idx}`}
              className="trusted__logo-pill"
            >
              <CompanyWordmark name={company.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

TrustedCompanies.displayName = 'TrustedCompanies';

export default TrustedCompanies;
