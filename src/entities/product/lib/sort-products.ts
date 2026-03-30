import type { Product } from '@/entities/product/model/types'
import type { SortOption } from '@/shared/types/catalog'

export const sortProducts = <T extends Product>(
  products: readonly T[],
  sortBy: SortOption,
): T[] => {
  const nextProducts = [...products]

  switch (sortBy) {
    case 'price-asc':
      return nextProducts.sort((left, right) => left.price - right.price)
    case 'price-desc':
      return nextProducts.sort((left, right) => right.price - left.price)
    case 'rating-desc':
      return nextProducts.sort((left, right) => right.rating - left.rating)
    case 'featured':
    default:
      return nextProducts.sort((left, right) => {
        if (right.rating === left.rating) {
          return right.stock - left.stock
        }

        return right.rating - left.rating
      })
  }
}
