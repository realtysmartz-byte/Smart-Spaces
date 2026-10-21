import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, Store } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { getProjectsByType, getArticles } from '@/lib/data'
import { buttonVariants } from '@/components/ui/button'
import { EnquiryForm } from '@/components/forms/enquiry-form'
import { JsonLd } from '@/components/seo/json-ld'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Breadcrumbs } from '@/components/site/breadcrumbs'

export const metadata = {
  title: 'Retail Property in Gurgaon | Smartz Spaces',
  description:
    'Retail shops and high-street property in Gurgaon — evaluate footfall, catchment and rental potential. Research-led advisory for retail investors.',
}

const retailProjects = getProjectsByType('retail')
const retailArticles = getArticles().filter((a) => a.category === 'commercial-trends' || a.category === 'real-estate-myths').slice(0, 3)

const evaluationFactors = [
  { title: 'Footfall', desc: 'Daily and weekend footfall from nearby residential and office catchments' },
  { title: 'Catchment Area', desc: 'Residential density, income profile and future growth in the surrounding area' },
  { title: 'Visibility', desc: 'Frontage width, elevation visibility from main road and signage opportunities' },
  { title: 'Anchor Brands', desc: 'Presence of anchor tenants that drive footfall to the project' },
  { title: 'Competition', desc: 'Competing retail supply in the micro-market and its impact on rents' },
  { title: 'Rental Potential', desc: 'Comparable rents in operational projects nearby and realistic occupancy timelines' },
  { title: 'Future Supply', desc: 'Upcoming retail launches that may affect vacancy and rents' },
  { title: 'Exit Potential', desc: 'Secondary market demand, buyer profile and resale activity' },
]

const faqs = [
  {
    question: 'What is the difference between high-street retail and mall retail?',
    answer: 'High-street retail is typically ground-floor or open-air formats with direct road frontage and individual branding. Mall retail is enclosed within a larger managed complex with shared amenities. High-street units often offer better visibility and control, while malls provide assured footfall from anchors.',
  },
  {
    question: 'How do I evaluate the rental potential of a retail shop?',
    answer: 'Check footfall at different times, study comparable rents in operational projects nearby, evaluate anchor tenants, assess frontage and floor level (ground floor commands premium), and verify the project overall occupancy. Rents are highly unit-specific even within the same project.',
  },
  {
    question: 'What are the risks of investing in retail property?',
    answer: 'Key risks include delayed possession, low footfall after launch, anchor tenant defaults, high vacancy rates, over-supply in the micro-market, and difficulty finding tenants for upper-floor units. Always verify the developer track record and realistic rents before investing.',
  },
  {
    question: 'Which are the best locations for retail investment in Gurgaon?',
    answer: 'Golf Course Extension Road, Southern Peripheral Road, Sohna Road and Dwarka Expressway have active retail pipelines. The right location depends on your budget, risk appetite and investment horizon. Emerging corridors may offer growth potential but carry higher execution risk.',
  },
]

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function RetailPropertyPage() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Retail Property in Gurgaon', href: '/retail-property-in-gurgaon' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Retail Property in Gurgaon
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
            Retail shops and high-street opportunities — evaluate footfall, catchment, visibility and rental potential.
            We help you assess retail investments based on data, not just marketing promises.
          </p>
        </div>
      </section>

      {/* Evaluation Factors */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Retail Evaluation Factors</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {evaluationFactors.map((factor, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card p-6">
                <Store className="size-6 text-primary mb-3" />
                <h3 className="font-semibold">{factor.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{factor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Retail Projects */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Featured Retail Projects</h2>
            <Link href="/projects?type=retail" className={buttonVariants({ variant: 'outline' })}>
              View All
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {retailProjects.slice(0, 8).map((project) => (
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

      {/* Investment Articles */}
      {retailArticles.length > 0 && (
        <section className="py-12 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Retail Investment Insights</h2>
              <Link href="/insights" className={buttonVariants({ variant: 'outline' })}>
                View All Insights
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {retailArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/insights/${article.category}/${article.slug}`}
                  className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                      {article.category}
                    </span>
                    <h3 className="mt-2 font-semibold line-clamp-2">{article.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="max-w-3xl">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Get Retail Property Shortlist</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Share your requirements and we will send you a curated list of retail properties in Gurgaon.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
              <EnquiryForm
                formType="retail-enquiry"
                showBudget
                showLocation
                submitLabel="Get Shortlist"
                messagePlaceholder="Preferred retail format, business type, target customer (optional)"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
