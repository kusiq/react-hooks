import { describe, expect, it } from 'vitest'
import {
  favoritesReducer,
  hydrateFavorites,
  toggleFavorite,
} from '@/features/favorites/model/favorites-slice'

describe('favorites slice', () => {
  it('hydrates and toggles ids', () => {
    const hydratedState = favoritesReducer(undefined, hydrateFavorites([1, 2]))

    expect(hydratedState.ids).toEqual([1, 2])

    const removedState = favoritesReducer(hydratedState, toggleFavorite(1))
    expect(removedState.ids).toEqual([2])

    const addedState = favoritesReducer(removedState, toggleFavorite(3))
    expect(addedState.ids).toEqual([3, 2])
  })
})
