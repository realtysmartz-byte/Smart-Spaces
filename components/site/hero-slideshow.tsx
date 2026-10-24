'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { MapPin, Pause, Play, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface HeroSlide {
  image: string
  alt: string
  chip: string
  corridor: string
}

export const heroSlides: HeroSlide[] = [
  {
    image: '/images/hero-gurgaon-skyline.png',
    alt: 'Gurgaon commercial skyline and corporate headquarters along Cyber City at dusk',
    chip: 'Cyber City & DLF Horizon • Grade A Offices',
    corridor: 'Cyber Hub / DLF Phase 2',
  },
  {
    image: '/images/hero-golf-course-road.jpg',
    alt: 'Golf Course Road Gurgaon luxury commercial glass skyscrapers at sunset',
    chip: 'Golf Course Road • Premier Corporate District',
    corridor: 'Golf Course Road Corridor',
  },
  {
    image: '/images/hero-office-interior.jpg',
    alt: 'Grade A corporate headquarters lobby and executive workspaces in Gurgaon',
    chip: 'Grade A Corporate Workspaces • Sustainable Towers',
    corridor: 'Horizon Center Micro-market',
  },
  {
    image: '/images/category-retail.png',
    alt: 'High-street commercial retail promenade and premium dining destinations',
    chip: 'Golf Course Extn • High-Street Retail & Footfalls',
    corridor: 'Golf Course Extension Corridor',
  },
  {
    image: '/images/category-sco.png',
    alt: 'Commercial SCO plots and freehold commercial plazas in Gurgaon',
    chip: 'Southern Peripheral Road • Freehold SCO Plots',
    corridor: 'SPR Corridor',
  },
  {
    image: '/images/location-corridor.png',
    alt: 'Dwarka Expressway emerging commercial growth and retail hubs',
    chip: 'Dwarka Expressway • Mixed-Use Commercial Hub',
    corridor: 'Dwarka Expressway Hub',
  },
]

export function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Respect prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      setReducedMotion(mediaQuery.matches)

      const handleMotionChange = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches)
      }
      mediaQuery.addEventListener('change', handleMotionChange)
      return () => mediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  // Auto-slide every 2000ms (2 seconds)
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    if (isPaused || reducedMotion) return

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true)
      } else {
        setIsPaused(false)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    const interval = setInterval(() => {
      nextSlide()
    }, 2000)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isPaused, reducedMotion, nextSlide])

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    if (diff > 45) {
      nextSlide()
    } else if (diff < -45) {
      prevSlide()
    }
    touchStartX.current = 0
    touchEndX.current = 0
  }

  return (
    <div
      className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] lg:h-[490px] xl:h-[510px] rounded-[24px] overflow-hidden border border-line-200 shadow-[0_10px_30px_rgba(20,33,61,0.08)] bg-blue-50 select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Gurgaon Commercial Developments Slideshow"
    >
      {/* Background Slides with Ken Burns zoom (1 -> 1.05) & Smooth 800ms Crossfade */}
      {heroSlides.map((slide, idx) => {
        const isActive = idx === currentSlide
        return (
          <div
            key={slide.image}
            className={cn(
              'absolute inset-0 transition-opacity duration-800 ease-in-out',
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            )}
          >
            <div
              className={cn(
                'relative w-full h-full transition-transform duration-2000 ease-out',
                isActive && !reducedMotion ? 'scale-105' : 'scale-100'
              )}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={idx === 0}
                loading={idx === 0 ? 'eager' : 'lazy'}
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 52vw"
              />
            </div>
          </div>
        )
      })}

      {/* Top Floating Badge Chip */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-line-200 text-ink-900 text-xs font-semibold shadow-md">
          <ShieldCheck className="size-3.5 text-blue-600" />
          <span>Verified Commercial Assets</span>
        </div>
      </div>

      {/* Bottom Controls Bar: Left Caption Pill + Right Dots/Progress */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pointer-events-auto">
        {/* Caption Chip with Solid White Background & Ink Text (No text on raw image) */}
        <div
          key={currentSlide}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-line-200 text-ink-900 text-xs font-semibold shadow-md backdrop-blur-md animate-in fade-in duration-300 max-w-full truncate"
        >
          <MapPin className="size-3 text-red-600 shrink-0" />
          <span className="truncate">{heroSlides[currentSlide].chip}</span>
        </div>

        {/* Progress Dots + Play/Pause */}
        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-line-200 shadow-md">
          {heroSlides.map((_, idx) => {
            const isActive = idx === currentSlide
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={cn(
                  'relative h-2 rounded-full transition-all duration-300 overflow-hidden',
                  isActive ? 'w-7 bg-blue-100' : 'w-2 bg-line-200 hover:bg-blue-300'
                )}
                aria-label={`Jump to slide ${idx + 1}`}
                aria-current={isActive ? 'true' : 'false'}
              >
                {isActive && !isPaused && !reducedMotion && (
                  <span className="absolute inset-0 bg-blue-600 animate-slide-progress rounded-full" />
                )}
                {isActive && (isPaused || reducedMotion) && (
                  <span className="absolute inset-0 bg-blue-600 rounded-full" />
                )}
              </button>
            )
          })}

          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="ml-1 p-0.5 rounded-full text-muted-600 hover:text-ink-900 transition-colors"
            aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
            title={isPaused ? 'Play' : 'Pause'}
          >
            {isPaused ? <Play className="size-3 text-blue-600" /> : <Pause className="size-3 text-ink-900" />}
          </button>
        </div>
      </div>
    </div>
  )
}
