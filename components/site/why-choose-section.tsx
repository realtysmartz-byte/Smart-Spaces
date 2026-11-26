import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BarChart3, Compass, ShieldCheck, Users } from 'lucide-react'

const reasons = [
  {
    icon: BarChart3,
    title: 'Data-Backed Advisory',
    description: 'Decisions driven by micro-market research, comparable leases, and financial modeling.',
    iconBg: 'bg-blue-50 text-[#1557C0]',
  },
  {
    icon: ShieldCheck,
    title: 'End-to-End Support',
    description: 'From corridor discovery and RERA diligence to negotiation and closure.',
    iconBg: 'bg-red-50 text-[#FF302B]',
  },
  {
    icon: Compass,
    title: 'Local Market Expertise',
    description: 'Deep on-ground understanding of Gurgaon & Delhi NCR commercial corridors.',
    iconBg: 'bg-indigo-50 text-[#4F46E5]',
  },
  {
    icon: Users,
    title: 'Client-Centric Approach',
    description: 'Tailored strategies for private investors, corporate occupiers, and family offices.',
    iconBg: 'bg-emerald-50 text-[#059669]',
  },
]

const developerPartners = ['DLF', 'M3M', 'OMAXE', 'ELDECO', 'VATIKA', 'EMAAR']

export function WhyChooseSection() {
  return (
    <section className="py-12 sm:py-16 bg-[#F8FAFD] border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Split: Angled Building Image Left + 2x2 Value Props Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Angled Image Frame */}
          <div className="lg:col-span-5 relative px-2 py-2">
            <div className="relative h-[280px] sm:h-[330px] w-full">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[26px] bg-[#1557C0]/15 -skew-x-3 -translate-x-2.5 translate-y-2.5"
              />
              <div className="relative z-10 w-full h-full rounded-[26px] overflow-hidden border-[3px] border-white shadow-[0_18px_40px_rgba(23,37,68,0.14)] -skew-x-3 bg-slate-900">
                <div className="relative w-full h-full skew-x-3 scale-[1.08]">
                  <Image
                    src="/images/hero-golf-course-road.jpg"
                    alt="Modern Grade A commercial tower in Gurgaon"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Why Choose Smartz Spaces */}
          <div className="lg:col-span-7">
            <div className="h-1 w-9 rounded-full bg-[#FF302B] mb-2.5" />
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#172544] tracking-tight">
              Why Choose Smartz Spaces
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">
              A research-driven, client-first approach to commercial real estate.
            </p>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <div
                      className={`size-11 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}
                    >
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#172544]">{item.title}</h3>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Trusted Across Leading Developments Strip */}
        <div className="mt-14 pt-10 border-t border-slate-200/80 text-center">
          <p className="text-sm font-bold text-[#172544] tracking-tight mb-6">
            Coverage Across Leading Commercial Developers
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {developerPartners.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center h-14 rounded-xl bg-white border border-slate-200/80 shadow-2xs text-sm font-extrabold tracking-widest text-slate-600 hover:text-[#1557C0] hover:border-blue-200 transition-colors"
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Dark Navy Ready to Invest CTA Banner */}
        <div className="mt-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#121F3B] via-[#172544] to-[#1D3566] px-6 py-8 sm:px-10 sm:py-10 text-white shadow-[0_18px_45px_rgba(23,37,68,0.2)]">
          {/* Subtle Skyline Silhouette */}
          <svg
            aria-hidden="true"
            viewBox="0 0 600 120"
            fill="none"
            className="pointer-events-none absolute right-0 bottom-0 w-96 h-auto text-white opacity-[0.06]"
          >
            <rect x="40" y="45" width="36" height="75" fill="currentColor" />
            <rect x="90" y="20" width="44" height="100" fill="currentColor" />
            <rect x="148" y="38" width="38" height="82" fill="currentColor" />
            <rect x="200" y="10" width="48" height="110" fill="currentColor" />
            <rect x="262" y="35" width="40" height="85" fill="currentColor" />
            <rect x="316" y="52" width="34" height="68" fill="currentColor" />
          </svg>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                Ready to Invest in Commercial Real Estate?
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-blue-100/85">
                Get expert advice, curated opportunities, and a personalized commercial shortlist.
              </p>
            </div>

            <Link
              href="#shortlist"
              className="red-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold shadow-lg shrink-0 self-start lg:self-auto"
            >
              <span>Get My Shortlist</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
