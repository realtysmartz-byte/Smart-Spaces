import { EMICalculator } from '@/components/calculators/emi-calculator'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { EnquiryForm } from '@/components/forms/enquiry-form'

export const metadata = {
  title: 'EMI Calculator | Smartz Spaces',
  description: 'Calculate your loan EMI for commercial property investment. Estimate monthly payments, total interest and total payment.',
}

export default function EMICalculatorPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
            { label: 'EMI Calculator', href: '/tools/emi-calculator' },
          ]}
        />
      </div>

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl mb-8">
            EMI Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-12">
            Calculate your equated monthly installment (EMI) for commercial property loans. Estimate your monthly
            payments, total interest outflow and total payment over the loan tenure.
          </p>
          <EMICalculator />
        </div>
      </section>

      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Need Financing Advice?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our advisory team can help you structure your commercial property investment.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <EnquiryForm
              formType="financing-enquiry"
              showBudget
              submitLabel="Get Financing Advice"
              messagePlaceholder="Tell us about your financing requirements (optional)"
            />
          </div>
        </div>
      </section>
    </>
  )
}
