# Smartz Spaces - Commercial Real Estate Website

A production-ready, SEO-optimized Next.js website for Smartz Spaces, a commercial real estate advisory for Gurgaon and Delhi NCR.

## Tech Stack

- **Next.js 16** with App Router and TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** components for accessible UI
- **MySQL** (Hostinger) via `mysql2` with connection pooling
- **Zod** for validation (client + server)
- **React Hook Form** for forms
- **Lucide React** for icons
- **Server Components** for SEO-critical pages
- **ISR** for dynamic content (projects, locations, articles)

## Project Structure

```
smartz-spaces-build/
├── app/                          # Next.js App Router pages
│   ├── actions/                  # Server Actions for form submissions
│   ├── [slug]/                   # Dynamic routes (projects, locations, articles)
│   ├── admin/                    # Admin panel
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout with header/footer
│   ├── not-found.tsx            # Custom 404 page
│   ├── error.tsx                # Custom error page
│   ├── opengraph-image.tsx      # Dynamic OG image generation
│   ├── robots.ts                # Robots.txt
│   └── sitemap.ts               # Dynamic sitemap
├── components/
│   ├── calculators/             # Calculator components
│   ├── forms/                   # Form components (enquiry, newsletter)
│   ├── seo/                     # SEO components (JSON-LD)
│   ├── site/                    # Site components (header, footer, nav)
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── data/                    # Data layer (projects, locations, articles)
│   │   ├── articles.ts         # Article data
│   │   ├── content.ts          # Content constants (categories, goals, etc.)
│   │   ├── index.ts            # Data access functions
│   │   ├── locations.ts        # Location data
│   │   ├── projects.ts         # Project data
│   │   └── stamp-duty.ts       # Stamp duty rates
│   ├── db.ts                    # MySQL database connection
│   ├── security.ts             # Security utilities
│   ├── seo.ts                   # SEO utilities
│   ├── site-config.ts           # Site-wide configuration
│   ├── types.ts                 # TypeScript types
│   ├── utils.ts                 # Utility functions
│   └── validation.ts            # Zod schemas
├── public/                      # Static assets
│   └── images/                  # Project and location images
├── schema.sql                   # MySQL database schema
├── .env.example                 # Environment variables template
├── MISSING_DATA.md              # Data verification checklist
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn
- MySQL database (Hostinger or other)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smartz-spaces-build
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_GSC_VERIFICATION=your-gsc-verification-code

DB_HOST=your-database-host
DB_PORT=3306
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=smartz_spaces
```

4. Set up the database:
- Import `schema.sql` into your MySQL database via phpMyAdmin or command line:
```bash
mysql -u your_user -p your_database < schema.sql
```

5. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
pnpm build
# or
npm run build
```

Start the production server:
```bash
pnpm start
# or
npm start
```

## Deployment on Hostinger

### Node.js Hosting Setup

1. **Upload Files**:
   - Upload all project files to Hostinger via FTP or Git
   - Ensure `.env` is configured with production values
   - Do NOT upload `.env.example` - rename and configure as `.env`

2. **Configure Environment Variables**:
   - In Hostinger panel, set environment variables in your Node.js app settings
   - Add all variables from `.env.example` with production values

3. **Database Setup**:
   - Create MySQL database in Hostinger panel
   - Import `schema.sql` via phpMyAdmin
   - Update `.env` with database credentials

4. **Build Command**:
   ```
   pnpm build
   # or
   npm run build
   ```

5. **Start Command**:
   ```
   pnpm start
   # or
   npm start
   ```

6. **Domain & SSL**:
   - Point your domain to the Hostinger Node.js app
   - Enable SSL certificate (Let's Encrypt)

### Verification Steps

After deployment:

1. Test all forms (enquiry should save to database)
2. Verify database connection works
3. Test admin panel login
4. Check sitemap.xml is accessible at `/sitemap.xml`
5. Check robots.txt is accessible at `/robots.txt`
6. Run Lighthouse audit
7. Test on mobile devices

## Content Management

### Adding a New Project

Edit `lib/data/projects.ts`:

```typescript
{
  slug: 'project-slug',
  name: 'Project Name',
  developer: 'Developer Name',
  sector: 'Sector XX',
  locationSlug: 'location-slug',
  types: ['office', 'retail'],
  image: '/images/project-image.png',
  imageAlt: 'Description for accessibility',
  summary: 'Brief project summary',
  overview: ['Overview point 1', 'Overview point 2'],
  highlights: ['Highlight 1', 'Highlight 2'],
  startingPriceLakh: 100, // or null if not verified
  sizes: '500-2000 sq ft', // or null
  possession: 'ready', // or 'under-construction' or null
  expectedYield: [6, 8], // or null
  smartzScore: 8, // or null
  rera: 'HRERA-XXXX-XXX-XXX', // or null
  paymentPlan: 'Payment plan details', // or null
  floorPlans: [],
  gallery: [],
  locationAdvantages: [],
  strengths: [],
  risks: [],
  verdict: 'Advisory verdict', // or null
  coords: { lat: 28.4044, lng: 77.0717 },
  featured: true,
  lastVerified: '2026-10-21', // or null
  updatedAt: '2026-10-21',
}
```

### Adding a New Location

Edit `lib/data/locations.ts`:

```typescript
{
  slug: 'location-slug',
  name: 'Location Name',
  shortName: 'Short Name',
  image: '/images/location-image.png',
  summary: 'Location summary',
  overview: ['Overview point 1'],
  coords: { lat: 28.4044, lng: 77.0717 },
  connectivity: ['Connectivity point 1'],
  landmarks: ['Landmark 1'],
  categories: ['office', 'retail'],
  avgPrice: '₹8000-12000/sq ft', // or null
  rentalRange: '₹40-60/sq ft', // or null
  infrastructure: [],
  strengths: [],
  risks: [],
  faqs: [{ question: 'Question?', answer: 'Answer' }],
  updatedAt: '2026-10-21',
}
```

### Adding a New Article

Edit `lib/data/articles.ts`:

```typescript
{
  slug: 'article-slug',
  category: 'market-reports',
  title: 'Article Title',
  excerpt: 'Article excerpt',
  author: { name: 'Author Name', role: 'Role' },
  publishedAt: '2026-10-21',
  updatedAt: '2026-10-21',
  readingMinutes: 5,
  image: '/images/article-image.png',
  imageAlt: 'Description',
  featured: true,
  trending: false,
  sections: [
    {
      id: 'section-id',
      heading: 'Section Heading',
      paragraphs: ['Paragraph text'],
      bullets: ['Bullet point'],
    },
  ],
  relatedProjects: ['project-slug'],
  relatedLocations: ['location-slug'],
}
```

### Adding a New Article Category

Edit `lib/data/articles.ts` in the `articleCategories` array:

```typescript
{ slug: 'new-category', name: 'New Category', description: 'Description' }
```

### Updating Contact Information

Edit `lib/site-config.ts`:

```typescript
contact: {
  phones: [
    { display: '+91 XXXXX XXXXX', tel: '+91XXXXXXXXXX' },
  ],
  email: 'your-email@example.com',
  whatsapp: 'XXXXXXXXXX',
  whatsappMessage: 'Your default WhatsApp message',
  address: {
    line1: 'Address line 1',
    line2: 'Address line 2',
    city: 'City',
    region: 'State',
    postalCode: 'XXXXXX',
    country: 'IN',
  },
  geo: { lat: 28.4044, lng: 77.0717 },
  hours: 'Mo-Sa 10:00-19:00',
}
```

## Database Management

### Creating Admin User

After importing `schema.sql`, you need to create an admin user with a hashed password. In production, use bcrypt:

```javascript
const bcrypt = require('bcryptjs');
const hash = bcrypt.hash('your-password', 10);
console.log(hash); // Copy this hash
```

Update the admin user in the database or schema.sql with the generated hash.

### Viewing Enquiries

Enquiries are saved to the `enquiries` table. Use the admin panel at `/admin` to view and manage them.

### Exporting Enquiries

Use the admin panel's Export CSV button to download enquiry data.

## SEO Features

### Sitemap

Dynamic sitemap at `/sitemap.xml` includes:
- Static pages
- All projects
- All locations
- All article categories
- All articles
- All calculator pages

### Robots.txt

Configured at `/robots.txt` to:
- Allow indexing of public pages
- Disallow admin and API routes
- Include sitemap URL

### Structured Data (JSON-LD)

Implemented schemas:
- Organization / RealEstateAgent
- WebSite with SearchAction
- BreadcrumbList
- FAQPage
- Article / BlogPosting
- Product (for projects)

### Metadata

Every page has:
- Unique title and description
- Canonical URL
- Open Graph tags
- Twitter Card tags
- Dynamic OG images (using opengraph-image.tsx)

## Performance

### Core Web Vitals Targets

- LCP < 2.5s
- CLS < 0.1
- INP < 200ms

### Optimization Techniques

- Server Components for SEO-critical content
- `next/image` for all images with lazy loading
- Self-hosted fonts via `next/font`
- Dynamic imports for heavy components
- ISR for frequently changing content

## Security

- Parameterized SQL queries only
- Zod validation on client and server
- Honeypot field for spam protection
- Rate limiting support (implementation required)
- Session-based admin authentication
- CSRF protection (implementation required)
- Environment variables for sensitive data

## Accessibility

- Semantic HTML (header, nav, main, section, article, footer)
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all interactive elements
- Proper color contrast (WCAG AA)
- Alt text on all images
- Skip to content link

## Linting & Formatting

```bash
# Run ESLint
pnpm lint
# or
npm run lint

# Run Prettier
pnpm format
# or
npx prettier --write .
```

## Troubleshooting

### Database Connection Issues

If you see "Database is not configured" errors:
1. Verify `.env` file exists and has DB_* variables
2. Check database credentials are correct
3. Ensure database server is accessible from your hosting environment
4. Test connection manually with a MySQL client

### Build Errors

If build fails:
1. Clear `.next` folder: `rm -rf .next`
2. Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
3. Check TypeScript errors: `pnpm tsc --noEmit`
4. Verify all imports are correct

### Images Not Loading

1. Ensure images are in `public/images/` folder
2. Check image paths in data files start with `/images/`
3. Verify image files exist and have correct permissions

## Support

For issues or questions:
- Email: info@smartzspaces.in
- Phone: +91 9650 550 411 / +91 8010 841 841

## License

Copyright © 2026 Smartz Spaces. Powered by Realty Smartz Private Limited. All rights reserved.
