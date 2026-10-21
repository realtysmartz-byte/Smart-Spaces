import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, CheckCircle2 } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { getProjects, getLocations } from '@/lib/data'
import { propertyCategories, faqs } from '@/lib/data/content'
import { buttonVariants } from '@/components/ui/button'
import { EnquiryForm } from '@/components/forms/enquiry-form'
import { JsonLd } from '@/components/seo/json-ld'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Breadcrumbs } from '@/components/site/breadcrumbs'

export const metadata = {
  title: 'Commercial Property in Gurgaon | Smartz Spaces',
  description:
    'Explore commercial property in Gurgaon — office spaces, retail shops, SCO plots, pre-leased properties and investment assets. Research-led advisory for Gurgaon and Delhi NCR.',
}

const projects = getProjects()
const locations = getLocations()

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.commercial.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function CommercialPropertyPage() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Commercial Property in Gurgaon', href: '/commercial-property-in-gurgaon' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Commercial Property in Gurgaon
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
            Research-led advisory for office spaces, retail shops, SCO plots, pre-leased properties and investment assets
            across Gurgaon and Delhi NCR. We help you discover, analyse and decide based on data, not just marketing.
          </p>
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Explore by Property Type</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {propertyCategories.map((category) => (
              <Link
                key={category.key}
                href={category.href}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg"
              >
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-md bg-muted">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                  Explore <ArrowRight className="ml-1 size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Featured Commercial Properties</h2>
            <Link href="/projects" className={buttonVariants({ variant: 'outline' })}>
              View All
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.slice(0, 8).map((project) => (
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
                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.types.map((type) => (
                      <span
                        key={type}
                        className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Factors */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Key Investment Factors</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Location & Connectivity', desc: 'Proximity to metros, highways, airports and catchment density' },
              { title: 'Developer Track Record', desc: 'Past delivery quality, timeline adherence and maintenance' },
              { title: 'RERA Registration', desc: 'Verify project is RERA-registered with clear possession timelines' },
              { title: 'All-in Cost', desc: 'Include base price, PLC, club charges, parking, stamp duty and registration' },
              { title: 'Rental Potential', desc: 'Research comparable rents in operational projects nearby' },
              { title: 'Exit Liquidity', desc: 'Resale demand, buyer profile and secondary market activity' },
            ].map((factor, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-primary" />
                  {factor.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{factor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Explore by Location</h2>
            <Link href="/locations" className={buttonVariants({ variant: 'outline' })}>
              View All Locations
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{location.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{location.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="max-w-3xl">
            {faqs.commercial.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Request Investment Report</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Share your requirements and we will send you a curated list of commercial properties in Gurgaon.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
              <EnquiryForm
                formType="investment-report"
                showBudget
                showLocation
                showGoal
                submitLabel="Request Report"
                messagePlaceholder="Tell us more about your requirements (optional)"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
