import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, MapPin, ShieldCheck } from 'lucide-react';
import { Language } from '../assets/destinations';
import { SEARCH_ENGINE_PACKS } from '../assets/searchEngineData';
import { AVIASALES_PARTNER } from '../config/travelSuppliers';

interface AviasalesFlightWidgetProps {
  lang: Language;
  onJumpToPlanner?: () => void;
  whatsappInternational: string;
  displayPhone: string;
  compact?: boolean;
}

export const AviasalesFlightWidget: React.FC<AviasalesFlightWidgetProps> = ({
  lang,
  onJumpToPlanner,
  whatsappInternational,
  displayPhone,
  compact = false
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const flightsPack = SEARCH_ENGINE_PACKS[lang].flights;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let cancelled = false;
    setWidgetLoaded(false);
    setLoadFailed(false);

    // Ensure clean slate before injecting the official Cascoon script
    container.replaceChildren();

    const observer = new MutationObserver(() => {
      if (cancelled) return;
      if (container.querySelector('tp-cascoon')) {
        setWidgetLoaded(true);
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    const script = document.createElement('script');
    script.async = true;
    script.charset = 'utf-8';
    script.src = AVIASALES_PARTNER.widgetScriptSrc;

    script.addEventListener('error', () => {
      if (!cancelled) {
        setLoadFailed(true);
      }
    });

    // If a network blocker delays Cascoon or Shadow DOM hydration, mark loaded once script completes
    script.addEventListener('load', () => {
      window.setTimeout(() => {
        if (!cancelled && container.querySelector('tp-cascoon')) {
          setWidgetLoaded(true);
        }
      }, 300);
    });

    container.appendChild(script);

    return () => {
      cancelled = true;
      observer.disconnect();
      container.replaceChildren();
    };
  }, []);

  const buildDirectFlightQuoteUrl = () => {
    const msg =
      'Bonjour Golden Group Travels, je souhaite obtenir un devis pour un billet d’avion.';
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className={compact ? 'space-y-3.5' : 'space-y-5'}>
      {/* Header Strip Matching Golden Luxury Navy/Gold/Cream Identity */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-1 max-w-2xl">
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
            {flightsPack.liveBadge}
          </div>
          {!compact && (
            <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
              {flightsPack.liveTitle}
            </h3>
          )}
          <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
            {flightsPack.liveSubtitle}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 text-[11px] text-[#2c405e] bg-[#f5ede0]/90 border border-[#d1a847]/45 rounded-xl px-3 py-1.5 shrink-0">
          <ShieldCheck className="w-4 h-4 text-[#c59b38] shrink-0" />
          <span className="max-w-xs">{flightsPack.aviasalesNotice}</span>
        </div>
      </div>

      {/* Official Aviasales / Travelpayouts Cascoon Widget Host */}
      <div
        className={`rounded-2xl bg-[#f5ede0]/75 border border-[#d1a847]/50 shadow-inner ${
          compact ? 'p-2.5 sm:p-4' : 'p-3 sm:p-5 lg:p-6'
        }`}
      >
        {!widgetLoaded && !loadFailed && (
          <div className="text-center py-5 text-xs text-[#2c405e]/80 tracking-wide">
            {flightsPack.loadingLabel}
          </div>
        )}

        {loadFailed && (
          <div className="rounded-xl bg-[#fcf9f2] border border-[#d1a847]/60 p-5 text-center space-y-3">
            <p className="text-xs sm:text-sm text-[#0b1d3a]">{flightsPack.loadErrorFallback}</p>
            <a
              href={AVIASALES_PARTNER.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-wider"
            >
              <span>{flightsPack.continueAviasalesBtn}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Dedicated React DOM node where <script> inserts <tp-cascoon> via currentScript.parentNode */}
        <div
          id={AVIASALES_PARTNER.widgetContainerId}
          ref={mountRef}
          className="w-full min-w-0"
        />
      </div>

      {/* Agency Concierge Complementary Assistance Bar (No Competing Search Form) */}
      <div className="rounded-xl bg-[#0b1d3a] text-[#f5ede0] border border-[#d1a847]/55 px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="text-xs text-slate-200 leading-relaxed">
          <span className="font-semibold text-[#fceda2]">{flightsPack.conciergeTitle}</span>{' '}
          <span className="text-slate-300">{flightsPack.conciergeDesc}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href={buildDirectFlightQuoteUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap"
          >
            <span>
              {flightsPack.agencyFlightQuoteBtn} ({displayPhone})
            </span>
          </a>

          {onJumpToPlanner && (
            <button
              type="button"
              onClick={onJumpToPlanner}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#071429] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/60 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 text-[#d1a847]" />
              <span>Google Maps</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
