'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { SiteHeader } from './header'
import { SiteFooter } from './footer'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return (
      <main id="main" className="flex-1 w-full overflow-x-clip bg-blue-50/40 font-sans text-ink-900">
        {children}
      </main>
    )
  }

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 pt-[72px] w-full overflow-x-clip">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
