import { Breadcrumbs } from '@/components/site/breadcrumbs'

export const metadata = {
  title: 'Privacy Policy | Smartz Spaces',
  description: 'Privacy policy for Smartz Spaces. Learn how we collect, use and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Privacy Policy', href: '/privacy-policy' },
          ]}
        />
      </div>

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl mb-8">
            Privacy Policy
          </h1>
          <div className="prose-content max-w-none">
            <p className="mb-6">Last updated: October 2026</p>

            <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information you provide directly to us, such as when you fill out an enquiry form, request a
              brochure, or contact us. This may include:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-5">
              <li>Name and contact information (phone, email)</li>
              <li>Property preferences (budget, location, property type)</li>
              <li>Investment goals and requirements</li>
              <li>Communication preferences</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="mb-6 list-disc space-y-2 pl-5">
              <li>Provide and improve our services</li>
              <li>Respond to your enquiries and requests</li>
              <li>Send you property recommendations and market updates (with your consent)</li>
              <li>Communicate with you about our services</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-5">
              <li>Our team members who need the information to assist you</li>
              <li>Trusted partners who help us operate our website and services</li>
              <li>As required by law or to protect our rights</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
            <p className="mb-6">
              We implement appropriate security measures to protect your personal information from unauthorized access,
              alteration, or destruction. However, no method of transmission over the internet is completely secure.
            </p>

            <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="mb-6 list-disc space-y-2 pl-5">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2 className="text-xl font-semibold mb-4">6. Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy, please contact us at info@smartzspaces.in
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
