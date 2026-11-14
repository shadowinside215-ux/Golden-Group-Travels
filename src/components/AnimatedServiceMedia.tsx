import React, { useState } from 'react';
import { Compass } from 'lucide-react';

interface AnimatedServiceMediaProps {
  src: string;
  alt: string;
  fallbackGradient: string;
  variant?: 'slow' | 'alt';
  aspectClass?: string;
  className?: string;
  children?: React.ReactNode;
}

export const AnimatedServiceMedia: React.FC<AnimatedServiceMediaProps> = ({
  src,
  alt,
  fallbackGradient,
  variant = 'slow',
  aspectClass = 'aspect-[16/9]',
  className = '',
  children
}) => {
  const [imgBroken, setImgBroken] = useState(false);

  return (
    <div
      className={`relative w-full overflow-hidden group ${aspectClass} ${className}`}
      style={{ background: fallbackGradient }}
    >
      {!imgBroken ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setImgBroken(true)}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06] ${
            variant === 'alt' ? 'animate-kenburns-alt' : 'animate-kenburns-slow'
          }`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-[#f5ede0]">
          <Compass className="w-9 h-9 text-[#d1a847] mb-2" />
          <span className="font-serif-crest text-base text-center">{alt}</span>
        </div>
      )}

      {/* Subtle golden atmospheric light sheen glide across photography */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-[#fceda2]/16 to-transparent animate-gold-sheen"
      />

      {children}
    </div>
  );
};
