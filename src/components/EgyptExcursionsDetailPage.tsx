import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertTriangle,
  Calendar,
  Car,
  Check,
  Compass,
  Info,
  Languages,
  MapPin,
  PlaneLanding,
  ShieldCheck,
  Ticket,
  Users,
  Utensils,
  XCircle
} from 'lucide-react';
import { Language } from '../assets/destinations';
import { HERO_CATEGORY_ICONS } from './ServiceIcons';
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
  ProgramQuoteRateBlock
} from './programs/ProgramBookingSection';

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
  const optionsSectionRef = useRef<HTMLElement>(null);
  const inquirySectionRef = useRef<HTMLElement>(null);
  const groupTablistRef = useRef<HTMLDivElement>(null);
  const groupIndicatorRef = useRef<HTMLSpanElement>(null);
  const serviceTablistRef = useRef<HTMLDivElement>(null);
  const serviceIndicatorRef = useRef<HTMLSpanElement>(null);
  const pricingTableCardRef = useRef<HTMLDivElement>(null);
  const pricingPanelRef = useRef<HTMLDivElement>(null);
  const pricingSwitchTimelineRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  const serviceSwitchTimelineRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);
  const quoteBoxRef = useRef<HTMLDivElement>(null);
  const inquiryReadyCardRef = useRef<HTMLDivElement>(null);
  const quoteMountedRef = useRef(false);

  const location = useLocation();
  const uid = useId();
  const copy = EGYPT_EXCURSIONS_COPY[lang];
  const TransfersHeroIcon = HERO_CATEGORY_ICONS['car-transfers'];

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
    [lang, isRtl]
  );

  useSlidingTabIndicator(
    serviceTablistRef,
    serviceIndicatorRef,
    selectedServiceId,
    [lang, isRtl]
  );

  useReplayable3DPanel(pricingTableCardRef, String(selectedGroupSize), {
    duration: 0.42,
    staggerEach: 0.035,
    yOffset: 10,
    rotateXDeg: 3
  });

  useReplayable3DPanel(pricingPanelRef, selectedServiceId, {
    duration: 0.44,
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
  }, [selectedServiceId, selectedGroupSize, includeOptionalLunch, preferredDate]);

  useEffect(() => {
    return () => {
      if (pricingSwitchTimelineRef.current) {
        pricingSwitchTimelineRef.current.kill();
        pricingSwitchTimelineRef.current = null;
      }
      if (serviceSwitchTimelineRef.current) {
        serviceSwitchTimelineRef.current.kill();
        serviceSwitchTimelineRef.current = null;
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

  const handleServiceSwitch = (nextServiceId: EgyptExcursionServiceId) => {
    if (nextServiceId === selectedServiceId) return;
    switchTabWithTimeline({
      outgoingEl: pricingPanelRef.current,
      timelineRef: serviceSwitchTimelineRef,
      onSwap: () => {
        setSelectedServiceId(nextServiceId);
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

  const buildAdvisorWhatsappUrl = () => {
    const msg = `Bonjour Golden Group Travels, je souhaite des renseignements pour "${copy.pageTitle}" (${selectedService.title.fr}, ${selectedGroupOptionLabel}).`;
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div
      ref={pageRootRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#ede1ce] text-[#0b1d3a]"
    >
      <ProgramTopBar
        backRoute={EGYPT_EXCURSIONS_BACK_ROUTE}
        backToCategoryLabel={copy.backToToursLabel}
        backToHomeLabel={copy.backToHomeLabel}
        rightBadgeLabel={copy.validityBadge}
        rightBadgeIcon={ShieldCheck}
        isRtl={isRtl}
      />

      {/* SECTION 1: HERO WITH OFFICIAL IMAGE & SCOPED 20 USD STARTING PRICE */}
      <ProgramHero
        heroIcon={TransfersHeroIcon}
        eyebrow={copy.heroEyebrow}
        title={copy.pageTitle}
        arabicTitle={copy.arabicTitle}
        summary={copy.officialSubtitle}
        infoBoxes={[
          {
            label: copy.servicesSectionEyebrow,
            value: copy.destinationBadge,
            icon: MapPin,
            highlight: true
          },
          {
            label: copy.pricingSectionEyebrow,
            value: copy.validityBadge,
            icon: Calendar
          }
        ]}
        startingFromLabel={copy.showcaseStartingFromLabel}
        startingPriceDisplay={copy.showcaseStartingPrice}
        startingPriceScopeNote={copy.heroStartingScopeHeadline}
        primaryCtaLabel={copy.heroViewExcursionsBtn}
        onPrimaryCta={scrollToServices}
        secondaryCtaLabel={copy.heroReserveBtn}
        onSecondaryCta={scrollToInquiry}
        image={EGYPT_EXCURSIONS_IMAGES.hero}
        imageAlt={`${copy.pageTitle} — ${copy.destinationBadge}`}
        fallbackGradient={EGYPT_EXCURSIONS_IMAGES.fallbackGradient}
        imageBadgeText={`20 USD · ${copy.serviceCardTransferNote}`}
        imageBadgeIcon={PlaneLanding}
        imageBadgeIsWarning={false}
        isRtl={isRtl}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-14">
        {/* SECTION 2: SERVICE SELECTION CARDS */}
        <section ref={servicesSectionRef} className="space-y-6 scroll-mt-28 sm:scroll-mt-36">
          <ProgramSectionHeading
            eyebrow={copy.servicesSectionEyebrow}
            title={copy.servicesSectionTitle}
            subtitle={copy.servicesSectionSubtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EGYPT_EXCURSIONS_SERVICES.map((service) => {
              const isSelected = service.id === selectedServiceId;
              const minServicePrice = service.pricesUsd[6];

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setSelectedServiceId(service.id)}
                  aria-pressed={isSelected}
                  className={`ggt-prog-card ggt-card-3d-select text-start rounded-2xl overflow-hidden flex flex-col justify-between border-2 transition-colors cursor-pointer ${
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

        <ProgramDivider />

        {/* SECTION 3: CLEAR PRICE COMPARISON BY GROUP SIZE */}
        <section className="space-y-6">
          <ProgramSectionHeading
            eyebrow={copy.pricingSectionEyebrow}
            title={copy.pricingSectionTitle}
            subtitle={copy.pricingSectionSubtitle}
            rightSlot={
              <div className="space-y-1.5 shrink-0 self-start lg:self-auto">
                <div className="text-[11px] uppercase tracking-[0.14em] font-bold text-[#0b1d3a]">
                  {copy.groupSizeSelectorLabel}
                </div>
                <ProgramTabSwitcher
                  tablistRef={groupTablistRef}
                  indicatorRef={groupIndicatorRef}
                  ariaLabel={copy.groupSizeSelectorLabel}
                  activeId={String(selectedGroupSize)}
                  onSelect={(id) =>
                    handleGroupSizeTabChange(
                      id === 'custom' ? 'custom' : (Number(id) as 2 | 4 | 6)
                    )
                  }
                  options={copy.groupSizeOptions.map((opt) => ({
                    id: String(opt.id),
                    label: opt.label,
                    mobileLabel: opt.shortTag
                  }))}
                />
              </div>
            }
          />

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

          <div ref={pricingTableCardRef} className="space-y-4">
            <ProgramComparisonTable>
              <thead>
                <tr className="bg-[#0b1d3a] text-[#fceda2] text-xs">
                  <th className="py-4 px-5 text-start font-semibold uppercase tracking-[0.14em]">
                    {copy.tableServiceHeader}
                  </th>
                  <th className="py-4 px-4 text-center font-semibold uppercase tracking-[0.12em]">
                    {copy.tableCol2Pax}
                  </th>
                  <th className="py-4 px-4 text-center font-semibold uppercase tracking-[0.12em]">
                    {copy.tableCol4Pax}
                  </th>
                  <th className="py-4 px-4 text-center font-semibold uppercase tracking-[0.12em]">
                    {copy.tableCol6Pax}
                  </th>
                  <th className="py-4 px-4 text-center font-semibold uppercase tracking-[0.12em]">
                    {copy.tableColCustom}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d1a847]/25">
                {EGYPT_EXCURSIONS_SERVICES.map((service) => {
                  const isRowActive = service.id === selectedServiceId;
                  return (
                    <tr
                      key={service.id}
                      className={isRowActive ? 'bg-[#f5ede0]/70' : 'hover:bg-[#f5ede0]/45'}
                    >
                      <td className="py-4 px-5 align-top">
                        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9a7220]">
                          {service.durationLabel[lang]}
                        </div>
                        <div className="font-serif-crest text-base font-bold text-[#0b1d3a] mt-0.5">
                          {service.title[lang]}
                        </div>
                        <div className="text-xs text-[#2c405e] mt-0.5">
                          {service.guideBadgeLabel[lang]}
                        </div>
                      </td>

                      {([2, 4, 6] as const).map((pax) => {
                        const isCellSelected =
                          selectedServiceId === service.id && selectedGroupSize === pax;
                        return (
                          <td key={pax} className="py-3 px-3 text-center">
                            <button
                              type="button"
                              onClick={() => {
                                handleServiceSwitch(service.id);
                                setSelectedGroupSize(pax);
                              }}
                              className={`ggt-card-3d-select w-full py-2.5 px-3 rounded-xl border transition-all cursor-pointer ${
                                isCellSelected
                                  ? 'bg-[#0b1d3a] text-[#fceda2] border-[#d1a847] shadow-sm font-bold'
                                  : 'bg-white hover:bg-[#ede1ce] text-[#0b1d3a] border-[#d1a847]/45 font-semibold'
                              }`}
                            >
                              <div className="font-serif-crest text-base tabular-nums">
                                {service.pricesUsd[pax]} USD
                              </div>
                            </button>
                          </td>
                        );
                      })}

                      <td className="py-3 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            handleServiceSwitch(service.id);
                            setSelectedGroupSize('custom');
                          }}
                          className={`ggt-card-3d-select w-full py-2.5 px-3 rounded-xl border transition-all cursor-pointer text-xs ${
                            selectedServiceId === service.id && selectedGroupSize === 'custom'
                              ? 'bg-[#0b1d3a] text-[#fceda2] border-[#d1a847] shadow-sm font-bold'
                              : 'bg-white hover:bg-[#ede1ce] text-[#9a7220] border-[#d1a847]/45 font-semibold'
                          }`}
                        >
                          {copy.onRequestPriceLabel}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </ProgramComparisonTable>

            <div className="rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/65 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#071429] border border-[#d1a847] text-[#fceda2] flex items-center justify-center shrink-0">
                <Utensils className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-[#0b1d3a]">{copy.lunchBannerTitle}</div>
                <p className="text-xs text-[#2c405e] leading-relaxed">{copy.lunchBannerText}</p>
              </div>
            </div>
          </div>
        </section>

        <ProgramDivider />

        {/* SECTION 3B: DARK INTERACTIVE EXCURSION & GROUP-SIZE SELECTOR PANEL */}
        <section ref={optionsSectionRef} className="space-y-6 scroll-mt-28 sm:scroll-mt-36">
          <ProgramSectionHeading
            eyebrow={copy.servicesSectionEyebrow}
            title={copy.formServiceLabel}
            subtitle={copy.pricingSectionSubtitle}
            rightSlot={
              <ProgramTabSwitcher
                tablistRef={serviceTablistRef}
                indicatorRef={serviceIndicatorRef}
                ariaLabel={copy.formServiceLabel}
                activeId={selectedServiceId}
                onSelect={handleServiceSwitch}
                options={EGYPT_EXCURSIONS_SERVICES.map((srv) => ({
                  id: srv.id,
                  label: srv.title[lang]
                }))}
              />
            }
          />

          <ProgramSelectorPanel
            panelRef={pricingPanelRef}
            eyebrow={selectedService.durationLabel[lang]}
            title={selectedService.title[lang]}
            subtitle={selectedService.summary[lang]}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProgramSelectorInfoCard
                icon={selectedService.isTransfer ? PlaneLanding : Compass}
                label={selectedService.guideBadgeLabel[lang]}
                value={selectedService.durationLabel[lang]}
                subtext={selectedService.highlights[lang].join(' · ')}
              />

              <ProgramSelectorInfoCard
                icon={Utensils}
                label={copy.lunchBannerTitle}
                value={
                  selectedService.supportsOptionalLunch
                    ? '+25 USD / pers.'
                    : copy.readySummaryLunchNA
                }
                subtext={
                  selectedService.supportsOptionalLunch
                    ? copy.lunchBannerText
                    : copy.formLunchTransferNotApplicable
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {copy.groupSizeOptions.map((opt) => {
                const isSelected = selectedGroupSize === opt.id;
                const priceDisplay =
                  opt.id === 'custom'
                    ? copy.onRequestPriceLabel
                    : `${selectedService.pricesUsd[opt.id]} USD`;
                return (
                  <ProgramSelectorChoiceCard
                    key={String(opt.id)}
                    title={opt.label}
                    subtitle={selectedService.title[lang]}
                    priceDisplay={priceDisplay}
                    actionLabel={
                      isSelected ? copy.selectedServiceBadge : copy.selectServiceAction
                    }
                    isSelected={isSelected}
                    onSelect={() => setSelectedGroupSize(opt.id)}
                    icon={Users}
                  />
                );
              })}
            </div>
          </ProgramSelectorPanel>
        </section>

        <ProgramDivider />

        {/* SECTION 4: STANDARDIZED INCLUSIONS — EXCURSIONS VS AIRPORT TRANSFER */}
        <ProgramInclusionsSection
          eyebrow={copy.inclusionsSectionEyebrow}
          title={copy.inclusionsSectionTitle}
          subtitle={copy.inclusionsSectionSubtitle}
          columnsClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          items={[
            ...copy.visitsInclusionsList.map((inc) => ({
              key: `visit-${inc.key}`,
              icon:
                inc.key === 'tickets'
                  ? Ticket
                  : inc.key === 'transport'
                  ? Car
                  : Languages,
              title: `${inc.title} · ${copy.visitsInclusionsBadge}`,
              detail: inc.detail
            })),
            ...copy.transferInclusionsList.map((inc) => ({
              key: `transfer-${inc.key}`,
              icon: inc.key === 'airportTransport' ? PlaneLanding : Languages,
              title: `${inc.title} · ${copy.transferInclusionsBadge}`,
              detail: inc.detail
            }))
          ]}
          calloutTitle={copy.exclusionsBlockTitle}
          calloutItems={copy.exclusionsItems}
          calloutIcon={XCircle}
        />

        <ProgramDivider />

        {/* SECTION 5: IMPORTANT CONDITIONS & VALIDITY NOTES */}
        <ProgramConditionsNotesGrid
          conditionsEyebrow={copy.conditionsSectionEyebrow}
          conditionsTitle={copy.conditionsSectionTitle}
          conditions={copy.conditionsList.map((condition, idx) => ({
            key: `cond-${idx}`,
            icon: idx === 1 ? Users : idx === 2 ? Calendar : ShieldCheck,
            title: condition.title,
            detail: condition.detail
          }))}
          notesEyebrow={copy.pricingSectionEyebrow}
          notesTitle={copy.validityBadge}
          notes={[
            {
              key: 'validity-scope',
              icon: Info,
              title: copy.validityBadge,
              detail: copy.quoteConditionsFooterNote
            },
            {
              key: 'lunch-supplement',
              icon: Utensils,
              title: copy.lunchBannerTitle,
              detail: copy.lunchBannerText
            }
          ]}
        />

        <ProgramDivider />

        {/* SECTION 6: STANDARDIZED INTERACTIVE RESERVATION INQUIRY */}
        <ProgramBookingSection
          sectionRef={inquirySectionRef}
          sectionId="egypt-excursions-inquiry"
          eyebrow={copy.inquirySectionEyebrow}
          title={copy.inquirySectionTitle}
          subtitle={copy.inquirySectionSubtitle}
          uid={uid}
          isRtl={isRtl}
          inquiryReady={inquiryReady}
          readyCardRef={inquiryReadyCardRef}
          readyProgramTitle={copy.pageTitle}
          readyTitle={copy.readyTitle}
          readySubtitle={copy.readySubtitle}
          readyEditBtn={copy.readyEditBtn}
          onEditInquiry={() => setInquiryReady(false)}
          readySummaryItems={[
            {
              label: copy.readySummaryService,
              value: selectedService.title[lang]
            },
            {
              label: copy.readySummaryGroup,
              value: selectedGroupOptionLabel,
              accent: true
            },
            {
              label: copy.readySummaryLunch,
              value: !selectedService.supportsOptionalLunch
                ? copy.readySummaryLunchNA
                : includeOptionalLunch
                ? copy.readySummaryLunchYes
                : copy.readySummaryLunchNo
            },
            {
              label: copy.readySummaryRate,
              value:
                priceBreakdown.status === 'priced' &&
                priceBreakdown.totalUsdPerPerson !== null
                  ? `${priceBreakdown.totalUsdPerPerson} USD / pers.`
                  : copy.onRequestPriceLabel,
              accent: true
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
          noAutoConfirmNote={copy.formNoAutoConfirmNote}
          quoteBoxRef={quoteBoxRef}
          quoteEyebrow={copy.quoteBoxEyebrow}
          quoteTitle={copy.quoteBoxTitle}
          quoteSubtitle={selectedService.title[lang]}
          quoteBodyChildren={
            <>
              {priceBreakdown.status === 'priced' &&
              priceBreakdown.baseUsdPerPerson !== null &&
              priceBreakdown.totalUsdPerPerson !== null ? (
                <ProgramQuoteRateBlock
                  breakdownRows={[
                    {
                      label: copy.quoteBasePerPersonLabel,
                      value: `${priceBreakdown.baseUsdPerPerson} USD`
                    },
                    ...(priceBreakdown.lunchSupplementUsdPerPerson > 0
                      ? [
                          {
                            label: copy.quoteOptionalLunchLabel,
                            value: `+${priceBreakdown.lunchSupplementUsdPerPerson} USD`,
                            accent: true
                          }
                        ]
                      : [])
                  ]}
                  perPersonLabel={copy.quoteTotalPerPersonLabel}
                  perPersonValue={`${priceBreakdown.totalUsdPerPerson} USD`}
                  groupLabel={
                    priceBreakdown.estimatedGroupTotalUsd !== null
                      ? `${copy.quoteEstimatedGroupTotalLabel} (${selectedGroupSize} ${copy.quoteTravelersSuffix})`
                      : undefined
                  }
                  groupValue={
                    priceBreakdown.estimatedGroupTotalUsd !== null
                      ? `${priceBreakdown.estimatedGroupTotalUsd} USD`
                      : undefined
                  }
                />
              ) : (
                <ProgramQuoteNoticeBox
                  title={
                    priceBreakdown.status === 'expired_validity'
                      ? copy.quoteExpiredStatusTitle
                      : copy.quoteCustomStatusTitle
                  }
                  text={
                    priceBreakdown.status === 'expired_validity'
                      ? copy.quoteExpiredStatusText
                      : copy.quoteCustomStatusText
                  }
                />
              )}

              <ProgramQuoteNoticeBox text={copy.quoteConditionsFooterNote} variant="neutral" />
            </>
          }
          advisorLabel={copy.advisorLabel}
          advisorTitle={copy.advisorTitle}
          advisorWhatsappHref={buildAdvisorWhatsappUrl()}
          advisorWhatsappLabel={`${copy.advisorWhatsappDirect} (${displayPhone})`}
          advisorCallLabel={copy.advisorCallBtn}
          advisorMapsLabel={copy.advisorMapsBtn}
          displayPhone={displayPhone}
          whatsappInternational={whatsappInternational}
          onJumpToHomePlanner={onJumpToHomePlanner}
        />

        {/* SECTION 7: RETURN NAVIGATION */}
        <ProgramBottomNav
          backRoute={EGYPT_EXCURSIONS_BACK_ROUTE}
          backToCategoryLabel={copy.backToToursLabel}
          backToHomeLabel={copy.backToHomeLabel}
          isRtl={isRtl}
        />
      </div>
    </div>
  );
};
