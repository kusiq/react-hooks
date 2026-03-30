import type { ProductCardModel, ProductId } from '@/entities/product'
import { ProductCard } from '@/entities/product/ui/product-card'
import styles from '@/widgets/product-grid/ui/product-grid.module.scss'

interface ProductGridProps {
  onOpenProduct: (productId: ProductId) => void
  onToggleFavorite: (productId: ProductId) => void
  products: ProductCardModel[]
}

export const ProductGrid = ({
  onOpenProduct,
  onToggleFavorite,
  products,
}: ProductGridProps) => {
  return (
    <section
      className={styles.gridSection}
      aria-labelledby="product-grid-title"
    >
      <h2 id="product-grid-title" className={styles.title}>
        Товары
      </h2>

      <ul className={styles.grid}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard
              product={product}
              onOpenProduct={onOpenProduct}
              onToggleFavorite={onToggleFavorite}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
