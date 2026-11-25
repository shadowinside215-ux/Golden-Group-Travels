import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Baby,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  ExternalLink,
  Handshake,
  Luggage,
  MapPin,
  Phone,
  PlaneLanding,
  PlaneTakeoff,
  Sparkles,
  Users,
  XCircle
} from 'lucide-react';
import { Language } from '../assets/destinations';
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
import { prefersReducedMotion, pulseSelection3D, setupWindowPopScroll3D } from '../utils/tab3DMotion';

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
  const quoteBoxRef = useRef<HTMLDivElement>(null);
  const copy = EUROPE_BENELUX_COPY[lang];

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
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState<string | null>(
    null
  );

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
    if (location.hash === '#paris-benelux-inquiry') {
      const timer = window.setTimeout(() => {
        const el = document.getElementById('paris-benelux-inquiry');
        if (el) {
          el.scrollIntoView({
            behavior: prefersReducedMotion() ? 'auto' : 'smooth',
            block: 'start'
          });
        }
      }, 220);
      return () => window.clearTimeout(timer);
    }
  }, [location.hash]);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    if (!prefersReducedMotion()) {
      const hero = root.querySelector<HTMLElement>('.ggt-eur-hero');
      if (hero) {
        gsap.fromTo(
          hero,
          { opacity: 0, y: 22, scale: 0.96, rotateX: 5, transformPerspective: 1250 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.56,
            ease: 'back.out(1.15)',
            force3D: true,
            clearProps: 'transform,opacity'
          }
        );
      }
    }

    return setupWindowPopScroll3D(root, {
      headings: '.ggt-eur-heading',
      cards: '.ggt-eur-card',
      refreshDelayMs: 200
    });
  }, [lang]);

  const handleSelectCell = (depId: EuropeDepartureId, room: EuropeRoomType) => {
    setSelectedDepartureId(depId);
    setSelectedRoomType(room);
    pulseSelection3D(quoteBoxRef.current);
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
      return;
    }

    setFormErrors([]);

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

    const whatsappUrl = `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;
    setSubmittedWhatsappUrl(whatsappUrl);

    const anchor = document.createElement('a');
    anchor.href = whatsappUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div ref={pageRef} className="bg-cream-paper min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-10 sm:space-y-14">
        {/* TOP NAVIGATION BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#d1a847]/35">
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to={EUROPE_BENELUX_BACK_ROUTE}
              className="ggt-btn-3d-return inline-flex items-center gap-2 px-4 min-h-[42px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/65 text-xs font-semibold uppercase tracking-[0.12em] shadow-sm"
            >
              <ArrowLeft
                className={`w-4 h-4 text-[#d1a847] ggt-return-arrow ${isRtl ? 'rotate-180' : ''}`}
              />
              <span>{copy.backToSejours}</span>
            </Link>

            <Link
              to="/"
              className="ggt-btn-3d-return inline-flex items-center gap-1.5 px-3.5 min-h-[42px] rounded-xl bg-[#fcf9f2] hover:bg-[#ede1ce] text-[#0b1d3a] border border-[#d1a847]/55 text-xs font-semibold uppercase tracking-[0.1em]"
            >
              <span>{copy.backToHome}</span>
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#fcf9f2] border border-[#d1a847]/55 text-xs font-semibold text-[#0b1d3a]">
            <Handshake className="w-4 h-4 text-[#c59b38] shrink-0" />
            <span>{copy.heroCollaborationBadge}</span>
          </div>
        </div>

        {/* SECTION 1: HERO PRESENTATION */}
        <section className="ggt-eur-hero rounded-2xl overflow-hidden bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] shadow-[0_26px_64px_rgba(7,20,41,0.22)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 p-6 sm:p-9 lg:p-10 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#fceda2]">
                    <Sparkles className="w-3.5 h-3.5 text-[#d1a847]" />
                    <span>{copy.heroEyebrow}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#d1a847]/15 border border-[#d1a847]/50 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fceda2]">
                    <Calendar className="w-3.5 h-3.5 text-[#d1a847]" />
                    <span>{copy.heroDurationBadge}</span>
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h1 className="font-serif-crest text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#fcf9f2] leading-tight [text-wrap:balance]">
                    {copy.showcaseTitle}
                  </h1>
                  <div
                    dir="rtl"
                    lang="ar"
                    className="text-xl sm:text-2xl font-semibold text-[#fceda2]"
                  >
                    {copy.showcaseArabicTitle}
                  </div>
                </div>

                <div className="rounded-xl bg-[#0b1d3a]/85 border border-[#d1a847]/40 px-4 py-3 text-xs sm:text-sm text-[#fceda2]/95 font-medium">
                  {copy.destinationsStripLabel}
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
                  {copy.showcaseDescription}
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-[#d1a847]/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[#d1a847] font-semibold">
                      {copy.showcaseStartingFromLabel}
                    </div>
                    <div className="font-serif-crest text-3xl sm:text-4xl font-bold text-[#fceda2] tabular-nums leading-tight">
                      {copy.showcaseStartingPrice}
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5">
                      {copy.heroStartingScope}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href="#paris-benelux-inquiry"
                      className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.14em] shadow-lg"
                    >
                      <span>{copy.heroCtaReserve}</span>
                      <ArrowRight
                        className={`w-4 h-4 ggt-forward-arrow ${isRtl ? 'rotate-180' : ''}`}
                      />
                    </a>
                    <a
                      href="#paris-benelux-itinerary"
                      className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/70 text-xs font-semibold uppercase tracking-[0.12em]"
                    >
                      <span>{copy.heroCtaItinerary}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="lg:col-span-5 relative min-h-[280px] sm:min-h-[340px] lg:min-h-full overflow-hidden"
              style={{ background: EUROPE_BENELUX_IMAGES.fallbackGradient }}
            >
              <img
                src={EUROPE_BENELUX_IMAGES.hero}
                alt={`${copy.showcaseTitle} — ${copy.destinationsStripLabel}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#071429]/85 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-[#071429]/20 lg:to-[#071429]"
              />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fceda2]">
                  <PlaneTakeoff className="w-3.5 h-3.5 text-[#d1a847]" />
                  <span>{copy.showcaseDepartureLabel}</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: MANDATORY AIRLINE & BAGGAGE DISCREPANCY NOTICE */}
        <section
          aria-label={copy.airlineDiscrepancyTitle}
          className="ggt-eur-card rounded-2xl bg-amber-50 border-2 border-amber-400 p-5 sm:p-6 shadow-sm"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h2 className="font-serif-crest text-lg sm:text-xl font-bold text-amber-950">
                {copy.airlineDiscrepancyTitle}
              </h2>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                {copy.airlineDiscrepancyBody}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: EXACT PRICING & DEPARTURE MATRIX */}
        <section className="space-y-6">
          <div className="ggt-eur-heading space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.pricingEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a]">
              {copy.pricingTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
              {copy.pricingSubtitle}
            </p>
          </div>

          {/* Desktop Interactive Pricing Table */}
          <div className="ggt-eur-card hidden md:block rounded-2xl overflow-hidden bg-[#fcf9f2] border border-[#d1a847]/65 shadow-[0_14px_34px_rgba(11,29,58,0.08)]">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#0b1d3a] text-[#fceda2] text-xs uppercase tracking-[0.14em]">
                  <th className="py-4 px-5 text-start font-semibold">{copy.colDeparture}</th>
                  <th className="py-4 px-5 text-start font-semibold">{copy.colReturn}</th>
                  <th className="py-4 px-5 text-end font-semibold">{copy.colTriple}</th>
                  <th className="py-4 px-5 text-end font-semibold">{copy.colDouble}</th>
                  <th className="py-4 px-5 text-end font-semibold">{copy.colSingle}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d1a847]/30">
                {EUROPE_BENELUX_DEPARTURES.map((dep) => {
                  const isActiveRow = dep.id === selectedDepartureId;
                  return (
                    <tr
                      key={dep.id}
                      className={`transition-colors ${
                        isActiveRow ? 'bg-[#ede1ce]/55' : 'hover:bg-[#f5ede0]/70'
                      }`}
                    >
                      <td className="py-4 px-5 font-semibold text-[#0b1d3a] tabular-nums">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#c59b38] shrink-0" />
                          <span>{dep.departureDate}</span>
                          {dep.isStartingPricePeriod && (
                            <span className="px-2 py-0.5 rounded bg-[#0b1d3a] text-[#fceda2] text-[10px] font-bold uppercase tracking-wider">
                              {copy.showcaseStartingFromLabel}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-5 font-medium text-[#2c405e] tabular-nums">
                        {dep.returnDate}
                      </td>
                      {(['triple', 'double', 'single'] as const).map((roomKey) => {
                        const isSelectedCell =
                          dep.id === selectedDepartureId && selectedRoomType === roomKey;
                        return (
                          <td key={roomKey} className="py-3 px-4 text-end">
                            <button
                              type="button"
                              onClick={() => handleSelectCell(dep.id, roomKey)}
                              className={`inline-flex items-center justify-end gap-1.5 px-4 py-2 rounded-xl font-bold tabular-nums text-sm transition-all cursor-pointer ${
                                isSelectedCell
                                  ? 'bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847] shadow-md'
                                  : 'bg-[#fcf9f2] hover:bg-[#ede1ce] text-[#0b1d3a] border border-[#d1a847]/45'
                              }`}
                            >
                              <span>{formatMad(dep.pricesMad[roomKey])}</span>
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Interactive Pricing Cards */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {EUROPE_BENELUX_DEPARTURES.map((dep) => {
              const isSelectedDep = dep.id === selectedDepartureId;
              return (
                <div
                  key={dep.id}
                  className={`ggt-eur-card rounded-2xl p-4 bg-[#fcf9f2] border transition-colors space-y-3 ${
                    isSelectedDep
                      ? 'border-2 border-[#0b1d3a] shadow-md'
                      : 'border-[#d1a847]/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#d1a847]/30">
                    <div className="text-xs font-bold text-[#0b1d3a] tabular-nums">
                      {dep.departureDate} → {dep.returnDate}
                    </div>
                    {dep.isStartingPricePeriod && (
                      <span className="px-2 py-0.5 rounded bg-[#0b1d3a] text-[#fceda2] text-[10px] font-bold uppercase tracking-wider">
                        {copy.showcaseStartingFromLabel}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['triple', 'double', 'single'] as const).map((roomKey) => {
                      const active = isSelectedDep && selectedRoomType === roomKey;
                      const label =
                        roomKey === 'triple'
                          ? copy.colTriple
                          : roomKey === 'double'
                          ? copy.colDouble
                          : copy.colSingle;
                      return (
                        <button
                          key={roomKey}
                          type="button"
                          onClick={() => handleSelectCell(dep.id, roomKey)}
                          className={`rounded-xl p-2.5 text-center border transition-all cursor-pointer ${
                            active
                              ? 'bg-[#0b1d3a] text-[#fceda2] border-[#d1a847]'
                              : 'bg-[#f5ede0]/70 text-[#0b1d3a] border-[#d1a847]/45'
                          }`}
                        >
                          <div className="text-[10px] uppercase tracking-wider opacity-85">
                            {label}
                          </div>
                          <div className="text-xs font-bold tabular-nums mt-0.5">
                            {formatMad(dep.pricesMad[roomKey])}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-[#2c405e]">{copy.selectRoomHint}</p>
        </section>

        {/* SECTION 4: HOTELS (6 NIGHTS) & FLIGHT SCHEDULES */}
        <section className="space-y-6">
          <div className="ggt-eur-heading space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.hotelsFlightsEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a]">
              {copy.hotelsFlightsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Hotels Column */}
            <div className="ggt-eur-card lg:col-span-7 rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/65 p-5 sm:p-6 space-y-5 shadow-[0_14px_34px_rgba(11,29,58,0.06)]">
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

            {/* Flights & Pending Baggage Column */}
            <div className="ggt-eur-card lg:col-span-5 rounded-2xl bg-[#071429] text-[#f5ede0] border border-[#d1a847]/70 p-5 sm:p-6 space-y-4 flex flex-col justify-between shadow-[0_18px_42px_rgba(4,12,28,0.22)]">
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

        {/* SECTION 5: INTERACTIVE EXPANDABLE 7-DAY ITINERARY */}
        <section
          id="paris-benelux-itinerary"
          className="space-y-6"
        >
          <div className="ggt-eur-heading flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
                {copy.itineraryEyebrow}
              </div>
              <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a]">
                {copy.itineraryTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
                {copy.itinerarySubtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
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
          </div>

          <div className="space-y-4">
            {EUROPE_BENELUX_ITINERARY_DAYS.map((dayItem) => {
              const isOpen = expandedDays.includes(dayItem.day);
              return (
                <article
                  key={dayItem.day}
                  className={`ggt-eur-card rounded-2xl overflow-hidden bg-[#fcf9f2] border transition-all duration-200 ${
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

        {/* SECTION 6: INCLUSIONS & EXCLUSIONS */}
        <section className="space-y-6">
          <div className="ggt-eur-heading space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.inclusionsEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a]">
              {copy.inclusionsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Inclusions */}
            <div className="ggt-eur-card rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/65 p-5 sm:p-7 space-y-4 shadow-[0_14px_34px_rgba(11,29,58,0.06)]">
              <h3 className="font-serif-crest text-xl font-semibold text-[#0b1d3a] pb-3 border-b border-[#d1a847]/30 flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-700" />
                <span>{copy.priceIncludesHeading}</span>
              </h3>
              <ul className="space-y-2.5">
                {EUROPE_BENELUX_INCLUSIONS[lang].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0b1d3a] leading-relaxed"
                  >
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="ggt-eur-card rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/65 p-5 sm:p-7 space-y-4 shadow-[0_14px_34px_rgba(11,29,58,0.06)]">
              <h3 className="font-serif-crest text-xl font-semibold text-[#0b1d3a] pb-3 border-b border-[#d1a847]/30 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-700" />
                <span>{copy.priceExcludesHeading}</span>
              </h3>
              <ul className="space-y-3">
                {EUROPE_BENELUX_EXCLUSIONS[lang].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0b1d3a] leading-relaxed"
                  >
                    <XCircle className="w-4 h-4 text-rose-700 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 7: CHILDREN & FAMILY PRICING POLICY */}
        <section className="space-y-6">
          <div className="ggt-eur-heading space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.childPolicyEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a]">
              {copy.childPolicyTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EUROPE_BENELUX_CHILD_POLICIES.map((pol) => (
              <div
                key={pol.id}
                className="ggt-eur-card rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/65 p-5 space-y-3 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9a7220]">
                    <Baby className="w-4 h-4 shrink-0" />
                    <span>{pol.ageBracket[lang]}</span>
                  </div>
                  <div className="font-serif-crest text-xl font-bold text-[#0b1d3a] tabular-nums">
                    {pol.rateBadge[lang]}
                  </div>
                </div>
                <p className="text-xs text-[#2c405e] leading-relaxed pt-2 border-t border-[#d1a847]/25">
                  {pol.details[lang]}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#2c405e] leading-relaxed">
            {copy.childPolicyDisclaimer}
          </p>
        </section>

        {/* SECTION 8: WHATSAPP RESERVATION INQUIRY & SUMMARY */}
        <section id="paris-benelux-inquiry" className="space-y-6">
          <div className="ggt-eur-heading space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.inquiryEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a]">
              {copy.inquiryTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
              {copy.inquirySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Inquiry Form */}
            <div className="ggt-eur-card lg:col-span-8 rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/65 p-5 sm:p-8 shadow-[0_16px_40px_rgba(11,29,58,0.08)]">
              {submittedWhatsappUrl ? (
                <div className="space-y-5 py-4 text-center sm:text-start">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif-crest text-2xl font-semibold text-[#0b1d3a]">
                      {copy.submittedTitle}
                    </h3>
                    <p className="text-sm text-[#2c405e] leading-relaxed max-w-xl">
                      {copy.submittedBody}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={submittedWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.14em]"
                    >
                      <span>{copy.openWhatsappAgain}</span>
                      <ExternalLink className="w-4 h-4 text-[#d1a847]" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedWhatsappUrl(null)}
                      className="inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#ede1ce] hover:bg-[#e3d2b6] text-[#0b1d3a] border border-[#d1a847]/60 text-xs font-semibold uppercase tracking-[0.12em] cursor-pointer"
                    >
                      <span>{copy.submittedNewBtn}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="space-y-5" noValidate>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`${uid}-eur-name`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.formNameLabel} *
                      </label>
                      <input
                        id={`${uid}-eur-name`}
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
                        htmlFor={`${uid}-eur-phone`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.formPhoneLabel} *
                      </label>
                      <input
                        id={`${uid}-eur-phone`}
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
                      htmlFor={`${uid}-eur-notes`}
                      className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                    >
                      {copy.formNotesLabel}
                    </label>
                    <textarea
                      id={`${uid}-eur-notes`}
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

            {/* Right Sidebar: Live Adult Rate Summary + Direct Advisor */}
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
                  <div className="text-xs text-slate-300 pt-0.5 tabular-nums">
                    {selectedDeparture.departureDate} → {selectedDeparture.returnDate} ·{' '}
                    {roomLabel(selectedRoomType)}
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="pt-1">
                    <div className="text-[11px] text-slate-400">
                      {copy.quoteVerifiedPerPerson}
                    </div>
                    <div className="font-serif-crest text-3xl font-bold text-[#fceda2] tabular-nums mt-0.5">
                      {formatMad(adultRatePerPersonMad)}
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#071429] border border-[#d1a847]/45 p-3 flex items-center justify-between gap-2">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#d1a847]" />
                      <span>
                        {copy.quoteVerifiedAdultsTotal} ({adultsCount})
                      </span>
                    </span>
                    <span className="font-serif-crest text-lg font-bold text-[#fceda2] tabular-nums">
                      {formatMad(adultsSubtotalMad)}
                    </span>
                  </div>
                </div>

                {(childInquiryOption !== 'none' || familyRoomInquiry) && (
                  <div className="rounded-xl bg-amber-950/65 border border-amber-400/50 p-3.5 space-y-1.5 text-xs text-amber-100">
                    <div className="font-bold text-amber-200">
                      {copy.quotePendingBlockTitle}
                    </div>
                    {childInquiryOption !== 'none' && (
                      <div>• {childInquiryLabel(childInquiryOption)}</div>
                    )}
                    {familyRoomInquiry && <div>• {copy.formFamilyRoomCheck}</div>}
                  </div>
                )}

                <div className="rounded-xl bg-[#071429]/90 border border-[#d1a847]/35 p-3 text-[11px] text-slate-300 leading-relaxed">
                  {copy.quoteNoAutoChildDiscountNote}
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

        {/* SECTION 9: BOTTOM RETURN LINKS */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
          <Link
            to={EUROPE_BENELUX_BACK_ROUTE}
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
