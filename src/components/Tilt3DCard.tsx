import React, { useRef, useEffect, useState } from 'react';

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  liftZ?: number;
  scrollTilt?: number;
  glareOpacity?: number;
  style?: React.CSSProperties;
}

/**
 * Interactive GPU-accelerated 3D Spatial Tilt Card
 * Features damped spring physics, pointer-tracked golden specular glint,
 * and preserve-3d depth support for layered child elements.
 */
export const Tilt3DCard: React.FC<Tilt3DCardProps> = ({
  children,
  className = '',
  maxTilt = 9,
  liftZ = 18,
  scrollTilt = 0,
  glareOpacity = 0.16,
  style
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const [interactiveEnabled, setInteractiveEnabled] = useState(true);

  const stateRef = useRef({
    targetRx: 0,
    targetRy: 0,
    targetZ: 0,
    targetGlareX: 50,
    targetGlareY: 50,
    targetGlareAlpha: 0,
    curRx: 0,
    curRy: 0,
    curZ: 0,
    curGlareX: 50,
    curGlareY: 50,
    curGlareAlpha: 0,
    isHovered: false,
    rafId: 0
  });

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia?.('(pointer: coarse)').matches;
    if (reduced || coarse) {
      setInteractiveEnabled(false);
    }
  }, []);

  useEffect(() => {
    const s = stateRef.current;
    if (!interactiveEnabled) {
      if (cardRef.current) {
        cardRef.current.style.transform = '';
      }
      return;
    }

    let running = false;

    const tick = () => {
      const card = cardRef.current;
      if (!card) {
        running = false;
        return;
      }

      const targetBaseRx = s.isHovered ? s.targetRx : scrollTilt * 0.45;
      const targetBaseRy = s.isHovered ? s.targetRy : 0;
      const targetBaseZ = s.isHovered ? s.targetZ : 0;
      const targetAlpha = s.isHovered ? s.targetGlareAlpha : 0;

      const damp = 0.14;
      s.curRx += (targetBaseRx - s.curRx) * damp;
      s.curRy += (targetBaseRy - s.curRy) * damp;
      s.curZ += (targetBaseZ - s.curZ) * damp;
      s.curGlareX += (s.targetGlareX - s.curGlareX) * 0.18;
      s.curGlareY += (s.targetGlareY - s.curGlareY) * 0.18;
      s.curGlareAlpha += (targetAlpha - s.curGlareAlpha) * damp;

      card.style.transform = `perspective(1100px) rotateX(${s.curRx.toFixed(3)}deg) rotateY(${s.curRy.toFixed(3)}deg) translate3d(0, 0, ${s.curZ.toFixed(2)}px)`;

      if (glareRef.current) {
        glareRef.current.style.opacity = s.curGlareAlpha.toFixed(3);
        glareRef.current.style.background = `radial-gradient(circle 280px at ${s.curGlareX.toFixed(1)}% ${s.curGlareY.toFixed(1)}%, rgba(252, 237, 162, ${glareOpacity}), rgba(209, 168, 71, ${(glareOpacity * 0.35).toFixed(3)}) 45%, transparent 75%)`;
      }

      const settled =
        !s.isHovered &&
        Math.abs(s.curRx - targetBaseRx) < 0.02 &&
        Math.abs(s.curRy) < 0.02 &&
        Math.abs(s.curZ) < 0.05 &&
        s.curGlareAlpha < 0.005;

      if (settled) {
        if (Math.abs(targetBaseRx) < 0.02) {
          card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0px)';
        }
        running = false;
        s.rafId = 0;
        return;
      }

      s.rafId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!running) {
        running = true;
        s.rafId = requestAnimationFrame(tick);
      }
    };

    // Trigger gentle scroll tilt update when scrollTilt changes
    if (Math.abs(scrollTilt) > 0.05 || Math.abs(s.curRx) > 0.05) {
      startLoop();
    }

    const cardEl = cardRef.current;
    if (!cardEl) return;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const rect = cardEl.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const clampedX = Math.max(0, Math.min(1, px));
      const clampedY = Math.max(0, Math.min(1, py));

      s.isHovered = true;
      s.targetRy = (clampedX - 0.5) * (maxTilt * 2);
      s.targetRx = (0.5 - clampedY) * (maxTilt * 2);
      s.targetZ = liftZ;
      s.targetGlareX = clampedX * 100;
      s.targetGlareY = clampedY * 100;
      s.targetGlareAlpha = 1;
      startLoop();
    };

    const onPointerEnter = () => {
      s.isHovered = true;
      s.targetZ = liftZ;
      s.targetGlareAlpha = 1;
      startLoop();
    };

    const onPointerLeave = () => {
      s.isHovered = false;
      s.targetRx = 0;
      s.targetRy = 0;
      s.targetZ = 0;
      s.targetGlareAlpha = 0;
      startLoop();
    };

    cardEl.addEventListener('pointerenter', onPointerEnter);
    cardEl.addEventListener('pointermove', onPointerMove);
    cardEl.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cardEl.removeEventListener('pointerenter', onPointerEnter);
      cardEl.removeEventListener('pointermove', onPointerMove);
      cardEl.removeEventListener('pointerleave', onPointerLeave);
      if (s.rafId) cancelAnimationFrame(s.rafId);
    };
  }, [interactiveEnabled, maxTilt, liftZ, glareOpacity, scrollTilt]);

  return (
    <div
      ref={cardRef}
      style={style}
      className={`tilt-3d-card preserve-3d will-change-transform ${className}`}
    >
      {/* Pointer-tracked Golden Specular Glint Layer */}
      {interactiveEnabled && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200 z-10"
        />
      )}
      {children}
    </div>
  );
};
