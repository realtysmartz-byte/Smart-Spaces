'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Eye, EyeOff, Lock } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(data.message || 'Invalid username or password.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50/80 via-white to-blue-50/50 px-4 py-12 text-ink-900 font-sans">
      <div className="w-full max-w-md">
        {/* Brand Header with Authentic Logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="mb-4">
            <Logo />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-300/40 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-2">
            <Lock className="size-3 text-blue-600" />
            <span>Control Hub</span>
          </div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-ink-900">
            Administrative Sign-In
          </h1>
          <p className="text-sm text-muted-600 mt-1 max-w-sm">
            Commercial real estate inventory, leads pipeline &amp; site operations.
          </p>
        </div>

        {/* Login Card matching Website Design System */}
        <div className="rounded-2xl border border-line-200 bg-white p-8 sm:p-9 shadow-xl shadow-blue-900/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                Username or Email
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="Enter username or email"
                className="mt-1.5 h-11 bg-white border-line-200 text-ink-900 placeholder:text-muted-600/60 focus:border-blue-600 focus:ring-blue-600 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-600">
                Password
              </Label>
              <div className="relative mt-1.5">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className="h-11 pr-10 bg-white border-line-200 text-ink-900 placeholder:text-muted-600/60 focus:border-blue-600 focus:ring-blue-600 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-600 hover:text-ink-900 transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-danger-600/10 border border-danger-600/20 text-sm text-danger-600 font-medium text-center animate-in fade-in">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className={cn(
                buttonVariants({ size: 'lg' }),
                'w-full h-11 font-semibold text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-600/20 cursor-pointer flex items-center justify-center gap-2 border-0 rounded-xl transition-all',
              )}
            >
              {pending ? (
                <>
                  <div className="size-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-line-200 flex items-center justify-center gap-2 text-xs text-muted-600">
            <ShieldCheck className="size-4 text-success-600" />
            <span>Secure 256-bit encrypted administrative session</span>
          </div>
        </div>

        <div className="text-center mt-6 space-y-2">
          <Link
            href="/"
            className="text-xs font-medium text-muted-600 hover:text-blue-600 transition-colors"
          >
            &larr; Back to Smartz Spaces Homepage
          </Link>
          <p className="text-xs text-muted-600/80">
            Authorized personnel only. Smartz Spaces &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  )
}
