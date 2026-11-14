import React from 'react';
import { ServiceId } from '../assets/destinations';

export interface ServiceIconProps {
  className?: string;
}

/**
 * Icon 1 — Vols & Billetterie / Flight Bookings
 * Angled commercial jet climbing upper-right, matching Golden Group gold line-art banner.
 */
export const FlightServiceIcon: React.FC<ServiceIconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M54.5 9.5c2.2 2.2.8 6.4-2.8 10L41 30.2l4.8 19.6-4.8 4.8-9.2-15.2-9.4 9.4 1.6 6.8-3.8 3.8-5.2-8.4-8.4-5.2 3.8-3.8 6.8 1.6 9.4-9.4L11.4 25l4.8-4.8 19.6 4.8L46.5 14.3c3.6-3.6 5.8-7 8-4.8z" />
  </svg>
);

/**
 * Icon 2 — Réservations hôtelières / Hotel Reservations
 * Luxury 3-star hotel facade with central entrance and symmetric room windows.
 */
export const HotelServiceIcon: React.FC<ServiceIconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* 3 Stars Arched Above Roof */}
    <path
      d="M32 6l1.4 2.8 3.1.4-2.2 2.2.5 3.1L32 13l-2.8 1.5.5-3.1-2.2-2.2 3.1-.4L32 6z"
      fill="currentColor"
      stroke="none"
    />
    <path
      d="M20.5 9.5l1.1 2.2 2.4.3-1.7 1.7.4 2.4-2.2-1.1-2.2 1.1.4-2.4-1.7-1.7 2.4-.3 1.1-2.2z"
      fill="currentColor"
      stroke="none"
    />
    <path
      d="M43.5 9.5l1.1 2.2 2.4.3-1.7 1.7.4 2.4-2.2-1.1-2.2 1.1.4-2.4-1.7-1.7 2.4-.3 1.1-2.2z"
      fill="currentColor"
      stroke="none"
    />
    {/* Hotel Roofline & Main Facade */}
    <path d="M13 21h38" />
    <path d="M16 21v34h32V21" />
    <path d="M10 55h44" />
    {/* 3x2 Room Window Grid */}
    <rect x="21" y="26" width="5" height="5" rx="0.6" />
    <rect x="29.5" y="26" width="5" height="5" rx="0.6" />
    <rect x="38" y="26" width="5" height="5" rx="0.6" />
    <rect x="21" y="35" width="5" height="5" rx="0.6" />
    <rect x="29.5" y="35" width="5" height="5" rx="0.6" />
    <rect x="38" y="35" width="5" height="5" rx="0.6" />
    {/* Ground Entrance Door & Side Windows */}
    <rect x="21" y="44" width="5" height="5" rx="0.6" />
    <rect x="38" y="44" width="5" height="5" rx="0.6" />
    <path d="M29 55V45.5a3 3 0 0 1 6 0V55" />
  </svg>
);

/**
 * Icon 3 — Accompagnement Visa / Visa Assistance
 * Tilted Passport booklet with globe meridians alongside verified VISA document card.
 */
export const VisaServiceIcon: React.FC<ServiceIconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Tilted Passport Cover */}
    <g transform="rotate(-5 22 30)">
      <rect x="9" y="9" width="26" height="39" rx="3.2" />
      <text
        x="22"
        y="17.2"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        fontSize="4.6"
        fontWeight="700"
        letterSpacing="0.4"
      >
        PASSPORT
      </text>
      <circle cx="22" cy="30" r="8.2" strokeWidth="2" />
      <ellipse cx="22" cy="30" rx="3.8" ry="8.2" strokeWidth="1.6" />
      <path d="M14 30h16M15.4 25.5h13.2M15.4 34.5h13.2" strokeWidth="1.6" />
    </g>

    {/* Overlapping VISA Card */}
    <rect
      x="30"
      y="24"
      width="25"
      height="30"
      rx="3"
      fill="#0b1d3a"
      stroke="currentColor"
      strokeWidth="2.6"
    />
    <text
      x="42.5"
      y="33.5"
      textAnchor="middle"
      fill="currentColor"
      stroke="none"
      fontSize="7"
      fontWeight="800"
      letterSpacing="0.7"
    >
      VISA
    </text>
    <path d="M35 39.5h7M35 44h6M35 48.5h5" strokeWidth="2.2" />
    {/* Verified Checkmark Seal */}
    <circle cx="47.5" cy="44.5" r="5.5" strokeWidth="2.2" />
    <path d="M45 44.6l1.7 1.7 3.4-3.4" strokeWidth="2.1" />
  </svg>
);

/**
 * Icon 4 — Hajj & Umrah / Makkah
 * Sacred Kaaba + Twin Masjid al-Haram Minarets + Crescent Dome + Sweeping Airplane Trail.
 */
export const HajjUmrahServiceIcon: React.FC<ServiceIconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Twin Minarets Behind Haram */}
    <path d="M16.5 29V15.5l2-3.5 2 3.5V29" />
    <path d="M18.5 10v2" />
    <path d="M25.5 29V13.5l2-3.5 2 3.5V29" />
    <path d="M27.5 8v2" />

    {/* Sacred Kaaba Structure */}
    <rect x="11" y="29" width="19" height="17" rx="1.2" fill="currentColor" fillOpacity="0.18" />
    <path d="M11 35h19" strokeWidth="2.8" />
    <path d="M18 39.5v6.5" strokeWidth="2.2" />

    {/* Dome & Crescent on Right */}
    <path d="M32 37.5c0-6 3.5-10.2 7.5-10.2s7.5 4.2 7.5 10.2" />
    <path d="M39.5 27.3v-3.5" />
    <path d="M41.3 20.5a2.6 2.6 0 1 0 0 4.2 2.1 2.1 0 0 1 0-4.2z" fill="currentColor" stroke="none" />

    {/* Sweeping Golden Flight Swoosh + Aircraft Climbing Right */}
    <path d="M8 53.5c13.5-7 25-11.5 39-14.5" strokeWidth="2.6" />
    <path d="M13 55.5c11-5.5 21.5-9.5 34.5-13" strokeWidth="1.6" />
    <path
      d="M50 36l8.5-3.2-5 6.8-1.4 3.4-2.2-3-4.2-.6 4.3-3.4z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

/**
 * Icon 5 — Séjours & Circuits / Holiday Packages
 * Rounded travel suitcase with handle, vertical straps, and angled luggage tag.
 */
export const HolidayPackagesServiceIcon: React.FC<ServiceIconProps> = ({
  className = 'w-6 h-6'
}) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Carry Handle */}
    <path d="M24 18v-4.5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3V18" />
    {/* Main Suitcase Body */}
    <rect x="9" y="18" width="46" height="33" rx="6" />
    {/* Vertical Buckle Straps */}
    <path d="M21 18v33M43 18v33" />
    {/* Hanging Luggage Tag */}
    <path d="M43 26l6 6-5.5 5.5-6-6V26H43z" fill="currentColor" fillOpacity="0.15" />
    <circle cx="41.2" cy="29.2" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * Icon 6 — Travel Insurance
 * Matching gold-line protective shield with centered verified checkmark emblem.
 */
export const InsuranceServiceIcon: React.FC<ServiceIconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M32 8L12 16v15c0 12.6 8.4 22.8 20 26 11.6-3.2 20-13.4 20-26V16L32 8z" />
    <path d="M23.5 32.5l5.8 5.8 11.7-12.3" />
  </svg>
);

export const SERVICE_ICONS: Record<ServiceId, React.ComponentType<ServiceIconProps>> = {
  'flight-bookings': FlightServiceIcon,
  'hotel-reservations': HotelServiceIcon,
  'visa-assistance': VisaServiceIcon,
  'hajj-umrah': HajjUmrahServiceIcon,
  'travel-insurance': InsuranceServiceIcon,
  'holiday-packages': HolidayPackagesServiceIcon
};
