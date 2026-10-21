'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GoalItem {
  id: string
  title: string
  tagline: string
  description: string
  image: string
  alt: string
  points: string[]
  recommendedType: string
  href: string
}

const goals: GoalItem[] = [
  {
    id: 'rental-income',
    title: 'Regular Rental Cash Flow',
    tagline: 'High yield & immediate lease covenants',
    description:
      'Ideal for investors seeking consistent monthly passive income from day one with institutional tenants, long lock-ins, and built-in escalation clauses.',
    image: '/images/category-office.png',
    alt: 'Grade A commercial office building generating steady rental returns in Gurgaon',
    points: ['Pre-leased office & bank spaces', '6% to 9% estimated gross yields', '9 to 15 year tenant leases'],
    recommendedType: 'Grade A Offices & Pre-Leased Assets',
    href: '/commercial-property-for-investment-in-gurgaon#rental-income',
  },
  {
    id: 'capital-appreciation',
    title: 'High Capital Appreciation',
    tagline: 'Long-term value creation in emerging corridors',
    description:
      'Target early-stage commercial assets along infrastructure expansion zones like Dwarka Expressway and Southern Peripheral Road for multi-year capital compounding.',
    image: '/images/hero-gurgaon-skyline.png',
    alt: 'Gurgaon skyline representing rapid commercial capital appreciation',
    points: ['Infrastructure-driven price growth', 'Early entry launch pricing', 'Commercial corridor densification'],
    recommendedType: 'Emerging Corridor Offices & SCO Plots',
    href: '/commercial-property-for-investment-in-gurgaon#capital-appreciation',
  },
  {
    id: 'own-business-space',
    title: 'Own Commercial Business Space',
    tagline: 'Stop paying rent for your corporate headquarters or retail storefront',
    description:
      'Secure prime high-street commercial storefronts or bespoke corporate office suites to build equity and protect your business from recurring lease escalations.',
    image: '/images/category-retail.png',
    alt: 'High street retail commercial storefront in Gurgaon',
    points: ['Full operational independence', 'High footfall retail high-streets', 'Building long-term business equity'],
    recommendedType: 'High-Street Retail & Boutique Offices',
    href: '/retail-property-in-gurgaon',
  },
  {
    id: 'pre-leased',
    title: 'Pre-Leased Institutional Assets',
    tagline: 'Zero construction risk & verified rent credit history',
    description:
      'Acquire commercial assets that are already occupied by multinational corporations, banks, or anchor retailers with verified rent rolls and clean title due diligence.',
    image: '/images/category-investment.png',
    alt: 'Corporate boardroom representing pre-leased commercial real estate assets',
    points: ['Immediate rent from registration date', 'MNC & institutional tenant covenants', 'Triple-net lease structures'],
    recommendedType: 'Pre-Leased Offices & Retail Showrooms',
    href: '/commercial-property-for-investment-in-gurgaon#pre-leased',
  },
]

export function StickyInvestmentGoals() {
  const [activeGoalIndex, setActiveGoalIndex] = useState(0)

  return (
    <section className="py-20 sm:py-28 bg-primary-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#C27803_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-4">
            Strategic Alignment
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl text-white">
            Invest Aligned with Your Objective
          </h2>
          <p className="mt-4 text-base sm:text-lg text-sand-50/85 leading-relaxed">
            Every commercial property serves a distinct financial purpose. Explore opportunities curated for your
            specific yield, capital growth, or business occupation goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Sticky Image Container with Smooth Crossfade + Diligence Highlights (Fills height, eliminates blank space) */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 space-y-4">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-primary-900">
              {goals.map((goal, idx) => {
                const isActive = idx === activeGoalIndex
                return (
                  <div
                    key={goal.id}
                    className={cn(
                      'absolute inset-0 transition-opacity duration-700 ease-in-out',
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    )}
                  >
                    <Image
                      src={goal.image}
                      alt={goal.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="inline-block px-3 py-1 rounded bg-accent-500 text-white text-xs font-bold uppercase tracking-wider mb-2 shadow">
                        {goal.recommendedType}
                      </span>
                      <h4 className="font-heading text-xl sm:text-2xl font-bold text-white">
                        {goal.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-sand-50/85 mt-1">{goal.tagline}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Dynamic Due Diligence Highlights Card for Active Goal (Eliminates dead space) */}
            <div className="hidden sm:block p-5 rounded-2xl bg-primary-700/60 border border-white/10 backdrop-blur-md shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-500">
                  Verified Investment Highlights
                </span>
                <span className="text-[11px] font-semibold text-sand-50/70">
                  Objective 0{activeGoalIndex + 1} of 04
                </span>
              </div>
              <ul className="mt-3 space-y-2">
                {goals[activeGoalIndex].points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-center gap-2 text-xs sm:text-sm text-sand-50/90 font-medium">
                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-sand-50/70 truncate max-w-[65%]">
                  {goals[activeGoalIndex].tagline}
                </span>
                <Link
                  href={goals[activeGoalIndex].href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-500 hover:text-accent-400 group/link shrink-0"
                >
                  <span>Explore Assets</span>
                  <ArrowRight className="size-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Quick switcher dots for mobile */}
            <div className="flex justify-center gap-2 mt-4 lg:hidden">
              {goals.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveGoalIndex(idx)}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    idx === activeGoalIndex ? 'w-8 bg-accent-500' : 'w-2 bg-white/30'
                  )}
                  aria-label={`Show goal ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Goal Blocks */}
          <div className="lg:col-span-6 space-y-4">
            {goals.map((goal, idx) => {
              const isActive = idx === activeGoalIndex
              return (
                <div
                  key={goal.id}
                  onClick={() => setActiveGoalIndex(idx)}
                  className={cn(
                    'p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer text-left',
                    isActive
                      ? 'bg-primary-700/80 border-accent-500 shadow-xl ring-1 ring-accent-500/40 scale-[1.01]'
                      : 'bg-primary-900/60 border-white/10 hover:border-accent-500/40 hover:bg-primary-700/40'
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            'size-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                            isActive ? 'bg-accent-500 text-white' : 'bg-primary-700 text-sand-50/70'
                          )}
                        >
                          0{idx + 1}
                        </span>
                        <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                          {goal.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-accent-500 font-semibold mt-1 pl-9">
                        {goal.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-sand-50/85 leading-relaxed pl-9">
                    {goal.description}
                  </p>

                  <ul className="mt-4 pl-9 space-y-2">
                    {goal.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2 text-xs text-sand-50/90 font-medium">
                        <CheckCircle2 className="size-3.5 text-primary-500 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pl-9">
                    <Link
                      href={goal.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-500 hover:text-accent-600 uppercase tracking-wider group"
                    >
                      <span>Explore {goal.title} Options</span>
                      <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
