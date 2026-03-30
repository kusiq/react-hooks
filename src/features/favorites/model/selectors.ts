import type { RootState } from '@/app/store/store'

export const selectFavoriteIds = (state: RootState) => state.favorites.ids

export const selectFavoriteCount = (state: RootState) =>
  state.favorites.ids.length
