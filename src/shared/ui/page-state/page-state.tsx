import type { ReactNode } from 'react'
import styles from '@/shared/ui/page-state/page-state.module.scss'

type PageStateTone = 'empty' | 'error' | 'loading'

interface PageStateProps {
  action?: ReactNode
  description?: string
  title: string
  tone: PageStateTone
}

const toneToEyebrow: Record<PageStateTone, string> = {
  empty: 'Пусто',
  error: 'Есть проблема',
  loading: 'Загрузка',
}

export const PageState = ({
  action,
  description,
  title,
  tone,
}: PageStateProps) => {
  return (
    <section className={styles.state} aria-live="polite">
      <p className={styles.eyebrow}>{toneToEyebrow[tone]}</p>
      <h2 className={styles.title}>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
      {action ? <div className={styles.action}>{action}</div> : null}
    </section>
  )
}
