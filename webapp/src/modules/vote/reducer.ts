import { Reducer } from 'redux'
import { loadingReducer, LoadingState } from '@dapps/modules/loading/reducer'
import { Vote } from 'modules/vote/types'
import { toObjectById } from '@dapps/lib/utils'
import { ModelById } from '@dapps/lib/types'
import {
  CreateVoteRequestAction,
  CreateVoteSuccessAction,
  CreateVoteFailureAction,
  CREATE_VOTE_REQUEST,
  CREATE_VOTE_SUCCESS,
  CREATE_VOTE_FAILURE,
  FETCH_POLL_VOTES_REQUEST,
  FETCH_POLL_VOTES_SUCCESS,
  FETCH_POLL_VOTES_FAILURE,
  FetchPollVotesRequestAction,
  FetchPollVotesSuccessAction,
  FetchPollVotesFailureAction
} from 'modules/vote/actions'
import {
  FETCH_POLLS_REQUEST,
  FETCH_POLL_REQUEST,
  FetchPollsRequestAction,
  FetchPollsSuccessAction,
  FetchPollsFailureAction,
  FetchPollRequestAction,
  FetchPollSuccessAction,
  FetchPollFailureAction,
  FETCH_POLLS_SUCCESS,
  FETCH_POLL_SUCCESS,
  FETCH_POLLS_FAILURE,
  FETCH_POLL_FAILURE
} from 'modules/poll/actions'

export type VoteState = {
  data: ModelById<Vote>
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE: VoteState = {
  data: {},
  loading: [],
  error: null
}

export type VoteReducerAction =
  | CreateVoteRequestAction
  | CreateVoteSuccessAction
  | CreateVoteFailureAction
  | FetchPollsRequestAction
  | FetchPollsSuccessAction
  | FetchPollsFailureAction
  | FetchPollRequestAction
  | FetchPollSuccessAction
  | FetchPollFailureAction
  | FetchPollVotesRequestAction
  | FetchPollVotesSuccessAction
  | FetchPollVotesFailureAction

export const voteReducer: Reducer<VoteState> = (
  state = INITIAL_STATE,
  action: VoteReducerAction
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
        data: toObjectById<Vote>(votes)
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
