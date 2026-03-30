import { StoreProvider } from '@/app/providers/store-provider'
import { AppRouter } from '@/app/router/app-router'

export const App = () => {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  )
}
