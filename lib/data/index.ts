import { projects } from './projects'
import { locations } from './locations'
import { articles, articleCategories } from './articles'
import type { PropertyType } from '@/lib/types'

/**
 * Data access layer. Pages import only from here, so the source can later be
 * swapped (e.g. to MySQL or a headless CMS) without touching page code.
 */

export function getProjects() {
  return projects
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured)
}

export function getProjectsByType(type: PropertyType) {
  return projects.filter((p) => p.types.includes(type))
}

export function getProjectsByLocation(locationSlug: string) {
  return projects.filter((p) => p.locationSlug === locationSlug)
}

export function getSimilarProjects(slug: string, limit = 3) {
  const current = getProject(slug)
  if (!current) return []
  return projects
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      p,
      score:
        (p.locationSlug === current.locationSlug ? 2 : 0) +
        p.types.filter((t) => current.types.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p)
}

export function getLocations() {
  return locations
}

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug)
}

export function getArticleCategories() {
  return articleCategories
}

export function getArticleCategory(slug: string) {
  return articleCategories.find((c) => c.slug === slug)
}

export function getArticles() {
  return [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getArticle(category: string, slug: string) {
  return articles.find((a) => a.category === category && a.slug === slug)
}

export function getArticlesByCategory(category: string) {
  return getArticles().filter((a) => a.category === category)
}

export function getRelatedArticles(slug: string, limit = 3) {
  const current = articles.find((a) => a.slug === slug)
  return getArticles()
    .filter((a) => a.slug !== slug)
    .sort((a, b) => Number(b.category === current?.category) - Number(a.category === current?.category))
    .slice(0, limit)
}

export function articleHref(a: { category: string; slug: string }) {
  return `/insights/${a.category}/${a.slug}`
}

export function searchAll(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return { projects: [], locations: [], articles: [] }
  const match = (...fields: string[]) => fields.some((f) => f.toLowerCase().includes(q))
  return {
    projects: projects.filter((p) => match(p.name, p.developer, p.sector, p.summary, p.types.join(' '))),
    locations: locations.filter((l) => match(l.name, l.shortName, l.summary)),
    articles: getArticles().filter((a) => match(a.title, a.excerpt, a.category)),
  }
}
