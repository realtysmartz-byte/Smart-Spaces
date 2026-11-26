import type { Metadata, Viewport } from 'next'
import { siteConfig } from '@/lib/site-config'
import { LayoutWrapper } from '@/components/site/layout-wrapper'
import { Analytics } from '@/components/site/analytics'
import { JsonLd } from '@/components/seo/json-ld'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Commercial Property in Gurgaon & Delhi NCR | Smartz Spaces',
    template: '%s | Smartz Spaces',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'commercial property in Gurgaon',
    'office space in Gurgaon',
    'retail shops Gurgaon',
    'SCO plots Gurgaon',
    'pre-leased property Gurgaon',
    'commercial real estate Delhi NCR',
  ],
  authors: [{ name: siteConfig.name }],
  publisher: siteConfig.poweredBy,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: siteConfig.name,
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  verification: siteConfig.analytics.gscVerification ? { google: siteConfig.analytics.gscVerification } : undefined,
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.contact.phones[0].tel,
  email: siteConfig.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${siteConfig.contact.address.line1}, ${siteConfig.contact.address.line2}`,
    addressLocality: siteConfig.contact.address.city,
    addressRegion: siteConfig.contact.address.region,
    postalCode: siteConfig.contact.address.postalCode,
    addressCountry: siteConfig.contact.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.contact.geo.lat,
    longitude: siteConfig.contact.geo.lng,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '10:00',
    closes: '19:00',
  },
  priceRange: '₹₹₹',
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.url}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className="bg-background font-sans">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh antialiased flex flex-col font-sans">
        <LayoutWrapper>{children}</LayoutWrapper>
        <Analytics />
        <JsonLd data={organizationSchema} />
        <JsonLd data={webSiteSchema} />
      </body>
    </html>
  )
}
