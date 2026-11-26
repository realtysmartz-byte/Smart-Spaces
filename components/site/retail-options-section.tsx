'use client'

import React from 'react'
import { CategoryWaveCards, WaveCardItem } from './category-wave-cards'

export function RetailOptionsSection() {
  const items: WaveCardItem[] = [
    {
      id: 'high-street',
      title: 'High-Street Retail',
      desc: 'Prime open-to-sky boulevards with vibrant pedestrian movement and maximum brand visibility.',
      href: '/projects?type=retail',
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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 text-white"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      renderWatermark: () => (
        <svg viewBox="0 0 120 120" fill="none" className="w-24 h-24 text-[#0066FF] opacity-15">
          <path d="M20 90 L100 90" stroke="currentColor" strokeWidth="3" />
          <rect x="30" y="40" width="60" height="50" rx="3" fill="currentColor" fillOpacity="0.3" />
          <polygon points="25,40 60,18 95,40" fill="currentColor" fillOpacity="0.5" />
          <rect x="48" y="55" width="24" height="35" rx="2" fill="#FFFFFF" fillOpacity="0.7" />
        </svg>
      ),
    },
    {
      id: 'mall-anchors',
      title: 'Anchor Showrooms',
      desc: 'Large double-height flagship spaces facing prominent 60m+ arterial expressway corridors.',
      href: '/projects?type=retail',
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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 text-white"
        >
          <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
          <path d="M2 7h20" />
        </svg>
      ),
      renderWatermark: () => (
        <svg viewBox="0 0 120 120" fill="none" className="w-24 h-24 text-[#9333EA] opacity-15">
          <circle cx="60" cy="50" r="30" fill="currentColor" fillOpacity="0.25" />
          <polygon points="60,25 70,45 92,48 76,64 80,85 60,75 40,85 44,64 28,48 50,45" fill="currentColor" fillOpacity="0.4" />
        </svg>
      ),
    },
    {
      id: 'fnb-dining',
      title: 'F&B & Gourmet Zones',
      desc: 'Dedicated rooftop terraces and food court units engineered for high-margin dining traffic.',
      href: '/projects?type=retail',
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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 text-white"
        >
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      ),
      renderWatermark: () => (
        <svg viewBox="0 0 120 120" fill="none" className="w-24 h-24 text-[#EA580C] opacity-15">
          <circle cx="60" cy="60" r="32" stroke="currentColor" strokeWidth="4" />
          <path d="M45 42 L45 78" stroke="currentColor" strokeWidth="3" />
          <path d="M40 42 C40 54 50 54 50 42" fill="currentColor" fillOpacity="0.4" />
          <path d="M75 42 L75 78" stroke="currentColor" strokeWidth="3" />
          <path d="M70 42 Q 78 52 78 62" stroke="currentColor" strokeWidth="3" />
        </svg>
      ),
    },
    {
      id: 'pre-leased-retail',
      title: 'Pre-Leased Retail',
      desc: 'Immediate cash-flow assets leased to top-tier national brands with locked lease agreements.',
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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-6 text-white"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      renderWatermark: () => (
        <svg viewBox="0 0 120 120" fill="none" className="w-24 h-24 text-[#059669] opacity-15">
          <rect x="35" y="25" width="50" height="70" rx="4" fill="currentColor" fillOpacity="0.25" />
          <circle cx="60" cy="50" r="14" fill="currentColor" fillOpacity="0.4" />
          <path d="M45 75 L75 75" stroke="currentColor" strokeWidth="3" />
          <path d="M45 83 L65 83" stroke="currentColor" strokeWidth="3" />
        </svg>
      ),
    },
  ]

  return (
    <CategoryWaveCards
      titlePrefix="Retail Space"
      titleHighlight="Formats"
      subtitle="Strategically curated commercial retail avenues engineered for high captive footfalls, exceptional visibility, and solid rental yields across Gurgaon."
      items={items}
      className="bg-[#F8FAFD]"
    />
  )
}
