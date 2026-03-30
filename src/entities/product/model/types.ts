export type ProductId = number

export interface Category {
  slug: string
  name: string
  url: string
}

export interface ProductReview {
  rating: number
  comment: string
  date: string
  reviewerName: string
}

export interface Product {
  id: ProductId
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand?: string
  thumbnail: string
  images?: string[]
  availabilityStatus?: string
  shippingInformation?: string
  warrantyInformation?: string
  reviews?: ProductReview[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface ProductCardModel extends Product {
  isFavorite: boolean
}
