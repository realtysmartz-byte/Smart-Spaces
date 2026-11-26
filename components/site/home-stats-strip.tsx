import { Compass, Building2, ShieldCheck, BarChart3, CheckCircle2 } from 'lucide-react'

const stats = [
  {
    icon: Compass,
    value: '7+ Corridors',
    label: 'Prime Gurgaon Markets',
  },
  {
    icon: Building2,
    value: '4 Asset Classes',
    label: 'Office, Retail, SCO & Pre-Leased',
  },
  {
    icon: ShieldCheck,
    value: '24+ Checkpoints',
    label: 'RERA, Title & Lease Audits',
  },
  {
    icon: BarChart3,
    value: '100% Data-Led',
    label: 'Yield & Cashflow Modeling',
  },
  {
    icon: CheckCircle2,
    value: 'Zero Brokerage',
    label: 'Direct Developer Mandates',
  },
]

export function HomeStatsStrip() {
  return (
    <section className="bg-white border-y border-slate-200/80 py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 items-center">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.value}
                className="flex items-center gap-3.5 sm:justify-center lg:border-r lg:last:border-r-0 border-slate-200/70 lg:pr-4"
              >
                <div className="size-11 rounded-xl bg-[#F0F5FF] text-[#1557C0] flex items-center justify-center shrink-0">
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-base sm:text-lg font-extrabold text-[#172544] tracking-tight leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 font-medium truncate">
                    {stat.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
