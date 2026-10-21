import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/seo'
import { cn } from '@/lib/utils'

export type Crumb = {
  name?: string
  path?: string
  label?: string
  href?: string
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const normalizedItems = items
    .map((item) => ({
      name: item.name || item.label || '',
      path: item.path || item.href || '',
    }))
    .filter((item) => item.name && item.path)

  // Avoid duplicate Home if first item is already Home
  const hasHome = normalizedItems.length > 0 && normalizedItems[0].path === '/'
  const all = hasHome
    ? normalizedItems
    : [{ name: 'Home', path: '/' }, ...normalizedItems]

  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <nav aria-label="Breadcrumb" className={cn('text-xs sm:text-sm py-2', className)}>
        <ol className="flex flex-wrap items-center gap-1.5 text-muted-500">
          {all.map((item, i) => {
            const last = i === all.length - 1
            return (
              <li key={`${item.path}-${i}`} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-semibold text-primary-900">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.path}
                      className="hover:text-primary-900 hover:underline transition-colors"
                    >
                      {item.name}
                    </Link>
                    <ChevronRight className="size-3 text-accent-500/80 shrink-0" aria-hidden="true" />
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
