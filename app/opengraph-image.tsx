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
          background: 'linear-gradient(135deg, #1E4FA8 0%, #102C63 100%)',
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
            display: 'flex',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginRight: 12,
            }}
          >
            SMARTZ
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: '#EF4444',
              letterSpacing: '-0.02em',
            }}
          >
            SPACES
          </span>
        </div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: '#93C5FD',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: 32,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#E2E8F0',
            textAlign: 'center',
            maxWidth: 880,
            lineHeight: 1.5,
          }}
        >
          Commercial Real Estate Intelligence • Grade A Offices, Retail, SCO & Pre-Leased Assets in Gurgaon & Delhi NCR
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
