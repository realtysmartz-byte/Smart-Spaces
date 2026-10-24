import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, Building2, AlertTriangle } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { getLocation, getProjectsByLocation, getLocations } from '@/lib/data'
import { buttonVariants } from '@/components/ui/button'
import { EnquiryForm } from '@/components/forms/enquiry-form'
import { JsonLd } from '@/components/seo/json-ld'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface LocationPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const locations = getLocations()
  return locations.map((location) => ({
    slug: location.slug,
  }))
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const location = getLocation(params.slug)
  if (!location) return { title: 'Location Not Found' }

  const canonicalUrl = `${siteConfig.url}/locations/${location.slug}`
  return {
    title: `${location.name} Commercial Property | Smartz Spaces`,
    description: `${location.summary} Explore commercial property in ${location.name} — offices, retail, SCO and investment opportunities with location analysis.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${location.name} Commercial Real Estate & Corridors | Smartz Spaces`,
      description: location.summary,
      url: canonicalUrl,
      images: [
        {
          url: location.image,
          width: 1200,
          height: 630,
          alt: `${location.name} commercial corridor in Gurgaon`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${location.name} Commercial Property | Smartz Spaces`,
      description: location.summary,
      images: [location.image],
    },
  }
}

export default function LocationPage({ params }: LocationPageProps) {
  const location = getLocation(params.slug)
  if (!location) notFound()

  const projects = getProjectsByLocation(params.slug)
  const allLocations = getLocations()

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: location.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <JsonLd data={pageSchema} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Locations', href: '/locations' },
            { label: location.name, href: `/locations/${location.slug}` },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {location.name}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">{location.summary}</p>
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted">
              <Image src={location.image} alt={location.name} fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Location Overview</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-4">Connectivity</h3>
              <ul className="space-y-2">
                {location.connectivity.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Key Landmarks</h3>
              <ul className="space-y-2">
                {location.landmarks.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold mb-4">Overview</h3>
            <ul className="space-y-2">
              {location.overview.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Available Property Types</h2>
          <div className="flex flex-wrap gap-3">
            {location.categories.map((cat) => (
              <span key={cat} className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Price & Rental */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Price & Rental Information</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-semibold mb-2">Average Price</h3>
              <p className="text-2xl font-bold text-primary">
                {location.avgPrice || 'Data to be verified'}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-semibold mb-2">Rental Range</h3>
              <p className="text-2xl font-bold text-primary">
                {location.rentalRange || 'Data to be verified'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      {location.infrastructure.length > 0 && (
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Upcoming Infrastructure</h2>
            <div className="space-y-4">
              {location.infrastructure.map((item, idx) => (
                <div key={idx} className="rounded-lg border border-border bg-card p-6">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  {(item.source || item.date) && (
                    <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                      {item.source && <span>Source: {item.source}</span>}
                      {item.date && <span>Date: {item.date}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Strengths & Risks */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-6">Investment Strengths</h2>
              <ul className="space-y-3">
                {location.strengths.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-6">Investment Risks</h2>
              <ul className="space-y-3">
                {location.risks.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="size-4 text-destructive mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Projects in {location.shortName}</h2>
              <Link href="/projects" className={buttonVariants({ variant: 'outline' })}>
                View All Projects
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold line-clamp-1">{project.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{project.developer}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <MapPin className="inline size-3" /> {project.sector}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="max-w-3xl">
            {location.faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Other Locations */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Other Locations</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {allLocations
              .filter((l) => l.slug !== location.slug)
              .map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-lg"
                >
                  <MapPin className="size-5 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold">{loc.shortName}</h3>
                    <p className="text-xs text-muted-foreground">{loc.name}</p>
                  </div>
                  <ArrowRight className="ml-auto size-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Enquire About {location.name}</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Get project listings and investment analysis for {location.name}.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
              <EnquiryForm
                formType="location-enquiry"
                showBudget
                showLocation
                defaultLocation={location.slug}
                submitLabel="Enquire Now"
                messagePlaceholder="Tell us about your requirements (optional)"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
