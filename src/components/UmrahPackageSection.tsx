import React, { useEffect, useRef } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Language } from '../assets/destinations';
import {
  OMRA_RAJAB_COPY,
  OMRA_RAJAB_IMAGES,
  OMRA_RAJAB_ROUTE
} from '../data/omraRajabData';
import {
  OMRA_ISTANBUL_COPY,
  OMRA_ISTANBUL_IMAGES,
  OMRA_ISTANBUL_ROUTE
} from '../data/omraIstanbulData';
import {
  OMRA_CHAABANE_COPY,
  OMRA_CHAABANE_IMAGES,
  OMRA_CHAABANE_RAMADAN_ROUTE
} from '../data/omraChaabaneRamadanData';
import {
  OMRA_RAMADAN_COPY,
  OMRA_RAMADAN_IMAGES,
  OMRA_RAMADAN_META,
  OMRA_RAMADAN_ROUTE
} from '../data/omraRamadanData';
import {
  OMRA_CHAABANE_ONLY_COPY,
  OMRA_CHAABANE_ONLY_IMAGES,
  OMRA_CHAABANE_ONLY_META,
  OMRA_CHAABANE_ONLY_ROUTE
} from '../data/omraChaabaneData';
import { setupWindowPopScroll3D } from '../utils/tab3DMotion';
import { ProgramCard } from './programs/ProgramCard';

interface UmrahPackageSectionProps {
  lang: Language;
  isRtl: boolean;
  whatsappInternational?: string;
  displayPhone?: string;
  onJumpToPlanner?: () => void;
}

/** Authoritative official starting fares per person from agency advertisements */
export const OFFICIAL_UMRAH_STARTING_PRICES = {
  rajab: {
    amountMad: 14500,
    frEs: '14 500 MAD',
    en: '14,500 MAD',
    ar: '14,500 درهم'
  },
  istanbul: {
    amountMad: 18500,
    frEs: '18 500 MAD',
    en: '18,500 MAD',
    ar: '18,500 درهم'
  }
} as const;

interface ShowcaseChromeCopy {
  topSectionEyebrow: string;
  topSectionTitle: string;
  topSectionSubtitle: string;
  startingFromLabel: string;
  durationLabel: string;
  datesLabel: string;
}

const SHOWCASE_CHROME: Record<Language, ShowcaseChromeCopy> = {
  fr: {
    topSectionEyebrow: 'Programmes Officiels · Golden Group Travels',
    topSectionTitle: 'Nos Offres Omra Actuelles',
    topSectionSubtitle:
      'Cinq programmes distincts avec leurs propres dates, itinéraires, prestations « Le prix comprend » et grilles tarifaires par personne.',
    startingFromLabel: 'À partir de',
    durationLabel: 'Durée & étapes',
    datesLabel: 'Dates annoncées'
  },
  ar: {
    topSectionEyebrow: 'البرامج الرسمية · جولدن جروب للسفر',
    topSectionTitle: 'برامج العمرة الرسمية الحالية',
    topSectionSubtitle:
      'خمسة برامج عمرة مستقلة تماماً ولكل برنامج تفاصيله وأسعاره وفنادقه وقسم «السعر الأساسي يشمل».',
    startingFromLabel: 'ابتداءً من',
    durationLabel: 'المدة والبرنامج',
    datesLabel: 'التواريخ المعلنة'
  },
  en: {
    topSectionEyebrow: 'Official Programs · Golden Group Travels',
    topSectionTitle: 'Our Official Umrah Packages',
    topSectionSubtitle:
      'Five separate programs, each with its own full itinerary, schedule, hotel options, verified per-person fares, and "The price includes" section.',
    startingFromLabel: 'Starting at',
    durationLabel: 'Duration & stays',
    datesLabel: 'Advertised dates'
  },
  es: {
    topSectionEyebrow: 'Programas Oficiales · Golden Group Travels',
    topSectionTitle: 'Nuestras Ofertas Oficiales de Omra',
    topSectionSubtitle:
      'Cinco programas independientes con su propia página, fechas, opciones hoteleras, precios por persona y apartado «El precio incluye».',
    startingFromLabel: 'Desde',
    durationLabel: 'Duración y etapas',
    datesLabel: 'Fechas anunciadas'
  }
};

export const UmrahPackageSection: React.FC<UmrahPackageSectionProps> = ({
  lang,
  isRtl
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const chrome = SHOWCASE_CHROME[lang];

  const rajabCopy = OMRA_RAJAB_COPY[lang];
  const istanbulCopy = OMRA_ISTANBUL_COPY[lang];
  const chaabaneCopy = OMRA_CHAABANE_COPY[lang];
  const ramadanCopy = OMRA_RAMADAN_COPY[lang];
  const chaabaneOnlyCopy = OMRA_CHAABANE_ONLY_COPY[lang];

  // 3D Window Pop-Out ScrollTrigger animations for all five unified cards
  useEffect(() => {
    const container = rootRef.current;
    if (!container) return;
    return setupWindowPopScroll3D(container, {
      headings: '.ggt-umrah-reveal-left',
      cards: '.ggt-umrah-card-3d',
      refreshDelayMs: 160
    });
  }, [lang]);

  return (
    <div ref={rootRef} className="space-y-8 sm:space-y-10">
      <section className="space-y-6">
        <div className="ggt-umrah-reveal-left space-y-2 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
            {chrome.topSectionEyebrow}
          </div>
          <h2 className="font-serif-crest text-2xl sm:text-4xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
            {chrome.topSectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
            {chrome.topSectionSubtitle}
          </p>
        </div>

        {/* PACKAGE CARD A — OMRA RAJAB (2026 / 1448) */}
        <ProgramCard
          className="ggt-umrah-card-3d"
          image={OMRA_RAJAB_IMAGES.hero}
          imageAlt={`${rajabCopy.title} — ${rajabCopy.coverYearBadge}`}
          badgeIcon={ShieldCheck}
          badgeText={rajabCopy.cardBadge}
          arabicTitle={rajabCopy.arabicTitle}
          title={`${rajabCopy.title} · ${rajabCopy.coverYearBadge}`}
          topBannerLabel={rajabCopy.startingPriceBanner}
          summary={rajabCopy.cardSummary}
          startingFromLabel={chrome.startingFromLabel}
          startingPriceDisplay={rajabCopy.startingPriceDisplay}
          startingPriceScopeNote={rajabCopy.startingPriceScopeNote}
          infoBox1={{
            label: chrome.durationLabel,
            value: rajabCopy.durationSummary
          }}
          infoBox2={{
            variant: 'warning',
            value: rajabCopy.datesConfirmTag
          }}
          detailsTo={OMRA_RAJAB_ROUTE}
          detailsLabel={rajabCopy.viewDetailsBtn}
          bookingTo={`${OMRA_RAJAB_ROUTE}#omra-rajab-inquiry`}
          bookingLabel={rajabCopy.reserveBtn}
          isRtl={isRtl}
        />

        {/* PACKAGE CARD B — OMRA ISTANBUL (3 – 16 DÉC 2026) */}
        <ProgramCard
          className="ggt-umrah-card-3d"
          image={OMRA_ISTANBUL_IMAGES.hero}
          imageAlt={`${istanbulCopy.title} — ${istanbulCopy.coverYearBadge}`}
          badgeIcon={ShieldCheck}
          badgeText={istanbulCopy.cardBadge}
          arabicTitle={istanbulCopy.arabicTitle}
          title={`${istanbulCopy.title} · ${istanbulCopy.coverYearBadge}`}
          topBannerLabel={istanbulCopy.startingPriceBanner}
          summary={istanbulCopy.cardSummary}
          startingFromLabel={chrome.startingFromLabel}
          startingPriceDisplay={istanbulCopy.startingPriceDisplay}
          startingPriceScopeNote={istanbulCopy.startingPriceScopeNote}
          infoBox1={{
            label: chrome.durationLabel,
            value: istanbulCopy.durationSummary
          }}
          infoBox2={{
            variant: 'navy',
            label: chrome.datesLabel,
            value: istanbulCopy.datesSummary
          }}
          detailsTo={OMRA_ISTANBUL_ROUTE}
          detailsLabel={istanbulCopy.viewDetailsBtn}
          bookingTo={`${OMRA_ISTANBUL_ROUTE}#omra-istanbul-inquiry`}
          bookingLabel={istanbulCopy.reserveBtn}
          isRtl={isRtl}
        />

        {/* PACKAGE CARD C — OMRA CHAÂBANE & RAMADAN (2027 / 1448) */}
        <ProgramCard
          className="ggt-umrah-card-3d"
          image={OMRA_CHAABANE_IMAGES.hero}
          imageAlt={`${chaabaneCopy.title} — ${chaabaneCopy.coverYearBadge}`}
          badgeIcon={ShieldCheck}
          badgeText={chaabaneCopy.cardBadge}
          arabicTitle={chaabaneCopy.arabicTitle}
          title={`${chaabaneCopy.title} · ${chaabaneCopy.coverYearBadge}`}
          topBannerLabel={chaabaneCopy.startingPriceBanner}
          summary={chaabaneCopy.cardSummary}
          startingFromLabel={chrome.startingFromLabel}
          startingPriceDisplay={chaabaneCopy.startingPriceDisplay}
          startingPriceScopeNote={chaabaneCopy.startingPriceScopeNote}
          infoBox1={{
            label: chrome.durationLabel,
            value: chaabaneCopy.durationSummary
          }}
          infoBox2={{
            variant: 'warning',
            value: chaabaneCopy.dateConflictBadge
          }}
          detailsTo={OMRA_CHAABANE_RAMADAN_ROUTE}
          detailsLabel={chaabaneCopy.viewDetailsBtn}
          bookingTo={`${OMRA_CHAABANE_RAMADAN_ROUTE}#chaabane-ramadan-inquiry`}
          bookingLabel={chaabaneCopy.reserveBtn}
          isRtl={isRtl}
        />

        {/* PACKAGE CARD D — OMRA RAMADAN (1448 / 2027) */}
        <ProgramCard
          className="ggt-umrah-card-3d"
          image={OMRA_RAMADAN_IMAGES.hero}
          imageAlt={`${ramadanCopy.title} — ${ramadanCopy.coverYearBadge}`}
          badgeIcon={ShieldCheck}
          badgeText={ramadanCopy.cardBadge}
          arabicTitle={ramadanCopy.arabicTitle}
          title={`${ramadanCopy.title} · ${ramadanCopy.coverYearBadge}`}
          topBannerLabel={ramadanCopy.startingPriceBanner}
          summary={ramadanCopy.cardSummary}
          startingFromLabel={chrome.startingFromLabel}
          startingPriceDisplay={ramadanCopy.startingPriceDisplay}
          startingPriceScopeNote={ramadanCopy.startingPriceScopeNote}
          startingPriceScopeIsWarning
          infoBox1={{
            label: chrome.durationLabel,
            value: OMRA_RAMADAN_META.durationDisplay[lang]
          }}
          infoBox2={{
            variant: 'warning',
            value: ramadanCopy.datesBadgeLabel
          }}
          detailsTo={OMRA_RAMADAN_ROUTE}
          detailsLabel={ramadanCopy.viewDetailsBtn}
          bookingTo={`${OMRA_RAMADAN_ROUTE}#omra-ramadan-inquiry`}
          bookingLabel={ramadanCopy.reserveBtn}
          isRtl={isRtl}
        />

        {/* PACKAGE CARD E — OMRA CHAÂBANE (2026 / 1448) — MASTER REFERENCE */}
        <ProgramCard
          className="ggt-umrah-card-3d"
          image={OMRA_CHAABANE_ONLY_IMAGES.hero}
          imageAlt={`${chaabaneOnlyCopy.title} — ${chaabaneOnlyCopy.coverYearBadge}`}
          badgeIcon={ShieldCheck}
          badgeText={chaabaneOnlyCopy.cardBadge}
          arabicTitle={chaabaneOnlyCopy.arabicTitle}
          title={`${chaabaneOnlyCopy.title} · ${OMRA_CHAABANE_ONLY_META.coverYearPrinted}`}
          topBannerLabel={chaabaneOnlyCopy.startingPriceBanner}
          summary={chaabaneOnlyCopy.cardSummary}
          startingFromLabel={chrome.startingFromLabel}
          startingPriceDisplay={chaabaneOnlyCopy.startingPriceDisplay}
          startingPriceScopeNote={chaabaneOnlyCopy.startingPriceScopeNote}
          infoBox1={{
            label: chrome.datesLabel,
            value: `${OMRA_CHAABANE_ONLY_META.printedDates.departure[lang]} → ${OMRA_CHAABANE_ONLY_META.printedDates.return[lang]}`
          }}
          infoBox2={{
            variant: 'warning',
            value: chaabaneOnlyCopy.datesConfirmTag
          }}
          detailsTo={OMRA_CHAABANE_ONLY_ROUTE}
          detailsLabel={chaabaneOnlyCopy.viewDetailsBtn}
          bookingTo={`${OMRA_CHAABANE_ONLY_ROUTE}#omra-chaabane-inquiry`}
          bookingLabel={chaabaneOnlyCopy.reserveBtn}
          isRtl={isRtl}
        />
      </section>
    </div>
  );
};
