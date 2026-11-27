import React, { useEffect, useRef } from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { Language } from '../assets/destinations';
import {
  ISTANBUL_HOLIDAY_COPY,
  ISTANBUL_HOLIDAY_IMAGES,
  ISTANBUL_HOLIDAY_ROUTE
} from '../data/istanbulHolidayData';
import { setupWindowPopScroll3D } from '../utils/tab3DMotion';
import { ProgramCard } from './programs/ProgramCard';

interface IstanbulHolidaySectionProps {
  lang: Language;
  isRtl: boolean;
}

export const IstanbulHolidaySection: React.FC<IstanbulHolidaySectionProps> = ({
  lang,
  isRtl
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const copy = ISTANBUL_HOLIDAY_COPY[lang];

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    return setupWindowPopScroll3D(root, {
      headings: '.ggt-ist-sec-heading',
      cards: '.ggt-ist-showcase-card',
      refreshDelayMs: 180
    });
  }, [lang]);

  const clarificationNote =
    lang === 'ar'
      ? 'توجد نقاط تتطلب تأكيداً من الوكالة (تاريخ عودة Ilkbal Deluxe وفرق 6/7 ليالٍ وتفاصيل VIP/الأمتعة).'
      : lang === 'en'
      ? 'Poster date/night & optional VIP/baggage clarifications are flagged transparently on the package page.'
      : lang === 'es'
      ? 'Discrepancias de fechas/noches y opciones VIP/equipaje señaladas con transparencia.'
      : 'Écarts de nuits / dates retour (26/12) et précisions VIP / bagages signalés en toute transparence sur la fiche.';

  return (
    <section
      ref={sectionRef}
      aria-labelledby="nos-sejours-organises-heading"
      className="pt-2 space-y-6"
    >
      <div className="ggt-ist-sec-heading flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div className="space-y-1.5 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
            {copy.showcaseEyebrow}
          </div>
          <h2
            id="nos-sejours-organises-heading"
            className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]"
          >
            {copy.showcaseTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
            {copy.showcaseSubtitle}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#fcf9f2] border border-[#d1a847]/55 text-xs font-semibold text-[#0b1d3a] self-start md:self-auto shrink-0">
          <ShieldCheck className="w-4 h-4 text-[#c59b38] shrink-0" />
          <span>Golden Group Travels · Hors Omra Istanbul</span>
        </div>
      </div>

      {/* Company-Operated Turquie – Istanbul Package Showcase Card */}
      <ProgramCard
        className="ggt-ist-showcase-card"
        image={ISTANBUL_HOLIDAY_IMAGES.hero}
        imageAlt={`${copy.showcaseTitle} — ${copy.showcaseSubtitle}`}
        fallbackGradient={ISTANBUL_HOLIDAY_IMAGES.fallbackGradient}
        badgeIcon={ShieldCheck}
        badgeText="Golden Group Travels · Hors Omra Istanbul"
        arabicTitle={copy.showcaseArabicTitle}
        title={copy.showcaseTitle}
        topBannerLabel={`${copy.showcaseDepartureLabel} · 7J / 6N*`}
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
          value: clarificationNote
        }}
        detailsTo={ISTANBUL_HOLIDAY_ROUTE}
        detailsLabel={copy.showcaseViewPackageBtn}
        bookingTo={`${ISTANBUL_HOLIDAY_ROUTE}#istanbul-holiday-inquiry`}
        bookingLabel={copy.showcaseReserveBtn}
        isRtl={isRtl}
      />
    </section>
  );
};
