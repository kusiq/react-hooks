import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CatalogPage } from '@pages/catalog-page'
import { mockProductApi } from '@shared/test/mock-product-api'
import { renderWithProviders } from '@shared/test/render-with-providers'

describe('CatalogPage', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('searches, sorts, and saves products', async () => {
    mockProductApi()

    const user = userEvent.setup()

    renderWithProviders(<CatalogPage />)

    await screen.findByText('Nebula Phone X')

    const searchInput = screen.getByRole('searchbox', {
      name: 'Поиск товаров',
    })
    await user.type(searchInput, 'laptop')

    await waitFor(() => {
      expect(screen.queryByText('Nebula Phone X')).not.toBeInTheDocument()
    })
    expect(screen.getByText('Quartz Laptop Air')).toBeInTheDocument()

    await user.clear(searchInput)
    await waitFor(() => {
      expect(screen.getByText('Nebula Phone X')).toBeInTheDocument()
    })

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Категория' }),
      'smartphones',
    )
    await waitFor(() => {
      expect(screen.getByText('Nebula Phone X')).toBeInTheDocument()
    })
    expect(screen.queryByText('Quartz Laptop Air')).not.toBeInTheDocument()

    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Сортировка' }),
      'price-desc',
    )
    const cards = within(screen.getByRole('list')).getAllByRole('listitem')
    expect(cards).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: 'Сохранить' }))
    expect(
      screen.getByRole('button', { name: 'Сохранено' }),
    ).toBeInTheDocument()
  })

  it('opens and closes the lazy detail drawer', async () => {
    mockProductApi()

    const user = userEvent.setup()
    renderWithProviders(<CatalogPage />)

    await screen.findByText('Nebula Phone X')
    await user.click(screen.getAllByRole('button', { name: 'Подробнее' })[0]!)

    await screen.findByRole('dialog', { name: 'Детали товара' })
    await screen.findByText(
      'Flagship phone focused on camera performance and battery life.',
    )

    fireEvent.mouseDown(screen.getByTestId('details-overlay'))

    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', { name: 'Детали товара' }),
      ).not.toBeInTheDocument()
    })
  })

  it('shows an error state when product loading fails', async () => {
    mockProductApi({ failProducts: true })

    renderWithProviders(<CatalogPage />)

    await screen.findByText('Не удалось загрузить каталог')
  })
})
