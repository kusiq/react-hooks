import { useEffect, useRef, useState } from 'react'

export const useThrottle = <T>(value: T, delay: number): T => {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastExecutedAtRef = useRef<number | null>(null)

  useEffect(() => {
    const now = Date.now()
    const remainingDelay =
      lastExecutedAtRef.current === null
        ? 0
        : Math.max(delay - (now - lastExecutedAtRef.current), 0)

    const timeoutId = window.setTimeout(() => {
      lastExecutedAtRef.current = Date.now()
      setThrottledValue(value)
    }, remainingDelay)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [delay, value])

  return throttledValue
}
