'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  TrendingUp,
  Coins,
  BarChart3,
  RefreshCw,
  Scale,
  FileCheck2,
  ArrowRight,
  Calculator,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CalculatorItem {
  id: string
  title: string
  desc: string
  href: string
  icon: typeof TrendingUp
  iconBg: string
  iconColor: string
  image: string
  imageAlt: string
}

export const CALCULATOR_ITEMS: CalculatorItem[] = [
  {
    id: 'rental-yield',
    title: 'Rental Yield Calculator',
    desc: 'Compute gross and net commercial rental yields factoring maintenance and vacancy.',
    href: '/tools/rental-yield-calculator',
    icon: TrendingUp,
    iconBg: 'bg-[#EEF2FF] text-[#1557C0] border border-[#C7D7FE]/50',
    iconColor: 'text-[#1557C0]',
    image: '/images/calc-rental-yield.png',
    imageAlt: '3D modern commercial building with percentage symbol and growth arrow',
  },
  {
    id: 'commercial-emi',
    title: 'Commercial EMI Calculator',
    desc: 'Calculate commercial loan monthly obligations across tenure and interest rates.',
    href: '/tools/emi-calculator',
    icon: Coins,
    iconBg: 'bg-[#EAF2FF] text-[#1557C0] border border-[#BFDBFE]/50',
    iconColor: 'text-[#1557C0]',
    image: '/images/calc-commercial-emi.png',
    imageAlt: '3D calculator with property icon and gold money stacks',
  },
  {
    id: 'sco-analysis',
    title: 'SCO Investment Analysis',
    desc: 'Model land acquisition, basement-to-terrace construction, and rental payback.',
    href: '/tools/sco-calculator',
    icon: BarChart3,
    iconBg: 'bg-[#EAF2FF] text-[#1557C0] border border-[#BFDBFE]/50',
    iconColor: 'text-[#1557C0]',
    image: '/images/calc-sco-analysis.png',
    imageAlt: '3D commercial property analytics with charts and magnifying glass',
  },
  {
    id: 'commercial-roi',
    title: 'Commercial ROI Calculator',
    desc: 'Evaluate total commercial return combining cash flow and capital appreciation.',
    href: '/tools/roi-calculator',
    icon: RefreshCw,
    iconBg: 'bg-[#EAF2FF] text-[#1557C0] border border-[#BFDBFE]/50',
    iconColor: 'text-[#1557C0]',
    image: '/images/calc-commercial-roi.png',
    imageAlt: '3D investment coins with ROI token and upward growth arrow',
  },
  {
    id: 'buy-vs-rent',
    title: 'Buy vs Rent Comparison',
    desc: 'Objective comparison between long-term office leasing and direct acquisition.',
    href: '/tools/buy-vs-rent-calculator',
    icon: Scale,
    iconBg: 'bg-[#EEF2FF] text-[#1557C0] border border-[#C7D7FE]/50',
    iconColor: 'text-[#1557C0]',
    image: '/images/calc-buy-vs-rent.png',
    imageAlt: '3D building model with BUY and RENT comparison scale',
  },
  {
    id: 'stamp-duty',
    title: 'Stamp Duty Estimate',
    desc: 'Current Haryana (Gurugram) and Delhi commercial conveyance and registration charges.',
    href: '/tools/stamp-duty-calculator',
    icon: FileCheck2,
    iconBg: 'bg-[#EAF2FF] text-[#1557C0] border border-[#BFDBFE]/50',
    iconColor: 'text-[#1557C0]',
    image: '/images/calc-stamp-duty.png',
    imageAlt: '3D official registration document with stamp and seal',
  },
]

interface CommercialCalculatorsSectionProps {
  badgeText?: string
  titlePrefix?: string
  titleHighlight?: string
  subtitle?: string
  description?: string
  className?: string
  showHeaderDetails?: boolean
}

export function CommercialCalculatorsSection({
  badgeText = 'Smart Calculators',
  titlePrefix = 'Commercial Investment',
  titleHighlight = 'Calculators',
  subtitle = 'Plan smarter. Invest better. Analyze with confidence.',
  description,
  className,
  showHeaderDetails = true,
}: CommercialCalculatorsSectionProps) {
  return (
    <section
      className={cn(
        'relative py-14 sm:py-20 bg-[#F4F7FD] overflow-hidden border-t border-line-200',
        className,
      )}
    >
      {/* Background Decorative Fintech Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft Ambient Floating Orbs */}
        <div className="absolute -top-24 right-1/4 size-96 rounded-full bg-gradient-to-br from-[#1557C0]/8 to-[#EAF2FF]/60 blur-3xl" />
        <div className="absolute top-1/2 -left-20 size-80 rounded-full bg-gradient-to-tr from-[#FF302B]/6 to-[#1557C0]/6 blur-3xl" />
        <div className="absolute -bottom-24 right-10 size-96 rounded-full bg-gradient-to-tl from-[#1557C0]/10 via-[#EAF2FF]/80 to-transparent blur-3xl" />

        {/* Floating 3D Pearl Spheres */}
        <div className="absolute top-16 left-6 sm:left-12 size-6 sm:size-7 rounded-full bg-gradient-to-br from-white via-[#D8E6FF] to-[#1557C0] shadow-[0_6px_16px_rgba(21,87,192,0.25)] opacity-85" />
        <div className="absolute top-28 right-8 sm:right-20 size-8 sm:size-10 rounded-full bg-gradient-to-br from-white via-[#E0EBFF] to-[#3B82F6] shadow-[0_8px_20px_rgba(21,87,192,0.2)] opacity-75" />
        <div className="absolute bottom-16 right-1/3 size-5 sm:size-6 rounded-full bg-gradient-to-br from-white via-[#FFD7D5] to-[#FF302B] shadow-[0_6px_14px_rgba(255,48,43,0.2)] opacity-80" />

        {/* Subtle Decorative Dot Matrix (matching sample design) */}
        <div className="absolute top-10 right-6 sm:right-16 hidden md:grid grid-cols-6 gap-2.5 opacity-35">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="size-1.5 rounded-full bg-[#1557C0]" />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="flex flex-col items-start gap-3">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-xs text-xs font-semibold text-[#172544]">
              <span className="flex size-5 items-center justify-center rounded-full bg-[#EAF2FF] text-[#1557C0]">
                <Calculator className="size-3 text-[#1557C0]" />
              </span>
              <span>{badgeText}</span>
            </div>

            {/* Main Headline */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#172544] leading-tight">
              {titlePrefix}{' '}
              <span className="bg-gradient-to-r from-[#FF302B] via-[#FF4D36] to-[#D62828] bg-clip-text text-transparent">
                {titleHighlight}
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg font-medium text-[#5B6577]">
              {subtitle}
            </p>

            {showHeaderDetails && description && (
              <p className="text-xs sm:text-sm text-[#5B6577] max-w-2xl mt-0.5">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CALCULATOR_ITEMS.map((calc) => {
            const Icon = calc.icon
            return (
              <Link
                key={calc.id}
                href={calc.href}
                className={cn(
                  'group relative flex flex-col justify-between rounded-[22px] sm:rounded-[24px]',
                  'bg-white p-6 sm:p-7',
                  'border border-[#E2E8F0] hover:border-[#1557C0]/35',
                  'shadow-[0_10px_30px_rgba(23,37,68,0.05)] hover:shadow-[0_22px_45px_rgba(21,87,192,0.12)]',
                  'transition-all duration-300 ease-out hover:-translate-y-1.5',
                  'overflow-hidden',
                )}
              >
                {/* Subtle Ambient Hover Glow */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#F0F5FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Top Section: Info + 3D Illustration */}
                <div className="relative z-10 flex items-start justify-between gap-4">
                  {/* Left Column: Icon, Title & Description */}
                  <div className="flex-1 min-w-0 pr-1">
                    {/* Category Icon */}
                    <div
                      className={cn(
                        'size-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-xs',
                        calc.iconBg,
                      )}
                    >
                      <Icon className="size-5" />
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-lg sm:text-[19px] font-bold text-[#172544] tracking-tight leading-snug mt-3.5 group-hover:text-[#1557C0] transition-colors duration-200">
                      {calc.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs sm:text-[13px] text-[#5B6577] leading-relaxed line-clamp-3">
                      {calc.desc}
                    </p>
                  </div>

                  {/* Right Column: High-Quality 3D Visual Illustration */}
                  <div className="relative shrink-0 w-28 sm:w-32 h-28 sm:h-32 flex items-center justify-center">
                    {/* Soft Radial Ambient Glow */}
                    <div
                      className="absolute -inset-2 bg-gradient-to-tr from-[#1557C0]/15 via-[#EAF2FF]/60 to-transparent rounded-full blur-xl opacity-40 group-hover:opacity-100 group-hover:scale-115 transition-all duration-500"
                      aria-hidden="true"
                    />

                    {/* 3D Image with Float & Tilt on Hover */}
                    <div className="relative w-full h-full flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-108 group-hover:-translate-y-1.5 group-hover:rotate-1">
                      <Image
                        src={calc.image}
                        alt={calc.imageAlt}
                        width={280}
                        height={280}
                        className="w-full h-full object-contain drop-shadow-[0_10px_18px_rgba(21,87,192,0.16)] transition-all duration-500"
                        priority={calc.id === 'rental-yield' || calc.id === 'commercial-emi'}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Row: CTA Button */}
                <div className="relative z-10 mt-6 pt-4 border-t border-[#F1F4F9] flex items-center justify-start">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-xs group-hover:border-[#FF302B]/40 group-hover:shadow-[0_4px_14px_rgba(255,48,43,0.18)] transition-all duration-300">
                    <span className="text-xs font-bold text-[#172544] group-hover:text-[#FF302B] transition-colors">
                      Calculate Now
                    </span>
                    <span className="size-5 rounded-full bg-[#FF302B] text-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
                      <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
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
