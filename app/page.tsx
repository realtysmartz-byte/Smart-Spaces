import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Building2,
  Calculator,
  Compass,
  MapPin,
  TrendingUp,
  ShieldCheck,
  BookOpen,
} from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { getFeaturedProjects, getArticles, getLocations, getProjects } from '@/lib/data'
import { buttonVariants } from '@/components/ui/button'
import { EnquiryForm } from '@/components/forms/enquiry-form'
import { JsonLd } from '@/components/seo/json-ld'
import { HeroSlideshow } from '@/components/site/hero-slideshow'
import { HeroSearchCard } from '@/components/site/hero-search-card'
import { CategoryMosaic } from '@/components/site/category-mosaic'
import { StickyInvestmentGoals } from '@/components/site/sticky-investment-goals'
import { FeaturedProjectsShowcase } from '@/components/site/featured-projects-showcase'
import { StatsCounter } from '@/components/site/stats-counter'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'Commercial Real Estate Intelligence | Smartz Spaces Gurgaon',
  description:
    'Smartz Spaces is an independent commercial real estate advisory in Gurgaon and Delhi NCR. Research-led guidance for Grade A office spaces, retail shops, SCO plots, and pre-leased investment assets.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Smartz Spaces | Commercial Real Estate Intelligence in Gurgaon',
    description:
      'Explore office spaces, retail shops, SCO commercial plots, and pre-leased assets in Gurgaon. Comprehensive corridor research, yield analysis, and verified data.',
    url: '/',
  },
}

const allProjects = getProjects()
const featuredArticles = getArticles().filter((a) => a.featured).slice(0, 3)
const locations = getLocations().slice(0, 6)

const homePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: siteConfig.name,
  description: metadata.description,
  url: siteConfig.url,
  mainEntity: {
    '@type': 'RealEstateAgent',
    name: siteConfig.name,
    tagline: siteConfig.tagline,
    parentOrganization: siteConfig.poweredBy,
    url: siteConfig.url,
    telephone: siteConfig.contact.phones[0].tel,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${siteConfig.contact.address.line1}, ${siteConfig.contact.address.line2}`,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.region,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: siteConfig.contact.address.country,
    },
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={homePageSchema} />

      {/* Split Hero Section: Left 48% Copy, Right 52% 2s Slideshow, Search Card Below */}
      <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 text-ink-900 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 min-h-0">
            {/* Left Column: ~48% on desktop */}
            <div className="w-full lg:w-[48%] order-1 text-left flex flex-col justify-center">
              {/* Single Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-300/40 text-blue-600 text-xs font-semibold shadow-sm mb-4 self-start">
                <Compass className="size-3.5 text-blue-600" />
                <span>Commercial Real Estate Intelligence • Gurgaon &amp; Delhi NCR</span>
              </div>

              {/* H1 & Subtext with Animated Vertical Reflection Line */}
              <div className="relative pl-5 sm:pl-6 my-1">
                {/* Vertical reflection line: Up-to-down animation, alternating Blue and Red */}
                <div
                  className="absolute left-0 top-1.5 bottom-1.5 w-[3.5px] rounded-full bg-line-200/90 overflow-hidden"
                  aria-hidden="true"
                >
                  <div className="hero-reflect-beam" />
                </div>

                {/* H1 - Max 2 lines */}
                <h1
                  className="font-heading font-bold tracking-normal text-ink-900"
                  style={{ fontSize: 'clamp(2rem, 3.6vw, 3.25rem)', lineHeight: 1.15 }}
                >
                  Invest in Commercial Property with <span className="text-red-600">Clarity &amp; Precision</span>
                </h1>

                {/* Subtext 17-18px, weight 400, line-height 1.6, muted-600, max 2-3 lines */}
                <p className="mt-4 text-[17px] sm:text-[18px] text-muted-600 font-normal leading-[1.6] max-w-[540px]">
                  Independent research-led advisory for Grade A offices, high-street retail, SCO plots, and pre-leased assets backed by location due diligence and financial analysis.
                </p>
              </div>

              {/* 2 Buttons */}
              <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/projects"
                  className="red-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold shadow-md tracking-wide"
                >
                  <span>Find Commercial Properties</span>
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/compare"
                  className="blue-outline-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold tracking-wide"
                >
                  <Building2 className="size-4" />
                  <span>Compare Projects</span>
                </Link>
              </div>

              {/* 3 Trust Points */}
              <div className="mt-8 pt-6 border-t border-line-200 grid grid-cols-3 gap-2 sm:gap-4 text-xs font-medium text-ink-900/90">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-blue-600 shrink-0" />
                  <span>Independent advisory</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="size-4 text-blue-600 shrink-0" />
                  <span>Location research</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-blue-600 shrink-0" />
                  <span>Financial analysis</span>
                </div>
              </div>
            </div>

            {/* Right Column: ~52% on desktop */}
            <div className="w-full lg:w-[52%] order-2">
              <HeroSlideshow />
            </div>
          </div>

          {/* Search Filter Bar Below Hero */}
          <div className="mt-8 sm:mt-12">
            <HeroSearchCard />
          </div>
        </div>
      </section>

      {/* Property Categories Asymmetric Mosaic (White) */}
      <CategoryMosaic />

      {/* Sticky Investment Goals Section (Blue-50) */}
      <StickyInvestmentGoals />

      {/* Featured Projects Showcase (White) */}
      <FeaturedProjectsShowcase projects={allProjects} />

      {/* Verified Research Stats & Diligence Checkpoints with Counters (Blue-50) */}
      <StatsCounter />

      {/* Commercial Corridors Hub (White) */}
      <section className="py-10 sm:py-14 bg-white border-t border-line-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sm:mb-8 gap-4 pb-4 border-b border-line-200">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-ink-900">
                Key Commercial Corridors
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-300/40 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                <Compass className="size-3 text-blue-600" />
                Corridor Intelligence
              </span>
            </div>
            <div className="flex items-center gap-6">
              <p className="hidden lg:block text-xs sm:text-sm text-muted-600 max-w-md">
                Connectivity, infrastructure pipelines &amp; average yields across Gurgaon micro-markets.
              </p>
              <Link
                href="/locations"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-red-600 transition-colors shrink-0 group"
              >
                <span>Explore All 7 Corridors</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group rounded-2xl border border-line-200 bg-white overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(20,33,61,0.08)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-blue-50">
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold text-white">{loc.shortName}</span>
                    <span className="bg-white/95 text-ink-900 px-2 py-0.5 rounded text-[11px] font-medium shadow-sm">
                      {loc.categories.length} Asset Types
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-ink-900 group-hover:text-blue-600 transition-colors">
                      {loc.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-muted-600 line-clamp-2 leading-relaxed">
                      {loc.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-line-200 flex items-center justify-between text-xs">
                    <span className="text-muted-600 font-medium">Corridor Analysis</span>
                    <span className="font-bold text-blue-600 group-hover:text-red-600 flex items-center gap-1 transition-colors">
                      Read Report &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Calculators Preview (Blue-50) */}
      <section className="py-10 sm:py-14 bg-blue-50 border-t border-line-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sm:mb-8 gap-4 pb-4 border-b border-line-200">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-ink-900">
                Commercial Investment Calculators
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-300/40 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                <Calculator className="size-3 text-blue-600" />
                Financial Tools
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-600 max-w-md md:text-right">
              Transparent financial modelling tools to estimate rental yields, EMI commitments, SCO payback, and stamp duty.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Rental Yield Calculator',
                href: '/tools/rental-yield-calculator',
                desc: 'Compute gross and net commercial rental yields factoring maintenance and vacancy.',
              },
              {
                title: 'Commercial EMI Calculator',
                href: '/tools/emi-calculator',
                desc: 'Calculate commercial loan monthly obligations across tenure and interest rates.',
              },
              {
                title: 'SCO Investment Analysis',
                href: '/tools/sco-calculator',
                desc: 'Model land acquisition, basement-to-terrace construction, and rental payback.',
              },
              {
                title: 'Commercial ROI Calculator',
                href: '/tools/roi-calculator',
                desc: 'Evaluate total commercial return combining cash flow and capital appreciation.',
              },
              {
                title: 'Buy vs Rent Comparison',
                href: '/tools/buy-vs-rent-calculator',
                desc: 'Objective comparison between long-term office leasing and direct commercial acquisition.',
              },
              {
                title: 'Stamp Duty Estimate',
                href: '/tools/stamp-duty-calculator',
                desc: 'Current Haryana (Gurugram) and Delhi commercial conveyance and registration charges.',
              },
            ].map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="group flex flex-col justify-between rounded-2xl border border-line-200 bg-white p-7 shadow-sm hover:shadow-[0_8px_30px_rgba(20,33,61,0.08)] transition-all duration-300 hover:border-blue-300"
              >
                <div>
                  <div className="size-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Calculator className="size-6 text-blue-600" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-ink-900 group-hover:text-blue-600 transition-colors">
                    {calc.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-600 leading-relaxed">
                    {calc.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-line-200 flex items-center justify-between text-xs font-bold text-red-600 uppercase tracking-wider">
                  <span>Calculate Now</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Insights & Market Reports (White) */}
      <section className="py-10 sm:py-14 bg-white border-t border-line-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sm:mb-8 gap-4 pb-4 border-b border-line-200">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-ink-900">
                Latest Research &amp; Market Reports
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-300/40 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                <BookOpen className="size-3 text-blue-600" />
                Market Intelligence
              </span>
            </div>
            <div className="flex items-center gap-6">
              <p className="hidden lg:block text-xs sm:text-sm text-muted-600 max-w-md">
                In-depth commercial trend analysis, retail dynamics, and micro-market growth drivers.
              </p>
              <Link
                href="/insights"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-red-600 transition-colors shrink-0 group"
              >
                <span>View All Insights</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.category}/${article.slug}`}
                className="group rounded-2xl border border-line-200 bg-white overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgba(20,33,61,0.08)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-blue-50">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200 shadow-sm">
                      {article.category.replace(/-/g, ' ')}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-ink-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-muted-600 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-line-200 flex items-center justify-between text-xs text-muted-600 font-medium">
                    <span>{article.readingMinutes} min read</span>
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Shortlist Enquiry Section (Blue-50) — Compact Side-by-Side Fit */}
      <section id="shortlist" className="py-12 sm:py-16 bg-blue-50 text-ink-900 relative border-t border-line-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, Value Proposition & Trust Highlights (~5 cols) */}
            <div className="lg:col-span-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-300/40 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-3.5 shadow-sm">
                <ShieldCheck className="size-3.5 text-blue-600" />
                Direct Advisory Access
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink-900 leading-tight">
                Request Your Commercial Shortlist
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-600 leading-relaxed">
                Share your target budget, corridor preference, and commercial objective. Our advisory team will assemble
                a verified property shortlist with complete financial due diligence.
              </p>

              {/* 3 Value Checkpoints */}
              <div className="mt-6 pt-5 border-t border-line-200/80 space-y-3">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-ink-900">
                  <div className="size-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="size-3.5 text-blue-600" />
                  </div>
                  <span>100% Unbiased advisory &amp; verified title diligence</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-ink-900">
                  <div className="size-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <TrendingUp className="size-3.5 text-blue-600" />
                  </div>
                  <span>Real rental yield &amp; cashflow modeling</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-ink-900">
                  <div className="size-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Compass className="size-3.5 text-blue-600" />
                  </div>
                  <span>Curated Gurgaon options delivered within 2 business hours</span>
                </div>
              </div>
            </div>

            {/* Right Column: Compact Form Card (~7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-[0_12px_36px_rgba(20,33,61,0.08)] border border-line-200 text-ink-900">
                <EnquiryForm
                  formType="shortlist"
                  showBudget
                  showLocation
                  showGoal
                  submitLabel="Get My Personalized Shortlist"
                  messagePlaceholder="Share any specific requirements (e.g. minimum 1,500 sq.ft., pre-leased to bank, immediate possession, etc.)"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
