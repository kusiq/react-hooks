import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  Category,
  Product,
  ProductId,
  ProductsResponse,
} from '@/entities/product/model/types'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => '/products/categories',
    }),
    getProductById: builder.query<Product, ProductId>({
      query: (productId) => `/products/${productId}`,
    }),
    getProducts: builder.query<ProductsResponse, void>({
      query: () =>
        '/products?limit=200&select=id,title,description,category,price,discountPercentage,rating,stock,thumbnail,brand',
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useGetProductsQuery,
} = productApi
