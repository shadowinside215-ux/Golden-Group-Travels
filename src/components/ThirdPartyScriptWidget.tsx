import React, { memo, useEffect, useRef, useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Language } from '../assets/destinations';

const RETRY_LABEL: Record<Language, string> = {
  fr: 'Réessayer',
  ar: 'إعادة المحاولة',
  en: 'Retry',
  es: 'Reintentar'
};

declare global {
  interface Window {
    klookaff_auto_dynamic_widget?: {
      run?: () => void;
    };
  }
}

interface ThirdPartyScriptWidgetProps {
  scriptSrc: string;
  title: string;
  loadingLabel: string;
  errorLabel: string;
  lang?: Language;
  minHeightClass?: string;
  containerClassName?: string;
  hostClassName?: string;
}

/**
 * Safely mounts a third-party affiliate <script> inside a dedicated React ref container.
 * - Uses React.memo + [scriptSrc, retryNonce]-only effect so language switches or scroll animations never reload widgets
 * - Uses non-flow-shifting loading overlay & stable height floors (including verified GetRentacar postMessage height sync)
 * - Uses overflow-x-clip (never overflow-x-hidden/auto which force accidental overflow-y: auto scroll traps)
 * - Cleans up injected Localrent teleports on unmount
 */
export const ThirdPartyScriptWidget: React.FC<ThirdPartyScriptWidgetProps> = memo(
  ({
    scriptSrc,
    title,
    loadingLabel,
    errorLabel,
    lang = 'fr',
    minHeightClass = 'min-h-[240px]',
    containerClassName = 'w-full',
    hostClassName = 'w-full min-w-0'
  }) => {
    const hostRef = useRef<HTMLDivElement | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [failed, setFailed] = useState(false);
    const [managedHeightPx, setManagedHeightPx] = useState<number | null>(null);
    const [retryNonce, setRetryNonce] = useState(0);

    useEffect(() => {
      const container = hostRef.current;
      if (!container) return;

      let cancelled = false;
      let stableLoadedTimer: number | null = null;
      let klookRetryTimer: number | null = null;
      let loadCheckTimer: number | null = null;
      let failTimeoutTimer: number | null = null;

      setLoaded(false);
      setFailed(false);
      setManagedHeightPx(null);

      container.replaceChildren();

      const markLoadedOncePainted = (delayMs = 150) => {
        if (cancelled || stableLoadedTimer !== null) return;
        stableLoadedTimer = window.setTimeout(() => {
          if (!cancelled) {
            setLoaded(true);
            setFailed(false);
          }
        }, delayMs);
      };

      const checkRenderedWidget = () => {
        if (cancelled) return false;
        const frame = container.querySelector<HTMLIFrameElement>(
          'iframe, #getrentacar_iframe, #intuiIframe'
        );
        const hasElement = Boolean(
          frame ||
            container.querySelector(
              'tp-cascoon, lr-whitelabel, [data-kiwitaxi-white-label] iframe, .klookaff_auto_dynamic_widget iframe, [data-tiqets-widget] iframe, #search-widget iframe, #widget-holder iframe'
            )
        );
        if (hasElement || container.scrollHeight > 110) {
          markLoadedOncePainted(frame ? 220 : 140);
          return true;
        }
        return false;
      };

      // Sync official GetRentacar widget iframe height from its embedded resize postMessage
      const handlePartnerMessage = (event: MessageEvent) => {
        if (cancelled) return;
        if (event.origin !== 'https://getrentacar.com') return;
        const data = event.data as { source?: string; height?: number } | undefined;
        if (
          data &&
          data.source === 'getrenacar' &&
          typeof data.height === 'number' &&
          Number.isFinite(data.height) &&
          data.height > 80
        ) {
          const grcFrame = container.querySelector<HTMLIFrameElement>('#getrentacar_iframe');
          if (grcFrame && event.source === grcFrame.contentWindow) {
            const nextH = Math.min(2800, Math.max(260, Math.ceil(data.height)));
            grcFrame.style.minHeight = '0';
            grcFrame.style.height = `${nextH}px`;
            setManagedHeightPx(nextH);
            setLoaded(true);
            setFailed(false);
          }
        }
      };
      window.addEventListener('message', handlePartnerMessage);

      const observer = new MutationObserver(() => {
        checkRenderedWidget();
      });
      observer.observe(container, { childList: true, subtree: true });

      const script = document.createElement('script');
      script.async = true;
      script.charset = 'utf-8';
      script.src = scriptSrc;

      script.addEventListener('error', () => {
        if (!cancelled) {
          setFailed(true);
        }
      });

      script.addEventListener('load', () => {
        if (cancelled) return;
        klookRetryTimer = window.setTimeout(() => {
          if (cancelled) return;
          if (
            container.querySelector('.klookaff_auto_dynamic_widget') &&
            !container.querySelector('.klookaff_auto_dynamic_widget iframe') &&
            typeof window.klookaff_auto_dynamic_widget?.run === 'function'
          ) {
            window.klookaff_auto_dynamic_widget.run();
          }
          checkRenderedWidget();
        }, 320);

        loadCheckTimer = window.setTimeout(() => {
          if (!cancelled) {
            checkRenderedWidget();
          }
        }, 2200);
      });

      failTimeoutTimer = window.setTimeout(() => {
        if (!cancelled && !checkRenderedWidget()) {
          setFailed(true);
        }
      }, 14000);

      container.appendChild(script);

      return () => {
        cancelled = true;
        observer.disconnect();
        window.removeEventListener('message', handlePartnerMessage);
        if (stableLoadedTimer !== null) window.clearTimeout(stableLoadedTimer);
        if (klookRetryTimer !== null) window.clearTimeout(klookRetryTimer);
        if (loadCheckTimer !== null) window.clearTimeout(loadCheckTimer);
        if (failTimeoutTimer !== null) window.clearTimeout(failTimeoutTimer);
        container.replaceChildren();

        // Clean up any orphaned Localrent teleport host or loader tag in document on unmount
        if (!document.querySelector('lr-whitelabel')) {
          document.querySelectorAll('lr-whitelabel-teleport').forEach((node) => node.remove());
          document
            .querySelectorAll('script[src="https://static.localrent.com/wl/loader.js"]')
            .forEach((node) => node.remove());
        }
      };
    }, [scriptSrc, retryNonce]);

    return (
      <div className={`relative overflow-x-clip widget-stability-shell ${containerClassName}`}>
        {!loaded && !failed && (
          <div
            aria-live="polite"
            className="pointer-events-none absolute inset-x-0 top-3 z-10 flex justify-center px-3"
          >
            <span className="text-xs text-[#2c405e]/85 tracking-wide bg-[#fcf9f2]/95 px-3 py-1 rounded-md">
              {loadingLabel}
            </span>
          </div>
        )}

        {failed && !loaded && (
          <div
            role="status"
            className="rounded-xl bg-[#f5ede0] border border-[#d1a847]/55 p-4 mb-3 text-center text-xs text-[#0b1d3a] flex flex-col sm:flex-row items-center justify-center gap-2.5"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#9a7220] shrink-0" />
              <span>{errorLabel}</span>
            </div>
            <button
              type="button"
              onClick={() => setRetryNonce((n) => n + 1)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
            >
              <RefreshCw className="w-3 h-3 text-[#d1a847]" />
              <span>{RETRY_LABEL[lang]}</span>
            </button>
          </div>
        )}

        <div
          ref={hostRef}
          aria-label={title}
          style={managedHeightPx !== null ? { minHeight: `${managedHeightPx}px` } : undefined}
          className={`${hostClassName} ${managedHeightPx === null ? minHeightClass : ''}`}
        />
      </div>
    );
  }
);
