'use client'

import { useActionState, useId, useState } from 'react'
import { usePathname } from 'next/navigation'
import { submitEnquiry } from '@/app/actions/enquiry'
import { enquirySchema, fieldErrorsFrom, type FormState, type FormType } from '@/lib/validation'
import { budgetBands, investmentGoals } from '@/lib/data/content'
import { Textarea } from '@/components/ui/textarea'
import { ConsentNote, Field, FormGuards, FormMessage, NativeSelect, SubmitButton, TextField } from './form-parts'
import { cn } from '@/lib/utils'

export type EnquiryFormProps = {
  formType: FormType
  relatedProject?: string
  submitLabel?: string
  showMessage?: boolean
  showBudget?: boolean
  showLocation?: boolean
  showGoal?: boolean
  messagePlaceholder?: string
  locations?: { value: string; label: string }[]
  defaultLocation?: string
  className?: string
}

const initial: FormState = { status: 'idle' }

export function EnquiryForm({
  formType,
  relatedProject,
  submitLabel = 'Submit enquiry',
  showMessage = true,
  showBudget = false,
  showLocation = false,
  showGoal = false,
  messagePlaceholder = 'Tell us what you are looking for',
  locations = [],
  defaultLocation,
  className,
}: EnquiryFormProps) {
  const id = useId()
  const pathname = usePathname()
  const [state, action, pending] = useActionState(submitEnquiry, initial)
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({})
  const errors = { ...(state.status === 'error' ? state.fieldErrors : {}), ...clientErrors }

  if (state.status === 'success') {
    return (
      <div className={className}>
        <FormMessage state={state} />
      </div>
    )
  }

  return (
    <form
      action={action}
      noValidate
      className={cn('relative flex flex-col gap-4', className)}
      onSubmit={(e) => {
        const fd = new FormData(e.currentTarget)
        const result = enquirySchema.safeParse(Object.fromEntries([...fd.entries()].map(([k, v]) => [k, String(v)])))
        if (!result.success) {
          e.preventDefault()
          setClientErrors(fieldErrorsFrom(result.error))
        } else {
          setClientErrors({})
        }
      }}
    >
      <FormGuards />
      <input type="hidden" name="formType" value={formType} />
      <input type="hidden" name="sourcePage" value={pathname} />
      {relatedProject && <input type="hidden" name="relatedProject" value={relatedProject} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id={`${id}-name`} name="name" label="Full name" autoComplete="name" required error={errors.name} />
        <TextField
          id={`${id}-phone`}
          name="phone"
          label="Mobile number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="98XXXXXXXX"
          required
          error={errors.phone}
        />
      </div>
      <TextField id={`${id}-email`} name="email" label="Email" type="email" autoComplete="email" optional error={errors.email} />

      {(showBudget || showLocation) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {showBudget && (
            <NativeSelect id={`${id}-budget`} name="budget" label="Budget" placeholder="Select budget" options={budgetBands} optional />
          )}
          {showLocation && (
            <NativeSelect
              id={`${id}-location`}
              name="preferredLocation"
              label="Preferred location"
              placeholder="Any location"
              options={locations}
              defaultValue={defaultLocation}
              optional
            />
          )}
        </div>
      )}
      {showGoal && (
        <NativeSelect id={`${id}-goal`} name="investmentGoal" label="Investment goal" placeholder="Select goal" options={investmentGoals} optional />
      )}
      {showMessage && (
        <Field id={`${id}-message`} label="Message" optional error={errors.message}>
          <Textarea id={`${id}-message`} name="message" rows={3} placeholder={messagePlaceholder} className="bg-card" maxLength={2000} />
        </Field>
      )}

      <FormMessage state={state} />
      <SubmitButton pending={pending}>{submitLabel}</SubmitButton>
      <ConsentNote />
    </form>
  )
}
