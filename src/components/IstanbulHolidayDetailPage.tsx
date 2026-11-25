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
  Briefcase,
  Calendar,
  Check,
  Clock,
  Compass,
  ExternalLink,
  Info,
  Luggage,
  MapPin,
  Phone,
  PlaneTakeoff,
  ShieldCheck,
  Sparkles,
  Users,
  XCircle
} from 'lucide-react';
import { Language } from '../assets/destinations';
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
  const inquirySectionRef = useRef<HTMLElement>(null);
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

  useSlidingTabIndicator(dayTablistRef, dayIndicatorRef, String(activeDayNumber), [lang, isRtl]);

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
      if (daySwitchTimelineRef.current) {
        daySwitchTimelineRef.current.kill();
        daySwitchTimelineRef.current = null;
      }
    };
  }, []);

  // 3D Window Pop-Out ScrollTrigger motion — smooth down and up
  useEffect(() => {
    const root = pageRootRef.current;
    if (!root) return;
    return setupWindowPopScroll3D(root, {
      headings: '.ggt-ist-heading',
      cards: '.ggt-ist-card',
      dividers: '.ggt-ist-divider',
      refreshDelayMs: 180
    });
  }, [lang]);

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

  return (
    <div
      ref={pageRootRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#ede1ce] text-[#0b1d3a]"
    >
      {/* Top Return Navigation */}
      <div className="bg-[#071429] border-b border-[#d1a847]/35">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to={ISTANBUL_HOLIDAY_BACK_ROUTE}
              className="ggt-btn-3d-return inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/60 text-xs font-semibold uppercase tracking-wider"
            >
              <ArrowLeft
                className={`w-3.5 h-3.5 text-[#d1a847] ggt-return-arrow ${isRtl ? 'rotate-180' : ''}`}
              />
              <span>{copy.backToSejours}</span>
            </Link>

            <Link
              to="/"
              className="ggt-btn-3d-return inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-transparent hover:bg-[#0b1d3a] text-slate-200 border border-[#d1a847]/30 text-xs font-medium"
            >
              <span>{copy.backToHome}</span>
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/45 text-[11px] font-semibold text-[#fceda2]">
            <PlaneTakeoff className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
            <span>{copy.heroDepartureCity}</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: HERO WITH ISTANBUL IMAGERY & STARTING PRICE */}
      <section className="relative bg-[#071429] text-[#f5ede0] overflow-hidden border-b-2 border-[#d1a847]/55">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/55 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#d1a847]">
                <Compass className="w-3.5 h-3.5 shrink-0" />
                <span>{copy.heroEyebrow}</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-serif-crest text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#fcf9f2] leading-[1.12] [text-wrap:balance]">
                  {copy.heroTitle}
                </h1>
                <div
                  dir="rtl"
                  lang="ar"
                  className="text-xl sm:text-2xl font-semibold text-[#fceda2]"
                >
                  {copy.heroArabicTitle}
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                  {copy.heroSubtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b1d3a]/90 border border-[#d1a847]/40 text-[#fceda2] font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
                  <span>{copy.heroDepartureCity}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b1d3a]/90 border border-[#d1a847]/40 text-slate-100 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
                  <span>05/12/2026 & 26/12/2026</span>
                </span>
              </div>

              {/* Scoped 7,300 DH Starting Price Notice (Hotel Delta 3★ Triple Room) */}
              <div className="rounded-xl bg-[#0b1d3a] border-2 border-[#d1a847] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_14px_34px_rgba(0,0,0,0.28)]">
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[#d1a847] font-semibold">
                    {copy.showcaseStartingFromLabel}
                  </div>
                  <div className="font-serif-crest text-3xl sm:text-4xl font-bold text-[#fceda2] tabular-nums">
                    {copy.showcaseStartingPrice}
                  </div>
                </div>
                <div className="sm:max-w-xs text-xs text-slate-100 leading-relaxed border-t sm:border-t-0 sm:border-s border-[#d1a847]/35 pt-3 sm:pt-0 sm:ps-4">
                  <span className="font-semibold text-[#fceda2] block">
                    {copy.heroStartingScope}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    hotelsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.14em] shadow-lg cursor-pointer"
                >
                  <span>{copy.heroInspectHotelsBtn}</span>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 ggt-forward-arrow ${isRtl ? 'rotate-180' : ''}`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    inquirySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/70 text-xs font-semibold uppercase tracking-[0.12em] cursor-pointer"
                >
                  <span>{copy.heroReserveBtn}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                className="relative rounded-2xl overflow-hidden border-2 border-[#d1a847]/75 shadow-[0_24px_56px_rgba(0,0,0,0.4)] aspect-[16/11]"
                style={{ background: ISTANBUL_HOLIDAY_IMAGES.fallbackGradient }}
              >
                <img
                  src={ISTANBUL_HOLIDAY_IMAGES.hero}
                  alt={`${copy.heroTitle} — Istanbul`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#071429]/85 via-transparent to-[#071429]/20"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold text-[#fceda2]">
                    <BedDouble className="w-3.5 h-3.5 text-[#d1a847]" />
                    <span>Hotel Delta 3★ · Zagreb 4★ · Ilkbal Deluxe 4★</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-14">
        {/* SECTION 2: PACKAGE OVERVIEW & FLAGGED CONFIRMATIONS */}
        <section className="space-y-6">
          <div className="ggt-ist-heading space-y-2 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.overviewEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
              {copy.overviewTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
              {copy.overviewText}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {copy.overviewStats.map((stat, idx) => (
              <div
                key={idx}
                className="ggt-ist-card rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/55 p-4 sm:p-5 shadow-sm"
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

          {/* Transparent Company-Confirmation Flags */}
          <div className="rounded-2xl bg-amber-50 border-2 border-amber-400 p-5 sm:p-6 space-y-3 shadow-sm">
            <div className="flex items-center gap-2.5 text-sm font-bold text-amber-950">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
              <h3>{copy.discrepanciesTitle}</h3>
            </div>
            <ul className="space-y-2 text-xs text-amber-950 leading-relaxed">
              {copy.discrepanciesList.map((flag, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-bold text-amber-700 mt-0.5">•</span>
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="ggt-ist-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* SECTION 3: HOTEL SELECTION & EXACT PRICE COMPARISON (DH / MAD) */}
        <section ref={hotelsSectionRef} className="space-y-6 scroll-mt-20">
          <div className="ggt-ist-heading space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.hotelsEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
              {copy.hotelsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
              {copy.hotelsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ISTANBUL_HOTELS.map((hotel) => {
              const isSelected = hotel.id === selectedHotelId;
              return (
                <div
                  key={hotel.id}
                  onClick={() => setSelectedHotelId(hotel.id)}
                  className={`ggt-ist-card ggt-card-3d-select rounded-2xl p-5 sm:p-6 flex flex-col justify-between border-2 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#071429] text-[#f5ede0] border-[#d1a847] shadow-[0_20px_44px_rgba(7,20,41,0.22)]'
                      : 'bg-[#fcf9f2] text-[#0b1d3a] border-[#d1a847]/50 hover:border-[#d1a847] shadow-sm'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#d1a847]/30">
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.14em] text-[#d1a847] font-semibold">
                          {hotel.badge[lang]}
                        </div>
                        <h3
                          className={`font-serif-crest text-xl font-bold mt-1 ${
                            isSelected ? 'text-[#fcf9f2]' : 'text-[#0b1d3a]'
                          }`}
                        >
                          {hotel.name[lang]}
                        </h3>
                      </div>
                      {isSelected && (
                        <span className="px-2.5 py-1 rounded-md bg-[#d1a847] text-[#0b1d3a] text-[10px] font-bold uppercase tracking-wider shrink-0">
                          {copy.selectedHotelBadge}
                        </span>
                      )}
                    </div>

                    {/* Exact Departure & Return Dates */}
                    <div
                      className={`rounded-xl p-3 text-xs space-y-1.5 ${
                        isSelected
                          ? 'bg-[#0b1d3a] border border-[#d1a847]/35'
                          : 'bg-[#f5ede0]/80 border border-[#d1a847]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={isSelected ? 'text-slate-300' : 'text-[#2c405e]'}>
                          {copy.departureColLabel} :
                        </span>
                        <span className="font-bold tabular-nums">{hotel.departureDateDisplay}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className={isSelected ? 'text-slate-300' : 'text-[#2c405e]'}>
                          {copy.returnColLabel} :
                        </span>
                        <span
                          className={`font-bold tabular-nums ${
                            hotel.returnDateConfirmed
                              ? ''
                              : isSelected
                              ? 'text-amber-300'
                              : 'text-amber-800'
                          }`}
                        >
                          {hotel.returnDateDisplay[lang]}
                        </span>
                      </div>
                    </div>

                    {hotel.returnDateDiscrepancyNote && (
                      <div className="rounded-xl bg-amber-950/85 border border-amber-400/70 p-3 text-[11px] text-amber-100 flex items-start gap-2 leading-snug">
                        <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                        <span>{hotel.returnDateDiscrepancyNote[lang]}</span>
                      </div>
                    )}

                    {/* Exact Per-Person MAD Prices by Room Occupancy */}
                    <div className="space-y-2 text-sm">
                      {(['triple', 'double', 'single'] as const).map((rt) => {
                        const activeCell = isSelected && selectedRoomType === rt;
                        return (
                          <button
                            key={rt}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedHotelId(hotel.id);
                              setSelectedRoomType(rt);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                              activeCell
                                ? 'bg-[#d1a847] text-[#0b1d3a] border-[#fceda2] font-bold'
                                : isSelected
                                ? 'bg-[#0b1d3a] text-[#fcf9f2] border-[#d1a847]/35 hover:border-[#d1a847]'
                                : 'bg-[#f5ede0]/70 text-[#0b1d3a] border-[#d1a847]/35 hover:bg-[#ede1ce]'
                            }`}
                          >
                            <span>{roomLabel(rt)}</span>
                            <span className="font-bold text-sm tabular-nums">
                              {formatMad(hotel.pricesMad[rt])}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#d1a847]/25 flex items-center justify-between text-xs font-bold">
                    <span className={isSelected ? 'text-[#fceda2]' : 'text-[#9a7220]'}>
                      {isSelected ? copy.selectedHotelBadge : copy.selectHotelAction}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 text-[#d1a847] ${isRtl ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="ggt-ist-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* SECTION 4: INTERACTIVE 7-DAY ITINERARY */}
        <section className="space-y-6">
          <div className="ggt-ist-heading space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.itineraryEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
              {copy.itineraryTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
              {copy.itinerarySubtitle}
            </p>
          </div>

          {/* 7-Day Selector Tablist with Smooth Sliding Indicator */}
          <div
            ref={dayTablistRef}
            role="tablist"
            aria-label={copy.itineraryTitle}
            className="relative flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-2xl bg-[#071429] border border-[#d1a847]/65 shadow-md"
          >
            <span
              ref={dayIndicatorRef}
              aria-hidden="true"
              className="ggt-tab-indicator-pill rounded-xl bg-[#d1a847]"
            />
            {ISTANBUL_ITINERARY_DAYS.map((day) => {
              const active = day.dayNumber === activeDayNumber;
              return (
                <button
                  key={day.dayNumber}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  data-tab-key={String(day.dayNumber)}
                  onClick={() => handleDaySelect(day.dayNumber)}
                  className={`ggt-tab-3d relative z-10 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active ? 'text-[#0b1d3a]' : 'text-[#fceda2] hover:text-white'
                  }`}
                >
                  {day.dayCode[lang]}
                </button>
              );
            })}
          </div>

          {/* Active Day Content Card with Replayable 3D Transition */}
          <div
            ref={dayPanelRef}
            className="rounded-2xl overflow-hidden bg-[#fcf9f2] border-2 border-[#d1a847]/70 shadow-[0_20px_48px_rgba(11,29,58,0.1)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-5 relative min-h-[220px] sm:min-h-[260px] overflow-hidden">
                <img
                  src={activeDay.image}
                  alt={`${activeDay.dayCode[lang]} — ${activeDay.title[lang]}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#071429]/85 via-transparent to-transparent"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-lg bg-[#d1a847] text-[#0b1d3a] text-xs font-bold uppercase tracking-wider">
                    {activeDay.dayCode[lang]}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#071429]/90 border border-[#d1a847]/60 text-[11px] text-[#fceda2] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#d1a847]" />
                    <span>{activeDay.title[lang]}</span>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
                <div className="space-y-1 pb-3 border-b border-[#d1a847]/35">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-[#9a7220] font-semibold">
                    {activeDay.scheduleNote[lang]}
                  </div>
                  <h3 className="font-serif-crest text-2xl sm:text-3xl font-bold text-[#0b1d3a]">
                    {activeDay.dayCode[lang]} — {activeDay.title[lang]}
                  </h3>
                </div>

                <ul className="space-y-2.5">
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
            </div>
          </div>
        </section>

        <div className="ggt-ist-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* SECTION 5: BASE PACKAGE INCLUSIONS & EXCLUSIONS */}
        <section className="space-y-6">
          <div className="ggt-ist-heading space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.inclusionsEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
              {copy.inclusionsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="ggt-ist-card lg:col-span-7 rounded-2xl bg-[#071429] text-[#f5ede0] border border-[#d1a847]/65 p-6 sm:p-7 space-y-4 shadow-[0_18px_42px_rgba(7,20,41,0.18)]">
              <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-[#fceda2] pb-3 border-b border-[#d1a847]/30">
                {copy.inclusionsBaseHeading}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                {ISTANBUL_BASE_INCLUSIONS[lang].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-snug">
                    <Check className="w-4 h-4 text-[#d1a847] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ggt-ist-card lg:col-span-5 rounded-2xl bg-[#fcf9f2] text-[#0b1d3a] border-2 border-[#d1a847]/65 p-6 sm:p-7 space-y-4 shadow-sm">
              <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-[#0b1d3a] pb-3 border-b border-[#d1a847]/35">
                {copy.exclusionsBaseHeading}
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm">
                {ISTANBUL_BASE_EXCLUSIONS[lang].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-snug text-[#2c405e]">
                    <XCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="ggt-ist-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* SECTION 6: OPTIONAL VIP EXCURSION PACKAGE (PACK D'ISTANBUL VIP — 1,480 DH) */}
        <section className="space-y-6">
          <div className="ggt-ist-card rounded-2xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] p-6 sm:p-8 space-y-6 shadow-[0_22px_52px_rgba(7,20,41,0.22)]">
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

        <div className="ggt-ist-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* SECTION 7: OPTIONAL BAGGAGE PRICING */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="ggt-ist-heading space-y-1.5 max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
                {copy.baggageEyebrow}
              </div>
              <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
                {copy.baggageTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
                {copy.baggageSubtitle}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847]/55 text-xs font-bold shrink-0 self-start">
              <Luggage className="w-4 h-4 text-[#d1a847]" />
              <span>{copy.baggageNotIncludedBadge}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ISTANBUL_BAGGAGE_OPTIONS.filter((b) => b.id !== 'cabin-only').map((bag) => (
              <button
                key={bag.id}
                type="button"
                onClick={() => setSelectedBaggageId(bag.id)}
                className={`ggt-ist-card text-start rounded-2xl p-5 border-2 flex flex-col justify-between gap-3 transition-colors cursor-pointer ${
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
                  <span className="font-serif-crest text-xl font-bold text-[#d1a847] tabular-nums">
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

        <div className="ggt-ist-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* SECTION 8: COMPANY-OPERATED RESERVATION INQUIRY (NO TRAVELPAYOUTS WIDGET) */}
        <section
          ref={inquirySectionRef}
          id="istanbul-holiday-inquiry"
          className="space-y-6 scroll-mt-20"
        >
          <div className="ggt-ist-heading space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.inquiryEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
              {copy.inquiryTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
              {copy.inquirySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
            <div className="lg:col-span-8">
              {inquiryReady ? (
                <div
                  ref={readyCardRef}
                  className="rounded-2xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] p-6 sm:p-8 space-y-6 shadow-[0_24px_56px_rgba(7,20,41,0.22)]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#d1a847]/30">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                        {copy.heroTitle}
                      </div>
                      <h3 className="font-serif-crest text-2xl font-semibold text-[#fcf9f2]">
                        {copy.readyTitle}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInquiryReady(false)}
                      className="self-start sm:self-auto px-3.5 py-2 rounded-lg bg-[#0b1d3a] hover:bg-[#132d56] border border-[#d1a847]/55 text-xs font-semibold text-[#fceda2] cursor-pointer"
                    >
                      {copy.readyEditBtn}
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {copy.readySubtitle}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3.5">
                      <div className="text-slate-400">{copy.formHotelLabel}</div>
                      <div className="font-semibold text-[#fcf9f2] mt-0.5">
                        {selectedHotel.name[lang]} · {roomLabel(selectedRoomType)}
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3.5">
                      <div className="text-slate-400">{copy.formDepartureLabel}</div>
                      <div className="font-semibold text-[#fceda2] mt-0.5 tabular-nums">
                        {selectedHotel.departureDateDisplay} →{' '}
                        {selectedHotel.returnDateDisplay[lang]}
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3.5">
                      <div className="text-slate-400">{copy.quoteVerifiedPerPerson}</div>
                      <div className="font-bold text-[#fceda2] mt-0.5 tabular-nums">
                        {formatMad(verifiedHotelPricePerPersonMad)} ({travelersCount} pers. ={' '}
                        {formatMad(verifiedBaseSubtotalMad)})
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3.5">
                      <div className="text-slate-400">VIP & Bagage</div>
                      <div className="font-semibold text-[#fcf9f2] mt-0.5">
                        {interestedInVip ? 'Pack VIP (1 480 DH*) · ' : ''}
                        {selectedBaggage.label[lang]}
                      </div>
                    </div>
                  </div>

                  <a
                    href={buildWhatsappInquiryUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ggt-btn-3d-return w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-colors"
                  >
                    <span>{copy.readyWhatsappBtn}</span>
                    <ExternalLink className="w-4 h-4 shrink-0 ggt-forward-arrow" />
                  </a>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/65 p-5 sm:p-7 space-y-5 shadow-[0_18px_42px_rgba(11,29,58,0.08)]"
                >
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

                  {/* Optional Pack d'Istanbul VIP Interest Checkbox */}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`${uid}-ist-name`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.formNameLabel} *
                      </label>
                      <input
                        id={`${uid}-ist-name`}
                        type="text"
                        maxLength={120}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={copy.formNamePlaceholder}
                        className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`${uid}-ist-phone`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.formPhoneLabel} *
                      </label>
                      <input
                        id={`${uid}-ist-phone`}
                        type="tel"
                        maxLength={40}
                        dir="ltr"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={copy.formPhonePlaceholder}
                        className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`${uid}-ist-notes`}
                      className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                    >
                      {copy.formNotesLabel}
                    </label>
                    <textarea
                      id={`${uid}-ist-notes`}
                      rows={2}
                      maxLength={320}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={copy.formNotesPlaceholder}
                      className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
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
                      <span>{copy.formSubmitBtn}</span>
                      <ArrowRight
                        className={`w-4 h-4 text-[#d1a847] ggt-forward-arrow ${isRtl ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <p className="text-[11px] text-[#2c405e] leading-relaxed">
                      {copy.formNoAutoConfirm}
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Right Sidebar: Verified Base DH Rate Breakdown (NEVER mixes unconfirmed VIP/baggage totals) */}
            <aside className="lg:col-span-4 space-y-5">
              <div
                ref={quoteBoxRef}
                className="rounded-2xl bg-[#0b1d3a] text-[#f5ede0] border border-[#d1a847]/65 p-5 sm:p-6 space-y-4 shadow-[0_18px_42px_rgba(4,12,28,0.25)]"
              >
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                    {copy.quoteBoxEyebrow}
                  </div>
                  <h3 className="font-serif-crest text-xl font-semibold text-[#fcf9f2]">
                    {copy.quoteBoxTitle}
                  </h3>
                  <div className="text-xs text-slate-300 pt-0.5">
                    {selectedHotel.name[lang]} · {roomLabel(selectedRoomType)}
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="pt-1">
                    <div className="text-[11px] text-slate-400">{copy.quoteVerifiedPerPerson}</div>
                    <div className="font-serif-crest text-3xl font-bold text-[#fceda2] tabular-nums mt-0.5">
                      {formatMad(verifiedHotelPricePerPersonMad)}
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#071429] border border-[#d1a847]/45 p-3 flex items-center justify-between gap-2">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#d1a847]" />
                      <span>
                        {copy.quoteVerifiedBaseGroup} ({travelersCount})
                      </span>
                    </span>
                    <span className="font-serif-crest text-lg font-bold text-[#fceda2] tabular-nums">
                      {formatMad(verifiedBaseSubtotalMad)}
                    </span>
                  </div>
                </div>

                {/* Unconfirmed Options Shown Separately — NEVER Added Into Total */}
                {(interestedInVip || selectedBaggageId !== 'cabin-only') && (
                  <div className="rounded-xl bg-amber-950/65 border border-amber-400/50 p-3.5 space-y-1.5 text-xs text-amber-100">
                    <div className="font-bold text-amber-200">
                      {copy.quotePendingConfirmationTitle}
                    </div>
                    {interestedInVip && <div>• {copy.quoteVipPendingLine}</div>}
                    {selectedBaggageId !== 'cabin-only' && (
                      <div>
                        • {copy.quoteBaggageLine} : {selectedBaggage.label[lang]}
                      </div>
                    )}
                  </div>
                )}

                <div className="rounded-xl bg-[#071429]/90 border border-[#d1a847]/35 p-3 text-[11px] text-slate-300 leading-relaxed">
                  {copy.quoteNoUnconfirmedSumNote}
                </div>
              </div>

              <div className="rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/60 p-5 sm:p-6 space-y-4 shadow-sm">
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                    {copy.advisorLabel}
                  </div>
                  <h4 className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                    {copy.advisorTitle}
                  </h4>
                </div>

                <div className="space-y-2.5">
                  <a
                    href={`https://wa.me/${whatsappInternational}`}
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
                    <span>{copy.advisorMapsLabel}</span>
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* SECTION 9: RETURN TO HOMEPAGE & SÉJOURS */}
        <div className="ggt-ist-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
          <Link
            to={ISTANBUL_HOLIDAY_BACK_ROUTE}
            className="ggt-btn-3d-return w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.14em] shadow-md transition-colors"
          >
            <ArrowLeft
              className={`w-4 h-4 text-[#d1a847] ggt-return-arrow ${isRtl ? 'rotate-180' : ''}`}
            />
            <span>{copy.backToSejours}</span>
          </Link>

          <Link
            to="/"
            className="ggt-btn-3d-return w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#fcf9f2] hover:bg-[#ede1ce] text-[#0b1d3a] border border-[#d1a847]/65 text-xs font-semibold uppercase tracking-[0.12em] transition-colors"
          >
            <span>{copy.backToHome}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
