'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Building2,
  Users,
  LayoutDashboard,
  Settings,
  Plus,
  Search,
  Download,
  Phone,
  MessageSquare,
  Mail,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  X,
  LogOut,
  RefreshCw,
  TrendingUp,
  FileSpreadsheet,
  Upload,
  Image as ImageIcon,
  Loader2,
  Eye,
  Calendar,
  Globe,
  Tag,
  Briefcase,
  AlertCircle,
  HelpCircle,
  Check,
} from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Project, Enquiry, EnquiryStatus, SiteSettings, PropertyType, Possession } from '@/lib/types'

interface AdminDashboardProps {
  initialProjects: Project[]
  initialEnquiries: Enquiry[]
  initialSettings: SiteSettings
}

const statusColors: Record<EnquiryStatus, { bg: string; text: string; label: string }> = {
  new: { bg: 'bg-blue-500/10 text-blue-700 border-blue-300', text: 'text-blue-700', label: 'New' },
  contacted: { bg: 'bg-amber-500/10 text-amber-700 border-amber-300', text: 'text-amber-700', label: 'Contacted' },
  qualified: { bg: 'bg-emerald-500/10 text-emerald-700 border-emerald-300', text: 'text-emerald-700', label: 'Qualified' },
  'site-visit': { bg: 'bg-purple-500/10 text-purple-700 border-purple-300', text: 'text-purple-700', label: 'Site Visit' },
  closed: { bg: 'bg-emerald-50 text-emerald-800 border-emerald-300', text: 'text-emerald-800', label: 'Closed / Won' },
  'not-interested': { bg: 'bg-red-500/10 text-red-700 border-red-300', text: 'text-red-700', label: 'Not Interested' },
}

const corridorOptions = [
  { slug: 'golf-course-road', name: 'Golf Course Road' },
  { slug: 'golf-course-extension-road', name: 'Golf Course Extension Road' },
  { slug: 'southern-peripheral-road', name: 'Southern Peripheral Road (SPR)' },
  { slug: 'dwarka-expressway', name: 'Dwarka Expressway' },
  { slug: 'sohna-road', name: 'Sohna Road' },
  { slug: 'new-gurgaon', name: 'New Gurgaon' },
  { slug: 'manesar', name: 'Manesar' },
  { slug: 'delhi-ncr', name: 'Delhi NCR' },
]

export function AdminDashboard({
  initialProjects,
  initialEnquiries,
  initialSettings,
}: AdminDashboardProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'enquiries' | 'projects' | 'settings'>('dashboard')

  // Main state
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries)
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [settings, setSettings] = useState<SiteSettings>(initialSettings)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Enquiries search & filter
  const [enquirySearch, setEnquirySearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  // Details Modal
  const [selectedEnquiryForDetails, setSelectedEnquiryForDetails] = useState<Enquiry | null>(null)

  // Note Modal State
  const [selectedEnquiryForNotes, setSelectedEnquiryForNotes] = useState<Enquiry | null>(null)
  const [noteText, setNoteText] = useState('')

  // Projects search & filter
  const [projectSearch, setProjectSearch] = useState('')
  const [projectCorridorFilter, setProjectCorridorFilter] = useState('all')
  const [projectTypeFilter, setProjectTypeFilter] = useState<string>('all')

  // Project Editor Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [isUploadingGallery, setIsUploadingGallery] = useState(false)
  const primaryFileInputRef = useRef<HTMLInputElement>(null)
  const galleryFileInputRef = useRef<HTMLInputElement>(null)

  // Multi-line text form states for seamless editing
  const [overviewText, setOverviewText] = useState('')
  const [highlightsText, setHighlightsText] = useState('')
  const [strengthsText, setStrengthsText] = useState('')
  const [risksText, setRisksText] = useState('')
  const [locationAdvantagesText, setLocationAdvantagesText] = useState('')

  // Floor plan inputs
  const [floorPlanLabel, setFloorPlanLabel] = useState('')
  const [floorPlanImage, setFloorPlanImage] = useState('')

  const [projectFormData, setProjectFormData] = useState<Partial<Project>>({
    name: '',
    slug: '',
    developer: '',
    sector: '',
    locationSlug: 'golf-course-road',
    types: ['retail'],
    image: '/images/category-retail.png',
    imageAlt: '',
    summary: '',
    overview: [''],
    highlights: [''],
    startingPriceLakh: 50,
    sizes: '500 - 1,500 sq.ft.',
    possession: 'under-construction',
    expectedYield: [7.5, 9.0],
    smartzScore: 8.8,
    rera: '',
    paymentPlan: 'Construction Linked Plan',
    floorPlans: [],
    gallery: [{ src: '/images/category-retail.png', alt: 'Gallery image' }],
    locationAdvantages: ['High visibility on main road'],
    strengths: ['High footfall potential'],
    risks: ['Under development timeline'],
    verdict: 'Recommended commercial asset.',
    coords: { lat: 28.4595, lng: 77.0266 },
    featured: false,
  })

  // Prevent background scrolling when any modal is open
  useEffect(() => {
    if (isProjectModalOpen || selectedEnquiryForNotes || selectedEnquiryForDetails) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isProjectModalOpen, selectedEnquiryForNotes, selectedEnquiryForDetails])

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  // Primary image upload handler
  const handleUploadPrimaryImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploadingImage(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: fd,
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setProjectFormData((prev) => ({
          ...prev,
          image: data.url,
          imageAlt: prev.imageAlt || `${prev.name || 'Project'} front elevation photo`,
        }))
        showToast('Main elevation image uploaded successfully!')
      } else {
        alert(data.message || 'Image upload failed')
      }
    } catch {
      alert('Failed to upload image')
    } finally {
      setIsUploadingImage(false)
      if (e.target) e.target.value = ''
    }
  }

  // Gallery images upload handler
  const handleUploadGalleryImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setIsUploadingGallery(true)
    try {
      const newItems: { src: string; alt: string }[] = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fd = new FormData()
        fd.append('file', file)
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: fd,
        })
        const data = await res.json()
        if (res.ok && data.success) {
          newItems.push({
            src: data.url,
            alt: `${projectFormData.name || 'Project'} photo ${i + 1}`,
          })
        }
      }
      if (newItems.length > 0) {
        setProjectFormData((prev) => ({
          ...prev,
          gallery: [...(prev.gallery || []), ...newItems],
        }))
        showToast(`${newItems.length} gallery image(s) uploaded!`)
      }
    } catch {
      alert('Failed to upload gallery images')
    } finally {
      setIsUploadingGallery(false)
      if (e.target) e.target.value = ''
    }
  }

  const handleRemoveGalleryImage = (indexToRemove: number) => {
    setProjectFormData((prev) => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== indexToRemove),
    }))
  }

  // Floor plan helpers
  const handleAddFloorPlan = () => {
    if (!floorPlanLabel.trim()) return
    const newPlan = {
      label: floorPlanLabel.trim(),
      image: floorPlanImage.trim() || '/images/category-retail.png',
    }
    setProjectFormData((prev) => ({
      ...prev,
      floorPlans: [...(prev.floorPlans || []), newPlan],
    }))
    setFloorPlanLabel('')
    setFloorPlanImage('')
  }

  const handleRemoveFloorPlan = (index: number) => {
    setProjectFormData((prev) => ({
      ...prev,
      floorPlans: (prev.floorPlans || []).filter((_, i) => i !== index),
    }))
  }

  // Refresh data
  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      const [resEnq, resProj, resSet] = await Promise.all([
        fetch('/api/admin/enquiries'),
        fetch('/api/admin/projects'),
        fetch('/api/admin/settings'),
      ])
      if (resEnq.ok) {
        const d = await resEnq.json()
        if (d.enquiries) setEnquiries(d.enquiries)
      }
      if (resProj.ok) {
        const d = await resProj.json()
        if (d.projects) setProjects(d.projects)
      }
      if (resSet.ok) {
        const d = await resSet.json()
        if (d.settings) setSettings(d.settings)
      }
      showToast('All real-time data refreshed')
    } catch {
      showToast('Failed to refresh data')
    } finally {
      setIsRefreshing(false)
    }
  }

  // Status Change
  const handleStatusChange = async (enquiryId: number | string, newStatus: EnquiryStatus) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${enquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (String(e.id) === String(enquiryId) ? { ...e, status: newStatus } : e)),
        )
        if (selectedEnquiryForDetails && String(selectedEnquiryForDetails.id) === String(enquiryId)) {
          setSelectedEnquiryForDetails((prev) => (prev ? { ...prev, status: newStatus } : null))
        }
        showToast(`Lead marked as ${statusColors[newStatus].label}`)
      }
    } catch {
      showToast('Failed to update status')
    }
  }

  // Save Follow-up Notes
  const handleSaveNotes = async () => {
    const target = selectedEnquiryForNotes || selectedEnquiryForDetails
    if (!target) return
    try {
      const res = await fetch(`/api/admin/enquiries/${target.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: noteText }),
      })
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (String(e.id) === String(target.id) ? { ...e, notes: noteText } : e)),
        )
        if (selectedEnquiryForDetails && String(selectedEnquiryForDetails.id) === String(target.id)) {
          setSelectedEnquiryForDetails((prev) => (prev ? { ...prev, notes: noteText } : null))
        }
        showToast('Follow-up notes updated')
        setSelectedEnquiryForNotes(null)
      }
    } catch {
      showToast('Failed to save notes')
    }
  }

  // Delete Enquiry
  const handleDeleteEnquiry = async (id: number | string) => {
    if (!window.confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) return
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => String(e.id) !== String(id)))
        if (selectedEnquiryForDetails && String(selectedEnquiryForDetails.id) === String(id)) {
          setSelectedEnquiryForDetails(null)
        }
        showToast('Enquiry deleted successfully')
      }
    } catch {
      showToast('Failed to delete enquiry')
    }
  }

  // Export Enquiries to CSV
  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Date & Time',
      'Name',
      'Phone',
      'Email',
      'Form Type',
      'Project',
      'Budget',
      'Preferred Corridor',
      'Investment Goal',
      'Status',
      'Customer Message',
      'Follow-up Notes',
      'Source Page',
    ]

    const rows = enquiries.map((e) => [
      e.id,
      new Date(e.createdAt).toLocaleString('en-IN'),
      `"${(e.name || '').replace(/"/g, '""')}"`,
      `"${e.phone || ''}"`,
      `"${e.email || ''}"`,
      e.formType,
      `"${(e.relatedProject || '').replace(/"/g, '""')}"`,
      `"${(e.budget || '').replace(/"/g, '""')}"`,
      `"${(e.preferredLocation || '').replace(/"/g, '""')}"`,
      `"${(e.investmentGoal || '').replace(/"/g, '""')}"`,
      e.status,
      `"${(e.message || '').replace(/"/g, '""')}"`,
      `"${(e.notes || '').replace(/"/g, '""')}"`,
      `"${(e.sourcePage || '').replace(/"/g, '""')}"`,
    ])

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `smartz_spaces_leads_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast('Leads exported to CSV successfully')
  }

  // Open Project Modal for Add
  const handleOpenAddProject = () => {
    setEditingProject(null)
    setProjectFormData({
      name: '',
      slug: '',
      developer: '',
      sector: '',
      locationSlug: 'golf-course-road',
      types: ['retail'],
      image: '/images/category-retail.png',
      imageAlt: '',
      summary: '',
      startingPriceLakh: 50,
      sizes: '500 - 1,500 sq.ft.',
      possession: 'under-construction',
      expectedYield: [7.5, 9.0],
      smartzScore: 8.8,
      rera: '',
      paymentPlan: 'Flexible Construction Linked Plan',
      floorPlans: [],
      gallery: [{ src: '/images/category-retail.png', alt: 'Gallery preview' }],
      locationAdvantages: ['Strategic main road frontage'],
      strengths: ['High footfall corridor and prominent visibility'],
      risks: ['Phased development milestone tracking'],
      verdict: 'Recommended commercial asset with healthy rental yield.',
      coords: { lat: 28.4595, lng: 77.0266 },
      featured: false,
    })
    setOverviewText('A premier commercial development engineered for institutional and retail investors.')
    setHighlightsText('Prime frontage on main sector arterial road\nHigh footfall retail and corporate offices\nFlexible payment plan')
    setStrengthsText('Strong developer execution track record\nHigh rental demand in micro-market')
    setRisksText('Market absorption cycle dependent')
    setLocationAdvantagesText('Direct signal-free connectivity\nClose to operational metro station')
    setFloorPlanLabel('')
    setFloorPlanImage('')
    setIsProjectModalOpen(true)
  }

  // Open Project Modal for Edit
  const handleOpenEditProject = (proj: Project) => {
    setEditingProject(proj)
    setProjectFormData({ ...proj })
    setOverviewText((proj.overview || []).join('\n\n'))
    setHighlightsText((proj.highlights || []).join('\n'))
    setStrengthsText((proj.strengths || []).join('\n'))
    setRisksText((proj.risks || []).join('\n'))
    setLocationAdvantagesText((proj.locationAdvantages || []).join('\n'))
    setFloorPlanLabel('')
    setFloorPlanImage('')
    setIsProjectModalOpen(true)
  }

  // Save Project (Add or Edit)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectFormData.name) {
      alert('Project Name is required.')
      return
    }

    const finalSlug =
      projectFormData.slug ||
      projectFormData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

    // Parse multi-line strings into arrays
    const parsedOverview = overviewText
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean)
    const parsedHighlights = highlightsText
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean)
    const parsedStrengths = strengthsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
    const parsedRisks = risksText
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean)
    const parsedLocationAdvantages = locationAdvantagesText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)

    const payload: Project = {
      slug: finalSlug,
      name: projectFormData.name || '',
      developer: projectFormData.developer || 'Smartz Spaces Partner',
      sector: projectFormData.sector || 'Gurugram',
      locationSlug: projectFormData.locationSlug || 'golf-course-road',
      types:
        projectFormData.types && projectFormData.types.length > 0 ? projectFormData.types : ['retail'],
      image: projectFormData.image || '/images/category-retail.png',
      imageAlt: projectFormData.imageAlt || `${projectFormData.name} commercial property in Gurgaon`,
      summary: projectFormData.summary || `${projectFormData.name} commercial space in ${projectFormData.sector || 'Gurgaon'}.`,
      overview: parsedOverview.length > 0 ? parsedOverview : ['Commercial project details pending updates.'],
      highlights: parsedHighlights.length > 0 ? parsedHighlights : ['Grade A Commercial Infrastructure'],
      startingPriceLakh:
        projectFormData.startingPriceLakh !== undefined && projectFormData.startingPriceLakh !== null
          ? Number(projectFormData.startingPriceLakh)
          : null,
      sizes: projectFormData.sizes || '500 - 1,500 sq.ft.',
      possession: (projectFormData.possession as Possession) || 'under-construction',
      expectedYield: projectFormData.expectedYield || [7.5, 9.0],
      smartzScore: Number(projectFormData.smartzScore) || 8.8,
      rera: projectFormData.rera || 'RERA Applied / Registered',
      paymentPlan: projectFormData.paymentPlan || 'Flexible Construction Linked Plan',
      floorPlans: projectFormData.floorPlans || [],
      gallery:
        projectFormData.gallery && projectFormData.gallery.length > 0
          ? projectFormData.gallery
          : [{ src: projectFormData.image || '/images/category-retail.png', alt: 'Project Gallery' }],
      locationAdvantages: parsedLocationAdvantages,
      strengths: parsedStrengths,
      risks: parsedRisks,
      verdict: projectFormData.verdict || null,
      coords: projectFormData.coords || { lat: 28.4595, lng: 77.0266 },
      featured: Boolean(projectFormData.featured),
      lastVerified: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    }

    try {
      const url = editingProject
        ? `/api/admin/projects/${editingProject.slug}`
        : '/api/admin/projects'
      const method = editingProject ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        if (editingProject) {
          setProjects((prev) =>
            prev.map((p) => (p.slug === editingProject.slug ? data.project : p)),
          )
          showToast(`Project "${data.project.name}" updated live!`)
        } else {
          setProjects((prev) => [data.project, ...prev])
          showToast(`Project "${data.project.name}" published live!`)
        }
        setIsProjectModalOpen(false)
      } else {
        alert(data.message || 'Failed to save project')
      }
    } catch {
      alert('Error communicating with server')
    }
  }

  // Delete Project
  const handleDeleteProject = async (slug: string) => {
    if (!window.confirm(`Are you sure you want to delete project "${slug}"? This will remove it from the live website.`)) {
      return
    }

    try {
      const res = await fetch(`/api/admin/projects/${slug}`, { method: 'DELETE' })
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.slug !== slug))
        showToast('Project removed from live inventory')
      }
    } catch {
      showToast('Failed to delete project')
    }
  }

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (res.ok) {
        showToast('Site settings updated globally!')
      }
    } catch {
      showToast('Failed to update settings')
    }
  }

  // Logout
  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter((e) => {
    const q = enquirySearch.toLowerCase()
    const matchesSearch =
      (e.name || '').toLowerCase().includes(q) ||
      (e.phone || '').includes(q) ||
      (e.email || '').toLowerCase().includes(q) ||
      (e.relatedProject || '').toLowerCase().includes(q) ||
      (e.investmentGoal || '').toLowerCase().includes(q)

    const matchesStatus = statusFilter === 'all' || e.status === statusFilter
    const matchesType = typeFilter === 'all' || e.formType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  // Filtered Projects
  const filteredProjects = projects.filter((p) => {
    const q = projectSearch.toLowerCase()
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      p.developer.toLowerCase().includes(q) ||
      p.sector.toLowerCase().includes(q)
    const matchesCorridor =
      projectCorridorFilter === 'all' || p.locationSlug === projectCorridorFilter
    const matchesType =
      projectTypeFilter === 'all' || p.types.includes(projectTypeFilter as PropertyType)
    return matchesSearch && matchesCorridor && matchesType
  })

  // KPI Calculations
  const totalEnquiriesCount = enquiries.length
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length
  const contactedCount = enquiries.filter((e) => e.status === 'contacted').length
  const qualifiedCount = enquiries.filter((e) => e.status === 'qualified' || e.status === 'site-visit').length
  const closedCount = enquiries.filter((e) => e.status === 'closed').length
  const totalProjectsCount = projects.length

  return (
    <div className="min-h-screen bg-blue-50/40 flex flex-col w-full text-ink-900 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-ink-900/40 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="size-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-line-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-300/40 text-blue-600 text-[11px] font-semibold uppercase tracking-wider">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Control Hub
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-9 px-3.5 rounded-xl border border-line-200 bg-white hover:bg-blue-50/60 text-ink-900 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Refresh all real-time data"
            >
              <RefreshCw className={cn('size-3.5', isRefreshing && 'animate-spin text-blue-600')} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="h-9 px-3.5 rounded-xl border border-line-200 bg-white hover:bg-blue-50/60 text-ink-900 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="size-3.5 text-blue-600" />
              <span className="hidden sm:inline">Live Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="h-9 px-3.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100/70 text-red-600 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="size-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <div className="bg-white border-b border-line-200 sticky top-18 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2.5">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap',
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25'
                : 'text-muted-600 hover:text-ink-900 hover:bg-blue-50/70',
            )}
          >
            <LayoutDashboard className="size-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer relative whitespace-nowrap',
              activeTab === 'enquiries'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25'
                : 'text-muted-600 hover:text-ink-900 hover:bg-blue-50/70',
            )}
          >
            <Users className="size-4" />
            <span>Leads & Inquiries</span>
            {newEnquiriesCount > 0 && (
              <span
                className={cn(
                  'px-1.5 py-0.5 rounded-full text-xs font-bold leading-none',
                  activeTab === 'enquiries' ? 'bg-white text-blue-600' : 'bg-red-600 text-white animate-pulse',
                )}
              >
                {newEnquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap',
              activeTab === 'projects'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25'
                : 'text-muted-600 hover:text-ink-900 hover:bg-blue-50/70',
            )}
          >
            <Building2 className="size-4" />
            <span>Commercial Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap',
              activeTab === 'settings'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25'
                : 'text-muted-600 hover:text-ink-900 hover:bg-blue-50/70',
            )}
          >
            <Settings className="size-4" />
            <span>Site Settings</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* ============================================================ */}
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {/* ============================================================ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            {/* Header Greeting */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-heading text-2xl font-extrabold tracking-tight text-ink-900">
                  Operations Overview
                </h1>
                <p className="text-sm text-muted-600 mt-1">
                  Manage commercial inventory, track customer inquiries, and coordinate advisor follow-ups.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleExportCSV}
                  className="h-9 px-3.5 rounded-xl border border-line-200 bg-white hover:bg-blue-50/60 text-ink-900 text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <FileSpreadsheet className="size-4 text-emerald-600" />
                  <span>Export Leads CSV</span>
                </button>
                <button
                  onClick={handleOpenAddProject}
                  className="h-9 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-sm shadow-red-600/20 transition-all cursor-pointer"
                >
                  <Plus className="size-4" />
                  <span>Add Project</span>
                </button>
              </div>
            </div>

            {/* Stat KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="rounded-2xl border border-line-200 bg-white p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-600 uppercase tracking-wider">
                    Total Leads
                  </span>
                  <div className="size-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <Users className="size-3.5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-ink-900 mt-2 font-heading">{totalEnquiriesCount}</div>
                <div className="text-xs text-muted-600 mt-1">From all project forms</div>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-blue-50/80 p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                    New Inquiries
                  </span>
                  <div className="size-2 rounded-full bg-red-600 animate-pulse" />
                </div>
                <div className="text-3xl font-extrabold text-blue-900 mt-2 font-heading">{newEnquiriesCount}</div>
                <div className="text-xs text-blue-700 font-medium mt-1">Pending first contact</div>
              </div>

              <div className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    In Advisory
                  </span>
                  <Clock className="size-4 text-amber-600" />
                </div>
                <div className="text-3xl font-extrabold text-amber-900 mt-2 font-heading">{contactedCount}</div>
                <div className="text-xs text-amber-700 font-medium mt-1">Calls / WhatsApp active</div>
              </div>

              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    Qualified Deals
                  </span>
                  <TrendingUp className="size-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-extrabold text-emerald-900 mt-2 font-heading">{qualifiedCount + closedCount}</div>
                <div className="text-xs text-emerald-700 font-medium mt-1">Site visits & closures</div>
              </div>

              <div className="rounded-2xl border border-line-200 bg-white p-5 shadow-xs col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-600 uppercase tracking-wider">
                    Live Projects
                  </span>
                  <div className="size-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <Building2 className="size-3.5" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-ink-900 mt-2 font-heading">{totalProjectsCount}</div>
                <div className="text-xs text-muted-600 mt-1">Active in directory</div>
              </div>
            </div>

            {/* Recent Leads Widget */}
            <div className="rounded-2xl border border-line-200 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-heading text-lg font-bold text-ink-900">Recent Customer Leads</h2>
                  <p className="text-xs text-muted-600">Inquiries submitted in real-time across the website</p>
                </div>
                <button
                  onClick={() => setActiveTab('enquiries')}
                  className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
                >
                  View All Leads &rarr;
                </button>
              </div>

              {enquiries.length === 0 ? (
                <div className="text-center py-12 text-muted-600 text-sm">
                  No inquiries received yet. Submit an inquiry on any project page to see it appear here immediately.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-line-200 text-xs font-bold uppercase tracking-wider text-muted-600 bg-blue-50/50">
                        <th className="py-3 px-3">Customer</th>
                        <th className="py-3 px-3">Contact</th>
                        <th className="py-3 px-3">Asset / Goal</th>
                        <th className="py-3 px-3">Budget</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3 text-right">Quick Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line-200/80">
                      {enquiries.slice(0, 6).map((enq) => (
                        <tr key={enq.id} className="hover:bg-blue-50/40 transition-colors">
                          <td className="py-3.5 px-3">
                            <div className="font-bold text-ink-900 flex items-center gap-1.5">
                              <span>{enq.name}</span>
                              <button
                                onClick={() => setSelectedEnquiryForDetails(enq)}
                                className="text-xs text-blue-600 hover:text-blue-700"
                                title="View Lead Details"
                              >
                                <Eye className="size-3.5" />
                              </button>
                            </div>
                            <div className="text-xs text-muted-600">
                              {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          </td>

                          <td className="py-3.5 px-3">
                            <div className="font-semibold text-ink-900">{enq.phone}</div>
                            {enq.email && <div className="text-xs text-muted-600 truncate max-w-[180px]">{enq.email}</div>}
                          </td>

                          <td className="py-3.5 px-3">
                            <div className="font-semibold text-ink-900">
                              {enq.relatedProject ? (
                                <Link
                                  href={`/projects/${enq.relatedProject}`}
                                  target="_blank"
                                  className="text-blue-600 hover:underline"
                                >
                                  {enq.relatedProject}
                                </Link>
                              ) : (
                                <span className="text-muted-600">Commercial Advisory</span>
                              )}
                            </div>
                            <span className="text-[11px] font-semibold text-muted-600 bg-blue-50 px-2 py-0.5 rounded-md border border-line-200">
                              {enq.formType}
                            </span>
                          </td>

                          <td className="py-3.5 px-3 font-medium text-ink-900">
                            {enq.budget || 'Flexible'}
                          </td>

                          <td className="py-3.5 px-3">
                            <select
                              value={enq.status}
                              onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                              className={cn(
                                'text-xs font-semibold px-2 py-1 rounded-md border cursor-pointer focus:outline-none',
                                statusColors[enq.status]?.bg || 'bg-blue-50 text-ink-900 border-line-200',
                              )}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="site-visit">Site Visit</option>
                              <option value="closed">Closed / Won</option>
                              <option value="not-interested">Not Interested</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`https://wa.me/91${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${enq.name}, thank you for contacting Smartz Spaces regarding ${enq.relatedProject || 'commercial real estate'}. How may our advisor assist you?`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="size-8 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60 flex items-center justify-center transition-colors"
                                title="WhatsApp Customer"
                              >
                                <MessageSquare className="size-4" />
                              </a>
                              <a
                                href={`tel:${enq.phone}`}
                                className="size-8 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60 flex items-center justify-center transition-colors"
                                title="Call Phone"
                              >
                                <Phone className="size-4" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: LEADS & INQUIRIES MANAGER */}
        {/* ============================================================ */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-heading text-2xl font-extrabold tracking-tight text-ink-900">Leads & Inquiries Manager</h1>
                <p className="text-sm text-muted-600 mt-1">
                  Track, qualify, and follow up with commercial investors and tenants in real time.
                </p>
              </div>

              <button
                onClick={handleExportCSV}
                className="h-9 px-3.5 rounded-xl border border-line-200 bg-white hover:bg-blue-50/60 text-ink-900 text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="size-4 mr-1 text-blue-600" />
                <span>Export CSV ({filteredEnquiries.length} leads)</span>
              </button>
            </div>

            {/* Search and Filters */}
            <div className="rounded-2xl border border-line-200 bg-white p-4 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-600" />
                <Input
                  placeholder="Search name, phone, project, goal..."
                  value={enquirySearch}
                  onChange={(e) => setEnquirySearch(e.target.value)}
                  className="pl-9 h-10 rounded-xl border-line-200 text-ink-900 placeholder:text-muted-600/60 focus:border-blue-600 focus:ring-blue-600"
                />
              </div>

              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full h-10 rounded-xl border border-line-200 bg-white px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="all">All Statuses ({enquiries.length})</option>
                  <option value="new">New ({enquiries.filter((e) => e.status === 'new').length})</option>
                  <option value="contacted">Contacted ({enquiries.filter((e) => e.status === 'contacted').length})</option>
                  <option value="qualified">Qualified ({enquiries.filter((e) => e.status === 'qualified').length})</option>
                  <option value="site-visit">Site Visit ({enquiries.filter((e) => e.status === 'site-visit').length})</option>
                  <option value="closed">Closed / Won ({enquiries.filter((e) => e.status === 'closed').length})</option>
                  <option value="not-interested">Not Interested</option>
                </select>
              </div>

              <div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full h-10 rounded-xl border border-line-200 bg-white px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="all">All Form Types</option>
                  <option value="project-enquiry">Project Enquiry</option>
                  <option value="investment-strategy">Investment Strategy</option>
                  <option value="shortlist">Shortlist Form</option>
                  <option value="contact">Contact Form</option>
                  <option value="newsletter">Newsletter Subscriber</option>
                </select>
              </div>
            </div>

            {/* Enquiries Data Table */}
            <div className="rounded-2xl border border-line-200 bg-white overflow-hidden shadow-xs">
              {filteredEnquiries.length === 0 ? (
                <div className="p-12 text-center text-muted-600">
                  <p className="font-semibold text-ink-900">No leads match your filter criteria.</p>
                  <p className="text-xs mt-1">Try clearing search or filters to see all inquiries.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-blue-50/60 border-b border-line-200">
                      <tr className="text-xs font-bold uppercase tracking-wider text-muted-600">
                        <th className="py-3.5 px-4">Lead Info</th>
                        <th className="py-3.5 px-4">Contact</th>
                        <th className="py-3.5 px-4">Project & Goal</th>
                        <th className="py-3.5 px-4">Budget / Loc</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Notes</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line-200/80">
                      {filteredEnquiries.map((enq) => (
                        <tr key={enq.id} className="hover:bg-blue-50/40 transition-colors">
                          <td className="py-4 px-4 align-top">
                            <div className="font-bold text-ink-900 flex items-center gap-1.5">
                              <span>{enq.name}</span>
                              <button
                                onClick={() => setSelectedEnquiryForDetails(enq)}
                                className="text-blue-600 hover:text-blue-800 p-0.5 rounded cursor-pointer"
                                title="View Details"
                              >
                                <Eye className="size-3.5" />
                              </button>
                            </div>
                            {enq.email && (
                              <div className="text-xs text-muted-600 flex items-center gap-1 mt-0.5 truncate max-w-[200px]">
                                <Mail className="size-3 text-muted-600/70" />
                                {enq.email}
                              </div>
                            )}
                            <div className="text-[11px] text-muted-600 mt-1">
                              {new Date(enq.createdAt).toLocaleString('en-IN', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                            {enq.message && (
                              <div className="text-xs text-ink-900/80 bg-blue-50/60 p-2 rounded-xl border border-line-200/60 mt-1.5 max-w-xs line-clamp-2">
                                &quot;{enq.message}&quot;
                              </div>
                            )}
                          </td>

                          <td className="py-4 px-4 align-top">
                            <div className="font-semibold text-ink-900">{enq.phone}</div>
                            <div className="flex items-center gap-1.5 mt-2">
                              <a
                                href={`https://wa.me/91${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${enq.name}, Smartz Spaces advisor here. Regarding your inquiry on commercial property:`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60 text-xs font-semibold transition-colors"
                              >
                                <MessageSquare className="size-3" />
                                WhatsApp
                              </a>
                              <a
                                href={`tel:${enq.phone}`}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60 text-xs font-semibold transition-colors"
                              >
                                <Phone className="size-3" />
                                Call
                              </a>
                            </div>
                          </td>

                          <td className="py-4 px-4 align-top">
                            <div className="font-semibold text-ink-900">
                              {enq.relatedProject ? (
                                <Link
                                  href={`/projects/${enq.relatedProject}`}
                                  target="_blank"
                                  className="text-blue-600 hover:underline"
                                >
                                  {enq.relatedProject}
                                </Link>
                              ) : (
                                <span className="text-muted-600">General Consultation</span>
                              )}
                            </div>
                            <div className="text-xs text-muted-600 mt-1">
                              Type: <span className="font-semibold text-ink-900">{enq.formType}</span>
                            </div>
                            {enq.investmentGoal && (
                              <div className="text-xs text-muted-600 mt-0.5">
                                Goal: <span className="font-semibold capitalize text-ink-900">{enq.investmentGoal}</span>
                              </div>
                            )}
                          </td>

                          <td className="py-4 px-4 align-top">
                            <div className="font-semibold text-ink-900">{enq.budget || 'Not specified'}</div>
                            <div className="text-xs text-muted-600 mt-0.5">
                              {enq.preferredLocation || 'Any corridor'}
                            </div>
                          </td>

                          <td className="py-4 px-4 align-top">
                            <select
                              value={enq.status}
                              onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                              className={cn(
                                'text-xs font-semibold px-2.5 py-1.5 rounded-lg border cursor-pointer focus:outline-none',
                                statusColors[enq.status]?.bg || 'bg-blue-50 text-ink-900 border-line-200',
                              )}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="site-visit">Site Visit</option>
                              <option value="closed">Closed / Won</option>
                              <option value="not-interested">Not Interested</option>
                            </select>
                          </td>

                          <td className="py-4 px-4 align-top max-w-[200px]">
                            {enq.notes ? (
                              <div className="text-xs text-amber-950 bg-amber-50/90 border border-amber-200/90 p-2.5 rounded-xl line-clamp-3">
                                {enq.notes}
                              </div>
                            ) : (
                              <span className="text-xs text-muted-600 italic">No notes logged</span>
                            )}
                            <button
                              onClick={() => {
                                setSelectedEnquiryForNotes(enq)
                                setNoteText(enq.notes || '')
                              }}
                              className="text-xs text-blue-600 font-semibold hover:underline block mt-1.5 cursor-pointer"
                            >
                              {enq.notes ? 'Edit Note' : '+ Add Note'}
                            </button>
                          </td>

                          <td className="py-4 px-4 align-top text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setSelectedEnquiryForDetails(enq)}
                                className="size-8 rounded-lg text-muted-600 hover:text-ink-900 hover:bg-blue-50 inline-flex items-center justify-center cursor-pointer transition-colors"
                                title="View Full Details"
                              >
                                <Eye className="size-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteEnquiry(enq.id)}
                                className="size-8 rounded-lg text-muted-600 hover:text-danger-600 hover:bg-danger-600/10 inline-flex items-center justify-center cursor-pointer transition-colors"
                                title="Delete Lead"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: PROJECTS MANAGER */}
        {/* ============================================================ */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-heading text-2xl font-extrabold tracking-tight text-ink-900">Commercial Projects</h1>
                <p className="text-sm text-muted-600 mt-1">
                  Add, edit, or remove commercial real estate projects served dynamically across the entire website.
                </p>
              </div>

              <button
                onClick={handleOpenAddProject}
                className="h-9 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-sm shadow-red-600/20 transition-all cursor-pointer"
              >
                <Plus className="size-4" />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Project Filters */}
            <div className="rounded-2xl border border-line-200 bg-white p-4 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-600" />
                <Input
                  placeholder="Search project name, developer, sector..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="pl-9 h-10 rounded-xl border-line-200 text-ink-900 placeholder:text-muted-600/60 focus:border-blue-600 focus:ring-blue-600"
                />
              </div>

              <div>
                <select
                  value={projectCorridorFilter}
                  onChange={(e) => setProjectCorridorFilter(e.target.value)}
                  className="w-full h-10 rounded-xl border border-line-200 bg-white px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="all">All Corridors & Micro-markets</option>
                  {corridorOptions.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={projectTypeFilter}
                  onChange={(e) => setProjectTypeFilter(e.target.value)}
                  className="w-full h-10 rounded-xl border border-line-200 bg-white px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="all">All Property Formats</option>
                  <option value="retail">Retail Shops</option>
                  <option value="office">Office Spaces</option>
                  <option value="sco">SCO Plots</option>
                  <option value="pre-leased">Pre-Leased Commercial</option>
                </select>
              </div>
            </div>

            {/* Projects Table */}
            <div className="rounded-2xl border border-line-200 bg-white overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-blue-50/60 border-b border-line-200">
                    <tr className="text-xs font-bold uppercase tracking-wider text-muted-600">
                      <th className="py-3.5 px-4">Project</th>
                      <th className="py-3.5 px-4">Corridor & Sector</th>
                      <th className="py-3.5 px-4">Types</th>
                      <th className="py-3.5 px-4">Starting Price</th>
                      <th className="py-3.5 px-4">Expected Yield</th>
                      <th className="py-3.5 px-4">RERA Number</th>
                      <th className="py-3.5 px-4">Score</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-200/80">
                    {filteredProjects.map((p) => (
                      <tr key={p.slug} className="hover:bg-blue-50/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="font-bold text-ink-900">{p.name}</div>
                            {p.featured && (
                              <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-600">{p.developer}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-ink-900">{p.sector}</div>
                          <div className="text-xs text-muted-600">
                            {corridorOptions.find((c) => c.slug === p.locationSlug)?.name || p.locationSlug}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {p.types.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase bg-blue-50 text-blue-700 border border-blue-200/60"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-bold text-ink-900">
                          {p.startingPriceLakh
                            ? p.startingPriceLakh >= 100
                              ? `₹${(p.startingPriceLakh / 100).toFixed(2)} Cr`
                              : `₹${p.startingPriceLakh} L`
                            : 'On Request'}
                        </td>

                        <td className="py-3.5 px-4 font-semibold text-emerald-700">
                          {p.expectedYield ? `${p.expectedYield[0]}% - ${p.expectedYield[1]}%` : 'Evaluating'}
                        </td>

                        <td className="py-3.5 px-4 text-xs font-mono text-muted-600 max-w-[160px] truncate">
                          {p.rera || 'Under Review'}
                        </td>

                        <td className="py-3.5 px-4 font-bold text-blue-600">
                          {p.smartzScore ? `${p.smartzScore} / 10` : '-'}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/projects/${p.slug}`}
                              target="_blank"
                              className="size-8 rounded-lg text-muted-600 hover:text-ink-900 hover:bg-blue-50 inline-flex items-center justify-center transition-colors"
                              title="View Live Page"
                            >
                              <ExternalLink className="size-4" />
                            </Link>
                            <button
                              onClick={() => handleOpenEditProject(p)}
                              className="size-8 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 inline-flex items-center justify-center cursor-pointer transition-colors"
                              title="Edit Project"
                            >
                              <Edit className="size-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(p.slug)}
                              className="size-8 rounded-lg text-muted-600 hover:text-danger-600 hover:bg-danger-600/10 inline-flex items-center justify-center cursor-pointer transition-colors"
                              title="Delete Project"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: SITE SETTINGS */}
        {/* ============================================================ */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl animate-in fade-in duration-150">
            <div>
              <h1 className="font-heading text-2xl font-extrabold tracking-tight text-ink-900">Site Settings</h1>
              <p className="text-sm text-muted-600 mt-1">
                Configure primary contact phone numbers, WhatsApp routing, and official company details across all pages.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="rounded-2xl border border-line-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                    Primary Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="mt-1.5 h-10 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                    required
                  />
                  <p className="text-[11px] text-muted-600 mt-1">Example: +91 9650 550 411</p>
                </div>
                <div>
                  <Label htmlFor="phoneSecondary" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                    Secondary Phone Number
                  </Label>
                  <Input
                    id="phoneSecondary"
                    value={settings.phoneSecondary || ''}
                    onChange={(e) => setSettings({ ...settings, phoneSecondary: e.target.value })}
                    className="mt-1.5 h-10 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                  />
                  <p className="text-[11px] text-muted-600 mt-1">Example: +91 8010 841 841</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="whatsapp" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                    WhatsApp Business Number (without +)
                  </Label>
                  <Input
                    id="whatsapp"
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                    className="mt-1.5 h-10 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600 font-mono text-sm"
                    required
                  />
                  <p className="text-[11px] text-muted-600 mt-1">Example: 919650550411</p>
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                    Official Inquiries Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="mt-1.5 h-10 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                  Registered Office Address
                </Label>
                <Textarea
                  id="address"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  rows={2}
                  className="mt-1.5 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reraNumber" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                    Haryana / Delhi RERA Registration
                  </Label>
                  <Input
                    id="reraNumber"
                    value={settings.reraNumber}
                    onChange={(e) => setSettings({ ...settings, reraNumber: e.target.value })}
                    className="mt-1.5 h-10 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600 font-mono text-sm"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="heroTagline" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                    Hero / Site Tagline
                  </Label>
                  <Input
                    id="heroTagline"
                    value={settings.heroTagline}
                    onChange={(e) => setSettings({ ...settings, heroTagline: e.target.value })}
                    className="mt-1.5 h-10 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-line-200 flex justify-end">
                <button
                  type="submit"
                  className="h-10 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-sm shadow-red-600/20 transition-all cursor-pointer"
                >
                  Save Settings Globally
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* ============================================================ */}
      {/* MODAL: VIEW FULL LEAD DETAILS */}
      {/* ============================================================ */}
      {selectedEnquiryForDetails && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedEnquiryForDetails(null)
          }}
          className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-sm flex items-center justify-center p-4 overscroll-contain overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-line-200 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-line-200">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-lg text-ink-900">Lead Details</h3>
                <span
                  className={cn(
                    'text-xs font-bold px-2.5 py-0.5 rounded-full border',
                    statusColors[selectedEnquiryForDetails.status]?.bg,
                  )}
                >
                  {statusColors[selectedEnquiryForDetails.status]?.label}
                </span>
              </div>
              <button
                onClick={() => setSelectedEnquiryForDetails(null)}
                className="size-8 rounded-lg text-muted-600 hover:text-ink-900 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 p-3.5 rounded-xl bg-blue-50/70 border border-blue-100">
                <div>
                  <span className="text-xs text-muted-600 uppercase font-bold tracking-wider">Customer Name</span>
                  <div className="font-bold text-ink-900 text-base mt-0.5">{selectedEnquiryForDetails.name}</div>
                </div>
                <div>
                  <span className="text-xs text-muted-600 uppercase font-bold tracking-wider">Date & Time</span>
                  <div className="font-semibold text-ink-900 mt-0.5">
                    {new Date(selectedEnquiryForDetails.createdAt).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-muted-600 uppercase font-bold tracking-wider">Phone Number</span>
                  <div className="font-bold text-ink-900 mt-0.5">
                    {selectedEnquiryForDetails.phone}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <a
                      href={`https://wa.me/91${selectedEnquiryForDetails.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${selectedEnquiryForDetails.name}, Smartz Spaces advisor here regarding your inquiry:`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/60 text-xs font-semibold transition-colors"
                    >
                      <MessageSquare className="size-3.5" />
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${selectedEnquiryForDetails.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60 text-xs font-semibold transition-colors"
                    >
                      <Phone className="size-3.5" />
                      Call
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-muted-600 uppercase font-bold tracking-wider">Email Address</span>
                  <div className="font-semibold text-ink-900 mt-0.5">
                    {selectedEnquiryForDetails.email ? (
                      <a
                        href={`mailto:${selectedEnquiryForDetails.email}`}
                        className="text-blue-600 hover:underline flex items-center gap-1.5 truncate"
                      >
                        <Mail className="size-3.5 text-muted-600" />
                        <span className="truncate">{selectedEnquiryForDetails.email}</span>
                      </a>
                    ) : (
                      <span className="text-muted-600 italic">Not provided</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-line-200">
                <div>
                  <span className="text-xs text-muted-600 uppercase font-bold tracking-wider">Related Project</span>
                  <div className="font-bold text-ink-900 mt-0.5">
                    {selectedEnquiryForDetails.relatedProject ? (
                      <Link
                        href={`/projects/${selectedEnquiryForDetails.relatedProject}`}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        {selectedEnquiryForDetails.relatedProject}
                      </Link>
                    ) : (
                      'General Commercial Consultation'
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-muted-600 uppercase font-bold tracking-wider">Form Type</span>
                  <div className="font-semibold text-ink-900 mt-0.5">{selectedEnquiryForDetails.formType}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-muted-600 uppercase font-bold tracking-wider">Budget Band</span>
                  <div className="font-semibold text-ink-900 mt-0.5">{selectedEnquiryForDetails.budget || 'Flexible'}</div>
                </div>

                <div>
                  <span className="text-xs text-muted-600 uppercase font-bold tracking-wider">Preferred Corridor</span>
                  <div className="font-semibold text-ink-900 mt-0.5">
                    {selectedEnquiryForDetails.preferredLocation || 'Any Gurgaon micro-market'}
                  </div>
                </div>
              </div>

              {selectedEnquiryForDetails.investmentGoal && (
                <div>
                  <span className="text-xs text-muted-600 uppercase font-bold tracking-wider">Investment Goal</span>
                  <div className="font-semibold text-ink-900 mt-0.5 capitalize">
                    {selectedEnquiryForDetails.investmentGoal}
                  </div>
                </div>
              )}

              {selectedEnquiryForDetails.message && (
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-line-200/80">
                  <span className="text-xs text-muted-600 uppercase font-bold tracking-wider block mb-1">Customer Message</span>
                  <p className="text-sm text-ink-900/90 whitespace-pre-wrap leading-relaxed">
                    &quot;{selectedEnquiryForDetails.message}&quot;
                  </p>
                </div>
              )}

              <div>
                <span className="text-xs text-muted-600 uppercase font-bold tracking-wider block mb-1.5">
                  Follow-up Notes & Advisor Log
                </span>
                <Textarea
                  rows={3}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Record customer preferences, call outcomes, or scheduled site visits..."
                  className="w-full text-sm rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <Label className="text-xs text-muted-600 uppercase font-bold tracking-wider block mb-1">Update Status</Label>
                  <select
                    value={selectedEnquiryForDetails.status}
                    onChange={(e) => handleStatusChange(selectedEnquiryForDetails.id, e.target.value as EnquiryStatus)}
                    className={cn(
                      'text-xs font-semibold px-2.5 py-1.5 rounded-lg border cursor-pointer focus:outline-none',
                      statusColors[selectedEnquiryForDetails.status]?.bg,
                    )}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="site-visit">Site Visit</option>
                    <option value="closed">Closed / Won</option>
                    <option value="not-interested">Not Interested</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteEnquiry(selectedEnquiryForDetails.id)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-danger-600 hover:bg-danger-600/10 border border-danger-600/30 cursor-pointer transition-colors"
                  >
                    Delete Lead
                  </button>
                  <button
                    onClick={handleSaveNotes}
                    className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm shadow-red-600/20 cursor-pointer transition-all"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: EDIT LEAD NOTES */}
      {/* ============================================================ */}
      {selectedEnquiryForNotes && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedEnquiryForNotes(null)
          }}
          className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-sm flex items-center justify-center p-4 overscroll-contain"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-line-200 animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-line-200">
              <h3 className="font-heading font-bold text-ink-900">
                Follow-up Note for {selectedEnquiryForNotes.name}
              </h3>
              <button
                onClick={() => setSelectedEnquiryForNotes(null)}
                className="size-8 rounded-lg text-muted-600 hover:text-ink-900 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="py-4 space-y-3">
              <p className="text-xs text-muted-600">
                Phone: <span className="font-semibold text-ink-900">{selectedEnquiryForNotes.phone}</span> | Project:{' '}
                <span className="font-semibold text-ink-900">{selectedEnquiryForNotes.relatedProject || 'General Consultation'}</span>
              </p>
              <Textarea
                rows={4}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="E.g. Called customer at 2 PM, requested brochure on WhatsApp, site visit scheduled for Saturday..."
                className="w-full text-sm rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
              />
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-3.5 border-t border-line-200">
              <button
                onClick={() => setSelectedEnquiryForNotes(null)}
                className="h-9 px-4 rounded-xl border border-line-200 bg-white hover:bg-blue-50/60 text-ink-900 text-xs font-semibold cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="h-9 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm shadow-red-600/20 cursor-pointer transition-all"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: ADD / EDIT PROJECT */}
      {/* ============================================================ */}
      {isProjectModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsProjectModalOpen(false)
          }}
          className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto overscroll-contain"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-line-200 my-auto animate-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto overscroll-contain"
          >
            <div className="flex items-center justify-between pb-4 border-b border-line-200 sticky top-0 bg-white z-10">
              <div>
                <h3 className="font-heading text-xl font-extrabold text-ink-900">
                  {editingProject ? `Edit Project: ${editingProject.name}` : 'Add New Commercial Project'}
                </h3>
                <p className="text-xs text-muted-600 mt-0.5">
                  Update commercial project specifications, images, pricing, and diligence data across the live site.
                </p>
              </div>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="size-8 rounded-lg text-muted-600 hover:text-ink-900 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-6 pt-4">
              {/* 1. Project Identification */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                  <Building2 className="size-3.5" />
                  1. Project Identification & Location
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="p-name" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                      Project Name *
                    </Label>
                    <Input
                      id="p-name"
                      value={projectFormData.name}
                      onChange={(e) => {
                        const val = e.target.value
                        setProjectFormData({
                          ...projectFormData,
                          name: val,
                          slug: editingProject
                            ? projectFormData.slug
                            : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
                        })
                      }}
                      placeholder="e.g. The Omaxe State"
                      required
                      className="mt-1 h-10 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="p-slug" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                      URL Slug *
                    </Label>
                    <Input
                      id="p-slug"
                      value={projectFormData.slug}
                      onChange={(e) => setProjectFormData({ ...projectFormData, slug: e.target.value })}
                      placeholder="e.g. the-omaxe-state"
                      required
                      className="mt-1 h-10 rounded-xl border-line-200 text-ink-900 font-mono text-xs focus:border-blue-600 focus:ring-blue-600"
                    />
                    <p className="text-[11px] text-muted-600 mt-1">Live URL: /projects/{projectFormData.slug || 'slug'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="p-dev" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                      Developer Name
                    </Label>
                    <Input
                      id="p-dev"
                      value={projectFormData.developer}
                      onChange={(e) => setProjectFormData({ ...projectFormData, developer: e.target.value })}
                      placeholder="e.g. Omaxe Limited"
                      className="mt-1 h-10 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="p-sector" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                      Sector / Exact Area
                    </Label>
                    <Input
                      id="p-sector"
                      value={projectFormData.sector}
                      onChange={(e) => setProjectFormData({ ...projectFormData, sector: e.target.value })}
                      placeholder="e.g. Sector 19B, Dwarka"
                      className="mt-1 h-10 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="p-loc" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                      Corridor / Micro-market *
                    </Label>
                    <select
                      id="p-loc"
                      value={projectFormData.locationSlug}
                      onChange={(e) => setProjectFormData({ ...projectFormData, locationSlug: e.target.value })}
                      className="w-full h-10 mt-1 rounded-xl border border-line-200 bg-white px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                    >
                      {corridorOptions.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. Commercial Terms & Financials */}
              <div className="space-y-4 pt-4 border-t border-line-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                  <TrendingUp className="size-3.5" />
                  2. Pricing, Commercial Formats & Expected Yield
                </h4>

                <div>
                  <Label className="block mb-2 font-bold uppercase tracking-wider text-xs text-muted-600">
                    Property Formats (Select at least one)
                  </Label>
                  <div className="flex flex-wrap gap-4">
                    {(['retail', 'office', 'sco', 'pre-leased'] as PropertyType[]).map((type) => (
                      <label key={type} className="flex items-center gap-2 text-sm font-medium text-ink-900 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={projectFormData.types?.includes(type)}
                          onChange={(e) => {
                            const current = projectFormData.types || []
                            const next = e.target.checked
                              ? [...current, type]
                              : current.filter((t) => t !== type)
                            setProjectFormData({ ...projectFormData, types: next })
                          }}
                          className="size-4 rounded border-line-200 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="uppercase font-semibold text-xs">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="p-price" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                      Starting Price (in Lakhs)
                    </Label>
                    <Input
                      id="p-price"
                      type="number"
                      step="0.1"
                      value={projectFormData.startingPriceLakh ?? ''}
                      onChange={(e) => {
                        const val = e.target.value
                        setProjectFormData({
                          ...projectFormData,
                          startingPriceLakh: val === '' ? null : Number(val),
                        })
                      }}
                      placeholder="e.g. 77.5 or 250 (for 2.5Cr)"
                      className="mt-1 h-10 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                    />
                    <p className="text-[11px] text-muted-600 mt-1">Leave empty for &quot;Price on Request&quot;</p>
                  </div>

                  <div>
                    <Label htmlFor="p-sizes" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                      Unit Sizes Range
                    </Label>
                    <Input
                      id="p-sizes"
                      value={projectFormData.sizes || ''}
                      onChange={(e) => setProjectFormData({ ...projectFormData, sizes: e.target.value })}
                      placeholder="e.g. 500 - 1,500 sq.ft."
                      className="mt-1 h-10 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="p-possession" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                      Possession Timeline
                    </Label>
                    <select
                      id="p-possession"
                      value={projectFormData.possession || 'under-construction'}
                      onChange={(e) => setProjectFormData({ ...projectFormData, possession: e.target.value as Possession })}
                      className="w-full h-10 mt-1 rounded-xl border border-line-200 bg-white px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="under-construction">Under Construction</option>
                      <option value="ready">Ready to Move</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="p-yield-min" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                      Yield Range Min (%)
                    </Label>
                    <Input
                      id="p-yield-min"
                      type="number"
                      step="0.1"
                      value={projectFormData.expectedYield?.[0] || 7.5}
                      onChange={(e) =>
                        setProjectFormData({
                          ...projectFormData,
                          expectedYield: [Number(e.target.value), projectFormData.expectedYield?.[1] || 9.0],
                        })
                      }
                      className="mt-1 h-10 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="p-yield-max" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                      Yield Range Max (%)
                    </Label>
                    <Input
                      id="p-yield-max"
                      type="number"
                      step="0.1"
                      value={projectFormData.expectedYield?.[1] || 9.0}
                      onChange={(e) =>
                        setProjectFormData({
                          ...projectFormData,
                          expectedYield: [projectFormData.expectedYield?.[0] || 7.5, Number(e.target.value)],
                        })
                      }
                      className="mt-1 h-10 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="p-score" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                      Smartz Score (out of 10)
                    </Label>
                    <Input
                      id="p-score"
                      type="number"
                      step="0.1"
                      min="1"
                      max="10"
                      value={projectFormData.smartzScore || 8.8}
                      onChange={(e) => setProjectFormData({ ...projectFormData, smartzScore: Number(e.target.value) })}
                      className="mt-1 h-10 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="p-rera" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                      RERA Registration Number
                    </Label>
                    <Input
                      id="p-rera"
                      value={projectFormData.rera || ''}
                      onChange={(e) => setProjectFormData({ ...projectFormData, rera: e.target.value })}
                      placeholder="e.g. DLRERA2024P0003 or GGM/889/621/2024/116"
                      className="mt-1 h-10 rounded-xl border-line-200 text-ink-900 font-mono text-xs focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="p-payplan" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                      Payment Plan
                    </Label>
                    <Input
                      id="p-payplan"
                      value={projectFormData.paymentPlan || ''}
                      onChange={(e) => setProjectFormData({ ...projectFormData, paymentPlan: e.target.value })}
                      placeholder="e.g. 50:50 / Construction-Linked Payment Plan"
                      className="mt-1 h-10 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Media & Elevation Uploads */}
              <div className="space-y-4 pt-4 border-t border-line-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                  <ImageIcon className="size-3.5" />
                  3. Media & Elevation Uploads
                </h4>

                {/* Primary Image Upload */}
                <div className="p-4 sm:p-5 rounded-2xl border border-line-200 bg-blue-50/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <Label className="text-sm font-bold text-ink-900">
                        Primary Featured Image *
                      </Label>
                      <p className="text-xs text-muted-600">
                        Upload real project photo from your computer/device, or select a preset below.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        ref={primaryFileInputRef}
                        onChange={handleUploadPrimaryImage}
                        accept="image/png,image/jpeg,image/webp,image/svg+xml"
                        className="hidden"
                      />
                      <button
                        type="button"
                        disabled={isUploadingImage}
                        onClick={() => primaryFileInputRef.current?.click()}
                        className="h-9 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm shadow-blue-600/20 transition-all cursor-pointer"
                      >
                        {isUploadingImage ? (
                          <>
                            <Loader2 className="size-3.5 mr-1 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="size-3.5 mr-1" />
                            Upload Image File
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Image Preview & URL Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pt-2">
                    <div className="sm:col-span-1">
                      <div className="relative aspect-video sm:aspect-square w-full rounded-xl border border-line-200 overflow-hidden bg-white flex items-center justify-center shadow-xs">
                        {projectFormData.image ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={projectFormData.image}
                            alt="Project Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-3 text-muted-600">
                            <ImageIcon className="size-8 mx-auto mb-1 opacity-40 text-muted-600" />
                            <span className="text-xs">No image selected</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 space-y-2">
                      <div>
                        <Label htmlFor="p-img-url" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                          Image File Path / URL
                        </Label>
                        <Input
                          id="p-img-url"
                          value={projectFormData.image || ''}
                          onChange={(e) => setProjectFormData({ ...projectFormData, image: e.target.value })}
                          placeholder="/uploads/... or https://..."
                          className="mt-1 h-9 rounded-xl border-line-200 text-ink-900 font-mono text-xs focus:border-blue-600 focus:ring-blue-600"
                        />
                      </div>

                      <div>
                        <Label htmlFor="p-img-preset" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                          Or Choose from Presets
                        </Label>
                        <select
                          id="p-img-preset"
                          value={projectFormData.image || '/images/category-retail.png'}
                          onChange={(e) => setProjectFormData({ ...projectFormData, image: e.target.value })}
                          className="w-full h-9 mt-1 rounded-xl border border-line-200 bg-white px-3 py-1.5 text-xs text-ink-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                        >
                          <option value="/images/category-retail.png">Preset: High-Street Retail Theme</option>
                          <option value="/images/category-office.png">Preset: Corporate Office Tower Theme</option>
                          <option value="/images/category-sco.png">Preset: SCO Plotted Boulevard Theme</option>
                          <option value="/images/category-investment.png">Preset: Pre-Leased Boardroom Theme</option>
                          <option value="/images/hero-golf-course-road.jpg">Preset: Golf Course Road Skyline</option>
                          <option value="/images/hero-gurgaon-skyline.png">Preset: Gurgaon Modern City Skyline</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Multiple Gallery Photos Upload */}
                <div className="p-4 sm:p-5 rounded-2xl border border-line-200 bg-blue-50/50 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <Label className="text-sm font-bold text-ink-900">
                        Project Walkthrough & Gallery Photos
                      </Label>
                      <p className="text-xs text-muted-600">
                        Upload additional site photos, elevations, or amenity renders.
                      </p>
                    </div>

                    <div>
                      <input
                        type="file"
                        multiple
                        ref={galleryFileInputRef}
                        onChange={handleUploadGalleryImage}
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                      />
                      <button
                        type="button"
                        disabled={isUploadingGallery}
                        onClick={() => galleryFileInputRef.current?.click()}
                        className="h-9 px-3.5 rounded-xl border border-blue-600/40 bg-white hover:bg-blue-50 text-blue-600 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        {isUploadingGallery ? (
                          <>
                            <Loader2 className="size-3.5 mr-1 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Plus className="size-3.5 mr-1" />
                            Add Gallery Photos
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {projectFormData.gallery && projectFormData.gallery.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 pt-2">
                      {projectFormData.gallery.map((g, idx) => (
                        <div key={idx} className="group relative aspect-square rounded-xl border border-line-200 overflow-hidden bg-white shadow-xs">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={g.src}
                            alt={g.alt || 'Gallery item'}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(idx)}
                            className="absolute top-1 right-1 size-6 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md cursor-pointer"
                            title="Remove Photo"
                          >
                            <X className="size-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-muted-600 italic pt-1">
                      No gallery photos added yet. Click &quot;Add Gallery Photos&quot; to upload multiple images.
                    </div>
                  )}
                </div>

                {/* Floor Plans Section */}
                <div className="p-4 sm:p-5 rounded-2xl border border-line-200 bg-blue-50/50 space-y-3">
                  <Label className="text-sm font-bold text-ink-900 block">
                    Floor Plans & Unit Layouts
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <Input
                      placeholder="Plan Label (e.g. Ground Floor Retail)"
                      value={floorPlanLabel}
                      onChange={(e) => setFloorPlanLabel(e.target.value)}
                      className="text-xs h-9 rounded-xl border-line-200 text-ink-900 bg-white"
                    />
                    <Input
                      placeholder="Image URL (e.g. /images/category-retail.png)"
                      value={floorPlanImage}
                      onChange={(e) => setFloorPlanImage(e.target.value)}
                      className="text-xs font-mono h-9 rounded-xl border-line-200 text-ink-900 bg-white"
                    />
                    <button
                      type="button"
                      onClick={handleAddFloorPlan}
                      className="h-9 px-3 rounded-xl border border-line-200 bg-white hover:bg-blue-50 text-ink-900 text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Plus className="size-3.5" />
                      Add Floor Plan
                    </button>
                  </div>

                  {projectFormData.floorPlans && projectFormData.floorPlans.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      {projectFormData.floorPlans.map((fp, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-line-200 text-xs">
                          <span className="font-semibold text-ink-900">{fp.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-muted-600 truncate max-w-[200px]">{fp.image}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFloorPlan(idx)}
                              className="text-red-600 hover:text-red-800 p-1 cursor-pointer"
                            >
                              <X className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2.5 cursor-pointer font-medium text-sm text-ink-900">
                    <input
                      type="checkbox"
                      checked={Boolean(projectFormData.featured)}
                      onChange={(e) => setProjectFormData({ ...projectFormData, featured: e.target.checked })}
                      className="size-4 rounded border-line-200 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Feature this project on Homepage showcase</span>
                  </label>
                </div>
              </div>

              {/* 4. Diligence, Strengths, Risks & Overview */}
              <div className="space-y-4 pt-4 border-t border-line-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                  <Briefcase className="size-3.5" />
                  4. Diligence Review & Analytical Content
                </h4>

                <div>
                  <Label htmlFor="p-summary" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                    Executive Summary (2-Line Card Hook)
                  </Label>
                  <Textarea
                    id="p-summary"
                    value={projectFormData.summary || ''}
                    onChange={(e) => setProjectFormData({ ...projectFormData, summary: e.target.value })}
                    rows={2}
                    placeholder="Short 2-line hook for listing cards"
                    className="mt-1 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <Label htmlFor="p-overview" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                    Detailed Project Overview (Separate paragraphs with double newlines)
                  </Label>
                  <Textarea
                    id="p-overview"
                    value={overviewText}
                    onChange={(e) => setOverviewText(e.target.value)}
                    rows={4}
                    placeholder="Enter comprehensive paragraphs about the development. Separate distinct paragraphs by pressing Enter twice."
                    className="mt-1 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="p-highlights" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                      Key Highlights (One per line)
                    </Label>
                    <Textarea
                      id="p-highlights"
                      value={highlightsText}
                      onChange={(e) => setHighlightsText(e.target.value)}
                      rows={3}
                      placeholder="Prime arterial road frontage&#10;Direct metro link&#10;Anchored by international brands"
                      className="mt-1 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="p-loc-adv" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                      Location Advantages (One per line)
                    </Label>
                    <Textarea
                      id="p-loc-adv"
                      value={locationAdvantagesText}
                      onChange={(e) => setLocationAdvantagesText(e.target.value)}
                      rows={3}
                      placeholder="15 mins from IGI Airport&#10;Immediate access to NH-48 / CPR"
                      className="mt-1 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="p-strengths" className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Diligence Strengths (One per line)
                    </Label>
                    <Textarea
                      id="p-strengths"
                      value={strengthsText}
                      onChange={(e) => setStrengthsText(e.target.value)}
                      rows={3}
                      placeholder="High footfall density&#10;Reputed corporate developer"
                      className="mt-1 text-emerald-900 bg-emerald-50/40 border-emerald-200 focus:border-emerald-600 rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="p-risks" className="text-xs font-bold uppercase tracking-wider text-amber-800">
                      Diligence Risks & Mitigations (One per line)
                    </Label>
                    <Textarea
                      id="p-risks"
                      value={risksText}
                      onChange={(e) => setRisksText(e.target.value)}
                      rows={3}
                      placeholder="Under-construction delivery schedule&#10;Leasing velocity dependent on phase completion"
                      className="mt-1 text-amber-950 bg-amber-50/40 border-amber-200 focus:border-amber-600 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="p-verdict" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                    Advisor Verdict
                  </Label>
                  <Input
                    id="p-verdict"
                    value={projectFormData.verdict || ''}
                    onChange={(e) => setProjectFormData({ ...projectFormData, verdict: e.target.value })}
                    placeholder="e.g. A premier commercial asset offering strong rental yields and institutional tenancy."
                    className="mt-1 h-10 rounded-xl border-line-200 text-ink-900 focus:border-blue-600 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-line-200 sticky bottom-0 bg-white py-3">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="h-10 px-5 rounded-xl border border-line-200 bg-white hover:bg-blue-50/60 text-ink-900 text-sm font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold shadow-sm shadow-red-600/20 cursor-pointer transition-all"
                >
                  {editingProject ? 'Save Project Changes' : 'Publish New Project Live'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
