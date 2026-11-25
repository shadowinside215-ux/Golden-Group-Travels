import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  Check,
  MapPin,
  PlaneLanding,
  ShieldCheck
} from 'lucide-react';
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
      <article className="ggt-cairo-showcase-card rounded-2xl overflow-hidden bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] shadow-[0_24px_56px_rgba(7,20,41,0.2)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Editorial Cairo Photography Panel */}
          <div
            className="lg:col-span-5 relative min-h-[250px] sm:min-h-[300px] lg:min-h-full overflow-hidden"
            style={{ background: CAIRO_TOUR_IMAGES.fallbackGradient }}
          >
            <img
              src={CAIRO_TOUR_IMAGES.hero}
              alt={`${copy.frenchTitle} — ${copy.destination}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#071429] via-[#071429]/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#071429]/25 lg:to-[#071429]"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fceda2]">
                <MapPin className="w-3.5 h-3.5 text-[#d1a847]" />
                <span>{copy.destination}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fcf9f2] tabular-nums">
                <Calendar className="w-3.5 h-3.5 text-[#d1a847]" />
                <span>{copy.duration}</span>
              </span>
            </div>
          </div>

          {/* Tour Content & Pricing Summary Panel */}
          <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#d1a847]/30">
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                    {copy.heroEyebrow}
                  </div>
                  <h3 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#fcf9f2] leading-tight">
                    {copy.frenchTitle}
                  </h3>
                  <div
                    dir="rtl"
                    lang="ar"
                    className="text-lg sm:text-xl font-semibold text-[#fceda2]/95"
                  >
                    {copy.arabicTitle}
                  </div>
                </div>

                {/* Authoritative USD Starting Price Block */}
                <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847] px-4 py-3 shrink-0 self-start">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#fceda2]/80 font-semibold">
                    {copy.startingFromLabel}
                  </div>
                  <div className="font-serif-crest text-2xl sm:text-3xl font-bold text-[#fceda2] tabular-nums leading-tight mt-0.5">
                    {copy.startingPriceDisplay}
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5 tabular-nums">
                    {copy.perPersonUsdNote}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {copy.cardSummary}
              </p>

              {/* Verified Program Highlights */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {copy.cardHighlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-100 leading-snug"
                  >
                    <Check className="w-4 h-4 text-[#d1a847] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Prominent International Flights Exclusion Notice */}
              <div className="rounded-xl bg-amber-950/55 border border-amber-400/50 px-4 py-3 flex items-center gap-3 text-xs text-amber-100">
                <div className="relative shrink-0 w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
                  <PlaneLanding className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-amber-200">{copy.flightsExcludedHeadline}</span>
                </div>
                <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 ms-auto" />
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                to={CAIRO_TOUR_ROUTE}
                className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.14em] shadow-lg"
              >
                <span>{copy.viewProgramCta}</span>
                <ArrowRight
                  className={`ggt-forward-arrow w-4 h-4 shrink-0 ${isRtl ? 'rotate-180' : ''}`}
                />
              </Link>

              <Link
                to={`${CAIRO_TOUR_ROUTE}#cairo-inquiry-form`}
                className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/70 text-xs font-semibold uppercase tracking-[0.12em]"
              >
                <span>{copy.requestReservationCta}</span>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Organized Grand Egypt Tour Feature Card */}
      <article className="ggt-cairo-showcase-card rounded-2xl overflow-hidden bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] shadow-[0_24px_56px_rgba(7,20,41,0.2)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Editorial Nile Cruise & Egypt Photography Panel */}
          <div
            className="lg:col-span-5 relative min-h-[250px] sm:min-h-[300px] lg:min-h-full overflow-hidden"
            style={{ background: GRAND_EGYPT_TOUR_IMAGES.fallbackGradient }}
          >
            <img
              src={GRAND_EGYPT_TOUR_IMAGES.hero}
              alt={`${egyptCopy.frenchFullTitle} — ${egyptCopy.routeStopsLine}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#071429] via-[#071429]/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#071429]/25 lg:to-[#071429]"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fceda2]">
                <MapPin className="w-3.5 h-3.5 text-[#d1a847]" />
                <span>{egyptCopy.destinationLine}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fcf9f2] tabular-nums">
                <Calendar className="w-3.5 h-3.5 text-[#d1a847]" />
                <span>{egyptCopy.durationLabel}</span>
              </span>
            </div>
          </div>

          {/* Tour Content & Starting USD Pricing Summary Panel */}
          <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#d1a847]/30">
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                    {egyptCopy.routeStopsLine}
                  </div>
                  <h3 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#fcf9f2] leading-tight">
                    {egyptCopy.cardShortTitle}
                  </h3>
                  <div
                    dir="rtl"
                    lang="ar"
                    className="text-lg sm:text-xl font-semibold text-[#fceda2]/95"
                  >
                    {egyptCopy.arabicTitle}
                  </div>
                </div>

                {/* Authoritative USD Starting Price Block */}
                <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847] px-4 py-3 shrink-0 self-start max-w-xs">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#fceda2]/80 font-semibold">
                    {egyptCopy.startingFromLabel}
                  </div>
                  <div className="font-serif-crest text-2xl sm:text-3xl font-bold text-[#fceda2] tabular-nums leading-tight mt-0.5">
                    {egyptCopy.startingPriceDisplay}{' '}
                    <span className="text-sm font-semibold text-slate-200">/ pers.</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1 leading-snug">
                    {egyptCopy.startingBasisNote}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {egyptCopy.cardSummary}
              </p>

              {/* Connected 3-Stage Breakdown */}
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {egyptCopy.stages.map((stage) => (
                  <li
                    key={stage.id}
                    className="rounded-xl bg-[#0b1d3a]/85 border border-[#d1a847]/35 px-3 py-2.5 text-xs text-slate-100"
                  >
                    <div className="font-semibold text-[#fceda2]">{stage.destinationTitle}</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">{stage.nightsBadge}</div>
                  </li>
                ))}
              </ul>

              {/* Clear Distinction: Domestic Flights Included vs International Flights NOT Included */}
              <div className="rounded-xl bg-amber-950/55 border border-amber-400/50 px-4 py-3 flex items-center gap-3 text-xs text-amber-100">
                <div className="relative shrink-0 w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
                  <PlaneLanding className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-amber-200">{egyptCopy.cardFlightDistinction}</span>
                </div>
                <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 ms-auto" />
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                to={GRAND_EGYPT_TOUR_ROUTE}
                className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.14em] shadow-lg"
              >
                <span>{egyptCopy.discoverBtn}</span>
                <ArrowRight
                  className={`ggt-forward-arrow w-4 h-4 shrink-0 ${isRtl ? 'rotate-180' : ''}`}
                />
              </Link>

              <Link
                to={`${GRAND_EGYPT_TOUR_ROUTE}#grand-egypt-inquiry-form`}
                className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/70 text-xs font-semibold uppercase tracking-[0.12em]"
              >
                <span>{egyptCopy.reserveBtn}</span>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Official Egypt Transfers & Excursions Card */}
      <article className="ggt-cairo-showcase-card rounded-2xl overflow-hidden bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] shadow-[0_24px_56px_rgba(7,20,41,0.2)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Editorial Egypt VIP Transport & Pyramids Photography Panel */}
          <div
            className="lg:col-span-5 relative min-h-[250px] sm:min-h-[300px] lg:min-h-full overflow-hidden"
            style={{ background: EGYPT_EXCURSIONS_IMAGES.fallbackGradient }}
          >
            <img
              src={EGYPT_EXCURSIONS_IMAGES.hero}
              alt={`${excursionsCopy.showcaseCardTitle} — ${excursionsCopy.showcaseDestination}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#071429] via-[#071429]/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#071429]/25 lg:to-[#071429]"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fceda2]">
                <MapPin className="w-3.5 h-3.5 text-[#d1a847]" />
                <span>{excursionsCopy.showcaseDestination}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fcf9f2] tabular-nums">
                <Calendar className="w-3.5 h-3.5 text-[#d1a847]" />
                <span>31/12/2026</span>
              </span>
            </div>
          </div>

          {/* Service Presentation & Scoped 20 USD Starting Price Panel */}
          <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#d1a847]/30">
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                    {excursionsCopy.showcaseSubtitle}
                  </div>
                  <h3 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#fcf9f2] leading-tight">
                    {excursionsCopy.showcaseCardTitle}
                  </h3>
                  <div
                    dir="rtl"
                    lang="ar"
                    className="text-lg sm:text-xl font-semibold text-[#fceda2]/95"
                  >
                    {excursionsCopy.showcaseArabicTitle}
                  </div>
                </div>

                {/* Authoritative Scoped Starting Price Block (20 USD strictly for 6-person airport transfer) */}
                <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847] px-4 py-3 shrink-0 self-start max-w-xs">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#fceda2]/80 font-semibold">
                    {excursionsCopy.showcaseStartingFromLabel}
                  </div>
                  <div className="font-serif-crest text-2xl sm:text-3xl font-bold text-[#fceda2] tabular-nums leading-tight mt-0.5">
                    {excursionsCopy.showcaseStartingPrice}
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1 leading-snug">
                    {excursionsCopy.showcaseStartingScopeNote}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {excursionsCopy.showcaseDescription}
              </p>

              {/* Verified Highlights */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {excursionsCopy.showcaseHighlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-100 leading-snug"
                  >
                    <Check className="w-4 h-4 text-[#d1a847] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-xl bg-[#0b1d3a]/85 border border-[#d1a847]/40 px-4 py-2.5 text-xs text-[#fceda2] font-medium">
                {excursionsCopy.showcaseValidityTag}
              </div>
            </div>

            {/* Required Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                to={EGYPT_EXCURSIONS_ROUTE}
                className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.14em] shadow-lg"
              >
                <span>{excursionsCopy.showcaseViewExcursionsBtn}</span>
                <ArrowRight
                  className={`ggt-forward-arrow w-4 h-4 shrink-0 ${isRtl ? 'rotate-180' : ''}`}
                />
              </Link>

              <Link
                to={`${EGYPT_EXCURSIONS_ROUTE}#egypt-excursions-inquiry`}
                className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/70 text-xs font-semibold uppercase tracking-[0.12em]"
              >
                <span>{excursionsCopy.showcaseReserveBtn}</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};
