import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, Calendar, User, Share2 } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { getArticle, getRelatedArticles, getArticleCategory, getProjects, getLocations } from '@/lib/data'
import { buttonVariants } from '@/components/ui/button'
import { JsonLd } from '@/components/seo/json-ld'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { Badge } from '@/components/ui/badge'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface ArticlePageProps {
  params: { category: string; slug: string }
}

export async function generateStaticParams() {
  const { getArticles } = await import('@/lib/data')
  const articles = getArticles()
  return articles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = getArticle(params.category, params.slug)
  if (!article) return { title: 'Article Not Found' }

  const canonicalUrl = `${siteConfig.url}/insights/${article.category}/${article.slug}`
  return {
    title: `${article.title} | Smartz Spaces Research`,
    description: article.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url: canonicalUrl,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.imageAlt || article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticle(params.category, params.slug)
  if (!article) notFound()

  const relatedArticles = getRelatedArticles(params.slug)
  const category = getArticleCategory(params.category)

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: {
      '@type': 'Person',
      name: article.author.name,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  }

  return (
    <>
      <JsonLd data={pageSchema} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Insights', href: '/insights' },
            { label: category?.name || params.category, href: `/insights/${params.category}` },
            { label: article.title, href: `/insights/${params.category}/${params.slug}` },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4">
            {category?.name || params.category}
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">{article.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="size-4" />
              <span>{article.author.name}</span>
              <span className="text-muted-foreground/60">· {article.author.role}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span>
                {new Date(article.publishedAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>{article.readingMinutes} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted">
            <Image src={article.image} alt={article.imageAlt} fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 bg-muted/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
          <nav className="space-y-2">
            {article.sections.map((section) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {section.heading}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose-content max-w-none">
            {article.sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
                {section.paragraphs.map((para, idx) => (
                  <p key={idx} className="mb-4 leading-relaxed text-foreground/85">
                    {para}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mb-4 list-disc space-y-2 pl-5 text-foreground/85">
                    {section.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Share this article</span>
              <button className={buttonVariants({ variant: 'outline', size: 'sm' })}>
                <Share2 className="mr-2 size-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Projects */}
      {article.relatedProjects && article.relatedProjects.length > 0 && (
        <section className="py-12 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Related Projects</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {article.relatedProjects
                .map((slug) => getProjects().find((p) => p.slug === slug))
                .filter(Boolean)
                .map((project) => (
                  <Link
                    key={project!.slug}
                    href={`/projects/${project!.slug}`}
                    className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <Image
                        src={project!.image}
                        alt={project!.imageAlt}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold line-clamp-1">{project!.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{project!.developer}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Locations */}
      {article.relatedLocations && article.relatedLocations.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Related Locations</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {article.relatedLocations
                .map((slug) => getLocations().find((l) => l.slug === slug))
                .filter(Boolean)
                .map((location) => (
                  <Link
                    key={location!.slug}
                    href={`/locations/${location!.slug}`}
                    className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <Image
                        src={location!.image}
                        alt={location!.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{location!.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{location!.summary}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl mb-8">Related Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((article) => (
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
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
