'use client'

import { useActionState, useId, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { submitEnquiry } from '@/app/actions/enquiry'
import { enquirySchema, fieldErrorsFrom, type FormState } from '@/lib/validation'
import { budgetBands, investmentGoals } from '@/lib/data/content'
import { Button } from '@/components/ui/button'
import { ConsentNote, FormGuards, FormMessage, NativeSelect, SubmitButton, TextField } from './form-parts'
import { cn } from '@/lib/utils'

const initial: FormState = { status: 'idle' }
const steps = ['Investment goal', 'Budget & location', 'Your details'] as const

export function ShortlistForm({ locations }: { locations: { value: string; label: string }[] }) {
  const id = useId()
  const pathname = usePathname()
  const [state, action, pending] = useActionState(submitEnquiry, initial)
  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState<string>('')
  const [stepError, setStepError] = useState<string | null>(null)
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({})
  const errors = { ...(state.status === 'error' ? state.fieldErrors : {}), ...clientErrors }

  if (state.status === 'success') return <FormMessage state={state} />

  const next = () => {
    if (step === 0 && !goal) {
      setStepError('Choose an investment goal to continue.')
      return
    }
    setStepError(null)
    setStep((s) => Math.min(s + 1, steps.length - 1))
  }

  return (
    <form
      action={action}
      noValidate
      className="relative flex flex-col gap-6"
      onSubmit={(e) => {
        if (step < steps.length - 1) {
          e.preventDefault()
          next()
          return
        }
        const fd = new FormData(e.currentTarget)
        const result = enquirySchema.safeParse(Object.fromEntries([...fd.entries()].map(([k, v]) => [k, String(v)])))
        if (!result.success) {
          e.preventDefault()
          setClientErrors(fieldErrorsFrom(result.error))
        } else setClientErrors({})
      }}
    >
      <FormGuards />
      <input type="hidden" name="formType" value="shortlist" />
      <input type="hidden" name="sourcePage" value={pathname} />
      <input type="hidden" name="investmentGoal" value={goal} />

      <ol className="flex items-center gap-2" aria-label="Progress">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              aria-current={i === step ? 'step' : undefined}
              className={cn(
                'flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
                i < step && 'border-primary bg-primary text-primary-foreground',
                i === step && 'border-primary text-primary',
                i > step && 'border-border text-muted-foreground',
              )}
            >
              {i < step ? <Check className="size-3.5" aria-hidden="true" /> : i + 1}
            </span>
            <span className={cn('hidden text-sm sm:inline', i === step ? 'font-medium text-foreground' : 'text-muted-foreground')}>
              {label}
            </span>
            {i < steps.length - 1 && <span className="h-px flex-1 bg-border" aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <p className="sr-only" aria-live="polite">
        Step {step + 1} of {steps.length}: {steps[step]}
      </p>

      <fieldset hidden={step !== 0} className="flex flex-col gap-3">
        <legend className="mb-3 font-medium">What is your primary goal?</legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {investmentGoals.map((g) => (
            <label
              key={g.value}
              className={cn(
                'flex cursor-pointer flex-col gap-0.5 rounded-lg border bg-card p-3.5 transition-colors has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50',
                goal === g.label ? 'border-primary bg-secondary' : 'border-border hover:border-primary/40',
              )}
            >
              <input
                type="radio"
                name="goal-choice"
                value={g.label}
                checked={goal === g.label}
                onChange={() => {
                  setGoal(g.label)
                  setStepError(null)
                }}
                className="sr-only"
              />
              <span className="text-sm font-medium">{g.label}</span>
              <span className="text-xs text-muted-foreground">{g.description}</span>
            </label>
          ))}
        </div>
        {stepError && (
          <p role="alert" className="text-sm text-destructive">
            {stepError}
          </p>
        )}
      </fieldset>

      <fieldset hidden={step !== 1} className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-3 font-medium sm:col-span-2">Budget and preferred location</legend>
        <NativeSelect id={`${id}-budget`} name="budget" label="Budget" placeholder="Select budget" options={budgetBands} optional />
        <NativeSelect
          id={`${id}-location`}
          name="preferredLocation"
          label="Preferred location"
          placeholder="Open to suggestions"
          options={locations}
          optional
        />
      </fieldset>

      <fieldset hidden={step !== 2} className="flex flex-col gap-4">
        <legend className="mb-3 font-medium">Where should we send your shortlist?</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField id={`${id}-name`} name="name" label="Full name" autoComplete="name" error={errors.name} />
          <TextField
            id={`${id}-phone`}
            name="phone"
            label="Mobile number"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98XXXXXXXX"
            error={errors.phone}
          />
        </div>
        <TextField id={`${id}-email`} name="email" label="Email" type="email" autoComplete="email" optional error={errors.email} />
      </fieldset>

      <FormMessage state={state} />

      <div className="flex items-center justify-between gap-3">
        {step > 0 ? (
          <Button type="button" variant="ghost" size="lg" className="h-11" onClick={() => setStep((s) => s - 1)}>
            <ArrowLeft aria-hidden="true" /> Back
          </Button>
        ) : (
          <span />
        )}
        {step < steps.length - 1 ? (
          <Button type="button" size="lg" className="h-11 px-5" onClick={next}>
            Continue <ArrowRight aria-hidden="true" />
          </Button>
        ) : (
          <SubmitButton pending={pending}>Get My Shortlist</SubmitButton>
        )}
      </div>
      {step === steps.length - 1 && <ConsentNote />}
    </form>
  )
}
