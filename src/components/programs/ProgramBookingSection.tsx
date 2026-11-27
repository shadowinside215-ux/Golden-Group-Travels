import React from 'react';
import {
  AlertCircle,
  ArrowRight,
  ExternalLink,
  MapPin,
  Phone,
  Users
} from 'lucide-react';
import { ProgramIconComponent, ProgramSectionHeading } from './ProgramDetailPrimitives';

export interface ReadySummaryItem {
  label: string;
  value: string;
  accent?: boolean;
}

export interface ProgramBookingSectionProps {
  sectionRef?: React.RefObject<HTMLElement | null>;
  sectionId: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  headingClassName?: string;
  uid: string;
  isRtl: boolean;

  // Ready / WhatsApp state
  inquiryReady: boolean;
  readyCardRef?: React.RefObject<HTMLDivElement | null>;
  readyProgramTitle: string;
  readyTitle: string;
  readySubtitle: string;
  readyEditBtn: string;
  onEditInquiry: () => void;
  readySummaryItems: ReadySummaryItem[];
  readyAlertSlot?: React.ReactNode;
  whatsappHref: string;
  readyWhatsappBtn: string;

  // Form props
  onSubmit: (e: React.FormEvent) => void;
  formSpecificChildren: React.ReactNode;
  fullName: string;
  onFullNameChange: (val: string) => void;
  nameLabel: string;
  namePlaceholder: string;
  nameRequiredMark?: boolean;
  phone: string;
  onPhoneChange: (val: string) => void;
  phoneLabel: string;
  phonePlaceholder: string;
  phoneRequiredMark?: boolean;
  notes: string;
  onNotesChange: (val: string) => void;
  notesLabel: string;
  notesPlaceholder: string;
  formErrors: string[];
  submitBtnLabel: string;
  noAutoConfirmNote: string;

  // Sidebar live quote & advisor
  quoteBoxRef?: React.RefObject<HTMLDivElement | null>;
  quoteEyebrow: string;
  quoteTitle: string;
  quoteSubtitle?: string;
  quoteBodyChildren: React.ReactNode;

  advisorLabel: string;
  advisorTitle: string;
  advisorWhatsappHref?: string;
  advisorWhatsappLabel?: string;
  advisorCallLabel: string;
  advisorMapsLabel: string;
  displayPhone: string;
  whatsappInternational: string;
  onJumpToHomePlanner: () => void;
}

export const ProgramBookingSection: React.FC<ProgramBookingSectionProps> = ({
  sectionRef,
  sectionId,
  eyebrow,
  title,
  subtitle,
  headingClassName = 'ggt-prog-heading',
  uid,
  isRtl,
  inquiryReady,
  readyCardRef,
  readyProgramTitle,
  readyTitle,
  readySubtitle,
  readyEditBtn,
  onEditInquiry,
  readySummaryItems,
  readyAlertSlot,
  whatsappHref,
  readyWhatsappBtn,
  onSubmit,
  formSpecificChildren,
  fullName,
  onFullNameChange,
  nameLabel,
  namePlaceholder,
  nameRequiredMark = true,
  phone,
  onPhoneChange,
  phoneLabel,
  phonePlaceholder,
  phoneRequiredMark = true,
  notes,
  onNotesChange,
  notesLabel,
  notesPlaceholder,
  formErrors,
  submitBtnLabel,
  noAutoConfirmNote,
  quoteBoxRef,
  quoteEyebrow,
  quoteTitle,
  quoteSubtitle,
  quoteBodyChildren,
  advisorLabel,
  advisorTitle,
  advisorWhatsappHref,
  advisorWhatsappLabel,
  advisorCallLabel,
  advisorMapsLabel,
  displayPhone,
  whatsappInternational,
  onJumpToHomePlanner
}) => (
  <section ref={sectionRef} id={sectionId} className="space-y-6 scroll-mt-28 sm:scroll-mt-36">
    <ProgramSectionHeading
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      headingClassName={headingClassName}
    />

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
      <div className="lg:col-span-8">
        {inquiryReady ? (
          <div
            ref={readyCardRef}
            className="rounded-2xl bg-[#071429] text-[#f5ede0] border-2 border-[#d1a847] p-6 sm:p-8 space-y-6 shadow-[0_24px_56px_rgba(7,20,41,0.22)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#d1a847]/30">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
                  {readyProgramTitle}
                </div>
                <h3 className="font-serif-crest text-2xl font-semibold text-[#fcf9f2]">
                  {readyTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={onEditInquiry}
                className="self-start sm:self-auto px-3.5 py-2 rounded-lg bg-[#0b1d3a] hover:bg-[#132d56] border border-[#d1a847]/55 text-xs font-semibold text-[#fceda2] cursor-pointer"
              >
                {readyEditBtn}
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{readySubtitle}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {readySummaryItems.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl bg-[#0b1d3a] border border-[#d1a847]/35 p-3.5"
                >
                  <div className="text-slate-400">{item.label}</div>
                  <div
                    className={`font-semibold mt-0.5 ${
                      item.accent ? 'text-[#fceda2]' : 'text-[#fcf9f2]'
                    }`}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {readyAlertSlot}

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ggt-btn-3d-return w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-colors"
            >
              <span>{readyWhatsappBtn}</span>
              <ExternalLink className="w-4 h-4 shrink-0 ggt-forward-arrow" />
            </a>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/65 p-5 sm:p-7 space-y-5 shadow-[0_18px_42px_rgba(11,29,58,0.08)]"
          >
            {formSpecificChildren}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor={`${uid}-prog-name`}
                  className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                >
                  {nameLabel}
                  {nameRequiredMark ? ' *' : ''}
                </label>
                <input
                  id={`${uid}-prog-name`}
                  type="text"
                  maxLength={120}
                  value={fullName}
                  onChange={(e) => onFullNameChange(e.target.value)}
                  placeholder={namePlaceholder}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                />
              </div>
              <div>
                <label
                  htmlFor={`${uid}-prog-phone`}
                  className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
                >
                  {phoneLabel}
                  {phoneRequiredMark ? ' *' : ''}
                </label>
                <input
                  id={`${uid}-prog-phone`}
                  type="tel"
                  maxLength={40}
                  dir="ltr"
                  value={phone}
                  onChange={(e) => onPhoneChange(e.target.value)}
                  placeholder={phonePlaceholder}
                  className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor={`${uid}-prog-notes`}
                className="block text-xs font-bold uppercase tracking-[0.12em] text-[#0b1d3a] mb-1.5"
              >
                {notesLabel}
              </label>
              <textarea
                id={`${uid}-prog-notes`}
                rows={2}
                maxLength={320}
                value={notes}
                onChange={(e) => onNotesChange(e.target.value)}
                placeholder={notesPlaceholder}
                className="w-full bg-[#f5ede0]/80 border border-[#d1a847]/60 rounded-xl px-3.5 py-2.5 text-sm text-[#0b1d3a] focus:outline-none focus:border-[#0b1d3a]"
              />
            </div>

            {formErrors.length > 0 && (
              <div
                role="alert"
                className="rounded-xl bg-amber-50 border border-amber-300 px-4 py-3 text-xs text-amber-950 space-y-1"
              >
                {formErrors.map((err, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{err}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3 pt-1">
              <button
                type="submit"
                className="ggt-btn-3d-return w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 min-h-[48px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.15em] shadow-md transition-colors cursor-pointer"
              >
                <span>{submitBtnLabel}</span>
                <ArrowRight
                  className={`w-4 h-4 text-[#d1a847] ggt-forward-arrow ${isRtl ? 'rotate-180' : ''}`}
                />
              </button>
              <p className="text-[11px] text-[#2c405e] leading-relaxed">{noAutoConfirmNote}</p>
            </div>
          </form>
        )}
      </div>

      {/* Right Sidebar: Live Quote Summary & Agency Direct Assistance */}
      <aside className="lg:col-span-4 space-y-5">
        <div
          ref={quoteBoxRef}
          className="rounded-2xl bg-[#0b1d3a] text-[#f5ede0] border border-[#d1a847]/65 p-5 sm:p-6 space-y-4 shadow-[0_18px_42px_rgba(4,12,28,0.25)]"
        >
          <div className="space-y-1">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#d1a847] font-semibold">
              {quoteEyebrow}
            </div>
            <h3 className="font-serif-crest text-xl font-semibold text-[#fcf9f2]">
              {quoteTitle}
            </h3>
            {quoteSubtitle && (
              <div className="text-xs text-slate-300 pt-0.5 leading-snug">{quoteSubtitle}</div>
            )}
          </div>

          {quoteBodyChildren}
        </div>

        <div className="rounded-2xl bg-[#fcf9f2] border border-[#d1a847]/60 p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="space-y-1">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#9a7220] font-semibold">
              {advisorLabel}
            </div>
            <h4 className="font-serif-crest text-lg font-semibold text-[#0b1d3a]">
              {advisorTitle}
            </h4>
          </div>

          <div className="space-y-2.5">
            <a
              href={advisorWhatsappHref ?? `https://wa.me/${whatsappInternational}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-[44px] rounded-xl bg-[#0b1d3a] hover:bg-[#132d56] text-[#fceda2] border border-[#d1a847] text-xs font-bold uppercase tracking-[0.12em] transition-colors"
            >
              <span>{advisorWhatsappLabel ?? `WhatsApp (${displayPhone})`}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
            </a>

            <a
              href="tel:0666484815"
              className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-[44px] rounded-xl bg-[#ede1ce] hover:bg-[#e3d2b6] text-[#0b1d3a] border border-[#d1a847]/65 text-xs font-semibold uppercase tracking-[0.12em] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#9a7220] shrink-0" />
              <span dir="ltr">
                {advisorCallLabel} · {displayPhone}
              </span>
            </a>

            <button
              type="button"
              onClick={onJumpToHomePlanner}
              className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-[44px] rounded-xl bg-transparent hover:bg-[#f5ede0] text-[#0b1d3a] border border-[#d1a847]/45 text-xs font-semibold uppercase tracking-[0.1em] transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#c59b38] shrink-0" />
              <span>{advisorMapsLabel}</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  </section>
);

export interface ProgramQuoteBreakdownRow {
  label: string;
  value: string;
  accent?: boolean;
}

export interface ProgramQuoteRateBlockProps {
  breakdownRows?: ProgramQuoteBreakdownRow[];
  perPersonLabel: string;
  perPersonValue: string;
  groupLabel?: string;
  groupValue?: string;
  groupIcon?: ProgramIconComponent;
}

export const ProgramQuoteRateBlock: React.FC<ProgramQuoteRateBlockProps> = ({
  breakdownRows,
  perPersonLabel,
  perPersonValue,
  groupLabel,
  groupValue,
  groupIcon: GroupIcon = Users
}) => (
  <div className="space-y-2.5 text-xs">
    {breakdownRows && breakdownRows.length > 0 && (
      <div className="space-y-2">
        {breakdownRows.map((row, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-2 pb-2 border-b border-[#d1a847]/25"
          >
            <span className="text-slate-300">{row.label}</span>
            <span
              className={`font-semibold tabular-nums ${
                row.accent ? 'text-[#fceda2]' : 'text-[#fcf9f2]'
              }`}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    )}

    <div className="pt-1">
      <div className="text-[11px] text-slate-400">{perPersonLabel}</div>
      <div className="font-serif-crest text-3xl font-bold text-[#fceda2] tabular-nums mt-0.5">
        {perPersonValue}
      </div>
    </div>

    {groupLabel && groupValue && (
      <div className="rounded-xl bg-[#071429] border border-[#d1a847]/45 p-3 flex items-center justify-between gap-2">
        <span className="text-slate-300 flex items-center gap-1.5">
          <GroupIcon className="w-3.5 h-3.5 text-[#d1a847] shrink-0" />
          <span>{groupLabel}</span>
        </span>
        <span className="font-serif-crest text-lg font-bold text-[#fceda2] tabular-nums">
          {groupValue}
        </span>
      </div>
    )}
  </div>
);

export const ProgramQuoteRecapBox: React.FC<{
  title?: string;
  lines: string[];
}> = ({ title, lines }) => (
  <div className="rounded-xl bg-[#071429]/90 border border-[#d1a847]/35 p-3.5 space-y-1.5 text-[11px] text-slate-200 leading-relaxed">
    {title && <div className="font-bold text-[#d1a847]">{title}</div>}
    {lines.map((line, idx) => (
      <div key={idx}>{line}</div>
    ))}
  </div>
);

export const ProgramQuoteNoticeBox: React.FC<{
  text: string;
  title?: string;
  variant?: 'amber' | 'neutral';
}> = ({ text, title, variant = 'amber' }) => (
  <div
    className={
      variant === 'amber'
        ? 'rounded-xl bg-amber-950/65 border border-amber-400/50 p-3 text-[11px] text-amber-100 leading-relaxed space-y-1'
        : 'rounded-xl bg-[#071429]/90 border border-[#d1a847]/35 p-3 text-[11px] text-slate-200 leading-relaxed space-y-1'
    }
  >
    {title && (
      <div
        className={`font-bold ${
          variant === 'amber' ? 'text-amber-200' : 'text-[#d1a847]'
        }`}
      >
        {title}
      </div>
    )}
    <div>{text}</div>
  </div>
);

