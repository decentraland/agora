import { AnyAction } from 'redux'
import { RootAction } from 'types'

export interface AnalyticsWindow extends Window {
  analytics: SegmentAnalytics.AnalyticsJS
}

export type ActionType = RootAction['type']
export type EventName = string | ((action: AnyAction) => string)
export type GetPayload = (action: RootAction) => { [key: string]: any } | string

export interface AnalyticsAction {
  actionType: ActionType
  eventName?: EventName
  getPayload?: GetPayload
}
