import React, { useEffect, useId, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BedDouble,
  Building2,
  Bus,
  Calendar,
  Camera,
  Compass,
  CreditCard,
  FileCheck2,
  HelpCircle,
  Info,
  Luggage,
  Plane,
  Users
} from 'lucide-react';
import { Language } from '../assets/destinations';
import { HERO_CATEGORY_ICONS } from './ServiceIcons';
import {
  OMRA_RAJAB_BACK_ROUTE,
  OMRA_RAJAB_COPY,
  OMRA_RAJAB_IMAGES,
  OMRA_RAJAB_META,
  OMRA_RAJAB_OPTIONS,
  OMRA_RAJAB_ROOM_ORDER,
  OmraRajabRoomType
} from '../data/omraRajabData';
import { trackServiceSelection } from '../utils/analytics';
import { pulseSelection3D, setupWindowPopScroll3D, useReplayable3DPanel } from '../utils/tab3DMotion';
import {
  ProgramBottomNav,
  ProgramComparisonTable,
  ProgramConditionsNotesGrid,
  ProgramDiscrepancyBanner,
  ProgramDivider,
  ProgramHero,
  ProgramInclusionsSection,
  ProgramSectionHeading,
  ProgramSelectorInfoCard,
  ProgramSelectorPanel,
  ProgramTopBar
} from './programs/ProgramDetailPrimitives';
import {
  ProgramBookingSection,
  ProgramQuoteNoticeBox,
  ProgramQuoteRateBlock,
  ProgramQuoteRecapBox
} from './programs/ProgramBookingSection';

gsap.registerPlugin(ScrollTrigger);

interface OmraRajabDetailPageProps {
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

export const OmraRajabDetailPage: React.FC<OmraRajabDetailPageProps> = ({
  lang,
  isRtl,
  whatsappInternational,
  displayPhone,
  onJumpToHomePlanner
}) => {
  const pageRootRef = useRef<HTMLDivElement>(null);
  const optionsSectionRef = useRef<HTMLElement>(null);
  const inquirySectionRef = useRef<HTMLElement>(null);
  const quoteBoxRef = useRef<HTMLDivElement>(null);
  const readyCardRef = useRef<HTMLDivElement>(null);
  const quoteMountedRef = useRef(false);

  const location = useLocation();
  const uid = useId();
  const copy = OMRA_RAJAB_COPY[lang];
  const activeOption = OMRA_RAJAB_OPTIONS[0];
  const UmrahHeroIcon = HERO_CATEGORY_ICONS.umrah;

  const [selectedRoomType, setSelectedRoomType] = useState<OmraRajabRoomType>('quintuple');
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
    if (location.hash === '#omra-rajab-inquiry' && inquirySectionRef.current) {
      const id = window.setTimeout(() => {
        inquirySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 160);
      return () => window.clearTimeout(id);
    }
  }, [location.hash]);

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
  }, [selectedRoomType, travelersCount]);

  // 3D Window Pop-Out ScrollTrigger motion — smooth down and up
  useEffect(() => {
    const root = pageRootRef.current;
    if (!root) return;
    return setupWindowPopScroll3D(root, {
      headings: '.ggt-omra-raj-heading',
      cards: '.ggt-omra-raj-card',
      dividers: '.ggt-omra-raj-divider',
      refreshDelayMs: 180
    });
  }, [lang]);

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
      `Demande de réservation : ${copy.title} (${copy.arabicTitle}) — ${OMRA_RAJAB_META.coverYearPrinted}`,
      `• Durée : 4 nuits à Médine · 10 nuits à Makkah (14 nuits)`,
      `• Période annoncée : Janvier 2027 (dates exactes à confirmer auprès de l’agence)`,
      `• Type de chambre souhaité : ${copy.roomLabels[selectedRoomType].name}`,
      `• Nombre de voyageurs : ${travelersCount}`,
      `• Tarif de référence : À partir de 14 500 MAD / personne (noms d’hôtels et grille par chambre à confirmer)`,
      `• Nom : ${fullName.trim()}`,
      `• Téléphone : ${phone.trim()}`,
      notes.trim() ? `• Notes : ${notes.trim()}` : ''
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(lines)}`;
  };

  const buildAdvisorWhatsappUrl = () => {
    const msg = `Bonjour Golden Group Travels, je souhaite des informations sur "${copy.title} · ${OMRA_RAJAB_META.coverYearPrinted}" (à partir de 14 500 MAD, chambre ${copy.roomLabels[selectedRoomType].name}) et confirmer les dates et hôtels.`;
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div
      ref={pageRootRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#ede1ce] text-[#0b1d3a]"
    >
      <ProgramTopBar
        backRoute={OMRA_RAJAB_BACK_ROUTE}
        backToCategoryLabel={copy.backToUmrahLabel}
        backToHomeLabel={copy.backToHomeLabel}
        rightBadgeLabel={copy.coverYearBadge}
        isRtl={isRtl}
      />

      {/* SECTION 1: HERO + 14,500 MAD STARTING PRICE + DURATION/DATES */}
      <ProgramHero
        heroIcon={UmrahHeroIcon}
        eyebrow={copy.heroEyebrow}
        title={`${copy.title} · ${OMRA_RAJAB_META.coverYearPrinted}`}
        arabicTitle={`${copy.arabicTitle} · ${OMRA_RAJAB_META.coverYearPrinted}`}
        summary={copy.cardSummary}
        infoBoxes={[
          {
            label: copy.durationLabel,
            value: copy.durationSummary,
            icon: Calendar
          },
          {
            label: copy.datesLabel,
            value: copy.datesSummary,
            icon: Calendar,
            highlight: true
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
        image={OMRA_RAJAB_IMAGES.hero}
        imageAlt={`${copy.title} — ${copy.coverYearBadge}`}
        fallbackGradient={OMRA_RAJAB_IMAGES.fallbackGradient}
        imageBadgeText={copy.datesConfirmTag}
        isRtl={isRtl}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-14">
        {/* SECTION 2: AGENCY CONFIRMATION NOTICE BANNER */}
        <ProgramDiscrepancyBanner
          heading={copy.confirmBannerHeading}
          explanation={copy.confirmBannerExplanation}
        />

        <ProgramDivider className="ggt-omra-raj-divider" />

        {/* SECTION 3: DESKTOP COMPARISON TABLE */}
        <section className="space-y-5">
          <ProgramSectionHeading
            eyebrow={copy.tableEyebrow}
            title={copy.tableTitle}
            subtitle={copy.tableSubtitle}
            headingClassName="ggt-omra-raj-heading"
          />

          <ProgramComparisonTable>
            <thead>
              <tr className="bg-[#0b1d3a] text-[#fceda2] text-xs">
                <th className="py-4 px-5 text-start font-semibold uppercase tracking-[0.14em]">
                  {copy.colOptionHotels}
                </th>
                {OMRA_RAJAB_ROOM_ORDER.map((roomId) => (
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
              <tr className="bg-[#f5ede0]/60">
                <td className="py-4 px-5 align-top">
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a7220]">
                    {activeOption.code[lang]}
                  </div>
                  <div className="text-xs font-bold text-[#0b1d3a] mt-1">
                    {copy.madinahCityLabel} : {activeOption.madinahHotel[lang]}
                  </div>
                  <div className="text-xs font-semibold text-[#2c405e] mt-0.5">
                    {copy.makkahCityLabel} : {activeOption.makkahHotel[lang]}
                  </div>
                </td>

                {OMRA_RAJAB_ROOM_ORDER.map((roomId) => {
                  const isCellSelected = selectedRoomType === roomId;
                  return (
                    <td key={roomId} className="py-3 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedRoomType(roomId)}
                        className={`ggt-card-3d-select w-full py-2.5 px-3 rounded-xl border transition-all cursor-pointer ${
                          isCellSelected
                            ? 'bg-[#0b1d3a] text-[#fceda2] border-[#d1a847] shadow-sm font-bold'
                            : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-400/75 font-semibold'
                        }`}
                      >
                        <div className="text-xs font-bold">{copy.priceConfirmLabel}</div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            isCellSelected ? 'text-[#d1a847]' : 'text-amber-800'
                          }`}
                        >
                          {copy.priceStartingHint}
                        </div>
                      </button>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </ProgramComparisonTable>
        </section>

        <ProgramDivider className="ggt-omra-raj-divider" />

        {/* SECTION 4: INTERACTIVE STAY & ROOM SELECTION PANEL */}
        <section ref={optionsSectionRef} className="space-y-6 scroll-mt-28 sm:scroll-mt-36">
          <ProgramSectionHeading
            eyebrow={copy.optionsEyebrow}
            title={copy.optionsTitle}
            subtitle={copy.optionsSubtitle}
            headingClassName="ggt-omra-raj-heading"
          />

          <ProgramSelectorPanel
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
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {OMRA_RAJAB_ROOM_ORDER.map((roomId) => {
                const isSelected = selectedRoomType === roomId;
                const roomMeta = copy.roomLabels[roomId];

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
                        className={`font-serif-crest text-lg font-bold leading-snug flex items-center gap-1.5 ${
                          isSelected ? 'text-[#0b1d3a]' : 'text-amber-300'
                        }`}
                      >
                        <HelpCircle className="w-4 h-4 shrink-0" />
                        <span>{copy.priceConfirmLabel}</span>
                      </div>
                      <p
                        className={`text-[11px] leading-snug ${
                          isSelected ? 'text-[#0b1d3a]/85 font-medium' : 'text-slate-300'
                        }`}
                      >
                        {copy.roomRatesNotice}
                      </p>
                      <div
                        className={`text-[11px] font-bold uppercase tracking-wider pt-1 ${
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
          </ProgramSelectorPanel>
        </section>

        <ProgramDivider className="ggt-omra-raj-divider" />

        {/* SECTION 5: STANDARDIZED INCLUSIONS ("Le prix comprend") */}
        <ProgramInclusionsSection
          eyebrow={copy.inclusionsEyebrow}
          title={copy.inclusionsTitle}
          subtitle={copy.inclusionsSubtitle}
          headingClassName="ggt-omra-raj-heading"
          cardClassName="ggt-omra-raj-card"
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

        <ProgramDivider className="ggt-omra-raj-divider" />

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
          cardClassName="ggt-omra-raj-card"
        />

        <ProgramDivider className="ggt-omra-raj-divider" />

        {/* SECTION 7: WHATSAPP RESERVATION INQUIRY */}
        <ProgramBookingSection
          sectionRef={inquirySectionRef}
          sectionId="omra-rajab-inquiry"
          eyebrow={copy.inquiryEyebrow}
          title={copy.inquiryTitle}
          subtitle={copy.inquirySubtitle}
          headingClassName="ggt-omra-raj-heading"
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
            {
              label: copy.formRoomLabel,
              value: `${copy.roomLabels[selectedRoomType].name} · ${travelersCount} pers.`,
              accent: true
            },
            { label: copy.quotePerPersonLabel, value: copy.quoteBaseRateValue }
          ]}
          whatsappHref={buildWhatsappInquiryUrl()}
          readyWhatsappBtn={copy.readyWhatsappBtn}
          onSubmit={handleSubmit}
          formSpecificChildren={
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor={`${uid}-omra-raj-room`}
                  className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                >
                  {copy.formRoomLabel}
                </label>
                <select
                  id={`${uid}-omra-raj-room`}
                  value={selectedRoomType}
                  onChange={(e) => setSelectedRoomType(e.target.value as OmraRajabRoomType)}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                >
                  {OMRA_RAJAB_ROOM_ORDER.map((rt) => (
                    <option key={rt} value={rt}>
                      {copy.roomLabels[rt].name} ({copy.roomLabels[rt].capacity})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor={`${uid}-omra-raj-pax`}
                  className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                >
                  {copy.formTravelersLabel}
                </label>
                <input
                  id={`${uid}-omra-raj-pax`}
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
          quoteSubtitle={`${copy.roomLabels[selectedRoomType].name} · ${travelersCount} pers.`}
          quoteBodyChildren={
            <>
              <ProgramQuoteRateBlock
                perPersonLabel={copy.quotePerPersonLabel}
                perPersonValue={copy.quoteBaseRateValue}
                groupLabel={`${copy.formTravelersLabel} (${travelersCount})`}
                groupValue={copy.priceConfirmLabel}
              />

              <ProgramQuoteRecapBox
                title={copy.quoteHotelsRecapLabel}
                lines={[
                  `• ${activeOption.madinahHotel[lang]}`,
                  `• ${activeOption.makkahHotel[lang]}`
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
          backRoute={OMRA_RAJAB_BACK_ROUTE}
          backToCategoryLabel={copy.backToUmrahLabel}
          backToHomeLabel={copy.backToHomeLabel}
          isRtl={isRtl}
          dividerClassName="ggt-omra-raj-divider"
        />
      </div>
    </div>
  );
};
