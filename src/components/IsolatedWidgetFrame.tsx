import React, { memo, useEffect, useId, useMemo, useRef, useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Language } from '../assets/destinations';

const RETRY_LABEL: Record<Language, string> = {
  fr: 'Réessayer',
  ar: 'إعادة المحاولة',
  en: 'Retry',
  es: 'Reintentar'
};

interface IsolatedWidgetFrameProps {
  scriptSrc: string;
  title: string;
  loadingLabel: string;
  errorLabel: string;
  lang?: Language;
  minHeight?: number;
  containerClassName?: string;
}

/**
 * Hosts a third-party widget <script> inside a dedicated isolated document (iframe srcDoc).
 * Memoized + srcDoc memoized on [frameId, scriptSrc] so language changes or parent state updates
 * never reload the frame. Uses non-shifting overlaid loading status and strict postMessage source verification.
 */
export const IsolatedWidgetFrame: React.FC<IsolatedWidgetFrameProps> = memo(
  ({
    scriptSrc,
    title,
    loadingLabel,
    errorLabel,
    lang = 'fr',
    minHeight = 320,
    containerClassName = 'w-full'
  }) => {
    const frameId = useId();
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const [height, setHeight] = useState<number>(minHeight);
    const [ready, setReady] = useState(false);
    const [failed, setFailed] = useState(false);
    const [retryNonce, setRetryNonce] = useState(0);

    const srcDoc = useMemo(() => {
      const safeId = JSON.stringify(frameId);
      const safeSrc = JSON.stringify(scriptSrc);
      return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <base target="_blank" />
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background: transparent;
        overflow-x: hidden;
        font-family: system-ui, -apple-system, sans-serif;
      }
      #ggt-isolated-root {
        width: 100%;
        min-height: 1px;
      }
      .js-wegotrip-widget {
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
    </style>
  </head>
  <body>
    <div id="ggt-isolated-root"></div>
    <script>
      (function () {
        window.addEventListener('error', function (ev) {
          var msg = ev && ev.message ? String(ev.message) : '';
          if (
            msg === 'ResizeObserver loop completed with undelivered notifications.' ||
            msg === 'ResizeObserver loop limit exceeded' ||
            (msg === 'Script error.' && !ev.filename && !ev.lineno && !ev.colno && ev.error == null) ||
            /request timed out/i.test(msg)
          ) {
            ev.stopImmediatePropagation();
            ev.preventDefault();
          }
        }, true);
        window.addEventListener('unhandledrejection', function (ev) {
          var reason = ev && ev.reason;
          var msg = reason && typeof reason === 'object' && 'message' in reason
            ? String(reason.message)
            : String(reason || '');
          if (/request timed out/i.test(msg)) {
            ev.stopImmediatePropagation();
            ev.preventDefault();
          }
        }, true);
        var FRAME_ID = ${safeId};
        var SCRIPT_SRC = ${safeSrc};
        var root = document.getElementById('ggt-isolated-root');
        var lastH = 0;

        function postHeight() {
          var h = Math.max(
            document.documentElement.scrollHeight || 0,
            document.body.scrollHeight || 0,
            root ? root.scrollHeight : 0
          );
          if (h > 40 && Math.abs(h - lastH) > 2) {
            lastH = h;
            try {
              window.parent.postMessage({ type: 'ggt-isolated-height', id: FRAME_ID, height: h }, '*');
            } catch (e) {}
          }
        }

        if (typeof ResizeObserver === 'function') {
          var roRaf = 0;
          var ro = new ResizeObserver(function () {
            if (roRaf) cancelAnimationFrame(roRaf);
            roRaf = requestAnimationFrame(postHeight);
          });
          ro.observe(document.body);
          if (root) ro.observe(root);
        }

        if (typeof MutationObserver === 'function') {
          var mo = new MutationObserver(function () {
            window.setTimeout(postHeight, 120);
          });
          mo.observe(document.body, { childList: true, subtree: true });
        }

        window.addEventListener('load', function () {
          window.setTimeout(postHeight, 250);
          window.setTimeout(postHeight, 1200);
        });

        var s = document.createElement('script');
        s.async = true;
        s.charset = 'utf-8';
        s.src = SCRIPT_SRC;
        s.onload = function () {
          window.setTimeout(postHeight, 350);
          window.setTimeout(postHeight, 1400);
        };
        s.onerror = function () {
          try {
            window.parent.postMessage({ type: 'ggt-isolated-error', id: FRAME_ID }, '*');
          } catch (e) {}
        };
        if (root) {
          root.appendChild(s);
        } else {
          document.body.appendChild(s);
        }
      })();
    </script>
  </body>
</html>`;
    }, [frameId, scriptSrc]);

    useEffect(() => {
      setReady(false);
      setFailed(false);
      setHeight(minHeight);

      const onMessage = (event: MessageEvent) => {
        if (!iframeRef.current || event.source !== iframeRef.current.contentWindow) return;

        const data = event.data as
          | { type?: string; id?: string; height?: number }
          | undefined;
        if (!data || data.id !== frameId) return;

        if (
          data.type === 'ggt-isolated-height' &&
          typeof data.height === 'number' &&
          Number.isFinite(data.height)
        ) {
          const clamped = Math.min(3200, Math.max(minHeight, Math.ceil(data.height) + 12));
          setHeight(clamped);
          setReady(true);
          setFailed(false);
        } else if (data.type === 'ggt-isolated-error') {
          setFailed(true);
        }
      };

      window.addEventListener('message', onMessage);
      const timeoutId = window.setTimeout(() => {
        setReady((currReady) => {
          if (!currReady) {
            setFailed(true);
          }
          return currReady;
        });
      }, 14000);

      return () => {
        window.removeEventListener('message', onMessage);
        window.clearTimeout(timeoutId);
      };
    }, [frameId, minHeight, scriptSrc, retryNonce]);

    return (
      <div className={`relative overflow-x-clip widget-stability-shell ${containerClassName}`}>
        {!ready && !failed && (
          <div
            aria-live="polite"
            className="pointer-events-none absolute inset-x-0 top-3 z-10 flex justify-center px-3"
          >
            <span className="text-xs text-[#2c405e]/85 tracking-wide bg-[#fcf9f2]/95 px-3 py-1 rounded-md">
              {loadingLabel}
            </span>
          </div>
        )}

        {failed && !ready && (
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

        <iframe
          key={`${frameId}-${retryNonce}`}
          ref={iframeRef}
          title={title}
          srcDoc={srcDoc}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          style={{
            width: '100%',
            height: `${height}px`,
            border: 'none',
            display: 'block',
            background: 'transparent'
          }}
        />
      </div>
    );
  }
);
