import Link from 'next/link'
import { Calculator, ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/site/breadcrumbs'

export const metadata = {
  title: 'Investment Calculators | Smartz Spaces',
  description:
    'Free calculators for commercial real estate — EMI, rental yield, ROI, buy vs rent, SCO investment and stamp duty estimation.',
}

const calculators = [
  { title: 'EMI Calculator', desc: 'Calculate your loan EMI and total payment', href: '/tools/emi-calculator' },
  { title: 'Rental Yield Calculator', desc: 'Estimate gross rental yield on property', href: '/tools/rental-yield-calculator' },
  { title: 'ROI Calculator', desc: 'Calculate return on investment and CAGR', href: '/tools/roi-calculator' },
  { title: 'Buy vs Rent Calculator', desc: 'Compare buying vs leasing costs', href: '/tools/buy-vs-rent-calculator' },
  { title: 'SCO Calculator', desc: 'SCO investment analysis with yield calculation', href: '/tools/sco-calculator' },
  { title: 'Stamp Duty Calculator', desc: 'Estimate stamp duty and registration charges', href: '/tools/stamp-duty-calculator' },
]

export default function ToolsPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Investment Calculators
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
            Free calculators to help you evaluate commercial property investments. Estimate EMI, rental yield, ROI and
            more with transparent assumptions.
          </p>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="group flex items-start gap-4 rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Calculator className="size-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{calc.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{calc.desc}</p>
                  <ArrowRight className="mt-3 size-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-border bg-muted/50 p-6">
            <h2 className="text-lg font-semibold mb-3">Calculator Disclaimer</h2>
            <p className="text-sm text-muted-foreground">
              These calculators provide estimates based on standard formulas and user inputs. Actual EMI, rental yields,
              returns and charges may vary based on lender terms, market conditions, government policies and other factors.
              Always verify calculations with relevant professionals before making financial decisions. Stamp duty rates are
              subject to change — verify with concerned authorities.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
