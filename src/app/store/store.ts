import { configureStore } from '@reduxjs/toolkit'
import { catalogFiltersReducer } from '@/features/catalog-filters'
import { favoritesReducer } from '@/features/favorites'
import { productApi } from '@/entities/product'

const rootReducer = {
  catalogFilters: catalogFiltersReducer,
  favorites: favoritesReducer,
  [productApi.reducerPath]: productApi.reducer,
}

export const createAppStore = () =>
  configureStore({
    reducer: {
      ...rootReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware),
  })

export const store = createAppStore()

export type AppStore = ReturnType<typeof createAppStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
