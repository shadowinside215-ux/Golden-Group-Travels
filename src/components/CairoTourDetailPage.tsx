import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertCircle,
  AlertTriangle,
  BedDouble,
  Building2,
  Calendar,
  Car,
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
  Users
} from 'lucide-react';
import { Language } from '../assets/destinations';
import { HERO_CATEGORY_ICONS } from './ServiceIcons';
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
  const pricingSectionRef = useRef<HTMLElement>(null);
  const optionsSectionRef = useRef<HTMLElement>(null);
  const formSectionRef = useRef<HTMLElement>(null);
  const periodTablistRef = useRef<HTMLDivElement>(null);
  const periodIndicatorRef = useRef<HTMLSpanElement>(null);
  const periodTableRef = useRef<HTMLDivElement>(null);
  const periodSwitchTimelineRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  const hotelTablistRef = useRef<HTMLDivElement>(null);
  const hotelIndicatorRef = useRef<HTMLSpanElement>(null);
  const hotelPanelRef = useRef<HTMLDivElement>(null);
  const hotelSwitchTimelineRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  const estimateBoxRef = useRef<HTMLDivElement>(null);
  const inquiryReadyCardRef = useRef<HTMLDivElement>(null);
  const estimateMountedRef = useRef(false);
  const location = useLocation();
  const uid = useId();
  const copy = CAIRO_TOUR_COPY[lang];
  const ToursHeroIcon = HERO_CATEGORY_ICONS.tours;

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

  useSlidingTabIndicator(periodTablistRef, periodIndicatorRef, selectedPeriodTab, [lang, isRtl]);
  useSlidingTabIndicator(hotelTablistRef, hotelIndicatorRef, selectedHotelId, [lang, isRtl]);

  useReplayable3DPanel(periodTableRef, selectedPeriodTab, {
    duration: 0.44,
    staggerEach: 0.04,
    yOffset: 10,
    rotateXDeg: 3
  });

  useReplayable3DPanel(hotelPanelRef, `${selectedHotelId}-${selectedPeriodTab}`, {
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
      if (hotelSwitchTimelineRef.current) {
        hotelSwitchTimelineRef.current.kill();
        hotelSwitchTimelineRef.current = null;
      }
    };
  }, []);

  const handlePeriodSwitch = (period: CairoPricingPeriodId) => {
    if (period === selectedPeriodTab) return;
    switchTabWithTimeline({
      outgoingEl: periodTableRef.current,
      timelineRef: periodSwitchTimelineRef,
      onSwap: () => {
        setSelectedPeriodTab(period);
      }
    });
  };

  const handleHotelSwitch = (hotelId: CairoHotelId) => {
    if (hotelId === selectedHotelId) return;
    switchTabWithTimeline({
      outgoingEl: hotelPanelRef.current,
      timelineRef: hotelSwitchTimelineRef,
      onSwap: () => {
        setSelectedHotelId(hotelId);
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

  // Standardized 3D Window Pop-Out Bidirectional GSAP ScrollTrigger Animations
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

  const handleTableCellSelect = (
    hotelId: CairoHotelId,
    occupancy: CairoOccupancyId
  ) => {
    if (hotelId !== selectedHotelId) {
      handleHotelSwitch(hotelId);
    }
    setSelectedOccupancy(occupancy);
    setInquiryReady(false);
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
        : rateCalculation.isSoloUnpublished &&
          dateEval.classification !== 'outside' &&
          !dateEval.isRangeInvalid
        ? copy.groupTierSoloNote
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
    <div
      ref={pageRootRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#ede1ce] text-[#0b1d3a]"
    >
      <ProgramTopBar
        backRoute={CAIRO_TOUR_TOURS_ROUTE}
        backToCategoryLabel={copy.backToToursLabel}
        backToHomeLabel={copy.backToHomeLabel}
        rightBadgeLabel={copy.badgeDirectAgency}
        rightBadgeIcon={ShieldCheck}
        isRtl={isRtl}
      />

      {/* SECTION 1: STANDARDIZED HERO */}
      <ProgramHero
        heroIcon={ToursHeroIcon}
        eyebrow={copy.heroEyebrow}
        title={copy.frenchTitle}
        arabicTitle={copy.arabicTitle}
        summary={copy.heroTagline}
        infoBoxes={[
          {
            label: copy.overviewTitle,
            value: copy.destination,
            icon: MapPin,
            highlight: true
          },
          {
            label: copy.heroEyebrow,
            value: copy.duration,
            icon: Calendar
          }
        ]}
        startingFromLabel={copy.startingFromLabel}
        startingPriceDisplay={copy.startingPriceDisplay}
        startingPriceScopeNote={`${copy.perPersonUsdNote} · ${copy.flightsExcludedHeadline}`}
        startingPriceScopeIsWarning={true}
        primaryCtaLabel={copy.pricingTitle}
        onPrimaryCta={() =>
          pricingSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        secondaryCtaLabel={copy.requestReservationCta}
        onSecondaryCta={() =>
          formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        image={CAIRO_TOUR_IMAGES.hero}
        imageAlt={`${copy.frenchTitle} — ${copy.destination}`}
        fallbackGradient={CAIRO_TOUR_IMAGES.fallbackGradient}
        imageBadgeText={copy.flightsExcludedHeadline}
        imageBadgeIcon={Plane}
        imageBadgeIsWarning={true}
        isRtl={isRtl}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-14">
        {/* SECTION 2: OVERVIEW & KEY FACTS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
          <div className="lg:col-span-7 space-y-5">
            <ProgramSectionHeading
              eyebrow={copy.overviewEyebrow}
              title={copy.overviewTitle}
              subtitle={copy.overviewLead}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {copy.overviewFacts.map((fact, idx) => (
                <div
                  key={idx}
                  className="ggt-prog-card rounded-2xl bg-[#fcf9f2] border-2 border-[#d1a847]/55 px-4 py-3.5 shadow-sm"
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

            <div className="rounded-xl bg-[#fcf9f2] border border-[#d1a847]/55 px-4 py-3 flex items-start gap-2.5 text-xs text-[#0b1d3a]">
              <Info className="w-4 h-4 text-[#9a7220] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{copy.overviewNote}</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              className="ggt-prog-media rounded-2xl overflow-hidden border-2 border-[#d1a847]/65 shadow-[0_22px_50px_rgba(11,29,58,0.14)] aspect-[4/3]"
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

        <ProgramDivider />

        {/* SECTION 3: OFFICIAL USD PRICING COMPARISON TABLE */}
        <section ref={pricingSectionRef} className="space-y-5 scroll-mt-28 sm:scroll-mt-36">
          <ProgramSectionHeading
            eyebrow={copy.pricingEyebrow}
            title={copy.pricingTitle}
            subtitle={copy.pricingSubtitle}
            rightSlot={
              <ProgramTabSwitcher
                tablistRef={periodTablistRef}
                indicatorRef={periodIndicatorRef}
                ariaLabel={copy.pricingTitle}
                activeId={selectedPeriodTab}
                onSelect={handlePeriodSwitch}
                options={[
                  { id: 'regular', label: copy.periodRegularTab },
                  { id: 'special', label: copy.periodSpecialTab }
                ]}
              />
            }
          />

          <div ref={periodTableRef} className="space-y-4">
            <ProgramComparisonTable>
              <thead>
                <tr className="bg-[#0b1d3a] text-[#fceda2] text-xs">
                  <th className="py-4 px-5 text-start font-semibold uppercase tracking-[0.14em]">
                    {copy.hotelColLabel}
                  </th>
                  <th className="py-4 px-4 text-center font-semibold uppercase tracking-[0.12em]">
                    {copy.doubleColLabel}
                  </th>
                  <th className="py-4 px-4 text-center font-semibold uppercase tracking-[0.12em]">
                    {copy.tripleColLabel}
                  </th>
                  <th className="py-4 px-4 text-center font-semibold uppercase tracking-[0.12em]">
                    {copy.singleSuppColLabel}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d1a847]/25">
                {CAIRO_HOTELS.map((hotel) => {
                  const rates = hotel[selectedPeriodTab];
                  const isRowActive = selectedHotelId === hotel.id;
                  return (
                    <tr
                      key={hotel.id}
                      className={isRowActive ? 'bg-[#f5ede0]/70' : 'hover:bg-[#f5ede0]/45'}
                    >
                      <td className="py-4 px-5 align-top">
                        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a7220]">
                          {hotel.categoryLabel[lang]}
                        </div>
                        <div className="font-serif-crest text-base font-bold text-[#0b1d3a] mt-0.5">
                          {hotel.name[lang]}
                        </div>
                      </td>

                      {(['double', 'triple'] as const).map((occ) => {
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
                                {rates[occ]} USD
                              </div>
                            </button>
                          </td>
                        );
                      })}

                      <td className="py-3 px-4 text-center">
                        <div className="font-serif-crest text-sm font-bold text-[#9a7220] tabular-nums">
                          +{rates.singleSupplement} USD
                        </div>
                        <div className="text-[11px] text-[#2c405e]">{copy.singleSuppColLabel}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </ProgramComparisonTable>

            <div className="rounded-xl bg-[#fcf9f2] border border-[#d1a847]/55 px-4 py-3 flex items-start gap-2.5 text-xs text-[#2c405e]">
              <Info className="w-4 h-4 text-[#9a7220] shrink-0 mt-0.5" />
              <span>{copy.usdCurrencyNotice}</span>
            </div>
          </div>
        </section>

        <ProgramDivider />

        {/* SECTION 3B: DARK INTERACTIVE HOTEL & OCCUPANCY SELECTOR PANEL */}
        <section ref={optionsSectionRef} className="space-y-6 scroll-mt-28 sm:scroll-mt-36">
          <ProgramSectionHeading
            eyebrow={copy.pricingEyebrow}
            title={copy.hotelChoiceLabel}
            subtitle={selectedPeriodTab === 'regular' ? copy.periodRegularNote : copy.periodSpecialNote}
            rightSlot={
              <ProgramTabSwitcher
                tablistRef={hotelTablistRef}
                indicatorRef={hotelIndicatorRef}
                ariaLabel={copy.hotelChoiceLabel}
                activeId={selectedHotelId}
                onSelect={handleHotelSwitch}
                options={CAIRO_HOTELS.map((h) => ({
                  id: h.id,
                  label: h.name[lang]
                }))}
              />
            }
          />

          <ProgramSelectorPanel
            panelRef={hotelPanelRef}
            eyebrow={selectedHotel.categoryLabel[lang]}
            title={selectedHotel.name[lang]}
            subtitle={`${
              selectedPeriodTab === 'regular' ? copy.periodRegularTab : copy.periodSpecialTab
            } · ${
              selectedPeriodTab === 'regular' ? copy.periodRegularDates : copy.periodSpecialDates
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProgramSelectorInfoCard
                icon={Calendar}
                label={
                  selectedPeriodTab === 'regular' ? copy.periodRegularTab : copy.periodSpecialTab
                }
                value={
                  selectedPeriodTab === 'regular'
                    ? copy.periodRegularDates
                    : copy.periodSpecialDates
                }
                subtext={
                  selectedPeriodTab === 'regular' ? copy.periodRegularNote : copy.periodSpecialNote
                }
              />

              <ProgramSelectorInfoCard
                icon={Building2}
                label={copy.singleSuppColLabel}
                value={`+${selectedHotel[selectedPeriodTab].singleSupplement} USD`}
                subtext={copy.singleSuppExplain}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ProgramSelectorChoiceCard
                title={copy.occupancyTripleLabel}
                subtitle={selectedHotel.name[lang]}
                priceDisplay={`${selectedHotel[selectedPeriodTab].triple} USD`}
                actionLabel={
                  selectedOccupancy === 'triple' ? copy.selectedHotelBtn : copy.selectHotelBtn
                }
                isSelected={selectedOccupancy === 'triple'}
                onSelect={() => setSelectedOccupancy('triple')}
                icon={BedDouble}
              />

              <ProgramSelectorChoiceCard
                title={copy.occupancyDoubleLabel}
                subtitle={selectedHotel.name[lang]}
                priceDisplay={`${selectedHotel[selectedPeriodTab].double} USD`}
                actionLabel={
                  selectedOccupancy === 'double' ? copy.selectedHotelBtn : copy.selectHotelBtn
                }
                isSelected={selectedOccupancy === 'double'}
                onSelect={() => setSelectedOccupancy('double')}
                icon={BedDouble}
              />

              <ProgramSelectorChoiceCard
                title={copy.singleSuppColLabel}
                subtitle={copy.singleSupplementToggleLabel}
                priceDisplay={`+${selectedHotel[selectedPeriodTab].singleSupplement} USD`}
                extraText={copy.singleSupplementToggleHint}
                actionLabel={copy.singleSupplementToggleLabel}
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
            title: item.title,
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
            title: `${cond.title} — ${cond.emphasisValue}`,
            detail: cond.detail
          }))}
          notesEyebrow={copy.exclusionsEyebrow}
          notesTitle={copy.unpricedFeesLineLabel}
          notes={[
            {
              key: 'flights-excl',
              icon: Plane,
              title: copy.flightsExcludedHeadline,
              detail: copy.unpricedFeesValue
            },
            {
              key: 'usd-notice',
              icon: Coins,
              title: copy.usdCurrencyNotice,
              detail: copy.singleSuppExplain
            }
          ]}
        />

        <ProgramDivider />

        {/* SECTION 6: STANDARDIZED RESERVATION INQUIRY & LIVE ESTIMATE */}
        <ProgramBookingSection
          sectionRef={formSectionRef}
          sectionId="cairo-inquiry-form"
          eyebrow={copy.formEyebrow}
          title={copy.formTitle}
          subtitle={copy.formSubtitle}
          uid={uid}
          isRtl={isRtl}
          inquiryReady={inquiryReady}
          readyCardRef={inquiryReadyCardRef}
          readyProgramTitle={copy.frenchTitle}
          readyTitle={copy.summaryReadyTitle}
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
              label: copy.occupancyChoiceLabel,
              value: `${
                selectedOccupancy === 'double'
                  ? copy.occupancyDoubleLabel
                  : copy.occupancyTripleLabel
              }${includeSingleSupplement ? ` (+ ${copy.singleSuppColLabel})` : ''}`
            },
            {
              label: copy.indicativePerPersonLabel,
              value:
                rateCalculation.perPersonPublishedSubtotalUsd !== null
                  ? `${rateCalculation.perPersonPublishedSubtotalUsd} USD / pers.`
                  : copy.outsideConfirmPriceLabel,
              accent: true
            }
          ]}
          readyAlertSlot={
            <div className="rounded-xl bg-amber-950/60 border border-amber-400/50 px-4 py-3 text-xs text-amber-100">
              {copy.flightsExcludedHeadline}
            </div>
          }
          whatsappHref={buildWhatsappInquiryUrl()}
          readyWhatsappBtn={copy.whatsappBtn}
          onSubmit={handleInquirySubmit}
          formSpecificChildren={
            <>
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#0b1d3a]">
                  {copy.travelDatesHeading}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`${uid}-cairo-depart`}
                      className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                    >
                      {copy.departDateLabel} *
                    </label>
                    <input
                      id={`${uid}-cairo-depart`}
                      type="date"
                      value={departDate}
                      onChange={(e) => setDepartDate(e.target.value)}
                      className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${uid}-cairo-return`}
                      className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                    >
                      {copy.returnDateLabel}
                    </label>
                    <input
                      id={`${uid}-cairo-return`}
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
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
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
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
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
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] tabular-nums focus:outline-none focus:border-[#0b1d3a]"
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
          noAutoConfirmNote={copy.noAutoConfirmDisclaimer}
          quoteBoxRef={estimateBoxRef}
          quoteEyebrow={selectedHotel.name[lang]}
          quoteTitle={copy.estimateSummaryHeading}
          quoteSubtitle={`${
            selectedOccupancy === 'double'
              ? copy.occupancyDoubleLabel
              : copy.occupancyTripleLabel
          } · ${travelersCount} pers.`}
          quoteBodyChildren={
            <>
              {rateCalculation.canEstimate && rateCalculation.baseRateUsd !== null ? (
                <ProgramQuoteRateBlock
                  breakdownRows={[
                    {
                      label: copy.baseRateLineLabel,
                      value: `${rateCalculation.baseRateUsd} USD`
                    },
                    ...(includeSingleSupplement
                      ? [
                          {
                            label: copy.singleSupplementLineLabel,
                            value: `+${rateCalculation.singleSupplementUsd} USD`,
                            accent: true
                          }
                        ]
                      : []),
                    ...(rateCalculation.smallGroupUsd !== null &&
                    rateCalculation.smallGroupUsd > 0
                      ? [
                          {
                            label: copy.smallGroupLineLabel,
                            value: `+${rateCalculation.smallGroupUsd} USD`,
                            accent: true
                          }
                        ]
                      : [])
                  ]}
                  perPersonLabel={copy.indicativePerPersonLabel}
                  perPersonValue={
                    rateCalculation.perPersonPublishedSubtotalUsd !== null
                      ? `${rateCalculation.perPersonPublishedSubtotalUsd} USD`
                      : copy.groupTierSoloNote
                  }
                  groupLabel={
                    rateCalculation.groupSubtotalUsd !== null
                      ? `${copy.indicativeGroupTotalLabel} (${travelersCount})`
                      : undefined
                  }
                  groupValue={
                    rateCalculation.groupSubtotalUsd !== null
                      ? `${rateCalculation.groupSubtotalUsd} USD`
                      : undefined
                  }
                />
              ) : (
                <ProgramQuoteNoticeBox text={copy.outsideConfirmPriceLabel} />
              )}

              <ProgramQuoteRecapBox
                title={copy.unpricedFeesLineLabel}
                lines={[copy.unpricedFeesValue]}
              />

              <ProgramQuoteNoticeBox text={copy.flightsExcludedHeadline} />
            </>
          }
          advisorLabel={copy.advisorCardLabel}
          advisorTitle={copy.advisorCardTitle}
          advisorWhatsappHref={buildDirectFlightAddonWhatsappUrl()}
          advisorCallLabel={copy.advisorCallLabel}
          advisorMapsLabel={lang === 'ar' ? 'خرائط جوجل · سلا' : 'Google Maps · Salé'}
          displayPhone={displayPhone}
          whatsappInternational={whatsappInternational}
          onJumpToHomePlanner={onJumpToHomePlanner}
        />

        {/* SECTION 7: RETURN NAVIGATION */}
        <ProgramBottomNav
          backRoute={CAIRO_TOUR_TOURS_ROUTE}
          backToCategoryLabel={copy.backToToursLabel}
          backToHomeLabel={copy.backToHomeLabel}
          isRtl={isRtl}
        />
      </div>
    </div>
  );
};
