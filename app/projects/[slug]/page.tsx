import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, Building2, CheckCircle2, AlertTriangle, Phone, FileText } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { getProject, getSimilarProjects, getLocation } from '@/lib/data'
import { propertyTypeLabels } from '@/lib/data/content'
import { buttonVariants } from '@/components/ui/button'
import { EnquiryForm } from '@/components/forms/enquiry-form'
import { JsonLd } from '@/components/seo/json-ld'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { Badge } from '@/components/ui/badge'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface ProjectPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const { getProjects } = await import('@/lib/data')
  const projects = getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProject(params.slug)
  if (!project) return { title: 'Project Not Found' }

  const canonicalUrl = `${siteConfig.url}/projects/${project.slug}`
  return {
    title: `${project.name} | Smartz Spaces`,
    description: project.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${project.name} | Commercial Real Estate Gurgaon`,
      description: project.summary,
      url: canonicalUrl,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.name} commercial property in Gurgaon`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} | Smartz Spaces`,
      description: project.summary,
      images: [project.image],
    },
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject(params.slug)
  if (!project) notFound()

  const similarProjects = getSimilarProjects(params.slug)
  const location = getLocation(project.locationSlug)

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: project.name,
    description: project.summary,
    image: project.image,
    brand: {
      '@type': 'Brand',
      name: project.developer,
    },
    offers: project.startingPriceLakh
      ? {
          '@type': 'Offer',
          price: project.startingPriceLakh,
          priceCurrency: 'INR',
        }
      : undefined,
  }

  return (
    <>
      <JsonLd data={pageSchema} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: project.name, href: `/projects/${project.slug}` },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.types.map((type) => (
                  <Badge key={type} variant="secondary">
                    {propertyTypeLabels[type]}
                  </Badge>
                ))}
                {project.featured && <Badge className="bg-primary">Featured</Badge>}
              </div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {project.name}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">{project.developer}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                <MapPin className="inline size-4" /> {project.sector}
                {location && (
                  <span className="ml-2">
                    , <Link href={`/locations/${location.slug}`} className="text-primary hover:underline">
                      {location.shortName}
                    </Link>
                  </span>
                )}
              </p>
              {project.rera && (
                <p className="mt-2 text-xs text-muted-foreground">
                  RERA: {project.rera}
                </p>
              )}
            </div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted">
              <Image src={project.image} alt={project.imageAlt} fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {project.startingPriceLakh && (
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-sm text-muted-foreground">Starting Price</div>
                <div className="text-xl font-bold text-primary">₹{project.startingPriceLakh} Lakh</div>
              </div>
            )}
            {project.sizes && (
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-sm text-muted-foreground">Sizes</div>
                <div className="text-xl font-bold">{project.sizes}</div>
              </div>
            )}
            {project.possession && (
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-sm text-muted-foreground">Possession</div>
                <div className="text-xl font-bold capitalize">{project.possession}</div>
              </div>
            )}
            {project.expectedYield && (
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-sm text-muted-foreground">Expected Yield</div>
                <div className="text-xl font-bold">{project.expectedYield[0]}-{project.expectedYield[1]}%</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Project Overview</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-4">About the Project</h3>
              <ul className="space-y-3">
                {project.overview.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Investment Highlights</h3>
              <ul className="space-y-3">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Location Advantages */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Location Advantages</h2>
          <ul className="space-y-3 max-w-3xl">
            {project.locationAdvantages.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Strengths & Risks */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-6">Strengths</h2>
              <ul className="space-y-3">
                {project.strengths.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-6">Risks to Consider</h2>
              <ul className="space-y-3">
                {project.risks.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <AlertTriangle className="size-4 text-destructive mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Verdict */}
      {project.verdict && (
        <section className="py-12 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-lg border border-primary bg-primary/5 p-6">
              <h2 className="text-xl font-semibold mb-3">Advisory Verdict</h2>
              <p className="text-muted-foreground">{project.verdict}</p>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((img, idx) => (
                <div key={idx} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Floor Plans */}
      {project.floorPlans.length > 0 && (
        <section className="py-12 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Floor Plans</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.floorPlans.map((plan, idx) => (
                <div key={idx} className="rounded-lg border border-border bg-card p-4">
                  <h3 className="font-semibold mb-2">{plan.label}</h3>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-muted">
                    <Image src={plan.image} alt={plan.label} fill className="object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Payment Plan */}
      {project.paymentPlan && (
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Payment Plan</h2>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-muted-foreground whitespace-pre-line">{project.paymentPlan}</p>
            </div>
          </div>
        </section>
      )}

      {/* Similar Projects */}
      {similarProjects.length > 0 && (
        <section className="py-12 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Similar Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold line-clamp-1">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.developer}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <MapPin className="inline size-3" /> {p.sector}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href={`tel:${siteConfig.contact.phones[0].tel}`}
              className={buttonVariants({ size: 'lg', className: 'w-full' })}
            >
              <Phone className="mr-2 size-4" />
              Call Now
            </Link>
            <button className={buttonVariants({ size: 'lg', variant: 'outline', className: 'w-full' })}>
              <FileText className="mr-2 size-4" />
              Get Brochure
            </button>
            <button className={buttonVariants({ size: 'lg', variant: 'outline', className: 'w-full' })}>
              Request Investment Report
            </button>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Enquire About {project.name}</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Get detailed information, pricing and site visit scheduling.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
              <EnquiryForm
                formType="project-enquiry"
                relatedProject={project.slug}
                showBudget
                showLocation
                submitLabel="Enquire Now"
                messagePlaceholder="Tell us about your requirements (optional)"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
