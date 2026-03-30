import { BackToTopButton } from '@features/back-to-top'
import {
  selectFavoriteCount,
  useFavoritesPersistence,
} from '@features/favorites'
import { ROUTES } from '@shared/config/routes'
import { useAppSelector } from '@shared/hooks/use-app-selector'
import styles from '@widgets/app-shell/ui/app-shell.module.scss'
import { NavLink, Outlet } from 'react-router-dom'

const getNavigationClassName = ({ isActive }: { isActive: boolean }) => {
  return isActive ? `${styles.link} ${styles.linkActive}` : styles.link
}

export const AppShell = () => {
  useFavoritesPersistence()

  const favoriteCount = useAppSelector(selectFavoriteCount)

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.brandBlock}>
            <p className={styles.eyebrow}>React-хуки + FSD + оптимизация</p>
            <NavLink to={ROUTES.catalog} className={styles.brand}>
              Каталог хуков
            </NavLink>
          </div>
          <nav className={styles.navigation} aria-label="Основная навигация">
            <NavLink to={ROUTES.catalog} className={getNavigationClassName} end>
              Каталог
            </NavLink>
            <NavLink to={ROUTES.favorites} className={getNavigationClassName}>
              Избранное
              <span className={styles.countBadge}>{favoriteCount}</span>
            </NavLink>
          </nav>
        </div>
      </header>

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <BackToTopButton />
    </div>
  )
}
