'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function EMICalculator() {
  const [principal, setPrincipal] = useState<string>('')
  const [rate, setRate] = useState<string>('')
  const [tenure, setTenure] = useState<string>('')

  const p = Number(principal) || 0
  const r = (Number(rate) || 0) / 12 / 100
  const n = (Number(tenure) || 0) * 12

  const emi = p > 0 && r > 0 && n > 0 ? (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : 0
  const totalPayment = emi * n
  const totalInterest = totalPayment - p

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="principal">Loan Amount (₹)</Label>
            <Input
              id="principal"
              type="number"
              placeholder="e.g., 5000000"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="rate">Interest Rate (% per annum)</Label>
            <Input
              id="rate"
              type="number"
              step="0.1"
              placeholder="e.g., 8.5"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="tenure">Loan Tenure (years)</Label>
            <Input
              id="tenure"
              type="number"
              placeholder="e.g., 15"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-primary text-primary-foreground p-6">
        <Calculator className="size-8 mb-4" />
        <h3 className="text-xl font-semibold mb-4">Calculation Results</h3>
        <div className="space-y-4">
          <div>
            <div className="text-sm opacity-80">Monthly EMI</div>
            <div className="text-2xl font-bold">₹ {emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Total Payment</div>
            <div className="text-2xl font-bold">₹ {totalPayment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Total Interest</div>
            <div className="text-2xl font-bold">₹ {totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          </div>
        </div>
        <p className="mt-6 text-xs opacity-70">
          * Estimates only. Actual EMI may vary based on lender terms, processing fees and other charges.
        </p>
      </div>
    </div>
  )
}
