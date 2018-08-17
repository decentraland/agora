import {
  INITIAL_STATE,
  createTableReducer,
  TableState
} from 'modules/ui/table/reducer'
import {
  FetchPollsSuccessAction,
  FETCH_POLLS_SUCCESS
} from 'modules/poll/actions'

const tableReducer = createTableReducer(
  (action: FetchPollsSuccessAction) => action.payload.polls
)

export function activePollsReducer(
  state: TableState = INITIAL_STATE,
  action: FetchPollsSuccessAction
) {
  switch (action.type) {
    case FETCH_POLLS_SUCCESS: {
      return action.payload.filters.active ? tableReducer(state, action) : state
    }
    default: {
      return state
    }
  }
}
