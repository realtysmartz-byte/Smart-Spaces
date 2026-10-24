'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 bg-white">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="font-heading text-8xl font-black text-ink-900 tracking-tight">404</span>
        <h1 className="mt-4 font-heading text-3xl font-extrabold text-ink-900 sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-base text-muted-600 max-w-md leading-relaxed font-sans">
          The commercial property listing, corridor report, or page you are looking for does not exist or has been relocated.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="red-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold shadow"
          >
            <Home className="size-4" />
            <span>Back to Home</span>
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="blue-outline-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
          >
            <ArrowLeft className="size-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  )
}
