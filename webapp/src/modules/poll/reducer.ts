import { Reducer } from 'redux'
import {
  FETCH_POLLS_REQUEST,
  FETCH_POLLS_SUCCESS,
  FETCH_POLLS_FAILURE,
  FETCH_POLL_REQUEST,
  FETCH_POLL_SUCCESS,
  FETCH_POLL_FAILURE,
  PollActions,
  PollState,
  PollWithPointers,
  Poll
} from 'modules/poll/types'
import { loadingReducer } from 'modules/loading/reducer'
import { toObjectById } from 'lib/utils'

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
    case FETCH_POLLS_REQUEST:
    case FETCH_POLL_REQUEST:
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    case FETCH_POLLS_SUCCESS: {
      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: {
          ...state.data,
          ...toObjectById<PollWithPointers>(action.payload.polls, state.data)
        }
      }
    }
    case FETCH_POLL_SUCCESS: {
      const { poll, token, votes, options } = action.payload

      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: {
          ...state.data,
          [poll.id]: {
            ...state.data[poll.id],
            ...poll,
            token_address: token.address,
            vote_ids: votes.map(vote => vote.id),
            option_ids: options.map(option => option.id)
          }
        }
      }
    }
    case FETCH_POLLS_FAILURE:
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
