import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/thank-you', '/search'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
