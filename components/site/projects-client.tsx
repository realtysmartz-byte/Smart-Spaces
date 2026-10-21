'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { MapPin, Building2, Grid, List, Search, ArrowRight } from 'lucide-react'
import type { Project, Location } from '@/lib/types'
import { propertyTypeLabels, budgetBands } from '@/lib/data/content'
import { cn } from '@/lib/utils'

interface ProjectsClientProps {
  projects: Project[]
  locations: Location[]
}

export function ProjectsClient({ projects, locations }: ProjectsClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const typeParam = searchParams.get('type') || 'all'
  const locationParam = searchParams.get('location') || 'all'
  const budgetParam = searchParams.get('budget') || 'all'
  const searchParam = searchParams.get('q') || ''

  const [selectedType, setSelectedType] = useState(typeParam)
  const [selectedLocation, setSelectedLocation] = useState(locationParam)
  const [selectedBudget, setSelectedBudget] = useState(budgetParam)
  const [searchQuery, setSearchQuery] = useState(searchParam)

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all' || !value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.replace(`/projects?${params.toString()}`)
  }

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (selectedType !== 'all' && !project.types.includes(selectedType as any)) return false
      if (selectedLocation !== 'all' && project.locationSlug !== selectedLocation) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const match =
          project.name.toLowerCase().includes(q) ||
          project.developer.toLowerCase().includes(q) ||
          project.sector.toLowerCase().includes(q)
        if (!match) return false
      }
      return true
    })
  }, [projects, selectedType, selectedLocation, searchQuery])

  return (
    <>
      {/* Interactive Filters Bar */}
      <section className="py-6 bg-sand-100 border-y border-border sticky top-16 z-30 backdrop-blur-md bg-sand-100/90">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value)
                  handleFilterChange('type', e.target.value)
                }}
                className="bg-white text-primary-900 text-xs sm:text-sm rounded-lg px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-accent-500 font-medium"
              >
                <option value="all">All Property Types</option>
                <option value="office">Commercial Office</option>
                <option value="retail">Retail Shop / F&B</option>
                <option value="sco">SCO Commercial Plot</option>
                <option value="pre-leased">Pre-Leased Commercial</option>
              </select>

              {/* Location Filter */}
              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value)
                  handleFilterChange('location', e.target.value)
                }}
                className="bg-white text-primary-900 text-xs sm:text-sm rounded-lg px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-accent-500 font-medium"
              >
                <option value="all">All 7 Corridors</option>
                {locations.map((loc) => (
                  <option key={loc.slug} value={loc.slug}>
                    {loc.shortName}
                  </option>
                ))}
              </select>

              {/* Budget Filter */}
              <select
                value={selectedBudget}
                onChange={(e) => {
                  setSelectedBudget(e.target.value)
                  handleFilterChange('budget', e.target.value)
                }}
                className="bg-white text-primary-900 text-xs sm:text-sm rounded-lg px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-accent-500 font-medium"
              >
                <option value="all">All Budgets</option>
                {budgetBands.map((band) => (
                  <option key={band.value} value={band.value}>
                    {band.label}
                  </option>
                ))}
              </select>

              {(selectedType !== 'all' || selectedLocation !== 'all' || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedType('all')
                    setSelectedLocation('all')
                    setSelectedBudget('all')
                    setSearchQuery('')
                    router.replace('/projects')
                  }}
                  className="text-xs font-semibold text-muted-600 hover:text-primary-900 underline"
                >
                  Reset filters
                </button>
              )}
            </div>

            {/* Search Input & View Mode */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <Search className="size-4 text-muted-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search project, developer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-primary-900 text-xs sm:text-sm rounded-lg pl-9 pr-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-accent-500 font-medium"
                />
              </div>

              <div className="flex border border-border rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={cn('p-2 transition-colors', viewMode === 'grid' ? 'bg-primary-900 text-white' : 'text-muted-600 hover:bg-sand-100')}
                  aria-label="Grid view"
                >
                  <Grid className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={cn('p-2 transition-colors', viewMode === 'list' ? 'bg-primary-900 text-white' : 'text-muted-600 hover:bg-sand-100')}
                  aria-label="List view"
                >
                  <List className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Directory Listing */}
      <section className="py-12 bg-sand-50 min-h-[60vh]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between text-xs sm:text-sm text-muted-600">
            <div>
              Showing <strong className="text-primary-900">{filteredProjects.length}</strong> commercial developments
            </div>
            <div>Verified research & due diligence</div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-primary-900">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent pointer-events-none" />

                    {project.featured && (
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-accent-500 text-white shadow">
                        Featured
                      </span>
                    )}

                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-wrap gap-1">
                      {project.types.map((type) => (
                        <span
                          key={type}
                          className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary-900/90 text-white border border-white/20"
                        >
                          {propertyTypeLabels[type]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading text-lg font-bold text-primary-900 group-hover:text-accent-500 transition-colors line-clamp-1">
                        {project.name}
                      </h3>
                      <p className="text-xs text-muted-600 mt-1">{project.developer}</p>
                      <p className="text-xs text-muted-600 mt-1 flex items-center gap-1">
                        <MapPin className="size-3 text-accent-500 shrink-0" />
                        <span>{project.sector}</span>
                      </p>
                      <p className="text-xs text-muted-600 mt-2 line-clamp-2 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-sand-100 flex items-center justify-between text-xs font-semibold">
                      <span className="text-primary-900 font-bold">
                        {project.startingPriceLakh ? `₹${project.startingPriceLakh} Lakh` : 'Price on request'}
                      </span>
                      <span className="text-accent-500 group-hover:text-accent-600 flex items-center gap-1 font-bold">
                        Details <ArrowRight className="size-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group rounded-2xl border border-border bg-white p-5 shadow-sm hover:shadow-xl transition-all flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                >
                  <div className="flex gap-4 items-start sm:items-center">
                    <div className="relative aspect-[16/10] w-36 sm:w-44 rounded-xl overflow-hidden bg-primary-900 shrink-0">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="200px"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading text-xl font-bold text-primary-900 group-hover:text-accent-500 transition-colors">
                          {project.name}
                        </h3>
                        {project.featured && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-accent-500 text-white">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-600 mt-0.5">By {project.developer}</p>
                      <p className="text-xs text-muted-600 mt-1 flex items-center gap-1">
                        <MapPin className="size-3 text-accent-500" />
                        <span>{project.sector} • <span className="capitalize">{project.locationSlug.replace(/-/g, ' ')}</span></span>
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {project.types.map((type) => (
                          <span
                            key={type}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-sand-100 text-primary-900 border border-border"
                          >
                            {propertyTypeLabels[type]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <div className="text-xs text-muted-600">Starting Price</div>
                    <div className="text-base font-bold text-primary-900 mt-0.5">
                      {project.startingPriceLakh ? `₹${project.startingPriceLakh} Lakh` : 'Data to be verified'}
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-accent-500 group-hover:text-accent-600">
                      <span>View Intelligence Profile</span>
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center bg-white rounded-3xl border border-border p-8">
              <Building2 className="mx-auto size-12 text-muted-600 mb-4 stroke-1" />
              <h3 className="font-heading text-2xl font-bold text-primary-900">No projects match your filter</h3>
              <p className="text-sm text-muted-600 mt-2 max-w-md mx-auto">
                Try selecting a different corridor or property type, or request a custom shortlist from our advisory desk.
              </p>
              <div className="mt-6">
                <Link href="/contact#shortlist" className="coral-btn px-6 py-2.5 rounded-xl text-sm font-bold shadow-md">
                  Request Custom Shortlist
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
