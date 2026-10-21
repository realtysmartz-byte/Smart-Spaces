import { z } from 'zod'

export const formTypes = [
  'contact',
  'property',
  'consultation',
  'brochure',
  'report',
  'shortlist',
  'investment-strategy',
  'investment-report',
  'location-enquiry',
  'office-enquiry',
  'retail-enquiry',
  'sco-enquiry',
  'project-enquiry',
  'buy-vs-rent-enquiry',
  'financing-enquiry',
  'yield-enquiry',
  'roi-enquiry',
] as const
export type FormType = (typeof formTypes)[number]

export const followUpStatuses = ['new', 'contacted', 'qualified', 'site-visit', 'closed', 'not-interested'] as const
export type FollowUpStatus = (typeof followUpStatuses)[number]

export const followUpLabels: Record<FollowUpStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  'site-visit': 'Site Visit',
  closed: 'Closed',
  'not-interested': 'Not Interested',
}

export const formTypeLabels: Record<FormType, string> = {
  contact: 'General contact',
  property: 'Property enquiry',
  consultation: 'Consultation',
  brochure: 'Brochure request',
  report: 'Investment report',
  shortlist: 'Shortlist request',
  'investment-strategy': 'Investment strategy',
  'investment-report': 'Investment report',
  'location-enquiry': 'Location enquiry',
  'office-enquiry': 'Office enquiry',
  'retail-enquiry': 'Retail enquiry',
  'sco-enquiry': 'SCO enquiry',
  'project-enquiry': 'Project enquiry',
  'buy-vs-rent-enquiry': 'Buy vs Rent enquiry',
  'financing-enquiry': 'Financing enquiry',
  'yield-enquiry': 'Yield enquiry',
  'roi-enquiry': 'ROI enquiry',
}

/** Strips control characters and angle brackets, collapses whitespace. */
export function sanitize(value: string) {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

const clean = (max: number) => z.string().trim().max(max).transform(sanitize)
const optionalClean = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? sanitize(v) || null : null))

/** Indian mobile: optional +91 / 0 prefix, then 10 digits starting 6-9. */
export const indianPhone = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s\-()]/g, ''))
  .refine((v) => /^(?:\+91|91|0)?[6-9]\d{9}$/.test(v), 'Enter a valid 10-digit Indian mobile number')
  .transform((v) => `+91${v.slice(-10)}`)

export const enquirySchema = z.object({
  name: clean(100).pipe(z.string().min(2, 'Please enter your name')),
  phone: indianPhone,
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(150)
    .optional()
    .transform((v) => v || null)
    .refine((v) => v === null || z.email().safeParse(v).success, 'Enter a valid email address'),
  message: optionalClean(2000),
  investmentGoal: optionalClean(100),
  budget: optionalClean(50),
  preferredLocation: optionalClean(100),
  relatedProject: optionalClean(100),
  formType: z.enum(formTypes),
  sourcePage: z
    .string()
    .trim()
    .max(255)
    .optional()
    .transform((v) => (v && v.startsWith('/') ? v : null)),
})

export type EnquiryInput = z.input<typeof enquirySchema>

export const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().max(150).pipe(z.email('Enter a valid email address')),
  sourcePage: z.string().trim().max(255).optional(),
})

export type FormState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string; fieldErrors?: Record<string, string> }

export function fieldErrorsFrom(error: z.ZodError) {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form')
    if (!out[key]) out[key] = issue.message
  }
  return out
}
