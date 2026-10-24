'use client'

import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { FormState } from '@/lib/validation'
import { cn } from '@/lib/utils'

/** Hidden anti-spam fields: honeypot, client-side start time and idempotency key. */
export function FormGuards() {
  return (
    <>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input
        type="hidden"
        name="startedAt"
        defaultValue=""
        ref={(el) => {
          if (el && !el.value) el.value = String(Date.now())
        }}
      />
      <input
        type="hidden"
        name="idempotencyKey"
        defaultValue=""
        ref={(el) => {
          if (el && !el.value) el.value = crypto.randomUUID()
        }}
      />
    </>
  )
}

export function Field({
  id,
  label,
  error,
  optional,
  children,
  className,
}: {
  id: string
  label: string
  error?: string
  optional?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional && <span className="font-normal text-muted-foreground"> (optional)</span>}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function TextField({
  id,
  name,
  label,
  error,
  optional,
  className,
  ...props
}: React.ComponentProps<'input'> & { id: string; name: string; label: string; error?: string; optional?: boolean }) {
  return (
    <Field id={id} label={label} error={error} optional={optional} className={className}>
      <Input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-11 bg-card"
        {...props}
      />
    </Field>
  )
}

export function NativeSelect({
  id,
  name,
  label,
  options,
  placeholder,
  error,
  optional,
  defaultValue,
  className,
}: {
  id: string
  name: string
  label: string
  options: readonly { value: string; label: string }[]
  placeholder: string
  error?: string
  optional?: boolean
  defaultValue?: string
  className?: string
}) {
  return (
    <Field id={id} label={label} error={error} optional={optional} className={className}>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue ?? ''}
        aria-invalid={error ? true : undefined}
        className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.label}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  )
}

export function SubmitButton({ pending, children, className }: { pending: boolean; children: React.ReactNode; className?: string }) {
  return (
    <Button type="submit" size="lg" disabled={pending} aria-disabled={pending} className={cn('!bg-red-600 hover:!bg-red-700 !text-white h-11 px-6 rounded-xl text-sm font-semibold shadow-md transition-all', className)}>
      {pending && <Loader2 className="animate-spin" aria-hidden="true" />}
      {pending ? 'Submitting…' : children}
    </Button>
  )
}

export function FormMessage({ state }: { state: FormState }) {
  if (state.status === 'idle') return null
  const ok = state.status === 'success'
  return (
    <div
      role={ok ? 'status' : 'alert'}
      className={cn(
        'flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm',
        ok ? 'border-success/30 bg-success/10 text-success' : 'border-destructive/30 bg-destructive/10 text-destructive',
      )}
    >
      {ok ? <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> : <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />}
      <span>{state.message}</span>
    </div>
  )
}

export function ConsentNote() {
  return (
    <p className="text-xs leading-relaxed text-muted-foreground">
      By submitting, you agree to be contacted by Smartz Spaces about your enquiry. We never share your details. See our{' '}
      <a href="/privacy-policy" className="underline hover:text-foreground">
        privacy policy
      </a>
      .
    </p>
  )
}
