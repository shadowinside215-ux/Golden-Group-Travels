import React, { useEffect, useState } from 'react';

interface BrandLoadingScreenProps {
  onStartReveal: () => void;
  onFinished: () => void;
}

export const BrandLoadingScreen: React.FC<BrandLoadingScreenProps> = ({
  onStartReveal,
  onFinished
}) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let cancelled = false;
    let dismissed = false;
    let fadeTimer = 0;
    let doneTimer = 0;

    const triggerDismiss = () => {
      if (cancelled || dismissed) return;
      dismissed = true;
      setFadingOut(true);
      onStartReveal();
      doneTimer = window.setTimeout(() => {
        if (!cancelled) onFinished();
      }, reduced ? 120 : 520);
    };

    const minDisplayMs = reduced ? 280 : 1450;
    const startTime = performance.now();

    const waitFonts =
      typeof document !== 'undefined' && document.fonts?.ready
        ? document.fonts.ready.catch(() => undefined)
        : Promise.resolve();

    waitFonts.then(() => {
      if (cancelled || dismissed) return;
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, minDisplayMs - elapsed);
      fadeTimer = window.setTimeout(triggerDismiss, remaining);
    });

    // Hard failsafe so the loading screen never stalls under any network condition
    const failsafeTimer = window.setTimeout(triggerDismiss, reduced ? 450 : 2200);

    return () => {
      cancelled = true;
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
      window.clearTimeout(failsafeTimer);
    };
  }, [onStartReveal, onFinished]);

  const handleManualDismiss = () => {
    if (fadingOut) return;
    setFadingOut(true);
    onStartReveal();
    window.setTimeout(onFinished, 480);
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Golden Group Travels"
      onClick={handleManualDismiss}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#041533] px-6 py-8 select-none cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        fadingOut ? 'opacity-0 scale-[1.03] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle radial navy & warm champagne gold ambient glow matching the official logo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 46%, rgba(209, 168, 71, 0.22) 0%, rgba(11, 29, 58, 0.45) 38%, rgba(4, 21, 51, 0.98) 76%)'
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center gap-7 sm:gap-9 max-w-full">
        {/* Large 1:1 Square Golden Group Crest */}
        <div className="animate-splash-crest relative w-[min(64vw,260px)] sm:w-[min(44vw,320px)] md:w-[360px] aspect-square rounded-3xl border-2 border-[#d1a847]/75 bg-[#041533] shadow-[0_28px_80px_rgba(0,0,0,0.68)] overflow-hidden p-1.5 sm:p-2">
          <img
            src="/assets/aistudio/Golden_Group_Travel_Logo__1__824306ae.png"
            alt="Golden Group - Travel Services & Events"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain rounded-2xl"
          />
        </div>

        {/* Hairline Champagne Gold Loading Progress Indicator */}
        <div className="w-[min(56vw,240px)] sm:w-[270px] h-[3px] rounded-full bg-[#d1a847]/20 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-[#c59b38] via-[#fceda2] to-[#d1a847] animate-splash-bar" />
        </div>
      </div>
    </div>
  );
};
