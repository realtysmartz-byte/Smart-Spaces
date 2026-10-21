'use client'

import { useSyncExternalStore } from 'react'

export const MAX_COMPARE = 3
const KEY = 'smartz-compare'
const listeners = new Set<() => void>()
const EMPTY: string[] = []
let cache: string[] | null = null

function read(): string[] {
  if (cache) return cache
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || '[]')
    cache = Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === 'string').slice(0, MAX_COMPARE) : []
  } catch {
    cache = []
  }
  return cache
}

function write(next: string[]) {
  cache = next.slice(0, MAX_COMPARE)
  try {
    window.localStorage.setItem(KEY, JSON.stringify(cache))
  } catch {}
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null
      listener()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

export function useCompare() {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY)
  return {
    items,
    isFull: items.length >= MAX_COMPARE,
    has: (slug: string) => items.includes(slug),
    toggle: (slug: string) => {
      const current = read()
      if (current.includes(slug)) write(current.filter((s) => s !== slug))
      else if (current.length < MAX_COMPARE) write([...current, slug])
    },
    remove: (slug: string) => write(read().filter((s) => s !== slug)),
    set: (slugs: string[]) => write(slugs),
    clear: () => write([]),
  }
}
