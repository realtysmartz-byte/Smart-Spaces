import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/site-config'

export const runtime = 'nodejs'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0e3b36',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#f7f5f0',
            letterSpacing: '-0.02em',
            marginBottom: 20,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#c08a3e',
            marginBottom: 40,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#e6efe9',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.5,
          }}
        >
          Commercial Real Estate Advisory for Gurgaon & Delhi NCR
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
