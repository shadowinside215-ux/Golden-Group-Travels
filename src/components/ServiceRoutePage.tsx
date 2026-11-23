import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Check, MapPin, ShieldCheck } from 'lucide-react';
import { Language, SERVICE_THEME_MEDIA } from '../assets/destinations';
import { SEARCH_ENGINE_PACKS } from '../assets/searchEngineData';
import { SERVICE_PAGE_CHROME } from '../assets/servicePagesData';
import {
  SEARCH_CATEGORY_ORDER,
  SEARCH_CATEGORY_TO_SERVICE,
  SERVICE_CATEGORY_ROUTES,
  SearchCategoryId
} from '../config/travelSuppliers';
import { trackServiceSelection, ServiceSelectionEventName } from '../utils/analytics';
import { HERO_CATEGORY_ICONS } from './ServiceIcons';
import { TravelSearchEngine } from './TravelSearchEngine';
import { UmrahPackageSection } from './UmrahPackageSection';
import { CairoTourSection } from './CairoTourSection';

gsap.registerPlugin(ScrollTrigger);

interface ServiceRoutePageProps {
  category: SearchCategoryId;
  lang: Language;
  isRtl: boolean;
  whatsappInternational: string;
  displayPhone: string;
  onJumpToHomePlanner: () => void;
}

interface RouteHeaderCopy {
  eyebrow: string;
  backToHome: string;
  descriptions: Record<SearchCategoryId, string>;
  sejoursExtras: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: { title: string; detail: string }[];
  };
  trustNote: Record<SearchCategoryId, string>;
}

const ROUTE_COPY: Record<Language, RouteHeaderCopy> = {
  fr: {
    eyebrow: 'Espace Service Dédié · Golden Group Travels',
    backToHome: 'Retour à l’accueil',
    descriptions: {
      flights:
        'Recherchez et comparez les vols internationaux en temps réel auprès de nos partenaires officiels ou demandez un devis multi-destinations à notre agence.',
      hotels:
        'Explorez des hôtels, riads et établissements vérifiés dans le monde entier via notre moteur hôtelier officiel.',
      umrah:
        'Découvrez nos deux programmes officiels distincts — Omra Rajab (à partir de 14 500 MAD / personne) et Omra Istanbul (à partir de 18 500 MAD / personne) — et demandez les disponibilités directement auprès de notre agence à Salé.',
      holidays:
        'Concevez votre séjour ou voyage organisé sur mesure (vol, hébergement, transferts et programme) avec l’accompagnement de nos conseillers.',
      tours:
        'Accédez aux catalogues complets d’activités et circuits Klook & KKday, demandez un circuit privé sur WhatsApp ou explorez nos sélections partenaires.',
      'car-transfers':
        'Comparez les véhicules de location via nos moteurs partenaires ou réservez votre transfert privé porte-à-porte depuis l’aéroport.'
    },
    sejoursExtras: {
      eyebrow: 'Savoir-Faire Golden Group',
      title: 'Des Séjours Sur Mesure Sans Forfaits Fictifs',
      subtitle:
        'Chaque proposition est assemblée en direct selon vos dates réelles, votre aéroport de départ et vos préférences d’hôtel.',
      cards: [
        {
          title: 'Vol + Hôtel + Transferts Coordonnés',
          detail:
            'Itinéraires complets vérifiés en temps réel auprès des compagnies aériennes et hôteliers.'
        },
        {
          title: 'Familles, Couples & Groupes',
          detail:
            'Chambres communicantes, voyages de noces ou séjours scolaires adaptés à votre rythme.'
        },
        {
          title: 'Devis Transparent à Salé & WhatsApp',
          detail:
            'Tarification claire communiquée directement par nos conseillers avant toute confirmation.'
        }
      ]
    },
    trustNote: {
      flights: 'Tarifs et réservations traités directement par les partenaires aériens officiels.',
      hotels: 'Disponibilités et confirmations traitées directement via notre partenaire hôtelier.',
      umrah: 'Organisation et encadrement assurés directement par Golden Group Travels (Salé).',
      holidays: 'Programmes personnalisés et vérifiés en direct par nos conseillers.',
      tours: 'Billetterie et activités issues des partenaires officiels Klook, KKday, Tiqets et WeGoTrip.',
      'car-transfers': 'Véhicules et transferts proposés en direct par chaque fournisseur spécialisé.'
    }
  },
  ar: {
    eyebrow: 'صفحة الخدمة المخصصة · جولدن جروب',
    backToHome: 'العودة إلى الرئيسية',
    descriptions: {
      flights:
        'ابحث وقارن رحلات الطيران الدولية مباشرة عبر شركائنا الرسميين أو اطلب عرض سعر مخصصاً من وكالتنا.',
      hotels:
        'تصفح الفنادق والإقامات الموثوقة حول العالم عبر محرك البحث الفندقي الرسمي.',
      umrah:
        'اطلع على برنامجينا الرسميين المنفصلين — عمرة رجب (ابتداءً من 14,500 درهم / للشخص) وعمرة إسطنبول (ابتداءً من 18,500 درهم / للشخص) — وتواصل مباشرة مع وكالتنا بسلا.',
      holidays:
        'صمّم رحلتك وعطلتك المتكاملة حسب التواريخ والميزانية المفضلة مع مستشاري جولدن جروب.',
      tours:
        'تصفح بوابات الأنشطة والجولات الكاملة أو اطلب جولة خاصة عبر واتساب واكتشف عروض الشركاء أدناه.',
      'car-transfers':
        'قارن عروض تأجير السيارات العالمية والمحلية أو احجز خدمة التوصيل الخاص من وإلى المطار.'
    },
    sejoursExtras: {
      eyebrow: 'خبرة جولدن جروب',
      title: 'عطلات مفصّلة دون عروض وهمية',
      subtitle: 'يتم إعداد كل عرض بناءً على التوافر الفعلي لتواريخ سفرك.',
      cards: [
        {
          title: 'طيران + فندق + تنقلات منسّقة',
          detail: 'تنظيم موحد مع التحقق المباشر من المقاعد والغرف.'
        },
        {
          title: 'للعائلات والأزواج والمجموعات',
          detail: 'غرف متصلة وبرامج تناسب وتيرة رحلتكم.'
        },
        {
          title: 'عرض سعر واضح عبر واتساب والوكالة',
          detail: 'تأكيد مباشر للأسعار والشروط مع فريقنا بسلا.'
        }
      ]
    },
    trustNote: {
      flights: 'الأسعار والحجوزات تتم مباشرة عبر مزوّدي الطيران الرسميين.',
      hotels: 'التوفر والتأكيد مباشرة عبر شريك الحجز الفندقي.',
      umrah: 'تنظيم وإشراف مباشر من وكالة جولدن جروب بسلا.',
      holidays: 'عروض عطلات يتم التحقق من توفرها مباشرة مع مستشارينا.',
      tours: 'تذاكر وأنشطة عبر شركائنا الرسميين دون أسعار مختلقة.',
      'car-transfers': 'تأجير السيارات والنقل يتم مباشرة عبر كل مزوّد مختص.'
    }
  },
  en: {
    eyebrow: 'Dedicated Service Page · Golden Group Travels',
    backToHome: 'Back to Home',
    descriptions: {
      flights:
        'Search and compare live international flight fares with our official partners or request a multi-city itinerary from our agency.',
      hotels:
        'Browse verified hotels and accommodations worldwide through our official live hotel search partner.',
      umrah:
        'Explore our two separate official offerings — Omra Rajab (from 14,500 MAD / person) and Omra Istanbul (from 18,500 MAD / person) — and confirm availability directly with our Salé team.',
      holidays:
        'Request a tailor-made holiday package combining flights, chosen stays, and private transfers.',
      tours:
        'Access full Klook & KKday activity catalogs, send a private tour request on WhatsApp, or browse partner highlights below.',
      'car-transfers':
        'Compare global and local car rental engines or book a private door-to-door airport transfer.'
    },
    sejoursExtras: {
      eyebrow: 'Golden Group Craftsmanship',
      title: 'Tailored Holidays Verified in Real Time',
      subtitle:
        'Every holiday proposal is built around live flight schedules and genuine hotel availability.',
      cards: [
        {
          title: 'Coordinated Flight + Hotel + Transfers',
          detail: 'End-to-end itinerary planning without hidden markups.'
        },
        {
          title: 'Families, Couples & Private Groups',
          detail: 'Connecting rooms, honeymoons, and curated cultural escapes.'
        },
        {
          title: 'Transparent Advisor Confirmation',
          detail: 'Clear pricing verified directly by our Salé travel desk before booking.'
        }
      ]
    },
    trustNote: {
      flights: 'Fares and bookings are processed directly by official flight partners.',
      hotels: 'Rates and availability come directly from our official hotel partner.',
      umrah: 'Coordinated directly by Golden Group Travels in Salé.',
      holidays: 'Real availability verified directly by our advisors—zero synthetic prices.',
      tours: 'Official partner portals and curated selections from Klook, KKday, Tiqets, and WeGoTrip.',
      'car-transfers': 'Live availability and booking terms handled directly by each mobility provider.'
    }
  },
  es: {
    eyebrow: 'Página de Servicio Dedicada · Golden Group Travels',
    backToHome: 'Volver al Inicio',
    descriptions: {
      flights:
        'Busca y compara tarifas aéreas en tiempo real con nuestros socios oficiales o solicita un itinerario a medida.',
      hotels:
        'Explora hoteles y alojamientos verificados en todo el mundo mediante nuestro buscador oficial.',
      umrah:
        'Consulta nuestros dos programas oficiales por separado — Omra Rajab (desde 14 500 MAD / persona) y Omra Istanbul (desde 18 500 MAD / persona) — y confirma disponibilidad con nuestra agencia en Salé.',
      holidays:
        'Diseña un paquete vacacional a medida combinando vuelos, hoteles elegidos y traslados privados.',
      tours:
        'Accede a los portales completos de Klook y KKday, solicita un circuito privado por WhatsApp o explora las selecciones inferiores.',
      'car-transfers':
        'Compara coches de alquiler globales y locales o reserva tu traslado privado desde el aeropuerto.'
    },
    sejoursExtras: {
      eyebrow: 'Sello Golden Group',
      title: 'Vacaciones a Medida con Disponibilidad Real',
      subtitle: 'Cada viaje se construye según fechas y plazas reales verificadas por nuestro equipo.',
      cards: [
        {
          title: 'Vuelo + Hotel + Traslados Coordinados',
          detail: 'Itinerarios completos adaptados a tus fechas exactas.'
        },
        {
          title: 'Familias, Parejas y Grupos',
          detail: 'Opciones flexibles para lunas de miel o viajes familiares.'
        },
        {
          title: 'Presupuesto Claro en Salé y WhatsApp',
          detail: 'Confirmación transparente de disponibilidad antes de reservar.'
        }
      ]
    },
    trustNote: {
      flights: 'Tarifas y reservas gestionadas directamente por socios oficiales de vuelos.',
      hotels: 'Disponibilidad y precios procedentes directamente de nuestro socio hotelero.',
      umrah: 'Organización directa de Golden Group Travels en Salé.',
      holidays: 'Disponibilidad verificada en directo por nuestros asesores.',
      tours: 'Portales y selecciones oficiales de Klook, KKday, Tiqets y WeGoTrip.',
      'car-transfers': 'Disponibilidad y condiciones gestionadas por cada socio de movilidad.'
    }
  }
};

const ROUTE_ANALYTICS_EVENTS: Record<SearchCategoryId, ServiceSelectionEventName> = {
  flights: 'flights_selected',
  hotels: 'hotels_selected',
  umrah: 'umrah_selected',
  holidays: 'holidays_selected',
  tours: 'tours_selected',
  'car-transfers': 'car_rentals_selected'
};

export const ServiceRoutePage: React.FC<ServiceRoutePageProps> = ({
  category,
  lang,
  isRtl,
  whatsappInternational,
  displayPhone,
  onJumpToHomePlanner
}) => {
  const pageRootRef = useRef<HTMLDivElement>(null);
  const pack = SEARCH_ENGINE_PACKS[lang];
  const chrome = SERVICE_PAGE_CHROME[lang];
  const copy = ROUTE_COPY[lang];
  const categoryMeta = pack.categories[category];
  const HeroIcon = HERO_CATEGORY_ICONS[category];
  const mappedServiceId = SEARCH_CATEGORY_TO_SERVICE[category];
  const themeMedia = SERVICE_THEME_MEDIA[mappedServiceId];

  useEffect(() => {
    trackServiceSelection(ROUTE_ANALYTICS_EVENTS[category]);
  }, [category]);

  // Repeatable Bidirectional ScrollTrigger animations strictly on non-widget UI sections
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

        // Hero entrance (subtle, non-widget header)
        const introHeader = root.querySelector<HTMLElement>('.ggt-route-hero-content');
        if (introHeader) {
          gsap.fromTo(
            introHeader,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', clearProps: 'transform,opacity' }
          );
        }

        root.querySelectorAll<HTMLElement>('.ggt-route-divider').forEach((divider) => {
          gsap.fromTo(
            divider,
            { scaleX: 0.14, opacity: 0.25, transformOrigin: 'center center' },
            {
              scaleX: 1,
              opacity: 1,
              ease: 'none',
              scrollTrigger: { trigger: divider, start: 'top 95%', end: 'top 66%', scrub: 0.5 }
            }
          );
        });

        root.querySelectorAll<HTMLElement>('.ggt-route-card-3d').forEach((card, idx) => {
          const rotY = isDesktop ? (idx % 2 === 0 ? 4.5 : -4.5) : 0;
          gsap.fromTo(
            card,
            isDesktop
              ? { opacity: 0.3, y: 26, scale: 0.96, rotateY: rotY, transformPerspective: 1100 }
              : { opacity: 0.35, y: 16, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateY: 0,
              ease: 'none',
              scrollTrigger: { trigger: card, start: 'top 94%', end: 'top 65%', scrub: 0.55 }
            }
          );
        });
      }
    );

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 220);
    return () => {
      window.clearTimeout(refreshId);
      mm.revert();
    };
  }, [category]);

  return (
    <div ref={pageRootRef} className="bg-cream-paper min-h-screen">
      {/* Top Route Switcher & Prominent Return to Home Bar */}
      <div className="bg-[#ede1ce]/92 border-b border-[#d1a847]/45">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 min-h-[44px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/70 text-xs font-bold uppercase tracking-[0.12em] shadow-sm transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft className={`w-4 h-4 text-[#d1a847] ${isRtl ? 'rotate-180' : ''}`} />
            <span>{copy.backToHome}</span>
          </Link>

          <nav
            aria-label="Navigation des services"
            className="flex items-center gap-1.5 overflow-x-auto max-w-full py-0.5"
          >
            {SEARCH_CATEGORY_ORDER.map((catId) => {
              const TabIcon = HERO_CATEGORY_ICONS[catId];
              const isCurrent = catId === category;
              const routePath = SERVICE_CATEGORY_ROUTES[catId];
              const tabLabel = pack.categories[catId].tabLabel;
              return (
                <Link
                  key={catId}
                  to={routePath}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 ${
                    isCurrent
                      ? 'bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847] shadow-sm'
                      : 'text-[#0b1d3a]/85 hover:text-[#0b1d3a] hover:bg-[#fcf9f2] border border-transparent'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
                  <span>{tabLabel}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Focused Service Hero Header with Exact Matching Hero Icon */}
      <section className="relative overflow-hidden bg-[#071429] text-[#f5ede0] border-b border-[#d1a847]/55">
        <img
          src={themeMedia.image}
          alt={categoryMeta.tabLabel}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#071429]/96 via-[#0b1d3a]/90 to-[#071429]/92"
        />

        <div className="ggt-route-hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5 max-w-3xl">
              <span className="ggt-icon-medallion w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#071429]/95 border-2 border-[#d1a847] text-[#fceda2] flex items-center justify-center shrink-0">
                <HeroIcon className="w-8 h-8 sm:w-10 sm:h-10" />
              </span>

              <div className="space-y-2 min-w-0">
                <div className="text-[11px] uppercase tracking-[0.22em] text-[#d1a847] font-semibold">
                  {copy.eyebrow}
                </div>
                <h1 className="font-serif-crest text-2xl sm:text-4xl lg:text-[2.6rem] font-semibold text-[#fcf9f2] leading-tight [text-wrap:balance]">
                  {categoryMeta.tabLabel}
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed max-w-2xl">
                  {copy.descriptions[category]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#fceda2]/95 bg-[#0b1d3a]/90 border border-[#d1a847]/45 rounded-xl px-4 py-3 self-start md:self-auto shrink-0 max-w-xs">
              <ShieldCheck className="w-4 h-4 text-[#d1a847] shrink-0" />
              <span className="leading-snug">{copy.trustNote[category]}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dedicated Service Content Area */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-12">
        {category === 'umrah' ? (
          <UmrahPackageSection
            lang={lang}
            isRtl={isRtl}
            whatsappInternational={whatsappInternational}
            displayPhone={displayPhone}
            onJumpToPlanner={onJumpToHomePlanner}
          />
        ) : (
          <TravelSearchEngine
            key={`route-engine-${category}`}
            lang={lang}
            isRtl={isRtl}
            activeCategory={category}
            onCategoryChange={() => {}}
            onJumpToPlanner={onJumpToHomePlanner}
            whatsappInternational={whatsappInternational}
            displayPhone={displayPhone}
            visibleCategories={[category]}
            embeddedOnServicePage
          />
        )}

        {/* Clearly Separated Official Agency Organized Tour Section for /circuits-activites */}
        {category === 'tours' && (
          <>
            <div className="ggt-route-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/65 to-transparent" />
            <CairoTourSection lang={lang} isRtl={isRtl} />
          </>
        )}

        {/* Supporting Editorial Cards exclusively for Séjours (/sejours) without fake packages */}
        {category === 'holidays' && (
          <section className="pt-2 space-y-6">
            <div className="ggt-route-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/55 to-transparent" />

            <div className="space-y-1.5 max-w-3xl">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
                {copy.sejoursExtras.eyebrow}
              </div>
              <h3 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a]">
                {copy.sejoursExtras.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#2c405e]">{copy.sejoursExtras.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {copy.sejoursExtras.cards.map((card, idx) => (
                <div
                  key={idx}
                  className="ggt-route-card-3d rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/45 p-6 shadow-[0_12px_30px_rgba(11,29,58,0.06)] space-y-2.5"
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#9a7220]">
                    <Check className="w-4 h-4 text-[#c59b38]" />
                    <span>0{idx + 1}</span>
                  </div>
                  <h4 className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
                    {card.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">{card.detail}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Clearly Visible Return to Home & Map Planner Bar */}
        <div className="ggt-route-divider h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/55 to-transparent" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.14em] shadow-md transition-colors"
          >
            <ArrowLeft className={`w-4 h-4 text-[#d1a847] ${isRtl ? 'rotate-180' : ''}`} />
            <span>{chrome.backToHome}</span>
          </Link>

          <button
            type="button"
            onClick={onJumpToHomePlanner}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#fcf9f2] hover:bg-[#ede1ce] text-[#0b1d3a] border border-[#d1a847]/65 text-xs font-semibold uppercase tracking-[0.12em] transition-colors cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#c59b38] shrink-0" />
            <span>{chrome.bookNowCta}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
