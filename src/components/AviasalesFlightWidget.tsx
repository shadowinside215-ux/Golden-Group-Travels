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

interface CascoonOriginParams {
  geoip_default?: { origin?: boolean; destination?: boolean };
}

interface CascoonConfigShape {
  id?: string;
  fields?: {
    origin_and_destination?: {
      params?: CascoonOriginParams;
    };
  };
}

interface CascoonGlobalShape {
  __ggtEmptyOriginPatched?: boolean;
  init?: ((payload: { config?: CascoonConfigShape }) => unknown) | null;
  registerInitFn?: (fn: (payload: { config?: CascoonConfigShape }) => unknown) => unknown;
  launch?: (payload: { config?: CascoonConfigShape }) => unknown;
}

function disableCascoonGeoipOrigin(cfg?: CascoonConfigShape): void {
  if (cfg?.id !== '7879') return;
  const odParams = cfg?.fields?.origin_and_destination?.params;
  if (odParams) {
    odParams.geoip_default = { origin: false };
  }
}

function patchCascoonGlobal(instance: CascoonGlobalShape): CascoonGlobalShape {
  if (!instance || typeof instance !== 'object' || instance.__ggtEmptyOriginPatched) {
    return instance;
  }
  instance.__ggtEmptyOriginPatched = true;

  if (typeof instance.registerInitFn === 'function') {
    const origRegisterInitFn = instance.registerInitFn.bind(instance);
    instance.registerInitFn = (fn) =>
      origRegisterInitFn((payload) => {
        disableCascoonGeoipOrigin(payload?.config);
        return fn(payload);
      });
  }

  if (typeof instance.launch === 'function') {
    const origLaunch = instance.launch.bind(instance);
    instance.launch = (payload) => {
      disableCascoonGeoipOrigin(payload?.config);
      return origLaunch(payload);
    };
  }

  if (typeof instance.init === 'function') {
    const origInit = instance.init.bind(instance);
    instance.init = (payload) => {
      disableCascoonGeoipOrigin(payload?.config);
      return origInit(payload);
    };
  }

  return instance;
}

function ensureCascoonEmptyOriginDefault(): void {
  if (typeof window === 'undefined') return;
  const win = window as unknown as { CASCOON_GLOBAL?: CascoonGlobalShape };
  if (win.CASCOON_GLOBAL) {
    patchCascoonGlobal(win.CASCOON_GLOBAL);
    return;
  }

  const existingDesc = Object.getOwnPropertyDescriptor(win, 'CASCOON_GLOBAL');
  if (existingDesc && !existingDesc.configurable) return;

  let storedValue: CascoonGlobalShape | undefined;
  Object.defineProperty(win, 'CASCOON_GLOBAL', {
    configurable: true,
    enumerable: true,
    get() {
      return storedValue;
    },
    set(nextVal: CascoonGlobalShape | undefined) {
      storedValue = nextVal ? patchCascoonGlobal(nextVal) : nextVal;
    }
  });
}

export const AviasalesFlightWidget: React.FC<AviasalesFlightWidgetProps> = React.memo(({
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

    // Disable GeoIP auto-filling Marrakech (RAK) in Departure so the field starts empty/default
    ensureCascoonEmptyOriginDefault();

    // Ensure clean slate before injecting the official Cascoon script
    container.replaceChildren();

    const observer = new MutationObserver(() => {
      if (cancelled) return;
      if (container.querySelector('tp-cascoon')) {
        setWidgetLoaded(true);
        setLoadFailed(false);
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    const script = document.createElement('script');
    script.async = true;
    script.charset = 'utf-8';
    script.src = AVIASALES_PARTNER.widgetScriptSrc;

    let failTimer: number | null = null;

    script.addEventListener('error', () => {
      if (!cancelled) {
        setLoadFailed(true);
      }
    });

    script.addEventListener('load', () => {
      window.setTimeout(() => {
        if (!cancelled && container.querySelector('tp-cascoon')) {
          setWidgetLoaded(true);
          setLoadFailed(false);
        }
      }, 300);
    });

    failTimer = window.setTimeout(() => {
      if (!cancelled && !container.querySelector('tp-cascoon')) {
        setLoadFailed(true);
      }
    }, 14000);

    container.appendChild(script);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (failTimer !== null) window.clearTimeout(failTimer);
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
        className={`relative rounded-2xl bg-[#f5ede0]/75 border border-[#d1a847]/50 shadow-inner overflow-x-clip widget-stability-shell ${
          compact ? 'p-2 sm:p-4' : 'p-2 sm:p-5 lg:p-6'
        }`}
      >
        {!widgetLoaded && !loadFailed && (
          <div
            aria-live="polite"
            className="pointer-events-none absolute inset-x-0 top-3 z-10 flex justify-center px-3"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#fcf9f2]/95 border border-[#d1a847]/45 text-[11px] text-[#2c405e]/85 tracking-wide shadow-sm">
              {flightsPack.loadingLabel}
            </span>
          </div>
        )}

        {loadFailed && (
          <div className="rounded-xl bg-[#fcf9f2] border border-[#d1a847]/60 p-4 sm:p-5 text-center space-y-3 mb-3">
            <p className="text-xs sm:text-sm text-[#0b1d3a]">{flightsPack.loadErrorFallback}</p>
            <a
              href={AVIASALES_PARTNER.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-wider"
            >
              <span>{flightsPack.continueAviasalesBtn}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        )}

        {/* Dedicated React DOM node where <script> inserts <tp-cascoon> via currentScript.parentNode */}
        <div
          id={AVIASALES_PARTNER.widgetContainerId}
          ref={mountRef}
          className="w-full min-w-0 min-h-[170px]"
        />
      </div>

      {/* Agency Concierge Complementary Assistance Bar (No Competing Search Form) */}
      <div className="rounded-xl bg-[#0b1d3a] text-[#f5ede0] border border-[#d1a847]/55 px-3.5 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="text-xs text-slate-200 leading-relaxed">
          <span className="font-semibold text-[#fceda2]">{flightsPack.conciergeTitle}</span>{' '}
          <span className="text-slate-300">{flightsPack.conciergeDesc}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href={buildDirectFlightQuoteUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center text-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-wider transition-colors sm:whitespace-nowrap"
          >
            <span>
              {flightsPack.agencyFlightQuoteBtn} ({displayPhone})
            </span>
          </a>

          {onJumpToPlanner && (
            <button
              type="button"
              onClick={onJumpToPlanner}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#071429] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/60 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 text-[#d1a847]" />
              <span>Google Maps</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
});
