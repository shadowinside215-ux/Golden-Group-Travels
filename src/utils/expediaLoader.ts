const EXPEDIA_SCRIPT_SRC =
  'https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js';
const EXPEDIA_STYLE_SRC =
  'https://creator.expediagroup.com/products/widgets/assets/eg-widgets.css';

export function ensureExpediaStylesheet(): void {
  if (typeof document === 'undefined') return;
  if (document.querySelector('link.eg-widgets-style')) return;
  const link = document.createElement('link');
  link.className = 'eg-widgets-style';
  link.rel = 'stylesheet';
  link.href = EXPEDIA_STYLE_SRC;
  document.head.appendChild(link);
}

/**
 * Lazily injects Expedia's widget script at most once globally so initial load stays fast
 * and switching back/forth between services never initializes duplicate scripts.
 */
export function ensureExpediaScript(): HTMLScriptElement | null {
  if (typeof document === 'undefined') return null;
  const existing = document.querySelector<HTMLScriptElement>('script.eg-widgets-script');
  if (existing) return existing;

  const script = document.createElement('script');
  script.className = 'eg-widgets-script';
  script.src = EXPEDIA_SCRIPT_SRC;
  script.async = true;
  document.body.appendChild(script);
  return script;
}
