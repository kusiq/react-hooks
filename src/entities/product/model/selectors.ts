import { createSelector } from '@reduxjs/toolkit'
import type { Product } from '@/entities/product/model/types'
import { productApi } from '@/entities/product/api/product-api'

const EMPTY_PRODUCTS: Product[] = []

const selectProductsQueryResult = productApi.endpoints.getProducts.select()

export const selectAllProducts = createSelector(
  selectProductsQueryResult,
  (productsQueryResult) => productsQueryResult.data?.products ?? EMPTY_PRODUCTS,
)
