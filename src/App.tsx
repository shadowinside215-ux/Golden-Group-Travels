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
  ChevronUp,
  Menu,
  X,
  Award,
  Headphones,
  Send,
  ShoppingBag,
  Mail,
  Globe,
  SlidersHorizontal
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

const LANGUAGES: { code: Language; name: string; flag: string; label: string }[] = [
  { code: 'fr', name: 'Français', flag: '🇫🇷', label: 'FR' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', label: 'عربي' },
  { code: 'en', name: 'English', flag: '🇬🇧', label: 'EN' },
  { code: 'es', name: 'Español', flag: '🇪🇸', label: 'ES' }
];

// Target WhatsApp phone for Golden Group Travels
const WHATSAPP_PHONE_INTERNATIONAL = '212666484815';
const DISPLAY_PHONE = '0666-484815';

// Golden Travel & Tourism Logo matching the screenshot
const GoldenLogo = () => (
  <div className="flex items-center gap-3 group shrink-0">
    <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
        <defs>
          <linearGradient id="goldGradHero" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fceda2" />
            <stop offset="35%" stopColor="#d1a847" />
            <stop offset="70%" stopColor="#b88628" />
            <stop offset="100%" stopColor="#8c6114" />
          </linearGradient>
        </defs>
        {/* Stylized Golden G with curved flight wing */}
        <path
          d="M 50 14 C 28 14 14 30 14 52 C 14 74 30 88 52 88 C 70 88 84 76 86 60 L 52 60 L 52 48 L 96 48 C 97 52 97 57 97 62 C 97 84 76 99 50 99 C 22 99 3 78 3 50 C 3 22 24 3 52 3 C 68 3 82 10 91 21 L 80 30 C 73 21 63 14 50 14 Z"
          fill="url(#goldGradHero)"
        />
        {/* Flight birds / wing arcs */}
        <path
          d="M 68 8 C 76 12 84 10 93 4 C 88 12 85 18 84 25 C 80 18 75 14 68 8 Z"
          fill="url(#goldGradHero)"
        />
        <path
          d="M 54 18 C 60 21 66 20 73 15 C 69 21 67 26 66 31 C 63 26 59 23 54 18 Z"
          fill="url(#goldGradHero)"
        />
      </svg>
    </div>
    <div className="flex flex-col text-left rtl:text-right">
      <span className="font-serif-luxury font-black text-2xl tracking-tight gold-gradient-text leading-none">
        Golden
      </span>
      <span className="text-[10px] font-bold tracking-[0.2em] text-[#d1a847] uppercase leading-tight mt-0.5">
        travel & tourism
      </span>
      <span className="text-[11px] font-amiri font-bold text-[#fceda2] leading-none mt-0.5">
        الذهبية للأسفار والسياحة
      </span>
    </div>
  </div>
);

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [floatingLangOpen, setFloatingLangOpen] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // Hero Tab: Voyage Organisé vs Hôtel
  const [heroTab, setHeroTab] = useState<'tours' | 'hotel'>('tours');
  const [heroDestination, setHeroDestination] = useState('');
  const [heroDates, setHeroDates] = useState('');
  const [advancedPax, setAdvancedPax] = useState('2');
  const [advancedClass, setAdvancedClass] = useState('Confort');

  const t = translations[lang];
  const isRtl = t.dir === 'rtl';

  // Quick Hero Search Bar State (for compatibility)
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
      {/* Top Strip (Deep Navy Blue & Gold Accent) */}
      <div className="bg-[#050e1a] text-slate-200 text-[12px] border-b border-[#d1a847]/30 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
          {/* Left: Social Media & Official Emails */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com"
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
            {/* Official Emails */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs">
              <a
                href="mailto:Info@goldengrouptravels.com"
                className="hover:underline flex items-center gap-1.5 text-slate-200 hover:text-[#fceda2] transition-colors"
              >
                <Mail className="w-3 h-3 text-[#d1a847]" />
                <span>Info@goldengrouptravels.com</span>
              </a>
              <span className="text-[#d1a847]/40 hidden md:inline">|</span>
              <a
                href="mailto:M.reda@goldengrouptravels.com"
                className="hover:underline hidden md:flex items-center gap-1 text-slate-200 hover:text-[#fceda2] transition-colors"
              >
                <span>M.reda@goldengrouptravels.com</span>
              </a>
            </div>
          </div>

          {/* Right: Phone, Connexion, S'inscrire, Currency MAD */}
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
            <a
              href="tel:0666484815"
              className="font-semibold text-[#fceda2] tracking-wide hover:underline flex items-center gap-1.5 transition-colors"
              dir="ltr"
            >
              <Phone className="w-3 h-3 text-[#d1a847]" />
              <span>+212 666-484815</span>
            </a>
            <span className="w-px h-3 bg-[#d1a847]/30 hidden sm:inline" />
            <button
              onClick={() => {
                const el = document.getElementById('consultation');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#d1a847] text-slate-300 hidden sm:inline cursor-pointer transition-colors"
            >
              {t.topStrip.login}
            </button>
            <span className="w-px h-3 bg-[#d1a847]/30 hidden sm:inline" />
            <button
              onClick={() => {
                const el = document.getElementById('consultation');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#d1a847] text-slate-300 hidden sm:inline cursor-pointer transition-colors"
            >
              {t.topStrip.register}
            </button>
            <span className="w-px h-3 bg-[#d1a847]/30" />
            <div className="flex items-center gap-1 text-slate-200 hover:text-[#fceda2] font-medium cursor-pointer transition-colors">
              <span>{t.topStrip.currency}</span>
              <ChevronDown className="w-3 h-3 text-[#d1a847]" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Luxury Deep Navy Blue & Gold, Sticky) */}
      <header className="sticky top-0 z-40 bg-[#0b1d3a]/95 backdrop-blur-md text-slate-100 shadow-md border-b border-[#d1a847]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="focus:outline-none">
            <GoldenLogo />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-bold tracking-wider text-slate-200 uppercase">
            <a href="#" className="hover:text-[#d1a847] transition-colors">
              {t.nav.accueil}
            </a>
            <a
              href="#consultation"
              onClick={() => setFormService('Haj & Omra')}
              className="text-[#fceda2] hover:text-white transition-colors font-extrabold"
            >
              {t.nav.hajOmra}
            </a>
            <a
              href="#services"
              className="hover:text-[#d1a847] transition-colors"
            >
              {t.nav.voyageOrganise}
            </a>
            <a
              href="#services"
              className="hover:text-[#d1a847] transition-colors"
            >
              {t.nav.circuitsMaroc}
            </a>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 hover:text-[#d1a847] transition-colors py-2 uppercase cursor-pointer"
              >
                <span>{t.nav.services}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#d1a847]" />
              </button>
              <div className="absolute top-full left-0 w-60 bg-[#0b1d3a] border border-[#d1a847]/40 rounded-lg shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 normal-case font-normal">
                {t.services.items.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleServiceSelectForInquiry(s.name)}
                    className="w-full text-left rtl:text-right px-4 py-2.5 text-xs text-slate-200 hover:bg-[#13284c] hover:text-[#fceda2] transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>{s.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <a href="#contact" className="hover:text-[#d1a847] transition-colors">
              {t.nav.contact}
            </a>
          </nav>

          {/* Right Action: Shopping Bag / Basket Icon + Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('consultation');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-10 h-10 rounded-full border border-[#d1a847]/40 bg-[#081528] text-[#fceda2] hover:text-[#d1a847] hover:border-[#d1a847] flex items-center justify-center transition-colors relative cursor-pointer"
              title="Réservation / Panier"
              aria-label="Booking basket"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-[#d1a847] to-[#b88628] text-[#0b1d3a] text-[10px] rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-200 hover:text-[#d1a847] hover:bg-[#13284c] transition-colors cursor-pointer"
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
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-slate-200 hover:text-[#d1a847] transition-colors"
              >
                {t.nav.accueil}
              </a>
              <a
                href="#consultation"
                onClick={() => {
                  setFormService('Haj & Omra');
                  setMobileMenuOpen(false);
                }}
                className="py-1 text-[#fceda2] font-bold hover:text-white transition-colors"
              >
                {t.nav.hajOmra}
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-slate-200 hover:text-[#d1a847] transition-colors"
              >
                {t.nav.voyageOrganise}
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-slate-200 hover:text-[#d1a847] transition-colors"
              >
                {t.nav.circuitsMaroc}
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-slate-200 hover:text-[#d1a847] transition-colors"
              >
                {t.nav.services}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-slate-200 hover:text-[#d1a847] transition-colors"
              >
                {t.nav.contact}
              </a>
            </nav>

            {/* Mobile Contact Action */}
            <div className="pt-4 border-t border-[#d1a847]/20 flex items-center gap-3">
              <a
                href={`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_INTERNATIONAL}`}
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

      {/* Hero Section: Exact Structure with Sacred Sanctuary Atmosphere & Arabic Calligraphy in Dark Blue & Gold */}
      <section className="relative overflow-hidden min-h-[580px] md:min-h-[660px] flex flex-col justify-between pt-12 sm:pt-16 pb-12 bg-[#06101e]">
        {/* Background Atmosphere: Twilight Sacred Sanctuary Architecture Artwork in Royal Navy & Gold */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Night Sky Gradient with Dusk Warmth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050e1a] via-[#0b1d3a] to-[#081528] opacity-95" />

          {/* Architectural Colonnades & Grand Sanctuary Silhouette (Pure SVG Art) */}
          <svg className="absolute inset-0 w-full h-full object-cover opacity-35" viewBox="0 0 1440 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sanctuaryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d1a847" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#0f2549" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#06101e" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            {/* Minarets on Left and Right */}
            <rect x="180" y="80" width="22" height="340" fill="url(#sanctuaryGrad)" />
            <polygon points="175,80 191,20 207,80" fill="#d1a847" opacity="0.6" />
            <circle cx="191" cy="16" r="4" fill="#fceda2" />
            
            <rect x="250" y="140" width="18" height="280" fill="url(#sanctuaryGrad)" />
            <polygon points="246,140 259,90 272,140" fill="#d1a847" opacity="0.5" />

            <rect x="1180" y="80" width="22" height="340" fill="url(#sanctuaryGrad)" />
            <polygon points="1175,80 1191,20 1207,80" fill="#d1a847" opacity="0.6" />
            <circle cx="1191" cy="16" r="4" fill="#fceda2" />

            <rect x="1240" y="130" width="18" height="290" fill="url(#sanctuaryGrad)" />
            <polygon points="1236,130 1249,85 1262,130" fill="#d1a847" opacity="0.5" />

            {/* Sacred Arched Colonnades */}
            <path
              d="M 0,380 Q 60,320 120,380 Q 180,320 240,380 Q 300,320 360,380 Q 420,320 480,380 Q 540,320 600,380 Q 660,320 720,380 Q 780,320 840,380 Q 900,320 960,380 Q 1020,320 1080,380 Q 1140,320 1200,380 Q 1260,320 1320,380 Q 1380,320 1440,380 L 1440,600 L 0,600 Z"
              fill="url(#sanctuaryGrad)"
              opacity="0.8"
            />
            {/* Kaaba Silhouette in Center Courtyard */}
            <rect x="660" y="320" width="120" height="110" fill="#05080e" opacity="0.95" rx="2" />
            <rect x="660" y="340" width="120" height="8" fill="#d1a847" opacity="0.9" />
            {/* Lantern glow highlights */}
            <circle cx="720" cy="380" r="140" fill="#d1a847" opacity="0.1" />
          </svg>

          {/* Vignette Overlay for Calligraphy Readability */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#081528]/50 to-[#050e1a]/95" />
        </div>

        {/* Central Calligraphy Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center mt-2 sm:mt-6">
          {/* Top Line: Labbayk Allahumma Labbayk */}
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-amiri font-bold text-[#fceda2] tracking-wide drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] mb-3">
            {t.hero.talbiyah}
          </div>

          {/* Main Grand Calligraphy: Al-Wakala Al-Dhahabiya Lil-Asfar Wa Al-Siyaha Wa Al-Haj Wa Al-Omra */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-calligraphy text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.98)] drop-shadow-[0_0_25px_rgba(209,168,71,0.25)] leading-[1.3] text-center max-w-5xl tracking-normal px-2 select-none"
            dir="rtl"
          >
            {t.hero.arabicTitle}
          </h1>
        </div>

        {/* Floating Search & Booking Card (Sitting over lower hero, matching screenshot structure) */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 sm:mt-14">
          {/* Connected Top Tabs */}
          <div className="flex items-end gap-1.5 -mb-px relative z-10">
            <button
              onClick={() => {
                setHeroTab('tours');
                setFormService('Holiday Packages');
              }}
              className={`px-6 py-2.5 rounded-t-lg font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                heroTab === 'tours'
                  ? 'bg-gradient-to-r from-[#fceda2] via-[#d1a847] to-[#c59b38] text-[#0b1d3a] shadow-md font-bold'
                  : 'bg-[#08172c] text-slate-300 border-t border-l border-r border-[#d1a847]/30 hover:text-[#fceda2] hover:bg-[#0b1d3a]'
              }`}
            >
              {t.hero.tabTours}
            </button>
            <button
              onClick={() => {
                setHeroTab('hotel');
                setFormService('Hotel Reservations');
              }}
              className={`px-6 py-2.5 rounded-t-lg font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                heroTab === 'hotel'
                  ? 'bg-gradient-to-r from-[#fceda2] via-[#d1a847] to-[#c59b38] text-[#0b1d3a] shadow-md font-bold'
                  : 'bg-[#08172c] text-slate-300 border-t border-l border-r border-[#d1a847]/30 hover:text-[#fceda2] hover:bg-[#0b1d3a]'
              }`}
            >
              {t.hero.tabHotel}
            </button>
          </div>

          {/* Search Box Card (Luxury Dark Navy & Gold) */}
          <div className="bg-[#0b1d3a]/95 backdrop-blur-md text-white rounded-b-xl sm:rounded-tr-xl rounded-tl-none shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-4 sm:p-5 border border-[#d1a847]/40 relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const serviceName = heroTab === 'tours' ? 'Holiday Packages' : 'Hotel Reservations';
                setFormService(serviceName);
                if (heroDestination) setDestination(sanitizeText(heroDestination, 80));
                if (heroDates) setTravelDate(heroDates);
                if (advancedPax) setTravelersCount(advancedPax);

                const dest = heroDestination ? `📍 *Destination:* ${heroDestination}\n` : '';
                const dates = heroDates ? `📅 *Dates:* ${heroDates}\n` : '';
                const pax = `👥 *Voyageurs:* ${advancedPax} (${advancedClass})\n`;
                const tabLabel = heroTab === 'tours' ? 'Voyage Organisé' : 'Hôtel';
                const waText = `✈️ *Demande de ${tabLabel} - Golden Group Travels*\n━━━━━━━━━━━━━━━━━━━━\n${dest}${dates}${pax}━━━━━━━━━━━━━━━━━━━━\nEnvoyé depuis le site officiel Golden Group Travels`;

                const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE_INTERNATIONAL}&text=${encodeURIComponent(waText)}`;
                
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

                const consultationSection = document.getElementById('consultation');
                if (consultationSection) {
                  consultationSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            >
              {/* Field 1: Destination */}
              <div className="md:col-span-4 flex items-center gap-3 md:border-r md:rtl:border-r-0 md:rtl:border-l border-[#d1a847]/25 md:pr-4 md:rtl:pr-0 md:rtl:pl-4">
                <div className="w-8 h-8 rounded-full bg-[#081528] border border-[#d1a847]/35 text-[#d1a847] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#d1a847]" />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-[#d1a847] uppercase tracking-wider">
                    {t.hero.destinationTitle}
                  </label>
                  <input
                    type="text"
                    value={heroDestination}
                    onChange={(e) => setHeroDestination(e.target.value)}
                    placeholder={
                      heroTab === 'tours'
                        ? t.hero.destinationPlaceholder
                        : (lang === 'fr' ? 'Hôtel, ville ou région...' : 'Hotel, city or region...')
                    }
                    className="w-full text-xs sm:text-sm font-medium text-white placeholder:text-slate-400 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Field 2: De - à (Dates) */}
              <div className="md:col-span-4 flex items-center gap-3 md:border-r md:rtl:border-r-0 md:rtl:border-l border-[#d1a847]/25 md:pr-4 md:rtl:pr-0 md:rtl:pl-4">
                <div className="w-8 h-8 rounded-full bg-[#081528] border border-[#d1a847]/35 text-[#d1a847] flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-[#d1a847]" />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-semibold text-[#d1a847] uppercase tracking-wider">
                    {t.hero.datesTitle}
                  </label>
                  <input
                    type="text"
                    value={heroDates}
                    onChange={(e) => setHeroDates(e.target.value)}
                    placeholder={t.hero.datesPlaceholder}
                    className="w-full text-xs sm:text-sm font-medium text-white placeholder:text-slate-400 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Field 3: Avancé (Plus) */}
              <div className="md:col-span-2 relative">
                <button
                  type="button"
                  onClick={() => setAdvancedOpen(!advancedOpen)}
                  className="w-full text-left rtl:text-right flex items-center justify-between cursor-pointer focus:outline-none py-1"
                >
                  <div>
                    <span className="block text-[11px] font-semibold text-[#d1a847] uppercase tracking-wider">
                      {t.hero.advancedTitle}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-200 flex items-center gap-1">
                      {t.hero.advancedSubtitle}
                      <ChevronDown className={`w-3.5 h-3.5 text-[#d1a847] transition-transform ${advancedOpen ? 'rotate-180' : ''}`} />
                    </span>
                  </div>
                </button>

                {/* Advanced Popup */}
                {advancedOpen && (
                  <div className="absolute top-full left-0 rtl:left-auto rtl:right-0 mt-3 w-64 bg-[#0b1d3a] border border-[#d1a847]/40 rounded-xl shadow-2xl p-4 z-50 space-y-3 text-white backdrop-blur-md">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Voyageurs / Personnes
                      </label>
                      <select
                        value={advancedPax}
                        onChange={(e) => setAdvancedPax(e.target.value)}
                        className="w-full text-xs border border-[#d1a847]/30 bg-[#081528] rounded-lg p-2 text-white focus:outline-none focus:border-[#d1a847]"
                      >
                        <option value="1">1 Adulte (Solo)</option>
                        <option value="2">2 Adultes (Couple)</option>
                        <option value="3-5">3–5 (Famille)</option>
                        <option value="6+">6+ (Groupe)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Catégorie
                      </label>
                      <select
                        value={advancedClass}
                        onChange={(e) => setAdvancedClass(e.target.value)}
                        className="w-full text-xs border border-[#d1a847]/30 bg-[#081528] rounded-lg p-2 text-white focus:outline-none focus:border-[#d1a847]"
                      >
                        <option value="Standard">Standard Économique</option>
                        <option value="Confort">Confort Supérieur</option>
                        <option value="VIP 5 Etoiles">VIP 5 Étoiles</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAdvancedOpen(false)}
                      className="w-full py-1.5 bg-gradient-to-r from-[#d1a847] to-[#b88628] text-[#0b1d3a] text-xs rounded-lg font-bold hover:brightness-110 transition-all cursor-pointer"
                    >
                      OK
                    </button>
                  </div>
                )}
              </div>

              {/* Field 4: Rechercher Button (Metallic Gold) */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#fceda2] via-[#d1a847] to-[#c59b38] hover:from-[#fff1b0] hover:to-[#dfaf46] text-[#0b1d3a] font-bold text-xs sm:text-sm py-3 px-6 rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(209,168,71,0.5)] transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t.hero.searchBtn}</span>
                </button>
              </div>
            </form>
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

                {/* Official Emails */}
                <div className="pt-2 border-t border-slate-800 space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {lang === 'ar' ? 'البريد الإلكتروني الرسمي' : 'Emails Officiels'}
                  </div>
                  <a
                    href="mailto:Info@goldengrouptravels.com"
                    className="flex items-center gap-2 text-xs text-slate-200 hover:text-[#d1a847] transition-colors p-2 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/20"
                  >
                    <Mail className="w-4 h-4 text-[#d1a847] shrink-0" />
                    <span className="font-mono text-xs truncate">Info@goldengrouptravels.com</span>
                  </a>
                  <a
                    href="mailto:M.reda@goldengrouptravels.com"
                    className="flex items-center gap-2 text-xs text-slate-200 hover:text-[#d1a847] transition-colors p-2 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/20"
                  >
                    <Mail className="w-4 h-4 text-[#d1a847] shrink-0" />
                    <span className="font-mono text-xs truncate">M.reda@goldengrouptravels.com</span>
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
