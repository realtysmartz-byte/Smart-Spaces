'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Building2, MapPin, IndianRupee, Clock } from 'lucide-react'

export function HeroSearchCard() {
  const router = useRouter()
  const [propertyType, setPropertyType] = useState('all')
  const [location, setLocation] = useState('all')
  const [budget, setBudget] = useState('all')
  const [possession, setPossession] = useState('all')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (propertyType !== 'all') params.set('type', propertyType)
    if (location !== 'all') params.set('location', location)
    if (budget !== 'all') params.set('budget', budget)
    if (possession !== 'all') params.set('possession', possession)

    const query = params.toString()
    router.push(`/projects${query ? `?${query}` : ''}`)
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <form
        onSubmit={handleSearch}
        className="glass-panel rounded-2xl p-4 sm:p-6 shadow-2xl text-left border border-white/15"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Property Type */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-accent-500 uppercase tracking-wider mb-2">
              <Building2 className="size-3.5" />
              Property Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-primary-900/90 text-white text-sm rounded-lg px-3.5 py-2.5 border border-white/20 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 transition-colors"
            >
              <option value="all">All Commercial Types</option>
              <option value="office">Grade A Offices</option>
              <option value="retail">Retail Shops & F&B</option>
              <option value="sco">SCO Commercial Plots</option>
              <option value="pre-leased">Pre-Leased Commercial</option>
            </select>
          </div>

          {/* Location / Corridor */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-accent-500 uppercase tracking-wider mb-2">
              <MapPin className="size-3.5" />
              Gurgaon Corridor
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-primary-900/90 text-white text-sm rounded-lg px-3.5 py-2.5 border border-white/20 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 transition-colors"
            >
              <option value="all">All Corridors</option>
              <option value="golf-course-road">Golf Course Road</option>
              <option value="golf-course-extension-road">Golf Course Extn Road</option>
              <option value="southern-peripheral-road">Southern Peripheral Road (SPR)</option>
              <option value="dwarka-expressway">Dwarka Expressway</option>
              <option value="sohna-road">Sohna Road</option>
              <option value="new-gurgaon">New Gurgaon</option>
              <option value="manesar">Manesar</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-accent-500 uppercase tracking-wider mb-2">
              <IndianRupee className="size-3.5" />
              Investment Budget
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-primary-900/90 text-white text-sm rounded-lg px-3.5 py-2.5 border border-white/20 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 transition-colors"
            >
              <option value="all">Any Budget</option>
              <option value="50l-1cr">₹50 Lakh – ₹1 Cr</option>
              <option value="1-2cr">₹1 – ₹2 Cr</option>
              <option value="2-5cr">₹2 – ₹5 Cr</option>
              <option value="5-10cr">₹5 – ₹10 Cr</option>
              <option value="10cr-plus">₹10 Cr+</option>
            </select>
          </div>

          {/* Possession */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-accent-500 uppercase tracking-wider mb-2">
              <Clock className="size-3.5" />
              Possession Status
            </label>
            <select
              value={possession}
              onChange={(e) => setPossession(e.target.value)}
              className="w-full bg-primary-900/90 text-white text-sm rounded-lg px-3.5 py-2.5 border border-white/20 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 transition-colors"
            >
              <option value="all">Any Status</option>
              <option value="ready">Ready to Move / Delivered</option>
              <option value="under-construction">Under Construction</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-sand-50/80 font-medium">
            Backed by verified commercial data & location due diligence
          </div>
          <button
            type="submit"
            className="coral-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg tracking-wide"
          >
            <Search className="size-4" />
            <span>Search Properties</span>
          </button>
        </div>
      </form>
    </div>
  )
}
