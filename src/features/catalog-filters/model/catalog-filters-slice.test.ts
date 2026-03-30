import { describe, expect, it } from 'vitest'
import {
  catalogFiltersReducer,
  resetCatalogFilters,
  setCategory,
  setSortBy,
} from '@/features/catalog-filters/model/catalog-filters-slice'

describe('catalog filters slice', () => {
  it('updates and resets filters', () => {
    const updatedState = catalogFiltersReducer(
      undefined,
      setCategory('smartphones'),
    )
    expect(updatedState.category).toBe('smartphones')

    const sortedState = catalogFiltersReducer(
      updatedState,
      setSortBy('price-desc'),
    )
    expect(sortedState.sortBy).toBe('price-desc')

    const resetState = catalogFiltersReducer(sortedState, resetCatalogFilters())
    expect(resetState).toEqual({
      category: 'all',
      sortBy: 'featured',
    })
  })
})
