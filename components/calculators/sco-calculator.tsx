'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SCOCalculator() {
  const [plotPrice, setPlotPrice] = useState<string>('')
  const [constructionCost, setConstructionCost] = useState<string>('')
  const [monthlyRent, setMonthlyRent] = useState<string>('')

  const totalInvestment = (Number(plotPrice) || 0) + (Number(constructionCost) || 0)
  const annualRent = (Number(monthlyRent) || 0) * 12
  const rentalYield = totalInvestment > 0 ? ((annualRent / totalInvestment) * 100).toFixed(2) : '0'
  const paybackPeriod = annualRent > 0 ? (totalInvestment / annualRent).toFixed(1) : '0'

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="plotPrice">Plot Price (₹ Lakhs)</Label>
            <Input
              id="plotPrice"
              type="number"
              placeholder="e.g., 80"
              value={plotPrice}
              onChange={(e) => setPlotPrice(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="constructionCost">Construction Cost (₹ Lakhs)</Label>
            <Input
              id="constructionCost"
              type="number"
              placeholder="e.g., 40"
              value={constructionCost}
              onChange={(e) => setConstructionCost(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="monthlyRent">Expected Monthly Rent (₹)</Label>
            <Input
              id="monthlyRent"
              type="number"
              placeholder="e.g., 35000"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-primary text-primary-foreground p-6">
        <Calculator className="size-8 mb-4" />
        <h3 className="text-xl font-semibold mb-4">Calculation Results</h3>
        <div className="space-y-4">
          <div>
            <div className="text-sm opacity-80">Total Investment</div>
            <div className="text-2xl font-bold">₹ {totalInvestment.toLocaleString()} Lakhs</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Annual Rental Income</div>
            <div className="text-2xl font-bold">₹ {annualRent.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Rental Yield</div>
            <div className="text-2xl font-bold">{rentalYield}%</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Simple Payback Period</div>
            <div className="text-2xl font-bold">{paybackPeriod} Years</div>
          </div>
        </div>
        <p className="mt-6 text-xs opacity-70">
          * Estimates only. Actual returns depend on occupancy, rent levels, vacancy periods and costs. Verify
          comparable rents in operational SCOs nearby.
        </p>
      </div>
    </div>
  )
}
