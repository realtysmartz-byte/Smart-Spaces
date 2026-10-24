'use client'

import { useEffect, useState, useRef } from 'react'
import { ShieldCheck, BarChart3, Compass, CheckCircle2 } from 'lucide-react'

export function StatsCounter() {
  const [isVisible, setIsVisible] = useState(false)
  const [corridorCount, setCorridorCount] = useState(0)
  const [assetClassCount, setAssetClassCount] = useState(0)
  const [checkpointsCount, setCheckpointsCount] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.25 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Counter animation for verified research metrics
    let start = 0
    const duration = 1200
    const stepTime = 30
    const steps = duration / stepTime

    const timer = setInterval(() => {
      start++
      const progress = Math.min(start / steps, 1)
      setCorridorCount(Math.floor(progress * 7))
      setAssetClassCount(Math.floor(progress * 4))
      setCheckpointsCount(Math.floor(progress * 24))

      if (progress >= 1) clearInterval(timer)
    }, stepTime)

    return () => clearInterval(timer)
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-10 sm:py-14 bg-blue-50 text-ink-900 relative overflow-hidden border-t border-line-200">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sm:mb-8 gap-4 pb-4 border-b border-line-200">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-ink-900">
              Built on Due Diligence, Not Sales Pitches
            </h2>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-300/40 text-blue-600 text-xs font-semibold uppercase tracking-wider">
              Research-Led Intelligence
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-600 max-w-md md:text-right">
            Independent advisory backed by infrastructure analysis, cash flow modeling, and verified title diligence.
          </p>
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="p-6 rounded-2xl bg-white border border-line-200 text-center shadow-[0_8px_30px_rgba(20,33,61,0.06)]">
            <Compass className="size-8 text-blue-600 mx-auto mb-3" />
            <div className="font-heading text-4xl sm:text-5xl font-bold text-ink-900">
              {corridorCount}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-blue-600 mt-2 uppercase tracking-wider">
              Prime Corridors Mapped
            </div>
            <p className="text-xs text-muted-600 mt-1">
              Golf Course Rd, SPR, Dwarka Exp, Sohna Rd & more
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-line-200 text-center shadow-[0_8px_30px_rgba(20,33,61,0.06)]">
            <BarChart3 className="size-8 text-blue-600 mx-auto mb-3" />
            <div className="font-heading text-4xl sm:text-5xl font-bold text-ink-900">
              {assetClassCount}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-blue-600 mt-2 uppercase tracking-wider">
              Asset Classes Analyzed
            </div>
            <p className="text-xs text-muted-600 mt-1">
              Offices, High-Street Retail, SCO Plots & Pre-Leased
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-line-200 text-center shadow-[0_8px_30px_rgba(20,33,61,0.06)]">
            <ShieldCheck className="size-8 text-red-600 mx-auto mb-3" />
            <div className="font-heading text-4xl sm:text-5xl font-bold text-ink-900">
              {checkpointsCount}+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-red-600 mt-2 uppercase tracking-wider">
              Diligence Checkpoints
            </div>
            <p className="text-xs text-muted-600 mt-1">
              Title, RERA, Catchment, Yield & Exit Liquidity
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-line-200 text-center shadow-[0_8px_30px_rgba(20,33,61,0.06)]">
            <CheckCircle2 className="size-8 text-blue-600 mx-auto mb-3" />
            <div className="font-heading text-4xl sm:text-5xl font-bold text-blue-600">
              100%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-blue-600 mt-2 uppercase tracking-wider">
              Unbiased Advisory
            </div>
            <p className="text-xs text-muted-600 mt-1">
              Zero developer portal bias; investor interest first
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
