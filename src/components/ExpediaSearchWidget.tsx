import React, { useEffect, useRef, useState } from 'react';
import { Check, ExternalLink, MapPin, ShieldCheck } from 'lucide-react';
import { Language } from '../assets/destinations';
import { SEARCH_ENGINE_PACKS } from '../assets/searchEngineData';
import { EXPEDIA_WIDGET_COPY } from '../assets/servicePagesData';
import { EXPEDIA_HOTELS_WIDGET_CONFIG } from '../config/travelSuppliers';

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

function ensureExpediaStylesheet(): void {
  if (document.querySelector('link.eg-widgets-style')) return;
  const link = document.createElement('link');
  link.className = 'eg-widgets-style';
  link.rel = 'stylesheet';
  link.href = EXPEDIA_HOTELS_WIDGET_CONFIG.styleSrc;
  document.head.appendChild(link);
}

export const ExpediaSearchWidget: React.FC<ExpediaSearchWidgetProps> = ({
  lang,
  variant = 'page',
  onJumpToPlanner
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [frameReady, setFrameReady] = useState(false);

  const pageCopy = EXPEDIA_WIDGET_COPY[lang];
  const hotelsPack = SEARCH_ENGINE_PACKS[lang].hotels;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let cancelled = false;
    let instanceId = element.getAttribute('data-instance') || '';

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
      frame.title = pageCopy.hotels.iframeTitle;
      frame.src = `${widgetsUrl}/${widget}-widget${queryString ? `?${queryString}` : ''}`;
      frame.style.width = '100%';
      frame.style.height = '0';
      frame.style.margin = 'auto';
      frame.style.border = 'none';

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
        if (nextStyle.height) frame.style.height = nextStyle.height;
        setFrameReady(true);
      }
    };

    window.addEventListener('message', handleResizeMessage);

    const scriptEl = document.querySelector<HTMLScriptElement>('script.eg-widgets-script');
    let onScriptLoad: (() => void) | null = null;
    let fallbackTimer: number | null = null;

    if (window.eg?.widgets?.initialized || !scriptEl) {
      hydrateWidgetElement();
    } else {
      onScriptLoad = () => {
        hydrateWidgetElement();
      };
      scriptEl.addEventListener('load', onScriptLoad, { once: true });
      fallbackTimer = window.setTimeout(() => {
        hydrateWidgetElement();
      }, 250);
    }

    return () => {
      cancelled = true;
      if (fallbackTimer !== null) {
        window.clearTimeout(fallbackTimer);
      }
      window.removeEventListener('message', handleResizeMessage);
      if (onScriptLoad && scriptEl) {
        scriptEl.removeEventListener('load', onScriptLoad);
      }
      if (instanceId && window.eg?.widgets?.elements) {
        delete window.eg.widgets.elements[instanceId];
      }
      const staleFrame = element.querySelector('.eg-widget-frame');
      if (staleFrame) {
        staleFrame.remove();
      }
    };
  }, [pageCopy.hotels.iframeTitle]);

  const widgetContainer = (
    <div className="rounded-xl bg-[#f5ede0]/70 border border-[#d1a847]/45 px-2.5 py-4 sm:p-6 shadow-inner overflow-x-auto">
      <div
        className={`w-full max-w-[575px] mx-auto flex flex-col justify-center ${
          frameReady ? '' : 'min-h-[240px]'
        }`}
      >
        {!frameReady && (
          <div className="text-center py-6 text-xs text-[#2c405e]/75 tracking-wide">
            {pageCopy.loadingLabel}
          </div>
        )}
        <div
          ref={containerRef}
          className="eg-widget"
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
        <div className="lg:col-span-7 min-w-0">{widgetContainer}</div>

        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
            <span>{hotelsPack.badge}</span>
          </div>

          <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
            {hotelsPack.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
            {hotelsPack.subtitle}
          </p>

          <div className="p-4 rounded-xl bg-[#f5ede0]/80 border border-[#d1a847]/35 space-y-2.5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0b1d3a]">
              {hotelsPack.includesLabel}
            </div>
            <ul className="space-y-1.5">
              {hotelsPack.includesItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#2c405e]">
                  <Check className="w-3.5 h-3.5 text-[#c59b38] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0b1d3a] text-[#f5ede0] border border-[#d1a847]/50 space-y-2">
            <div className="text-xs font-semibold text-[#fceda2]">
              {hotelsPack.agencyHotelTitle}
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {hotelsPack.agencyHotelDesc}
            </p>
            {onJumpToPlanner && (
              <button
                type="button"
                onClick={onJumpToPlanner}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#fceda2] hover:underline cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
                <span>{hotelsPack.agencyHotelBtn}</span>
              </button>
            )}
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
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
            <span>{hotelsPack.badge}</span>
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
};
