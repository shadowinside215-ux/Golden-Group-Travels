import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Baby,
  BedDouble,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Handshake,
  Info,
  Luggage,
  MapPin,
  PlaneLanding,
  PlaneTakeoff,
  XCircle
} from 'lucide-react';
import { Language } from '../assets/destinations';
import { HERO_CATEGORY_ICONS } from './ServiceIcons';
import {
  EUROPE_BENELUX_BACK_ROUTE,
  EUROPE_BENELUX_CHILD_POLICIES,
  EUROPE_BENELUX_COPY,
  EUROPE_BENELUX_DEPARTURES,
  EUROPE_BENELUX_EXCLUSIONS,
  EUROPE_BENELUX_FLIGHTS,
  EUROPE_BENELUX_HOTELS,
  EUROPE_BENELUX_IMAGES,
  EUROPE_BENELUX_INCLUSIONS,
  EUROPE_BENELUX_ITINERARY_DAYS,
  EuropeDepartureId,
  EuropeRoomType
} from '../data/europeBeneluxHolidayData';
import { trackServiceSelection } from '../utils/analytics';
import {
  prefersReducedMotion,
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
  ProgramDiscrepancyBanner,
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
  ProgramQuoteRateBlock
} from './programs/ProgramBookingSection';

gsap.registerPlugin(ScrollTrigger);

interface EuropeBeneluxHolidayDetailPageProps {
  lang: Language;
  isRtl: boolean;
  whatsappInternational: string;
  displayPhone: string;
  onJumpToHomePlanner: () => void;
}

export const EuropeBeneluxHolidayDetailPage: React.FC<
  EuropeBeneluxHolidayDetailPageProps
> = ({
  lang,
  isRtl,
  whatsappInternational,
  displayPhone,
  onJumpToHomePlanner
}) => {
  const uid = useId();
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);
  const pricingSectionRef = useRef<HTMLElement>(null);
  const optionsSectionRef = useRef<HTMLElement>(null);
  const itinerarySectionRef = useRef<HTMLElement>(null);
  const inquirySectionRef = useRef<HTMLElement>(null);
  const depTablistRef = useRef<HTMLDivElement>(null);
  const depIndicatorRef = useRef<HTMLSpanElement>(null);
  const depPanelRef = useRef<HTMLDivElement>(null);
  const depSwitchTimelineRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  const quoteBoxRef = useRef<HTMLDivElement>(null);
  const readyCardRef = useRef<HTMLDivElement>(null);
  const quoteMountedRef = useRef(false);
  const copy = EUROPE_BENELUX_COPY[lang];
  const HolidayHeroIcon = HERO_CATEGORY_ICONS.holidays;

  const [selectedDepartureId, setSelectedDepartureId] =
    useState<EuropeDepartureId>('dec-05');
  const [selectedRoomType, setSelectedRoomType] =
    useState<EuropeRoomType>('triple');
  const [adultsCount, setAdultsCount] = useState<number>(2);
  const [childInquiryOption, setChildInquiryOption] = useState<
    'none' | 'under2' | 'from2to5' | 'from5to12'
  >('none');
  const [familyRoomInquiry, setFamilyRoomInquiry] = useState<boolean>(false);

  const [expandedDays, setExpandedDays] = useState<number[]>([1]);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [inquiryReady, setInquiryReady] = useState<boolean>(false);

  const selectedDeparture = useMemo(
    () =>
      EUROPE_BENELUX_DEPARTURES.find((d) => d.id === selectedDepartureId) ??
      EUROPE_BENELUX_DEPARTURES[0],
    [selectedDepartureId]
  );

  const adultRatePerPersonMad = selectedDeparture.pricesMad[selectedRoomType];
  const adultsSubtotalMad = adultRatePerPersonMad * adultsCount;

  const formatMad = (amount: number) => {
    const formatted = amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return lang === 'ar' ? `${formatted} درهم` : `${formatted} MAD`;
  };

  const roomLabel = (room: EuropeRoomType) => {
    if (room === 'triple') return copy.roomTypeTriple;
    if (room === 'double') return copy.roomTypeDouble;
    return copy.roomTypeSingle;
  };

  const childInquiryLabel = (
    opt: 'none' | 'under2' | 'from2to5' | 'from5to12'
  ) => {
    if (opt === 'under2') return copy.formChildUnder2;
    if (opt === 'from2to5') return copy.formChild2To5;
    if (opt === 'from5to12') return copy.formChild5To12;
    return copy.formChildNone;
  };

  useEffect(() => {
    trackServiceSelection('holidays_selected');
  }, []);

  useEffect(() => {
    setFormErrors([]);
  }, [lang]);

  useEffect(() => {
    if (location.hash === '#paris-benelux-inquiry') {
      const timer = window.setTimeout(() => {
        inquirySectionRef.current?.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start'
        });
      }, 220);
      return () => window.clearTimeout(timer);
    }
  }, [location.hash]);

  useSlidingTabIndicator(depTablistRef, depIndicatorRef, selectedDepartureId, [lang, isRtl]);

  useReplayable3DPanel(depPanelRef, selectedDepartureId, {
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
  }, [
    selectedDepartureId,
    selectedRoomType,
    adultsCount,
    childInquiryOption,
    familyRoomInquiry
  ]);

  useEffect(() => {
    return () => {
      if (depSwitchTimelineRef.current) {
        depSwitchTimelineRef.current.kill();
        depSwitchTimelineRef.current = null;
      }
    };
  }, []);

  // Standardized 3D Window Pop-Out Bidirectional GSAP ScrollTrigger Animations
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    return setupWindowPopScroll3D(root, {
      headings: '.ggt-prog-heading',
      cards: '.ggt-prog-card',
      dividers: '.ggt-prog-divider',
      media: '.ggt-prog-media',
      refreshDelayMs: 180
    });
  }, [lang]);

  const handleDepartureSwitch = (depId: EuropeDepartureId) => {
    if (depId === selectedDepartureId) return;
    switchTabWithTimeline({
      outgoingEl: depPanelRef.current,
      timelineRef: depSwitchTimelineRef,
      onSwap: () => {
        setSelectedDepartureId(depId);
      }
    });
  };

  const handleSelectCell = (depId: EuropeDepartureId, room: EuropeRoomType) => {
    if (depId !== selectedDepartureId) {
      handleDepartureSwitch(depId);
    }
    setSelectedRoomType(room);
    setInquiryReady(false);
  };

  const toggleDay = (dayNum: number) => {
    setExpandedDays((prev) =>
      prev.includes(dayNum)
        ? prev.filter((d) => d !== dayNum)
        : [...prev, dayNum]
    );
  };

  const expandAllDays = () => {
    setExpandedDays(EUROPE_BENELUX_ITINERARY_DAYS.map((d) => d.day));
  };

  const collapseAllDays = () => {
    setExpandedDays([]);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];
    if (!fullName.trim()) errors.push(copy.errorName);
    if (!phone.trim() || phone.replace(/\D/g, '').length < 6)
      errors.push(copy.errorPhone);

    if (errors.length > 0) {
      setFormErrors(errors);
      setInquiryReady(false);
      return;
    }

    setFormErrors([]);
    setInquiryReady(true);
  };

  const buildWhatsappInquiryUrl = () => {
    const lines = [
      `*Golden Group Travels — Demande : ${copy.showcaseTitle} (${copy.showcaseArabicTitle})*`,
      `• Programme : 7 jours / 6 nuits — Départ Casablanca (${copy.showcaseCollaboration})`,
      `• Dates souhaitées : ${selectedDeparture.departureDate} → ${selectedDeparture.returnDate}`,
      `• Type de chambre : ${roomLabel(selectedRoomType)}`,
      `• Adultes : ${adultsCount} — Tarif vérifié : ${formatMad(adultRatePerPersonMad)} / personne (Sous-total adultes : ${formatMad(adultsSubtotalMad)})`,
      `• Note aérien / bagages : Air Arabia (tarifs) vs Royal Air Maroc (inclus) & bagages 23 kg / 10 kg à confirmer`,
      childInquiryOption !== 'none'
        ? `• Option enfant demandée : ${childInquiryLabel(childInquiryOption)}`
        : null,
      familyRoomInquiry
        ? '• Demande complémentaire : Disponibilité & tarif Chambre Familiale (4 personnes)'
        : null,
      `• Nom : ${fullName.trim()}`,
      `• Téléphone : ${phone.trim()}`,
      notes.trim() ? `• Notes : ${notes.trim()}` : null,
      'Merci de confirmer la disponibilité réelle des vols, des hôtels et la compagnie aérienne retenue.'
    ].filter(Boolean);

    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;
  };

  const buildAdvisorWhatsappUrl = () => {
    const msg = `Bonjour Golden Group Travels, je souhaite des renseignements et confirmer les vols pour "${copy.showcaseTitle}" (départ ${selectedDeparture.departureDate}, chambre ${roomLabel(selectedRoomType)}).`;
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div
      ref={pageRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#ede1ce] text-[#0b1d3a]"
    >
      <ProgramTopBar
        backRoute={EUROPE_BENELUX_BACK_ROUTE}
        backToCategoryLabel={copy.backToSejours}
        backToHomeLabel={copy.backToHome}
        rightBadgeLabel={copy.heroCollaborationBadge}
        rightBadgeIcon={Handshake}
        isRtl={isRtl}
      />

      {/* SECTION 1: STANDARDIZED HERO */}
      <ProgramHero
        heroIcon={HolidayHeroIcon}
        eyebrow={copy.heroEyebrow}
        title={copy.showcaseTitle}
        arabicTitle={copy.showcaseArabicTitle}
        summary={copy.showcaseDescription}
        infoBoxes={[
          {
            label: copy.showcaseDepartureLabel,
            value: copy.destinationsStripLabel,
            icon: MapPin,
            highlight: true
          },
          {
            label: copy.heroEyebrow,
            value: copy.heroDurationBadge,
            icon: Calendar
          }
        ]}
        startingFromLabel={copy.showcaseStartingFromLabel}
        startingPriceDisplay={copy.showcaseStartingPrice}
        startingPriceScopeNote={copy.heroStartingScope}
        primaryCtaLabel={copy.heroCtaReserve}
        onPrimaryCta={() =>
          inquirySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        secondaryCtaLabel={copy.heroCtaItinerary}
        onSecondaryCta={() =>
          itinerarySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        image={EUROPE_BENELUX_IMAGES.hero}
        imageAlt={`${copy.showcaseTitle} — ${copy.destinationsStripLabel}`}
        fallbackGradient={EUROPE_BENELUX_IMAGES.fallbackGradient}
        imageBadgeText={copy.showcaseDepartureLabel}
        imageBadgeIcon={PlaneTakeoff}
        imageBadgeIsWarning={false}
        isRtl={isRtl}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-14">
        {/* SECTION 2: MANDATORY AIRLINE & BAGGAGE DISCREPANCY NOTICE */}
        <ProgramDiscrepancyBanner
          heading={copy.airlineDiscrepancyTitle}
          explanation={copy.airlineDiscrepancyBody}
        />

        <ProgramDivider />

        {/* SECTION 3: EXACT PRICING & DEPARTURE MATRIX */}
        <section ref={pricingSectionRef} className="space-y-6 scroll-mt-28 sm:scroll-mt-36">
          <ProgramSectionHeading
            eyebrow={copy.pricingEyebrow}
            title={copy.pricingTitle}
            subtitle={copy.pricingSubtitle}
          />

          <ProgramComparisonTable>
            <thead>
              <tr className="bg-[#0b1d3a] text-[#fceda2] text-xs">
                <th className="py-4 px-5 text-start font-semibold uppercase tracking-[0.14em]">
                  {copy.colDeparture} → {copy.colReturn}
                </th>
                <th className="py-4 px-4 text-center font-semibold uppercase tracking-[0.12em]">
                  {copy.colTriple}
                </th>
                <th className="py-4 px-4 text-center font-semibold uppercase tracking-[0.12em]">
                  {copy.colDouble}
                </th>
                <th className="py-4 px-4 text-center font-semibold uppercase tracking-[0.12em]">
                  {copy.colSingle}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d1a847]/25">
              {EUROPE_BENELUX_DEPARTURES.map((dep) => {
                const isActiveRow = dep.id === selectedDepartureId;
                return (
                  <tr
                    key={dep.id}
                    className={isActiveRow ? 'bg-[#f5ede0]/70' : 'hover:bg-[#f5ede0]/45'}
                  >
                    <td className="py-4 px-5 align-top">
                      <div className="flex flex-wrap items-center gap-2 font-serif-crest text-base font-bold text-[#0b1d3a] tabular-nums">
                        <Calendar className="w-4 h-4 text-[#c59b38] shrink-0" />
                        <span>
                          {dep.departureDate} → {dep.returnDate}
                        </span>
                      </div>
                      {dep.isStartingPricePeriod && (
                        <span className="mt-1 inline-block px-2 py-0.5 rounded bg-[#0b1d3a] text-[#fceda2] text-[10px] font-bold uppercase tracking-wider">
                          {copy.showcaseStartingFromLabel}
                        </span>
                      )}
                    </td>

                    {(['triple', 'double', 'single'] as const).map((roomKey) => {
                      const isSelectedCell =
                        dep.id === selectedDepartureId && selectedRoomType === roomKey;
                      return (
                        <td key={roomKey} className="py-3 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleSelectCell(dep.id, roomKey)}
                            className={`ggt-card-3d-select w-full py-2.5 px-3 rounded-xl border transition-all cursor-pointer ${
                              isSelectedCell
                                ? 'bg-[#0b1d3a] text-[#fceda2] border-[#d1a847] shadow-sm font-bold'
                                : 'bg-white hover:bg-[#ede1ce] text-[#0b1d3a] border-[#d1a847]/45 font-semibold'
                            }`}
                          >
                            <div className="font-serif-crest text-base tabular-nums">
                              {formatMad(dep.pricesMad[roomKey])}
                            </div>
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </ProgramComparisonTable>

          <p className="text-xs text-[#2c405e]">{copy.selectRoomHint}</p>
        </section>

        <ProgramDivider />

        {/* SECTION 3B: DARK INTERACTIVE DEPARTURE & ROOM SELECTOR PANEL */}
        <section ref={optionsSectionRef} className="space-y-6 scroll-mt-28 sm:scroll-mt-36">
          <ProgramSectionHeading
            eyebrow={copy.pricingEyebrow}
            title={copy.formDepartureLabel}
            subtitle={copy.pricingSubtitle}
            rightSlot={
              <ProgramTabSwitcher
                tablistRef={depTablistRef}
                indicatorRef={depIndicatorRef}
                ariaLabel={copy.formDepartureLabel}
                activeId={selectedDepartureId}
                onSelect={handleDepartureSwitch}
                options={EUROPE_BENELUX_DEPARTURES.map((dep) => ({
                  id: dep.id,
                  label: `${dep.departureDate} → ${dep.returnDate}`,
                  mobileLabel: dep.departureDate
                }))}
              />
            }
          />

          <ProgramSelectorPanel
            panelRef={depPanelRef}
            eyebrow={copy.quoteSelectedDates}
            title={`${selectedDeparture.departureDate} → ${selectedDeparture.returnDate}`}
            subtitle={copy.destinationsStripLabel}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProgramSelectorInfoCard
                icon={Calendar}
                label={`${copy.colDeparture} → ${copy.colReturn}`}
                value={`${selectedDeparture.departureDate} → ${selectedDeparture.returnDate}`}
                subtext={copy.showcaseDepartureLabel}
                badge={
                  selectedDeparture.isStartingPricePeriod ? (
                    <span className="px-2.5 py-1 rounded-md bg-emerald-950/90 text-emerald-200 border border-emerald-500/45 text-[11px] font-bold">
                      {copy.showcaseStartingFromLabel}
                    </span>
                  ) : undefined
                }
              />

              <ProgramSelectorInfoCard
                icon={PlaneTakeoff}
                label={copy.heroDurationBadge}
                value={copy.flightsColTitle}
                warningText={copy.flightsAirlinePendingLine}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(['triple', 'double', 'single'] as const).map((roomKey) => {
                const isSelected = selectedRoomType === roomKey;
                const actionSelected =
                  lang === 'ar'
                    ? 'غرفة مختارة'
                    : lang === 'en'
                    ? 'Selected room'
                    : lang === 'es'
                    ? 'Habitación elegida'
                    : 'Chambre sélectionnée';
                const actionSelect =
                  lang === 'ar'
                    ? 'اختيار هذه الغرفة'
                    : lang === 'en'
                    ? 'Select this room'
                    : lang === 'es'
                    ? 'Elegir habitación'
                    : 'Choisir cette chambre';
                return (
                  <ProgramSelectorChoiceCard
                    key={roomKey}
                    title={roomLabel(roomKey)}
                    subtitle={`${selectedDeparture.departureDate} → ${selectedDeparture.returnDate}`}
                    priceDisplay={formatMad(selectedDeparture.pricesMad[roomKey])}
                    actionLabel={isSelected ? actionSelected : actionSelect}
                    isSelected={isSelected}
                    onSelect={() => setSelectedRoomType(roomKey)}
                    icon={BedDouble}
                  />
                );
              })}
            </div>
          </ProgramSelectorPanel>
        </section>

        <ProgramDivider />

        {/* SECTION 4: HOTELS (6 NIGHTS) & FLIGHT SCHEDULES */}
        <section className="space-y-6">
          <ProgramSectionHeading
            eyebrow={copy.hotelsFlightsEyebrow}
            title={copy.hotelsFlightsTitle}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="ggt-prog-card lg:col-span-7 rounded-2xl bg-[#fcf9f2] border-2 border-[#d1a847]/65 p-5 sm:p-6 space-y-5 shadow-[0_14px_34px_rgba(11,29,58,0.06)]">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#d1a847]/30">
                <div className="flex items-center gap-2 font-serif-crest text-xl font-semibold text-[#0b1d3a]">
                  <Building2 className="w-5 h-5 text-[#c59b38]" />
                  <span>{copy.hotelsColTitle}</span>
                </div>
                <span className="px-3 py-1 rounded-lg bg-[#0b1d3a] text-[#fceda2] text-xs font-bold tabular-nums">
                  {copy.totalSixNightsBadge}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {EUROPE_BENELUX_HOTELS.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="rounded-xl overflow-hidden bg-[#f5ede0]/70 border border-[#d1a847]/45 flex flex-col"
                  >
                    <div
                      className="h-28 overflow-hidden relative"
                      style={{ background: EUROPE_BENELUX_IMAGES.fallbackGradient }}
                    >
                      <img
                        src={hotel.image}
                        alt={`${hotel.hotelName} — ${hotel.city[lang]}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-[#071429]/90 border border-[#d1a847]/60 text-[10px] font-bold uppercase tracking-wider text-[#fceda2]">
                        {hotel.nightsLabel[lang]}
                      </span>
                    </div>
                    <div className="p-3.5 space-y-1 flex-1">
                      <div className="text-[11px] uppercase tracking-[0.16em] text-[#9a7220] font-bold">
                        {hotel.city[lang]}
                      </div>
                      <div className="font-serif-crest text-sm font-semibold text-[#0b1d3a] leading-snug">
                        {hotel.hotelName}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ggt-prog-card lg:col-span-5 rounded-2xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847]/70 p-5 sm:p-6 space-y-4 flex flex-col justify-between shadow-[0_18px_42px_rgba(4,12,28,0.22)]">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#d1a847]/30">
                  <div className="flex items-center gap-2 font-serif-crest text-xl font-semibold text-[#fcf9f2]">
                    <Clock className="w-5 h-5 text-[#d1a847]" />
                    <span>{copy.flightsColTitle}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {EUROPE_BENELUX_FLIGHTS.map((leg) => (
                    <div
                      key={leg.id}
                      className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/45 p-4 space-y-2"
                    >
                      <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#d1a847] font-semibold">
                        {leg.id === 'outbound' ? (
                          <PlaneTakeoff className="w-3.5 h-3.5" />
                        ) : (
                          <PlaneLanding className="w-3.5 h-3.5" />
                        )}
                        <span>{leg.direction[lang]}</span>
                      </div>
                      <div
                        dir="ltr"
                        className="flex items-center justify-between gap-3 text-sm sm:text-base font-bold text-[#fcf9f2] tabular-nums"
                      >
                        <div>
                          <span className="text-[#fceda2]">{leg.fromCode}</span>{' '}
                          <span className="text-xs font-normal text-slate-300">
                            ({leg.fromCity[lang]})
                          </span>
                          <div className="text-lg font-serif-crest text-[#fceda2]">
                            {leg.departureTime}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#d1a847] shrink-0" />
                        <div className="text-right">
                          <span className="text-[#fceda2]">{leg.toCode}</span>{' '}
                          <span className="text-xs font-normal text-slate-300">
                            ({leg.toCity[lang]})
                          </span>
                          <div className="text-lg font-serif-crest text-[#fceda2]">
                            {leg.arrivalTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 rounded-xl bg-amber-950/60 border border-amber-400/50 p-3.5 text-xs text-amber-100">
                <div className="font-bold text-amber-200 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{copy.flightsSubjectNotice}</span>
                </div>
                <p className="leading-relaxed">{copy.flightsAirlinePendingLine}</p>
                <div className="flex items-start gap-2 pt-1 border-t border-amber-400/30">
                  <Luggage className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>{copy.flightsBaggagePendingLine}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProgramDivider />

        {/* SECTION 5: INTERACTIVE EXPANDABLE 7-DAY ITINERARY (NO IMAGES) */}
        <section
          ref={itinerarySectionRef}
          id="paris-benelux-itinerary"
          className="space-y-6 scroll-mt-28 sm:scroll-mt-36"
        >
          <ProgramSectionHeading
            eyebrow={copy.itineraryEyebrow}
            title={copy.itineraryTitle}
            subtitle={copy.itinerarySubtitle}
            rightSlot={
              <div className="flex items-center gap-2 shrink-0 self-start lg:self-auto">
                <button
                  type="button"
                  onClick={expandAllDays}
                  className="px-4 min-h-[40px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/60 text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  {copy.expandAllLabel}
                </button>
                <button
                  type="button"
                  onClick={collapseAllDays}
                  className="px-4 min-h-[40px] rounded-xl bg-[#fcf9f2] hover:bg-[#ede1ce] text-[#0b1d3a] border border-[#d1a847]/55 text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  {copy.collapseAllLabel}
                </button>
              </div>
            }
          />

          <div className="space-y-4">
            {EUROPE_BENELUX_ITINERARY_DAYS.map((dayItem) => {
              const isOpen = expandedDays.includes(dayItem.day);
              return (
                <article
                  key={dayItem.day}
                  className={`ggt-prog-card rounded-2xl overflow-hidden bg-[#fcf9f2] border transition-all duration-200 ${
                    isOpen
                      ? 'border-2 border-[#d1a847] shadow-[0_16px_38px_rgba(11,29,58,0.1)]'
                      : 'border-[#d1a847]/50 hover:border-[#c59b38]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleDay(dayItem.day)}
                    aria-expanded={isOpen}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-start cursor-pointer hover:bg-[#f5ede0]/60 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      <span className="w-12 h-12 rounded-xl bg-[#0b1d3a] border border-[#d1a847] text-[#fceda2] flex flex-col items-center justify-center shrink-0 shadow-sm">
                        <span className="text-[9px] uppercase tracking-wider text-[#d1a847] font-bold">
                          {copy.dayPrefix}
                        </span>
                        <span className="font-serif-crest text-lg font-bold leading-none tabular-nums">
                          0{dayItem.day}
                        </span>
                      </span>
                      <div className="min-w-0 space-y-1">
                        <div className="text-[11px] uppercase tracking-[0.16em] text-[#9a7220] font-bold">
                          {dayItem.routeBadge[lang]}
                        </div>
                        <h3 className="font-serif-crest text-base sm:text-xl font-semibold text-[#0b1d3a] leading-snug">
                          {dayItem.title[lang]}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={`w-9 h-9 rounded-full border border-[#d1a847]/55 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'bg-[#0b1d3a] text-[#fceda2] rotate-180'
                          : 'bg-[#f5ede0] text-[#0b1d3a]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="animate-search-panel-in border-t border-[#d1a847]/30 bg-[#fcf9f2] p-5 sm:p-6 space-y-4">
                      <ul className="space-y-2.5">
                        {dayItem.highlights[lang].map((point, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0b1d3a] leading-relaxed"
                          >
                            <Check className="w-4 h-4 text-[#c59b38] shrink-0 mt-1" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {dayItem.notice && (
                        <div className="rounded-xl bg-[#ede1ce]/80 border border-[#d1a847]/55 px-4 py-2.5 flex items-start gap-2.5 text-xs text-[#0b1d3a]">
                          <AlertCircle className="w-4 h-4 text-[#9a7220] shrink-0 mt-0.5" />
                          <span>{dayItem.notice[lang]}</span>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <ProgramDivider />

        {/* SECTION 6: STANDARDIZED INCLUSIONS & EXCLUSIONS */}
        <ProgramInclusionsSection
          eyebrow={copy.inclusionsEyebrow}
          title={copy.inclusionsTitle}
          subtitle={copy.priceIncludesHeading}
          columnsClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          items={EUROPE_BENELUX_INCLUSIONS[lang].map((item, idx) => ({
            key: `eur-inc-${idx}`,
            icon: Check,
            title: copy.priceIncludesHeading,
            detail: item
          }))}
          calloutTitle={copy.priceExcludesHeading}
          calloutItems={EUROPE_BENELUX_EXCLUSIONS[lang]}
          calloutIcon={XCircle}
        />

        <ProgramDivider />

        {/* SECTION 7: STANDARDIZED CONDITIONS & IMPORTANT NOTES */}

        <ProgramConditionsNotesGrid
          conditionsEyebrow={copy.childPolicyEyebrow}
          conditionsTitle={copy.childPolicyTitle}
          conditions={EUROPE_BENELUX_CHILD_POLICIES.map((pol) => ({
            key: `eur-pol-${pol.id}`,
            icon: Baby,
            title: `${pol.ageBracket[lang]} — ${pol.rateBadge[lang]}`,
            detail: pol.details[lang]
          }))}
          notesEyebrow={copy.hotelsFlightsEyebrow}
          notesTitle={copy.flightsSubjectNotice}
          notes={[
            {
              key: 'airline-pending',
              icon: AlertTriangle,
              title: copy.airlineDiscrepancyTitle,
              detail: copy.flightsAirlinePendingLine
            },
            {
              key: 'baggage-pending',
              icon: Luggage,
              title: copy.flightsColTitle,
              detail: copy.flightsBaggagePendingLine
            },
            {
              key: 'child-disclaimer',
              icon: Info,
              title: copy.quotePendingBlockTitle,
              detail: copy.childPolicyDisclaimer
            }
          ]}
        />

        <ProgramDivider />

        {/* SECTION 8: STANDARDIZED WHATSAPP RESERVATION INQUIRY & LIVE SUMMARY */}
        <ProgramBookingSection
          sectionRef={inquirySectionRef}
          sectionId="paris-benelux-inquiry"
          eyebrow={copy.inquiryEyebrow}
          title={copy.inquiryTitle}
          subtitle={copy.inquirySubtitle}
          uid={uid}
          isRtl={isRtl}
          inquiryReady={inquiryReady}
          readyCardRef={readyCardRef}
          readyProgramTitle={copy.showcaseTitle}
          readyTitle={copy.submittedTitle}
          readySubtitle={copy.submittedBody}
          readyEditBtn={copy.submittedNewBtn}
          onEditInquiry={() => setInquiryReady(false)}
          readySummaryItems={[
            {
              label: copy.formDepartureLabel,
              value: `${selectedDeparture.departureDate} → ${selectedDeparture.returnDate}`
            },
            {
              label: copy.formRoomLabel,
              value: `${roomLabel(selectedRoomType)} · ${adultsCount} ${copy.formAdultsLabel}`,
              accent: true
            },
            {
              label: copy.quoteVerifiedAdultsTotal,
              value: `${formatMad(adultRatePerPersonMad)} / pers. · ${formatMad(adultsSubtotalMad)}`,
              accent: true
            },
            {
              label: copy.formChildInquiryLabel,
              value: `${childInquiryLabel(childInquiryOption)}${
                familyRoomInquiry ? ` · ${copy.formFamilyRoomCheck}` : ''
              }`
            }
          ]}
          whatsappHref={buildWhatsappInquiryUrl()}
          readyWhatsappBtn={copy.openWhatsappAgain}
          onSubmit={handleSubmitInquiry}
          formSpecificChildren={
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`${uid}-eur-dep`}
                    className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                  >
                    {copy.formDepartureLabel}
                  </label>
                  <select
                    id={`${uid}-eur-dep`}
                    value={selectedDepartureId}
                    onChange={(e) =>
                      handleSelectCell(
                        e.target.value as EuropeDepartureId,
                        selectedRoomType
                      )
                    }
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                  >
                    {EUROPE_BENELUX_DEPARTURES.map((dep) => (
                      <option key={dep.id} value={dep.id}>
                        {dep.departureDate} → {dep.returnDate}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={`${uid}-eur-room`}
                    className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                  >
                    {copy.formRoomLabel}
                  </label>
                  <select
                    id={`${uid}-eur-room`}
                    value={selectedRoomType}
                    onChange={(e) =>
                      handleSelectCell(
                        selectedDepartureId,
                        e.target.value as EuropeRoomType
                      )
                    }
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                  >
                    <option value="triple">
                      {copy.roomTypeTriple} —{' '}
                      {formatMad(selectedDeparture.pricesMad.triple)}
                    </option>
                    <option value="double">
                      {copy.roomTypeDouble} —{' '}
                      {formatMad(selectedDeparture.pricesMad.double)}
                    </option>
                    <option value="single">
                      {copy.roomTypeSingle} —{' '}
                      {formatMad(selectedDeparture.pricesMad.single)}
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`${uid}-eur-adults`}
                    className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                  >
                    {copy.formAdultsLabel}
                  </label>
                  <input
                    id={`${uid}-eur-adults`}
                    type="number"
                    min={1}
                    max={20}
                    value={adultsCount}
                    onChange={(e) =>
                      setAdultsCount(
                        Math.max(1, Math.min(20, Number(e.target.value) || 1))
                      )
                    }
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] tabular-nums focus:outline-none focus:border-[#0b1d3a]"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`${uid}-eur-child`}
                    className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                  >
                    {copy.formChildInquiryLabel}
                  </label>
                  <select
                    id={`${uid}-eur-child`}
                    value={childInquiryOption}
                    onChange={(e) =>
                      setChildInquiryOption(
                        e.target.value as
                          | 'none'
                          | 'under2'
                          | 'from2to5'
                          | 'from5to12'
                      )
                    }
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                  >
                    <option value="none">{copy.formChildNone}</option>
                    <option value="under2">{copy.formChildUnder2}</option>
                    <option value="from2to5">{copy.formChild2To5}</option>
                    <option value="from5to12">{copy.formChild5To12}</option>
                  </select>
                </div>
              </div>

              <div className="rounded-xl bg-[#f5ede0]/80 border border-[#d1a847]/50 p-4 space-y-1.5">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={familyRoomInquiry}
                    onChange={(e) => setFamilyRoomInquiry(e.target.checked)}
                    className="mt-0.5 rounded border-[#d1a847] text-[#0b1d3a]"
                  />
                  <span className="text-xs font-bold text-[#0b1d3a]">
                    {copy.formFamilyRoomCheck}
                  </span>
                </label>
                <p className="text-[11px] text-[#2c405e] leading-snug ps-6">
                  {copy.formFamilyRoomHint}
                </p>
              </div>
            </>
          }
          fullName={fullName}
          onFullNameChange={setFullName}
          nameLabel={copy.formNameLabel}
          namePlaceholder={copy.formNamePlaceholder}
          phone={phone}
          onPhoneChange={setPhone}
          phoneLabel={copy.formPhoneLabel}
          phonePlaceholder={copy.formPhonePlaceholder}
          notes={notes}
          onNotesChange={setNotes}
          notesLabel={copy.formNotesLabel}
          notesPlaceholder={copy.formNotesPlaceholder}
          formErrors={formErrors}
          submitBtnLabel={copy.formSubmitBtn}
          noAutoConfirmNote={copy.formNoAutoConfirm}
          quoteBoxRef={quoteBoxRef}
          quoteEyebrow={copy.quoteBoxEyebrow}
          quoteTitle={copy.quoteBoxTitle}
          quoteSubtitle={`${selectedDeparture.departureDate} → ${selectedDeparture.returnDate} · ${roomLabel(selectedRoomType)}`}
          quoteBodyChildren={
            <>
              <ProgramQuoteRateBlock
                perPersonLabel={copy.quoteVerifiedPerPerson}
                perPersonValue={formatMad(adultRatePerPersonMad)}
                groupLabel={`${copy.quoteVerifiedAdultsTotal} (${adultsCount})`}
                groupValue={formatMad(adultsSubtotalMad)}
              />

              {(childInquiryOption !== 'none' || familyRoomInquiry) && (
                <ProgramQuoteNoticeBox
                  title={copy.quotePendingBlockTitle}
                  text={[
                    childInquiryOption !== 'none'
                      ? childInquiryLabel(childInquiryOption)
                      : '',
                    familyRoomInquiry ? copy.formFamilyRoomCheck : ''
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                />
              )}

              <ProgramQuoteNoticeBox text={copy.quoteNoAutoChildDiscountNote} variant="neutral" />
            </>
          }
          advisorLabel={copy.advisorLabel}
          advisorTitle={copy.advisorTitle}
          advisorWhatsappHref={buildAdvisorWhatsappUrl()}
          advisorCallLabel={copy.advisorCallLabel}
          advisorMapsLabel={copy.advisorMapsLabel}
          displayPhone={displayPhone}
          whatsappInternational={whatsappInternational}
          onJumpToHomePlanner={onJumpToHomePlanner}
        />

        {/* SECTION 9: BOTTOM RETURN LINKS */}
        <ProgramBottomNav
          backRoute={EUROPE_BENELUX_BACK_ROUTE}
          backToCategoryLabel={copy.backToSejours}
          backToHomeLabel={copy.backToHome}
          isRtl={isRtl}
        />
      </div>
    </div>
  );
};
