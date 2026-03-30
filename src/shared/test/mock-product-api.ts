import { vi } from 'vitest'
import type { Category, Product, ProductsResponse } from '@/entities/product'

export const mockCategories: Category[] = [
  {
    slug: 'smartphones',
    name: 'Smartphones',
    url: 'https://dummyjson.com/products/category/smartphones',
  },
  {
    slug: 'laptops',
    name: 'Laptops',
    url: 'https://dummyjson.com/products/category/laptops',
  },
  {
    slug: 'home-decoration',
    name: 'Home Decoration',
    url: 'https://dummyjson.com/products/category/home-decoration',
  },
]

export const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Nebula Phone X',
    description:
      'Flagship phone focused on camera performance and battery life.',
    category: 'smartphones',
    price: 899,
    discountPercentage: 9.2,
    rating: 4.8,
    stock: 12,
    brand: 'Orbit',
    thumbnail: 'https://example.com/nebula-phone-x.webp',
    images: ['https://example.com/nebula-phone-x-detail.webp'],
    warrantyInformation: '2 year warranty',
    shippingInformation: 'Ships in 2 business days',
    reviews: [
      {
        rating: 5,
        comment: 'A confident product for demos and day-to-day work.',
        date: '2026-03-20T00:00:00.000Z',
        reviewerName: 'Elena Carter',
      },
    ],
  },
  {
    id: 2,
    title: 'Quartz Laptop Air',
    description: 'Lightweight laptop with a clean keyboard and bright display.',
    category: 'laptops',
    price: 1299,
    discountPercentage: 6.4,
    rating: 4.6,
    stock: 8,
    brand: 'Quartz',
    thumbnail: 'https://example.com/quartz-laptop-air.webp',
    images: ['https://example.com/quartz-laptop-air-detail.webp'],
    warrantyInformation: '1 year warranty',
    shippingInformation: 'Ships in 4 business days',
    reviews: [
      {
        rating: 4,
        comment: 'Very easy to carry and great for focused work.',
        date: '2026-03-18T00:00:00.000Z',
        reviewerName: 'Maksim Green',
      },
    ],
  },
  {
    id: 3,
    title: 'Cedar Desk Lamp',
    description:
      'Warm ambient desk lamp with a compact footprint for home setups.',
    category: 'home-decoration',
    price: 129,
    discountPercentage: 3.1,
    rating: 4.2,
    stock: 34,
    brand: 'Cedar',
    thumbnail: 'https://example.com/cedar-desk-lamp.webp',
    images: ['https://example.com/cedar-desk-lamp-detail.webp'],
    warrantyInformation: '6 month warranty',
    shippingInformation: 'Ships tomorrow',
    reviews: [
      {
        rating: 4,
        comment: 'The warm tone works really well in late sessions.',
        date: '2026-03-16T00:00:00.000Z',
        reviewerName: 'Nadia Fox',
      },
    ],
  },
]

export const mockProductsResponse: ProductsResponse = {
  products: mockProducts,
  total: mockProducts.length,
  skip: 0,
  limit: 200,
}

const createJsonResponse = (payload: unknown, status = 200) => {
  return Promise.resolve(
    new Response(JSON.stringify(payload), {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  )
}

interface MockProductApiOptions {
  failProducts?: boolean
}

export const mockProductApi = (options: MockProductApiOptions = {}) => {
  return vi.spyOn(globalThis, 'fetch').mockImplementation((input) => {
    const requestUrl =
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.toString()
          : input.url

    if (requestUrl.includes('/products/categories')) {
      return createJsonResponse(mockCategories)
    }

    if (requestUrl.includes('/products?')) {
      if (options.failProducts) {
        return createJsonResponse({ message: 'Request failed' }, 500)
      }

      return createJsonResponse(mockProductsResponse)
    }

    if (requestUrl.includes('/products/')) {
      const productId = Number(requestUrl.split('/products/')[1])
      const product = mockProducts.find((item) => item.id === productId)

      if (!product) {
        return createJsonResponse({ message: 'Not found' }, 404)
      }

      return createJsonResponse(product)
    }

    return createJsonResponse({ message: 'Unhandled request' }, 404)
  })
}
