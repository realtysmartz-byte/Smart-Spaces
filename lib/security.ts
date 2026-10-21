import 'server-only'
import { createHash } from 'node:crypto'
import { headers } from 'next/headers'

type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()

/**
 * In-memory fixed-window rate limiter. Suitable for a single Node.js process
 * (Hostinger Node hosting). Use Redis if you scale to multiple instances.
 */
export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now()
  const bucket = buckets.get(key)
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    if (buckets.size > 5000) {
      for (const [k, b] of buckets) if (b.resetAt < now) buckets.delete(k)
    }
    return { ok: true, retryAfter: 0 }
  }
  bucket.count += 1
  return { ok: bucket.count <= limit, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) }
}

export async function getClientInfo() {
  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  const salt = process.env.IP_HASH_SALT || 'smartz-spaces'
  return {
    ip,
    ipHash: createHash('sha256').update(`${salt}:${ip}`).digest('hex'),
    userAgent: (h.get('user-agent') || '').slice(0, 255),
  }
}

/** Rejects bots that fill the honeypot or submit faster than a human could. */
export function looksLikeSpam(formData: FormData, minMs = 2500) {
  if (String(formData.get('company_website') || '').length > 0) return true
  const startedAt = Number(formData.get('startedAt'))
  if (!Number.isFinite(startedAt)) return true
  const elapsed = Date.now() - startedAt
  return elapsed < minMs || elapsed > 1000 * 60 * 60 * 6
}

/** Optional Cloudflare Turnstile verification. Skipped when no secret is configured. */
export async function verifyTurnstile(token: string | null, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (!token) return false
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    })
    const data = (await res.json()) as { success?: boolean }
    return Boolean(data.success)
  } catch {
    return false
  }
}
