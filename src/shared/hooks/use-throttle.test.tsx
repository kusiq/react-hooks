import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useThrottle } from '@/shared/hooks/use-throttle'

describe('useThrottle', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('limits updates until the throttle window expires', () => {
    vi.useFakeTimers()

    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 200),
      {
        initialProps: {
          value: 0,
        },
      },
    )

    rerender({ value: 120 })
    expect(result.current).toBe(0)

    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(result.current).toBe(120)
  })
})
