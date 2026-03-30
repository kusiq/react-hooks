import type { CSSProperties } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { SCROLL_THROTTLE_MS } from '@shared/config/ui'
import { useThrottle } from '@shared/hooks/use-throttle'
import styles from '@features/back-to-top/ui/back-to-top-button.module.scss'

export const BackToTopButton = () => {
  const [rawScrollY, setRawScrollY] = useState(0)
  const throttledScrollY = useThrottle(rawScrollY, SCROLL_THROTTLE_MS)

  useEffect(() => {
    const handleScroll = () => {
      setRawScrollY(window.scrollY)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const progress = useMemo(() => {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight

    if (scrollableHeight <= 0) {
      return 0
    }

    return Math.min(throttledScrollY / scrollableHeight, 1)
  }, [throttledScrollY])

  if (throttledScrollY < 420) {
    return null
  }

  return (
    <button
      type="button"
      className={styles.button}
      style={{ '--progress': progress } as CSSProperties}
      aria-label="Наверх"
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }}
    >
      <span className={styles.label}>Вверх</span>
    </button>
  )
}
