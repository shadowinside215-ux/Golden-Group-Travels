import React, { useEffect, useId, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertCircle,
  ArrowRight,
  Car,
  ExternalLink,
  Layers,
  MapPin,
  PlaneLanding,
  ShieldCheck
} from 'lucide-react';
import { Language, ServiceId } from '../assets/destinations';
import { SEARCH_ENGINE_PACKS } from '../assets/searchEngineData';
import { EXPEDIA_WIDGET_COPY } from '../assets/servicePagesData';
import {
  AIRPORT_TRANSFERS_WIDGETS,
  CAR_RENTALS_PROMO_BANNER,
  CAR_RENTALS_WIDGETS,
  CarTransfersFilterId,
  FLIGHTS_OFFERS_WIDGET,
  POPULAR_TOUR_DESTINATIONS,
  SEARCH_CATEGORY_ORDER,
  SEARCH_CATEGORY_TO_SERVICE,
  SERVICE_SECTION_IDS,
  SearchCategoryId,
  TOURS_AFFILIATE_PARTNERS,
  TOURS_WIDGETS
} from '../config/travelSuppliers';
import { ServiceSelectionEventName, trackServiceSelection } from '../utils/analytics';
import { AviasalesFlightWidget } from './AviasalesFlightWidget';
import { ExpediaFlightWidget } from './ExpediaFlightWidget';
import { ExpediaSearchWidget } from './ExpediaSearchWidget';
import { IsolatedWidgetFrame } from './IsolatedWidgetFrame';
import {
  CarRentalServiceIcon,
  FlightServiceIcon,
  HajjUmrahServiceIcon,
  HolidayPackagesServiceIcon,
  HotelServiceIcon,
  ToursActivitiesServiceIcon
} from './ServiceIcons';
import { ThirdPartyScriptWidget } from './ThirdPartyScriptWidget';

gsap.registerPlugin(ScrollTrigger);

interface TravelSearchEngineProps {
  lang: Language;
  isRtl: boolean;
  activeCategory: SearchCategoryId;
  onCategoryChange: (category: SearchCategoryId) => void;
  onSelectHeroOrSection?: (category: SearchCategoryId) => void;
  onOpenServicePage?: (serviceId: ServiceId) => void;
  onJumpToPlanner?: () => void;
  whatsappInternational: string;
  displayPhone: string;
  visibleCategories?: SearchCategoryId[];
  embeddedOnServicePage?: boolean;
}

const CATEGORY_ICONS: Record<
  SearchCategoryId,
  React.ComponentType<{ className?: string }>
> = {
  flights: FlightServiceIcon,
  hotels: HotelServiceIcon,
  umrah: HajjUmrahServiceIcon,
  holidays: HolidayPackagesServiceIcon,
  tours: ToursActivitiesServiceIcon,
  'car-transfers': CarRentalServiceIcon
};

const CATEGORY_ANALYTICS_EVENTS: Record<
  Exclude<SearchCategoryId, 'car-transfers'>,
  ServiceSelectionEventName
> = {
  flights: 'flights_selected',
  hotels: 'hotels_selected',
  umrah: 'umrah_selected',
  holidays: 'holidays_selected',
  tours: 'tours_selected'
};

function getTodayIsoLocal(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

interface LazyWidgetSlotProps {
  forceMount?: boolean;
  minHeightClass?: string;
  loadingLabel: string;
  children: React.ReactNode;
}

/**
 * Reserves exact widget vertical floor and defers third-party script execution until either
 * the user approaches the slot (850px rootMargin) or explicitly selects its service category.
 * Once activated, stays mounted cleanly for the lifetime of the view to prevent reload flicker.
 */
const LazyWidgetSlot: React.FC<LazyWidgetSlotProps> = ({
  forceMount = false,
  minHeightClass = 'min-h-[240px]',
  loadingLabel,
  children
}) => {
  const slotRef = useRef<HTMLDivElement | null>(null);
  const [activated, setActivated] = useState(forceMount);

  useEffect(() => {
    if (forceMount) {
      setActivated(true);
    }
  }, [forceMount]);

  useEffect(() => {
    if (activated) return;
    const node = slotRef.current;
    if (!node || typeof IntersectionObserver !== 'function') {
      setActivated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActivated(true);
          observer.disconnect();
        }
      },
      { rootMargin: '850px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [activated]);

  if (activated) {
    return <>{children}</>;
  }

  return (
    <div
      ref={slotRef}
      className={`relative w-full flex items-start justify-center pt-3 ${minHeightClass}`}
    >
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#fcf9f2]/95 border border-[#d1a847]/45 text-[11px] text-[#2c405e]/85 tracking-wide shadow-sm">
        {loadingLabel}
      </span>
    </div>
  );
};

export const TravelSearchEngine: React.FC<TravelSearchEngineProps> = ({
  lang,
  isRtl,
  activeCategory,
  onCategoryChange,
  onSelectHeroOrSection,
  onOpenServicePage,
  onJumpToPlanner,
  whatsappInternational,
  displayPhone,
  visibleCategories,
  embeddedOnServicePage = false
}) => {
  const pack = SEARCH_ENGINE_PACKS[lang];
  const todayIso = getTodayIsoLocal();
  const tabsToRender = visibleCategories ?? SEARCH_CATEGORY_ORDER;
  const uid = useId();
  const rootRef = useRef<HTMLElement | null>(null);

  // ---------------- CAR RENTALS & AIRPORT TRANSFERS FILTER STATE ----------------
  const [carTransfersFilter, setCarTransfersFilter] = useState<CarTransfersFilterId>('all');

  // ---------------- UMRAH INQUIRY STATE ----------------
  const [umrahDepartureCity, setUmrahDepartureCity] = useState('');
  const [umrahDepartDate, setUmrahDepartDate] = useState('');
  const [umrahReturnDate, setUmrahReturnDate] = useState('');
  const [umrahAdults, setUmrahAdults] = useState(2);
  const [umrahChildren, setUmrahChildren] = useState(0);
  const [umrahHotelIdx, setUmrahHotelIdx] = useState(0);
  const [umrahPackageIdx, setUmrahPackageIdx] = useState(0);
  const [umrahName, setUmrahName] = useState('');
  const [umrahPhone, setUmrahPhone] = useState('');
  const [umrahErrors, setUmrahErrors] = useState<string[]>([]);
  const [umrahReady, setUmrahReady] = useState(false);

  // ---------------- HOLIDAYS INQUIRY STATE ----------------
  const [holidayDest, setHolidayDest] = useState('');
  const [holidayDepartDate, setHolidayDepartDate] = useState('');
  const [holidayReturnDate, setHolidayReturnDate] = useState('');
  const [holidayAdults, setHolidayAdults] = useState(2);
  const [holidayChildren, setHolidayChildren] = useState(0);
  const [holidayBudgetIdx, setHolidayBudgetIdx] = useState(1);
  const [holidayTypeIdx, setHolidayTypeIdx] = useState(0);
  const [holidayName, setHolidayName] = useState('');
  const [holidayPhone, setHolidayPhone] = useState('');
  const [holidayErrors, setHolidayErrors] = useState<string[]>([]);
  const [holidayReady, setHolidayReady] = useState(false);

  // ---------------- TOURS & ACTIVITIES STATE ----------------
  const [tourDestination, setTourDestination] = useState('');

  useEffect(() => {
    setUmrahErrors([]);
    setHolidayErrors([]);
  }, [lang]);

  // Subtle GSAP reveal animations STRICTLY for section headings (never transform any widget ancestor!)
  useEffect(() => {
    if (embeddedOnServicePage) return;
    const container = rootRef.current;
    if (!container) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const headers = container.querySelectorAll<HTMLElement>('.gsap-3d-header');
      headers.forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 18
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.62,
            ease: 'power2.out',
            clearProps: 'all',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true
            }
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, [embeddedOnServicePage]);

  // ---------------- INTERACTION HANDLERS (WITH GA4 USER-INTENT EVENTS) ----------------
  const handleSelectCategory = (catId: SearchCategoryId) => {
    onCategoryChange(catId);
    if (catId === 'car-transfers') {
      trackServiceSelection(
        carTransfersFilter === 'airport_transfers'
          ? 'airport_transfers_selected'
          : 'car_rentals_selected'
      );
    } else {
      trackServiceSelection(CATEGORY_ANALYTICS_EVENTS[catId]);
    }
    if (!embeddedOnServicePage && onSelectHeroOrSection) {
      onSelectHeroOrSection(catId);
    }
  };

  const handleSelectCarTransfersFilter = (filterId: CarTransfersFilterId) => {
    setCarTransfersFilter(filterId);
    if (filterId === 'airport_transfers') {
      trackServiceSelection('airport_transfers_selected');
    } else {
      trackServiceSelection('car_rentals_selected');
    }
  };

  // ---------------- UMRAH HANDLERS ----------------
  const handleUmrahSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!umrahDepartureCity.trim()) errs.push(pack.umrah.errors.departureCityRequired);
    if (!umrahDepartDate) {
      errs.push(pack.umrah.errors.dateRequired);
    } else if (umrahDepartDate < todayIso) {
      errs.push(pack.umrah.errors.datePast);
    }
    if (umrahReturnDate && umrahDepartDate && umrahReturnDate < umrahDepartDate) {
      errs.push(pack.umrah.errors.returnBeforeDeparture);
    }
    if (umrahAdults < 1) errs.push(pack.umrah.errors.adultsMin);
    if (!umrahName.trim() || !umrahPhone.trim()) {
      errs.push(pack.umrah.errors.contactRequired);
    }
    setUmrahErrors(errs);
    setUmrahReady(errs.length === 0);
  };

  const buildUmrahWhatsappUrl = () => {
    const hotelLabel = pack.umrah.hotelOptions[umrahHotelIdx] ?? '';
    const pkgLabel = pack.umrah.packageOptions[umrahPackageIdx] ?? '';
    const lines = [
      'Bonjour Golden Group Travels,',
      'Je souhaite recevoir un devis pour un séjour El Omra / La Mecque :',
      `• Ville de départ : ${umrahDepartureCity.trim()}`,
      `• Date de départ : ${umrahDepartDate}`,
      umrahReturnDate ? `• Date de retour : ${umrahReturnDate}` : '',
      `• Voyageurs : ${umrahAdults} ${pack.flights.adultsLabel}${
        umrahChildren > 0 ? `, ${umrahChildren} ${pack.flights.childrenLabel}` : ''
      }`,
      `• Hébergement souhaité : ${hotelLabel}`,
      `• Programme souhaité : ${pkgLabel}`,
      `• Nom complet : ${umrahName.trim()}`,
      `• Téléphone / WhatsApp : ${umrahPhone.trim()}`
    ].filter(Boolean);
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  // ---------------- HOLIDAYS HANDLERS ----------------
  const handleHolidaysSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!holidayDest.trim()) errs.push(pack.holidays.errors.destinationRequired);
    if (!holidayDepartDate) {
      errs.push(pack.holidays.errors.dateRequired);
    } else if (holidayDepartDate < todayIso) {
      errs.push(pack.holidays.errors.datePast);
    }
    if (holidayReturnDate && holidayDepartDate && holidayReturnDate < holidayDepartDate) {
      errs.push(pack.holidays.errors.returnBeforeDeparture);
    }
    if (holidayAdults < 1) errs.push(pack.holidays.errors.adultsMin);
    if (!holidayName.trim() || !holidayPhone.trim()) {
      errs.push(pack.holidays.errors.contactRequired);
    }
    setHolidayErrors(errs);
    setHolidayReady(errs.length === 0);
  };

  const buildHolidaysWhatsappUrl = () => {
    const budgetLabel = pack.holidays.budgetOptions[holidayBudgetIdx] ?? '';
    const pkgLabel = pack.holidays.packageTypeOptions[holidayTypeIdx] ?? '';
    const lines = [
      'Bonjour Golden Group Travels,',
      'Je souhaite un devis pour un séjour sur mesure :',
      `• Destination : ${holidayDest.trim()}`,
      `• Date de départ : ${holidayDepartDate}`,
      holidayReturnDate ? `• Date de retour : ${holidayReturnDate}` : '',
      `• Voyageurs : ${holidayAdults} ${pack.flights.adultsLabel}${
        holidayChildren > 0 ? `, ${holidayChildren} ${pack.flights.childrenLabel}` : ''
      }`,
      `• Budget souhaité : ${budgetLabel}`,
      `• Type de séjour : ${pkgLabel}`,
      `• Nom complet : ${holidayName.trim()}`,
      `• Téléphone / WhatsApp : ${holidayPhone.trim()}`
    ].filter(Boolean);
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const buildCustomTourWhatsappUrl = () => {
    const lines = [
      'Bonjour Golden Group Travels,',
      'Je souhaite organiser un circuit ou des activités sur mesure :',
      tourDestination.trim() ? `• Destination souhaitée : ${tourDestination.trim()}` : ''
    ].filter(Boolean);
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const buildMobilityWhatsappUrl = () => {
    const lines = [
      'Bonjour Golden Group Travels,',
      'Je souhaite organiser une location de voiture ou un transfert aéroport privé.'
    ];
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const renderSectionCardHeader = (
    catId: SearchCategoryId,
    eyebrow: string,
    title: string,
    subtitle: string
  ) => {
    const Icon = CATEGORY_ICONS[catId];
    return (
      <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-[#d1a847]/35">
        <div className="flex items-start gap-4 max-w-3xl">
          <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0b1d3a] border-2 border-[#d1a847] text-[#fceda2] flex items-center justify-center shrink-0 shadow-md">
            <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
          </span>
          <div className="space-y-1">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
              {eyebrow}
            </div>
            <h3 className="font-serif-crest text-xl sm:text-2xl lg:text-[1.7rem] font-semibold text-[#0b1d3a] [text-wrap:balance]">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">{subtitle}</p>
          </div>
        </div>

        {onOpenServicePage && !embeddedOnServicePage && (
          <button
            type="button"
            onClick={() => onOpenServicePage(SEARCH_CATEGORY_TO_SERVICE[catId])}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9a7220] hover:text-[#0b1d3a] transition-colors cursor-pointer shrink-0 text-left rtl:text-right sm:whitespace-nowrap"
          >
            <span>{pack.openDedicatedPage}</span>
            <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
    );
  };

  const renderFlightsSection = () => (
    <article
      id={embeddedOnServicePage ? undefined : SERVICE_SECTION_IDS.flights}
      className={`scroll-mt-28 ${
        embeddedOnServicePage
          ? ''
          : 'bg-[#fcf9f2] text-[#0b1d3a] border border-[#d1a847]/65 rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 lg:p-10 shadow-[0_24px_64px_rgba(4,12,28,0.42)]'
      }`}
    >
      <div className="space-y-8">
        {!embeddedOnServicePage &&
          renderSectionCardHeader(
            'flights',
            pack.categories.flights.tabLabel,
            pack.flights.liveTitle,
            pack.flights.liveSubtitle
          )}

        {/* 1A. Primary Official Aviasales Flights Search Widget */}
        <AviasalesFlightWidget
          key="aviasales-flights-widget"
          lang={lang}
          onJumpToPlanner={onJumpToPlanner}
          whatsappInternational={whatsappInternational}
          displayPhone={displayPhone}
        />

        {/* 1B. Official Expedia Flights Search Widget (lobs="flights") */}
        <div className="pt-6 border-t border-[#d1a847]/40">
          <ExpediaFlightWidget
            key="expedia-flights-widget"
            lang={lang}
            onJumpToPlanner={onJumpToPlanner}
            whatsappInternational={whatsappInternational}
            displayPhone={displayPhone}
          />
        </div>

        {/* 1C. Official Kiwi.com Flight Search & Route Offers (Isolated Frame avoids #search-widget ID collision with Tiqets) */}
        <div className="pt-6 border-t border-[#d1a847]/40 space-y-4">
          <div className="space-y-1 max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
              {pack.flights.offersBadge}
            </div>
            <h4 className="font-serif-crest text-lg sm:text-xl font-semibold text-[#0b1d3a]">
              {pack.flights.offersTitle}
            </h4>
            <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
              {pack.flights.offersSubtitle}
            </p>
          </div>

          <div className="rounded-2xl bg-[#f5ede0]/75 border border-[#d1a847]/45 p-2 sm:p-5 shadow-inner overflow-x-clip widget-stability-shell">
            <LazyWidgetSlot
              forceMount={embeddedOnServicePage || activeCategory === 'flights'}
              minHeightClass={FLIGHTS_OFFERS_WIDGET.minHeightClass}
              loadingLabel={pack.flights.offersLoadingLabel}
            >
              <IsolatedWidgetFrame
                key={FLIGHTS_OFFERS_WIDGET.id}
                scriptSrc={FLIGHTS_OFFERS_WIDGET.scriptSrc}
                title={pack.flights.offersTitle}
                loadingLabel={pack.flights.offersLoadingLabel}
                errorLabel={pack.flights.offersLoadErrorFallback}
                minHeight={FLIGHTS_OFFERS_WIDGET.minHeightPx ?? 360}
              />
            </LazyWidgetSlot>
          </div>
        </div>
      </div>
    </article>
  );

  const renderHotelsSection = () => (
    <article
      id={embeddedOnServicePage ? undefined : SERVICE_SECTION_IDS.hotels}
      className={`scroll-mt-28 ${
        embeddedOnServicePage
          ? ''
          : 'bg-[#fcf9f2] text-[#0b1d3a] border border-[#d1a847]/65 rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 lg:p-10 shadow-[0_24px_64px_rgba(4,12,28,0.42)]'
      }`}
    >
      <div className="space-y-6">
        {!embeddedOnServicePage &&
          renderSectionCardHeader(
            'hotels',
            pack.hotels.badge,
            pack.hotels.title,
            pack.hotels.subtitle
          )}

        <LazyWidgetSlot
          forceMount={embeddedOnServicePage || activeCategory === 'hotels'}
          minHeightClass="min-h-[320px]"
          loadingLabel={EXPEDIA_WIDGET_COPY[lang].loadingLabel}
        >
          <ExpediaSearchWidget
            key="expedia-hotels-search"
            lang={lang}
            variant="hub"
            onJumpToPlanner={onJumpToPlanner}
          />
        </LazyWidgetSlot>
      </div>
    </article>
  );

  const renderUmrahSection = () => (
    <article
      id={embeddedOnServicePage ? undefined : SERVICE_SECTION_IDS.umrah}
      className={`scroll-mt-28 ${
        embeddedOnServicePage
          ? ''
          : 'bg-[#fcf9f2] text-[#0b1d3a] border-2 border-[#d1a847]/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 lg:p-10 shadow-[0_24px_64px_rgba(4,12,28,0.42)]'
      }`}
    >
      <div className="space-y-6">
        {renderSectionCardHeader(
          'umrah',
          pack.umrah.badge,
          pack.umrah.title,
          pack.umrah.subtitle
        )}

        {umrahReady ? (
          <div className="rounded-2xl bg-[#0b1d3a] text-[#f5ede0] border border-[#d1a847] p-6 space-y-4 animate-search-panel-in">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="font-serif-crest text-xl font-semibold text-[#fceda2]">
                {pack.umrah.summaryTitle}
              </h4>
              <button
                type="button"
                onClick={() => setUmrahReady(false)}
                className="text-xs font-semibold uppercase tracking-wider text-[#fceda2] hover:underline cursor-pointer"
              >
                {pack.umrah.editBtn}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#071429] border border-[#d1a847]/35">
                <div className="text-slate-400">{pack.umrah.departureCityLabel}</div>
                <div className="font-semibold text-white mt-0.5">{umrahDepartureCity}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#071429] border border-[#d1a847]/35">
                <div className="text-slate-400">{pack.umrah.departureDateLabel}</div>
                <div className="font-semibold text-white mt-0.5 tabular-nums">
                  {umrahDepartDate}
                  {umrahReturnDate ? ` → ${umrahReturnDate}` : ''}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#071429] border border-[#d1a847]/35">
                <div className="text-slate-400">{pack.umrah.hotelPrefLabel}</div>
                <div className="font-semibold text-white mt-0.5">
                  {pack.umrah.hotelOptions[umrahHotelIdx]}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#071429] border border-[#d1a847]/35">
                <div className="text-slate-400">{pack.umrah.packagePrefLabel}</div>
                <div className="font-semibold text-white mt-0.5">
                  {pack.umrah.packageOptions[umrahPackageIdx]}
                </div>
              </div>
            </div>

            <a
              href={buildUmrahWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-colors"
            >
              <span>{pack.umrah.whatsappBtn}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <form onSubmit={handleUmrahSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor={`${uid}-umrah-city`}
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                >
                  {pack.umrah.departureCityLabel}
                </label>
                <input
                  id={`${uid}-umrah-city`}
                  type="text"
                  value={umrahDepartureCity}
                  onChange={(e) => setUmrahDepartureCity(e.target.value)}
                  placeholder={pack.umrah.departureCityPlaceholder}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                />
              </div>

              <div>
                <label
                  htmlFor={`${uid}-umrah-depart`}
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                >
                  {pack.umrah.departureDateLabel}
                </label>
                <input
                  id={`${uid}-umrah-depart`}
                  type="date"
                  min={todayIso}
                  value={umrahDepartDate}
                  onChange={(e) => setUmrahDepartDate(e.target.value)}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                />
              </div>

              <div>
                <label
                  htmlFor={`${uid}-umrah-return`}
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                >
                  {pack.umrah.returnDateLabel}
                </label>
                <input
                  id={`${uid}-umrah-return`}
                  type="date"
                  min={umrahDepartDate || todayIso}
                  value={umrahReturnDate}
                  onChange={(e) => setUmrahReturnDate(e.target.value)}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                />
              </div>

              <div>
                <label
                  htmlFor={`${uid}-umrah-hotel`}
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                >
                  {pack.umrah.hotelPrefLabel}
                </label>
                <select
                  id={`${uid}-umrah-hotel`}
                  value={umrahHotelIdx}
                  onChange={(e) => setUmrahHotelIdx(Number(e.target.value))}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                >
                  {pack.umrah.hotelOptions.map((opt, idx) => (
                    <option key={idx} value={idx}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor={`${uid}-umrah-pkg`}
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                >
                  {pack.umrah.packagePrefLabel}
                </label>
                <select
                  id={`${uid}-umrah-pkg`}
                  value={umrahPackageIdx}
                  onChange={(e) => setUmrahPackageIdx(Number(e.target.value))}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                >
                  {pack.umrah.packageOptions.map((opt, idx) => (
                    <option key={idx} value={idx}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label
                    htmlFor={`${uid}-umrah-adults`}
                    className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                  >
                    {pack.flights.adultsLabel}
                  </label>
                  <input
                    id={`${uid}-umrah-adults`}
                    type="number"
                    min={1}
                    max={30}
                    value={umrahAdults}
                    onChange={(e) => setUmrahAdults(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`${uid}-umrah-children`}
                    className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                  >
                    {pack.flights.childrenLabel}
                  </label>
                  <input
                    id={`${uid}-umrah-children`}
                    type="number"
                    min={0}
                    max={20}
                    value={umrahChildren}
                    onChange={(e) => setUmrahChildren(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor={`${uid}-umrah-name`}
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                >
                  {pack.umrah.nameLabel}
                </label>
                <input
                  id={`${uid}-umrah-name`}
                  type="text"
                  value={umrahName}
                  onChange={(e) => setUmrahName(e.target.value)}
                  placeholder={pack.umrah.namePlaceholder}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-2">
                <label
                  htmlFor={`${uid}-umrah-phone`}
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                >
                  {pack.umrah.phoneLabel}
                </label>
                <input
                  id={`${uid}-umrah-phone`}
                  type="tel"
                  dir="ltr"
                  value={umrahPhone}
                  onChange={(e) => setUmrahPhone(e.target.value)}
                  placeholder={pack.umrah.phonePlaceholder}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                />
              </div>
            </div>

            {umrahErrors.length > 0 && (
              <div
                role="alert"
                className="rounded-xl bg-amber-50 border border-amber-300 px-4 py-3 text-xs text-amber-950 space-y-1"
              >
                {umrahErrors.map((err, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{err}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.15em] shadow-md transition-colors cursor-pointer"
              >
                <span>{pack.umrah.submitBtn}</span>
                <ArrowRight className={`w-4 h-4 text-[#d1a847] ${isRtl ? 'rotate-180' : ''}`} />
              </button>
              <span className="text-[11px] text-[#2c405e]/85">
                {pack.umrah.noFakePackagesNote}
              </span>
            </div>
          </form>
        )}
      </div>
    </article>
  );

  const renderHolidaysSection = () => (
    <article
      id={embeddedOnServicePage ? undefined : SERVICE_SECTION_IDS.holidays}
      className={`scroll-mt-28 ${
        embeddedOnServicePage
          ? ''
          : 'bg-[#fcf9f2] text-[#0b1d3a] border border-[#d1a847]/65 rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 lg:p-10 shadow-[0_24px_64px_rgba(4,12,28,0.42)]'
      }`}
    >
      <div className="space-y-6">
        {renderSectionCardHeader(
          'holidays',
          pack.holidays.badge,
          pack.holidays.title,
          pack.holidays.subtitle
        )}

        {holidayReady ? (
          <div className="rounded-2xl bg-[#0b1d3a] text-[#f5ede0] border border-[#d1a847] p-6 space-y-4 animate-search-panel-in">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="font-serif-crest text-xl font-semibold text-[#fceda2]">
                {pack.holidays.summaryTitle}
              </h4>
              <button
                type="button"
                onClick={() => setHolidayReady(false)}
                className="text-xs font-semibold uppercase tracking-wider text-[#fceda2] hover:underline cursor-pointer"
              >
                {pack.holidays.editBtn}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#071429] border border-[#d1a847]/35">
                <div className="text-slate-400">{pack.holidays.destinationLabel}</div>
                <div className="font-semibold text-white mt-0.5">{holidayDest}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#071429] border border-[#d1a847]/35">
                <div className="text-slate-400">{pack.holidays.departureDateLabel}</div>
                <div className="font-semibold text-white mt-0.5 tabular-nums">
                  {holidayDepartDate}
                  {holidayReturnDate ? ` → ${holidayReturnDate}` : ''}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#071429] border border-[#d1a847]/35">
                <div className="text-slate-400">{pack.holidays.budgetLabel}</div>
                <div className="font-semibold text-white mt-0.5">
                  {pack.holidays.budgetOptions[holidayBudgetIdx]}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#071429] border border-[#d1a847]/35">
                <div className="text-slate-400">{pack.holidays.packageTypeLabel}</div>
                <div className="font-semibold text-white mt-0.5">
                  {pack.holidays.packageTypeOptions[holidayTypeIdx]}
                </div>
              </div>
            </div>

            <a
              href={buildHolidaysWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-colors"
            >
              <span>{pack.holidays.whatsappBtn}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <form onSubmit={handleHolidaysSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor={`${uid}-holiday-dest`}
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                >
                  {pack.holidays.destinationLabel}
                </label>
                <input
                  id={`${uid}-holiday-dest`}
                  type="text"
                  value={holidayDest}
                  onChange={(e) => setHolidayDest(e.target.value)}
                  placeholder={pack.holidays.destinationPlaceholder}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                />
              </div>

              <div>
                <label
                  htmlFor={`${uid}-holiday-depart`}
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                >
                  {pack.holidays.departureDateLabel}
                </label>
                <input
                  id={`${uid}-holiday-depart`}
                  type="date"
                  min={todayIso}
                  value={holidayDepartDate}
                  onChange={(e) => setHolidayDepartDate(e.target.value)}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                />
              </div>

              <div>
                <label
                  htmlFor={`${uid}-holiday-return`}
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                >
                  {pack.holidays.returnDateLabel}
                </label>
                <input
                  id={`${uid}-holiday-return`}
                  type="date"
                  min={holidayDepartDate || todayIso}
                  value={holidayReturnDate}
                  onChange={(e) => setHolidayReturnDate(e.target.value)}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                />
              </div>

              <div>
                <label
                  htmlFor={`${uid}-holiday-budget`}
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                >
                  {pack.holidays.budgetLabel}
                </label>
                <select
                  id={`${uid}-holiday-budget`}
                  value={holidayBudgetIdx}
                  onChange={(e) => setHolidayBudgetIdx(Number(e.target.value))}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                >
                  {pack.holidays.budgetOptions.map((opt, idx) => (
                    <option key={idx} value={idx}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor={`${uid}-holiday-type`}
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                >
                  {pack.holidays.packageTypeLabel}
                </label>
                <select
                  id={`${uid}-holiday-type`}
                  value={holidayTypeIdx}
                  onChange={(e) => setHolidayTypeIdx(Number(e.target.value))}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                >
                  {pack.holidays.packageTypeOptions.map((opt, idx) => (
                    <option key={idx} value={idx}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label
                    htmlFor={`${uid}-holiday-adults`}
                    className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                  >
                    {pack.flights.adultsLabel}
                  </label>
                  <input
                    id={`${uid}-holiday-adults`}
                    type="number"
                    min={1}
                    max={30}
                    value={holidayAdults}
                    onChange={(e) => setHolidayAdults(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`${uid}-holiday-children`}
                    className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                  >
                    {pack.flights.childrenLabel}
                  </label>
                  <input
                    id={`${uid}-holiday-children`}
                    type="number"
                    min={0}
                    max={20}
                    value={holidayChildren}
                    onChange={(e) => setHolidayChildren(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor={`${uid}-holiday-name`}
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                >
                  {pack.holidays.nameLabel}
                </label>
                <input
                  id={`${uid}-holiday-name`}
                  type="text"
                  value={holidayName}
                  onChange={(e) => setHolidayName(e.target.value)}
                  placeholder={pack.holidays.namePlaceholder}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-2">
                <label
                  htmlFor={`${uid}-holiday-phone`}
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                >
                  {pack.holidays.phoneLabel}
                </label>
                <input
                  id={`${uid}-holiday-phone`}
                  type="tel"
                  dir="ltr"
                  value={holidayPhone}
                  onChange={(e) => setHolidayPhone(e.target.value)}
                  placeholder={pack.holidays.phonePlaceholder}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                />
              </div>
            </div>

            {holidayErrors.length > 0 && (
              <div
                role="alert"
                className="rounded-xl bg-amber-50 border border-amber-300 px-4 py-3 text-xs text-amber-950 space-y-1"
              >
                {holidayErrors.map((err, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{err}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.15em] shadow-md transition-colors cursor-pointer"
              >
                <span>{pack.holidays.submitBtn}</span>
                <ArrowRight className={`w-4 h-4 text-[#d1a847] ${isRtl ? 'rotate-180' : ''}`} />
              </button>
              <span className="text-[11px] text-[#2c405e]/85">
                {pack.holidays.noFakePackagesNote}
              </span>
            </div>
          </form>
        )}
      </div>
    </article>
  );

  const renderToursSection = () => (
    <article
      id={embeddedOnServicePage ? undefined : SERVICE_SECTION_IDS.tours}
      className={`scroll-mt-28 ${
        embeddedOnServicePage
          ? ''
          : 'bg-[#fcf9f2] text-[#0b1d3a] border border-[#d1a847]/65 rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 lg:p-10 shadow-[0_24px_64px_rgba(4,12,28,0.42)]'
      }`}
    >
      <div className="space-y-7">
        {renderSectionCardHeader(
          'tours',
          pack.tours.badge,
          pack.tours.title,
          pack.tours.subtitle
        )}

        {/* 3 Official Live Partner Widgets Rendered Automatically (Klook, Tiqets, WeGoTrip) */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-[#d1a847]/35">
            <div>
              <h4 className="font-serif-crest text-lg sm:text-xl font-semibold text-[#0b1d3a]">
                {pack.tours.widgetsHeader}
              </h4>
              <p className="text-xs text-[#2c405e]">{pack.tours.widgetsSubtitle}</p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-[#2c405e]/90">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c59b38] shrink-0" />
              <span>{pack.tours.transparencyNote}</span>
            </div>
          </div>

          <div className="space-y-5">
            {TOURS_WIDGETS.map((widget) => {
              const meta =
                pack.tours.widgets[widget.id as keyof typeof pack.tours.widgets];
              return (
                <div
                  key={widget.id}
                  className="rounded-2xl bg-[#f5ede0]/80 border border-[#d1a847]/45 p-3 sm:p-6 space-y-4 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#d1a847]/30">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a7220] font-semibold">
                        {meta.badge}
                      </div>
                      <h5 className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                        {meta.title}
                      </h5>
                      <p className="text-xs text-[#2c405e]">{meta.subtitle}</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#fcf9f2] border border-[#d1a847]/35 p-1.5 sm:p-4 overflow-x-clip widget-stability-shell">
                    <LazyWidgetSlot
                      forceMount={embeddedOnServicePage || activeCategory === 'tours'}
                      minHeightClass={widget.minHeightClass}
                      loadingLabel={pack.tours.widgetLoadingLabel}
                    >
                      {widget.isolatedFrame ? (
                        <IsolatedWidgetFrame
                          scriptSrc={widget.scriptSrc}
                          title={meta.title}
                          loadingLabel={pack.tours.widgetLoadingLabel}
                          errorLabel={pack.tours.widgetLoadErrorFallback}
                          minHeight={widget.minHeightPx ?? 360}
                          containerClassName={widget.containerClassName}
                        />
                      ) : (
                        <ThirdPartyScriptWidget
                          scriptSrc={widget.scriptSrc}
                          title={meta.title}
                          loadingLabel={pack.tours.widgetLoadingLabel}
                          errorLabel={pack.tours.widgetLoadErrorFallback}
                          minHeightClass={widget.minHeightClass}
                          containerClassName={widget.containerClassName}
                          hostClassName={widget.hostClassName}
                        />
                      )}
                    </LazyWidgetSlot>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Preserved Destination Note + Klook & KKday Direct Partner Portals */}
        <div className="pt-4 border-t border-[#d1a847]/35 space-y-4">
          <div className="p-4 sm:p-5 rounded-xl bg-[#f5ede0]/80 border border-[#d1a847]/45 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-6">
                <label
                  htmlFor={`${uid}-tour-dest`}
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#c59b38]" />
                  <span>{pack.tours.destinationLabel}</span>
                </label>
                <input
                  id={`${uid}-tour-dest`}
                  type="text"
                  value={tourDestination}
                  onChange={(e) => setTourDestination(e.target.value)}
                  placeholder={pack.tours.destinationPlaceholder}
                  className="w-full bg-[#fcf9f2] border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                />
              </div>

              <div className="md:col-span-6 space-y-1.5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#2c405e]">
                  {pack.tours.quickDestinationsLabel}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_TOUR_DESTINATIONS.map((city) => {
                    const selected = tourDestination === city;
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => setTourDestination(city)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                          selected
                            ? 'bg-[#0b1d3a] text-[#fceda2] border-[#d1a847]'
                            : 'bg-[#fcf9f2] text-[#0b1d3a] border-[#d1a847]/45 hover:border-[#0b1d3a]'
                        }`}
                      >
                        {city}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {tourDestination.trim() && (
              <div className="text-xs text-[#0b1d3a] font-medium pt-1">
                <span className="text-[#9a7220] font-semibold">
                  {pack.tours.selectedDestinationLabel}
                </span>{' '}
                {tourDestination.trim()}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TOURS_AFFILIATE_PARTNERS.map((partner) => {
              const isKlook = partner.id === 'klook';
              return (
                <div
                  key={partner.id}
                  className="rounded-2xl bg-[#0b1d3a] text-[#f5ede0] border border-[#d1a847]/65 p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-md"
                >
                  <div className="space-y-1.5">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                      {partner.name}
                    </div>
                    <h4 className="font-serif-crest text-lg sm:text-xl font-semibold text-[#fcf9f2]">
                      {isKlook ? pack.tours.klookTitle : pack.tours.kkdayTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {isKlook ? pack.tours.klookDesc : pack.tours.kkdayDesc}
                    </p>
                  </div>

                  <a
                    href={partner.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-center gap-2 px-4 sm:px-5 py-3 rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.12em] sm:tracking-[0.14em] transition-colors sm:whitespace-nowrap"
                  >
                    <span>{isKlook ? pack.tours.klookCta : pack.tours.kkdayCta}</span>
                    <ExternalLink className="w-4 h-4 shrink-0" />
                  </a>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-[#f5ede0]/65 border border-[#d1a847]/45 px-4 py-3.5">
            <span className="text-xs text-[#2c405e]">{pack.tours.architectureNote}</span>
            <a
              href={buildCustomTourWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center text-center gap-2 px-4 py-2.5 rounded-lg bg-[#0b1d3a] text-[#fceda2] hover:bg-[#132d56] text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors sm:whitespace-nowrap"
            >
              <span>{pack.tours.customTourBtn}</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );

  const renderCarTransfersSection = () => {
    const showCarRentals =
      carTransfersFilter === 'all' || carTransfersFilter === 'car_rentals';
    const showAirportTransfers =
      carTransfersFilter === 'all' || carTransfersFilter === 'airport_transfers';

    const promoMeta =
      pack.carTransfers.widgets[
        CAR_RENTALS_PROMO_BANNER.id as keyof typeof pack.carTransfers.widgets
      ];

    return (
      <article
        id={embeddedOnServicePage ? undefined : SERVICE_SECTION_IDS['car-transfers']}
        className={`scroll-mt-28 ${
          embeddedOnServicePage
            ? ''
            : 'bg-[#fcf9f2] text-[#0b1d3a] border border-[#d1a847]/65 rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 lg:p-10 shadow-[0_24px_64px_rgba(4,12,28,0.42)]'
        }`}
      >
        <div className="space-y-8">
          {/* Header + Internal Subsection Filter (keeps DOM always mounted via CSS hidden so custom elements never break) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#d1a847]/35">
            <div className="flex items-start gap-4 max-w-2xl">
              <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0b1d3a] border-2 border-[#d1a847] text-[#fceda2] flex items-center justify-center shrink-0 shadow-md">
                <CarRentalServiceIcon className="w-6 h-6 sm:w-7 sm:h-7" />
              </span>
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                  {pack.carTransfers.badge}
                </div>
                <h3 className="font-serif-crest text-xl sm:text-2xl lg:text-[1.7rem] font-semibold text-[#0b1d3a] [text-wrap:balance]">
                  {pack.carTransfers.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
                  {pack.carTransfers.subtitle}
                </p>
              </div>
            </div>

            <div
              role="group"
              aria-label={pack.carTransfers.tabSelectorLabel}
              className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#ede1ce]/90 border border-[#d1a847]/55 self-start lg:self-auto"
            >
              {(['all', 'car_rentals', 'airport_transfers'] as const).map((filterId) => {
                const selected = carTransfersFilter === filterId;
                const tabMeta = pack.carTransfers.tabs[filterId];
                const TabIcon =
                  filterId === 'all'
                    ? Layers
                    : filterId === 'car_rentals'
                    ? Car
                    : PlaneLanding;

                return (
                  <button
                    key={filterId}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => handleSelectCarTransfersFilter(filterId)}
                    className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-[0.1em] transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1d3a] ${
                      selected
                        ? 'bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847] shadow-sm'
                        : 'text-[#0b1d3a]/85 hover:text-[#0b1d3a] hover:bg-[#fcf9f2]/80 border border-transparent'
                    }`}
                  >
                    <TabIcon
                      className={`w-3.5 h-3.5 shrink-0 ${
                        selected ? 'text-[#d1a847]' : 'text-[#9a7220]'
                      }`}
                    />
                    <span>{tabMeta.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subsection 6A: Car Rentals (AutoEurope, Localrent, GetRentacar + EconomyBookings Promo Banner Beneath) */}
          <div className={showCarRentals ? 'space-y-5' : 'hidden'} aria-hidden={!showCarRentals}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <h4 className="font-serif-crest text-lg sm:text-xl font-semibold text-[#0b1d3a]">
                  {pack.carTransfers.carRentalsTitle}
                </h4>
                <p className="text-xs text-[#2c405e]">{pack.carTransfers.carRentalsSubtitle}</p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-[11px] text-[#2c405e]/90">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c59b38] shrink-0" />
                <span>{pack.carTransfers.transparencyNote}</span>
              </div>
            </div>

            {/* Search Engines First */}
            <div className="space-y-5">
              {CAR_RENTALS_WIDGETS.map((widget) => {
                const meta =
                  pack.carTransfers.widgets[
                    widget.id as keyof typeof pack.carTransfers.widgets
                  ];
                return (
                  <div
                    key={widget.id}
                    className="rounded-2xl bg-[#f5ede0]/80 border border-[#d1a847]/45 p-3 sm:p-6 space-y-4 shadow-sm"
                  >
                    <div className="pb-3 border-b border-[#d1a847]/30">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a7220] font-semibold">
                        {meta.badge}
                      </div>
                      <h5 className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                        {meta.title}
                      </h5>
                      <p className="text-xs text-[#2c405e]">{meta.subtitle}</p>
                    </div>

                    <div className="rounded-xl bg-[#fcf9f2] border border-[#d1a847]/35 p-1.5 sm:p-4 overflow-x-clip widget-stability-shell">
                      <LazyWidgetSlot
                        forceMount={
                          embeddedOnServicePage ||
                          activeCategory === 'car-transfers' ||
                          carTransfersFilter === 'car_rentals'
                        }
                        minHeightClass={widget.minHeightClass}
                        loadingLabel={pack.carTransfers.loadingLabel}
                      >
                        <ThirdPartyScriptWidget
                          scriptSrc={widget.scriptSrc}
                          title={meta.title}
                          loadingLabel={pack.carTransfers.loadingLabel}
                          errorLabel={pack.carTransfers.loadErrorFallback}
                          minHeightClass={widget.minHeightClass}
                          containerClassName={widget.containerClassName}
                          hostClassName={widget.hostClassName}
                        />
                      </LazyWidgetSlot>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Promotional Banner Beneath Main Car Rental Search Tools (EconomyBookings 10/2082) */}
            <div className="pt-2">
              <div className="rounded-2xl bg-[#ede1ce]/55 border border-[#d1a847]/55 p-3 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#d1a847]/30">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                      {pack.carTransfers.promoBannerEyebrow}
                    </div>
                    <h5 className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                      {promoMeta.title}
                    </h5>
                    <p className="text-xs text-[#2c405e]">{promoMeta.subtitle}</p>
                  </div>
                </div>

                <div className="rounded-xl bg-[#fcf9f2] border border-[#d1a847]/35 p-2 sm:p-5 overflow-x-clip widget-stability-shell">
                  <LazyWidgetSlot
                    forceMount={
                      embeddedOnServicePage ||
                      activeCategory === 'car-transfers' ||
                      carTransfersFilter === 'car_rentals'
                    }
                    minHeightClass="min-h-[380px]"
                    loadingLabel={pack.carTransfers.loadingLabel}
                  >
                    <ThirdPartyScriptWidget
                      scriptSrc={CAR_RENTALS_PROMO_BANNER.scriptSrc}
                      title={promoMeta.title}
                      loadingLabel={pack.carTransfers.loadingLabel}
                      errorLabel={pack.carTransfers.loadErrorFallback}
                      containerClassName={CAR_RENTALS_PROMO_BANNER.containerClassName}
                      hostClassName={CAR_RENTALS_PROMO_BANNER.hostClassName}
                    />
                  </LazyWidgetSlot>
                </div>
              </div>
            </div>
          </div>

          {/* Hairline Divider When Both Car Rentals and Airport Transfers Are Visible */}
          {showCarRentals && showAirportTransfers && (
            <div className="h-px bg-gradient-to-r from-transparent via-[#d1a847]/55 to-transparent" />
          )}

          {/* Subsection 6B: Airport Transfers (Intui.travel & Kiwitaxi) */}
          <div
            className={showAirportTransfers ? 'space-y-5' : 'hidden'}
            aria-hidden={!showAirportTransfers}
          >
            <div>
              <h4 className="font-serif-crest text-lg sm:text-xl font-semibold text-[#0b1d3a]">
                {pack.carTransfers.transfersTitle}
              </h4>
              <p className="text-xs text-[#2c405e]">{pack.carTransfers.transfersSubtitle}</p>
            </div>

            <div className="space-y-5">
              {AIRPORT_TRANSFERS_WIDGETS.map((widget) => {
                const meta =
                  pack.carTransfers.widgets[
                    widget.id as keyof typeof pack.carTransfers.widgets
                  ];
                return (
                  <div
                    key={widget.id}
                    className="rounded-2xl bg-[#f5ede0]/80 border border-[#d1a847]/45 p-3 sm:p-6 space-y-4 shadow-sm"
                  >
                    <div className="pb-3 border-b border-[#d1a847]/30">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a7220] font-semibold">
                        {meta.badge}
                      </div>
                      <h5 className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                        {meta.title}
                      </h5>
                      <p className="text-xs text-[#2c405e]">{meta.subtitle}</p>
                    </div>

                    <div className="rounded-xl bg-[#fcf9f2] border border-[#d1a847]/35 p-1.5 sm:p-4 overflow-x-clip widget-stability-shell">
                      <LazyWidgetSlot
                        forceMount={
                          embeddedOnServicePage ||
                          activeCategory === 'car-transfers' ||
                          carTransfersFilter === 'airport_transfers'
                        }
                        minHeightClass={widget.minHeightClass}
                        loadingLabel={pack.carTransfers.loadingLabel}
                      >
                        {widget.isolatedFrame ? (
                          <IsolatedWidgetFrame
                            scriptSrc={widget.scriptSrc}
                            title={meta.title}
                            loadingLabel={pack.carTransfers.loadingLabel}
                            errorLabel={pack.carTransfers.loadErrorFallback}
                            minHeight={widget.minHeightPx ?? 400}
                            containerClassName={widget.containerClassName}
                          />
                        ) : (
                          <ThirdPartyScriptWidget
                            scriptSrc={widget.scriptSrc}
                            title={meta.title}
                            loadingLabel={pack.carTransfers.loadingLabel}
                            errorLabel={pack.carTransfers.loadErrorFallback}
                            minHeightClass={widget.minHeightClass}
                            containerClassName={widget.containerClassName}
                            hostClassName={widget.hostClassName}
                          />
                        )}
                      </LazyWidgetSlot>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direct WhatsApp Assistance */}
          <div className="rounded-xl bg-[#0b1d3a] text-[#f5ede0] border border-[#d1a847]/55 px-3.5 sm:px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-200 leading-relaxed">
              <span className="font-semibold text-[#fceda2]">
                {pack.carTransfers.conciergeTitle}
              </span>{' '}
              <span className="text-slate-300">{pack.carTransfers.conciergeDesc}</span>
            </div>
            <a
              href={buildMobilityWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center text-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-wider transition-colors sm:whitespace-nowrap shrink-0"
            >
              <span>
                {pack.carTransfers.conciergeCta} ({displayPhone})
              </span>
            </a>
          </div>
        </div>
      </article>
    );
  };

  if (embeddedOnServicePage) {
    return (
      <section id="search-hub" aria-label={pack.hubTitle} className="w-full">
        <div className="bg-[#fcf9f2] text-[#0b1d3a] border border-[#d1a847]/45 rounded-2xl p-4 sm:p-8 lg:p-10 shadow-[0_18px_44px_rgba(11,29,58,0.08)]">
          {tabsToRender.length > 1 && (
            <div className="mb-7 pb-5 border-b border-[#d1a847]/35">
              <div
                role="tablist"
                aria-label={pack.servicesHubTitle}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {tabsToRender.map((catId) => {
                  const Icon = CATEGORY_ICONS[catId];
                  const meta = pack.categories[catId];
                  const isActive = activeCategory === catId;
                  return (
                    <button
                      key={catId}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleSelectCategory(catId)}
                      className={`rounded-xl px-4 py-3 text-left rtl:text-right border transition-all duration-300 cursor-pointer flex items-center gap-3 ${
                        isActive
                          ? 'bg-[#0b1d3a] text-[#fceda2] border-[#d1a847] shadow-md'
                          : 'bg-[#f5ede0]/85 text-[#0b1d3a] border-[#d1a847]/40 hover:border-[#0b1d3a]/60'
                      }`}
                    >
                      <span
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                          isActive
                            ? 'bg-[#071429] border-[#d1a847] text-[#fceda2]'
                            : 'bg-[#fcf9f2] border-[#c59b38]/50 text-[#0b1d3a]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs sm:text-sm font-bold uppercase tracking-wider truncate">
                          {meta.tabLabel}
                        </div>
                        <div
                          className={`text-[11px] truncate ${
                            isActive ? 'text-[#f5ede0]/80' : 'text-[#2c405e]/80'
                          }`}
                        >
                          {meta.shortSub}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeCategory === 'flights' && renderFlightsSection()}
          {activeCategory === 'hotels' && renderHotelsSection()}
          {activeCategory === 'umrah' && renderUmrahSection()}
          {activeCategory === 'holidays' && renderHolidaysSection()}
          {activeCategory === 'tours' && renderToursSection()}
          {activeCategory === 'car-transfers' && renderCarTransfersSection()}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      id="explore-travel-services"
      aria-labelledby={`${uid}-services-hub-heading`}
      className="scroll-mt-28 relative bg-gradient-to-b from-[#071429] via-[#0b1d3a] to-[#071429] text-[#f5ede0] border-y border-[#d1a847]/45 py-12 sm:py-16 md:py-24 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Luxury Section Header */}
        <div className="gsap-3d-header max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <p className="text-xs uppercase tracking-[0.26em] text-[#d1a847] font-semibold mb-3">
            {pack.servicesHubEyebrow}
          </p>
          <h2
            id={`${uid}-services-hub-heading`}
            className="font-serif-crest text-3xl sm:text-4xl md:text-5xl font-semibold text-[#fcf9f2] tracking-wide [text-wrap:balance]"
          >
            {pack.servicesHubTitle}
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-[#f5ede0]/85 leading-relaxed">
            {pack.servicesHubSubtitle}
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d1a847] to-transparent mx-auto mt-6" />
        </div>

        {/* 6 Quick Section Jump Emblems */}
        <nav
          aria-label={pack.servicesHubTitle}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-6 sm:gap-5 mb-12 md:mb-14 perspective-1200"
        >
          {tabsToRender.map((catId) => {
            const Icon = CATEGORY_ICONS[catId];
            const meta = pack.categories[catId];
            const isActive = activeCategory === catId;

            return (
              <button
                key={catId}
                id={`${uid}-service-tab-${catId}`}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleSelectCategory(catId)}
                className="group flex flex-col items-center text-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#fceda2] rounded-2xl py-1 cursor-pointer active:scale-95 transition-transform duration-150"
              >
                <span
                  className={`w-20 h-20 sm:w-[88px] sm:h-[88px] lg:w-[98px] lg:h-[98px] rounded-full flex items-center justify-center border-2 transition-all duration-300 will-change-transform ${
                    isActive
                      ? 'bg-[#132d56] border-[#fceda2] text-[#fceda2] ring-4 ring-[#d1a847]/30 shadow-[0_14px_36px_rgba(209,168,71,0.38)] scale-105'
                      : 'bg-[#071429]/90 border-[#d1a847]/50 text-[#d1a847] group-hover:border-[#fceda2] group-hover:text-[#fceda2] group-hover:bg-[#0e2347] group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:shadow-[0_16px_34px_rgba(209,168,71,0.32)] shadow-[0_10px_26px_rgba(4,12,28,0.45)]'
                  }`}
                >
                  <Icon className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 transition-transform duration-300 group-hover:scale-105" />
                </span>

                <div className="space-y-0.5 max-w-[160px]">
                  <div
                    className={`text-xs sm:text-[13px] font-bold uppercase tracking-[0.09em] leading-snug transition-colors ${
                      isActive
                        ? 'text-[#fceda2]'
                        : 'text-[#fcf9f2]/95 group-hover:text-[#fceda2]'
                    }`}
                  >
                    {meta.tabLabel}
                  </div>
                  <div
                    className={`text-[11px] leading-tight ${
                      isActive ? 'text-[#d1a847]' : 'text-slate-300/75'
                    }`}
                  >
                    {meta.shortSub}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* All 6 Dedicated Always-Mounted Travel Service Sections with Unique Stable IDs */}
        <div className="space-y-10 md:space-y-14">
          {renderFlightsSection()}
          {renderHotelsSection()}
          {renderUmrahSection()}
          {renderHolidaysSection()}
          {renderToursSection()}
          {renderCarTransfersSection()}
        </div>
      </div>
    </section>
  );
};
