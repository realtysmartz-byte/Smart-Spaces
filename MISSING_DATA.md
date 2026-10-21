# Missing Data Verification Checklist

This document lists all data that needs to be verified and updated before the website goes live.

## Contact Information

- [ ] Verify office address: 11th Floor, Spaze Palazo, Golf Course Extension Road, Sector 69, Gurugram, Haryana 122001
- [ ] Verify phone numbers: +91 9650 550 411 / +91 8010 841 841
- [ ] Verify email: info@smartzspaces.in
- [ ] Verify office coordinates (lat, lng) in `lib/site-config.ts`
- [ ] Add social media profile URLs to `lib/site-config.ts` (currently empty array)

## Company Statistics

In `lib/data/content.ts`, the following statistics are currently `null`:

- [ ] Years of advisory experience
- [ ] Commercial transactions advised
- [ ] Sq. ft. of commercial space transacted
- [ ] Developer partnerships

Update these with verified numbers or remove the section if data is not available.

## Testimonials

In `lib/data/content.ts`, the testimonials array is currently empty.

- [ ] Add genuine, consented client testimonials
- [ ] Include client name, role (company/position), and quote
- [ ] Ensure written consent is obtained before publishing

## Project Data

In `lib/data/projects.ts`, the following fields are `null` for most projects:

### Price & Size Data
- [ ] Verify starting prices (startingPriceLakh) for all projects
- [ ] Verify available sizes (sizes) for all projects
- [ ] Verify possession status (possession) for all projects

### Investment Metrics
- [ ] Verify expected rental yield ranges (expectedYield) for projects where assessment is complete
- [ ] Add Smartz Score (smartzScore) for projects where internal assessment is done
- [ ] Set all null values to verified numbers or clearly mark as "Data to be verified"

### Regulatory & Documentation
- [ ] Verify RERA numbers (rera) for all projects
- [ ] Add payment plans (paymentPlan) where available
- [ ] Add floor plans (floorPlans) with images
- [ ] Update gallery (gallery) with actual project images
- [ ] Set lastVerified dates when data is verified

## Location Data

In `lib/data/locations.ts`:

- [ ] Verify average prices (avgPrice) for each location
- [ ] Verify rental ranges (rentalRange) for each location
- [ ] Add sources and dates for infrastructure items (infrastructure)
- [ ] Review and update FAQs based on latest market conditions

## Author Profiles

In `lib/data/articles.ts`:

- [ ] Replace "Smartz Spaces Research Desk" with actual author profiles
- [ ] Add author names, roles, and photos if desired
- [ ] Update author bio information

## Infrastructure Data

For location infrastructure items, currently marked as pending:

- [ ] Add source links for all infrastructure projects
- [ ] Add expected completion dates
- [ ] Verify current status of each infrastructure project

## Admin Panel

- [ ] Generate bcrypt hash for admin password
- [ ] Update `schema.sql` with real password hash
- [ ] Set up proper session management with httpOnly cookies
- [ ] Implement CSRF protection
- [ ] Add login rate limiting
- [ ] Update admin panel to connect to real database instead of mock data

## Images

- [ ] Replace placeholder images with actual project photos
- [ ] Add location-specific images
- [ ] Optimize all images for web (AVIF/WebP format)
- [ ] Ensure all images have descriptive alt text
- [ ] Add OG images for projects, locations, and articles

## SEO Verification

- [ ] Verify all page titles and meta descriptions
- [ ] Test canonical URLs
- [ ] Verify Open Graph and Twitter Card metadata
- [ ] Test JSON-LD structured data in Google Rich Results Test
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt blocks admin and API routes

## Database Setup

- [ ] Import schema.sql into Hostinger MySQL database
- [ ] Configure database credentials in `.env`
- [ ] Test database connection
- [ ] Verify enquiry form submissions are saved correctly
- [ ] Test admin panel with real data

## Legal Pages

- [ ] Review and update Privacy Policy with actual practices
- [ ] Review and update Terms of Use
- [ ] Add actual disclaimer details if needed
- [ ] Ensure all legal pages are accurate and complete

## Pre-Launch Checklist

- [ ] Test all forms (enquiry, newsletter, etc.)
- [ ] Test all calculators for accuracy
- [ ] Verify all internal links work
- [ ] Test mobile responsiveness
- [ ] Check accessibility (keyboard navigation, screen readers)
- [ ] Run Lighthouse audit (target: SEO 100, Performance 90+)
- [ ] Test Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- [ ] Verify contact details are correct
- [ ] Test WhatsApp button functionality
- [ ] Verify Google Analytics is configured (if using)
- [ ] Verify Google Search Console verification (if using)
