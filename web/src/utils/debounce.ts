// web/src/utils/debounce.ts
export function debounce<Args extends unknown[], Return>(
  func: (...args: Args) => Return,
  wait: number,
  immediate?: boolean
): (...args: Args) => Return | undefined {
  let timeout: NodeJS.Timeout | null
  let result: Return | undefined

  return function (this: unknown, ...args: Args): Return | undefined {
    const later = () => {
      timeout = null
      if (!immediate) result = func.apply(this, args)
    }

    const callNow = immediate && !timeout
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) result = func.apply(this, args)

    return result
  }
}
