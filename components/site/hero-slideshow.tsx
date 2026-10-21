'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { MapPin, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface HeroSlide {
  image: string
  alt: string
  chip: string
  corridor: string
  extraOverlayOpacity?: number // Configurable extra scrim for brighter images
}

export const heroSlides: HeroSlide[] = [
  {
    image: '/images/hero-gurgaon-skyline.png',
    alt: 'Gurgaon commercial skyline and corporate headquarters along Cyber City at dusk',
    chip: 'Cyber City & DLF Horizon • Institutional Grade A Offices',
    corridor: 'Cyber Hub / DLF Phase 2',
    extraOverlayOpacity: 0.05,
  },
  {
    image: '/images/hero-golf-course-road.jpg',
    alt: 'Golf Course Road Gurgaon luxury commercial glass skyscrapers at sunset',
    chip: 'Golf Course Road • Premier Corporate & Financial District',
    corridor: 'Golf Course Road Corridor',
    extraOverlayOpacity: 0.1,
  },
  {
    image: '/images/hero-office-interior.jpg',
    alt: 'Grade A corporate headquarters lobby and executive workspaces in Gurgaon',
    chip: 'Grade A Headquarters • Sustainable Corporate Infrastructure',
    corridor: 'Horizon Center Micro-market',
    extraOverlayOpacity: 0.05,
  },
  {
    image: '/images/category-retail.png',
    alt: 'High-street commercial retail promenade and premium dining destinations',
    chip: 'Golf Course Extn • High-Street Retail & Anchor Footfalls',
    corridor: 'Golf Course Extension Corridor',
    extraOverlayOpacity: 0.1,
  },
  {
    image: '/images/category-sco.png',
    alt: 'Commercial SCO plots and freehold commercial plazas in Gurgaon',
    chip: 'Southern Peripheral Road (SPR) • Freehold SCO Commercial',
    corridor: 'SPR Corridor',
    extraOverlayOpacity: 0.05,
  },
  {
    image: '/images/location-corridor.png',
    alt: 'Dwarka Expressway emerging commercial growth and retail hubs',
    chip: 'Dwarka Expressway • High Growth Commercial & Mixed-Use Hub',
    corridor: 'Dwarka Expressway Hub',
    extraOverlayOpacity: 0.08,
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
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Gurgaon Commercial Corridors Slideshow"
    >
      {/* Background Slides with Ken Burns zoom (1 -> 1.06) & Smooth 800ms Crossfade */}
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
                isActive && !reducedMotion ? 'scale-106' : 'scale-100'
              )}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={idx === 0}
                loading={idx === 0 ? 'eager' : 'lazy'}
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>

            {/* Configurable extra slide-wise overlay if bright */}
            {slide.extraOverlayOpacity && (
              <div
                className="absolute inset-0 bg-[#111315] pointer-events-none"
                style={{ opacity: slide.extraOverlayOpacity }}
              />
            )}
          </div>
        )
      })}

      {/* Mandatory Dark Scrim: linear-gradient with Obsidian #111315 */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(17,19,21,0.78) 0%, rgba(17,19,21,0.58) 40%, rgba(17,19,21,0.88) 100%)',
        }}
      />

      {/* Bottom Slideshow Controls with Animated Caption Pill (Never overlaps with H1 on mobile) */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex flex-col items-center gap-2.5 px-4 pointer-events-auto">
        <div
          key={currentSlide}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-900/95 border border-white/20 text-white text-xs font-semibold shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-1 duration-300 pointer-events-none max-w-full truncate"
        >
          <MapPin className="size-3 text-accent-500 shrink-0" />
          <span className="truncate">{heroSlides[currentSlide].chip}</span>
        </div>

        <div className="flex items-center gap-2 bg-primary-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-xl">
          {heroSlides.map((_, idx) => {
            const isActive = idx === currentSlide
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={cn(
                  'relative h-2 rounded-full transition-all duration-300 overflow-hidden',
                  isActive ? 'w-8 bg-white/20' : 'w-2 bg-white/40 hover:bg-white/70'
                )}
                aria-label={`Jump to slide ${idx + 1}`}
                aria-current={isActive ? 'true' : 'false'}
              >
                {isActive && !isPaused && !reducedMotion && (
                  <span className="absolute inset-0 bg-accent-500 animate-slide-progress rounded-full" />
                )}
                {isActive && (isPaused || reducedMotion) && (
                  <span className="absolute inset-0 bg-accent-500 rounded-full" />
                )}
              </button>
            )
          })}

          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="ml-1.5 p-1 rounded-full text-white/80 hover:text-white transition-colors"
            aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
            title={isPaused ? 'Play' : 'Pause'}
          >
            {isPaused ? <Play className="size-3 text-white" /> : <Pause className="size-3 text-white" />}
          </button>
        </div>
      </div>
    </div>
  )
}
