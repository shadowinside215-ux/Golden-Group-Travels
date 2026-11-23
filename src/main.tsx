import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Tier 1 Google Maps Platform Quota Defense (module root before React renders)
(window as unknown as { gm_authFailure?: () => void }).gm_authFailure = () => {
  window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
};

const origConsoleError = console.error;
console.error = (...args: unknown[]) => {
  origConsoleError.apply(console, args);
  const msg = args.map((a) => String(a)).join(' ');
  if (msg.includes('OverQuotaMapError') || msg.includes('QuotaExceededError')) {
    window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
  }
};

// Suppress benign browser ResizeObserver loops, opaque cross-origin Script error., and third-party timeout rejections
window.addEventListener(
  'error',
  (event) => {
    const file = event.filename ? String(event.filename) : '';
    const isFromOwnOrigin = Boolean(file && file.startsWith(window.location.origin));
    const isResizeObserverLoop =
      event.message === 'ResizeObserver loop completed with undelivered notifications.' ||
      event.message === 'ResizeObserver loop limit exceeded';
    const isOpaqueCrossOriginScriptError =
      event.message === 'Script error.' &&
      !file &&
      !event.lineno &&
      !event.colno &&
      event.error == null;
    const isThirdPartyTimeout =
      /request timed out/i.test(event.message || '') && (!file || !isFromOwnOrigin);

    if (isResizeObserverLoop || isOpaqueCrossOriginScriptError || isThirdPartyTimeout) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  },
  true
);

window.addEventListener(
  'unhandledrejection',
  (event) => {
    const reason = event.reason as { message?: unknown; stack?: unknown } | string | undefined;
    const msg =
      reason && typeof reason === 'object' && 'message' in reason
        ? String(reason.message ?? '')
        : String(reason ?? '');
    const stack =
      reason && typeof reason === 'object' && 'stack' in reason ? String(reason.stack ?? '') : '';
    const isThirdPartyStack =
      /tpemb|tpembars|localrent|getrentacar|expedia|klook|tiqets|wegotrip|kiwitaxi|intui|googletagmanager|google-analytics|maps\.googleapis/i.test(
        stack
      );
    const isOwnOriginOnly = Boolean(
      stack && stack.includes(window.location.origin) && !isThirdPartyStack
    );

    if (
      (/request timed out/i.test(msg) && !isOwnOriginOnly) ||
      (isThirdPartyStack && /timeout|timed out|abort|network/i.test(msg))
    ) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  },
  true
);

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
