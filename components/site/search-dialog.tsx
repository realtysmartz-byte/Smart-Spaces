'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, X, Building2, MapPin, Calculator, BookOpen, ArrowRight } from 'lucide-react'
import { getProjects, getLocations, getArticles } from '@/lib/data'

interface SearchDialogProps {
  open: boolean
  onClose: () => void
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (open) onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  const q = query.toLowerCase().trim()

  const projects = getProjects()
    .filter((p) => !q || p.name.toLowerCase().includes(q) || p.sector.toLowerCase().includes(q) || p.developer.toLowerCase().includes(q))
    .slice(0, 4)

  const locations = getLocations()
    .filter((l) => !q || l.name.toLowerCase().includes(q) || l.shortName.toLowerCase().includes(q))
    .slice(0, 4)

  const tools = [
    { name: 'EMI Calculator', href: '/tools/emi-calculator', desc: 'Commercial loan EMI calculations' },
    { name: 'Rental Yield Calculator', href: '/tools/rental-yield-calculator', desc: 'Gross & net yield estimates' },
    { name: 'ROI Calculator', href: '/tools/roi-calculator', desc: 'Annualized commercial return on investment' },
    { name: 'Buy vs Rent Analysis', href: '/tools/buy-vs-rent-calculator', desc: 'Commercial acquisition vs leasing' },
    { name: 'SCO Investment Calculator', href: '/tools/sco-calculator', desc: 'Plot + construction yield analysis' },
    { name: 'Stamp Duty Calculator', href: '/tools/stamp-duty-calculator', desc: 'Haryana & Delhi duty estimates' },
  ].filter((t) => !q || t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)).slice(0, 3)

  const articles = getArticles()
    .filter((a) => !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q))
    .slice(0, 3)

  const handleSelect = (href: string) => {
    onClose()
    router.push(href)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-ink-900/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search commercial properties, corridors and intelligence"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-line-200 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-line-200 bg-blue-50/70">
          <Search className="size-5 text-blue-600 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects (e.g. M3M IFC), corridors, tools, or guides..."
            className="w-full bg-transparent text-ink-900 placeholder:text-muted-600 focus:outline-none text-base"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-muted-600 hover:text-ink-900"
              aria-label="Clear query"
            >
              <X className="size-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-2 px-2.5 py-1 text-xs font-semibold rounded-md bg-white border border-line-200 text-ink-900 hover:bg-blue-50 transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-6">
          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-600 px-2 mb-2 flex items-center gap-1.5">
                <Building2 className="size-3 text-blue-600" />
                Featured Commercial Developments
              </div>
              <div className="space-y-1">
                {projects.map((p) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => handleSelect(`/projects/${p.slug}`)}
                    className="w-full text-left flex items-center justify-between p-2.5 rounded-lg hover:bg-blue-50 group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-semibold text-ink-900 group-hover:text-blue-600 transition-colors">
                        {p.name}
                      </div>
                      <div className="text-xs text-muted-600">
                        {p.developer} • {p.sector}
                      </div>
                    </div>
                    <ArrowRight className="size-4 text-muted-600 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Locations */}
          {locations.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-600 px-2 mb-2 flex items-center gap-1.5">
                <MapPin className="size-3 text-blue-600" />
                Corridors & Micro-Markets
              </div>
              <div className="grid sm:grid-cols-2 gap-1.5">
                {locations.map((l) => (
                  <button
                    key={l.slug}
                    type="button"
                    onClick={() => handleSelect(`/locations/${l.slug}`)}
                    className="text-left p-2.5 rounded-lg hover:bg-blue-50 group transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-semibold text-ink-900 group-hover:text-blue-600 transition-colors">
                        {l.shortName}
                      </div>
                      <div className="text-xs text-muted-600">Key commercial hub</div>
                    </div>
                    <ArrowRight className="size-3.5 text-muted-600 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tools */}
          {tools.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-600 px-2 mb-2 flex items-center gap-1.5">
                <Calculator className="size-3 text-blue-600" />
                Investment Calculators
              </div>
              <div className="space-y-1">
                {tools.map((t) => (
                  <button
                    key={t.href}
                    type="button"
                    onClick={() => handleSelect(t.href)}
                    className="w-full text-left flex items-center justify-between p-2.5 rounded-lg hover:bg-blue-50 group transition-colors"
                  >
                    <div>
                      <div className="text-sm font-semibold text-ink-900 group-hover:text-blue-600 transition-colors">
                        {t.name}
                      </div>
                      <div className="text-xs text-muted-600">{t.desc}</div>
                    </div>
                    <ArrowRight className="size-4 text-muted-600 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Articles */}
          {articles.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-600 px-2 mb-2 flex items-center gap-1.5">
                <BookOpen className="size-3 text-blue-600" />
                Market Reports & Guides
              </div>
              <div className="space-y-1">
                {articles.map((a) => (
                  <button
                    key={a.slug}
                    type="button"
                    onClick={() => handleSelect(`/insights/${a.category}/${a.slug}`)}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-blue-50 group transition-colors"
                  >
                    <div className="text-sm font-medium text-ink-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {a.title}
                    </div>
                    <div className="text-xs text-muted-600 mt-0.5 line-clamp-1">{a.excerpt}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {projects.length === 0 && locations.length === 0 && tools.length === 0 && (
            <div className="py-8 text-center text-muted-600 text-sm">
              No results found for &ldquo;{query}&rdquo;. Try searching for &ldquo;Office&rdquo;, &ldquo;Golf Course Road&rdquo;, or &ldquo;Yield&rdquo;.
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-blue-50 border-t border-line-200 flex items-center justify-between text-[11px] text-muted-600">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-line-200 rounded font-mono text-[10px]">Esc</kbd> to exit</span>
          <Link href="/projects" onClick={onClose} className="text-red-600 font-bold hover:underline">
            View all projects &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
