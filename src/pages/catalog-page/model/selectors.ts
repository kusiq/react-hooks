import { createSelector } from '@reduxjs/toolkit'
import { getVisibleProducts, selectAllProducts } from '@/entities/product'
import { selectCatalogFilters } from '@/features/catalog-filters'
import { selectFavoriteIds } from '@/features/favorites'

export const selectCatalogProducts = createSelector(
  [selectAllProducts, selectCatalogFilters, selectFavoriteIds],
  (products, filters, favoriteIds) =>
    getVisibleProducts(products, filters, favoriteIds),
)
