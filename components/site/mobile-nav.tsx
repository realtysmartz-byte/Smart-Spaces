'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  ChevronDown,
  Building2,
  Store,
  LandPlot,
  TrendingUp,
  MapPin,
} from 'lucide-react'
import { siteConfig, whatsappHref } from '@/lib/site-config'
import { Logo } from './logo'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [propertiesOpen, setPropertiesOpen] = useState(false)
  const [locationsOpen, setLocationsOpen] = useState(false)

  const close = () => {
    setOpen(false)
    setPropertiesOpen(false)
    setLocationsOpen(false)
  }

  const phone = siteConfig.contact.phones[0]

  const propertyLinks = [
    { label: 'All Projects', href: '/projects', icon: Building2 },
    { label: 'Offices (Grade A & IT)', href: '/office-space-in-gurgaon', icon: Building2 },
    { label: 'Retail Shops & F&B', href: '/retail-property-in-gurgaon', icon: Store },
    { label: 'SCO Commercial Plots', href: '/sco-plots-in-gurgaon', icon: LandPlot },
    { label: 'Pre-Leased Commercial', href: '/commercial-property-for-investment-in-gurgaon#pre-leased', icon: TrendingUp },
  ]

  const locationLinks = [
    { label: 'Golf Course Road', href: '/locations/golf-course-road' },
    { label: 'Golf Course Extension Road', href: '/locations/golf-course-extension-road' },
    { label: 'Southern Peripheral Road (SPR)', href: '/locations/southern-peripheral-road' },
    { label: 'Dwarka Expressway', href: '/locations/dwarka-expressway' },
    { label: 'Sohna Road', href: '/locations/sohna-road' },
    { label: 'New Gurgaon', href: '/locations/new-gurgaon' },
    { label: 'Manesar', href: '/locations/manesar' },
  ]

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="xl:hidden p-2 sm:p-2.5 rounded-xl text-white hover:bg-primary-700/60 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500/50 shrink-0"
        aria-label="Open primary menu"
        aria-expanded={open}
      >
        <Menu className="size-6" />
      </button>

      {/* Slide-in Mobile Drawer */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex xl:hidden bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="ml-auto w-full max-w-sm h-full bg-primary-900 text-white flex flex-col shadow-2xl border-l border-primary-700 animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-primary-700/80">
              <Logo inverted={true} compact={true} />
              <button
                type="button"
                onClick={close}
                className="p-2 rounded-full text-white/80 hover:text-white hover:bg-primary-700/60 focus:outline-none"
                aria-label="Close menu"
              >
                <X className="size-6" />
              </button>
            </div>

            {/* Nav list with large tap targets and accordions */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              <Link
                href="/"
                onClick={close}
                className="block py-3 px-3 text-base font-semibold rounded-lg hover:bg-primary-700/60 transition-colors"
              >
                Home
              </Link>

              {/* Properties Accordion */}
              <div className="border-b border-primary-700/40 pb-1">
                <button
                  type="button"
                  onClick={() => setPropertiesOpen(!propertiesOpen)}
                  className="w-full flex items-center justify-between py-3 px-3 text-base font-semibold rounded-lg hover:bg-primary-700/60 text-left transition-colors"
                  aria-expanded={propertiesOpen}
                >
                  <span>Properties</span>
                  <ChevronDown
                    className={cn(
                      'size-4 text-accent-500 transition-transform duration-200',
                      propertiesOpen && 'rotate-180'
                    )}
                  />
                </button>
                {propertiesOpen && (
                  <div className="pl-4 pr-2 py-1 space-y-1">
                    {propertyLinks.map((p) => {
                      const Icon = p.icon
                      return (
                        <Link
                          key={p.href}
                          href={p.href}
                          onClick={close}
                          className="flex items-center gap-2.5 py-2.5 px-3 text-sm text-sand-50/85 hover:text-accent-500 hover:bg-primary-700/40 rounded-lg transition-colors"
                        >
                          <Icon className="size-4 text-accent-500" />
                          <span>{p.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Locations Accordion */}
              <div className="border-b border-primary-700/40 pb-1">
                <button
                  type="button"
                  onClick={() => setLocationsOpen(!locationsOpen)}
                  className="w-full flex items-center justify-between py-3 px-3 text-base font-semibold rounded-lg hover:bg-primary-700/60 text-left transition-colors"
                  aria-expanded={locationsOpen}
                >
                  <span>Locations</span>
                  <ChevronDown
                    className={cn(
                      'size-4 text-accent-500 transition-transform duration-200',
                      locationsOpen && 'rotate-180'
                    )}
                  />
                </button>
                {locationsOpen && (
                  <div className="pl-4 pr-2 py-1 space-y-1">
                    {locationLinks.map((loc) => (
                      <Link
                        key={loc.href}
                        href={loc.href}
                        onClick={close}
                        className="flex items-center gap-2 py-2 px-3 text-sm text-sand-50/85 hover:text-accent-500 hover:bg-primary-700/40 rounded-lg transition-colors"
                      >
                        <MapPin className="size-3.5 text-accent-500" />
                        <span>{loc.label}</span>
                      </Link>
                    ))}
                    <Link
                      href="/locations"
                      onClick={close}
                      className="block py-2 px-3 text-xs font-bold text-accent-500 hover:underline"
                    >
                      View All Corridors &rarr;
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/commercial-property-for-investment-in-gurgaon"
                onClick={close}
                className="block py-3 px-3 text-base font-semibold rounded-lg hover:bg-primary-700/60 transition-colors"
              >
                Investment Assets
              </Link>

              <Link
                href="/compare"
                onClick={close}
                className="block py-3 px-3 text-base font-semibold rounded-lg hover:bg-primary-700/60 transition-colors"
              >
                Compare Projects
              </Link>

              <Link
                href="/insights"
                onClick={close}
                className="block py-3 px-3 text-base font-semibold rounded-lg hover:bg-primary-700/60 transition-colors"
              >
                Insights & Reports
              </Link>

              <Link
                href="/tools"
                onClick={close}
                className="block py-3 px-3 text-base font-semibold rounded-lg hover:bg-primary-700/60 transition-colors"
              >
                Investment Calculators
              </Link>

              <Link
                href="/about"
                onClick={close}
                className="block py-3 px-3 text-base font-semibold rounded-lg hover:bg-primary-700/60 transition-colors"
              >
                About Smartz Spaces
              </Link>

              <Link
                href="/contact"
                onClick={close}
                className="block py-3 px-3 text-base font-semibold rounded-lg hover:bg-primary-700/60 transition-colors"
              >
                Contact Advisory Team
              </Link>
            </div>

            {/* Pinned Bottom CTA & WhatsApp Desk */}
            <div className="p-4 border-t border-primary-700 bg-primary-900/98 space-y-2.5">
              <Link
                href="/contact#shortlist"
                onClick={close}
                className="coral-btn flex items-center justify-center gap-2 w-full py-3 rounded-xl text-base font-bold shadow-xl"
              >
                <span>Get My Shortlist</span>
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${phone.tel}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-primary-700 hover:bg-primary-700/80 text-xs font-semibold text-white border border-white/10"
                >
                  <Phone className="size-3.5 text-accent-500" />
                  <span>Call Us</span>
                </a>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/40 text-xs font-semibold text-emerald-300 border border-emerald-500/30"
                >
                  <MessageCircle className="size-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
