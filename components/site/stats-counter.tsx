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
    <section ref={sectionRef} className="py-20 sm:py-24 bg-primary-900 text-white relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-4">
            Research-Led Real Estate Intelligence
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Built on Due Diligence, Not Sales Pitches
          </h2>
          <p className="mt-3 text-base text-sand-50/85 leading-relaxed">
            Smartz Spaces delivers independent advisory backed by location infrastructure analysis, cash flow
            feasibility, and risk profiling across Gurgaon and Delhi NCR.
          </p>
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="p-6 rounded-2xl bg-primary-700/60 border border-white/10 text-center shadow-lg">
            <Compass className="size-8 text-accent-500 mx-auto mb-3" />
            <div className="font-heading text-4xl sm:text-5xl font-bold text-white">
              {corridorCount}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-accent-500 mt-2 uppercase tracking-wider">
              Prime Corridors Mapped
            </div>
            <p className="text-xs text-sand-50/75 mt-1">
              Golf Course Rd, SPR, Dwarka Exp, Sohna Rd & more
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-primary-700/60 border border-white/10 text-center shadow-lg">
            <BarChart3 className="size-8 text-accent-500 mx-auto mb-3" />
            <div className="font-heading text-4xl sm:text-5xl font-bold text-white">
              {assetClassCount}
            </div>
            <div className="text-xs sm:text-sm font-semibold text-accent-500 mt-2 uppercase tracking-wider">
              Asset Classes Analyzed
            </div>
            <p className="text-xs text-sand-50/75 mt-1">
              Offices, High-Street Retail, SCO Plots & Pre-Leased
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-primary-700/60 border border-white/10 text-center shadow-lg">
            <ShieldCheck className="size-8 text-accent-500 mx-auto mb-3" />
            <div className="font-heading text-4xl sm:text-5xl font-bold text-white">
              {checkpointsCount}+
            </div>
            <div className="text-xs sm:text-sm font-semibold text-accent-500 mt-2 uppercase tracking-wider">
              Diligence Checkpoints
            </div>
            <p className="text-xs text-sand-50/75 mt-1">
              Title, RERA, Catchment, Yield & Exit Liquidity
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-primary-700/60 border border-white/10 text-center shadow-lg">
            <CheckCircle2 className="size-8 text-primary-500 mx-auto mb-3" />
            <div className="font-heading text-4xl sm:text-5xl font-bold text-primary-500">
              100%
            </div>
            <div className="text-xs sm:text-sm font-semibold text-primary-500 mt-2 uppercase tracking-wider">
              Unbiased Advisory
            </div>
            <p className="text-xs text-sand-50/75 mt-1">
              Zero developer portal bias; investor interest first
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
