import { combineReducers } from 'redux'
import { activePollsReducer as activePolls } from 'modules/ui/activePolls/reducer'
import { expiredPollsReducer as expiredPolls } from 'modules/ui/expiredPolls/reducer'
import { TableState } from 'modules/ui/table/reducer'

export type UIState = {
  activePolls: TableState
  expiredPolls: TableState
}

export const uiReducer = combineReducers<UIState>({
  activePolls,
  expiredPolls
})
