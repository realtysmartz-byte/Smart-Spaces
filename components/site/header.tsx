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
  Calculator,
  BookOpen,
  Info,
} from 'lucide-react'
import { siteConfig, whatsappHref } from '@/lib/site-config'
import { Logo } from './logo'
import { MobileNav } from './mobile-nav'
import { SearchDialog } from './search-dialog'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<'properties' | 'locations' | 'more' | null>(null)

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // At top: scrollY <= 40px
      setIsScrolled(currentScrollY > 40)

      // Hide on scroll down, show on scroll up (keep visible if search dialog or dropdown active)
      if (searchOpen || activeDropdown !== null) {
        setIsVisible(true)
      } else if (currentScrollY > 90 && currentScrollY > lastScrollY.current + 8) {
        setIsVisible(false) // Scroll down
      } else if (currentScrollY < lastScrollY.current - 6 || currentScrollY <= 40) {
        setIsVisible(true) // Scroll up
      }

      lastScrollY.current = currentScrollY
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [searchOpen, activeDropdown])

  const handleMouseEnter = (menu: 'properties' | 'locations' | 'more') => {
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

  // Locations Mega Menu Items (7 corridors)
  const locationItems = [
    { name: 'Golf Course Road', href: '/locations/golf-course-road', tag: 'Prime Institutional' },
    { name: 'Golf Course Extn Road', href: '/locations/golf-course-extension-road', tag: 'High-End Retail & Offices' },
    { name: 'Southern Peripheral Road (SPR)', href: '/locations/southern-peripheral-road', tag: 'SCO & Mixed-Use' },
    { name: 'Dwarka Expressway', href: '/locations/dwarka-expressway', tag: 'Growth Corridor' },
    { name: 'Sohna Road', href: '/locations/sohna-road', tag: 'Established Hub' },
    { name: 'New Gurgaon', href: '/locations/new-gurgaon', tag: 'Emerging Commercial' },
    { name: 'Manesar', href: '/locations/manesar', tag: 'Corporate & Logistics' },
  ]

  const primaryNavLinks = [
    { label: 'Offices', href: '/office-space-in-gurgaon' },
    { label: 'Retail', href: '/retail-property-in-gurgaon' },
    { label: 'SCO', href: '/sco-plots-in-gurgaon' },
    { label: 'Investment', href: '/commercial-property-for-investment-in-gurgaon' },
  ]

  const secondaryNavLinks = [
    { label: 'Insights', href: '/insights', icon: BookOpen },
    { label: 'Calculators', href: '/tools', icon: Calculator },
    { label: 'Compare', href: '/compare', icon: Building2 },
    { label: 'About', href: '/about', icon: Info },
  ]

  return (
    <>
      {/* Attached top navbar: position fixed, top: 0, left: 0, right: 0, full-width, no margin */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ease-in-out',
          isVisible ? 'translate-y-0' : '-translate-y-full',
          isScrolled
            ? 'h-16 bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(20,33,61,0.08)]'
            : 'h-[72px] bg-white shadow-none'
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-red-600 focus:px-3 focus:py-2 focus:text-white focus:font-bold"
        >
          Skip to content
        </a>

        <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 xl:gap-4">
          {/* Logo Left */}
          <div className="shrink-0">
            <Logo inverted={false} isScrolled={isScrolled} />
          </div>

          {/* Desktop Navigation Links Center (14px, weight 500, deep ink text) */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-2.5 lg:gap-3 xl:gap-4.5 2xl:gap-6 shrink-0">
            {/* Properties Dropdown */}
            <div
              className="relative py-1.5"
              onMouseEnter={() => handleMouseEnter('properties')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={cn(
                  'group flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none whitespace-nowrap',
                  pathname.startsWith('/projects') ||
                    pathname === '/office-space-in-gurgaon' ||
                    pathname === '/retail-property-in-gurgaon' ||
                    pathname === '/sco-plots-in-gurgaon'
                    ? 'text-blue-600 font-semibold'
                    : 'text-ink-900 hover:text-blue-600'
                )}
                aria-expanded={activeDropdown === 'properties'}
              >
                <span>Properties</span>
                <ChevronDown
                  className={cn(
                    'size-3.5 transition-transform duration-200 text-muted-600 group-hover:text-blue-600',
                    activeDropdown === 'properties' && 'rotate-180 text-blue-600'
                  )}
                />
                <span
                  className={cn(
                    'absolute -bottom-1.5 left-0 right-0 h-[2px] bg-red-600 transition-all duration-200 rounded-full',
                    pathname.startsWith('/projects') ||
                      pathname === '/office-space-in-gurgaon' ||
                      pathname === '/retail-property-in-gurgaon' ||
                      pathname === '/sco-plots-in-gurgaon'
                      ? 'opacity-100 scale-x-100'
                      : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  )}
                />
              </button>

              {/* Properties Mega Menu Dropdown Card (Clean White) */}
              {activeDropdown === 'properties' && (
                <div
                  className="absolute top-full -left-4 w-[480px] bg-white border border-line-200 rounded-2xl shadow-[0_12px_36px_rgba(20,33,61,0.12)] p-4 mt-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50 text-left"
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
                          className="flex flex-col p-3 rounded-xl hover:bg-blue-50 transition-colors group/item border border-transparent hover:border-blue-100"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="flex items-center gap-2 text-sm font-semibold text-ink-900 group-hover/item:text-blue-600 transition-colors">
                              <Icon className="size-4 text-blue-600" />
                              {item.title}
                            </span>
                          </div>
                          <span className="text-xs text-muted-600 line-clamp-2 leading-relaxed">
                            {item.desc}
                          </span>
                        </Link>
                      )
                    })}
                  </div>

                  <div className="mt-3 pt-3 border-t border-line-200 flex items-center justify-between px-2">
                    <span className="text-xs text-muted-600">Explore complete catalog</span>
                    <Link
                      href="/projects"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      Browse All Projects <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div
              className="relative py-1.5"
              onMouseEnter={() => handleMouseEnter('locations')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={cn(
                  'group flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none whitespace-nowrap',
                  pathname.startsWith('/locations')
                    ? 'text-blue-600 font-semibold'
                    : 'text-ink-900 hover:text-blue-600'
                )}
                aria-expanded={activeDropdown === 'locations'}
              >
                <span>Locations</span>
                <ChevronDown
                  className={cn(
                    'size-3.5 transition-transform duration-200 text-muted-600 group-hover:text-blue-600',
                    activeDropdown === 'locations' && 'rotate-180 text-blue-600'
                  )}
                />
                <span
                  className={cn(
                    'absolute -bottom-1.5 left-0 right-0 h-[2px] bg-red-600 transition-all duration-200 rounded-full',
                    pathname.startsWith('/locations')
                      ? 'opacity-100 scale-x-100'
                      : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  )}
                />
              </button>

              {/* Locations Dropdown Card (Clean White) */}
              {activeDropdown === 'locations' && (
                <div
                  className="absolute top-full -left-8 w-[420px] bg-white border border-line-200 rounded-2xl shadow-[0_12px_36px_rgba(20,33,61,0.12)] p-4 mt-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50 text-left"
                  onMouseEnter={() => handleMouseEnter('locations')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 px-2 mb-2">
                    Gurgaon Commercial Corridors
                  </div>
                  <div className="space-y-1">
                    {locationItems.map((loc) => (
                      <Link
                        key={loc.href}
                        href={loc.href}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors group/loc"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="size-3.5 text-blue-600 group-hover/loc:scale-110 transition-transform" />
                          <span className="text-sm font-medium text-ink-900 group-hover/loc:text-blue-600 transition-colors">
                            {loc.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-muted-600 font-medium px-2 py-0.5 rounded bg-blue-50">
                          {loc.tag}
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-line-200 px-2 flex justify-end">
                    <Link
                      href="/locations"
                      onClick={() => setActiveDropdown(null)}
                      className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      View All Corridors &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Primary Links */}
            {primaryNavLinks.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative py-1.5 text-sm font-medium transition-colors group whitespace-nowrap',
                    isActive ? 'text-blue-600 font-semibold' : 'text-ink-900 hover:text-blue-600'
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'absolute -bottom-1.5 left-0 right-0 h-[2px] bg-red-600 transition-all duration-200 rounded-full',
                      isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    )}
                  />
                </Link>
              )
            })}

            {/* On wide screens (>= 1380px), show Insights & Tools directly */}
            <div className="hidden min-[1380px]:flex items-center gap-3.5 xl:gap-4.5">
              <Link
                href="/insights"
                className={cn(
                  'relative py-1.5 text-sm font-medium transition-colors group whitespace-nowrap',
                  pathname.startsWith('/insights') ? 'text-blue-600 font-semibold' : 'text-ink-900 hover:text-blue-600'
                )}
              >
                Insights
                <span
                  className={cn(
                    'absolute -bottom-1.5 left-0 right-0 h-[2px] bg-red-600 transition-all duration-200 rounded-full',
                    pathname.startsWith('/insights') ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  )}
                />
              </Link>

              <Link
                href="/tools"
                className={cn(
                  'relative py-1.5 text-sm font-medium transition-colors group whitespace-nowrap',
                  pathname.startsWith('/tools') ? 'text-blue-600 font-semibold' : 'text-ink-900 hover:text-blue-600'
                )}
              >
                Tools
                <span
                  className={cn(
                    'absolute -bottom-1.5 left-0 right-0 h-[2px] bg-red-600 transition-all duration-200 rounded-full',
                    pathname.startsWith('/tools') ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  )}
                />
              </Link>
            </div>

            {/* Below 1380px: "More" dropdown for secondary items to guarantee zero button overflow */}
            <div
              className="relative py-1.5 min-[1380px]:hidden"
              onMouseEnter={() => handleMouseEnter('more')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={cn(
                  'group flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none whitespace-nowrap',
                  pathname === '/insights' || pathname.startsWith('/tools') || pathname === '/compare' || pathname === '/about'
                    ? 'text-blue-600 font-semibold'
                    : 'text-ink-900 hover:text-blue-600'
                )}
                aria-expanded={activeDropdown === 'more'}
              >
                <span>More</span>
                <ChevronDown
                  className={cn(
                    'size-3.5 transition-transform duration-200 text-muted-600 group-hover:text-blue-600',
                    activeDropdown === 'more' && 'rotate-180 text-blue-600'
                  )}
                />
              </button>

              {activeDropdown === 'more' && (
                <div
                  className="absolute top-full right-0 w-48 bg-white border border-line-200 rounded-xl shadow-[0_8px_30px_rgba(20,33,61,0.12)] p-2 mt-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50 text-left"
                  onMouseEnter={() => handleMouseEnter('more')}
                  onMouseLeave={handleMouseLeave}
                >
                  {secondaryNavLinks.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-ink-900 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Icon className="size-4 text-blue-600" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons & Red-600 Shortlist Button (Never clipped/overflowed) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full text-ink-900 hover:text-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/30"
              aria-label="Search commercial properties and intelligence"
              title="Search (Ctrl + K)"
            >
              <Search className="size-4 sm:size-4.5" />
            </button>

            {/* WhatsApp Icon Button (Royal Blue / Accent) */}
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/30"
              aria-label="Chat on WhatsApp with Commercial Advisor"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="size-4 sm:size-4.5" />
            </a>

            {/* Red-600 "Get My Shortlist" CTA — Logo Red, Never clipped */}
            <Link
              href="/contact#shortlist"
              className="red-btn hidden sm:inline-flex items-center justify-center px-3.5 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap shrink-0 shadow-sm rounded-xl"
            >
              <span>Get My Shortlist</span>
            </Link>

            {/* Mobile Drawer Toggle (visible below lg) */}
            <MobileNav />
          </div>
        </div>
      </header>

      {/* Global Command Palette / Search Dialog */}
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
