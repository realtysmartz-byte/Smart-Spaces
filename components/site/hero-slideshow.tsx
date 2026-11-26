'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const buildingCutouts = [
  {
    src: '/images/hero-building-cutout.png',
    alt: 'Modern Grade A commercial office skyscrapers in Gurgaon',
  },
  {
    src: '/images/hero-building-2.png',
    alt: 'Twin glass corporate IT skyscraper complex in Gurgaon Cyber City',
  },
  {
    src: '/images/hero-building-3.png',
    alt: 'Luxury commercial retail and office plaza in Gurgaon',
  },
]

export function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      setReducedMotion(mq.matches)
      const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    }
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % buildingCutouts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [reducedMotion])

  return (
    <div
      className="relative w-full h-[270px] sm:h-[340px] md:h-[390px] lg:h-[430px] select-none overflow-hidden"
      style={{ perspective: '1400px' }}
      aria-label="Gurgaon Commercial Developments 3D Showcase"
    >
      {/* 3D Rotating Architectural Turntable (360° continuous Y-axis orbit) */}
      <div className="relative w-full h-full animate-hero-3d-orbit">
        {buildingCutouts.map((item, idx) => {
          const isActive = idx === activeIndex
          return (
            <div
              key={item.src}
              className={cn(
                'absolute inset-0 transition-opacity duration-[1600ms] ease-in-out will-change-[opacity]',
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
              )}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Plane 1: Front / Back (0deg) */}
              <div
                className="absolute inset-0"
                style={{ transform: 'rotateY(0deg) translateZ(0)', backfaceVisibility: 'visible' }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  priority
                  loading="eager"
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>

              {/* Plane 2: Orthogonal Side Depth (90deg) */}
              <div
                className="absolute inset-0"
                style={{ transform: 'rotateY(90deg) translateZ(0)', backfaceVisibility: 'visible' }}
              >
                <Image
                  src={item.src}
                  alt=""
                  aria-hidden="true"
                  fill
                  priority
                  loading="eager"
                  className="object-contain object-center opacity-95"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
