import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ProductId } from '@/entities/product'
import type { FavoritesState } from '@/shared/types/favorites'

const initialState: FavoritesState = {
  ids: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    hydrateFavorites: (state, action: PayloadAction<ProductId[]>) => {
      state.ids = action.payload
    },
    toggleFavorite: (state, action: PayloadAction<ProductId>) => {
      const nextId = action.payload
      const existingIndex = state.ids.indexOf(nextId)

      if (existingIndex >= 0) {
        state.ids.splice(existingIndex, 1)
        return
      }

      state.ids.unshift(nextId)
    },
  },
})

export const { hydrateFavorites, toggleFavorite } = favoritesSlice.actions

export const favoritesReducer = favoritesSlice.reducer
