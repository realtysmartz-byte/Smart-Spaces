import { ROICalculator } from '@/components/calculators/roi-calculator'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { EnquiryForm } from '@/components/forms/enquiry-form'

export const metadata = {
  title: 'ROI Calculator | Smartz Spaces',
  description: 'Calculate return on investment and CAGR for commercial property. Estimate total returns and annualized growth.',
}

export default function ROICalculatorPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'ROI Calculator', href: '/tools/roi-calculator' },
          ]}
        />
      </div>

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl mb-8">
            ROI Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-12">
            Calculate return on investment (ROI) and compound annual growth rate (CAGR) for your commercial property.
            Understand both total returns and annualized performance.
          </p>
          <ROICalculator />
        </div>
      </section>

      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Optimize Your Returns</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get advisory on selecting properties with strong appreciation potential.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <EnquiryForm
              formType="roi-enquiry"
              showBudget
              showLocation
              submitLabel="Get Appreciation Strategy"
              messagePlaceholder="Tell us about your ROI goals (optional)"
            />
          </div>
        </div>
      </section>
    </>
  )
}
