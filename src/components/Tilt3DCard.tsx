import React, { useRef, useState } from 'react';

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  liftZ?: number;
  glareOpacity?: number;
}

export const Tilt3DCard: React.FC<Tilt3DCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  liftZ = 16,
  glareOpacity = 0.16
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformState, setTransformState] = useState({
    rx: 0,
    ry: 0,
    tz: 0,
    glareX: 50,
    glareY: 50,
    hovering: false
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / Math.max(1, rect.width);
    const y = (e.clientY - rect.top) / Math.max(1, rect.height);

    const ry = (x - 0.5) * 2 * maxTilt;
    const rx = -(y - 0.5) * 2 * maxTilt;

    setTransformState({
      rx,
      ry,
      tz: liftZ,
      glareX: x * 100,
      glareY: y * 100,
      hovering: true
    });
  };

  const handlePointerLeave = () => {
    setTransformState((prev) => ({
      ...prev,
      rx: 0,
      ry: 0,
      tz: 0,
      hovering: false
    }));
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `perspective(1200px) rotateX(${transformState.rx}deg) rotateY(${transformState.ry}deg) translateZ(${transformState.tz}px)`,
        transformStyle: 'preserve-3d',
        transition: transformState.hovering
          ? 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)'
          : 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      className={`relative will-change-transform ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-20 transition-opacity duration-300"
        style={{
          opacity: transformState.hovering ? glareOpacity : 0,
          background: `radial-gradient(circle at ${transformState.glareX}% ${transformState.glareY}%, rgba(209, 168, 71, 0.52) 0%, rgba(11, 29, 58, 0.08) 45%, transparent 72%)`
        }}
      />
      {children}
    </div>
  );
};
