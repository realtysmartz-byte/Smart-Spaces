import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { getProjects } from '@/lib/data'
import { budgetBands, investmentGoals, faqs } from '@/lib/data/content'
import { buttonVariants } from '@/components/ui/button'
import { EnquiryForm } from '@/components/forms/enquiry-form'
import { JsonLd } from '@/components/seo/json-ld'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Breadcrumbs } from '@/components/site/breadcrumbs'

export const metadata = {
  title: 'Commercial Property for Investment in Gurgaon | Smartz Spaces',
  description:
    'Investment opportunities by budget — ₹50 Lakh to ₹10 Cr+. Rental income, capital appreciation, pre-leased assets and early-entry options with risk assessment.',
}

const projects = getProjects()

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.investment.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function InvestmentPage() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Commercial Property for Investment', href: '/commercial-property-for-investment-in-gurgaon' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Commercial Property for Investment in Gurgaon
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
            Investment opportunities by budget and objective — from ₹50 Lakh entry options to ₹10 Cr+ premium assets.
            We focus on numbers, risks and realistic returns, not marketing promises.
          </p>
        </div>
      </section>

      {/* Budget-based Discovery */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Invest by Budget</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {budgetBands.map((band) => (
              <Link
                key={band.value}
                href={`/projects?budget=${band.value}`}
                className="group rounded-lg border border-border bg-card p-6 text-center transition-all hover:shadow-lg hover:border-primary"
              >
                <TrendingUp className="mx-auto size-8 text-primary mb-3" />
                <h3 className="font-semibold">{band.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">View options</p>
                <ArrowRight className="mx-auto mt-3 size-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Objectives */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Invest by Objective</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {investmentGoals.map((goal) => (
              <div key={goal.value} className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold">{goal.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Investment Properties */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Featured Investment Properties</h2>
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
                  {project.expectedYield && (
                    <p className="mt-2 text-sm font-medium text-primary">
                      Expected Yield: {project.expectedYield[0]}-{project.expectedYield[1]}%
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Returns Disclaimer */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6">
            <div className="flex gap-4">
              <AlertTriangle className="size-6 text-destructive shrink-0" />
              <div>
                <h3 className="font-semibold text-destructive">Important: Returns Are Not Guaranteed</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Projected rental yields and appreciation are estimates based on assumptions about rent levels,
                  occupancy, vacancy periods and market conditions. Actual returns may differ significantly. We provide
                  indicative ranges with clear assumptions and risks — never guaranteed numbers. Verify comparable leases
                  in operational projects nearby before committing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Risks */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Key Investment Risks</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Delayed Possession', desc: 'Projects may miss possession timelines, affecting rent start and cash flow' },
              { title: 'Low Occupancy', desc: 'Residential or commercial catchment may take longer to mature than projected' },
              { title: 'Rental Oversupply', desc: 'High supply in a micro-market can depress rents and increase vacancy' },
              { title: 'Tenant Defaults', desc: 'For pre-leased assets, tenant quality and lease security are critical' },
              { title: 'Construction Cost', desc: 'For SCO, construction costs can exceed estimates and impact yield' },
              { title: 'Liquidity Risk', desc: 'Secondary market may be thin in some projects, affecting exit flexibility' },
            ].map((risk, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card p-6">
                <AlertTriangle className="size-5 text-destructive mb-3" />
                <h3 className="font-semibold">{risk.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{risk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="max-w-3xl">
            {faqs.investment.map((faq, idx) => (
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
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Get Personalized Investment Strategy</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Share your budget, goals and preferences. We will send you a curated shortlist with analysis.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
              <EnquiryForm
                formType="investment-strategy"
                showBudget
                showLocation
                showGoal
                submitLabel="Get Investment Strategy"
                messagePlaceholder="Tell us more about your investment preferences (optional)"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
