import { BuyVsRentCalculator } from '@/components/calculators/buy-vs-rent-calculator'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { EnquiryForm } from '@/components/forms/enquiry-form'

export const metadata = {
  title: 'Buy vs Rent Calculator | Smartz Spaces',
  description: 'Compare buying vs leasing commercial property. Estimate costs, EMI vs rent and make informed decisions.',
}

export default function BuyVsRentCalculatorPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'Buy vs Rent Calculator', href: '/tools/buy-vs-rent-calculator' },
          ]}
        />
      </div>

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl mb-8">
            Buy vs Rent Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-12">
            Compare the costs of buying vs leasing commercial property for your business. Understand EMI, total cost
            and rent to make the right decision.
          </p>
          <BuyVsRentCalculator />
        </div>
      </section>

      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Need Decision Support?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our advisory team can help you evaluate buy vs rent for your specific situation.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <EnquiryForm
              formType="buy-vs-rent-enquiry"
              showBudget
              showLocation
              submitLabel="Get Decision Support"
              messagePlaceholder="Tell us about your business requirements (optional)"
            />
          </div>
        </div>
      </section>
    </>
  )
}
