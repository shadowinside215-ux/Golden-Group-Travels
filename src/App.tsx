/**
 * Golden Group Travels
 * Premium Global Travel Management
 * Multi-Language: English, French, Spanish, Arabic
 */

import React, { useState } from 'react';
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
  Calendar,
  Users,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Award,
  Headphones,
  Send
} from 'lucide-react';
import { translations, Language } from './translations.ts';

// Clean WhatsApp SVG icon
const WhatsAppIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

// Icons mapping for services
const SERVICE_ICONS: Record<string, typeof Plane> = {
  flights: Plane,
  hotels: Building2,
  visa: FileCheck2,
  insurance: ShieldCheck,
  packages: Palmtree
};

const LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'fr', name: 'Français', flag: 'FR' },
  { code: 'es', name: 'Español', flag: 'ES' },
  { code: 'ar', name: 'العربية', flag: 'عربي' }
];

// Target WhatsApp phone for Golden Group Travels
const WHATSAPP_PHONE_INTERNATIONAL = '212666484815';
const DISPLAY_PHONE = '0666-484815';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const t = translations[lang];
  const isRtl = t.dir === 'rtl';

  // Quick Hero Search Bar State
  const [quickService, setQuickService] = useState('flights');
  const [quickDestination, setQuickDestination] = useState('');
  const [quickDate, setQuickDate] = useState('');
  const [quickTravelers, setQuickTravelers] = useState('1');

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
    return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_INTERNATIONAL}&text=${encodeURIComponent(message)}`;
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

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Anti-bot honeypot check: if bot filled this hidden field, safely ignore
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    setFormLoading(true);

    const waUrl = getWhatsAppUrl();

    // Secure anchor dispatch preventing window.open popup blockers and tabnabbing
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

    setTimeout(() => {
      setFormLoading(false);
      setSubmitted(true);
    }, 400);
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
      {/* Navigation Bar: Sticky header with wordmark, nav links, language selector, and compact icons on its own side */}
      <header className="sticky top-0 z-50 bg-[#0b1d3a]/95 backdrop-blur-md border-b border-[#d1a847]/30 shadow-[0_4px_25px_rgba(4,11,20,0.6)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* Brand Logo & Wordmark */}
          <a href="#" className="flex items-center gap-3 group shrink-0 focus:outline-none">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d1a847] via-[#c59b38] to-[#9a7220] p-0.5 shadow-[0_0_15px_rgba(209,168,71,0.3)] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0b1d3a] rounded-[6px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-[#d1a847] transition-transform duration-500 group-hover:rotate-45" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-wider gold-gradient-text uppercase whitespace-nowrap">
                {isRtl ? 'جولدن جروب ترافيلز' : 'Golden Group Travels'}
              </span>
              <span className="text-[10px] tracking-[0.2em] text-[#d1a847]/80 uppercase -mt-1 font-medium">
                {t.nav.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Clean, Curated Journeys removed as requested) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-200">
            <a href="#services" className="hover:text-[#d1a847] transition-colors whitespace-nowrap">
              {t.nav.services}
            </a>
            <a href="#why-us" className="hover:text-[#d1a847] transition-colors whitespace-nowrap">
              {t.nav.whyUs}
            </a>
            <a href="#consultation" className="hover:text-[#d1a847] transition-colors whitespace-nowrap">
              {t.nav.inquiry}
            </a>
            <a href="#faq" className="hover:text-[#d1a847] transition-colors whitespace-nowrap">
              {t.nav.faq}
            </a>
            <a href="#contact" className="hover:text-[#d1a847] transition-colors whitespace-nowrap">
              {t.nav.contact}
            </a>
          </nav>

          {/* Right Action Zone (On its own side): Language Switcher + Small Phone Icon close to WhatsApp Icon (No bulky button, no phone number in header) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#081528] rounded-lg border border-[#d1a847]/30 p-1 text-[11px]">
              {LANGUAGES.map(item => (
                <button
                  key={item.code}
                  onClick={() => setLang(item.code)}
                  className={`px-2 py-0.5 rounded font-medium transition-all cursor-pointer ${
                    lang === item.code
                      ? 'bg-gradient-to-r from-[#fceda2] via-[#d1a847] to-[#c59b38] text-[#0b1d3a] font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title={item.name}
                >
                  {item.flag}
                </button>
              ))}
            </div>

            {/* Small Contact Icons (Phone icon close to WhatsApp icon, without number) */}
            <div className="flex items-center gap-2">
              <a
                href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_INTERNATIONAL}`}
                target="_blank"
                rel="noreferrer noopener"
                className="w-9 h-9 rounded-lg bg-[#081528] border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 flex items-center justify-center transition-all shadow-xs cursor-pointer"
                title="WhatsApp"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
              </a>

              <a
                href="tel:0666484815"
                className="w-9 h-9 rounded-lg bg-[#081528] border border-[#d1a847]/40 text-[#fceda2] hover:bg-gradient-to-r hover:from-[#fceda2] hover:via-[#d1a847] hover:to-[#c59b38] hover:text-[#0b1d3a] hover:border-[#d1a847] flex items-center justify-center transition-all shadow-xs cursor-pointer"
                title={lang === 'ar' ? 'اتصال هاتفياً' : lang === 'fr' ? 'Appeler' : lang === 'es' ? 'Llamar' : 'Call'}
                aria-label="Call"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-200 hover:text-[#d1a847] hover:bg-[#0f2447] focus:outline-none transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0b1d3a] border-b border-[#d1a847]/30 px-6 py-6 space-y-4 animate-in fade-in duration-200">
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between pb-3 border-b border-[#d1a847]/20">
              <span className="text-xs text-slate-300 font-semibold uppercase tracking-wider">
                Language / اللغة
              </span>
              <div className="flex items-center bg-[#081528] rounded-md border border-[#d1a847]/30 p-1 text-xs gap-1">
                {LANGUAGES.map(item => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLang(item.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2.5 py-1 rounded font-medium cursor-pointer ${
                      lang === item.code
                        ? 'bg-gradient-to-r from-[#fceda2] via-[#d1a847] to-[#c59b38] text-[#0b1d3a] font-bold'
                        : 'text-slate-300'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <nav className="flex flex-col space-y-3 text-base font-medium">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-slate-200 hover:text-[#d1a847] transition-colors"
              >
                {t.nav.services}
              </a>
              <a
                href="#why-us"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-slate-200 hover:text-[#d1a847] transition-colors"
              >
                {t.nav.whyUs}
              </a>
              <a
                href="#consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-slate-200 hover:text-[#d1a847] transition-colors"
              >
                {t.nav.inquiry}
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-slate-200 hover:text-[#d1a847] transition-colors"
              >
                {t.nav.faq}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-slate-200 hover:text-[#d1a847] transition-colors"
              >
                {t.nav.contact}
              </a>
            </nav>

            {/* Mobile Contact Quick Actions (Compact without raw phone number) */}
            <div className="pt-4 border-t border-[#d1a847]/20 flex items-center gap-3">
              <a
                href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_INTERNATIONAL}`}
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-emerald-700 shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:0666484815"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#0b1d3a] bg-gradient-to-r from-[#fceda2] via-[#d1a847] to-[#c59b38] shadow-md"
              >
                <Phone className="w-4 h-4 text-[#0b1d3a]" />
                <span>{lang === 'ar' ? 'اتصال' : lang === 'fr' ? 'Appeler' : lang === 'es' ? 'Llamar' : 'Call'}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section: Clean, impactful, without screenshot metrics, without AI logos or fake descriptions */}
      <section className="relative overflow-hidden pt-20 pb-20 md:pt-28 md:pb-28 bg-radial-luxury">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-6">
            {/* Main Headline */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.18] mb-10">
              {t.hero.headlinePart1} <br className="hidden sm:inline" />
              <span className="gold-gradient-text">{t.hero.headlinePart2}</span>
            </h1>

            {/* Clean Hero CTAs without raw phone numbers */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <a
                href="#consultation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg text-sm font-bold uppercase tracking-wider text-[#0b1d3a] bg-gradient-to-r from-[#fceda2] via-[#d1a847] to-[#c59b38] shadow-[0_4px_25px_rgba(209,168,71,0.4)] transition-all duration-300 hover:shadow-[0_6px_35px_rgba(209,168,71,0.65)] hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className={`w-4 h-4 text-[#0b1d3a] ${isRtl ? 'rotate-180' : ''}`} />
              </a>

              <a
                href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_INTERNATIONAL}`}
                target="_blank"
                rel="noreferrer noopener"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-lg text-sm font-semibold uppercase tracking-wider text-emerald-400 border border-emerald-500/40 bg-[#0b1d3a]/80 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 shadow-md transition-all duration-300 hover:scale-[1.02]"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Travel Inquiry / Booking Bar (Destination only appears for Flight Bookings) */}
          <div className="mt-12 max-w-4xl mx-auto bg-[#0b1d3a]/90 border border-[#d1a847]/40 rounded-2xl p-4 sm:p-6 shadow-[0_12px_40px_rgba(3,8,16,0.7)] backdrop-blur-md">
            <form onSubmit={handleHeroQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-end">
              {/* Service Selection */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#d1a847] mb-1.5">
                  {t.hero.selectService}
                </label>
                <div className="relative">
                  <select
                    value={quickService}
                    onChange={(e) => setQuickService(e.target.value)}
                    className="w-full bg-[#081528] border border-[#d1a847]/30 text-white text-xs sm:text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#d1a847] appearance-none"
                  >
                    {t.services.items.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className={`w-4 h-4 text-[#d1a847] absolute top-3 pointer-events-none ${isRtl ? 'left-3' : 'right-3'}`} />
                </div>
              </div>

              {/* Destination / Country (ONLY appears if Flight Bookings is selected) */}
              {isQuickFlightBooking ? (
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#d1a847] mb-1.5">
                    {t.hero.destinationLabel}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={quickDestination}
                      onChange={(e) => setQuickDestination(e.target.value)}
                      placeholder={t.hero.destinationPlaceholder}
                      className={`w-full bg-[#081528] border border-[#d1a847]/30 text-white text-xs sm:text-sm rounded-lg py-2.5 focus:outline-none focus:border-[#d1a847] placeholder:text-slate-500 ${
                        isRtl ? 'pr-8 pl-3' : 'pl-8 pr-3'
                      }`}
                    />
                    <MapPin className={`w-4 h-4 text-[#d1a847] absolute top-3 pointer-events-none ${isRtl ? 'right-2.5' : 'left-2.5'}`} />
                  </div>
                </div>
              ) : (
                /* Travel Date shown in place when not flight bookings */
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#d1a847] mb-1.5">
                    {t.hero.dateLabel}
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={quickDate}
                      onChange={(e) => setQuickDate(e.target.value)}
                      className="w-full bg-[#081528] border border-[#d1a847]/30 text-white text-xs sm:text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#d1a847] [color-scheme:dark]"
                    />
                  </div>
                </div>
              )}

              {/* Number of Travelers */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#d1a847] mb-1.5">
                  {t.hero.travelersLabel}
                </label>
                <div className="relative">
                  <select
                    value={quickTravelers}
                    onChange={(e) => setQuickTravelers(e.target.value)}
                    className="w-full bg-[#081528] border border-[#d1a847]/30 text-white text-xs sm:text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#d1a847] appearance-none"
                  >
                    <option value="1">{t.hero.paxSolo}</option>
                    <option value="2">{t.hero.paxCouple}</option>
                    <option value="3">{t.hero.paxFamily}</option>
                    <option value="6+">{t.hero.paxGroup}</option>
                  </select>
                  <Users className={`w-4 h-4 text-[#d1a847] absolute top-3 pointer-events-none ${isRtl ? 'left-3' : 'right-3'}`} />
                </div>
              </div>

              {/* Submit CTA */}
              <div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0b1d3a] bg-gradient-to-r from-[#fceda2] via-[#d1a847] to-[#c59b38] hover:shadow-[0_0_20px_rgba(209,168,71,0.5)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{t.hero.requestQuote}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Services Section: Clean Premium Cards WITHOUT Descriptions, Highlights, or Destination Text */}
      <section id="services" className="py-20 md:py-28 bg-[#0b1d3a] relative border-t border-b border-[#d1a847]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {t.services.title}
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d1a847] to-transparent mx-auto" />
          </div>

          {/* Clean Service Cards Grid: 5 Core Services styled with Navy Blue background & Gold accents */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {t.services.items.map((service, index) => {
              const IconComponent = SERVICE_ICONS[service.id] || Compass;

              return (
                <div
                  key={service.id}
                  className="bg-[#081528] border border-[#d1a847]/30 hover:border-[#d1a847] rounded-xl p-8 relative flex flex-col justify-between gold-card-hover group min-h-[220px]"
                >
                  <div>
                    {/* Top Bar with Number & Luxury Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/40 flex items-center justify-center group-hover:border-[#d1a847] group-hover:shadow-[0_0_15px_rgba(209,168,71,0.3)] transition-all duration-300">
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
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d1a847] hover:text-[#fceda2] transition-colors cursor-pointer"
                    >
                      <span>{t.services.inquireNow}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                    </button>

                    <a
                      href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_INTERNATIONAL}&text=${encodeURIComponent(`Hello Golden Group Travels, I am inquiring about ${service.name}.`)}`}
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
            <div className="bg-gradient-to-br from-[#0f264c] via-[#0b1d3a] to-[#081528] border border-[#d1a847]/50 rounded-xl p-8 flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-[#d1a847]/20 border border-[#d1a847] flex items-center justify-center">
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
                  href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_INTERNATIONAL}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 shadow-md transition-all hover:scale-[1.02]"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>WhatsApp Booking</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-20 md:py-28 bg-[#081528] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
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

              return (
                <div
                  key={idx}
                  className="bg-[#0b1d3a] border border-[#d1a847]/25 rounded-xl p-6 relative group hover:border-[#d1a847] transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#081528] border border-[#d1a847]/40 flex items-center justify-center mb-5 text-[#d1a847]">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-luxury text-xl font-bold text-white mb-2">
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

      {/* Interactive Consultation / Booking Form Section (DISPATCHES DIRECTLY TO WHATSAPP 0666-484815) */}
      <section id="consultation" className="py-20 md:py-28 bg-[#0b1d3a] relative border-t border-b border-[#d1a847]/25">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
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

          <div className="bg-[#081528] border border-[#d1a847]/40 rounded-2xl p-6 sm:p-10 shadow-[0_15px_50px_rgba(2,6,12,0.8)]">
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

      {/* Frequently Asked Questions Section */}
      <section id="faq" className="py-20 md:py-24 bg-[#081528] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mb-3">
              {t.faq.title}
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#d1a847] to-transparent mx-auto" />
          </div>

          <div className="space-y-4">
            {t.faq.items.map((item, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#0b1d3a] border border-[#d1a847]/25 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left rtl:text-right p-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className="font-medium text-white text-sm sm:text-base">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#d1a847] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#d1a847]/10">
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
          href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_INTERNATIONAL}`}
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
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#d1a847] to-[#9a7220] p-0.5 shadow-md">
                  <div className="w-full h-full bg-[#0b1d3a] rounded-[6px] flex items-center justify-center">
                    <Compass className="w-4 h-4 text-[#d1a847]" />
                  </div>
                </div>
                <span className="font-serif-luxury text-xl font-bold tracking-wider gold-gradient-text uppercase">
                  {isRtl ? 'جولدن جروب ترافيلز' : 'Golden Group Travels'}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.footer.desc}
              </p>
              {/* Social Media Links */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_INTERNATIONAL}`}
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
                  href="https://www.facebook.com"
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
                  href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_INTERNATIONAL}`}
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
