'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Building2,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coins,
  ShoppingBag,
  Briefcase,
  Store,
  Layers,
} from 'lucide-react'
import type { Project } from '@/lib/types'
import { cn } from '@/lib/utils'
import gsap from 'gsap'

interface FeaturedProjectsShowcaseProps {
  projects: Project[]
}

const PREFERRED_ORDER = [
  'the-omaxe-state',
  'omaxe-chowk',
  'vedatam',
  'mvn-mall',
  'm3m-cosmopolitan',
]

function formatPrice(lakhs?: number | null) {
  if (!lakhs) return 'Price on Request'
  if (lakhs >= 100) {
    const cr = lakhs / 100
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(1)} Cr`
  }
  return `₹${lakhs} Lakh`
}

function formatPossession(possession?: string | null) {
  if (possession === 'ready') return 'Ready to Move'
  if (possession === 'under-construction') return 'Under Construction'
  return 'Inquire for Timeline'
}

function getPrimaryTypeInfo(types?: string[]) {
  if (!types || types.length === 0) return { label: 'Commercial', icon: Building2 }
  const primary = types[0]
  if (primary === 'retail') return { label: 'Retail', icon: ShoppingBag }
  if (primary === 'office') return { label: 'Office Space', icon: Briefcase }
  if (primary === 'sco') return { label: 'SCO Plots', icon: Store }
  if (primary === 'pre-leased') return { label: 'Pre-Leased', icon: Layers }
  return { label: 'Commercial', icon: Building2 }
}

export function FeaturedProjectsShowcase({ projects }: FeaturedProjectsShowcaseProps) {
  // Order projects matching the reference design: preferred first, then other featured
  const showcaseProjects = useMemo(() => {
    const matched = PREFERRED_ORDER.map((slug) => projects.find((p) => p.slug === slug)).filter(
      Boolean
    ) as Project[]
    const others = projects.filter((p) => p.featured && !PREFERRED_ORDER.includes(p.slug))
    const combined = [...matched, ...others]
    return combined.length > 0 ? combined : projects.slice(0, 5)
  }, [projects])

  const [activeIndex, setActiveIndex] = useState(3) // Default to MVN Mall matching the reference screenshot
  const [isPaused, setIsPaused] = useState(false)
  const touchStartXRef = useRef<number | null>(null)
  const centerCardRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const total = showcaseProjects.length
  const activeProject = showcaseProjects[activeIndex] || showcaseProjects[0]

  const prevIndex = (activeIndex - 1 + total) % total
  const nextIndex = (activeIndex + 1) % total

  const prevProject = showcaseProjects[prevIndex]
  const nextProject = showcaseProjects[nextIndex]

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total)
  }, [total])

  // Auto-play interval: rotates projects every 4.5s
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      handleNext()
    }, 4500)
    return () => clearInterval(interval)
  }, [isPaused, handleNext])

  // GSAP animation on active project change
  useEffect(() => {
    if (centerCardRef.current && detailsRef.current) {
      gsap.fromTo(
        centerCardRef.current,
        { scale: 0.98, opacity: 0.92 },
        { scale: 1, opacity: 1, duration: 0.45, ease: 'power2.out' }
      )
      gsap.fromTo(
        detailsRef.current,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
      )
    }
  }, [activeIndex])

  // GSAP subtle floating ambient background orbs
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.ambient-orb-float-1', {
        y: 18,
        x: 12,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.ambient-orb-float-2', {
        y: -16,
        x: -10,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Mobile touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartXRef.current - touchEndX
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }
    touchStartXRef.current = null
  }

  // Create a 3x repetition of projects for continuous seamless looping marquee
  const marqueeList = useMemo(() => {
    return [
      ...showcaseProjects.map((p, i) => ({ project: p, originalIndex: i })),
      ...showcaseProjects.map((p, i) => ({ project: p, originalIndex: i })),
      ...showcaseProjects.map((p, i) => ({ project: p, originalIndex: i })),
    ]
  }, [showcaseProjects])

  const activeType = getPrimaryTypeInfo(activeProject.types)
  const prevType = getPrimaryTypeInfo(prevProject.types)
  const nextType = getPrimaryTypeInfo(nextProject.types)

  const ActiveTypeIcon = activeType.icon
  const PrevTypeIcon = prevType.icon
  const NextTypeIcon = nextType.icon

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#F2F6FD] via-[#FFFFFF] to-[#F2F6FD] overflow-hidden border-t border-line-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative Floating Ambient Lighting & Dots */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#2056B5]/12 via-[#FF302B]/8 to-transparent blur-3xl pointer-events-none ambient-orb-float-1" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#2056B5]/10 via-[#FF302B]/10 to-transparent blur-3xl pointer-events-none ambient-orb-float-2" />
      
      {/* Soft Floating 3D Orb on bottom right (matching reference image) */}
      <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-tl from-[#FF302B]/20 via-[#2056B5]/15 to-white/40 blur-2xl pointer-events-none" />

      {/* Subtle Dot Matrix Accents */}
      <div className="absolute top-10 right-8 w-28 h-28 opacity-25 bg-[radial-gradient(#172544_2px,transparent_2px)] [background-size:12px_12px] hidden md:block pointer-events-none" />
      <div className="absolute bottom-12 left-8 w-28 h-28 opacity-25 bg-[radial-gradient(#172544_2px,transparent_2px)] [background-size:12px_12px] hidden md:block pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6">
          <div className="flex flex-col gap-2">
            {/* Top Pill Badge */}
            <div className="flex items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF2FF] border border-[#2056B5]/20 text-[#2056B5] text-[11px] font-bold uppercase tracking-wider shadow-xs">
                <Building2 className="size-3.5 text-[#2056B5]" />
                <span>Verified Commercial Hubs</span>
                <CheckCircle className="size-3 text-[#2056B5] fill-[#2056B5] text-white" />
              </span>
            </div>

            {/* Title with Vertical Divider & Subtitle */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-6 mt-1">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#172544] leading-tight">
                Featured Commercial{' '}
                <span className="text-[#FF302B] relative inline-block">
                  Projects
                  <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-gradient-to-r from-[#FF302B] via-orange-400 to-transparent rounded-full" />
                </span>
              </h2>

              <div className="hidden md:flex items-center border-l-2 border-[#FF302B] pl-4 max-w-md">
                <p className="text-xs sm:text-sm text-ink-900/75 leading-relaxed font-normal">
                  Prime commercial developments evaluated across connectivity, developer record &amp; IRR.
                </p>
              </div>
            </div>
          </div>

          {/* Right Header Action Button */}
          <div className="flex items-center shrink-0">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white border border-line-200 text-xs sm:text-sm font-bold text-[#172544] hover:text-[#2056B5] hover:border-[#2056B5]/40 shadow-sm hover:shadow-md transition-all group"
            >
              <span>View All Developments</span>
              <ArrowRight className="size-4 text-[#FF302B] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Continuous Project Marquee Ticker */}
        <div className="relative my-6 sm:my-8">
          {/* Edge Gradient Shadows */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#F2F6FD] via-[#F2F6FD]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#F2F6FD] via-[#F2F6FD]/80 to-transparent z-10 pointer-events-none" />

          {/* Left / Right Quick Nudge Buttons */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Project"
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-20 size-8 sm:size-9 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-line-200 flex items-center justify-center text-[#172544] hover:text-[#FF302B] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="size-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Project"
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-20 size-8 sm:size-9 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-line-200 flex items-center justify-center text-[#172544] hover:text-[#FF302B] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="size-4" />
          </button>

          {/* Continuous Ticker Track */}
          <div className="overflow-hidden py-3">
            <div className={cn('animate-marquee-continuous flex items-center gap-3 sm:gap-4', isPaused && 'marquee-paused')}>
              {marqueeList.map((item, idx) => {
                const isActive = item.originalIndex === activeIndex
                return (
                  <button
                    key={`${item.project.slug}-${idx}`}
                    type="button"
                    onClick={() => setActiveIndex(item.originalIndex)}
                    className={cn(
                      'relative px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 shrink-0 flex items-center gap-3 border cursor-pointer select-none',
                      isActive
                        ? 'bg-[#172544] text-white border-[#172544] shadow-lg shadow-[#172544]/25 ring-2 ring-[#FF302B]/40'
                        : 'bg-white/95 text-[#172544] border-line-200/90 hover:border-[#2056B5]/40 hover:bg-white shadow-xs hover:shadow-sm'
                    )}
                  >
                    <div
                      className={cn(
                        'size-7 sm:size-8 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                        isActive ? 'bg-white/15 text-white' : 'bg-blue-50 text-[#2056B5]'
                      )}
                    >
                      <Building2 className="size-4" />
                    </div>

                    <div className="text-left flex flex-col">
                      <span className="font-bold leading-tight">{item.project.name}</span>
                      <span
                        className={cn(
                          'text-[10px] sm:text-[11px] font-normal leading-tight mt-0.5',
                          isActive ? 'text-white/80' : 'text-muted-600'
                        )}
                      >
                        {item.project.sector}
                      </span>
                    </div>

                    {/* Active downward pointing orange accent pin (matching reference image) */}
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FF302B] rotate-45 rounded-[1px] shadow-sm pointer-events-none" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main 3D Showcase Deck */}
        <div
          className="relative mt-2 sm:mt-4 flex items-center justify-center overflow-visible"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Previous Card Preview (3D Perspective Left, Clickable) */}
          <div
            onClick={handlePrev}
            role="button"
            tabIndex={0}
            aria-label={`View previous: ${prevProject.name}`}
            className="hidden lg:block w-[320px] shrink-0 -mr-20 z-10 cursor-pointer select-none transition-all duration-500 hover:scale-[0.92] opacity-75 hover:opacity-100 [transform:perspective(1200px)_rotateY(16deg)_scale(0.85)]"
          >
            <div className="rounded-3xl overflow-hidden bg-white border border-white shadow-xl shadow-[#172544]/10">
              <div className="relative aspect-[16/10] overflow-hidden bg-blue-50">
                <Image
                  src={prevProject.image}
                  alt={prevProject.name}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md text-[#172544] text-xs font-bold shadow-sm">
                    <PrevTypeIcon className="size-3 text-[#2056B5]" />
                    <span>{prevType.label}</span>
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <h4 className="font-bold text-sm leading-snug drop-shadow-sm">{prevProject.name}</h4>
                    <p className="text-[11px] text-white/80">{prevProject.sector}</p>
                  </div>
                  <div className="size-8 rounded-full bg-white/90 text-[#172544] flex items-center justify-center shadow-md">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Active Project Card (Center, Large) */}
          <div
            ref={centerCardRef}
            className="w-full max-w-4xl shrink-0 z-20 relative rounded-[28px] overflow-hidden bg-white shadow-[0_25px_60px_-15px_rgba(23,37,68,0.18),0_0_35px_rgba(255,48,43,0.10)] border border-white ring-1 ring-[#172544]/5 transition-all duration-500"
          >
            {/* Top Image Showcase */}
            <div className="relative h-[250px] sm:h-[340px] md:h-[400px] w-full overflow-hidden bg-blue-50">
              <Image
                key={activeProject.slug}
                src={activeProject.image}
                alt={activeProject.imageAlt || activeProject.name}
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 900px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Property Category Badge (Top Left) */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-[#172544] text-xs sm:text-sm font-bold shadow-md border border-line-200">
                  <ActiveTypeIcon className="size-4 text-[#2056B5]" />
                  <span>{activeType.label}</span>
                </span>
              </div>
            </div>

            {/* Bottom Analytical Info Panel (White surface matching reference screenshot) */}
            <div ref={detailsRef} className="p-4 sm:p-6 lg:p-7 bg-white">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 sm:gap-6">
                {/* Left: Orange Accent Bar + Title & Location */}
                <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                  <div className="w-1.5 h-10 sm:h-12 bg-[#FF302B] rounded-full shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-heading text-xl sm:text-2xl lg:text-[26px] font-bold text-[#172544] leading-tight tracking-tight">
                      {activeProject.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-600 font-medium mt-1">
                      {activeProject.sector}
                    </p>
                  </div>
                </div>

                {/* Right Group: Price, Possession, and CTA Button */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between lg:justify-end gap-4 sm:gap-6 pt-3 lg:pt-0 border-t lg:border-t-0 border-line-200/80">
                  {/* Starting Price Metric */}
                  <div className="flex items-center gap-2.5">
                    <div className="size-9 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center shrink-0 text-[#2056B5]">
                      <Coins className="size-4.5" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-muted-600 uppercase tracking-wider">
                        Starting Price
                      </div>
                      <div className="text-sm sm:text-base lg:text-lg font-bold text-[#172544]">
                        {formatPrice(activeProject.startingPriceLakh)}
                      </div>
                    </div>
                  </div>

                  {/* Possession Timeline Metric */}
                  <div className="flex items-center gap-2.5">
                    <div className="size-9 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center shrink-0 text-[#2056B5]">
                      <Clock className="size-4.5" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-muted-600 uppercase tracking-wider">
                        Possession Timeline
                      </div>
                      <div className="text-sm sm:text-base lg:text-lg font-bold text-[#172544]">
                        {formatPossession(activeProject.possession)}
                      </div>
                    </div>
                  </div>

                  {/* Circular Orange CTA Button */}
                  <Link
                    href={`/projects/${activeProject.slug}`}
                    className="size-11 sm:size-12 rounded-full bg-gradient-to-r from-[#FF302B] to-[#FF4D48] text-white flex items-center justify-center shadow-lg shadow-[#FF302B]/35 hover:scale-110 active:scale-95 transition-all duration-200 shrink-0"
                    title={`View details for ${activeProject.name}`}
                  >
                    <ArrowRight className="size-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Next Card Preview (3D Perspective Right, Clickable) */}
          <div
            onClick={handleNext}
            role="button"
            tabIndex={0}
            aria-label={`View next: ${nextProject.name}`}
            className="hidden lg:block w-[320px] shrink-0 -ml-20 z-10 cursor-pointer select-none transition-all duration-500 hover:scale-[0.92] opacity-75 hover:opacity-100 [transform:perspective(1200px)_rotateY(-16deg)_scale(0.85)]"
          >
            <div className="rounded-3xl overflow-hidden bg-white border border-white shadow-xl shadow-[#172544]/10">
              <div className="relative aspect-[16/10] overflow-hidden bg-blue-50">
                <Image
                  src={nextProject.image}
                  alt={nextProject.name}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md text-[#172544] text-xs font-bold shadow-sm">
                    <NextTypeIcon className="size-3 text-[#2056B5]" />
                    <span>{nextType.label}</span>
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <h4 className="font-bold text-sm leading-snug drop-shadow-sm">{nextProject.name}</h4>
                    <p className="text-[11px] text-white/80">{nextProject.sector}</p>
                  </div>
                  <div className="size-8 rounded-full bg-white/90 text-[#172544] flex items-center justify-center shadow-md">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pagination Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
          {showcaseProjects.map((p, idx) => {
            const isActive = idx === activeIndex
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={cn(
                  'h-2 rounded-full transition-all duration-300 cursor-pointer',
                  isActive
                    ? 'w-7 sm:w-8 bg-[#FF302B] shadow-sm shadow-[#FF302B]/50'
                    : 'w-2 bg-blue-200/80 hover:bg-blue-300'
                )}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
