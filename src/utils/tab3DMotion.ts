import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isDesktopViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(min-width: 768px)').matches;
}

/**
 * Slides & resizes a floating GPU-composited indicator element (`data-tab-indicator`)
 * inside a relative container to align cleanly with `[data-tab-active="true"]`.
 * Works for horizontal tab bars, scrollable strips, and multi-row responsive grids.
 */
export function useSlidingTabIndicator(
  containerRef: React.RefObject<HTMLElement | null>,
  indicatorRef: React.RefObject<HTMLElement | null>,
  activeKey: string | number | null | undefined,
  deps: React.DependencyList = []
) {
  const initializedRef = useRef(false);

  const syncPosition = (immediate = false) => {
    const container = containerRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;

    const activeEl = container.querySelector<HTMLElement>('[data-tab-active="true"]');
    if (!activeEl) {
      gsap.set(indicator, { opacity: 0 });
      return;
    }

    const x = activeEl.offsetLeft;
    const y = activeEl.offsetTop;
    const width = activeEl.offsetWidth;
    const height = activeEl.offsetHeight;

    if (width <= 0 || height <= 0) return;

    // Horizontally keep active tab visible inside scrollable nav bars without scrolling the page vertically
    if (container.scrollWidth > container.clientWidth + 4) {
      const targetScrollLeft = Math.max(
        0,
        Math.min(
          container.scrollWidth - container.clientWidth,
          x - container.clientWidth / 2 + width / 2
        )
      );
      if (Math.abs(container.scrollLeft - targetScrollLeft) > 8) {
        container.scrollTo({
          left: targetScrollLeft,
          behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth'
        });
      }
    }

    gsap.killTweensOf(indicator);

    if (immediate || !initializedRef.current || prefersReducedMotion()) {
      gsap.set(indicator, {
        x,
        y,
        width,
        height,
        opacity: 1,
        force3D: true
      });
      initializedRef.current = true;
      return;
    }

    gsap.to(indicator, {
      x,
      y,
      width,
      height,
      opacity: 1,
      duration: 0.42,
      ease: 'power3.out',
      force3D: true,
      overwrite: 'auto'
    });
  };

  useLayoutEffect(() => {
    syncPosition(!initializedRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey, ...deps]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId = 0;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => syncPosition(true));
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(container);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey]);
}

interface Replay3DPanelOptions {
  staggerSelector?: string;
  widgetFadeSelector?: string;
  duration?: number;
  staggerEach?: number;
  yOffset?: number;
  rotateXDeg?: number;
  enabled?: boolean;
}

/**
 * Plays a crisp, GPU-accelerated 3D emergence timeline on a tab/page/panel container
 * and its non-widget children EVERY time `triggerKey` changes.
 * Third-party widget shells marked with `widgetFadeSelector` only receive an opacity fade (never CSS transforms).
 */
export function useReplayable3DPanel(
  panelRef: React.RefObject<HTMLElement | null>,
  triggerKey: string | number | boolean,
  options: Replay3DPanelOptions = {}
) {
  const {
    staggerSelector = '.ggt-3d-stagger',
    widgetFadeSelector = '.ggt-widget-safe-fade',
    duration = 0.5,
    staggerEach = 0.05,
    yOffset = 16,
    rotateXDeg = 4.5,
    enabled = true
  } = options;

  useEffect(() => {
    if (!enabled) return;
    const panel = panelRef.current;
    if (!panel) return;

    const staggerNodes = Array.from(panel.querySelectorAll<HTMLElement>(staggerSelector)).filter(
      (el) => !el.closest('.widget-stability-shell') && !el.closest('[data-widget-protected="true"]')
    );
    const widgetFadeNodes = Array.from(panel.querySelectorAll<HTMLElement>(widgetFadeSelector));

    if (prefersReducedMotion()) {
      gsap.set([panel, ...staggerNodes, ...widgetFadeNodes], {
        opacity: 1,
        clearProps: 'transform,opacity'
      });
      return;
    }

    const desktop = isDesktopViewport();

    const ctx = gsap.context(() => {
      // Kill any in-flight tweens from a previous rapid tab click
      gsap.killTweensOf([panel, ...staggerNodes, ...widgetFadeNodes]);

      // Only apply 3D transforms to the panel root if it does not directly contain a live third-party iframe/widget
      const containsProtectedWidget = Boolean(
        panel.querySelector('.widget-stability-shell, [data-widget-protected="true"]')
      );

      if (!containsProtectedWidget) {
        gsap.fromTo(
          panel,
          desktop
            ? {
                opacity: 0,
                y: yOffset,
                scale: 0.968,
                rotateX: rotateXDeg,
                transformPerspective: 1150,
                transformOrigin: '50% 0%'
              }
            : {
                opacity: 0,
                y: Math.min(12, yOffset),
                scale: 0.982
              },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration,
            ease: 'power3.out',
            force3D: true,
            clearProps: 'transform,opacity'
          }
        );
      }

      if (staggerNodes.length > 0) {
        gsap.fromTo(
          staggerNodes,
          desktop
            ? {
                opacity: 0,
                y: Math.min(16, yOffset),
                scale: 0.972,
                rotateX: Math.min(4, rotateXDeg),
                transformPerspective: 1100
              }
            : {
                opacity: 0,
                y: 10,
                scale: 0.985
              },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: Math.max(0.38, duration - 0.04),
            stagger: { amount: Math.min(0.26, staggerNodes.length * staggerEach), from: 'start' },
            delay: containsProtectedWidget ? 0 : 0.04,
            ease: 'power3.out',
            force3D: true,
            clearProps: 'transform,opacity'
          }
        );
      }

      // Opacity-only reveal on widget-safe wrappers (strictly NO transform/scale/rotate)
      if (widgetFadeNodes.length > 0) {
        gsap.fromTo(
          widgetFadeNodes,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.36,
            ease: 'power2.out',
            clearProps: 'opacity'
          }
        );
      }
    }, panel);

    return () => {
      ctx.revert();
    };
  }, [
    panelRef,
    triggerKey,
    staggerSelector,
    widgetFadeSelector,
    duration,
    staggerEach,
    yOffset,
    rotateXDeg,
    enabled
  ]);
}

/**
 * Coordinates a brief smooth outgoing transition before updating state (`onSwap`),
 * killing any prior transition cleanly if the user rapid-clicks across tabs.
 */
export function switchTabWithTimeline({
  outgoingEl,
  timelineRef,
  onSwap,
  isWidgetSafe = false
}: {
  outgoingEl: HTMLElement | null;
  timelineRef: React.MutableRefObject<gsap.core.Tween | gsap.core.Timeline | null>;
  onSwap: () => void;
  isWidgetSafe?: boolean;
}) {
  if (timelineRef.current) {
    timelineRef.current.kill();
    timelineRef.current = null;
  }

  if (!outgoingEl || prefersReducedMotion()) {
    if (outgoingEl) {
      gsap.set(outgoingEl, { clearProps: 'transform,opacity' });
    }
    onSwap();
    return;
  }

  gsap.killTweensOf(outgoingEl);

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(outgoingEl, { clearProps: 'transform,opacity' });
      timelineRef.current = null;
      onSwap();
    }
  });

  if (isWidgetSafe) {
    // Opacity-only outgoing ease when element surrounds live partner widgets
    tl.to(outgoingEl, {
      opacity: 0.2,
      duration: 0.13,
      ease: 'power2.in'
    });
  } else {
    tl.to(outgoingEl, {
      opacity: 0.12,
      y: -6,
      scale: 0.985,
      duration: 0.14,
      ease: 'power2.in',
      force3D: true
    });
  }

  timelineRef.current = tl;
}

/**
 * Tactile 3D confirmation pulse when selecting a hotel tier, room option, or price package.
 */
export function pulseSelection3D(el: HTMLElement | null) {
  if (!el || prefersReducedMotion()) return;
  gsap.killTweensOf(el);
  gsap.fromTo(
    el,
    {
      scale: 0.982,
      y: 3,
      transformPerspective: 1000
    },
    {
      scale: 1,
      y: 0,
      duration: 0.38,
      ease: 'power3.out',
      force3D: true,
      clearProps: 'transform'
    }
  );
}
