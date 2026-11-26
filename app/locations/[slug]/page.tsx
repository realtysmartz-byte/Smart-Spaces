import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin,
  ArrowRight,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Compass,
  TrendingUp,
  Coins,
  Clock,
  Layers,
  PhoneCall,
  FileText,
  Navigation,
} from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { getLocation, getProjectsByLocation, getLocations } from '@/lib/data'
import { buttonVariants } from '@/components/ui/button'
import { EnquiryForm } from '@/components/forms/enquiry-form'
import { JsonLd } from '@/components/seo/json-ld'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface LocationPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const locations = getLocations()
  return locations.map((location) => ({
    slug: location.slug,
  }))
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params
  const location = getLocation(slug)
  if (!location) return { title: 'Location Not Found' }

  const canonicalUrl = `${siteConfig.url}/locations/${location.slug}`
  return {
    title: `${location.name} Commercial Real Estate Intelligence | Smartz Spaces`,
    description: `${location.summary} In-depth commercial property data for ${location.name} — office spaces, retail shops, SCO plots, connectivity, and investment due diligence.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${location.name} Commercial Corridor Intelligence | Smartz Spaces`,
      description: location.summary,
      url: canonicalUrl,
      images: [
        {
          url: location.image,
          width: 1200,
          height: 630,
          alt: `${location.name} commercial corridor in Gurgaon`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${location.name} Commercial Property | Smartz Spaces`,
      description: location.summary,
      images: [location.image],
    },
  }
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params
  const location = getLocation(slug)
  if (!location) notFound()

  const projects = getProjectsByLocation(slug)
  const allLocations = getLocations()

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: location.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <JsonLd data={pageSchema} />

      {/* Breadcrumbs */}
      <div className="bg-[#F2F6FD]/60 border-b border-line-200/80">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Commercial Corridors', href: '/locations' },
              { label: location.name, href: `/locations/${location.slug}` },
            ]}
          />
        </div>
      </div>

      {/* Corridor Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#F2F6FD] via-[#FFFFFF] to-[#F2F6FD] overflow-hidden border-b border-line-200">
        {/* Ambient Lighting Orbs */}
        <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#2056B5]/12 via-[#FF302B]/8 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[#2056B5]/10 via-[#FF302B]/10 to-transparent blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Corridor Identity & Metrics */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Corridor Verified Pill */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EAF2FF] border border-[#2056B5]/20 text-[#2056B5] text-[11px] font-bold uppercase tracking-wider shadow-xs">
                  <Compass className="size-3.5 text-[#2056B5]" />
                  <span>Verified Corridor Dossier</span>
                  <CheckCircle2 className="size-3 text-[#2056B5] fill-[#2056B5] text-white" />
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#172544] text-white text-[11px] font-bold tracking-wide">
                  {location.shortName}
                </span>
              </div>

              {/* Corridor Heading */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#172544] leading-tight">
                {location.name}
              </h1>

              {/* Corridor Strategic Description */}
              <p className="mt-4 text-sm sm:text-base text-ink-900/80 leading-relaxed font-normal max-w-2xl">
                {location.summary}
              </p>

              {/* Key Benchmark Metrics Cards */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
                <div className="p-4 rounded-2xl bg-white border border-line-200/90 shadow-xs hover:border-[#2056B5]/40 transition-colors">
                  <div className="flex items-center gap-2 text-muted-600 mb-1">
                    <Coins className="size-4 text-[#2056B5]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Avg Capital Value</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[#172544] mt-0.5">
                    {location.avgPrice || '₹14,000 - ₹28,000/sq.ft.'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-line-200/90 shadow-xs hover:border-[#2056B5]/40 transition-colors">
                  <div className="flex items-center gap-2 text-muted-600 mb-1">
                    <TrendingUp className="size-4 text-[#FF302B]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Rental Range</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[#172544] mt-0.5">
                    {location.rentalRange || '₹80 - ₹180/sq.ft.'}
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-white border border-line-200/90 shadow-xs hover:border-[#2056B5]/40 transition-colors">
                  <div className="flex items-center gap-2 text-muted-600 mb-1">
                    <Layers className="size-4 text-[#2056B5]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Active Assets</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-[#172544] mt-0.5">
                    {projects.length} Verified {projects.length === 1 ? 'Project' : 'Projects'}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF302B] to-[#FF4D48] text-white text-xs sm:text-sm font-semibold shadow-md hover:scale-102 active:scale-98 transition-all"
                >
                  <span>Explore Corridor Projects</span>
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="#advisory"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-line-200 text-[#172544] hover:text-[#2056B5] hover:border-[#2056B5]/40 text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all"
                >
                  <FileText className="size-4 text-[#2056B5]" />
                  <span>Request Location Dossier</span>
                </a>
              </div>
            </div>

            {/* Right Column: High-Res Corridor Image & Coords Card */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/11] rounded-[28px] overflow-hidden bg-blue-50 border border-white shadow-[0_20px_50px_rgba(23,37,68,0.12)] ring-1 ring-[#172544]/5">
                <Image
                  src={location.image}
                  alt={`${location.name} commercial corridor Gurgaon`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Categories on Image */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
                  {location.categories.map((cat) => (
                    <span
                      key={cat}
                      className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[#172544] text-[11px] font-bold uppercase tracking-wider shadow-xs"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Bottom Overlay with Coordinates and Map Tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs z-10">
                  <span className="flex items-center gap-1.5 bg-[#172544]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm">
                    <MapPin className="size-3.5 text-[#FF302B]" />
                    <span>{location.coords.lat.toFixed(4)}°N, {location.coords.lng.toFixed(4)}°E</span>
                  </span>
                  <span className="bg-[#172544]/85 backdrop-blur-md px-3 py-1.5 rounded-full font-semibold">
                    Gurgaon &amp; NCR
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Corridor Overview & Connectivity */}
      <section className="py-12 sm:py-16 bg-white border-b border-line-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2056B5]">Corridor Due Diligence</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#172544] mt-1">
              Location Dynamics &amp; Connectivity
            </h2>
            <p className="text-sm text-ink-900/75 mt-2">
              Critical transit vectors, catchment density, and commercial nodes shaping demand in {location.name}.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Connectivity Points */}
            <div className="p-6 rounded-3xl bg-[#F2F6FD]/80 border border-line-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="size-10 rounded-2xl bg-[#EAF2FF] text-[#2056B5] flex items-center justify-center mb-4">
                  <Navigation className="size-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#172544] mb-3">Arterial Connectivity</h3>
                <ul className="space-y-2.5">
                  {location.connectivity.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-900/85">
                      <CheckCircle2 className="size-4 text-[#2056B5] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 pt-3 border-t border-line-200/60 text-[11px] font-bold text-[#2056B5] uppercase tracking-wider">
                Transit Accessibility
              </div>
            </div>

            {/* Key Landmarks */}
            <div className="p-6 rounded-3xl bg-[#F2F6FD]/80 border border-line-200/90 shadow-xs flex flex-col justify-between">
              <div>
                <div className="size-10 rounded-2xl bg-[#EAF2FF] text-[#2056B5] flex items-center justify-center mb-4">
                  <Building2 className="size-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#172544] mb-3">Key Anchor Landmarks</h3>
                <ul className="space-y-2.5">
                  {location.landmarks.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-900/85">
                      <MapPin className="size-4 text-[#FF302B] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 pt-3 border-t border-line-200/60 text-[11px] font-bold text-[#2056B5] uppercase tracking-wider">
                Commercial Density
              </div>
            </div>

            {/* Strategic Analysis */}
            <div className="p-6 rounded-3xl bg-[#F2F6FD]/80 border border-line-200/90 shadow-xs flex flex-col justify-between sm:col-span-2 lg:col-span-1">
              <div>
                <div className="size-10 rounded-2xl bg-[#EAF2FF] text-[#2056B5] flex items-center justify-center mb-4">
                  <Compass className="size-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#172544] mb-3">Corridor Character</h3>
                <div className="space-y-3 text-xs sm:text-sm text-ink-900/80 leading-relaxed font-normal">
                  {location.overview.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-line-200/60 text-[11px] font-bold text-[#2056B5] uppercase tracking-wider">
                Market Maturity
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Infrastructure */}
      {location.infrastructure.length > 0 && (
        <section className="py-12 sm:py-16 bg-[#F2F6FD]/50 border-b border-line-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2056B5]">Capital Growth Drivers</span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#172544] mt-1">
                Upcoming Infrastructure Catalysts
              </h2>
              <p className="text-sm text-ink-900/75 mt-2">
                Infrastructure upgrades that directly impact future rental yields and capital appreciation.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {location.infrastructure.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-line-200/90 shadow-xs hover:border-[#2056B5]/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="size-2 rounded-full bg-[#FF302B]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2056B5]">Planned Infrastructure</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#172544]">{item.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-ink-900/80 leading-relaxed font-normal">
                    {item.description}
                  </p>
                  {(item.source || item.date) && (
                    <div className="mt-4 pt-3 border-t border-line-200/60 flex items-center gap-4 text-[11px] text-muted-600">
                      {item.source && <span>Source: {item.source}</span>}
                      {item.date && <span>Verified: {item.date}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Investment Analysis: Strengths vs Risks */}
      <section className="py-12 sm:py-16 bg-white border-b border-line-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2056B5]">Objective Advisory</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#172544] mt-1">
              Corridor Strengths &amp; Risk Checkpoints
            </h2>
            <p className="text-sm text-ink-900/75 mt-2">
              Our research-driven evaluation to help you weigh yield catalysts against execution and micro-market risks.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Investment Strengths */}
            <div className="p-7 sm:p-8 rounded-[28px] bg-gradient-to-br from-white to-[#F2F6FD] border border-line-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#172544]">Investment Strengths</h3>
                  <p className="text-xs text-muted-600">Key advantages driving investor demand</p>
                </div>
              </div>
              <ul className="space-y-3.5">
                {location.strengths.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-ink-900/90 font-medium">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Investment Risks */}
            <div className="p-7 sm:p-8 rounded-[28px] bg-gradient-to-br from-white to-red-50/20 border border-line-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-2xl bg-red-50 text-[#FF302B] flex items-center justify-center">
                  <AlertTriangle className="size-5" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#172544]">Risk Factors &amp; Due Diligence</h3>
                  <p className="text-xs text-muted-600">Points to verify before committing capital</p>
                </div>
              </div>
              <ul className="space-y-3.5">
                {location.risks.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-ink-900/90 font-medium">
                    <AlertTriangle className="size-4 text-[#FF302B] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Corridor Commercial Projects */}
      <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-[#F2F6FD]/60 border-b border-line-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2056B5]">Verified Inventory</span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#172544] mt-1">
                Commercial Projects on {location.shortName}
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2056B5] hover:text-[#FF302B] transition-colors"
            >
              <span>View All Projects in NCR</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {projects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.slug}
                  className="group rounded-3xl bg-white border border-line-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-blue-50">
                      <Image
                        src={project.image}
                        alt={project.imageAlt || project.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        {project.types.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-0.5 rounded-md bg-white/95 backdrop-blur-md text-[#172544] text-[10px] font-bold uppercase tracking-wider shadow-xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <h3 className="font-heading text-lg font-bold text-[#172544] group-hover:text-[#2056B5] transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-muted-600 mt-0.5 font-medium">
                        By {project.developer} • {project.sector}
                      </p>
                      <p className="mt-3 text-xs text-ink-900/75 line-clamp-2 leading-relaxed">
                        {project.summary}
                      </p>

                      <div className="mt-4 pt-3 border-t border-line-200/60 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-muted-600">Starting Price</span>
                          <div className="font-bold text-[#172544]">
                            {project.startingPriceLakh ? `₹${project.startingPriceLakh} Lakh` : 'Inquire'}
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-muted-600">Status</span>
                          <div className="font-bold text-[#172544] capitalize">
                            {project.possession === 'ready' ? 'Ready to Move' : 'Under Construction'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-0">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-[#2056B5] text-[#2056B5] hover:text-white text-xs font-semibold transition-all"
                    >
                      <span>View Intelligence Report</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 rounded-3xl bg-white border border-line-200 text-center max-w-xl mx-auto">
              <Compass className="size-10 text-[#2056B5] mx-auto mb-3" />
              <h3 className="font-heading text-lg font-bold text-[#172544]">Corridor Pipeline Verification</h3>
              <p className="text-xs sm:text-sm text-ink-900/75 mt-2">
                We are currently verifying new Grade A office, high-street retail, and SCO opportunities along {location.name}.
              </p>
              <Link
                href="/projects"
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF302B] to-[#FF4D48] text-white text-xs font-semibold shadow-sm"
              >
                <span>Browse All Available NCR Projects</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Corridor FAQs */}
      <section className="py-12 sm:py-16 bg-white border-b border-line-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2056B5]">Investor Clarity</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#172544] mt-1">
              Frequently Asked Questions About {location.shortName}
            </h2>
          </div>

          <Accordion type="single" collapsible className="max-w-3xl space-y-3">
            {location.faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="rounded-2xl border border-line-200/90 px-5 py-1 bg-[#F2F6FD]/40"
              >
                <AccordionTrigger className="text-sm sm:text-base font-bold text-[#172544] hover:text-[#2056B5]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-ink-900/80 leading-relaxed font-normal pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Other Commercial Corridors */}
      <section className="py-12 sm:py-16 bg-[#F2F6FD]/40 border-b border-line-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2056B5]">Gurgaon &amp; NCR Network</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#172544] mt-1">
              Explore Alternative Commercial Corridors
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {allLocations
              .filter((l) => l.slug !== location.slug)
              .map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="group flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-line-200/90 shadow-xs hover:border-[#2056B5]/40 hover:shadow-md transition-all"
                >
                  <div className="size-9 rounded-xl bg-blue-50 text-[#2056B5] flex items-center justify-center shrink-0 group-hover:bg-[#2056B5] group-hover:text-white transition-colors">
                    <MapPin className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-sm font-bold text-[#172544] group-hover:text-[#2056B5] transition-colors truncate">
                      {loc.name}
                    </h3>
                    <p className="text-[11px] text-muted-600">{loc.shortName}</p>
                  </div>
                  <ArrowRight className="ml-auto size-4 text-[#2056B5] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Dedicated Corridor Enquiry & Shortlist Form */}
      <section id="advisory" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2056B5]">Confidential Advisory</span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#172544] mt-1">
                Request {location.name} Property Shortlist
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-ink-900/75 leading-relaxed font-normal">
                Receive curated commercial property opportunities, tenant rosters, and yield comparisons for {location.name}.
              </p>
            </div>
            <div className="rounded-[28px] border border-line-200 bg-white p-6 sm:p-10 shadow-[0_15px_40px_rgba(23,37,68,0.06)]">
              <EnquiryForm
                formType="location-enquiry"
                showBudget
                showLocation
                defaultLocation={location.slug}
                submitLabel="Request Corridor Intelligence"
                messagePlaceholder={`Tell us about your investment parameters for ${location.name} (optional)`}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
