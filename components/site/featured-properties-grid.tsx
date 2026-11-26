'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight, Heart, MapPin } from 'lucide-react'
import type { Project } from '@/lib/types'
import { cn } from '@/lib/utils'

function formatPrice(startingPriceLakh: number | null): string {
  if (startingPriceLakh === null || startingPriceLakh <= 0) {
    return 'Price on Request'
  }
  if (startingPriceLakh >= 100) {
    const cr = (startingPriceLakh / 100).toFixed(2).replace(/\.00$/, '')
    return `₹ ${cr} Cr`
  }
  return `₹ ${startingPriceLakh} Lakh`
}

function formatTypeBadge(type: string): string {
  switch (type) {
    case 'office':
      return 'Office Space'
    case 'retail':
      return 'Retail Space'
    case 'sco':
      return 'SCO Plot'
    case 'pre-leased':
      return 'Pre-Leased'
    default:
      return type
  }
}

export function FeaturedPropertiesGrid({ projects }: { projects: Project[] }) {
  const [page, setPage] = useState(0)
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})

  const perPage = 3
  const totalPages = Math.max(1, Math.ceil(projects.length / perPage))
  const visibleProjects = projects.slice(page * perPage, page * perPage + perPage)

  const toggleFavorite = (slug: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites((prev) => ({ ...prev, [slug]: !prev[slug] }))
  }

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-[#E2E8F0]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="h-1 w-9 rounded-full bg-[#DC2626] mb-2.5" />
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#14213D]">
              Featured Properties
            </h2>
            <p className="mt-1.5 text-sm text-[#64748B] max-w-2xl">
              Handpicked commercial assets in prime Gurgaon &amp; Delhi NCR locations with strong business and investment potential.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <Link
              href="/projects"
              className="text-xs sm:text-sm font-semibold text-[#164EB7] hover:text-[#DC2626] transition-colors mr-1"
            >
              View All
            </Link>
            <button
              type="button"
              onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
              aria-label="Previous featured properties"
              className="size-9 rounded-full border border-[#E2E8F0] bg-white text-[#14213D] flex items-center justify-center hover:border-[#164EB7] hover:text-[#164EB7] transition-colors shadow-2xs"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => (p + 1) % totalPages)}
              aria-label="Next featured properties"
              className="size-9 rounded-full border border-[#E2E8F0] bg-white text-[#14213D] flex items-center justify-center hover:border-[#164EB7] hover:text-[#164EB7] transition-colors shadow-2xs"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* 3-Column Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project) => {
            const isFav = !!favorites[project.slug]
            const primaryType = project.types[0] || 'commercial'

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden shadow-[0_6px_22px_rgba(20,33,61,0.05)] hover:shadow-[0_14px_34px_rgba(20,33,61,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Image with Type Badge & Favorite Button */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EFF5FF]">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Property Type Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#14213D]/85 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide shadow-sm">
                      {formatTypeBadge(primaryType)}
                    </span>
                  </div>

                  {/* Favorite / Shortlist Heart Icon */}
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(project.slug, e)}
                    aria-label={isFav ? `Remove ${project.name} from shortlist` : `Save ${project.name} to shortlist`}
                    className={cn(
                      'absolute top-3.5 right-3.5 z-10 size-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-sm',
                      isFav
                        ? 'bg-[#DC2626] text-white'
                        : 'bg-white/90 text-[#14213D] hover:bg-white hover:text-[#DC2626]'
                    )}
                  >
                    <Heart className={cn('size-4', isFav && 'fill-current')} />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[#14213D] group-hover:text-[#164EB7] transition-colors line-clamp-1">
                      {project.name}
                    </h3>

                    <p className="mt-1.5 text-xs sm:text-sm text-[#64748B] flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-[#DC2626] shrink-0" />
                      <span className="truncate">{project.sector}</span>
                    </p>
                  </div>

                  {/* Bottom Price + Area + Outlined View Details CTA */}
                  <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-end justify-between gap-3">
                    <div>
                      <div className="text-base sm:text-lg font-extrabold text-[#DC2626]">
                        {formatPrice(project.startingPriceLakh)}
                      </div>
                      <div className="text-xs text-[#64748B] mt-0.5 line-clamp-1">
                        {project.sizes || (project.expectedYield ? `Yield: ${project.expectedYield[0]}–${project.expectedYield[1]}%` : project.developer)}
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#E2E8F0] bg-white text-xs font-semibold text-[#14213D] group-hover:border-[#164EB7] group-hover:text-[#164EB7] transition-colors shrink-0">
                      <span>View Details</span>
                      <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
