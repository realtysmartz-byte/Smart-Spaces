'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  Building2,
  CheckCircle,
  ArrowRight,
  PhoneCall,
} from 'lucide-react'
import type { Project } from '@/lib/types'
import { propertyTypeLabels } from '@/lib/data/content'
import { cn } from '@/lib/utils'

interface FeaturedProjectsShowcaseProps {
  projects: Project[]
}

export function FeaturedProjectsShowcase({ projects }: FeaturedProjectsShowcaseProps) {
  const featuredList = projects.filter((p) => p.featured).slice(0, 4)
  const [activeIndex, setActiveIndex] = useState(0)

  const activeProject = featuredList[activeIndex] || featuredList[0]

  if (!activeProject) return null

  return (
    <section className="py-10 sm:py-14 bg-white border-t border-line-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sm:mb-8 gap-4 pb-4 border-b border-line-200">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-ink-900">
              Featured Commercial Projects
            </h2>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-300/40 text-blue-600 text-xs font-semibold uppercase tracking-wider">
              <Building2 className="size-3 text-blue-600" />
              Verified Commercial Hubs
            </span>
          </div>
          <div className="flex items-center gap-6">
            <p className="hidden lg:block text-xs sm:text-sm text-muted-600 max-w-md">
              Prime commercial developments evaluated across connectivity, developer record &amp; IRR.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-red-600 transition-colors shrink-0 group"
            >
              <span>View All Developments</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Project Selector Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-3 scrollbar-none mb-6">
          {featuredList.map((project, idx) => {
            const isActive = idx === activeIndex
            return (
              <button
                key={project.slug}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  'px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shrink-0 flex items-center gap-2 border shadow-sm',
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-ink-900 border-line-200 hover:bg-blue-50'
                )}
              >
                <Building2 className={cn('size-4', isActive ? 'text-white' : 'text-blue-600')} />
                <span>{project.name}</span>
                <span className={cn('text-[11px] font-normal', isActive ? 'text-white/80' : 'text-muted-600')}>
                  ({project.sector})
                </span>
              </button>
            )
          })}
        </div>

        {/* Active Project Highlight Showcase (Sticky Swap Deck) */}
        <div className="grid lg:grid-cols-12 gap-8 items-center rounded-3xl bg-white border border-line-200 p-6 sm:p-10 shadow-[0_8px_30px_rgba(20,33,61,0.06)]">
          {/* Left Visual Gallery */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-md bg-blue-50 border border-line-200">
              <Image
                key={activeProject.slug}
                src={activeProject.image}
                alt={activeProject.imageAlt}
                fill
                className="object-cover animate-in fade-in zoom-in-95 duration-500"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                {activeProject.types.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-ink-900 border border-line-200 shadow-sm"
                  >
                    {propertyTypeLabels[type]}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <span className="flex items-center gap-1.5 bg-ink-900/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm text-white">
                  <MapPin className="size-3.5 text-red-500" />
                  {activeProject.sector} • <span className="capitalize">{activeProject.locationSlug.replace(/-/g, ' ')}</span>
                </span>
                <span className="bg-ink-900/80 backdrop-blur-md px-3 py-1.5 rounded-full text-white font-semibold shadow-sm">
                  By {activeProject.developer}
                </span>
              </div>
            </div>
          </div>

          {/* Right Analytical Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                Commercial Intelligence Profile
              </div>
              <h3 className="font-heading text-3xl font-bold text-ink-900">
                {activeProject.name}
              </h3>
              <p className="mt-3 text-sm text-muted-600 leading-relaxed">
                {activeProject.summary}
              </p>

              {/* Verified Metrics Row */}
              <div className="mt-6 grid grid-cols-2 gap-3 p-4 rounded-xl bg-blue-50 border border-line-200">
                <div>
                  <div className="text-[11px] font-semibold uppercase text-muted-600">Starting Price</div>
                  <div className="text-base font-bold text-ink-900 mt-0.5">
                    {activeProject.startingPriceLakh ? `₹${activeProject.startingPriceLakh} Lakh` : 'Data to be verified'}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase text-muted-600">Possession Timeline</div>
                  <div className="text-base font-bold text-ink-900 mt-0.5">
                    {activeProject.possession === 'ready'
                      ? 'Ready to Move'
                      : activeProject.possession === 'under-construction'
                      ? 'Under Construction'
                      : 'Inquire for Dates'}
                  </div>
                </div>
              </div>

              {/* Due Diligence Highlights */}
              <div className="mt-5 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-600">
                  Key Investment Highlights
                </div>
                <ul className="space-y-1.5">
                  {activeProject.highlights.slice(0, 3).map((hl, hIdx) => (
                    <li key={hIdx} className="flex items-center gap-2 text-xs text-ink-900/90 font-medium">
                      <CheckCircle className="size-3.5 text-blue-600 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href={`/projects/${activeProject.slug}`}
                className="red-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-md"
              >
                <span>Full Intelligence Report</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href={`/contact?project=${activeProject.slug}#site-visit`}
                className="blue-outline-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
              >
                <PhoneCall className="size-4 text-blue-600" />
                <span>Schedule Site Visit</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
