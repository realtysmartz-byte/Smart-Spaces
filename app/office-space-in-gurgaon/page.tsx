import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, Building2 } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { getProjectsByType } from '@/lib/data'
import { buttonVariants } from '@/components/ui/button'
import { EnquiryForm } from '@/components/forms/enquiry-form'
import { JsonLd } from '@/components/seo/json-ld'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export const metadata = {
  title: 'Office Space in Gurgaon | Smartz Spaces',
  description:
    'Buy or lease office space in Gurgaon — Grade A offices, managed offices and boutique spaces. Research-led advisory for businesses and investors.',
}

const officeProjects = getProjectsByType('office')

const buyVsLeaseData = [
  { factor: 'Initial Outlay', buy: 'Down payment + stamp duty + registration + fit-out', lease: 'Security deposit (usually 3-6 months rent)' },
  { factor: 'Monthly Cost', buy: 'EMI (if financed) + maintenance + property tax', lease: 'Rent + maintenance + escalations' },
  { factor: 'Customization', buy: 'Full control over design and fit-out', lease: 'Depends on landlord and lease terms' },
  { factor: 'Tax Considerations', buy: 'Depreciation and interest deductions (consult tax advisor)', lease: 'Rent is tax-deductible business expense' },
  { factor: 'Exit Flexibility', buy: 'Sell or lease the asset; timeline depends on market', lease: 'Give notice per lease terms; no asset to sell' },
]

const faqs = [
  {
    question: 'What is the difference between Grade A, Grade B and Grade C offices?',
    answer: 'Grade A offices have modern specifications, central AC, good parking, metro access and premium amenities. Grade B offices are functional but may lack some premium features. Grade C offices are older stock with basic amenities. Gurgaon primarily has Grade A and some Grade B stock.',
  },
  {
    question: 'Should I buy or lease office space for my business?',
    answer: 'Buying builds an asset but ties up capital and adds maintenance responsibility. Leasing preserves capital and offers flexibility but you pay rent indefinitely. Consider your business growth plans, capital availability and long-term office needs. Use our Buy vs Rent calculator to compare costs.',
  },
  {
    question: 'What is a managed office?',
    answer: 'Managed offices are fully furnished, plug-and-play spaces operated by providers. You pay per seat or per square foot and the provider handles maintenance, utilities and often reception. Suitable for startups and teams who want to avoid fit-out hassles.',
  },
  {
    question: 'Which are the best locations for office space in Gurgaon?',
    answer: 'Golf Course Road, Golf Course Extension Road, DLF Cyber City, Sohna Road and Dwarka Expressway are key office corridors. The right location depends on your team commute, client visits and budget.',
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

export default function OfficeSpacePage() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Office Space in Gurgaon', href: '/office-space-in-gurgaon' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Office Space in Gurgaon
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
            Buy or lease office space in Gurgaon — from Grade A towers to managed offices. We help businesses and
            investors evaluate options based on location, cost, connectivity and long-term strategy.
          </p>
        </div>
      </section>

      {/* Options */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Office Space Options</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Grade A Offices', desc: 'Premium towers with modern specifications, central AC and amenities', icon: Building2 },
              { title: 'Managed Offices', desc: 'Plug-and-play spaces with furniture and maintenance included', icon: Building2 },
              { title: 'Boutique Offices', desc: 'Smaller, characterful spaces for teams wanting a unique identity', icon: Building2 },
              { title: 'Office Investments', desc: 'Strata-sale units for rental income and capital appreciation', icon: Building2 },
            ].map((option, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card p-6">
                <option.icon className="size-8 text-primary mb-4" />
                <h3 className="font-semibold">{option.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{option.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy vs Lease Comparison */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Buy vs Lease Office Space</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Factor</TableHead>
                  <TableHead>Buying</TableHead>
                  <TableHead>Leasing</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buyVsLeaseData.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{row.factor}</TableCell>
                    <TableCell>{row.buy}</TableCell>
                    <TableCell>{row.lease}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-6">
            <Link href="/tools/buy-vs-rent-calculator" className={buttonVariants({ variant: 'outline' })}>
              Use Buy vs Rent Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Office Projects */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Featured Office Projects</h2>
            <Link href="/projects?type=office" className={buttonVariants({ variant: 'outline' })}>
              View All
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {officeProjects.slice(0, 8).map((project) => (
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

      {/* Major Locations */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Major Office Locations</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Golf Course Road', desc: 'Premium address with Grade A towers and Rapid Metro connectivity' },
              { name: 'Golf Course Extension Road', desc: 'Growing corridor with dense residential catchment' },
              { name: 'DLF Cyber City', desc: 'Established office district with Rapid Metro and NH-48 access' },
              { name: 'Sohna Road', desc: 'Mature corridor with operational offices and value pricing' },
              { name: 'Dwarka Expressway', desc: 'Emerging corridor with airport and Delhi connectivity' },
              { name: 'Southern Peripheral Road', desc: 'Connector road with destination retail and office clusters' },
            ].map((loc, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold">{loc.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{loc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-muted/50">
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
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Get Office Space Shortlist</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Share your requirements and we will send you a curated list of office spaces in Gurgaon.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
              <EnquiryForm
                formType="office-enquiry"
                showBudget
                showLocation
                submitLabel="Get Shortlist"
                messagePlaceholder="Office size, preferred amenities, team size (optional)"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
