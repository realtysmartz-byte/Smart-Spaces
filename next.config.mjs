const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://smartzspaces.in'
const siteHost = new URL(siteUrl).host

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  {
    key: 'Content-Security-Policy-Report-Only',
    value: [
      "default-src 'self'",
      "img-src 'self' data: blob: https://*.tile.openstreetmap.org https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com",
      "font-src 'self' data:",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  async redirects() {
    return [
      // www → non-www (only active when requests arrive on the www host)
      {
        source: '/:path*',
        has: [{ type: 'host', value: `www.${siteHost.replace(/^www\./, '')}` }],
        destination: `${siteUrl.replace('://www.', '://')}/:path*`,
        permanent: true,
      },
      { source: '/commercial-property', destination: '/commercial-property-in-gurgaon', permanent: true },
      { source: '/office-space', destination: '/office-space-in-gurgaon', permanent: true },
      { source: '/sco-plots', destination: '/sco-plots-in-gurgaon', permanent: true },
    ]
  },
}

export default nextConfig
