import { RentalYieldCalculator } from '@/components/calculators/rental-yield-calculator'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { EnquiryForm } from '@/components/forms/enquiry-form'

export const metadata = {
  title: 'Rental Yield Calculator | Smartz Spaces',
  description: 'Calculate gross rental yield on commercial property. Estimate returns based on annual rent and total property cost.',
}

export default function RentalYieldCalculatorPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'Rental Yield Calculator', href: '/tools/rental-yield-calculator' },
          ]}
        />
      </div>

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl mb-8">
            Rental Yield Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-12">
            Calculate gross rental yield on commercial property. Understand your potential returns based on annual rental
            income and total property cost including stamp duty and registration.
          </p>
          <RentalYieldCalculator />
        </div>
      </section>

      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Find High-Yield Properties</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get a curated list of commercial properties with strong rental potential.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <EnquiryForm
              formType="yield-enquiry"
              showBudget
              showLocation
              submitLabel="Get High-Yield Options"
              messagePlaceholder="Tell us about your yield requirements (optional)"
            />
          </div>
        </div>
      </section>
    </>
  )
}
