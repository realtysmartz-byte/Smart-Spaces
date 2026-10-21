import type { Metadata } from 'next'
import { siteConfig, fullAddress } from '@/lib/site-config'
import type { Article, Faq, Project } from '@/lib/types'
import { propertyTypeLabels } from '@/lib/data/content'

export function absoluteUrl(path = '/') {
  return `${siteConfig.url}${path === '/' ? '' : path}`
}

type PageMetaInput = {
  title: string
  description: string
  path: string
  image?: string
  noindex?: boolean
  type?: 'website' | 'article'
}

export function pageMetadata({ title, description, path, image, noindex, type = 'website' }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type,
      siteName: siteConfig.name,
      locale: 'en_IN',
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, ...(image ? { images: [image] } : {}) },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  }
}

export function formatPrice(lakh: number | null) {
  if (lakh == null) return null
  if (lakh >= 100) return `₹${(lakh / 100).toFixed(lakh % 100 === 0 ? 0 : 2)} Cr`
  return `₹${lakh} Lakh`
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

/* ---------- JSON-LD builders ---------- */

const orgId = `${siteConfig.url}/#organization`

export function organizationSchema() {
  const a = siteConfig.contact.address
  return {
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'LocalBusiness'],
    '@id': orgId,
    name: siteConfig.name,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: absoluteUrl('/icon.svg'),
    image: absoluteUrl('/images/hero-gurgaon-skyline.png'),
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phones.map((p) => p.tel),
    parentOrganization: { '@type': 'Organization', name: siteConfig.poweredBy },
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${a.line1}, ${a.line2}`,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: siteConfig.contact.geo.lat, longitude: siteConfig.contact.geo.lng },
    areaServed: siteConfig.serviceArea.map((name) => ({ '@type': 'City', name })),
    sameAs: siteConfig.social.map((s) => s.href),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { '@id': orgId },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${siteConfig.url}/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function articleSchema(article: Article, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: absoluteUrl(article.image),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { '@type': 'Organization', name: article.author.name, url: siteConfig.url },
    publisher: { '@id': orgId },
    mainEntityOfPage: absoluteUrl(path),
    inLanguage: 'en-IN',
  }
}

/** Only includes fields backed by verified data — no prices or ratings unless present. */
export function projectSchema(project: Project, path: string) {
  const offer =
    project.startingPriceLakh != null
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: project.startingPriceLakh * 100000,
            availability: 'https://schema.org/InStock',
          },
        }
      : {}
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: project.name,
    description: project.summary,
    url: absoluteUrl(path),
    image: absoluteUrl(project.image),
    datePosted: project.updatedAt,
    about: {
      '@type': 'Place',
      name: project.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: `${project.sector}, Gurugram`,
        addressRegion: 'Haryana',
        addressCountry: 'IN',
      },
      geo: { '@type': 'GeoCoordinates', latitude: project.coords.lat, longitude: project.coords.lng },
    },
    keywords: project.types.map((t) => propertyTypeLabels[t]).join(', '),
    provider: { '@id': orgId },
    ...offer,
  }
}

export { fullAddress }
