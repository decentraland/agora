import { Reducer } from 'redux'
import {
  FETCH_POLL_VOTES_FAILURE,
  FETCH_POLL_VOTES_SUCCESS,
  FETCH_POLL_VOTES_REQUEST,
  CREATE_VOTE_REQUEST,
  CREATE_VOTE_SUCCESS,
  CREATE_VOTE_FAILURE,
  VoteState,
  Vote,
  VoteActions
} from 'modules/vote/types'
import { loadingReducer } from 'modules/loading/reducer'
import {
  FETCH_POLLS_REQUEST,
  FETCH_POLLS_SUCCESS,
  FETCH_POLLS_FAILURE,
  FETCH_POLL_REQUEST,
  FETCH_POLL_SUCCESS,
  FETCH_POLL_FAILURE,
  PollActions
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
    case FETCH_POLLS_REQUEST:
    case FETCH_POLL_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_POLLS_SUCCESS: {
      const data = { ...state.data }

      for (const poll of action.payload.polls) {
        Object.assign(data, toObjectById<Vote>(poll.votes))
      }

      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data
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
    case FETCH_POLL_VOTES_FAILURE:
    case FETCH_POLLS_FAILURE:
    case FETCH_POLL_FAILURE: {
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
