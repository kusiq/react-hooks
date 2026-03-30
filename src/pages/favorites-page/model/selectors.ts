import { createSelector } from '@reduxjs/toolkit'
import { selectAllProducts, selectFavoriteProducts } from '@/entities/product'
import { selectFavoriteIds } from '@/features/favorites'

export const selectFavoriteCatalogProducts = createSelector(
  [selectAllProducts, selectFavoriteIds],
  (products, favoriteIds) => selectFavoriteProducts(products, favoriteIds),
)
