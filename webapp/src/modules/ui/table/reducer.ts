import { AnyAction } from 'redux'
import { IdGetter, ArrayGetter, TotalGetter } from 'modules/ui/table/types'

export type TableState = {
  rows: string[]
  total: number
}

export const DEFAULT_ID_GETTER: IdGetter = (element: { id: string }) =>
  element.id
export const DEFAULT_TOTAL_GETTER: TotalGetter = (action: AnyAction) =>
  action.payload.total

export const INITIAL_STATE: TableState = {
  rows: [],
  total: 0
}

export function createTableReducer(
  arrayGetter: ArrayGetter,
  idGetter: IdGetter = DEFAULT_ID_GETTER,
  totalGetter: TotalGetter = DEFAULT_TOTAL_GETTER
) {
  return function tableReducer(
    state: TableState = INITIAL_STATE,
    action: AnyAction
  ) {
    const array = arrayGetter(action)
    if (array) {
      return {
        ...state,
        rows: array.map((element: any) => idGetter(element, action)),
        total: totalGetter(action)
      }
    }
    return state
  }
}
