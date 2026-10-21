'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function RentalYieldCalculator() {
  const [annualRent, setAnnualRent] = useState<string>('')
  const [propertyCost, setPropertyCost] = useState<string>('')

  const rent = Number(annualRent) || 0
  const cost = Number(propertyCost) || 0
  const grossYield = cost > 0 ? ((rent / cost) * 100).toFixed(2) : '0'

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="annualRent">Annual Rental Income (₹)</Label>
            <Input
              id="annualRent"
              type="number"
              placeholder="e.g., 600000"
              value={annualRent}
              onChange={(e) => setAnnualRent(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="propertyCost">Total Property Cost (₹)</Label>
            <Input
              id="propertyCost"
              type="number"
              placeholder="e.g., 10000000"
              value={propertyCost}
              onChange={(e) => setPropertyCost(e.target.value)}
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Include base price, stamp duty, registration and all charges
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-primary text-primary-foreground p-6">
        <Calculator className="size-8 mb-4" />
        <h3 className="text-xl font-semibold mb-4">Calculation Results</h3>
        <div className="space-y-4">
          <div>
            <div className="text-sm opacity-80">Gross Rental Yield</div>
            <div className="text-2xl font-bold">{grossYield}%</div>
          </div>
        </div>
        <p className="mt-6 text-xs opacity-70">
          * Gross yield does not account for maintenance, property tax, vacancy periods or other costs. For net yield,
          deduct these from annual rent.
        </p>
      </div>
    </div>
  )
}
