import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { getLocations } from '@/lib/data'
import { buttonVariants } from '@/components/ui/button'
import { JsonLd } from '@/components/seo/json-ld'
import { Breadcrumbs } from '@/components/site/breadcrumbs'

export const metadata = {
  title: 'Locations in Gurgaon | Smartz Spaces',
  description:
    'Explore commercial property locations in Gurgaon — Golf Course Road, Golf Course Extension Road, SPR, Dwarka Expressway, Sohna Road and more. Corridor analysis and project listings.',
}

const locations = getLocations()

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Commercial Property Locations in Gurgaon',
  description: metadata.description,
  url: `${siteConfig.url}/locations`,
}

export default function LocationsPage() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Locations', href: '/locations' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Commercial Property Locations in Gurgaon
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
            Explore Gurgaon's key commercial corridors — from premium Golf Course Road to emerging Dwarka Expressway.
            Each location has its own strengths, risks and property types.
          </p>
        </div>
      </section>

      {/* Location Grid */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={`/locations/${location.slug}`}
                className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{location.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{location.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {location.categories.slice(0, 2).map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Location Summary */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Location Overview</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <div key={location.slug} className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="size-5 text-primary" />
                  <h3 className="font-semibold">{location.shortName}</h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">{location.summary}</p>
                <Link
                  href={`/locations/${location.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  View Details <ArrowRight className="ml-1 size-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Choose */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">How to Choose a Location</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Budget Match', desc: 'Entry prices vary significantly across corridors. Match location to your budget.' },
              { title: 'Investment Horizon', desc: 'Emerging corridors may need longer gestation but offer growth potential.' },
              { title: 'End-use vs Investment', desc: 'End-use buyers value connectivity; investors evaluate rental potential and exit.' },
              { title: 'Catchment Maturity', desc: 'Established corridors have proven demand; emerging ones carry execution risk.' },
              { title: 'Supply Level', desc: 'High supply can depress rents; low supply may offer scarcity value.' },
              { title: 'Infrastructure', desc: 'Upcoming metro, road or airport connectivity can drive long-term appreciation.' },
            ].map((item, idx) => (
              <div key={idx} className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
