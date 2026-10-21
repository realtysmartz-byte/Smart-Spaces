'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>('')
  const [finalValue, setFinalValue] = useState<string>('')
  const [years, setYears] = useState<string>('')

  const initial = Number(initialInvestment) || 0
  const final = Number(finalValue) || 0
  const n = Number(years) || 0

  const totalReturn = initial > 0 ? ((final - initial) / initial) * 100 : 0
  const annualizedROI = initial > 0 && n > 0 ? (Math.pow(final / initial, 1 / n) - 1) * 100 : 0

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="initialInvestment">Initial Investment (₹)</Label>
            <Input
              id="initialInvestment"
              type="number"
              placeholder="e.g., 10000000"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="finalValue">Final / Current Value (₹)</Label>
            <Input
              id="finalValue"
              type="number"
              placeholder="e.g., 15000000"
              value={finalValue}
              onChange={(e) => setFinalValue(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="years">Investment Period (years)</Label>
            <Input
              id="years"
              type="number"
              placeholder="e.g., 5"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-primary text-primary-foreground p-6">
        <Calculator className="size-8 mb-4" />
        <h3 className="text-xl font-semibold mb-4">Calculation Results</h3>
        <div className="space-y-4">
          <div>
            <div className="text-sm opacity-80">Total Return</div>
            <div className="text-2xl font-bold">{totalReturn.toFixed(2)}%</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Annualized ROI (CAGR)</div>
            <div className="text-2xl font-bold">{annualizedROI.toFixed(2)}%</div>
          </div>
        </div>
        <p className="mt-6 text-xs opacity-70">
          * Annualized ROI (CAGR) assumes compounding over the investment period. Actual returns may vary due to
          rental income, vacancy, maintenance costs and market conditions.
        </p>
      </div>
    </div>
  )
}
