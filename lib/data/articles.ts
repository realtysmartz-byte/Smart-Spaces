import type { Article, ArticleCategory } from '@/lib/types'

export const articleCategories: ArticleCategory[] = [
  { slug: 'market-reports', name: 'Market Reports', description: 'Periodic analysis of Gurgaon and Delhi NCR commercial real estate.' },
  { slug: 'project-reviews', name: 'Project Reviews', description: 'Independent reviews of commercial projects in Gurgaon.' },
  { slug: 'investment-guides', name: 'Investment Guides', description: 'Step-by-step guides for commercial property investors.' },
  { slug: 'location-guides', name: 'Location Guides', description: 'Corridor and micro-market guides for Gurgaon.' },
  { slug: 'commercial-trends', name: 'Commercial Trends', description: 'Trends shaping offices, retail and mixed-use real estate.' },
  { slug: 'sco-insights', name: 'SCO Insights', description: 'Everything about Shop-Cum-Office plots in Gurgaon.' },
  { slug: 'rental-yield', name: 'Rental Yield', description: 'Understanding and evaluating rental yield on commercial assets.' },
  { slug: 'expert-opinion', name: 'Expert Opinion', description: 'Views from the Smartz Spaces advisory team.' },
  { slug: 'real-estate-myths', name: 'Real Estate Myths', description: 'Common misconceptions in commercial real estate — debunked.' },
]

// TODO: replace with verified author profiles (MISSING_DATA.md)
const researchDesk = { name: 'Smartz Spaces Research Desk', role: 'Commercial Advisory Team' }

export const articles: Article[] = [
  {
    slug: 'what-is-sco-plot-gurgaon',
    category: 'sco-insights',
    title: 'What Is an SCO Plot? A Complete Guide for Gurgaon Investors',
    excerpt:
      'Shop-Cum-Office plots let you own land and build a multi-storey commercial building. Here is how SCO ownership works, where it differs from a shop, and what to check before investing.',
    author: researchDesk,
    publishedAt: '2026-08-12',
    updatedAt: '2026-10-01',
    readingMinutes: 7,
    image: '/images/category-sco.png',
    imageAlt: 'Row of modern shop-cum-office buildings along a boulevard',
    featured: true,
    trending: true,
    relatedLocations: ['golf-course-extension-road', 'new-gurgaon', 'dwarka-expressway'],
    sections: [
      {
        id: 'meaning',
        heading: 'What does SCO mean?',
        paragraphs: [
          'SCO stands for Shop-Cum-Office. An SCO plot is a commercial plot on which the owner can construct a building with retail on the lower floors and offices or other permitted commercial uses above, within the limits set by the applicable building bye-laws.',
          'Unlike buying a single shop inside a larger mall, an SCO buyer typically owns the plot and the building constructed on it, which gives more control over design, leasing and use.',
        ],
      },
      {
        id: 'ownership',
        heading: 'How SCO ownership works',
        paragraphs: [
          'In most SCO projects the developer sells individual plots within a planned commercial layout. The buyer pays for the plot and then builds the structure — either independently or through a construction arrangement offered by the developer.',
          'Permissible floors, FAR, setbacks and use are governed by the licence and local regulations. Always verify these on the approved layout plan and RERA registration rather than marketing brochures.',
        ],
      },
      {
        id: 'sco-vs-shop',
        heading: 'SCO vs a retail shop',
        paragraphs: ['The key difference is control. An SCO owner controls the entire building; a shop owner controls one unit within a larger project managed by someone else.'],
        bullets: [
          'Ticket size: SCO plots usually require a larger total investment including construction',
          'Control: SCO owners decide tenants, design and branding for the whole building',
          'Maintenance: SCO owners bear building maintenance; shop owners pay common area charges',
          'Exit: SCO buildings can be sold whole or leased floor-wise',
        ],
      },
      {
        id: 'checklist',
        heading: 'Checklist before investing in an SCO plot',
        paragraphs: ['Use this checklist as a starting point for due diligence:'],
        bullets: [
          'RERA registration and licence details',
          'Approved layout, permissible floors and FAR',
          'Road frontage and width, visibility and access',
          'Surrounding residential occupancy (actual, not projected)',
          'Total cost including construction, approvals and stamp duty',
          'Realistic rent per floor based on comparable operational SCOs',
        ],
      },
    ],
  },
  {
    slug: 'how-to-calculate-rental-yield-commercial-property',
    category: 'rental-yield',
    title: 'How to Calculate Rental Yield on Commercial Property',
    excerpt:
      'Gross yield, net yield and why the headline number in a brochure rarely tells the full story. A practical guide with formulas.',
    author: researchDesk,
    publishedAt: '2026-07-20',
    updatedAt: '2026-09-15',
    readingMinutes: 6,
    image: '/images/category-investment.png',
    imageAlt: 'Boardroom table with documents and city view',
    featured: true,
    trending: true,
    sections: [
      {
        id: 'gross-yield',
        heading: 'Gross rental yield',
        paragraphs: [
          'Gross rental yield = (Annual rent ÷ Total property cost) × 100. If a shop costs ₹1 crore all-in and earns ₹50,000 a month, the annual rent is ₹6 lakh and the gross yield is 6%.',
          'Total property cost should include stamp duty, registration, and any other one-time charges — not just the basic sale price.',
        ],
      },
      {
        id: 'net-yield',
        heading: 'Net rental yield',
        paragraphs: [
          'Net yield deducts the costs an owner bears: property tax, maintenance not recovered from the tenant, insurance, brokerage on leasing and expected vacancy periods.',
          'Net yield is the better number for comparing assets, because two properties with the same gross yield can have very different costs.',
        ],
      },
      {
        id: 'what-affects-yield',
        heading: 'What affects commercial rental yield?',
        paragraphs: ['Yield is driven by the property and the lease:'],
        bullets: ['Tenant quality and lease tenure', 'Rent escalation clauses', 'Lock-in period', 'Location and visibility', 'Purchase price relative to market'],
      },
      {
        id: 'caution',
        heading: 'A word of caution',
        paragraphs: [
          'Projected yields on under-construction projects are estimates, not guarantees. Ask for comparable leases in operational projects nearby and stress-test your numbers with lower rent and longer vacancy assumptions.',
        ],
      },
    ],
  },
  {
    slug: 'office-space-buy-vs-lease-gurgaon',
    category: 'investment-guides',
    title: 'Buy vs Lease Office Space in Gurgaon: How to Decide',
    excerpt:
      'Owning your office can build an asset; leasing preserves capital and flexibility. A framework for founders and CFOs.',
    author: researchDesk,
    publishedAt: '2026-06-30',
    updatedAt: '2026-09-01',
    readingMinutes: 6,
    image: '/images/category-office.png',
    imageAlt: 'Modern office tower facade',
    featured: false,
    trending: true,
    sections: [
      {
        id: 'capital',
        heading: 'Start with capital and growth plans',
        paragraphs: [
          'Buying ties up significant capital in the down payment and fit-out. If your team size may double or halve within a few years, leasing usually offers more flexibility.',
        ],
      },
      {
        id: 'cost',
        heading: 'Compare total cost, not just monthly outgo',
        paragraphs: [
          'Ownership cost includes EMI interest, maintenance, property tax and the opportunity cost of capital. Lease cost includes rent, escalations and security deposit. Use our Buy vs Rent calculator to compare both over the same period.',
        ],
      },
      {
        id: 'tax',
        heading: 'Tax considerations',
        paragraphs: [
          'Rent is generally treated as a business expense, while ownership may allow depreciation and interest deductions. Tax treatment depends on your entity structure — consult a qualified tax advisor.',
        ],
      },
    ],
  },
  {
    slug: 'golf-course-extension-road-commercial-guide',
    category: 'location-guides',
    title: 'Golf Course Extension Road: Commercial Property Location Guide',
    excerpt: 'Connectivity, catchment, supply and what investors should watch on one of Gurgaon’s busiest commercial corridors.',
    author: researchDesk,
    publishedAt: '2026-05-18',
    updatedAt: '2026-09-20',
    readingMinutes: 5,
    image: '/images/location-corridor.png',
    imageAlt: 'Aerial view of a commercial corridor',
    featured: true,
    trending: false,
    relatedLocations: ['golf-course-extension-road', 'southern-peripheral-road'],
    relatedProjects: ['m3m-ifc', 'aipl-joy-street', 'elan-epic'],
    sections: [
      {
        id: 'overview',
        heading: 'Corridor overview',
        paragraphs: [
          'Golf Course Extension Road connects Golf Course Road with Sohna Road and the Southern Peripheral Road, running through Sectors 58 to 72. Premium residential development along the road has created a deep catchment for retail and services.',
        ],
      },
      {
        id: 'supply',
        heading: 'Supply and competition',
        paragraphs: [
          'The corridor has many retail, office and SCO projects either operational or under construction. Investors should compare units on frontage, floor, anchor tenants and realistic rent rather than project branding alone.',
        ],
      },
      {
        id: 'watch',
        heading: 'What to watch',
        paragraphs: ['Key indicators for this corridor:'],
        bullets: ['Residential occupancy in surrounding sectors', 'Operational retail leasing rates', 'New launches and their pricing', 'Road and junction improvements'],
      },
    ],
  },
  {
    slug: 'assured-returns-myth-commercial-property',
    category: 'real-estate-myths',
    title: 'Myth: “Assured Returns” Mean Guaranteed Income',
    excerpt: 'Why assured-return schemes need careful reading, and what actually determines your long-term income.',
    author: researchDesk,
    publishedAt: '2026-04-22',
    updatedAt: '2026-08-10',
    readingMinutes: 4,
    image: '/images/category-retail.png',
    imageAlt: 'Retail promenade at dusk',
    featured: false,
    trending: false,
    sections: [
      {
        id: 'myth',
        heading: 'The myth',
        paragraphs: ['Marketing often presents assured returns as risk-free income. In reality they are a contractual promise by the developer, subject to the developer’s ability to pay and the terms of the agreement.'],
      },
      {
        id: 'reality',
        heading: 'The reality',
        paragraphs: [
          'Assured returns typically last for a limited period. After that, your income depends on the actual rent the unit achieves in the open market — which may be higher or lower than the assured amount.',
        ],
        bullets: ['Read the agreement clauses carefully', 'Check how the assured amount is priced into the sale price', 'Estimate market rent after the assured period ends'],
      },
    ],
  },
  {
    slug: 'commercial-real-estate-trends-gurgaon',
    category: 'commercial-trends',
    title: 'Trends Shaping Commercial Real Estate in Gurgaon',
    excerpt: 'Flexible offices, experiential high streets and SCO formats — what is changing and what it means for buyers.',
    author: researchDesk,
    publishedAt: '2026-03-15',
    updatedAt: '2026-09-05',
    readingMinutes: 5,
    image: '/images/hero-gurgaon-skyline.png',
    imageAlt: 'Gurgaon commercial skyline at golden hour',
    featured: false,
    trending: true,
    sections: [
      {
        id: 'flex',
        heading: 'Flexible and managed offices',
        paragraphs: ['Many businesses now prefer managed or flexible offices for parts of their workforce, which affects how investors evaluate office assets and tenant profiles.'],
      },
      {
        id: 'high-street',
        heading: 'Experiential high streets',
        paragraphs: ['Open high-street formats with F&B and leisure are increasingly common, as they offer visibility and a destination experience for shoppers.'],
      },
      {
        id: 'sco',
        heading: 'Growth of SCO formats',
        paragraphs: ['SCO plots have grown in popularity among investors and businesses who want full control over a commercial building.'],
      },
    ],
  },
]
