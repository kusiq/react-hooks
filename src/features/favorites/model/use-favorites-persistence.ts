import { useEffect, useRef } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import type { ProductId } from '@/entities/product'
import { hydrateFavorites } from '@/features/favorites/model/favorites-slice'
import { selectFavoriteIds } from '@/features/favorites/model/selectors'
import { STORAGE_KEYS } from '@/shared/config/ui'
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch'
import { useAppSelector } from '@/shared/hooks/use-app-selector'

export const useFavoritesPersistence = () => {
  const dispatch = useAppDispatch()
  const favoriteIds = useAppSelector(selectFavoriteIds)
  const [storedFavoriteIds, setStoredFavoriteIds] = useLocalStorage<
    ProductId[]
  >(STORAGE_KEYS.favorites, [])
  const isHydratedRef = useRef(false)

  useEffect(() => {
    if (isHydratedRef.current) {
      return
    }

    dispatch(hydrateFavorites(storedFavoriteIds))
    isHydratedRef.current = true
  }, [dispatch, storedFavoriteIds])

  useEffect(() => {
    if (!isHydratedRef.current) {
      return
    }

    setStoredFavoriteIds(favoriteIds)
  }, [favoriteIds, setStoredFavoriteIds])
}
