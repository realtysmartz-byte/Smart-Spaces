import 'server-only'
import fs from 'fs'
import path from 'path'
import { projects as fallbackProjects } from './projects'
import { siteConfig } from '../site-config'
import type { Project, Enquiry, EnquiryStatus, SiteSettings } from '../types'

const DATA_DIR = path.join(process.cwd(), 'data')
const PROJECTS_JSON_FILE = path.join(DATA_DIR, 'projects.json')
const PROJECTS_TS_FILE = path.join(process.cwd(), 'lib', 'data', 'projects.ts')
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json')
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json')

function ensureDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

// -------------------------------------------------------------
// PROJECTS STORE
// -------------------------------------------------------------
export function getDynamicProjects(): Project[] {
  ensureDirectory()
  if (fs.existsSync(PROJECTS_JSON_FILE)) {
    try {
      const raw = fs.readFileSync(PROJECTS_JSON_FILE, 'utf-8')
      const parsed = JSON.parse(raw) as Project[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    } catch (e) {
      console.error('[dynamic-store] Error reading projects.json', e)
    }
  }

  // Fallback to initial projects and write initial JSON
  try {
    fs.writeFileSync(PROJECTS_JSON_FILE, JSON.stringify(fallbackProjects, null, 2), 'utf-8')
  } catch (err) {
    console.error('[dynamic-store] Error writing initial projects.json', err)
  }
  return fallbackProjects
}

export function getDynamicProject(slug: string): Project | undefined {
  const all = getDynamicProjects()
  return all.find((p) => p.slug === slug)
}

function syncProjectsToTsFile(allProjects: Project[]) {
  try {
    const tsContent = `import type { Project } from '@/lib/types'

/**
 * Real commercial real estate projects listed on Smartz Spaces and verified via official RERA records,
 * developer disclosures, and Google real estate intelligence.
 */
export const projects: Project[] = ${JSON.stringify(allProjects, null, 2)}
`
    fs.writeFileSync(PROJECTS_TS_FILE, tsContent, 'utf-8')
  } catch (err) {
    console.error('[dynamic-store] Warning: Could not sync to projects.ts', err)
  }
}

export function saveDynamicProject(project: Project): Project {
  ensureDirectory()
  const all = getDynamicProjects()
  const index = all.findIndex((p) => p.slug === project.slug)

  const updated: Project = {
    ...project,
    updatedAt: new Date().toISOString().split('T')[0],
  }

  if (index >= 0) {
    all[index] = updated
  } else {
    all.unshift(updated)
  }

  fs.writeFileSync(PROJECTS_JSON_FILE, JSON.stringify(all, null, 2), 'utf-8')
  syncProjectsToTsFile(all)
  return updated
}

export function deleteDynamicProject(slug: string): boolean {
  ensureDirectory()
  const all = getDynamicProjects()
  const filtered = all.filter((p) => p.slug !== slug)
  if (filtered.length === all.length) return false
  fs.writeFileSync(PROJECTS_JSON_FILE, JSON.stringify(filtered, null, 2), 'utf-8')
  syncProjectsToTsFile(filtered)
  return true
}

// -------------------------------------------------------------
// ENQUIRIES / LEADS STORE
// -------------------------------------------------------------
const defaultEnquiries: Enquiry[] = [
  {
    id: 101,
    name: 'Rajesh Malhotra',
    phone: '9811234567',
    email: 'rajesh.malhotra@corpindia.com',
    formType: 'project-enquiry',
    relatedProject: 'the-omaxe-state',
    budget: '1-2cr',
    preferredLocation: 'delhi-ncr',
    investmentGoal: 'capital-appreciation',
    message: 'Interested in retail shop investment at The Omaxe State Dwarka. Please share payment plans.',
    status: 'new',
    notes: 'Called once, requested brochure on WhatsApp.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
  },
  {
    id: 102,
    name: 'Amitabh Sharma',
    phone: '9871098765',
    email: 'amitabh.s@venturecap.in',
    formType: 'investment-strategy',
    relatedProject: 'm3m-ifc',
    budget: '2-5cr',
    preferredLocation: 'golf-course-extension-road',
    investmentGoal: 'rental-income',
    message: 'Looking for Grade A pre-leased corporate office space with >7.5% net yield.',
    status: 'contacted',
    notes: 'Follow up on Friday 3 PM with presentation on M3M IFC.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 18).toISOString(),
  },
  {
    id: 103,
    name: 'Vikram Sethi',
    phone: '9910022334',
    email: 'vikram.sethi@gmail.com',
    formType: 'shortlist',
    relatedProject: 'emaar-business-district-83',
    budget: '3-5cr',
    preferredLocation: 'new-gurgaon',
    investmentGoal: 'self-use',
    message: 'Need 120-150 sq.yd. SCO plot for corporate clinic headquarter.',
    status: 'qualified',
    notes: 'Customer visited site once; comparing EBD 83 with Whiteland 71.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 36).toISOString(),
  },
  {
    id: 104,
    name: 'Pooja Aggarwal',
    phone: '9818811223',
    email: 'pooja.a@retailholdings.com',
    formType: 'project-enquiry',
    relatedProject: 'omaxe-chowk',
    budget: '2-5cr',
    preferredLocation: 'delhi-ncr',
    investmentGoal: 'rental-income',
    message: 'Looking for high footfall food court unit or ground floor jewellery shop.',
    status: 'site-visit',
    notes: 'Site visit confirmed for Saturday 11:30 AM at Chandni Chowk.',
    createdAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
  },
]

export function getDynamicEnquiries(): Enquiry[] {
  ensureDirectory()
  if (!fs.existsSync(ENQUIRIES_FILE)) {
    try {
      fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(defaultEnquiries, null, 2), 'utf-8')
      return defaultEnquiries
    } catch (e) {
      console.error('[dynamic-store] Error initializing enquiries.json', e)
      return defaultEnquiries
    }
  }

  try {
    const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf-8')
    const parsed = JSON.parse(raw) as Enquiry[]
    return Array.isArray(parsed) ? parsed : defaultEnquiries
  } catch (e) {
    console.error('[dynamic-store] Error reading enquiries.json', e)
    return defaultEnquiries
  }
}

export function saveDynamicEnquiry(
  data: Omit<Enquiry, 'id' | 'createdAt' | 'status'> & { status?: EnquiryStatus },
): Enquiry {
  ensureDirectory()
  const all = getDynamicEnquiries()
  const newEnquiry: Enquiry = {
    ...data,
    id: Date.now(),
    status: data.status || 'new',
    createdAt: new Date().toISOString(),
  }

  all.unshift(newEnquiry)
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(all, null, 2), 'utf-8')
  return newEnquiry
}

export function updateDynamicEnquiry(
  id: number | string,
  updates: Partial<Pick<Enquiry, 'status' | 'notes'>>,
): Enquiry | null {
  ensureDirectory()
  const all = getDynamicEnquiries()
  const index = all.findIndex((e) => String(e.id) === String(id))
  if (index === -1) return null

  all[index] = {
    ...all[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }

  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(all, null, 2), 'utf-8')
  return all[index]
}

export function deleteDynamicEnquiry(id: number | string): boolean {
  ensureDirectory()
  const all = getDynamicEnquiries()
  const filtered = all.filter((e) => String(e.id) !== String(id))
  if (filtered.length === all.length) return false
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(filtered, null, 2), 'utf-8')
  return true
}

// -------------------------------------------------------------
// SITE SETTINGS STORE
// -------------------------------------------------------------
const defaultSettings: SiteSettings = {
  phone: siteConfig.contact.phones[0]?.display || '+91 8144 081 081',
  phoneSecondary: '',
  whatsapp: siteConfig.contact.whatsapp || '918144081081',
  email: siteConfig.contact.email || 'info@smartzspaces.in',
  address: '11th Floor, Spaze Palazo, Golf Course Extension Road, Sector 69, Gurugram, Haryana 122001',
  reraNumber: 'RC/HARERA/GGM/2024/COMM-RE-109',
  heroTagline: 'Commercial Real Estate Intelligence for Gurgaon & Delhi NCR',
}

export function getDynamicSettings(): SiteSettings {
  ensureDirectory()
  if (!fs.existsSync(SETTINGS_FILE)) {
    try {
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2), 'utf-8')
      return defaultSettings
    } catch {
      return defaultSettings
    }
  }

  try {
    const raw = fs.readFileSync(SETTINGS_FILE, 'utf-8')
    const parsed = JSON.parse(raw)
    return { ...defaultSettings, ...parsed }
  } catch {
    return defaultSettings
  }
}

export function updateDynamicSettings(settings: Partial<SiteSettings>): SiteSettings {
  ensureDirectory()
  const current = getDynamicSettings()
  const updated = { ...current, ...settings }
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2), 'utf-8')
  return updated
}
