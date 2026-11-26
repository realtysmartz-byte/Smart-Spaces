import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Building2,
  Store,
  LandPlot,
  FileCheck2,
  TrendingUp,
  MapPin,
  Calculator,
  BookOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const categoryCards = [
  {
    key: 'market-reports',
    title: 'Market Reports',
    description: 'Trends, pricing and demand insights for commercial real estate.',
    href: '/insights/market-reports',
    icon: BarChart3,
    featured: true,
  },
  {
    key: 'office',
    title: 'Office Spaces',
    description: 'Grade A offices and managed workspaces in prime locations.',
    href: '/office-space-in-gurgaon',
    icon: Building2,
    featured: false,
  },
  {
    key: 'retail',
    title: 'Retail Spaces',
    description: 'High-street and mall retail opportunities with strong footfall.',
    href: '/retail-property-in-gurgaon',
    icon: Store,
    featured: false,
  },
  {
    key: 'sco',
    title: 'SCO Plots',
    description: 'Shop-Cum-Office plots in developing commercial hubs.',
    href: '/sco-plots-in-gurgaon',
    icon: LandPlot,
    featured: false,
  },
  {
    key: 'pre-leased',
    title: 'Pre-Leased Assets',
    description: 'Income-generating properties with assured rental returns.',
    href: '/commercial-property-for-investment-in-gurgaon#pre-leased',
    icon: FileCheck2,
    featured: false,
  },
  {
    key: 'investment',
    title: 'Investment Opportunities',
    description: 'High-potential assets for long-term wealth creation.',
    href: '/commercial-property-for-investment-in-gurgaon',
    icon: TrendingUp,
    featured: false,
  },
  {
    key: 'locations',
    title: 'Location Insights',
    description: 'Micro-market analysis, growth drivers and future potential.',
    href: '/locations',
    icon: MapPin,
    featured: false,
  },
  {
    key: 'tools',
    title: 'Commercial Tools',
    description: 'ROI, rental yield and investment planning calculators.',
    href: '/tools',
    icon: Calculator,
    featured: false,
  },
  {
    key: 'insights',
    title: 'Industry Insights',
    description: 'Expert articles, market updates and regulatory changes.',
    href: '/insights',
    icon: BookOpen,
    featured: false,
  },
]

export function CategoryMosaic() {
  return (
    <section className="py-12 sm:py-16 bg-[#F8FAFD] border-t border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="h-1 w-9 rounded-full bg-[#FF302B] mb-2.5" />
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#172544] tracking-tight">
              Explore by Category
            </h2>
            <p className="mt-1.5 text-sm text-slate-500 max-w-2xl">
              Discover commercial opportunities across key asset classes, curated for investors, occupiers and business owners.
            </p>
          </div>
          <Link
            href="/commercial-property-in-gurgaon"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1557C0] hover:text-[#FF302B] transition-colors shrink-0 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {categoryCards.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.key}
                href={card.href}
                className={cn(
                  'group relative flex items-center justify-between gap-4 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 overflow-hidden',
                  card.featured
                    ? 'bg-gradient-to-br from-[#172544] via-[#1E325C] to-[#1557C0] text-white shadow-[0_12px_32px_rgba(23,37,68,0.22)] hover:shadow-[0_18px_40px_rgba(23,37,68,0.3)]'
                    : 'bg-white border border-slate-200/80 text-[#172544] shadow-[0_6px_20px_rgba(23,37,68,0.04)] hover:border-blue-200 hover:shadow-[0_14px_30px_rgba(23,37,68,0.09)]'
                )}
              >
                {/* Subtle skyline watermark on featured dark card */}
                {card.featured && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 240 100"
                    fill="none"
                    className="pointer-events-none absolute right-0 bottom-0 w-44 h-auto text-white opacity-10"
                  >
                    <rect x="20" y="40" width="24" height="60" fill="currentColor" />
                    <rect x="52" y="20" width="30" height="80" fill="currentColor" />
                    <rect x="90" y="32" width="26" height="68" fill="currentColor" />
                    <rect x="124" y="10" width="34" height="90" fill="currentColor" />
                    <rect x="166" y="28" width="28" height="72" fill="currentColor" />
                  </svg>
                )}

                <div className="relative z-10 flex items-start gap-4 min-w-0">
                  <div
                    className={cn(
                      'size-11 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                      card.featured
                        ? 'bg-white/15 text-white border border-white/20'
                        : 'bg-[#F0F5FF] text-[#1557C0] group-hover:bg-[#1557C0] group-hover:text-white'
                    )}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <h3
                      className={cn(
                        'text-base font-bold tracking-tight transition-colors',
                        card.featured ? 'text-white' : 'text-[#172544] group-hover:text-[#1557C0]'
                      )}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={cn(
                        'mt-1 text-xs leading-relaxed line-clamp-2',
                        card.featured ? 'text-blue-100/90' : 'text-slate-500'
                      )}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Circular Arrow Button */}
                <div
                  className={cn(
                    'relative z-10 size-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200',
                    card.featured
                      ? 'bg-white text-[#172544] group-hover:scale-110'
                      : 'bg-slate-100 text-[#172544] group-hover:bg-[#1557C0] group-hover:text-white group-hover:translate-x-0.5'
                  )}
                >
                  <ArrowRight className="size-4" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
