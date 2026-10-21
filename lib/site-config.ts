export const siteConfig = {
  name: 'Smartz Spaces',
  tagline: 'Commercial Real Estate Intelligence',
  poweredBy: 'Realty Smartz Private Limited',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://smartzspaces.in').replace(/\/$/, ''),
  description:
    'Smartz Spaces is a commercial real estate advisory for Gurgaon and Delhi NCR — office spaces, retail shops, SCO plots, pre-leased properties and investment assets, backed by location research and investment analysis.',
  serviceArea: ['Gurgaon', 'Gurugram', 'Delhi NCR'],
  contact: {
    phones: [
      { display: '+91 9650 550 411', tel: '+919650550411' },
      { display: '+91 8010 841 841', tel: '+918010841841' },
    ],
    email: 'info@smartzspaces.in',
    whatsapp: '919650550411',
    whatsappMessage:
      'Hi Smartz Spaces, I am interested in commercial property in Gurgaon. Please share options.',
    address: {
      line1: '11th Floor, Spaze Palazo',
      line2: 'Golf Course Extension Road, Sector 69',
      city: 'Gurugram',
      region: 'Haryana',
      postalCode: '122001',
      country: 'IN',
    },
    // TODO: verify exact office coordinates before launch
    geo: { lat: 28.3953, lng: 77.0353 },
    hours: 'Mo-Sa 10:00-19:00',
  },
  // TODO: replace with verified social profile URLs (MISSING_DATA.md)
  social: [] as { label: string; href: string }[],
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || '',
    gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',
  },
} as const

export const mainNav = [
  { label: 'Properties', href: '/projects' },
  { label: 'Offices', href: '/office-space-in-gurgaon' },
  { label: 'Retail', href: '/retail-property-in-gurgaon' },
  { label: 'SCO', href: '/sco-plots-in-gurgaon' },
  { label: 'Investment', href: '/commercial-property-for-investment-in-gurgaon' },
  { label: 'Locations', href: '/locations' },
  { label: 'Insights', href: '/insights' },
  { label: 'Tools', href: '/tools' },
  { label: 'About', href: '/about' },
] as const

export function fullAddress() {
  const a = siteConfig.contact.address
  return `${a.line1}, ${a.line2}, ${a.city}, ${a.region} ${a.postalCode}`
}

export function whatsappHref(message: string = siteConfig.contact.whatsappMessage) {
  return `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`
}
