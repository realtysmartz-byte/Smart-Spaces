import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react'
import { fullAddress, siteConfig, whatsappHref } from '@/lib/site-config'
import { locations } from '@/lib/data/locations'
import { Logo } from './logo'

const columns = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Commercial Property', href: '/commercial-property-in-gurgaon' },
      { label: 'Office Spaces', href: '/office-space-in-gurgaon' },
      { label: 'Retail Spaces', href: '/retail-property-in-gurgaon' },
      { label: 'SCO Plots', href: '/sco-plots-in-gurgaon' },
      { label: 'Investment Assets', href: '/commercial-property-for-investment-in-gurgaon' },
      { label: 'All Projects', href: '/projects' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Market Insights', href: '/insights' },
      { label: 'Compare Projects', href: '/compare' },
      { label: 'Commercial Tools', href: '/tools' },
      { label: 'Rental Yield Calculator', href: '/tools/rental-yield-calculator' },
      { label: 'About Smartz Spaces', href: '/about' },
      { label: 'Contact Advisory', href: '/contact' },
    ],
  },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-[#14213D] text-white overflow-hidden border-t border-white/10">
      {/* Subtle Architectural Skyline Illustration at Bottom Right */}
      <svg
        aria-hidden="true"
        viewBox="0 0 600 180"
        fill="none"
        className="pointer-events-none absolute right-0 bottom-0 w-[440px] sm:w-[540px] h-auto text-white opacity-[0.04]"
      >
        <rect x="40" y="75" width="38" height="105" fill="currentColor" />
        <rect x="90" y="35" width="46" height="145" fill="currentColor" />
        <rect x="148" y="60" width="40" height="120" fill="currentColor" />
        <rect x="200" y="18" width="52" height="162" fill="currentColor" />
        <polygon points="226,0 218,18 234,18" fill="currentColor" />
        <rect x="264" y="48" width="44" height="132" fill="currentColor" />
        <rect x="320" y="70" width="38" height="110" fill="currentColor" />
        <rect x="370" y="28" width="48" height="152" fill="currentColor" />
        <rect x="430" y="58" width="42" height="122" fill="currentColor" />
        <rect x="484" y="85" width="36" height="95" fill="currentColor" />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_2fr]">
          {/* Brand Info */}
          <div className="flex flex-col gap-5">
            <Logo inverted={true} />
            <p className="max-w-sm text-sm leading-relaxed text-slate-300">
              Independent commercial real estate advisory for Gurgaon and Delhi NCR. We assist investors and corporate
              occupiers with Grade A offices, high-street retail, SCO plots, and pre-leased assets backed by financial
              and location intelligence.
            </p>
            <div className="text-xs text-blue-300 font-semibold tracking-wide">
              Powered by {siteConfig.poweredBy}
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="size-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-200 hover:bg-[#DC2626] hover:border-[#DC2626] hover:text-white transition-colors"
              >
                <MessageCircle className="size-4" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="size-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-200 hover:bg-[#164EB7] hover:border-[#164EB7] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="size-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-200 hover:bg-[#DC2626] hover:border-[#DC2626] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="size-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-200 hover:bg-[#DC2626] hover:border-[#DC2626] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3v6Z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="size-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-slate-200 hover:bg-[#164EB7] hover:border-[#164EB7] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns + Corridors + Get in Touch */}
          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {columns.map((col) => (
                <nav key={col.title} aria-label={col.title}>
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                    {col.title}
                  </h3>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="text-xs sm:text-sm text-slate-300 hover:text-white transition-colors"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}

              {/* Corridors Column */}
              <nav aria-label="Commercial Corridors">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                  Corridors
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {locations.slice(0, 5).map((l) => (
                    <li key={l.slug}>
                      <Link
                        href={`/locations/${l.slug}`}
                        className="text-xs sm:text-sm text-slate-300 hover:text-white transition-colors"
                      >
                        {l.shortName}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/locations"
                      className="text-xs sm:text-sm font-semibold text-[#FF5252] hover:underline transition-colors"
                    >
                      View All Corridors &rarr;
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Contact Info Column */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                  Get in Touch
                </h3>
                <address className="mt-4 flex flex-col gap-3 text-xs sm:text-sm not-italic text-slate-300">
                  <span className="flex items-start gap-2">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-blue-300" aria-hidden="true" />
                    <span className="leading-snug">{fullAddress()}</span>
                  </span>
                  {siteConfig.contact.phones.map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <Phone className="size-3.5 shrink-0 text-blue-300" aria-hidden="true" />
                      <span>{p.display}</span>
                    </a>
                  ))}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center gap-2 hover:text-white transition-colors break-all"
                  >
                    <Mail className="size-3.5 shrink-0 text-blue-300" aria-hidden="true" />
                    <span>{siteConfig.contact.email}</span>
                  </a>
                </address>
              </div>
            </div>

            {/* A Digital Experience By EngageXpert */}
            <div className="mt-10 flex flex-wrap items-center justify-start sm:justify-end gap-3 pt-4 lg:mt-auto">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-slate-300 uppercase select-none">
                A DIGITAL EXPERIENCE BY
              </span>
              <a
                href="https://engagexpert.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-white/95 px-2.5 py-1 transition-transform duration-200 hover:scale-105 shadow-sm"
                title="EngageXpert - Let's Build Your Empire"
              >
                <Image
                  src="/images/engagexpert-logo.png"
                  alt="EngageXpert - Let's Build Your Empire"
                  width={130}
                  height={56}
                  className="h-6 sm:h-7 w-auto object-contain"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row text-xs text-slate-400">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Regulatory Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
