'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Building2,
  CheckCircle,
  ArrowRight,
  HardHat,
  Handshake,
  Paintbrush,
  Settings,
  TrendingUp,
  X,
  Calculator,
  Compass,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SCOTopic {
  id: string
  title: string
  shortDesc: string
  detailedInsights: string
  keyPoints: string[]
  icon: typeof Building2
  image: string
  alt: string
  badgeColor: string
}

const scoTopics: SCOTopic[] = [
  {
    id: 'plot-ownership',
    title: 'Plot Ownership',
    shortDesc: 'You own the commercial plot and the land title.',
    detailedInsights:
      'Unlike strata-titled commercial units where you hold an undivided share of land (UDS), an SCO plot gives you 100% freehold ownership of the land beneath and the building constructed above.',
    keyPoints: [
      '100% clear freehold title with registered conveyance deed',
      'No common-area undivided share limitations',
      'Direct asset inheritance and independent legal transfer rights',
    ],
    icon: Building2,
    image: '/images/sco/sco-plot-ownership.png',
    alt: '3D commercial land plot with blueprint and location pin',
    badgeColor: 'bg-blue-50 text-[#2056B5]',
  },
  {
    id: 'building-control',
    title: 'Building Control',
    shortDesc: 'Design and construct the building within bye-laws.',
    detailedInsights:
      'Complete structural and construction authority. Under Haryana Town and Country Planning (DTCP) norms, owners can build Basement + Ground + 4 Floors with 100% ground coverage.',
    keyPoints: [
      'Full architectural freedom within licensed zoning guidelines',
      'Option to construct in phases or build all floors simultaneously',
      'Select your preferred contractors, materials, and MEP systems',
    ],
    icon: HardHat,
    image: '/images/sco/sco-building-control.png',
    alt: '3D construction building with crane and architectural blueprint',
    badgeColor: 'bg-blue-50 text-[#2056B5]',
  },
  {
    id: 'leasing-freedom',
    title: 'Leasing Freedom',
    shortDesc: 'Decide tenants, rents and lease terms for each floor.',
    detailedInsights:
      'Zero developer interference in tenant selection. You have full discretion to lease the lower floors to high-street retail or restaurants and upper floors to corporate offices or clinics.',
    keyPoints: [
      'Multi-tenant yield optimization (retail ground + office upper)',
      'Independent negotiation of lease tenure, lock-ins, and escalations',
      'Option to self-occupy floors for your own business enterprise',
    ],
    icon: Handshake,
    image: '/images/sco/sco-leasing-freedom.png',
    alt: '3D commercial property keys with house keychain',
    badgeColor: 'bg-blue-50 text-[#2056B5]',
  },
  {
    id: 'customization',
    title: 'Customization',
    shortDesc: 'Branding, facade and interior design are your choice.',
    detailedInsights:
      'Total brand expression for high corporate visibility. Owners can install custom double-height glass facades, rooftop terraces, private high-speed elevators, and prominent external signage.',
    keyPoints: [
      'Exclusive rooftop and building facade branding rights',
      'Tailored column-free layouts matching anchor tenant specifications',
      'Private entrance lobbies and personalized elevator access',
    ],
    icon: Paintbrush,
    image: '/images/sco/sco-customization.png',
    alt: '3D interior design workspace with modern furniture and color palette',
    badgeColor: 'bg-blue-50 text-[#2056B5]',
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    shortDesc: 'You bear building maintenance and common area costs.',
    detailedInsights:
      'You eliminate heavy third-party developer maintenance margins. Facility management, security, energy efficiency, and cleaning can be managed in-house or through your trusted vendor.',
    keyPoints: [
      'Transparent direct operational expenditure with no developer markups',
      'Complete control over utility metering and backup power distribution',
      'Tenant CAM (Common Area Maintenance) charges managed directly by owner',
    ],
    icon: Settings,
    image: '/images/sco/sco-maintenance.png',
    alt: '3D maintenance tools with safety helmet and building equipment',
    badgeColor: 'bg-blue-50 text-[#2056B5]',
  },
  {
    id: 'exit-flexibility',
    title: 'Exit Flexibility',
    shortDesc: 'Sell the whole building or lease floor-wise.',
    detailedInsights:
      'Unmatched exit liquidity. You can sell the entire commercial asset to institutional investors, execute floor-wise sales where bye-laws permit, or raise Lease Rental Discounting (LRD) debt.',
    keyPoints: [
      'High institutional appetite for standalone commercial buildings',
      'Eligible for long-term Lease Rental Discounting (LRD) banking loans',
      'Higher capital appreciation compared to shared commercial floorplates',
    ],
    icon: TrendingUp,
    image: '/images/sco/sco-exit-flexibility.png',
    alt: '3D commercial building model with investment coins and growth arrow',
    badgeColor: 'bg-blue-50 text-[#2056B5]',
  },
]

export function SCOOwnershipSection() {
  const [selectedTopic, setSelectedTopic] = useState<SCOTopic | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerIllustrationRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle floating animation for header 3D building
      if (headerIllustrationRef.current) {
        gsap.to(headerIllustrationRef.current, {
          y: -12,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      // Floating background light orbs
      gsap.to('.sco-ambient-orb-1', {
        y: 15,
        x: 10,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('.sco-ambient-orb-2', {
        y: -15,
        x: -8,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Staggered card reveal on scroll
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F2F6FD] via-[#FFFFFF] to-[#F2F6FD] border-t border-line-200 overflow-hidden"
    >
      {/* Decorative Ambient Lighting & Dot Matrix */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#2056B5]/12 via-[#FF302B]/8 to-transparent blur-3xl pointer-events-none sco-ambient-orb-1" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#2056B5]/10 via-[#FF302B]/10 to-transparent blur-3xl pointer-events-none sco-ambient-orb-2" />

      {/* Floating 3D Accent Sphere (Bottom Right) */}
      <div className="absolute -bottom-16 -right-16 w-52 h-52 rounded-full bg-gradient-to-tl from-[#FF302B]/20 via-[#2056B5]/15 to-white/40 blur-2xl pointer-events-none" />

      {/* Dot Matrix Patterns */}
      <div className="absolute top-10 right-8 w-28 h-28 opacity-25 bg-[radial-gradient(#172544_2px,transparent_2px)] [background-size:12px_12px] hidden md:block pointer-events-none" />
      <div className="absolute bottom-10 left-8 w-28 h-28 opacity-25 bg-[radial-gradient(#172544_2px,transparent_2px)] [background-size:12px_12px] hidden md:block pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section: Left Copy, Right 3D Commercial Building */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pb-10 sm:pb-14">
          <div className="flex flex-col gap-3 max-w-2xl">
            {/* Pill Badge */}
            <div className="flex items-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#2056B5]/20 text-[#2056B5] text-[11px] font-bold uppercase tracking-wider shadow-xs">
                <Building2 className="size-3.5 text-[#2056B5]" />
                <span>SCO Ownership Guide</span>
                <CheckCircle className="size-3 text-[#2056B5] fill-[#2056B5] text-white" />
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#172544] leading-tight">
              Understanding{' '}
              <span className="text-[#FF302B] relative inline-block">
                SCO Ownership
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-gradient-to-r from-[#FF302B] via-orange-400 to-transparent rounded-full" />
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-ink-900/75 leading-relaxed font-normal mt-1 max-w-xl">
              Make an informed decision with complete insights about SCO ownership.
            </p>
          </div>

          {/* Right Header 3D Commercial Building Illustration */}
          <div
            ref={headerIllustrationRef}
            className="hidden lg:flex items-center justify-end w-full lg:w-[420px] shrink-0"
          >
            <div className="relative w-full aspect-[16/9] drop-shadow-[0_15px_30px_rgba(23,37,68,0.12)]">
              <Image
                src="/images/sco/sco-header-building.png"
                alt="Modern commercial building architectural 3D illustration"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 420px"
              />
            </div>
          </div>
        </div>

        {/* Six Interactive Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
        >
          {scoTopics.map((topic) => {
            const IconComponent = topic.icon
            return (
              <div
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className="group relative rounded-[24px] bg-white/95 backdrop-blur-md border border-line-200/80 p-6 sm:p-7 shadow-[0_10px_30px_rgba(23,37,68,0.05)] hover:shadow-[0_20px_45px_rgba(32,86,181,0.12),0_0_25px_rgba(255,48,43,0.08)] hover:border-[#2056B5]/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Subtle Card Ambient Glow */}
                <div className="absolute -top-16 -right-16 size-36 rounded-full bg-gradient-to-br from-[#2056B5]/8 to-[#FF302B]/6 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-start justify-between gap-4 relative z-10">
                  {/* Left Column: Icon, Title, Description */}
                  <div className="flex flex-col flex-1 pr-2">
                    {/* Category Icon Badge */}
                    <div className="size-10 rounded-2xl bg-[#EAF2FF] text-[#2056B5] flex items-center justify-center shrink-0 shadow-xs mb-3.5 group-hover:bg-[#2056B5] group-hover:text-white transition-colors duration-300">
                      <IconComponent className="size-5" />
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-[#172544] tracking-tight group-hover:text-[#2056B5] transition-colors leading-tight">
                      {topic.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs sm:text-sm text-ink-900/75 leading-relaxed font-normal">
                      {topic.shortDesc}
                    </p>
                  </div>

                  {/* Right Column: Unique 3D Illustration */}
                  <div className="w-[110px] sm:w-[125px] h-[105px] sm:h-[120px] relative shrink-0 flex items-center justify-center">
                    <div className="relative size-full transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-[0_10px_20px_rgba(23,37,68,0.12)]">
                      <Image
                        src={topic.image}
                        alt={topic.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 110px, 130px"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Row: Learn More with Arrow */}
                <div className="mt-5 pt-3 border-t border-line-200/60 flex items-center justify-between relative z-10">
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#FF302B] group-hover:text-[#e02621] transition-colors">
                    <span>Learn More</span>
                    <span className="size-5 rounded-full bg-gradient-to-r from-[#FF302B] to-[#FF4D48] text-white flex items-center justify-center shadow-xs group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="size-3" />
                    </span>
                  </span>

                  <span className="text-[11px] font-semibold text-muted-600 uppercase tracking-wider group-hover:text-[#172544] transition-colors">
                    SCO Insight
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Interactive Modal / Educational Detail Dialog */}
      {selectedTopic && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedTopic(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl bg-white border border-line-200 shadow-[0_25px_60px_-15px_rgba(23,37,68,0.3)] p-6 sm:p-8 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setSelectedTopic(null)}
              aria-label="Close dialog"
              className="absolute top-5 right-5 size-8 rounded-full bg-blue-50 text-ink-900/70 hover:text-ink-900 hover:bg-blue-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>

            {/* Modal Header with 3D Illustration */}
            <div className="flex items-center gap-4 pb-5 border-b border-line-200">
              <div className="size-16 relative shrink-0 drop-shadow-md">
                <Image
                  src={selectedTopic.image}
                  alt={selectedTopic.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#2056B5] uppercase tracking-wider">
                  SCO Ownership Framework
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#172544]">
                  {selectedTopic.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="mt-5 space-y-4">
              <p className="text-sm text-ink-900/80 leading-relaxed font-normal">
                {selectedTopic.detailedInsights}
              </p>

              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/60">
                <div className="text-xs font-bold uppercase tracking-wider text-[#2056B5] mb-2.5">
                  Key Investment Highlights
                </div>
                <ul className="space-y-2">
                  {selectedTopic.keyPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-ink-900/90 font-medium">
                      <CheckCircle className="size-3.5 text-[#2056B5] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="mt-6 pt-5 border-t border-line-200 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/tools/sco-calculator"
                onClick={() => setSelectedTopic(null)}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF302B] to-[#FF4D48] text-white text-xs sm:text-sm font-semibold shadow-md hover:scale-102 active:scale-98 transition-all"
              >
                <Calculator className="size-4" />
                <span>Calculate SCO Yield</span>
              </Link>
              <Link
                href="/projects?type=sco"
                onClick={() => setSelectedTopic(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-line-200 hover:border-[#2056B5]/40 text-[#172544] text-xs sm:text-sm font-semibold hover:bg-blue-50 transition-colors"
              >
                <Compass className="size-4 text-[#2056B5]" />
                <span>Browse SCO Plots</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
