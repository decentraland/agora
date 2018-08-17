import { AnyAction } from 'redux'

export type ArrayGetter = (action: AnyAction) => any[]
export type IdGetter = (arrayElement: any, action: AnyAction) => string
export type TotalGetter = (action: AnyAction) => number
