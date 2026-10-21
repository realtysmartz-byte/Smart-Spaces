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

      {/* Hero Section with 2-second Auto-Changing Slideshow */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-28 pb-20 sm:pt-36 sm:pb-28 text-white overflow-hidden bg-primary-900">
        <HeroSlideshow />

        <div className="relative z-30 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center w-full">
          {/* Max-width ~720px content block */}
          <div className="mx-auto max-w-[720px]">
            {/* Note: Single caption pill is rendered by HeroSlideshow at top center; duplicate 2nd pill removed */}
            <h1
              className="font-heading font-extrabold tracking-tight text-white heading-hero-shadow"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', lineHeight: 1.1 }}
            >
              Invest with Commercial <br />
              <span className="text-white font-extrabold underline decoration-accent-500 decoration-[5px] underline-offset-8">
                Clarity & Precision
              </span>
            </h1>

            <p className="mt-6 text-[18px] sm:text-[20px] text-white/95 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              Independent advisory for Grade A offices, retail promenades, SCO plots, and pre-leased assets backed by
              location research, footfall due diligence, and financial analysis.
            </p>

            {/* Quick CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/projects"
                className="coral-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold shadow-xl"
              >
                <span>Find Commercial Properties</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/compare"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-primary-900/85 hover:bg-primary-700 text-white backdrop-blur-md border border-white/25 transition-all shadow-md"
              >
                <Building2 className="size-4 text-accent-500" />
                <span>Compare Projects Side-by-Side</span>
              </Link>
            </div>
          </div>

          {/* Overlapping Glassmorphism Search Filter Card */}
          <HeroSearchCard />
        </div>
      </section>

      {/* Property Categories Asymmetric Mosaic (Light: sand-50) */}
      <CategoryMosaic />

      {/* Sticky Investment Goals Section (Dark: primary-900) */}
      <StickyInvestmentGoals />

      {/* Featured Projects Showcase (Light: sand-100) */}
      <FeaturedProjectsShowcase projects={allProjects} />

      {/* Verified Research Stats & Diligence Checkpoints with Counters (Dark: primary-900) */}
      <StatsCounter />

      {/* Commercial Corridors Hub (Light: sand-50) */}
      <section className="py-20 sm:py-28 bg-sand-50 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 sm:mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-900/5 border border-primary-900/10 text-primary-900 text-xs font-semibold uppercase tracking-wider mb-3">
                <Compass className="size-3 text-accent-500" />
                Corridor Intelligence
              </div>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl text-primary-900">
                Key Commercial Corridors
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-600 leading-relaxed">
                Understand connectivity, footfall drivers, upcoming infrastructure, and average commercial yields across
                Gurgaon&apos;s most active commercial micro-markets.
              </p>
            </div>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary-900 hover:text-accent-500 transition-colors group"
            >
              <span>Explore All 7 Corridors</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-primary-900">
                  <Image
                    src={loc.image}
                    alt={loc.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                    <span className="font-semibold text-white">{loc.shortName}</span>
                    <span className="bg-primary-900/90 px-2 py-0.5 rounded text-[11px] text-sand-50 font-medium">
                      {loc.categories.length} Asset Types
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-primary-900 group-hover:text-accent-500 transition-colors">
                      {loc.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-muted-600 line-clamp-2 leading-relaxed">
                      {loc.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-600 font-medium">Corridor Analysis</span>
                    <span className="font-bold text-primary-900 group-hover:text-accent-500 flex items-center gap-1 transition-colors">
                      Read Report &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Calculators Preview (Light: sand-100) */}
      <section className="py-20 sm:py-28 bg-sand-100 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-900/5 border border-primary-900/10 text-primary-900 text-xs font-semibold uppercase tracking-wider mb-3">
              <Calculator className="size-3 text-accent-500" />
              Financial Tools
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl text-primary-900">
              Commercial Investment Calculators
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-600 leading-relaxed">
              Transparent financial modelling tools to estimate rental yields, EMI commitments, SCO payback periods, and
              stamp duty costs before committing capital.
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
                className="group flex flex-col justify-between rounded-2xl border border-border bg-white p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-accent-500/50"
              >
                <div>
                  <div className="size-12 rounded-xl bg-primary-900 text-white flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Calculator className="size-6 text-accent-500" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-primary-900 group-hover:text-accent-500 transition-colors">
                    {calc.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-600 leading-relaxed">
                    {calc.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-accent-500 uppercase tracking-wider">
                  <span>Calculate Now</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Insights & Market Reports (Light: sand-50) */}
      <section className="py-20 sm:py-28 bg-sand-50 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 sm:mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-900/5 border border-primary-900/10 text-primary-900 text-xs font-semibold uppercase tracking-wider mb-3">
                <BookOpen className="size-3 text-accent-500" />
                Market Intelligence
              </div>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl text-primary-900">
                Latest Research & Market Reports
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-600 leading-relaxed">
                In-depth analysis on commercial trends, SCO plots, retail rental dynamics, and micro-market growth drivers.
              </p>
            </div>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary-900 hover:text-accent-500 transition-colors group"
            >
              <span>View All Insights</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.category}/${article.slug}`}
                className="group rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-primary-900">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-primary-900/90 text-white border border-white/20">
                      {article.category.replace(/-/g, ' ')}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-primary-900 group-hover:text-accent-500 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-muted-600 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-600 font-medium">
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

      {/* Personalized Shortlist Enquiry Section (Dark: primary-900) */}
      <section id="shortlist" className="py-20 sm:py-28 bg-primary-900 text-white relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="size-3.5 text-accent-500" />
              Direct Advisory Access
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl text-white">
              Request Your Commercial Shortlist
            </h2>
            <p className="mt-4 text-base sm:text-lg text-sand-50/85 leading-relaxed">
              Share your target budget, corridor preference, and commercial objective. Our advisory team will assemble
              a verified property shortlist with complete financial due diligence.
            </p>
          </div>

          <div className="mx-auto max-w-2xl bg-sand-50 rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10 text-ink-900">
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
      </section>
    </>
  )
}
