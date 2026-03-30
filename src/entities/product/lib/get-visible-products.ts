import type {
  Product,
  ProductCardModel,
  ProductId,
} from '@/entities/product/model/types'
import { sortProducts } from '@/entities/product/lib/sort-products'
import { ALL_CATEGORIES_VALUE } from '@/shared/config/ui'
import type { CatalogFiltersState } from '@/shared/types/catalog'

export const getVisibleProducts = (
  products: readonly Product[],
  filters: CatalogFiltersState,
  favoriteIds: readonly ProductId[],
): ProductCardModel[] => {
  const favoriteIdSet = new Set(favoriteIds)

  const categoryFilteredProducts =
    filters.category === ALL_CATEGORIES_VALUE
      ? products
      : products.filter((product) => product.category === filters.category)

  const mappedProducts = categoryFilteredProducts.map((product) => ({
    ...product,
    isFavorite: favoriteIdSet.has(product.id),
  }))

  return sortProducts(mappedProducts, filters.sortBy)
}
