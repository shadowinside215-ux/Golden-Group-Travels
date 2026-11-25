import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

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
      gsap.killTweensOf([panel, ...staggerNodes, ...widgetFadeNodes]);

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

export interface WindowPopScrollConfig {
  cards?: string;
  headings?: string;
  dividers?: string;
  media?: string;
  refreshDelayMs?: number;
}

function isProtectedWidgetNode(el: HTMLElement): boolean {
  return Boolean(
    el.classList.contains('widget-stability-shell') ||
      el.closest('.widget-stability-shell') ||
      el.closest('[data-widget-protected="true"]') ||
      el.querySelector('.widget-stability-shell, [data-widget-protected="true"]')
  );
}

/**
 * Advanced GSAP ScrollTrigger engine creating silky-smooth 3D "windows popping out"
 * spatial depth on scroll, with staggered row emergence, champagne-gold bloom,
 * reverse tuck on scroll-up, fastScrollEnd responsiveness, and strict widget protection.
 */
export function setupWindowPopScroll3D(
  root: HTMLElement | Document,
  config: WindowPopScrollConfig
): () => void {
  const { cards, headings, dividers, media, refreshDelayMs = 160 } = config;
  const mm = gsap.matchMedia();

  const queryNodes = (selector?: string): HTMLElement[] => {
    if (!selector) return [];
    return Array.from(root.querySelectorAll<HTMLElement>(selector));
  };

  mm.add(
    {
      isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
      isMobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)'
    },
    (context) => {
      const isDesktop = Boolean(context.conditions?.isDesktop);
      const viewportH = window.innerHeight || 800;

      // 1. Floating 3D Cards / Windows ("windows popping out")
      const cardNodes = queryNodes(cards).filter((el) => !isProtectedWidgetNode(el));
      if (cardNodes.length > 0) {
        const belowFoldCards: HTMLElement[] = [];
        const aboveOrInViewCards: HTMLElement[] = [];

        cardNodes.forEach((el, idx) => {
          const rect = el.getBoundingClientRect();
          if (rect.top >= viewportH * 0.93) {
            belowFoldCards.push(el);
            gsap.set(
              el,
              isDesktop
                ? {
                    opacity: 0,
                    y: 44,
                    scale: 0.87,
                    rotateX: 11,
                    rotateY: idx % 2 === 0 ? -3 : 3,
                    z: -48,
                    transformPerspective: 1300,
                    transformOrigin: '50% 60%'
                  }
                : {
                    opacity: 0,
                    y: 22,
                    scale: 0.92,
                    transformOrigin: '50% 60%'
                  }
            );
          } else {
            aboveOrInViewCards.push(el);
          }
        });

        if (aboveOrInViewCards.length > 0) {
          gsap.fromTo(
            aboveOrInViewCards,
            isDesktop
              ? {
                  opacity: 0.15,
                  y: 24,
                  scale: 0.93,
                  rotateX: 6,
                  transformPerspective: 1300
                }
              : { opacity: 0.25, y: 12, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              rotateY: 0,
              z: 0,
              duration: 0.56,
              stagger: 0.055,
              ease: 'back.out(1.2)',
              force3D: true,
              overwrite: 'auto',
              onStart: () =>
                aboveOrInViewCards.forEach((el) => el.classList.add('ggt-window-popped'))
            }
          );
        }

        if (belowFoldCards.length > 0) {
          ScrollTrigger.batch(belowFoldCards, {
            start: 'top 93%',
            end: 'bottom 5%',
            fastScrollEnd: true,
            onEnter: (batch) => {
              const els = batch as HTMLElement[];
              gsap.to(els, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                z: 0,
                duration: isDesktop ? 0.58 : 0.44,
                ease: 'back.out(1.24)',
                stagger: { each: 0.06, from: 'start' },
                force3D: true,
                overwrite: 'auto',
                onStart: () => els.forEach((el) => el.classList.add('ggt-window-popped'))
              });
            },
            onLeave: (batch) => {
              gsap.set(batch, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                z: 0
              });
            },
            onEnterBack: (batch) => {
              const els = batch as HTMLElement[];
              gsap.to(els, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                z: 0,
                duration: 0.45,
                ease: 'expo.out',
                stagger: { each: 0.045, from: 'end' },
                force3D: true,
                overwrite: 'auto',
                onStart: () => els.forEach((el) => el.classList.add('ggt-window-popped'))
              });
            },
            onLeaveBack: (batch) => {
              const els = batch as HTMLElement[];
              els.forEach((el) => el.classList.remove('ggt-window-popped'));
              gsap.to(
                els,
                isDesktop
                  ? {
                      opacity: 0,
                      y: 36,
                      scale: 0.88,
                      rotateX: 10,
                      z: -42,
                      duration: 0.26,
                      ease: 'power2.in',
                      stagger: 0.025,
                      force3D: true,
                      overwrite: 'auto'
                    }
                  : {
                      opacity: 0,
                      y: 18,
                      scale: 0.93,
                      duration: 0.22,
                      ease: 'power2.in',
                      force3D: true,
                      overwrite: 'auto'
                    }
              );
            }
          });
        }
      }

      // 2. Editorial Headings — Crisp 3D Tilt Emergence
      const headingNodes = queryNodes(headings).filter((el) => !isProtectedWidgetNode(el));
      if (headingNodes.length > 0) {
        const belowHeadings: HTMLElement[] = [];
        headingNodes.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top >= viewportH * 0.94) {
            belowHeadings.push(el);
            gsap.set(
              el,
              isDesktop
                ? {
                    opacity: 0,
                    y: 26,
                    scale: 0.94,
                    rotateX: 9,
                    transformPerspective: 1150,
                    transformOrigin: '50% 50%'
                  }
                : { opacity: 0, y: 14, scale: 0.96 }
            );
          }
        });

        if (belowHeadings.length > 0) {
          ScrollTrigger.batch(belowHeadings, {
            start: 'top 93%',
            fastScrollEnd: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                duration: 0.52,
                ease: 'expo.out',
                stagger: 0.05,
                force3D: true,
                overwrite: 'auto'
              });
            },
            onEnterBack: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                duration: 0.4,
                ease: 'expo.out',
                force3D: true,
                overwrite: 'auto'
              });
            },
            onLeaveBack: (batch) => {
              gsap.to(
                batch,
                isDesktop
                  ? {
                      opacity: 0,
                      y: 22,
                      scale: 0.95,
                      rotateX: 8,
                      duration: 0.24,
                      ease: 'power2.in',
                      force3D: true,
                      overwrite: 'auto'
                    }
                  : {
                      opacity: 0,
                      y: 12,
                      scale: 0.97,
                      duration: 0.2,
                      ease: 'power2.in',
                      force3D: true,
                      overwrite: 'auto'
                    }
              );
            }
          });
        }
      }

      // 3. Champagne Gold Dividers — Expanding Laser Beam
      const dividerNodes = queryNodes(dividers);
      if (dividerNodes.length > 0) {
        const belowDividers: HTMLElement[] = [];
        dividerNodes.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top >= viewportH * 0.95) {
            belowDividers.push(el);
            gsap.set(el, { scaleX: 0.06, opacity: 0.12, transformOrigin: 'center center' });
          }
        });

        if (belowDividers.length > 0) {
          ScrollTrigger.batch(belowDividers, {
            start: 'top 94%',
            fastScrollEnd: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                scaleX: 1,
                opacity: 1,
                duration: 0.56,
                ease: 'expo.out',
                force3D: true,
                overwrite: 'auto'
              });
            },
            onLeaveBack: (batch) => {
              gsap.to(batch, {
                scaleX: 0.06,
                opacity: 0.12,
                duration: 0.24,
                ease: 'power2.in',
                force3D: true,
                overwrite: 'auto'
              });
            }
          });
        }
      }

      // 4. Showcase / Feature Photography Windows
      const mediaNodes = queryNodes(media).filter((el) => !isProtectedWidgetNode(el));
      if (mediaNodes.length > 0) {
        const belowMedia: HTMLElement[] = [];
        mediaNodes.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top >= viewportH * 0.94) {
            belowMedia.push(el);
            gsap.set(
              el,
              isDesktop
                ? {
                    opacity: 0.12,
                    y: 28,
                    scale: 0.9,
                    rotateX: 6,
                    rotateY: -4,
                    z: -32,
                    transformPerspective: 1300
                  }
                : { opacity: 0.2, y: 16, scale: 0.95 }
            );
          }
        });

        if (belowMedia.length > 0) {
          ScrollTrigger.batch(belowMedia, {
            start: 'top 93%',
            fastScrollEnd: true,
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                z: 0,
                duration: 0.64,
                ease: 'expo.out',
                force3D: true,
                overwrite: 'auto'
              });
            },
            onLeaveBack: (batch) => {
              gsap.to(
                batch,
                isDesktop
                  ? {
                      opacity: 0.12,
                      y: 24,
                      scale: 0.91,
                      rotateX: 5,
                      rotateY: -3,
                      duration: 0.26,
                      ease: 'power2.in',
                      force3D: true,
                      overwrite: 'auto'
                    }
                  : {
                      opacity: 0.2,
                      y: 14,
                      scale: 0.95,
                      duration: 0.22,
                      ease: 'power2.in',
                      force3D: true,
                      overwrite: 'auto'
                    }
              );
            }
          });
        }
      }
    }
  );

  let reverted = false;
  const refreshId = window.setTimeout(() => {
    if (!reverted) {
      ScrollTrigger.refresh();
    }
  }, refreshDelayMs);

  return () => {
    reverted = true;
    window.clearTimeout(refreshId);
    queryNodes(cards).forEach((el) => el.classList.remove('ggt-window-popped'));
    mm.revert();
  };
}

