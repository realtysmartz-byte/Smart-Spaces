import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { getArticles, getArticleCategories } from '@/lib/data'
import { buttonVariants } from '@/components/ui/button'
import { JsonLd } from '@/components/seo/json-ld'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Insights - Commercial Real Estate Research | Smartz Spaces',
  description:
    'Market reports, investment guides, project reviews and location analysis for commercial real estate in Gurgaon and Delhi NCR.',
}

const articles = getArticles()
const categories = getArticleCategories()
const featuredArticles = articles.filter((a) => a.featured)
const trendingArticles = articles.filter((a) => a.trending)

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Commercial Real Estate Insights',
  description: metadata.description,
  url: `${siteConfig.url}/insights`,
}

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={pageSchema} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Insights', href: '/insights' },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Commercial Real Estate Insights
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">
            Research, analysis and guides for commercial property investors in Gurgaon and Delhi NCR. From market
            reports to investment calculators.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Explore by Category</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/insights/${category.slug}`}
                className="group rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary"
              >
                <h3 className="font-semibold">{category.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
                <ArrowRight className="mt-3 size-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Featured Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/insights/${article.category}/${article.slug}`}
                  className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <Badge variant="secondary" className="mb-2">
                      {article.category}
                    </Badge>
                    <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{article.readingMinutes} min read</span>
                      <span>
                        {new Date(article.publishedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending Articles */}
      {trendingArticles.length > 0 && (
        <section className="py-12 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Trending Now</h2>
            <div className="space-y-4">
              {trendingArticles.slice(0, 5).map((article) => (
                <Link
                  key={article.slug}
                  href={`/insights/${article.category}/${article.slug}`}
                  className="group flex gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-[16/9] w-32 overflow-hidden rounded-md bg-muted shrink-0">
                    <Image
                      src={article.image}
                      alt={article.imageAlt}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                      <TrendingUp className="size-4 text-primary" />
                    </div>
                    <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Latest Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.category}/${article.slug}`}
                className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <Badge variant="secondary" className="mb-2">
                    {article.category}
                  </Badge>
                  <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.readingMinutes} min read</span>
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Get the latest market reports and investment insights delivered to your inbox.
            </p>
            <div className="rounded-lg border border-border bg-card p-6">
              {/* Newsletter form component would go here */}
              <p className="text-sm text-muted-foreground">Newsletter signup coming soon.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
