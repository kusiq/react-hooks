import type { RefObject } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { useEffect, useRef } from 'react'
import { useMediaQuery, useOnClickOutside } from 'usehooks-ts'
import {
  ProductDetailsPanel,
  useGetProductByIdQuery,
  type ProductId,
} from '@entities/product'
import { BREAKPOINTS } from '@shared/config/ui'
import { PageState } from '@shared/ui/page-state/page-state'
import styles from '@features/product-details/ui/product-details-drawer.module.scss'

interface ProductDetailsDrawerProps {
  isOpen: boolean
  onClose: () => void
  productId: ProductId | null
}

export const ProductDetailsDrawer = ({
  isOpen,
  onClose,
  productId,
}: ProductDetailsDrawerProps) => {
  const isDesktop = useMediaQuery(`(min-width: ${BREAKPOINTS.desktop}px)`)
  const panelRef = useRef<HTMLElement>(null)
  const queryArg = productId ?? skipToken
  const { data, isError, isFetching } = useGetProductByIdQuery(queryArg)

  useOnClickOutside(panelRef as RefObject<HTMLElement>, onClose)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.overlay} data-testid="details-overlay">
      <aside
        ref={panelRef}
        className={
          isDesktop
            ? `${styles.panel} ${styles.desktop}`
            : `${styles.panel} ${styles.mobile}`
        }
        role="dialog"
        aria-modal="true"
        aria-label="Детали товара"
      >
        <div className={styles.header}>
          <p className={styles.eyebrow}>Ленивая загрузка деталей</p>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            Закрыть
          </button>
        </div>

        {isFetching ? (
          <PageState tone="loading" title="Загружаем детали товара" />
        ) : isError || !data ? (
          <PageState
            tone="error"
            title="Не удалось загрузить детали товара"
            description="Боковая панель изолирована от основной сетки, поэтому ошибка внутри нее не ломает список товаров."
          />
        ) : (
          <ProductDetailsPanel product={data} />
        )}
      </aside>
    </div>
  )
}
