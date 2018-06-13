import { Reducer } from 'redux'
import {
  VoteState,
  Vote,
  VoteActions,
  FETCH_POLL_VOTES_FAILURE,
  FETCH_POLL_VOTES_SUCCESS,
  FETCH_POLL_VOTES_REQUEST,
  CREATE_VOTE_REQUEST,
  CREATE_VOTE_SUCCESS,
  CREATE_VOTE_FAILURE
} from 'modules/vote/types'
import { loadingReducer } from 'modules/loading/reducer'
import {
  FETCH_POLL_REQUEST,
  FETCH_POLL_SUCCESS,
  PollActions,
  FETCH_POLL_FAILURE
} from 'modules/poll/types'
import { toObjectById } from 'lib/utils'

const INITIAL_STATE: VoteState = {
  data: {},
  loading: [],
  error: null
}

export const voteReducer: Reducer<VoteState> = (
  state = INITIAL_STATE,
  action: VoteActions | PollActions
): VoteState => {
  switch (action.type) {
    case CREATE_VOTE_REQUEST:
    case FETCH_POLL_VOTES_REQUEST:
    case FETCH_POLL_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_POLL_VOTES_SUCCESS:
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
    case CREATE_VOTE_SUCCESS: {
      const vote = action.payload.vote
      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: {
          ...state.data,
          [vote.id]: { ...action.payload.vote }
        }
      }
    }
    case CREATE_VOTE_FAILURE:
    case FETCH_POLL_FAILURE:
    case FETCH_POLL_VOTES_FAILURE: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    }
    default:
      return state
  }
}
