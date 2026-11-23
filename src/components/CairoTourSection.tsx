import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

gsap.registerPlugin(ScrollTrigger);

interface CairoTourSectionProps {
  lang: Language;
  isRtl: boolean;
}

export const CairoTourSection: React.FC<CairoTourSectionProps> = ({ lang, isRtl }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const copy = CAIRO_TOUR_COPY[lang];

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

        const heading = root.querySelector<HTMLElement>('.ggt-cairo-sec-heading');
        if (heading) {
          gsap.fromTo(
            heading,
            isDesktop
              ? { opacity: 0.35, y: 20, rotateX: 5, transformPerspective: 1100 }
              : { opacity: 0.4, y: 12 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              ease: 'none',
              scrollTrigger: { trigger: heading, start: 'top 95%', end: 'top 68%', scrub: 0.5 }
            }
          );
        }

        const card = root.querySelector<HTMLElement>('.ggt-cairo-showcase-card');
        if (card) {
          gsap.fromTo(
            card,
            isDesktop
              ? { opacity: 0.35, y: 28, scale: 0.97, rotateX: 4, transformPerspective: 1200 }
              : { opacity: 0.4, y: 16, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top 94%', end: 'top 64%', scrub: 0.55 }
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
                className="inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.14em] shadow-lg transition-colors"
              >
                <span>{copy.viewProgramCta}</span>
                <ArrowRight className={`w-4 h-4 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
              </Link>

              <Link
                to={`${CAIRO_TOUR_ROUTE}#cairo-inquiry-form`}
                className="inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/70 text-xs font-semibold uppercase tracking-[0.12em] transition-colors"
              >
                <span>{copy.requestReservationCta}</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};
