import { Model, ModelById } from 'lib/types'

export function isMobile() {
  // WARN: Super naive mobile device check.
  // we're using it on low-stake checks, where failing to detect some browsers is not a big deal.
  // If you need more specificity you may want to change this implementation.
  const navigator = window.navigator

  return (
    /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)
  )
}

export function toObjectById<T extends Model>(values: T[]): ModelById<T> {
  return values.reduce(
    (valueHash, value) => ({
      ...valueHash,
      [value.id]: value
    }),
    {}
  )
}
