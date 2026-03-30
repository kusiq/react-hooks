import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useDebounce } from '@/shared/hooks/use-debounce'

describe('useDebounce', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('keeps the previous value until the delay passes', () => {
    vi.useFakeTimers()

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      {
        initialProps: {
          value: 'phone',
        },
      },
    )

    expect(result.current).toBe('phone')

    rerender({ value: 'laptop' })
    expect(result.current).toBe('phone')

    act(() => {
      vi.advanceTimersByTime(299)
    })
    expect(result.current).toBe('phone')

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(result.current).toBe('laptop')
  })
})
