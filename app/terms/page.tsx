import { Breadcrumbs } from '@/components/site/breadcrumbs'

export const metadata = {
  title: 'Terms of Use | Smartz Spaces',
  description: 'Terms of use for Smartz Spaces. Read our terms and conditions for using our website and services.',
}

export default function TermsPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Terms of Use', href: '/terms' },
          ]}
        />
      </div>

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl mb-8">
            Terms of Use
          </h1>
          <div className="prose-content max-w-none">
            <p className="mb-6">Last updated: October 2026</p>

            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-6">
              By accessing and using Smartz Spaces, you accept and agree to be bound by these Terms of Use. If you do
              not agree to these terms, please do not use our website.
            </p>

            <h2 className="text-xl font-semibold mb-4">2. Purpose of the Website</h2>
            <p className="mb-6">
              Smartz Spaces is a commercial real estate advisory platform. We provide information, research and
              advisory services for commercial properties in Gurgaon and Delhi NCR. We are not a real estate broker or
              agent.
            </p>

            <h2 className="text-xl font-semibold mb-4">3. Information Accuracy</h2>
            <p className="mb-4">
              While we strive to provide accurate and up-to-date information, we make no warranties about the
              completeness, reliability, or accuracy of any information on this website. Property information is
              indicative and subject to change.
            </p>
            <p className="mb-6">
              You should independently verify all property details, including RERA registration, pricing, possession
              timelines, and approvals before making any decisions.
            </p>

            <h2 className="text-xl font-semibold mb-4">4. No Guarantee of Returns</h2>
            <p className="mb-6">
              Any information about rental yields, appreciation, or returns is for informational purposes only and does
              not constitute a guarantee. Actual returns may vary significantly. We strongly recommend independent
              verification and professional advice.
            </p>

            <h2 className="text-xl font-semibold mb-4">5. Limitation of Liability</h2>
            <p className="mb-6">
              Smartz Spaces and Realty Smartz Private Limited shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of your access to or use of this website.
            </p>

            <h2 className="text-xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="mb-6">
              All content on this website, including text, graphics, logos, and images, is the property of Smartz
              Spaces or its licensors and is protected by copyright laws.
            </p>

            <h2 className="text-xl font-semibold mb-4">7. Third-Party Links</h2>
            <p className="mb-6">
              Our website may contain links to third-party websites. We are not responsible for the content or
              practices of these third-party sites.
            </p>

            <h2 className="text-xl font-semibold mb-4">8. Changes to Terms</h2>
            <p className="mb-6">
              We reserve the right to modify these terms at any time. Continued use of the website after changes
              constitutes acceptance of the revised terms.
            </p>

            <h2 className="text-xl font-semibold mb-4">9. Contact</h2>
            <p className="mb-4">
              For questions about these Terms of Use, please contact us at info@smartzspaces.in
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
