'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function BuyVsRentCalculator() {
  const [propertyPrice, setPropertyPrice] = useState<string>('')
  const [downPayment, setDownPayment] = useState<string>('')
  const [interestRate, setInterestRate] = useState<string>('')
  const [loanTenure, setLoanTenure] = useState<string>('')
  const [monthlyRent, setMonthlyRent] = useState<string>('')

  const price = Number(propertyPrice) || 0
  const down = Number(downPayment) || 0
  const rate = (Number(interestRate) || 0) / 12 / 100
  const tenure = (Number(loanTenure) || 0) * 12
  const rent = Number(monthlyRent) || 0

  const loanAmount = price - down
  const emi = loanAmount > 0 && rate > 0 && tenure > 0 ? (loanAmount * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1) : 0
  const annualBuyCost = emi * 12
  const annualRentCost = rent * 12

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="propertyPrice">Property Price (₹)</Label>
            <Input
              id="propertyPrice"
              type="number"
              placeholder="e.g., 10000000"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="downPayment">Down Payment (₹)</Label>
            <Input
              id="downPayment"
              type="number"
              placeholder="e.g., 2000000"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="interestRate">Home Loan Interest Rate (% per annum)</Label>
            <Input
              id="interestRate"
              type="number"
              step="0.1"
              placeholder="e.g., 8.5"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="loanTenure">Loan Tenure (years)</Label>
            <Input
              id="loanTenure"
              type="number"
              placeholder="e.g., 20"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="monthlyRent">Monthly Rent (₹)</Label>
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
            <div className="text-sm opacity-80">Loan Amount</div>
            <div className="text-2xl font-bold">₹ {loanAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Monthly EMI</div>
            <div className="text-2xl font-bold">₹ {emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Annual Cost (Buying)</div>
            <div className="text-2xl font-bold">₹ {annualBuyCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Annual Cost (Renting)</div>
            <div className="text-2xl font-bold">₹ {annualRentCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          </div>
        </div>
        <p className="mt-6 text-xs opacity-70">
          * This is a simplified comparison. Buying includes property tax, maintenance and potential appreciation.
          Renting includes security deposit opportunity cost and rent escalations. Consult a financial advisor for
          detailed analysis.
        </p>
      </div>
    </div>
  )
}
