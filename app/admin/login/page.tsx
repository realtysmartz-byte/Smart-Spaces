'use client'

import { useState } from 'react'
import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function AdminLoginPage() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError('')

    const username = formData.get('username') as string
    const password = formData.get('password') as string

    // In production, this would be a server action with bcrypt verification
    // For now, this is a placeholder
    if (username === 'admin' && password === 'admin123') {
      // Set session cookie via server action
      await fetch('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })
      router.push('/admin')
    } else {
      setError('Invalid credentials')
    }

    setPending(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Building2 className="mx-auto size-12 text-primary mb-4" />
          <h1 className="text-2xl font-semibold">Admin Login</h1>
          <p className="text-muted-foreground mt-2">Smartz Spaces Admin Panel</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <form action={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" type="text" required autoComplete="username" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required autoComplete="current-password" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button type="submit" disabled={pending} className={cn(buttonVariants({ className: 'w-full' }))}>
              {pending ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Default credentials: admin / admin123 (change in production)
        </p>
      </div>
    </div>
  )
}
