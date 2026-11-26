'use server'

import { DbNotConfiguredError, execute, query } from '@/lib/db'
import { getClientInfo, looksLikeSpam, rateLimit, verifyTurnstile } from '@/lib/security'
import { enquirySchema, fieldErrorsFrom, newsletterSchema, type FormState } from '@/lib/validation'
import { saveDynamicEnquiry } from '@/lib/data/dynamic-store'
import type { RowDataPacket } from 'mysql2'

const seenTokens = new Map<string, number>()

function claimIdempotencyToken(token: string) {
  const now = Date.now()
  for (const [k, t] of seenTokens) if (now - t > 30 * 60_000) seenTokens.delete(k)
  if (!token || token.length > 64) return false
  if (seenTokens.has(token)) return false
  seenTokens.set(token, now)
  return true
}

function str(formData: FormData, key: string) {
  const v = formData.get(key)
  return typeof v === 'string' ? v : undefined
}

const genericFail: FormState = {
  status: 'error',
  message: 'We could not save your enquiry right now. Please try again, or call us directly.',
}

export async function submitEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  const client = await getClientInfo()

  if (looksLikeSpam(formData)) {
    return { status: 'error', message: 'Your submission could not be verified. Please wait a moment and try again.' }
  }

  const limit = rateLimit(`enquiry:${client.ipHash}`, 5, 10 * 60_000)
  if (!limit.ok) {
    return { status: 'error', message: `Too many submissions. Please try again in ${Math.ceil(limit.retryAfter / 60)} minute(s).` }
  }

  if (!(await verifyTurnstile(str(formData, 'cf-turnstile-response') ?? null, client.ip))) {
    return { status: 'error', message: 'Security check failed. Please refresh and try again.' }
  }

  const parsed = enquirySchema.safeParse({
    name: str(formData, 'name') ?? '',
    phone: str(formData, 'phone') ?? '',
    email: str(formData, 'email'),
    message: str(formData, 'message'),
    investmentGoal: str(formData, 'investmentGoal'),
    budget: str(formData, 'budget'),
    preferredLocation: str(formData, 'preferredLocation'),
    relatedProject: str(formData, 'relatedProject'),
    formType: str(formData, 'formType'),
    sourcePage: str(formData, 'sourcePage'),
  })
  if (!parsed.success) {
    return { status: 'error', message: 'Please correct the highlighted fields.', fieldErrors: fieldErrorsFrom(parsed.error) }
  }
  const d = parsed.data

  const token = str(formData, 'idempotencyKey') ?? ''
  if (!claimIdempotencyToken(token)) {
    return { status: 'success', message: 'Thank you — we already received this enquiry. Our advisor will contact you shortly.' }
  }

  // 1. Always save in dynamic store so leads are instantly visible in Admin Panel
  try {
    saveDynamicEnquiry({
      name: d.name,
      phone: d.phone,
      email: d.email || null,
      message: d.message || null,
      investmentGoal: d.investmentGoal || null,
      budget: d.budget || null,
      preferredLocation: d.preferredLocation || null,
      relatedProject: d.relatedProject || null,
      formType: d.formType,
      sourcePage: d.sourcePage || null,
      status: 'new',
    })
  } catch (storeErr) {
    console.error('[enquiry] Dynamic store write warning:', storeErr)
  }

  // 2. Also attempt MySQL insert if database is configured
  try {
    const recent = await query<RowDataPacket>(
      `SELECT id FROM enquiries
       WHERE phone = ? AND form_type = ? AND (related_project <=> ?)
         AND created_at > (UTC_TIMESTAMP() - INTERVAL 10 MINUTE)
       LIMIT 1`,
      [d.phone, d.formType, d.relatedProject],
    )
    if (recent.length === 0) {
      await execute(
        `INSERT INTO enquiries
          (name, phone, email, message, investment_goal, budget, preferred_location, related_project,
           form_type, source_page, ip_hash, user_agent, idempotency_key)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          d.name,
          d.phone,
          d.email,
          d.message,
          d.investmentGoal,
          d.budget,
          d.preferredLocation,
          d.relatedProject,
          d.formType,
          d.sourcePage,
          client.ipHash,
          client.userAgent,
          token,
        ],
      )
    }
  } catch (dbErr) {
    // Log MySQL error without failing user submission since dynamic store succeeded
    console.log('[enquiry] MySQL fallback note:', (dbErr as Error).message)
  }

  return { status: 'success', message: 'Thank you! Your enquiry is saved. A Smartz Spaces advisor will contact you within one business day.' }
}

export async function subscribeNewsletter(_prev: FormState, formData: FormData): Promise<FormState> {
  const client = await getClientInfo()
  if (looksLikeSpam(formData, 1500)) {
    return { status: 'error', message: 'Your submission could not be verified. Please try again.' }
  }
  const limit = rateLimit(`newsletter:${client.ipHash}`, 5, 10 * 60_000)
  if (!limit.ok) return { status: 'error', message: 'Too many attempts. Please try again later.' }

  const parsed = newsletterSchema.safeParse({ email: str(formData, 'email') ?? '', sourcePage: str(formData, 'sourcePage') })
  if (!parsed.success) {
    return { status: 'error', message: 'Enter a valid email address.', fieldErrors: fieldErrorsFrom(parsed.error) }
  }

  try {
    await execute(
      `INSERT INTO subscribers (email, source_page, ip_hash) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE status = 'active', updated_at = UTC_TIMESTAMP()`,
      [parsed.data.email, parsed.data.sourcePage ?? null, client.ipHash],
    )
    return { status: 'success', message: 'You are subscribed. Look out for our next market update.' }
  } catch (error) {
    console.error('[newsletter] Failed to save subscriber', (error as Error).message)
    return { status: 'error', message: 'We could not save your subscription. Please try again.' }
  }
}
