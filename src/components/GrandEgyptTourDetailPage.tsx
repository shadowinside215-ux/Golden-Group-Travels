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
  Calendar,
  Car,
  Check,
  Coffee,
  Coins,
  Compass,
  ExternalLink,
  FileCheck2,
  Info,
  Landmark,
  MapPin,
  Phone,
  Plane,
  ShieldCheck,
  Ship,
  Sun,
  Users
} from 'lucide-react';
import { Language } from '../assets/destinations';
import {
  GRAND_EGYPT_COPY,
  GRAND_EGYPT_HOTELS,
  GRAND_EGYPT_PRICING_META,
  GRAND_EGYPT_TOUR_IMAGES,
  GRAND_EGYPT_TOURS_BACK_ROUTE,
  GrandEgyptHotelId,
  GrandEgyptInclusionItem,
  GrandEgyptOccupancyId,
  evaluateGrandEgyptDates
} from '../data/grandEgyptTourData';
import { trackServiceSelection } from '../utils/analytics';
import { pulseSelection3D, useReplayable3DPanel } from '../utils/tab3DMotion';

gsap.registerPlugin(ScrollTrigger);

interface GrandEgyptTourDetailPageProps {
  lang: Language;
  isRtl: boolean;
  whatsappInternational: string;
  displayPhone: string;
  onJumpToHomePlanner: () => void;
}

const INCLUSION_ICONS: Record<GrandEgyptInclusionItem['key'], React.FC<{ className?: string }>> = {
  visa: FileCheck2,
  cairoStay: BedDouble,
  nileCruise: Ship,
  hurghadaStay: Sun,
  pyramidsGem: Landmark,
  islamicCairo: Compass,
  dinnerCruise: Ship,
  arrivalBreakfast: Coffee,
  cruiseExcursions: Compass,
  luxorHurghadaTransfer: Car,
  airportAssistance: Users,
  tips: Coins,
  domesticFlights: Plane,
  guide: Users
};

export const GrandEgyptTourDetailPage: React.FC<GrandEgyptTourDetailPageProps> = ({
  lang,
  isRtl,
  whatsappInternational,
  displayPhone,
  onJumpToHomePlanner
}) => {
  const pageRootRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLElement>(null);
  const quoteBoxRef = useRef<HTMLDivElement>(null);
  const inquiryReadyCardRef = useRef<HTMLDivElement>(null);
  const quoteMountedRef = useRef(false);
  const location = useLocation();
  const uid = useId();
  const copy = GRAND_EGYPT_COPY[lang];

  const [selectedHotelId, setSelectedHotelId] = useState<GrandEgyptHotelId>('triumph-plaza');
  const [selectedOccupancy, setSelectedOccupancy] = useState<GrandEgyptOccupancyId>('triple');
  const [includeSingleSupplement, setIncludeSingleSupplement] = useState(false);

  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelersCount, setTravelersCount] = useState<number>(20);
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
  }, [selectedHotelId, selectedOccupancy, includeSingleSupplement, travelersCount]);

  useEffect(() => {
    if (location.hash === '#grand-egypt-inquiry-form' && formSectionRef.current) {
      const id = window.setTimeout(() => {
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
      return () => window.clearTimeout(id);
    }
  }, [location.hash]);

  const dateEval = useMemo(
    () => evaluateGrandEgyptDates(departDate, returnDate),
    [departDate, returnDate]
  );

  const selectedHotel = useMemo(
    () => GRAND_EGYPT_HOTELS.find((h) => h.id === selectedHotelId) ?? GRAND_EGYPT_HOTELS[0],
    [selectedHotelId]
  );

  const pricingEligibility = useMemo(() => {
    const isExcludedOrOutside =
      dateEval.status === 'excluded_special' ||
      dateEval.status === 'outside' ||
      dateEval.status === 'invalid_range';
    const isGroupAtLeast20 = travelersCount >= GRAND_EGYPT_PRICING_META.minGroupPax;

    if (isExcludedOrOutside) {
      return {
        canQuotePublishedFare: false as const,
        reason: 'date_on_request' as const,
        baseUsd: null,
        singleSuppUsd: null
      };
    }

    if (!isGroupAtLeast20) {
      return {
        canQuotePublishedFare: false as const,
        reason: 'under_20_unpriced' as const,
        baseUsd: null,
        singleSuppUsd: null
      };
    }

    const baseUsd =
      selectedOccupancy === 'double'
        ? selectedHotel.doubleUsd
        : selectedHotel.tripleUsd;

    return {
      canQuotePublishedFare: true as const,
      reason: 'regular_eligible' as const,
      baseUsd,
      singleSuppUsd: includeSingleSupplement ? selectedHotel.singleSupplementUsd : 0
    };
  }, [dateEval.status, travelersCount, selectedHotel, selectedOccupancy, includeSingleSupplement]);

  // Snappy bidirectional 3D ScrollTrigger animations on decorative imagery, cards & headings only
  // (Never obscures or lags numeric pricing tables/badges)
  useEffect(() => {
    const root = pageRootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add(
      {
        isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        isMobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)'
      },
      (context) => {
        const isDesktop = Boolean(context.conditions?.isDesktop);

        const heroEl = root.querySelector<HTMLElement>('.ggt-egypt-hero-enter');
        if (heroEl) {
          gsap.fromTo(
            heroEl,
            isDesktop
              ? { opacity: 0, y: 18, rotateX: 4, transformPerspective: 1200 }
              : { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              force3D: true,
              duration: 0.52,
              ease: 'power3.out',
              clearProps: 'transform,opacity'
            }
          );
        }

        root.querySelectorAll<HTMLElement>('.ggt-egypt-divider').forEach((divider) => {
          gsap.fromTo(
            divider,
            { scaleX: 0.2, opacity: 0.35, transformOrigin: 'center center' },
            {
              scaleX: 1,
              opacity: 1,
              force3D: true,
              ease: 'none',
              scrollTrigger: { trigger: divider, start: 'top 96%', end: 'top 80%', scrub: 0.1 }
            }
          );
        });

        root.querySelectorAll<HTMLElement>('.ggt-egypt-heading-3d').forEach((heading) => {
          gsap.fromTo(
            heading,
            isDesktop
              ? { opacity: 0.45, y: 16, scale: 0.98, rotateX: 4.5, transformPerspective: 1100 }
              : { opacity: 0.45, y: 10 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              force3D: true,
              ease: 'none',
              scrollTrigger: { trigger: heading, start: 'top 96%', end: 'top 78%', scrub: 0.12 }
            }
          );
        });

        root.querySelectorAll<HTMLElement>('.ggt-egypt-card-3d').forEach((card, idx) => {
          const rotY = isDesktop ? (idx % 2 === 0 ? 4 : -4) : 0;
          gsap.fromTo(
            card,
            isDesktop
              ? { opacity: 0.45, y: 18, scale: 0.97, rotateY: rotY, transformPerspective: 1100 }
              : { opacity: 0.45, y: 12, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateY: 0,
              force3D: true,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top 96%', end: 'top 78%', scrub: 0.12 }
            }
          );
        });

        root.querySelectorAll<HTMLElement>('.ggt-egypt-stage-img').forEach((imgWrap) => {
          gsap.fromTo(
            imgWrap,
            isDesktop
              ? { scale: 0.95, rotateY: -4, transformPerspective: 1100 }
              : { scale: 0.98 },
            {
              scale: 1,
              rotateY: 0,
              force3D: true,
              ease: 'none',
              scrollTrigger: { trigger: imgWrap, start: 'top 96%', end: 'top 76%', scrub: 0.12 }
            }
          );
        });
      }
    );

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    return () => {
      window.clearTimeout(refreshId);
      mm.revert();
    };
  }, [lang]);

  const handleSelectHotelRow = (
    hotelId: GrandEgyptHotelId,
    occupancy?: GrandEgyptOccupancyId
  ) => {
    setSelectedHotelId(hotelId);
    if (occupancy) {
      setSelectedOccupancy(occupancy);
    }
    setInquiryReady(false);
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = (e: React.FormEvent) => {
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
    const occLabel =
      selectedOccupancy === 'double'
        ? copy.doubleOptionLabel
        : copy.tripleOptionLabel;

    let priceLine = copy.onRequestLine;
    if (pricingEligibility.canQuotePublishedFare) {
      priceLine = `${pricingEligibility.baseUsd} USD / personne (base 20+ pers., période standard)${
        includeSingleSupplement
          ? ` + Supplément single ${pricingEligibility.singleSuppUsd} USD`
          : ''
      }`;
    } else if (pricingEligibility.reason === 'under_20_unpriced') {
      priceLine = copy.under20UnpricedLine;
    }

    const lines = [
      'Bonjour Golden Group Travels,',
      `Je souhaite vérifier la disponibilité et recevoir un devis final pour : ${copy.frenchFullTitle} (${copy.arabicTitle}) — ${copy.durationLabel}.`,
      `• Date de départ souhaitée : ${departDate}${returnDate ? ` (retour souhaité : ${returnDate})` : ''}`,
      `• Nombre de voyageurs : ${travelersCount}`,
      `• Hôtel choisi au Caire (5 nuits) : ${selectedHotel.name.fr}`,
      `• Occupation : ${occLabel}${includeSingleSupplement ? ' + demande Supplément single' : ''}`,
      `• Tarif publié applicable : ${priceLine}`,
      `• Rappel : Vols intérieurs (Le Caire–Assouan & Hurghada–Le Caire) inclus / Vols internationaux NON inclus`,
      dateEval.requiresGalaCheck
        ? '• À vérifier : Dîner de gala obligatoire éventuel le 24 et/ou 31 décembre'
        : '',
      `• Nom complet : ${fullName.trim()}`,
      `• Téléphone / WhatsApp : ${phone.trim()}`,
      notes.trim() ? `• Précisions : ${notes.trim()}` : ''
    ].filter(Boolean);

    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const buildDirectFlightAddonWhatsappUrl = () => {
    const msg = `Bonjour Golden Group Travels, je souhaite des informations sur "${copy.frenchFullTitle}" (1 690 USD+ hors vols internationaux) et un devis séparé pour les vols internationaux vers Le Caire.`;
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div ref={pageRootRef} className="bg-cream-paper min-h-screen">
      {/* Top Return Navigation Bar */}
      <div className="bg-[#ede1ce]/95 border-b border-[#d1a847]/45">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to={GRAND_EGYPT_TOURS_BACK_ROUTE}
              className="ggt-btn-3d-return inline-flex items-center gap-2 px-4 min-h-[44px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/75 text-xs font-bold uppercase tracking-[0.12em] shadow-sm transition-colors whitespace-nowrap"
            >
              <ArrowLeft className={`w-4 h-4 text-[#d1a847] ggt-return-arrow ${isRtl ? 'rotate-180' : ''}`} />
              <span>{copy.backToTours}</span>
            </Link>

            <Link
              to="/"
              className="ggt-btn-3d-return inline-flex items-center gap-2 px-4 min-h-[44px] rounded-xl bg-[#fcf9f2] hover:bg-[#ede1ce] text-[#0b1d3a] border border-[#d1a847]/65 text-xs font-semibold uppercase tracking-[0.12em] transition-colors whitespace-nowrap"
            >
              <span>{copy.backToHome}</span>
            </Link>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0b1d3a]/85">
            <ShieldCheck className="w-4 h-4 text-[#c59b38] shrink-0" />
            <span>{copy.heroEyebrow}</span>
          </div>
        </div>
      </div>

      {/* A. Hero with Nile Cruise Imagery & Starting Price */}
      <section className="relative overflow-hidden bg-[#071429] text-[#f5ede0] border-b-2 border-[#d1a847]/65">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: GRAND_EGYPT_TOUR_IMAGES.fallbackGradient }}
        />
        <img
          src={GRAND_EGYPT_TOUR_IMAGES.hero}
          alt={`${copy.frenchFullTitle} — ${copy.routeStopsLine}`}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#071429] via-[#071429]/82 to-[#071429]/60"
        />

        <div className="ggt-egypt-hero-enter relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-[11px] uppercase tracking-[0.24em] text-[#d1a847] font-semibold">
                {copy.heroEyebrow}
              </div>

              <div className="space-y-2">
                <h1 className="font-serif-crest text-3xl sm:text-5xl font-semibold text-[#fcf9f2] leading-tight [text-wrap:balance]">
                  {copy.frenchFullTitle}
                </h1>
                <div
                  dir="rtl"
                  lang="ar"
                  className="text-xl sm:text-3xl font-semibold text-[#fceda2]"
                >
                  {copy.arabicTitle}
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                {copy.heroLead}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0b1d3a]/90 border border-[#d1a847]/60 text-xs font-semibold text-[#fceda2]">
                  <MapPin className="w-4 h-4 text-[#d1a847]" />
                  <span>{copy.routeStopsLine}</span>
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0b1d3a]/90 border border-[#d1a847]/60 text-xs font-semibold text-[#fcf9f2] tabular-nums">
                  <Calendar className="w-4 h-4 text-[#d1a847]" />
                  <span>{copy.durationLabel}</span>
                </span>
              </div>
            </div>

            {/* Hero Starting Price Panel (always sharp, never scroll-blurred) */}
            <div className="lg:col-span-4 rounded-2xl bg-[#0b1d3a]/95 border-2 border-[#d1a847] p-5 sm:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.45)] space-y-4">
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                  {copy.startingFromLabel}
                </div>
                <div className="font-serif-crest text-4xl font-bold text-[#fceda2] tabular-nums">
                  {copy.startingPriceDisplay}
                </div>
                <div className="text-xs text-slate-300 leading-snug">
                  {copy.startingBasisNote}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="rounded-xl bg-emerald-950/60 border border-emerald-400/45 px-3.5 py-2 flex items-center gap-2 text-emerald-100">
                  <Plane className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span className="font-medium">{copy.heroFlightIncludedShort}</span>
                </div>
                <div className="rounded-xl bg-amber-950/65 border border-amber-400/55 px-3.5 py-2 flex items-center gap-2 text-amber-100">
                  <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="font-semibold">{copy.heroFlightExcludedShort}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                className="ggt-btn-3d-return w-full inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.14em] shadow-md transition-colors cursor-pointer"
              >
                <span>{copy.reserveBtn}</span>
                <ArrowRight className={`w-4 h-4 shrink-0 ggt-forward-arrow ${isRtl ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 sm:space-y-16">
        {/* B & C. Three Visually Connected Stages + Nights Breakdown */}
        <section className="space-y-8">
          <div className="ggt-egypt-heading-3d flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
                {copy.overviewEyebrow}
              </div>
              <h2 className="font-serif-crest text-2xl sm:text-4xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
                {copy.overviewTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
                {copy.overviewSubtitle}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.14em] shrink-0 tabular-nums self-start md:self-auto">
              <Calendar className="w-4 h-4 text-[#d1a847]" />
              <span>{copy.breakdownTotalBadge}</span>
            </div>
          </div>

          {/* 3 Visually Connected Journey Stage Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            {copy.stages.map((stage, idx) => (
              <article
                key={stage.id}
                className="ggt-egypt-card-3d rounded-2xl overflow-hidden bg-[#fcf9f2] border border-[#d1a847]/60 shadow-[0_18px_40px_rgba(11,29,58,0.09)] flex flex-col"
              >
                <div
                  className="ggt-egypt-stage-img relative aspect-[16/10] overflow-hidden"
                  style={{ background: GRAND_EGYPT_TOUR_IMAGES.fallbackGradient }}
                >
                  <img
                    src={stage.image}
                    alt={`${stage.destinationTitle} — ${stage.hotelOrShip}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#071429]/90 via-[#071429]/20 to-transparent"
                  />
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-2 text-[#fcf9f2]">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.2em] text-[#fceda2] font-semibold tabular-nums">
                        {stage.stepNumber} · {stage.nightsBadge}
                      </div>
                      <h3 className="font-serif-crest text-xl font-semibold mt-0.5">
                        {stage.destinationTitle}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2.5">
                    <div className="rounded-xl bg-[#ede1ce]/75 border border-[#d1a847]/45 px-3.5 py-2.5">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-[#9a7220] font-semibold">
                        {stage.boardBasis}
                      </div>
                      <div className="font-serif-crest text-base font-semibold text-[#0b1d3a] mt-0.5">
                        {stage.hotelOrShip}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
                      {stage.summary}
                    </p>
                  </div>

                  {idx < copy.stages.length - 1 && (
                    <div className="pt-2 border-t border-[#d1a847]/30 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a7220]">
                      <span>
                        {idx === 0
                          ? 'Le Caire → Assouan (Vol intérieur inclus)'
                          : 'Louxor → Hurghada (Transfert véhicule inclus)'}
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Stage C Summary Bar */}
          <div className="rounded-2xl bg-[#071429] text-[#f5ede0] border border-[#d1a847]/65 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                {copy.breakdownEyebrow} · {copy.breakdownTitle}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
                {copy.breakdownSummaryNote}
              </p>
            </div>
            <div className="font-serif-crest text-xl font-bold text-[#fceda2] shrink-0 tabular-nums">
              5N Le Caire + 3N Nil + 3N Hurghada = 11N / 12J
            </div>
          </div>
        </section>

        <div className="ggt-egypt-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* D. Responsive Hotel & Pricing Matrix */}
        <section className="space-y-6">
          <div className="ggt-egypt-heading-3d space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.pricingEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-4xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
              {copy.pricingTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
              {copy.pricingSubtitle}
            </p>
          </div>

          {/* Season Window & Excluded Special Dates Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-[#0b1d3a] text-[#f5ede0] border border-[#d1a847]/65 p-4 space-y-1">
              <div className="text-[11px] uppercase tracking-[0.16em] text-[#d1a847] font-semibold">
                {copy.regularPeriodLabel}
              </div>
              <div className="font-serif-crest text-lg font-semibold text-[#fcf9f2] tabular-nums">
                {copy.regularPeriodValue}
              </div>
              <div className="text-xs text-[#fceda2] font-medium">{copy.arrivalDaysValue}</div>
            </div>

            <div className="rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/55 p-4 space-y-1">
              <div className="text-[11px] uppercase tracking-[0.16em] text-[#9a7220] font-semibold">
                {copy.arrivalDaysLabel}
              </div>
              <div className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                {copy.arrivalDaysValue}
              </div>
              <div className="text-xs text-[#2c405e]">{copy.usdDisclaimer}</div>
            </div>

            <div className="rounded-2xl bg-amber-50 border border-amber-400 p-4 space-y-1">
              <div className="text-[11px] uppercase tracking-[0.16em] text-amber-900 font-bold">
                {copy.excludedPeriodsLabel}
              </div>
              <div className="text-xs sm:text-sm font-bold text-amber-950 tabular-nums">
                {copy.excludedPeriodsValue}
              </div>
              <div className="text-xs font-semibold text-amber-900">
                {copy.excludedPeriodsActionValue}
              </div>
            </div>
          </div>

          {/* Desktop Table (prices never animated softly so always crisp) */}
          <div className="hidden md:block rounded-2xl overflow-hidden bg-[#fcf9f2] border border-[#d1a847]/65 shadow-[0_18px_42px_rgba(11,29,58,0.08)]">
            <table className="w-full text-left rtl:text-right border-collapse">
              <thead>
                <tr className="bg-[#0b1d3a] text-[#fceda2] text-xs uppercase tracking-[0.12em]">
                  <th className="py-4 px-5 font-semibold">{copy.hotelCol}</th>
                  <th className="py-4 px-5 font-semibold">{copy.doubleCol}</th>
                  <th className="py-4 px-5 font-semibold">{copy.tripleCol}</th>
                  <th className="py-4 px-5 font-semibold">{copy.singleSuppCol}</th>
                  <th className="py-4 px-5 font-semibold text-right rtl:text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d1a847]/30 text-sm">
                {GRAND_EGYPT_HOTELS.map((hotel) => {
                  const isSelected = selectedHotelId === hotel.id;
                  return (
                    <tr
                      key={hotel.id}
                      className={isSelected ? 'bg-[#ede1ce]/55' : 'hover:bg-[#f5ede0]/60 transition-colors'}
                    >
                      <td className="py-4 px-5">
                        <div className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                          {hotel.name[lang]}
                        </div>
                        <div className="text-xs text-[#9a7220] font-semibold mt-0.5 tabular-nums">
                          {hotel.tierLabel[lang]}
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <button
                          type="button"
                          onClick={() => handleSelectHotelRow(hotel.id, 'double')}
                          className="font-serif-crest text-xl font-bold text-[#0b1d3a] hover:text-[#9a7220] tabular-nums cursor-pointer"
                        >
                          {hotel.doubleUsd.toLocaleString('fr-FR')} USD
                        </button>
                      </td>
                      <td className="py-4 px-5">
                        <button
                          type="button"
                          onClick={() => handleSelectHotelRow(hotel.id, 'triple')}
                          className="font-serif-crest text-xl font-bold text-[#0b1d3a] hover:text-[#9a7220] tabular-nums cursor-pointer"
                        >
                          {hotel.tripleUsd.toLocaleString('fr-FR')} USD
                        </button>
                      </td>
                      <td className="py-4 px-5">
                        <div className="font-semibold text-[#9a7220] tabular-nums">
                          +{hotel.singleSupplementUsd.toLocaleString('fr-FR')} USD
                        </div>
                        <div className="text-[11px] text-[#2c405e]">{copy.singleSuppCol}</div>
                      </td>
                      <td className="py-4 px-5 text-right rtl:text-left">
                        <button
                          type="button"
                          onClick={() => handleSelectHotelRow(hotel.id)}
                          className={`ggt-card-3d-select inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847]'
                              : 'bg-[#ede1ce] hover:bg-[#0b1d3a] text-[#0b1d3a] hover:text-[#fceda2] border border-[#d1a847]/65'
                          }`}
                        >
                          {isSelected ? copy.selectedBtn : copy.selectBtn}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Cards */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {GRAND_EGYPT_HOTELS.map((hotel) => {
              const isSelected = selectedHotelId === hotel.id;
              return (
                <div
                  key={hotel.id}
                  className={`rounded-2xl bg-[#fcf9f2] p-5 space-y-4 shadow-sm ${
                    isSelected ? 'border-2 border-[#0b1d3a]' : 'border border-[#d1a847]/55'
                  }`}
                >
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-[#9a7220] font-semibold tabular-nums">
                      {hotel.tierLabel[lang]}
                    </div>
                    <h3 className="font-serif-crest text-xl font-semibold text-[#0b1d3a] mt-0.5">
                      {hotel.name[lang]}
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-[#f5ede0] border border-[#d1a847]/40 p-2.5">
                      <div className="text-[10px] uppercase tracking-wider text-[#2c405e] font-semibold">
                        {copy.doubleCol}
                      </div>
                      <div className="font-serif-crest text-base font-bold text-[#0b1d3a] tabular-nums mt-0.5">
                        {hotel.doubleUsd} USD
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#f5ede0] border border-[#d1a847]/40 p-2.5">
                      <div className="text-[10px] uppercase tracking-wider text-[#2c405e] font-semibold">
                        {copy.tripleCol}
                      </div>
                      <div className="font-serif-crest text-base font-bold text-[#0b1d3a] tabular-nums mt-0.5">
                        {hotel.tripleUsd} USD
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#ede1ce]/80 border border-[#d1a847]/50 p-2.5">
                      <div className="text-[10px] uppercase tracking-wider text-[#9a7220] font-semibold">
                        {copy.singleSuppCol}
                      </div>
                      <div className="font-semibold text-sm text-[#9a7220] tabular-nums mt-0.5">
                        +{hotel.singleSupplementUsd} USD
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectHotelRow(hotel.id)}
                    className={`ggt-card-3d-select w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer ${
                      isSelected
                        ? 'bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847]'
                        : 'bg-[#ede1ce] text-[#0b1d3a] border border-[#d1a847]'
                    }`}
                  >
                    {isSelected ? copy.selectedBtn : copy.selectBtn}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="rounded-xl bg-[#ede1ce]/75 border border-[#d1a847]/45 px-4 py-3 flex items-start gap-2.5 text-xs text-[#0b1d3a]">
            <Info className="w-4 h-4 text-[#9a7220] shrink-0 mt-0.5" />
            <span>{copy.singleSuppDisclaimer}</span>
          </div>
        </section>

        <div className="ggt-egypt-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* E. Included Services ("Le prix comprend") */}
        <section className="space-y-6">
          <div className="ggt-egypt-heading-3d space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.inclusionsEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-4xl font-semibold text-[#0b1d3a]">
              {copy.inclusionsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e]">{copy.inclusionsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {copy.inclusions.map((item, idx) => {
              const Icon = INCLUSION_ICONS[item.key];
              return (
                <div
                  key={item.key}
                  className={`ggt-egypt-card-3d rounded-2xl p-5 shadow-[0_12px_28px_rgba(11,29,58,0.06)] space-y-3 ${
                    item.pendingSourceNote
                      ? 'bg-amber-50/90 border-2 border-amber-400/75'
                      : 'bg-[#fcf9f2] border border-[#d1a847]/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="w-10 h-10 rounded-xl bg-[#0b1d3a] text-[#d1a847] border border-[#d1a847]/55 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9a7220] tabular-nums">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {item.highlightBadge && (
                      <div
                        className={`text-[10px] font-bold uppercase tracking-[0.14em] ${
                          item.pendingSourceNote ? 'text-amber-800' : 'text-emerald-800'
                        }`}
                      >
                        {item.highlightBadge}
                      </div>
                    )}
                    <h3 className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* F. Excluded Services ("Le prix ne comprend pas") & Flight Scope Distinction */}
        <section className="rounded-2xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847]/70 p-6 sm:p-8 space-y-6 shadow-[0_22px_50px_rgba(4,12,28,0.28)]">
          <div className="space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#d1a847] font-semibold">
              {copy.exclusionsEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#fcf9f2]">
              {copy.exclusionsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">{copy.exclusionsSubtitle}</p>
          </div>

          {/* Explicit Domestic Included vs International Excluded Comparison Strip */}
          <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/50 p-4 sm:p-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#d1a847]">
              {copy.domesticVsIntlBannerTitle}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="rounded-xl bg-emerald-950/60 border border-emerald-400/50 p-3.5 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{copy.domesticSideTitle}</span>
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed">{copy.domesticSideDetail}</p>
              </div>
              <div className="rounded-xl bg-amber-950/65 border border-amber-400/60 p-3.5 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{copy.internationalSideTitle}</span>
                </div>
                <p className="text-xs text-amber-100 leading-relaxed">
                  {copy.internationalSideDetail}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {copy.exclusions.map((excl) => (
              <div
                key={excl.key}
                className={`rounded-xl p-5 space-y-2.5 ${
                  excl.highlightFlights
                    ? 'bg-amber-950/65 border-2 border-amber-400/75'
                    : 'bg-[#0b1d3a] border border-[#d1a847]/45'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {excl.highlightFlights ? (
                    <Plane className="w-5 h-5 text-amber-300 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-[#d1a847] shrink-0" />
                  )}
                  <h3
                    className={`font-serif-crest text-lg font-semibold ${
                      excl.highlightFlights ? 'text-amber-200' : 'text-[#fceda2]'
                    }`}
                  >
                    {excl.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{excl.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* G. Booking Conditions ("Conditions et informations importantes") */}
        <section className="space-y-6">
          <div className="ggt-egypt-heading-3d space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.conditionsEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-4xl font-semibold text-[#0b1d3a]">
              {copy.conditionsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e]">{copy.conditionsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {copy.conditions.map((cond, idx) => (
              <div
                key={cond.id}
                className="ggt-egypt-card-3d rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/55 p-5 sm:p-6 space-y-2.5 shadow-[0_12px_30px_rgba(11,29,58,0.06)]"
              >
                <div className="flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#9a7220]">
                  <span>{cond.title}</span>
                  <span className="tabular-nums">0{idx + 1}</span>
                </div>
                <div className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                  {cond.emphasis}
                </div>
                <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">{cond.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="ggt-egypt-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />

        {/* H. Direct Golden Reservation Inquiry */}
        <section
          ref={formSectionRef}
          id="grand-egypt-inquiry-form"
          className="scroll-mt-28 space-y-6"
        >
          <div className="ggt-egypt-heading-3d space-y-1.5 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
              {copy.formEyebrow}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-4xl font-semibold text-[#0b1d3a]">
              {copy.formTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">{copy.formSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-8">
              {inquiryReady ? (
                <div
                  ref={inquiryReadyCardRef}
                  className="rounded-2xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] p-6 sm:p-8 space-y-5 shadow-xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-serif-crest text-2xl font-semibold text-[#fceda2]">
                      {copy.readyTitle}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setInquiryReady(false)}
                      className="text-xs font-semibold uppercase tracking-wider text-[#fceda2] hover:underline cursor-pointer"
                    >
                      {copy.editBtn}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div className="ggt-3d-stagger p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                      <div className="text-slate-400">{copy.departDateLabel}</div>
                      <div className="font-semibold text-white mt-0.5 tabular-nums">
                        {departDate}
                        {returnDate ? ` → ${returnDate}` : ''}
                      </div>
                    </div>
                    <div className="ggt-3d-stagger p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                      <div className="text-slate-400">{copy.hotelChoiceLabel}</div>
                      <div className="font-semibold text-white mt-0.5">{selectedHotel.name[lang]}</div>
                    </div>
                    <div className="ggt-3d-stagger p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                      <div className="text-slate-400">{copy.occupancyLabel}</div>
                      <div className="font-semibold text-white mt-0.5">
                        {selectedOccupancy === 'double'
                          ? copy.doubleOptionLabel
                          : copy.tripleOptionLabel}
                        {includeSingleSupplement ? ` (+ ${copy.singleSuppCol})` : ''}
                      </div>
                    </div>
                    <div className="ggt-3d-stagger p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                      <div className="text-slate-400">{copy.quoteBoxTitle}</div>
                      <div className="font-semibold text-[#fceda2] mt-0.5 tabular-nums">
                        {pricingEligibility.canQuotePublishedFare
                          ? `${pricingEligibility.baseUsd} USD / pers.`
                          : pricingEligibility.reason === 'under_20_unpriced'
                          ? copy.under20UnpricedLine
                          : copy.onRequestLine}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-amber-950/60 border border-amber-400/50 px-4 py-3 text-xs text-amber-100">
                    {copy.cardFlightDistinction}
                  </div>

                  <a
                    href={buildWhatsappInquiryUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ggt-btn-3d-return w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-colors"
                  >
                    <span>{copy.whatsappBtn}</span>
                    <ExternalLink className="w-4 h-4 shrink-0 ggt-forward-arrow" />
                  </a>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/60 p-5 sm:p-7 space-y-5 shadow-[0_18px_42px_rgba(11,29,58,0.08)]"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`${uid}-egypt-depart`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.departDateLabel}
                      </label>
                      <input
                        id={`${uid}-egypt-depart`}
                        type="date"
                        value={departDate}
                        onChange={(e) => setDepartDate(e.target.value)}
                        className="w-full bg-[#f5ede0]/70 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`${uid}-egypt-return`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.returnDateLabel}
                      </label>
                      <input
                        id={`${uid}-egypt-return`}
                        type="date"
                        min={departDate || undefined}
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full bg-[#f5ede0]/70 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      />
                    </div>
                  </div>

                  {/* Date Window + Weekday Arrival + Gala Dinner Advisories */}
                  <div
                    className={`rounded-xl px-4 py-3 text-xs flex items-start gap-2.5 ${
                      dateEval.status === 'excluded_special' ||
                      dateEval.status === 'outside' ||
                      dateEval.status === 'invalid_range'
                        ? 'bg-amber-50 border border-amber-400 text-amber-950'
                        : 'bg-[#ede1ce]/70 border border-[#d1a847]/45 text-[#0b1d3a]'
                    }`}
                  >
                    <Info className="w-4 h-4 text-[#9a7220] shrink-0 mt-0.5" />
                    <span className="font-medium">{copy.dateMessages[dateEval.status]}</span>
                  </div>

                  {dateEval.isArrivalSaturdayOrMonday !== null && dateEval.status === 'regular' && (
                    <div
                      className={`rounded-xl px-4 py-2.5 text-xs flex items-start gap-2.5 ${
                        dateEval.isArrivalSaturdayOrMonday
                          ? 'bg-emerald-50 border border-emerald-300 text-emerald-950'
                          : 'bg-amber-50 border border-amber-300 text-amber-950'
                      }`}
                    >
                      {dateEval.isArrivalSaturdayOrMonday ? (
                        <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      )}
                      <span>
                        {dateEval.isArrivalSaturdayOrMonday
                          ? copy.arrivalDayOkNote
                          : copy.arrivalDayWarningNote}
                      </span>
                    </div>
                  )}

                  {dateEval.requiresGalaCheck && (
                    <div className="rounded-xl bg-amber-50 border border-amber-400 px-4 py-3 text-xs text-amber-950 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span className="font-medium">{copy.galaWarningNote}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`${uid}-egypt-hotel`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.hotelChoiceLabel}
                      </label>
                      <select
                        id={`${uid}-egypt-hotel`}
                        value={selectedHotelId}
                        onChange={(e) => setSelectedHotelId(e.target.value as GrandEgyptHotelId)}
                        className="w-full bg-[#f5ede0]/70 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      >
                        {GRAND_EGYPT_HOTELS.map((h) => (
                          <option key={h.id} value={h.id}>
                            {h.name[lang]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor={`${uid}-egypt-occ`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.occupancyLabel}
                      </label>
                      <select
                        id={`${uid}-egypt-occ`}
                        value={selectedOccupancy}
                        onChange={(e) =>
                          setSelectedOccupancy(e.target.value as GrandEgyptOccupancyId)
                        }
                        className="w-full bg-[#f5ede0]/70 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      >
                        <option value="triple">{copy.tripleOptionLabel}</option>
                        <option value="double">{copy.doubleOptionLabel}</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                    <div>
                      <label
                        htmlFor={`${uid}-egypt-pax`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.travelersLabel}
                      </label>
                      <input
                        id={`${uid}-egypt-pax`}
                        type="number"
                        min={1}
                        max={80}
                        value={travelersCount}
                        onChange={(e) =>
                          setTravelersCount(Math.max(1, Math.min(80, Number(e.target.value) || 1)))
                        }
                        className="w-full bg-[#f5ede0]/70 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] tabular-nums focus:outline-none focus:border-[#0b1d3a]"
                      />
                      <div className="mt-1.5 text-[11px] font-semibold text-[#9a7220]">
                        {travelersCount >= GRAND_EGYPT_PRICING_META.minGroupPax
                          ? copy.groupMin20Ok
                          : copy.groupUnder20Notice}
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
                          {copy.singleSupplementCheckLabel}
                        </span>
                      </label>
                      <p className="text-[11px] text-[#2c405e] leading-snug ps-6">
                        {copy.singleSupplementCheckHint}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={`${uid}-egypt-name`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.nameLabel}
                      </label>
                      <input
                        id={`${uid}-egypt-name`}
                        type="text"
                        maxLength={120}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={copy.namePlaceholder}
                        className="w-full bg-[#f5ede0]/70 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`${uid}-egypt-phone`}
                        className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                      >
                        {copy.phoneLabel}
                      </label>
                      <input
                        id={`${uid}-egypt-phone`}
                        type="tel"
                        maxLength={40}
                        dir="ltr"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={copy.phonePlaceholder}
                        className="w-full bg-[#f5ede0]/70 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`${uid}-egypt-notes`}
                      className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                    >
                      {copy.notesLabel}
                    </label>
                    <textarea
                      id={`${uid}-egypt-notes`}
                      rows={2}
                      maxLength={320}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={copy.notesPlaceholder}
                      className="w-full bg-[#f5ede0]/70 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
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
                      <span>{copy.submitBtn}</span>
                      <ArrowRight className={`w-4 h-4 text-[#d1a847] ggt-forward-arrow ${isRtl ? 'rotate-180' : ''}`} />
                    </button>
                    <p className="text-[11px] text-[#2c405e] leading-relaxed">
                      {copy.noAutoConfirmNote}
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar: Strict Rate Readout (Tarif sur demande on special dates / <20 unpriced) */}
            <aside className="lg:col-span-4 space-y-5">
              <div
                ref={quoteBoxRef}
                className="rounded-2xl bg-[#0b1d3a] text-[#f5ede0] border border-[#d1a847]/65 p-5 sm:p-6 space-y-4 shadow-[0_18px_42px_rgba(4,12,28,0.25)]"
              >
                <div className="space-y-1">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                    {selectedHotel.name[lang]}
                  </div>
                  <h3 className="font-serif-crest text-xl font-semibold text-[#fcf9f2]">
                    {copy.quoteBoxTitle}
                  </h3>
                </div>

                {pricingEligibility.canQuotePublishedFare ? (
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#d1a847]/25">
                      <span className="text-slate-300">{copy.baseFareLine}</span>
                      <span className="font-serif-crest text-xl font-bold text-[#fceda2] tabular-nums">
                        {pricingEligibility.baseUsd.toLocaleString('fr-FR')} USD
                      </span>
                    </div>

                    {includeSingleSupplement && (
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#d1a847]/25">
                        <span className="text-slate-300">{copy.singleSuppLine}</span>
                        <span className="font-semibold text-[#fceda2] tabular-nums">
                          +{pricingEligibility.singleSuppUsd} USD
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded-xl bg-amber-950/65 border border-amber-400/55 p-3.5 text-xs text-amber-100 leading-relaxed">
                    {pricingEligibility.reason === 'under_20_unpriced'
                      ? copy.under20UnpricedLine
                      : copy.onRequestLine}
                  </div>
                )}

                <div className="rounded-xl bg-[#071429]/90 border border-[#d1a847]/35 p-3 text-[11px] text-slate-300 leading-relaxed">
                  {copy.cardFlightDistinction}
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
                    href={buildDirectFlightAddonWhatsappUrl()}
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
                      {copy.callAgencyBtn} · {displayPhone}
                    </span>
                  </a>

                  <button
                    type="button"
                    onClick={onJumpToHomePlanner}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-[44px] rounded-xl bg-transparent hover:bg-[#f5ede0] text-[#0b1d3a] border border-[#d1a847]/45 text-xs font-semibold uppercase tracking-[0.1em] transition-colors cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#c59b38] shrink-0" />
                    <span>Google Maps · Salé</span>
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Bottom Return Navigation */}
        <div className="ggt-egypt-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
          <Link
            to={GRAND_EGYPT_TOURS_BACK_ROUTE}
            className="ggt-btn-3d-return w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.14em] shadow-md transition-colors"
          >
            <ArrowLeft className={`w-4 h-4 text-[#d1a847] ggt-return-arrow ${isRtl ? 'rotate-180' : ''}`} />
            <span>{copy.backToTours}</span>
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
