import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Eye, LucideIcon, ShieldCheck } from 'lucide-react';

export interface ProgramCardInfoBox {
  label?: string;
  value: string;
  icon?: LucideIcon;
  variant?: 'navy' | 'warning';
}

export interface ProgramCardProps {
  className?: string;
  image: string;
  imageAlt: string;
  fallbackGradient?: string;
  badgeIcon?: LucideIcon;
  badgeText: string;
  arabicTitle?: string;
  title: string;
  topBannerLabel: string;
  summary: string;
  startingFromLabel: string;
  startingPriceDisplay: string;
  startingPriceScopeNote?: string;
  startingPriceScopeIsWarning?: boolean;
  infoBox1: {
    label: string;
    value: string;
    icon?: LucideIcon;
  };
  infoBox2: ProgramCardInfoBox;
  detailsTo: string;
  detailsLabel: string;
  bookingTo: string;
  bookingLabel: string;
  isRtl: boolean;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  className = '',
  image,
  imageAlt,
  fallbackGradient,
  badgeIcon: BadgeIcon = ShieldCheck,
  badgeText,
  arabicTitle,
  title,
  topBannerLabel,
  summary,
  startingFromLabel,
  startingPriceDisplay,
  startingPriceScopeNote,
  startingPriceScopeIsWarning = false,
  infoBox1,
  infoBox2,
  detailsTo,
  detailsLabel,
  bookingTo,
  bookingLabel,
  isRtl
}) => {
  const InfoBox1Icon = infoBox1.icon;
  const InfoBox2Icon = infoBox2.icon ?? AlertTriangle;
  const isBox2Warning = infoBox2.variant === 'warning';

  return (
    <article
      className={`ggt-prog-card rounded-3xl overflow-hidden bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] shadow-[0_24px_60px_rgba(4,12,28,0.28)] ${className}`.trim()}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left 5-col photo panel with dark gradient scrim, top badge, and bottom title */}
        <div
          className="lg:col-span-5 relative min-h-[250px] sm:min-h-[290px] lg:min-h-full overflow-hidden"
          style={fallbackGradient ? { background: fallbackGradient } : undefined}
        >
          <img
            src={image}
            alt={imageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#071429] via-[#071429]/45 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[#071429]/30 lg:to-[#071429] rtl:lg:bg-gradient-to-l"
          />
          <div className="absolute top-4 inset-x-4 flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fceda2]">
              <BadgeIcon className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
              <span>{badgeText}</span>
            </span>
          </div>
          <div className="absolute bottom-4 inset-x-5 flex items-end justify-between gap-3">
            <div>
              {arabicTitle && (
                <div
                  lang="ar"
                  dir="rtl"
                  className="font-arabic-calligraphy text-2xl sm:text-3xl text-[#fceda2]"
                >
                  {arabicTitle}
                </div>
              )}
              <h3 className="font-serif-crest text-xl sm:text-2xl font-semibold text-white">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Right 7-col content area matching Omra Chaâbane card layout verbatim */}
        <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between gap-5">
          <div className="space-y-4">
            {/* Top header: highlight pill + summary on left, Starting Price Box on right */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#d1a847]/30">
              <div className="space-y-1.5 min-w-0">
                <div className="inline-flex items-center self-start px-3.5 py-1.5 rounded-xl bg-[#0b1d3a] border border-[#d1a847]/55 text-xs font-bold text-[#fceda2]">
                  {topBannerLabel}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{summary}</p>
              </div>

              <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847] px-4 py-3 shrink-0 self-start max-w-xs">
                <div className="text-[10px] uppercase tracking-[0.16em] text-[#d1a847] font-semibold">
                  {startingFromLabel}
                </div>
                <div className="font-serif-crest text-2xl font-bold text-[#fceda2] tabular-nums mt-0.5">
                  {startingPriceDisplay}
                </div>
                {startingPriceScopeNote && (
                  <div
                    className={`text-[11px] mt-0.5 leading-snug ${
                      startingPriceScopeIsWarning ? 'text-amber-200' : 'text-slate-300'
                    }`}
                  >
                    {startingPriceScopeNote}
                  </div>
                )}
              </div>
            </div>

            {/* Consistent 2-box date & important information row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3">
                <div className="text-[10px] uppercase tracking-[0.14em] text-[#d1a847] font-semibold flex items-center gap-1.5">
                  {InfoBox1Icon && <InfoBox1Icon className="w-3.5 h-3.5 shrink-0" />}
                  <span>{infoBox1.label}</span>
                </div>
                <div className="font-semibold text-white mt-0.5 leading-snug">
                  {infoBox1.value}
                </div>
              </div>

              {isBox2Warning ? (
                <div className="rounded-xl bg-amber-950/55 border border-amber-400/50 p-3 text-amber-100 flex items-start gap-2">
                  <InfoBox2Icon className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 min-w-0">
                    {infoBox2.label && (
                      <div className="text-[10px] uppercase tracking-[0.14em] text-amber-300 font-semibold">
                        {infoBox2.label}
                      </div>
                    )}
                    <div className="leading-snug">{infoBox2.value}</div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3">
                  {infoBox2.label && (
                    <div className="text-[10px] uppercase tracking-[0.14em] text-[#d1a847] font-semibold flex items-center gap-1.5">
                      {infoBox2.icon && <infoBox2.icon className="w-3.5 h-3.5 shrink-0" />}
                      <span>{infoBox2.label}</span>
                    </div>
                  )}
                  <div className="font-semibold text-white mt-0.5 leading-snug">
                    {infoBox2.value}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Two equally sized action buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to={detailsTo}
              className="ggt-btn-3d-return flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.12em] transition-colors text-center leading-snug whitespace-normal py-2.5"
            >
              <Eye className="w-4 h-4 shrink-0" />
              <span>{detailsLabel}</span>
            </Link>

            <Link
              to={bookingTo}
              className="ggt-btn-3d-return flex-1 min-w-[180px] inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/70 text-xs font-bold uppercase tracking-[0.12em] transition-colors text-center leading-snug whitespace-normal py-2.5"
            >
              <span>{bookingLabel}</span>
              <ArrowRight
                className={`w-4 h-4 shrink-0 ggt-forward-arrow ${isRtl ? 'rotate-180' : ''}`}
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
