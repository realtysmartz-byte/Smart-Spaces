import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const categories = [
  {
    key: 'office',
    title: 'Grade A Commercial Offices',
    subtitle: 'Institutional Workplaces',
    description:
      'Corporate headquarters, managed IT suites, and pre-certified green office towers along Golf Course Road, Cyber City, and Golf Course Extension.',
    href: '/office-space-in-gurgaon',
    image: '/images/hero-golf-course-road.jpg',
    badge: 'Institutional Grade',
    spanClass: 'lg:col-span-8 lg:row-span-2 min-h-[380px] lg:min-h-[460px]',
  },
  {
    key: 'retail',
    title: 'High-Street Retail & F&B',
    subtitle: 'Catchment Promenades',
    description:
      'Double-height ground floor shops, dining terraces, and anchor spaces catering to dense high-income residential catchments.',
    href: '/retail-property-in-gurgaon',
    image: '/images/category-retail.png',
    badge: 'High Footfall',
    spanClass: 'lg:col-span-4 lg:row-span-1 min-h-[260px]',
  },
  {
    key: 'sco',
    title: 'Commercial SCO Plots',
    subtitle: 'Freehold Land Ownership',
    description:
      '100% land + building ownership with basement to terrace leasing flexibility under Haryana commercial licensing.',
    href: '/sco-plots-in-gurgaon',
    image: '/images/category-sco.png',
    badge: 'Freehold Asset',
    spanClass: 'lg:col-span-4 lg:row-span-1 min-h-[260px]',
  },
  {
    key: 'pre-leased',
    title: 'Pre-Leased Commercial',
    subtitle: 'Immediate Cashflow',
    description:
      'Income-generating commercial real estate with established MNC tenants, long lock-in covenants, and verified rent rolls.',
    href: '/commercial-property-for-investment-in-gurgaon#pre-leased',
    image: '/images/hero-office-interior.jpg',
    badge: 'Immediate Yield',
    spanClass: 'lg:col-span-6 min-h-[300px]',
  },
  {
    key: 'investment',
    title: 'Strategic Investment Assets',
    subtitle: 'Capital Growth Portfolios',
    description:
      'Curated commercial assets vetted by our analytical model across yield, liquidity, infrastructure catalysts, and tenant covenants.',
    href: '/commercial-property-for-investment-in-gurgaon',
    image: '/images/location-corridor.png',
    badge: 'Advisory Vetted',
    spanClass: 'lg:col-span-6 min-h-[300px]',
  },
]

export function CategoryMosaic() {
  return (
    <section className="py-20 sm:py-28 bg-sand-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-900/5 border border-primary-900/10 text-primary-900 text-xs font-semibold uppercase tracking-wider mb-3">
              <Building2 className="size-3 text-accent-500" />
              Asset Portfolios
            </div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-5xl text-primary-900">
              Commercial Asset Categories
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-600 leading-relaxed">
              Explore specialized commercial formats across Gurgaon—each tailored for specific business occupation,
              footfall capture, or investment return dynamics.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-900 hover:text-accent-500 transition-colors group"
          >
            <span>Explore All Properties</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Masonry Mosaic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={cat.href}
              className={cn(
                'group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-border flex flex-col justify-end p-6 sm:p-8 bg-primary-900',
                cat.spanClass
              )}
            >
              {/* Background Image with Ken Burns zoom on hover */}
              <div className="absolute inset-0">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-106 group-hover:brightness-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/95 via-primary-900/60 to-transparent transition-opacity duration-300" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-500/50 rounded-2xl transition-colors duration-300 pointer-events-none" />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-accent-500 text-white shadow">
                    {cat.badge}
                  </span>
                  <span className="text-xs text-sand-50/80 font-medium">{cat.subtitle}</span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white group-hover:text-accent-500 transition-colors">
                  {cat.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-sand-50/85 line-clamp-2 max-w-xl leading-relaxed">
                  {cat.description}
                </p>

                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-accent-500 group-hover:text-accent-600 uppercase tracking-wider">
                  <span>Explore Listings</span>
                  <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
