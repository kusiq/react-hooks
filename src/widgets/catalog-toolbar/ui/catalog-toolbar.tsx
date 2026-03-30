import type { ChangeEvent } from 'react'
import type { Category } from '@entities/product'
import {
  ALL_CATEGORIES_VALUE,
  SEARCH_DEBOUNCE_MS,
  SORT_OPTIONS,
} from '@shared/config/ui'
import { formatCategoryLabel } from '@shared/lib/formatters/format-category-label'
import type { SortOption } from '@shared/types/catalog'
import styles from '@widgets/catalog-toolbar/ui/catalog-toolbar.module.scss'

interface CatalogToolbarProps {
  activeCategory: string
  categories: Category[]
  favoriteCount: number
  isSearching: boolean
  isTransitioning: boolean
  onCategoryChange: (category: string) => void
  onReset: () => void
  onSearchChange: (searchValue: string) => void
  onSortChange: (sortBy: SortOption) => void
  resultsCount: number
  searchValue: string
  sortBy: SortOption
  totalCount: number
}

export const CatalogToolbar = ({
  activeCategory,
  categories,
  favoriteCount,
  isSearching,
  isTransitioning,
  onCategoryChange,
  onReset,
  onSearchChange,
  onSortChange,
  resultsCount,
  searchValue,
  sortBy,
  totalCount,
}: CatalogToolbarProps) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value)
  }

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(event.target.value)
  }

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SortOption)
  }

  return (
    <section className={styles.toolbar} aria-labelledby="catalog-toolbar-title">
      <div className={styles.summary}>
        <p className={styles.eyebrow}>Минималистичный каталог</p>
        <h1 id="catalog-toolbar-title" className={styles.title}>
          Компактный проект, в котором легко показать уместные хуки и понятные
          оптимизации.
        </h1>
        <p className={styles.description}>
          Поиск работает с debounce на {SEARCH_DEBOUNCE_MS} мс, список
          отрисовывается через deferred value, фильтры меняются внутри
          transition, а избранное сохраняется между сессиями.
        </p>
      </div>

      <div className={styles.controls}>
        <label className={styles.field}>
          <span className={styles.label}>Поиск товаров</span>
          <input
            className={styles.input}
            type="search"
            placeholder="Название, бренд или категория"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Категория</span>
          <select
            className={styles.select}
            value={activeCategory}
            onChange={handleCategoryChange}
          >
            <option value={ALL_CATEGORIES_VALUE}>Все категории</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {formatCategoryLabel(category.slug)}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Сортировка</span>
          <select
            className={styles.select}
            value={sortBy}
            onChange={handleSortChange}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.metaRow}>
        <div className={styles.metrics}>
          <div>
            <span className={styles.metricLabel}>Показано</span>
            <strong>{resultsCount}</strong>
          </div>
          <div>
            <span className={styles.metricLabel}>Загружено</span>
            <strong>{totalCount}</strong>
          </div>
          <div>
            <span className={styles.metricLabel}>В избранном</span>
            <strong>{favoriteCount}</strong>
          </div>
        </div>

        <div className={styles.actions}>
          <span className={styles.status}>
            {isSearching
              ? 'Обновляем отложенные результаты'
              : isTransitioning
                ? 'Применяем несрочное обновление'
                : 'Интерфейс стабилен'}
          </span>
          <button
            type="button"
            className={styles.resetButton}
            onClick={onReset}
          >
            Сбросить
          </button>
        </div>
      </div>
    </section>
  )
}
