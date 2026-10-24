import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getProjects, getLocations, getArticles } from '@/lib/data'
import { propertyTypeLabels } from '@/lib/data/content'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { Search, Building2, MapPin, Calculator, BookOpen, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Search Commercial Properties & Intelligence',
  description: 'Search commercial real estate projects, corridors, and market research across Gurgaon and Delhi NCR.',
  robots: {
    index: false,
    follow: true,
  },
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = (q || '').trim().toLowerCase()

  const allProjects = getProjects()
  const allLocations = getLocations()
  const allArticles = getArticles()

  const matchedProjects = allProjects.filter(
    (p) =>
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.sector.toLowerCase().includes(query) ||
      p.developer.toLowerCase().includes(query) ||
      p.types.some((t) => t.toLowerCase().includes(query))
  )

  const matchedLocations = allLocations.filter(
    (l) => !query || l.name.toLowerCase().includes(query) || l.shortName.toLowerCase().includes(query)
  )

  const matchedArticles = allArticles.filter(
    (a) => !query || a.title.toLowerCase().includes(query) || a.excerpt.toLowerCase().includes(query)
  )

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Search Results', href: '/search' },
          ]}
        />
      </div>

      <section className="bg-white text-ink-900 py-12 sm:py-16 border-b border-line-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-ink-900">
              Search Results
            </h1>
            <p className="mt-3 text-base text-muted-600 font-sans">
              {query ? (
                <>Showing results for &ldquo;<strong>{q}</strong>&rdquo;</>
              ) : (
                'Browse all commercial real estate properties, corridors, and intelligence.'
              )}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        {/* Projects Results */}
        {matchedProjects.length > 0 && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-ink-900 mb-6 flex items-center gap-2">
              <Building2 className="size-5 text-blue-600" />
              Commercial Projects ({matchedProjects.length})
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matchedProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group rounded-2xl border border-line-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-[16/10] bg-blue-50 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {p.types.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-white/95 text-ink-900 border border-line-200 shadow-sm"
                        >
                          {propertyTypeLabels[t]}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-ink-900 group-hover:text-blue-600 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-muted-600 mt-1">{p.developer}</p>
                    <p className="text-xs text-muted-600 mt-1 flex items-center gap-1">
                      <MapPin className="size-3.5 text-red-500" />
                      {p.sector} • <span className="capitalize">{p.locationSlug.replace(/-/g, ' ')}</span>
                    </p>
                    <div className="mt-4 pt-3 border-t border-line-200 flex items-center justify-between text-xs font-semibold text-ink-900 group-hover:text-blue-600">
                      <span>View Intelligence Profile</span>
                      <ArrowRight className="size-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Locations Results */}
        {matchedLocations.length > 0 && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-ink-900 mb-6 flex items-center gap-2">
              <MapPin className="size-5 text-blue-600" />
              Corridors & Micro-Markets ({matchedLocations.length})
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {matchedLocations.map((l) => (
                <Link
                  key={l.slug}
                  href={`/locations/${l.slug}`}
                  className="p-5 rounded-2xl border border-line-200 bg-white hover:bg-blue-50 transition-colors shadow-sm group"
                >
                  <h3 className="font-heading text-lg font-bold text-ink-900 group-hover:text-blue-600 transition-colors">
                    {l.name}
                  </h3>
                  <p className="text-xs text-muted-600 mt-1 line-clamp-2">{l.summary}</p>
                  <div className="mt-3 text-xs font-semibold text-blue-600 flex items-center gap-1">
                    <span>Corridor Deep-Dive</span>
                    <ArrowRight className="size-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Articles Results */}
        {matchedArticles.length > 0 && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-ink-900 mb-6 flex items-center gap-2">
              <BookOpen className="size-5 text-blue-600" />
              Market Reports & Guides ({matchedArticles.length})
            </h2>
            <div className="space-y-3">
              {matchedArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/insights/${a.category}/${a.slug}`}
                  className="block p-5 rounded-2xl border border-line-200 bg-white hover:bg-blue-50 transition-colors shadow-sm group"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    {a.category.replace(/-/g, ' ')}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-ink-900 group-hover:text-blue-600 transition-colors mt-0.5">
                    {a.title}
                  </h3>
                  <p className="text-xs text-muted-600 mt-1 line-clamp-2">{a.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {matchedProjects.length === 0 && matchedLocations.length === 0 && matchedArticles.length === 0 && (
          <div className="py-20 text-center bg-white rounded-3xl border border-line-200 p-8">
            <Search className="size-12 text-muted-600 mx-auto mb-4 stroke-1" />
            <h3 className="font-heading text-2xl font-bold text-ink-900">No properties or guides found</h3>
            <p className="text-sm text-muted-600 mt-2 max-w-md mx-auto">
              We couldn&apos;t find exact matches for &ldquo;{q}&rdquo;. Browse our commercial categories or connect with
              an advisor.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/projects" className="red-btn px-5 py-2.5 rounded-xl text-sm font-semibold shadow">
                Browse All Projects
              </Link>
              <Link
                href="/contact"
                className="blue-outline-btn px-5 py-2.5 rounded-xl text-sm font-semibold"
              >
                Contact Advisory Team
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
