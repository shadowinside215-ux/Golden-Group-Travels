/**
 * Golden Group Travels
 * Premium Global Travel Management
 * Multi-Language: English, French, Spanish, Arabic
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Compass,
  Plane,
  Building2,
  FileCheck2,
  ShieldCheck,
  Palmtree,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Award,
  Headphones,
  Send,
  Mail,
  MapPin,
  Calendar,
  Search,
  Users,
  ArrowDown,
  ArrowUp
} from 'lucide-react';
import { translations, Language } from './translations.ts';

// Clean WhatsApp SVG icon
const WhatsAppIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

// All 6 core services configured for the search terminal
export type SearchTab = 'tours' | 'hotel' | 'flights' | 'circuits' | 'visa' | 'insurance';

export interface SearchTabConfig {
  id: SearchTab;
  icon: React.ComponentType<{ className?: string }>;
  label: Record<Language, string>;
  destinationLabel: Record<Language, string>;
  destinationPlaceholder: Record<Language, string>;
  datesLabel: Record<Language, string>;
  datesPlaceholder: Record<Language, string>;
  actionLabel: Record<Language, string>;
}

export const SEARCH_TABS: SearchTabConfig[] = [
  {
    id: 'tours',
    icon: Palmtree,
    label: { fr: 'Voyage Organisé', ar: 'رحلات منظمة', en: 'Organized Tours', es: 'Viajes Organizados' },
    destinationLabel: { fr: 'DESTINATION', ar: 'الوجهة', en: 'DESTINATION', es: 'DESTINO' },
    destinationPlaceholder: { fr: 'Où voulez-vous aller ? (ex: Istanbul, Dubaï, Omra...)', ar: 'إلى أين تريد الذهاب؟ (مثل: إسطنبول، دبي، مكة...)', en: 'Where do you want to go? (e.g. Istanbul, Dubai...)', es: '¿A dónde quieres ir? (ej: Estambul, Dubái...)' },
    datesLabel: { fr: 'DE - À', ar: 'من - إلى', en: 'FROM - TO', es: 'DE - A' },
    datesPlaceholder: { fr: 'Dates du voyage', ar: 'تواريخ السفر', en: 'Travel dates', es: 'Fechas del viaje' },
    actionLabel: { fr: 'Rechercher', ar: 'بحث', en: 'Search', es: 'Buscar' }
  },
  {
    id: 'hotel',
    icon: Building2,
    label: { fr: 'Hôtel', ar: 'فنادق', en: 'Hotels', es: 'Hoteles' },
    destinationLabel: { fr: 'VILLE / HÔTEL', ar: 'المدينة أو الفندق', en: 'CITY / HOTEL', es: 'CIUDAD / HOTEL' },
    destinationPlaceholder: { fr: 'Ville ou nom de l\'hôtel (ex: Marrakech, Paris...)', ar: 'المدينة أو اسم الفندق (مثل: مراكش، باريس...)', en: 'City or hotel name (e.g. Paris, Dubai...)', es: 'Ciudad o nombre del hotel' },
    datesLabel: { fr: 'ARRIVÉE - DÉPART', ar: 'الوصول - المغادرة', en: 'CHECK-IN - OUT', es: 'CHECK-IN - OUT' },
    datesPlaceholder: { fr: 'Check-in / Check-out', ar: 'الدخول / الخروج', en: 'Check-in / Out', es: 'Entrada / Salida' },
    actionLabel: { fr: 'Rechercher', ar: 'بحث', en: 'Search', es: 'Buscar' }
  },
  {
    id: 'flights',
    icon: Plane,
    label: { fr: 'Billets d\'Avion', ar: 'حجوزات طيران', en: 'Flights', es: 'Vuelos' },
    destinationLabel: { fr: 'TRAJET VOL', ar: 'مسار الرحلة', en: 'FLIGHT ROUTE', es: 'RUTA DE VUELO' },
    destinationPlaceholder: { fr: 'De Casablanca vers Paris, Dubaï, Istanbul...', ar: 'من الدار البيضاء إلى باريس، دبي، إسطنبول...', en: 'From Casablanca to Paris, Dubai, Jeddah...', es: 'De Casablanca a París, Dubái...' },
    datesLabel: { fr: 'ALLER - RETOUR', ar: 'ذهاب - عودة', en: 'DEPART - RETURN', es: 'IDA - VUELTA' },
    datesPlaceholder: { fr: 'Dates des vols', ar: 'تواريخ الرحلة', en: 'Flight dates', es: 'Fechas de vuelos' },
    actionLabel: { fr: 'Rechercher un Vol', ar: 'بحث عن طيران', en: 'Search Flights', es: 'Buscar Vuelos' }
  },
  {
    id: 'circuits',
    icon: Compass,
    label: { fr: 'Circuits Maroc', ar: 'جولات المغرب', en: 'Morocco Tours', es: 'Circuitos Marruecos' },
    destinationLabel: { fr: 'CIRCUIT / RÉGION', ar: 'المنطقة أو المسار', en: 'TOUR / REGION', es: 'CIRCUITO / REGIÓN' },
    destinationPlaceholder: { fr: 'Désert Merzouga, Villes Impériales, Grand Sud...', ar: 'صحراء مرزوكة، المدن الإمبراطورية، الجنوب الكبير...', en: 'Merzouga Desert, Imperial Cities, High Atlas...', es: 'Desierto Merzouga, Ciudades Imperiales...' },
    datesLabel: { fr: 'DATES DU CIRCUIT', ar: 'فترة الجولة', en: 'TOUR DATES', es: 'FECHAS DEL CIRCUITO' },
    datesPlaceholder: { fr: 'Période souhaitée', ar: 'الفترة المحددة', en: 'Preferred period', es: 'Período deseado' },
    actionLabel: { fr: 'Explorer les Circuits', ar: 'استكشاف الجولات', en: 'Explore Tours', es: 'Explorar Circuitos' }
  },
  {
    id: 'visa',
    icon: FileCheck2,
    label: { fr: 'Assistance Visa', ar: 'تأشيرات السفر', en: 'Visa Services', es: 'Visados' },
    destinationLabel: { fr: 'PAYS DE DESTINATION', ar: 'دولة الوجهة', en: 'DESTINATION COUNTRY', es: 'PAÍS DESTINO' },
    destinationPlaceholder: { fr: 'Espace Schengen, USA, UK, Canada, Dubaï...', ar: 'شنغن، أمريكا، بريطانيا، كندا، دبي...', en: 'Schengen Area, USA, UK, Canada, Dubai...', es: 'Espacio Schengen, EE.UU., Reino Unido...' },
    datesLabel: { fr: 'DATE DE DÉPART', ar: 'تاريخ السفر المتوقع', en: 'EXPECTED DATE', es: 'FECHA PREVISTA' },
    datesPlaceholder: { fr: 'Date prévue', ar: 'التاريخ المقترح', en: 'Estimated date', es: 'Fecha estimada' },
    actionLabel: { fr: 'Vérifier mon Visa', ar: 'التحقق من التأشيرة', en: 'Check Visa', es: 'Verificar Visado' }
  },
  {
    id: 'insurance',
    icon: ShieldCheck,
    label: { fr: 'Assurance Voyage', ar: 'تأمين السفر', en: 'Travel Insurance', es: 'Seguros' },
    destinationLabel: { fr: 'ZONE DE COUVERTURE', ar: 'نطاق التغطية', en: 'COVERAGE ZONE', es: 'ZONA DE COBERTURA' },
    destinationPlaceholder: { fr: 'Monde entier, Schengen, Amériques, Golfe...', ar: 'جميع أنحاء العالم، شنغن، دول الخليج...', en: 'Worldwide, Schengen Europe, Gulf, Asia...', es: 'Mundial, Schengen, América...' },
    datesLabel: { fr: 'DURÉE DU SEJOUR', ar: 'مدة الإقامة', en: 'COVERAGE DURATION', es: 'DURACIÓN DE COBERTURA' },
    datesPlaceholder: { fr: 'Début - Fin de couverture', ar: 'بداية - نهاية التغطية', en: 'Start - End dates', es: 'Inicio - Fin' },
    actionLabel: { fr: 'Calculer l\'Assurance', ar: 'حساب التأمين', en: 'Get Insurance', es: 'Calcular Seguro' }
  }
];

// Icons mapping for services
const SERVICE_ICONS: Record<string, typeof Plane> = {
  flights: Plane,
  hotels: Building2,
  visa: FileCheck2,
  insurance: ShieldCheck,
  packages: Palmtree
};

const LANGUAGES: { code: Language; name: string; flag: string; label: string }[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷', label: 'FR' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', label: 'عربي' },
  { code: 'en', name: 'English', flag: '🇬🇧', label: 'EN' },
  { code: 'es', name: 'Español', flag: '🇪🇸', label: 'ES' }
];

// Target WhatsApp phone for Golden Group Travels
const WHATSAPP_PHONE_INTERNATIONAL = '212666484815';
const DISPLAY_PHONE = '0666-484815';

// Official Brand Logo (Golden Group Travels - Travel Services & Events)
// Exact logo as uploaded: /assets/aistudio/Golden_Group_Travel_Logo__1__824306ae.png
const GoldenLogo = ({ className = 'h-14 sm:h-22 md:h-26' }: { className?: string; lang?: Language }) => (
  <div className="flex items-center gap-2.5 sm:gap-4 group min-w-0">
    <img
      src="/assets/aistudio/Golden_Group_Travel_Logo__1__824306ae.png"
      alt="Golden Group - Travel Services & Events"
      className={`${className} w-auto shrink-0 object-contain rounded-xl shadow-lg border border-[#d1a847]/30 transition-transform duration-300 group-hover:scale-105 group-hover:border-[#d1a847]`}
    />
    <div className="flex flex-col text-left rtl:text-right min-w-0">
      <span className="text-[12px] sm:text-base md:text-lg font-amiri font-bold text-[#fceda2] leading-tight drop-shadow-xs">
        مجموعة جولدن لخدمات السفر والسياحة
      </span>
      <span className="text-[10px] sm:text-xs font-bold text-[#d1a847] tracking-wider sm:tracking-widest uppercase mt-0.5">
        Golden Group Travels
      </span>
      <span className="text-[8px] sm:text-[10px] text-slate-300 tracking-wider uppercase">
        Travel Services & Events
      </span>
    </div>
  </div>
);

// Minimal, elegant initial loading screen with Golden Group Travels brand identity
const BrandLoader = ({ onComplete }: { onComplete: () => void; lang?: Language }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      const removeTimer = setTimeout(() => {
        onComplete();
      }, 550);
      return () => clearTimeout(removeTimer);
    }, 1100);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#030d1c] transition-opacity duration-500 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center text-center p-6 space-y-6 animate-in fade-in zoom-in-95 duration-500">
        <img
          src="/assets/aistudio/Golden_Group_Travel_Logo__1__824306ae.png"
          alt="Golden Group Travels"
          className="h-28 sm:h-32 w-auto object-contain rounded-2xl shadow-[0_0_35px_rgba(209,168,71,0.35)] border border-[#d1a847]/40"
        />
        <div className="space-y-1.5">
          <h2 className="font-amiri text-2xl sm:text-3xl font-bold text-[#fceda2] tracking-wide">
            مجموعة جولدن لخدمات السفر والسياحة
          </h2>
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#d1a847]">
            Golden Group Travels • Travel Services & Events
          </p>
        </div>
        {/* Subtle Gold Shimmer Progress Bar */}
        <div className="w-48 sm:w-56 h-1 rounded-full bg-[#081528] overflow-hidden border border-[#d1a847]/25 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fceda2] to-transparent animate-shimmer-beam" />
        </div>
      </div>
    </div>
  );
};

// Luxury Animated Section Separator
const SectionSeparator = ({ className = 'my-5 sm:my-6' }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-3 ${className} reveal-init reveal-scale`}>
    <div className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent via-[#d1a847]/50 to-[#d1a847]" />
    <div className="w-2 h-2 rotate-45 border border-[#d1a847] bg-[#fceda2]/40 shadow-[0_0_8px_rgba(209,168,71,0.6)]" />
    <div className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent via-[#d1a847]/50 to-[#d1a847]" />
  </div>
);

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [lang, setLang] = useState<Language>('fr');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [floatingLangOpen, setFloatingLangOpen] = useState(false);

  const t = translations[lang];
  const isRtl = t.dir === 'rtl';

  // Smooth Scroll Tracking & 3D Scroll Physics
  const [scrollY, setScrollY] = useState(0);
  const [scrollTilt, setScrollTilt] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let tiltTimeout: any;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      setScrollY(currentScrollY);

      // Dynamic 3D tilt responsive to scroll velocity (smooth ease between -4deg and +4deg)
      const calculatedTilt = Math.max(-4, Math.min(4, delta * 0.09));
      setScrollTilt(calculatedTilt);

      clearTimeout(tiltTimeout);
      tiltTimeout = setTimeout(() => {
        setScrollTilt(0);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(tiltTimeout);
    };
  }, []);

  // IntersectionObserver for elegant, non-repeating scroll-triggered animations
  useEffect(() => {
    if (initialLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.12
      }
    );

    const elements = document.querySelectorAll('.reveal-init');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [initialLoading]);

  // Smooth ease-out scrolling function with sticky header offset
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 95;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Hero Search Terminal State (Supporting all 6 services from the screenshot section)
  const [activeSearchTab, setActiveSearchTab] = useState<SearchTab>('tours');
  const [searchDestination, setSearchDestination] = useState('');
  const [searchDepartureDate, setSearchDepartureDate] = useState('');
  const [searchReturnDate, setSearchReturnDate] = useState('');
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [roomsCount, setRoomsCount] = useState(1);
  const [flightClass, setFlightClass] = useState<'economy' | 'business' | 'first'>('economy');
  const [visaType, setVisaType] = useState('Tourisme');
  const [insurancePlan, setInsurancePlan] = useState('Individuel (Schengen & Monde)');
  const [advancedDropdownOpen, setAdvancedDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<{
    visible: boolean;
    serviceLabel: string;
    destination: string;
    dates: string;
    options: string;
    tab: SearchTab;
    matchesCount: number;
    whatsappUrl: string;
  } | null>(null);

  // Quick Hero Search Bar State (for compatibility)
  const [quickService] = useState('flights');
  const [quickDestination] = useState('');
  const [quickDate] = useState('');
  const [quickTravelers] = useState('1');

  // Ref for the 3D tabs scroll track
  const tabsTrackRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active tab into view smoothly
  useEffect(() => {
    if (tabsTrackRef.current) {
      const activeEl = tabsTrackRef.current.querySelector('.tab-3d-active') as HTMLElement | null;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeSearchTab]);

  // Tab navigation arrow handlers (supports RTL / LTR smoothly)
  const handleTabArrowLeft = () => {
    const currentIndex = SEARCH_TABS.findIndex(t => t.id === activeSearchTab);
    const targetIndex = isRtl
      ? (currentIndex + 1) % SEARCH_TABS.length
      : (currentIndex - 1 + SEARCH_TABS.length) % SEARCH_TABS.length;
    setActiveSearchTab(SEARCH_TABS[targetIndex].id);
    setSearchResults(null);
    if (tabsTrackRef.current) {
      const scrollAmount = isRtl ? 220 : -220;
      tabsTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleTabArrowRight = () => {
    const currentIndex = SEARCH_TABS.findIndex(t => t.id === activeSearchTab);
    const targetIndex = isRtl
      ? (currentIndex - 1 + SEARCH_TABS.length) % SEARCH_TABS.length
      : (currentIndex + 1) % SEARCH_TABS.length;
    setActiveSearchTab(SEARCH_TABS[targetIndex].id);
    setSearchResults(null);
    if (tabsTrackRef.current) {
      const scrollAmount = isRtl ? -220 : 220;
      tabsTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Active configuration for selected tab
  const currentTabConfig = SEARCH_TABS.find(t => t.id === activeSearchTab) || SEARCH_TABS[0];

  // Handle Hero Search execution for all 6 services
  const handleHeroSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const tabName = currentTabConfig.label[lang];
    const dest = searchDestination.trim() || (
      activeSearchTab === 'tours' ? 'Toutes les destinations de rêve' :
      activeSearchTab === 'hotel' ? 'Hôtels 5 étoiles sélectionnés' :
      activeSearchTab === 'flights' ? 'Casablanca vers le Monde' :
      activeSearchTab === 'circuits' ? 'Les plus beaux circuits du Maroc' :
      activeSearchTab === 'visa' ? 'Visa international garanti' : 'Assurance voyage complète'
    );

    const datesStr = searchDepartureDate
      ? (searchReturnDate ? `${searchDepartureDate} - ${searchReturnDate}` : `À partir du ${searchDepartureDate}`)
      : 'Dates flexibles';

    let optionsStr = '';
    if (activeSearchTab === 'tours' || activeSearchTab === 'circuits') {
      const total = adultsCount + childrenCount;
      optionsStr = `${total} ${total > 1 ? 'Voyageurs' : 'Voyageur'}`;
    } else if (activeSearchTab === 'hotel') {
      const total = adultsCount + childrenCount;
      optionsStr = `${total} ${total > 1 ? 'Personnes' : 'Personne'}, ${roomsCount} ${roomsCount > 1 ? 'Chambres' : 'Chambre'}`;
    } else if (activeSearchTab === 'flights') {
      const className = flightClass === 'first' ? '1ère Classe' : flightClass === 'business' ? 'Classe Affaires' : 'Classe Économique';
      optionsStr = `${className}, ${adultsCount + childrenCount} Passagers`;
    } else if (activeSearchTab === 'visa') {
      optionsStr = `Type: Visa ${visaType}, ${adultsCount} Demande(s)`;
    } else if (activeSearchTab === 'insurance') {
      optionsStr = `Formule: ${insurancePlan}`;
    }

    const waText = `Bonjour Golden Group Travels, je recherche un ${tabName} pour "${dest}" (${datesStr}, ${optionsStr}). Merci de me communiquer les disponibilités et meilleurs tarifs.`;
    // Ultra-fast universal wa.me link avoiding laggy intermediate redirects
    const waUrl = `https://wa.me/${WHATSAPP_PHONE_INTERNATIONAL}?text=${encodeURIComponent(waText)}`;

    setSearchResults({
      visible: true,
      serviceLabel: tabName,
      destination: dest,
      dates: datesStr,
      options: optionsStr,
      tab: activeSearchTab,
      matchesCount: 4,
      whatsappUrl: waUrl
    });

    // Populate consultation form with search criteria
    setDestination(dest);
    if (searchDepartureDate) setTravelDate(searchDepartureDate);
    setTravelersCount(String(adultsCount + childrenCount));

    // Smooth scroll into results
    setTimeout(() => {
      document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 120);
  };

  // Consultation Form State
  const [formService, setFormService] = useState(t.services.items[0].name);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelersCount, setTravelersCount] = useState('2');
  const [specialRequests, setSpecialRequests] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Sanitization helpers to prevent injection / malicious payloads
  const sanitizeText = (val: string, maxLen = 120): string => {
    return val ? val.replace(/[<>'"`;(){}[\]\\/]/g, '').trim().slice(0, maxLen) : '';
  };

  const sanitizePhone = (val: string): string => {
    return val ? val.replace(/[^0-9+\s\-()]/g, '').trim().slice(0, 30) : '';
  };

  const sanitizeEmail = (val: string): string => {
    return val ? val.replace(/[<>'";(){}[\]\\/]/g, '').trim().slice(0, 100) : '';
  };

  // Check if current selected service is Flight Bookings
  const isFlightBooking = formService === t.services.items[0].name || formService.toLowerCase().includes('flight') || formService.toLowerCase().includes('vol') || formService.toLowerCase().includes('vuelo') || formService.includes('طيران');
  const isQuickFlightBooking = quickService === 'flights';

  // Construct structured WhatsApp message with client booking data (sanitized)
  const generateWhatsAppMessage = () => {
    const header = lang === 'ar'
      ? '✈️ *طلب حجز واستفسار - جولدن جروب ترافيلز*'
      : lang === 'fr'
      ? '✈️ *Demande de Réservation - Golden Group Travels*'
      : lang === 'es'
      ? '✈️ *Solicitud de Reserva - Golden Group Travels*'
      : '✈️ *Booking Request - Golden Group Travels*';

    const serviceLabel = lang === 'ar' ? 'الخدمة المطلوبة' : lang === 'fr' ? 'Service demandé' : lang === 'es' ? 'Servicio solicitado' : 'Requested Service';
    const nameLabel = lang === 'ar' ? 'اسم العميل' : lang === 'fr' ? 'Nom du client' : lang === 'es' ? 'Nombre del cliente' : 'Client Name';
    const phoneLabel = lang === 'ar' ? 'رقم الهاتف' : lang === 'fr' ? 'Téléphone' : lang === 'es' ? 'Teléfono' : 'Phone';
    const destLabel = lang === 'ar' ? 'الوجهة / الدولة' : lang === 'fr' ? 'Destination' : lang === 'es' ? 'Destino' : 'Destination';
    const dateLabel = lang === 'ar' ? 'تاريخ السفر' : lang === 'fr' ? 'Date de départ' : lang === 'es' ? 'Fecha de salida' : 'Travel Date';
    const paxLabel = lang === 'ar' ? 'عدد المسافرين' : lang === 'fr' ? 'Nombre de voyageurs' : lang === 'es' ? 'Pasajeros' : 'Travelers';
    const notesLabel = lang === 'ar' ? 'ملاحظات وتفاصيل' : lang === 'fr' ? 'Demandes spéciales' : lang === 'es' ? 'Notas especiales' : 'Special Requests';

    const safeName = sanitizeText(fullName, 80);
    const safePhone = sanitizePhone(phone);
    const safeEmail = sanitizeEmail(email);
    const safeDest = sanitizeText(destination, 80);
    const safeNotes = sanitizeText(specialRequests, 400);

    const lines = [
      header,
      '━━━━━━━━━━━━━━━━━━━━',
      `📌 *${serviceLabel}:* ${formService}`,
      `👤 *${nameLabel}:* ${safeName || '-'}`,
      `📞 *${phoneLabel}:* ${safePhone || '-'}`,
      safeEmail ? `✉️ *Email:* ${safeEmail}` : '',
      (isFlightBooking && safeDest) ? `📍 *${destLabel}:* ${safeDest}` : '',
      travelDate ? `📅 *${dateLabel}:* ${travelDate}` : '',
      `👥 *${paxLabel}:* ${travelersCount || '1'}`,
      safeNotes ? `📝 *${notesLabel}:* ${safeNotes}` : '',
      '━━━━━━━━━━━━━━━━━━━━',
      lang === 'ar'
        ? 'تم إرسال هذا الطلب عبر الموقع الرسمي لجولدن جروب ترافيلز'
        : lang === 'fr'
        ? 'Envoyé depuis le site officiel Golden Group Travels'
        : lang === 'es'
        ? 'Enviado desde la web oficial de Golden Group Travels'
        : 'Sent via the official website of Golden Group Travels'
    ].filter(Boolean);

    return lines.join('\n');
  };

  const getWhatsAppUrl = () => {
    const message = generateWhatsAppMessage();
    // Ultra-fast universal wa.me link that launches native WhatsApp immediately
    return `https://wa.me/${WHATSAPP_PHONE_INTERNATIONAL}?text=${encodeURIComponent(message)}`;
  };

  const handleHeroQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceObj = t.services.items.find(s => s.id === quickService);
    if (serviceObj) {
      setFormService(serviceObj.name);
    }
    if (quickDestination && quickService === 'flights') {
      setDestination(sanitizeText(quickDestination, 80));
    }
    if (quickDate) {
      setTravelDate(quickDate);
    }
    if (quickTravelers) {
      setTravelersCount(quickTravelers);
    }

    const consultationSection = document.getElementById('consultation');
    if (consultationSection) {
      consultationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceSelectForInquiry = (serviceName: string) => {
    setFormService(serviceName);
    const consultationSection = document.getElementById('consultation');
    if (consultationSection) {
      consultationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isSubmittingRef = useRef(false);

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Guard against multiple rapid submits
    if (isSubmittingRef.current) return;

    // Anti-bot honeypot check: if bot filled this hidden field, safely ignore
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    isSubmittingRef.current = true;
    setFormLoading(true);

    const waUrl = getWhatsAppUrl();

    // Mark as submitted and complete loading state
    setSubmitted(true);
    setFormLoading(false);

    // Open WhatsApp URL exactly once via programmatic click without triggering secondary navigation
    try {
      const link = document.createElement('a');
      link.href = waUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.location.href = waUrl;
    }

    // Reset submission lock after a cooldown period
    setTimeout(() => {
      isSubmittingRef.current = false;
    }, 2000);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFullName('');
    setPhone('');
    setEmail('');
    setDestination('');
    setTravelDate('');
    setSpecialRequests('');
    setHoneypot('');
  };

  return (
    <div
      dir={t.dir}
      lang={lang}
      className={`min-h-screen bg-[#081528] text-slate-100 flex flex-col font-sans selection:bg-[#d1a847] selection:text-[#0b1d3a] ${
        isRtl ? 'text-right' : 'text-left'
      }`}
    >
      {/* Premium Minimal Brand Loading Screen */}
      {initialLoading && <BrandLoader onComplete={() => setInitialLoading(false)} lang={lang} />}

      {/* Top Strip (Deep Navy Blue & Gold Accent) */}
      <div className="bg-[#050e1a] text-slate-200 text-[12px] border-b border-[#d1a847]/30 relative z-50">
        <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-10 h-9 flex items-center justify-between gap-4">
          {/* Left: Social Media & Official Emails */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/profile.php?id=61596136568520"
                target="_blank"
                rel="noreferrer noopener"
                className="text-[#d1a847] hover:text-[#fceda2] transition-colors"
                title="Facebook"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.69 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/goldengrouptravels/?utm_source=ig_web_button_share_sheet"
                target="_blank"
                rel="noreferrer noopener"
                className="text-[#d1a847] hover:text-[#fceda2] transition-colors"
                title="Instagram"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
            <span className="w-px h-3.5 bg-[#d1a847]/30 hidden sm:inline" />
            {/* Official Email */}
            <div className="flex items-center text-[11px] sm:text-xs">
              <a
                href="mailto:Info@goldengrouptravels.com"
                className="hover:underline flex items-center gap-1.5 text-slate-200 hover:text-[#fceda2] transition-colors"
              >
                <Mail className="w-3 h-3 text-[#d1a847]" />
                <span>Info@goldengrouptravels.com</span>
              </a>
            </div>
          </div>

          {/* Right: Direct Phone Call */}
          <div className="flex items-center text-[11px] sm:text-xs">
            <a
              href="tel:0666484815"
              className="font-semibold text-[#fceda2] tracking-wide hover:underline flex items-center gap-1.5 transition-colors"
              dir="ltr"
            >
              <Phone className="w-3 h-3 text-[#d1a847]" />
              <span>+212 666-484815</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Luxury Deep Navy Blue & Gold, Sticky) */}
      <header className="sticky top-0 z-40 bg-[#021939]/98 backdrop-blur-md text-slate-100 shadow-md border-b border-[#d1a847]/30">
        <div className="w-full px-3 sm:px-5 lg:px-8 xl:px-10 min-h-20 sm:min-h-28 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
          {/* Logo on Maximum Left Side */}
          <a href="#" className="focus:outline-none min-w-0">
            <GoldenLogo className="h-14 sm:h-22 md:h-26" lang={lang} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-bold tracking-wider text-slate-200 uppercase">
            <a
              href="#accueil"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="nav-link-gold hover:text-[#d1a847] transition-colors cursor-pointer"
            >
              {t.nav.accueil}
            </a>
            <a
              href="#search-section"
              onClick={(e) => {
                e.preventDefault();
                setActiveSearchTab('tours');
                scrollToSection('search-section');
              }}
              className="nav-link-gold hover:text-[#d1a847] transition-colors cursor-pointer"
            >
              {t.nav.hajOmra}
            </a>
            <a
              href="#search-section"
              onClick={(e) => {
                e.preventDefault();
                setActiveSearchTab('tours');
                scrollToSection('search-section');
              }}
              className="nav-link-gold hover:text-[#d1a847] transition-colors cursor-pointer"
            >
              {t.nav.voyageOrganise}
            </a>
            <a
              href="#search-section"
              onClick={(e) => {
                e.preventDefault();
                setActiveSearchTab('circuits');
                scrollToSection('search-section');
              }}
              className="nav-link-gold hover:text-[#d1a847] transition-colors cursor-pointer"
            >
              {t.nav.circuitsMaroc}
            </a>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className="nav-link-gold flex items-center gap-1 hover:text-[#d1a847] transition-colors py-2 uppercase cursor-pointer"
              >
                <span>{t.nav.services}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#d1a847] transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-[#0b1d3a] border border-[#d1a847]/40 rounded-lg shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 normal-case font-normal">
                {SEARCH_TABS.map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveSearchTab(tab.id);
                        scrollToSection('search-section');
                      }}
                      className="w-full text-left rtl:text-right px-4 py-2.5 text-xs text-slate-200 hover:bg-[#13284c] hover:text-[#fceda2] transition-colors cursor-pointer flex items-center gap-2.5 group/item"
                    >
                      <TabIcon className="w-4 h-4 text-[#d1a847] transition-transform duration-200 group-hover/item:scale-110" />
                      <span>{tab.label[lang] || tab.label.fr}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="nav-link-gold hover:text-[#d1a847] transition-colors cursor-pointer"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Desktop Right Actions: Quick Language Selector */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <div className="flex items-center bg-[#050e1a]/90 border border-[#d1a847]/30 rounded-lg p-1 text-xs gap-1 shadow-inner">
              {LANGUAGES.map(item => (
                <button
                  key={item.code}
                  onClick={() => setLang(item.code)}
                  className={`px-2.5 py-1 rounded font-semibold cursor-pointer transition-all ${
                    lang === item.code
                      ? 'bg-[#d1a847] text-[#0b1d3a] shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-[#13284c]'
                  }`}
                  title={item.name}
                >
                  {item.flag} {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Hamburger Toggle (Right Action) */}
          <div className="lg:hidden flex items-center shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-[#d1a847] hover:bg-[#13284c] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0b1d3a] border-b border-[#d1a847]/30 px-6 py-6 space-y-4 animate-in fade-in duration-200 text-slate-100">
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between pb-3 border-b border-[#d1a847]/20">
              <span className="text-xs text-[#d1a847] font-semibold uppercase tracking-wider">
                Language / اللغة
              </span>
              <div className="flex items-center bg-[#081528] border border-[#d1a847]/30 rounded-md p-1 text-xs gap-1">
                {LANGUAGES.map(item => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLang(item.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                      lang === item.code
                        ? 'bg-[#d1a847] text-[#0b1d3a] font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.flag} {item.label}
                  </button>
                ))}
              </div>
            </div>

            <nav className="flex flex-col space-y-3 text-sm font-semibold uppercase">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToTop();
                }}
                className="py-1 text-slate-200 hover:text-[#d1a847] transition-colors text-left rtl:text-right cursor-pointer"
              >
                {t.nav.accueil}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveSearchTab('tours');
                  scrollToSection('search-section');
                }}
                className="py-1 text-slate-200 hover:text-[#d1a847] transition-colors text-left rtl:text-right cursor-pointer"
              >
                {t.nav.hajOmra}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveSearchTab('tours');
                  scrollToSection('search-section');
                }}
                className="py-1 text-slate-200 hover:text-[#d1a847] transition-colors text-left rtl:text-right cursor-pointer"
              >
                {t.nav.voyageOrganise}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveSearchTab('circuits');
                  scrollToSection('search-section');
                }}
                className="py-1 text-slate-200 hover:text-[#d1a847] transition-colors text-left rtl:text-right cursor-pointer"
              >
                {t.nav.circuitsMaroc}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('services');
                }}
                className="py-1 text-slate-200 hover:text-[#d1a847] transition-colors text-left rtl:text-right cursor-pointer"
              >
                {t.nav.services}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('contact');
                }}
                className="py-1 text-slate-200 hover:text-[#d1a847] transition-colors text-left rtl:text-right cursor-pointer"
              >
                {t.nav.contact}
              </button>
            </nav>

            {/* Mobile Contact Action */}
            <div className="pt-4 border-t border-[#d1a847]/20 flex items-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE_INTERNATIONAL}`}
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:0666484815"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#0b1d3a] bg-gradient-to-r from-[#fceda2] via-[#d1a847] to-[#c59b38] shadow-md font-extrabold"
              >
                <Phone className="w-4 h-4 text-[#0b1d3a]" />
                <span>Appeler</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section: Sacred Sanctuary Atmosphere & Arabic Calligraphy in Dark Blue & Gold */}
      <section className="relative overflow-hidden min-h-[500px] md:min-h-[560px] flex flex-col justify-center items-center py-16 sm:py-20">
        {/* Background Atmosphere: Hands at the Kaaba's Golden Door Hero Image (Clear, full coverage, no dark screen) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <img
            src="/assets/aistudio/Hands_at_the_Kaaba_s_Golden_Door_e35c1ffa.png"
            alt="Hands at the Kaaba's Golden Door"
            className="w-full h-full object-cover object-[center_35%]"
          />
        </div>

        {/* Central Calligraphy & Luxury Search Bar Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center my-auto py-12 sm:py-20 w-full">
          {/* Main Grand Calligraphy: مجموعة جولدن لخدمات السفر والسياحة */}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-calligraphy text-white drop-shadow-[0_4px_24px_rgba(0,0,0,1)] drop-shadow-[0_2px_6px_rgba(0,0,0,1)] leading-[1.35] text-center max-w-5xl tracking-normal px-4 select-none mb-6 sm:mb-8 hero-reveal-2 filter"
            dir="rtl"
          >
            {t.hero.arabicTitle}
          </h1>

          {/* Quick Hero Search Terminal (Featuring ALL Services with 3D Pop-Out Tabs & Scroll Animations) */}
          <div id="search-section" className="w-full max-w-5xl mt-2 mb-8 text-left rtl:text-right scroll-mt-28 perspective-1200 preserve-3d hero-reveal-3">
            {/* 3D Tabs Bar with Navigation Arrows for Smooth Left/Right Carousel Switching */}
            <div className="relative flex items-center gap-1 sm:gap-2 mb-0">
              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={handleTabArrowLeft}
                aria-label={isRtl ? "Next services" : "Previous services"}
                className="z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#061021]/95 border border-[#d1a847]/40 hover:border-[#d1a847] hover:bg-[#0b1d3a] text-[#d1a847] hover:text-[#fceda2] flex items-center justify-center transition-all shadow-[0_4px_16px_rgba(0,0,0,0.7)] cursor-pointer hover:scale-110 active:scale-95 shrink-0 group/arrow mb-1.5 focus:outline-none"
                title={isRtl ? "التالي" : "Précédent"}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover/arrow:-translate-x-0.5 rtl:rotate-180 rtl:group-hover/arrow:translate-x-0.5" />
              </button>

              {/* 3D Tabs Scrollable Track */}
              <div
                ref={tabsTrackRef}
                className="perspective-1000 preserve-3d flex items-end gap-2 overflow-x-auto pt-6 pb-2 px-1 scrollbar-none max-w-full scroll-smooth flex-1"
              >
                {SEARCH_TABS.map((tab, idx) => {
                  const TabIcon = tab.icon;
                  const isActive = activeSearchTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveSearchTab(tab.id);
                        setSearchResults(null);
                      }}
                      className={`relative px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-t-xl text-xs sm:text-sm font-bold tracking-wider cursor-pointer flex items-center gap-2.5 whitespace-nowrap shrink-0 tab-pop-delay-${idx} ${
                        isActive
                          ? 'tab-3d-active bg-gradient-to-r from-[#fceda2] via-[#d1a847] to-[#c59b38] text-[#0b1d3a] font-extrabold border-t border-x border-[#fceda2]/90'
                          : 'tab-3d-inactive bg-[#061021]/95 text-slate-300 border-t border-x border-[#d1a847]/40 hover:text-white hover:bg-[#0b1d3a]'
                      }`}
                    >
                      <div className={`transition-transform duration-300 ${isActive ? 'scale-115 rotate-[-4deg]' : 'group-hover:scale-110'}`}>
                        <TabIcon className={`w-4 h-4 ${isActive ? 'text-[#0b1d3a]' : 'text-[#d1a847]'}`} />
                      </div>
                      <span className="relative z-10">{tab.label[lang] || tab.label.fr}</span>
                      {/* 3D Base Edge Extrusion when active */}
                      {isActive && (
                        <span className="absolute -bottom-1 inset-x-2 h-1 bg-[#8f6a1e] rounded-b-md blur-[0.3px]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={handleTabArrowRight}
                aria-label={isRtl ? "Previous services" : "Next services"}
                className="z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#061021]/95 border border-[#d1a847]/40 hover:border-[#d1a847] hover:bg-[#0b1d3a] text-[#d1a847] hover:text-[#fceda2] flex items-center justify-center transition-all shadow-[0_4px_16px_rgba(0,0,0,0.7)] cursor-pointer hover:scale-110 active:scale-95 shrink-0 group/arrow mb-1.5 focus:outline-none"
                title={isRtl ? "السابق" : "Suivant"}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover/arrow:translate-x-0.5 rtl:rotate-180 rtl:group-hover/arrow:-translate-x-0.5" />
              </button>
            </div>

            {/* Main Search Bar Form with 3D Tilt on Scroll */}
            <form
              onSubmit={handleHeroSearch}
              style={{
                transform: `perspective(1200px) rotateX(${scrollTilt}deg)`,
                transformOrigin: '50% 0%'
              }}
              className="terminal-3d-shell relative bg-[#061021]/95 backdrop-blur-xl border border-[#d1a847]/40 shadow-[0_20px_55px_-10px_rgba(0,0,0,0.85)] rounded-2xl rounded-tl-none p-3.5 sm:p-5 z-20 transition-transform duration-150 ease-out"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* 1. Destination / Route / Country Field */}
                <div className="md:col-span-4 flex items-center gap-3 p-2.5 rounded-xl bg-[#0b1d3a]/60 border border-[#d1a847]/20 hover:border-[#d1a847]/50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-[#d1a847]/15 border border-[#d1a847]/40 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#d1a847]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#d1a847] leading-tight">
                      {currentTabConfig.destinationLabel[lang] || currentTabConfig.destinationLabel.fr}
                    </label>
                    <input
                      type="text"
                      value={searchDestination}
                      onChange={(e) => setSearchDestination(e.target.value)}
                      placeholder={currentTabConfig.destinationPlaceholder[lang] || currentTabConfig.destinationPlaceholder.fr}
                      className="w-full bg-transparent text-xs sm:text-sm font-medium text-white placeholder-slate-400 focus:outline-none truncate mt-0.5"
                    />
                  </div>
                </div>

                {/* 2. Dates Field (De - À) */}
                <div className="md:col-span-4 flex items-center gap-3 p-2.5 rounded-xl bg-[#0b1d3a]/60 border border-[#d1a847]/20 hover:border-[#d1a847]/50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-[#d1a847]/15 border border-[#d1a847]/40 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-[#d1a847]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#d1a847] leading-tight">
                      {currentTabConfig.datesLabel[lang] || currentTabConfig.datesLabel.fr}
                    </label>
                    <div className="flex items-center gap-1.5 mt-0.5 text-xs text-white">
                      <input
                        type="date"
                        value={searchDepartureDate}
                        onChange={(e) => setSearchDepartureDate(e.target.value)}
                        className="bg-transparent text-[11px] sm:text-xs text-white focus:outline-none cursor-pointer"
                        title={currentTabConfig.datesLabel[lang] || "Date de départ"}
                      />
                      <span className="text-slate-400">-</span>
                      <input
                        type="date"
                        value={searchReturnDate}
                        onChange={(e) => setSearchReturnDate(e.target.value)}
                        className="bg-transparent text-[11px] sm:text-xs text-white focus:outline-none cursor-pointer"
                        title="Date de retour"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Avancé Field (Service-Tailored Dropdown) */}
                <div className="md:col-span-2 relative">
                  <button
                    type="button"
                    onClick={() => setAdvancedDropdownOpen(!advancedDropdownOpen)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#0b1d3a]/60 border border-[#d1a847]/20 hover:border-[#d1a847]/50 transition-colors text-left rtl:text-right cursor-pointer"
                  >
                    <div className="truncate">
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#d1a847] leading-tight">
                        {t.hero.advancedTitle}
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-white truncate mt-0.5 flex items-center gap-1">
                        {activeSearchTab === 'flights' ? (
                          <span>{flightClass === 'business' ? 'Affaires' : flightClass === 'first' ? '1ère' : 'Éco'}, {adultsCount + childrenCount}</span>
                        ) : activeSearchTab === 'visa' ? (
                          <span>{visaType}, {adultsCount} Pers.</span>
                        ) : activeSearchTab === 'insurance' ? (
                          <span>{insurancePlan.split(' ')[0]}, {adultsCount}</span>
                        ) : activeSearchTab === 'hotel' ? (
                          <span>{adultsCount + childrenCount} Pers., {roomsCount} Ch.</span>
                        ) : (
                          <span>{adultsCount + childrenCount} {adultsCount + childrenCount > 1 ? 'Pers.' : 'Pers.'}</span>
                        )}
                        <ChevronDown className={`w-3.5 h-3.5 text-[#d1a847] transition-transform shrink-0 ${advancedDropdownOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                  </button>

                  {/* Tailored Avancé Popover */}
                  {advancedDropdownOpen && (
                    <div className="absolute top-full mt-2 left-0 rtl:left-auto rtl:right-0 w-72 bg-[#081528] border border-[#d1a847]/40 rounded-xl shadow-2xl p-4 z-50 text-slate-100 space-y-3.5 backdrop-blur-md">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-700">
                        <span className="text-xs font-bold text-[#fceda2]">
                          {activeSearchTab === 'flights' ? 'Options de Vol' :
                           activeSearchTab === 'visa' ? 'Options de Visa' :
                           activeSearchTab === 'insurance' ? 'Formule d\'Assurance' :
                           'Voyageurs & Chambres'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAdvancedDropdownOpen(false)}
                          className="text-slate-400 hover:text-white text-xs cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Flight Specific: Class Selection */}
                      {activeSearchTab === 'flights' && (
                        <div className="space-y-1.5 pb-2 border-b border-slate-800">
                          <label className="text-[11px] font-semibold text-slate-300">Classe de voyage :</label>
                          <div className="grid grid-cols-3 gap-1">
                            {[
                              { id: 'economy', label: 'Économique' },
                              { id: 'business', label: 'Affaires' },
                              { id: 'first', label: '1ère' }
                            ].map((cls) => (
                              <button
                                key={cls.id}
                                type="button"
                                onClick={() => setFlightClass(cls.id as any)}
                                className={`px-2 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                                  flightClass === cls.id
                                    ? 'bg-[#d1a847] text-[#0b1d3a] font-bold'
                                    : 'bg-[#0b1d3a] text-slate-300 hover:bg-[#13284c]'
                                }`}
                              >
                                {cls.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Visa Specific: Type of Visa */}
                      {activeSearchTab === 'visa' && (
                        <div className="space-y-1.5 pb-2 border-b border-slate-800">
                          <label className="text-[11px] font-semibold text-slate-300">Type de visa demandé :</label>
                          <div className="grid grid-cols-2 gap-1.5">
                            {['Tourisme', 'Affaires', 'Études', 'Visite'].map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setVisaType(type)}
                                className={`px-2 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                                  visaType === type
                                    ? 'bg-[#d1a847] text-[#0b1d3a] font-bold'
                                    : 'bg-[#0b1d3a] text-slate-300 hover:bg-[#13284c]'
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Insurance Specific: Formula Selection */}
                      {activeSearchTab === 'insurance' && (
                        <div className="space-y-1.5 pb-2 border-b border-slate-800">
                          <label className="text-[11px] font-semibold text-slate-300">Formule de couverture :</label>
                          <div className="space-y-1">
                            {[
                              'Individuel (Schengen & Monde)',
                              'Famille Multirisque',
                              'Annulation & Rapatriement'
                            ].map((plan) => (
                              <button
                                key={plan}
                                type="button"
                                onClick={() => setInsurancePlan(plan)}
                                className={`w-full text-left px-2.5 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                                  insurancePlan === plan
                                    ? 'bg-[#d1a847] text-[#0b1d3a] font-bold'
                                    : 'bg-[#0b1d3a] text-slate-300 hover:bg-[#13284c]'
                                }`}
                              >
                                {plan}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Adults / Persons Counter */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs font-semibold">
                            {activeSearchTab === 'visa' ? 'Demandeurs' : activeSearchTab === 'insurance' ? 'Assurés' : 'Adultes'}
                          </div>
                          <div className="text-[10px] text-slate-400">18+ ans</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                            className="w-7 h-7 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/30 text-white font-bold hover:bg-[#13284c] flex items-center justify-center cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-5 text-center text-xs font-bold">{adultsCount}</span>
                          <button
                            type="button"
                            onClick={() => setAdultsCount(adultsCount + 1)}
                            className="w-7 h-7 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/30 text-white font-bold hover:bg-[#13284c] flex items-center justify-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Children (for tours, hotel, flights, circuits) */}
                      {activeSearchTab !== 'visa' && activeSearchTab !== 'insurance' && (
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs font-semibold">Enfants</div>
                            <div className="text-[10px] text-slate-400">0-17 ans</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                              className="w-7 h-7 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/30 text-white font-bold hover:bg-[#13284c] flex items-center justify-center cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-5 text-center text-xs font-bold">{childrenCount}</span>
                            <button
                              type="button"
                              onClick={() => setChildrenCount(childrenCount + 1)}
                              className="w-7 h-7 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/30 text-white font-bold hover:bg-[#13284c] flex items-center justify-center cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Rooms (for hotel) */}
                      {activeSearchTab === 'hotel' && (
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                          <div>
                            <div className="text-xs font-semibold">Chambres</div>
                            <div className="text-[10px] text-slate-400">Hôtel / Suites</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setRoomsCount(Math.max(1, roomsCount - 1))}
                              className="w-7 h-7 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/30 text-white font-bold hover:bg-[#13284c] flex items-center justify-center cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-5 text-center text-xs font-bold">{roomsCount}</span>
                            <button
                              type="button"
                              onClick={() => setRoomsCount(roomsCount + 1)}
                              className="w-7 h-7 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/30 text-white font-bold hover:bg-[#13284c] flex items-center justify-center cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 4. Action Button: Dynamic per service */}
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm tracking-wider uppercase text-[#0b1d3a] btn-gold-luxury flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Search className="w-4 h-4 text-[#0b1d3a] shrink-0" />
                    <span className="truncate">{currentTabConfig.actionLabel[lang] || currentTabConfig.actionLabel.fr}</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Search Results Drawer / Confirmation */}
            {searchResults?.visible && (
              <div id="search-results" className="mt-4 p-4 rounded-2xl bg-[#081528] border border-[#d1a847]/50 shadow-2xl animate-fade-in-up">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#d1a847]/20">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span className="font-bold text-sm text-[#fceda2]">
                      {searchResults.serviceLabel} Disponibles :
                    </span>
                    <span className="text-xs text-white bg-[#0b1d3a] px-2.5 py-1 rounded-md border border-[#d1a847]/30">
                      {searchResults.destination}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300">
                    {searchResults.dates} • {searchResults.options}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-slate-300">
                    {lang === 'ar'
                      ? 'لدينا عروض وخصومات ممتازة مطابقة لطلبك. تواصل معنا فوراً للحصول على أفضل سعر متاح.'
                      : 'Nos conseillers ont préparé des options premium exclusives pour votre demande. Contactez-nous immédiatement pour bloquer votre tarif.'}
                  </p>
                  <div className="flex items-center gap-2">
                    <a
                      href={searchResults.whatsappUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all cursor-pointer"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp Devis Immédiat</span>
                    </a>
                    <a
                      href="tel:0666484815"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-[#0b1d3a] btn-gold-luxury shadow-md transition-all cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#0b1d3a]" />
                      <span>0666-484815</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSearchResults(null)}
                      className="px-2.5 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4 hero-reveal-4">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE_INTERNATIONAL}`}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-[#0b1d3a] btn-gold-luxury shadow-xl cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>{t.consultation.whatsappCta}</span>
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('services');
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-200 btn-outline-gold cursor-pointer"
            >
              <span>{t.nav.services}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </a>
          </div>
        </div>

        {/* Floating Bottom-Left Language Switcher (Exact match to screenshot: 🇫🇷 FR ▴ in Dark Navy & Gold) */}
        <div className={`fixed bottom-6 z-40 ${isRtl ? 'right-6' : 'left-6'}`}>
          <div className="relative">
            <button
              onClick={() => setFloatingLangOpen(!floatingLangOpen)}
              className="bg-[#0b1d3a]/95 text-white border border-[#d1a847]/40 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-[#d1a847] px-3.5 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all hover:scale-105 cursor-pointer backdrop-blur-md"
              aria-label="Sélectionner la langue"
            >
              <span className="text-base">{LANGUAGES.find(l => l.code === lang)?.flag}</span>
              <span className="tracking-wide uppercase">{LANGUAGES.find(l => l.code === lang)?.label}</span>
              <ChevronUp className={`w-3.5 h-3.5 text-[#d1a847] transition-transform ${floatingLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Language Selection Popup */}
            {floatingLangOpen && (
              <div className="absolute bottom-full mb-2 left-0 rtl:left-auto rtl:right-0 w-44 bg-[#0b1d3a] border border-[#d1a847]/40 rounded-xl shadow-2xl p-1.5 space-y-1 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 text-slate-200 backdrop-blur-md">
                {LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLang(item.code);
                      setFloatingLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      lang === item.code
                        ? 'bg-[#d1a847] text-[#0b1d3a] font-bold'
                        : 'text-slate-300 hover:bg-[#13284c] hover:text-[#fceda2]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.flag}</span>
                      <span>{item.name}</span>
                    </div>
                    {lang === item.code && <CheckCircle2 className="w-3.5 h-3.5 text-[#0b1d3a]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Luxury Section Transition Separator */}
      <SectionSeparator />

      {/* Services Section: Clean Premium Cards WITHOUT Descriptions, Highlights, or Destination Text */}
      <section id="services" className="py-20 md:py-28 bg-[#0b1d3a] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-init reveal-up">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {t.services.title}
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d1a847] to-transparent mx-auto" />
          </div>

          {/* Clean Service Cards Grid: 5 Core Services styled with 3D Pop & Luxury Scroll Reveal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-1200 preserve-3d">
            {t.services.items.map((service, index) => {
              const IconComponent = SERVICE_ICONS[service.id] || Compass;
              const staggerClass = `stagger-${Math.min(index + 1, 6)}`;

              return (
                <div
                  key={service.id}
                  style={{
                    transform: `perspective(1000px) rotateX(${scrollTilt * 0.5}deg)`
                  }}
                  className={`service-card-luxury reveal-init reveal-up ${staggerClass} bg-[#081528] border border-[#d1a847]/30 hover:border-[#d1a847] rounded-xl p-8 relative flex flex-col justify-between group min-h-[220px]`}
                >
                  <div>
                    {/* Top Bar with Number & Luxury Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="service-icon-box w-14 h-14 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/40 flex items-center justify-center group-hover:border-[#d1a847] group-hover:shadow-[0_0_15px_rgba(209,168,71,0.3)] transition-all duration-300">
                        <IconComponent className="w-7 h-7 text-[#d1a847] transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="font-serif-luxury text-2xl font-bold text-[#d1a847]/40 group-hover:text-[#d1a847] transition-colors">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Service Title */}
                    <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white group-hover:text-[#fceda2] transition-colors mb-2">
                      {service.name}
                    </h3>
                  </div>

                  {/* Card Bottom CTA Actions */}
                  <div className="pt-6 border-t border-[#d1a847]/15 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleServiceSelectForInquiry(service.name)}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d1a847] hover:text-[#fceda2] transition-colors cursor-pointer group/btn"
                    >
                      <span>{t.services.inquireNow}</span>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 ${isRtl ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
                    </button>

                    <a
                      href={`https://wa.me/${WHATSAPP_PHONE_INTERNATIONAL}?text=${encodeURIComponent(`Hello Golden Group Travels, I am inquiring about ${service.name}.`)}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}

            {/* 6th Card: Direct Personalized Assistance */}
            <div className="service-card-luxury reveal-init reveal-up stagger-6 bg-gradient-to-br from-[#0f264c] via-[#0b1d3a] to-[#081528] border border-[#d1a847]/50 rounded-xl p-8 flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="service-icon-box w-14 h-14 rounded-xl bg-[#d1a847]/20 border border-[#d1a847] flex items-center justify-center">
                    <Headphones className="w-7 h-7 text-[#fceda2]" />
                  </div>
                  <span className="font-serif-luxury text-2xl font-bold text-[#d1a847]/40">
                    VIP
                  </span>
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-2">
                  {t.services.customCardTitle}
                </h3>
              </div>

              <div className="pt-6 border-t border-[#d1a847]/20">
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE_INTERNATIONAL}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-gold-luxury w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider text-[#0b1d3a] shadow-md transition-all hover:scale-[1.02]"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-[#0b1d3a]" />
                  <span>WhatsApp Booking</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Section Transition Separator */}
      <SectionSeparator />

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-20 md:py-28 bg-[#081528] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-init reveal-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d1a847]/30 bg-[#0b1d3a] text-xs font-semibold uppercase tracking-widest text-[#fceda2] mb-3">
              <Award className="w-3.5 h-3.5 text-[#d1a847]" />
              <span>{t.whyUs.eyebrow}</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {t.whyUs.title}
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d1a847] to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.whyUs.pillars.map((pillar, idx) => {
              const PillarIcons = [Compass, FileCheck2, Headphones, ShieldCheck];
              const IconComp = PillarIcons[idx % PillarIcons.length];
              const staggerClass = `stagger-${idx + 1}`;

              return (
                <div
                  key={idx}
                  className={`service-card-luxury reveal-init reveal-up ${staggerClass} bg-[#0b1d3a] border border-[#d1a847]/25 rounded-xl p-6 relative group hover:border-[#d1a847] transition-all`}
                >
                  <div className="service-icon-box w-12 h-12 rounded-lg bg-[#081528] border border-[#d1a847]/40 flex items-center justify-center mb-5 text-[#d1a847]">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-luxury text-xl font-bold text-white mb-2 group-hover:text-[#fceda2] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Luxury Section Transition Separator */}
      <SectionSeparator />

      {/* Interactive Consultation / Booking Form Section (DISPATCHES DIRECTLY TO WHATSAPP 0666-484815) */}
      <section id="consultation" className="py-20 md:py-28 bg-[#0b1d3a] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 reveal-init reveal-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/40 bg-emerald-950/40 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Direct Booking</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {t.consultation.title}
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d1a847] to-transparent mx-auto mb-5" />
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.consultation.subtitle}
            </p>
          </div>

          <div className="reveal-init reveal-scale bg-[#081528] border border-[#d1a847]/40 rounded-2xl p-6 sm:p-10 shadow-[0_15px_50px_rgba(2,6,12,0.8)]">
            {submitted ? (
              <div className="text-center py-8 space-y-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                  <WhatsAppIcon className="w-8 h-8 fill-current" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif-luxury text-3xl font-bold text-white">
                    {t.consultation.successTitle}
                  </h3>
                  <p className="text-slate-300 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                    {isRtl
                      ? `تم تجهيز طلبك وسيتم إرساله مباشرة إلى رقم الواتساب الخاص بالوكالة`
                      : lang === 'fr'
                      ? `Vos informations sont prêtes à être envoyées directement sur le WhatsApp de l’agence.`
                      : lang === 'es'
                      ? `Su solicitud está lista para ser enviada directamente al WhatsApp de la agencia.`
                      : `Your booking details have been prepared for direct delivery to WhatsApp.`}
                  </p>
                </div>

                {/* Prepared Booking Summary Card */}
                <div className="p-5 bg-[#0b1d3a] rounded-xl border border-[#d1a847]/30 max-w-lg mx-auto text-xs text-slate-300 space-y-2 text-left rtl:text-right">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">{lang === 'ar' ? 'الخدمة' : 'Service'}:</span>
                    <span className="font-semibold text-[#fceda2]">{formService}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">{lang === 'ar' ? 'العميل' : 'Client'}:</span>
                    <span className="font-semibold text-white">{fullName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">{lang === 'ar' ? 'الهاتف' : 'Phone'}:</span>
                    <span className="font-semibold text-white" dir="ltr">{phone}</span>
                  </div>
                  {isFlightBooking && destination && (
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">{lang === 'ar' ? 'الوجهة' : 'Destination'}:</span>
                      <span className="font-semibold text-white">{destination}</span>
                    </div>
                  )}
                  {travelDate && (
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">{lang === 'ar' ? 'تاريخ السفر' : 'Date'}:</span>
                      <span className="font-semibold text-white">{travelDate}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1 text-[11px] text-slate-400">
                    <span>{t.consultation.successRef}:</span>
                    <span className="font-mono text-[#d1a847]" dir="ltr">GGT-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                </div>

                {/* Primary WhatsApp Action Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:scale-[1.02]"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>{t.consultation.whatsappCta}</span>
                  </a>

                  <a
                    href="tel:0666484815"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#fceda2] border border-[#d1a847]/60 hover:bg-[#0b1d3a] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#d1a847]" />
                    <span>{lang === 'ar' ? 'اتصال' : lang === 'fr' ? 'Appeler' : lang === 'es' ? 'Llamar' : 'Call'}</span>
                  </a>
                </div>

                <div className="pt-4">
                  <button
                    onClick={resetForm}
                    className="text-xs text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer"
                  >
                    {t.consultation.submitAnother}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConsultationSubmit} className="space-y-6">
                {/* Anti-bot Honeypot field (hidden from legitimate users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="hp_website">Website</label>
                  <input
                    id="hp_website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Service Selector Tabs */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#d1a847] mb-2">
                    {t.consultation.selectService}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                    {t.services.items.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setFormService(s.name)}
                        className={`px-3 py-2.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                          formService === s.name
                            ? 'bg-[#d1a847] text-[#0b1d3a] border-[#fceda2] font-bold shadow-[0_0_12px_rgba(209,168,71,0.4)]'
                            : 'bg-[#0b1d3a] text-slate-300 border-[#d1a847]/20 hover:border-[#d1a847]/60 hover:text-white'
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      {t.consultation.fullName}
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alexander Vance"
                      className="w-full bg-[#0b1d3a] border border-[#d1a847]/30 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#d1a847]"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      {t.consultation.phone}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0666-484815"
                      dir="ltr"
                      className="w-full bg-[#0b1d3a] border border-[#d1a847]/30 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#d1a847]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      {t.consultation.email}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      dir="ltr"
                      className="w-full bg-[#0b1d3a] border border-[#d1a847]/30 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#d1a847]"
                    />
                  </div>

                  {/* Destination / Country (ONLY rendered for Flight Bookings) */}
                  {isFlightBooking && (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        {t.consultation.destination}
                      </label>
                      <input
                        type="text"
                        required={isFlightBooking}
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="e.g. Geneva, London, Dubai, Jeddah"
                        className="w-full bg-[#0b1d3a] border border-[#d1a847]/30 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#d1a847]"
                      />
                    </div>
                  )}

                  {/* Travel Date */}
                  <div className={!isFlightBooking ? '' : ''}>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      {t.consultation.travelDate}
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full bg-[#0b1d3a] border border-[#d1a847]/30 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#d1a847] [color-scheme:dark]"
                    />
                  </div>

                  {/* Travelers Count */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      {t.consultation.travelers}
                    </label>
                    <select
                      value={travelersCount}
                      onChange={(e) => setTravelersCount(e.target.value)}
                      className="w-full bg-[#0b1d3a] border border-[#d1a847]/30 text-white text-sm rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-[#d1a847] appearance-none"
                    >
                      <option value="1">{t.hero.paxSolo}</option>
                      <option value="2">{t.hero.paxCouple}</option>
                      <option value="3-5">{t.hero.paxFamily}</option>
                      <option value="6+">{t.hero.paxGroup}</option>
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    {t.consultation.notes}
                  </label>
                  <textarea
                    rows={3}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder={t.consultation.notesPlaceholder}
                    className="w-full bg-[#0b1d3a] border border-[#d1a847]/30 text-white text-sm rounded-lg p-3.5 focus:outline-none focus:border-[#d1a847]"
                  />
                </div>

                {/* Submit to WhatsApp Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full py-4 px-6 rounded-lg text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 shadow-[0_4px_25px_rgba(16,185,129,0.35)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    {formLoading ? (
                      <span>{t.consultation.submitting}</span>
                    ) : (
                      <>
                        <WhatsAppIcon className="w-5 h-5 fill-current" />
                        <span>{t.consultation.submit}</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-3">
                    {t.consultation.privacyNote}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Luxury Section Transition Separator */}
      <SectionSeparator />

      {/* Frequently Asked Questions Section */}
      <section id="faq" className="py-20 md:py-24 bg-[#081528] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 reveal-init reveal-up">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mb-3">
              {t.faq.title}
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d1a847] to-transparent mx-auto" />
          </div>

          <div className="space-y-4">
            {t.faq.items.map((item, index) => {
              const isOpen = activeFaq === index;
              const staggerClass = `stagger-${(index % 5) + 1}`;
              return (
                <div
                  key={index}
                  className={`reveal-init reveal-up ${staggerClass} bg-[#0b1d3a] border border-[#d1a847]/25 hover:border-[#d1a847]/50 rounded-xl overflow-hidden transition-all duration-300`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left rtl:text-right p-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer group"
                  >
                    <span className="font-medium text-white text-sm sm:text-base group-hover:text-[#fceda2] transition-colors">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#d1a847] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#d1a847]/10 animate-in fade-in duration-200">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Action Button */}
      <aside
        aria-label="Direct WhatsApp contact"
        className={`fixed bottom-6 z-40 ${isRtl ? 'left-6' : 'right-6'}`}
      >
        <a
          href={`https://wa.me/${WHATSAPP_PHONE_INTERNATIONAL}`}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_6px_25px_rgba(16,185,129,0.5)] transition-all hover:scale-110 active:scale-95 group"
          aria-label="Contact Golden Group Travels on WhatsApp at 0666-484815"
          title="WhatsApp: 0666-484815"
        >
          <WhatsAppIcon className="w-6 h-6 fill-current transition-transform group-hover:scale-110" />
        </a>
      </aside>

      {/* Footer Section: Prominently displays business details and phone number 0666-484815 */}
      <footer id="contact" className="bg-[#050e1a] border-t border-[#d1a847]/30 text-slate-300 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
            {/* Brand Column */}
            <div className="space-y-4">
              <a href="#" className="inline-block focus:outline-none">
                <GoldenLogo className="h-18 sm:h-22 md:h-24" lang={lang} />
              </a>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.footer.desc}
              </p>
              {/* Social Media Links */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE_INTERNATIONAL}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Golden Group Travels WhatsApp"
                  className="w-9 h-9 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/30 flex items-center justify-center text-emerald-400 hover:border-emerald-400 transition-all hover:scale-105"
                  title="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                </a>
                <a
                  href="https://www.instagram.com/goldengrouptravels/?utm_source=ig_web_button_share_sheet"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Golden Group Travels Instagram"
                  className="w-9 h-9 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/30 flex items-center justify-center text-slate-300 hover:text-[#d1a847] hover:border-[#d1a847] transition-all hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61596136568520"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Golden Group Travels Facebook"
                  className="w-9 h-9 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/30 flex items-center justify-center text-slate-300 hover:text-[#d1a847] hover:border-[#d1a847] transition-all hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.69 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Services Links */}
            <div>
              <div className="font-serif-luxury text-lg font-bold text-white mb-4">
                {t.footer.servicesTitle}
              </div>
              <ul className="space-y-2.5 text-xs">
                {t.services.items.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => handleServiceSelectForInquiry(s.name)}
                      className="hover:text-[#d1a847] transition-colors text-left rtl:text-right cursor-pointer"
                    >
                      {s.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Navigation (Curated itineraries removed) */}
            <div>
              <div className="font-serif-luxury text-lg font-bold text-white mb-4">
                {t.footer.navTitle}
              </div>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#services" className="hover:text-[#d1a847] transition-colors">{t.nav.services}</a></li>
                <li><a href="#why-us" className="hover:text-[#d1a847] transition-colors">{t.nav.whyUs}</a></li>
                <li><a href="#consultation" className="hover:text-[#d1a847] transition-colors">{t.nav.inquiry}</a></li>
                <li><a href="#faq" className="hover:text-[#d1a847] transition-colors">{t.nav.faq}</a></li>
              </ul>
            </div>

            {/* Direct Contact & Operations (NUMBER SHOWN PROMINENTLY HERE AT BOTTOM) */}
            <div className="space-y-4">
              <div className="font-serif-luxury text-lg font-bold text-white mb-4">
                {t.footer.contactTitle}
              </div>
              <div className="space-y-3 text-xs">
                {/* Prominent Direct Phone Number */}
                <a
                  href="tel:0666484815"
                  className="flex items-start gap-2.5 text-white hover:text-[#d1a847] transition-colors group p-2.5 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/30 hover:border-[#d1a847]"
                >
                  <Phone className="w-5 h-5 text-[#d1a847] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-bold text-lg text-[#fceda2] tracking-wider" dir="ltr">{DISPLAY_PHONE}</div>
                    <div className="text-[11px] text-slate-400">{t.footer.deskLabel}</div>
                  </div>
                </a>

                {/* WhatsApp Direct Line */}
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE_INTERNATIONAL}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-start gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors group p-2.5 rounded-lg bg-[#0b1d3a] border border-emerald-500/30 hover:border-emerald-500"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-current shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-bold text-sm tracking-wider text-white" dir="ltr">{DISPLAY_PHONE}</div>
                    <div className="text-[11px] text-emerald-400/80">WhatsApp Direct Line</div>
                  </div>
                </a>

                {/* Official Email */}
                <div className="pt-2 border-t border-slate-800 space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {lang === 'ar' ? 'البريد الإلكتروني الرسمي' : 'Email Officiel'}
                  </div>
                  <a
                    href="mailto:Info@goldengrouptravels.com"
                    className="flex items-center gap-2 text-xs text-slate-200 hover:text-[#d1a847] transition-colors p-2 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/20"
                  >
                    <Mail className="w-4 h-4 text-[#d1a847] shrink-0" />
                    <span className="font-mono text-xs truncate">Info@goldengrouptravels.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Strip - ONLY BRAND COPYRIGHT (Privacy, Terms, Ticketing removed for now as requested) */}
          <div className="pt-8 border-t border-[#d1a847]/15 flex items-center justify-center text-xs text-slate-400">
            <div>
              &copy; {new Date().getFullYear()} <strong className="text-slate-200">{isRtl ? 'جولدن جروب ترافيلز' : 'Golden Group Travels'}</strong>. {t.footer.copyright}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
