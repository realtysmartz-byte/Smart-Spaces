import type { Location } from '@/lib/types'

const pendingInfra = (title: string, description: string) => ({
  title,
  description,
  source: null,
  date: null,
})

export const locations: Location[] = [
  {
    slug: 'golf-course-road',
    name: 'Golf Course Road',
    shortName: 'GCR',
    image: '/images/hero-gurgaon-skyline.png',
    summary:
      'Gurgaon’s premium address corridor, known for high-end residential towers, Grade A offices and Rapid Metro connectivity.',
    overview: [
      'Golf Course Road runs from the DLF Phase 1 area towards Sector 56 and is widely regarded as one of Gurgaon’s most premium corridors. It combines luxury residential developments with Grade A office buildings and established retail.',
      'For commercial buyers, the corridor offers maturity and visibility, but entry prices are typically higher and fresh supply is limited compared with newer corridors.',
    ],
    coords: { lat: 28.4505, lng: 77.0982 },
    connectivity: [
      'Rapid Metro stations along Golf Course Road',
      'Links to MG Road and NH-48 via DLF Cyber City',
      'Connects to Golf Course Extension Road at the southern end',
    ],
    landmarks: ['DLF Golf & Country Club', 'Sector 54 Chowk', 'DLF Cyber City (nearby)'],
    categories: ['office', 'retail', 'pre-leased'],
    avgPrice: null,
    rentalRange: null,
    infrastructure: [
      pendingInfra('Metro network expansion', 'Planned metro connectivity improvements in central Gurgaon.'),
    ],
    strengths: ['Mature, premium catchment', 'Established office ecosystem', 'Strong brand recall for businesses'],
    risks: ['High entry prices', 'Limited new commercial supply', 'Traffic congestion at peak hours'],
    faqs: [
      {
        question: 'Is Golf Course Road good for commercial property investment?',
        answer:
          'Golf Course Road is a mature, premium corridor with established demand. It typically suits buyers prioritising stability and address value over lower entry prices. Evaluate each asset on tenant quality, lease terms and price per square foot against comparable deals.',
      },
      {
        question: 'What types of commercial property are available on Golf Course Road?',
        answer:
          'The corridor mainly offers Grade A office space, high-street and mall retail, and occasionally pre-leased office assets on the resale market.',
      },
    ],
    updatedAt: '2026-10-01',
  },
  {
    slug: 'golf-course-extension-road',
    name: 'Golf Course Extension Road',
    shortName: 'GCER',
    image: '/images/location-corridor.png',
    summary:
      'A fast-growing commercial and residential corridor linking Golf Course Road with Sohna Road and the Southern Peripheral Road.',
    overview: [
      'Golf Course Extension Road extends from the end of Golf Course Road through Sectors 58 to 72 and has become one of Gurgaon’s most active corridors for new commercial launches.',
      'A large number of premium residential projects along the corridor create a dense catchment for retail, F&B and neighbourhood office demand.',
    ],
    coords: { lat: 28.4044, lng: 77.0717 },
    connectivity: [
      'Direct link to Golf Course Road',
      'Connects to Southern Peripheral Road (SPR) and Sohna Road',
      'Road access towards NH-48 via SPR',
    ],
    landmarks: ['Sector 65–66 commercial cluster', 'Spaze Palazo, Sector 69', 'SPR junction'],
    categories: ['office', 'retail', 'sco'],
    avgPrice: null,
    rentalRange: null,
    infrastructure: [
      pendingInfra('Corridor road upgrades', 'Road widening and junction improvements along the corridor.'),
    ],
    strengths: ['Strong residential absorption', 'Active new launch pipeline', 'Good connectivity to multiple corridors'],
    risks: ['Significant upcoming commercial supply', 'Wide variation in project quality', 'Unit-level location matters more than project name'],
    faqs: [
      {
        question: 'Why is Golf Course Extension Road popular for commercial property?',
        answer:
          'The corridor has a large and growing residential population, connectivity to Golf Course Road, Sohna Road and SPR, and an active pipeline of retail, office and SCO projects.',
      },
      {
        question: 'What should I check before buying a retail shop on Golf Course Extension Road?',
        answer:
          'Check frontage, floor level, footfall drivers, anchor tenants, competing supply nearby, RERA registration, possession timeline and the realistic rent the unit can achieve.',
      },
    ],
    updatedAt: '2026-10-01',
  },
  {
    slug: 'southern-peripheral-road',
    name: 'Southern Peripheral Road (SPR)',
    shortName: 'SPR',
    image: '/images/location-corridor.png',
    summary:
      'A key connector between NH-48, Golf Course Extension Road and Sohna Road, with large mixed-use and retail destinations.',
    overview: [
      'The Southern Peripheral Road (SPR) links NH-48 near Kherki Daula with Golf Course Extension Road and Sohna Road, running through Sectors 69 to 76.',
      'The corridor has attracted large-format commercial destinations because of its connectivity and the surrounding residential growth.',
    ],
    coords: { lat: 28.3963, lng: 77.0399 },
    connectivity: ['Connects NH-48 with Golf Course Extension Road', 'Access to Sohna Road', 'Links towards Dwarka Expressway via NH-48'],
    landmarks: ['SPR – Golf Course Extension Road junction', 'Sectors 69–76 residential belt'],
    categories: ['retail', 'office', 'sco'],
    avgPrice: null,
    rentalRange: null,
    infrastructure: [pendingInfra('SPR corridor development', 'Road and junction improvements along SPR.')],
    strengths: ['Strategic connector road', 'Destination retail formats', 'Growing catchment'],
    risks: ['Large retail supply concentration', 'Execution timelines vary by developer'],
    faqs: [
      {
        question: 'What is the Southern Peripheral Road in Gurgaon?',
        answer:
          'SPR is a sector road connecting NH-48 with Golf Course Extension Road and Sohna Road, running through Sectors 69 to 76.',
      },
    ],
    updatedAt: '2026-10-01',
  },
  {
    slug: 'dwarka-expressway',
    name: 'Dwarka Expressway',
    shortName: 'DXP',
    image: '/images/location-corridor.png',
    summary:
      'Expressway corridor connecting Dwarka in Delhi with NH-48 in Gurgaon, close to IGI Airport, with an expanding commercial pipeline.',
    overview: [
      'Dwarka Expressway (NH-248BB) connects Dwarka in Delhi with NH-48 near Kherki Daula in Gurgaon, passing through new sectors of Gurgaon.',
      'Its proximity to IGI Airport and Delhi has made it a focus for residential and commercial development, including retail, SCO and office projects.',
    ],
    coords: { lat: 28.4826, lng: 77.0094 },
    connectivity: ['Links Dwarka (Delhi) with NH-48', 'Proximity to IGI Airport', 'Access to New Gurgaon sectors'],
    landmarks: ['IGI Airport (nearby)', 'Dwarka Sector 21', 'Kherki Daula'],
    categories: ['retail', 'sco', 'office'],
    avgPrice: null,
    rentalRange: null,
    infrastructure: [
      pendingInfra('Expressway operationalisation', 'Status of all expressway segments and interchanges.'),
      pendingInfra('Proposed metro connectivity', 'Proposed metro alignment along the corridor.'),
    ],
    strengths: ['Delhi and airport connectivity', 'Large residential supply', 'Early-entry opportunities'],
    risks: ['Catchment still maturing in several sectors', 'High volume of upcoming supply'],
    faqs: [
      {
        question: 'Is Dwarka Expressway good for commercial investment?',
        answer:
          'It offers connectivity and growth potential, but rental stabilisation depends on residential occupancy in nearby sectors. Investors should evaluate the specific sector, catchment occupancy and competing supply.',
      },
    ],
    updatedAt: '2026-10-01',
  },
  {
    slug: 'sohna-road',
    name: 'Sohna Road',
    shortName: 'Sohna Rd',
    image: '/images/hero-gurgaon-skyline.png',
    summary:
      'An established corridor with mature residential sectors and retail, connecting central Gurgaon with Sohna.',
    overview: [
      'Sohna Road connects central Gurgaon with Sohna and passes through established sectors such as 47, 48 and 49, along with newer sectors further south.',
      'The corridor has a mix of operational offices and retail, and links with Golf Course Extension Road and SPR.',
    ],
    coords: { lat: 28.4089, lng: 77.0418 },
    connectivity: ['Links central Gurgaon with Sohna', 'Connects with Golf Course Extension Road and SPR', 'Elevated road towards Sohna'],
    landmarks: ['Subhash Chowk', 'Sectors 47–49'],
    categories: ['office', 'retail'],
    avgPrice: null,
    rentalRange: null,
    infrastructure: [pendingInfra('Elevated corridor', 'Elevated road towards Sohna and onward connectivity.')],
    strengths: ['Mature residential catchment', 'Operational commercial stock', 'Value compared with Golf Course Road (verify)'],
    risks: ['Older stock in some projects', 'Traffic at key junctions'],
    faqs: [
      {
        question: 'Which commercial property types are common on Sohna Road?',
        answer: 'Sohna Road mainly offers office space and retail, including operational assets in established sectors.',
      },
    ],
    updatedAt: '2026-10-01',
  },
  {
    slug: 'new-gurgaon',
    name: 'New Gurgaon',
    shortName: 'New Gurgaon',
    image: '/images/category-sco.png',
    summary:
      'Sectors 76 to 95 along NH-48 and the Dwarka Expressway, with large residential supply and emerging commercial demand.',
    overview: [
      'New Gurgaon broadly refers to Sectors 76 to 95, located along NH-48 and connected to Dwarka Expressway.',
      'The area has substantial residential supply, which is gradually creating demand for neighbourhood retail, SCO and service-oriented commercial space.',
    ],
    coords: { lat: 28.4155, lng: 76.9626 },
    connectivity: ['Access to NH-48', 'Connected to Dwarka Expressway', 'Link roads towards Manesar'],
    landmarks: ['Sectors 76–95', 'NH-48'],
    categories: ['retail', 'sco'],
    avgPrice: null,
    rentalRange: null,
    infrastructure: [pendingInfra('Sector road network', 'Completion of internal sector roads.')],
    strengths: ['Lower entry tickets (verify)', 'Large residential population growth'],
    risks: ['Longer gestation for rentals', 'Catchment occupancy still building'],
    faqs: [
      {
        question: 'Is New Gurgaon suitable for SCO investment?',
        answer:
          'New Gurgaon can suit long-term SCO investors who accept a longer gestation period. Evaluate road frontage, sector occupancy and the developer’s execution track record.',
      },
    ],
    updatedAt: '2026-10-01',
  },
  {
    slug: 'manesar',
    name: 'Manesar',
    shortName: 'Manesar',
    image: '/images/location-corridor.png',
    summary:
      'Industrial and logistics hub along NH-48 with IMT Manesar, relevant for industrial-adjacent commercial and warehousing-linked demand.',
    overview: [
      'Manesar, located along NH-48 south-west of Gurgaon, is known for IMT Manesar and its automotive and manufacturing base.',
      'Commercial demand here is often linked to industrial workforce, logistics and service businesses.',
    ],
    coords: { lat: 28.3515, lng: 76.9428 },
    connectivity: ['NH-48', 'KMP (Kundli–Manesar–Palwal) Expressway', 'Access to New Gurgaon'],
    landmarks: ['IMT Manesar'],
    categories: ['retail', 'office'],
    avgPrice: null,
    rentalRange: null,
    infrastructure: [pendingInfra('Industrial corridor projects', 'Industrial and logistics infrastructure in the region.')],
    strengths: ['Industrial employment base', 'Expressway connectivity'],
    risks: ['Different demand profile from city-centre commercial', 'Limited premium office demand'],
    faqs: [
      {
        question: 'What drives commercial demand in Manesar?',
        answer: 'Demand is driven largely by the industrial workforce of IMT Manesar, logistics businesses and service providers.',
      },
    ],
    updatedAt: '2026-10-01',
  },
]
