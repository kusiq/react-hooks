import type { ProductCardModel } from '@/entities/product/model/types'

export const filterProducts = (
  products: readonly ProductCardModel[],
  searchValue: string,
): ProductCardModel[] => {
  const normalizedSearchValue = searchValue.trim().toLowerCase()

  if (!normalizedSearchValue) {
    return [...products]
  }

  return products.filter((product) => {
    return [
      product.title,
      product.brand ?? '',
      product.category,
      product.description,
    ]
      .join(' ')
      .toLowerCase()
      .includes(normalizedSearchValue)
  })
}
