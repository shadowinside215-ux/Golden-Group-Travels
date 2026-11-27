import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertCircle,
  BedDouble,
  Building2,
  Bus,
  Calendar,
  Camera,
  Check,
  Compass,
  CreditCard,
  FileCheck2,
  Info,
  Luggage,
  Plane,
  Ship,
  Users
} from 'lucide-react';
import { Language } from '../assets/destinations';
import { HERO_CATEGORY_ICONS } from './ServiceIcons';
import {
  OMRA_ISTANBUL_BACK_ROUTE,
  OMRA_ISTANBUL_COPY,
  OMRA_ISTANBUL_IMAGES,
  OMRA_ISTANBUL_META,
  OMRA_ISTANBUL_OPTIONS,
  OMRA_ISTANBUL_ROOM_ORDER,
  OmraIstanbulOptionId,
  OmraIstanbulRoomType
} from '../data/omraIstanbulData';
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

interface OmraIstanbulDetailPageProps {
  lang: Language;
  isRtl: boolean;
  whatsappInternational: string;
  displayPhone: string;
  onJumpToHomePlanner: () => void;
}

const INCLUSION_ICONS = {
  ziyarat: Compass,
  accommodation: Building2,
  transport: Bus,
  flights: Plane,
  guidance: Users,
  visa: FileCheck2
} as const;

export const OmraIstanbulDetailPage: React.FC<OmraIstanbulDetailPageProps> = ({
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
  const copy = OMRA_ISTANBUL_COPY[lang];
  const UmrahHeroIcon = HERO_CATEGORY_ICONS.umrah;

  const [selectedOptionId, setSelectedOptionId] = useState<OmraIstanbulOptionId>('opt1');
  const [selectedRoomType, setSelectedRoomType] = useState<OmraIstanbulRoomType>('quintuple');
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
    if (location.hash === '#omra-istanbul-inquiry' && inquirySectionRef.current) {
      const id = window.setTimeout(() => {
        inquirySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 160);
      return () => window.clearTimeout(id);
    }
  }, [location.hash]);

  const activeOption = useMemo(
    () =>
      OMRA_ISTANBUL_OPTIONS.find((opt) => opt.id === selectedOptionId) ??
      OMRA_ISTANBUL_OPTIONS[0],
    [selectedOptionId]
  );

  const selectedRoomPriceMad = activeOption.pricesMad[selectedRoomType];
  const groupSubtotalMad = selectedRoomPriceMad * travelersCount;

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
      headings: '.ggt-omra-ist-heading',
      cards: '.ggt-omra-ist-card',
      dividers: '.ggt-omra-ist-divider',
      refreshDelayMs: 180
    });
  }, [lang]);

  const handleOptionSwitch = (nextOptId: OmraIstanbulOptionId) => {
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
    optId: OmraIstanbulOptionId,
    roomId: OmraIstanbulRoomType
  ) => {
    if (optId !== selectedOptionId) {
      handleOptionSwitch(optId);
    }
    setSelectedRoomType(roomId);
  };

  const formatMad = (amount: number) => `${amount.toLocaleString('fr-FR')} MAD`;

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
    const rateDisplay = `${formatMad(selectedRoomPriceMad)} / personne (Total ${travelersCount} pers. : ${formatMad(groupSubtotalMad)})`;
    const lines = [
      'Bonjour Golden Group Travels,',
      `Demande de réservation : ${copy.title} (${copy.arabicTitle}) — ${OMRA_ISTANBUL_META.coverBadgePrinted}`,
      `• Durée : 4 nuits Istanbul · 4 nuits Médine · 5 nuits Makkah (13 nuits)`,
      `• Dates annoncées : Départ ${OMRA_ISTANBUL_META.printedDates.departure.fr} — Retour ${OMRA_ISTANBUL_META.printedDates.return.fr}`,
      `• Option sélectionnée : ${activeOption.code.fr} (noms exacts des hôtels à confirmer)`,
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
    const msg = `Bonjour Golden Group Travels, je souhaite des renseignements pour "${copy.title} · ${copy.coverYearBadge}" (${activeOption.code.fr}, chambre ${copy.roomLabels[selectedRoomType].name}).`;
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div
      ref={pageRootRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#ede1ce] text-[#0b1d3a]"
    >
      <ProgramTopBar
        backRoute={OMRA_ISTANBUL_BACK_ROUTE}
        backToCategoryLabel={copy.backToUmrahLabel}
        backToHomeLabel={copy.backToHomeLabel}
        rightBadgeLabel={copy.coverYearBadge}
        isRtl={isRtl}
      />

      {/* SECTION 1: HERO + 18,500 MAD STARTING PRICE + PRINTED DATES */}
      <ProgramHero
        heroIcon={UmrahHeroIcon}
        eyebrow={copy.heroEyebrow}
        title={`${copy.title} · ${copy.coverYearBadge}`}
        arabicTitle={`${copy.arabicTitle} · ${copy.coverYearBadge}`}
        summary={copy.cardSummary}
        infoBoxes={[
          {
            label: copy.departureLabel,
            value: OMRA_ISTANBUL_META.printedDates.departure[lang],
            icon: Calendar
          },
          {
            label: copy.returnLabel,
            value: OMRA_ISTANBUL_META.printedDates.return[lang],
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
        image={OMRA_ISTANBUL_IMAGES.hero}
        imageAlt={`${copy.title} — ${copy.coverYearBadge}`}
        fallbackGradient={OMRA_ISTANBUL_IMAGES.fallbackGradient}
        imageBadgeText={copy.datesConfirmTag}
        isRtl={isRtl}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-14">
        {/* SECTION 2: MANDATORY AGENCY CONFIRMATION BANNER */}
        <ProgramDiscrepancyBanner
          heading={copy.hotelConfirmHeading}
          explanation={copy.hotelConfirmExplanation}
        />

        <ProgramDivider className="ggt-omra-ist-divider" />

        {/* SECTION 3: FULL 3-OPTION COMPARISON TABLE */}
        <section className="space-y-5">
          <ProgramSectionHeading
            eyebrow={copy.tableEyebrow}
            title={copy.tableTitle}
            subtitle={copy.tableSubtitle}
            headingClassName="ggt-omra-ist-heading"
          />

          <ProgramComparisonTable>
            <thead>
              <tr className="bg-[#0b1d3a] text-[#fceda2] text-xs">
                <th className="py-4 px-5 text-start font-semibold uppercase tracking-[0.14em]">
                  {copy.colOptionHotels}
                </th>
                {OMRA_ISTANBUL_ROOM_ORDER.map((roomId) => (
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
              {OMRA_ISTANBUL_OPTIONS.map((opt) => {
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
                        {copy.istanbulLabel} : {opt.istanbulHotelNote[lang]}
                      </div>
                      <div className="text-xs font-semibold text-[#2c405e] mt-0.5">
                        {copy.holyCitiesLabel} : {opt.holyCitiesHotelNote[lang]}
                      </div>
                    </td>

                    {OMRA_ISTANBUL_ROOM_ORDER.map((roomId) => {
                      const price = opt.pricesMad[roomId];
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

        <ProgramDivider className="ggt-omra-ist-divider" />

        {/* SECTION 4: INTERACTIVE OPTION SWITCHER + ROOM CARDS */}
        <section ref={optionsSectionRef} className="space-y-6 scroll-mt-28 sm:scroll-mt-36">
          <ProgramSectionHeading
            eyebrow={copy.optionsEyebrow}
            title={copy.optionsTitle}
            subtitle={copy.optionsSubtitle}
            headingClassName="ggt-omra-ist-heading"
            rightSlot={
              <ProgramTabSwitcher
                tablistRef={optionTablistRef}
                indicatorRef={optionIndicatorRef}
                ariaLabel={copy.optionsTitle}
                activeId={selectedOptionId}
                onSelect={handleOptionSwitch}
                options={OMRA_ISTANBUL_OPTIONS.map((opt) => ({
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
                label={copy.istanbulLabel}
                value={activeOption.istanbulHotelNote[lang]}
              />

              <ProgramSelectorInfoCard
                icon={Building2}
                label={copy.holyCitiesLabel}
                value={activeOption.holyCitiesHotelNote[lang]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {OMRA_ISTANBUL_ROOM_ORDER.map((roomId) => {
                const priceMad = activeOption.pricesMad[roomId];
                const isSelected = selectedRoomType === roomId;
                const roomMeta = copy.roomLabels[roomId];

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

        <ProgramDivider className="ggt-omra-ist-divider" />

        {/* SECTION 4B: ISTANBUL EXCURSIONS PROGRAM (OFFICIAL 3 LISTED GROUPS) */}
        <section className="space-y-6">
          <ProgramSectionHeading
            eyebrow={copy.excursionsEyebrow}
            title={copy.excursionsTitle}
            subtitle={copy.excursionsSubtitle}
            headingClassName="ggt-omra-ist-heading"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
            {copy.excursionGroups.map((grp, idx) => (
              <article
                key={grp.id}
                className="ggt-omra-ist-card rounded-2xl bg-[#fcf9f2] border-2 border-[#d1a847]/60 p-6 shadow-sm flex flex-col justify-between gap-4"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#d1a847]/30">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a7220]">
                        0{idx + 1} · Istanbul
                      </div>
                      <h3 className="font-serif-crest text-lg sm:text-xl font-semibold text-[#0b1d3a] mt-0.5">
                        {grp.dayTitle}
                      </h3>
                    </div>
                    <span
                      lang="ar"
                      dir="rtl"
                      className="px-3 py-1 rounded-lg bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847]/60 font-arabic-calligraphy text-base shrink-0"
                    >
                      {grp.sourceArabicLabel}
                    </span>
                  </div>

                  {grp.confirmBadge && (
                    <div className="rounded-xl bg-amber-50 border border-amber-300 px-3 py-2 flex items-start gap-2 text-[11px] text-amber-950 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span>{grp.confirmBadge}</span>
                    </div>
                  )}

                  <ul className="space-y-2.5">
                    {grp.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0b1d3a] leading-relaxed"
                      >
                        {idx === 0 && i === 0 ? (
                          <Ship className="w-4 h-4 text-[#c59b38] shrink-0 mt-0.5" />
                        ) : (
                          <Check className="w-4 h-4 text-[#c59b38] shrink-0 mt-0.5" />
                        )}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="rounded-xl bg-[#fcf9f2] border border-[#d1a847]/55 px-4 py-3 flex items-start gap-2.5 text-xs text-[#2c405e]">
            <Info className="w-4 h-4 text-[#9a7220] shrink-0 mt-0.5" />
            <span>{copy.excursionsSourceNote}</span>
          </div>
        </section>

        <ProgramDivider className="ggt-omra-ist-divider" />

        {/* SECTION 5: STANDARDIZED INCLUSIONS ("Le prix comprend") */}
        <ProgramInclusionsSection
          eyebrow={copy.inclusionsEyebrow}
          title={copy.inclusionsTitle}
          subtitle={copy.inclusionsSubtitle}
          headingClassName="ggt-omra-ist-heading"
          cardClassName="ggt-omra-ist-card"
          columnsClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          items={copy.inclusions.map((item) => ({
            key: item.key,
            icon: INCLUSION_ICONS[item.key],
            title: item.title,
            detail: item.detail
          }))}
          calloutTitle={copy.unprintedTitle}
          calloutItems={copy.unprintedItems}
        />

        <ProgramDivider className="ggt-omra-ist-divider" />

        {/* SECTION 6: REGISTRATION CONDITIONS + IMPORTANT NOTES */}
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
          cardClassName="ggt-omra-ist-card"
        />

        <ProgramDivider className="ggt-omra-ist-divider" />

        {/* SECTION 7: WHATSAPP RESERVATION INQUIRY */}
        <ProgramBookingSection
          sectionRef={inquirySectionRef}
          sectionId="omra-istanbul-inquiry"
          eyebrow={copy.inquiryEyebrow}
          title={copy.inquiryTitle}
          subtitle={copy.inquirySubtitle}
          headingClassName="ggt-omra-ist-heading"
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
            {
              label: copy.quotePerPersonLabel,
              value: `${formatMad(selectedRoomPriceMad)} (${formatMad(groupSubtotalMad)})`,
              accent: true
            }
          ]}
          whatsappHref={buildWhatsappInquiryUrl()}
          readyWhatsappBtn={copy.readyWhatsappBtn}
          onSubmit={handleSubmit}
          formSpecificChildren={
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor={`${uid}-omra-ist-opt`}
                  className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                >
                  {copy.formOptionLabel}
                </label>
                <select
                  id={`${uid}-omra-ist-opt`}
                  value={selectedOptionId}
                  onChange={(e) => setSelectedOptionId(e.target.value as OmraIstanbulOptionId)}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                >
                  {OMRA_ISTANBUL_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.code[lang]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor={`${uid}-omra-ist-room`}
                  className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                >
                  {copy.formRoomLabel}
                </label>
                <select
                  id={`${uid}-omra-ist-room`}
                  value={selectedRoomType}
                  onChange={(e) => setSelectedRoomType(e.target.value as OmraIstanbulRoomType)}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                >
                  {OMRA_ISTANBUL_ROOM_ORDER.map((rt) => (
                    <option key={rt} value={rt}>
                      {copy.roomLabels[rt].name} — {formatMad(activeOption.pricesMad[rt])}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor={`${uid}-omra-ist-pax`}
                  className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                >
                  {copy.formTravelersLabel}
                </label>
                <input
                  id={`${uid}-omra-ist-pax`}
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
              <ProgramQuoteRateBlock
                perPersonLabel={copy.quotePerPersonLabel}
                perPersonValue={formatMad(selectedRoomPriceMad)}
                groupLabel={`${copy.quoteGroupSubtotalLabel} (${travelersCount})`}
                groupValue={formatMad(groupSubtotalMad)}
              />

              <ProgramQuoteRecapBox
                title={copy.quoteHotelsRecapLabel}
                lines={[
                  `• ${activeOption.istanbulHotelNote[lang]}`,
                  `• ${activeOption.holyCitiesHotelNote[lang]}`
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

        {/* SECTION 8: RETURN NAVIGATION */}
        <ProgramBottomNav
          backRoute={OMRA_ISTANBUL_BACK_ROUTE}
          backToCategoryLabel={copy.backToUmrahLabel}
          backToHomeLabel={copy.backToHomeLabel}
          isRtl={isRtl}
          dividerClassName="ggt-omra-ist-divider"
        />
      </div>
    </div>
  );
};
