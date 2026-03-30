import { lazy, Suspense, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetProductsQuery, type ProductId } from '@entities/product'
import { selectFavoriteCount, toggleFavorite } from '@features/favorites'
import { ROUTES } from '@shared/config/routes'
import { useAppDispatch } from '@shared/hooks/use-app-dispatch'
import { useAppSelector } from '@shared/hooks/use-app-selector'
import { PageState } from '@shared/ui/page-state/page-state'
import { selectFavoriteCatalogProducts } from '@pages/favorites-page/model/selectors'
import { ProductGrid } from '@widgets/product-grid'
import styles from '@pages/favorites-page/ui/favorites-page.module.scss'

const LazyProductDetailsDrawer = lazy(() =>
  import('@features/product-details').then((module) => ({
    default: module.ProductDetailsDrawer,
  })),
)

export const FavoritesPage = () => {
  const dispatch = useAppDispatch()
  const favoriteCount = useAppSelector(selectFavoriteCount)
  const favoriteProducts = useAppSelector(selectFavoriteCatalogProducts)
  const [selectedProductId, setSelectedProductId] = useState<ProductId | null>(
    null,
  )

  const { isError, isLoading, refetch } = useGetProductsQuery()

  const handleToggleFavorite = useCallback(
    (productId: ProductId) => {
      dispatch(toggleFavorite(productId))
    },
    [dispatch],
  )

  const handleOpenProduct = useCallback((productId: ProductId) => {
    setSelectedProductId(productId)
  }, [])

  if (isLoading) {
    return <PageState tone="loading" title="Загружаем избранное" />
  }

  if (isError && !favoriteProducts.length) {
    return (
      <PageState
        tone="error"
        title="Избранное сейчас недоступно"
        description="Страница использует тот же кеш товаров, поэтому для восстановления достаточно повторить запрос."
        action={
          <button
            type="button"
            className={styles.actionButton}
            onClick={() => void refetch()}
          >
            Повторить
          </button>
        }
      />
    )
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Вторичный маршрут · ленивая загрузка</p>
        <h1 className={styles.title}>
          Избранное остается компактным, понятным и сохраненным.
        </h1>
        <p className={styles.description}>
          Эта страница переиспользует кешированные данные с сервера и строит
          свой список на основе id из Redux.
        </p>
      </section>

      {favoriteCount ? (
        <ProductGrid
          products={favoriteProducts}
          onOpenProduct={handleOpenProduct}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <PageState
          tone="empty"
          title="Пока нет сохраненных товаров"
          description="Сохрани несколько товаров из каталога, чтобы показать, как вместе работают локальная персистентность и производные селекторы."
          action={
            <Link className={styles.actionButton} to={ROUTES.catalog}>
              Перейти в каталог
            </Link>
          }
        />
      )}

      <Suspense fallback={null}>
        <LazyProductDetailsDrawer
          isOpen={selectedProductId !== null}
          productId={selectedProductId}
          onClose={() => {
            setSelectedProductId(null)
          }}
        />
      </Suspense>
    </div>
  )
}
