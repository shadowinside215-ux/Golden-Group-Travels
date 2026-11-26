import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Car,
  Check,
  ExternalLink,
  MapPin,
  Phone,
  PlaneLanding,
  ShieldCheck,
  X
} from 'lucide-react';
import { Language, ServiceId } from '../assets/destinations';
import { SEARCH_ENGINE_PACKS } from '../assets/searchEngineData';
import {
  AIRPORT_TRANSFERS_WIDGETS,
  CAR_RENTALS_PROMO_BANNER,
  CAR_RENTALS_WIDGETS,
  FLIGHTS_OFFERS_WIDGET,
  POPULAR_TOUR_DESTINATIONS,
  SEARCH_CATEGORY_ORDER,
  SEARCH_CATEGORY_TO_SERVICE,
  SearchCategoryId,
  TOURS_AFFILIATE_PARTNERS,
  TOURS_WIDGETS
} from '../config/travelSuppliers';
import { ServiceSelectionEventName, trackServiceSelection } from '../utils/analytics';
import {
  prefersReducedMotion,
  switchTabWithTimeline,
  useReplayable3DPanel,
  useSlidingTabIndicator
} from '../utils/tab3DMotion';
import { AviasalesFlightWidget } from './AviasalesFlightWidget';
import { ExpediaFlightWidget } from './ExpediaFlightWidget';
import { ExpediaSearchWidget } from './ExpediaSearchWidget';
import { IsolatedWidgetFrame } from './IsolatedWidgetFrame';
import { HERO_CATEGORY_ICONS } from './ServiceIcons';
import { ThirdPartyScriptWidget } from './ThirdPartyScriptWidget';

gsap.registerPlugin(ScrollTrigger);

type MobilityTabId = 'car_rentals' | 'airport_transfers';
type FlightEngineTabId = 'aviasales' | 'expedia';

interface TravelSearchEngineProps {
  lang: Language;
  isRtl: boolean;
  activeCategory: SearchCategoryId | null;
  onCategoryChange: (category: SearchCategoryId) => void;
  onClose?: () => void;
  onReturnToServices?: () => void;
  onSelectHeroOrSection?: (category: SearchCategoryId) => void;
  onOpenServicePage?: (serviceId: ServiceId) => void;
  onJumpToPlanner?: () => void;
  whatsappInternational: string;
  displayPhone: string;
  visibleCategories?: SearchCategoryId[];
  embeddedOnServicePage?: boolean;
}

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

interface BookingUiChrome {
  bookingDeskEyebrow: string;
  closeLabel: string;
  backToServicesLabel: string;
  primarySearchLabel: string;
  supplementaryLabel: string;
  secondaryProvidersLabel: string;
  directAdvisorLabel: string;
  umrahHighlights: string[];
  holidayHighlights: string[];
  serviceDescriptions: Record<SearchCategoryId, string>;
}

const BOOKING_UI_CHROME: Record<Language, BookingUiChrome> = {
  fr: {
    bookingDeskEyebrow: 'Espace Réservation · Golden Group Travels',
    closeLabel: 'Fermer',
    backToServicesLabel: 'Retour aux services',
    primarySearchLabel: 'Recherche Principale',
    supplementaryLabel: 'Offres & Sélections Complémentaires',
    secondaryProvidersLabel: 'Autres Comparateurs & Offres Partenaires',
    directAdvisorLabel: 'Accompagnement Agence Salé',
    umrahHighlights: [
      'Hôtels sélectionnés à proximité immédiate du Haram',
      'Gestion complète du visa Omra et transferts VIP',
      'Devis transparent envoyé directement sur WhatsApp'
    ],
    holidayHighlights: [
      'Forfaits sur mesure : vol, hôtel et transferts privés',
      'Programmes adaptés aux familles, couples et groupes',
      'Disponibilités vérifiées en direct par nos conseillers'
    ],
    serviceDescriptions: {
      flights:
        'Comparez les billets d’avion en temps réel et réservez votre itinéraire auprès de nos partenaires officiels.',
      hotels:
        'Recherchez des hôtels et hébergements vérifiés dans le monde entier avec confirmation directe partenaire.',
      umrah:
        'Configurez votre demande Hajj & Omra sur mesure et recevez un accompagnement dédié par notre agence de Salé.',
      holidays:
        'Décrivez votre destination, vos dates et votre budget pour recevoir un séjour entièrement personnalisé.',
      tours:
        'Découvrez les activités, billets coupe-file et circuits guidés de nos partenaires officiels.',
      'car-transfers':
        'Comparez les locations de voitures internationales et locales ou réservez votre transfert aéroport privé.'
    }
  },
  ar: {
    bookingDeskEyebrow: 'مساحة الحجز المباشر · جولدن جروب',
    closeLabel: 'إغلاق',
    backToServicesLabel: 'العودة إلى الخدمات',
    primarySearchLabel: 'البحث الرئيسي',
    supplementaryLabel: 'عروض واختيارات تكميلية',
    secondaryProvidersLabel: 'خيارات وعروض شركاء إضافية',
    directAdvisorLabel: 'مرافقة وكالة جولدن جروب · سلا',
    umrahHighlights: [
      'فنادق مختارة بالقرب المباشر من المسجد الحرام',
      'إجراءات متكاملة لتأشيرة العمرة والتنقلات الخاصة',
      'عرض سعر واضح ومفصّل يُرسل مباشرة عبر واتساب'
    ],
    holidayHighlights: [
      'باقات مخصصة تشمل الطيران والفندق والتنقلات',
      'برامج مصممة للعائلات والأزواج والمجموعات',
      'تأكيد فوري للتوافر والأسعار عبر مستشارينا'
    ],
    serviceDescriptions: {
      flights: 'قارن تذاكر الطيران مباشرة واحجز رحلتك عبر شركائنا الرسميين.',
      hotels: 'ابحث عن الفنادق والإقامات الموثوقة حول العالم مع تأكيد مباشر من الشريك.',
      umrah: 'صمّم طلب الحج والعمرة الخاص بك واستفد من مرافقة مباشرة من وكالتنا بسلا.',
      holidays: 'حدد وجهتك وتواريخك وميزانيتك للحصول على برنامج عطلة مفصّل حسب رغبتك.',
      tours: 'استكشف الجولات السياحية والتذاكر والأنشطة عبر شركائنا المعتمدين.',
      'car-transfers': 'قارن عروض تأجير السيارات أو احجز خدمة التوصيل الخاص من وإلى المطار.'
    }
  },
  en: {
    bookingDeskEyebrow: 'Booking Desk · Golden Group Travels',
    closeLabel: 'Close',
    backToServicesLabel: 'Back to Services',
    primarySearchLabel: 'Primary Search',
    supplementaryLabel: 'Supplementary Offers & Curated Picks',
    secondaryProvidersLabel: 'Additional Partner Options & Offers',
    directAdvisorLabel: 'Salé Agency Direct Desk',
    umrahHighlights: [
      'Selected 4★ & 5★ stays near Masjid al-Haram',
      'Complete Umrah visa handling & private transfers',
      'Transparent custom quote sent directly on WhatsApp'
    ],
    holidayHighlights: [
      'Tailored Flight + Hotel + Private Transfer packages',
      'Flexible itineraries for families, couples & groups',
      'Real availability verified directly by our advisors'
    ],
    serviceDescriptions: {
      flights:
        'Search live airline fares and compare international routes directly through our official flight partners.',
      hotels:
        'Browse verified hotels and stays worldwide with live availability via our official booking partner.',
      umrah:
        'Share your Hajj & Omra travel details for a transparent, tailored quote from our Salé agency.',
      holidays:
        'Tell us your destination, dates, and preferences to receive a bespoke holiday package quote.',
      tours:
        'Explore curated excursions, skip-the-line tickets, and guided activities from our partners.',
      'car-transfers':
        'Compare global and local car rental fleets or reserve a private door-to-door airport transfer.'
    }
  },
  es: {
    bookingDeskEyebrow: 'Espacio de Reserva · Golden Group Travels',
    closeLabel: 'Cerrar',
    backToServicesLabel: 'Volver a servicios',
    primarySearchLabel: 'Buscador Principal',
    supplementaryLabel: 'Ofertas y Selecciones Complementarias',
    secondaryProvidersLabel: 'Otros Buscadores y Ofertas de Socios',
    directAdvisorLabel: 'Asesoría Agencia Salé',
    umrahHighlights: [
      'Hoteles seleccionados junto a Masjid al-Haram',
      'Gestión integral de visado Omra y traslados privados',
      'Presupuesto claro enviado directamente por WhatsApp'
    ],
    holidayHighlights: [
      'Paquetes a medida: vuelo, hotel y traslados privados',
      'Itinerarios para familias, parejas y grupos',
      'Disponibilidad real verificada por nuestros asesores'
    ],
    serviceDescriptions: {
      flights:
        'Compara tarifas aéreas en tiempo real y reserva tu vuelo a través de nuestros socios oficiales.',
      hotels:
        'Busca hoteles y alojamientos verificados en todo el mundo con disponibilidad en directo.',
      umrah:
        'Prepara tu solicitud de Hajj & Omra a medida con asesoramiento directo de nuestra agencia en Salé.',
      holidays:
        'Indícanos destino, fechas y presupuesto para recibir un paquete vacacional personalizado.',
      tours:
        'Descubre excursiones, entradas prioritarias y circuitos guiados con nuestros socios.',
      'car-transfers':
        'Compara coches de alquiler o reserva tu traslado privado desde y hacia el aeropuerto.'
    }
  }
};

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
  onClose,
  onReturnToServices,
  onSelectHeroOrSection,
  onOpenServicePage,
  onJumpToPlanner,
  whatsappInternational,
  displayPhone,
  visibleCategories,
  embeddedOnServicePage = false
}) => {
  const pack = SEARCH_ENGINE_PACKS[lang];
  const ui = BOOKING_UI_CHROME[lang];
  const todayIso = getTodayIsoLocal();
  const tabsToRender = visibleCategories ?? SEARCH_CATEGORY_ORDER;
  const uid = useId();
  const panelFrameRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Sliding tab indicator & coordinated safe transition refs
  const flightTablistRef = useRef<HTMLDivElement | null>(null);
  const flightIndicatorRef = useRef<HTMLSpanElement | null>(null);
  const flightStageRef = useRef<HTMLDivElement | null>(null);
  const flightMetaRef = useRef<HTMLDivElement | null>(null);
  const flightTabTlRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

  const mobilityTablistRef = useRef<HTMLDivElement | null>(null);
  const mobilityIndicatorRef = useRef<HTMLSpanElement | null>(null);
  const mobilityStageRef = useRef<HTMLDivElement | null>(null);
  const mobilityTabTlRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

  const embeddedTablistRef = useRef<HTMLDivElement | null>(null);
  const embeddedIndicatorRef = useRef<HTMLSpanElement | null>(null);
  const embeddedStageRef = useRef<HTMLDivElement | null>(null);

  const umrahReadyCardRef = useRef<HTMLDivElement | null>(null);
  const holidayReadyCardRef = useRef<HTMLDivElement | null>(null);

  // ---------------- MOUNT-ON-FIRST-VISIBLE CACHE (ZERO WIDGETS ON INITIAL LOAD) ----------------
  // Each service & sub-tab mounts ONLY after it becomes visible (so third-party scripts never
  // initialize inside display:none containers) and stays parked in `hidden` afterwards so
  // returning to a service is instant with zero script duplication.
  const [visitedCategories, setVisitedCategories] = useState<SearchCategoryId[]>(() =>
    activeCategory ? [activeCategory] : []
  );
  const [closingService, setClosingService] = useState<SearchCategoryId | null>(null);
  const [panelHighlightNonce, setPanelHighlightNonce] = useState(0);

  // ---------------- FLIGHT ENGINE TAB STATE ----------------
  const [flightEngineTab, setFlightEngineTab] = useState<FlightEngineTabId>('aviasales');
  const [visitedFlightTabs, setVisitedFlightTabs] = useState<FlightEngineTabId[]>(['aviasales']);

  // ---------------- CAR RENTALS | AIRPORT TRANSFERS TWO-TAB STATE ----------------
  const [mobilityTab, setMobilityTab] = useState<MobilityTabId>('car_rentals');
  const [visitedMobilityTabs, setVisitedMobilityTabs] = useState<MobilityTabId[]>(['car_rentals']);

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

  useSlidingTabIndicator(flightTablistRef, flightIndicatorRef, flightEngineTab, [
    lang,
    isRtl,
    activeCategory
  ]);
  useSlidingTabIndicator(mobilityTablistRef, mobilityIndicatorRef, mobilityTab, [
    lang,
    isRtl,
    activeCategory
  ]);
  useSlidingTabIndicator(embeddedTablistRef, embeddedIndicatorRef, activeCategory, [
    lang,
    isRtl,
    embeddedOnServicePage
  ]);

  useReplayable3DPanel(umrahReadyCardRef, umrahReady, {
    enabled: umrahReady,
    staggerSelector: '.ggt-3d-stagger',
    duration: 0.46,
    yOffset: 14
  });

  useReplayable3DPanel(holidayReadyCardRef, holidayReady, {
    enabled: holidayReady,
    staggerSelector: '.ggt-3d-stagger',
    duration: 0.46,
    yOffset: 14
  });

  // Incoming opacity-only transition on widget stage + 3D text update when switching Flight tabs
  const didMountFlightTabRef = useRef(false);
  useEffect(() => {
    if (!didMountFlightTabRef.current) {
      didMountFlightTabRef.current = true;
      return;
    }
    if (prefersReducedMotion()) return;

    if (flightStageRef.current) {
      gsap.fromTo(
        flightStageRef.current,
        { opacity: 0.15 },
        { opacity: 1, duration: 0.36, ease: 'power2.out', clearProps: 'opacity' }
      );
    }
    if (flightMetaRef.current) {
      gsap.fromTo(
        flightMetaRef.current,
        { opacity: 0, y: 8, rotateX: 4, transformPerspective: 900 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.4,
          ease: 'power3.out',
          clearProps: 'transform,opacity'
        }
      );
    }
  }, [flightEngineTab]);

  // Incoming opacity-only transition on widget stage + 3D header stagger when switching Mobility tabs
  const didMountMobilityTabRef = useRef(false);
  useEffect(() => {
    if (!didMountMobilityTabRef.current) {
      didMountMobilityTabRef.current = true;
      return;
    }
    if (prefersReducedMotion()) return;

    const stage = mobilityStageRef.current;
    if (!stage) return;
    const activePanel = stage.querySelector<HTMLElement>(
      `[data-mobility-panel="${mobilityTab}"]`
    );
    if (!activePanel) return;

    const widgetShells = activePanel.querySelectorAll<HTMLElement>('.ggt-widget-safe-fade');
    const headings = activePanel.querySelectorAll<HTMLElement>('.ggt-3d-stagger');

    if (widgetShells.length > 0) {
      gsap.fromTo(
        widgetShells,
        { opacity: 0.12 },
        { opacity: 1, duration: 0.36, ease: 'power2.out', clearProps: 'opacity' }
      );
    }
    if (headings.length > 0) {
      gsap.fromTo(
        headings,
        { opacity: 0, y: 12, rotateX: 4, transformPerspective: 1000 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.44,
          stagger: 0.05,
          ease: 'power3.out',
          clearProps: 'transform,opacity'
        }
      );
    }
  }, [mobilityTab]);

  // Embedded Service Page category switch (opacity fade on widgets + 3D pop on non-widget cards)
  const didMountEmbeddedRef = useRef(false);
  useEffect(() => {
    if (!embeddedOnServicePage) return;
    const container = embeddedStageRef.current;
    if (!container || prefersReducedMotion()) return;

    if (!didMountEmbeddedRef.current) {
      didMountEmbeddedRef.current = true;
    }

    const widgetShells = container.querySelectorAll<HTMLElement>('.widget-stability-shell');
    const popCards = container.querySelectorAll<HTMLElement>('.ggt-panel-pop-card');

    if (widgetShells.length > 0) {
      gsap.fromTo(
        widgetShells,
        { opacity: 0.18 },
        { opacity: 1, duration: 0.36, ease: 'power2.out', clearProps: 'opacity' }
      );
    }
    if (popCards.length > 0) {
      gsap.fromTo(
        popCards,
        { opacity: 0, y: 14, scale: 0.97, rotateX: 4, transformPerspective: 1100 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.48,
          stagger: 0.055,
          ease: 'power3.out',
          clearProps: 'transform,opacity'
        }
      );
    }
  }, [activeCategory, embeddedOnServicePage]);

  // Register newly selected service in visitedCategories & trigger gold border highlight
  useEffect(() => {
    if (!activeCategory) return;
    setClosingService(null);
    setVisitedCategories((prev) => (prev.includes(activeCategory) ? prev : [...prev, activeCategory]));
    setPanelHighlightNonce((n) => n + 1);
  }, [activeCategory]);

  const displayedCategory = activeCategory ?? closingService;

  /**
   * Smooth widget-safe GSAP opening/switching animation for the single dedicated booking panel.
   * STRICT STABILITY RULE: Never transforms any third-party widget, iframe, or widget ancestor.
   * - Outer panel fades opacity only (zero transform on widget ancestors).
   * - Decorative header, Hero icon medallion, gold accent sweep, divider, and native HTML cards
   *   receive refined 3D perspective entrance motion.
   */
  useEffect(() => {
    if (embeddedOnServicePage || !activeCategory) return;
    const frame = panelFrameRef.current;
    if (!frame) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const refreshId = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 180);

    if (reduced) {
      gsap.set(frame, { opacity: 1 });
      return () => window.clearTimeout(refreshId);
    }

    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    const ctx = gsap.context(() => {
      // Safe opacity-only reveal on panel frame (never transform widget ancestors!)
      gsap.fromTo(
        frame,
        { opacity: 0 },
        { opacity: 1, duration: 0.34, ease: 'power2.out', clearProps: 'opacity' }
      );

      // Decorative gold top border sheen line
      const goldLine = frame.querySelector<HTMLElement>('.ggt-panel-gold-line');
      if (goldLine) {
        gsap.fromTo(
          goldLine,
          { scaleX: 0, opacity: 0.25, transformOrigin: isRtl ? 'right center' : 'left center' },
          { scaleX: 1, opacity: 1, duration: 0.62, ease: 'power3.out' }
        );
      }

      // Decorative header subtle 3D perspective lift (strictly sibling above widget stage)
      const headerEl = frame.querySelector<HTMLElement>('.ggt-panel-header-anim');
      if (headerEl) {
        gsap.fromTo(
          headerEl,
          isDesktop
            ? {
                opacity: 0,
                y: 22,
                rotateX: 7,
                transformPerspective: 1200
              }
            : { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.52,
            ease: 'power3.out',
            clearProps: 'transform,opacity'
          }
        );
      }

      // Exact Hero Icon Medallion 3D emergence
      const iconEl = frame.querySelector<HTMLElement>('.ggt-panel-icon-anim');
      if (iconEl) {
        gsap.fromTo(
          iconEl,
          isDesktop
            ? {
                opacity: 0,
                scale: 0.78,
                rotateY: -18,
                transformPerspective: 900
              }
            : { opacity: 0, scale: 0.88 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 0.56,
            ease: 'power3.out',
            clearProps: 'transform,opacity'
          }
        );
      }

      // Gold hairline divider draw-in
      const dividerEl = frame.querySelector<HTMLElement>('.ggt-panel-divider-anim');
      if (dividerEl) {
        gsap.fromTo(
          dividerEl,
          { scaleX: 0.12, opacity: 0.2, transformOrigin: 'center center' },
          { scaleX: 1, opacity: 1, duration: 0.55, ease: 'power2.out' }
        );
      }

      // Native HTML editorial/concierge cards inside the active panel only (strictly non-widget)
      const activeSlot = frame.querySelector<HTMLElement>(
        `[data-service-slot="${activeCategory}"]`
      );
      if (activeSlot) {
        const popCards = activeSlot.querySelectorAll<HTMLElement>('.ggt-panel-pop-card');
        if (popCards.length > 0) {
          gsap.fromTo(
            popCards,
            isDesktop
              ? {
                  opacity: 0,
                  y: 20,
                  scale: 0.97,
                  rotateX: 4,
                  transformPerspective: 1100
                }
              : { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 0.5,
              stagger: 0.06,
              ease: 'power2.out',
              clearProps: 'transform,opacity'
            }
          );
        }
      }
    }, frame);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, [activeCategory, embeddedOnServicePage, isRtl]);

  // Smooth closing transition handler (opacity-only on widget frame + header fade)
  const triggerSmoothClose = useCallback(
    (returnToServicesAfter = false) => {
      if (embeddedOnServicePage || !activeCategory) return;

      const finishClose = () => {
        setClosingService(null);
        if (returnToServicesAfter && onReturnToServices) {
          onReturnToServices();
        } else if (onClose) {
          onClose();
        }
        window.requestAnimationFrame(() => {
          window.setTimeout(() => ScrollTrigger.refresh(), 120);
        });
      };

      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const frame = panelFrameRef.current;

      if (reduced || !frame) {
        finishClose();
        return;
      }

      setClosingService(activeCategory);
      const headerEl = frame.querySelector<HTMLElement>('.ggt-panel-header-anim');
      if (headerEl) {
        gsap.to(headerEl, { opacity: 0, y: -10, duration: 0.2, ease: 'power2.in' });
      }
      gsap.to(frame, {
        opacity: 0,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(frame, { clearProps: 'opacity' });
          if (headerEl) gsap.set(headerEl, { clearProps: 'opacity,transform' });
          finishClose();
        }
      });
    },
    [activeCategory, embeddedOnServicePage, onClose, onReturnToServices]
  );

  // Close booking panel on Escape key
  useEffect(() => {
    if (embeddedOnServicePage || !activeCategory) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggerSmoothClose(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeCategory, embeddedOnServicePage, triggerSmoothClose]);

  // ---------------- INTERACTION HANDLERS (WITH GA4 USER-INTENT EVENTS) ----------------
  const handleSelectCategory = (catId: SearchCategoryId) => {
    onCategoryChange(catId);
    if (catId === 'car-transfers') {
      trackServiceSelection(
        mobilityTab === 'airport_transfers'
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

  const handleSelectFlightEngineTab = (tabId: FlightEngineTabId) => {
    if (tabId === flightEngineTab) return;
    switchTabWithTimeline({
      outgoingEl: flightStageRef.current,
      timelineRef: flightTabTlRef,
      isWidgetSafe: true,
      onSwap: () => {
        setFlightEngineTab(tabId);
        setVisitedFlightTabs((prev) => (prev.includes(tabId) ? prev : [...prev, tabId]));
        trackServiceSelection('flights_selected');
        window.setTimeout(() => ScrollTrigger.refresh(), 160);
      }
    });
  };

  const handleSelectMobilityTab = (tabId: MobilityTabId) => {
    if (tabId === mobilityTab) return;
    switchTabWithTimeline({
      outgoingEl: mobilityStageRef.current,
      timelineRef: mobilityTabTlRef,
      isWidgetSafe: true,
      onSwap: () => {
        setMobilityTab(tabId);
        setVisitedMobilityTabs((prev) => (prev.includes(tabId) ? prev : [...prev, tabId]));
        trackServiceSelection(
          tabId === 'airport_transfers' ? 'airport_transfers_selected' : 'car_rentals_selected'
        );
        window.setTimeout(() => ScrollTrigger.refresh(), 160);
      }
    });
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
      'Je souhaite recevoir un devis pour un programme Hajj & Omra :',
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

  const buildDirectUmrahWhatsappUrl = () => {
    const msg =
      'Bonjour Golden Group Travels, je souhaite des informations sur vos programmes Hajj & Omra.';
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(msg)}`;
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

  const buildDirectHolidayWhatsappUrl = () => {
    const msg =
      'Bonjour Golden Group Travels, je souhaite un devis personnalisé pour un séjour ou forfait vacances.';
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(msg)}`;
  };

  const buildDirectFlightQuoteUrl = () => {
    const msg =
      'Bonjour Golden Group Travels, je souhaite obtenir un devis pour un billet d’avion.';
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(msg)}`;
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

  // =========================================================================
  // 01. FLIGHTS CONTENT (Aviasales Primary + Optional Expedia Tab + Kiwi Offers)
  // =========================================================================
  const renderFlightsContent = () => (
    <div className="space-y-7">
      {/* Primary Flight Search Engine Stage */}
      <div className="rounded-2xl bg-[#f5ede0]/85 border border-[#d1a847]/55 p-3 sm:p-5 lg:p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div ref={flightMetaRef} className="space-y-1">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9a7220]">
              {ui.primarySearchLabel} ·{' '}
              {flightEngineTab === 'aviasales'
                ? pack.flights.providers.aviasales.sub
                : pack.flights.providers.expedia.sub}
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#2c405e]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c59b38] shrink-0" />
              <span>
                {flightEngineTab === 'aviasales'
                  ? pack.flights.aviasalesNotice
                  : pack.flights.expediaNote}
              </span>
            </div>
          </div>

          <div
            ref={flightTablistRef}
            role="tablist"
            aria-label={pack.flights.providerSelectorLabel}
            className="relative inline-flex items-center p-1 rounded-xl bg-[#ede1ce] border border-[#d1a847]/55 gap-1 self-start md:self-auto"
          >
            <span
              ref={flightIndicatorRef}
              aria-hidden="true"
              className="ggt-tab-indicator-pill"
              style={{ opacity: 0 }}
            />
            <button
              type="button"
              role="tab"
              aria-selected={flightEngineTab === 'aviasales'}
              data-tab-active={flightEngineTab === 'aviasales' ? 'true' : undefined}
              onClick={() => handleSelectFlightEngineTab('aviasales')}
              className={`ggt-tab-3d relative z-10 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-[0.08em] cursor-pointer whitespace-normal text-center leading-snug ${
                flightEngineTab === 'aviasales'
                  ? 'text-[#fceda2]'
                  : 'text-[#0b1d3a]/85 hover:text-[#0b1d3a]'
              }`}
            >
              {pack.flights.providers.aviasales.label}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={flightEngineTab === 'expedia'}
              data-tab-active={flightEngineTab === 'expedia' ? 'true' : undefined}
              onClick={() => handleSelectFlightEngineTab('expedia')}
              className={`ggt-tab-3d relative z-10 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-[0.08em] cursor-pointer whitespace-normal text-center leading-snug ${
                flightEngineTab === 'expedia'
                  ? 'text-[#fceda2]'
                  : 'text-[#0b1d3a]/85 hover:text-[#0b1d3a]'
              }`}
            >
              {pack.flights.providers.expedia.label}
            </button>
          </div>
        </div>

        {/* Opacity-only Widget Stage (never transformed!) */}
        <div ref={flightStageRef}>
          {/* Aviasales Primary Flight Search (100/7879) */}
          <div
            className={flightEngineTab === 'aviasales' ? 'block' : 'hidden'}
            aria-hidden={flightEngineTab !== 'aviasales'}
          >
            <AviasalesFlightWidget
              key="aviasales-flights-widget"
              lang={lang}
              onJumpToPlanner={onJumpToPlanner}
              whatsappInternational={whatsappInternational}
              displayPhone={displayPhone}
              embedClean
            />
          </div>

          {/* Alternative Flight Search (Expedia lobs="flights") — mounts ONLY when tab is first opened */}
          {visitedFlightTabs.includes('expedia') && (
            <div
              className={flightEngineTab === 'expedia' ? 'block' : 'hidden'}
              aria-hidden={flightEngineTab !== 'expedia'}
            >
              <ExpediaFlightWidget
                key="expedia-flights-widget"
                lang={lang}
                onJumpToPlanner={onJumpToPlanner}
                whatsappInternational={whatsappInternational}
                displayPhone={displayPhone}
                embedClean
              />
            </div>
          )}
        </div>
      </div>

      {/* Unified Flight Agency Concierge Strip */}
      <div className="ggt-panel-pop-card rounded-2xl bg-[#071429] text-[#f5ede0] border border-[#d1a847]/55 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-slate-200 leading-relaxed">
          <span className="font-semibold text-[#fceda2]">{pack.flights.conciergeTitle}</span>{' '}
          <span className="text-slate-300">{pack.flights.conciergeDesc}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href={buildDirectFlightQuoteUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center text-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-wider transition-colors whitespace-normal leading-snug"
          >
            <span>
              {pack.flights.agencyFlightQuoteBtn} ({displayPhone})
            </span>
          </a>
          {onJumpToPlanner && (
            <button
              type="button"
              onClick={onJumpToPlanner}
              className="w-full sm:w-auto inline-flex items-center justify-center text-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/60 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-normal leading-snug"
            >
              <MapPin className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
              <span>Google Maps</span>
            </button>
          )}
        </div>
      </div>

      {/* Supplementary Route Offers Underneath (Kiwi 111/3411) */}
      <div className="pt-4 border-t border-[#d1a847]/35 space-y-4">
        <div className="space-y-1 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
            {ui.supplementaryLabel} · {pack.flights.offersBadge}
          </div>
          <h4 className="font-serif-crest text-lg sm:text-xl font-semibold text-[#0b1d3a]">
            {pack.flights.offersTitle}
          </h4>
          <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
            {pack.flights.offersSubtitle}
          </p>
        </div>

        <div className="rounded-2xl bg-[#f5ede0]/70 border border-[#d1a847]/40 p-2 sm:p-5 overflow-x-clip widget-stability-shell">
          <IsolatedWidgetFrame
            key={FLIGHTS_OFFERS_WIDGET.id}
            scriptSrc={FLIGHTS_OFFERS_WIDGET.scriptSrc}
            title={pack.flights.offersTitle}
            loadingLabel={pack.flights.offersLoadingLabel}
            errorLabel={pack.flights.offersLoadErrorFallback}
            lang={lang}
            minHeight={FLIGHTS_OFFERS_WIDGET.minHeightPx ?? 360}
          />
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // 02. HOTELS CONTENT (Expedia Hotel Search Widget)
  // =========================================================================
  const renderHotelsContent = () => (
    <ExpediaSearchWidget
      key="expedia-hotels-search"
      lang={lang}
      variant="hub"
      onJumpToPlanner={onJumpToPlanner}
    />
  );

  // =========================================================================
  // 03. HAJJ & OMRA CONTENT (Validated Inquiry + Direct WhatsApp/Agency Desk)
  // =========================================================================
  const renderUmrahContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      <div className="lg:col-span-8">
        {umrahReady ? (
          <div
            ref={umrahReadyCardRef}
            className="rounded-2xl bg-[#071429] text-[#f5ede0] border border-[#d1a847] p-6 space-y-5 shadow-[0_18px_40px_rgba(4,12,28,0.3)]"
          >
            <div className="ggt-3d-stagger flex flex-wrap items-center justify-between gap-3">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                <div className="text-slate-400">{pack.umrah.departureCityLabel}</div>
                <div className="font-semibold text-white mt-0.5">{umrahDepartureCity}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                <div className="text-slate-400">{pack.umrah.departureDateLabel}</div>
                <div className="font-semibold text-white mt-0.5 tabular-nums">
                  {umrahDepartDate}
                  {umrahReturnDate ? ` → ${umrahReturnDate}` : ''}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                <div className="text-slate-400">{pack.umrah.hotelPrefLabel}</div>
                <div className="font-semibold text-white mt-0.5">
                  {pack.umrah.hotelOptions[umrahHotelIdx]}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
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
          <form
            onSubmit={handleUmrahSubmit}
            noValidate
            className="rounded-2xl bg-[#f5ede0]/80 border border-[#d1a847]/45 p-4 sm:p-6 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  maxLength={120}
                  value={umrahDepartureCity}
                  onChange={(e) => setUmrahDepartureCity(e.target.value)}
                  placeholder={pack.umrah.departureCityPlaceholder}
                  className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                />
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
                    className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
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
                    className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                  />
                </div>
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
                  className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
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
                  className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
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
                  className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
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
                  className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                >
                  {pack.umrah.packageOptions.map((opt, idx) => (
                    <option key={idx} value={idx}>
                      {opt}
                    </option>
                  ))}
                </select>
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
                  maxLength={120}
                  value={umrahName}
                  onChange={(e) => setUmrahName(e.target.value)}
                  placeholder={pack.umrah.namePlaceholder}
                  className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                />
              </div>

              <div>
                <label
                  htmlFor={`${uid}-umrah-phone`}
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                >
                  {pack.umrah.phoneLabel}
                </label>
                <input
                  id={`${uid}-umrah-phone`}
                  type="tel"
                  maxLength={40}
                  dir="ltr"
                  value={umrahPhone}
                  onChange={(e) => setUmrahPhone(e.target.value)}
                  placeholder={pack.umrah.phonePlaceholder}
                  className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
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
              <span className="text-[11px] text-[#2c405e]/85">{pack.umrah.noFakePackagesNote}</span>
            </div>
          </form>
        )}
      </div>

      {/* Direct Hajj & Omra Advisor Card */}
      <aside className="lg:col-span-4">
        <div className="ggt-panel-pop-card rounded-2xl bg-[#071429] text-[#f5ede0] border border-[#d1a847]/55 p-5 sm:p-6 space-y-5 shadow-[0_18px_42px_rgba(4,12,28,0.28)]">
          <div className="space-y-1.5">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
              {ui.directAdvisorLabel}
            </div>
            <h4 className="font-serif-crest text-xl font-semibold text-[#fceda2]">
              {pack.categories.umrah.tabLabel}
            </h4>
          </div>

          <ul className="space-y-2.5">
            {ui.umrahHighlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed">
                <Check className="w-4 h-4 text-[#d1a847] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="h-px bg-gradient-to-r from-transparent via-[#d1a847]/45 to-transparent" />

          <div className="space-y-2.5">
            <a
              href={buildDirectUmrahWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.12em] transition-colors"
            >
              <span>{pack.umrah.whatsappBtn}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
            <a
              href="tel:0666484815"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/55 text-xs font-semibold uppercase tracking-[0.12em] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
              <span dir="ltr">{displayPhone}</span>
            </a>
          </div>
        </div>
      </aside>
    </div>
  );

  // =========================================================================
  // 04. HOLIDAYS / SÉJOURS CONTENT
  // =========================================================================
  const renderHolidaysContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      <div className="lg:col-span-8">
        {holidayReady ? (
          <div
            ref={holidayReadyCardRef}
            className="rounded-2xl bg-[#071429] text-[#f5ede0] border border-[#d1a847] p-6 space-y-5 shadow-[0_18px_40px_rgba(4,12,28,0.3)]"
          >
            <div className="ggt-3d-stagger flex flex-wrap items-center justify-between gap-3">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                <div className="text-slate-400">{pack.holidays.destinationLabel}</div>
                <div className="font-semibold text-white mt-0.5">{holidayDest}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                <div className="text-slate-400">{pack.holidays.departureDateLabel}</div>
                <div className="font-semibold text-white mt-0.5 tabular-nums">
                  {holidayDepartDate}
                  {holidayReturnDate ? ` → ${holidayReturnDate}` : ''}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
                <div className="text-slate-400">{pack.holidays.budgetLabel}</div>
                <div className="font-semibold text-white mt-0.5">
                  {pack.holidays.budgetOptions[holidayBudgetIdx]}
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35">
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
          <form
            onSubmit={handleHolidaysSubmit}
            noValidate
            className="rounded-2xl bg-[#f5ede0]/80 border border-[#d1a847]/45 p-4 sm:p-6 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  maxLength={120}
                  value={holidayDest}
                  onChange={(e) => setHolidayDest(e.target.value)}
                  placeholder={pack.holidays.destinationPlaceholder}
                  className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                />
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
                    className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
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
                    className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                  />
                </div>
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
                  className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
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
                  className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
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
                  className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
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
                  className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                >
                  {pack.holidays.packageTypeOptions.map((opt, idx) => (
                    <option key={idx} value={idx}>
                      {opt}
                    </option>
                  ))}
                </select>
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
                  maxLength={120}
                  value={holidayName}
                  onChange={(e) => setHolidayName(e.target.value)}
                  placeholder={pack.holidays.namePlaceholder}
                  className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                />
              </div>

              <div>
                <label
                  htmlFor={`${uid}-holiday-phone`}
                  className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] mb-1.5"
                >
                  {pack.holidays.phoneLabel}
                </label>
                <input
                  id={`${uid}-holiday-phone`}
                  type="tel"
                  maxLength={40}
                  dir="ltr"
                  value={holidayPhone}
                  onChange={(e) => setHolidayPhone(e.target.value)}
                  placeholder={pack.holidays.phonePlaceholder}
                  className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
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
              <span className="text-[11px] text-[#2c405e]/85">{pack.holidays.noFakePackagesNote}</span>
            </div>
          </form>
        )}
      </div>

      {/* Direct Bespoke Holidays Advisor Card */}
      <aside className="lg:col-span-4">
        <div className="ggt-panel-pop-card rounded-2xl bg-[#071429] text-[#f5ede0] border border-[#d1a847]/55 p-5 sm:p-6 space-y-5 shadow-[0_18px_42px_rgba(4,12,28,0.28)]">
          <div className="space-y-1.5">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
              {ui.directAdvisorLabel}
            </div>
            <h4 className="font-serif-crest text-xl font-semibold text-[#fceda2]">
              {pack.categories.holidays.tabLabel}
            </h4>
          </div>

          <ul className="space-y-2.5">
            {ui.holidayHighlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed">
                <Check className="w-4 h-4 text-[#d1a847] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="h-px bg-gradient-to-r from-transparent via-[#d1a847]/45 to-transparent" />

          <div className="space-y-2.5">
            <a
              href={buildDirectHolidayWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.12em] transition-colors"
            >
              <span>{pack.holidays.whatsappBtn}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
            <a
              href="tel:0666484815"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/55 text-xs font-semibold uppercase tracking-[0.12em] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
              <span dir="ltr">{displayPhone}</span>
            </a>
          </div>
        </div>
      </aside>
    </div>
  );

  // =========================================================================
  // 05. TOURS & ACTIVITIES CONTENT (Portals + Private Inquiry + All 3 Widgets)
  // =========================================================================
  const renderToursContent = () => (
    <div className="space-y-8">
      {/* Primary Partner Portals (Klook & KKday) + Private Tour WhatsApp Bar */}
      <div className="space-y-4">
        <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
          {ui.primarySearchLabel}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TOURS_AFFILIATE_PARTNERS.map((partner) => {
            const isKlook = partner.id === 'klook';
            return (
              <div
                key={partner.id}
                className="ggt-panel-pop-card rounded-2xl bg-[#071429] text-[#f5ede0] border border-[#d1a847]/60 p-5 sm:p-6 flex flex-col justify-between gap-5 shadow-[0_18px_40px_rgba(4,12,28,0.28)]"
              >
                <div className="space-y-2">
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
                  className="inline-flex items-center justify-center text-center gap-2 px-5 py-3 rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.12em] transition-colors whitespace-normal leading-snug"
                >
                  <span>{isKlook ? pack.tours.klookCta : pack.tours.kkdayCta}</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Private Tour WhatsApp Inquiry Bar */}
        <div className="ggt-panel-pop-card rounded-2xl bg-[#f5ede0]/85 border border-[#d1a847]/50 p-4 sm:p-5 space-y-4">
          <div className="text-xs font-medium text-[#2c405e]">{pack.tours.architectureNote}</div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-5">
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
                maxLength={120}
                value={tourDestination}
                onChange={(e) => setTourDestination(e.target.value)}
                placeholder={pack.tours.destinationPlaceholder}
                className="w-full bg-[#fcf9f2] border border-[#d1a847]/55 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
              />
            </div>

            <div className="md:col-span-4 space-y-1.5">
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
                      data-tab-active={selected ? 'true' : undefined}
                      className={`ggt-tab-3d px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                        selected
                          ? 'bg-[#0b1d3a] text-[#fceda2] border-[#d1a847] shadow-sm'
                          : 'bg-[#fcf9f2] text-[#0b1d3a] border-[#d1a847]/45 hover:border-[#0b1d3a]'
                      }`}
                    >
                      {city}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="md:col-span-3 flex justify-end">
              <a
                href={buildCustomTourWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center text-center gap-2 px-4 py-3 rounded-xl bg-[#0b1d3a] text-[#fceda2] hover:bg-[#132d56] border border-[#d1a847]/65 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <span>{pack.tours.customTourBtn}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* All 3 Existing Tours & Activities Widgets Organized Cleanly */}
      <div className="pt-4 border-t border-[#d1a847]/35 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div className="space-y-1">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
              {ui.supplementaryLabel}
            </div>
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

        <div className="space-y-6">
          {TOURS_WIDGETS.map((widget) => {
            const meta = pack.tours.widgets[widget.id as keyof typeof pack.tours.widgets];
            return (
              <div
                key={widget.id}
                className="rounded-2xl bg-[#f5ede0]/75 border border-[#d1a847]/40 p-3.5 sm:p-6 space-y-4"
              >
                <div className="pb-3 border-b border-[#d1a847]/30 space-y-0.5">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a7220] font-semibold">
                    {meta.badge}
                  </div>
                  <h5 className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                    {meta.title}
                  </h5>
                  <p className="text-xs text-[#2c405e]">{meta.subtitle}</p>
                </div>

                {/* Strictly Untransformed Widget Container */}
                <div className="rounded-xl bg-[#fcf9f2] border border-[#d1a847]/35 p-1.5 sm:p-4 overflow-x-clip widget-stability-shell">
                  {widget.isolatedFrame ? (
                    <IsolatedWidgetFrame
                      scriptSrc={widget.scriptSrc}
                      title={meta.title}
                      loadingLabel={pack.tours.widgetLoadingLabel}
                      errorLabel={pack.tours.widgetLoadErrorFallback}
                      lang={lang}
                      minHeight={widget.minHeightPx ?? 360}
                      containerClassName={widget.containerClassName}
                    />
                  ) : (
                    <ThirdPartyScriptWidget
                      scriptSrc={widget.scriptSrc}
                      title={meta.title}
                      loadingLabel={pack.tours.widgetLoadingLabel}
                      errorLabel={pack.tours.widgetLoadErrorFallback}
                      lang={lang}
                      minHeightClass={widget.minHeightClass}
                      containerClassName={widget.containerClassName}
                      hostClassName={widget.hostClassName}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // 06. CAR RENTALS & AIRPORT TRANSFERS CONTENT (2 Internal Tabs)
  // =========================================================================
  const renderCarTransfersContent = () => {
    const showCarRentals = mobilityTab === 'car_rentals';
    const showAirportTransfers = mobilityTab === 'airport_transfers';

    const primaryCarWidget = CAR_RENTALS_WIDGETS[0]; // AutoEurope (143/4362)
    const localrentWidget = CAR_RENTALS_WIDGETS[1]; // Localrent (87/2466)
    const getRentacarWidget = CAR_RENTALS_WIDGETS[2]; // GetRentacar (222/8813)

    const primaryCarMeta =
      pack.carTransfers.widgets[
        primaryCarWidget.id as keyof typeof pack.carTransfers.widgets
      ];
    const localrentMeta =
      pack.carTransfers.widgets[
        localrentWidget.id as keyof typeof pack.carTransfers.widgets
      ];
    const getRentacarMeta =
      pack.carTransfers.widgets[
        getRentacarWidget.id as keyof typeof pack.carTransfers.widgets
      ];
    const promoMeta =
      pack.carTransfers.widgets[
        CAR_RENTALS_PROMO_BANNER.id as keyof typeof pack.carTransfers.widgets
      ];

    const primaryTransferWidget = AIRPORT_TRANSFERS_WIDGETS[0]; // Kiwitaxi (1/3879)
    const secondaryTransferWidget = AIRPORT_TRANSFERS_WIDGETS[1]; // Intui.travel (22/3507)
    const primaryTransferMeta =
      pack.carTransfers.widgets[
        primaryTransferWidget.id as keyof typeof pack.carTransfers.widgets
      ];
    const secondaryTransferMeta =
      pack.carTransfers.widgets[
        secondaryTransferWidget.id as keyof typeof pack.carTransfers.widgets
      ];

    return (
      <div className="space-y-7">
        {/* Clean Two-Tab Internal Navigation: Location de Voitures | Transferts Aéroport */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
          <div
            ref={mobilityTablistRef}
            role="tablist"
            aria-label={pack.carTransfers.tabSelectorLabel}
            className="relative inline-flex flex-wrap items-center p-1.5 rounded-xl bg-[#ede1ce] border border-[#d1a847]/60 gap-1.5 w-full sm:w-auto"
          >
            <span
              ref={mobilityIndicatorRef}
              aria-hidden="true"
              className="ggt-tab-indicator-pill"
              style={{ opacity: 0 }}
            />
            {(['car_rentals', 'airport_transfers'] as const).map((tabId) => {
              const selected = mobilityTab === tabId;
              const tabMeta = pack.carTransfers.tabs[tabId];
              const TabIcon = tabId === 'car_rentals' ? Car : PlaneLanding;

              return (
                <button
                  key={tabId}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  data-tab-active={selected ? 'true' : undefined}
                  onClick={() => handleSelectMobilityTab(tabId)}
                  className={`ggt-tab-3d relative z-10 flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg text-xs font-bold uppercase tracking-[0.09em] cursor-pointer whitespace-normal text-center leading-snug focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b1d3a] ${
                    selected
                      ? 'text-[#fceda2]'
                      : 'text-[#0b1d3a]/85 hover:text-[#0b1d3a]'
                  }`}
                >
                  <TabIcon
                    className={`ggt-tab-icon w-4 h-4 shrink-0 ${
                      selected ? 'text-[#d1a847]' : 'text-[#9a7220]'
                    }`}
                  />
                  <span>{tabMeta.label}</span>
                </button>
              );
            })}
          </div>

          <div className="inline-flex items-center gap-1.5 text-[11px] text-[#2c405e]/90">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c59b38] shrink-0" />
            <span>{pack.carTransfers.transparencyNote}</span>
          </div>
        </div>

        <div ref={mobilityStageRef}>
          {/* TAB 1: LOCATION DE VOITURES (All 4 Car Rental Widgets) */}
          {visitedMobilityTabs.includes('car_rentals') && (
            <div
              role="tabpanel"
              data-mobility-panel="car_rentals"
              className={showCarRentals ? 'space-y-7' : 'hidden'}
              aria-hidden={!showCarRentals}
            >
              {/* Primary Spotlight: AutoEurope (143/4362) */}
              <div className="rounded-2xl bg-[#f5ede0]/90 border border-[#d1a847]/55 p-3.5 sm:p-6 space-y-4">
                <div className="ggt-3d-stagger pb-3 border-b border-[#d1a847]/35 space-y-0.5">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                    {ui.primarySearchLabel} · {primaryCarMeta.badge}
                  </div>
                  <h4 className="font-serif-crest text-lg sm:text-xl font-semibold text-[#0b1d3a]">
                    {primaryCarMeta.title}
                  </h4>
                  <p className="text-xs text-[#2c405e]">{primaryCarMeta.subtitle}</p>
                </div>

                <div className="ggt-widget-safe-fade rounded-xl bg-[#fcf9f2] border border-[#d1a847]/35 p-1.5 sm:p-4 overflow-x-clip widget-stability-shell">
                <ThirdPartyScriptWidget
                  scriptSrc={primaryCarWidget.scriptSrc}
                  title={primaryCarMeta.title}
                  loadingLabel={pack.carTransfers.loadingLabel}
                  errorLabel={pack.carTransfers.loadErrorFallback}
                  lang={lang}
                  minHeightClass={primaryCarWidget.minHeightClass}
                  containerClassName={primaryCarWidget.containerClassName}
                  hostClassName={primaryCarWidget.hostClassName}
                />
              </div>
            </div>

            {/* Secondary Car Rental Search & Partner Offers */}
            <div className="pt-2 space-y-5">
              <div className="space-y-0.5">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                  {ui.secondaryProvidersLabel}
                </div>
                <h4 className="font-serif-crest text-lg sm:text-xl font-semibold text-[#0b1d3a]">
                  {pack.carTransfers.carRentalsTitle}
                </h4>
              </div>

              {/* Localrent (87/2466) */}
              <div className="rounded-2xl bg-[#f5ede0]/70 border border-[#d1a847]/40 p-3.5 sm:p-6 space-y-4">
                <div className="pb-3 border-b border-[#d1a847]/30 space-y-0.5">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a7220] font-semibold">
                    {localrentMeta.badge}
                  </div>
                  <h5 className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                    {localrentMeta.title}
                  </h5>
                  <p className="text-xs text-[#2c405e]">{localrentMeta.subtitle}</p>
                </div>

                <div className="rounded-xl bg-[#fcf9f2] border border-[#d1a847]/35 p-1.5 sm:p-4 overflow-x-clip widget-stability-shell">
                  <ThirdPartyScriptWidget
                    scriptSrc={localrentWidget.scriptSrc}
                    title={localrentMeta.title}
                    loadingLabel={pack.carTransfers.loadingLabel}
                    errorLabel={pack.carTransfers.loadErrorFallback}
                    lang={lang}
                    minHeightClass={localrentWidget.minHeightClass}
                    containerClassName={localrentWidget.containerClassName}
                    hostClassName={localrentWidget.hostClassName}
                  />
                </div>
              </div>

              {/* Balanced 2-Column Row: GetRentacar (222/8813) + EconomyBookings Offer Banner (10/2082) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7 rounded-2xl bg-[#f5ede0]/70 border border-[#d1a847]/40 p-3.5 sm:p-6 space-y-4">
                  <div className="pb-3 border-b border-[#d1a847]/30 space-y-0.5">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a7220] font-semibold">
                      {getRentacarMeta.badge}
                    </div>
                    <h5 className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                      {getRentacarMeta.title}
                    </h5>
                    <p className="text-xs text-[#2c405e]">{getRentacarMeta.subtitle}</p>
                  </div>

                  <div className="rounded-xl bg-[#fcf9f2] border border-[#d1a847]/35 p-1.5 sm:p-4 overflow-x-clip widget-stability-shell">
                    <ThirdPartyScriptWidget
                      scriptSrc={getRentacarWidget.scriptSrc}
                      title={getRentacarMeta.title}
                      loadingLabel={pack.carTransfers.loadingLabel}
                      errorLabel={pack.carTransfers.loadErrorFallback}
                      lang={lang}
                      minHeightClass={getRentacarWidget.minHeightClass}
                      containerClassName={getRentacarWidget.containerClassName}
                      hostClassName={getRentacarWidget.hostClassName}
                    />
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-2xl bg-[#ede1ce]/65 border border-[#d1a847]/45 p-3.5 sm:p-6 space-y-4">
                  <div className="pb-3 border-b border-[#d1a847]/30 space-y-0.5">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a7220] font-semibold">
                      {pack.carTransfers.promoBannerEyebrow}
                    </div>
                    <h5 className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                      {promoMeta.title}
                    </h5>
                    <p className="text-xs text-[#2c405e]">{promoMeta.subtitle}</p>
                  </div>

                  <div className="rounded-xl bg-[#fcf9f2] border border-[#d1a847]/35 p-2 sm:p-4 overflow-x-clip widget-stability-shell">
                    <ThirdPartyScriptWidget
                      scriptSrc={CAR_RENTALS_PROMO_BANNER.scriptSrc}
                      title={promoMeta.title}
                      loadingLabel={pack.carTransfers.loadingLabel}
                      errorLabel={pack.carTransfers.loadErrorFallback}
                      lang={lang}
                      containerClassName={CAR_RENTALS_PROMO_BANNER.containerClassName}
                      hostClassName={CAR_RENTALS_PROMO_BANNER.hostClassName}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TRANSFERTS AÉROPORT (Both Transfer Widgets — mounted ONLY when tab is first clicked) */}
        {visitedMobilityTabs.includes('airport_transfers') && (
          <div
            role="tabpanel"
            data-mobility-panel="airport_transfers"
            className={showAirportTransfers ? 'space-y-7' : 'hidden'}
            aria-hidden={!showAirportTransfers}
          >
            {/* Primary Airport Transfer Search Engine (Kiwitaxi 1/3879) */}
            <div className="rounded-2xl bg-[#f5ede0]/90 border border-[#d1a847]/55 p-3.5 sm:p-6 space-y-4">
              <div className="ggt-3d-stagger pb-3 border-b border-[#d1a847]/35 space-y-0.5">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                  {ui.primarySearchLabel} · {primaryTransferMeta.badge}
                </div>
                <h4 className="font-serif-crest text-lg sm:text-xl font-semibold text-[#0b1d3a]">
                  {primaryTransferMeta.title}
                </h4>
                <p className="text-xs text-[#2c405e]">{primaryTransferMeta.subtitle}</p>
              </div>

              <div className="ggt-widget-safe-fade rounded-xl bg-[#fcf9f2] border border-[#d1a847]/35 p-1.5 sm:p-4 overflow-x-clip widget-stability-shell">
                <ThirdPartyScriptWidget
                  scriptSrc={primaryTransferWidget.scriptSrc}
                  title={primaryTransferMeta.title}
                  loadingLabel={pack.carTransfers.loadingLabel}
                  errorLabel={pack.carTransfers.loadErrorFallback}
                  lang={lang}
                  minHeightClass={primaryTransferWidget.minHeightClass}
                  containerClassName={primaryTransferWidget.containerClassName}
                  hostClassName={primaryTransferWidget.hostClassName}
                />
              </div>
            </div>

            {/* Supplementary Popular Airport Transfer Routes (Intui.travel 22/3507) */}
            <div className="rounded-2xl bg-[#f5ede0]/70 border border-[#d1a847]/40 p-3.5 sm:p-6 space-y-4">
              <div className="ggt-3d-stagger pb-3 border-b border-[#d1a847]/30 space-y-0.5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#9a7220] font-semibold">
                  {ui.supplementaryLabel} · {secondaryTransferMeta.badge}
                </div>
                <h5 className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                  {secondaryTransferMeta.title}
                </h5>
                <p className="text-xs text-[#2c405e]">{secondaryTransferMeta.subtitle}</p>
              </div>

              <div className="ggt-widget-safe-fade rounded-xl bg-[#fcf9f2] border border-[#d1a847]/35 p-1.5 sm:p-4 overflow-x-clip widget-stability-shell">
                <IsolatedWidgetFrame
                  scriptSrc={secondaryTransferWidget.scriptSrc}
                  title={secondaryTransferMeta.title}
                  loadingLabel={pack.carTransfers.loadingLabel}
                  errorLabel={pack.carTransfers.loadErrorFallback}
                  lang={lang}
                  minHeight={secondaryTransferWidget.minHeightPx ?? 400}
                  containerClassName={secondaryTransferWidget.containerClassName}
                />
              </div>
            </div>
          </div>
        )}
        </div>

        {/* Direct Mobility Concierge Strip */}
        <div className="ggt-panel-pop-card rounded-2xl bg-[#071429] text-[#f5ede0] border border-[#d1a847]/55 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-200 leading-relaxed">
            <span className="font-semibold text-[#fceda2]">{pack.carTransfers.conciergeTitle}</span>{' '}
            <span className="text-slate-300">{pack.carTransfers.conciergeDesc}</span>
          </div>
          <a
            href={buildMobilityWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center text-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-wider transition-colors whitespace-normal leading-snug"
          >
            <span>
              {pack.carTransfers.conciergeCta} ({displayPhone})
            </span>
          </a>
        </div>
      </div>
    );
  };

  const renderCategoryContentById = (catId: SearchCategoryId) => {
    switch (catId) {
      case 'flights':
        return renderFlightsContent();
      case 'hotels':
        return renderHotelsContent();
      case 'umrah':
        return renderUmrahContent();
      case 'holidays':
        return renderHolidaysContent();
      case 'tours':
        return renderToursContent();
      case 'car-transfers':
        return renderCarTransfersContent();
    }
  };

  // =========================================================================
  // EMBEDDED ON DEDICATED SERVICE DETAIL PAGE MODE
  // =========================================================================
  if (embeddedOnServicePage) {
    const resolvedCategory = activeCategory ?? tabsToRender[0] ?? 'flights';
    return (
      <section id="search-hub" aria-label={pack.hubTitle} className="w-full">
        <div className="bg-[#fcf9f2] text-[#0b1d3a] border border-[#d1a847]/45 rounded-2xl p-4 sm:p-8 lg:p-10 shadow-[0_18px_44px_rgba(11,29,58,0.08)]">
          {tabsToRender.length > 1 && (
            <div className="mb-7 pb-5 border-b border-[#d1a847]/35">
              <div
                ref={embeddedTablistRef}
                role="tablist"
                aria-label={pack.servicesHubTitle}
                className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 rounded-2xl bg-[#ede1ce]/70 border border-[#d1a847]/45"
              >
                <span
                  ref={embeddedIndicatorRef}
                  aria-hidden="true"
                  className="ggt-tab-indicator-pill"
                  style={{ opacity: 0 }}
                />
                {tabsToRender.map((catId) => {
                  const Icon = HERO_CATEGORY_ICONS[catId];
                  const meta = pack.categories[catId];
                  const isActive = resolvedCategory === catId;
                  return (
                    <button
                      key={catId}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      data-tab-active={isActive ? 'true' : undefined}
                      onClick={() => handleSelectCategory(catId)}
                      className={`ggt-tab-3d relative z-10 rounded-xl px-4 py-3 text-left rtl:text-right border cursor-pointer flex items-center gap-3 ${
                        isActive
                          ? 'text-[#fceda2] border-transparent'
                          : 'bg-[#fcf9f2]/75 text-[#0b1d3a] border-[#d1a847]/35 hover:border-[#c59b38]'
                      }`}
                    >
                      <span
                        className={`ggt-tab-icon w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${
                          isActive
                            ? 'bg-[#071429] border-[#d1a847] text-[#fceda2]'
                            : 'bg-[#fcf9f2] border-[#c59b38]/60 text-[#0b1d3a]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs sm:text-sm font-bold uppercase tracking-wider leading-snug">
                          {meta.tabLabel}
                        </div>
                        <div
                          className={`text-[11px] leading-snug ${
                            isActive ? 'text-[#f5ede0]/85' : 'text-[#2c405e]/80'
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

          <div ref={embeddedStageRef}>{renderCategoryContentById(resolvedCategory)}</div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // HOMEPAGE DEDICATED SINGLE BOOKING DISPLAY AREA (HIDDEN BY DEFAULT!)
  // =========================================================================
  // On initial page load (before any service is ever clicked), render NOTHING at all:
  // zero booking widgets in DOM, zero third-party widget scripts, zero extra vertical space.
  if (!displayedCategory && visitedCategories.length === 0) {
    return null;
  }

  const isOpen = Boolean(displayedCategory);
  const ActiveIcon = displayedCategory ? HERO_CATEGORY_ICONS[displayedCategory] : null;
  const activeMeta = displayedCategory ? pack.categories[displayedCategory] : null;
  const activeDescription = displayedCategory ? ui.serviceDescriptions[displayedCategory] : '';

  return (
    <section
      ref={sectionRef}
      id="booking-display-area"
      aria-label={activeMeta ? activeMeta.tabLabel : pack.hubTitle}
      aria-hidden={!isOpen}
      className={
        isOpen
          ? 'scroll-mt-24 sm:scroll-mt-28 relative bg-gradient-to-b from-[#061124] via-[#0b1d3a] to-[#061124] text-[#f5ede0] border-y border-[#d1a847]/45 py-8 sm:py-12 md:py-16 overflow-x-clip'
          : 'hidden'
      }
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Single Dedicated Booking Panel Frame (Stable DOM node & opacity-only transition — NEVER transformed or remounted!) */}
        <div
          ref={panelFrameRef}
          className="relative overflow-x-clip rounded-2xl sm:rounded-3xl bg-[#fcf9f2] text-[#0b1d3a] border-2 border-[#d1a847]/80 p-4 sm:p-7 lg:p-10 shadow-[0_28px_72px_rgba(4,12,28,0.42)]"
        >
          {/* Decorative Gold Border Highlight Overlay (Retriggers smoothly on open/switch without remounting widgets) */}
          {isOpen && (
            <div
              key={`panel-highlight-${panelHighlightNonce}`}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl ggt-booking-panel-highlight z-0"
            />
          )}

          {/* Decorative Animated Top Gold Accent Line (Strictly Sibling) */}
          <div
            aria-hidden="true"
            className="ggt-panel-gold-line pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0b1d3a] via-[#d1a847] to-[#fceda2] z-10"
          />

          {/* Subtle Ambient Gold Radial Glow (Strictly Decorative Background Layer) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-radial from-[#d1a847]/16 via-[#d1a847]/5 to-transparent blur-2xl z-0"
          />

          <div className="relative z-10 space-y-6 sm:space-y-8">
            {/* Active Service Header: Exact Hero Icon + Service Name + Short French Description + Close & Back Controls */}
            {displayedCategory && ActiveIcon && activeMeta && (
              <div className="space-y-5">
                <div className="perspective-1200">
                  <header className="ggt-panel-header-anim flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-5">
                    <div className="flex items-start gap-3.5 sm:gap-5 max-w-3xl">
                      {/* Exact Same Service Icon Used in the Hero */}
                      <div className="perspective-1200 shrink-0">
                        <span className="ggt-panel-icon-anim ggt-icon-medallion w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#071429] border-2 border-[#d1a847] text-[#fceda2] flex items-center justify-center">
                          <ActiveIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                        </span>
                      </div>

                      <div className="space-y-1 min-w-0">
                        <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                          {ui.bookingDeskEyebrow}
                        </div>
                        <h2 className="font-serif-crest text-xl sm:text-2xl lg:text-[2rem] font-semibold text-[#0b1d3a] leading-tight [text-wrap:balance]">
                          {activeMeta.tabLabel}
                        </h2>
                        <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed max-w-2xl">
                          {activeDescription}
                        </p>
                      </div>
                    </div>

                    {/* Accessible Back to Services & Clearly Visible Close Button */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      {onReturnToServices && (
                        <button
                          type="button"
                          onClick={() => triggerSmoothClose(true)}
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 min-h-[44px] rounded-xl bg-[#f5ede0] hover:bg-[#ede1ce] text-[#0b1d3a] border border-[#d1a847]/65 text-xs font-semibold uppercase tracking-[0.11em] transition-colors cursor-pointer whitespace-normal text-center leading-snug"
                        >
                          <ArrowLeft
                            className={`w-3.5 h-3.5 text-[#9a7220] shrink-0 ${
                              isRtl ? 'rotate-180' : ''
                            }`}
                          />
                          <span>{ui.backToServicesLabel}</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => triggerSmoothClose(false)}
                        aria-label={ui.closeLabel}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[44px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.12em] shadow-sm transition-colors cursor-pointer whitespace-normal text-center leading-snug"
                      >
                        <X className="w-4 h-4 text-[#d1a847] shrink-0" />
                        <span>{ui.closeLabel}</span>
                      </button>
                    </div>
                  </header>
                </div>

                <div
                  aria-hidden="true"
                  className="ggt-panel-divider-anim h-px w-full bg-gradient-to-r from-[#d1a847]/80 via-[#c59b38]/40 to-transparent"
                />
              </div>
            )}

            {/* Single Active Service Content (Other previously visited services remain cleanly parked in `hidden`) */}
            {visitedCategories.map((catId) => {
              const isCurrent = displayedCategory === catId;
              return (
                <div
                  key={catId}
                  data-service-slot={catId}
                  className={isCurrent ? 'block' : 'hidden'}
                  aria-hidden={!isCurrent}
                >
                  {renderCategoryContentById(catId)}
                </div>
              );
            })}

            {/* Bottom Convenient Close & Navigation Row (Especially helpful on mobile after interacting with widgets) */}
            {displayedCategory && (
              <div className="pt-5 border-t border-[#d1a847]/35 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {onOpenServicePage &&
                (displayedCategory === 'flights' ||
                  displayedCategory === 'hotels' ||
                  displayedCategory === 'umrah' ||
                  displayedCategory === 'holidays') ? (
                  <button
                    type="button"
                    onClick={() => onOpenServicePage(SEARCH_CATEGORY_TO_SERVICE[displayedCategory])}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#9a7220] hover:text-[#0b1d3a] transition-colors cursor-pointer whitespace-normal text-start leading-snug self-start sm:self-auto"
                  >
                    <span>{pack.openDedicatedPage}</span>
                    <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[#2c405e]/80">
                    Golden Group Travels · {activeMeta?.tabLabel}
                  </span>
                )}

                <div className="flex flex-wrap items-center gap-2.5">
                  {onReturnToServices && (
                    <button
                      type="button"
                      onClick={() => triggerSmoothClose(true)}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[44px] rounded-xl bg-[#f5ede0] hover:bg-[#ede1ce] text-[#0b1d3a] border border-[#d1a847]/65 text-xs font-semibold uppercase tracking-[0.11em] transition-colors cursor-pointer whitespace-normal text-center leading-snug"
                    >
                      <ArrowLeft
                        className={`w-3.5 h-3.5 text-[#9a7220] shrink-0 ${
                          isRtl ? 'rotate-180' : ''
                        }`}
                      />
                      <span>{ui.backToServicesLabel}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => triggerSmoothClose(false)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[44px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.12em] transition-colors cursor-pointer whitespace-normal text-center leading-snug"
                  >
                    <X className="w-4 h-4 text-[#d1a847] shrink-0" />
                    <span>{ui.closeLabel}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
