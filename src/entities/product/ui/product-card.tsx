import { memo } from 'react'
import type { ProductCardModel, ProductId } from '@entities/product'
import { formatCategoryLabel } from '@shared/lib/formatters/format-category-label'
import { formatCurrency } from '@shared/lib/formatters/format-currency'
import { formatRating } from '@shared/lib/formatters/format-rating'
import styles from '@entities/product/ui/product-card.module.scss'

interface ProductCardProps {
  onOpenProduct: (productId: ProductId) => void
  onToggleFavorite: (productId: ProductId) => void
  product: ProductCardModel
}

const ProductCardComponent = ({
  onOpenProduct,
  onToggleFavorite,
  product,
}: ProductCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          className={styles.image}
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
      </div>

      <div className={styles.body}>
        <div className={styles.metaRow}>
          <p className={styles.category}>
            {product.brand ?? formatCategoryLabel(product.category)}
          </p>
          <button
            type="button"
            className={
              product.isFavorite ? styles.favoriteActive : styles.favoriteButton
            }
            aria-pressed={product.isFavorite}
            onClick={() => {
              onToggleFavorite(product.id)
            }}
          >
            {product.isFavorite ? 'Сохранено' : 'Сохранить'}
          </button>
        </div>

        <div className={styles.copy}>
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.description}>{product.description}</p>
        </div>

        <div className={styles.footer}>
          <div className={styles.metrics}>
            <strong>{formatCurrency(product.price)}</strong>
            <span>Рейтинг: {formatRating(product.rating)}</span>
            <span>В наличии: {product.stock}</span>
          </div>

          <button
            type="button"
            className={styles.detailsButton}
            onClick={() => {
              onOpenProduct(product.id)
            }}
          >
            Подробнее
          </button>
        </div>
      </div>
    </article>
  )
}

export const ProductCard = memo(ProductCardComponent)
