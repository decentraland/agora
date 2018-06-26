import { Model, ModelById } from 'lib/types'
import * as dateFnsFormat from 'date-fns/format'
import * as dateFnsDistanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import { getCurrentLocale } from 'modules/translation/utils'

export function isMobile() {
  // WARN: Super naive mobile device check.
  // we're using it on low-stake checks, where failing to detect some browsers is not a big deal.
  // If you need more specificity you may want to change this implementation.
  const navigator = window.navigator

  return (
    /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)
  )
}

export function toObjectById<T extends Model>(
  values: T[],
  currentValues: ModelById<T> = {}
): ModelById<T> {
  return values.reduce(
    (valueHash, value) => ({
      ...valueHash,
      [value.id]: value
    }),
    currentValues
  )
}

export function distanceInWordsToNow(date: number | string, addSuffix = true) {
  return dateFnsDistanceInWordsToNow(date, {
    addSuffix,
    locale: getCurrentLocale()
  })
}

export function formatDate(date: string, format = 'MMMM Do, YYYY - hh:MMa') {
  return dateFnsFormat(date, format, {
    locale: getCurrentLocale()
  })
}

export function formatNumber(amount: number = 0, digits: number = 2) {
  return parseFloat((+amount).toFixed(digits)).toLocaleString()
}
