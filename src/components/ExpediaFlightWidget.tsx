import React, { useEffect, useRef, useState } from 'react';
import { MapPin, ShieldCheck } from 'lucide-react';
import { Language } from '../assets/destinations';
import { SEARCH_ENGINE_PACKS } from '../assets/searchEngineData';
import { EXPEDIA_WIDGET_COPY } from '../assets/servicePagesData';
import { EXPEDIA_FLIGHTS_WIDGET_CONFIG } from '../config/travelSuppliers';
import { ensureExpediaScript, ensureExpediaStylesheet } from '../utils/expediaLoader';

interface ExpediaFlightWidgetProps {
  lang: Language;
  onJumpToPlanner?: () => void;
  whatsappInternational: string;
  displayPhone: string;
  compact?: boolean;
}

function isCleanEmpty(value: string | null): boolean {
  return value === null || value === '' || value === 'undefined' || value === 'null';
}

function getCleanAttr(element: HTMLElement, attr: string): string | null {
  const val = element.getAttribute(attr);
  return typeof val === 'string' ? val.replace(/^\s*(\S*)\s*$/, '$1') : val;
}

export const ExpediaFlightWidget: React.FC<ExpediaFlightWidgetProps> = ({
  lang,
  onJumpToPlanner,
  whatsappInternational,
  displayPhone,
  compact = false
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [frameReady, setFrameReady] = useState(false);

  const flightsPack = SEARCH_ENGINE_PACKS[lang].flights;
  const expediaCopy = EXPEDIA_WIDGET_COPY[lang];

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let cancelled = false;
    let instanceId = element.getAttribute('data-instance') || '';
    setFrameReady(false);

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
      const baseSrc = scriptEl?.getAttribute('src') || EXPEDIA_FLIGHTS_WIDGET_CONFIG.scriptSrc;
      const widgetsUrl =
        baseSrc.replace(/(.*\/products\/widgets).*/, '$1') ||
        EXPEDIA_FLIGHTS_WIDGET_CONFIG.widgetsBaseUrl;

      if (!el.classList.contains(`eg-${widget}-widget`)) {
        el.classList.add(`eg-${widget}-widget`);
      }

      const frame = document.createElement('iframe');
      frame.className = `eg-widget-frame eg-${widget}-widget-frame`;
      frame.title = expediaCopy.flights.iframeTitle;
      frame.src = `${widgetsUrl}/${widget}-widget${queryString ? `?${queryString}` : ''}`;
      frame.style.width = '100%';
      frame.style.height = '0';
      frame.style.margin = 'auto';
      frame.style.border = 'none';

      el.appendChild(frame);
      window.eg.widgets.elements[instanceId] = el;
    };

    const handleResizeMessage = (event: MessageEvent) => {
      if (event.origin !== EXPEDIA_FLIGHTS_WIDGET_CONFIG.origin) return;
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

    const scriptEl = ensureExpediaScript();
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
      }, 450);
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
      element.removeAttribute('data-instance');
    };
  }, [expediaCopy.flights.iframeTitle]);

  const buildDirectFlightQuoteUrl = () => {
    const msg =
      'Bonjour Golden Group Travels, je souhaite obtenir un devis pour un billet d’avion.';
    return `https://wa.me/${whatsappInternational}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className={compact ? 'space-y-3.5' : 'space-y-5'}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-1 max-w-2xl">
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
            {flightsPack.expediaBadge}
          </div>
          {!compact && (
            <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
              {flightsPack.expediaTitle}
            </h3>
          )}
          <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">
            {flightsPack.expediaSubtitle}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 text-[11px] text-[#2c405e] bg-[#f5ede0]/90 border border-[#d1a847]/45 rounded-xl px-3 py-1.5 shrink-0">
          <ShieldCheck className="w-4 h-4 text-[#c59b38] shrink-0" />
          <span className="max-w-xs">{flightsPack.expediaNote}</span>
        </div>
      </div>

      {/* Official Expedia Flights-Only Widget Host (data-lobs="flights") */}
      <div
        className={`rounded-2xl bg-[#f5ede0]/75 border border-[#d1a847]/50 shadow-inner overflow-x-auto ${
          compact ? 'px-2.5 py-3 sm:p-4' : 'p-3 sm:p-5 lg:p-6'
        }`}
      >
        <div
          className={`w-full max-w-[600px] mx-auto flex flex-col justify-center ${
            frameReady ? '' : compact ? 'min-h-[180px]' : 'min-h-[220px]'
          }`}
        >
          {!frameReady && (
            <div className="text-center py-5 text-xs text-[#2c405e]/80 tracking-wide">
              {expediaCopy.loadingLabel}
            </div>
          )}
          <div
            ref={containerRef}
            className="eg-widget"
            data-widget={EXPEDIA_FLIGHTS_WIDGET_CONFIG.widget}
            data-program={EXPEDIA_FLIGHTS_WIDGET_CONFIG.program}
            data-lobs={EXPEDIA_FLIGHTS_WIDGET_CONFIG.lobs}
            data-network={EXPEDIA_FLIGHTS_WIDGET_CONFIG.network}
            data-camref={EXPEDIA_FLIGHTS_WIDGET_CONFIG.camref}
            data-pubref={EXPEDIA_FLIGHTS_WIDGET_CONFIG.pubref}
          />
        </div>
      </div>

      {/* Agency Concierge Complementary Assistance Bar */}
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
