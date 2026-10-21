'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Search,
  MessageCircle,
  ChevronDown,
  Building2,
  Store,
  LandPlot,
  TrendingUp,
  MapPin,
  ArrowRight,
} from 'lucide-react'
import { siteConfig, whatsappHref } from '@/lib/site-config'
import { Logo } from './logo'
import { MobileNav } from './mobile-nav'
import { SearchDialog } from './search-dialog'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const [isScrolled, setIsScrolled] = useState(!isHomePage)
  const [isCompact, setIsCompact] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<'properties' | 'locations' | null>(null)

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Transparent to solid transition
      if (isHomePage) {
        setIsScrolled(currentScrollY > 40)
      } else {
        setIsScrolled(true)
      }

      // Compact shrink on scroll down, expand back on scroll up
      if (currentScrollY > 120 && currentScrollY > lastScrollY.current + 5) {
        setIsCompact(true)
      } else if (currentScrollY < lastScrollY.current - 10 || currentScrollY <= 40) {
        setIsCompact(false)
      }

      lastScrollY.current = currentScrollY
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  const handleMouseEnter = (menu: 'properties' | 'locations') => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
    setActiveDropdown(menu)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 180)
  }

  // Properties Mega Menu Items
  const propertyItems = [
    {
      title: 'Commercial Offices',
      desc: 'Grade A corporate towers, IT parks and managed office suites',
      href: '/office-space-in-gurgaon',
      icon: Building2,
      badge: 'Grade A',
    },
    {
      title: 'Retail Shops & F&B',
      desc: 'High-street storefronts, anchor zones and dining promenades',
      href: '/retail-property-in-gurgaon',
      icon: Store,
      badge: 'High Footfall',
    },
    {
      title: 'SCO Commercial Plots',
      desc: 'Freehold commercial land with plot + building ownership',
      href: '/sco-plots-in-gurgaon',
      icon: LandPlot,
      badge: '100% Ownership',
    },
    {
      title: 'Pre-Leased Commercial',
      desc: 'Steady day-one rental cash flows with corporate covenants',
      href: '/commercial-property-for-investment-in-gurgaon#pre-leased',
      icon: TrendingUp,
      badge: 'Immediate Yield',
    },
  ]

  // Locations Mega Menu Items
  const locationItems = [
    { name: 'Golf Course Road', href: '/locations/golf-course-road', tag: 'Prime Institutional' },
    { name: 'Golf Course Extn Road', href: '/locations/golf-course-extension-road', tag: 'High-End Retail & Offices' },
    { name: 'Southern Peripheral Road (SPR)', href: '/locations/southern-peripheral-road', tag: 'SCO & Mixed-Use' },
    { name: 'Dwarka Expressway', href: '/locations/dwarka-expressway', tag: 'Growth Corridor' },
    { name: 'Sohna Road', href: '/locations/sohna-road', tag: 'Established Hub' },
    { name: 'New Gurgaon', href: '/locations/new-gurgaon', tag: 'Emerging Commercial' },
    { name: 'Manesar', href: '/locations/manesar', tag: 'Corporate & Logistics' },
  ]

  const navLinks = [
    { label: 'Offices', href: '/office-space-in-gurgaon' },
    { label: 'Retail', href: '/retail-property-in-gurgaon' },
    { label: 'SCO', href: '/sco-plots-in-gurgaon' },
    { label: 'Investment', href: '/commercial-property-for-investment-in-gurgaon' },
    { label: 'Insights', href: '/insights' },
    { label: 'Tools', href: '/tools' },
  ]

  const isSolid = isScrolled || !isHomePage

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out',
          isSolid
            ? 'bg-primary-900/98 backdrop-blur-md shadow-xl'
            : 'bg-transparent'
        )}
      >
        {/* Dark Top Gradient Scrim on Hero for link contrast */}
        {!isSolid && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-transparent pointer-events-none -z-10" />
        )}

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-accent-500 focus:px-3 focus:py-2 focus:text-white focus:font-bold"
        >
          Skip to content
        </a>

        <div
          className={cn(
            'mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 gap-2',
            isCompact ? 'h-16' : 'h-20'
          )}
        >
          {/* Brand Logo with 3D Architectural Emblem */}
          <div className="shrink-0">
            <Logo inverted={true} />
          </div>

          {/* Desktop Navigation - Responsive Spacing & No Overflow */}
          <nav aria-label="Primary" className="hidden xl:flex items-center gap-1 2xl:gap-2 shrink-0">
            {/* Properties Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('properties')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={cn(
                  'group flex items-center gap-1 px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-medium transition-colors rounded-md focus:outline-none whitespace-nowrap',
                  pathname.startsWith('/projects') ||
                    pathname === '/office-space-in-gurgaon' ||
                    pathname === '/retail-property-in-gurgaon' ||
                    pathname === '/sco-plots-in-gurgaon'
                    ? 'text-accent-500 font-semibold'
                    : 'text-white/90 hover:text-white'
                )}
                aria-expanded={activeDropdown === 'properties'}
              >
                <span>Properties</span>
                <ChevronDown
                  className={cn(
                    'size-3.5 transition-transform duration-200 text-accent-500/80 group-hover:text-accent-500',
                    activeDropdown === 'properties' && 'rotate-180'
                  )}
                />
                <span
                  className={cn(
                    'absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-accent-500 transition-all duration-200 rounded-full',
                    pathname.startsWith('/projects') ||
                      pathname === '/office-space-in-gurgaon' ||
                      pathname === '/retail-property-in-gurgaon' ||
                      pathname === '/sco-plots-in-gurgaon'
                      ? 'opacity-100 scale-x-100'
                      : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  )}
                />
              </button>

              {/* Properties Mega Menu Dropdown Card */}
              {activeDropdown === 'properties' && (
                <div
                  className="absolute top-full left-0 w-[470px] bg-primary-900/98 backdrop-blur-xl border border-primary-700/90 rounded-2xl shadow-2xl p-4 mt-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50 text-left"
                  onMouseEnter={() => handleMouseEnter('properties')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {propertyItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex flex-col p-3 rounded-xl hover:bg-primary-700/60 transition-colors group/item border border-transparent hover:border-accent-500/20"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="flex items-center gap-2 text-sm font-semibold text-white group-hover/item:text-accent-500 transition-colors">
                              <Icon className="size-4 text-accent-500" />
                              {item.title}
                            </span>
                          </div>
                          <span className="text-xs text-sand-50/70 line-clamp-2 leading-relaxed">
                            {item.desc}
                          </span>
                        </Link>
                      )
                    })}
                  </div>

                  <div className="mt-3 pt-3 border-t border-primary-700/80 flex items-center justify-between px-2">
                    <span className="text-xs text-sand-50/60">Ready to explore all projects?</span>
                    <Link
                      href="/projects"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-bold text-accent-500 hover:text-accent-600 flex items-center gap-1"
                    >
                      Browse All Projects <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('locations')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={cn(
                  'group flex items-center gap-1 px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-medium transition-colors rounded-md focus:outline-none whitespace-nowrap',
                  pathname.startsWith('/locations')
                    ? 'text-accent-500 font-semibold'
                    : 'text-white/90 hover:text-white'
                )}
                aria-expanded={activeDropdown === 'locations'}
              >
                <span>Locations</span>
                <ChevronDown
                  className={cn(
                    'size-3.5 transition-transform duration-200 text-accent-500/80 group-hover:text-accent-500',
                    activeDropdown === 'locations' && 'rotate-180'
                  )}
                />
                <span
                  className={cn(
                    'absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-accent-500 transition-all duration-200 rounded-full',
                    pathname.startsWith('/locations')
                      ? 'opacity-100 scale-x-100'
                      : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  )}
                />
              </button>

              {/* Locations Dropdown Card */}
              {activeDropdown === 'locations' && (
                <div
                  className="absolute top-full -left-12 w-[420px] bg-primary-900/98 backdrop-blur-xl border border-primary-700/90 rounded-2xl shadow-2xl p-4 mt-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50 text-left"
                  onMouseEnter={() => handleMouseEnter('locations')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="text-[11px] font-bold uppercase tracking-wider text-accent-500/90 px-2 mb-2">
                    Gurgaon Commercial Corridors
                  </div>
                  <div className="space-y-1">
                    {locationItems.map((loc) => (
                      <Link
                        key={loc.href}
                        href={loc.href}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-primary-700/60 transition-colors group/loc"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="size-3.5 text-accent-500 group-hover/loc:scale-110 transition-transform" />
                          <span className="text-sm font-medium text-white group-hover/loc:text-accent-500 transition-colors">
                            {loc.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-sand-50/70 font-medium px-2 py-0.5 rounded bg-primary-700/50">
                          {loc.tag}
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-primary-700/80 px-2 flex justify-end">
                    <Link
                      href="/locations"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-bold text-accent-500 hover:text-accent-600 flex items-center gap-1"
                    >
                      View All Corridors &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Links */}
            {navLinks.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-2.5 xl:px-3 py-1.5 text-xs xl:text-sm font-medium transition-colors group rounded-md whitespace-nowrap',
                    isActive ? 'text-accent-500 font-semibold' : 'text-white/90 hover:text-white'
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-accent-500 transition-all duration-200 rounded-full',
                      isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          {/* Right Action Icons & Coral Shortlist Button (Fully Visible, No Overflow) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 sm:p-2.5 rounded-full text-white/90 hover:text-accent-500 hover:bg-primary-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500/50"
              aria-label="Search commercial properties and intelligence"
              title="Search (Ctrl + K)"
            >
              <Search className="size-4 sm:size-5" />
            </button>

            {/* WhatsApp Icon Button */}
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 rounded-full text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              aria-label="Chat on WhatsApp with Commercial Advisor"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="size-4 sm:size-5" />
            </a>

            {/* Coral "Get My Shortlist" CTA — Fully visible, shrink-0, never clipped */}
            <Link
              href="/contact#shortlist"
              className="coral-btn hidden xl:inline-flex items-center justify-center px-4 py-2 xl:px-4 xl:py-2.5 rounded-xl text-xs xl:text-sm font-bold shadow-lg tracking-wide whitespace-nowrap shrink-0"
            >
              <span>Get My Shortlist</span>
            </Link>

            {/* Mobile Drawer Toggle (visible on screens below lg) */}
            <MobileNav />
          </div>
        </div>
      </header>

      {/* Global Command Palette / Search Dialog */}
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
