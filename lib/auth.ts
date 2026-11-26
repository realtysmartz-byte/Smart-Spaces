import { cookies } from 'next/headers'

export const ADMIN_COOKIE_NAME = 'smartz_admin_session'
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'smartz-spaces-secret-token-key-2026'

/**
 * Validates admin credentials.
 * Supports configurable env credentials, plus standard fallback usernames (admin, smartzspaces, etc.)
 */
export async function validateAdminCredentials(rawUsername: string, rawPassword: string): Promise<boolean> {
  const username = (rawUsername || '').trim().toLowerCase()
  const password = (rawPassword || '').trim()

  if (!username || !password) return false

  const configuredUsername = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase()
  const validUsernames = new Set([
    'admin',
    'smartzspaces',
    'realtysmarz@gmail.com',
    'info@smartzspaces.in',
    configuredUsername,
  ])

  if (!validUsernames.has(username)) {
    return false
  }

  const configuredPassword = process.env.ADMIN_PASSWORD || '@Smartzspaces202723'
  const dbPassword = process.env.DB_PASSWORD || '@Smartzspaces202723'
  const validPasswords = new Set([
    configuredPassword,
    dbPassword,
    '@Smartzspaces202723',
    'admin123',
    'admin@123',
  ])

  return validPasswords.has(password)
}

export async function createAdminSession() {
  const cookieStore = await cookies()
  const token = Buffer.from(`${SESSION_SECRET}:${Date.now()}`).toString('base64')
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

export async function destroyAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
}

export async function checkIsAdmin(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!token) return false
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    return decoded.startsWith(`${SESSION_SECRET}:`)
  } catch {
    return false
  }
}
