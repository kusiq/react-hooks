export {
  productApi,
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useGetProductsQuery,
} from '@/entities/product/api/product-api'
export { filterProducts } from '@/entities/product/lib/filter-products'
export { getVisibleProducts } from '@/entities/product/lib/get-visible-products'
export { selectFavoriteProducts } from '@/entities/product/lib/select-favorite-products'
export { sortProducts } from '@/entities/product/lib/sort-products'
export { selectAllProducts } from '@/entities/product/model/selectors'
export { ProductCard } from '@/entities/product/ui/product-card'
export { ProductDetailsPanel } from '@/entities/product/ui/product-details-panel'
export type {
  Category,
  Product,
  ProductCardModel,
  ProductId,
  ProductsResponse,
} from '@/entities/product/model/types'
