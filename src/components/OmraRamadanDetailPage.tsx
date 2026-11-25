import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Building2,
  Calendar,
  Camera,
  Check,
  Coffee,
  CreditCard,
  ExternalLink,
  FileCheck2,
  HelpCircle,
  Info,
  Luggage,
  MapPin,
  MoonStar,
  Phone,
  Users,
  XCircle
} from 'lucide-react';
import { Language } from '../assets/destinations';
import { HERO_CATEGORY_ICONS } from './ServiceIcons';
import {
  OMRA_RAMADAN_BACK_ROUTE,
  OMRA_RAMADAN_COPY,
  OMRA_RAMADAN_IMAGES,
  OMRA_RAMADAN_META,
  OMRA_RAMADAN_OPTIONS,
  OMRA_RAMADAN_ROOM_ORDER,
  OmraRamadanOptionId,
  OmraRamadanRoomType
} from '../data/omraRamadanData';
import { trackServiceSelection } from '../utils/analytics';
import {
  pulseSelection3D,
  setupWindowPopScroll3D,
  switchTabWithTimeline,
  useReplayable3DPanel,
  useSlidingTabIndicator
} from '../utils/tab3DMotion';

gsap.registerPlugin(ScrollTrigger);

interface OmraRamadanDetailPageProps {
  lang: Language;
  isRtl: boolean;
  whatsappInternational: string;
  displayPhone: string;
  onJumpToHomePlanner: () => void;
}

const RAMADAN_INCLUSION_ICONS = {
  duration: Calendar,
  madinah: Building2,
  makkah: Building2
} as const;

export const OmraRamadanDetailPage: React.FC<OmraRamadanDetailPageProps> = ({
  lang,
  isRtl,
  whatsappInternational,
  displayPhone,
  onJumpToHomePlanner
}) => {
  const pageRootRef = useRef<HTMLDivElement>(null);
  const optionsSectionRef = useRef<HTMLElement>(null);
  const inquirySectionRef = useRef<HTMLElement>(null);
  const optionTablistRef = useRef<HTMLDivElement>(null);
  const optionIndicatorRef = useRef<HTMLSpanElement>(null);
  const optionPanelRef = useRef<HTMLDivElement>(null);
  const optionSwitchTimelineRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  const quoteBoxRef = useRef<HTMLDivElement>(null);
  const readyCardRef = useRef<HTMLDivElement>(null);
  const quoteMountedRef = useRef(false);

  const location = useLocation();
  const uid = useId();
  const copy = OMRA_RAMADAN_COPY[lang];
  const UmrahHeroIcon = HERO_CATEGORY_ICONS.umrah;

  const [selectedOptionId, setSelectedOptionId] =
    useState<OmraRamadanOptionId>('option-a');
  const [selectedRoomType, setSelectedRoomType] =
    useState<OmraRamadanRoomType>('quadruple');
  const [travelersCount, setTravelersCount] = useState<number>(2);

  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [inquiryReady, setInquiryReady] = useState<boolean>(false);

  useEffect(() => {
    trackServiceSelection('umrah_selected');
  }, []);

  useEffect(() => {
    setFormErrors([]);
  }, [lang]);

  useEffect(() => {
    if (location.hash === '#omra-ramadan-inquiry' && inquirySectionRef.current) {
      const id = window.setTimeout(() => {
        inquirySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 160);
      return () => window.clearTimeout(id);
    }
  }, [location.hash]);

  const activeOption = useMemo(
    () =>
      OMRA_RAMADAN_OPTIONS.find((opt) => opt.id === selectedOptionId) ??
      OMRA_RAMADAN_OPTIONS[0],
    [selectedOptionId]
  );

  // Automatically reset away from unavailable ('not_offered') rooms when switching options
  useEffect(() => {
    if (activeOption.rooms[selectedRoomType].kind === 'not_offered') {
      setSelectedRoomType('quadruple');
    }
  }, [activeOption, selectedRoomType]);

  const activeRoomState = activeOption.rooms[selectedRoomType];
  const pricedAmountMad =
    activeRoomState.kind === 'priced' ? activeRoomState.amountMad : null;
  const groupSubtotalMad =
    pricedAmountMad !== null ? pricedAmountMad * travelersCount : null;

  useSlidingTabIndicator(optionTablistRef, optionIndicatorRef, selectedOptionId, [lang, isRtl]);

  useReplayable3DPanel(optionPanelRef, selectedOptionId, {
    duration: 0.45,
    staggerEach: 0.04,
    yOffset: 10,
    rotateXDeg: 3
  });

  useReplayable3DPanel(readyCardRef, inquiryReady, {
    enabled: inquiryReady,
    duration: 0.48,
    staggerEach: 0.045,
    yOffset: 14,
    rotateXDeg: 4
  });

  useEffect(() => {
    if (!quoteMountedRef.current) {
      quoteMountedRef.current = true;
      return;
    }
    pulseSelection3D(quoteBoxRef.current);
  }, [selectedOptionId, selectedRoomType, travelersCount]);

  useEffect(() => {
    return () => {
      if (optionSwitchTimelineRef.current) {
        optionSwitchTimelineRef.current.kill();
        optionSwitchTimelineRef.current = null;
      }
    };
  }, []);

  // 3D Window Pop-Out ScrollTrigger motion — smooth down and up
  useEffect(() => {
    const root = pageRootRef.current;
    if (!root) return;
    return setupWindowPopScroll3D(root, {
      headings: '.ggt-omra-ram-heading',
      cards: '.ggt-omra-ram-card',
      dividers: '.ggt-omra-ram-divider',
      refreshDelayMs: 180
    });
  }, [lang]);

  const handleOptionSwitch = (nextOptId: OmraRamadanOptionId) => {
    if (nextOptId === selectedOptionId) return;
    switchTabWithTimeline({
      outgoingEl: optionPanelRef.current,
      timelineRef: optionSwitchTimelineRef,
      onSwap: () => {
        setSelectedOptionId(nextOptId);
      }
    });
  };

  const handleTableCellSelect = (
    optId: OmraRamadanOptionId,
    roomId: OmraRamadanRoomType
  ) => {
    if (optId !== selectedOptionId) {
      handleOptionSwitch(optId);
    }
    setSelectedRoomType(roomId);
  };

  const formatMad = (amount: number) => `${amount.toLocaleString('fr-FR')} MAD`;

  const selectableRoomsForOption = useMemo(
    () =>
      OMRA_RAMADAN_ROOM_ORDER.filter(
        (rt) => activeOption.rooms[rt].kind !== 'not_offered'
      ),
    [activeOption]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!fullName.trim()) errs.push(copy.errNameRequired);
    if (!phone.trim()) errs.push(copy.errPhoneRequired);

    if (errs.length > 0) {
      setFormErrors(errs);
      setInquiryReady(false);
      return;
    }

    setFormErrors([]);
    setInquiryReady(true);
  };

  const buildWhatsappInquiryUrl = () => {
    const rateDisplay =
      activeRoomState.kind === 'priced'
        ? `${formatMad(activeRoomState.amountMad)} / personne (Total ${travelersCount} pers. : ${formatMad(activeRoomState.amountMad * travelersCount)})`
        : 'Chambre 6 personnes (Tarif à confirmer — écart 126 000 vs 26 000 MAD)';

    // Strict rule: never emit contradictory 2026 dates in WhatsApp inquiry text
    const lines = [
      'Bonjour Golden Group Travels,',
      `Demande de réservation : ${copy.title} (${copy.arabicTitle}) — ${OMRA_RAMADAN_META.gregorianCoverYear} / ${OMRA_RAMADAN_META.hijriYear} H`,
      `• Durée annoncée : 34 à 40 jours`,
      `• Dates : ${OMRA_RAMADAN_META.datesDisplay.fr}`,
      `• Option sélectionnée : ${activeOption.code.fr} — ${activeOption.title.fr}`,
      `• Médine : ${activeOption.madinahHotel.fr} (${activeOption.madinahMealNote.fr})`,
      `• Makkah : ${activeOption.makkahHotel.fr}${activeOption.makkahDistanceNote ? ` (${activeOption.makkahDistanceNote.fr})` : ''}`,
      `• Type de chambre : ${copy.roomLabels[selectedRoomType].name}`,
      `• Nombre de voyageurs : ${travelersCount}`,
      `• Tarif : ${rateDisplay}`,
      `• Nom : ${fullName.trim()}`,
      `• Téléphone : ${phone.trim()}`,
      notes.trim() ? `• Notes : ${notes.trim()}` : ''
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(lines)}`;
  };

  return (
    <div
      ref={pageRootRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#ede1ce] text-[#0b1d3a]"
    >
      {/* Top Return Bar */}
      <div className="bg-[#071429] border-b border-[#d1a847]/35">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to={OMRA_RAMADAN_BACK_ROUTE}
              className="ggt-btn-3d-return inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/60 text-xs font-semibold uppercase tracking-wider"
            >
              <ArrowLeft
                className={`w-3.5 h-3.5 text-[#d1a847] ggt-return-arrow ${isRtl ? 'rotate-180' : ''}`}
              />
              <span>{copy.backToUmrahLabel}</span>
            </Link>

            <Link
              to="/"
              className="ggt-btn-3d-return inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-transparent hover:bg-[#0b1d3a] text-slate-200 border border-[#d1a847]/30 text-xs font-medium"
            >
              <span>{copy.backToHomeLabel}</span>
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/45 text-[11px] font-semibold text-[#fceda2]">
            <MoonStar className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
            <span>{copy.coverYearBadge}</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: HERO + ADVERTISED 26,000 MAD STARTING BANNER */}
      <section className="relative bg-[#071429] text-[#f5ede0] overflow-hidden border-b-2 border-[#d1a847]/55">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <span className="ggt-icon-medallion w-12 h-12 rounded-full bg-[#0b1d3a] border-2 border-[#d1a847] text-[#fceda2] flex items-center justify-center shrink-0">
                  <UmrahHeroIcon className="w-6 h-6" />
                </span>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/55 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#d1a847]">
                  <span>{copy.heroEyebrow}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="font-serif-crest text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#fcf9f2] leading-[1.12] [text-wrap:balance]">
                  {copy.title} · {OMRA_RAMADAN_META.hijriYear} /{' '}
                  {OMRA_RAMADAN_META.gregorianCoverYear}
                </h1>
                <div
                  dir="rtl"
                  lang="ar"
                  className="font-arabic-calligraphy text-2xl sm:text-3xl text-[#fceda2]"
                >
                  {copy.arabicTitle} · {OMRA_RAMADAN_META.hijriYear} هـ /{' '}
                  {OMRA_RAMADAN_META.gregorianCoverYear}
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                  {copy.cardSummary}
                </p>
              </div>

              {/* Duration & Pending Exact Dates Pills */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/50 text-[#fcf9f2] font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-[#d1a847]" />
                  <span>{copy.durationBadgeLabel}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/75 border border-amber-400/55 text-amber-100 font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>{copy.datesBadgeLabel}</span>
                </span>
              </div>

              {/* Advertised 26,000 MAD Starting Price Banner with Explicit Scope / Flag */}
              <div className="rounded-xl bg-[#0b1d3a] border-2 border-[#d1a847] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_14px_34px_rgba(0,0,0,0.28)]">
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[#d1a847] font-semibold">
                    {copy.startingFromLabel}
                  </div>
                  <div className="font-serif-crest text-3xl sm:text-4xl font-bold text-[#fceda2] tabular-nums">
                    {copy.startingPriceDisplay}
                    <span className="text-sm font-semibold text-slate-200"> / pers.</span>
                  </div>
                </div>
                <div className="sm:max-w-xs text-xs text-slate-100 leading-relaxed border-t sm:border-t-0 sm:border-s border-[#d1a847]/35 pt-3 sm:pt-0 sm:ps-4">
                  <span className="font-semibold text-amber-200 block">
                    {copy.startingPriceScopeNote}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    optionsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.14em] shadow-lg cursor-pointer"
                >
                  <span>{copy.optionsTitle}</span>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 ggt-forward-arrow ${isRtl ? 'rotate-180' : ''}`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    inquirySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/70 text-xs font-semibold uppercase tracking-[0.12em] cursor-pointer"
                >
                  <span>{copy.reserveBtn}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                className="relative rounded-2xl overflow-hidden border-2 border-[#d1a847]/75 shadow-[0_24px_56px_rgba(0,0,0,0.4)] aspect-[16/11]"
                style={{ background: OMRA_RAMADAN_IMAGES.fallbackGradient }}
              >
                <img
                  src={OMRA_RAMADAN_IMAGES.hero}
                  alt={`${copy.title} — ${copy.coverYearBadge}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#071429]/85 via-transparent to-[#071429]/20"
                />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold text-[#fceda2]">
                    <MoonStar className="w-3.5 h-3.5 text-[#d1a847]" />
                    <span>{OMRA_RAMADAN_META.durationDisplay[lang]}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-14">
        {/* SECTION 2: MANDATORY TRANSPARENCY & DISCREPANCY NOTICE */}
        <section className="space-y-4">
          <div className="rounded-2xl bg-amber-50 border-2 border-amber-400 p-5 sm:p-6 flex items-start gap-3.5 shadow-sm">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-2 text-xs sm:text-sm text-amber-950 leading-relaxed">
              <div className="font-bold text-amber-900">{copy.discrepancyHeading}</div>
              <ul className="space-y-1.5 list-disc ps-4">
                {copy.discrepancyBullets.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="ggt-omra-ram-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* SECTION 2B: DESKTOP COMPARISON TABLE */}
        <section className="space-y-5">
          <div className="ggt-omra-ram-heading space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.tableEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
              {copy.tableTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
              {copy.tableSubtitle}
            </p>
          </div>

          <div className="hidden md:block overflow-x-auto rounded-2xl border-2 border-[#d1a847]/65 bg-[#fcf9f2] shadow-[0_14px_34px_rgba(11,29,58,0.08)]">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#0b1d3a] text-[#fceda2] text-xs">
                  <th className="py-4 px-5 text-start font-semibold uppercase tracking-[0.14em]">
                    {copy.colOptionHotels}
                  </th>
                  {OMRA_RAMADAN_ROOM_ORDER.map((roomId) => (
                    <th key={roomId} className="py-4 px-3 text-center font-semibold">
                      <div className="uppercase tracking-[0.1em]">
                        {copy.roomLabels[roomId].name}
                      </div>
                      <div className="text-[11px] font-normal text-slate-300 mt-0.5">
                        {copy.roomLabels[roomId].capacity}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d1a847]/25">
                {OMRA_RAMADAN_OPTIONS.map((opt) => {
                  const isRowActive = opt.id === selectedOptionId;
                  return (
                    <tr
                      key={opt.id}
                      className={isRowActive ? 'bg-[#f5ede0]/70' : 'hover:bg-[#f5ede0]/45'}
                    >
                      <td className="py-4 px-5 align-top">
                        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a7220]">
                          {opt.code[lang]}
                        </div>
                        <div className="text-xs font-bold text-[#0b1d3a] mt-1">
                          {copy.madinahCityLabel} : {opt.madinahHotel[lang]}
                          <span className="ms-1.5 inline-flex items-center px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                            {opt.madinahMealNote[lang]}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-[#2c405e] mt-0.5">
                          {copy.makkahCityLabel} : {opt.makkahHotel[lang]}
                          {opt.makkahDistanceNote && (
                            <span className="ms-1.5 inline-flex items-center px-2 py-0.5 rounded bg-[#ede1ce] text-[#0b1d3a] text-[10px] font-semibold">
                              {opt.makkahDistanceNote[lang]}
                            </span>
                          )}
                        </div>
                      </td>

                      {OMRA_RAMADAN_ROOM_ORDER.map((roomId) => {
                        const roomState = opt.rooms[roomId];
                        if (roomState.kind === 'not_offered') {
                          return (
                            <td key={roomId} className="py-3 px-2.5 text-center">
                              <div className="py-2.5 px-2.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-500 text-xs font-semibold">
                                {copy.notOfferedLabel}
                              </div>
                            </td>
                          );
                        }

                        const isCellSelected =
                          selectedOptionId === opt.id && selectedRoomType === roomId;

                        if (roomState.kind === 'needs_confirmation') {
                          return (
                            <td key={roomId} className="py-3 px-2.5 text-center">
                              <button
                                type="button"
                                onClick={() => handleTableCellSelect(opt.id, roomId)}
                                className={`ggt-card-3d-select w-full py-2.5 px-2.5 rounded-xl border transition-all cursor-pointer ${
                                  isCellSelected
                                    ? 'bg-amber-400 text-[#0b1d3a] border-amber-500 shadow-sm font-bold'
                                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-400/75 font-semibold'
                                }`}
                              >
                                <div className="text-xs font-bold leading-snug">
                                  {copy.rateToConfirmLabel}
                                </div>
                              </button>
                            </td>
                          );
                        }

                        return (
                          <td key={roomId} className="py-3 px-2.5 text-center">
                            <button
                              type="button"
                              onClick={() => handleTableCellSelect(opt.id, roomId)}
                              className={`ggt-card-3d-select w-full py-2.5 px-2.5 rounded-xl border transition-all cursor-pointer ${
                                isCellSelected
                                  ? 'bg-[#0b1d3a] text-[#fceda2] border-[#d1a847] shadow-sm font-bold'
                                  : 'bg-white hover:bg-[#ede1ce] text-[#0b1d3a] border-[#d1a847]/45 font-semibold'
                              }`}
                            >
                              <div className="font-serif-crest text-base tabular-nums">
                                {formatMad(roomState.amountMad)}
                              </div>
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <div className="ggt-omra-ram-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* SECTION 3: THREE ACCOMMODATION OPTIONS (A, B, C) + VERIFIED MAD ROOM PRICING */}
        <section ref={optionsSectionRef} className="space-y-6 scroll-mt-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="ggt-omra-ram-heading space-y-1.5 max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
                {copy.optionsEyebrow}
              </div>
              <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
                {copy.optionsTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
                {copy.optionsSubtitle}
              </p>
            </div>

            {/* Option A / B / C Sliding Tab Switcher */}
            <div
              ref={optionTablistRef}
              role="tablist"
              aria-label={copy.optionsTitle}
              className="relative inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#071429] border border-[#d1a847]/65 shadow-md self-start lg:self-auto"
            >
              <span
                ref={optionIndicatorRef}
                aria-hidden="true"
                className="ggt-tab-indicator-pill rounded-lg bg-[#d1a847]"
              />
              {OMRA_RAMADAN_OPTIONS.map((opt) => {
                const active = opt.id === selectedOptionId;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    data-tab-key={opt.id}
                    onClick={() => handleOptionSwitch(opt.id)}
                    className={`ggt-tab-3d relative z-10 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      active ? 'text-[#0b1d3a]' : 'text-[#fceda2] hover:text-white'
                    }`}
                  >
                    {opt.code[lang]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Option Panel */}
          <div
            ref={optionPanelRef}
            className="rounded-3xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] p-5 sm:p-8 space-y-6 shadow-[0_22px_54px_rgba(7,20,41,0.24)]"
          >
            <div className="space-y-2 pb-4 border-b border-[#d1a847]/30">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                {activeOption.code[lang]}
              </div>
              <h3 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#fcf9f2]">
                {activeOption.title[lang]}
              </h3>
            </div>

            {/* Hotels, Breakfast Policy (Without Breakfast in Madinah) & Haram Distances */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#0b1d3a] border border-[#d1a847]/45 p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[#d1a847] font-semibold flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{copy.madinahCityLabel}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-950/90 text-amber-200 border border-amber-500/45">
                    <Coffee className="w-3 h-3" />
                    <span>{activeOption.madinahMealNote[lang]}</span>
                  </span>
                </div>
                <div className="font-serif-crest text-xl font-bold text-[#fcf9f2]">
                  {activeOption.madinahHotel[lang]}
                </div>
              </div>

              <div className="rounded-2xl bg-[#0b1d3a] border border-[#d1a847]/45 p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[#d1a847] font-semibold flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{copy.makkahCityLabel}</span>
                  </span>
                  {activeOption.makkahDistanceNote && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#071429] text-[#fceda2] border border-[#d1a847]/55">
                      <MapPin className="w-3 h-3 text-[#d1a847]" />
                      <span>{activeOption.makkahDistanceNote[lang]}</span>
                    </span>
                  )}
                </div>
                <div className="font-serif-crest text-xl font-bold text-[#fcf9f2]">
                  {activeOption.makkahHotel[lang]}
                </div>
              </div>
            </div>

            {/* Room Pricing Grid (Double / Triple / Quadruple / Quintuple / Six-person) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {OMRA_RAMADAN_ROOM_ORDER.map((roomId) => {
                const roomState = activeOption.rooms[roomId];
                const roomMeta = copy.roomLabels[roomId];
                const isSelected =
                  roomState.kind !== 'not_offered' && selectedRoomType === roomId;

                if (roomState.kind === 'not_offered') {
                  return (
                    <div
                      key={roomId}
                      aria-disabled="true"
                      className="rounded-2xl bg-[#0b1d3a]/45 border border-slate-600/50 p-5 flex flex-col justify-between gap-3 opacity-80"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-slate-300">
                            {roomMeta.name}
                          </span>
                          <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                        </div>
                        <div className="text-xs text-slate-400">{roomMeta.capacity}</div>
                      </div>

                      <div className="pt-2 border-t border-slate-700/60 space-y-1">
                        <div className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                          {copy.notOfferedLabel}
                        </div>
                        <div className="text-[11px] text-slate-300 leading-snug">
                          {copy.notOfferedDetail}
                        </div>
                      </div>
                    </div>
                  );
                }

                if (roomState.kind === 'needs_confirmation') {
                  return (
                    <button
                      key={roomId}
                      type="button"
                      onClick={() => setSelectedRoomType(roomId)}
                      aria-pressed={isSelected}
                      className={`ggt-card-3d-select text-start rounded-2xl p-5 flex flex-col justify-between gap-3 border-2 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-amber-400 text-[#0b1d3a] border-amber-200 shadow-xl'
                          : 'bg-amber-950/55 text-amber-100 border-amber-400/75 hover:border-amber-300'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-sm">{roomMeta.name}</span>
                          <HelpCircle
                            className={`w-4 h-4 shrink-0 ${
                              isSelected ? 'text-[#0b1d3a]' : 'text-amber-300'
                            }`}
                          />
                        </div>
                        <div
                          className={`text-xs ${
                            isSelected ? 'text-[#0b1d3a]/85 font-medium' : 'text-amber-200'
                          }`}
                        >
                          {roomMeta.capacity}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div
                          className={`font-serif-crest text-lg font-bold leading-snug ${
                            isSelected ? 'text-[#0b1d3a]' : 'text-amber-200'
                          }`}
                        >
                          {copy.rateToConfirmLabel}
                        </div>
                        <p
                          className={`text-[11px] leading-snug ${
                            isSelected ? 'text-[#0b1d3a]/90 font-medium' : 'text-amber-100/90'
                          }`}
                        >
                          {roomState.flagReason[lang]}
                        </p>
                      </div>
                    </button>
                  );
                }

                return (
                  <button
                    key={roomId}
                    type="button"
                    onClick={() => setSelectedRoomType(roomId)}
                    aria-pressed={isSelected}
                    className={`ggt-card-3d-select text-start rounded-2xl p-5 flex flex-col justify-between gap-4 border-2 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#d1a847] text-[#0b1d3a] border-[#fceda2] shadow-xl'
                        : 'bg-[#0b1d3a] text-[#fcf9f2] border-[#d1a847]/45 hover:border-[#d1a847]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-sm">{roomMeta.name}</span>
                        <BedDouble
                          className={`w-4 h-4 shrink-0 ${
                            isSelected ? 'text-[#0b1d3a]' : 'text-[#d1a847]'
                          }`}
                        />
                      </div>
                      <div
                        className={`text-xs ${
                          isSelected ? 'text-[#0b1d3a]/80 font-medium' : 'text-slate-300'
                        }`}
                      >
                        {roomMeta.capacity}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div
                        className={`font-serif-crest text-2xl font-bold tabular-nums ${
                          isSelected ? 'text-[#0b1d3a]' : 'text-[#fceda2]'
                        }`}
                      >
                        {formatMad(roomState.amountMad)}
                      </div>
                      <div
                        className={`text-[11px] font-bold uppercase tracking-wider ${
                          isSelected ? 'text-[#0b1d3a]' : 'text-[#d1a847]'
                        }`}
                      >
                        {isSelected ? copy.selectedRoomBtn : copy.selectRoomBtn}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <div className="ggt-omra-ram-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* SECTION 3B: STANDARDIZED INCLUSIONS ("Le prix comprend") */}
        <section className="space-y-6">
          <div className="ggt-omra-ram-heading space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.inclusionsEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
              {copy.inclusionsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
              {copy.inclusionsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {copy.inclusions.map((item) => {
              const ItemIcon = RAMADAN_INCLUSION_ICONS[item.key];
              return (
                <div
                  key={item.key}
                  className="ggt-omra-ram-card rounded-2xl bg-[#fcf9f2] border-2 border-[#d1a847]/55 p-5 shadow-sm flex items-start gap-4"
                >
                  <span className="w-10 h-10 rounded-xl bg-[#071429] border border-[#d1a847] text-[#fceda2] flex items-center justify-center shrink-0">
                    <ItemIcon className="w-5 h-5" />
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-serif-crest text-base sm:text-lg font-semibold text-[#0b1d3a]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#2c405e] leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ggt-omra-ram-card rounded-2xl bg-[#fcf9f2] border border-amber-500/60 p-5 sm:p-6 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0b1d3a]">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{copy.unprintedTitle}</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-[#2c405e]">
              {copy.unprintedItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <Check className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="ggt-omra-ram-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* SECTION 4: REGISTRATION CONDITIONS & IMPORTANT PILGRIM NOTES */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="ggt-omra-ram-card lg:col-span-7 rounded-2xl bg-[#fcf9f2] border-2 border-[#d1a847]/65 p-6 sm:p-7 space-y-5 shadow-sm">
            <div className="space-y-1 pb-3 border-b border-[#d1a847]/35">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                {copy.conditionsEyebrow}
              </div>
              <h2 className="font-serif-crest text-2xl font-semibold text-[#0b1d3a]">
                {copy.conditionsTitle}
              </h2>
            </div>

            <div className="space-y-4">
              {copy.conditionsList.map((cond) => {
                const Icon =
                  cond.key === 'passport'
                    ? FileCheck2
                    : cond.key === 'photo'
                    ? Camera
                    : CreditCard;
                return (
                  <div key={cond.key} className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847]/55 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-bold text-[#0b1d3a]">{cond.title}</h3>
                      <p className="text-xs text-[#2c405e] leading-relaxed">{cond.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ggt-omra-ram-card lg:col-span-5 rounded-2xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847]/70 p-6 sm:p-7 space-y-5 shadow-[0_18px_42px_rgba(7,20,41,0.18)]">
            <div className="space-y-1 pb-3 border-b border-[#d1a847]/30">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                {copy.notesEyebrow}
              </div>
              <h2 className="font-serif-crest text-2xl font-semibold text-[#fcf9f2]">
                {copy.notesTitle}
              </h2>
            </div>

            <div className="space-y-4">
              {copy.notesList.map((note) => {
                const Icon = note.key === 'baggage' ? Luggage : Info;
                return (
                  <div key={note.key} className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#0b1d3a] text-[#d1a847] border border-[#d1a847]/55 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-bold text-[#fceda2]">{note.title}</h3>
                      <p className="text-xs text-slate-200 leading-relaxed">{note.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="ggt-omra-ram-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* SECTION 5: WHATSAPP RESERVATION INQUIRY */}
        <section
          ref={inquirySectionRef}
          id="omra-ramadan-inquiry"
          className="space-y-6 scroll-mt-20"
        >
          <div className="ggt-omra-ram-heading space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.inquiryEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
              {copy.inquiryTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
              {copy.inquirySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
            <div className="lg:col-span-8">
              {inquiryReady ? (
                <div
                  ref={readyCardRef}
                  className="rounded-2xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] p-6 sm:p-8 space-y-6 shadow-[0_24px_56px_rgba(7,20,41,0.22)]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#d1a847]/30">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                        {copy.title}
                      </div>
                      <h3 className="font-serif-crest text-2xl font-semibold text-[#fcf9f2]">
                        {copy.readyTitle}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInquiryReady(false)}
                      className="self-start sm:self-auto px-3.5 py-2 rounded-lg bg-[#0b1d3a] hover:bg-[#132d56] border border-[#d1a847]/55 text-xs font-semibold text-[#fceda2] cursor-pointer"
                    >
                      {copy.readyEditBtn}
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {copy.readySubtitle}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3.5">
                      <div className="text-slate-400">{copy.formOptionLabel}</div>
                      <div className="font-semibold text-[#fcf9f2] mt-0.5">
                        {activeOption.code[lang]}
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3.5">
                      <div className="text-slate-400">{copy.formRoomLabel}</div>
                      <div className="font-semibold text-[#fceda2] mt-0.5">
                        {copy.roomLabels[selectedRoomType].name} · {travelersCount} pers.
                      </div>
                    </div>
                  </div>

                  <a
                    href={buildWhatsappInquiryUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ggt-btn-3d-return w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-colors"
                  >
                    <span>{copy.readyWhatsappBtn}</span>
                    <ExternalLink className="w-4 h-4 shrink-0 ggt-forward-arrow" />
                  </a>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/65 p-5 sm:p-7 space-y-5 shadow-[0_18px_42px_rgba(11,29,58,0.08)]"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor={`${uid}-omra-ram-opt`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.formOptionLabel}
                      </label>
                      <select
                        id={`${uid}-omra-ram-opt`}
                        value={selectedOptionId}
                        onChange={(e) =>
                          setSelectedOptionId(e.target.value as OmraRamadanOptionId)
                        }
                        className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      >
                        {OMRA_RAMADAN_OPTIONS.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.code[lang]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor={`${uid}-omra-ram-room`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.formRoomLabel}
                      </label>
                      <select
                        id={`${uid}-omra-ram-room`}
                        value={selectedRoomType}
                        onChange={(e) =>
                          setSelectedRoomType(e.target.value as OmraRamadanRoomType)
                        }
                        className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      >
                        {selectableRoomsForOption.map((rt) => {
                          const st = activeOption.rooms[rt];
                          const label =
                            st.kind === 'priced'
                              ? `${copy.roomLabels[rt].name} — ${formatMad(st.amountMad)}`
                              : `${copy.roomLabels[rt].name} — ${copy.rateToConfirmLabel}`;
                          return (
                            <option key={rt} value={rt}>
                              {label}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor={`${uid}-omra-ram-pax`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.formTravelersLabel}
                      </label>
                      <input
                        id={`${uid}-omra-ram-pax`}
                        type="number"
                        min={1}
                        max={20}
                        value={travelersCount}
                        onChange={(e) =>
                          setTravelersCount(
                            Math.max(1, Math.min(20, Number(e.target.value) || 1))
                          )
                        }
                        className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] tabular-nums focus:outline-none focus:border-[#0b1d3a]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`${uid}-omra-ram-name`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.formNameLabel} *
                      </label>
                      <input
                        id={`${uid}-omra-ram-name`}
                        type="text"
                        maxLength={120}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={copy.formNamePlaceholder}
                        className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`${uid}-omra-ram-phone`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.formPhoneLabel} *
                      </label>
                      <input
                        id={`${uid}-omra-ram-phone`}
                        type="tel"
                        maxLength={40}
                        dir="ltr"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={copy.formPhonePlaceholder}
                        className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`${uid}-omra-ram-notes`}
                      className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                    >
                      {copy.formNotesLabel}
                    </label>
                    <textarea
                      id={`${uid}-omra-ram-notes`}
                      rows={2}
                      maxLength={320}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={copy.formNotesPlaceholder}
                      className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                    />
                  </div>

                  {formErrors.length > 0 && (
                    <div
                      role="alert"
                      className="rounded-xl bg-amber-50 border border-amber-300 px-4 py-3 text-xs text-amber-950 space-y-1"
                    >
                      {formErrors.map((err, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <span>{err}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3 pt-1">
                    <button
                      type="submit"
                      className="ggt-btn-3d-return w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.15em] shadow-md transition-colors cursor-pointer"
                    >
                      <span>{copy.formSubmitBtn}</span>
                      <ArrowRight
                        className={`w-4 h-4 text-[#d1a847] ggt-forward-arrow ${isRtl ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <p className="text-[11px] text-[#2c405e] leading-relaxed">
                      {copy.formNoAutoConfirm}
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Right Sidebar: Live Verified Fare Breakdown OR Pending Confirmation Notice */}
            <aside className="lg:col-span-4 space-y-5">
              <div
                ref={quoteBoxRef}
                className="rounded-2xl bg-[#0b1d3a] text-[#f5ede0] border border-[#d1a847]/65 p-5 sm:p-6 space-y-4 shadow-[0_18px_42px_rgba(4,12,28,0.25)]"
              >
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                    {copy.quoteEyebrow}
                  </div>
                  <h3 className="font-serif-crest text-xl font-semibold text-[#fcf9f2]">
                    {copy.quoteTitle}
                  </h3>
                  <div className="text-xs text-slate-300 pt-0.5">
                    {activeOption.code[lang]} · {copy.roomLabels[selectedRoomType].name}
                  </div>
                </div>

                {activeRoomState.kind === 'priced' &&
                pricedAmountMad !== null &&
                groupSubtotalMad !== null ? (
                  <div className="space-y-2.5 text-xs">
                    <div className="pt-1">
                      <div className="text-[11px] text-slate-400">{copy.quotePerPersonLabel}</div>
                      <div className="font-serif-crest text-3xl font-bold text-[#fceda2] tabular-nums mt-0.5">
                        {formatMad(pricedAmountMad)}
                      </div>
                    </div>

                    <div className="rounded-xl bg-[#071429] border border-[#d1a847]/45 p-3 flex items-center justify-between gap-2">
                      <span className="text-slate-300 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#d1a847]" />
                        <span>
                          {copy.quoteGroupSubtotalLabel} ({travelersCount})
                        </span>
                      </span>
                      <span className="font-serif-crest text-lg font-bold text-[#fceda2] tabular-nums">
                        {formatMad(groupSubtotalMad)}
                      </span>
                    </div>
                  </div>
                ) : activeRoomState.kind === 'needs_confirmation' ? (
                  <div className="rounded-xl bg-amber-950/70 border border-amber-400/60 p-4 space-y-1.5 text-xs text-amber-100">
                    <div className="font-bold text-amber-200 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-amber-300 shrink-0" />
                      <span>{copy.quotePendingRoomTitle}</span>
                    </div>
                    <div className="font-serif-crest text-xl font-bold text-amber-200">
                      {copy.rateToConfirmLabel}
                    </div>
                    <p className="text-[11px] leading-relaxed text-amber-100/90">
                      {activeRoomState.flagReason[lang]}
                    </p>
                  </div>
                ) : null}

                <div className="rounded-xl bg-[#071429]/90 border border-[#d1a847]/35 p-3.5 space-y-1.5 text-[11px] text-slate-200 leading-relaxed">
                  <div className="font-bold text-[#d1a847]">{copy.quoteHotelsRecapLabel}</div>
                  <div>
                    • {copy.madinahCityLabel} : {activeOption.madinahHotel[lang]} (
                    {activeOption.madinahMealNote[lang]})
                  </div>
                  <div>
                    • {copy.makkahCityLabel} : {activeOption.makkahHotel[lang]}
                    {activeOption.makkahDistanceNote
                      ? ` (${activeOption.makkahDistanceNote[lang]})`
                      : ''}
                  </div>
                </div>

                <div className="rounded-xl bg-amber-950/65 border border-amber-400/50 p-3 text-[11px] text-amber-100 leading-relaxed">
                  {copy.datesBadgeLabel}
                </div>
              </div>

              <div className="rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/60 p-5 sm:p-6 space-y-4 shadow-sm">
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                    {copy.advisorLabel}
                  </div>
                  <h4 className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                    {copy.advisorTitle}
                  </h4>
                </div>

                <div className="space-y-2.5">
                  <a
                    href={`https://wa.me/${whatsappInternational}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-[44px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.12em] transition-colors"
                  >
                    <span>WhatsApp ({displayPhone})</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
                  </a>

                  <a
                    href="tel:0666484815"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-[44px] rounded-xl bg-[#ede1ce] hover:bg-[#e3d2b6] text-[#0b1d3a] border border-[#d1a847]/65 text-xs font-semibold uppercase tracking-[0.12em] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#9a7220] shrink-0" />
                    <span dir="ltr">
                      {copy.advisorCallLabel} · {displayPhone}
                    </span>
                  </a>

                  <button
                    type="button"
                    onClick={onJumpToHomePlanner}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-[44px] rounded-xl bg-transparent hover:bg-[#f5ede0] text-[#0b1d3a] border border-[#d1a847]/45 text-xs font-semibold uppercase tracking-[0.1em] transition-colors cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#c59b38] shrink-0" />
                    <span>{copy.advisorMapsLabel}</span>
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* SECTION 6: RETURN TO HAJJ & OMRA OR HOME */}
        <div className="ggt-omra-ram-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
          <Link
            to={OMRA_RAMADAN_BACK_ROUTE}
            className="ggt-btn-3d-return w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.14em] shadow-md transition-colors"
          >
            <ArrowLeft
              className={`w-4 h-4 text-[#d1a847] ggt-return-arrow ${isRtl ? 'rotate-180' : ''}`}
            />
            <span>{copy.backToUmrahLabel}</span>
          </Link>

          <Link
            to="/"
            className="ggt-btn-3d-return w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#fcf9f2] hover:bg-[#ede1ce] text-[#0b1d3a] border border-[#d1a847]/65 text-xs font-semibold uppercase tracking-[0.12em] transition-colors"
          >
            <span>{copy.backToHomeLabel}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
