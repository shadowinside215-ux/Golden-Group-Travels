import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BedDouble,
  Building2,
  Calendar,
  Car,
  Check,
  Coffee,
  Coins,
  Compass,
  FileCheck2,
  Info,
  Landmark,
  MapPin,
  Plane,
  ShieldCheck,
  Ship,
  Sun,
  Users
} from 'lucide-react';
import { Language } from '../assets/destinations';
import { HERO_CATEGORY_ICONS } from './ServiceIcons';
import {
  GRAND_EGYPT_COPY,
  GRAND_EGYPT_HOTELS,
  GRAND_EGYPT_PRICING_META,
  GRAND_EGYPT_TOUR_IMAGES,
  GRAND_EGYPT_TOURS_BACK_ROUTE,
  GrandEgyptHotelId,
  GrandEgyptInclusionItem,
  GrandEgyptOccupancyId,
  evaluateGrandEgyptDates
} from '../data/grandEgyptTourData';
import { trackServiceSelection } from '../utils/analytics';
import {
  pulseSelection3D,
  setupWindowPopScroll3D,
  switchTabWithTimeline,
  useReplayable3DPanel,
  useSlidingTabIndicator
} from '../utils/tab3DMotion';
import {
  ProgramBottomNav,
  ProgramComparisonTable,
  ProgramConditionsNotesGrid,
  ProgramDivider,
  ProgramHero,
  ProgramInclusionsSection,
  ProgramSectionHeading,
  ProgramSelectorChoiceCard,
  ProgramSelectorInfoCard,
  ProgramSelectorPanel,
  ProgramTabSwitcher,
  ProgramTopBar
} from './programs/ProgramDetailPrimitives';
import {
  ProgramBookingSection,
  ProgramQuoteNoticeBox,
  ProgramQuoteRateBlock,
  ProgramQuoteRecapBox
} from './programs/ProgramBookingSection';

gsap.registerPlugin(ScrollTrigger);

interface GrandEgyptTourDetailPageProps {
  lang: Language;
  isRtl: boolean;
  whatsappInternational: string;
  displayPhone: string;
  onJumpToHomePlanner: () => void;
}

const INCLUSION_ICONS: Record<GrandEgyptInclusionItem['key'], React.FC<{ className?: string }>> = {
  visa: FileCheck2,
  cairoStay: BedDouble,
  nileCruise: Ship,
  hurghadaStay: Sun,
  pyramidsGem: Landmark,
  islamicCairo: Compass,
  dinnerCruise: Ship,
  arrivalBreakfast: Coffee,
  cruiseExcursions: Compass,
  luxorHurghadaTransfer: Car,
  airportAssistance: Users,
  tips: Coins,
  domesticFlights: Plane,
  guide: Users
};

export const GrandEgyptTourDetailPage: React.FC<GrandEgyptTourDetailPageProps> = ({
  lang,
  isRtl,
  whatsappInternational,
  displayPhone,
  onJumpToHomePlanner
}) => {
  const pageRootRef = useRef<HTMLDivElement>(null);
  const pricingSectionRef = useRef<HTMLElement>(null);
  const optionsSectionRef = useRef<HTMLElement>(null);
  const formSectionRef = useRef<HTMLElement>(null);
  const hotelTablistRef = useRef<HTMLDivElement>(null);
  const hotelIndicatorRef = useRef<HTMLSpanElement>(null);
  const hotelPanelRef = useRef<HTMLDivElement>(null);
  const hotelSwitchTimelineRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  const quoteBoxRef = useRef<HTMLDivElement>(null);
  const inquiryReadyCardRef = useRef<HTMLDivElement>(null);
  const quoteMountedRef = useRef(false);
  const location = useLocation();
  const uid = useId();
  const copy = GRAND_EGYPT_COPY[lang];
  const ToursHeroIcon = HERO_CATEGORY_ICONS.tours;

  const [selectedHotelId, setSelectedHotelId] = useState<GrandEgyptHotelId>('triumph-plaza');
  const [selectedOccupancy, setSelectedOccupancy] = useState<GrandEgyptOccupancyId>('triple');
  const [includeSingleSupplement, setIncludeSingleSupplement] = useState(false);

  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelersCount, setTravelersCount] = useState<number>(20);
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

  useSlidingTabIndicator(hotelTablistRef, hotelIndicatorRef, selectedHotelId, [lang, isRtl]);

  useReplayable3DPanel(hotelPanelRef, selectedHotelId, {
    duration: 0.45,
    staggerEach: 0.04,
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
  }, [selectedHotelId, selectedOccupancy, includeSingleSupplement, travelersCount]);

  useEffect(() => {
    return () => {
      if (hotelSwitchTimelineRef.current) {
        hotelSwitchTimelineRef.current.kill();
        hotelSwitchTimelineRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (location.hash === '#grand-egypt-inquiry-form' && formSectionRef.current) {
      const id = window.setTimeout(() => {
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
      return () => window.clearTimeout(id);
    }
  }, [location.hash]);

  const dateEval = useMemo(
    () => evaluateGrandEgyptDates(departDate, returnDate),
    [departDate, returnDate]
  );

  const selectedHotel = useMemo(
    () => GRAND_EGYPT_HOTELS.find((h) => h.id === selectedHotelId) ?? GRAND_EGYPT_HOTELS[0],
    [selectedHotelId]
  );

  const pricingEligibility = useMemo(() => {
    const isExcludedOrOutside =
      dateEval.status === 'excluded_special' ||
      dateEval.status === 'outside' ||
      dateEval.status === 'invalid_range';
    const isGroupAtLeast20 = travelersCount >= GRAND_EGYPT_PRICING_META.minGroupPax;

    if (isExcludedOrOutside) {
      return {
        canQuotePublishedFare: false as const,
        reason: 'date_on_request' as const,
        baseUsd: null,
        singleSuppUsd: null
      };
    }

    if (!isGroupAtLeast20) {
      return {
        canQuotePublishedFare: false as const,
        reason: 'under_20_unpriced' as const,
        baseUsd: null,
        singleSuppUsd: null
      };
    }

    const baseUsd =
      selectedOccupancy === 'double'
        ? selectedHotel.doubleUsd
        : selectedHotel.tripleUsd;

    return {
      canQuotePublishedFare: true as const,
      reason: 'regular_eligible' as const,
      baseUsd,
      singleSuppUsd: includeSingleSupplement ? selectedHotel.singleSupplementUsd : 0
    };
  }, [dateEval.status, travelersCount, selectedHotel, selectedOccupancy, includeSingleSupplement]);

  // Standardized 3D Window Pop-Out ScrollTrigger animations
  useEffect(() => {
    const root = pageRootRef.current;
    if (!root) return;
    return setupWindowPopScroll3D(root, {
      dividers: '.ggt-prog-divider',
      headings: '.ggt-prog-heading',
      cards: '.ggt-prog-card',
      media: '.ggt-prog-media',
      refreshDelayMs: 180
    });
  }, [lang]);

  const handleHotelSwitch = (hotelId: GrandEgyptHotelId) => {
    if (hotelId === selectedHotelId) return;
    switchTabWithTimeline({
      outgoingEl: hotelPanelRef.current,
      timelineRef: hotelSwitchTimelineRef,
      onSwap: () => {
        setSelectedHotelId(hotelId);
      }
    });
  };

  const handleTableCellSelect = (
    hotelId: GrandEgyptHotelId,
    occupancy: GrandEgyptOccupancyId
  ) => {
    if (hotelId !== selectedHotelId) {
      handleHotelSwitch(hotelId);
    }
    setSelectedOccupancy(occupancy);
    setInquiryReady(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    const occLabel =
      selectedOccupancy === 'double'
        ? copy.doubleOptionLabel
        : copy.tripleOptionLabel;

    let priceLine = copy.onRequestLine;
    if (pricingEligibility.canQuotePublishedFare) {
      priceLine = `${pricingEligibility.baseUsd} USD / personne (base 20+ pers., période standard)${
        includeSingleSupplement
          ? ` + Supplément single ${pricingEligibility.singleSuppUsd} USD`
          : ''
      }`;
    } else if (pricingEligibility.reason === 'under_20_unpriced') {
      priceLine = copy.under20UnpricedLine;
    }

    const lines = [
      'Bonjour Golden Group Travels,',
      `Je souhaite vérifier la disponibilité et recevoir un devis final pour : ${copy.frenchFullTitle} (${copy.arabicTitle}) — ${copy.durationLabel}.`,
      `• Date de départ souhaitée : ${departDate}${returnDate ? ` (retour souhaité : ${returnDate})` : ''}`,
      `• Nombre de voyageurs : ${travelersCount}`,
      `• Hôtel choisi au Caire (5 nuits) : ${selectedHotel.name.fr}`,
      `• Occupation : ${occLabel}${includeSingleSupplement ? ' + demande Supplément single' : ''}`,
      `• Tarif publié applicable : ${priceLine}`,
      `• Rappel : Vols intérieurs (Le Caire–Assouan & Hurghada–Le Caire) inclus / Vols internationaux NON inclus`,
      dateEval.requiresGalaCheck
        ? '• À vérifier : Dîner de gala obligatoire éventuel le 24 et/ou 31 décembre'
        : '',
      `• Nom complet : ${fullName.trim()}`,
      `• Téléphone / WhatsApp : ${phone.trim()}`,
      notes.trim() ? `• Précisions : ${notes.trim()}` : ''
    ].filter(Boolean);

    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const buildDirectFlightAddonWhatsappUrl = () => {
    const msg = `Bonjour Golden Group Travels, je souhaite des informations sur "${copy.frenchFullTitle}" (1 690 USD+ hors vols internationaux) et un devis séparé pour les vols internationaux vers Le Caire.`;
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div
      ref={pageRootRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#ede1ce] text-[#0b1d3a]"
    >
      <ProgramTopBar
        backRoute={GRAND_EGYPT_TOURS_BACK_ROUTE}
        backToCategoryLabel={copy.backToTours}
        backToHomeLabel={copy.backToHome}
        rightBadgeLabel={copy.heroEyebrow}
        rightBadgeIcon={ShieldCheck}
        isRtl={isRtl}
      />

      {/* SECTION 1: STANDARDIZED HERO */}
      <ProgramHero
        heroIcon={ToursHeroIcon}
        eyebrow={copy.heroEyebrow}
        title={copy.frenchFullTitle}
        arabicTitle={copy.arabicTitle}
        summary={copy.heroLead}
        infoBoxes={[
          {
            label: copy.destinationLine,
            value: copy.routeStopsLine,
            icon: MapPin,
            highlight: true
          },
          {
            label: copy.breakdownTitle,
            value: copy.durationLabel,
            icon: Calendar
          }
        ]}
        startingFromLabel={copy.startingFromLabel}
        startingPriceDisplay={copy.startingPriceDisplay}
        startingPriceScopeNote={`${copy.startingBasisNote} · ${copy.heroFlightExcludedShort}`}
        startingPriceScopeIsWarning={true}
        primaryCtaLabel={copy.pricingTitle}
        onPrimaryCta={() =>
          pricingSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        secondaryCtaLabel={copy.reserveBtn}
        onSecondaryCta={() =>
          formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        image={GRAND_EGYPT_TOUR_IMAGES.hero}
        imageAlt={`${copy.frenchFullTitle} — ${copy.routeStopsLine}`}
        fallbackGradient={GRAND_EGYPT_TOUR_IMAGES.fallbackGradient}
        imageBadgeText={copy.heroFlightIncludedShort}
        imageBadgeIcon={Plane}
        imageBadgeIsWarning={false}
        isRtl={isRtl}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-14">
        {/* SECTION 2: THREE VISUALLY CONNECTED STAGES + NIGHTS BREAKDOWN */}
        <section className="space-y-8">
          <ProgramSectionHeading
            eyebrow={copy.overviewEyebrow}
            title={copy.overviewTitle}
            subtitle={copy.overviewSubtitle}
            rightSlot={
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.14em] shrink-0 tabular-nums self-start lg:self-auto">
                <Calendar className="w-4 h-4 text-[#d1a847]" />
                <span>{copy.breakdownTotalBadge}</span>
              </div>
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            {copy.stages.map((stage, idx) => (
              <article
                key={stage.id}
                className="ggt-prog-card rounded-2xl overflow-hidden bg-[#fcf9f2] border-2 border-[#d1a847]/60 shadow-[0_18px_40px_rgba(11,29,58,0.09)] flex flex-col"
              >
                <div
                  className="ggt-prog-media relative aspect-[16/10] overflow-hidden"
                  style={{ background: GRAND_EGYPT_TOUR_IMAGES.fallbackGradient }}
                >
                  <img
                    src={stage.image}
                    alt={`${stage.destinationTitle} — ${stage.hotelOrShip}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#071429]/90 via-[#071429]/20 to-transparent"
                  />
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-2 text-[#fcf9f2]">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.2em] text-[#fceda2] font-semibold tabular-nums">
                        {stage.stepNumber} · {stage.nightsBadge}
                      </div>
                      <h3 className="font-serif-crest text-xl font-semibold mt-0.5">
                        {stage.destinationTitle}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2.5">
                    <div className="rounded-xl bg-[#ede1ce]/75 border border-[#d1a847]/45 px-3.5 py-2.5">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-[#9a7220] font-semibold">
                        {stage.boardBasis}
                      </div>
                      <div className="font-serif-crest text-base font-semibold text-[#0b1d3a] mt-0.5">
                        {stage.hotelOrShip}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
                      {stage.summary}
                    </p>
                  </div>

                  {idx < copy.stages.length - 1 && (
                    <div className="pt-2 border-t border-[#d1a847]/30 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a7220]">
                      <span>
                        {idx === 0
                          ? 'Le Caire → Assouan (Vol intérieur inclus)'
                          : 'Louxor → Hurghada (Transfert véhicule inclus)'}
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Stage Summary Bar */}
          <div className="ggt-prog-card rounded-2xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847]/65 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                {copy.breakdownEyebrow} · {copy.breakdownTitle}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
                {copy.breakdownSummaryNote}
              </p>
            </div>
            <div className="font-serif-crest text-xl font-bold text-[#fceda2] shrink-0 tabular-nums">
              5N Le Caire + 3N Nil + 3N Hurghada = 11N / 12J
            </div>
          </div>
        </section>

        <ProgramDivider />

        {/* SECTION 3: RESPONSIVE HOTEL & PRICING MATRIX */}
        <section ref={pricingSectionRef} className="space-y-6 scroll-mt-28 sm:scroll-mt-36">
          <ProgramSectionHeading
            eyebrow={copy.pricingEyebrow}
            title={copy.pricingTitle}
            subtitle={copy.pricingSubtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="ggt-prog-card rounded-2xl bg-[#0b1d3a] text-[#f5ede0] border border-[#d1a847]/65 p-4 space-y-1">
              <div className="text-[11px] uppercase tracking-[0.16em] text-[#d1a847] font-semibold">
                {copy.regularPeriodLabel}
              </div>
              <div className="font-serif-crest text-lg font-semibold text-[#fcf9f2] tabular-nums">
                {copy.regularPeriodValue}
              </div>
              <div className="text-xs text-[#fceda2] font-medium">{copy.arrivalDaysValue}</div>
            </div>

            <div className="ggt-prog-card rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/55 p-4 space-y-1">
              <div className="text-[11px] uppercase tracking-[0.16em] text-[#9a7220] font-semibold">
                {copy.arrivalDaysLabel}
              </div>
              <div className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                {copy.arrivalDaysValue}
              </div>
              <div className="text-xs text-[#2c405e]">{copy.usdDisclaimer}</div>
            </div>

            <div className="ggt-prog-card rounded-2xl bg-amber-50 border border-amber-400 p-4 space-y-1">
              <div className="text-[11px] uppercase tracking-[0.16em] text-amber-900 font-bold">
                {copy.excludedPeriodsLabel}
              </div>
              <div className="text-xs sm:text-sm font-bold text-amber-950 tabular-nums">
                {copy.excludedPeriodsValue}
              </div>
              <div className="text-xs font-semibold text-amber-900">
                {copy.excludedPeriodsActionValue}
              </div>
            </div>
          </div>

          <ProgramComparisonTable>
            <thead>
              <tr className="bg-[#0b1d3a] text-[#fceda2] text-xs">
                <th className="py-4 px-5 text-start font-semibold uppercase tracking-[0.14em]">
                  {copy.hotelCol}
                </th>
                <th className="py-4 px-4 text-center font-semibold uppercase tracking-[0.12em]">
                  {copy.doubleCol}
                </th>
                <th className="py-4 px-4 text-center font-semibold uppercase tracking-[0.12em]">
                  {copy.tripleCol}
                </th>
                <th className="py-4 px-4 text-center font-semibold uppercase tracking-[0.12em]">
                  {copy.singleSuppCol}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d1a847]/25">
              {GRAND_EGYPT_HOTELS.map((hotel) => {
                const isRowActive = selectedHotelId === hotel.id;
                return (
                  <tr
                    key={hotel.id}
                    className={isRowActive ? 'bg-[#f5ede0]/70' : 'hover:bg-[#f5ede0]/45'}
                  >
                    <td className="py-4 px-5 align-top">
                      <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a7220]">
                        {hotel.tierLabel[lang]}
                      </div>
                      <div className="font-serif-crest text-base font-bold text-[#0b1d3a] mt-0.5">
                        {hotel.name[lang]}
                      </div>
                    </td>

                    {(['double', 'triple'] as const).map((occ) => {
                      const amount = occ === 'double' ? hotel.doubleUsd : hotel.tripleUsd;
                      const isCellSelected =
                        selectedHotelId === hotel.id && selectedOccupancy === occ;
                      return (
                        <td key={occ} className="py-3 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleTableCellSelect(hotel.id, occ)}
                            className={`ggt-card-3d-select w-full py-2.5 px-3 rounded-xl border transition-all cursor-pointer ${
                              isCellSelected
                                ? 'bg-[#0b1d3a] text-[#fceda2] border-[#d1a847] shadow-sm font-bold'
                                : 'bg-white hover:bg-[#ede1ce] text-[#0b1d3a] border-[#d1a847]/45 font-semibold'
                            }`}
                          >
                            <div className="font-serif-crest text-base tabular-nums">
                              {amount.toLocaleString('fr-FR')} USD
                            </div>
                          </button>
                        </td>
                      );
                    })}

                    <td className="py-3 px-4 text-center">
                      <div className="font-serif-crest text-sm font-bold text-[#9a7220] tabular-nums">
                        +{hotel.singleSupplementUsd.toLocaleString('fr-FR')} USD
                      </div>
                      <div className="text-[11px] text-[#2c405e]">{copy.singleSuppCol}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </ProgramComparisonTable>

          <div className="rounded-xl bg-[#fcf9f2] border border-[#d1a847]/50 px-4 py-3 flex items-start gap-2.5 text-xs text-[#0b1d3a]">
            <Info className="w-4 h-4 text-[#9a7220] shrink-0 mt-0.5" />
            <span>{copy.singleSuppDisclaimer}</span>
          </div>
        </section>

        <ProgramDivider />

        {/* SECTION 3B: DARK INTERACTIVE HOTEL & OCCUPANCY SELECTOR PANEL */}
        <section ref={optionsSectionRef} className="space-y-6 scroll-mt-28 sm:scroll-mt-36">
          <ProgramSectionHeading
            eyebrow={copy.pricingEyebrow}
            title={copy.hotelChoiceLabel}
            subtitle={copy.regularPeriodValue}
            rightSlot={
              <ProgramTabSwitcher
                tablistRef={hotelTablistRef}
                indicatorRef={hotelIndicatorRef}
                ariaLabel={copy.hotelChoiceLabel}
                activeId={selectedHotelId}
                onSelect={handleHotelSwitch}
                options={GRAND_EGYPT_HOTELS.map((h) => ({
                  id: h.id,
                  label: h.name[lang]
                }))}
              />
            }
          />

          <ProgramSelectorPanel
            panelRef={hotelPanelRef}
            eyebrow={selectedHotel.tierLabel[lang]}
            title={selectedHotel.name[lang]}
            subtitle={`${copy.regularPeriodValue} · ${copy.arrivalDaysValue}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProgramSelectorInfoCard
                icon={Calendar}
                label={copy.regularPeriodLabel}
                value={copy.regularPeriodValue}
                subtext={copy.arrivalDaysValue}
                warningText={`${copy.excludedPeriodsLabel}: ${copy.excludedPeriodsValue} (${copy.excludedPeriodsActionValue})`}
              />

              <ProgramSelectorInfoCard
                icon={Building2}
                label={copy.singleSuppCol}
                value={`+${selectedHotel.singleSupplementUsd.toLocaleString('fr-FR')} USD`}
                subtext={copy.singleSuppDisclaimer}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ProgramSelectorChoiceCard
                title={copy.tripleOptionLabel}
                subtitle={selectedHotel.name[lang]}
                priceDisplay={`${selectedHotel.tripleUsd.toLocaleString('fr-FR')} USD`}
                actionLabel={
                  selectedOccupancy === 'triple' ? copy.selectedBtn : copy.selectBtn
                }
                isSelected={selectedOccupancy === 'triple'}
                onSelect={() => setSelectedOccupancy('triple')}
                icon={BedDouble}
              />

              <ProgramSelectorChoiceCard
                title={copy.doubleOptionLabel}
                subtitle={selectedHotel.name[lang]}
                priceDisplay={`${selectedHotel.doubleUsd.toLocaleString('fr-FR')} USD`}
                actionLabel={
                  selectedOccupancy === 'double' ? copy.selectedBtn : copy.selectBtn
                }
                isSelected={selectedOccupancy === 'double'}
                onSelect={() => setSelectedOccupancy('double')}
                icon={BedDouble}
              />

              <ProgramSelectorChoiceCard
                title={copy.singleSuppCol}
                subtitle={copy.singleSupplementCheckLabel}
                priceDisplay={`+${selectedHotel.singleSupplementUsd.toLocaleString('fr-FR')} USD`}
                extraText={copy.singleSupplementCheckHint}
                actionLabel={copy.singleSupplementCheckLabel}
                isSelected={includeSingleSupplement}
                onSelect={() => setIncludeSingleSupplement((prev) => !prev)}
                icon={Info}
              />
            </div>
          </ProgramSelectorPanel>
        </section>

        <ProgramDivider />

        {/* SECTION 4: INCLUDED ("Le prix comprend") & EXCLUDED CALLOUT */}
        <ProgramInclusionsSection
          eyebrow={copy.inclusionsEyebrow}
          title={copy.inclusionsTitle}
          subtitle={copy.inclusionsSubtitle}
          columnsClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          items={copy.inclusions.map((item) => ({
            key: item.key,
            icon: INCLUSION_ICONS[item.key],
            title: item.highlightBadge ? `${item.title} · ${item.highlightBadge}` : item.title,
            detail: item.detail
          }))}
          calloutTitle={copy.exclusionsTitle}
          calloutItems={copy.exclusions.map((excl) => `${excl.title} — ${excl.detail}`)}
          calloutIcon={AlertCircle}
        />

        <ProgramDivider />

        {/* SECTION 5: BOOKING CONDITIONS & IMPORTANT NOTES */}
        <ProgramConditionsNotesGrid
          conditionsEyebrow={copy.conditionsEyebrow}
          conditionsTitle={copy.conditionsTitle}
          conditions={copy.conditions.map((cond) => ({
            key: cond.id,
            icon: Info,
            title: `${cond.title} — ${cond.emphasis}`,
            detail: cond.detail
          }))}
          notesEyebrow={copy.exclusionsEyebrow}
          notesTitle={copy.domesticVsIntlBannerTitle}
          notes={[
            {
              key: 'domestic-flights',
              icon: Plane,
              title: copy.domesticSideTitle,
              detail: copy.domesticSideDetail
            },
            {
              key: 'intl-flights',
              icon: AlertTriangle,
              title: copy.internationalSideTitle,
              detail: copy.internationalSideDetail
            },
            {
              key: 'excluded-dates',
              icon: Calendar,
              title: `${copy.excludedPeriodsLabel}: ${copy.excludedPeriodsValue}`,
              detail: copy.excludedPeriodsActionValue
            }
          ]}
        />

        <ProgramDivider />

        {/* SECTION 6: STANDARDIZED RESERVATION INQUIRY */}
        <ProgramBookingSection
          sectionRef={formSectionRef}
          sectionId="grand-egypt-inquiry-form"
          eyebrow={copy.formEyebrow}
          title={copy.formTitle}
          subtitle={copy.formSubtitle}
          uid={uid}
          isRtl={isRtl}
          inquiryReady={inquiryReady}
          readyCardRef={inquiryReadyCardRef}
          readyProgramTitle={copy.frenchFullTitle}
          readyTitle={copy.readyTitle}
          readySubtitle={copy.formSubtitle}
          readyEditBtn={copy.editBtn}
          onEditInquiry={() => setInquiryReady(false)}
          readySummaryItems={[
            {
              label: copy.departDateLabel,
              value: `${departDate}${returnDate ? ` → ${returnDate}` : ''}`
            },
            {
              label: copy.hotelChoiceLabel,
              value: selectedHotel.name[lang]
            },
            {
              label: copy.occupancyLabel,
              value: `${
                selectedOccupancy === 'double'
                  ? copy.doubleOptionLabel
                  : copy.tripleOptionLabel
              }${includeSingleSupplement ? ` (+ ${copy.singleSuppCol})` : ''}`
            },
            {
              label: copy.quoteBoxTitle,
              value: pricingEligibility.canQuotePublishedFare
                ? `${pricingEligibility.baseUsd} USD / pers.`
                : pricingEligibility.reason === 'under_20_unpriced'
                ? copy.under20UnpricedLine
                : copy.onRequestLine,
              accent: true
            }
          ]}
          readyAlertSlot={
            <div className="rounded-xl bg-amber-950/60 border border-amber-400/50 px-4 py-3 text-xs text-amber-100">
              {copy.cardFlightDistinction}
            </div>
          }
          whatsappHref={buildWhatsappInquiryUrl()}
          readyWhatsappBtn={copy.whatsappBtn}
          onSubmit={handleSubmit}
          formSpecificChildren={
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`${uid}-egypt-depart`}
                    className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                  >
                    {copy.departDateLabel} *
                  </label>
                  <input
                    id={`${uid}-egypt-depart`}
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`${uid}-egypt-return`}
                    className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                  >
                    {copy.returnDateLabel}
                  </label>
                  <input
                    id={`${uid}-egypt-return`}
                    type="date"
                    min={departDate || undefined}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                  />
                </div>
              </div>

              <div
                className={`rounded-xl px-4 py-3 text-xs flex items-start gap-2.5 ${
                  dateEval.status === 'excluded_special' ||
                  dateEval.status === 'outside' ||
                  dateEval.status === 'invalid_range'
                    ? 'bg-amber-50 border border-amber-400 text-amber-950'
                    : 'bg-[#ede1ce]/70 border border-[#d1a847]/45 text-[#0b1d3a]'
                }`}
              >
                <Info className="w-4 h-4 text-[#9a7220] shrink-0 mt-0.5" />
                <span className="font-medium">{copy.dateMessages[dateEval.status]}</span>
              </div>

              {dateEval.isArrivalSaturdayOrMonday !== null && dateEval.status === 'regular' && (
                <div
                  className={`rounded-xl px-4 py-2.5 text-xs flex items-start gap-2.5 ${
                    dateEval.isArrivalSaturdayOrMonday
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-950'
                      : 'bg-amber-50 border border-amber-300 text-amber-950'
                  }`}
                >
                  {dateEval.isArrivalSaturdayOrMonday ? (
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  )}
                  <span>
                    {dateEval.isArrivalSaturdayOrMonday
                      ? copy.arrivalDayOkNote
                      : copy.arrivalDayWarningNote}
                  </span>
                </div>
              )}

              {dateEval.requiresGalaCheck && (
                <div className="rounded-xl bg-amber-50 border border-amber-400 px-4 py-3 text-xs text-amber-950 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span className="font-medium">{copy.galaWarningNote}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`${uid}-egypt-hotel`}
                    className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                  >
                    {copy.hotelChoiceLabel}
                  </label>
                  <select
                    id={`${uid}-egypt-hotel`}
                    value={selectedHotelId}
                    onChange={(e) => setSelectedHotelId(e.target.value as GrandEgyptHotelId)}
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                  >
                    {GRAND_EGYPT_HOTELS.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={`${uid}-egypt-occ`}
                    className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                  >
                    {copy.occupancyLabel}
                  </label>
                  <select
                    id={`${uid}-egypt-occ`}
                    value={selectedOccupancy}
                    onChange={(e) =>
                      setSelectedOccupancy(e.target.value as GrandEgyptOccupancyId)
                    }
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                  >
                    <option value="triple">{copy.tripleOptionLabel}</option>
                    <option value="double">{copy.doubleOptionLabel}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                <div>
                  <label
                    htmlFor={`${uid}-egypt-pax`}
                    className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                  >
                    {copy.travelersLabel}
                  </label>
                  <input
                    id={`${uid}-egypt-pax`}
                    type="number"
                    min={1}
                    max={80}
                    value={travelersCount}
                    onChange={(e) =>
                      setTravelersCount(Math.max(1, Math.min(80, Number(e.target.value) || 1)))
                    }
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] tabular-nums focus:outline-none focus:border-[#0b1d3a]"
                  />
                  <div className="mt-1.5 text-[11px] font-semibold text-[#9a7220]">
                    {travelersCount >= GRAND_EGYPT_PRICING_META.minGroupPax
                      ? copy.groupMin20Ok
                      : copy.groupUnder20Notice}
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
                      {copy.singleSupplementCheckLabel}
                    </span>
                  </label>
                  <p className="text-[11px] text-[#2c405e] leading-snug ps-6">
                    {copy.singleSupplementCheckHint}
                  </p>
                </div>
              </div>
            </>
          }
          fullName={fullName}
          onFullNameChange={setFullName}
          nameLabel={copy.nameLabel}
          namePlaceholder={copy.namePlaceholder}
          phone={phone}
          onPhoneChange={setPhone}
          phoneLabel={copy.phoneLabel}
          phonePlaceholder={copy.phonePlaceholder}
          notes={notes}
          onNotesChange={setNotes}
          notesLabel={copy.notesLabel}
          notesPlaceholder={copy.notesPlaceholder}
          formErrors={formErrors}
          submitBtnLabel={copy.submitBtn}
          noAutoConfirmNote={copy.noAutoConfirmNote}
          quoteBoxRef={quoteBoxRef}
          quoteEyebrow={selectedHotel.name[lang]}
          quoteTitle={copy.quoteBoxTitle}
          quoteSubtitle={`${
            selectedOccupancy === 'double'
              ? copy.doubleOptionLabel
              : copy.tripleOptionLabel
          } · ${travelersCount} pers.`}
          quoteBodyChildren={
            <>
              {pricingEligibility.canQuotePublishedFare ? (
                <ProgramQuoteRateBlock
                  breakdownRows={[
                    {
                      label: copy.baseFareLine,
                      value: `${pricingEligibility.baseUsd.toLocaleString('fr-FR')} USD`
                    },
                    ...(includeSingleSupplement
                      ? [
                          {
                            label: copy.singleSuppLine,
                            value: `+${pricingEligibility.singleSuppUsd} USD`,
                            accent: true
                          }
                        ]
                      : [])
                  ]}
                  perPersonLabel={copy.baseFareLine}
                  perPersonValue={`${pricingEligibility.baseUsd.toLocaleString('fr-FR')} USD`}
                />
              ) : (
                <ProgramQuoteNoticeBox
                  text={
                    pricingEligibility.reason === 'under_20_unpriced'
                      ? copy.under20UnpricedLine
                      : copy.onRequestLine
                  }
                />
              )}

              <ProgramQuoteRecapBox
                title={copy.domesticVsIntlBannerTitle}
                lines={[copy.domesticSideTitle, copy.internationalSideTitle]}
              />

              <ProgramQuoteNoticeBox text={copy.cardFlightDistinction} variant="neutral" />
            </>
          }
          advisorLabel={copy.advisorLabel}
          advisorTitle={copy.advisorTitle}
          advisorWhatsappHref={buildDirectFlightAddonWhatsappUrl()}
          advisorCallLabel={copy.callAgencyBtn}
          advisorMapsLabel={lang === 'ar' ? 'خرائط جوجل · سلا' : 'Google Maps · Salé'}
          displayPhone={displayPhone}
          whatsappInternational={whatsappInternational}
          onJumpToHomePlanner={onJumpToHomePlanner}
        />

        {/* SECTION 7: RETURN NAVIGATION */}
        <ProgramBottomNav
          backRoute={GRAND_EGYPT_TOURS_BACK_ROUTE}
          backToCategoryLabel={copy.backToTours}
          backToHomeLabel={copy.backToHome}
          isRtl={isRtl}
        />
      </div>
    </div>
  );
};
