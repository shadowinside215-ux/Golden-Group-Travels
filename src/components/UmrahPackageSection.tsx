import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertTriangle,
  ArrowRight,
  Eye,
  ShieldCheck
} from 'lucide-react';
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
      'Five separate programs, each with its own dedicated page, schedule, hotel options, verified per-person fares, and "The price includes" section.',
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

        {/* PACKAGE CARD A — OMRA RAJAB (2026 / 1448) — DEDICATED PAGE */}
        <article className="ggt-umrah-card-3d rounded-3xl overflow-hidden bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] shadow-[0_24px_60px_rgba(4,12,28,0.28)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 relative min-h-[250px] sm:min-h-[290px] lg:min-h-full overflow-hidden">
              <img
                src={OMRA_RAJAB_IMAGES.hero}
                alt={`${rajabCopy.title} — ${rajabCopy.coverYearBadge}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#071429] via-[#071429]/45 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#071429]/30 lg:to-[#071429]"
              />
              <div className="absolute top-4 inset-x-4 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fceda2]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d1a847]" />
                  <span>{rajabCopy.cardBadge}</span>
                </span>
              </div>
              <div className="absolute bottom-4 inset-x-5 flex items-end justify-between gap-3">
                <div>
                  <div
                    lang="ar"
                    dir="rtl"
                    className="font-arabic-calligraphy text-2xl sm:text-3xl text-[#fceda2]"
                  >
                    {rajabCopy.arabicTitle}
                  </div>
                  <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-white">
                    {rajabCopy.title} · {rajabCopy.coverYearBadge}
                  </h3>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#d1a847]/30">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center self-start px-3.5 py-1.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/55 text-xs font-bold text-[#fceda2]">
                      {rajabCopy.startingPriceBanner}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {rajabCopy.cardSummary}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847] px-4 py-3 shrink-0 self-start max-w-xs">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-[#d1a847] font-semibold">
                      {chrome.startingFromLabel}
                    </div>
                    <div className="font-serif-crest text-2xl font-bold text-[#fceda2] tabular-nums mt-0.5">
                      {rajabCopy.startingPriceDisplay}
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                      {rajabCopy.startingPriceScopeNote}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-[#d1a847] font-semibold">
                      {chrome.durationLabel}
                    </div>
                    <div className="font-semibold text-white mt-0.5">
                      {rajabCopy.durationSummary}
                    </div>
                  </div>
                  <div className="rounded-xl bg-amber-950/55 border border-amber-400/50 p-3 text-amber-100 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span className="leading-snug">{rajabCopy.datesConfirmTag}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to={OMRA_RAJAB_ROUTE}
                  className="ggt-btn-3d-return flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.12em] transition-colors"
                >
                  <Eye className="w-4 h-4 shrink-0" />
                  <span>{rajabCopy.viewDetailsBtn}</span>
                </Link>

                <Link
                  to={`${OMRA_RAJAB_ROUTE}#omra-rajab-inquiry`}
                  className="ggt-btn-3d-return flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/70 text-xs font-bold uppercase tracking-[0.12em] transition-colors"
                >
                  <span>{rajabCopy.reserveBtn}</span>
                  <ArrowRight className={`w-4 h-4 shrink-0 ggt-forward-arrow ${isRtl ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* PACKAGE CARD B — OMRA ISTANBUL (3 – 16 DÉC 2026) — DEDICATED PAGE */}
        <article className="ggt-umrah-card-3d rounded-3xl overflow-hidden bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] shadow-[0_24px_60px_rgba(4,12,28,0.28)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 relative min-h-[250px] sm:min-h-[290px] lg:min-h-full overflow-hidden">
              <img
                src={OMRA_ISTANBUL_IMAGES.hero}
                alt={`${istanbulCopy.title} — ${istanbulCopy.coverYearBadge}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#071429] via-[#071429]/45 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#071429]/30 lg:to-[#071429]"
              />
              <div className="absolute top-4 inset-x-4 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fceda2]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d1a847]" />
                  <span>{istanbulCopy.cardBadge}</span>
                </span>
              </div>
              <div className="absolute bottom-4 inset-x-5 flex items-end justify-between gap-3">
                <div>
                  <div
                    lang="ar"
                    dir="rtl"
                    className="font-arabic-calligraphy text-2xl sm:text-3xl text-[#fceda2]"
                  >
                    {istanbulCopy.arabicTitle}
                  </div>
                  <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-white">
                    {istanbulCopy.title} · {istanbulCopy.coverYearBadge}
                  </h3>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#d1a847]/30">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center self-start px-3.5 py-1.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/55 text-xs font-bold text-[#fceda2]">
                      {istanbulCopy.startingPriceBanner}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {istanbulCopy.cardSummary}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847] px-4 py-3 shrink-0 self-start max-w-xs">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-[#d1a847] font-semibold">
                      {chrome.startingFromLabel}
                    </div>
                    <div className="font-serif-crest text-2xl font-bold text-[#fceda2] tabular-nums mt-0.5">
                      {istanbulCopy.startingPriceDisplay}
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                      {istanbulCopy.startingPriceScopeNote}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-[#d1a847] font-semibold">
                      {chrome.durationLabel}
                    </div>
                    <div className="font-semibold text-white mt-0.5">
                      {istanbulCopy.durationSummary}
                    </div>
                  </div>
                  <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-[#d1a847] font-semibold">
                      {chrome.datesLabel}
                    </div>
                    <div className="font-semibold text-[#fceda2] mt-0.5">
                      {istanbulCopy.datesSummary}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to={OMRA_ISTANBUL_ROUTE}
                  className="ggt-btn-3d-return flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.12em] transition-colors"
                >
                  <Eye className="w-4 h-4 shrink-0" />
                  <span>{istanbulCopy.viewDetailsBtn}</span>
                </Link>

                <Link
                  to={`${OMRA_ISTANBUL_ROUTE}#omra-istanbul-inquiry`}
                  className="ggt-btn-3d-return flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/70 text-xs font-bold uppercase tracking-[0.12em] transition-colors"
                >
                  <span>{istanbulCopy.reserveBtn}</span>
                  <ArrowRight className={`w-4 h-4 shrink-0 ggt-forward-arrow ${isRtl ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* PACKAGE CARD C — OMRA CHAÂBANE & RAMADAN (2027 / 1448) — DEDICATED PAGE */}
        <article className="ggt-umrah-card-3d rounded-3xl overflow-hidden bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] shadow-[0_24px_60px_rgba(4,12,28,0.28)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 relative min-h-[250px] sm:min-h-[290px] lg:min-h-full overflow-hidden">
              <img
                src={OMRA_CHAABANE_IMAGES.hero}
                alt={`${chaabaneCopy.title} — ${chaabaneCopy.coverYearBadge}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#071429] via-[#071429]/45 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#071429]/30 lg:to-[#071429]"
              />
              <div className="absolute top-4 inset-x-4 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fceda2]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d1a847]" />
                  <span>{chaabaneCopy.cardBadge}</span>
                </span>
              </div>
              <div className="absolute bottom-4 inset-x-5 flex items-end justify-between gap-3">
                <div>
                  <div
                    lang="ar"
                    dir="rtl"
                    className="font-arabic-calligraphy text-2xl sm:text-3xl text-[#fceda2]"
                  >
                    {chaabaneCopy.arabicTitle}
                  </div>
                  <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-white">
                    {chaabaneCopy.title} · {chaabaneCopy.coverYearBadge}
                  </h3>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#d1a847]/30">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center self-start px-3.5 py-1.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/55 text-xs font-bold text-[#fceda2]">
                      {chaabaneCopy.startingPriceBanner}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {chaabaneCopy.cardSummary}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847] px-4 py-3 shrink-0 self-start max-w-xs">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-[#d1a847] font-semibold">
                      {chrome.startingFromLabel}
                    </div>
                    <div className="font-serif-crest text-2xl font-bold text-[#fceda2] tabular-nums mt-0.5">
                      {chaabaneCopy.startingPriceDisplay}
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                      {chaabaneCopy.startingPriceScopeNote}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-[#d1a847] font-semibold">
                      {chrome.durationLabel}
                    </div>
                    <div className="font-semibold text-white mt-0.5">
                      {chaabaneCopy.durationSummary}
                    </div>
                  </div>
                  <div className="rounded-xl bg-amber-950/55 border border-amber-400/50 p-3 text-amber-100 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span className="leading-snug">{chaabaneCopy.dateConflictBadge}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to={OMRA_CHAABANE_RAMADAN_ROUTE}
                  className="ggt-btn-3d-return flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.12em] transition-colors"
                >
                  <Eye className="w-4 h-4 shrink-0" />
                  <span>{chaabaneCopy.viewDetailsBtn}</span>
                </Link>

                <Link
                  to={`${OMRA_CHAABANE_RAMADAN_ROUTE}#chaabane-ramadan-inquiry`}
                  className="ggt-btn-3d-return flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/70 text-xs font-bold uppercase tracking-[0.12em] transition-colors"
                >
                  <span>{chaabaneCopy.reserveBtn}</span>
                  <ArrowRight className={`w-4 h-4 shrink-0 ggt-forward-arrow ${isRtl ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* PACKAGE CARD D — OMRA RAMADAN (1448 / 2027) — DEDICATED PAGE */}
        <article className="ggt-umrah-card-3d rounded-3xl overflow-hidden bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] shadow-[0_24px_60px_rgba(4,12,28,0.28)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 relative min-h-[250px] sm:min-h-[290px] lg:min-h-full overflow-hidden">
              <img
                src={OMRA_RAMADAN_IMAGES.hero}
                alt={`${ramadanCopy.title} — ${ramadanCopy.coverYearBadge}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#071429] via-[#071429]/45 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#071429]/30 lg:to-[#071429]"
              />
              <div className="absolute top-4 inset-x-4 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fceda2]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d1a847]" />
                  <span>{ramadanCopy.cardBadge}</span>
                </span>
              </div>
              <div className="absolute bottom-4 inset-x-5 flex items-end justify-between gap-3">
                <div>
                  <div
                    lang="ar"
                    dir="rtl"
                    className="font-arabic-calligraphy text-2xl sm:text-3xl text-[#fceda2]"
                  >
                    {ramadanCopy.arabicTitle}
                  </div>
                  <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-white">
                    {ramadanCopy.title} · {ramadanCopy.coverYearBadge}
                  </h3>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#d1a847]/30">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center self-start px-3.5 py-1.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/55 text-xs font-bold text-[#fceda2]">
                      {ramadanCopy.startingPriceBanner}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {ramadanCopy.cardSummary}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847] px-4 py-3 shrink-0 self-start max-w-xs">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-[#d1a847] font-semibold">
                      {chrome.startingFromLabel}
                    </div>
                    <div className="font-serif-crest text-2xl font-bold text-[#fceda2] tabular-nums mt-0.5">
                      {ramadanCopy.startingPriceDisplay}
                    </div>
                    <div className="text-[11px] text-amber-200 mt-0.5 leading-snug">
                      {ramadanCopy.startingPriceScopeNote}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-[#d1a847] font-semibold">
                      {chrome.durationLabel}
                    </div>
                    <div className="font-semibold text-white mt-0.5">
                      {OMRA_RAMADAN_META.durationDisplay[lang]}
                    </div>
                  </div>
                  <div className="rounded-xl bg-amber-950/55 border border-amber-400/50 p-3 text-amber-100 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span className="leading-snug">{ramadanCopy.datesBadgeLabel}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to={OMRA_RAMADAN_ROUTE}
                  className="ggt-btn-3d-return flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.12em] transition-colors"
                >
                  <Eye className="w-4 h-4 shrink-0" />
                  <span>{ramadanCopy.viewDetailsBtn}</span>
                </Link>

                <Link
                  to={`${OMRA_RAMADAN_ROUTE}#omra-ramadan-inquiry`}
                  className="ggt-btn-3d-return flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/70 text-xs font-bold uppercase tracking-[0.12em] transition-colors"
                >
                  <span>{ramadanCopy.reserveBtn}</span>
                  <ArrowRight className={`w-4 h-4 shrink-0 ggt-forward-arrow ${isRtl ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* PACKAGE CARD E — OMRA CHAÂBANE (2026 / 1448) — DEDICATED PAGE */}
        <article className="ggt-umrah-card-3d rounded-3xl overflow-hidden bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] shadow-[0_24px_60px_rgba(4,12,28,0.28)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 relative min-h-[250px] sm:min-h-[290px] lg:min-h-full overflow-hidden">
              <img
                src={OMRA_CHAABANE_ONLY_IMAGES.hero}
                alt={`${chaabaneOnlyCopy.title} — ${chaabaneOnlyCopy.coverYearBadge}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#071429] via-[#071429]/45 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#071429]/30 lg:to-[#071429]"
              />
              <div className="absolute top-4 inset-x-4 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fceda2]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d1a847]" />
                  <span>{chaabaneOnlyCopy.cardBadge}</span>
                </span>
              </div>
              <div className="absolute bottom-4 inset-x-5 flex items-end justify-between gap-3">
                <div>
                  <div
                    lang="ar"
                    dir="rtl"
                    className="font-arabic-calligraphy text-2xl sm:text-3xl text-[#fceda2]"
                  >
                    {chaabaneOnlyCopy.arabicTitle}
                  </div>
                  <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-white">
                    {chaabaneOnlyCopy.title} · {OMRA_CHAABANE_ONLY_META.coverYearPrinted}
                  </h3>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#d1a847]/30">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center self-start px-3.5 py-1.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/55 text-xs font-bold text-[#fceda2]">
                      {chaabaneOnlyCopy.startingPriceBanner}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {chaabaneOnlyCopy.cardSummary}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847] px-4 py-3 shrink-0 self-start max-w-xs">
                    <div className="text-[10px] uppercase tracking-[0.16em] text-[#d1a847] font-semibold">
                      {chrome.startingFromLabel}
                    </div>
                    <div className="font-serif-crest text-2xl font-bold text-[#fceda2] tabular-nums mt-0.5">
                      {chaabaneOnlyCopy.startingPriceDisplay}
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                      {chaabaneOnlyCopy.startingPriceScopeNote}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3">
                    <div className="text-[10px] uppercase tracking-[0.14em] text-[#d1a847] font-semibold">
                      {chrome.datesLabel}
                    </div>
                    <div className="font-semibold text-white mt-0.5">
                      {OMRA_CHAABANE_ONLY_META.printedDates.departure[lang]} →{' '}
                      {OMRA_CHAABANE_ONLY_META.printedDates.return[lang]}
                    </div>
                  </div>
                  <div className="rounded-xl bg-amber-950/55 border border-amber-400/50 p-3 text-amber-100 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                    <span className="leading-snug">{chaabaneOnlyCopy.datesConfirmTag}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to={OMRA_CHAABANE_ONLY_ROUTE}
                  className="ggt-btn-3d-return flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.12em] transition-colors"
                >
                  <Eye className="w-4 h-4 shrink-0" />
                  <span>{chaabaneOnlyCopy.viewDetailsBtn}</span>
                </Link>

                <Link
                  to={`${OMRA_CHAABANE_ONLY_ROUTE}#omra-chaabane-inquiry`}
                  className="ggt-btn-3d-return flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/70 text-xs font-bold uppercase tracking-[0.12em] transition-colors"
                >
                  <span>{chaabaneOnlyCopy.reserveBtn}</span>
                  <ArrowRight className={`w-4 h-4 shrink-0 ggt-forward-arrow ${isRtl ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};
