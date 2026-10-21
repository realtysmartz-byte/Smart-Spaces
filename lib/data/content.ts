import type { Faq, PropertyType } from '@/lib/types'

export const propertyTypeLabels: Record<PropertyType, string> = {
  office: 'Office',
  retail: 'Retail',
  sco: 'SCO Plot',
  'pre-leased': 'Pre-Leased',
}

export const propertyCategories = [
  {
    key: 'office',
    title: 'Offices',
    description: 'Grade A, managed and boutique offices for end-use and investment.',
    href: '/office-space-in-gurgaon',
    image: '/images/category-office.png',
  },
  {
    key: 'retail',
    title: 'Retail',
    description: 'High-street shops, F&B and anchor-led retail destinations.',
    href: '/retail-property-in-gurgaon',
    image: '/images/category-retail.png',
  },
  {
    key: 'sco',
    title: 'SCO Plots',
    description: 'Own the plot and the building — full control over leasing.',
    href: '/sco-plots-in-gurgaon',
    image: '/images/category-sco.png',
  },
  {
    key: 'pre-leased',
    title: 'Pre-Leased',
    description: 'Assets with tenants in place and rental income from day one.',
    href: '/projects?type=pre-leased',
    image: '/images/category-investment.png',
  },
  {
    key: 'investment',
    title: 'Investment Assets',
    description: 'Curated opportunities by budget, yield and objective.',
    href: '/commercial-property-for-investment-in-gurgaon',
    image: '/images/location-corridor.png',
  },
] as const

export const budgetBands = [
  { value: '50l-1cr', label: '₹50 Lakh – ₹1 Cr', min: 50, max: 100 },
  { value: '1-2cr', label: '₹1 – ₹2 Cr', min: 100, max: 200 },
  { value: '2-5cr', label: '₹2 – ₹5 Cr', min: 200, max: 500 },
  { value: '5-10cr', label: '₹5 – ₹10 Cr', min: 500, max: 1000 },
  { value: '10cr-plus', label: '₹10 Cr+', min: 1000, max: Number.POSITIVE_INFINITY },
] as const

export const investmentGoals = [
  { value: 'rental-income', label: 'Rental Income', description: 'Steady monthly income from leased assets.' },
  { value: 'capital-appreciation', label: 'Capital Appreciation', description: 'Long-term value growth in emerging corridors.' },
  { value: 'own-business-space', label: 'Own Business Space', description: 'An office or shop for your own business.' },
  { value: 'pre-leased', label: 'Pre-Leased Assets', description: 'Tenant in place with an existing lease.' },
  { value: 'early-entry', label: 'Early Entry', description: 'Enter new projects at launch-stage pricing.' },
  { value: 'investment', label: 'Diversified Investment', description: 'Balance yield and growth across assets.' },
] as const

/** Company statistics — intentionally empty until verified. */
export const companyStats: { label: string; value: string | null }[] = [
  { label: 'Years of advisory experience', value: null },
  { label: 'Commercial transactions advised', value: null },
  { label: 'Sq. ft. of commercial space transacted', value: null },
  { label: 'Developer partnerships', value: null },
]

/** Testimonials — only add genuine, consented client testimonials. */
export const testimonials: { quote: string; name: string; role: string }[] = []

export const decisionFactors = [
  { title: 'Location', description: 'Catchment, connectivity, visibility and future infrastructure.' },
  { title: 'Demand', description: 'Who will rent or buy this asset, and why — today and in five years.' },
  { title: 'Numbers', description: 'All-in cost, realistic rent, yield, payback and holding costs.' },
  { title: 'Risk', description: 'Developer, approvals, supply, vacancy and tenant risk.' },
  { title: 'Exit', description: 'Liquidity, buyer profile and resale potential.' },
  { title: 'Strategy', description: 'How the asset fits your goals, horizon and portfolio.' },
]

export const services = [
  { title: 'Commercial Advisory', description: 'End-to-end advisory for buying, leasing and investing in commercial real estate.' },
  { title: 'Investment Advisory', description: 'Goal-based shortlists with numbers, risks and exit analysis.' },
  { title: 'Office Space', description: 'Buy or lease offices — Grade A, managed and boutique.' },
  { title: 'Retail', description: 'High-street shops and retail units evaluated on footfall and rent potential.' },
  { title: 'SCO Plots', description: 'SCO selection, cost planning and construction considerations.' },
  { title: 'Pre-Leased Assets', description: 'Lease, tenant and yield due diligence on income-producing assets.' },
]

export const processSteps = [
  { title: 'Discover', description: 'Understand your goals, budget, timeline and risk appetite.' },
  { title: 'Analyse', description: 'Research locations, projects and numbers against your brief.' },
  { title: 'Compare', description: 'Side-by-side comparison of shortlisted options with risks.' },
  { title: 'Decide', description: 'Site visits, negotiation support and transaction guidance.' },
]

export const faqs: Record<string, Faq[]> = {
  commercial: [
    {
      question: 'Which are the best locations for commercial property in Gurgaon?',
      answer:
        'Golf Course Road, Golf Course Extension Road, Southern Peripheral Road, Sohna Road, Dwarka Expressway and New Gurgaon are the main commercial corridors. The right choice depends on your budget, objective (rental income vs appreciation) and investment horizon.',
    },
    {
      question: 'What types of commercial property can I buy in Gurgaon?',
      answer: 'Office spaces, retail shops, SCO plots, food court units and pre-leased assets are the most common commercial property types.',
    },
    {
      question: 'Is commercial property a good investment compared with residential?',
      answer:
        'Commercial property can offer higher rental yields than residential, but it usually involves larger ticket sizes, longer vacancy periods between tenants and more due diligence. Returns are not guaranteed.',
    },
    {
      question: 'What should I verify before buying commercial property?',
      answer: 'Verify RERA registration, title and approvals, possession timeline, total cost, comparable rents, tenant demand and the developer’s delivery track record.',
    },
  ],
  sco: [
    {
      question: 'What is an SCO plot in Gurgaon?',
      answer: 'An SCO (Shop-Cum-Office) plot is a commercial plot on which the owner can build a multi-storey building with shops on lower floors and offices above, within the applicable bye-laws.',
    },
    {
      question: 'How many floors can be built on an SCO plot?',
      answer: 'Permissible floors and FAR depend on the project licence and applicable regulations. Always verify on the approved layout plan.',
    },
    {
      question: 'Is SCO better than buying a shop?',
      answer: 'SCO offers more control and flexibility but requires higher capital and active management. A shop is simpler to own but you control only one unit.',
    },
    {
      question: 'How is rental yield calculated for an SCO?',
      answer: 'Rental yield = annual rent ÷ total investment (plot + construction + charges) × 100. Use our SCO calculator to estimate it.',
    },
  ],
  investment: [
    {
      question: 'What returns can I expect from commercial property in Gurgaon?',
      answer:
        'Returns vary widely by asset, location, tenant and purchase price. We share indicative ranges with clear assumptions and risks, but returns are never guaranteed.',
    },
    {
      question: 'What is a pre-leased property?',
      answer: 'A pre-leased property already has a tenant with a signed lease, so rental income starts from purchase. Lease tenure, lock-in and tenant quality are key to evaluate.',
    },
    {
      question: 'What is the minimum budget for commercial investment in Gurgaon?',
      answer: 'Options typically start from around ₹50 lakh for smaller retail or office units, though availability changes frequently. Share your budget and we will shortlist current options.',
    },
  ],
}
