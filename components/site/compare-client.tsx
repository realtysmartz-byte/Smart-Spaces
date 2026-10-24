'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check, X, ArrowRight, Building2 } from 'lucide-react'
import type { Project } from '@/lib/types'
import { propertyTypeLabels } from '@/lib/data/content'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CompareClientProps {
  projects: Project[]
}

export function CompareClient({ projects }: CompareClientProps) {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([
    'm3m-broadway',
    'elan-epic',
  ])

  const toggleProject = (slug: string) => {
    if (selectedSlugs.includes(slug)) {
      setSelectedSlugs((prev) => prev.filter((s) => s !== slug))
    } else {
      if (selectedSlugs.length >= 3) {
        setSelectedSlugs((prev) => [...prev.slice(1), slug])
      } else {
        setSelectedSlugs((prev) => [...prev, slug])
      }
    }
  }

  const selectedProjects = projects.filter((p) => selectedSlugs.includes(p.slug))

  return (
    <>
      {/* Project Selector Bar */}
      <section className="bg-blue-50 py-10 border-y border-line-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-ink-900 sm:text-2xl font-heading">
                Select Projects to Compare
              </h2>
              <p className="text-sm text-muted-600 mt-1">
                Choose any 2 or 3 commercial developments for side-by-side evaluation.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
                {selectedSlugs.length} / 3 selected
              </span>
              {selectedSlugs.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedSlugs([])}
                  className="text-xs font-medium text-muted-600 hover:text-blue-600 underline"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => {
              const isSelected = selectedSlugs.includes(project.slug)
              return (
                <div
                  key={project.slug}
                  onClick={() => toggleProject(project.slug)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleProject(project.slug)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className={cn(
                    'group relative rounded-xl border p-3.5 cursor-pointer transition-all duration-200 bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-600',
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-600/30 shadow-md'
                      : 'border-line-200 hover:border-blue-300 hover:shadow-sm'
                  )}
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-blue-50 mb-3">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {isSelected && (
                      <div className="absolute top-2 right-2 size-6 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
                        <Check className="size-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-heading font-semibold text-sm text-ink-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-muted-600">{project.developer}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      {selectedProjects.length > 0 ? (
        <section className="py-14 sm:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-x-auto rounded-2xl border border-line-200 bg-white shadow-sm">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-line-200 bg-blue-50 text-ink-900">
                    <th className="p-5 text-sm font-bold tracking-wide uppercase text-blue-600 w-1/4">
                      Evaluation Criteria
                    </th>
                    {selectedProjects.map((p) => (
                      <th key={p.slug} className="p-5 min-w-[260px] align-top">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-blue-50 mb-3 border border-line-200 shadow-sm">
                          <Image
                            src={p.image}
                            alt={p.imageAlt}
                            fill
                            className="object-cover"
                            sizes="300px"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleProject(p.slug)
                            }}
                            className="absolute top-2 right-2 size-6 rounded-full bg-ink-900/80 text-white hover:bg-danger-600 flex items-center justify-center transition-colors"
                            aria-label={`Remove ${p.name}`}
                          >
                            <X className="size-3.5" />
                          </button>
                        </div>
                        <div className="font-heading text-lg font-bold text-ink-900">{p.name}</div>
                        <div className="text-xs text-muted-600">{p.developer}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line-200 text-sm">
                  <tr>
                    <td className="p-4 font-semibold text-ink-900 bg-blue-50/60">Corridor / Location</td>
                    {selectedProjects.map((p) => (
                      <td key={p.slug} className="p-4 text-ink-900 font-medium">
                        {p.sector} • <span className="capitalize">{p.locationSlug.replace(/-/g, ' ')}</span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-semibold text-ink-900 bg-blue-50/60">Property Types</td>
                    {selectedProjects.map((p) => (
                      <td key={p.slug} className="p-4">
                        <div className="flex flex-wrap gap-1.5">
                          {p.types.map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-line-200"
                            >
                              {propertyTypeLabels[t]}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-semibold text-ink-900 bg-blue-50/60">Starting Price</td>
                    {selectedProjects.map((p) => (
                      <td key={p.slug} className="p-4 font-bold text-ink-900">
                        {p.startingPriceLakh ? `₹${p.startingPriceLakh} Lakh` : 'Data to be verified'}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-semibold text-ink-900 bg-blue-50/60">Unit Sizes Available</td>
                    {selectedProjects.map((p) => (
                      <td key={p.slug} className="p-4 text-muted-600">
                        {p.sizes || 'Data to be verified'}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-semibold text-ink-900 bg-blue-50/60">Possession Status</td>
                    {selectedProjects.map((p) => (
                      <td key={p.slug} className="p-4 capitalize">
                        {p.possession ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                            {p.possession.replace('-', ' ')}
                          </span>
                        ) : (
                          <span className="text-muted-600 text-xs italic">Data to be verified</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-semibold text-ink-900 bg-blue-50/60">Expected Rental Yield</td>
                    {selectedProjects.map((p) => (
                      <td key={p.slug} className="p-4">
                        {p.expectedYield ? (
                          <span className="font-bold text-success-600">
                            {p.expectedYield[0]}% – {p.expectedYield[1]}%
                          </span>
                        ) : (
                          <span className="text-muted-600 text-xs italic">Data to be verified</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-semibold text-ink-900 bg-blue-50/60">Key Strengths</td>
                    {selectedProjects.map((p) => (
                      <td key={p.slug} className="p-4 text-xs text-muted-600">
                        <ul className="list-disc list-inside space-y-1">
                          {p.strengths.slice(0, 2).map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <td className="p-4 font-semibold text-ink-900 bg-blue-50/60">Risks / Diligence Points</td>
                    {selectedProjects.map((p) => (
                      <td key={p.slug} className="p-4 text-xs text-muted-600">
                        <ul className="list-disc list-inside space-y-1">
                          {p.risks.slice(0, 2).map((r, idx) => (
                            <li key={idx}>{r}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  <tr className="bg-blue-50/40">
                    <td className="p-4 font-semibold text-ink-900">Action</td>
                    {selectedProjects.map((p) => (
                      <td key={p.slug} className="p-4">
                        <div className="flex flex-col gap-2">
                          <Link
                            href={`/projects/${p.slug}`}
                            className="red-btn w-full justify-center font-semibold rounded-xl shadow-sm text-xs py-2 text-center"
                          >
                            View Details <ArrowRight className="inline ml-1 size-3.5" />
                          </Link>
                          <Link
                            href={`/contact?project=${p.slug}#form`}
                            className="blue-outline-btn w-full justify-center font-semibold rounded-xl text-xs py-2 text-center"
                          >
                            Enquire on {p.name}
                          </Link>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 text-center bg-white">
          <div className="mx-auto max-w-md px-4">
            <Building2 className="mx-auto size-12 text-muted-600 mb-4 stroke-1" />
            <h3 className="text-xl font-bold font-heading text-ink-900">No projects selected</h3>
            <p className="text-muted-600 text-sm mt-2">
              Select 2 or 3 projects from the list above to view their side-by-side parameters and advisory diligence.
            </p>
          </div>
        </section>
      )}
    </>
  )
}
