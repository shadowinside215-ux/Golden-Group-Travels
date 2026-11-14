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
  Menu,
  X,
  Award,
  Headphones,
  Mail
} from 'lucide-react';
import { translations, Language } from './translations.ts';
import { GoldenGlobe3DShowcase, AmbientSpaceField3D } from './components/LuxuryTravel3D.tsx';
import { Tilt3DCard } from './components/Tilt3DCard.tsx';

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
  <div className="flex items-center group min-w-0 perspective-1000">
    <img
      src="/assets/aistudio/Golden_Group_Travel_Logo__1__824306ae.png"
      alt="Golden Group - Travel Services & Events"
      className={`${className} w-auto shrink-0 object-contain rounded-xl shadow-lg border border-[#d1a847]/30 transition-all duration-300 group-hover:scale-105 group-hover:border-[#d1a847] group-hover:[transform:perspective(700px)_rotateY(6deg)_translateZ(8px)]`}
    />
  </div>
);

// Minimal, elegant 3D initial loading screen with orbiting golden armillary rings
const BrandLoader = ({ onComplete }: { onComplete: () => void; lang?: Language }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      const removeTimer = setTimeout(() => {
        onComplete();
      }, 550);
      return () => clearTimeout(removeTimer);
    }, 1150);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#030d1c] transition-opacity duration-500 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center text-center p-6 space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="relative flex items-center justify-center perspective-1000 preserve-3d w-56 h-56">
          {/* 3D Orbiting Armillary Rings */}
          <div
            aria-hidden="true"
            className="absolute inset-2 rounded-full border border-[#d1a847]/55 shadow-[0_0_25px_rgba(209,168,71,0.3)] animate-loader-orbit pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-[#fceda2]/35 animate-loader-orbit-reverse pointer-events-none"
          />
          <img
            src="/assets/aistudio/Golden_Group_Travel_Logo__1__824306ae.png"
            alt="Golden Group Travels"
            className="relative z-10 h-28 sm:h-32 w-auto object-contain rounded-2xl shadow-[0_0_40px_rgba(209,168,71,0.45)] border border-[#d1a847]/45 animate-loader-crest-3d"
          />
        </div>
        {/* Subtle Gold Shimmer Progress Bar */}
        <div className="w-48 sm:w-56 h-1 rounded-full bg-[#081528] overflow-hidden border border-[#d1a847]/25 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fceda2] to-transparent animate-shimmer-beam" />
        </div>
      </div>
    </div>
  );
};

// Luxury 3D Animated Section Separator with rotating faceted diamond
const SectionSeparator = ({ className = 'my-5 sm:my-6' }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-3 ${className} reveal-init reveal-scale perspective-1000`}>
    <div className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent via-[#d1a847]/50 to-[#d1a847]" />
    <div className="w-2.5 h-2.5 border border-[#fceda2] bg-[#d1a847]/55 shadow-[0_0_12px_rgba(209,168,71,0.75)] animate-diamond-3d" />
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

  // Smooth Scroll Tracking & 3D Hero/Scroll Physics
  const [scrollY, setScrollY] = useState(0);
  const [scrollTilt, setScrollTilt] = useState(0);
  const heroBgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let tiltTimeout: ReturnType<typeof setTimeout> | undefined;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
      setScrollY(currentScrollY);

      // Dynamic 3D tilt responsive to scroll velocity (smooth ease between -4deg and +4deg)
      const calculatedTilt = Math.max(-4, Math.min(4, delta * 0.09));
      setScrollTilt(calculatedTilt);

      if (tiltTimeout) clearTimeout(tiltTimeout);
      tiltTimeout = setTimeout(() => {
        setScrollTilt(0);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (tiltTimeout) clearTimeout(tiltTimeout);
    };
  }, []);

  // Gentle damped 3D mouse + scroll parallax on the clear Kaaba Hero image
  useEffect(() => {
    const rm = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (rm) return;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let rafId = 0;

    const update = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      if (heroBgRef.current) {
        const scrollShift = Math.min(window.scrollY * 0.08, 42);
        heroBgRef.current.style.transform = `perspective(1200px) translate3d(${curX.toFixed(2)}px, ${(curY + scrollShift).toFixed(2)}px, 0) scale(1.06)`;
      }
      rafId = requestAnimationFrame(update);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const nx = e.clientX / Math.max(window.innerWidth, 1) - 0.5;
      const ny = e.clientY / Math.max(window.innerHeight, 1) - 0.5;
      targetX = -nx * 14;
      targetY = -ny * 10;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (rafId) cancelAnimationFrame(rafId);
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
      <header className="sticky top-0 z-40 bg-[#021939]/98 text-slate-100 shadow-lg border-b border-[#d1a847]/30">
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
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('services');
              }}
              className="nav-link-gold hover:text-[#d1a847] transition-colors cursor-pointer"
            >
              {t.nav.hajOmra}
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('services');
              }}
              className="nav-link-gold hover:text-[#d1a847] transition-colors cursor-pointer"
            >
              {t.nav.voyageOrganise}
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('services');
              }}
              className="nav-link-gold hover:text-[#d1a847] transition-colors cursor-pointer"
            >
              {t.nav.circuitsMaroc}
            </a>

            {/* Services Dropdown with 3D unfold */}
            <div className="relative group perspective-1000">
              <button
                type="button"
                onClick={() => scrollToSection('services')}
                className="nav-link-gold flex items-center gap-1 hover:text-[#d1a847] transition-colors py-2 uppercase cursor-pointer"
              >
                <span>{t.nav.services}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#d1a847] transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-[#0b1d3a] border border-[#d1a847]/40 rounded-lg shadow-2xl py-2 opacity-0 invisible origin-top [transform:perspective(800px)_rotateX(-14deg)_translateY(-6px)] group-hover:opacity-100 group-hover:visible group-hover:[transform:perspective(800px)_rotateX(0deg)_translateY(0)] transition-all duration-250 z-50 normal-case font-normal">
                {SEARCH_TABS.map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        handleServiceSelectForInquiry(tab.label[lang] || tab.label.fr);
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
                  scrollToSection('services');
                }}
                className="py-1 text-slate-200 hover:text-[#d1a847] transition-colors text-left rtl:text-right cursor-pointer"
              >
                {t.nav.hajOmra}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('services');
                }}
                className="py-1 text-slate-200 hover:text-[#d1a847] transition-colors text-left rtl:text-right cursor-pointer"
              >
                {t.nav.voyageOrganise}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToSection('services');
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

      {/* Hero Section: Full, Clear Kaaba Golden Door Hero Image with silky 3D Parallax */}
      <section className="relative overflow-hidden min-h-[500px] md:min-h-[580px] flex flex-col justify-end items-center pb-10 sm:pb-14 pt-20">
        {/* Background Atmosphere: Hands at the Kaaba's Golden Door Hero Image (Clear, full coverage, ZERO dark overlay) */}
        <div
          ref={heroBgRef}
          className="absolute inset-0 pointer-events-none overflow-hidden select-none will-change-transform scale-[1.06]"
        >
          <img
            src="/assets/aistudio/Hands_at_the_Kaaba_s_Golden_Door_e35c1ffa.png"
            alt="Hands at the Kaaba's Golden Door"
            className="w-full h-full object-cover object-[center_35%]"
          />
        </div>

        {/* Quick 3D Floating Action Buttons */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-end text-center w-full">
          <div className="flex flex-wrap items-center justify-center gap-4 hero-reveal-4 perspective-1000 preserve-3d">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE_INTERNATIONAL}`}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-3d-hero inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-[#0b1d3a] btn-gold-luxury shadow-xl cursor-pointer"
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
              className="btn-3d-hero inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-200 btn-outline-gold cursor-pointer"
            >
              <span>{t.nav.services}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </a>
          </div>
        </div>

        {/* Floating Bottom-Left Language Switcher (Exact match: 🇫🇷 FR ▴ in Dark Navy & Gold, no backdrop-blur) */}
        <div className={`fixed bottom-6 z-40 ${isRtl ? 'right-6' : 'left-6'}`}>
          <div className="relative">
            <button
              onClick={() => setFloatingLangOpen(!floatingLangOpen)}
              className="bg-[#0b1d3a]/95 text-white border border-[#d1a847]/40 shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:border-[#d1a847] px-3.5 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-all hover:scale-105 cursor-pointer"
              aria-label="Sélectionner la langue"
            >
              <span className="text-base">{LANGUAGES.find(l => l.code === lang)?.flag}</span>
              <span className="tracking-wide uppercase">{LANGUAGES.find(l => l.code === lang)?.label}</span>
              <ChevronUp className={`w-3.5 h-3.5 text-[#d1a847] transition-transform ${floatingLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Language Selection Popup */}
            {floatingLangOpen && (
              <div className="absolute bottom-full mb-2 left-0 rtl:left-auto rtl:right-0 w-44 bg-[#0b1d3a] border border-[#d1a847]/40 rounded-xl shadow-2xl p-1.5 space-y-1 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 text-slate-200">
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

      {/* Interactive 3D Golden Armillary Travel Globe & Flight Routes */}
      <GoldenGlobe3DShowcase
        lang={lang}
        scrollTilt={scrollTilt}
        onSelectDestination={(destName) => {
          setDestination(destName);
          handleServiceSelectForInquiry(t.services.items[0].name);
        }}
      />

      {/* Ambient 3D Spatial Crystal Field Wrapper for Core Sections */}
      <div className="relative overflow-hidden">
        <AmbientSpaceField3D scrollY={scrollY} />

      {/* Luxury Section Transition Separator */}
      <SectionSeparator />

      {/* Services Section: Clean 3D Spatial Tilt Cards */}
      <section id="services" className="py-20 md:py-28 bg-[#0b1d3a]/75 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-init reveal-up">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {t.services.title}
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d1a847] to-transparent mx-auto" />
          </div>

          {/* Clean Service Cards Grid: 5 Core Services styled with Interactive 3D Tilt & Depth Layers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-1200 preserve-3d">
            {t.services.items.map((service, index) => {
              const IconComponent = SERVICE_ICONS[service.id] || Compass;
              const staggerClass = `stagger-${Math.min(index + 1, 6)}`;

              return (
                <Tilt3DCard
                  key={service.id}
                  maxTilt={9}
                  liftZ={22}
                  scrollTilt={scrollTilt}
                  className={`service-card-luxury reveal-init reveal-up ${staggerClass} bg-[#081528]/95 border border-[#d1a847]/30 hover:border-[#d1a847] rounded-xl p-8 relative flex flex-col justify-between group min-h-[220px] shadow-[0_14px_38px_rgba(2,8,18,0.65)]`}
                >
                  <div className="preserve-3d">
                    {/* Top Bar with Number & Raised 3D Luxury Icon */}
                    <div className="flex items-center justify-between mb-6 depth-z-2">
                      <div className="service-icon-box w-14 h-14 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/40 flex items-center justify-center group-hover:border-[#d1a847] group-hover:shadow-[0_0_15px_rgba(209,168,71,0.3)] transition-all duration-300">
                        <IconComponent className="w-7 h-7 text-[#d1a847] transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="font-serif-luxury text-2xl font-bold text-[#d1a847]/45 group-hover:text-[#fceda2] transition-colors">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Raised 3D Service Title */}
                    <h3 className="depth-z-2 font-serif-luxury text-2xl sm:text-3xl font-bold text-white group-hover:text-[#fceda2] transition-colors mb-2">
                      {service.name}
                    </h3>
                  </div>

                  {/* Card Bottom CTA Actions */}
                  <div className="depth-z-1 pt-6 border-t border-[#d1a847]/15 flex items-center justify-between gap-3">
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
                </Tilt3DCard>
              );
            })}

            {/* 6th Card: Direct Personalized Assistance with 3D Tilt */}
            <Tilt3DCard
              maxTilt={9}
              liftZ={24}
              scrollTilt={scrollTilt}
              className="service-card-luxury reveal-init reveal-up stagger-6 bg-gradient-to-br from-[#0f264c] via-[#0b1d3a] to-[#081528] border border-[#d1a847]/50 rounded-xl p-8 flex flex-col justify-between min-h-[220px] shadow-[0_14px_40px_rgba(2,8,18,0.7)]"
            >
              <div className="preserve-3d">
                <div className="flex items-center justify-between mb-6 depth-z-2">
                  <div className="service-icon-box w-14 h-14 rounded-xl bg-[#d1a847]/20 border border-[#d1a847] flex items-center justify-center">
                    <Headphones className="w-7 h-7 text-[#fceda2]" />
                  </div>
                  <span className="font-serif-luxury text-2xl font-bold text-[#d1a847]/45">
                    VIP
                  </span>
                </div>
                <h3 className="depth-z-2 font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-2">
                  {t.services.customCardTitle}
                </h3>
              </div>

              <div className="depth-z-1 pt-6 border-t border-[#d1a847]/20">
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
            </Tilt3DCard>
          </div>
        </div>
      </section>

      {/* Luxury Section Transition Separator */}
      <SectionSeparator />

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-20 md:py-28 bg-[#081528]/80 relative z-10">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1200 preserve-3d">
            {t.whyUs.pillars.map((pillar, idx) => {
              const PillarIcons = [Compass, FileCheck2, Headphones, ShieldCheck];
              const IconComp = PillarIcons[idx % PillarIcons.length];
              const staggerClass = `stagger-${idx + 1}`;

              return (
                <Tilt3DCard
                  key={idx}
                  maxTilt={10}
                  liftZ={20}
                  scrollTilt={scrollTilt}
                  className={`service-card-luxury reveal-init reveal-up ${staggerClass} bg-[#0b1d3a]/95 border border-[#d1a847]/25 rounded-xl p-6 relative group hover:border-[#d1a847] shadow-[0_12px_32px_rgba(2,8,18,0.65)]`}
                >
                  <div className="depth-z-2 service-icon-box w-12 h-12 rounded-lg bg-[#081528] border border-[#d1a847]/40 flex items-center justify-center mb-5 text-[#d1a847]">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="depth-z-2 font-serif-luxury text-xl font-bold text-white mb-2 group-hover:text-[#fceda2] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="depth-z-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </Tilt3DCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Luxury Section Transition Separator */}
      <SectionSeparator />

      {/* Interactive Consultation / Booking Form Section (DISPATCHES DIRECTLY TO WHATSAPP 0666-484815) */}
      <section id="consultation" className="py-20 md:py-28 bg-[#0b1d3a]/75 relative z-10">
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

          <div
            style={{
              transform: `perspective(1200px) rotateX(${(scrollTilt * 0.35).toFixed(2)}deg)`
            }}
            className="terminal-3d-shell reveal-init reveal-scale bg-[#081528]/95 border border-[#d1a847]/45 rounded-2xl p-6 sm:p-10 shadow-[0_24px_65px_rgba(2,6,12,0.88),0_0_30px_rgba(209,168,71,0.12)]"
          >
            {submitted ? (
              <div className="text-center py-8 space-y-6 animate-3d-flip-in">
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

                {/* Service Selector Tabs with 3D Extruded Depth */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#d1a847] mb-2">
                    {t.consultation.selectService}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 perspective-1000">
                    {t.services.items.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setFormService(s.name)}
                        className={`px-3 py-2.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                          formService === s.name
                            ? 'bg-[#d1a847] text-[#0b1d3a] border-[#fceda2] font-bold pill-3d-active'
                            : 'bg-[#0b1d3a] text-slate-300 border-[#d1a847]/20 hover:border-[#d1a847]/60 hover:text-white pill-3d-idle'
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

      {/* Frequently Asked Questions Section with 3D Unfold Cards */}
      <section id="faq" className="py-20 md:py-24 bg-[#081528]/80 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 reveal-init reveal-up">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mb-3">
              {t.faq.title}
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d1a847] to-transparent mx-auto" />
          </div>

          <div className="space-y-4 perspective-1000">
            {t.faq.items.map((item, index) => {
              const isOpen = activeFaq === index;
              const staggerClass = `stagger-${(index % 5) + 1}`;
              return (
                <div
                  key={index}
                  className={`reveal-init reveal-up ${staggerClass} bg-[#0b1d3a]/95 border border-[#d1a847]/25 hover:border-[#d1a847]/60 rounded-xl overflow-hidden transition-all duration-300 hover:[transform:perspective(900px)_translateZ(10px)] hover:shadow-[0_12px_30px_rgba(2,8,18,0.65)]`}
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
                    <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#d1a847]/15 animate-faq-3d">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      </div>

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
