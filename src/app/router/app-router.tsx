import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CatalogPage } from '@pages/catalog-page'
import { NotFoundPage } from '@pages/not-found-page'
import { ROUTES } from '@shared/config/routes'
import { PageState } from '@shared/ui/page-state/page-state'
import { AppShell } from '@widgets/app-shell'

const FavoritesPage = lazy(() =>
  import('@pages/favorites-page').then((module) => ({
    default: module.FavoritesPage,
  })),
)

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={<PageState tone="loading" title="Загружаем страницу" />}
      >
        <Routes>
          <Route element={<AppShell />}>
            <Route path={ROUTES.catalog} element={<CatalogPage />} />
            <Route path={ROUTES.favorites} element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
