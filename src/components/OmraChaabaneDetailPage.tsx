import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BedDouble,
  Building2,
  Calendar,
  Camera,
  Coffee,
  CreditCard,
  FileCheck2,
  Info,
  Luggage,
  XCircle
} from 'lucide-react';
import { Language } from '../assets/destinations';
import { HERO_CATEGORY_ICONS } from './ServiceIcons';
import {
  OMRA_CHAABANE_ONLY_BACK_ROUTE,
  OMRA_CHAABANE_ONLY_COPY,
  OMRA_CHAABANE_ONLY_IMAGES,
  OMRA_CHAABANE_ONLY_META,
  OMRA_CHAABANE_ONLY_OPTIONS,
  OMRA_CHAABANE_ONLY_ROOM_ORDER,
  OmraChaabaneOnlyOptionId,
  OmraChaabaneOnlyRoomType
} from '../data/omraChaabaneData';
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

interface OmraChaabaneDetailPageProps {
  lang: Language;
  isRtl: boolean;
  whatsappInternational: string;
  displayPhone: string;
  onJumpToHomePlanner: () => void;
}

const CHAABANE_INCLUSION_ICONS = {
  madinah: Building2,
  makkah: Building2,
  breakfast: Coffee
} as const;

export const OmraChaabaneDetailPage: React.FC<OmraChaabaneDetailPageProps> = ({
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
  const copy = OMRA_CHAABANE_ONLY_COPY[lang];
  const UmrahHeroIcon = HERO_CATEGORY_ICONS.umrah;

  const [selectedOptionId, setSelectedOptionId] =
    useState<OmraChaabaneOnlyOptionId>('option-1');
  const [selectedRoomType, setSelectedRoomType] =
    useState<OmraChaabaneOnlyRoomType>('quintuple');
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
    if (location.hash === '#omra-chaabane-inquiry' && inquirySectionRef.current) {
      const id = window.setTimeout(() => {
        inquirySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 160);
      return () => window.clearTimeout(id);
    }
  }, [location.hash]);

  const activeOption = useMemo(
    () =>
      OMRA_CHAABANE_ONLY_OPTIONS.find((opt) => opt.id === selectedOptionId) ??
      OMRA_CHAABANE_ONLY_OPTIONS[0],
    [selectedOptionId]
  );

  // Automatically switch away from Quintuple when switching to Option 3 or Option 4 where it is unavailable
  useEffect(() => {
    if (activeOption.pricesMad[selectedRoomType] === null) {
      setSelectedRoomType('quadruple');
    }
  }, [activeOption, selectedRoomType]);

  const selectedRoomPriceMad = activeOption.pricesMad[selectedRoomType];
  const groupSubtotalMad =
    selectedRoomPriceMad !== null ? selectedRoomPriceMad * travelersCount : null;

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
      headings: '.ggt-omra-ch-heading',
      cards: '.ggt-omra-ch-card',
      dividers: '.ggt-omra-ch-divider',
      refreshDelayMs: 180
    });
  }, [lang]);

  const handleOptionSwitch = (nextOptId: OmraChaabaneOnlyOptionId) => {
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
    optId: OmraChaabaneOnlyOptionId,
    roomId: OmraChaabaneOnlyRoomType
  ) => {
    if (optId !== selectedOptionId) {
      handleOptionSwitch(optId);
    }
    setSelectedRoomType(roomId);
  };

  const formatMad = (amount: number) => `${amount.toLocaleString('fr-FR')} MAD`;

  const availableRoomsForSelectedOption = useMemo(
    () =>
      OMRA_CHAABANE_ONLY_ROOM_ORDER.filter(
        (rt) => activeOption.pricesMad[rt] !== null
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
      selectedRoomPriceMad !== null
        ? `${formatMad(selectedRoomPriceMad)} / personne (Total ${travelersCount} pers. : ${formatMad(selectedRoomPriceMad * travelersCount)})`
        : 'Non disponible';

    const lines = [
      'Bonjour Golden Group Travels,',
      `Demande de réservation : ${copy.title} (${copy.arabicTitle})`,
      `• Dates affichées (à confirmer auprès de l’agence) : Départ ${OMRA_CHAABANE_ONLY_META.printedDates.departure.fr} — Retour ${OMRA_CHAABANE_ONLY_META.printedDates.return.fr} (brochure ${OMRA_CHAABANE_ONLY_META.coverYearPrinted})`,
      `• Option sélectionnée : ${activeOption.code.fr} — ${activeOption.title.fr}`,
      `• Médine : ${activeOption.madinahHotel.fr}`,
      `• Makkah : ${activeOption.makkahHotel.fr}${activeOption.makkahMealNote ? ` (${activeOption.makkahMealNote.fr})` : ''}`,
      `• Type de chambre : ${copy.roomLabels[selectedRoomType].name}`,
      `• Nombre de voyageurs : ${travelersCount}`,
      `• Tarif officiel : ${rateDisplay}`,
      `• Nom : ${fullName.trim()}`,
      `• Téléphone : ${phone.trim()}`,
      notes.trim() ? `• Notes : ${notes.trim()}` : ''
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(lines)}`;
  };

  const buildAdvisorWhatsappUrl = () => {
    const msg = `Bonjour Golden Group Travels, je souhaite des renseignements et confirmer la disponibilité pour "${copy.title} · ${OMRA_CHAABANE_ONLY_META.coverYearPrinted}" (${activeOption.code.fr}, chambre ${copy.roomLabels[selectedRoomType].name}).`;
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div
      ref={pageRootRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#ede1ce] text-[#0b1d3a]"
    >
      <ProgramTopBar
        backRoute={OMRA_CHAABANE_ONLY_BACK_ROUTE}
        backToCategoryLabel={copy.backToUmrahLabel}
        backToHomeLabel={copy.backToHomeLabel}
        rightBadgeLabel={copy.coverYearBadge}
        isRtl={isRtl}
      />

      {/* SECTION 1: HERO + 14,900 MAD STARTING PRICE + PRINTED DATES */}
      <ProgramHero
        heroIcon={UmrahHeroIcon}
        eyebrow={copy.heroEyebrow}
        title={`${copy.title} · ${OMRA_CHAABANE_ONLY_META.coverYearPrinted}`}
        arabicTitle={`${copy.arabicTitle} · ${OMRA_CHAABANE_ONLY_META.coverYearPrinted}`}
        summary={copy.cardSummary}
        infoBoxes={[
          {
            label: copy.departureLabel,
            value: OMRA_CHAABANE_ONLY_META.printedDates.departure[lang],
            icon: Calendar
          },
          {
            label: copy.returnLabel,
            value: OMRA_CHAABANE_ONLY_META.printedDates.return[lang],
            icon: Calendar
          }
        ]}
        startingFromLabel={copy.startingFromLabel}
        startingPriceDisplay={copy.startingPriceDisplay}
        startingPriceSuffix=" / pers."
        startingPriceScopeNote={copy.startingPriceScopeNote}
        primaryCtaLabel={copy.optionsTitle}
        onPrimaryCta={() =>
          optionsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        secondaryCtaLabel={copy.reserveBtn}
        onSecondaryCta={() =>
          inquirySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        image={OMRA_CHAABANE_ONLY_IMAGES.hero}
        imageAlt={`${copy.title} — ${copy.coverYearBadge}`}
        fallbackGradient={OMRA_CHAABANE_ONLY_IMAGES.fallbackGradient}
        imageBadgeText={copy.datesConfirmTag}
        isRtl={isRtl}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-14">
        {/* SECTION 2: MANDATORY GREGORIAN / HIJRI DISCREPANCY BANNER */}
        <ProgramDiscrepancyBanner
          heading={copy.dateConflictHeading}
          explanation={copy.dateConflictExplanation}
        />

        <ProgramDivider className="ggt-omra-ch-divider" />

        {/* SECTION 3: FULL 4-OPTION COMPARISON TABLE */}
        <section className="space-y-5">
          <ProgramSectionHeading
            eyebrow={copy.tableEyebrow}
            title={copy.tableTitle}
            subtitle={copy.tableSubtitle}
            headingClassName="ggt-omra-ch-heading"
          />

          <ProgramComparisonTable>
            <thead>
              <tr className="bg-[#0b1d3a] text-[#fceda2] text-xs">
                <th className="py-4 px-5 text-start font-semibold uppercase tracking-[0.14em]">
                  {copy.colOptionHotels}
                </th>
                {OMRA_CHAABANE_ONLY_ROOM_ORDER.map((roomId) => (
                  <th key={roomId} className="py-4 px-4 text-center font-semibold">
                    <div className="uppercase tracking-[0.12em]">
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
              {OMRA_CHAABANE_ONLY_OPTIONS.map((opt) => {
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
                      </div>
                      <div className="text-xs font-semibold text-[#2c405e] mt-0.5">
                        {copy.makkahCityLabel} : {opt.makkahHotel[lang]}
                        {opt.makkahMealNote && (
                          <span className="ms-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-bold">
                            {opt.makkahMealNote[lang]}
                          </span>
                        )}
                      </div>
                    </td>

                    {OMRA_CHAABANE_ONLY_ROOM_ORDER.map((roomId) => {
                      const price = opt.pricesMad[roomId];
                      if (price === null) {
                        return (
                          <td key={roomId} className="py-3 px-3 text-center">
                            <div className="py-2.5 px-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-500 text-xs font-semibold">
                              {copy.unavailableLabel}
                            </div>
                          </td>
                        );
                      }

                      const isCellSelected =
                        selectedOptionId === opt.id && selectedRoomType === roomId;
                      return (
                        <td key={roomId} className="py-3 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleTableCellSelect(opt.id, roomId)}
                            className={`ggt-card-3d-select w-full py-2.5 px-3 rounded-xl border transition-all cursor-pointer ${
                              isCellSelected
                                ? 'bg-[#0b1d3a] text-[#fceda2] border-[#d1a847] shadow-sm font-bold'
                                : 'bg-white hover:bg-[#ede1ce] text-[#0b1d3a] border-[#d1a847]/45 font-semibold'
                            }`}
                          >
                            <div className="font-serif-crest text-base tabular-nums">
                              {formatMad(price)}
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

        <ProgramDivider className="ggt-omra-ch-divider" />

        {/* SECTION 4: INTERACTIVE OPTION SWITCHER + ROOM CARDS */}
        <section ref={optionsSectionRef} className="space-y-6 scroll-mt-28 sm:scroll-mt-36">
          <ProgramSectionHeading
            eyebrow={copy.optionsEyebrow}
            title={copy.optionsTitle}
            subtitle={copy.optionsSubtitle}
            headingClassName="ggt-omra-ch-heading"
            rightSlot={
              <ProgramTabSwitcher
                tablistRef={optionTablistRef}
                indicatorRef={optionIndicatorRef}
                ariaLabel={copy.optionsTitle}
                activeId={selectedOptionId}
                onSelect={handleOptionSwitch}
                options={OMRA_CHAABANE_ONLY_OPTIONS.map((opt) => ({
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
              />

              <ProgramSelectorInfoCard
                icon={Building2}
                label={copy.makkahCityLabel}
                value={activeOption.makkahHotel[lang]}
                badge={
                  activeOption.makkahMealNote ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-950/90 text-emerald-200 border border-emerald-500/45">
                      <Coffee className="w-3 h-3" />
                      <span>{activeOption.makkahMealNote[lang]}</span>
                    </span>
                  ) : undefined
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {OMRA_CHAABANE_ONLY_ROOM_ORDER.map((roomId) => {
                const priceMad = activeOption.pricesMad[roomId];
                const isAvailable = priceMad !== null;
                const isSelected = isAvailable && selectedRoomType === roomId;
                const roomMeta = copy.roomLabels[roomId];

                if (!isAvailable) {
                  return (
                    <div
                      key={roomId}
                      aria-disabled="true"
                      className="rounded-2xl bg-[#0b1d3a]/45 border border-slate-600/50 p-5 flex flex-col justify-between gap-3 opacity-80"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-slate-300">{roomMeta.name}</span>
                          <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                        </div>
                        <div className="text-xs text-slate-400">{roomMeta.capacity}</div>
                      </div>

                      <div className="pt-2 border-t border-slate-700/60 space-y-1">
                        <div className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                          {copy.unavailableLabel}
                        </div>
                        <div className="text-[11px] text-slate-300 leading-snug">
                          {copy.unavailableDetail}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <ProgramSelectorChoiceCard
                    key={roomId}
                    title={roomMeta.name}
                    subtitle={roomMeta.capacity}
                    priceDisplay={formatMad(priceMad)}
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

        <ProgramDivider className="ggt-omra-ch-divider" />

        {/* SECTION 4B: STANDARDIZED INCLUSIONS ("Le prix comprend") */}
        <ProgramInclusionsSection
          eyebrow={copy.inclusionsEyebrow}
          title={copy.inclusionsTitle}
          subtitle={copy.inclusionsSubtitle}
          headingClassName="ggt-omra-ch-heading"
          cardClassName="ggt-omra-ch-card"
          columnsClassName="grid-cols-1 md:grid-cols-3"
          items={copy.inclusions.map((item) => ({
            key: item.key,
            icon: CHAABANE_INCLUSION_ICONS[item.key],
            title: item.title,
            detail: item.detail
          }))}
          calloutTitle={copy.unprintedTitle}
          calloutItems={copy.unprintedItems}
        />

        <ProgramDivider className="ggt-omra-ch-divider" />

        {/* SECTION 5: REGISTRATION CONDITIONS + IMPORTANT NOTES */}
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
          cardClassName="ggt-omra-ch-card"
        />

        <ProgramDivider className="ggt-omra-ch-divider" />

        {/* SECTION 6: WHATSAPP RESERVATION INQUIRY */}
        <ProgramBookingSection
          sectionRef={inquirySectionRef}
          sectionId="omra-chaabane-inquiry"
          eyebrow={copy.inquiryEyebrow}
          title={copy.inquiryTitle}
          subtitle={copy.inquirySubtitle}
          headingClassName="ggt-omra-ch-heading"
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
            ...(selectedRoomPriceMad !== null && groupSubtotalMad !== null
              ? [
                  {
                    label: copy.quotePerPersonLabel,
                    value: `${formatMad(selectedRoomPriceMad)} (${formatMad(groupSubtotalMad)})`,
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
                  htmlFor={`${uid}-omra-ch-opt`}
                  className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                >
                  {copy.formOptionLabel}
                </label>
                <select
                  id={`${uid}-omra-ch-opt`}
                  value={selectedOptionId}
                  onChange={(e) =>
                    setSelectedOptionId(e.target.value as OmraChaabaneOnlyOptionId)
                  }
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                >
                  {OMRA_CHAABANE_ONLY_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.code[lang]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor={`${uid}-omra-ch-room`}
                  className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                >
                  {copy.formRoomLabel}
                </label>
                <select
                  id={`${uid}-omra-ch-room`}
                  value={selectedRoomType}
                  onChange={(e) =>
                    setSelectedRoomType(e.target.value as OmraChaabaneOnlyRoomType)
                  }
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                >
                  {availableRoomsForSelectedOption.map((rt) => {
                    const p = activeOption.pricesMad[rt];
                    return (
                      <option key={rt} value={rt}>
                        {copy.roomLabels[rt].name} — {p !== null ? formatMad(p) : ''}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label
                  htmlFor={`${uid}-omra-ch-pax`}
                  className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                >
                  {copy.formTravelersLabel}
                </label>
                <input
                  id={`${uid}-omra-ch-pax`}
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
              {selectedRoomPriceMad !== null && groupSubtotalMad !== null && (
                <ProgramQuoteRateBlock
                  perPersonLabel={copy.quotePerPersonLabel}
                  perPersonValue={formatMad(selectedRoomPriceMad)}
                  groupLabel={`${copy.quoteGroupSubtotalLabel} (${travelersCount})`}
                  groupValue={formatMad(groupSubtotalMad)}
                />
              )}

              <ProgramQuoteRecapBox
                title={copy.quoteHotelsRecapLabel}
                lines={[
                  `• ${copy.madinahCityLabel} : ${activeOption.madinahHotel[lang]}`,
                  `• ${copy.makkahCityLabel} : ${activeOption.makkahHotel[lang]}${
                    activeOption.makkahMealNote ? ` (${activeOption.makkahMealNote[lang]})` : ''
                  }`
                ]}
              />

              <ProgramQuoteNoticeBox text={copy.quoteDatesNotice} />
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

        {/* SECTION 7: RETURN NAVIGATION */}
        <ProgramBottomNav
          backRoute={OMRA_CHAABANE_ONLY_BACK_ROUTE}
          backToCategoryLabel={copy.backToUmrahLabel}
          backToHomeLabel={copy.backToHomeLabel}
          isRtl={isRtl}
          dividerClassName="ggt-omra-ch-divider"
        />
      </div>
    </div>
  );
};
