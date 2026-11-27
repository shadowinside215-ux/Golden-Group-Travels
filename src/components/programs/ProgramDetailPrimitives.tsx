import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  MoonStar
} from 'lucide-react';

export type ProgramIconComponent = React.ComponentType<{ className?: string }>;

export interface ProgramTopBarProps {
  backRoute: string;
  backToCategoryLabel: string;
  backToHomeLabel: string;
  rightBadgeLabel: string;
  rightBadgeIcon?: ProgramIconComponent;
  isRtl: boolean;
}

export const ProgramTopBar: React.FC<ProgramTopBarProps> = ({
  backRoute,
  backToCategoryLabel,
  backToHomeLabel,
  rightBadgeLabel,
  rightBadgeIcon: RightBadgeIcon = MoonStar,
  isRtl
}) => (
  <div className="bg-[#071429] border-b border-[#d1a847]/35">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2.5">
        <Link
          to={backRoute}
          className="ggt-btn-3d-return inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/60 text-xs font-semibold uppercase tracking-wider"
        >
          <ArrowLeft
            className={`w-3.5 h-3.5 text-[#d1a847] ggt-return-arrow ${isRtl ? 'rotate-180' : ''}`}
          />
          <span>{backToCategoryLabel}</span>
        </Link>

        <Link
          to="/"
          className="ggt-btn-3d-return inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-transparent hover:bg-[#0b1d3a] text-slate-200 border border-[#d1a847]/30 text-xs font-medium"
        >
          <span>{backToHomeLabel}</span>
        </Link>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/45 text-[11px] font-semibold text-[#fceda2]">
        <RightBadgeIcon className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
        <span>{rightBadgeLabel}</span>
      </div>
    </div>
  </div>
);

export interface ProgramHeroInfoBox {
  label: string;
  value: string;
  icon: ProgramIconComponent;
  highlight?: boolean;
}

export interface ProgramHeroProps {
  heroIcon: ProgramIconComponent;
  eyebrow: string;
  title: string;
  arabicTitle?: string;
  summary: string;
  infoBoxes: [ProgramHeroInfoBox, ProgramHeroInfoBox];
  startingFromLabel: string;
  startingPriceDisplay: string;
  startingPriceSuffix?: string;
  startingPriceScopeNote: string;
  startingPriceScopeIsWarning?: boolean;
  primaryCtaLabel: string;
  onPrimaryCta: () => void;
  secondaryCtaLabel: string;
  onSecondaryCta: () => void;
  image: string;
  imageAlt: string;
  fallbackGradient?: string;
  imageBadgeText?: string;
  imageBadgeIcon?: ProgramIconComponent;
  imageBadgeIsWarning?: boolean;
  isRtl: boolean;
}

export const ProgramHero: React.FC<ProgramHeroProps> = ({
  heroIcon: HeroIcon,
  eyebrow,
  title,
  arabicTitle,
  summary,
  infoBoxes,
  startingFromLabel,
  startingPriceDisplay,
  startingPriceSuffix,
  startingPriceScopeNote,
  startingPriceScopeIsWarning = false,
  primaryCtaLabel,
  onPrimaryCta,
  secondaryCtaLabel,
  onSecondaryCta,
  image,
  imageAlt,
  fallbackGradient,
  imageBadgeText,
  imageBadgeIcon: ImageBadgeIcon = AlertTriangle,
  imageBadgeIsWarning = true,
  isRtl
}) => (
  <section className="relative bg-[#071429] text-[#f5ede0] overflow-hidden border-b-2 border-[#d1a847]/55">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-3">
            <span className="ggt-icon-medallion w-12 h-12 rounded-full bg-[#0b1d3a] border-2 border-[#d1a847] text-[#fceda2] flex items-center justify-center shrink-0">
              <HeroIcon className="w-6 h-6" />
            </span>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0b1d3a] border border-[#d1a847]/55 text-[11px] uppercase tracking-[0.2em] font-semibold text-[#d1a847]">
              <span>{eyebrow}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="font-serif-crest text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#fcf9f2] leading-[1.12] [text-wrap:balance]">
              {title}
            </h1>
            {arabicTitle && (
              <div
                dir="rtl"
                lang="ar"
                className="font-arabic-calligraphy text-2xl sm:text-3xl text-[#fceda2]"
              >
                {arabicTitle}
              </div>
            )}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
              {summary}
            </p>
          </div>

          {/* Consistent 2-box key metadata strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {infoBoxes.map((box, idx) => {
              const BoxIcon = box.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/45 p-3.5"
                >
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[#d1a847] font-semibold flex items-center gap-1.5">
                    <BoxIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>{box.label}</span>
                  </div>
                  <div
                    className={`font-semibold mt-1 leading-snug ${
                      box.highlight ? 'text-[#fceda2]' : 'text-[#fcf9f2]'
                    }`}
                  >
                    {box.value}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Highlighted Starting Price Card */}
          <div className="rounded-xl bg-[#0b1d3a] border-2 border-[#d1a847] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_14px_34px_rgba(0,0,0,0.28)]">
            <div className="space-y-1">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#d1a847] font-semibold">
                {startingFromLabel}
              </div>
              <div className="font-serif-crest text-3xl sm:text-4xl font-bold text-[#fceda2] tabular-nums">
                {startingPriceDisplay}
                {startingPriceSuffix && (
                  <span className="text-sm font-semibold text-slate-200">{startingPriceSuffix}</span>
                )}
              </div>
            </div>
            <div className="sm:max-w-xs text-xs text-slate-100 leading-relaxed border-t sm:border-t-0 sm:border-s border-[#d1a847]/35 pt-3 sm:pt-0 sm:ps-4">
              <span
                className={`font-semibold block ${
                  startingPriceScopeIsWarning ? 'text-amber-200' : 'text-[#fceda2]'
                }`}
              >
                {startingPriceScopeNote}
              </span>
            </div>
          </div>

          {/* Primary + Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <button
              type="button"
              onClick={onPrimaryCta}
              className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#d1a847] hover:bg-[#fceda2] text-[#0b1d3a] text-xs font-bold uppercase tracking-[0.14em] shadow-lg cursor-pointer"
            >
              <span>{primaryCtaLabel}</span>
              <ArrowRight
                className={`w-4 h-4 shrink-0 ggt-forward-arrow ${isRtl ? 'rotate-180' : ''}`}
              />
            </button>

            <button
              type="button"
              onClick={onSecondaryCta}
              className="ggt-btn-3d-return inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847]/70 text-xs font-semibold uppercase tracking-[0.12em] cursor-pointer"
            >
              <span>{secondaryCtaLabel}</span>
            </button>
          </div>
        </div>

        {/* Right 5-col bordered crisp program photo */}
        <div className="lg:col-span-5">
          <div
            className="relative rounded-2xl overflow-hidden border-2 border-[#d1a847]/75 shadow-[0_24px_56px_rgba(0,0,0,0.4)] aspect-[16/11]"
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
              className="absolute inset-0 bg-gradient-to-t from-[#071429]/85 via-transparent to-[#071429]/20"
            />
            {imageBadgeText && (
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071429]/90 border border-[#d1a847]/65 text-[11px] font-semibold text-[#fceda2]">
                  <ImageBadgeIcon
                    className={`w-3.5 h-3.5 shrink-0 ${
                      imageBadgeIsWarning ? 'text-amber-300' : 'text-[#d1a847]'
                    }`}
                  />
                  <span>{imageBadgeText}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export interface ProgramDiscrepancyBannerProps {
  heading: string;
  explanation: string;
  extraContent?: React.ReactNode;
  icon?: ProgramIconComponent;
}

export const ProgramDiscrepancyBanner: React.FC<ProgramDiscrepancyBannerProps> = ({
  heading,
  explanation,
  extraContent,
  icon: Icon = AlertTriangle
}) => (
  <section>
    <div className="rounded-2xl bg-amber-50 border-2 border-amber-400 p-5 sm:p-6 flex items-start gap-3.5 shadow-sm">
      <Icon className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
      <div className="space-y-1 text-xs sm:text-sm text-amber-950 leading-relaxed min-w-0">
        <div className="font-bold text-amber-900">{heading}</div>
        <p>{explanation}</p>
        {extraContent}
      </div>
    </div>
  </section>
);

export const ProgramDivider: React.FC<{ className?: string }> = ({
  className = 'ggt-prog-divider'
}) => (
  <div
    className={`${className} h-px w-full bg-gradient-to-r from-transparent via-[#c59b38]/60 to-transparent`}
  />
);

export interface ProgramSectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  headingClassName?: string;
  rightSlot?: React.ReactNode;
}

export const ProgramSectionHeading: React.FC<ProgramSectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  headingClassName = 'ggt-prog-heading',
  rightSlot
}) => {
  const headingBlock = (
    <div className={`${headingClassName} space-y-1.5 max-w-3xl`}>
      <div className="text-[11px] uppercase tracking-[0.22em] text-[#9a7220] font-semibold">
        {eyebrow}
      </div>
      <h2 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#0b1d3a] [text-wrap:balance]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs sm:text-sm text-[#2c405e] leading-relaxed">{subtitle}</p>
      )}
    </div>
  );

  if (!rightSlot) return headingBlock;

  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
      {headingBlock}
      {rightSlot}
    </div>
  );
};

export interface ProgramInclusionItem {
  key: string;
  icon: ProgramIconComponent;
  title: string;
  detail: string;
}

export interface ProgramInclusionsSectionProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: ProgramInclusionItem[];
  headingClassName?: string;
  cardClassName?: string;
  columnsClassName?: string;
  calloutTitle?: string;
  calloutItems?: string[];
  calloutIcon?: ProgramIconComponent;
  extraSlot?: React.ReactNode;
}

export const ProgramInclusionsSection: React.FC<ProgramInclusionsSectionProps> = ({
  eyebrow,
  title,
  subtitle,
  items,
  headingClassName = 'ggt-prog-heading',
  cardClassName = 'ggt-prog-card',
  columnsClassName = 'grid-cols-1 md:grid-cols-3',
  calloutTitle,
  calloutItems,
  calloutIcon: CalloutIcon = AlertTriangle,
  extraSlot
}) => (
  <section className="space-y-6">
    <ProgramSectionHeading
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      headingClassName={headingClassName}
    />

    <div className={`grid ${columnsClassName} gap-4 sm:gap-5`}>
      {items.map((item) => {
        const ItemIcon = item.icon;
        return (
          <div
            key={item.key}
            className={`${cardClassName} rounded-2xl bg-[#fcf9f2] border-2 border-[#d1a847]/55 p-5 shadow-sm flex items-start gap-4`}
          >
            <span className="w-10 h-10 rounded-xl bg-[#071429] border border-[#d1a847] text-[#fceda2] flex items-center justify-center shrink-0">
              <ItemIcon className="w-5 h-5" />
            </span>
            <div className="space-y-1 min-w-0">
              <h3 className="font-serif-crest text-base sm:text-lg font-semibold text-[#0b1d3a]">
                {item.title}
              </h3>
              <p className="text-xs text-[#2c405e] leading-relaxed">{item.detail}</p>
            </div>
          </div>
        );
      })}
    </div>

    {extraSlot}

    {calloutTitle && calloutItems && calloutItems.length > 0 && (
      <div
        className={`${cardClassName} rounded-2xl bg-[#fcf9f2] border border-amber-500/60 p-5 sm:p-6 space-y-3 shadow-sm`}
      >
        <div className="flex items-center gap-2 text-sm font-bold text-[#0b1d3a]">
          <CalloutIcon className="w-4 h-4 text-amber-700 shrink-0" />
          <span>{calloutTitle}</span>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-[#2c405e]">
          {calloutItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 leading-relaxed">
              <Check className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </section>
);

export interface ProgramConditionNoteEntry {
  key: string;
  icon: ProgramIconComponent;
  title: string;
  detail: string;
}

export interface ProgramConditionsNotesGridProps {
  conditionsEyebrow: string;
  conditionsTitle: string;
  conditions: ProgramConditionNoteEntry[];
  conditionsFooterSlot?: React.ReactNode;
  notesEyebrow: string;
  notesTitle: string;
  notes: ProgramConditionNoteEntry[];
  notesFooterSlot?: React.ReactNode;
  cardClassName?: string;
}

export const ProgramConditionsNotesGrid: React.FC<ProgramConditionsNotesGridProps> = ({
  conditionsEyebrow,
  conditionsTitle,
  conditions,
  conditionsFooterSlot,
  notesEyebrow,
  notesTitle,
  notes,
  notesFooterSlot,
  cardClassName = 'ggt-prog-card'
}) => (
  <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <div
      className={`${cardClassName} lg:col-span-7 rounded-2xl bg-[#fcf9f2] border-2 border-[#d1a847]/65 p-6 sm:p-7 space-y-5 shadow-sm`}
    >
      <div className="space-y-1 pb-3 border-b border-[#d1a847]/35">
        <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
          {conditionsEyebrow}
        </div>
        <h2 className="font-serif-crest text-2xl font-semibold text-[#0b1d3a]">
          {conditionsTitle}
        </h2>
      </div>

      <div className="space-y-4">
        {conditions.map((cond) => {
          const Icon = cond.icon;
          return (
            <div key={cond.key} className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#0b1d3a] text-[#fceda2] border border-[#d1a847]/55 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h3 className="text-sm font-bold text-[#0b1d3a]">{cond.title}</h3>
                <p className="text-xs text-[#2c405e] leading-relaxed">{cond.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {conditionsFooterSlot}
    </div>

    <div
      className={`${cardClassName} lg:col-span-5 rounded-2xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847]/70 p-6 sm:p-7 space-y-5 shadow-[0_18px_42px_rgba(7,20,41,0.18)]`}
    >
      <div className="space-y-1 pb-3 border-b border-[#d1a847]/30">
        <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
          {notesEyebrow}
        </div>
        <h2 className="font-serif-crest text-2xl font-semibold text-[#fcf9f2]">
          {notesTitle}
        </h2>
      </div>

      <div className="space-y-4">
        {notes.map((note) => {
          const Icon = note.icon;
          return (
            <div key={note.key} className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#0b1d3a] text-[#d1a847] border border-[#d1a847]/55 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h3 className="text-sm font-bold text-[#fceda2]">{note.title}</h3>
                <p className="text-xs text-slate-200 leading-relaxed">{note.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {notesFooterSlot}
    </div>
  </section>
);

export interface ProgramBottomNavProps {
  backRoute: string;
  backToCategoryLabel: string;
  backToHomeLabel: string;
  isRtl: boolean;
  dividerClassName?: string;
}

export const ProgramBottomNav: React.FC<ProgramBottomNavProps> = ({
  backRoute,
  backToCategoryLabel,
  backToHomeLabel,
  isRtl,
  dividerClassName = 'ggt-prog-divider'
}) => (
  <>
    <ProgramDivider className={dividerClassName} />
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
      <Link
        to={backRoute}
        className="ggt-btn-3d-return w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.14em] shadow-md transition-colors"
      >
        <ArrowLeft
          className={`w-4 h-4 text-[#d1a847] ggt-return-arrow ${isRtl ? 'rotate-180' : ''}`}
        />
        <span>{backToCategoryLabel}</span>
      </Link>

      <Link
        to="/"
        className="ggt-btn-3d-return w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 min-h-[48px] rounded-xl bg-[#fcf9f2] hover:bg-[#ede1ce] text-[#0b1d3a] border border-[#d1a847]/65 text-xs font-semibold uppercase tracking-[0.12em] transition-colors"
      >
        <span>{backToHomeLabel}</span>
      </Link>
    </div>
  </>
);

export interface ProgramTabOption<T extends string = string> {
  id: T;
  label: string;
  mobileLabel?: string;
}

export interface ProgramTabSwitcherProps<T extends string = string> {
  tablistRef: React.RefObject<HTMLDivElement | null>;
  indicatorRef: React.RefObject<HTMLSpanElement | null>;
  ariaLabel: string;
  options: ProgramTabOption<T>[];
  activeId: T;
  onSelect: (id: T) => void;
  className?: string;
}

export function ProgramTabSwitcher<T extends string = string>({
  tablistRef,
  indicatorRef,
  ariaLabel,
  options,
  activeId,
  onSelect,
  className = ''
}: ProgramTabSwitcherProps<T>) {
  return (
    <div
      ref={tablistRef}
      role="tablist"
      aria-label={ariaLabel}
      className={`relative inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#071429] border border-[#d1a847]/65 shadow-md self-start lg:self-auto ${className}`}
    >
      <span
        ref={indicatorRef}
        aria-hidden="true"
        className="ggt-tab-indicator-pill rounded-lg"
      />
      {options.map((opt) => {
        const active = opt.id === activeId;
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={active}
            data-tab-active={active ? 'true' : undefined}
            data-tab-key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`ggt-tab-3d relative z-10 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              active ? 'text-[#fceda2]' : 'text-slate-200/80 hover:text-[#fceda2]'
            }`}
          >
            {opt.mobileLabel ? (
              <>
                <span className="hidden sm:inline">{opt.label}</span>
                <span className="sm:hidden">{opt.mobileLabel}</span>
              </>
            ) : (
              opt.label
            )}
          </button>
        );
      })}
    </div>
  );
}

export const ProgramComparisonTable: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div
    className={`hidden md:block overflow-x-auto rounded-2xl border-2 border-[#d1a847]/65 bg-[#fcf9f2] shadow-[0_14px_34px_rgba(11,29,58,0.08)] ${className}`}
  >
    <table className="w-full text-sm border-collapse">{children}</table>
  </div>
);

export interface ProgramSelectorInfoCardProps {
  icon: ProgramIconComponent;
  label: string;
  value: string;
  subtext?: string;
  badge?: React.ReactNode;
  warningText?: string;
}

export const ProgramSelectorInfoCard: React.FC<ProgramSelectorInfoCardProps> = ({
  icon: Icon,
  label,
  value,
  subtext,
  badge,
  warningText
}) => (
  <div className="rounded-2xl bg-[#0b1d3a] border border-[#d1a847]/45 p-5 space-y-2">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="text-[11px] uppercase tracking-[0.16em] text-[#d1a847] font-semibold flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 shrink-0" />
        <span>{label}</span>
      </span>
      {badge}
    </div>
    <div className="font-serif-crest text-lg sm:text-xl font-bold text-[#fcf9f2]">{value}</div>
    {subtext && <p className="text-xs text-slate-300 leading-relaxed">{subtext}</p>}
    {warningText && (
      <div className="rounded-xl bg-amber-950/80 border border-amber-400/60 px-3 py-2 text-[11px] text-amber-100 flex items-start gap-2 leading-snug mt-1">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
        <span>{warningText}</span>
      </div>
    )}
  </div>
);

export interface ProgramSelectorChoiceCardProps {
  title: string;
  subtitle?: string;
  priceDisplay: string;
  actionLabel: string;
  isSelected: boolean;
  onSelect: () => void;
  icon: ProgramIconComponent;
  extraText?: string;
}

export const ProgramSelectorChoiceCard: React.FC<ProgramSelectorChoiceCardProps> = ({
  title,
  subtitle,
  priceDisplay,
  actionLabel,
  isSelected,
  onSelect,
  icon: Icon,
  extraText
}) => (
  <button
    type="button"
    onClick={onSelect}
    aria-pressed={isSelected}
    className={`ggt-card-3d-select text-start rounded-2xl p-5 flex flex-col justify-between gap-4 border-2 transition-colors cursor-pointer ${
      isSelected
        ? 'bg-[#d1a847] text-[#0b1d3a] border-[#fceda2] shadow-xl'
        : 'bg-[#0b1d3a] text-[#fcf9f2] border-[#d1a847]/45 hover:border-[#d1a847]'
    }`}
  >
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <span className="font-bold text-sm">{title}</span>
        <Icon
          className={`w-4 h-4 shrink-0 ${
            isSelected ? 'text-[#0b1d3a]' : 'text-[#d1a847]'
          }`}
        />
      </div>
      {subtitle && (
        <div
          className={`text-xs ${
            isSelected ? 'text-[#0b1d3a]/80 font-medium' : 'text-slate-300'
          }`}
        >
          {subtitle}
        </div>
      )}
    </div>

    <div className="space-y-1.5">
      <div
        className={`font-serif-crest text-2xl font-bold tabular-nums ${
          isSelected ? 'text-[#0b1d3a]' : 'text-[#fceda2]'
        }`}
      >
        {priceDisplay}
      </div>
      {extraText && (
        <div
          className={`text-[11px] leading-snug ${
            isSelected ? 'text-[#0b1d3a]/85 font-medium' : 'text-slate-300'
          }`}
        >
          {extraText}
        </div>
      )}
      <div
        className={`text-[11px] font-bold uppercase tracking-wider ${
          isSelected ? 'text-[#0b1d3a]' : 'text-[#d1a847]'
        }`}
      >
        {actionLabel}
      </div>
    </div>
  </button>
);

export interface ProgramSelectorPanelProps {
  panelRef?: React.RefObject<HTMLDivElement | null>;
  eyebrow: string;
  title: string;
  subtitle?: string;
  headerRightSlot?: React.ReactNode;
  children: React.ReactNode;
}

export const ProgramSelectorPanel: React.FC<ProgramSelectorPanelProps> = ({
  panelRef,
  eyebrow,
  title,
  subtitle,
  headerRightSlot,
  children
}) => (
  <div
    ref={panelRef}
    className="rounded-3xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] p-5 sm:p-8 space-y-6 shadow-[0_22px_54px_rgba(7,20,41,0.24)]"
  >
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pb-4 border-b border-[#d1a847]/30">
      <div className="space-y-2">
        <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
          {eyebrow}
        </div>
        <h3 className="font-serif-crest text-2xl sm:text-3xl font-semibold text-[#fcf9f2]">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
      {headerRightSlot}
    </div>
    {children}
  </div>
);

