import { combineReducers } from 'redux'
import { decentralandPollsReducer as decentralandPolls } from 'modules/ui/decentralandPolls/reducer'
import { districtPollsReducer as districtPolls } from 'modules/ui/districtPolls/reducer'
import { pollsReducer as polls } from 'modules/ui/polls/reducer'
import { TableState } from 'modules/ui/table/reducer'

export type UIState = {
  decentralandPolls: TableState
  districtPolls: TableState
  polls: TableState
}

export const uiReducer = combineReducers<UIState>({
  decentralandPolls,
  districtPolls,
  polls
})
