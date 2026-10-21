import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, Building2 } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { getProjectsByType, getArticles } from '@/lib/data'
import { buttonVariants } from '@/components/ui/button'
import { EnquiryForm } from '@/components/forms/enquiry-form'
import { SCOCalculator } from '@/components/calculators/sco-calculator'
import { JsonLd } from '@/components/seo/json-ld'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SCO Plots in Gurgaon | Smartz Spaces',
  description:
    'SCO (Shop-Cum-Office) plots in Gurgaon — own the plot and building, control leasing and design. Calculator, guides and investment analysis.',
}

const scoProjects = getProjectsByType('sco')
const scoArticles = getArticles().filter((a) => a.category === 'sco-insights').slice(0, 3)

const faqs = [
  {
    question: 'What is an SCO plot?',
    answer: 'SCO stands for Shop-Cum-Office. An SCO plot is a commercial plot on which the owner can construct a multi-storey building with retail on lower floors and offices above, within applicable bye-laws. You own both the plot and the constructed building.',
  },
  {
    question: 'How many floors can be built on an SCO plot?',
    answer: 'Permissible floors and FAR depend on the project licence and applicable regulations. Always verify on the approved layout plan rather than marketing brochures. Typical SCO projects allow ground plus 2-4 upper floors, but this varies.',
  },
  {
    question: 'Is SCO better than buying a shop?',
    answer: 'SCO offers more control (you decide tenants, design and branding for the whole building) but requires higher capital (plot + construction) and active management. A shop is simpler to own but you control only one unit within a larger project managed by someone else.',
  },
  {
    question: 'What is the total cost of an SCO investment?',
    answer: 'Total cost = plot price + construction cost + internal development charges + electricity charges + stamp duty + registration. Many buyers underestimate construction and charges. Always get the full cost breakdown before committing.',
  },
  {
    question: 'How is rental yield calculated for SCO?',
    answer: 'Rental yield = (annual rent ÷ total investment) × 100. Total investment includes plot, construction, charges and stamp duty. Use our SCO calculator to estimate yield based on your inputs.',
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

export default function SCOPlotsPage() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'SCO Plots in Gurgaon', href: '/sco-plots-in-gurgaon' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            SCO Plots in Gurgaon
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
            Shop-Cum-Office plots let you own the land and build a multi-storey commercial building. Understand the SCO
            ownership model, costs, rental yield and risks before investing.
          </p>
        </div>
      </section>

      {/* What is SCO */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Understanding SCO Ownership</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Plot Ownership', desc: 'You own the commercial plot and the land title' },
              { title: 'Building Control', desc: 'Design and construct the building within bye-laws' },
              { title: 'Leasing Freedom', desc: 'Decide tenants, rents and lease terms for each floor' },
              { title: 'Customization', desc: 'Branding, facade and interior design are your choice' },
              { title: 'Maintenance', desc: 'You bear building maintenance and common area costs' },
              { title: 'Exit Flexibility', desc: 'Sell the whole building or lease floor-wise' },
            ].map((item, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card p-6">
                <Building2 className="size-6 text-primary mb-3" />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCO Calculator */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">SCO Investment Calculator</h2>
          <SCOCalculator />
        </div>
      </section>

      {/* SCO vs Shop Comparison */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">SCO vs Shop Comparison</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-xl font-semibold mb-4">SCO Plot</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Own plot and building</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Full control over design and branding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Decide tenants and lease terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span>Higher capital (plot + construction)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span>Active management required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span>Bear all maintenance costs</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-xl font-semibold mb-4">Retail Shop</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Lower capital (unit price only)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Simpler ownership model</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Common area managed by developer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span>Control only one unit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span>Limited design control</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span>Pay common area maintenance charges</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured SCO Projects */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Featured SCO Projects</h2>
            <Link href="/projects?type=sco" className={buttonVariants({ variant: 'outline' })}>
              View All
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {scoProjects.slice(0, 8).map((project) => (
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

      {/* SCO Guides */}
      {scoArticles.length > 0 && (
        <section className="py-12 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">SCO Investment Guides</h2>
              <Link href="/insights/sco-insights" className={buttonVariants({ variant: 'outline' })}>
                View All Guides
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {scoArticles.map((article) => (
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
                    <h3 className="font-semibold line-clamp-2">{article.title}</h3>
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
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Get SCO Investment Shortlist</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Share your requirements and we will send you a curated list of SCO plots in Gurgaon.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
              <EnquiryForm
                formType="sco-enquiry"
                showBudget
                showLocation
                submitLabel="Get Shortlist"
                messagePlaceholder="Preferred sector, plot size, construction preference (optional)"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
