import { SCOCalculator } from '@/components/calculators/sco-calculator'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { EnquiryForm } from '@/components/forms/enquiry-form'

export const metadata = {
  title: 'SCO Investment Calculator | Smartz Spaces',
  description: 'SCO plot investment calculator. Estimate total investment, rental yield and payback period for Shop-Cum-Office plots.',
}

export default function SCOCalculatorPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'SCO Calculator', href: '/tools/sco-calculator' },
          ]}
        />
      </div>

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl mb-8">
            SCO Investment Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-12">
            Calculate the total investment, rental yield and payback period for SCO (Shop-Cum-Office) plots. Include
            plot price, construction cost and expected rent.
          </p>
          <SCOCalculator />
        </div>
      </section>

      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Find SCO Opportunities</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get a curated list of SCO plots with verified data and yield analysis.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <EnquiryForm
              formType="sco-enquiry"
              showBudget
              showLocation
              submitLabel="Get SCO Shortlist"
              messagePlaceholder="Preferred sector, plot size (optional)"
            />
          </div>
        </div>
      </section>
    </>
  )
}
