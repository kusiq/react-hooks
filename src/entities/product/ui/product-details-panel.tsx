import type { Product } from '@entities/product'
import { formatCategoryLabel } from '@shared/lib/formatters/format-category-label'
import { formatCurrency } from '@shared/lib/formatters/format-currency'
import { formatRating } from '@shared/lib/formatters/format-rating'
import styles from '@entities/product/ui/product-details-panel.module.scss'

interface ProductDetailsPanelProps {
  product: Product
}

export const ProductDetailsPanel = ({ product }: ProductDetailsPanelProps) => {
  return (
    <div className={styles.panel}>
      <div className={styles.hero}>
        <div className={styles.copy}>
          <p className={styles.category}>
            {formatCategoryLabel(product.category)}
          </p>
          <h2 className={styles.title}>{product.title}</h2>
          <p className={styles.description}>{product.description}</p>
        </div>

        <img
          className={styles.image}
          src={product.images?.[0] ?? product.thumbnail}
          alt={product.title}
        />
      </div>

      <dl className={styles.metrics}>
        <div>
          <dt>Цена</dt>
          <dd>{formatCurrency(product.price)}</dd>
        </div>
        <div>
          <dt>Рейтинг</dt>
          <dd>{formatRating(product.rating)}</dd>
        </div>
        <div>
          <dt>Остаток</dt>
          <dd>{product.stock}</dd>
        </div>
        <div>
          <dt>Гарантия</dt>
          <dd>{product.warrantyInformation ?? 'Стандартное покрытие'}</dd>
        </div>
      </dl>

      <section className={styles.detailSection}>
        <h3>Доставка</h3>
        <p>
          {product.shippingInformation ??
            'Отправка по стандартным условиям каталога.'}
        </p>
      </section>

      {product.reviews?.length ? (
        <section className={styles.detailSection}>
          <h3>Последние отзывы</h3>
          <ul className={styles.reviewList}>
            {product.reviews.slice(0, 2).map((review) => (
              <li
                key={`${review.reviewerName}-${review.date}`}
                className={styles.review}
              >
                <p className={styles.reviewMeta}>
                  {review.reviewerName} · {review.rating}/5
                </p>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
