import { Breadcrumbs } from '@/components/site/breadcrumbs'

export const metadata = {
  title: 'Disclaimer | Smartz Spaces',
  description: 'Disclaimer for Smartz Spaces. Important information about the use of our website and services.',
}

export default function DisclaimerPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Disclaimer', href: '/disclaimer' },
          ]}
        />
      </div>

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl mb-8">
            Disclaimer
          </h1>
          <div className="prose-content max-w-none">
            <p className="mb-6">Last updated: October 2026</p>

            <h2 className="text-xl font-semibold mb-4">General Disclaimer</h2>
            <p className="mb-4">
              The information provided on Smartz Spaces is for general informational purposes only. All property
              information, including prices, possession dates, rental yields, and project details, is indicative and
              subject to change without notice.
            </p>
            <p className="mb-6">
              Smartz Spaces is a commercial real estate advisory platform. We do not guarantee the accuracy,
              completeness, or reliability of any information on this website.
            </p>

            <h2 className="text-xl font-semibold mb-4">No Investment Advice</h2>
            <p className="mb-6">
              Content on this website does not constitute financial, legal, or investment advice. Any projections,
              estimates, or forward-looking statements are based on assumptions and may not materialize. You should
              conduct your own due diligence and consult with qualified professionals before making any investment
              decisions.
            </p>

            <h2 className="text-xl font-semibold mb-4">Property Verification Required</h2>
            <p className="mb-4">
              Before making any property transaction, you must independently verify:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-5">
              <li>RERA registration and compliance</li>
              <li>Title and ownership documents</li>
              <li>Approved layout plans and building bye-laws</li>
              <li>Possession timelines and delivery track record</li>
              <li>All-in costs including stamp duty, registration, and charges</li>
              <li>Comparable market prices and rental rates</li>
              <li>Developer credentials and past project delivery</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">Returns Not Guaranteed</h2>
            <p className="mb-6">
              Any information about rental yields, capital appreciation, or expected returns is for illustration
              purposes only. Actual returns may vary significantly due to market conditions, property-specific factors,
              and other variables. Past performance is not indicative of future results.
            </p>

            <h2 className="text-xl font-semibold mb-4">Third-Party Content</h2>
            <p className="mb-6">
              Our website may contain content sourced from third parties, including developers, brokers, and market
              reports. We do not endorse or guarantee the accuracy of third-party content.
            </p>

            <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="mb-6">
              Smartz Spaces, Realty Smartz Private Limited, and their directors, employees, and affiliates shall not
              be liable for any loss, damage, or expense arising from the use of this website or reliance on any
              information provided herein.
            </p>

            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <p className="mb-4">
              For clarifications or questions about this disclaimer, please contact us at info@smartzspaces.in
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
