import { Reducer } from 'redux'
import { VoteState, Vote } from 'modules/vote/types'
import { loadingReducer } from 'modules/loading/reducer'
import { FETCH_POLL_SUCCESS, PollActions } from 'modules/poll/types'
import { toObjectById } from 'lib/utils'

const INITIAL_STATE: VoteState = {
  data: {},
  loading: [],
  error: null
}

export const voteReducer: Reducer<VoteState> = (
  state = INITIAL_STATE,
  action: PollActions
): VoteState => {
  switch (action.type) {
    case FETCH_POLL_SUCCESS: {
      const { votes } = action.payload

      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: {
          ...state.data,
          ...toObjectById<Vote>(votes)
        }
      }
    }
    default:
      return state
  }
}
