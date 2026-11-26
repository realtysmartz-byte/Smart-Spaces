import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { CommercialCalculatorsSection } from '@/components/site/commercial-calculators-section'

export const metadata = {
  title: 'Commercial Investment Calculators | Smartz Spaces',
  description:
    'Free fintech calculators for commercial real estate — EMI, rental yield, ROI, buy vs rent, SCO investment and stamp duty estimation in Gurgaon and Delhi NCR.',
}

export default function ToolsPage() {
  return (
    <div className="bg-[#F4F7FD] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/tools' },
          ]}
        />
      </div>

      {/* Main Commercial Calculators Fintech Section */}
      <CommercialCalculatorsSection
        className="pt-8 sm:pt-10 border-t-0"
        showHeaderDetails={true}
        description="Free real estate fintech calculators to evaluate commercial office, retail, SCO plots, and pre-leased investments. Estimate cash flows, debt servicing, net yields, and transaction overheads."
      />

      {/* Disclaimer Section */}
      <section className="py-12 sm:py-16 bg-white border-t border-line-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-line-200 bg-[#F4F7FD]/60 p-6 sm:p-8 shadow-xs">
            <h2 className="text-base sm:text-lg font-bold font-heading text-[#172544] mb-2.5">
              Financial Modelling Disclaimer
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6577] leading-relaxed">
              These calculators provide estimates based on standard financial formulas, typical commercial lending parameters,
              and user inputs. Actual commercial rental yields, debt amortization, loan tenure interest, capital returns, and government
              statutory levies may vary depending on developer covenants, lease agreements, banking underwriting, and official
              Haryana (Gurugram) or Delhi stamp duty revisions. Always conduct formal legal and financial due diligence before
              entering into binding commercial property transactions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
