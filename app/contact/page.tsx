import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { siteConfig, fullAddress } from '@/lib/site-config'
import { EnquiryForm } from '@/components/forms/enquiry-form'
import { Breadcrumbs } from '@/components/site/breadcrumbs'

export const metadata = {
  title: 'Contact Smartz Spaces | Commercial Real Estate Advisory',
  description:
    'Get in touch with Smartz Spaces for commercial property advisory in Gurgaon and Delhi NCR. Call, email or visit our office.',
}

export default function ContactPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Contact', href: '/contact' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Contact Us
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
            Get in touch with Smartz Spaces for commercial property advisory in Gurgaon and Delhi NCR. We are here to
            help you find the right property for your needs.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border bg-card p-6">
              <Phone className="size-6 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Phone</h3>
              {siteConfig.contact.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="block text-sm text-muted-foreground hover:text-primary">
                  {p.display}
                </a>
              ))}
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <Mail className="size-6 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Email</h3>
              <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-muted-foreground hover:text-primary">
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <MapPin className="size-6 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Address</h3>
              <address className="text-sm text-muted-foreground not-italic">
                {fullAddress()}
              </address>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <Clock className="size-6 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Office Hours</h3>
              <p className="text-sm text-muted-foreground">{siteConfig.contact.hours}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we will get back to you within 24 hours.
              </p>
              <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
                <EnquiryForm
                  formType="contact"
                  showBudget
                  showLocation
                  showGoal
                  submitLabel="Send Message"
                  messagePlaceholder="Tell us about your requirements"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-6">Visit Our Office</h2>
              <div className="rounded-lg border border-border bg-muted/50 p-6">
                <p className="text-muted-foreground mb-4">
                  We welcome visitors for consultations. Please call ahead to schedule an appointment.
                </p>
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="font-semibold mb-2">Smartz Spaces</h3>
                  <p className="text-sm text-muted-foreground mb-2">Powered by Realty Smartz Private Limited</p>
                  <address className="text-sm text-muted-foreground not-italic">
                    {fullAddress()}
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shortlist Section */}
      <section id="shortlist" className="py-12 bg-muted/50">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Get Your Shortlist</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Share your requirements and we will send you a personalized shortlist of properties.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            <EnquiryForm
              formType="shortlist"
              showBudget
              showLocation
              showGoal
              submitLabel="Get My Shortlist"
              messagePlaceholder="Tell us about your requirements (optional)"
            />
          </div>
        </div>
      </section>
    </>
  )
}
