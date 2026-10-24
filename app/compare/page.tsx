import type { Metadata } from 'next'
import { getProjects } from '@/lib/data'
import { siteConfig } from '@/lib/site-config'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { JsonLd } from '@/components/seo/json-ld'
import { CompareClient } from '@/components/site/compare-client'

export const metadata: Metadata = {
  title: 'Compare Commercial Projects in Gurgaon | Side-by-Side Analysis',
  description:
    'Compare up to 3 commercial projects in Gurgaon side by side. Evaluate location, price, possession status, expected rental yield, strengths, and risks.',
  alternates: { canonical: '/compare' },
  openGraph: {
    title: 'Compare Commercial Projects in Gurgaon | Smartz Spaces',
    description:
      'Side-by-side commercial real estate comparison tool for Gurgaon. Evaluate office spaces, retail destinations, and SCO plots.',
    url: '/compare',
  },
}

const compareSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Compare Commercial Projects in Gurgaon',
  description:
    'Evaluate up to 3 commercial properties across Gurgaon corridors including Golf Course Road, Golf Course Extension, SPR, and Dwarka Expressway.',
  url: `${siteConfig.url}/compare`,
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Compare Projects', item: `${siteConfig.url}/compare` },
    ],
  },
}

export default function ComparePage() {
  const projects = getProjects()

  return (
    <>
      <JsonLd data={compareSchema} />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Compare Projects', href: '/compare' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="bg-white text-ink-900 py-14 sm:py-16 relative overflow-hidden border-b border-line-200">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 border border-blue-300/40 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <span className="size-2 rounded-full bg-red-600" />
            Commercial Intelligence Tool
          </div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-ink-900">
            Compare Commercial Projects
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-600 max-w-3xl leading-relaxed font-sans">
            Side-by-side commercial asset evaluation across Gurgaon. Compare corridor advantages, pricing status,
            possession timelines, rental yield potential, and critical risk factors.
          </p>
        </div>
      </section>

      <CompareClient projects={projects} />
    </>
  )
}
