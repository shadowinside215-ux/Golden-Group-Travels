import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Car,
  Check,
  Compass,
  ExternalLink,
  Info,
  Languages,
  MapPin,
  Phone,
  PlaneLanding,
  ShieldCheck,
  Ticket,
  Users,
  Utensils,
  XCircle
} from 'lucide-react';
import { Language } from '../assets/destinations';
import {
  EGYPT_EXCURSIONS_BACK_ROUTE,
  EGYPT_EXCURSIONS_COPY,
  EGYPT_EXCURSIONS_IMAGES,
  EGYPT_EXCURSIONS_PRICING_META,
  EGYPT_EXCURSIONS_SERVICES,
  EgyptExcursionServiceId,
  GroupSizeSelection,
  getEgyptExcursionPrice
} from '../data/egyptExcursionsData';
import { trackServiceSelection } from '../utils/analytics';
import {
  pulseSelection3D,
  setupWindowPopScroll3D,
  switchTabWithTimeline,
  useReplayable3DPanel,
  useSlidingTabIndicator
} from '../utils/tab3DMotion';

gsap.registerPlugin(ScrollTrigger);

interface EgyptExcursionsDetailPageProps {
  lang: Language;
  isRtl: boolean;
  whatsappInternational: string;
  displayPhone: string;
  onJumpToHomePlanner: () => void;
}

export const EgyptExcursionsDetailPage: React.FC<EgyptExcursionsDetailPageProps> = ({
  lang,
  isRtl,
  whatsappInternational,
  displayPhone,
  onJumpToHomePlanner
}) => {
  const pageRootRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLElement>(null);
  const inquirySectionRef = useRef<HTMLElement>(null);
  const groupTablistRef = useRef<HTMLDivElement>(null);
  const groupIndicatorRef = useRef<HTMLSpanElement>(null);
  const pricingTableCardRef = useRef<HTMLDivElement>(null);
  const pricingSwitchTimelineRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  const quoteBoxRef = useRef<HTMLDivElement>(null);
  const inquiryReadyCardRef = useRef<HTMLDivElement>(null);
  const quoteMountedRef = useRef(false);

  const location = useLocation();
  const uid = useId();
  const copy = EGYPT_EXCURSIONS_COPY[lang];

  const [selectedServiceId, setSelectedServiceId] =
    useState<EgyptExcursionServiceId>('pyramids-gem');
  const [selectedGroupSize, setSelectedGroupSize] = useState<GroupSizeSelection>(2);
  const [includeOptionalLunch, setIncludeOptionalLunch] = useState<boolean>(false);
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [inquiryReady, setInquiryReady] = useState<boolean>(false);

  useEffect(() => {
    trackServiceSelection('tours_selected');
  }, []);

  useEffect(() => {
    setFormErrors([]);
  }, [lang]);

  // Smooth jump when clicked from "#egypt-excursions-inquiry" button
  useEffect(() => {
    if (location.hash === '#egypt-excursions-inquiry' && inquirySectionRef.current) {
      const id = window.setTimeout(() => {
        inquirySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
      return () => window.clearTimeout(id);
    }
  }, [location.hash]);

  const selectedService = useMemo(
    () =>
      EGYPT_EXCURSIONS_SERVICES.find((item) => item.id === selectedServiceId) ??
      EGYPT_EXCURSIONS_SERVICES[1],
    [selectedServiceId]
  );

  // If user picks Airport Transfer, lunch supplement is not applicable
  useEffect(() => {
    if (!selectedService.supportsOptionalLunch && includeOptionalLunch) {
      setIncludeOptionalLunch(false);
    }
  }, [selectedService.supportsOptionalLunch, includeOptionalLunch]);

  const priceBreakdown = useMemo(
    () =>
      getEgyptExcursionPrice(
        selectedServiceId,
        selectedGroupSize,
        includeOptionalLunch,
        preferredDate || undefined
      ),
    [selectedServiceId, selectedGroupSize, includeOptionalLunch, preferredDate]
  );

  useSlidingTabIndicator(
    groupTablistRef,
    groupIndicatorRef,
    String(selectedGroupSize),
    [lang]
  );

  useReplayable3DPanel(pricingTableCardRef, String(selectedGroupSize), {
    duration: 0.42,
    staggerEach: 0.035,
    yOffset: 10,
    rotateXDeg: 3
  });

  useReplayable3DPanel(inquiryReadyCardRef, inquiryReady, {
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
  }, [selectedServiceId, selectedGroupSize, includeOptionalLunch, preferredDate]);

  useEffect(() => {
    return () => {
      if (pricingSwitchTimelineRef.current) {
        pricingSwitchTimelineRef.current.kill();
        pricingSwitchTimelineRef.current = null;
      }
    };
  }, []);

  // 3D Window Pop-Out ScrollTrigger motion — smooth down and up
  useEffect(() => {
    const root = pageRootRef.current;
    if (!root) return;
    return setupWindowPopScroll3D(root, {
      headings: '.ggt-egypt-exc-heading',
      cards: '.ggt-egypt-exc-card',
      dividers: '.ggt-egypt-exc-divider',
      refreshDelayMs: 180
    });
  }, [lang]);

  const handleGroupSizeTabChange = (nextSize: GroupSizeSelection) => {
    if (nextSize === selectedGroupSize) return;
    switchTabWithTimeline({
      outgoingEl: pricingTableCardRef.current,
      timelineRef: pricingSwitchTimelineRef,
      onSwap: () => {
        setSelectedGroupSize(nextSize);
      }
    });
  };

  const scrollToServices = () => {
    servicesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToInquiry = () => {
    inquirySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isDateAfterValidity =
    Boolean(preferredDate) && preferredDate > EGYPT_EXCURSIONS_PRICING_META.validUntilIso;

  const selectedGroupOptionLabel =
    copy.groupSizeOptions.find((opt) => opt.id === selectedGroupSize)?.label ??
    copy.onRequestPriceLabel;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!fullName.trim()) errs.push(copy.validationNameRequired);
    if (!phone.trim()) errs.push(copy.validationPhoneRequired);

    if (errs.length > 0) {
      setFormErrors(errs);
      setInquiryReady(false);
      return;
    }

    setFormErrors([]);
    setInquiryReady(true);
  };

  const buildWhatsappInquiryUrl = () => {
    const lunchStatus = !selectedService.supportsOptionalLunch
      ? copy.readySummaryLunchNA
      : includeOptionalLunch
      ? copy.readySummaryLunchYes
      : copy.readySummaryLunchNo;

    const rateLine =
      priceBreakdown.status === 'priced' && priceBreakdown.totalUsdPerPerson !== null
        ? `${priceBreakdown.totalUsdPerPerson} USD / pers. (Total ${selectedGroupSize} pers.: ${priceBreakdown.estimatedGroupTotalUsd} USD)`
        : copy.onRequestPriceLabel;

    const messageLines = [
      'Bonjour Golden Group Travels,',
      `Demande de réservation : ${copy.pageTitle} (${copy.arabicTitle})`,
      `• Prestation : ${selectedService.title.fr} (${selectedService.title.en})`,
      `• Taille du groupe : ${selectedGroupOptionLabel}`,
      `• Supplément déjeuner (+25 USD/pers.) : ${lunchStatus}`,
      `• Tarif indicatif : ${rateLine}`,
      preferredDate ? `• Date souhaitée : ${preferredDate}` : '',
      `• Validité grille : jusqu'au 31/12/2026 (sous réserve de révision taxes/transports/entrées)`,
      `• Nom : ${fullName.trim()}`,
      `• Téléphone : ${phone.trim()}`,
      notes.trim() ? `• Notes : ${notes.trim()}` : ''
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(messageLines)}`;
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
              to={EGYPT_EXCURSIONS_BACK_ROUTE}
              className="ggt-btn-3d-return inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/60 text-xs font-semibold uppercase tracking-wider"
            >
              <ArrowLeft className={`w-3.5 h-3.5 text-[#d1a847] ggt-return-arrow ${isRtl ? 'rotate-180' : ''}`} />
              <span>{copy.backToToursLabel}</span>
            </Link>

            <Link
              to="/"
              className="ggt-btn-3d-return inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-transparent hover:bg-[#0b1d3a] text-slate-200 border border-[#d1a847]/30 text-xs font-medium"
            >
              <span>{copy.backToHomeLabel}</span>
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/45 text-[11px] font-semibold text-[#fceda2]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
            <span>{copy.validityBadge}</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: HERO WITH OFFICIAL IMAGE & SCOPED 20 USD STARTING PRICE */}
      <section className="relative bg-[#071429] text-[#f5ede0] overflow-hidden border-b-2 border-[#d1a847]/55">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/55 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#d1a847]">
                <Car className="w-3.5 h-3.5 shrink-0" />
                <span>{copy.heroEyebrow}</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-serif-crest text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#fcf9f2] leading-[1.12] [text-wrap:balance]">
                  {copy.pageTitle}
                </h1>
                <div
                  dir="rtl"
                  lang="ar"
                  className="text-xl sm:text-2xl font-semibold text-[#fceda2]"
                >
                  {copy.arabicTitle}
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                  {copy.officialSubtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b1d3a]/90 border border-[#d1a847]/40 text-[#fceda2] font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
                  <span>{copy.destinationBadge}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b1d3a]/90 border border-[#d1a847]/40 text-slate-100 font-medium tabular-nums">
                  <Calendar className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
                  <span>{copy.validityBadge}</span>
                </span>
              </div>

              {/* Scoped 20 USD Starting Price Notice — strictly Airport Transfer for 6 travelers */}
              <div className="rounded-xl bg-[#0b1d3a] border-2 border-[#d1a847] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_14px_34px_rgba(0,0,0,0.28)]">
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[#d1a847] font-semibold">
                    {copy.showcaseStartingFromLabel}
                  </div>
                  <div className="font-serif-crest text-3xl sm:text-4xl font-bold text-[#fceda2] tabular-nums">
                    {copy.showcaseStartingPrice}
                  </div>
                </div>
                <div className="sm:max-w-xs text-xs text-slate-100 leading-relaxed border-t sm:border-t-0 sm:border-s border-[#d1a847]/35 pt-3 sm:pt-0 sm:ps-4">
                  <span className="font-semibold text-[#fceda2] block mb-0.5">
                    {copy.heroStartingScopeHeadline}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={scrollToServices}
                  className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.14em] shadow-lg cursor-pointer"
                >
                  <span>{copy.heroViewExcursionsBtn}</span>
                  <ArrowRight className={`w-4 h-4 shrink-0 ggt-forward-arrow ${isRtl ? 'rotate-180' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={scrollToInquiry}
                  className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/70 text-xs font-semibold uppercase tracking-[0.12em] cursor-pointer"
                >
                  <span>{copy.heroReserveBtn}</span>
                </button>
              </div>
            </div>

            {/* Hero Official Image Frame */}
            <div className="lg:col-span-5">
              <div
                className="relative rounded-2xl overflow-hidden border-2 border-[#d1a847]/75 shadow-[0_24px_56px_rgba(0,0,0,0.4)] aspect-[16/11]"
                style={{ background: EGYPT_EXCURSIONS_IMAGES.fallbackGradient }}
              >
                <img
                  src={EGYPT_EXCURSIONS_IMAGES.hero}
                  alt={`${copy.pageTitle} — ${copy.destinationBadge}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#071429]/85 via-transparent to-[#071429]/20"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold text-[#fceda2]">
                    <PlaneLanding className="w-3.5 h-3.5 text-[#d1a847]" />
                    <span>20 USD · {copy.serviceCardTransferNote}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold text-[#fcf9f2]">
                    <Compass className="w-3.5 h-3.5 text-[#d1a847]" />
                    <span>5 Excursions + Transfert</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-14">
        {/* SECTION 2: SERVICE SELECTION CARDS */}
        <section ref={servicesSectionRef} className="space-y-6 scroll-mt-20">
          <div className="ggt-egypt-exc-heading space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.servicesSectionEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
              {copy.servicesSectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
              {copy.servicesSectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EGYPT_EXCURSIONS_SERVICES.map((service) => {
              const isSelected = service.id === selectedServiceId;
              const minServicePrice = service.pricesUsd[6]; // lowest published rate for THIS service (6 people)

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedServiceId(service.id)}
                  aria-pressed={isSelected}
                  className={`ggt-egypt-exc-card ggt-card-3d-select text-start rounded-2xl overflow-hidden flex flex-col justify-between border-2 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#071429] text-[#f5ede0] border-[#d1a847] shadow-[0_20px_44px_rgba(7,20,41,0.22)]'
                      : 'bg-[#fcf9f2] text-[#0b1d3a] border-[#d1a847]/45 hover:border-[#d1a847] shadow-sm'
                  }`}
                >
                  <div>
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title[lang]}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#071429]/85 via-[#071429]/20 to-transparent"
                      />
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#071429]/90 border border-[#d1a847]/60 text-[10px] font-semibold uppercase tracking-wider text-[#fceda2]">
                          {service.isTransfer ? (
                            <PlaneLanding className="w-3 h-3 text-[#d1a847]" />
                          ) : (
                            <Compass className="w-3 h-3 text-[#d1a847]" />
                          )}
                          <span>{service.durationLabel[lang]}</span>
                        </span>

                        {isSelected && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#d1a847] text-[#0b1d3a] text-[10px] font-bold uppercase tracking-wider">
                            <Check className="w-3 h-3" />
                            <span>{copy.selectedServiceBadge}</span>
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#071429]/90 border border-[#d1a847]/45 text-[11px] font-medium text-slate-100">
                          <Languages className="w-3 h-3 text-[#d1a847]" />
                          <span>{service.guideBadgeLabel[lang]}</span>
                        </span>

                        <span className="inline-flex items-baseline gap-1 px-3 py-1 rounded-lg bg-[#0b1d3a]/95 border border-[#d1a847] text-[#fceda2] font-bold tabular-nums">
                          <span className="text-[10px] uppercase font-semibold text-slate-300">
                            {copy.serviceCardFromLabel}
                          </span>
                          <span className="text-base">{minServicePrice} USD</span>
                          <span className="text-[10px] text-slate-300">
                            ({copy.serviceCardTransferNote})
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3
                        className={`font-serif-crest text-lg font-semibold leading-snug ${
                          isSelected ? 'text-[#fcf9f2]' : 'text-[#0b1d3a]'
                        }`}
                      >
                        {service.title[lang]}
                      </h3>

                      <p
                        className={`text-xs leading-relaxed ${
                          isSelected ? 'text-slate-200' : 'text-[#2c405e]'
                        }`}
                      >
                        {service.summary[lang]}
                      </p>

                      <ul className="space-y-1.5 pt-1">
                        {service.highlights[lang].map((highlight, idx) => (
                          <li
                            key={idx}
                            className={`flex items-start gap-2 text-xs leading-snug ${
                              isSelected ? 'text-slate-100' : 'text-[#0b1d3a]'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 text-[#d1a847] shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    className={`px-5 py-3 border-t flex items-center justify-between gap-2 text-xs font-semibold ${
                      isSelected
                        ? 'border-[#d1a847]/35 bg-[#0b1d3a] text-[#fceda2]'
                        : 'border-[#d1a847]/25 bg-[#f5ede0]/70 text-[#0b1d3a]'
                    }`}
                  >
                    <div className="flex items-center gap-3 tabular-nums">
                      <span>2p: {service.pricesUsd[2]}$</span>
                      <span className="opacity-45">•</span>
                      <span>4p: {service.pricesUsd[4]}$</span>
                      <span className="opacity-45">•</span>
                      <span>6p: {service.pricesUsd[6]}$</span>
                    </div>
                    <span className="text-[11px] uppercase tracking-wider text-[#d1a847] font-bold">
                      {isSelected ? copy.selectedServiceBadge : copy.selectServiceAction}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <div className="ggt-egypt-exc-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* SECTION 3: CLEAR PRICE COMPARISON BY GROUP SIZE */}
        <section className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="ggt-egypt-exc-heading space-y-1.5 max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
                {copy.pricingSectionEyebrow}
              </div>
              <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
                {copy.pricingSectionTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
                {copy.pricingSectionSubtitle}
              </p>
            </div>

            {/* Interactive Group Size Selector Tabs (2 / 4 / 6 / Other -> Tarif sur demande) */}
            <div className="space-y-1.5 shrink-0">
              <div className="text-[11px] uppercase tracking-[0.14em] font-bold text-[#0b1d3a]">
                {copy.groupSizeSelectorLabel}
              </div>
              <div
                ref={groupTablistRef}
                role="tablist"
                aria-label={copy.groupSizeSelectorLabel}
                className="relative inline-flex flex-wrap sm:flex-nowrap items-center gap-1 p-1.5 rounded-xl bg-[#071429] border border-[#d1a847]/65 shadow-md"
              >
                <span
                  ref={groupIndicatorRef}
                  aria-hidden="true"
                  className="ggt-tab-indicator-pill rounded-lg bg-[#d1a847]"
                />
                {copy.groupSizeOptions.map((option) => {
                  const active = selectedGroupSize === option.id;
                  return (
                    <button
                      key={String(option.id)}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      data-tab-key={String(option.id)}
                      onClick={() => handleGroupSizeTabChange(option.id)}
                      className={`ggt-tab-3d relative z-10 px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        active
                          ? 'text-[#0b1d3a]'
                          : 'text-[#fceda2] hover:text-white'
                      }`}
                    >
                      <span className="hidden sm:inline">{option.label}</span>
                      <span className="sm:hidden">{option.shortTag}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {selectedGroupSize === 'custom' && (
            <div className="rounded-xl bg-[#0b1d3a] text-[#f5ede0] border-2 border-[#d1a847] px-5 py-4 flex items-start gap-3 shadow-md">
              <Info className="w-5 h-5 text-[#d1a847] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm leading-relaxed">
                <strong className="text-[#fceda2] block mb-0.5">
                  {copy.onRequestPriceLabel}
                </strong>
                <span>{copy.unsupportedGroupNotice}</span>
              </div>
            </div>
          )}

          {/* Responsive Matrix Container (Desktop Table + Mobile Cards) */}
          <div
            ref={pricingTableCardRef}
            className="rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/65 shadow-[0_18px_42px_rgba(11,29,58,0.08)] overflow-hidden"
          >
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-start border-collapse">
                <thead>
                  <tr className="bg-[#071429] text-[#fceda2] text-xs uppercase tracking-[0.12em]">
                    <th className="py-4 px-5 text-start font-semibold">{copy.tableServiceHeader}</th>
                    <th
                      className={`py-4 px-4 text-end font-semibold tabular-nums ${
                        selectedGroupSize === 2 ? 'bg-[#d1a847] text-[#0b1d3a]' : ''
                      }`}
                    >
                      {copy.tableCol2Pax}
                    </th>
                    <th
                      className={`py-4 px-4 text-end font-semibold tabular-nums ${
                        selectedGroupSize === 4 ? 'bg-[#d1a847] text-[#0b1d3a]' : ''
                      }`}
                    >
                      {copy.tableCol4Pax}
                    </th>
                    <th
                      className={`py-4 px-4 text-end font-semibold tabular-nums ${
                        selectedGroupSize === 6 ? 'bg-[#d1a847] text-[#0b1d3a]' : ''
                      }`}
                    >
                      {copy.tableCol6Pax}
                    </th>
                    <th
                      className={`py-4 px-4 text-end font-semibold ${
                        selectedGroupSize === 'custom' ? 'bg-[#d1a847] text-[#0b1d3a]' : ''
                      }`}
                    >
                      {copy.tableColCustom}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d1a847]/30 text-sm">
                  {EGYPT_EXCURSIONS_SERVICES.map((service) => {
                    const isRowActive = service.id === selectedServiceId;
                    return (
                      <tr
                        key={service.id}
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`cursor-pointer transition-colors ${
                          isRowActive
                            ? 'bg-[#ede1ce] font-semibold'
                            : 'hover:bg-[#f5ede0]/80'
                        }`}
                      >
                        <td className="py-4 px-5">
                          <div className="flex items-start gap-2.5">
                            <span
                              className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${
                                isRowActive ? 'bg-[#0b1d3a]' : 'bg-[#d1a847]/55'
                              }`}
                            />
                            <div>
                              <div className="text-[#0b1d3a] font-semibold">
                                {service.title[lang]}
                              </div>
                              <div className="text-[11px] text-[#2c405e] mt-0.5">
                                {service.guideBadgeLabel[lang]}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td
                          className={`py-4 px-4 text-end tabular-nums whitespace-nowrap ${
                            selectedGroupSize === 2
                              ? 'bg-[#d1a847]/20 font-bold text-[#0b1d3a]'
                              : 'text-[#0b1d3a]'
                          }`}
                        >
                          {service.pricesUsd[2]} USD
                        </td>
                        <td
                          className={`py-4 px-4 text-end tabular-nums whitespace-nowrap ${
                            selectedGroupSize === 4
                              ? 'bg-[#d1a847]/20 font-bold text-[#0b1d3a]'
                              : 'text-[#0b1d3a]'
                          }`}
                        >
                          {service.pricesUsd[4]} USD
                        </td>
                        <td
                          className={`py-4 px-4 text-end tabular-nums whitespace-nowrap ${
                            selectedGroupSize === 6
                              ? 'bg-[#d1a847]/20 font-bold text-[#0b1d3a]'
                              : 'text-[#0b1d3a]'
                          }`}
                        >
                          {service.pricesUsd[6]} USD
                        </td>
                        <td
                          className={`py-4 px-4 text-end whitespace-nowrap text-xs font-semibold ${
                            selectedGroupSize === 'custom'
                              ? 'bg-[#d1a847]/25 text-[#0b1d3a]'
                              : 'text-[#9a7220]'
                          }`}
                        >
                          {copy.onRequestPriceLabel}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Comparison Cards */}
            <div className="md:hidden divide-y divide-[#d1a847]/35">
              {EGYPT_EXCURSIONS_SERVICES.map((service) => {
                const isRowActive = service.id === selectedServiceId;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`w-full text-start p-4 space-y-3 cursor-pointer ${
                      isRowActive ? 'bg-[#ede1ce]/90' : 'bg-[#fcf9f2]'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-[#0b1d3a]">
                        {service.title[lang]}
                      </div>
                      <div className="text-[11px] text-[#2c405e] mt-0.5">
                        {service.guideBadgeLabel[lang]}
                      </div>
                    </div>

                    {selectedGroupSize === 'custom' ? (
                      <div className="rounded-lg bg-[#0b1d3a] text-[#fceda2] px-3 py-2 text-xs font-semibold flex items-center justify-between">
                        <span>{copy.tableColCustom}</span>
                        <span>{copy.onRequestPriceLabel}</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2 text-center tabular-nums">
                        {([2, 4, 6] as const).map((pax) => {
                          const colSelected = selectedGroupSize === pax;
                          return (
                            <div
                              key={pax}
                              className={`rounded-lg px-2 py-2 border ${
                                colSelected
                                  ? 'bg-[#0b1d3a] text-[#fceda2] border-[#d1a847]'
                                  : 'bg-[#f5ede0] text-[#0b1d3a] border-[#d1a847]/35'
                              }`}
                            >
                              <div className="text-[10px] uppercase opacity-80">
                                {pax} {copy.quoteTravelersSuffix}
                              </div>
                              <div className="text-sm font-bold">{service.pricesUsd[pax]} $</div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Lunch Supplement Clarification Bar */}
          <div className="rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/65 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#0b1d3a] text-[#d1a847] flex items-center justify-center shrink-0">
              <Utensils className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <div className="text-sm font-bold text-[#0b1d3a]">{copy.lunchBannerTitle}</div>
              <p className="text-xs text-[#2c405e] leading-relaxed">{copy.lunchBannerText}</p>
            </div>
          </div>
        </section>

        <div className="ggt-egypt-exc-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* SECTION 4: INCLUDED SERVICES — EXCURSIONS VS AIRPORT TRANSFER CLEARLY SEPARATED */}
        <section className="space-y-6">
          <div className="ggt-egypt-exc-heading space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.inclusionsSectionEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
              {copy.inclusionsSectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
              {copy.inclusionsSectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Excursion Inclusions */}
            <div className="ggt-egypt-exc-card lg:col-span-7 rounded-2xl bg-[#071429] text-[#f5ede0] border border-[#d1a847]/65 p-6 sm:p-7 space-y-5 shadow-[0_18px_42px_rgba(7,20,41,0.18)]">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#d1a847]/30">
                <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-[#fcf9f2]">
                  {copy.visitsInclusionsTitle}
                </h3>
                <span className="px-3 py-1 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/55 text-[11px] font-semibold text-[#fceda2]">
                  {copy.visitsInclusionsBadge}
                </span>
              </div>

              <div className="space-y-4">
                {copy.visitsInclusionsList.map((inc) => {
                  const Icon =
                    inc.key === 'tickets'
                      ? Ticket
                      : inc.key === 'transport'
                      ? Car
                      : Languages;
                  return (
                    <div key={inc.key} className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/55 flex items-center justify-center text-[#d1a847] shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-sm font-semibold text-[#fcf9f2]">{inc.title}</div>
                        <p className="text-xs text-slate-300 leading-relaxed">{inc.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Airport Transfer Inclusions — EN / AR Assistance ONLY (No misleading French guide promise) */}
            <div className="ggt-egypt-exc-card lg:col-span-5 rounded-2xl bg-[#fcf9f2] text-[#0b1d3a] border-2 border-[#d1a847]/65 p-6 sm:p-7 space-y-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#d1a847]/35">
                <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-[#0b1d3a]">
                  {copy.transferInclusionsTitle}
                </h3>
                <span className="px-3 py-1 rounded-lg bg-[#ede1ce] border border-[#d1a847]/55 text-[11px] font-semibold text-[#0b1d3a]">
                  {copy.transferInclusionsBadge}
                </span>
              </div>

              <div className="space-y-4">
                {copy.transferInclusionsList.map((inc) => {
                  const Icon = inc.key === 'airportTransport' ? PlaneLanding : Languages;
                  return (
                    <div key={inc.key} className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/55 flex items-center justify-center text-[#fceda2] shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-sm font-semibold text-[#0b1d3a]">{inc.title}</div>
                        <p className="text-xs text-[#2c405e] leading-relaxed">{inc.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Exclusions & Optional Supplements Clarifications */}
          <div className="ggt-egypt-exc-card rounded-2xl bg-[#fcf9f2] border border-amber-500/55 p-5 sm:p-6 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0b1d3a]">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{copy.exclusionsBlockTitle}</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-[#2c405e]">
              {copy.exclusionsItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <XCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="ggt-egypt-exc-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* SECTION 5: IMPORTANT CONDITIONS */}
        <section className="space-y-6">
          <div className="ggt-egypt-exc-heading space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.conditionsSectionEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
              {copy.conditionsSectionTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {copy.conditionsList.map((condition, idx) => (
              <div
                key={idx}
                className="ggt-egypt-exc-card rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/55 p-5 flex items-start gap-3.5 shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-[#0b1d3a] text-[#d1a847] flex items-center justify-center shrink-0 mt-0.5">
                  {idx === 1 ? (
                    <Users className="w-4 h-4" />
                  ) : idx === 2 ? (
                    <Calendar className="w-4 h-4" />
                  ) : (
                    <ShieldCheck className="w-4 h-4" />
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-[#0b1d3a]">{condition.title}</h3>
                  <p className="text-xs text-[#2c405e] leading-relaxed">{condition.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="ggt-egypt-exc-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* SECTION 6: INTERACTIVE RESERVATION INQUIRY */}
        <section
          ref={inquirySectionRef}
          id="egypt-excursions-inquiry"
          className="space-y-6 scroll-mt-20"
        >
          <div className="ggt-egypt-exc-heading space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.inquirySectionEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
              {copy.inquirySectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
              {copy.inquirySectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
            {/* Inquiry Form / Ready Card */}
            <div className="lg:col-span-8">
              {inquiryReady ? (
                <div
                  ref={inquiryReadyCardRef}
                  className="rounded-2xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] p-6 sm:p-8 space-y-6 shadow-[0_24px_56px_rgba(7,20,41,0.22)]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#d1a847]/30">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                        {copy.pageTitle}
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
                      <div className="text-slate-400">{copy.readySummaryService}</div>
                      <div className="font-semibold text-[#fcf9f2] mt-0.5">
                        {selectedService.title[lang]}
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3.5">
                      <div className="text-slate-400">{copy.readySummaryGroup}</div>
                      <div className="font-semibold text-[#fceda2] mt-0.5">
                        {selectedGroupOptionLabel}
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3.5">
                      <div className="text-slate-400">{copy.readySummaryLunch}</div>
                      <div className="font-semibold text-[#fcf9f2] mt-0.5">
                        {!selectedService.supportsOptionalLunch
                          ? copy.readySummaryLunchNA
                          : includeOptionalLunch
                          ? copy.readySummaryLunchYes
                          : copy.readySummaryLunchNo}
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3.5">
                      <div className="text-slate-400">{copy.readySummaryRate}</div>
                      <div className="font-bold text-[#fceda2] mt-0.5 tabular-nums">
                        {priceBreakdown.status === 'priced' &&
                        priceBreakdown.totalUsdPerPerson !== null
                          ? `${priceBreakdown.totalUsdPerPerson} USD / pers.`
                          : copy.onRequestPriceLabel}
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`${uid}-exc-service`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.formServiceLabel}
                      </label>
                      <select
                        id={`${uid}-exc-service`}
                        value={selectedServiceId}
                        onChange={(e) =>
                          setSelectedServiceId(e.target.value as EgyptExcursionServiceId)
                        }
                        className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      >
                        {EGYPT_EXCURSIONS_SERVICES.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.title[lang]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor={`${uid}-exc-group`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.formGroupSizeLabel}
                      </label>
                      <select
                        id={`${uid}-exc-group`}
                        value={String(selectedGroupSize)}
                        onChange={(e) => {
                          const v = e.target.value;
                          setSelectedGroupSize(
                            v === 'custom' ? 'custom' : (Number(v) as 2 | 4 | 6)
                          );
                        }}
                        className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      >
                        {copy.groupSizeOptions.map((option) => (
                          <option key={String(option.id)} value={String(option.id)}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Opt-in Optional Lunch Supplement (+25 USD) — NEVER checked automatically */}
                  <div className="rounded-xl bg-[#f5ede0]/80 border border-[#d1a847]/50 p-4 space-y-1.5">
                    {selectedService.supportsOptionalLunch ? (
                      <>
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={includeOptionalLunch}
                            onChange={(e) => setIncludeOptionalLunch(e.target.checked)}
                            className="mt-0.5 rounded border-[#d1a847] text-[#0b1d3a]"
                          />
                          <span className="text-xs font-bold text-[#0b1d3a]">
                            {copy.formLunchToggleLabel}
                          </span>
                        </label>
                        <p className="text-[11px] text-[#2c405e] leading-snug ps-6">
                          {copy.formLunchToggleHint}
                        </p>
                      </>
                    ) : (
                      <div className="flex items-start gap-2.5 text-xs text-[#2c405e]">
                        <Info className="w-4 h-4 text-[#9a7220] shrink-0 mt-0.5" />
                        <span>{copy.formLunchTransferNotApplicable}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`${uid}-exc-date`}
                      className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                    >
                      {copy.formPreferredDateLabel}
                    </label>
                    <input
                      id={`${uid}-exc-date`}
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full sm:max-w-xs bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                    />
                    {isDateAfterValidity && (
                      <div className="mt-2.5 rounded-xl bg-amber-50 border border-amber-400 px-4 py-3 text-xs text-amber-950 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <span className="font-medium">{copy.formDateAfter2026Warning}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`${uid}-exc-name`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.formNameLabel} *
                      </label>
                      <input
                        id={`${uid}-exc-name`}
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
                        htmlFor={`${uid}-exc-phone`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.formPhoneLabel} *
                      </label>
                      <input
                        id={`${uid}-exc-phone`}
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
                      htmlFor={`${uid}-exc-notes`}
                      className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                    >
                      {copy.formNotesLabel}
                    </label>
                    <textarea
                      id={`${uid}-exc-notes`}
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
                      {copy.formNoAutoConfirmNote}
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Right Sidebar: Live Quote Summary & Agency Direct Assistance */}
            <aside className="lg:col-span-4 space-y-5">
              <div
                ref={quoteBoxRef}
                className="rounded-2xl bg-[#0b1d3a] text-[#f5ede0] border border-[#d1a847]/65 p-5 sm:p-6 space-y-4 shadow-[0_18px_42px_rgba(4,12,28,0.25)]"
              >
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                    {copy.quoteBoxEyebrow}
                  </div>
                  <h3 className="font-serif-crest text-xl font-semibold text-[#fcf9f2]">
                    {copy.quoteBoxTitle}
                  </h3>
                  <div className="text-xs text-slate-300 leading-snug pt-0.5">
                    {selectedService.title[lang]}
                  </div>
                </div>

                {priceBreakdown.status === 'priced' &&
                priceBreakdown.baseUsdPerPerson !== null &&
                priceBreakdown.totalUsdPerPerson !== null ? (
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#d1a847]/25">
                      <span className="text-slate-300">{copy.quoteBasePerPersonLabel}</span>
                      <span className="font-semibold text-[#fcf9f2] tabular-nums">
                        {priceBreakdown.baseUsdPerPerson} USD
                      </span>
                    </div>

                    {priceBreakdown.lunchSupplementUsdPerPerson > 0 && (
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#d1a847]/25">
                        <span className="text-slate-300">{copy.quoteOptionalLunchLabel}</span>
                        <span className="font-semibold text-[#fceda2] tabular-nums">
                          +{priceBreakdown.lunchSupplementUsdPerPerson} USD
                        </span>
                      </div>
                    )}

                    <div className="pt-1">
                      <div className="text-[11px] text-slate-400">
                        {copy.quoteTotalPerPersonLabel}
                      </div>
                      <div className="font-serif-crest text-3xl font-bold text-[#fceda2] tabular-nums mt-0.5">
                        {priceBreakdown.totalUsdPerPerson} USD
                      </div>
                    </div>

                    {priceBreakdown.estimatedGroupTotalUsd !== null && (
                      <div className="rounded-xl bg-[#071429] border border-[#d1a847]/45 p-3 flex items-center justify-between gap-2">
                        <span className="text-slate-300">
                          {copy.quoteEstimatedGroupTotalLabel} ({selectedGroupSize}{' '}
                          {copy.quoteTravelersSuffix})
                        </span>
                        <span className="font-serif-crest text-lg font-bold text-[#fceda2] tabular-nums">
                          {priceBreakdown.estimatedGroupTotalUsd} USD
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded-xl bg-amber-950/60 border border-amber-400/50 p-4 space-y-1 text-xs text-amber-100">
                    <div className="font-bold text-amber-200">
                      {priceBreakdown.status === 'expired_validity'
                        ? copy.quoteExpiredStatusTitle
                        : copy.quoteCustomStatusTitle}
                    </div>
                    <p className="leading-relaxed">
                      {priceBreakdown.status === 'expired_validity'
                        ? copy.quoteExpiredStatusText
                        : copy.quoteCustomStatusText}
                    </p>
                  </div>
                )}

                <div className="rounded-xl bg-[#071429]/90 border border-[#d1a847]/35 p-3 text-[11px] text-slate-300 leading-relaxed">
                  {copy.quoteConditionsFooterNote}
                </div>
              </div>

              {/* Direct Salé Agency Contact Box */}
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
                    <span>
                      {copy.advisorWhatsappDirect} ({displayPhone})
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
                  </a>

                  <a
                    href="tel:0666484815"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-[44px] rounded-xl bg-[#ede1ce] hover:bg-[#e3d2b6] text-[#0b1d3a] border border-[#d1a847]/65 text-xs font-semibold uppercase tracking-[0.12em] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#9a7220] shrink-0" />
                    <span dir="ltr">
                      {copy.advisorCallBtn} · {displayPhone}
                    </span>
                  </a>

                  <button
                    type="button"
                    onClick={onJumpToHomePlanner}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-[44px] rounded-xl bg-transparent hover:bg-[#f5ede0] text-[#0b1d3a] border border-[#d1a847]/45 text-xs font-semibold uppercase tracking-[0.1em] transition-colors cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#c59b38] shrink-0" />
                    <span>{copy.advisorMapsBtn}</span>
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Bottom Return Bar */}
        <div className="ggt-egypt-exc-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
          <Link
            to={EGYPT_EXCURSIONS_BACK_ROUTE}
            className="ggt-btn-3d-return w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.14em] shadow-md transition-colors"
          >
            <ArrowLeft className={`w-4 h-4 text-[#d1a847] ggt-return-arrow ${isRtl ? 'rotate-180' : ''}`} />
            <span>{copy.backToToursLabel}</span>
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
