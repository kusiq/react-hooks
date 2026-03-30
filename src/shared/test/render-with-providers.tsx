import type { PropsWithChildren, ReactElement } from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { createAppStore } from '@/app/store/store'
import { hydrateFavorites } from '@/features/favorites/model/favorites-slice'
import type { ProductId } from '@/entities/product'

interface RenderOptions {
  favoriteIds?: ProductId[]
  route?: string
}

export const renderWithProviders = (
  ui: ReactElement,
  options: RenderOptions = {},
) => {
  const store = createAppStore()

  if (options.favoriteIds?.length) {
    store.dispatch(hydrateFavorites(options.favoriteIds))
  }

  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[options.route ?? '/']}>
          {children}
        </MemoryRouter>
      </Provider>
    )
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper }),
  }
}
