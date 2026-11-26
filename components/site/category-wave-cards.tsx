'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface WaveCardItem {
  id: string
  title: string
  desc: string
  href: string
  theme: 'blue' | 'purple' | 'orange' | 'green'
  badgeGradient: string
  badgeShadow: string
  waveGradient: {
    from: string
    mid: string
    to: string
  }
  waveBackGradient: {
    from: string
    to: string
  }
  arrowColor: string
  renderIcon: () => React.ReactNode
  renderWatermark: () => React.ReactNode
}

interface CategoryWaveCardsProps {
  topPillText?: string
  titlePrefix: string
  titleHighlight: string
  subtitle?: string
  items: WaveCardItem[]
  className?: string
}

export function CategoryWaveCards({
  titlePrefix,
  titleHighlight,
  subtitle,
  items,
  className,
}: CategoryWaveCardsProps) {
  return (
    <section className={cn('relative py-12 sm:py-16 overflow-hidden', className)}>
      {/* Background Soft Glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 size-96 rounded-full bg-indigo-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          {/* Top Decorative Gradient Pill */}
          <div className="h-1.5 w-14 rounded-full bg-gradient-to-r from-[#FF4B4B] via-[#7C3AED] to-[#0070F3] mb-3.5 shadow-sm" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#172544]">
            {titlePrefix} <span className="text-[#1557C0]">{titleHighlight}</span>
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((card) => {
            const gradId = `wave-front-${card.id}`
            const gradBackId = `wave-back-${card.id}`

            return (
              <Link
                key={card.id}
                href={card.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[26px] bg-white border border-slate-100/90 shadow-[0_8px_25px_rgba(23,37,68,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(23,37,68,0.12)] min-h-[330px]"
              >
                {/* Top Content Area */}
                <div className="relative p-6 sm:p-7 z-10 flex-1">
                  {/* Watermark in Top Right */}
                  <div className="pointer-events-none absolute top-4 right-4 z-0 transition-transform duration-500 group-hover:scale-105">
                    {card.renderWatermark()}
                  </div>

                  {/* Header Row with Badge Icon */}
                  <div className="relative z-10 mb-5">
                    <div
                      className={cn(
                        'size-13 rounded-2xl p-3 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105',
                        card.badgeGradient,
                        card.badgeShadow
                      )}
                    >
                      {card.renderIcon()}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold tracking-tight text-[#172544] transition-colors duration-200 group-hover:text-[#1557C0]">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-500 font-normal">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Organic Dual Wave + Circular Button */}
                <div className="relative h-20 w-full overflow-hidden select-none">
                  {/* SVG Waves */}
                  <svg
                    viewBox="0 0 340 85"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full"
                  >
                    <defs>
                      <linearGradient id={gradBackId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={card.waveBackGradient.from} />
                        <stop offset="100%" stopColor={card.waveBackGradient.to} />
                      </linearGradient>
                      <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={card.waveGradient.from} />
                        <stop offset="45%" stopColor={card.waveGradient.mid} />
                        <stop offset="100%" stopColor={card.waveGradient.to} />
                      </linearGradient>
                    </defs>

                    {/* Back Wave (Subtle translucent organic curve) */}
                    <path
                      d="M0,52 C70,36 150,68 230,48 C280,35 315,44 340,40 L340,85 L0,85 Z"
                      fill={`url(#${gradBackId})`}
                      opacity="0.45"
                      className="transition-all duration-300 group-hover:opacity-55"
                    />

                    {/* Front Wave (Rich saturated gradient curve rising gently rightward) */}
                    <path
                      d="M0,66 C75,66 140,42 220,54 C270,62 310,40 340,36 L340,85 L0,85 Z"
                      fill={`url(#${gradId})`}
                      className="transition-transform duration-300 group-hover:scale-y-[1.04] origin-bottom"
                    />
                  </svg>

                  {/* Circular Floating Arrow Button */}
                  <div className="absolute bottom-3 right-4 z-20">
                    <div className="flex size-10 items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_6px_18px_rgba(0,0,0,0.18)]">
                      <ArrowRight
                        className={cn(
                          'size-4.5 transition-transform duration-300 group-hover:translate-x-0.5',
                          card.arrowColor
                        )}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
