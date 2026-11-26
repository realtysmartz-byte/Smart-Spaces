import Link from 'next/link'
import Image from 'next/image'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Building2,
  ExternalLink,
  CalendarCheck,
  FileSpreadsheet,
  SearchCheck,
  TrendingUp,
} from 'lucide-react'
import { siteConfig, fullAddress, whatsappHref } from '@/lib/site-config'
import { EnquiryForm } from '@/components/forms/enquiry-form'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { JsonLd } from '@/components/seo/json-ld'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const metadata = {
  title: 'Contact Commercial Advisory Desk | Smartz Spaces Gurgaon',
  description:
    'Connect with senior commercial real estate advisors for Grade A offices, retail shops, and SCO plots across Gurgaon and Delhi NCR. Direct advisory, zero brokerage on direct mandates.',
  alternates: { canonical: '/contact' },
}

const contactFaqs = [
  {
    question: 'Does Smartz Spaces charge any consultancy or brokerage fees for primary commercial purchases?',
    answer:
      'No. Smartz Spaces works directly with tier-1 developers through institutional developer mandates for all primary commercial purchases. Investors and corporate tenants pay zero consultancy or brokerage fees while receiving completely independent, research-backed advice.',
  },
  {
    question: 'How quickly will a commercial advisor get in touch with me?',
    answer:
      'During standard business hours (Monday to Saturday, 10:00 AM to 7:00 PM), our corridor specialists typically respond within 15 minutes. Inquiries submitted outside business hours are contacted first thing the next morning.',
  },
  {
    question: 'Can I schedule weekend site visits across multiple Gurgaon corridors?',
    answer:
      'Yes. We regularly organize curated multi-project corridor inspection tours on Saturdays and Sundays across Golf Course Extension Road, Southern Peripheral Road, Dwarka Expressway, and New Gurgaon.',
  },
  {
    question: 'What documents are required to book commercial property in Gurgaon?',
    answer:
      'Individual buyers require PAN Card, Aadhaar Card / Passport, passport photographs, and proof of address. For corporate purchases, the Certificate of Incorporation, Board Resolution, GST registration, and authorized signatory KYC documents are required.',
  },
]

const pageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      name: 'Contact Smartz Spaces',
      url: `${siteConfig.url}/contact`,
      description: metadata.description,
      mainEntity: {
        '@type': 'RealEstateAgent',
        name: siteConfig.name,
        telephone: siteConfig.contact.phones[0].tel,
        email: siteConfig.contact.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${siteConfig.contact.address.line1}, ${siteConfig.contact.address.line2}`,
          addressLocality: siteConfig.contact.address.city,
          addressRegion: siteConfig.contact.address.region,
          postalCode: siteConfig.contact.address.postalCode,
          addressCountry: 'IN',
        },
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: contactFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
}

export default function ContactPage() {
  return (
    <div className="bg-[#F4F7FD] min-h-screen text-[#172544]">
      <JsonLd data={pageSchema} />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Contact', href: '/contact' },
          ]}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 overflow-hidden">
        {/* Soft background luminous radial glow */}
        <div className="pointer-events-none absolute -top-20 -left-20 size-96 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="pointer-events-none absolute top-10 right-0 size-96 rounded-full bg-indigo-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-[#1557C0] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
              <span className="size-2 rounded-full bg-[#FF302B] animate-pulse" />
              Direct Commercial Advisory Desk
            </div>

            {/* Gradient Line Accent */}
            <div className="h-1.5 w-14 rounded-full bg-gradient-to-r from-[#FF302B] via-[#7C3AED] to-[#1557C0] mb-3.5 shadow-sm" />

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#172544] leading-tight">
              Connect With Our <span className="text-[#1557C0]">Commercial Advisors</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Direct, research-backed advisory for Grade A offices, high-street retail, and SCO plots across Gurgaon &amp; Delhi NCR. Speak with our senior corridor specialists for unbiased due diligence, cash flow projections, and priority developer access.
            </p>

            {/* Trust Highlights Row */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-medium text-slate-600">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-slate-200/80 shadow-2xs">
                <Zap className="size-4 text-amber-500" />
                15-Min Response Time
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-slate-200/80 shadow-2xs">
                <ShieldCheck className="size-4 text-blue-600" />
                100% Verified Assets
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="size-4 text-emerald-600" />
                Zero Brokerage on Direct Mandates
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Interactive Contact Channels */}
      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Phone Card */}
            <div className="group relative flex flex-col justify-between rounded-[22px] bg-white p-6 border border-slate-200/80 shadow-[0_8px_25px_rgba(23,37,68,0.05)] hover:shadow-[0_16px_35px_rgba(23,37,68,0.1)] hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="size-12 rounded-xl bg-gradient-to-br from-[#0084FF] to-[#0055D4] text-white flex items-center justify-center shadow-md shadow-blue-500/25 mb-4 group-hover:scale-105 transition-transform">
                  <Phone className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-[#172544]">Direct Advisory Line</h3>
                <p className="mt-1 text-xs text-slate-500">Instant voice consultation with desk</p>
                <div className="mt-4 space-y-1.5">
                  {siteConfig.contact.phones.map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      className="block text-sm font-semibold text-slate-800 hover:text-[#1557C0] transition-colors"
                    >
                      {p.display}
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#1557C0]">
                <span>Call Directly</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="group relative flex flex-col justify-between rounded-[22px] bg-white p-6 border border-slate-200/80 shadow-[0_8px_25px_rgba(23,37,68,0.05)] hover:shadow-[0_16px_35px_rgba(23,37,68,0.1)] hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="size-12 rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white flex items-center justify-center shadow-md shadow-emerald-500/25 mb-4 group-hover:scale-105 transition-transform">
                  <MessageSquare className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-[#172544]">WhatsApp Concierge</h3>
                <p className="mt-1 text-xs text-slate-500">Brochures, layouts &amp; instant ROI models</p>
                <div className="mt-4">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
                    Online Now &bull; Typical reply: 2 mins
                  </span>
                </div>
              </div>
              <a
                href={whatsappHref('Hi Smartz Spaces, I am looking for commercial property advisory in Gurgaon.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <span>Chat on WhatsApp</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Email Card */}
            <div className="group relative flex flex-col justify-between rounded-[22px] bg-white p-6 border border-slate-200/80 shadow-[0_8px_25px_rgba(23,37,68,0.05)] hover:shadow-[0_16px_35px_rgba(23,37,68,0.1)] hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="size-12 rounded-xl bg-gradient-to-br from-[#9333EA] to-[#6B21A8] text-white flex items-center justify-center shadow-md shadow-purple-500/25 mb-4 group-hover:scale-105 transition-transform">
                  <Mail className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-[#172544]">Official Inquiries</h3>
                <p className="mt-1 text-xs text-slate-500">Send RFPs, mandates or institutional inquiries</p>
                <div className="mt-4">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-sm font-semibold text-slate-800 hover:text-[#1557C0] transition-colors break-all"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#9333EA] hover:text-[#7C3AED] transition-colors"
              >
                <span>Send Email</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Office Hours / Location Card */}
            <div className="group relative flex flex-col justify-between rounded-[22px] bg-white p-6 border border-slate-200/80 shadow-[0_8px_25px_rgba(23,37,68,0.05)] hover:shadow-[0_16px_35px_rgba(23,37,68,0.1)] hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="size-12 rounded-xl bg-gradient-to-br from-[#FB923C] to-[#EA580C] text-white flex items-center justify-center shadow-md shadow-orange-500/25 mb-4 group-hover:scale-105 transition-transform">
                  <Clock className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-[#172544]">Advisory Lounge</h3>
                <p className="mt-1 text-xs text-slate-500">Spaze Palazo, Sector 69, Gurugram</p>
                <div className="mt-4 space-y-1">
                  <p className="text-xs text-slate-500">Business Hours:</p>
                  <p className="text-sm font-semibold text-slate-800">{siteConfig.contact.hours}</p>
                </div>
              </div>
              <a
                href="#visit-office"
                className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#EA580C] hover:text-[#C2410C] transition-colors"
              >
                <span>View Directions</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Split Section: Form & Office Experience */}
      <section className="py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            {/* Left: Priority Advisory Form (7 cols) */}
            <div className="lg:col-span-7 rounded-[26px] bg-white p-6 sm:p-9 border border-slate-200/80 shadow-[0_12px_40px_rgba(23,37,68,0.06)] relative overflow-hidden">
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1557C0] via-[#0084FF] to-[#FF302B]" />

              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1557C0] text-xs font-bold uppercase tracking-wider mb-2">
                  <CalendarCheck className="size-3.5" />
                  Priority Consultation Request
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172544]">
                  Send Us a Message
                </h2>
                <p className="mt-1.5 text-sm text-slate-500 leading-relaxed font-normal">
                  Tell us what you are looking for. Our dedicated micro-market corridor consultant will review your parameters and respond promptly.
                </p>
              </div>

              {/* Single Canonical Enquiry Form */}
              <EnquiryForm
                formType="contact"
                showBudget
                showLocation
                showGoal
                submitLabel="Send Message &amp; Get Consultation"
                messagePlaceholder="Share any specific requirements (e.g. ready-to-move, minimum rental yield, preferred sector)..."
              />
            </div>

            {/* Right: Visit Our Corporate Lounge & Connectivity (5 cols) */}
            <div
              id="visit-office"
              className="lg:col-span-5 flex flex-col gap-6"
            >
              {/* Office Details Card */}
              <div className="rounded-[26px] bg-white p-6 sm:p-8 border border-slate-200/80 shadow-[0_12px_40px_rgba(23,37,68,0.06)]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
                  <Building2 className="size-3.5" />
                  Corporate Headquarters
                </span>

                <h3 className="text-xl font-bold text-[#172544]">Visit Our Advisory Lounge</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Powered by Realty Smartz Private Limited
                </p>

                <div className="mt-5 space-y-3">
                  <div className="flex items-start gap-3 text-sm text-slate-700">
                    <MapPin className="size-5 text-[#1557C0] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#172544]">Spaze Palazo, 11th Floor</p>
                      <p className="text-slate-600 text-xs sm:text-sm">Golf Course Extension Road, Sector 69</p>
                      <p className="text-slate-500 text-xs">Gurugram, Haryana 122001, India</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-700 pt-2 border-t border-slate-100">
                    <Clock className="size-4.5 text-slate-400 shrink-0" />
                    <span className="text-xs text-slate-600 font-medium">
                      Consultation Hours: <strong className="text-slate-800">{siteConfig.contact.hours}</strong>
                    </span>
                  </div>
                </div>

                {/* Corridor Connectivity Matrix */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Corridor Proximity &amp; Transit Times
                  </p>
                  <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-700">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-bold text-[#172544] block">2 Mins</span>
                      <span className="text-slate-500">Sohna Rd / Vatika Chowk</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-bold text-[#172544] block">10 Mins</span>
                      <span className="text-slate-500">Rapid Metro Sec 55-56</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-bold text-[#172544] block">18 Mins</span>
                      <span className="text-slate-500">DLF Cyber City &amp; Horizon</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-bold text-[#172544] block">25 Mins</span>
                      <span className="text-slate-500">IGI Airport via CPR/NH48</span>
                    </div>
                  </div>
                </div>

                {/* Direct Google Maps Action Button */}
                <div className="mt-6">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Spaze+Palazo+Sector+69+Gurugram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#1557C0] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-[#1147a0] transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="size-4" />
                  </a>
                </div>
              </div>

              {/* Advisory Assurance Box */}
              <div className="rounded-[22px] bg-gradient-to-br from-[#172544] to-[#0E1A33] p-6 text-white shadow-lg">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#FF4B4B] uppercase mb-2">
                  <ShieldCheck className="size-4" />
                  Commercial Due Diligence Pledge
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  Unbiased Advice. No Misleading Yields.
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  We verify RERA compliance, physical construction stages, lock-in clauses, and actual prevailing micro-market lease rates before recommending any commercial development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured 4-Step Advisory Process (Replacing the former redundant duplicate form) */}
      <section className="py-12 sm:py-20 bg-white border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="h-1.5 w-12 rounded-full bg-gradient-to-r from-[#FF302B] via-[#7C3AED] to-[#1557C0] mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172544]">
              What Happens <span className="text-[#1557C0]">Next?</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 font-normal">
              Our structured, transparent advisory workflow ensures you receive accurate data, complete clarity, and priority commercial allocation.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Step 1 */}
            <div className="relative p-6 rounded-2xl bg-[#F8FAFD] border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="size-10 rounded-full bg-[#1557C0] text-white font-bold flex items-center justify-center text-sm mb-4 shadow-sm">
                  01
                </div>
                <h3 className="text-lg font-bold text-[#172544]">Discovery Call</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  A 15-minute consultation to understand your commercial mandate: ticket size, risk appetite, preferred corridor, and capital appreciation horizon.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-xs font-semibold text-[#1557C0]">
                Within 15–30 Mins
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-2xl bg-[#F8FAFD] border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="size-10 rounded-full bg-[#1557C0] text-white font-bold flex items-center justify-center text-sm mb-4 shadow-sm">
                  02
                </div>
                <h3 className="text-lg font-bold text-[#172544]">Custom Shortlist</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Receive a comparative evaluation of 3–5 pre-screened assets with realistic gross and net rental yield estimates, cash flow timelines, and micro-market data.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-xs font-semibold text-[#1557C0]">
                Within 24 Hours
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-2xl bg-[#F8FAFD] border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="size-10 rounded-full bg-[#1557C0] text-white font-bold flex items-center justify-center text-sm mb-4 shadow-sm">
                  03
                </div>
                <h3 className="text-lg font-bold text-[#172544]">Site Inspections</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Guided private corridor walkthroughs to examine access roads, construction milestones, catchment density, and surrounding infrastructure developments.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-xs font-semibold text-[#1557C0]">
                Flexible Scheduling
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative p-6 rounded-2xl bg-[#F8FAFD] border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="size-10 rounded-full bg-[#1557C0] text-white font-bold flex items-center justify-center text-sm mb-4 shadow-sm">
                  04
                </div>
                <h3 className="text-lg font-bold text-[#172544]">Transaction Closure</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Complete assistance with direct developer negotiations, transparent pricing terms, RERA compliance verification, and statutory registration support.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-xs font-semibold text-emerald-600">
                Zero Brokerage Fee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-12 sm:py-20 bg-[#F4F7FD]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172544]">
              Frequently Asked <span className="text-[#1557C0]">Questions</span>
            </h2>
            <p className="mt-2 text-sm text-slate-500 font-normal">
              Common questions about working with Smartz Spaces commercial advisory desk.
            </p>
          </div>

          <div className="rounded-[24px] bg-white p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <Accordion type="single" collapsible className="w-full">
              {contactFaqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-slate-100 last:border-0 py-1">
                  <AccordionTrigger className="text-left font-bold text-[#172544] hover:text-[#1557C0] text-sm sm:text-base py-3">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-slate-600 leading-relaxed pb-3">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}
