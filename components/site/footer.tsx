import Link from 'next/link'
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react'
import { fullAddress, siteConfig, whatsappHref } from '@/lib/site-config'
import { getLocations } from '@/lib/data'
import { Logo } from './logo'

const columns = [
  {
    title: 'Commercial Assets',
    links: [
      { label: 'Commercial Property in Gurgaon', href: '/commercial-property-in-gurgaon' },
      { label: 'Office Space in Gurgaon', href: '/office-space-in-gurgaon' },
      { label: 'Retail Property in Gurgaon', href: '/retail-property-in-gurgaon' },
      { label: 'SCO Plots in Gurgaon', href: '/sco-plots-in-gurgaon' },
      { label: 'Pre-Leased Commercial Assets', href: '/commercial-property-for-investment-in-gurgaon#pre-leased' },
      { label: 'Investment Properties in Gurgaon', href: '/commercial-property-for-investment-in-gurgaon' },
      { label: 'All Commercial Projects', href: '/projects' },
    ],
  },
  {
    title: 'Tools & Intelligence',
    links: [
      { label: 'Market Insights & Reports', href: '/insights' },
      { label: 'Compare Projects Side-by-Side', href: '/compare' },
      { label: 'Rental Yield Calculator', href: '/tools/rental-yield-calculator' },
      { label: 'Commercial EMI Calculator', href: '/tools/emi-calculator' },
      { label: 'SCO Investment Calculator', href: '/tools/sco-calculator' },
      { label: 'Commercial ROI Calculator', href: '/tools/roi-calculator' },
      { label: 'Buy vs Rent Analysis', href: '/tools/buy-vs-rent-calculator' },
      { label: 'Stamp Duty Calculator', href: '/tools/stamp-duty-calculator' },
    ],
  },
  {
    title: 'Advisory & Legal',
    links: [
      { label: 'About Smartz Spaces', href: '/about' },
      { label: 'Contact Advisory Team', href: '/contact' },
      { label: 'Request Property Shortlist', href: '/contact#shortlist' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Regulatory Disclaimer', href: '/disclaimer' },
    ],
  },
]

export function SiteFooter() {
  const locations = getLocations()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-blue-50 text-ink-900 border-t border-line-200">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Logo inverted={false} />
            <p className="max-w-sm text-sm leading-relaxed text-ink-900/80">
              Independent commercial real estate advisory for Gurgaon and Delhi NCR. We assist investors and corporate
              occupiers with Grade A offices, high-street retail, SCO plots, and pre-leased assets backed by financial
              and location intelligence.
            </p>
            <div className="text-xs text-blue-600 font-bold tracking-wide">
              Powered by {siteConfig.poweredBy}
            </div>

            <address className="flex flex-col gap-3 text-sm not-italic text-ink-900/85">
              <span className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-blue-600" aria-hidden="true" />
                <span className="leading-snug">{fullAddress()}</span>
              </span>
              {siteConfig.contact.phones.map((p) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="flex items-center gap-2.5 hover:text-blue-600 transition-colors"
                >
                  <Phone className="size-4 shrink-0 text-blue-600" aria-hidden="true" />
                  <span>{p.display}</span>
                </a>
              ))}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2.5 hover:text-blue-600 transition-colors"
              >
                <Mail className="size-4 shrink-0 text-blue-600" aria-hidden="true" />
                <span>{siteConfig.contact.email}</span>
              </a>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-blue-600 hover:text-red-600 transition-colors font-medium"
              >
                <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
                <span>WhatsApp Commercial Desk</span>
              </a>
            </address>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                  {col.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-xs sm:text-sm text-ink-900/75 hover:text-blue-600 transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Locations Column */}
            <nav aria-label="Commercial Corridors">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                Corridors
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {locations.map((l) => (
                  <li key={l.slug}>
                    <Link
                      href={`/locations/${l.slug}`}
                      className="text-xs sm:text-sm text-ink-900/75 hover:text-blue-600 transition-colors"
                    >
                      {l.shortName}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/locations"
                    className="text-xs sm:text-sm font-semibold text-red-600 hover:underline transition-colors"
                  >
                    View All Corridors &rarr;
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line-200 pt-8 sm:flex-row text-xs text-muted-600">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/disclaimer" className="hover:text-blue-600 transition-colors">
              Regulatory Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
