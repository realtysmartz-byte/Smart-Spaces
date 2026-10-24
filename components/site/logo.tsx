import Link from 'next/link'
import { cn } from '@/lib/utils'

/**
 * Authentic 3D Architectural Emblem of Smartz Spaces:
 * - Left tower: Cobalt/Azure blue multi-faceted skyscraper with angular beveled roof
 * - Center tower: Hero ruby-red multi-faceted pinnacle skyscraper with specular sheen
 * - Right tower: Platinum silver / white multi-faceted skyscraper
 * - Base: Sweeping curved horizon pedestal arc
 */
export function LogoMark({
  className,
  inverted = false,
}: {
  className?: string
  inverted?: boolean
}) {
  return (
    <svg
      viewBox="0 0 110 90"
      aria-hidden="true"
      className={cn('h-10 w-auto shrink-0 drop-shadow-sm', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Blue Building Gradients */}
        <linearGradient id="ss-blue-top" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0091FF" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id="ss-blue-front" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0066D6" />
          <stop offset="100%" stopColor="#004399" />
        </linearGradient>
        <linearGradient id="ss-blue-facet" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="ss-blue-dark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#003566" />
          <stop offset="100%" stopColor="#001D3D" />
        </linearGradient>

        {/* Center Red Hero Tower Gradients */}
        <linearGradient id="ss-red-apex" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF384D" />
          <stop offset="60%" stopColor="#E5192D" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
        <linearGradient id="ss-red-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E5192D" />
          <stop offset="45%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <linearGradient id="ss-red-shadow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7F1D1D" />
          <stop offset="100%" stopColor="#450A0A" />
        </linearGradient>

        {/* Right Silver/White Building Gradients */}
        <linearGradient id="ss-silver-front" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F1F5F9" />
        </linearGradient>
        <linearGradient id="ss-silver-facet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>

        {/* Curved Base Horizon Arc Gradient */}
        <linearGradient id="ss-base-arc" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.2" />
          <stop offset="35%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Sweeping Base Pedestal Horizon Arc */}
      <path
        d="M 4 80 Q 52 75 106 80 Q 52 83.5 4 80 Z"
        fill="url(#ss-base-arc)"
      />
      <path
        d="M 10 80.5 Q 52 77 100 80.5"
        stroke="#FFFFFF"
        strokeWidth="0.8"
        strokeOpacity="0.95"
        fill="none"
      />

      {/* 1. LEFT TOWER (BLUE FACETED SKYSCRAPER) */}
      {/* Rear stepped block */}
      <path d="M 25 34 L 42 22 L 42 78 L 25 78 Z" fill="url(#ss-blue-dark)" />
      <path d="M 16 42 L 25 34 L 25 78 L 16 78 Z" fill="url(#ss-blue-facet)" />
      
      {/* Front stepped prism */}
      <path d="M 10 64 L 10 50 L 23 41 L 23 78 L 10 64 Z" fill="url(#ss-blue-front)" />
      <path d="M 10 50 L 23 41 L 38 29 L 26 40 Z" fill="url(#ss-blue-top)" />
      <path d="M 23 41 L 38 29 L 38 78 L 23 78 Z" fill="url(#ss-blue-front)" />
      <path d="M 38 29 L 45 24 L 45 78 L 38 78 Z" fill="url(#ss-blue-dark)" />
      {/* Specular edge highlight */}
      <path
        d="M 10 50 L 23 41 L 38 29"
        stroke="#93C5FD"
        strokeWidth="0.85"
        strokeOpacity="0.9"
        fill="none"
      />

      {/* 2. CENTER TOWER (RED 3D APEX SKYSCRAPER - TALLEST) */}
      {/* Pinnacle roof facet */}
      <path d="M 47 12 L 59 3 L 70 24 L 47 32 Z" fill="url(#ss-red-apex)" />
      <path d="M 59 3 L 72 16 L 70 24 Z" fill="#FF6B7A" />
      {/* Main front vertical facet */}
      <path d="M 47 32 L 59 25 L 59 78 L 47 78 Z" fill="url(#ss-red-body)" />
      {/* Left sharp corner highlight */}
      <path d="M 47 12 L 47 78" stroke="#FFFFFF" strokeWidth="0.9" strokeOpacity="0.95" />
      <path d="M 59 25 L 59 78" stroke="#FFA3AD" strokeWidth="0.6" strokeOpacity="0.6" />
      {/* Right shadow facet */}
      <path d="M 59 25 L 72 16 L 72 78 L 59 78 Z" fill="url(#ss-red-shadow)" />

      {/* 3. RIGHT TOWER (SILVER / WHITE METALLIC SKYSCRAPER) */}
      <path d="M 74 42 L 93 54 L 93 78 L 74 78 Z" fill="url(#ss-silver-facet)" />
      <path d="M 74 42 L 83 37 L 83 78 L 74 78 Z" fill="url(#ss-silver-front)" />
      <path d="M 83 37 L 93 54" stroke="#FFFFFF" strokeWidth="0.85" fill="none" />
    </svg>
  )
}

export function Logo({
  inverted = false,
  compact = false,
  isScrolled = false,
}: {
  inverted?: boolean
  compact?: boolean
  isScrolled?: boolean
}) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 sm:gap-3 group shrink-0 transition-all duration-300 hover:opacity-95"
      aria-label="Smartz Spaces - Commercial Real Estate Intelligence"
    >
      {/* 3D Multi-faceted Skyscraper Emblem */}
      <LogoMark
        inverted={inverted}
        className={cn(
          'transition-all duration-300 group-hover:scale-105',
          isScrolled ? 'h-8 sm:h-9' : 'h-10 sm:h-11'
        )}
      />

      {/* Vertical Hairline Divider */}
      <div
        className={cn(
          'hidden sm:block w-[1.5px] shrink-0 transition-all duration-300',
          isScrolled ? 'h-7' : 'h-8 sm:h-9',
          inverted ? 'bg-white/40' : 'bg-line-200'
        )}
        aria-hidden="true"
      />

      {/* Wordmark + Subline */}
      <div className="flex flex-col justify-center leading-none select-none">
        {/* SMARTZ SPACES */}
        <div className="flex items-baseline tracking-normal">
          <span
            className={cn(
              'font-extrabold tracking-tight transition-all duration-300',
              isScrolled ? 'text-[17px] sm:text-[20px]' : 'text-[19px] sm:text-[23px]',
              inverted ? 'text-white' : 'text-ink-900'
            )}
            style={{ fontFamily: "var(--font-heading), 'Poppins', sans-serif" }}
          >
            SMARTZ
          </span>
          <span
            className={cn(
              'ml-1 sm:ml-1.5 font-bold tracking-wide text-red-600 transition-all duration-300',
              isScrolled ? 'text-[17px] sm:text-[20px]' : 'text-[19px] sm:text-[23px]'
            )}
            style={{ fontFamily: "var(--font-heading), 'Poppins', sans-serif" }}
          >
            SPACES
          </span>
        </div>

        {/* COMMERCIAL REAL ESTATE INTELLIGENCE: Always visible below SMARTZ SPACES */}
        {!compact && (
          <div className="mt-0.5 flex flex-col transition-all duration-300">
            <span
              className={cn(
                'font-semibold uppercase transition-colors whitespace-nowrap',
                isScrolled
                  ? 'text-[7.5px] sm:text-[8px] tracking-[0.12em] sm:tracking-[0.15em]'
                  : 'text-[8px] sm:text-[9.5px] tracking-[0.14em] sm:tracking-[0.18em]',
                inverted ? 'text-white/85' : 'text-muted-600'
              )}
            >
              Commercial Real Estate Intelligence
            </span>
            <div
              className={cn(
                'mt-0.5 h-[1px] w-full transition-colors',
                inverted ? 'bg-white/30' : 'bg-line-200'
              )}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </Link>
  )
}
