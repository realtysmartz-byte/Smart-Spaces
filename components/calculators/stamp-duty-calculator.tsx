'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { stampDutyRates } from '@/lib/data/stamp-duty'

export function StampDutyCalculator() {
  const [propertyValue, setPropertyValue] = useState<string>('')
  const [location, setLocation] = useState<string>('haryana')

  const value = Number(propertyValue) || 0
  const rate = stampDutyRates[location as keyof typeof stampDutyRates] || 7
  const stampDuty = (value * rate) / 100
  const registration = value > 0 ? value * 0.01 : 0 // 1% registration fee
  const total = stampDuty + registration

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="propertyValue">Property Value (₹)</Label>
            <Input
              id="propertyValue"
              type="number"
              placeholder="e.g., 10000000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="haryana">Haryana (Gurgaon)</option>
              <option value="delhi">Delhi</option>
            </select>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-primary text-primary-foreground p-6">
        <Calculator className="size-8 mb-4" />
        <h3 className="text-xl font-semibold mb-4">Calculation Results</h3>
        <div className="space-y-4">
          <div>
            <div className="text-sm opacity-80">Stamp Duty ({rate}%)</div>
            <div className="text-2xl font-bold">₹ {stampDuty.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Registration Fee (1%)</div>
            <div className="text-2xl font-bold">₹ {registration.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Total Charges</div>
            <div className="text-2xl font-bold">₹ {total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          </div>
        </div>
        <p className="mt-6 text-xs opacity-70">
          * Stamp duty rates are subject to change. Verify current rates with the concerned authority before
          transaction. Women may be eligible for concessional rates in some states.
        </p>
      </div>
    </div>
  )
}
