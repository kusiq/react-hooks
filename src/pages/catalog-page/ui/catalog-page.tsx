import {
  lazy,
  Suspense,
  useCallback,
  useDeferredValue,
  useMemo,
  useState,
  useTransition,
} from 'react'
import {
  filterProducts,
  useGetCategoriesQuery,
  useGetProductsQuery,
  type ProductId,
} from '@entities/product'
import {
  resetCatalogFilters,
  selectCatalogFilters,
  setCategory,
  setSortBy,
} from '@features/catalog-filters'
import {
  selectFavoriteCount,
  selectFavoriteIds,
  toggleFavorite,
} from '@features/favorites'
import { SEARCH_DEBOUNCE_MS } from '@shared/config/ui'
import { useAppDispatch } from '@shared/hooks/use-app-dispatch'
import { useAppSelector } from '@shared/hooks/use-app-selector'
import { useDebounce } from '@shared/hooks/use-debounce'
import type { SortOption } from '@shared/types/catalog'
import { PageState } from '@shared/ui/page-state/page-state'
import { selectCatalogProducts } from '@pages/catalog-page/model/selectors'
import { CatalogToolbar } from '@widgets/catalog-toolbar'
import { ProductGrid } from '@widgets/product-grid'
import styles from '@pages/catalog-page/ui/catalog-page.module.scss'

const LazyProductDetailsDrawer = lazy(() =>
  import('@features/product-details').then((module) => ({
    default: module.ProductDetailsDrawer,
  })),
)

export const CatalogPage = () => {
  const dispatch = useAppDispatch()
  const filters = useAppSelector(selectCatalogFilters)
  const favoriteCount = useAppSelector(selectFavoriteCount)
  const favoriteIds = useAppSelector(selectFavoriteIds)
  const catalogProducts = useAppSelector(selectCatalogProducts)
  const [searchValue, setSearchValue] = useState('')
  const [selectedProductId, setSelectedProductId] = useState<ProductId | null>(
    null,
  )
  const [isTransitioning, startTransition] = useTransition()

  const debouncedSearchValue = useDebounce(searchValue, SEARCH_DEBOUNCE_MS)
  const deferredSearchValue = useDeferredValue(debouncedSearchValue)

  const {
    data: categories = [],
    isError: isCategoriesError,
    isLoading: isCategoriesLoading,
  } = useGetCategoriesQuery()
  const {
    data: productsResponse,
    isError: isProductsError,
    isLoading: isProductsLoading,
    refetch,
  } = useGetProductsQuery()

  const filteredProducts = useMemo(() => {
    return filterProducts(catalogProducts, deferredSearchValue)
  }, [catalogProducts, deferredSearchValue])

  const handleOpenProduct = useCallback((productId: ProductId) => {
    setSelectedProductId(productId)
  }, [])

  const handleToggleFavorite = useCallback(
    (productId: ProductId) => {
      dispatch(toggleFavorite(productId))
    },
    [dispatch],
  )

  const handleCategoryChange = useCallback(
    (nextCategory: string) => {
      startTransition(() => {
        dispatch(setCategory(nextCategory))
      })
    },
    [dispatch],
  )

  const handleSortChange = useCallback(
    (nextSortBy: SortOption) => {
      startTransition(() => {
        dispatch(setSortBy(nextSortBy))
      })
    },
    [dispatch],
  )

  const handleReset = useCallback(() => {
    setSearchValue('')
    startTransition(() => {
      dispatch(resetCatalogFilters())
    })
  }, [dispatch])

  if (isProductsLoading && isCategoriesLoading) {
    return <PageState tone="loading" title="Загружаем каталог" />
  }

  if ((isProductsError || isCategoriesError) && !productsResponse) {
    return (
      <PageState
        tone="error"
        title="Не удалось загрузить каталог"
        description="Данные загружаются через RTK Query, поэтому повторный запрос можно сделать локально, без перезагрузки страницы."
        action={
          <button
            type="button"
            className={styles.retryButton}
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
      <CatalogToolbar
        activeCategory={filters.category}
        categories={categories}
        favoriteCount={favoriteCount}
        isSearching={debouncedSearchValue !== deferredSearchValue}
        isTransitioning={isTransitioning}
        onCategoryChange={handleCategoryChange}
        onReset={handleReset}
        onSearchChange={setSearchValue}
        onSortChange={handleSortChange}
        resultsCount={filteredProducts.length}
        searchValue={searchValue}
        sortBy={filters.sortBy}
        totalCount={productsResponse?.products.length ?? 0}
      />

      {filteredProducts.length ? (
        <ProductGrid
          products={filteredProducts}
          onOpenProduct={handleOpenProduct}
          onToggleFavorite={handleToggleFavorite}
        />
      ) : (
        <PageState
          tone="empty"
          title="По текущим условиям товары не найдены"
          description={`Попробуй очистить поиск, сменить категорию или убрать одно из ограничений. Сейчас в избранном: ${favoriteIds.length}.`}
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
