import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin, PlaneLanding, ShieldCheck } from 'lucide-react';
import { Language } from '../assets/destinations';
import {
  CAIRO_TOUR_COPY,
  CAIRO_TOUR_IMAGES,
  CAIRO_TOUR_ROUTE
} from '../data/cairoTourData';
import {
  GRAND_EGYPT_COPY,
  GRAND_EGYPT_TOUR_IMAGES,
  GRAND_EGYPT_TOUR_ROUTE
} from '../data/grandEgyptTourData';
import {
  EGYPT_EXCURSIONS_COPY,
  EGYPT_EXCURSIONS_IMAGES,
  EGYPT_EXCURSIONS_ROUTE
} from '../data/egyptExcursionsData';
import { setupWindowPopScroll3D } from '../utils/tab3DMotion';
import { ProgramCard } from './programs/ProgramCard';

interface CairoTourSectionProps {
  lang: Language;
  isRtl: boolean;
}

export const CairoTourSection: React.FC<CairoTourSectionProps> = ({ lang, isRtl }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const copy = CAIRO_TOUR_COPY[lang];
  const egyptCopy = GRAND_EGYPT_COPY[lang];
  const excursionsCopy = EGYPT_EXCURSIONS_COPY[lang];

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    return setupWindowPopScroll3D(root, {
      headings: '.ggt-cairo-sec-heading',
      cards: '.ggt-cairo-showcase-card',
      refreshDelayMs: 180
    });
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="nos-circuits-organises-heading"
      className="pt-2 space-y-6"
    >
      <div className="ggt-cairo-sec-heading flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div className="space-y-1.5 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
            {copy.sectionEyebrow}
          </div>
          <h2
            id="nos-circuits-organises-heading"
            className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]"
          >
            {copy.sectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
            {copy.sectionSubtitle}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#fcf9f2] border border-[#d1a847]/55 text-xs font-semibold text-[#0b1d3a] self-start md:self-auto shrink-0">
          <ShieldCheck className="w-4 h-4 text-[#c59b38] shrink-0" />
          <span>{copy.badgeDirectAgency}</span>
        </div>
      </div>

      {/* Organized Cairo Tour Feature Card */}
      <ProgramCard
        className="ggt-cairo-showcase-card"
        image={CAIRO_TOUR_IMAGES.hero}
        imageAlt={`${copy.frenchTitle} — ${copy.destination}`}
        fallbackGradient={CAIRO_TOUR_IMAGES.fallbackGradient}
        badgeIcon={ShieldCheck}
        badgeText={copy.badgeDirectAgency}
        arabicTitle={copy.arabicTitle}
        title={copy.frenchTitle}
        topBannerLabel={`${copy.destination} · ${copy.duration}`}
        summary={copy.cardSummary}
        startingFromLabel={copy.startingFromLabel}
        startingPriceDisplay={copy.startingPriceDisplay}
        startingPriceScopeNote={copy.perPersonUsdNote}
        infoBox1={{
          label: copy.heroEyebrow,
          value: copy.cardHighlights.join(' · ')
        }}
        infoBox2={{
          variant: 'warning',
          icon: PlaneLanding,
          value: copy.flightsExcludedHeadline
        }}
        detailsTo={CAIRO_TOUR_ROUTE}
        detailsLabel={copy.viewProgramCta}
        bookingTo={`${CAIRO_TOUR_ROUTE}#cairo-inquiry-form`}
        bookingLabel={copy.requestReservationCta}
        isRtl={isRtl}
      />

      {/* Organized Grand Egypt Tour Feature Card */}
      <ProgramCard
        className="ggt-cairo-showcase-card"
        image={GRAND_EGYPT_TOUR_IMAGES.hero}
        imageAlt={`${egyptCopy.frenchFullTitle} — ${egyptCopy.routeStopsLine}`}
        fallbackGradient={GRAND_EGYPT_TOUR_IMAGES.fallbackGradient}
        badgeIcon={ShieldCheck}
        badgeText={egyptCopy.routeStopsLine}
        arabicTitle={egyptCopy.arabicTitle}
        title={egyptCopy.cardShortTitle}
        topBannerLabel={`${egyptCopy.destinationLine} · ${egyptCopy.durationLabel}`}
        summary={egyptCopy.cardSummary}
        startingFromLabel={egyptCopy.startingFromLabel}
        startingPriceDisplay={`${egyptCopy.startingPriceDisplay} / pers.`}
        startingPriceScopeNote={egyptCopy.startingBasisNote}
        infoBox1={{
          label: egyptCopy.durationLabel,
          value: egyptCopy.stages
            .map((stage) => `${stage.destinationTitle} (${stage.nightsBadge})`)
            .join(' · ')
        }}
        infoBox2={{
          variant: 'warning',
          icon: PlaneLanding,
          value: egyptCopy.cardFlightDistinction
        }}
        detailsTo={GRAND_EGYPT_TOUR_ROUTE}
        detailsLabel={egyptCopy.discoverBtn}
        bookingTo={`${GRAND_EGYPT_TOUR_ROUTE}#grand-egypt-inquiry-form`}
        bookingLabel={egyptCopy.reserveBtn}
        isRtl={isRtl}
      />

      {/* Official Egypt Transfers & Excursions Card */}
      <ProgramCard
        className="ggt-cairo-showcase-card"
        image={EGYPT_EXCURSIONS_IMAGES.hero}
        imageAlt={`${excursionsCopy.showcaseCardTitle} — ${excursionsCopy.showcaseDestination}`}
        fallbackGradient={EGYPT_EXCURSIONS_IMAGES.fallbackGradient}
        badgeIcon={MapPin}
        badgeText={excursionsCopy.showcaseDestination}
        arabicTitle={excursionsCopy.showcaseArabicTitle}
        title={excursionsCopy.showcaseCardTitle}
        topBannerLabel={excursionsCopy.showcaseSubtitle}
        summary={excursionsCopy.showcaseDescription}
        startingFromLabel={excursionsCopy.showcaseStartingFromLabel}
        startingPriceDisplay={excursionsCopy.showcaseStartingPrice}
        startingPriceScopeNote={excursionsCopy.showcaseStartingScopeNote}
        infoBox1={{
          label: excursionsCopy.showcaseDestination,
          value: excursionsCopy.showcaseHighlights.join(' · ')
        }}
        infoBox2={{
          variant: 'navy',
          icon: Calendar,
          label: '31/12/2026',
          value: excursionsCopy.showcaseValidityTag
        }}
        detailsTo={EGYPT_EXCURSIONS_ROUTE}
        detailsLabel={excursionsCopy.showcaseViewExcursionsBtn}
        bookingTo={`${EGYPT_EXCURSIONS_ROUTE}#egypt-excursions-inquiry`}
        bookingLabel={excursionsCopy.showcaseReserveBtn}
        isRtl={isRtl}
      />
    </section>
  );
};
