import { StampDutyCalculator } from '@/components/calculators/stamp-duty-calculator'
import { Breadcrumbs } from '@/components/site/breadcrumbs'

export const metadata = {
  title: 'Stamp Duty Calculator | Smartz Spaces',
  description: 'Estimate stamp duty and registration charges for commercial property in Haryana and Delhi. Calculate total transaction costs.',
}

export default function StampDutyCalculatorPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'Stamp Duty Calculator', href: '/tools/stamp-duty-calculator' },
          ]}
        />
      </div>

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl mb-8">
            Stamp Duty Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-12">
            Estimate stamp duty and registration charges for commercial property transactions in Haryana (Gurgaon) and
            Delhi. Plan your total investment including all charges.
          </p>
          <StampDutyCalculator />
        </div>
      </section>

      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-border bg-muted/50 p-6">
            <h2 className="text-lg font-semibold mb-3">Important Notes</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Stamp duty rates are subject to change by state governments</li>
              <li>• Women may be eligible for concessional rates (1-2% lower) in some states</li>
              <li>• Registration fee is typically 1% of property value</li>
              <li>• Additional charges may apply for certain property types or transactions</li>
              <li>• Always verify current rates with the concerned authority before transaction</li>
              <li>• This calculator provides estimates only — consult legal professionals for accurate calculations</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
