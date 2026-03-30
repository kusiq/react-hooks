import { Link } from 'react-router-dom'
import { ROUTES } from '@shared/config/routes'
import { PageState } from '@shared/ui/page-state/page-state'
import styles from '@pages/not-found-page/ui/not-found-page.module.scss'

export const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <PageState
        tone="empty"
        title="Такой страницы не существует"
        description="Маршрутизация здесь намеренно небольшая и прозрачная: каталог, избранное и простая резервная страница для всего остального."
        action={
          <Link className={styles.link} to={ROUTES.catalog}>
            Вернуться в каталог
          </Link>
        }
      />
    </div>
  )
}
