import Link from 'next/link'
import { Building2, Target, Users, CheckCircle2, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { decisionFactors, services, processSteps, companyStats } from '@/lib/data/content'
import { buttonVariants } from '@/components/ui/button'
import { EnquiryForm } from '@/components/forms/enquiry-form'
import { JsonLd } from '@/components/seo/json-ld'
import { Breadcrumbs } from '@/components/site/breadcrumbs'

export const metadata = {
  title: 'About Smartz Spaces | Commercial Real Estate Advisory',
  description:
    'Smartz Spaces is a commercial real estate advisory powered by Realty Smartz Private Limited. Research-led advisory for office, retail, SCO and pre-leased properties in Gurgaon and Delhi NCR.',
}

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Smartz Spaces',
  description: metadata.description,
  mainEntity: {
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            About Smartz Spaces
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
            Smartz Spaces is a commercial real estate advisory powered by Realty Smartz Private Limited. We help
            investors, business owners and tenants make informed decisions about office, retail, SCO and pre-leased
            properties in Gurgaon and Delhi NCR.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-6">Advisory, Not Just a Portal</h2>
              <p className="text-muted-foreground mb-4">
                Unlike property portals that list thousands of options without context, Smartz Spaces focuses on
                research, analysis and advisory. We help you understand location dynamics, project quality, realistic
                returns and risks before you commit.
              </p>
              <p className="text-muted-foreground">
                Our approach is data-driven but human-centered. We combine market research with on-ground verification
                to give you a complete picture of any commercial property you are considering.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-6">Powered by Realty Smartz</h2>
              <p className="text-muted-foreground mb-4">
                Smartz Spaces is backed by Realty Smartz Private Limited, bringing years of experience in commercial
                real estate advisory across Gurgaon and Delhi NCR.
              </p>
              <p className="text-muted-foreground">
                Our team has advised clients on office spaces, retail shops, SCO plots and pre-leased assets, helping
                them align property decisions with business goals and investment objectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Factors */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">How We Evaluate Properties</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {decisionFactors.map((factor, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card p-6">
                <Target className="size-6 text-primary mb-3" />
                <h3 className="font-semibold">{factor.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Our Services</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card p-6">
                <Building2 className="size-6 text-primary mb-3" />
                <h3 className="font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Our Process</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4">
                  {idx + 1}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-border -translate-x-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      {companyStats.some((s) => s.value !== null) && (
        <section className="py-12 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Our Track Record</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {companyStats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl font-bold text-primary">{stat.value || 'Data to be verified'}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Why Choose Smartz Spaces</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { title: 'Research-First Approach', desc: 'We start with data and location research, not sales pitches.' },
              { title: 'Transparent Analysis', desc: 'We share strengths, risks and realistic returns — not just the positives.' },
              { title: 'No Conflict of Interest', desc: 'We work for you, not for developers. No commissions from builders.' },
              { title: 'End-to-End Support', desc: 'From shortlisting to site visits, negotiation and documentation.' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <CheckCircle2 className="size-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Our Team</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Coming Soon', role: 'Commercial Advisory Team', desc: 'Team profiles to be added.' },
            ].map((member, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card p-6 text-center">
                <Users className="mx-auto size-12 text-primary mb-4" />
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <p className="mt-2 text-xs text-muted-foreground">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-4">Ready to Discuss Your Requirements?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Schedule a consultation with our advisory team to discuss your commercial property goals.
            </p>
            <Link href="/contact" className={buttonVariants({ size: 'lg' })}>
              Book a Consultation <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Get in Touch</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Share your requirements and we will get back to you with a personalized shortlist.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
              <EnquiryForm
                formType="consultation"
                showBudget
                showLocation
                showGoal
                submitLabel="Request Consultation"
                messagePlaceholder="Tell us about your requirements (optional)"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
