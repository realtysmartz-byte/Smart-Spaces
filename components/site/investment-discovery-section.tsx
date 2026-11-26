'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { budgetBands, investmentGoals } from '@/lib/data/content'
import { cn } from '@/lib/utils'

function BudgetIllustration({ bandValue }: { bandValue: string }) {
  switch (bandValue) {
    case '50l-1cr':
      // Gold coins with ₹ symbol
      return (
        <svg viewBox="0 0 64 56" fill="none" className="size-13">
          {/* Back coin stack */}
          <ellipse cx="24" cy="40" rx="13" ry="4.5" fill="#D97706" />
          <path d="M11 33v7c0 2.48 5.82 4.5 13 4.5s13-2.02 13-4.5v-7H11z" fill="#F59E0B" />
          <ellipse cx="24" cy="33" rx="13" ry="4.5" fill="#FBBF24" />
          <path d="M11 26v7c0 2.48 5.82 4.5 13 4.5s13-2.02 13-4.5v-7H11z" fill="#F59E0B" />
          <ellipse cx="24" cy="26" rx="13" ry="4.5" fill="#FCD34D" />
          <path d="M11 19v7c0 2.48 5.82 4.5 13 4.5s13-2.02 13-4.5v-7H11z" fill="#F59E0B" />
          <ellipse cx="24" cy="19" rx="13" ry="4.5" fill="#FDE68A" />
          {/* Front standing rupee coin */}
          <circle cx="41" cy="30" r="14" fill="#F59E0B" stroke="#FDE68A" strokeWidth="2" />
          <circle cx="41" cy="30" r="10.5" fill="#FBBF24" />
          <text
            x="41"
            y="35"
            textAnchor="middle"
            fill="#FFFBEB"
            fontSize="14"
            fontWeight="800"
            fontFamily="sans-serif"
          >
            ₹
          </text>
        </svg>
      )
    case '1-2cr':
      // Blue wallet with red card & rupee
      return (
        <svg viewBox="0 0 64 56" fill="none" className="size-13">
          {/* Red card peeking out */}
          <rect
            x="22"
            y="8"
            width="24"
            height="18"
            rx="3"
            transform="rotate(10 22 8)"
            fill="#EF4444"
          />
          <rect
            x="24"
            y="12"
            width="18"
            height="3"
            transform="rotate(10 24 12)"
            fill="#FCA5A5"
            opacity="0.7"
          />
          {/* Blue wallet body */}
          <rect x="10" y="16" width="42" height="30" rx="6" fill="#1D4ED8" />
          <rect x="10" y="16" width="42" height="10" rx="4" fill="#2563EB" />
          {/* Wallet clasp */}
          <rect x="38" y="26" width="16" height="11" rx="3.5" fill="#1E40AF" />
          <circle cx="44" cy="31.5" r="2.2" fill="#93C5FD" />
          {/* Rupee symbol on wallet */}
          <text
            x="25"
            y="37"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="14"
            fontWeight="700"
            fontFamily="sans-serif"
          >
            ₹
          </text>
        </svg>
      )
    case '2-5cr':
      // Ascending blue bar chart with upward red growth arrow
      return (
        <svg viewBox="0 0 64 56" fill="none" className="size-13">
          <rect x="12" y="34" width="9" height="14" rx="2" fill="#60A5FA" />
          <rect x="25" y="26" width="9" height="22" rx="2" fill="#3B82F6" />
          <rect x="38" y="18" width="9" height="30" rx="2" fill="#1D4ED8" />
          {/* Upward Red Arrow */}
          <path
            d="M11 31 Q 28 24 47 10"
            stroke="#EF4444"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M39 9 L49 9 L48 19"
            stroke="#EF4444"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case '5-10cr':
      // Gold coin stack with green sprouting plant
      return (
        <svg viewBox="0 0 64 56" fill="none" className="size-13">
          {/* Stem & Leaves */}
          <path d="M35 28 V14" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M35 16 C35 10, 44 8, 46 13 C46 18, 39 19, 35 16 Z" fill="#22C55E" />
          <path d="M35 19 C35 13, 25 11, 23 16 C23 21, 30 22, 35 19 Z" fill="#4ADE80" />
          {/* Left short stack */}
          <ellipse cx="20" cy="43" rx="9" ry="3.2" fill="#D97706" />
          <path d="M11 38v5c0 1.77 4.03 3.2 9 3.2s9-1.43 9-3.2v-5H11z" fill="#F59E0B" />
          <ellipse cx="20" cy="38" rx="9" ry="3.2" fill="#FCD34D" />
          {/* Right taller stack */}
          <ellipse cx="38" cy="43" rx="10" ry="3.5" fill="#D97706" />
          <path d="M28 37v6c0 1.93 4.48 3.5 10 3.5s10-1.57 10-3.5v-6H28z" fill="#F59E0B" />
          <ellipse cx="38" cy="37" rx="10" ry="3.5" fill="#FBBF24" />
          <path d="M28 31v6c0 1.93 4.48 3.5 10 3.5s10-1.57 10-3.5v-6H28z" fill="#F59E0B" />
          <ellipse cx="38" cy="31" rx="10" ry="3.5" fill="#FDE68A" />
        </svg>
      )
    case '10cr-plus':
    default:
      // Faceted blue diamond
      return (
        <svg viewBox="0 0 64 56" fill="none" className="size-13">
          <polygon points="18,14 46,14 54,25 32,48 10,25" fill="#3B82F6" />
          <polygon points="18,14 46,14 39,25 25,25" fill="#93C5FD" />
          <polygon points="10,25 25,25 32,48" fill="#2563EB" />
          <polygon points="54,25 39,25 32,48" fill="#1D4ED8" />
          <polygon points="25,25 39,25 32,48" fill="#60A5FA" />
          <polygon points="18,14 25,25 10,25" fill="#60A5FA" />
          <polygon points="46,14 54,25 39,25" fill="#2563EB" />
        </svg>
      )
  }
}

function ObjectiveIcon({ goalValue }: { goalValue: string }) {
  switch (goalValue) {
    case 'rental-income':
      return (
        <div className="size-13 rounded-2xl bg-[#FFEFEF] text-[#EF4444] flex items-center justify-center shrink-0">
          <svg viewBox="0 0 28 28" fill="none" className="size-7">
            <circle cx="15" cy="9" r="5" fill="#EF4444" />
            <text x="15" y="12" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="800">
              ₹
            </text>
            <path
              d="M5 18.5h8.5c1.5 0 2.5.8 3.5 1.5h4.5c.8 0 1.5.7 1.5 1.5S22.3 23 21.5 23H11l-6-2v-2.5z"
              fill="#F87171"
            />
          </svg>
        </div>
      )
    case 'capital-appreciation':
      return (
        <div className="size-13 rounded-2xl bg-[#EEF4FF] text-[#1557C0] flex items-center justify-center shrink-0">
          <svg viewBox="0 0 28 28" fill="none" className="size-7">
            <rect x="5" y="16" width="4" height="7" rx="1" fill="#60A5FA" />
            <rect x="11.5" y="12" width="4" height="11" rx="1" fill="#3B82F6" />
            <rect x="18" y="8" width="4" height="15" rx="1" fill="#1557C0" />
            <path d="M5 13 L13 8 L17 10 L23 4" stroke="#1557C0" strokeWidth="2" strokeLinecap="round" />
            <path d="M19.5 4H23V7.5" stroke="#1557C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )
    case 'own-business-space':
      return (
        <div className="size-13 rounded-2xl bg-[#FFF3E8] text-[#EA580C] flex items-center justify-center shrink-0">
          <svg viewBox="0 0 28 28" fill="none" className="size-7">
            <path d="M4 11l2-5h16l2 5" fill="#FB923C" />
            <path d="M4 11a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" stroke="#EA580C" strokeWidth="1.5" />
            <rect x="6" y="13" width="16" height="10" rx="1.5" fill="#FDBA74" />
            <rect x="11.5" y="16" width="5" height="7" rx="1" fill="#EA580C" />
          </svg>
        </div>
      )
    case 'pre-leased':
      return (
        <div className="size-13 rounded-2xl bg-[#F4EEFF] text-[#7C3AED] flex items-center justify-center shrink-0">
          <svg viewBox="0 0 28 28" fill="none" className="size-7">
            <rect x="6" y="4" width="14" height="18" rx="2.5" stroke="#7C3AED" strokeWidth="2" fill="#EDE9FE" />
            <line x1="9.5" y1="9.5" x2="16.5" y2="9.5" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="9.5" y1="13.5" x2="14" y2="13.5" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="19" cy="19" r="4.5" fill="#7C3AED" />
            <path d="M17.2 19l1.2 1.2 2.4-2.4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )
    case 'early-entry':
      return (
        <div className="size-13 rounded-2xl bg-[#E8FAEF] text-[#10B981] flex items-center justify-center shrink-0">
          <svg viewBox="0 0 28 28" fill="none" className="size-7">
            <path
              d="M16 5c4 0 7 3 7 7-3 5-7 8-12 9l-4-4c1-5 4-9 9-12z"
              stroke="#10B981"
              strokeWidth="2"
              fill="#D1FAE5"
              strokeLinejoin="round"
            />
            <circle cx="16.5" cy="11.5" r="2" fill="#10B981" />
            <path d="M7 18l-2 5 5-2" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )
    case 'investment':
    default:
      return (
        <div className="size-13 rounded-2xl bg-[#EEF4FF] text-[#2563EB] flex items-center justify-center shrink-0">
          <svg viewBox="0 0 28 28" fill="none" className="size-7">
            <path d="M14 5L23 9.5L14 14L5 9.5L14 5Z" fill="#93C5FD" stroke="#2563EB" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M5 14L14 18.5L23 14" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 18.5L14 23L23 18.5" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )
  }
}

export function InvestmentDiscoverySection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F4F7FD] via-[#F8FAFF] to-[#F4F7FD] pt-6 pb-14 sm:pt-10 sm:pb-20">
      {/* Decorative Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute top-32 right-0 size-96 rounded-full bg-indigo-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ================= INVEST BY BUDGET ================= */}
        <div className="relative">
          {/* Header Row with Subtle Glass Building on Top-Right */}
          <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
            <div className="relative z-10 max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#FF302B] mb-2">
                INVESTMENT OPTIONS
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#172544] leading-tight">
                Invest by Budget
              </h1>
              <p className="mt-2.5 text-sm sm:text-base text-slate-500 font-normal">
                Explore investment opportunities that fit your budget across Gurgaon &amp; Delhi NCR.
              </p>
            </div>

            {/* Subtle Masked Architectural Glass Building Illustration (Desktop) */}
            <div className="pointer-events-none hidden lg:block relative w-80 h-32 -mb-8 select-none overflow-hidden rounded-2xl opacity-85">
              <Image
                src="/images/category-office.png"
                alt="Modern Commercial Tower"
                fill
                className="object-cover object-center"
                sizes="320px"
              />
              {/* Soft fade mask blending into background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F5F8FE] via-[#F5F8FE]/30 to-[#F5F8FE]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F5F8FE] via-transparent to-[#F5F8FE]/70" />
            </div>
          </div>

          {/* 5-Column Budget Cards */}
          <div className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {budgetBands.map((band, idx) => {
              const isHighlighted = idx === 0

              return (
                <Link
                  key={band.value}
                  href={`/projects?budget=${band.value}`}
                  className={cn(
                    'group relative flex flex-col items-center justify-between overflow-hidden rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1.5',
                    isHighlighted
                      ? 'bg-[#FFF5F5] border border-[#FF302B]/50 shadow-[0_10px_28px_rgba(255,48,43,0.1)] hover:shadow-[0_18px_38px_rgba(255,48,43,0.16)]'
                      : 'bg-white border border-slate-200/80 shadow-[0_8px_24px_rgba(23,37,68,0.05)] hover:border-blue-300 hover:shadow-[0_16px_36px_rgba(23,37,68,0.1)]'
                  )}
                >
                  {/* Subtle Architectural Building Silhouette Watermark on Right */}
                  <svg
                    viewBox="0 0 80 80"
                    fill="none"
                    className={cn(
                      'pointer-events-none absolute right-2 top-3 w-16 h-16 opacity-15 transition-transform duration-300 group-hover:scale-105',
                      isHighlighted ? 'text-[#FF302B]' : 'text-[#1557C0]'
                    )}
                  >
                    <rect x="28" y="14" width="22" height="58" rx="2" fill="currentColor" fillOpacity="0.4" />
                    <rect x="12" y="30" width="14" height="42" rx="1.5" fill="currentColor" fillOpacity="0.25" />
                    <rect x="52" y="24" width="16" height="48" rx="1.5" fill="currentColor" fillOpacity="0.25" />
                  </svg>

                  {/* Top Icon */}
                  <div className="relative z-10 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <BudgetIllustration bandValue={band.value} />
                  </div>

                  {/* Budget Label */}
                  <h2 className="relative z-10 text-lg font-extrabold tracking-tight text-[#172544] mb-5">
                    {band.label}
                  </h2>

                  {/* Pill CTA Button */}
                  <div
                    className={cn(
                      'relative z-10 inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200',
                      isHighlighted
                        ? 'bg-[#FF302B] text-white shadow-sm shadow-red-500/25 group-hover:bg-[#E02420]'
                        : 'bg-[#F8FAFD] text-[#172544] border border-slate-200 group-hover:bg-[#1557C0] group-hover:text-white group-hover:border-[#1557C0]'
                    )}
                  >
                    <span>View Options</span>
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* ================= INVEST BY OBJECTIVE ================= */}
        <div className="mt-16 sm:mt-20">
          <div className="mb-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#FF302B] mb-2">
              INVESTMENT GOALS
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#172544]">
              Invest by Objective
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 font-normal">
              Choose your investment objective and discover relevant commercial opportunities.
            </p>
          </div>

          {/* 3-Column Horizontal Pill Cards */}
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {investmentGoals.map((goal) => (
              <Link
                key={goal.value}
                href={`/projects?goal=${goal.value}`}
                className="group flex items-center justify-between gap-4 rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/80 shadow-[0_6px_20px_rgba(23,37,68,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_14px_32px_rgba(23,37,68,0.09)]"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <ObjectiveIcon goalValue={goal.value} />
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-[#172544] group-hover:text-[#1557C0] transition-colors truncate">
                      {goal.label}
                    </h3>
                    <p className="mt-1 text-xs sm:text-[13px] leading-snug text-slate-500 line-clamp-2">
                      {goal.description}
                    </p>
                  </div>
                </div>

                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all duration-200 group-hover:bg-[#1557C0] group-hover:text-white group-hover:translate-x-0.5">
                  <ChevronRight className="size-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
