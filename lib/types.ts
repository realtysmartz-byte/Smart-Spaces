export type PropertyType = 'office' | 'retail' | 'sco' | 'pre-leased'

export type Possession = 'ready' | 'under-construction'

export type Faq = { question: string; answer: string }

export type Project = {
  slug: string
  name: string
  developer: string
  sector: string
  locationSlug: string
  types: PropertyType[]
  image: string
  imageAlt: string
  summary: string
  overview: string[]
  highlights: string[]
  /** Verified starting price in INR lakh. null = not yet verified. */
  startingPriceLakh: number | null
  sizes: string | null
  possession: Possession | null
  /** Verified expected gross rental yield range, e.g. [6, 8]. null = not assessed. */
  expectedYield: [number, number] | null
  /** Smartz Score out of 10 from an internal assessment. null = assessment pending. */
  smartzScore: number | null
  rera: string | null
  paymentPlan: string | null
  floorPlans: { label: string; image: string }[]
  gallery: { src: string; alt: string }[]
  locationAdvantages: string[]
  strengths: string[]
  risks: string[]
  verdict: string | null
  coords: { lat: number; lng: number }
  featured: boolean
  lastVerified: string | null
  updatedAt: string
}

export type InfrastructureItem = {
  title: string
  description: string
  source: string | null
  date: string | null
}

export type Location = {
  slug: string
  name: string
  shortName: string
  image: string
  summary: string
  overview: string[]
  coords: { lat: number; lng: number }
  connectivity: string[]
  landmarks: string[]
  categories: PropertyType[]
  avgPrice: string | null
  rentalRange: string | null
  infrastructure: InfrastructureItem[]
  strengths: string[]
  risks: string[]
  faqs: Faq[]
  updatedAt: string
}

export type ArticleCategory = {
  slug: string
  name: string
  description: string
}

export type ArticleSection = {
  id: string
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type Article = {
  slug: string
  category: string
  title: string
  excerpt: string
  author: { name: string; role: string }
  publishedAt: string
  updatedAt: string
  readingMinutes: number
  image: string
  imageAlt: string
  featured: boolean
  trending: boolean
  sections: ArticleSection[]
  relatedProjects?: string[]
  relatedLocations?: string[]
}

export type EnquiryStatus = 'new' | 'contacted' | 'qualified' | 'site-visit' | 'closed' | 'not-interested'

export type Enquiry = {
  id: number | string
  name: string
  phone: string
  email?: string | null
  message?: string | null
  investmentGoal?: string | null
  budget?: string | null
  preferredLocation?: string | null
  relatedProject?: string | null
  formType: string
  sourcePage?: string | null
  status: EnquiryStatus
  notes?: string | null
  createdAt: string
  updatedAt?: string | null
}

export type SiteSettings = {
  phone: string
  phoneSecondary?: string
  whatsapp: string
  email: string
  address: string
  reraNumber: string
  heroTagline: string
}
