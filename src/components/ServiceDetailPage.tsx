import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, MapPin } from 'lucide-react';
import {
  Language,
  SERVICE_ORDER,
  SERVICE_THEME_MEDIA,
  ServiceId
} from '../assets/destinations';
import { SERVICE_PAGE_CHROME, SERVICE_PAGE_DETAILS } from '../assets/servicePagesData';
import { TranslationPack } from '../i18n';
import { AnimatedServiceMedia } from './AnimatedServiceMedia';
import { SERVICE_ICONS } from './ServiceIcons';
import { TravelPlannerMapSection } from './TravelPlannerMapSection';

interface ServiceDetailPageProps {
  serviceId: ServiceId;
  t: TranslationPack;
  lang: Language;
  isRtl: boolean;
  onSelectPage: (page: 'home' | ServiceId) => void;
  destinationLocation: string;
  onDestinationLocationChange: (val: string) => void;
  hotelName: string;
  onHotelNameChange: (val: string) => void;
  mapFocusCoords: { lat: number; lng: number };
  onMapFocusCoordsChange: (coords: { lat: number; lng: number }) => void;
  onReturnToHero: () => void;
  whatsappInternational: string;
  displayPhone: string;
  agencyMapsUrl: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceId,
  t,
  lang,
  isRtl,
  onSelectPage,
  destinationLocation,
  onDestinationLocationChange,
  hotelName,
  onHotelNameChange,
  mapFocusCoords,
  onMapFocusCoordsChange,
  onReturnToHero,
  whatsappInternational,
  displayPhone,
  agencyMapsUrl
}) => {
  const [showOmraCalligraphy, setShowOmraCalligraphy] = useState(serviceId === 'hajj-umrah');

  useEffect(() => {
    setShowOmraCalligraphy(serviceId === 'hajj-umrah');
  }, [serviceId]);

  const chrome = SERVICE_PAGE_CHROME[lang];
  const serviceMeta = t.servicesSection.services[serviceId];
  const detail = SERVICE_PAGE_DETAILS[lang][serviceId];
  const media = SERVICE_THEME_MEDIA[serviceId];
  const Icon = SERVICE_ICONS[serviceId];
  const serviceIdx = SERVICE_ORDER.indexOf(serviceId);
  const indexTag = `0${serviceIdx + 1}`;
  const isOmra = serviceId === 'hajj-umrah';

  const scrollToPlanner = () => {
    const el = document.getElementById('planner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-cream-paper min-h-screen">
      {/* Top Service Navigation & Back Bar */}
      <div className="bg-[#ede1ce]/90 border-b border-[#d1a847]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onSelectPage('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] hover:text-[#9a7220] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <ArrowLeft className={`w-4 h-4 text-[#c59b38] ${isRtl ? 'rotate-180' : ''}`} />
            <span>{chrome.backToHome}</span>
          </button>

          {/* Direct Dedicated Page Switcher Tabs */}
          <nav
            aria-label="Dedicated Service Pages"
            className="flex items-center gap-1.5 overflow-x-auto max-w-full py-0.5"
          >
            {SERVICE_ORDER.map((srvId) => {
              const TabIcon = SERVICE_ICONS[srvId];
              const tabLabel = t.servicesSection.services[srvId].label;
              const isCurrent = srvId === serviceId;
              return (
                <button
                  key={srvId}
                  type="button"
                  onClick={() => onSelectPage(srvId)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isCurrent
                      ? 'bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847]'
                      : 'text-[#0b1d3a]/80 hover:text-[#0b1d3a] hover:bg-[#fcf9f2]'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
                  <span>{tabLabel}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Dedicated Full-Bleed Animated Hero Banner for This Specific Service */}
      <section className="relative overflow-hidden border-b border-[#d1a847]/45">
        <AnimatedServiceMedia
          src={media.image}
          alt={serviceMeta.headline}
          fallbackGradient={media.fallbackGradient}
          aspectClass="h-[460px] sm:h-[520px] md:h-[560px]"
          variant="slow"
        >
          {/* Contrast Scrim */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#071429]/94 via-[#0b1d3a]/62 to-[#071429]/45"
          />

          {/* Centered Interactive Gold Arabic Calligraphy for Dedicated Hajj & Umrah Page */}
          {isOmra && showOmraCalligraphy && (
            <div className="absolute inset-x-4 top-8 sm:top-12 flex justify-center pointer-events-none z-10">
              <div
                lang="ar"
                dir="rtl"
                className="font-arabic-calligraphy text-3xl sm:text-5xl md:text-6xl font-bold text-[#fceda2] drop-shadow-[0_6px_24px_rgba(7,20,41,0.98)] leading-relaxed text-center"
              >
                {t.horizonsSection.omraTalbiyah}
              </div>
            </div>
          )}

          {/* Bottom-Aligned Hero Headline, Gold Icon Medallion & Action */}
          <div className="absolute inset-x-0 bottom-0 z-20 max-w-7xl mx-auto px-5 sm:px-8 pb-10 sm:pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5 max-w-3xl">
              <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0b1d3a]/95 border-2 border-[#d1a847] text-[#d1a847] flex items-center justify-center shadow-[0_14px_34px_rgba(7,20,41,0.55)] shrink-0">
                <Icon className="w-9 h-9 sm:w-11 sm:h-11" />
              </span>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#fceda2] font-semibold">
                  <span className="tabular-nums">{indexTag}</span>
                  <span aria-hidden="true">·</span>
                  <span>{t.servicesSection.provisionTag}</span>
                </div>
                <h1 className="font-serif-crest text-3xl sm:text-4xl md:text-5xl font-semibold text-[#fcf9f2] tracking-wide [text-wrap:balance]">
                  {serviceMeta.label}
                </h1>
                <p className="text-sm sm:text-base text-[#f5ede0]/90 font-serif-display italic leading-relaxed">
                  {detail.tagline}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {isOmra && (
                <button
                  type="button"
                  onClick={() => setShowOmraCalligraphy((prev) => !prev)}
                  className="px-4 py-3 rounded-xl bg-[#0b1d3a]/90 hover:bg-[#132d56] border border-[#d1a847]/70 text-[#fceda2] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
                >
                  {chrome.omraToggleHint}
                </button>
              )}

              <button
                type="button"
                onClick={scrollToPlanner}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.15em] shadow-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{chrome.bookNowCta}</span>
              </button>
            </div>
          </div>
        </AnimatedServiceMedia>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20 space-y-16 sm:space-y-20">
        {/* Editorial Narrative + Included Quick Checklist */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-serif-crest text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
              {serviceMeta.headline}
            </h2>
            <div className="w-16 h-px bg-[#c59b38]" />
            <p className="text-base sm:text-lg text-[#2c405e] leading-[1.8]">
              {detail.overview}
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#fcf9f2] border border-[#d1a847]/45 rounded-2xl p-6 sm:p-8 shadow-[0_14px_34px_rgba(11,29,58,0.08)] space-y-4">
            <div className="text-xs uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
              {serviceMeta.label} · {t.servicesSection.provisionTag}
            </div>
            <ul className="space-y-3">
              {serviceMeta.includedDetails.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-[#0b1d3a] leading-relaxed"
                >
                  <Check className="w-4 h-4 text-[#c59b38] shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={scrollToPlanner}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/60 text-xs font-semibold uppercase tracking-[0.16em] transition-colors cursor-pointer"
            >
              <span>{chrome.bookNowCta}</span>
              <ArrowRight className={`w-3.5 h-3.5 text-[#d1a847] ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </section>

        {/* Detailed Highlights 2x2 Grid */}
        <section className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.24em] text-[#9a7220] font-semibold">
              {indexTag} · {serviceMeta.label}
            </p>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a]">
              {chrome.highlightsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {detail.highlights.map((feat, idx) => (
              <div
                key={idx}
                className="bg-[#fcf9f2] border border-[#d1a847]/40 rounded-2xl p-6 sm:p-7 shadow-[0_10px_28px_rgba(11,29,58,0.06)] space-y-2"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7220] tabular-nums">
                  0{idx + 1}
                </div>
                <h3 className="font-serif-crest text-xl font-semibold text-[#0b1d3a]">
                  {feat.title}
                </h3>
                <p className="text-sm text-[#2c405e] leading-relaxed">{feat.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3-Step Journey Coordination Process */}
        <section className="bg-[#0b1d3a] text-[#f5ede0] rounded-2xl p-7 sm:p-10 border border-[#d1a847]/55 shadow-[0_20px_48px_rgba(11,29,58,0.2)] space-y-8">
          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.24em] text-[#d1a847] font-semibold">
              {serviceMeta.label}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#fcf9f2]">
              {chrome.processTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {detail.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-xl bg-[#071429]/85 border border-[#d1a847]/35 space-y-2.5"
              >
                <div className="font-serif-crest text-2xl font-semibold text-[#fceda2] tabular-nums">
                  0{idx + 1}
                </div>
                <h3 className="font-serif-crest text-lg font-semibold text-[#fcf9f2]">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Animated Photography Gallery Strip (3 Curated Animated Frames) */}
        <section className="space-y-6">
          <div className="space-y-1.5">
            <div className="text-xs uppercase tracking-[0.24em] text-[#9a7220] font-semibold">
              {serviceMeta.label}
            </div>
            <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a]">
              {chrome.galleryTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {media.galleryImages.map((imgSrc, idx) => (
              <AnimatedServiceMedia
                key={idx}
                src={imgSrc}
                alt={`${serviceMeta.label} ${idx + 1}`}
                fallbackGradient={media.fallbackGradient}
                variant={idx % 2 === 0 ? 'slow' : 'alt'}
                className="rounded-2xl border border-[#d1a847]/45 shadow-[0_14px_34px_rgba(11,29,58,0.1)]"
              />
            ))}
          </div>
        </section>
      </div>

      {/* Dedicated Booking Form & Connected Google Maps Section for This Service */}
      <TravelPlannerMapSection
        t={t}
        lang={lang}
        isRtl={isRtl}
        activeService={serviceId}
        onSelectService={(nextId) => onSelectPage(nextId)}
        destinationLocation={destinationLocation}
        onDestinationLocationChange={onDestinationLocationChange}
        hotelName={hotelName}
        onHotelNameChange={onHotelNameChange}
        mapFocusCoords={mapFocusCoords}
        onMapFocusCoordsChange={onMapFocusCoordsChange}
        onReturnToHero={() => {
          onSelectPage('home');
          onReturnToHero();
        }}
        whatsappInternational={whatsappInternational}
        displayPhone={displayPhone}
        agencyMapsUrl={agencyMapsUrl}
      />
    </div>
  );
};
