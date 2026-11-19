import React, { useEffect, useId, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeftRight,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Compass,
  ExternalLink,
  Layers,
  MapPin,
  Minus,
  Plane,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react';
import { Language, ServiceId } from '../assets/destinations';
import { SEARCH_ENGINE_PACKS } from '../assets/searchEngineData';
import {
  AVIASALES_PARTNER,
  POPULAR_FLIGHT_DESTINATIONS,
  POPULAR_FLIGHT_ORIGINS,
  POPULAR_TOUR_DESTINATIONS,
  SEARCH_CATEGORY_ORDER,
  SEARCH_CATEGORY_TO_SERVICE,
  SearchCategoryId,
  TOURS_AFFILIATE_PARTNERS
} from '../config/travelSuppliers';
import { ExpediaSearchWidget } from './ExpediaSearchWidget';
import {
  FlightServiceIcon,
  HajjUmrahServiceIcon,
  HolidayPackagesServiceIcon,
  HotelServiceIcon
} from './ServiceIcons';

interface TravelSearchEngineProps {
  lang: Language;
  isRtl: boolean;
  activeCategory: SearchCategoryId;
  onCategoryChange: (category: SearchCategoryId) => void;
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
  tours: Compass
};

type CabinKey = 'economy' | 'premium' | 'business' | 'first';

function getTodayIsoLocal(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export const TravelSearchEngine: React.FC<TravelSearchEngineProps> = ({
  lang,
  isRtl,
  activeCategory,
  onCategoryChange,
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

  // ---------------- FLIGHTS STATE ----------------
  const [tripType, setTripType] = useState<'round-trip' | 'one-way'>('round-trip');
  const [flightOrigin, setFlightOrigin] = useState('Casablanca (CMN)');
  const [flightDest, setFlightDest] = useState('');
  const [flightDepartDate, setFlightDepartDate] = useState('');
  const [flightReturnDate, setFlightReturnDate] = useState('');
  const [flightAdults, setFlightAdults] = useState(1);
  const [flightChildren, setFlightChildren] = useState(0);
  const [flightInfants, setFlightInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState<CabinKey>('economy');
  const [paxDropdownOpen, setPaxDropdownOpen] = useState(false);
  const [flightErrors, setFlightErrors] = useState<string[]>([]);
  const [flightValidated, setFlightValidated] = useState(false);
  const paxMenuRef = useRef<HTMLDivElement | null>(null);

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

  // Close passenger dropdown when clicking outside
  useEffect(() => {
    if (!paxDropdownOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (paxMenuRef.current && !paxMenuRef.current.contains(event.target as Node)) {
        setPaxDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [paxDropdownOpen]);

  // Clear stale validation errors on language change
  useEffect(() => {
    setFlightErrors([]);
    setUmrahErrors([]);
    setHolidayErrors([]);
  }, [lang]);

  // ---------------- FLIGHT HANDLERS ----------------
  const swapFlightLocations = () => {
    const prevOrigin = flightOrigin;
    setFlightOrigin(flightDest);
    setFlightDest(prevOrigin);
    setFlightValidated(false);
  };

  const adjustFlightPax = (kind: 'adults' | 'children' | 'infants', delta: number) => {
    const total = flightAdults + flightChildren + flightInfants;
    if (delta > 0 && total >= 9) return;

    if (kind === 'adults') {
      const next = Math.max(1, Math.min(9, flightAdults + delta));
      setFlightAdults(next);
      if (flightInfants > next) setFlightInfants(next);
    } else if (kind === 'children') {
      const next = Math.max(0, Math.min(8, flightChildren + delta));
      setFlightChildren(next);
    } else {
      const next = Math.max(0, Math.min(flightAdults, flightInfants + delta));
      setFlightInfants(next);
    }
    setFlightValidated(false);
  };

  const handleFlightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    const o = flightOrigin.trim();
    const d = flightDest.trim();

    if (!o) errs.push(pack.flights.errors.originRequired);
    if (!d) errs.push(pack.flights.errors.destinationRequired);
    if (o && d && o.toLowerCase() === d.toLowerCase()) {
      errs.push(pack.flights.errors.sameRoute);
    }
    if (!flightDepartDate) {
      errs.push(pack.flights.errors.departureRequired);
    } else if (flightDepartDate < todayIso) {
      errs.push(pack.flights.errors.departurePast);
    }
    if (tripType === 'round-trip') {
      if (!flightReturnDate) {
        errs.push(pack.flights.errors.returnRequired);
      } else if (flightDepartDate && flightReturnDate < flightDepartDate) {
        errs.push(pack.flights.errors.returnBeforeDeparture);
      }
    }
    if (flightAdults < 1) errs.push(pack.flights.errors.adultsMin);
    if (flightInfants > flightAdults) errs.push(pack.flights.errors.infantsExceedAdults);
    if (flightAdults + flightChildren + flightInfants > 9) {
      errs.push(pack.flights.errors.maxPassengers);
    }

    setFlightErrors(errs);
    setFlightValidated(errs.length === 0);
    setPaxDropdownOpen(false);
  };

  const buildFlightWhatsappUrl = () => {
    const lines = [
      'Bonjour Golden Group Travels,',
      'Je souhaite un devis pour un vol :',
      `• Type : ${tripType === 'round-trip' ? pack.flights.tripRoundTrip : pack.flights.tripOneWay}`,
      `• Départ : ${flightOrigin.trim()}`,
      `• Destination : ${flightDest.trim()}`,
      `• Date de départ : ${flightDepartDate}`,
      tripType === 'round-trip' && flightReturnDate ? `• Date de retour : ${flightReturnDate}` : '',
      `• Passagers : ${flightAdults} ${pack.flights.adultsLabel}, ${flightChildren} ${pack.flights.childrenLabel}, ${flightInfants} ${pack.flights.infantsLabel}`,
      `• Classe : ${pack.flights.cabins[cabinClass]}`
    ].filter(Boolean);
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(lines.join('\n'))}`;
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

  const totalFlightPax = flightAdults + flightChildren + flightInfants;

  const wrapperClass = embeddedOnServicePage
    ? 'bg-[#fcf9f2] border border-[#d1a847]/50 rounded-2xl p-5 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(11,29,58,0.09)]'
    : 'py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-8';

  const cardClass = embeddedOnServicePage
    ? 'space-y-6'
    : 'bg-[#fcf9f2] border-2 border-[#d1a847]/55 rounded-2xl p-4 sm:p-8 lg:p-10 shadow-[0_24px_60px_rgba(11,29,58,0.12)]';

  return (
    <section id="search-hub" aria-label={pack.hubTitle} className={wrapperClass}>
      {!embeddedOnServicePage && (
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-xs uppercase tracking-[0.26em] text-[#9a7220] font-semibold mb-2.5">
            {pack.hubEyebrow}
          </p>
          <h2 className="font-serif-crest text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0b1d3a] tracking-wide [text-wrap:balance]">
            {pack.hubTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#2c405e] leading-relaxed">
            {pack.hubSubtitle}
          </p>
          <div className="w-20 h-px bg-[#c59b38]/70 mx-auto mt-5" />
        </div>
      )}

      <div className={cardClass}>
        {/* Category Switcher Tabs (Show when multiple categories available) */}
        {tabsToRender.length > 1 && (
          <div className="mb-7 pb-5 border-b border-[#d1a847]/35">
            <div
              role="tablist"
              aria-label={pack.hubTitle}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3"
            >
              {tabsToRender.map((catId) => {
                const Icon = CATEGORY_ICONS[catId];
                const meta = pack.categories[catId];
                const isActive = activeCategory === catId;
                const isUmrah = catId === 'umrah';

                return (
                  <button
                    key={catId}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onCategoryChange(catId)}
                    className={`group relative rounded-xl px-3 py-3 text-left rtl:text-right border transition-all duration-300 cursor-pointer flex items-center gap-3 ${
                      isActive
                        ? 'bg-[#0b1d3a] text-[#fceda2] border-[#d1a847] shadow-[0_10px_24px_rgba(11,29,58,0.22)] -translate-y-0.5'
                        : isUmrah
                        ? 'bg-[#f5ede0] text-[#0b1d3a] border-[#d1a847]/70 hover:bg-[#ede1ce]'
                        : 'bg-[#f5ede0]/80 text-[#0b1d3a] border-[#d1a847]/40 hover:border-[#0b1d3a]/60 hover:bg-[#ede1ce]/80'
                    }`}
                  >
                    <span
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                        isActive
                          ? 'bg-[#071429] border-[#d1a847] text-[#fceda2]'
                          : 'bg-[#fcf9f2] border-[#c59b38]/50 text-[#0b1d3a]'
                      }`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-[13px] font-bold uppercase tracking-wider truncate">
                        {meta.tabLabel}
                      </div>
                      <div
                        className={`text-[10px] truncate ${
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

        {/* Active Category Content with Smooth Panel Entrance */}
        <div key={activeCategory} className="animate-search-panel-in">
          {/* ==================== 1. FLIGHTS SEARCH ==================== */}
          {activeCategory === 'flights' && (
            <div className="space-y-6">
              {/* Trip Type Selector + Future Widget Slot Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex rounded-xl bg-[#ede1ce] p-1 border border-[#d1a847]/45">
                  <button
                    type="button"
                    onClick={() => {
                      setTripType('round-trip');
                      setFlightValidated(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      tripType === 'round-trip'
                        ? 'bg-[#0b1d3a] text-[#fceda2]'
                        : 'text-[#0b1d3a]/80 hover:text-[#0b1d3a]'
                    }`}
                  >
                    {pack.flights.tripRoundTrip}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTripType('one-way');
                      setFlightValidated(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      tripType === 'one-way'
                        ? 'bg-[#0b1d3a] text-[#fceda2]'
                        : 'text-[#0b1d3a]/80 hover:text-[#0b1d3a]'
                    }`}
                  >
                    {pack.flights.tripOneWay}
                  </button>
                </div>

                {onOpenServicePage && !embeddedOnServicePage && (
                  <button
                    type="button"
                    onClick={() => onOpenServicePage(SEARCH_CATEGORY_TO_SERVICE.flights)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9a7220] hover:text-[#0b1d3a] transition-colors cursor-pointer"
                  >
                    <span>{pack.openDedicatedPage}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>

              <form onSubmit={handleFlightSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
                  {/* Origin */}
                  <div className="md:col-span-5">
                    <label
                      htmlFor={`${uid}-flight-origin`}
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                    >
                      <Plane className="w-3.5 h-3.5 text-[#c59b38]" />
                      <span>{pack.flights.originLabel}</span>
                    </label>
                    <input
                      id={`${uid}-flight-origin`}
                      list={`${uid}-origins-list`}
                      type="text"
                      value={flightOrigin}
                      onChange={(e) => {
                        setFlightOrigin(e.target.value);
                        setFlightValidated(false);
                      }}
                      placeholder={pack.flights.originPlaceholder}
                      className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] placeholder:text-[#2c405e]/60 focus:outline-none focus:border-[#0b1d3a]"
                    />
                    <datalist id={`${uid}-origins-list`}>
                      {POPULAR_FLIGHT_ORIGINS.map((city) => (
                        <option key={city} value={city} />
                      ))}
                    </datalist>
                  </div>

                  {/* Swap Button */}
                  <div className="md:col-span-2 flex justify-center">
                    <button
                      type="button"
                      onClick={swapFlightLocations}
                      aria-label={pack.flights.swapAria}
                      title={pack.flights.swapAria}
                      className="w-full md:w-11 h-[42px] rounded-xl bg-[#ede1ce] hover:bg-[#0b1d3a] text-[#0b1d3a] hover:text-[#fceda2] border border-[#d1a847]/60 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ArrowLeftRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Destination */}
                  <div className="md:col-span-5">
                    <label
                      htmlFor={`${uid}-flight-dest`}
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#c59b38]" />
                      <span>{pack.flights.destinationLabel}</span>
                    </label>
                    <input
                      id={`${uid}-flight-dest`}
                      list={`${uid}-dests-list`}
                      type="text"
                      value={flightDest}
                      onChange={(e) => {
                        setFlightDest(e.target.value);
                        setFlightValidated(false);
                      }}
                      placeholder={pack.flights.destinationPlaceholder}
                      className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] placeholder:text-[#2c405e]/60 focus:outline-none focus:border-[#0b1d3a]"
                    />
                    <datalist id={`${uid}-dests-list`}>
                      {POPULAR_FLIGHT_DESTINATIONS.map((city) => (
                        <option key={city} value={city} />
                      ))}
                    </datalist>
                  </div>
                </div>

                {/* Dates + Passengers + Cabin Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 items-end">
                  <div className={tripType === 'round-trip' ? 'lg:col-span-3' : 'lg:col-span-4'}>
                    <label
                      htmlFor={`${uid}-flight-depart`}
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#c59b38]" />
                      <span>{pack.flights.departureDateLabel}</span>
                    </label>
                    <input
                      id={`${uid}-flight-depart`}
                      type="date"
                      min={todayIso}
                      value={flightDepartDate}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFlightDepartDate(val);
                        if (flightReturnDate && val && flightReturnDate < val) {
                          setFlightReturnDate(val);
                        }
                        setFlightValidated(false);
                      }}
                      className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                    />
                  </div>

                  {tripType === 'round-trip' && (
                    <div className="lg:col-span-3">
                      <label
                        htmlFor={`${uid}-flight-return`}
                        className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#c59b38]" />
                        <span>{pack.flights.returnDateLabel}</span>
                      </label>
                      <input
                        id={`${uid}-flight-return`}
                        type="date"
                        min={flightDepartDate || todayIso}
                        value={flightReturnDate}
                        onChange={(e) => {
                          setFlightReturnDate(e.target.value);
                          setFlightValidated(false);
                        }}
                        className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                      />
                    </div>
                  )}

                  {/* Interactive Passengers Stepper Dropdown */}
                  <div
                    ref={paxMenuRef}
                    className={`relative ${tripType === 'round-trip' ? 'lg:col-span-3' : 'lg:col-span-4'}`}
                  >
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5">
                      <Users className="w-3.5 h-3.5 text-[#c59b38]" />
                      <span>{pack.flights.travelersLabel}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setPaxDropdownOpen((prev) => !prev)}
                      aria-expanded={paxDropdownOpen}
                      className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] flex items-center justify-between gap-2 focus:outline-none focus:border-[#0b1d3a] cursor-pointer"
                    >
                      <span className="truncate font-medium">
                        {totalFlightPax} · {flightAdults} {pack.flights.adultsLabel}
                        {flightChildren > 0 ? `, ${flightChildren} ${pack.flights.childrenLabel}` : ''}
                        {flightInfants > 0 ? `, ${flightInfants} ${pack.flights.infantsLabel}` : ''}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#9a7220] shrink-0 transition-transform ${
                          paxDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {paxDropdownOpen && (
                      <div className="absolute left-0 right-0 z-30 mt-2 bg-[#fcf9f2] border border-[#d1a847] rounded-xl shadow-[0_18px_40px_rgba(11,29,58,0.2)] p-4 space-y-3">
                        {/* Adults */}
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="text-xs font-bold text-[#0b1d3a]">
                              {pack.flights.adultsLabel}
                            </div>
                            <div className="text-[11px] text-[#2c405e]">
                              {pack.flights.adultsHint}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              aria-label={`- ${pack.flights.adultsLabel}`}
                              onClick={() => adjustFlightPax('adults', -1)}
                              disabled={flightAdults <= 1}
                              className="w-7 h-7 rounded-lg border border-[#d1a847]/60 flex items-center justify-center text-[#0b1d3a] disabled:opacity-35 cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-5 text-center text-sm font-bold tabular-nums">
                              {flightAdults}
                            </span>
                            <button
                              type="button"
                              aria-label={`+ ${pack.flights.adultsLabel}`}
                              onClick={() => adjustFlightPax('adults', 1)}
                              disabled={totalFlightPax >= 9}
                              className="w-7 h-7 rounded-lg border border-[#d1a847]/60 flex items-center justify-center text-[#0b1d3a] disabled:opacity-35 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#d1a847]/20">
                          <div>
                            <div className="text-xs font-bold text-[#0b1d3a]">
                              {pack.flights.childrenLabel}
                            </div>
                            <div className="text-[11px] text-[#2c405e]">
                              {pack.flights.childrenHint}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              aria-label={`- ${pack.flights.childrenLabel}`}
                              onClick={() => adjustFlightPax('children', -1)}
                              disabled={flightChildren <= 0}
                              className="w-7 h-7 rounded-lg border border-[#d1a847]/60 flex items-center justify-center text-[#0b1d3a] disabled:opacity-35 cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-5 text-center text-sm font-bold tabular-nums">
                              {flightChildren}
                            </span>
                            <button
                              type="button"
                              aria-label={`+ ${pack.flights.childrenLabel}`}
                              onClick={() => adjustFlightPax('children', 1)}
                              disabled={totalFlightPax >= 9}
                              className="w-7 h-7 rounded-lg border border-[#d1a847]/60 flex items-center justify-center text-[#0b1d3a] disabled:opacity-35 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Infants */}
                        <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#d1a847]/20">
                          <div>
                            <div className="text-xs font-bold text-[#0b1d3a]">
                              {pack.flights.infantsLabel}
                            </div>
                            <div className="text-[11px] text-[#2c405e]">
                              {pack.flights.infantsHint}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              aria-label={`- ${pack.flights.infantsLabel}`}
                              onClick={() => adjustFlightPax('infants', -1)}
                              disabled={flightInfants <= 0}
                              className="w-7 h-7 rounded-lg border border-[#d1a847]/60 flex items-center justify-center text-[#0b1d3a] disabled:opacity-35 cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-5 text-center text-sm font-bold tabular-nums">
                              {flightInfants}
                            </span>
                            <button
                              type="button"
                              aria-label={`+ ${pack.flights.infantsLabel}`}
                              onClick={() => adjustFlightPax('infants', 1)}
                              disabled={totalFlightPax >= 9 || flightInfants >= flightAdults}
                              className="w-7 h-7 rounded-lg border border-[#d1a847]/60 flex items-center justify-center text-[#0b1d3a] disabled:opacity-35 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cabin Class */}
                  <div className={tripType === 'round-trip' ? 'lg:col-span-3' : 'lg:col-span-4'}>
                    <label
                      htmlFor={`${uid}-flight-cabin`}
                      className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#c59b38]" />
                      <span>{pack.flights.cabinLabel}</span>
                    </label>
                    <select
                      id={`${uid}-flight-cabin`}
                      value={cabinClass}
                      onChange={(e) => {
                        setCabinClass(e.target.value as CabinKey);
                        setFlightValidated(false);
                      }}
                      className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                    >
                      <option value="economy">{pack.flights.cabins.economy}</option>
                      <option value="premium">{pack.flights.cabins.premium}</option>
                      <option value="business">{pack.flights.cabins.business}</option>
                      <option value="first">{pack.flights.cabins.first}</option>
                    </select>
                  </div>
                </div>

                {/* Validation Messages */}
                {flightErrors.length > 0 && (
                  <div
                    role="alert"
                    className="rounded-xl bg-amber-50 border border-amber-300 px-4 py-3 text-xs text-amber-950 space-y-1"
                  >
                    {flightErrors.map((err, i) => (
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
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.15em] shadow-md transition-colors cursor-pointer"
                  >
                    <Search className="w-4 h-4 text-[#d1a847]" />
                    <span>{pack.flights.searchBtn}</span>
                  </button>

                  <span className="text-[11px] text-[#2c405e]/85 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#c59b38] shrink-0" />
                    <span>{pack.flights.aviasalesNotice}</span>
                  </span>
                </div>
              </form>

              {/* Validated Flight Summary & Official Unmodified Aviasales Continue CTA */}
              {flightValidated && (
                <div className="rounded-2xl bg-[#0b1d3a] text-[#f5ede0] border border-[#d1a847] p-5 sm:p-7 space-y-4 animate-search-panel-in">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{pack.flights.summaryTitle}</span>
                      </div>
                      <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-[#fcf9f2] mt-1">
                        {flightOrigin.trim()} → {flightDest.trim()}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1">
                        {flightDepartDate}
                        {tripType === 'round-trip' && flightReturnDate ? ` → ${flightReturnDate}` : ''}{' '}
                        · {totalFlightPax} {pack.flights.travelersLabel} ·{' '}
                        {pack.flights.cabins[cabinClass]}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFlightValidated(false)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#fceda2]/90 hover:text-white cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{pack.flights.resetBtn}</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pack.flights.summarySubtitle}
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                    <a
                      href={AVIASALES_PARTNER.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.15em] shadow-lg transition-colors"
                    >
                      <span>{pack.flights.continueAviasalesBtn}</span>
                      <ExternalLink className="w-4 h-4 shrink-0" />
                    </a>

                    <a
                      href={buildFlightWhatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#071429] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/60 text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      <span>
                        {pack.flights.agencyFlightQuoteBtn} ({displayPhone})
                      </span>
                    </a>
                  </div>
                </div>
              )}

              {/* Modular Future Aviasales Official Search Widget Slot (Prepared cleanly for Phase 2) */}
              <div
                id={AVIASALES_PARTNER.widgetSlotId}
                data-supplier="aviasales"
                className="rounded-xl bg-[#f5ede0]/60 border border-dashed border-[#d1a847]/60 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#2c405e]"
              >
                <div className="flex items-center gap-2 font-semibold text-[#0b1d3a]">
                  <Sparkles className="w-3.5 h-3.5 text-[#c59b38] shrink-0" />
                  <span>{pack.flights.futureWidgetBadge}</span>
                </div>
                <span className="text-[11px] text-[#2c405e]/85">{pack.flights.futureWidgetNote}</span>
              </div>
            </div>
          )}

          {/* ==================== 2. HOTELS SEARCH (OFFICIAL FR-EXPEDIA WIDGET) ==================== */}
          {activeCategory === 'hotels' && (
            <div className="space-y-5">
              {onOpenServicePage && !embeddedOnServicePage && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => onOpenServicePage(SEARCH_CATEGORY_TO_SERVICE.hotels)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9a7220] hover:text-[#0b1d3a] transition-colors cursor-pointer"
                  >
                    <span>{pack.openDedicatedPage}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              )}

              <ExpediaSearchWidget
                key="expedia-hotels-search"
                lang={lang}
                variant="hub"
                onJumpToPlanner={onJumpToPlanner}
              />
            </div>
          )}

          {/* ==================== 3. UMRAH INQUIRY ==================== */}
          {activeCategory === 'umrah' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                    {pack.umrah.badge}
                  </div>
                  <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-[#0b1d3a]">
                    {pack.umrah.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
                    {pack.umrah.subtitle}
                  </p>
                </div>

                {onOpenServicePage && !embeddedOnServicePage && (
                  <button
                    type="button"
                    onClick={() => onOpenServicePage(SEARCH_CATEGORY_TO_SERVICE.umrah)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9a7220] hover:text-[#0b1d3a] transition-colors cursor-pointer shrink-0"
                  >
                    <span>{pack.openDedicatedPage}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>

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
                      <div className="font-semibold text-white mt-0.5">
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
          )}

          {/* ==================== 4. HOLIDAY PACKAGES INQUIRY ==================== */}
          {activeCategory === 'holidays' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                    {pack.holidays.badge}
                  </div>
                  <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-[#0b1d3a]">
                    {pack.holidays.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
                    {pack.holidays.subtitle}
                  </p>
                </div>

                {onOpenServicePage && !embeddedOnServicePage && (
                  <button
                    type="button"
                    onClick={() => onOpenServicePage(SEARCH_CATEGORY_TO_SERVICE.holidays)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9a7220] hover:text-[#0b1d3a] transition-colors cursor-pointer shrink-0"
                  >
                    <span>{pack.openDedicatedPage}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>

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
                      <div className="font-semibold text-white mt-0.5">
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
                          max={20}
                          value={holidayAdults}
                          onChange={(e) =>
                            setHolidayAdults(Math.max(1, Number(e.target.value) || 1))
                          }
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
                          onChange={(e) =>
                            setHolidayChildren(Math.max(0, Number(e.target.value) || 0))
                          }
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
          )}

          {/* ==================== 5. TOURS & ACTIVITIES (KLOOK + KKDAY) ==================== */}
          {activeCategory === 'tours' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                    {pack.tours.badge}
                  </div>
                  <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-[#0b1d3a]">
                    {pack.tours.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
                    {pack.tours.subtitle}
                  </p>
                </div>

                {onOpenServicePage && !embeddedOnServicePage && (
                  <button
                    type="button"
                    onClick={() => onOpenServicePage(SEARCH_CATEGORY_TO_SERVICE.tours)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9a7220] hover:text-[#0b1d3a] transition-colors cursor-pointer shrink-0"
                  >
                    <span>{pack.openDedicatedPage}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>

              {/* Destination Note Selector */}
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

                <div className="flex items-start gap-2 text-[11px] text-[#2c405e]/90 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c59b38] shrink-0 mt-0.5" />
                  <span>{pack.tours.transparencyNote}</span>
                </div>
              </div>

              {/* Exact Unmodified Partner Action Cards (Klook & KKday) */}
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
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.14em] transition-colors"
                      >
                        <span>{isKlook ? pack.tours.klookCta : pack.tours.kkdayCta}</span>
                        <ExternalLink className="w-4 h-4 shrink-0" />
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* Agency Custom Excursion Concierge + Future Supplier Slot */}
              <div
                id="tours-supplier-widget-slot"
                data-supplier="tours-future"
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-[#f5ede0]/65 border border-dashed border-[#d1a847]/55 px-4 py-3.5"
              >
                <span className="text-xs text-[#2c405e]">{pack.tours.architectureNote}</span>
                <a
                  href={buildCustomTourWhatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#0b1d3a] text-[#fceda2] hover:bg-[#132d56] text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors"
                >
                  <span>{pack.tours.customTourBtn}</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
