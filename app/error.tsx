'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Home, RefreshCw, AlertTriangle } from 'lucide-react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('App runtime error:', error)
  }, [error])

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 bg-sand-50">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <div className="size-16 rounded-full bg-danger-600/10 text-danger-600 flex items-center justify-center mb-6">
          <AlertTriangle className="size-8" />
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary-900">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm text-muted-600 max-w-md leading-relaxed font-sans">
          An unexpected error occurred while loading this commercial real estate page. Please retry or return to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="coral-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow"
          >
            <RefreshCw className="size-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-white border border-sand-100 text-primary-900 hover:bg-sand-100 transition-colors shadow-sm"
          >
            <Home className="size-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
