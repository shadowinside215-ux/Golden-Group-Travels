import React, { useCallback, useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  MapPin,
  Phone,
  Mail,
  ChevronUp,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { BrandLoadingScreen } from './components/BrandLoadingScreen';
import { CinematicPlaneStage } from './components/CinematicPlaneStage';
import { AnimatedServiceMedia } from './components/AnimatedServiceMedia';
import { SERVICE_ICONS } from './components/ServiceIcons';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { TravelPlannerMapSection } from './components/TravelPlannerMapSection';
import {
  HeroCategoryId,
  Language,
  SERVICE_ORDER,
  SERVICE_THEME_MEDIA,
  ServiceId
} from './assets/destinations';
import { SERVICE_PAGE_CHROME } from './assets/servicePagesData';
import { LANGUAGES, translations } from './i18n';

const WHATSAPP_PHONE_INTERNATIONAL = '212666484815';
const DISPLAY_PHONE = '0666-484815';
const AGENCY_EMAIL = 'Info@goldengrouptravels.com';
const AGENCY_ADDRESS =
  'Kissariat Salima 3, Immeuble 1, Boutique N° 8, Résidence Salima 3, Hay el Qods, Avenue du 6 Novembre, Salé 11000';
const GOOGLE_MAPS_URL = 'https://share.google/zSUmgcBtIW0vHzmXQ';
const INSTAGRAM_URL =
  'https://www.instagram.com/goldengrouptravels/?utm_source=ig_web_button_share_sheet';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61596136568520';

const WhatsAppIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

function parseHashPage(): 'home' | ServiceId {
  if (typeof window === 'undefined') return 'home';
  const raw = window.location.hash.replace(/^#/, '');
  if (raw.startsWith('service/')) {
    const id = raw.slice('service/'.length) as ServiceId;
    if (SERVICE_ORDER.includes(id)) return id;
  }
  return 'home';
}

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [floatingLangOpen, setFloatingLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [activePage, setActivePage] = useState<'home' | ServiceId>('home');
  const [activeService, setActiveService] = useState<ServiceId>('hotel-reservations');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [mapFocusCoords, setMapFocusCoords] = useState<{ lat: number; lng: number }>({
    lat: 21.4225,
    lng: 39.8262
  });

  const [showSplash, setShowSplash] = useState(true);
  const [heroAnimationReady, setHeroAnimationReady] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  const handleSplashStartReveal = useCallback(() => {
    setHeroAnimationReady(true);
  }, []);

  const handleSplashFinished = useCallback(() => {
    setShowSplash(false);
  }, []);

  const t = translations[lang];
  const chrome = SERVICE_PAGE_CHROME[lang];
  const isRtl = t.dir === 'rtl';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  // Always guarantee initial load opens on the Home hero screen (never jump directly into a service page)
  useEffect(() => {
    if (window.location.hash.startsWith('#service/')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });

    const onPopState = () => {
      const next = parseHashPage();
      setActivePage(next);
      if (next !== 'home') {
        setActiveService(next);
        setMapFocusCoords(SERVICE_THEME_MEDIA[next].defaultCoordinates);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const onQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -48px 0px', threshold: 0.08 }
    );

    const els = document.querySelectorAll('.reveal-init');
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activePage]);

  const scrollToId = (id: string) => {
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 40);
  };

  const openPage = (page: 'home' | ServiceId, sectionIdAfter?: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);

    if (page === 'home') {
      if (window.location.hash.startsWith('#service/')) {
        window.history.pushState(null, '', window.location.pathname + window.location.search);
      }
      if (sectionIdAfter) {
        scrollToId(sectionIdAfter);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setActiveService(page);
      setMapFocusCoords(SERVICE_THEME_MEDIA[page].defaultCoordinates);
      if (page === 'hajj-umrah' && !destinationLocation.trim()) {
        setDestinationLocation(t.horizonsSection.destinations.makkah.title);
      }
      window.history.pushState({ servicePage: page }, '', `#service/${page}`);
      if (sectionIdAfter) {
        scrollToId(sectionIdAfter);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleHeroCategoryClick = (categoryId: HeroCategoryId) => {
    if (categoryId === 'flights') {
      openPage('flight-bookings');
    } else if (categoryId === 'hotels') {
      openPage('hotel-reservations');
    } else {
      openPage('holiday-packages');
    }
  };

  const handleHeroOmraClick = () => {
    openPage('hajj-umrah');
  };

  return (
    <div
      dir={t.dir}
      lang={lang}
      className={`min-h-screen bg-[#f5ede0] text-[#0b1d3a] flex flex-col ${
        isRtl ? 'text-right' : 'text-left'
      }`}
    >
      {showSplash && (
        <BrandLoadingScreen
          onStartReveal={handleSplashStartReveal}
          onFinished={handleSplashFinished}
        />
      )}

      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Primary Full-Viewport 3D GSAP Paper-Cutting Plane Cinema Stage on Home */}
      {activePage === 'home' && (
        <CinematicPlaneStage
          lang={lang}
          readyToAnimate={heroAnimationReady}
          onSelectHeroCategory={handleHeroCategoryClick}
          onSelectOmra={handleHeroOmraClick}
          onExploreBelow={() => scrollToId('services')}
        />
      )}

      {/* Sticky Top Strip + Navigation Bar (Official Logo ONLY + 4 Languages + Verified Info) */}
      <header className="sticky top-0 z-30 bg-[#fbf7ee]/96 border-y border-[#d1a847]/40 shadow-[0_8px_28px_rgba(11,29,58,0.07)]">
        {/* Compact Navy & Gold Contact Strip */}
        <div className="bg-[#0b1d3a] text-[#f5ede0] text-[11px] sm:text-xs border-b border-[#d1a847]/35">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 h-7 sm:h-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Facebook"
                  className="text-[#d1a847] hover:text-[#fceda2] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.69 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Instagram"
                  className="text-[#d1a847] hover:text-[#fceda2] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
              <span className="w-px h-3 bg-[#d1a847]/35 hidden sm:inline-block" />
              <a
                href={`mailto:${AGENCY_EMAIL}`}
                className="flex items-center gap-1.5 text-[#f5ede0]/90 hover:text-[#fceda2] truncate transition-colors"
              >
                <Mail className="w-3 h-3 text-[#d1a847] shrink-0" />
                <span className="truncate">{AGENCY_EMAIL}</span>
              </a>
            </div>

            <a
              href="tel:0666484815"
              className="flex items-center gap-1.5 font-semibold text-[#fceda2] hover:underline whitespace-nowrap shrink-0"
              dir="ltr"
            >
              <Phone className="w-3 h-3 text-[#d1a847]" />
              <span>+212 666-484815</span>
            </a>
          </div>
        </div>

        {/* Main Header Bar: Bigger 1:1 Logo ONLY + Navigation Links + 4 Languages Switcher + CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-[72px] sm:h-24 flex items-center justify-between gap-4 lg:gap-6">
          <button
            type="button"
            onClick={() => openPage('home')}
            className="focus:outline-none cursor-pointer w-14 h-14 sm:w-20 sm:h-20 lg:w-[86px] lg:h-[86px] aspect-square shrink-0 rounded-xl overflow-hidden bg-[#041533] border border-[#d1a847]/55 shadow-md group transition-transform duration-300 hover:scale-105"
            aria-label="Golden Group Travels Home"
          >
            <img
              src="./assets/aistudio/Golden_Group_Travel_Logo__1__824306ae.png"
              alt="Golden Group - Travel Services & Events"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </button>

          <nav
            aria-label="Primary Page Navigation"
            className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#2c405e]"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                openPage('home');
              }}
              className="nav-editorial-link hover:text-[#0b1d3a] whitespace-nowrap shrink-0"
            >
              {chrome.homeNavLabel}
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                openPage('home', 'services');
              }}
              className="nav-editorial-link hover:text-[#0b1d3a] whitespace-nowrap shrink-0"
            >
              {t.nav.services}
            </a>
            <a
              href="#service/hajj-umrah"
              onClick={(e) => {
                e.preventDefault();
                openPage('hajj-umrah');
              }}
              className="nav-editorial-link hover:text-[#0b1d3a] whitespace-nowrap shrink-0"
            >
              {t.servicesSection.services['hajj-umrah'].label}
            </a>
            <a
              href="#planner"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('planner');
              }}
              className="nav-editorial-link hover:text-[#0b1d3a] whitespace-nowrap shrink-0"
            >
              {t.nav.planner}
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('contact');
              }}
              className="nav-editorial-link hover:text-[#0b1d3a] whitespace-nowrap shrink-0"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Desktop 4 Languages Selector + Primary CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <div className="flex items-center bg-[#ede1ce] border border-[#d1a847]/45 rounded-lg p-1 text-xs gap-1">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLang(item.code)}
                  className={`px-2 py-1 rounded font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                    lang === item.code
                      ? 'bg-[#0b1d3a] text-[#fceda2]'
                      : 'text-[#0b1d3a]/80 hover:text-[#0b1d3a] hover:bg-[#fcf9f2]'
                  }`}
                  title={item.name}
                >
                  {item.flag} {item.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToId('planner')}
              className="px-4 py-2 rounded-lg bg-[#0b1d3a] text-[#fceda2] hover:bg-[#132d56] border border-[#d1a847]/50 text-xs font-semibold uppercase tracking-[0.14em] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.nav.curateCta}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#0b1d3a] hover:bg-[#ede1ce] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer with 4 Languages & Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#fbf7ee] border-t border-[#d1a847]/35 px-5 py-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#d1a847]/25">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9a7220]">
                Language / اللغة
              </span>
              <div className="flex items-center bg-[#ede1ce] border border-[#d1a847]/40 rounded-lg p-1 text-xs gap-1">
                {LANGUAGES.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setLang(item.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2 py-1 rounded font-semibold cursor-pointer ${
                      lang === item.code
                        ? 'bg-[#0b1d3a] text-[#fceda2]'
                        : 'text-[#0b1d3a]/80 hover:text-[#0b1d3a]'
                    }`}
                  >
                    {item.flag} {item.label}
                  </button>
                ))}
              </div>
            </div>

            <nav className="flex flex-col space-y-2.5 text-xs font-semibold uppercase tracking-wider text-[#0b1d3a]">
              <button
                type="button"
                onClick={() => openPage('home')}
                className="py-1 text-left rtl:text-right cursor-pointer"
              >
                {chrome.homeNavLabel}
              </button>
              <button
                type="button"
                onClick={() => openPage('home', 'services')}
                className="py-1 text-left rtl:text-right cursor-pointer"
              >
                {t.nav.services}
              </button>
              <button
                type="button"
                onClick={() => openPage('hajj-umrah')}
                className="py-1 text-left rtl:text-right cursor-pointer"
              >
                {t.servicesSection.services['hajj-umrah'].label}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToId('planner');
                }}
                className="py-1 text-left rtl:text-right cursor-pointer"
              >
                {t.nav.planner}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToId('contact');
                }}
                className="py-1 text-left rtl:text-right cursor-pointer"
              >
                {t.nav.contact}
              </button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 bg-cream-paper">
        {activePage !== 'home' ? (
          <ServiceDetailPage
            serviceId={activePage}
            t={t}
            lang={lang}
            isRtl={isRtl}
            onSelectPage={(nextPage) => openPage(nextPage)}
            destinationLocation={destinationLocation}
            onDestinationLocationChange={setDestinationLocation}
            hotelName={hotelName}
            onHotelNameChange={setHotelName}
            mapFocusCoords={mapFocusCoords}
            onMapFocusCoordsChange={setMapFocusCoords}
            onReturnToHero={() => openPage('home', 'hero-stage')}
            whatsappInternational={WHATSAPP_PHONE_INTERNATIONAL}
            displayPhone={DISPLAY_PHONE}
            agencyMapsUrl={GOOGLE_MAPS_URL}
          />
        ) : (
          <>
            {/* Dedicated Services Overview — Animated Photography Cards Opening Each Service's Full Page */}
            <section id="services" className="py-20 md:py-28 max-w-7xl mx-auto px-5 sm:px-8">
              <div className="max-w-3xl mx-auto text-center mb-16 reveal-init">
                <p className="text-xs uppercase tracking-[0.26em] text-[#9a7220] font-semibold mb-3">
                  {t.servicesSection.eyebrow}
                </p>
                <h2 className="font-serif-crest text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0b1d3a] tracking-wide [text-wrap:balance]">
                  {t.servicesSection.title}
                </h2>
                <p className="mt-4 text-sm sm:text-base text-[#2c405e] leading-relaxed">
                  {t.servicesSection.subtitle}
                </p>
                <div className="w-20 h-px bg-[#c59b38]/70 mx-auto mt-6" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
                {SERVICE_ORDER.map((srvId, idx) => {
                  const srv = t.servicesSection.services[srvId];
                  const Icon = SERVICE_ICONS[srvId];
                  const media = SERVICE_THEME_MEDIA[srvId];
                  const isOmra = srvId === 'hajj-umrah';
                  const indexTag = `0${idx + 1}`;
                  const stagger = `stagger-${(idx % 4) + 1}`;

                  return (
                    <article
                      key={srvId}
                      id={`service-${srvId}`}
                      className={`reveal-init ${stagger} rounded-2xl overflow-hidden flex flex-col bg-[#fcf9f2] transition-all duration-300 hover:-translate-y-1 ${
                        isOmra
                          ? 'border-2 border-[#d1a847] shadow-[0_22px_50px_rgba(11,29,58,0.16)]'
                          : 'border border-[#d1a847]/45 shadow-[0_16px_40px_rgba(11,29,58,0.09)] hover:border-[#c59b38]'
                      }`}
                    >
                      {/* Clickable Animated Photography Header */}
                      <button
                        type="button"
                        onClick={() => openPage(srvId)}
                        className="relative w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#d1a847]"
                      >
                        <AnimatedServiceMedia
                          src={media.image}
                          alt={srv.headline}
                          fallbackGradient={media.fallbackGradient}
                          variant={idx % 2 === 0 ? 'slow' : 'alt'}
                          aspectClass="aspect-[16/10]"
                        >
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-[#071429]/90 via-[#0b1d3a]/25 to-transparent"
                          />
                          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3 text-[#fcf9f2]">
                            <div>
                              <div className="text-[11px] uppercase tracking-[0.22em] text-[#fceda2] font-semibold tabular-nums">
                                {indexTag} · {t.servicesSection.provisionTag}
                              </div>
                              <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold mt-0.5">
                                {srv.label}
                              </h3>
                            </div>
                            <span className="w-11 h-11 rounded-xl bg-[#0b1d3a]/95 border border-[#d1a847] text-[#d1a847] flex items-center justify-center shrink-0 shadow-lg">
                              <Icon className="w-6 h-6" />
                            </span>
                          </div>
                        </AnimatedServiceMedia>
                      </button>

                      {/* Card Body & Open Full Page Action */}
                      <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                        <div className="space-y-3">
                          <div className="text-sm font-semibold text-[#0b1d3a]">
                            {srv.headline}
                          </div>
                          <p className="text-xs sm:text-sm text-[#2c405e] leading-[1.7]">
                            {srv.description}
                          </p>
                          <ul className="space-y-2 pt-3 border-t border-[#d1a847]/25">
                            {srv.includedDetails.map((detail, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2.5 text-xs text-[#0b1d3a]"
                              >
                                <Check className="w-3.5 h-3.5 text-[#c59b38] shrink-0 mt-0.5" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          type="button"
                          onClick={() => openPage(srvId)}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/55 text-xs font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer"
                        >
                          <span className="whitespace-nowrap">{chrome.openPageCta}</span>
                          <ArrowRight
                            className={`w-3.5 h-3.5 text-[#d1a847] shrink-0 ${
                              isRtl ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Hairline Gold Divider */}
            <div className="max-w-5xl mx-auto px-8">
              <div className="h-px bg-gradient-to-r from-transparent via-[#c59b38]/50 to-transparent" />
            </div>

            {/* Service-Dynamic Contact & Booking Form Connected with Google Maps */}
            <TravelPlannerMapSection
              t={t}
              lang={lang}
              isRtl={isRtl}
              activeService={activeService}
              onSelectService={setActiveService}
              destinationLocation={destinationLocation}
              onDestinationLocationChange={setDestinationLocation}
              hotelName={hotelName}
              onHotelNameChange={setHotelName}
              mapFocusCoords={mapFocusCoords}
              onMapFocusCoordsChange={setMapFocusCoords}
              onReturnToHero={() => openPage('home', 'hero-stage')}
              whatsappInternational={WHATSAPP_PHONE_INTERNATIONAL}
              displayPhone={DISPLAY_PHONE}
              agencyMapsUrl={GOOGLE_MAPS_URL}
            />
          </>
        )}
      </main>

      {/* Restored Floating Bottom-Left (or Bottom-Right in RTL) 4-Language Switcher */}
      <div className={`fixed bottom-5 z-40 ${isRtl ? 'right-5' : 'left-5'}`}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setFloatingLangOpen(!floatingLangOpen)}
            className="bg-[#0b1d3a] text-white border border-[#d1a847]/65 shadow-[0_8px_28px_rgba(11,29,58,0.34)] hover:border-[#fceda2] px-3.5 py-2 rounded-lg flex items-center gap-2 text-xs sm:text-sm font-bold transition-all hover:scale-105 cursor-pointer"
            aria-label="Select Language"
          >
            <span className="text-base">{LANGUAGES.find((l) => l.code === lang)?.flag}</span>
            <span className="tracking-wide uppercase">
              {LANGUAGES.find((l) => l.code === lang)?.label}
            </span>
            <ChevronUp
              className={`w-3.5 h-3.5 text-[#d1a847] transition-transform ${
                floatingLangOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {floatingLangOpen && (
            <div className="absolute bottom-full mb-2 left-0 rtl:left-auto rtl:right-0 w-44 bg-[#fcf9f2] border border-[#d1a847]/60 rounded-xl shadow-[0_14px_35px_rgba(11,29,58,0.22)] p-1.5 space-y-1 z-50 text-[#0b1d3a]">
              {LANGUAGES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setLang(item.code);
                    setFloatingLangOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    lang === item.code
                      ? 'bg-[#0b1d3a] text-[#fceda2] font-bold'
                      : 'text-[#0b1d3a] hover:bg-[#ede1ce]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.flag}</span>
                    <span>{item.name}</span>
                  </div>
                  {lang === item.code && <CheckCircle2 className="w-3.5 h-3.5 text-[#d1a847]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating WhatsApp Direct Quick Action */}
      <aside
        aria-label="Direct WhatsApp contact"
        className={`fixed bottom-5 z-40 ${isRtl ? 'left-5' : 'right-5'}`}
      >
        <a
          href={`https://wa.me/${WHATSAPP_PHONE_INTERNATIONAL}`}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center justify-center w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_6px_24px_rgba(16,185,129,0.45)] transition-all hover:scale-110 active:scale-95"
          aria-label="Contact Golden Group Travels on WhatsApp at 0666-484815"
          title="WhatsApp: 0666-484815"
        >
          <WhatsAppIcon className="w-5 h-5 fill-current" />
        </a>
      </aside>

      {/* Royal Navy Blue & Gold Footer with Official Logo ONLY + Verified Agency Info */}
      <footer
        id="contact"
        className="bg-[#0b1d3a] text-[#f5ede0] border-t-2 border-[#d1a847]/55 pt-16 pb-20"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand Column: Enlarged Official 1:1 Logo ONLY */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => openPage('home', 'hero-stage')}
                className="inline-block w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 aspect-square rounded-2xl overflow-hidden bg-[#041533] border-2 border-[#d1a847]/60 shadow-lg focus:outline-none cursor-pointer group transition-transform duration-300 hover:scale-105"
                aria-label="Golden Group Travels"
              >
                <img
                  src="./assets/aistudio/Golden_Group_Travel_Logo__1__824306ae.png"
                  alt="Golden Group - Travel Services & Events"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </button>
              <p className="text-xs text-slate-300/90 leading-relaxed">{t.hero.subtitle}</p>

              <div className="pt-1 flex items-center gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE_INTERNATIONAL}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-lg bg-[#071429] border border-[#d1a847]/35 flex items-center justify-center text-emerald-400 hover:border-emerald-400 transition-all hover:scale-105"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg bg-[#071429] border border-[#d1a847]/35 flex items-center justify-center text-slate-200 hover:text-[#d1a847] hover:border-[#d1a847] transition-all hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-lg bg-[#071429] border border-[#d1a847]/35 flex items-center justify-center text-slate-200 hover:text-[#d1a847] hover:border-[#d1a847] transition-all hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.69 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* 5 Main Services Column */}
            <div>
              <div className="font-serif-crest text-base font-semibold text-[#fceda2] tracking-wider uppercase mb-4">
                {t.footer.servicesTitle}
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {SERVICE_ORDER.map((srvId) => (
                  <li key={srvId}>
                    <button
                      type="button"
                      onClick={() => openPage(srvId)}
                      className="hover:text-[#fceda2] transition-colors cursor-pointer"
                    >
                      {t.servicesSection.services[srvId].label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Agency Location & Exact Google Maps */}
            <div className="space-y-3">
              <div className="font-serif-crest text-base font-semibold text-[#fceda2] tracking-wider uppercase mb-4">
                {t.footer.agencyTitle}
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="block p-3.5 rounded-lg bg-[#071429] border border-[#d1a847]/35 hover:border-[#d1a847] transition-colors space-y-2 group"
              >
                <div className="flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#d1a847] shrink-0 mt-0.5" />
                  <span>{AGENCY_ADDRESS}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#fceda2] group-hover:underline ps-6">
                  <span>{t.footer.mapsCta}</span>
                  <ArrowRight className={`w-3 h-3 text-[#d1a847] ${isRtl ? 'rotate-180' : ''}`} />
                </div>
              </a>
            </div>

            {/* Direct Contact Lines */}
            <div className="space-y-3">
              <div className="font-serif-crest text-base font-semibold text-[#fceda2] tracking-wider uppercase mb-4">
                {t.footer.conciergeTitle}
              </div>
              <a
                href="tel:0666484815"
                className="flex items-start gap-2.5 text-white hover:text-[#fceda2] transition-colors group p-2.5 rounded-lg bg-[#071429] border border-[#d1a847]/35 hover:border-[#d1a847]"
              >
                <Phone className="w-4 h-4 text-[#d1a847] shrink-0 mt-1" />
                <div>
                  <div className="font-bold text-base text-[#fceda2] tracking-wider" dir="ltr">
                    {DISPLAY_PHONE}
                  </div>
                  <div className="text-[11px] text-slate-400">{t.footer.phoneDesc}</div>
                </div>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_PHONE_INTERNATIONAL}`}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-start gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors p-2.5 rounded-lg bg-[#071429] border border-emerald-500/35 hover:border-emerald-500"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current shrink-0 mt-1" />
                <div>
                  <div className="font-bold text-sm tracking-wider text-white" dir="ltr">
                    {DISPLAY_PHONE}
                  </div>
                  <div className="text-[11px] text-emerald-400/85">{t.footer.whatsappDesc}</div>
                </div>
              </a>

              <a
                href={`mailto:${AGENCY_EMAIL}`}
                className="flex items-center gap-2 text-xs text-slate-200 hover:text-[#fceda2] transition-colors p-2.5 rounded-lg bg-[#071429] border border-[#d1a847]/30 hover:border-[#d1a847]"
              >
                <Mail className="w-4 h-4 text-[#d1a847] shrink-0" />
                <span className="font-mono text-xs truncate">{AGENCY_EMAIL}</span>
              </a>
            </div>
          </div>

          <div className="pt-7 border-t border-[#d1a847]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div>
              &copy; {new Date().getFullYear()}{' '}
              <strong className="text-slate-200">Golden Group Travels</strong>. {t.footer.rights}
            </div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847]/80">
              {t.footer.discoverLine}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
