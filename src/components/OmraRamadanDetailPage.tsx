import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertTriangle,
  BedDouble,
  Building2,
  Calendar,
  Camera,
  Coffee,
  CreditCard,
  FileCheck2,
  HelpCircle,
  Info,
  Luggage,
  MapPin,
  MoonStar,
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
  ProgramQuoteRateBlock,
  ProgramQuoteRecapBox
} from './programs/ProgramBookingSection';

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

  const buildAdvisorWhatsappUrl = () => {
    const msg = `Bonjour Golden Group Travels, je souhaite des renseignements et confirmer la disponibilité pour "${copy.title} · ${OMRA_RAMADAN_META.hijriYear} / ${OMRA_RAMADAN_META.gregorianCoverYear}" (${activeOption.code.fr}, chambre ${copy.roomLabels[selectedRoomType].name}).`;
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div
      ref={pageRootRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#ede1ce] text-[#0b1d3a]"
    >
      <ProgramTopBar
        backRoute={OMRA_RAMADAN_BACK_ROUTE}
        backToCategoryLabel={copy.backToUmrahLabel}
        backToHomeLabel={copy.backToHomeLabel}
        rightBadgeLabel={copy.coverYearBadge}
        isRtl={isRtl}
      />

      {/* SECTION 1: HERO + ADVERTISED 26,000 MAD STARTING BANNER */}
      <ProgramHero
        heroIcon={UmrahHeroIcon}
        eyebrow={copy.heroEyebrow}
        title={`${copy.title} · ${OMRA_RAMADAN_META.hijriYear} / ${OMRA_RAMADAN_META.gregorianCoverYear}`}
        arabicTitle={`${copy.arabicTitle} · ${OMRA_RAMADAN_META.hijriYear} هـ / ${OMRA_RAMADAN_META.gregorianCoverYear}`}
        summary={copy.cardSummary}
        infoBoxes={[
          {
            label: OMRA_RAMADAN_META.durationDisplay[lang],
            value: copy.durationBadgeLabel,
            icon: Calendar
          },
          {
            label: copy.coverYearBadge,
            value: copy.datesBadgeLabel,
            icon: AlertTriangle,
            highlight: true
          }
        ]}
        startingFromLabel={copy.startingFromLabel}
        startingPriceDisplay={copy.startingPriceDisplay}
        startingPriceSuffix=" / pers."
        startingPriceScopeNote={copy.startingPriceScopeNote}
        startingPriceScopeIsWarning
        primaryCtaLabel={copy.optionsTitle}
        onPrimaryCta={() =>
          optionsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        secondaryCtaLabel={copy.reserveBtn}
        onSecondaryCta={() =>
          inquirySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        image={OMRA_RAMADAN_IMAGES.hero}
        imageAlt={`${copy.title} — ${copy.coverYearBadge}`}
        fallbackGradient={OMRA_RAMADAN_IMAGES.fallbackGradient}
        imageBadgeText={OMRA_RAMADAN_META.durationDisplay[lang]}
        imageBadgeIcon={MoonStar}
        imageBadgeIsWarning={false}
        isRtl={isRtl}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-14">
        {/* SECTION 2: MANDATORY TRANSPARENCY & DISCREPANCY NOTICE */}
        <ProgramDiscrepancyBanner
          heading={copy.discrepancyHeading}
          explanation=""
          extraContent={
            <ul className="space-y-1.5 list-disc ps-4">
              {copy.discrepancyBullets.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          }
        />

        <ProgramDivider className="ggt-omra-ram-divider" />

        {/* SECTION 2B: DESKTOP COMPARISON TABLE */}
        <section className="space-y-5">
          <ProgramSectionHeading
            eyebrow={copy.tableEyebrow}
            title={copy.tableTitle}
            subtitle={copy.tableSubtitle}
            headingClassName="ggt-omra-ram-heading"
          />

          <ProgramComparisonTable>
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
          </ProgramComparisonTable>
        </section>

        <ProgramDivider className="ggt-omra-ram-divider" />

        {/* SECTION 3: THREE ACCOMMODATION OPTIONS (A, B, C) + VERIFIED MAD ROOM PRICING */}
        <section ref={optionsSectionRef} className="space-y-6 scroll-mt-28 sm:scroll-mt-36">
          <ProgramSectionHeading
            eyebrow={copy.optionsEyebrow}
            title={copy.optionsTitle}
            subtitle={copy.optionsSubtitle}
            headingClassName="ggt-omra-ram-heading"
            rightSlot={
              <ProgramTabSwitcher
                tablistRef={optionTablistRef}
                indicatorRef={optionIndicatorRef}
                ariaLabel={copy.optionsTitle}
                activeId={selectedOptionId}
                onSelect={handleOptionSwitch}
                options={OMRA_RAMADAN_OPTIONS.map((opt) => ({
                  id: opt.id,
                  label: opt.code[lang]
                }))}
              />
            }
          />

          <ProgramSelectorPanel
            panelRef={optionPanelRef}
            eyebrow={activeOption.code[lang]}
            title={activeOption.title[lang]}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProgramSelectorInfoCard
                icon={Building2}
                label={copy.madinahCityLabel}
                value={activeOption.madinahHotel[lang]}
                badge={
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-950/90 text-amber-200 border border-amber-500/45">
                    <Coffee className="w-3 h-3" />
                    <span>{activeOption.madinahMealNote[lang]}</span>
                  </span>
                }
              />

              <ProgramSelectorInfoCard
                icon={Building2}
                label={copy.makkahCityLabel}
                value={activeOption.makkahHotel[lang]}
                badge={
                  activeOption.makkahDistanceNote ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#071429] text-[#fceda2] border border-[#d1a847]/55">
                      <MapPin className="w-3 h-3 text-[#d1a847]" />
                      <span>{activeOption.makkahDistanceNote[lang]}</span>
                    </span>
                  ) : undefined
                }
              />
            </div>

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
                  <ProgramSelectorChoiceCard
                    key={roomId}
                    title={roomMeta.name}
                    subtitle={roomMeta.capacity}
                    priceDisplay={formatMad(roomState.amountMad)}
                    actionLabel={isSelected ? copy.selectedRoomBtn : copy.selectRoomBtn}
                    isSelected={isSelected}
                    onSelect={() => setSelectedRoomType(roomId)}
                    icon={BedDouble}
                  />
                );
              })}
            </div>
          </ProgramSelectorPanel>
        </section>

        <ProgramDivider className="ggt-omra-ram-divider" />

        {/* SECTION 3B: STANDARDIZED INCLUSIONS ("Le prix comprend") */}
        <ProgramInclusionsSection
          eyebrow={copy.inclusionsEyebrow}
          title={copy.inclusionsTitle}
          subtitle={copy.inclusionsSubtitle}
          headingClassName="ggt-omra-ram-heading"
          cardClassName="ggt-omra-ram-card"
          columnsClassName="grid-cols-1 md:grid-cols-3"
          items={copy.inclusions.map((item) => ({
            key: item.key,
            icon: RAMADAN_INCLUSION_ICONS[item.key],
            title: item.title,
            detail: item.detail
          }))}
          calloutTitle={copy.unprintedTitle}
          calloutItems={copy.unprintedItems}
        />

        <ProgramDivider className="ggt-omra-ram-divider" />

        {/* SECTION 4: REGISTRATION CONDITIONS & IMPORTANT PILGRIM NOTES */}
        <ProgramConditionsNotesGrid
          conditionsEyebrow={copy.conditionsEyebrow}
          conditionsTitle={copy.conditionsTitle}
          conditions={copy.conditionsList.map((cond) => ({
            key: cond.key,
            icon:
              cond.key === 'passport'
                ? FileCheck2
                : cond.key === 'photo'
                ? Camera
                : CreditCard,
            title: cond.title,
            detail: cond.detail
          }))}
          notesEyebrow={copy.notesEyebrow}
          notesTitle={copy.notesTitle}
          notes={copy.notesList.map((note) => ({
            key: note.key,
            icon: note.key === 'baggage' ? Luggage : Info,
            title: note.title,
            detail: note.detail
          }))}
          cardClassName="ggt-omra-ram-card"
        />

        <ProgramDivider className="ggt-omra-ram-divider" />

        {/* SECTION 5: WHATSAPP RESERVATION INQUIRY */}
        <ProgramBookingSection
          sectionRef={inquirySectionRef}
          sectionId="omra-ramadan-inquiry"
          eyebrow={copy.inquiryEyebrow}
          title={copy.inquiryTitle}
          subtitle={copy.inquirySubtitle}
          headingClassName="ggt-omra-ram-heading"
          uid={uid}
          isRtl={isRtl}
          inquiryReady={inquiryReady}
          readyCardRef={readyCardRef}
          readyProgramTitle={copy.title}
          readyTitle={copy.readyTitle}
          readySubtitle={copy.readySubtitle}
          readyEditBtn={copy.readyEditBtn}
          onEditInquiry={() => setInquiryReady(false)}
          readySummaryItems={[
            { label: copy.formOptionLabel, value: activeOption.code[lang] },
            {
              label: copy.formRoomLabel,
              value: `${copy.roomLabels[selectedRoomType].name} · ${travelersCount} pers.`,
              accent: true
            },
            ...(activeRoomState.kind === 'priced' &&
            pricedAmountMad !== null &&
            groupSubtotalMad !== null
              ? [
                  {
                    label: copy.quotePerPersonLabel,
                    value: `${formatMad(pricedAmountMad)} (${formatMad(groupSubtotalMad)})`,
                    accent: true
                  }
                ]
              : activeRoomState.kind === 'needs_confirmation'
              ? [
                  {
                    label: copy.quotePerPersonLabel,
                    value: copy.rateToConfirmLabel,
                    accent: true
                  }
                ]
              : [])
          ]}
          whatsappHref={buildWhatsappInquiryUrl()}
          readyWhatsappBtn={copy.readyWhatsappBtn}
          onSubmit={handleSubmit}
          formSpecificChildren={
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
                  onChange={(e) => setSelectedOptionId(e.target.value as OmraRamadanOptionId)}
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
                  onChange={(e) => setSelectedRoomType(e.target.value as OmraRamadanRoomType)}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                >
                  {selectableRoomsForOption.map((rt) => {
                    const st = activeOption.rooms[rt];
                    return (
                      <option key={rt} value={rt}>
                        {copy.roomLabels[rt].name} —{' '}
                        {st.kind === 'priced'
                          ? formatMad(st.amountMad)
                          : copy.rateToConfirmLabel}
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
                    setTravelersCount(Math.max(1, Math.min(20, Number(e.target.value) || 1)))
                  }
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] tabular-nums focus:outline-none focus:border-[#0b1d3a]"
                />
              </div>
            </div>
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
          quoteEyebrow={copy.quoteEyebrow}
          quoteTitle={copy.quoteTitle}
          quoteSubtitle={`${activeOption.code[lang]} · ${copy.roomLabels[selectedRoomType].name}`}
          quoteBodyChildren={
            <>
              {activeRoomState.kind === 'priced' &&
              pricedAmountMad !== null &&
              groupSubtotalMad !== null ? (
                <ProgramQuoteRateBlock
                  perPersonLabel={copy.quotePerPersonLabel}
                  perPersonValue={formatMad(pricedAmountMad)}
                  groupLabel={`${copy.quoteGroupSubtotalLabel} (${travelersCount})`}
                  groupValue={formatMad(groupSubtotalMad)}
                />
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

              <ProgramQuoteRecapBox
                title={copy.quoteHotelsRecapLabel}
                lines={[
                  `• ${copy.madinahCityLabel} : ${activeOption.madinahHotel[lang]} (${activeOption.madinahMealNote[lang]})`,
                  `• ${copy.makkahCityLabel} : ${activeOption.makkahHotel[lang]}${
                    activeOption.makkahDistanceNote
                      ? ` (${activeOption.makkahDistanceNote[lang]})`
                      : ''
                  }`
                ]}
              />

              <ProgramQuoteNoticeBox text={copy.datesBadgeLabel} />
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

        {/* SECTION 6: RETURN TO HAJJ & OMRA OR HOME */}
        <ProgramBottomNav
          backRoute={OMRA_RAMADAN_BACK_ROUTE}
          backToCategoryLabel={copy.backToUmrahLabel}
          backToHomeLabel={copy.backToHomeLabel}
          isRtl={isRtl}
          dividerClassName="ggt-omra-ram-divider"
        />
      </div>
    </div>
  );
};
