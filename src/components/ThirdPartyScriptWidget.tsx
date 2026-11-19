import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';

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
  minHeightClass?: string;
  containerClassName?: string;
  hostClassName?: string;
}

/**
 * Safely mounts a third-party affiliate <script> inside a dedicated React ref container.
 * - Avoids unsafe document.write()
 * - Cleans up injected DOM nodes on unmount to prevent memory leaks or stale IDs across tab switches
 * - Re-triggers Klook dynamic hydration when already loaded on window
 */
export const ThirdPartyScriptWidget: React.FC<ThirdPartyScriptWidgetProps> = ({
  scriptSrc,
  title,
  loadingLabel,
  errorLabel,
  minHeightClass = 'min-h-[240px]',
  containerClassName = 'w-full',
  hostClassName = 'w-full min-w-0'
}) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = hostRef.current;
    if (!container) return;

    let cancelled = false;
    setLoaded(false);
    setFailed(false);

    container.replaceChildren();

    const checkRenderedWidget = () => {
      if (cancelled) return false;
      const hasEmbedded = Boolean(
        container.querySelector(
          'iframe, tp-cascoon, lr-whitelabel, [data-kiwitaxi-white-label] iframe, .klookaff_auto_dynamic_widget iframe, #search-widget > *, #widget-holder > *'
        )
      );
      if (hasEmbedded || container.scrollHeight > 120) {
        setLoaded(true);
        return true;
      }
      return false;
    };

    const observer = new MutationObserver(() => {
      checkRenderedWidget();
    });
    observer.observe(container, { childList: true, subtree: true });

    const script = document.createElement('script');
    script.async = true;
    script.charset = 'utf-8';
    script.src = scriptSrc;

    let fallbackTimer: number | null = null;
    let klookRetryTimer: number | null = null;

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
      }, 280);

      fallbackTimer = window.setTimeout(() => {
        if (!cancelled) {
          setLoaded(true);
        }
      }, 1600);
    });

    container.appendChild(script);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (fallbackTimer !== null) window.clearTimeout(fallbackTimer);
      if (klookRetryTimer !== null) window.clearTimeout(klookRetryTimer);
      container.replaceChildren();
    };
  }, [scriptSrc]);

  return (
    <div className={containerClassName}>
      {!loaded && !failed && (
        <div
          aria-live="polite"
          className="text-center py-6 px-4 text-xs text-[#2c405e]/80 tracking-wide"
        >
          {loadingLabel}
        </div>
      )}

      {failed && (
        <div
          role="status"
          className="rounded-xl bg-[#fcf9f2] border border-[#d1a847]/60 p-4 text-center text-xs text-[#0b1d3a] flex items-center justify-center gap-2"
        >
          <AlertCircle className="w-4 h-4 text-[#9a7220] shrink-0" />
          <span>{errorLabel}</span>
        </div>
      )}

      <div
        ref={hostRef}
        aria-label={title}
        className={`${hostClassName} ${!loaded && !failed ? minHeightClass : ''}`}
      />
    </div>
  );
};
