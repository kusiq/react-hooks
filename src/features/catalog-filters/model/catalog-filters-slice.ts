import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import {
  DEFAULT_CATALOG_FILTERS,
  type CatalogFiltersState,
  type SortOption,
} from '@/shared/types/catalog'

const catalogFiltersSlice = createSlice({
  name: 'catalogFilters',
  initialState: DEFAULT_CATALOG_FILTERS satisfies CatalogFiltersState,
  reducers: {
    resetCatalogFilters: () => DEFAULT_CATALOG_FILTERS,
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload
    },
  },
})

export const { resetCatalogFilters, setCategory, setSortBy } =
  catalogFiltersSlice.actions

export const catalogFiltersReducer = catalogFiltersSlice.reducer
