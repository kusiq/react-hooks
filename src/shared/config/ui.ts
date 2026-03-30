import type { SortOption } from '@shared/types/catalog'

export const SEARCH_DEBOUNCE_MS = 320
export const SCROLL_THROTTLE_MS = 160
export const ANIMATION_MS = 220

export const BREAKPOINTS = {
  tablet: 768,
  desktop: 1024,
} as const

export const ALL_CATEGORIES_VALUE = 'all'

export const SORT_OPTIONS: ReadonlyArray<{
  value: SortOption
  label: string
}> = [
  {
    value: 'featured',
    label: 'По умолчанию',
  },
  {
    value: 'price-asc',
    label: 'Сначала дешевле',
  },
  {
    value: 'price-desc',
    label: 'Сначала дороже',
  },
  {
    value: 'rating-desc',
    label: 'По рейтингу',
  },
]

export const STORAGE_KEYS = {
  favorites: 'minimal-product-catalog/favorites',
} as const
