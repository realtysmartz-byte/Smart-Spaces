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
    spanClass: 'lg:col-span-8 lg:row-span-2 min-h-[460px] lg:min-h-[520px]',
    isLarge: true,
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
    spanClass: 'lg:col-span-4 lg:row-span-1 min-h-[320px] sm:min-h-[340px] lg:min-h-[360px]',
    isLarge: false,
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
    spanClass: 'lg:col-span-4 lg:row-span-1 min-h-[320px] sm:min-h-[340px] lg:min-h-[360px]',
    isLarge: false,
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
    spanClass: 'lg:col-span-6 min-h-[340px] sm:min-h-[360px]',
    isLarge: false,
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
    spanClass: 'lg:col-span-6 min-h-[340px] sm:min-h-[360px]',
    isLarge: false,
  },
]

export function CategoryMosaic() {
  return (
    <section className="py-10 sm:py-14 bg-white border-t border-line-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sm:mb-8 gap-4 pb-4 border-b border-line-200">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight">
              Commercial Asset Categories
            </h2>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-300/40 text-blue-600 text-xs font-semibold uppercase tracking-wider">
              <Building2 className="size-3 text-blue-600" />
              Asset Portfolios
            </span>
          </div>
          <div className="flex items-center gap-6">
            <p className="hidden lg:block text-xs sm:text-sm text-muted-600 max-w-md">
              Specialized commercial formats across Gurgaon tailored for occupation &amp; high returns.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-red-600 transition-colors shrink-0 group"
            >
              <span>Explore All Properties</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Asymmetric Masonry Mosaic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={cat.href}
              className={cn(
                'group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_12px_36px_rgba(20,33,61,0.1)] transition-all duration-300 border border-line-200 flex flex-col justify-end p-3.5 sm:p-5 bg-blue-50',
                cat.spanClass
              )}
            >
              {/* Background Image with subtle Ken Burns zoom on hover */}
              <div className="absolute inset-0">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>

              {/* Light Bottom Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Top Floating Badge Pill - keeps bottom clear */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-line-200/90 text-blue-700 text-xs font-semibold shadow-sm">
                  <span className="size-1.5 rounded-full bg-blue-600" />
                  <span>{cat.badge}</span>
                  <span className="text-muted-600/50 font-normal">•</span>
                  <span className="text-muted-600 font-medium">{cat.subtitle}</span>
                </div>
              </div>

              {/* Compact Solid White Content Card at Bottom */}
              {cat.isLarge ? (
                <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-line-200 shadow-md max-w-lg">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-ink-900 group-hover:text-blue-600 transition-colors">
                    {cat.title}
                  </h3>

                  <p className="mt-1.5 text-xs sm:text-sm text-muted-600 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-red-600 uppercase tracking-wider">
                    <span>Explore Listings</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ) : (
                <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 border border-line-200 shadow-md w-full">
                  <h3 className="font-heading text-base sm:text-lg font-bold text-ink-900 group-hover:text-blue-600 transition-colors">
                    {cat.title}
                  </h3>

                  <p className="mt-0.5 text-xs text-muted-600 line-clamp-1 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-red-600 uppercase tracking-wider">
                    <span>Explore Listings</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
