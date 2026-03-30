import type { RootState } from '@/app/store/store'

export const selectCatalogFilters = (state: RootState) => state.catalogFilters
