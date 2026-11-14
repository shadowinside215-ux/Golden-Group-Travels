import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  QrCode,
  Download,
  ArrowLeft,
  ExternalLink,
  Check,
  Copy,
  Sparkles,
  FileText
} from 'lucide-react';
import { Language } from './translations.ts';

const WHATSAPP_URL = 'https://wa.me/212666484815';
const PHONE_HREF = 'tel:+212666484815';
const PHONE_DISPLAY = '+212 666 484815';
const EMAIL_ADDRESS = 'Info@goldengrouptravels.com';
const INSTAGRAM_URL = 'https://www.instagram.com/goldengrouptravels/?utm_source=ig_web_button_share_sheet';
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61596136568520';
const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=34.047907,-6.799246';
const PRODUCTION_ORIGIN = 'https://www.goldengrouptravels.com';
const LOGO_PATH = '/assets/aistudio/Golden_Group_Travel_Logo__1__824306ae.png';

const WhatsAppBadgeIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.69 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
  </svg>
);

const LINKS_COPY: Record<
  Language,
  {
    tagline: string;
    intro: string;
    whatsapp: string;
    call: string;
    email: string;
    instagram: string;
    facebook: string;
    maps: string;
    website: string;
    rights: string;
    qrAction: string;
  }
> = {
  fr: {
    tagline: 'Une vision, plusieurs horizons.',
    intro: 'Retrouvez-nous et contactez notre équipe en quelques secondes.',
    whatsapp: `WhatsApp · ${PHONE_DISPLAY}`,
    call: "Appeler l'agence",
    email: 'Envoyer un Email',
    instagram: 'Instagram',
    facebook: 'Facebook',
    maps: 'Nous trouver sur Google Maps',
    website: 'Visiter notre site web',
    rights: 'Tous droits réservés',
    qrAction: 'QR Code & Télécharger PDF',
  },
  en: {
    tagline: 'One vision, endless horizons.',
    intro: 'Find us and reach our travel concierge team in seconds.',
    whatsapp: `WhatsApp · ${PHONE_DISPLAY}`,
    call: 'Call Our Agency',
    email: 'Send an Email',
    instagram: 'Instagram',
    facebook: 'Facebook',
    maps: 'Find Us on Google Maps',
    website: 'Visit Our Website',
    rights: 'All rights reserved',
    qrAction: 'QR Code & Download PDF',
  },
  es: {
    tagline: 'Una visión, múltiples horizontes.',
    intro: 'Encuéntranos y contacta con nuestro equipo en segundos.',
    whatsapp: `WhatsApp · ${PHONE_DISPLAY}`,
    call: 'Llamar a la Agencia',
    email: 'Enviar un Correo',
    instagram: 'Instagram',
    facebook: 'Facebook',
    maps: 'Encuéntranos en Google Maps',
    website: 'Visitar Nuestro Sitio Web',
    rights: 'Todos los derechos reservados',
    qrAction: 'Código QR y Descargar PDF',
  },
  ar: {
    tagline: 'رؤية واحدة، آفاق متعددة.',
    intro: 'تواصل معنا واعثر على جميع روابط الوكالة في ثوانٍ معدودة.',
    whatsapp: `واتساب · ${PHONE_DISPLAY}`,
    call: 'الاتصال بالوكالة',
    email: 'إرسال بريد إلكتروني',
    instagram: 'إنستغرام',
    facebook: 'فيسبوك',
    maps: 'موقعنا على خرائط جوجل',
    website: 'زيارة موقعنا الإلكتروني',
    rights: 'جميع الحقوق محفوظة',
    qrAction: 'رمز QR وتحميل PDF',
  },
};

export const LinksHubPage: React.FC<{
  lang: Language;
  setLang: (l: Language) => void;
  onNavigate: (path: string) => void;
}> = ({ lang, setLang, onNavigate }) => {
  const copy = LINKS_COPY[lang] || LINKS_COPY.fr;
  const isRtl = lang === 'ar';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      lang={lang}
      className="min-h-screen bg-gradient-to-b from-[#f8f6f1] via-[#f1f3f7] to-[#e7ebf2] text-[#0b1d3a] flex flex-col items-center justify-center px-4 py-8 sm:py-12 font-sans"
    >
      {/* Top Language Pills */}
      <div className="w-full max-w-[430px] flex items-center justify-between mb-3 px-1">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0b1d3a]/75 hover:text-[#0b1d3a] transition-colors cursor-pointer"
        >
          <ArrowLeft className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
          <span>Golden Group Travels</span>
        </button>

        <div className="flex items-center gap-1 bg-white/90 border border-slate-200 rounded-full p-0.5 shadow-xs text-[11px]">
          {(['fr', 'ar', 'en', 'es'] as Language[]).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={`px-2.5 py-0.5 rounded-full font-bold uppercase transition-colors cursor-pointer ${
                lang === code
                  ? 'bg-[#0a1d3e] text-[#fceda2]'
                  : 'text-slate-600 hover:text-[#0a1d3e]'
              }`}
            >
              {code === 'ar' ? 'عربي' : code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Clean Link Card (matching reference design) */}
      <main className="w-full max-w-[430px] bg-white rounded-[28px] shadow-[0_24px_65px_-16px_rgba(10,29,62,0.22)] border border-slate-200/80 overflow-hidden">
        {/* Deep Navy Brand Header */}
        <div className="bg-[#0a1d3e] px-6 pt-8 pb-7 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(209,168,71,0.18),transparent_65%)] pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center">
            <img
              src={LOGO_PATH}
              alt="Golden Group Travels"
              className="w-16 h-16 rounded-2xl object-contain border border-[#d1a847]/40 shadow-md mb-3.5"
            />
            <h1 className="font-serif-luxury text-2xl sm:text-[28px] font-bold tracking-[0.06em] text-[#e7ca7a] uppercase leading-tight">
              GOLDEN GROUP TRAVELS
            </h1>
            <p className="text-xs sm:text-[13px] text-slate-200/95 mt-2 font-medium tracking-wide">
              {copy.tagline}
            </p>
          </div>
        </div>

        {/* Links Stack */}
        <div className="px-6 py-7 space-y-3.5">
          <p className="text-center text-xs sm:text-[13px] text-slate-500 leading-relaxed mb-4 px-2">
            {copy.intro}
          </p>

          {/* 1. WhatsApp (Primary Dark Navy Button) */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-[#0a1d3e] hover:bg-[#122e60] text-white font-bold text-sm shadow-md transition-all active:scale-[0.99]"
          >
            <WhatsAppBadgeIcon className="w-4 h-4 text-emerald-400 shrink-0" />
            <span dir="ltr">{copy.whatsapp}</span>
          </a>

          {/* 2. Call Agency */}
          <a
            href={PHONE_HREF}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-white hover:bg-slate-50 text-[#0a1d3e] border border-slate-200 hover:border-[#d1a847]/60 font-bold text-sm shadow-2xs transition-all active:scale-[0.99]"
          >
            <Phone className="w-4 h-4 text-[#b58a2d] shrink-0" />
            <span>{copy.call}</span>
          </a>

          {/* 3. Email */}
          <a
            href={`mailto:${EMAIL_ADDRESS}`}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-white hover:bg-slate-50 text-[#0a1d3e] border border-slate-200 hover:border-[#d1a847]/60 font-bold text-sm shadow-2xs transition-all active:scale-[0.99]"
          >
            <Mail className="w-4 h-4 text-[#b58a2d] shrink-0" />
            <span>{copy.email}</span>
          </a>

          {/* 4. Instagram */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-white hover:bg-slate-50 text-[#0a1d3e] border border-slate-200 hover:border-[#d1a847]/60 font-bold text-sm shadow-2xs transition-all active:scale-[0.99]"
          >
            <InstagramIcon className="w-4 h-4 text-[#b58a2d] shrink-0" />
            <span>{copy.instagram}</span>
          </a>

          {/* 5. Facebook */}
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-white hover:bg-slate-50 text-[#0a1d3e] border border-slate-200 hover:border-[#d1a847]/60 font-bold text-sm shadow-2xs transition-all active:scale-[0.99]"
          >
            <FacebookIcon className="w-4 h-4 text-[#b58a2d] shrink-0" />
            <span>{copy.facebook}</span>
          </a>

          {/* 6. Google Maps (Warm Gold Cream Button) */}
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-[#f5ecd7] hover:bg-[#efe2c4] text-[#4c3914] border border-[#e3d0a8] font-bold text-sm shadow-2xs transition-all active:scale-[0.99]"
          >
            <MapPin className="w-4 h-4 text-[#9a7220] shrink-0" />
            <span>{copy.maps}</span>
          </a>

          {/* 7. Visit Main Website */}
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-white hover:bg-slate-50 text-[#0a1d3e] border border-slate-200 hover:border-[#d1a847]/60 font-bold text-sm shadow-2xs transition-all active:scale-[0.99] cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#b58a2d] shrink-0" />
            <span>{copy.website}</span>
          </button>
        </div>

        {/* Agency Address & Copyright Footer */}
        <div className="px-6 pb-7 pt-2 text-center border-t border-slate-100 mx-6">
          <div className="pt-4 space-y-1 text-[11px] sm:text-xs text-slate-500 leading-relaxed">
            <div className="font-bold text-slate-700 tracking-wide uppercase">
              GOLDEN GROUP TRAVELS
            </div>
            <div>Kissariat Salima 3, Immeuble 1, Boutique N° 8</div>
            <div>Résidence Salima 3, Hay el Qods, Avenue du 6 Novembre, Salé 11000</div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400">
            &copy; {new Date().getFullYear()} GOLDEN GROUP TRAVELS · {copy.rights}
          </div>
        </div>
      </main>

      {/* Owner Shortcut: Open QR Code & PDF Generator */}
      <div className="mt-5 flex items-center justify-center">
        <button
          type="button"
          onClick={() => onNavigate('/qr')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a1d3e]/90 hover:bg-[#0a1d3e] text-[#fceda2] text-xs font-semibold shadow-md transition-all cursor-pointer"
        >
          <QrCode className="w-3.5 h-3.5 text-[#d1a847]" />
          <span>{copy.qrAction}</span>
        </button>
      </div>
    </div>
  );
};

// Helper to load logo image as base64 DataURL for jsPDF embedding
const loadLogoDataUrl = (src: string): Promise<string | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 400;
        canvas.height = img.naturalHeight || 400;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
};

export const QrStudioPage: React.FC<{
  lang: Language;
  setLang: (l: Language) => void;
  onNavigate: (path: string) => void;
}> = ({ lang, setLang, onNavigate }) => {
  const isRtl = lang === 'ar';
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : PRODUCTION_ORIGIN;
  const defaultTargetUrl = `${PRODUCTION_ORIGIN}/links`;

  const [targetUrl, setTargetUrl] = useState(defaultTargetUrl);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(targetUrl || defaultTargetUrl, {
      width: 1024,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: {
        dark: '#081528',
        light: '#ffffff',
      },
    })
      .then((url) => {
        if (active) setQrDataUrl(url);
      })
      .catch(() => {
        if (active) setQrDataUrl('');
      });
    return () => {
      active = false;
    };
  }, [targetUrl, defaultTargetUrl]);

  const handleCopyUrl = () => {
    navigator.clipboard?.writeText(targetUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const handleDownloadPng = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'Golden-Group-Travels-QR-Code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPdf = async () => {
    if (!qrDataUrl) return;
    setPdfGenerating(true);
    try {
      // High-resolution A4 PDF poster / card (210mm x 297mm)
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageW = 210;
      const pageH = 297;

      // Soft warm cream background
      doc.setFillColor(248, 246, 241);
      doc.rect(0, 0, pageW, pageH, 'F');

      // Outer Gold Accent Border
      doc.setDrawColor(209, 168, 71);
      doc.setLineWidth(1.2);
      doc.roundedRect(10, 10, pageW - 20, pageH - 20, 6, 6, 'S');

      // Top Deep Navy Header Block
      doc.setFillColor(10, 29, 62);
      doc.roundedRect(14, 14, pageW - 28, 66, 5, 5, 'F');

      // Gold bottom trim inside header
      doc.setFillColor(209, 168, 71);
      doc.rect(14, 78, pageW - 28, 2, 'F');

      // Embed Official Logo
      const logoData = await loadLogoDataUrl(LOGO_PATH);
      if (logoData) {
        doc.addImage(logoData, 'PNG', pageW / 2 - 14, 19, 28, 28);
      }

      // Header Titles
      doc.setTextColor(252, 237, 162);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('GOLDEN GROUP TRAVELS', pageW / 2, 57, { align: 'center' });

      doc.setTextColor(226, 232, 240);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.text('Travel Services & Events  •  Une vision, plusieurs horizons.', pageW / 2, 66, {
        align: 'center',
      });

      // Scan Instruction Headline
      doc.setTextColor(10, 29, 62);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('SCANNEZ POUR NOUS CONTACTER', pageW / 2, 97, { align: 'center' });

      doc.setTextColor(100, 116, 139);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      doc.text(
        'Accédez instantanément à tous nos liens officiels en scannant ce QR Code :',
        pageW / 2,
        105,
        { align: 'center' }
      );

      // White QR Card Frame with Gold Border
      const qrBoxSize = 104;
      const qrBoxX = (pageW - qrBoxSize) / 2;
      const qrBoxY = 113;

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(209, 168, 71);
      doc.setLineWidth(1.5);
      doc.roundedRect(qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 6, 6, 'FD');

      // Crisp QR Code Image
      doc.addImage(qrDataUrl, 'PNG', qrBoxX + 6, qrBoxY + 6, qrBoxSize - 12, qrBoxSize - 12);

      // Target URL Pill under QR
      doc.setFillColor(245, 236, 215);
      doc.setDrawColor(227, 208, 168);
      doc.setLineWidth(0.5);
      doc.roundedRect(35, 224, pageW - 70, 10, 5, 5, 'FD');
      doc.setTextColor(76, 57, 20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text(targetUrl, pageW / 2, 230.5, { align: 'center' });

      // Included Links Badges Row
      doc.setTextColor(10, 29, 62);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(
        'WhatsApp  •  Téléphone  •  Email  •  Instagram  •  Facebook  •  Google Maps  •  Site Web',
        pageW / 2,
        247,
        { align: 'center' }
      );

      // Bottom Agency Info Box
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.4);
      doc.line(25, 255, pageW - 25, 255);

      doc.setTextColor(10, 29, 62);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(`WhatsApp & Tél : ${PHONE_DISPLAY}   |   ${EMAIL_ADDRESS}`, pageW / 2, 264, {
        align: 'center',
      });

      doc.setTextColor(71, 85, 105);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.text('Kissariat Salima 3, Immeuble 1, Boutique N° 8', pageW / 2, 272, {
        align: 'center',
      });
      doc.text('Résidence Salima 3, Hay el Qods, Avenue du 6 Novembre, Salé 11000', pageW / 2, 278, {
        align: 'center',
      });

      doc.save('Golden-Group-Travels-QR-Code.pdf');
    } finally {
      setPdfGenerating(false);
    }
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      lang={lang}
      className="min-h-screen bg-[#06101e] text-slate-100 flex flex-col font-sans"
    >
      {/* Top Bar */}
      <header className="border-b border-[#d1a847]/30 bg-[#021939]/95 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#fceda2] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className={`w-4 h-4 text-[#d1a847] ${isRtl ? 'rotate-180' : ''}`} />
            <span>{lang === 'ar' ? 'العودة إلى الموقع' : lang === 'en' ? 'Back to Website' : lang === 'es' ? 'Volver al Sitio' : 'Retour au Site'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('/links')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/40 text-xs font-semibold text-[#fceda2] hover:border-[#d1a847] transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#d1a847]" />
              <span>{lang === 'ar' ? 'معاينة صفحة الروابط' : lang === 'en' ? 'Open Links Page' : lang === 'es' ? 'Ver Página de Enlaces' : 'Voir la Page Liens'}</span>
            </button>

            <div className="hidden sm:flex items-center bg-[#050e1a] border border-[#d1a847]/30 rounded-lg p-0.5 text-[11px] gap-0.5">
              {(['fr', 'ar', 'en', 'es'] as Language[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`px-2 py-1 rounded font-bold uppercase cursor-pointer ${
                    lang === code ? 'bg-[#d1a847] text-[#0b1d3a]' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {code === 'ar' ? 'عربي' : code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d1a847]/40 bg-[#0b1d3a] text-xs font-bold uppercase tracking-widest text-[#d1a847]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Golden Group Travels · QR Studio</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {lang === 'ar'
              ? 'رمز QR وصفحة الروابط الرسمية'
              : lang === 'en'
              ? 'Official QR Code & Links Card'
              : lang === 'es'
              ? 'Código QR y Tarjeta de Enlaces'
              : 'QR Code & Carte Digitale Officielle'}
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            {lang === 'ar'
              ? 'قم بتحميل ملف PDF جاهز للطباعة يحتوي على رمز QR الذي يوجه العملاء مباشرة إلى صفحة روابط الوكالة.'
              : lang === 'en'
              ? 'Download a print-ready PDF poster containing your QR code that automatically opens your agency links page.'
              : lang === 'es'
              ? 'Descarga un PDF listo para imprimir con tu código QR que abre automáticamente la página de enlaces de tu agencia.'
              : 'Téléchargez votre QR Code prêt à imprimer en format PDF. En le scannant, vos clients arrivent directement sur votre page regroupant tous les liens de l’agence.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Printable PDF Poster Preview */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm bg-[#f8f6f1] rounded-2xl border-2 border-[#d1a847] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] p-4 text-[#0a1d3e]">
              {/* Poster Header */}
              <div className="bg-[#0a1d3e] rounded-xl p-5 text-center border-b-2 border-[#d1a847]">
                <img
                  src={LOGO_PATH}
                  alt="Golden Group Travels"
                  className="w-14 h-14 mx-auto rounded-xl object-contain border border-[#d1a847]/50 mb-2.5"
                />
                <div className="font-serif-luxury text-lg font-bold tracking-wider text-[#fceda2]">
                  GOLDEN GROUP TRAVELS
                </div>
                <div className="text-[10px] text-slate-300 mt-0.5">
                  Une vision, plusieurs horizons.
                </div>
              </div>

              {/* QR Preview Box */}
              <div className="py-5 px-3 text-center">
                <div className="text-xs font-extrabold tracking-widest uppercase text-[#0a1d3e] mb-1">
                  SCANNEZ POUR NOUS CONTACTER
                </div>
                <div className="text-[10px] text-slate-500 mb-3">
                  WhatsApp • Appel • Email • Instagram • Facebook • Maps • Site Web
                </div>

                <div className="inline-block p-3 bg-white rounded-2xl border-2 border-[#d1a847] shadow-md">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="Golden Group Travels QR Code"
                      className="w-48 h-48 sm:w-52 sm:h-52 object-contain"
                    />
                  ) : (
                    <div className="w-48 h-48 flex items-center justify-center text-xs text-slate-400">
                      Generating QR...
                    </div>
                  )}
                </div>

                <div className="mt-3 px-3 py-1.5 rounded-full bg-[#f5ecd7] border border-[#e3d0a8] text-[10px] font-bold text-[#4c3914] truncate" dir="ltr">
                  {targetUrl}
                </div>
              </div>

              {/* Poster Address Footer */}
              <div className="border-t border-slate-200 pt-3 text-center text-[10px] text-slate-500 leading-relaxed">
                <div className="font-bold text-[#0a1d3e]">{PHONE_DISPLAY} · {EMAIL_ADDRESS}</div>
                <div>Kissariat Salima 3, Immeuble 1, Boutique N° 8</div>
                <div>Résidence Salima 3, Hay el Qods, Av. du 6 Novembre, Salé 11000</div>
              </div>
            </div>
          </div>

          {/* Right: Controls & Download Actions */}
          <div className="lg:col-span-6 space-y-6 bg-[#0b1d3a] border border-[#d1a847]/35 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div>
              <h2 className="font-serif-luxury text-2xl font-bold text-white mb-1.5">
                {lang === 'ar'
                  ? 'إعدادات الرابط والتحميل'
                  : lang === 'en'
                  ? 'QR Destination & Download'
                  : lang === 'es'
                  ? 'Destino del QR y Descarga'
                  : 'Lien du QR Code & Téléchargement'}
              </h2>
              <p className="text-xs text-slate-300">
                {lang === 'ar'
                  ? 'يأخذ هذا الرمز العملاء تلقائياً إلى صفحة الروابط المدمجة داخل الموقع (/links).'
                  : lang === 'en'
                  ? 'Scanning this QR code automatically opens the built-in links page (/links) on your website.'
                  : lang === 'es'
                  ? 'Al escanear este código QR se abre automáticamente la página de enlaces (/links) de tu web.'
                  : 'Ce QR Code redirige automatiquement vers la page officielle des liens intégrée à votre site (/links).'}
              </p>
            </div>

            {/* Destination URL presets */}
            <div className="space-y-2.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#d1a847]">
                URL de destination du QR Code
              </label>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setTargetUrl(`${PRODUCTION_ORIGIN}/links`)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    targetUrl === `${PRODUCTION_ORIGIN}/links`
                      ? 'bg-[#d1a847] text-[#0b1d3a] border-[#fceda2] font-bold'
                      : 'bg-[#081528] text-slate-300 border-[#d1a847]/30 hover:border-[#d1a847]'
                  }`}
                >
                  Site Officiel (goldengrouptravels.com/links)
                </button>
                {currentOrigin !== PRODUCTION_ORIGIN && (
                  <button
                    type="button"
                    onClick={() => setTargetUrl(`${currentOrigin}/links`)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      targetUrl === `${currentOrigin}/links`
                        ? 'bg-[#d1a847] text-[#0b1d3a] border-[#fceda2] font-bold'
                        : 'bg-[#081528] text-slate-300 border-[#d1a847]/30 hover:border-[#d1a847]'
                    }`}
                  >
                    URL Actuelle (Test / Preview)
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  dir="ltr"
                  className="flex-1 bg-[#081528] border border-[#d1a847]/35 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d1a847]"
                />
                <button
                  type="button"
                  onClick={handleCopyUrl}
                  className="px-3.5 py-2.5 rounded-xl bg-[#081528] border border-[#d1a847]/35 hover:border-[#d1a847] text-[#fceda2] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                  title="Copy URL"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={pdfGenerating || !qrDataUrl}
                className="w-full py-4 px-5 rounded-xl btn-gold-luxury font-extrabold text-sm uppercase tracking-wider text-[#0b1d3a] flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 shadow-xl"
              >
                <FileText className="w-5 h-5" />
                <span>
                  {pdfGenerating
                    ? 'Génération du PDF...'
                    : lang === 'ar'
                    ? 'تحميل رمز QR بصيغة PDF'
                    : lang === 'en'
                    ? 'Download QR Code as PDF'
                    : lang === 'es'
                    ? 'Descargar Código QR en PDF'
                    : 'Télécharger le QR Code (PDF)'}
                </span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPng}
                  disabled={!qrDataUrl}
                  className="py-3 px-4 rounded-xl bg-[#081528] border border-[#d1a847]/40 hover:border-[#d1a847] text-slate-200 hover:text-[#fceda2] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#d1a847]" />
                  <span>Télécharger PNG</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/links')}
                  className="py-3 px-4 rounded-xl bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600/30 text-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Tester la Page /links</span>
                </button>
              </div>
            </div>

            {/* Included Links Summary */}
            <div className="pt-4 border-t border-[#d1a847]/20">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Liens inclus sur la page (/links) :
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d1a847]" />
                  <span>WhatsApp ({PHONE_DISPLAY})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d1a847]" />
                  <span>Appel direct agence</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d1a847]" />
                  <span>Email officiel</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d1a847]" />
                  <span>Instagram & Facebook</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d1a847]" />
                  <span>Google Maps (Salé)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d1a847]" />
                  <span>Site Web Golden Group</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
