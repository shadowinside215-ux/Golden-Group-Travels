import React, { useEffect, useRef } from 'react';
import { AlertTriangle, Handshake } from 'lucide-react';
import { Language } from '../assets/destinations';
import {
  EUROPE_BENELUX_COPY,
  EUROPE_BENELUX_HOLIDAY_ROUTE,
  EUROPE_BENELUX_IMAGES
} from '../data/europeBeneluxHolidayData';
import { setupWindowPopScroll3D } from '../utils/tab3DMotion';
import { ProgramCard } from './programs/ProgramCard';

interface EuropeBeneluxHolidaySectionProps {
  lang: Language;
  isRtl: boolean;
}

export const EuropeBeneluxHolidaySection: React.FC<EuropeBeneluxHolidaySectionProps> = ({
  lang,
  isRtl
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const copy = EUROPE_BENELUX_COPY[lang];

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    return setupWindowPopScroll3D(root, {
      headings: '.ggt-eur-sec-heading',
      cards: '.ggt-eur-showcase-card',
      refreshDelayMs: 180
    });
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="paris-benelux-sejour-heading"
      className="pt-2 space-y-6"
    >
      <div className="ggt-eur-sec-heading flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div className="space-y-1.5 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
            {copy.showcaseEyebrow}
          </div>
          <h2
            id="paris-benelux-sejour-heading"
            className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]"
          >
            {copy.showcaseTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
            {copy.showcaseSubtitle}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#fcf9f2] border border-[#d1a847]/55 text-xs font-semibold text-[#0b1d3a] self-start md:self-auto shrink-0">
          <Handshake className="w-4 h-4 text-[#c59b38] shrink-0" />
          <span>{copy.showcaseCollaboration}</span>
        </div>
      </div>

      {/* Company-Operated Paris, Belgique et Pays-Bas Showcase Card */}
      <ProgramCard
        className="ggt-eur-showcase-card"
        image={EUROPE_BENELUX_IMAGES.hero}
        imageAlt={`${copy.showcaseTitle} — ${copy.destinationsStripLabel}`}
        fallbackGradient={EUROPE_BENELUX_IMAGES.fallbackGradient}
        badgeIcon={Handshake}
        badgeText={copy.showcaseCollaboration}
        arabicTitle={copy.showcaseArabicTitle}
        title={copy.showcaseTitle}
        topBannerLabel={`${copy.showcaseDepartureLabel} · 7J / 6N · ${copy.destinationsStripLabel}`}
        summary={copy.showcaseDescription}
        startingFromLabel={copy.showcaseStartingFromLabel}
        startingPriceDisplay={copy.showcaseStartingPrice}
        startingPriceScopeNote={copy.showcaseStartingScopeNote}
        infoBox1={{
          label: copy.showcaseSubtitle,
          value: copy.showcaseHighlights.join(' · ')
        }}
        infoBox2={{
          variant: 'warning',
          icon: AlertTriangle,
          value: copy.showcaseAirlineNotice
        }}
        detailsTo={EUROPE_BENELUX_HOLIDAY_ROUTE}
        detailsLabel={copy.showcaseViewPackageBtn}
        bookingTo={`${EUROPE_BENELUX_HOLIDAY_ROUTE}#paris-benelux-inquiry`}
        bookingLabel={copy.showcaseReserveBtn}
        isRtl={isRtl}
      />
    </section>
  );
};
