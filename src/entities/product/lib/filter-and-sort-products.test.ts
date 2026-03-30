import { describe, expect, it } from 'vitest'
import { filterProducts } from '@/entities/product/lib/filter-products'
import { sortProducts } from '@/entities/product/lib/sort-products'
import type { ProductCardModel } from '@/entities/product'

const products: ProductCardModel[] = [
  {
    id: 1,
    title: 'Nebula Phone X',
    description: 'Camera focused phone',
    category: 'smartphones',
    price: 899,
    discountPercentage: 9,
    rating: 4.8,
    stock: 12,
    brand: 'Orbit',
    thumbnail: 'phone.webp',
    isFavorite: false,
  },
  {
    id: 2,
    title: 'Quartz Laptop Air',
    description: 'Portable laptop',
    category: 'laptops',
    price: 1299,
    discountPercentage: 6,
    rating: 4.6,
    stock: 8,
    brand: 'Quartz',
    thumbnail: 'laptop.webp',
    isFavorite: true,
  },
]

describe('product utilities', () => {
  it('filters by a normalized search value', () => {
    expect(filterProducts(products, 'laptop')).toHaveLength(1)
    expect(filterProducts(products, '  orbit ')).toHaveLength(1)
  })

  it('sorts products by price descending', () => {
    expect(sortProducts(products, 'price-desc')[0]?.id).toBe(2)
  })
})
