import { screen } from '@testing-library/react'
import { afterEach, describe, it, vi } from 'vitest'
import { FavoritesPage } from '@pages/favorites-page'
import { mockProductApi } from '@shared/test/mock-product-api'
import { renderWithProviders } from '@shared/test/render-with-providers'

describe('FavoritesPage', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows the empty state when no favorites are saved', async () => {
    mockProductApi()

    renderWithProviders(<FavoritesPage />)

    await screen.findByText('Пока нет сохраненных товаров')
  })
})
