import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  Check,
  Handshake,
  MapPin,
  PlaneTakeoff
} from 'lucide-react';
import { Language } from '../assets/destinations';
import {
  EUROPE_BENELUX_COPY,
  EUROPE_BENELUX_HOLIDAY_ROUTE,
  EUROPE_BENELUX_IMAGES
} from '../data/europeBeneluxHolidayData';

gsap.registerPlugin(ScrollTrigger);

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

    const mm = gsap.matchMedia();
    mm.add(
      {
        isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        isMobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)'
      },
      (context) => {
        const isDesktop = Boolean(context.conditions?.isDesktop);

        const heading = root.querySelector<HTMLElement>('.ggt-eur-sec-heading');
        if (heading) {
          gsap.fromTo(
            heading,
            isDesktop
              ? { opacity: 0.45, y: 16, rotateX: 4.5, transformPerspective: 1100 }
              : { opacity: 0.45, y: 10 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              force3D: true,
              ease: 'none',
              scrollTrigger: { trigger: heading, start: 'top 96%', end: 'top 79%', scrub: 0.12 }
            }
          );
        }

        const card = root.querySelector<HTMLElement>('.ggt-eur-showcase-card');
        if (card) {
          gsap.fromTo(
            card,
            isDesktop
              ? { opacity: 0.45, y: 20, scale: 0.97, rotateX: 4, transformPerspective: 1200 }
              : { opacity: 0.45, y: 12, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              force3D: true,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top 96%', end: 'top 78%', scrub: 0.12 }
            }
          );
        }
      }
    );

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    return () => {
      window.clearTimeout(refreshId);
      mm.revert();
    };
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
      <article className="ggt-eur-showcase-card rounded-2xl overflow-hidden bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] shadow-[0_24px_56px_rgba(7,20,41,0.2)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Editorial Paris Seine & Eiffel Tower Cover Imagery */}
          <div
            className="lg:col-span-5 relative min-h-[260px] sm:min-h-[300px] lg:min-h-full overflow-hidden"
            style={{ background: EUROPE_BENELUX_IMAGES.fallbackGradient }}
          >
            <img
              src={EUROPE_BENELUX_IMAGES.hero}
              alt={`${copy.showcaseTitle} — ${copy.destinationsStripLabel}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#071429] via-[#071429]/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#071429]/25 lg:to-[#071429]"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fceda2]">
                <PlaneTakeoff className="w-3.5 h-3.5 text-[#d1a847]" />
                <span>{copy.showcaseDepartureLabel}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fcf9f2] tabular-nums">
                <Calendar className="w-3.5 h-3.5 text-[#d1a847]" />
                <span>7J / 6N</span>
              </span>
            </div>
          </div>

          {/* Showcase Details & Verified MAD Starting Fare */}
          <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#d1a847]/30">
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                    {copy.showcaseSubtitle}
                  </div>
                  <h3 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#fcf9f2] leading-tight">
                    {copy.showcaseTitle}
                  </h3>
                  <div
                    dir="rtl"
                    lang="ar"
                    className="text-lg sm:text-xl font-semibold text-[#fceda2]/95"
                  >
                    {copy.showcaseArabicTitle}
                  </div>
                  <div className="text-xs text-[#fceda2]/80 pt-1">
                    {copy.destinationsStripLabel}
                  </div>
                </div>

                {/* Scoped Starting Price (05/12/2026 Triple Room ONLY) */}
                <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847] px-4 py-3 shrink-0 self-start max-w-xs">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#fceda2]/80 font-semibold">
                    {copy.showcaseStartingFromLabel}
                  </div>
                  <div className="font-serif-crest text-2xl sm:text-3xl font-bold text-[#fceda2] tabular-nums leading-tight mt-0.5">
                    {copy.showcaseStartingPrice}
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1 leading-snug">
                    {copy.showcaseStartingScopeNote}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {copy.showcaseDescription}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {copy.showcaseHighlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-100 leading-snug"
                  >
                    <Check className="w-4 h-4 text-[#d1a847] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-xl bg-amber-950/55 border border-amber-400/50 px-4 py-2.5 flex items-center gap-2.5 text-xs text-amber-100">
                <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{copy.showcaseAirlineNotice}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                to={EUROPE_BENELUX_HOLIDAY_ROUTE}
                className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.14em] shadow-lg"
              >
                <span>{copy.showcaseViewPackageBtn}</span>
                <ArrowRight
                  className={`ggt-forward-arrow w-4 h-4 shrink-0 ${isRtl ? 'rotate-180' : ''}`}
                />
              </Link>

              <Link
                to={`${EUROPE_BENELUX_HOLIDAY_ROUTE}#paris-benelux-inquiry`}
                className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/70 text-xs font-semibold uppercase tracking-[0.12em]"
              >
                <MapPin className="w-4 h-4 text-[#d1a847] shrink-0" />
                <span>{copy.showcaseReserveBtn}</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};
