import { Reducer } from 'redux'
import {
  FETCH_POLL_FAILURE,
  FETCH_POLL_REQUEST,
  FETCH_POLL_SUCCESS,
  PollActions,
  PollState
} from 'modules/poll/types'
import { loadingReducer } from 'modules/loading/reducer'

const INITIAL_STATE: PollState = {
  data: {},
  loading: [],
  error: null
}

export const pollReducer: Reducer<PollState> = (
  state = INITIAL_STATE,
  action: PollActions
): PollState => {
  switch (action.type) {
    case FETCH_POLL_REQUEST:
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    case FETCH_POLL_SUCCESS: {
      const { poll, token, votes, options } = action.payload

      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: {
          ...state.data,
          [poll.id]: {
            ...poll,
            token_id: token.id,
            vote_ids: votes.map(vote => vote.id),
            option_ids: options.map(option => option.id)
          }
        }
      }
    }
    case FETCH_POLL_FAILURE:
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    default:
      return state
  }
}
