import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { getArticlesByCategory, getArticleCategory, getArticleCategories } from '@/lib/data'
import { buttonVariants } from '@/components/ui/button'
import { JsonLd } from '@/components/seo/json-ld'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { Badge } from '@/components/ui/badge'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface CategoryPageProps {
  params: { category: string }
}

export async function generateStaticParams() {
  const categories = getArticleCategories()
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getArticleCategory(params.category)
  if (!category) return { title: 'Category Not Found' }

  return {
    title: `${category.name} | Smartz Spaces`,
    description: category.description,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getArticleCategory(params.category)
  if (!category) notFound()

  const articles = getArticlesByCategory(params.category)
  const allCategories = getArticleCategories()

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: `${siteConfig.url}/insights/${category.slug}`,
  }

  return (
    <>
      <JsonLd data={pageSchema} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Insights', href: '/insights' },
            { label: category.name, href: `/insights/${category.slug}` },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {category.name}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl">{category.description}</p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {articles.length > 0 ? (
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
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Other Categories */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Other Categories</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allCategories
              .filter((c) => c.slug !== category.slug)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/insights/${cat.slug}`}
                  className="group rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary"
                >
                  <h3 className="font-semibold">{cat.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{cat.description}</p>
                  <ArrowRight className="mt-3 size-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
