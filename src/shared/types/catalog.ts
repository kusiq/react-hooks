import { ALL_CATEGORIES_VALUE } from '@/shared/config/ui'

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc'

export interface CatalogFiltersState {
  category: string
  sortBy: SortOption
}

export const DEFAULT_CATALOG_FILTERS: CatalogFiltersState = {
  category: ALL_CATEGORIES_VALUE,
  sortBy: 'featured',
}
