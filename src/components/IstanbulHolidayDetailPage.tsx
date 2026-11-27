import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertTriangle,
  BedDouble,
  Briefcase,
  Building2,
  Calendar,
  Check,
  Clock,
  Info,
  Luggage,
  PlaneTakeoff,
  Sparkles
} from 'lucide-react';
import { Language } from '../assets/destinations';
import { HERO_CATEGORY_ICONS } from './ServiceIcons';
import {
  ISTANBUL_BAGGAGE_OPTIONS,
  ISTANBUL_BASE_EXCLUSIONS,
  ISTANBUL_BASE_INCLUSIONS,
  ISTANBUL_HOLIDAY_BACK_ROUTE,
  ISTANBUL_HOLIDAY_COPY,
  ISTANBUL_HOLIDAY_IMAGES,
  ISTANBUL_HOTELS,
  ISTANBUL_ITINERARY_DAYS,
  ISTANBUL_VIP_PACK_ITEMS,
  IstanbulBaggageOptionId,
  IstanbulHotelId,
  IstanbulRoomType
} from '../data/istanbulHolidayData';
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

interface IstanbulHolidayDetailPageProps {
  lang: Language;
  isRtl: boolean;
  whatsappInternational: string;
  displayPhone: string;
  onJumpToHomePlanner: () => void;
}

export const IstanbulHolidayDetailPage: React.FC<IstanbulHolidayDetailPageProps> = ({
  lang,
  isRtl,
  whatsappInternational,
  displayPhone,
  onJumpToHomePlanner
}) => {
  const pageRootRef = useRef<HTMLDivElement>(null);
  const hotelsSectionRef = useRef<HTMLElement>(null);
  const optionsSectionRef = useRef<HTMLElement>(null);
  const inquirySectionRef = useRef<HTMLElement>(null);
  const hotelTablistRef = useRef<HTMLDivElement>(null);
  const hotelIndicatorRef = useRef<HTMLSpanElement>(null);
  const hotelPanelRef = useRef<HTMLDivElement>(null);
  const hotelSwitchTimelineRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  const dayTablistRef = useRef<HTMLDivElement>(null);
  const dayIndicatorRef = useRef<HTMLSpanElement>(null);
  const dayPanelRef = useRef<HTMLDivElement>(null);
  const daySwitchTimelineRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  const quoteBoxRef = useRef<HTMLDivElement>(null);
  const readyCardRef = useRef<HTMLDivElement>(null);
  const quoteMountedRef = useRef(false);

  const location = useLocation();
  const uid = useId();
  const copy = ISTANBUL_HOLIDAY_COPY[lang];
  const HolidayHeroIcon = HERO_CATEGORY_ICONS.holidays;

  const [selectedHotelId, setSelectedHotelId] = useState<IstanbulHotelId>('delta-3');
  const [selectedRoomType, setSelectedRoomType] = useState<IstanbulRoomType>('triple');
  const [activeDayNumber, setActiveDayNumber] = useState<number>(1);
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [interestedInVip, setInterestedInVip] = useState<boolean>(false);
  const [selectedBaggageId, setSelectedBaggageId] =
    useState<IstanbulBaggageOptionId>('cabin-only');

  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [inquiryReady, setInquiryReady] = useState<boolean>(false);

  useEffect(() => {
    trackServiceSelection('holidays_selected');
  }, []);

  useEffect(() => {
    setFormErrors([]);
  }, [lang]);

  useEffect(() => {
    if (location.hash === '#istanbul-holiday-inquiry' && inquirySectionRef.current) {
      const id = window.setTimeout(() => {
        inquirySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 160);
      return () => window.clearTimeout(id);
    }
  }, [location.hash]);

  const selectedHotel = useMemo(
    () => ISTANBUL_HOTELS.find((h) => h.id === selectedHotelId) ?? ISTANBUL_HOTELS[0],
    [selectedHotelId]
  );

  const selectedBaggage = useMemo(
    () =>
      ISTANBUL_BAGGAGE_OPTIONS.find((b) => b.id === selectedBaggageId) ??
      ISTANBUL_BAGGAGE_OPTIONS[0],
    [selectedBaggageId]
  );

  const activeDay = useMemo(
    () =>
      ISTANBUL_ITINERARY_DAYS.find((d) => d.dayNumber === activeDayNumber) ??
      ISTANBUL_ITINERARY_DAYS[0],
    [activeDayNumber]
  );

  const verifiedHotelPricePerPersonMad = selectedHotel.pricesMad[selectedRoomType];
  const verifiedBaseSubtotalMad = verifiedHotelPricePerPersonMad * travelersCount;

  useSlidingTabIndicator(hotelTablistRef, hotelIndicatorRef, selectedHotelId, [lang, isRtl]);
  useSlidingTabIndicator(dayTablistRef, dayIndicatorRef, String(activeDayNumber), [lang, isRtl]);

  useReplayable3DPanel(hotelPanelRef, selectedHotelId, {
    duration: 0.45,
    staggerEach: 0.04,
    yOffset: 10,
    rotateXDeg: 3
  });

  useReplayable3DPanel(dayPanelRef, String(activeDayNumber), {
    duration: 0.44,
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
  }, [selectedHotelId, selectedRoomType, travelersCount, interestedInVip, selectedBaggageId]);

  useEffect(() => {
    return () => {
      if (hotelSwitchTimelineRef.current) {
        hotelSwitchTimelineRef.current.kill();
        hotelSwitchTimelineRef.current = null;
      }
      if (daySwitchTimelineRef.current) {
        daySwitchTimelineRef.current.kill();
        daySwitchTimelineRef.current = null;
      }
    };
  }, []);

  // Standardized 3D Window Pop-Out ScrollTrigger motion
  useEffect(() => {
    const root = pageRootRef.current;
    if (!root) return;
    return setupWindowPopScroll3D(root, {
      headings: '.ggt-prog-heading',
      cards: '.ggt-prog-card',
      dividers: '.ggt-prog-divider',
      media: '.ggt-prog-media',
      refreshDelayMs: 180
    });
  }, [lang]);

  const handleHotelSwitch = (hotelId: IstanbulHotelId) => {
    if (hotelId === selectedHotelId) return;
    switchTabWithTimeline({
      outgoingEl: hotelPanelRef.current,
      timelineRef: hotelSwitchTimelineRef,
      onSwap: () => {
        setSelectedHotelId(hotelId);
      }
    });
  };

  const handleTableCellSelect = (hotelId: IstanbulHotelId, room: IstanbulRoomType) => {
    if (hotelId !== selectedHotelId) {
      handleHotelSwitch(hotelId);
    }
    setSelectedRoomType(room);
    setInquiryReady(false);
  };

  const handleDaySelect = (dayNumber: number) => {
    if (dayNumber === activeDayNumber) return;
    switchTabWithTimeline({
      outgoingEl: dayPanelRef.current,
      timelineRef: daySwitchTimelineRef,
      onSwap: () => {
        setActiveDayNumber(dayNumber);
      }
    });
  };

  const handleDepartureSelect = (depId: 'dec-05' | 'dec-26') => {
    if (depId === 'dec-26') {
      setSelectedHotelId('ilkbal-deluxe-4');
    } else if (selectedHotelId === 'ilkbal-deluxe-4') {
      setSelectedHotelId('delta-3');
    }
  };

  const roomLabel = (rt: IstanbulRoomType) => {
    if (rt === 'triple') return copy.roomTypeTriple;
    if (rt === 'double') return copy.roomTypeDouble;
    return copy.roomTypeSingle;
  };

  const formatMad = (amount: number) => `${amount.toLocaleString('fr-FR')} DH`;

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
    const lines = [
      'Bonjour Golden Group Travels,',
      `Demande de réservation — Séjour : ${copy.heroTitle} (7 jours / 6 nuits, départ Casablanca)`,
      `• Hôtel sélectionné : ${selectedHotel.name.fr}`,
      `• Type de chambre : ${roomLabel(selectedRoomType)}`,
      `• Départ / Retour : ${selectedHotel.departureDateDisplay} → ${selectedHotel.returnDateDisplay.fr}`,
      `• Tarif base vérifié : ${formatMad(verifiedHotelPricePerPersonMad)} / personne (Sous-total ${travelersCount} voyageur(s) : ${formatMad(verifiedBaseSubtotalMad)})`,
      `• Intérêt Pack d'Istanbul VIP (1 480 DH — base tarifaire à confirmer) : ${interestedInVip ? 'Oui, intéressé(e)' : 'Non'}`,
      `• Option bagage en soute : ${selectedBaggage.label.fr}`,
      `• Nom : ${fullName.trim()}`,
      `• Téléphone : ${phone.trim()}`,
      notes.trim() ? `• Notes : ${notes.trim()}` : '',
      '(Merci de confirmer la disponibilité réelle et de clarifier les points signalés sur l’affiche.)'
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(lines)}`;
  };

  const buildAdvisorWhatsappUrl = () => {
    const msg = `Bonjour Golden Group Travels, je souhaite des renseignements et confirmer la disponibilité pour "${copy.heroTitle}" (${selectedHotel.name.fr}, ${roomLabel(selectedRoomType)}, départ ${selectedHotel.departureDateDisplay}).`;
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div
      ref={pageRootRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#ede1ce] text-[#0b1d3a]"
    >
      <ProgramTopBar
        backRoute={ISTANBUL_HOLIDAY_BACK_ROUTE}
        backToCategoryLabel={copy.backToSejours}
        backToHomeLabel={copy.backToHome}
        rightBadgeLabel={copy.heroDepartureCity}
        rightBadgeIcon={PlaneTakeoff}
        isRtl={isRtl}
      />

      {/* SECTION 1: STANDARDIZED HERO + STARTING PRICE */}
      <ProgramHero
        heroIcon={HolidayHeroIcon}
        eyebrow={copy.heroEyebrow}
        title={copy.heroTitle}
        arabicTitle={copy.heroArabicTitle}
        summary={copy.heroSubtitle}
        infoBoxes={[
          {
            label: copy.departureColLabel,
            value: '05/12/2026 & 26/12/2026',
            icon: Calendar,
            highlight: true
          },
          {
            label: copy.heroDepartureCity,
            value: '7J / 6N*',
            icon: Clock
          }
        ]}
        startingFromLabel={copy.showcaseStartingFromLabel}
        startingPriceDisplay={copy.showcaseStartingPrice}
        startingPriceScopeNote={copy.heroStartingScope}
        primaryCtaLabel={copy.heroInspectHotelsBtn}
        onPrimaryCta={() =>
          hotelsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        secondaryCtaLabel={copy.heroReserveBtn}
        onSecondaryCta={() =>
          inquirySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        image={ISTANBUL_HOLIDAY_IMAGES.hero}
        imageAlt={`${copy.heroTitle} — Istanbul`}
        fallbackGradient={ISTANBUL_HOLIDAY_IMAGES.fallbackGradient}
        imageBadgeText="Hotel Delta 3★ · Zagreb 4★ · Ilkbal Deluxe 4★"
        imageBadgeIcon={BedDouble}
        imageBadgeIsWarning={false}
        isRtl={isRtl}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-14">
        {/* SECTION 2: PACKAGE OVERVIEW & FLAGGED CONFIRMATIONS */}
        <section className="space-y-6">
          <ProgramSectionHeading
            eyebrow={copy.overviewEyebrow}
            title={copy.overviewTitle}
            subtitle={copy.overviewText}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {copy.overviewStats.map((stat, idx) => (
              <div
                key={idx}
                className="ggt-prog-card rounded-2xl bg-[#fcf9f2] border-2 border-[#d1a847]/55 p-4 sm:p-5 shadow-sm"
              >
                <div className="text-[11px] uppercase tracking-[0.14em] text-[#9a7220] font-semibold">
                  {stat.label}
                </div>
                <div className="font-serif-crest text-lg font-bold text-[#0b1d3a] mt-1">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <ProgramDiscrepancyBanner
            heading={copy.discrepanciesTitle}
            explanation={copy.discrepanciesList[0] ?? ''}
            extraContent={
              copy.discrepanciesList.length > 1 ? (
                <ul className="space-y-1.5 pt-2">
                  {copy.discrepanciesList.slice(1).map((flag, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-amber-700 mt-0.5">•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              ) : undefined
            }
          />
        </section>

        <ProgramDivider />

        {/* SECTION 3: STANDALONE CREAM PRICING COMPARISON TABLE (DH / MAD) */}
        <section ref={hotelsSectionRef} className="space-y-6 scroll-mt-28 sm:scroll-mt-36">
          <ProgramSectionHeading
            eyebrow={copy.hotelsEyebrow}
            title={copy.hotelsTitle}
            subtitle={copy.hotelsSubtitle}
          />

          <ProgramComparisonTable>
            <thead>
              <tr className="bg-[#0b1d3a] text-[#fceda2] text-xs">
                <th className="py-4 px-5 text-start font-semibold uppercase tracking-[0.14em]">
                  {copy.formHotelLabel}
                </th>
                <th className="py-4 px-4 text-center font-semibold uppercase tracking-[0.12em]">
                  {copy.departureColLabel} → {copy.returnColLabel}
                </th>
                {(['triple', 'double', 'single'] as const).map((rt) => (
                  <th
                    key={rt}
                    className="py-4 px-4 text-center font-semibold uppercase tracking-[0.12em]"
                  >
                    {roomLabel(rt)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d1a847]/25">
              {ISTANBUL_HOTELS.map((hotel) => {
                const isRowActive = hotel.id === selectedHotelId;
                return (
                  <tr
                    key={hotel.id}
                    className={isRowActive ? 'bg-[#f5ede0]/70' : 'hover:bg-[#f5ede0]/45'}
                  >
                    <td className="py-4 px-5 align-top">
                      <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a7220]">
                        {hotel.badge[lang]}
                      </div>
                      <div className="font-serif-crest text-base font-bold text-[#0b1d3a] mt-0.5">
                        {hotel.name[lang]}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center align-top text-xs tabular-nums">
                      <div className="font-semibold text-[#0b1d3a]">
                        {hotel.departureDateDisplay}
                      </div>
                      <div
                        className={`mt-0.5 font-semibold ${
                          hotel.returnDateConfirmed ? 'text-[#2c405e]' : 'text-amber-800'
                        }`}
                      >
                        → {hotel.returnDateDisplay[lang]}
                      </div>
                    </td>

                    {(['triple', 'double', 'single'] as const).map((rt) => {
                      const isCellSelected =
                        selectedHotelId === hotel.id && selectedRoomType === rt;
                      return (
                        <td key={rt} className="py-3 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleTableCellSelect(hotel.id, rt)}
                            className={`ggt-card-3d-select w-full py-2.5 px-3 rounded-xl border transition-all cursor-pointer ${
                              isCellSelected
                                ? 'bg-[#0b1d3a] text-[#fceda2] border-[#d1a847] shadow-sm font-bold'
                                : 'bg-white hover:bg-[#ede1ce] text-[#0b1d3a] border-[#d1a847]/45 font-semibold'
                            }`}
                          >
                            <div className="font-serif-crest text-base tabular-nums">
                              {formatMad(hotel.pricesMad[rt])}
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
        </section>

        <ProgramDivider />

        {/* SECTION 3B: DARK INTERACTIVE HOTEL & ROOM SELECTOR PANEL */}
        <section ref={optionsSectionRef} className="space-y-6 scroll-mt-28 sm:scroll-mt-36">
          <ProgramSectionHeading
            eyebrow={copy.hotelsEyebrow}
            title={copy.formHotelLabel}
            subtitle={copy.hotelsSubtitle}
            rightSlot={
              <ProgramTabSwitcher
                tablistRef={hotelTablistRef}
                indicatorRef={hotelIndicatorRef}
                ariaLabel={copy.formHotelLabel}
                activeId={selectedHotelId}
                onSelect={handleHotelSwitch}
                options={ISTANBUL_HOTELS.map((h) => ({
                  id: h.id,
                  label: h.name[lang]
                }))}
              />
            }
          />

          <ProgramSelectorPanel
            panelRef={hotelPanelRef}
            eyebrow={selectedHotel.badge[lang]}
            title={selectedHotel.name[lang]}
            subtitle={`${selectedHotel.departureDateDisplay} → ${selectedHotel.returnDateDisplay[lang]}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProgramSelectorInfoCard
                icon={Calendar}
                label={copy.departureColLabel}
                value={selectedHotel.departureDateDisplay}
                subtext={copy.heroDepartureCity}
              />

              <ProgramSelectorInfoCard
                icon={Building2}
                label={copy.returnColLabel}
                value={selectedHotel.returnDateDisplay[lang]}
                warningText={selectedHotel.returnDateDiscrepancyNote?.[lang]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(['triple', 'double', 'single'] as const).map((rt) => {
                const isSelected = selectedRoomType === rt;
                return (
                  <ProgramSelectorChoiceCard
                    key={rt}
                    title={roomLabel(rt)}
                    subtitle={selectedHotel.name[lang]}
                    priceDisplay={formatMad(selectedHotel.pricesMad[rt])}
                    actionLabel={
                      isSelected ? copy.selectedHotelBadge : copy.selectHotelAction
                    }
                    isSelected={isSelected}
                    onSelect={() => setSelectedRoomType(rt)}
                    icon={BedDouble}
                  />
                );
              })}
            </div>
          </ProgramSelectorPanel>
        </section>

        <ProgramDivider />

        {/* SECTION 4: INTERACTIVE 7-DAY ITINERARY (TEXT-ONLY CLEAN LAYOUT) */}
        <section className="space-y-6">
          <ProgramSectionHeading
            eyebrow={copy.itineraryEyebrow}
            title={copy.itineraryTitle}
            subtitle={copy.itinerarySubtitle}
          />

          <div
            ref={dayTablistRef}
            role="tablist"
            aria-label={copy.itineraryTitle}
            className="relative flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-2xl bg-[#071429] border border-[#d1a847]/65 shadow-md"
          >
            <span
              ref={dayIndicatorRef}
              aria-hidden="true"
              className="ggt-tab-indicator-pill rounded-xl"
            />
            {ISTANBUL_ITINERARY_DAYS.map((day) => {
              const active = day.dayNumber === activeDayNumber;
              return (
                <button
                  key={day.dayNumber}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  data-tab-active={active ? 'true' : undefined}
                  data-tab-key={String(day.dayNumber)}
                  onClick={() => handleDaySelect(day.dayNumber)}
                  className={`ggt-tab-3d relative z-10 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active ? 'text-[#fceda2]' : 'text-slate-200/80 hover:text-[#fceda2]'
                  }`}
                >
                  {day.dayCode[lang]}
                </button>
              );
            })}
          </div>

          <div
            ref={dayPanelRef}
            className="rounded-2xl overflow-hidden bg-[#fcf9f2] border-2 border-[#d1a847]/70 shadow-[0_20px_48px_rgba(11,29,58,0.1)] p-6 sm:p-8 space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#d1a847]/35">
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-[0.16em] text-[#9a7220] font-semibold">
                  {activeDay.scheduleNote[lang]}
                </div>
                <h3 className="font-serif-crest text-2xl sm:text-3xl font-bold text-[#0b1d3a]">
                  {activeDay.dayCode[lang]} — {activeDay.title[lang]}
                </h3>
              </div>
              <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#071429] border border-[#d1a847]/65 text-xs font-bold text-[#fceda2] uppercase tracking-wider shrink-0">
                <Clock className="w-3.5 h-3.5 text-[#d1a847]" />
                <span>{activeDay.dayCode[lang]}</span>
              </span>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeDay.activities[lang].map((act, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm text-[#0b1d3a] leading-relaxed"
                >
                  <Check className="w-4 h-4 text-[#c59b38] shrink-0 mt-1" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl bg-[#ede1ce]/80 border border-[#d1a847]/45 px-4 py-3 text-xs text-[#2c405e] flex items-start gap-2">
              <Info className="w-4 h-4 text-[#9a7220] shrink-0 mt-0.5" />
              <span>{copy.itineraryWeatherNote}</span>
            </div>
          </div>
        </section>

        <ProgramDivider />

        {/* SECTION 5: STANDARDIZED BASE INCLUSIONS & EXCLUSIONS */}
        <ProgramInclusionsSection
          eyebrow={copy.inclusionsEyebrow}
          title={copy.inclusionsTitle}
          subtitle={copy.inclusionsBaseHeading}
          columnsClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          items={ISTANBUL_BASE_INCLUSIONS[lang].map((item, idx) => ({
            key: `ist-inc-${idx}`,
            icon: Check,
            title: copy.inclusionsBaseHeading,
            detail: item
          }))}
          calloutTitle={copy.exclusionsBaseHeading}
          calloutItems={ISTANBUL_BASE_EXCLUSIONS[lang]}
        />

        <ProgramDivider />

        {/* SECTION 6: OPTIONAL VIP EXCURSION PACKAGE (PACK D'ISTANBUL VIP — 1,480 DH) */}
        <section className="space-y-6">
          <div className="ggt-prog-card rounded-2xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] p-6 sm:p-8 space-y-6 shadow-[0_22px_52px_rgba(7,20,41,0.22)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d1a847]/35">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{copy.vipEyebrow}</span>
                </div>
                <h2 className="font-serif-crest text-2xl sm:text-3xl font-bold text-[#fcf9f2]">
                  {copy.vipTitle}
                </h2>
              </div>

              <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847] px-5 py-3 shrink-0 self-start">
                <div className="font-serif-crest text-2xl sm:text-3xl font-bold text-[#fceda2] tabular-nums">
                  {copy.vipPriceDisplay}
                </div>
                <div className="text-[11px] text-amber-300 font-semibold mt-0.5">
                  {lang === 'ar'
                    ? 'أساس التسعير قيد التأكيد'
                    : lang === 'en'
                    ? 'Per-person basis unconfirmed'
                    : lang === 'es'
                    ? 'Base tarifaria por confirmar'
                    : 'Base tarifaire à confirmer'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="rounded-xl bg-amber-950/65 border border-amber-400/60 p-4 text-xs text-amber-100 flex items-start gap-2.5 leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>{copy.vipUnconfirmedBasisWarning}</span>
              </div>
              <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/50 p-4 text-xs text-slate-200 flex items-start gap-2.5 leading-relaxed">
                <Info className="w-4 h-4 text-[#d1a847] shrink-0 mt-0.5" />
                <span>{copy.vipTicketsWarning}</span>
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
              {ISTANBUL_VIP_PACK_ITEMS[lang].map((activity, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 rounded-xl bg-[#0b1d3a]/85 border border-[#d1a847]/30 px-3 py-2.5 text-slate-100 leading-snug"
                >
                  <Check className="w-3.5 h-3.5 text-[#d1a847] shrink-0 mt-0.5" />
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ProgramDivider />

        {/* SECTION 7: OPTIONAL BAGGAGE PRICING */}
        <section className="space-y-6">
          <ProgramSectionHeading
            eyebrow={copy.baggageEyebrow}
            title={copy.baggageTitle}
            subtitle={copy.baggageSubtitle}
            rightSlot={
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847]/55 text-xs font-bold shrink-0 self-start lg:self-auto">
                <Luggage className="w-4 h-4 text-[#d1a847]" />
                <span>{copy.baggageNotIncludedBadge}</span>
              </span>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ISTANBUL_BAGGAGE_OPTIONS.filter((b) => b.id !== 'cabin-only').map((bag) => (
              <button
                key={bag.id}
                type="button"
                aria-pressed={selectedBaggageId === bag.id}
                onClick={() => setSelectedBaggageId(bag.id)}
                className={`ggt-prog-card text-start rounded-2xl p-5 border-2 flex flex-col justify-between gap-3 transition-colors cursor-pointer ${
                  selectedBaggageId === bag.id
                    ? 'bg-[#071429] text-[#f5ede0] border-[#d1a847] shadow-lg'
                    : 'bg-[#fcf9f2] text-[#0b1d3a] border-[#d1a847]/45 hover:border-[#d1a847]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#d1a847] shrink-0" />
                    <span className="font-bold text-sm">{bag.weightKg} kg</span>
                  </div>
                  <span
                    className={`font-serif-crest text-xl font-bold tabular-nums ${
                      selectedBaggageId === bag.id ? 'text-[#fceda2]' : 'text-[#9a7220]'
                    }`}
                  >
                    {formatMad(bag.priceMad)}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-semibold leading-snug">{bag.label[lang]}</div>
                  <div
                    className={`text-[11px] leading-snug ${
                      bag.coverageConfirmed
                        ? selectedBaggageId === bag.id
                          ? 'text-slate-300'
                          : 'text-[#2c405e]'
                        : selectedBaggageId === bag.id
                        ? 'text-amber-300 font-semibold'
                        : 'text-amber-800 font-semibold'
                    }`}
                  >
                    {bag.coverageNote[lang]}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-xl bg-amber-50 border border-amber-400 px-4 py-3 text-xs text-amber-950 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>{copy.baggageAmbiguityWarning}</span>
          </div>
        </section>

        <ProgramDivider />

        {/* SECTION 8: STANDARDIZED CONDITIONS & NOTES GRID */}
        <ProgramConditionsNotesGrid
          conditionsEyebrow={copy.overviewEyebrow}
          conditionsTitle={copy.discrepanciesTitle}
          conditions={copy.discrepanciesList.map((flag, idx) => ({
            key: `ist-flag-${idx}`,
            icon: AlertTriangle,
            title: copy.discrepanciesTitle,
            detail: flag
          }))}
          notesEyebrow={copy.baggageEyebrow}
          notesTitle={copy.vipTitle}
          notes={[
            {
              key: 'vip-basis',
              icon: Sparkles,
              title: copy.vipPriceDisplay,
              detail: copy.vipUnconfirmedBasisWarning
            },
            {
              key: 'baggage-scope',
              icon: Luggage,
              title: copy.baggageNotIncludedBadge,
              detail: copy.baggageAmbiguityWarning
            },
            {
              key: 'itinerary-note',
              icon: Info,
              title: copy.itineraryTitle,
              detail: copy.itineraryWeatherNote
            }
          ]}
        />

        <ProgramDivider />

        {/* SECTION 9: STANDARDIZED RESERVATION INQUIRY */}
        <ProgramBookingSection
          sectionRef={inquirySectionRef}
          sectionId="istanbul-holiday-inquiry"
          eyebrow={copy.inquiryEyebrow}
          title={copy.inquiryTitle}
          subtitle={copy.inquirySubtitle}
          uid={uid}
          isRtl={isRtl}
          inquiryReady={inquiryReady}
          readyCardRef={readyCardRef}
          readyProgramTitle={copy.heroTitle}
          readyTitle={copy.readyTitle}
          readySubtitle={copy.readySubtitle}
          readyEditBtn={copy.readyEditBtn}
          onEditInquiry={() => setInquiryReady(false)}
          readySummaryItems={[
            {
              label: copy.formHotelLabel,
              value: `${selectedHotel.name[lang]} · ${roomLabel(selectedRoomType)}`
            },
            {
              label: copy.formDepartureLabel,
              value: `${selectedHotel.departureDateDisplay} → ${selectedHotel.returnDateDisplay[lang]}`,
              accent: true
            },
            {
              label: copy.quoteVerifiedPerPerson,
              value: `${formatMad(verifiedHotelPricePerPersonMad)} (${travelersCount} pers. = ${formatMad(verifiedBaseSubtotalMad)})`,
              accent: true
            },
            {
              label: copy.formBaggageLabel,
              value: `${interestedInVip ? 'Pack VIP (1 480 DH*) · ' : ''}${selectedBaggage.label[lang]}`
            }
          ]}
          whatsappHref={buildWhatsappInquiryUrl()}
          readyWhatsappBtn={copy.readyWhatsappBtn}
          onSubmit={handleSubmit}
          formSpecificChildren={
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`${uid}-ist-hotel`}
                    className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                  >
                    {copy.formHotelLabel}
                  </label>
                  <select
                    id={`${uid}-ist-hotel`}
                    value={selectedHotelId}
                    onChange={(e) => setSelectedHotelId(e.target.value as IstanbulHotelId)}
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                  >
                    {ISTANBUL_HOTELS.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={`${uid}-ist-room`}
                    className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                  >
                    {copy.formRoomLabel}
                  </label>
                  <select
                    id={`${uid}-ist-room`}
                    value={selectedRoomType}
                    onChange={(e) => setSelectedRoomType(e.target.value as IstanbulRoomType)}
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                  >
                    <option value="triple">
                      {copy.roomTypeTriple} — {formatMad(selectedHotel.pricesMad.triple)}
                    </option>
                    <option value="double">
                      {copy.roomTypeDouble} — {formatMad(selectedHotel.pricesMad.double)}
                    </option>
                    <option value="single">
                      {copy.roomTypeSingle} — {formatMad(selectedHotel.pricesMad.single)}
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`${uid}-ist-dep`}
                    className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                  >
                    {copy.formDepartureLabel}
                  </label>
                  <select
                    id={`${uid}-ist-dep`}
                    value={selectedHotel.departureOptionId}
                    onChange={(e) =>
                      handleDepartureSelect(e.target.value as 'dec-05' | 'dec-26')
                    }
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                  >
                    <option value="dec-05">
                      05/12/2026 → 13/12/2026 (Delta 3★ / Zagreb 4★)
                    </option>
                    <option value="dec-26">
                      26/12/2026 → {ISTANBUL_HOTELS[2].returnDateDisplay[lang]} (Ilkbal Deluxe 4★)
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={`${uid}-ist-pax`}
                    className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                  >
                    {copy.formTravelersLabel}
                  </label>
                  <input
                    id={`${uid}-ist-pax`}
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

              <div className="rounded-xl bg-[#f5ede0]/80 border border-[#d1a847]/50 p-4 space-y-1.5">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={interestedInVip}
                    onChange={(e) => setInterestedInVip(e.target.checked)}
                    className="mt-0.5 rounded border-[#d1a847] text-[#0b1d3a]"
                  />
                  <span className="text-xs font-bold text-[#0b1d3a]">
                    {copy.formVipCheckboxLabel}
                  </span>
                </label>
                <p className="text-[11px] text-[#2c405e] leading-snug ps-6">
                  {copy.formVipCheckboxHint}
                </p>
              </div>

              <div>
                <label
                  htmlFor={`${uid}-ist-bag`}
                  className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                >
                  {copy.formBaggageLabel}
                </label>
                <select
                  id={`${uid}-ist-bag`}
                  value={selectedBaggageId}
                  onChange={(e) =>
                    setSelectedBaggageId(e.target.value as IstanbulBaggageOptionId)
                  }
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                >
                  {ISTANBUL_BAGGAGE_OPTIONS.map((bag) => (
                    <option key={bag.id} value={bag.id}>
                      {bag.label[lang]}
                    </option>
                  ))}
                </select>
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
          quoteSubtitle={`${selectedHotel.name[lang]} · ${roomLabel(selectedRoomType)}`}
          quoteBodyChildren={
            <>
              <ProgramQuoteRateBlock
                perPersonLabel={copy.quoteVerifiedPerPerson}
                perPersonValue={formatMad(verifiedHotelPricePerPersonMad)}
                groupLabel={`${copy.quoteVerifiedBaseGroup} (${travelersCount})`}
                groupValue={formatMad(verifiedBaseSubtotalMad)}
              />

              {(interestedInVip || selectedBaggageId !== 'cabin-only') && (
                <ProgramQuoteNoticeBox
                  title={copy.quotePendingConfirmationTitle}
                  text={[
                    interestedInVip ? copy.quoteVipPendingLine : '',
                    selectedBaggageId !== 'cabin-only'
                      ? `${copy.quoteBaggageLine} : ${selectedBaggage.label[lang]}`
                      : ''
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                />
              )}

              <ProgramQuoteNoticeBox text={copy.quoteNoUnconfirmedSumNote} variant="neutral" />
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

        {/* SECTION 10: RETURN TO HOMEPAGE & SÉJOURS */}
        <ProgramBottomNav
          backRoute={ISTANBUL_HOLIDAY_BACK_ROUTE}
          backToCategoryLabel={copy.backToSejours}
          backToHomeLabel={copy.backToHome}
          isRtl={isRtl}
        />
      </div>
    </div>
  );
};
