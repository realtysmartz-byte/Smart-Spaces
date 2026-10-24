'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, MapPin } from 'lucide-react'
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

const yieldBenchmarks = [
  { type: 'Pre-Leased Commercial', yieldRange: '7.8% – 9.4%', tenant: 'MNC & Bank covenants', badge: 'Immediate Cashflow' },
  { type: 'Grade A Office Spaces', yieldRange: '7.2% – 8.8%', tenant: 'Managed IT & Fortune 500', badge: 'High Retention' },
  { type: 'High-Street Retail & F&B', yieldRange: '6.8% – 8.4%', tenant: 'Anchor brands & Dining', badge: 'Dense Footfall' },
  { type: 'Freehold SCO Commercial', yieldRange: '4.5% – 6.0%', tenant: '100% Land Ownership', badge: 'Capital Growth' },
]

const corridorSnapshot = [
  { corridor: 'Cyber City & Horizon', occupancy: '96%', rentRange: '₹145–185 / sq.ft.' },
  { corridor: 'Golf Course Road', occupancy: '94%', rentRange: '₹160–225 / sq.ft.' },
  { corridor: 'Golf Course Extn Road', occupancy: '88%', rentRange: '₹95–135 / sq.ft.' },
  { corridor: 'Southern Peripheral (SPR)', occupancy: '82%', rentRange: '₹70–110 / sq.ft.' },
]

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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Scroll spy: automatically update active card as user scrolls through the section
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-goal-index'))
            if (!isNaN(index)) {
              setActiveGoalIndex(index)
            }
          }
        })
      },
      {
        rootMargin: '-20% 0px -30% 0px',
        threshold: 0.2,
      }
    )

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-10 sm:py-14 bg-blue-50 text-ink-900 relative border-t border-line-200">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sm:mb-8 gap-4 pb-4 border-b border-line-200">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-ink-900">
              Invest Aligned with Your Objective
            </h2>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-300/40 text-blue-600 text-xs font-semibold uppercase tracking-wider">
              Strategic Alignment
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-600 max-w-lg md:text-right">
            Curated opportunities for regular yield, capital appreciation, business occupation, or pre-leased security.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Sidebar with Goal Spotlight & Market Benchmarks */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-[84px] transition-all duration-300">
            {/* 1. Active Goal Spotlight Card */}
            <div className="rounded-3xl overflow-hidden border border-line-200 shadow-[0_12px_36px_rgba(20,33,61,0.08)] bg-white">
              {/* Photo Viewport with smooth crossfade */}
              <div className="relative h-[220px] sm:h-[260px] w-full overflow-hidden bg-blue-50">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                      {/* Top floating pill */}
                      <div className="absolute top-4 left-4 z-20 pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-blue-700 text-xs font-bold uppercase tracking-wider shadow-sm border border-line-200/90">
                          <ShieldCheck className="size-3.5 text-blue-600" />
                          <span>{goal.recommendedType}</span>
                        </span>
                      </div>

                      {/* Bottom overlay info */}
                      <div className="absolute bottom-3 left-4 right-4 z-20 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-line-200 shadow-sm">
                        <div className="flex items-center justify-between">
                          <h4 className="font-heading text-base sm:text-lg font-bold text-ink-900 truncate">
                            {goal.title}
                          </h4>
                          <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full shrink-0">
                            Goal 0{idx + 1}/04
                          </span>
                        </div>
                        <p className="text-xs text-muted-600 mt-0.5 truncate">{goal.tagline}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Due Diligence Highlights for Active Goal */}
              <div className="p-4 sm:p-5 bg-white border-t border-line-200">
                <div className="flex items-center justify-between pb-2.5 border-b border-line-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-blue-600" />
                    Verified Investment Highlights
                  </span>
                  <span className="text-[11px] font-medium text-muted-600">Updated Monthly</span>
                </div>

                <ul className="mt-3 space-y-2">
                  {goals[activeGoalIndex].points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2 text-xs sm:text-sm text-ink-900/90 font-medium">
                      <CheckCircle2 className="size-4 text-blue-600 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3.5 pt-3 border-t border-line-200 flex items-center justify-between">
                  <span className="text-xs text-muted-600 truncate max-w-[60%]">
                    Institutional due diligence ready
                  </span>
                  <Link
                    href={goals[activeGoalIndex].href}
                    className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 group/link shrink-0"
                  >
                    <span>View Qualifying Assets</span>
                    <ArrowRight className="size-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Gurgaon Commercial Yield Index Widget */}
            <div className="rounded-2xl border border-line-200 bg-white p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-line-200">
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <TrendingUp className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-ink-900">
                      Gurgaon Commercial Yield Index
                    </h4>
                    <p className="text-[11px] text-muted-600">Current market gross rental yields (Q3–Q4)</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  Live Benchmarks
                </span>
              </div>

              <div className="mt-3 divide-y divide-line-100">
                {yieldBenchmarks.map((item, bIdx) => (
                  <div key={bIdx} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs">
                    <div className="min-w-0">
                      <p className="font-semibold text-ink-900 truncate">{item.type}</p>
                      <p className="text-[11px] text-muted-500 truncate">{item.tenant}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-heading font-bold text-blue-600 text-sm">{item.yieldRange}</span>
                      <span className="block text-[10px] text-muted-500 font-medium">{item.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Prime Corridor Rental & Occupancy Snapshot */}
            <div className="rounded-2xl border border-line-200 bg-white p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-line-200">
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                    <MapPin className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-ink-900">
                      Prime Corridor Snapshot
                    </h4>
                    <p className="text-[11px] text-muted-600">Grade A micro-market rental ranges</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
                  Gurgaon
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {corridorSnapshot.map((c, cIdx) => (
                  <div key={cIdx} className="p-2.5 rounded-xl bg-blue-50/60 border border-line-200/70">
                    <p className="text-[11px] font-bold text-ink-900 truncate">{c.corridor}</p>
                    <p className="text-xs font-bold text-blue-700 mt-1">{c.rentRange}</p>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-muted-600 font-medium">
                      <span>Occupancy:</span>
                      <span className="font-semibold text-emerald-600">{c.occupancy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Advisory Callout Banner */}
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-50/50 p-4 sm:p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800">
                    Need Personalized Portfolio Guidance?
                  </h4>
                  <p className="text-xs text-muted-600 mt-0.5">
                    Our commercial analysts map assets to your IRR & tax goals.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="#shortlist"
                    className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    Request Shortlist
                  </a>
                  <a
                    href="tel:+919818818818"
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-white border border-line-200 hover:border-blue-300 text-blue-700 text-xs font-bold transition-colors"
                  >
                    Call Advisor
                  </a>
                </div>
              </div>
            </div>

            {/* Quick switcher dots for mobile */}
            <div className="flex justify-center gap-2 pt-2 lg:hidden">
              {goals.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveGoalIndex(idx)
                    cardRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    idx === activeGoalIndex ? 'w-8 bg-blue-600' : 'w-2 bg-line-200'
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
                  ref={(el) => {
                    cardRefs.current[idx] = el
                  }}
                  data-goal-index={idx}
                  onClick={() => {
                    setActiveGoalIndex(idx)
                  }}
                  className={cn(
                    'p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer text-left',
                    isActive
                      ? 'bg-white border-blue-600 shadow-[0_8px_30px_rgba(20,33,61,0.08)] ring-1 ring-blue-600/40 scale-[1.01]'
                      : 'bg-white/70 border-line-200 hover:border-blue-300 hover:bg-white'
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            'size-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                            isActive ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                          )}
                        >
                          0{idx + 1}
                        </span>
                        <h3 className="font-heading text-xl sm:text-2xl font-bold text-ink-900">
                          {goal.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-blue-600 font-semibold mt-1 pl-9">
                        {goal.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-muted-600 leading-relaxed pl-9">
                    {goal.description}
                  </p>

                  <ul className="mt-4 pl-9 space-y-2">
                    {goal.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2 text-xs text-ink-900/90 font-medium">
                        <CheckCircle2 className="size-3.5 text-blue-600 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pl-9">
                    <Link
                      href={goal.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 uppercase tracking-wider group"
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
