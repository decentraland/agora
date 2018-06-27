import { RootMiddleware, RootAction } from 'types'
import { getAnalytics, track } from 'modules/analytics/utils'
import 'modules/analytics/track'

const disabledMiddleware: RootMiddleware = _ => next => action => {
  next(action)
}

export function createAnalyticsMiddleware(apiKey: string): RootMiddleware {
  if (!apiKey) {
    console.warn('Analytics: middleware disabled due to missing API key')
    return disabledMiddleware
  }

  const analytics = getAnalytics()
  if (!analytics) {
    console.warn(
      'Analytics: middleware disabled because `window.analytics` is not present'
    )
    return disabledMiddleware
  }

  analytics.load(apiKey)

  return _ => next => action => {
    track(action as RootAction)
    next(action)
  }
}
