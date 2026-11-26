import Link from 'next/link'
import {
  Building2,
  Target,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Landmark,
  Scale,
  Sparkles,
  Zap,
} from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { decisionFactors, services, processSteps } from '@/lib/data/content'
import { buttonVariants } from '@/components/ui/button'
import { EnquiryForm } from '@/components/forms/enquiry-form'
import { JsonLd } from '@/components/seo/json-ld'
import { Breadcrumbs } from '@/components/site/breadcrumbs'

export const metadata = {
  title: 'About Smartz Spaces | Commercial Real Estate Advisory Gurgaon',
  description:
    'Smartz Spaces is a premier research-led commercial real estate advisory powered by Realty Smartz Private Limited. Independent advisory for office, retail, and SCO plots across Gurgaon & Delhi NCR.',
  alternates: { canonical: '/about' },
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
    <div className="bg-[#F4F7FD] min-h-screen text-[#172544]">
      <JsonLd data={pageSchema} />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-8 pb-12 sm:pt-14 sm:pb-16 overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -left-20 size-96 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="pointer-events-none absolute top-10 right-0 size-96 rounded-full bg-indigo-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-[#1557C0] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
              <span className="size-2 rounded-full bg-[#FF302B] animate-pulse" />
              Independent Real Estate Advisory
            </div>

            <div className="h-1.5 w-14 rounded-full bg-gradient-to-r from-[#FF302B] via-[#7C3AED] to-[#1557C0] mb-3.5 shadow-sm" />

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#172544] leading-tight">
              About <span className="text-[#1557C0]">Smartz Spaces</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Smartz Spaces is a specialized commercial real estate advisory powered by Realty Smartz Private Limited. We assist institutional investors, business enterprises, and private wealth clients in evaluating Grade A offices, high-street retail, and SCO plots across Gurgaon and Delhi NCR with data-backed rigor.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-medium text-slate-600">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="size-4 text-emerald-600" />
                Data-Led Due Diligence
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-slate-200/80 shadow-2xs">
                <ShieldCheck className="size-4 text-blue-600" />
                RERA Compliance Verification
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-slate-200/80 shadow-2xs">
                <Zap className="size-4 text-amber-500" />
                Direct Developer Mandates
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Principles: Dual Feature Cards */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Card 1 */}
            <div className="relative rounded-[26px] bg-white p-7 sm:p-9 border border-slate-200/80 shadow-[0_8px_30px_rgba(23,37,68,0.05)] hover:shadow-[0_16px_40px_rgba(23,37,68,0.08)] transition-all">
              <div className="size-12 rounded-xl bg-gradient-to-br from-[#0084FF] to-[#0055D4] text-white flex items-center justify-center shadow-md shadow-blue-500/25 mb-5">
                <Sparkles className="size-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#172544] mb-3">
                Advisory, Not Just a Listing Portal
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Unlike generic property portals that display thousands of unverified listings without context, Smartz Spaces operates on institutional research, on-ground due diligence, and financial modeling.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                We analyze micro-market infrastructure, upcoming road linkages, realistic vacancy risk, and net rental yields so you invest with complete conviction.
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative rounded-[26px] bg-white p-7 sm:p-9 border border-slate-200/80 shadow-[0_8px_30px_rgba(23,37,68,0.05)] hover:shadow-[0_16px_40px_rgba(23,37,68,0.08)] transition-all">
              <div className="size-12 rounded-xl bg-gradient-to-br from-[#172544] to-[#0E1A33] text-white flex items-center justify-center shadow-md shadow-slate-900/25 mb-5">
                <Landmark className="size-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#172544] mb-3">
                Powered by Realty Smartz
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Smartz Spaces is backed by Realty Smartz Private Limited, bringing years of seasoned commercial real estate advisory across Gurgaon and Delhi NCR.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our specialists have advised private investors, family offices, and multinational corporate tenants on Grade A office leases, high-street retail shops, and pre-leased investment assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Factors: How We Evaluate Properties */}
      <section className="py-12 sm:py-16 bg-white border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <div className="h-1.5 w-12 rounded-full bg-gradient-to-r from-[#FF302B] via-[#7C3AED] to-[#1557C0] mb-3" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172544]">
              How We Evaluate <span className="text-[#1557C0]">Commercial Properties</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 font-normal">
              Our 6-point evaluation framework ensures that every recommended property has clear legal titles, realistic yields, and long-term liquidity.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {decisionFactors.map((factor, idx) => (
              <div
                key={idx}
                className="group rounded-2xl bg-[#F8FAFD] p-6 border border-slate-200/80 hover:border-blue-200 hover:bg-white hover:shadow-[0_10px_30px_rgba(23,37,68,0.06)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="size-11 rounded-xl bg-blue-100/80 text-[#1557C0] flex items-center justify-center mb-4 group-hover:bg-[#1557C0] group-hover:text-white transition-colors">
                  <Target className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-[#172544] mb-2">{factor.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Advisory Specializations (Replacing former placeholder) */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172544]">
              Our Core <span className="text-[#1557C0]">Advisory Divisions</span>
            </h2>
            <p className="mt-2 text-sm text-slate-500 font-normal">
              Specialized domain teams delivering strategic commercial clarity.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-[22px] bg-white p-7 border border-slate-200/80 shadow-[0_8px_25px_rgba(23,37,68,0.05)]">
              <div className="size-12 rounded-xl bg-gradient-to-br from-[#0084FF] to-[#0055D4] text-white flex items-center justify-center mb-4 shadow-sm">
                <Building2 className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-[#172544]">Commercial &amp; Office Advisory</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Advising corporates and investors on Grade A leases, managed offices, and strata-sale acquisitions across DLF Cyber City, Golf Course Road, and SPR.
              </p>
            </div>

            <div className="rounded-[22px] bg-white p-7 border border-slate-200/80 shadow-[0_8px_25px_rgba(23,37,68,0.05)]">
              <div className="size-12 rounded-xl bg-gradient-to-br from-[#FB923C] to-[#EA580C] text-white flex items-center justify-center mb-4 shadow-sm">
                <TrendingUp className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-[#172544]">Retail &amp; SCO Plot Analytics</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Evaluating pedestrian footfalls, high-street visibility, anchor tenant covenants, and multi-storey commercial construction bye-laws for SCO assets.
              </p>
            </div>

            <div className="rounded-[22px] bg-white p-7 border border-slate-200/80 shadow-[0_8px_25px_rgba(23,37,68,0.05)]">
              <div className="size-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#047857] text-white flex items-center justify-center mb-4 shadow-sm">
                <Scale className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-[#172544]">Legal Due Diligence &amp; Mandates</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Comprehensive RERA compliance checks, encumbrance verification, direct institutional developer pricing, and statutory registration guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 bg-white border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172544]">
              Our End-to-End <span className="text-[#1557C0]">Services</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 font-normal">
              Tailored services for commercial buyers, investors, and corporate occupants.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#F8FAFD] p-6 border border-slate-200/80 hover:shadow-md transition-shadow"
              >
                <div className="size-10 rounded-xl bg-blue-100 text-[#1557C0] flex items-center justify-center mb-3">
                  <Building2 className="size-5" />
                </div>
                <h3 className="text-base font-bold text-[#172544] mb-2">{service.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process: 4 Steps */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172544]">
              Our Structured <span className="text-[#1557C0]">Process</span>
            </h2>
            <p className="mt-2 text-sm text-slate-500 font-normal">
              How we guide your commercial acquisition from first consultation to possession.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl bg-white p-6 border border-slate-200/80 shadow-[0_6px_20px_rgba(23,37,68,0.04)]"
              >
                <div className="flex items-center justify-center size-10 rounded-full bg-[#1557C0] text-white font-bold text-sm mb-4 shadow-sm">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-[#172544] mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Request Form */}
      <section className="py-12 sm:py-20 bg-white border-t border-slate-200/80">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="h-1.5 w-12 rounded-full bg-gradient-to-r from-[#FF302B] via-[#7C3AED] to-[#1557C0] mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172544]">
              Ready to Discuss Your <span className="text-[#1557C0]">Requirements?</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 font-normal">
              Share your commercial investment objectives and connect with our senior advisory team.
            </p>
          </div>

          <div className="rounded-[26px] bg-[#F8FAFD] p-6 sm:p-9 border border-slate-200/80 shadow-[0_10px_35px_rgba(23,37,68,0.05)]">
            <EnquiryForm
              formType="consultation"
              showBudget
              showLocation
              showGoal
              submitLabel="Request Strategy Consultation"
              messagePlaceholder="Tell us about your requirements (budget, preferred micro-market, asset type)..."
            />
          </div>
        </div>
      </section>
    </div>
  )
}
