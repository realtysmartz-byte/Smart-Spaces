'use client'

import React from 'react'
import { CategoryWaveCards, WaveCardItem } from './category-wave-cards'

export function OfficeOptionsSection() {
  const items: WaveCardItem[] = [
    {
      id: 'grade-a',
      title: 'Grade A Offices',
      desc: 'Premium towers with modern specifications, central AC, and amenities.',
      href: '/projects?type=office',
      theme: 'blue',
      badgeGradient: 'bg-gradient-to-br from-[#0084FF] to-[#0055D4]',
      badgeShadow: 'shadow-[0_6px_16px_rgba(0,102,255,0.3)]',
      waveGradient: {
        from: '#38BDF8',
        mid: '#0070F3',
        to: '#0047E0',
      },
      waveBackGradient: {
        from: '#BAE6FD',
        to: '#7DD3FC',
      },
      arrowColor: 'text-[#0066FF]',
      renderIcon: () => (
        /* Office building facade with windows */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 text-white"
        >
          <path d="M4 22h16" />
          <path d="M7 22V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
          <path d="M10 8h.01" />
          <path d="M14 8h.01" />
          <path d="M10 12h.01" />
          <path d="M14 12h.01" />
          <path d="M10 16h.01" />
          <path d="M14 16h.01" />
        </svg>
      ),
      renderWatermark: () => (
        /* Subtle architectural glass skyscrapers silhouette in top right */
        <svg
          viewBox="0 0 120 120"
          fill="none"
          className="w-24 h-24 text-[#0066FF] opacity-15"
        >
          {/* Main Tower */}
          <rect x="45" y="15" width="40" height="95" rx="3" fill="currentColor" fillOpacity="0.4" />
          <rect x="52" y="24" width="8" height="10" rx="1" fill="#FFFFFF" fillOpacity="0.6" />
          <rect x="68" y="24" width="8" height="10" rx="1" fill="#FFFFFF" fillOpacity="0.6" />
          <rect x="52" y="42" width="8" height="10" rx="1" fill="#FFFFFF" fillOpacity="0.6" />
          <rect x="68" y="42" width="8" height="10" rx="1" fill="#FFFFFF" fillOpacity="0.6" />
          <rect x="52" y="60" width="8" height="10" rx="1" fill="#FFFFFF" fillOpacity="0.6" />
          <rect x="68" y="60" width="8" height="10" rx="1" fill="#FFFFFF" fillOpacity="0.6" />
          {/* Back Tall Spire Tower */}
          <polygon points="65,4 62,15 68,15" fill="currentColor" />
          {/* Left Tower */}
          <rect x="20" y="40" width="30" height="70" rx="2" fill="currentColor" fillOpacity="0.25" />
          <rect x="26" y="50" width="6" height="8" rx="1" fill="#FFFFFF" fillOpacity="0.5" />
          <rect x="36" y="50" width="6" height="8" rx="1" fill="#FFFFFF" fillOpacity="0.5" />
          <rect x="26" y="66" width="6" height="8" rx="1" fill="#FFFFFF" fillOpacity="0.5" />
          <rect x="36" y="66" width="6" height="8" rx="1" fill="#FFFFFF" fillOpacity="0.5" />
          {/* Right Tower */}
          <rect x="80" y="50" width="28" height="60" rx="2" fill="currentColor" fillOpacity="0.2" />
        </svg>
      ),
    },
    {
      id: 'managed',
      title: 'Managed Offices',
      desc: 'Plug-and-play spaces with furniture and maintenance included.',
      href: '/projects?type=office',
      theme: 'purple',
      badgeGradient: 'bg-gradient-to-br from-[#A855F7] to-[#7E22CE]',
      badgeShadow: 'shadow-[0_6px_16px_rgba(168,85,247,0.3)]',
      waveGradient: {
        from: '#C084FC',
        mid: '#9333EA',
        to: '#6B21A8',
      },
      waveBackGradient: {
        from: '#E9D5FF',
        to: '#C084FC',
      },
      arrowColor: 'text-[#9333EA]',
      renderIcon: () => (
        /* Workstation desk with monitor */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 text-white"
        >
          <rect width="14" height="10" x="5" y="3" rx="2" />
          <path d="M12 13v4" />
          <path d="M8 17h8" />
          <path d="M3 21h18" />
        </svg>
      ),
      renderWatermark: () => (
        /* Workspace with hanging lamps and ergonomic desk setup */
        <svg
          viewBox="0 0 120 120"
          fill="none"
          className="w-24 h-24 text-[#9333EA] opacity-15"
        >
          {/* Hanging Pendant Lamps */}
          <line x1="45" y1="0" x2="45" y2="28" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="45,28 36,40 54,40" fill="currentColor" fillOpacity="0.5" />
          <line x1="85" y1="0" x2="85" y2="20" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="85,20 78,32 92,32" fill="currentColor" fillOpacity="0.5" />
          {/* Ergonomic Office Chair */}
          <rect x="55" y="48" width="22" height="26" rx="4" fill="currentColor" fillOpacity="0.3" />
          <path d="M50 74 h32 r2" stroke="currentColor" strokeWidth="3" />
          <line x1="66" y1="76" x2="66" y2="92" stroke="currentColor" strokeWidth="3" />
          <circle cx="56" cy="95" r="2.5" fill="currentColor" />
          <circle cx="66" cy="95" r="2.5" fill="currentColor" />
          <circle cx="76" cy="95" r="2.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'boutique',
      title: 'Boutique Offices',
      desc: 'Smaller, characterful spaces for teams wanting a unique identity.',
      href: '/projects?type=office',
      theme: 'orange',
      badgeGradient: 'bg-gradient-to-br from-[#FB923C] to-[#EA580C]',
      badgeShadow: 'shadow-[0_6px_16px_rgba(251,146,60,0.3)]',
      waveGradient: {
        from: '#FDBA74',
        mid: '#F97316',
        to: '#C2410C',
      },
      waveBackGradient: {
        from: '#FED7AA',
        to: '#FDBA74',
      },
      arrowColor: 'text-[#EA580C]',
      renderIcon: () => (
        /* Team / community collaboration */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 text-white"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      renderWatermark: () => (
        /* Potted botanical plant & framed minimalist art */
        <svg
          viewBox="0 0 120 120"
          fill="none"
          className="w-24 h-24 text-[#EA580C] opacity-15"
        >
          {/* Framed Wall Art */}
          <rect x="68" y="16" width="36" height="36" rx="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
          <rect x="74" y="22" width="24" height="24" rx="1.5" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.2" />
          {/* Indoor Potted Monstera Foliage */}
          <path d="M85 65 C80 50 68 55 72 70 C75 80 85 85 85 85" fill="currentColor" fillOpacity="0.4" />
          <path d="M92 68 C100 55 110 60 102 75 C98 82 92 85 92 85" fill="currentColor" fillOpacity="0.4" />
          <path d="M88 52 C88 42 96 46 94 60" fill="currentColor" fillOpacity="0.3" />
          {/* Plant Pot */}
          <polygon points="76,85 100,85 96,108 80,108" fill="currentColor" fillOpacity="0.45" />
          <line x1="74" y1="108" x2="102" y2="108" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 'investments',
      title: 'Office Investments',
      desc: 'Strata-sale units for rental income and capital appreciation.',
      href: '/commercial-property-for-investment-in-gurgaon',
      theme: 'green',
      badgeGradient: 'bg-gradient-to-br from-[#10B981] to-[#047857]',
      badgeShadow: 'shadow-[0_6px_16px_rgba(16,185,129,0.3)]',
      waveGradient: {
        from: '#6EE7B7',
        mid: '#10B981',
        to: '#047857',
      },
      waveBackGradient: {
        from: '#A7F3D0',
        to: '#6EE7B7',
      },
      arrowColor: 'text-[#059669]',
      renderIcon: () => (
        /* Coin stacks & financial growth */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 text-white"
        >
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
        </svg>
      ),
      renderWatermark: () => (
        /* Ascending growth chart bars & upward curving arrow */
        <svg
          viewBox="0 0 120 120"
          fill="none"
          className="w-24 h-24 text-[#059669] opacity-15"
        >
          {/* Upward Growth Arrow */}
          <path
            d="M30 65 Q 60 55, 95 24"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <polygon points="95,18 97,29 86,26" fill="currentColor" />
          {/* Bar Chart Bars */}
          <rect x="42" y="70" width="12" height="35" rx="2" fill="currentColor" fillOpacity="0.25" />
          <rect x="60" y="52" width="12" height="53" rx="2" fill="currentColor" fillOpacity="0.35" />
          <rect x="78" y="36" width="12" height="69" rx="2" fill="currentColor" fillOpacity="0.5" />
        </svg>
      ),
    },
  ]

  return (
    <CategoryWaveCards
      titlePrefix="Office Space"
      titleHighlight="Options"
      subtitle="Discover tailored office formats designed for modern enterprise agility, investment yields, and strategic business growth across Gurgaon."
      items={items}
      className="bg-[#F8FAFD]"
    />
  )
}
