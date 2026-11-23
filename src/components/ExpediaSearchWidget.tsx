import React, { memo, useEffect, useRef, useState } from 'react';
import { Check, ExternalLink, MapPin, RefreshCw, ShieldCheck } from 'lucide-react';
import { Language } from '../assets/destinations';
import { SEARCH_ENGINE_PACKS } from '../assets/searchEngineData';
import { EXPEDIA_WIDGET_COPY } from '../assets/servicePagesData';
import { EXPEDIA_HOTELS_WIDGET_CONFIG } from '../config/travelSuppliers';
import { ensureExpediaScript, ensureExpediaStylesheet } from '../utils/expediaLoader';

const RETRY_LABEL: Record<Language, string> = {
  fr: 'Réessayer le chargement',
  ar: 'إعادة المحاولة',
  en: 'Retry loading',
  es: 'Reintentar carga'
};

declare global {
  interface Window {
    eg?: {
      widgets?: {
        initialized?: boolean;
        loaded?: boolean;
        elements?: Record<string, HTMLElement>;
      };
    };
  }
}

interface ExpediaSearchWidgetProps {
  lang: Language;
  variant?: 'page' | 'hub';
  onJumpToPlanner?: () => void;
}

function isCleanEmpty(value: string | null): boolean {
  return value === null || value === '' || value === 'undefined' || value === 'null';
}

function getCleanAttr(element: HTMLElement, attr: string): string | null {
  const val = element.getAttribute(attr);
  return typeof val === 'string' ? val.replace(/^\s*(\S*)\s*$/, '$1') : val;
}

export const ExpediaSearchWidget: React.FC<ExpediaSearchWidgetProps> = memo(({
  lang,
  variant = 'page',
  onJumpToPlanner
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [frameReady, setFrameReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [retryNonce, setRetryNonce] = useState(0);

  const pageCopy = EXPEDIA_WIDGET_COPY[lang];
  const hotelsPack = SEARCH_ENGINE_PACKS[lang].hotels;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let cancelled = false;
    let instanceId = element.getAttribute('data-instance') || '';
    setFrameReady(false);
    setLoadFailed(false);

    const hydrateWidgetElement = () => {
      if (cancelled || !containerRef.current) return;
      const el = containerRef.current;

      ensureExpediaStylesheet();

      window.eg = window.eg || {};
      window.eg.widgets = window.eg.widgets || {};
      window.eg.widgets.elements = window.eg.widgets.elements || {};

      const existingFrame = el.querySelector<HTMLIFrameElement>('.eg-widget-frame');
      if (existingFrame) {
        instanceId = el.getAttribute('data-instance') || instanceId;
        if (instanceId) {
          window.eg.widgets.elements[instanceId] = el;
        }
        existingFrame.addEventListener(
          'load',
          () => {
            if (!cancelled) {
              setFrameReady(true);
              setLoadFailed(false);
            }
          },
          { once: true }
        );
        if (existingFrame.getBoundingClientRect().height > 120) {
          setFrameReady(true);
          setLoadFailed(false);
        }
        return;
      }

      const widget = getCleanAttr(el, 'data-widget');
      if (isCleanEmpty(widget)) return;

      const params: Array<[string, string | null]> = [
        ['program', getCleanAttr(el, 'data-program')],
        ['lobs', getCleanAttr(el, 'data-lobs')],
        ['destination', getCleanAttr(el, 'data-destination')],
        ['network', getCleanAttr(el, 'data-network')],
        ['mdpcid', getCleanAttr(el, 'data-mdpcid')],
        ['rffrid', getCleanAttr(el, 'data-rffrid')],
        ['camref', getCleanAttr(el, 'data-camref')],
        ['pubref', getCleanAttr(el, 'data-pubref')],
        ['adref', getCleanAttr(el, 'data-adref')]
      ];

      instanceId =
        Date.now().toString(36) + Math.random().toString(36).substring(2);
      el.setAttribute('data-instance', instanceId);
      params.push(['instance', instanceId]);

      const queryString = params
        .map(([key, val]) =>
          !isCleanEmpty(val) ? `${key}=${encodeURIComponent(val as string)}` : ''
        )
        .filter(Boolean)
        .join('&');

      const scriptEl = document.querySelector<HTMLScriptElement>('script.eg-widgets-script');
      const baseSrc = scriptEl?.getAttribute('src') || EXPEDIA_HOTELS_WIDGET_CONFIG.scriptSrc;
      const widgetsUrl =
        baseSrc.replace(/(.*\/products\/widgets).*/, '$1') ||
        EXPEDIA_HOTELS_WIDGET_CONFIG.widgetsBaseUrl;

      if (!el.classList.contains(`eg-${widget}-widget`)) {
        el.classList.add(`eg-${widget}-widget`);
      }

      const frame = document.createElement('iframe');
      frame.className = `eg-widget-frame eg-${widget}-widget-frame`;
      frame.title = hotelTitleRef.current;
      frame.src = `${widgetsUrl}/${widget}-widget${queryString ? `?${queryString}` : ''}`;
      frame.style.width = '100%';
      frame.style.height = '340px';
      frame.style.minHeight = '300px';
      frame.style.margin = 'auto';
      frame.style.border = 'none';
      frame.addEventListener(
        'load',
        () => {
          if (!cancelled) setFrameReady(true);
        },
        { once: true }
      );
      frame.addEventListener('error', () => {
        if (!cancelled) setLoadFailed(true);
      });

      el.appendChild(frame);
      window.eg.widgets.elements[instanceId] = el;
    };

    const handleResizeMessage = (event: MessageEvent) => {
      if (event.origin !== EXPEDIA_HOTELS_WIDGET_CONFIG.origin) return;
      const data = event.data as
        | {
            type?: string;
            meta?: { instance?: string };
            payload?: { frame?: { style?: { width?: string; height?: string } } };
          }
        | undefined;

      if (!data || data.type !== 'eg-widget/resize') return;
      if (!instanceId || data.meta?.instance !== instanceId) return;

      const frame = containerRef.current?.querySelector<HTMLIFrameElement>('.eg-widget-frame');
      const nextStyle = data.payload?.frame?.style;
      if (frame && nextStyle) {
        if (nextStyle.width) frame.style.width = nextStyle.width;
        if (nextStyle.height) {
          frame.style.height = nextStyle.height;
          frame.style.minHeight = '0';
        }
        setFrameReady(true);
        setLoadFailed(false);
      }
    };

    window.addEventListener('message', handleResizeMessage);

    const scriptEl = ensureExpediaScript();
    let onScriptLoad: (() => void) | null = null;
    let onScriptError: (() => void) | null = null;
    let fallbackTimer: number | null = null;
    let timeoutTimer: number | null = null;

    if (window.eg?.widgets?.initialized || !scriptEl) {
      hydrateWidgetElement();
    } else {
      onScriptLoad = () => {
        hydrateWidgetElement();
      };
      onScriptError = () => {
        if (!cancelled) setLoadFailed(true);
      };
      scriptEl.addEventListener('load', onScriptLoad, { once: true });
      scriptEl.addEventListener('error', onScriptError, { once: true });
      fallbackTimer = window.setTimeout(() => {
        hydrateWidgetElement();
      }, 450);
    }

    timeoutTimer = window.setTimeout(() => {
      if (!cancelled) {
        setFrameReady((curr) => {
          if (!curr) setLoadFailed(true);
          return curr;
        });
      }
    }, 14000);

    return () => {
      cancelled = true;
      if (fallbackTimer !== null) window.clearTimeout(fallbackTimer);
      if (timeoutTimer !== null) window.clearTimeout(timeoutTimer);
      window.removeEventListener('message', handleResizeMessage);
      if (onScriptLoad && scriptEl) scriptEl.removeEventListener('load', onScriptLoad);
      if (onScriptError && scriptEl) scriptEl.removeEventListener('error', onScriptError);
      if (instanceId && window.eg?.widgets?.elements) {
        delete window.eg.widgets.elements[instanceId];
      }
      const staleFrame = element.querySelector('.eg-widget-frame');
      if (staleFrame) {
        staleFrame.remove();
      }
      element.removeAttribute('data-instance');
    };
  }, [retryNonce]);

  const hotelTitleRef = useRef(pageCopy.hotels.iframeTitle);
  hotelTitleRef.current = pageCopy.hotels.iframeTitle;
  useEffect(() => {
    const frame = containerRef.current?.querySelector<HTMLIFrameElement>('.eg-widget-frame');
    if (frame) {
      frame.title = pageCopy.hotels.iframeTitle;
    }
  }, [pageCopy.hotels.iframeTitle]);

  const widgetContainer = (
    <div className="relative rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/45 px-2.5 py-3 sm:p-6 overflow-x-clip widget-stability-shell">
      <div className="relative w-full max-w-[600px] mx-auto flex flex-col justify-center min-h-[300px]">
        {!frameReady && !loadFailed && (
          <div className="pointer-events-none absolute inset-x-0 top-2 z-10 flex justify-center px-3">
            <span className="text-xs text-[#2c405e]/85 tracking-wide bg-[#fcf9f2]/95 px-3 py-1 rounded-md">
              {pageCopy.loadingLabel}
            </span>
          </div>
        )}
        {loadFailed && !frameReady && (
          <div
            role="status"
            className="mb-3 rounded-xl bg-[#f5ede0] border border-[#d1a847]/55 p-4 text-center space-y-2.5 text-xs text-[#0b1d3a]"
          >
            <p>{hotelsPack.widgetNote}</p>
            <button
              type="button"
              onClick={() => setRetryNonce((n) => n + 1)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
              <span>{RETRY_LABEL[lang]}</span>
            </button>
          </div>
        )}
        <div
          ref={containerRef}
          className="eg-widget w-full"
          data-widget={EXPEDIA_HOTELS_WIDGET_CONFIG.widget}
          data-program={EXPEDIA_HOTELS_WIDGET_CONFIG.program}
          data-lobs={EXPEDIA_HOTELS_WIDGET_CONFIG.lobs}
          data-network={EXPEDIA_HOTELS_WIDGET_CONFIG.network}
          data-camref={EXPEDIA_HOTELS_WIDGET_CONFIG.camref}
          data-pubref={EXPEDIA_HOTELS_WIDGET_CONFIG.pubref}
        />
      </div>
    </div>
  );

  if (variant === 'hub') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Strictly Untransformed Primary Expedia Hotel Search Stage */}
        <div className="lg:col-span-7 xl:col-span-8 min-w-0">{widgetContainer}</div>

        {/* Non-Widget Editorial Concierge & Search Guide Card (Safe for 3D Pop-Out Scroll Animation) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          <div className="ggt-panel-pop-card rounded-2xl bg-[#071429] text-[#f5ede0] border border-[#d1a847]/50 p-5 sm:p-6 space-y-5 shadow-[0_18px_42px_rgba(4,12,28,0.28)]">
            <div className="space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d1a847]">
                {hotelsPack.includesLabel}
              </div>
              <ul className="space-y-2.5">
                {hotelsPack.includesItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed">
                    <Check className="w-4 h-4 text-[#d1a847] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-[#d1a847]/45 to-transparent" />

            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-[#fceda2]">
                {hotelsPack.agencyHotelTitle}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {hotelsPack.agencyHotelDesc}
              </p>
              {onJumpToPlanner && (
                <button
                  type="button"
                  onClick={onJumpToPlanner}
                  className="mt-1 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.12em] transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{hotelsPack.agencyHotelBtn}</span>
                </button>
              )}
            </div>

            <div className="flex items-start gap-2 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d1a847] shrink-0 mt-0.5" />
              <span>{hotelsPack.widgetNote}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="expedia-search-heading"
      className="bg-[#fcf9f2] border border-[#d1a847]/45 rounded-2xl p-5 sm:p-8 lg:p-10 shadow-[0_18px_44px_rgba(11,29,58,0.08)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
        <div className="lg:col-span-5 space-y-4">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
            {hotelsPack.badge}
          </div>

          <h2
            id="expedia-search-heading"
            className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]"
          >
            {hotelsPack.title}
          </h2>

          <div className="w-14 h-px bg-[#c59b38]" />

          <p className="text-sm sm:text-base text-[#2c405e] leading-relaxed">
            {hotelsPack.subtitle}
          </p>

          <div className="p-4 rounded-xl bg-[#f5ede0]/80 border border-[#d1a847]/35 space-y-2">
            <div className="flex items-start gap-2.5 text-xs text-[#0b1d3a] leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-[#c59b38] shrink-0 mt-0.5" />
              <span>{hotelsPack.widgetNote}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#9a7220] font-semibold uppercase tracking-wider ps-6">
              <ExternalLink className="w-3 h-3 shrink-0" />
              <span>{pageCopy.redirectHint}</span>
            </div>
          </div>

          {onJumpToPlanner && (
            <button
              type="button"
              onClick={onJumpToPlanner}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0b1d3a] hover:text-[#9a7220] transition-colors cursor-pointer pt-1"
            >
              <MapPin className="w-3.5 h-3.5 text-[#c59b38] shrink-0" />
              <span>{pageCopy.conciergeFallback}</span>
            </button>
          )}
        </div>

        <div className="lg:col-span-7 min-w-0">{widgetContainer}</div>
      </div>
    </section>
  );
});
