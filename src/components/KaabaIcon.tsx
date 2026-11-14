import React from 'react';

/**
 * Architectural Kaaba / Makkah SVG icon for the El Omra category.
 * Uses crisp geometric strokes with golden kiswah band and door detail.
 */
export const KaabaIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.65"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Outer Sacred Kaaba Cube */}
    <path d="M12 3L4 7.2v9.6L12 21l8-4.2V7.2L12 3z" />
    {/* Center Vertical Corner Ridge */}
    <path d="M12 11.4V21" />
    <path d="M4 7.2l8 4.2 8-4.2" />
    {/* Upper Kiswah Gold Calligraphy Band */}
    <path d="M4 10.1l8 4.2 8-4.2" />
    {/* Sacred Golden Door Accent */}
    <path d="M15.2 15.8v-2.6l2.2-1.15v2.6" />
  </svg>
);
