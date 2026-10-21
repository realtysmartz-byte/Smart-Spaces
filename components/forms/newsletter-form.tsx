'use client'

import { useActionState, useId } from 'react'
import { usePathname } from 'next/navigation'
import { subscribeNewsletter } from '@/app/actions/enquiry'
import type { FormState } from '@/lib/validation'
import { Input } from '@/components/ui/input'
import { FormGuards, FormMessage, SubmitButton } from './form-parts'

const initial: FormState = { status: 'idle' }

export function NewsletterForm() {
  const id = useId()
  const pathname = usePathname()
  const [state, action, pending] = useActionState(subscribeNewsletter, initial)
  if (state.status === 'success') return <FormMessage state={state} />
  return (
    <form action={action} className="relative flex flex-col gap-3">
      <FormGuards />
      <input type="hidden" name="sourcePage" value={pathname} />
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <Input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="h-11 flex-1 bg-card"
        />
        <SubmitButton pending={pending}>Subscribe</SubmitButton>
      </div>
      <FormMessage state={state} />
    </form>
  )
}
