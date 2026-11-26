import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, AlertTriangle, ShieldAlert } from 'lucide-react'
import { getProjects } from '@/lib/data'
import { faqs } from '@/lib/data/content'
import { buttonVariants } from '@/components/ui/button'
import { EnquiryForm } from '@/components/forms/enquiry-form'
import { JsonLd } from '@/components/seo/json-ld'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { InvestmentDiscoverySection } from '@/components/site/investment-discovery-section'

export const metadata = {
  title: 'Commercial Property for Investment in Gurgaon | Smartz Spaces',
  description:
    'Investment opportunities by budget — ₹50 Lakh to ₹10 Cr+. Rental income, capital appreciation, pre-leased assets and early-entry options with risk assessment.',
  alternates: { canonical: '/commercial-property-for-investment-in-gurgaon' },
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
    <div className="bg-[#F4F7FD] min-h-screen text-[#172544]">
      <JsonLd data={pageSchema} />

      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Commercial Property for Investment', href: '/commercial-property-for-investment-in-gurgaon' },
          ]}
        />
      </div>

      {/* Invest by Budget & Invest by Objective */}
      <InvestmentDiscoverySection />

      {/* Featured Investment Properties */}
      <section className="py-12 sm:py-16 bg-white border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="h-1.5 w-12 rounded-full bg-gradient-to-r from-[#FF302B] via-[#7C3AED] to-[#1557C0] mb-3" />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172544]">
                Featured <span className="text-[#1557C0]">Investment Properties</span>
              </h2>
            </div>
            <Link
              href="/projects"
              className={buttonVariants({
                variant: 'outline',
                className: 'rounded-full border-slate-200 hover:border-[#1557C0] hover:text-[#1557C0]',
              })}
            >
              View All Projects <ArrowRight className="ml-1.5 size-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.slice(0, 8).map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_6px_20px_rgba(23,37,68,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(23,37,68,0.1)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-[#172544] line-clamp-1 group-hover:text-[#1557C0] transition-colors">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-slate-500">{project.developer}</p>
                  <p className="mt-1.5 text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="size-3.5 text-[#FF302B] shrink-0" />
                    <span className="truncate">{project.sector}</span>
                  </p>
                  {project.expectedYield && (
                    <div className="mt-3 inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-[#1557C0]">
                      Expected Yield: {project.expectedYield[0]}–{project.expectedYield[1]}%
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Returns Disclaimer */}
      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50/70 p-6 sm:p-8 shadow-2xs">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="size-11 rounded-xl bg-red-100 text-[#FF302B] flex items-center justify-center shrink-0">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#991B1B]">
                  Important: Returns Are Not Guaranteed
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
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
      <section className="py-12 sm:py-16 bg-white border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#FF302B] mb-2">
              RISK ASSESSMENT
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172544]">
              Key Investment <span className="text-[#1557C0]">Risks</span>
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              We evaluate downside scenarios transparently before recommending any commercial asset.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Delayed Possession', desc: 'Projects may miss possession timelines, affecting rent start and cash flow' },
              { title: 'Low Occupancy', desc: 'Residential or commercial catchment may take longer to mature than projected' },
              { title: 'Rental Oversupply', desc: 'High supply in a micro-market can depress rents and increase vacancy' },
              { title: 'Tenant Defaults', desc: 'For pre-leased assets, tenant quality and lease security are critical' },
              { title: 'Construction Cost', desc: 'For SCO, construction costs can exceed estimates and impact yield' },
              { title: 'Liquidity Risk', desc: 'Secondary market may be thin in some projects, affecting exit flexibility' },
            ].map((risk, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-[#F8FAFD] p-6 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="size-10 rounded-xl bg-red-100 text-[#FF302B] flex items-center justify-center mb-3.5">
                  <ShieldAlert className="size-5" />
                </div>
                <h3 className="font-bold text-[#172544]">{risk.title}</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">{risk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172544]">
              Frequently Asked <span className="text-[#1557C0]">Questions</span>
            </h2>
          </div>
          <div className="rounded-[24px] bg-white p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <Accordion type="single" collapsible className="w-full">
              {faqs.investment.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-slate-100 last:border-0 py-1">
                  <AccordionTrigger className="text-left font-bold text-[#172544] hover:text-[#1557C0] text-sm sm:text-base py-3">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-slate-600 leading-relaxed pb-3">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="investment-strategy" className="py-12 sm:py-20 bg-white border-t border-slate-200/80">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="h-1.5 w-12 rounded-full bg-gradient-to-r from-[#FF302B] via-[#7C3AED] to-[#1557C0] mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172544]">
              Get Personalized <span className="text-[#1557C0]">Investment Strategy</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500">
              Share your budget, goals and preferences. We will send you a curated shortlist with yield &amp; risk analysis.
            </p>
          </div>
          <div className="rounded-[26px] bg-[#F8FAFD] p-6 sm:p-9 border border-slate-200/80 shadow-[0_10px_35px_rgba(23,37,68,0.05)]">
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
      </section>
    </div>
  )
}
