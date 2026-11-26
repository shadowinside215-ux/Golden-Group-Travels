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
  Calendar,
  Car,
  Check,
  Coffee,
  Coins,
  Compass,
  ExternalLink,
  FileCheck2,
  Info,
  Landmark,
  MapPin,
  Phone,
  Plane,
  ShieldCheck,
  Ship,
  Users
} from 'lucide-react';
import { Language } from '../assets/destinations';
import {
  CAIRO_HOTELS,
  CAIRO_TOUR_COPY,
  CAIRO_TOUR_IMAGES,
  CAIRO_TOUR_PRICING,
  CAIRO_TOUR_TOURS_ROUTE,
  CairoHotelId,
  CairoInclusionItem,
  CairoOccupancyId,
  CairoPricingPeriodId,
  evaluateCairoTravelDates
} from '../data/cairoTourData';
import { trackServiceSelection } from '../utils/analytics';
import {
  prefersReducedMotion,
  pulseSelection3D,
  setupWindowPopScroll3D,
  switchTabWithTimeline,
  useReplayable3DPanel,
  useSlidingTabIndicator
} from '../utils/tab3DMotion';

gsap.registerPlugin(ScrollTrigger);

interface CairoTourDetailPageProps {
  lang: Language;
  isRtl: boolean;
  whatsappInternational: string;
  displayPhone: string;
  onJumpToHomePlanner: () => void;
}

const INCLUSION_ICONS: Record<CairoInclusionItem['key'], React.FC<{ className?: string }>> = {
  visa: FileCheck2,
  hotel: BedDouble,
  pyramids: Landmark,
  islamicCairo: Compass,
  cruise: Ship,
  arrivalBreakfast: Coffee,
  transfers: Car,
  tips: Coins,
  guide: Users
};

export const CairoTourDetailPage: React.FC<CairoTourDetailPageProps> = ({
  lang,
  isRtl,
  whatsappInternational,
  displayPhone,
  onJumpToHomePlanner
}) => {
  const pageRootRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLElement>(null);
  const periodTablistRef = useRef<HTMLDivElement>(null);
  const periodIndicatorRef = useRef<HTMLSpanElement>(null);
  const periodPanelRef = useRef<HTMLDivElement>(null);
  const periodSwitchTimelineRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  const estimateBoxRef = useRef<HTMLDivElement>(null);
  const inquiryReadyCardRef = useRef<HTMLDivElement>(null);
  const estimateMountedRef = useRef(false);
  const location = useLocation();
  const uid = useId();
  const copy = CAIRO_TOUR_COPY[lang];

  const [selectedPeriodTab, setSelectedPeriodTab] = useState<CairoPricingPeriodId>('regular');
  const [selectedHotelId, setSelectedHotelId] = useState<CairoHotelId>('pyramisa');
  const [selectedOccupancy, setSelectedOccupancy] = useState<CairoOccupancyId>('triple');
  const [includeSingleSupplement, setIncludeSingleSupplement] = useState(false);

  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [inquiryReady, setInquiryReady] = useState(false);

  useEffect(() => {
    trackServiceSelection('tours_selected');
  }, []);

  useEffect(() => {
    setFormErrors([]);
  }, [lang]);

  // Support deep link #cairo-inquiry-form smoothly
  useEffect(() => {
    if (location.hash === '#cairo-inquiry-form' && formSectionRef.current) {
      const id = window.setTimeout(() => {
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 160);
      return () => window.clearTimeout(id);
    }
  }, [location.hash]);

  const dateEval = useMemo(
    () => evaluateCairoTravelDates(departDate, returnDate),
    [departDate, returnDate]
  );

  // Sync period selector view when traveler picks valid season dates
  useEffect(() => {
    if (dateEval.pricingPeriodToApply) {
      setSelectedPeriodTab(dateEval.pricingPeriodToApply);
    }
  }, [dateEval.pricingPeriodToApply]);

  useSlidingTabIndicator(periodTablistRef, periodIndicatorRef, selectedPeriodTab, [lang]);

  useReplayable3DPanel(periodPanelRef, selectedPeriodTab, {
    duration: 0.46,
    staggerEach: 0.045,
    yOffset: 12,
    rotateXDeg: 3.5
  });

  useReplayable3DPanel(inquiryReadyCardRef, inquiryReady, {
    enabled: inquiryReady,
    duration: 0.48,
    staggerEach: 0.045,
    yOffset: 14,
    rotateXDeg: 4
  });

  useEffect(() => {
    if (!estimateMountedRef.current) {
      estimateMountedRef.current = true;
      return;
    }
    pulseSelection3D(estimateBoxRef.current);
  }, [selectedHotelId, selectedOccupancy, includeSingleSupplement, selectedPeriodTab, travelersCount]);

  useEffect(() => {
    return () => {
      if (periodSwitchTimelineRef.current) {
        periodSwitchTimelineRef.current.kill();
        periodSwitchTimelineRef.current = null;
      }
    };
  }, []);

  const handlePeriodSwitch = (period: CairoPricingPeriodId) => {
    if (period === selectedPeriodTab) return;
    switchTabWithTimeline({
      outgoingEl: periodPanelRef.current,
      timelineRef: periodSwitchTimelineRef,
      onSwap: () => {
        setSelectedPeriodTab(period);
      }
    });
  };

  const selectedHotel = useMemo(
    () => CAIRO_HOTELS.find((h) => h.id === selectedHotelId) ?? CAIRO_HOTELS[0],
    [selectedHotelId]
  );

  const effectivePeriodForCalc: CairoPricingPeriodId | null = useMemo(() => {
    if (dateEval.classification === 'outside' || dateEval.isRangeInvalid) {
      return null;
    }
    if (dateEval.pricingPeriodToApply) {
      return dateEval.pricingPeriodToApply;
    }
    return selectedPeriodTab;
  }, [dateEval, selectedPeriodTab]);

  const rateCalculation = useMemo(() => {
    if (!effectivePeriodForCalc) {
      return {
        canEstimate: false as const,
        baseRateUsd: null,
        singleSupplementUsd: null,
        smallGroupUsd: 0,
        perPersonPublishedSubtotalUsd: null,
        groupSubtotalUsd: null,
        isSoloUnpublished: travelersCount === 1
      };
    }

    const tierRates = selectedHotel[effectivePeriodForCalc];
    const baseRateUsd =
      selectedOccupancy === 'double' ? tierRates.double : tierRates.triple;
    const singleSupplementUsd = includeSingleSupplement
      ? tierRates.singleSupplement
      : 0;
    const isSmallGroup =
      travelersCount >= CAIRO_TOUR_PRICING.smallGroupMinPax &&
      travelersCount <= CAIRO_TOUR_PRICING.smallGroupMaxPax;
    const smallGroupUsd = isSmallGroup
      ? CAIRO_TOUR_PRICING.smallGroupSupplementUsd
      : 0;

    // 1 traveler falls below the 2–19 & 20+ published tiers; never fabricate single solo rate
    if (travelersCount < 2) {
      return {
        canEstimate: true as const,
        baseRateUsd,
        singleSupplementUsd: tierRates.singleSupplement,
        smallGroupUsd: null,
        perPersonPublishedSubtotalUsd: null,
        groupSubtotalUsd: null,
        isSoloUnpublished: true
      };
    }

    const perPersonPublishedSubtotalUsd =
      baseRateUsd + singleSupplementUsd + smallGroupUsd;
    const groupSubtotalUsd = perPersonPublishedSubtotalUsd * travelersCount;

    return {
      canEstimate: true as const,
      baseRateUsd,
      singleSupplementUsd,
      smallGroupUsd,
      perPersonPublishedSubtotalUsd,
      groupSubtotalUsd,
      isSoloUnpublished: false
    };
  }, [
    effectivePeriodForCalc,
    selectedHotel,
    selectedOccupancy,
    includeSingleSupplement,
    travelersCount
  ]);

  // 3D Window Pop-Out Bidirectional GSAP ScrollTrigger Animations
  useEffect(() => {
    const root = pageRootRef.current;
    if (!root) return;

    if (!prefersReducedMotion()) {
      const heroContent = root.querySelector<HTMLElement>('.ggt-cairo-hero-enter');
      if (heroContent) {
        gsap.fromTo(
          heroContent,
          { opacity: 0, y: 22, scale: 0.96, rotateX: 5, transformPerspective: 1250 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.58,
            ease: 'back.out(1.15)',
            force3D: true,
            clearProps: 'transform,opacity'
          }
        );
      }
    }

    return setupWindowPopScroll3D(root, {
      dividers: '.ggt-cairo-divider',
      headings: '.ggt-cairo-heading-3d',
      cards: '.ggt-cairo-card-3d',
      media: '.ggt-cairo-photo-reveal',
      refreshDelayMs: 220
    });
  }, [lang]);

  const handleSelectHotelAndJump = (
    hotelId: CairoHotelId,
    period: CairoPricingPeriodId,
    occupancy?: CairoOccupancyId
  ) => {
    setSelectedHotelId(hotelId);
    setSelectedPeriodTab(period);
    if (occupancy) {
      setSelectedOccupancy(occupancy);
    }
    setInquiryReady(false);
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!departDate) {
      errs.push(copy.errors.departRequired);
    } else if (returnDate && returnDate < departDate) {
      errs.push(copy.errors.returnInvalid);
    }
    if (!fullName.trim() || !phone.trim()) {
      errs.push(copy.errors.contactRequired);
    }
    setFormErrors(errs);
    setInquiryReady(errs.length === 0);
  };

  const buildWhatsappInquiryUrl = () => {
    const periodLabel =
      dateEval.classification === 'outside'
        ? copy.outsideConfirmPriceLabel
        : effectivePeriodForCalc === 'special'
        ? `${copy.periodSpecialTab} (${copy.periodSpecialDates})`
        : `${copy.periodRegularTab} (${copy.periodRegularDates})`;

    const occLabel =
      selectedOccupancy === 'double'
        ? copy.occupancyDoubleLabel
        : copy.occupancyTripleLabel;

    const rateLine =
      rateCalculation.perPersonPublishedSubtotalUsd !== null
        ? `${rateCalculation.perPersonPublishedSubtotalUsd} USD / personne (base ${rateCalculation.baseRateUsd} USD${
            includeSingleSupplement && rateCalculation.singleSupplementUsd
              ? ` + Supplément single ${rateCalculation.singleSupplementUsd} USD`
              : ''
          }${
            rateCalculation.smallGroupUsd > 0
              ? ` + Supplément petit groupe 2–19 pers. ${rateCalculation.smallGroupUsd} USD`
              : ''
          })`
        : copy.outsideConfirmPriceLabel;

    const lines = [
      'Bonjour Golden Group Travels,',
      `Je souhaite vérifier la disponibilité et recevoir un devis pour le circuit : ${copy.frenchTitle} (${copy.arabicTitle}) — 5 jours / 4 nuits.`,
      `• Dates souhaitées : ${departDate}${returnDate ? ` au ${returnDate}` : ''}`,
      `• Grille / Période : ${periodLabel}`,
      `• Hôtel souhaité : ${selectedHotel.name.fr}`,
      `• Occupation : ${occLabel}${includeSingleSupplement ? ' + option Supplément single' : ''}`,
      `• Nombre de voyageurs : ${travelersCount}`,
      `• Tarif indicatif publié : ${rateLine}`,
      `• Important : Vols internationaux NON inclus (à prévoir ou à chiffrer séparément)`,
      dateEval.requiresGalaCheck
        ? '• À vérifier : Dîners de gala obligatoires des 24 / 31 décembre'
        : '',
      `• Nom complet : ${fullName.trim()}`,
      `• Téléphone / WhatsApp : ${phone.trim()}`,
      notes.trim() ? `• Précisions : ${notes.trim()}` : ''
    ].filter(Boolean);

    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const buildDirectFlightAddonWhatsappUrl = () => {
    const msg = `Bonjour Golden Group Travels, je souhaite consulter les disponibilités pour "${copy.frenchTitle}" (665 USD+ hors vols) ainsi qu'un devis séparé pour les vols internationaux vers Le Caire.`;
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div ref={pageRootRef} className="bg-cream-paper min-h-screen">
      {/* Top Return Navigation Bar */}
      <div className="bg-[#ede1ce]/95 border-b border-[#d1a847]/45">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to={CAIRO_TOUR_TOURS_ROUTE}
              className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[44px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/75 text-xs font-bold uppercase tracking-[0.12em] shadow-sm transition-colors whitespace-normal text-center leading-snug"
            >
              <ArrowLeft className={`w-4 h-4 text-[#d1a847] shrink-0 ggt-return-arrow ${isRtl ? 'rotate-180' : ''}`} />
              <span>{copy.backToToursLabel}</span>
            </Link>

            <Link
              to="/"
              className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[44px] rounded-xl bg-[#fcf9f2] hover:bg-[#ede1ce] text-[#0b1d3a] border border-[#d1a847]/65 text-xs font-semibold uppercase tracking-[0.12em] transition-colors whitespace-normal text-center leading-snug"
            >
              <span>{copy.backToHomeLabel}</span>
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0b1d3a]/85">
            <ShieldCheck className="w-4 h-4 text-[#c59b38] shrink-0" />
            <span>{copy.badgeDirectAgency}</span>
          </div>
        </div>
      </div>

      {/* A. Tour Hero Banner */}
      <section className="relative overflow-hidden bg-[#071429] text-[#f5ede0] border-b-2 border-[#d1a847]/65">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: CAIRO_TOUR_IMAGES.fallbackGradient }}
        />
        <img
          src={CAIRO_TOUR_IMAGES.hero}
          alt={`${copy.frenchTitle} — ${copy.destination}`}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#071429] via-[#071429]/82 to-[#071429]/65"
        />

        <div className="ggt-cairo-hero-enter relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-[11px] uppercase tracking-[0.24em] text-[#d1a847] font-semibold">
                {copy.heroEyebrow}
              </div>

              <div className="space-y-2">
                <h1 className="font-serif-crest text-3xl sm:text-5xl font-semibold text-[#fcf9f2] leading-tight [text-wrap:balance]">
                  {copy.frenchTitle}
                </h1>
                <div
                  dir="rtl"
                  lang="ar"
                  className="text-xl sm:text-3xl font-semibold text-[#fceda2]"
                >
                  {copy.arabicTitle}
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                {copy.heroTagline}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0b1d3a]/90 border border-[#d1a847]/60 text-xs font-semibold text-[#fceda2]">
                  <MapPin className="w-4 h-4 text-[#d1a847]" />
                  <span>{copy.destination}</span>
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0b1d3a]/90 border border-[#d1a847]/60 text-xs font-semibold text-[#fcf9f2] tabular-nums">
                  <Calendar className="w-4 h-4 text-[#d1a847]" />
                  <span>{copy.duration}</span>
                </span>
              </div>
            </div>

            {/* Hero Price + Explicit Flights Excluded Callout + Primary CTA */}
            <div className="lg:col-span-4 rounded-2xl bg-[#0b1d3a]/95 border-2 border-[#d1a847] p-5 sm:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)] space-y-4">
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                  {copy.startingFromLabel}
                </div>
                <div className="font-serif-crest text-4xl font-bold text-[#fceda2] tabular-nums">
                  {copy.startingPriceDisplay}
                </div>
                <div className="text-xs text-slate-300 tabular-nums">{copy.perPersonUsdNote}</div>
              </div>

              <div className="rounded-xl bg-amber-950/65 border border-amber-400/55 px-3.5 py-2.5 flex items-start gap-2.5 text-xs text-amber-100">
                <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span className="font-semibold leading-snug">{copy.flightsExcludedHeadline}</span>
              </div>

              <button
                type="button"
                onClick={() =>
                  formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                className="ggt-btn-3d-return w-full inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.14em] shadow-md transition-colors cursor-pointer"
              >
                <span>{copy.requestReservationCta}</span>
                <ArrowRight className={`w-4 h-4 shrink-0 ggt-forward-arrow ${isRtl ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 sm:space-y-16">
        {/* B. Tour Overview & Verified Key Facts (Zero invented day-by-day timing) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
          <div className="lg:col-span-7 space-y-5 ggt-cairo-heading-3d">
            <div className="space-y-1.5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
                {copy.overviewEyebrow}
              </div>
              <h2 className="font-serif-crest text-2xl sm:text-4xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
                {copy.overviewTitle}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#2c405e] leading-relaxed">{copy.overviewLead}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {copy.overviewFacts.map((fact, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-[#fcf9f2] border border-[#d1a847]/50 px-4 py-3.5 shadow-sm"
                >
                  <div className="text-[11px] uppercase tracking-[0.16em] text-[#9a7220] font-semibold">
                    {fact.label}
                  </div>
                  <div className="font-serif-crest text-lg font-semibold text-[#0b1d3a] mt-0.5 tabular-nums">
                    {fact.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-[#ede1ce]/80 border border-[#d1a847]/45 px-4 py-3 flex items-start gap-2.5 text-xs text-[#0b1d3a]">
              <Info className="w-4 h-4 text-[#9a7220] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{copy.overviewNote}</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              className="ggt-cairo-photo-reveal rounded-2xl overflow-hidden border-2 border-[#d1a847]/65 shadow-[0_22px_50px_rgba(11,29,58,0.14)] aspect-[4/3]"
              style={{ background: CAIRO_TOUR_IMAGES.fallbackGradient }}
            >
              <img
                src={CAIRO_TOUR_IMAGES.heritage}
                alt="Khan El Khalili & Rue Al-Muizz — Le Caire"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <div className="ggt-cairo-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* C. Hotel & Pricing Options (Regular vs Special Periods in USD) */}
        <section className="space-y-6">
          <div className="ggt-cairo-heading-3d flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
                {copy.pricingEyebrow}
              </div>
              <h2 className="font-serif-crest text-2xl sm:text-4xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
                {copy.pricingTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
                {copy.pricingSubtitle}
              </p>
            </div>

            {/* Interactive Period Switcher Tabs */}
            <div
              ref={periodTablistRef}
              role="tablist"
              aria-label={copy.pricingTitle}
              className="relative inline-flex flex-wrap items-center p-1.5 rounded-xl bg-[#ede1ce] border border-[#d1a847]/60 gap-1.5 self-start lg:self-auto"
            >
              <span
                ref={periodIndicatorRef}
                aria-hidden="true"
                className="ggt-tab-indicator-pill pointer-events-none"
              />
              <button
                type="button"
                role="tab"
                aria-selected={selectedPeriodTab === 'regular'}
                data-tab-active={selectedPeriodTab === 'regular' ? 'true' : 'false'}
                onClick={() => handlePeriodSwitch('regular')}
                className={`ggt-tab-3d relative z-10 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-[0.08em] transition-colors cursor-pointer ${
                  selectedPeriodTab === 'regular'
                    ? 'text-[#fceda2]'
                    : 'text-[#0b1d3a]/85 hover:text-[#0b1d3a]'
                }`}
              >
                {copy.periodRegularTab}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={selectedPeriodTab === 'special'}
                data-tab-active={selectedPeriodTab === 'special' ? 'true' : 'false'}
                onClick={() => handlePeriodSwitch('special')}
                className={`ggt-tab-3d relative z-10 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-[0.08em] transition-colors cursor-pointer ${
                  selectedPeriodTab === 'special'
                    ? 'text-[#fceda2]'
                    : 'text-[#0b1d3a]/85 hover:text-[#0b1d3a]'
                }`}
              >
                {copy.periodSpecialTab}
              </button>
            </div>
          </div>

          <div ref={periodPanelRef} className="space-y-6 perspective-1200">
          {/* Active Period Dates & Clarity Banner */}
          <div className="ggt-3d-stagger rounded-2xl bg-[#071429] text-[#f5ede0] border border-[#d1a847]/65 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#d1a847]">
                {selectedPeriodTab === 'regular' ? copy.periodRegularTab : copy.periodSpecialTab} ·{' '}
                {selectedPeriodTab === 'regular' ? copy.periodRegularDates : copy.periodSpecialDates}
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                {selectedPeriodTab === 'regular' ? copy.periodRegularNote : copy.periodSpecialNote}
              </p>
            </div>
            <div className="text-xs text-[#fceda2] font-semibold shrink-0 max-w-sm">
              {copy.usdCurrencyNotice}
            </div>
          </div>

          {/* Responsive Desktop Pricing Table */}
          <div className="ggt-3d-stagger hidden md:block rounded-2xl overflow-hidden bg-[#fcf9f2] border border-[#d1a847]/60 shadow-[0_18px_42px_rgba(11,29,58,0.08)]">
            <table className="w-full text-left rtl:text-right border-collapse">
              <thead>
                <tr className="bg-[#0b1d3a] text-[#fceda2] text-xs uppercase tracking-[0.12em]">
                  <th className="py-4 px-5 font-semibold">{copy.hotelColLabel}</th>
                  <th className="py-4 px-5 font-semibold">{copy.doubleColLabel}</th>
                  <th className="py-4 px-5 font-semibold">{copy.tripleColLabel}</th>
                  <th className="py-4 px-5 font-semibold">{copy.singleSuppColLabel}</th>
                  <th className="py-4 px-5 font-semibold text-right rtl:text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d1a847]/30 text-sm">
                {CAIRO_HOTELS.map((hotel) => {
                  const rates = hotel[selectedPeriodTab];
                  const isSelected = selectedHotelId === hotel.id;
                  return (
                    <tr
                      key={hotel.id}
                      className={isSelected ? 'bg-[#ede1ce]/55' : 'hover:bg-[#f5ede0]/60 transition-colors'}
                    >
                      <td className="py-4 px-5">
                        <div className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                          {hotel.name[lang]}
                        </div>
                        <div className="text-xs text-[#9a7220] font-semibold mt-0.5">
                          {hotel.categoryLabel[lang]}
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <button
                          type="button"
                          onClick={() => handleSelectHotelAndJump(hotel.id, selectedPeriodTab, 'double')}
                          className="font-serif-crest text-xl font-bold text-[#0b1d3a] hover:text-[#9a7220] tabular-nums cursor-pointer"
                        >
                          {rates.double} USD
                        </button>
                      </td>
                      <td className="py-4 px-5">
                        <button
                          type="button"
                          onClick={() => handleSelectHotelAndJump(hotel.id, selectedPeriodTab, 'triple')}
                          className="font-serif-crest text-xl font-bold text-[#0b1d3a] hover:text-[#9a7220] tabular-nums cursor-pointer"
                        >
                          {rates.triple} USD
                        </button>
                      </td>
                      <td className="py-4 px-5">
                        <div className="font-semibold text-[#9a7220] tabular-nums">
                          +{rates.singleSupplement} USD
                        </div>
                        <div className="text-[11px] text-[#2c405e]">{copy.singleSuppColLabel}</div>
                      </td>
                      <td className="py-4 px-5 text-right rtl:text-left">
                        <button
                          type="button"
                          onClick={() => handleSelectHotelAndJump(hotel.id, selectedPeriodTab)}
                          className={`ggt-card-3d-select inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847]'
                              : 'bg-[#ede1ce] hover:bg-[#0b1d3a] text-[#0b1d3a] hover:text-[#fceda2] border border-[#d1a847]/65'
                          }`}
                        >
                          {isSelected ? copy.selectedHotelBtn : copy.selectHotelBtn}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Pricing Stack */}
          <div className="ggt-3d-stagger grid grid-cols-1 gap-4 md:hidden">
            {CAIRO_HOTELS.map((hotel) => {
              const rates = hotel[selectedPeriodTab];
              const isSelected = selectedHotelId === hotel.id;
              return (
                <div
                  key={hotel.id}
                  className={`rounded-2xl bg-[#fcf9f2] p-5 space-y-4 shadow-sm ${
                    isSelected ? 'border-2 border-[#0b1d3a]' : 'border border-[#d1a847]/55'
                  }`}
                >
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-[#9a7220] font-semibold">
                      {hotel.categoryLabel[lang]}
                    </div>
                    <h3 className="font-serif-crest text-xl font-semibold text-[#0b1d3a] mt-0.5">
                      {hotel.name[lang]}
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="rounded-xl bg-[#f5ede0] border border-[#d1a847]/40 p-3">
                      <div className="text-[10px] uppercase tracking-wider text-[#2c405e] font-semibold">
                        {copy.doubleColLabel}
                      </div>
                      <div className="font-serif-crest text-lg font-bold text-[#0b1d3a] tabular-nums mt-0.5">
                        {rates.double} USD
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#f5ede0] border border-[#d1a847]/40 p-3">
                      <div className="text-[10px] uppercase tracking-wider text-[#2c405e] font-semibold">
                        {copy.tripleColLabel}
                      </div>
                      <div className="font-serif-crest text-lg font-bold text-[#0b1d3a] tabular-nums mt-0.5">
                        {rates.triple} USD
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#ede1ce]/80 border border-[#d1a847]/50 p-3">
                      <div className="text-[10px] uppercase tracking-wider text-[#9a7220] font-semibold">
                        {copy.singleSuppColLabel}
                      </div>
                      <div className="font-semibold text-base text-[#9a7220] tabular-nums mt-0.5">
                        +{rates.singleSupplement} USD
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectHotelAndJump(hotel.id, selectedPeriodTab)}
                    className={`ggt-card-3d-select w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer ${
                      isSelected
                        ? 'bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847]'
                        : 'bg-[#ede1ce] text-[#0b1d3a] border border-[#d1a847]'
                    }`}
                  >
                    {isSelected ? copy.selectedHotelBtn : copy.selectHotelBtn}
                  </button>
                </div>
              );
            })}
          </div>
          </div>

          <div className="rounded-xl bg-[#ede1ce]/70 border border-[#d1a847]/45 px-4 py-3 flex items-start gap-2.5 text-xs text-[#0b1d3a]">
            <Info className="w-4 h-4 text-[#9a7220] shrink-0 mt-0.5" />
            <span>{copy.singleSuppExplain}</span>
          </div>
        </section>

        <div className="ggt-cairo-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* D. Included in the Price ("Le prix comprend") — Exact 9 Items */}
        <section className="space-y-6">
          <div className="ggt-cairo-heading-3d space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.inclusionsEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-4xl font-semibold text-[#0b1d3a]">
              {copy.inclusionsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e]">{copy.inclusionsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {copy.inclusions.map((item, idx) => {
              const Icon = INCLUSION_ICONS[item.key];
              return (
                <div
                  key={item.key}
                  className="ggt-cairo-card-3d rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/50 p-5 shadow-[0_12px_28px_rgba(11,29,58,0.06)] space-y-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="w-10 h-10 rounded-xl bg-[#0b1d3a] text-[#d1a847] border border-[#d1a847]/55 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9a7220] tabular-nums">
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* E. Not Included ("Le prix ne comprend pas") — Strong Flights Exclusion Clarity */}
        <section className="rounded-2xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847]/70 p-6 sm:p-8 space-y-6 shadow-[0_22px_50px_rgba(4,12,28,0.28)]">
          <div className="space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#d1a847] font-semibold">
              {copy.exclusionsEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#fcf9f2]">
              {copy.exclusionsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">{copy.exclusionsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {copy.exclusions.map((excl) => (
              <div
                key={excl.key}
                className={`rounded-xl p-5 space-y-2.5 ${
                  excl.highlightFlights
                    ? 'bg-amber-950/65 border-2 border-amber-400/75'
                    : 'bg-[#0b1d3a] border border-[#d1a847]/45'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {excl.highlightFlights ? (
                    <Plane className="w-5 h-5 text-amber-300 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-[#d1a847] shrink-0" />
                  )}
                  <h3
                    className={`font-serif-crest text-lg font-semibold ${
                      excl.highlightFlights ? 'text-amber-200' : 'text-[#fceda2]'
                    }`}
                  >
                    {excl.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{excl.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* F. Booking Conditions & Supplements */}
        <section className="space-y-6">
          <div className="ggt-cairo-heading-3d space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.conditionsEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-4xl font-semibold text-[#0b1d3a]">
              {copy.conditionsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e]">{copy.conditionsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {copy.conditions.map((cond, idx) => (
              <div
                key={cond.id}
                className="ggt-cairo-card-3d rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/55 p-6 space-y-2.5 shadow-[0_12px_30px_rgba(11,29,58,0.06)]"
              >
                <div className="flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#9a7220]">
                  <span>{cond.title}</span>
                  <span className="tabular-nums">0{idx + 1}</span>
                </div>
                <div className="font-serif-crest text-xl font-semibold text-[#0b1d3a] tabular-nums">
                  {cond.emphasisValue}
                </div>
                <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">{cond.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="ggt-cairo-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* G. Reservation & Direct WhatsApp Inquiry Section */}
        <section ref={formSectionRef} id="cairo-inquiry-form" className="scroll-mt-28 space-y-6">
          <div className="ggt-cairo-heading-3d space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.formEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-4xl font-semibold text-[#0b1d3a]">
              {copy.formTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">{copy.formSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-8">
              {inquiryReady ? (
                <div
                  ref={inquiryReadyCardRef}
                  className="rounded-2xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] p-6 sm:p-8 space-y-5 shadow-xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-serif-crest text-2xl font-semibold text-[#fceda2]">
                      {copy.summaryReadyTitle}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setInquiryReady(false)}
                      className="text-xs font-semibold uppercase tracking-wider text-[#fceda2] hover:underline cursor-pointer"
                    >
                      {copy.editBtn}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div className="ggt-3d-stagger p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                      <div className="text-slate-400">{copy.departDateLabel}</div>
                      <div className="font-semibold text-white mt-0.5 tabular-nums">
                        {departDate}
                        {returnDate ? ` → ${returnDate}` : ''}
                      </div>
                    </div>
                    <div className="ggt-3d-stagger p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                      <div className="text-slate-400">{copy.hotelChoiceLabel}</div>
                      <div className="font-semibold text-white mt-0.5">{selectedHotel.name[lang]}</div>
                    </div>
                    <div className="ggt-3d-stagger p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                      <div className="text-slate-400">{copy.occupancyChoiceLabel}</div>
                      <div className="font-semibold text-white mt-0.5">
                        {selectedOccupancy === 'double'
                          ? copy.occupancyDoubleLabel
                          : copy.occupancyTripleLabel}
                        {includeSingleSupplement ? ` (+ ${copy.singleSuppColLabel})` : ''}
                      </div>
                    </div>
                    <div className="ggt-3d-stagger p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                      <div className="text-slate-400">{copy.indicativePerPersonLabel}</div>
                      <div className="font-semibold text-[#fceda2] mt-0.5 tabular-nums">
                        {rateCalculation.perPersonPublishedSubtotalUsd !== null
                          ? `${rateCalculation.perPersonPublishedSubtotalUsd} USD / pers.`
                          : copy.outsideConfirmPriceLabel}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-amber-950/60 border border-amber-400/50 px-4 py-3 text-xs text-amber-100">
                    {copy.flightsExcludedHeadline}
                  </div>

                  <a
                    href={buildWhatsappInquiryUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ggt-btn-3d-return w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-colors"
                  >
                    <span>{copy.whatsappBtn}</span>
                    <ExternalLink className="w-4 h-4 shrink-0 ggt-forward-arrow" />
                  </a>
                </div>
              ) : (
                <form
                  onSubmit={handleInquirySubmit}
                  noValidate
                  className="rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/60 p-5 sm:p-7 space-y-6 shadow-[0_18px_42px_rgba(11,29,58,0.08)]"
                >
                  {/* Step 1: Travel Dates & Live Period Classification */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#0b1d3a]">
                      {copy.travelDatesHeading}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor={`${uid}-cairo-depart`}
                          className="block text-xs font-semibold text-[#0b1d3a] mb-1.5"
                        >
                          {copy.departDateLabel} *
                        </label>
                        <input
                          id={`${uid}-cairo-depart`}
                          type="date"
                          value={departDate}
                          onChange={(e) => setDepartDate(e.target.value)}
                          className="w-full bg-[#f5ede0]/70 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`${uid}-cairo-return`}
                          className="block text-xs font-semibold text-[#0b1d3a] mb-1.5"
                        >
                          {copy.returnDateLabel}
                        </label>
                        <input
                          id={`${uid}-cairo-return`}
                          type="date"
                          min={departDate || undefined}
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="w-full bg-[#f5ede0]/70 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                        />
                      </div>
                    </div>

                    <div
                      className={`rounded-xl px-4 py-3 text-xs flex items-start gap-2.5 ${
                        dateEval.isRangeInvalid || dateEval.classification === 'outside'
                          ? 'bg-amber-50 border border-amber-300 text-amber-950'
                          : 'bg-[#ede1ce]/70 border border-[#d1a847]/45 text-[#0b1d3a]'
                      }`}
                    >
                      <Info className="w-4 h-4 text-[#9a7220] shrink-0 mt-0.5" />
                      <span>
                        {dateEval.isRangeInvalid
                          ? copy.dateStatusMessages.invalidRange
                          : copy.dateStatusMessages[dateEval.classification]}
                      </span>
                    </div>

                    {dateEval.requiresGalaCheck && (
                      <div className="rounded-xl bg-amber-50 border border-amber-400 px-4 py-3 text-xs text-amber-950 flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <span className="font-medium">{copy.galaWarningText}</span>
                      </div>
                    )}
                  </div>

                  {/* Step 2 & 3: Hotel, Occupancy, Single Supplement Option & Travelers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`${uid}-cairo-hotel`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.hotelChoiceLabel}
                      </label>
                      <select
                        id={`${uid}-cairo-hotel`}
                        value={selectedHotelId}
                        onChange={(e) => setSelectedHotelId(e.target.value as CairoHotelId)}
                        className="w-full bg-[#f5ede0]/70 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      >
                        {CAIRO_HOTELS.map((h) => (
                          <option key={h.id} value={h.id}>
                            {h.name[lang]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor={`${uid}-cairo-occupancy`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.occupancyChoiceLabel}
                      </label>
                      <select
                        id={`${uid}-cairo-occupancy`}
                        value={selectedOccupancy}
                        onChange={(e) =>
                          setSelectedOccupancy(e.target.value as CairoOccupancyId)
                        }
                        className="w-full bg-[#f5ede0]/70 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      >
                        <option value="triple">{copy.occupancyTripleLabel}</option>
                        <option value="double">{copy.occupancyDoubleLabel}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                    <div>
                      <label
                        htmlFor={`${uid}-cairo-travelers`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.travelersCountLabel}
                      </label>
                      <input
                        id={`${uid}-cairo-travelers`}
                        type="number"
                        min={1}
                        max={60}
                        value={travelersCount}
                        onChange={(e) =>
                          setTravelersCount(Math.max(1, Math.min(60, Number(e.target.value) || 1)))
                        }
                        className="w-full bg-[#f5ede0]/70 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] tabular-nums focus:outline-none focus:border-[#0b1d3a]"
                      />
                      <div className="mt-1.5 text-[11px] font-semibold text-[#9a7220]">
                        {travelersCount >= CAIRO_TOUR_PRICING.minGroupPaxForBaseRates
                          ? copy.groupTierMin20Badge
                          : travelersCount >= 2
                          ? copy.groupTierSmallBadge
                          : copy.groupTierSoloNote}
                      </div>
                    </div>

                    <div className="rounded-xl bg-[#f5ede0]/80 border border-[#d1a847]/50 p-3.5 space-y-1.5">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeSingleSupplement}
                          onChange={(e) => setIncludeSingleSupplement(e.target.checked)}
                          className="mt-0.5 rounded border-[#d1a847] text-[#0b1d3a]"
                        />
                        <span className="text-xs font-semibold text-[#0b1d3a]">
                          {copy.singleSupplementToggleLabel}
                        </span>
                      </label>
                      <p className="text-[11px] text-[#2c405e] leading-snug ps-6">
                        {copy.singleSupplementToggleHint}
                      </p>
                    </div>
                  </div>

                  {/* Contact Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`${uid}-cairo-name`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.nameLabel} *
                      </label>
                      <input
                        id={`${uid}-cairo-name`}
                        type="text"
                        maxLength={120}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={copy.namePlaceholder}
                        className="w-full bg-[#f5ede0]/70 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`${uid}-cairo-phone`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.phoneLabel} *
                      </label>
                      <input
                        id={`${uid}-cairo-phone`}
                        type="tel"
                        maxLength={40}
                        dir="ltr"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={copy.phonePlaceholder}
                        className="w-full bg-[#f5ede0]/70 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`${uid}-cairo-notes`}
                      className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                    >
                      {copy.notesLabel}
                    </label>
                    <textarea
                      id={`${uid}-cairo-notes`}
                      rows={2}
                      maxLength={320}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={copy.notesPlaceholder}
                      className="w-full bg-[#f5ede0]/70 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
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
                      <span>{copy.submitBtn}</span>
                      <ArrowRight className={`w-4 h-4 text-[#d1a847] ggt-forward-arrow ${isRtl ? 'rotate-180' : ''}`} />
                    </button>
                    <p className="text-[11px] text-[#2c405e] leading-relaxed">
                      {copy.noAutoConfirmDisclaimer}
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Right Sidebar: Transparent Live Breakdown & Direct Salé Advisor */}
            <aside className="lg:col-span-4 space-y-5">
              {/* Published Rate Breakdown Box */}
              <div
                ref={estimateBoxRef}
                className="rounded-2xl bg-[#0b1d3a] text-[#f5ede0] border border-[#d1a847]/65 p-5 sm:p-6 space-y-4 shadow-[0_18px_42px_rgba(4,12,28,0.25)]"
              >
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                    {selectedHotel.name[lang]}
                  </div>
                  <h3 className="font-serif-crest text-xl font-semibold text-[#fcf9f2]">
                    {copy.estimateSummaryHeading}
                  </h3>
                </div>

                {rateCalculation.canEstimate && rateCalculation.baseRateUsd !== null ? (
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#d1a847]/25">
                      <span className="text-slate-300">{copy.baseRateLineLabel}</span>
                      <span className="font-semibold text-[#fcf9f2] tabular-nums">
                        {rateCalculation.baseRateUsd} USD
                      </span>
                    </div>

                    {includeSingleSupplement && (
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#d1a847]/25">
                        <span className="text-slate-300">{copy.singleSupplementLineLabel}</span>
                        <span className="font-semibold text-[#fceda2] tabular-nums">
                          +{rateCalculation.singleSupplementUsd} USD
                        </span>
                      </div>
                    )}

                    {rateCalculation.smallGroupUsd !== null && rateCalculation.smallGroupUsd > 0 && (
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#d1a847]/25">
                        <span className="text-slate-300">{copy.smallGroupLineLabel}</span>
                        <span className="font-semibold text-[#fceda2] tabular-nums">
                          +{rateCalculation.smallGroupUsd} USD
                        </span>
                      </div>
                    )}

                    <div className="pt-1">
                      <div className="text-[11px] text-slate-400">{copy.indicativePerPersonLabel}</div>
                      <div className="font-serif-crest text-2xl font-bold text-[#fceda2] tabular-nums mt-0.5">
                        {rateCalculation.perPersonPublishedSubtotalUsd !== null
                          ? `${rateCalculation.perPersonPublishedSubtotalUsd} USD`
                          : copy.groupTierSoloNote}
                      </div>
                    </div>

                    {rateCalculation.groupSubtotalUsd !== null && (
                      <div className="rounded-xl bg-[#071429] border border-[#d1a847]/45 p-3 flex items-center justify-between gap-2">
                        <span className="text-slate-300">
                          {copy.indicativeGroupTotalLabel} ({travelersCount})
                        </span>
                        <span className="font-serif-crest text-lg font-bold text-[#fceda2] tabular-nums">
                          {rateCalculation.groupSubtotalUsd} USD
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded-xl bg-amber-950/60 border border-amber-400/50 p-3.5 text-xs text-amber-100">
                    {copy.outsideConfirmPriceLabel}
                  </div>
                )}

                <div className="rounded-xl bg-[#071429]/90 border border-[#d1a847]/35 p-3 space-y-1 text-[11px]">
                  <div className="font-semibold text-[#d1a847]">{copy.unpricedFeesLineLabel}</div>
                  <div className="text-slate-300 leading-relaxed">{copy.unpricedFeesValue}</div>
                </div>
              </div>

              {/* Salé Agency Flight Add-on & Phone Card */}
              <div className="rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/60 p-5 sm:p-6 space-y-4 shadow-sm">
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                    {copy.advisorCardLabel}
                  </div>
                  <h4 className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                    {copy.advisorCardTitle}
                  </h4>
                </div>

                <div className="space-y-2.5">
                  <a
                    href={buildDirectFlightAddonWhatsappUrl()}
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
                    <span>Google Maps · Salé</span>
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Bottom Return Navigation */}
        <div className="ggt-cairo-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
          <Link
            to={CAIRO_TOUR_TOURS_ROUTE}
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
