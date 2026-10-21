import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getProjects, getLocations } from '@/lib/data'
import { siteConfig } from '@/lib/site-config'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { JsonLd } from '@/components/seo/json-ld'
import { ProjectsClient } from '@/components/site/projects-client'

export const metadata: Metadata = {
  title: 'Commercial Projects in Gurgaon | Offices, Retail & SCO Plots',
  description:
    'Explore verified commercial projects in Gurgaon across Golf Course Road, Golf Course Extension, SPR, and Dwarka Expressway. Compare Grade A offices, retail promenades, and SCO plots.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Commercial Projects in Gurgaon | Smartz Spaces',
    description:
      'Search and compare commercial properties in Gurgaon with verified location intelligence, expected yields, and developer track records.',
    url: '/projects',
  },
}

const projectsPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Commercial Projects in Gurgaon',
  description: metadata.description,
  url: `${siteConfig.url}/projects`,
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Commercial Projects', item: `${siteConfig.url}/projects` },
    ],
  },
}

export default function ProjectsPage() {
  const projects = getProjects()
  const locations = getLocations()

  return (
    <>
      <JsonLd data={projectsPageSchema} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Commercial Projects', href: '/projects' },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C27803_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-700/90 border border-primary-500/40 text-white text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <span className="size-2 rounded-full bg-accent-500" />
            Commercial Asset Discovery
          </div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
            Commercial Projects in Gurgaon
          </h1>
          <p className="mt-4 text-base sm:text-lg text-sand-100/90 max-w-3xl leading-relaxed font-sans">
            Search verified commercial developments across Gurgaon corridors. Filter by property format, corridor,
            budget, and possession timeline with objective analytical diligence.
          </p>
        </div>
      </section>

      {/* Filterable Client Directory in Suspense Boundary */}
      <Suspense
        fallback={
          <div className="py-24 text-center text-muted-600">
            <div className="size-8 border-2 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm">Loading commercial directory...</p>
          </div>
        }
      >
        <ProjectsClient projects={projects} locations={locations} />
      </Suspense>
    </>
  )
}
