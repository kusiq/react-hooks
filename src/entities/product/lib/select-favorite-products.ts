import type {
  Product,
  ProductCardModel,
  ProductId,
} from '@/entities/product/model/types'

export const selectFavoriteProducts = (
  products: readonly Product[],
  favoriteIds: readonly ProductId[],
): ProductCardModel[] => {
  const favoriteIdSet = new Set(favoriteIds)

  return products
    .filter((product) => favoriteIdSet.has(product.id))
    .map((product) => ({
      ...product,
      isFavorite: true,
    }))
}
