import { Reducer } from 'redux'
import { loadingReducer, LoadingState } from '@dapps/modules/loading/reducer'
import { Token } from 'modules/token/types'
import { toObjectByKey } from '@dapps/lib/utils'
import { ModelByAddress } from '@dapps/lib/types'
import {
  FetchTokensRequestAction,
  FetchTokensSuccessAction,
  FetchTokensFailureAction,
  FETCH_TOKENS_REQUEST,
  FETCH_TOKENS_SUCCESS,
  FETCH_TOKENS_FAILURE
} from 'modules/token/actions'
import {
  FetchPollsRequestAction,
  FetchPollsSuccessAction,
  FetchPollsFailureAction,
  FetchPollRequestAction,
  FetchPollSuccessAction,
  FetchPollFailureAction,
  FETCH_POLLS_REQUEST,
  FETCH_POLL_REQUEST,
  FETCH_POLLS_SUCCESS,
  FETCH_POLL_SUCCESS,
  FETCH_POLLS_FAILURE,
  FETCH_POLL_FAILURE
} from 'modules/poll/actions'

export type TokenState = {
  data: ModelByAddress<Token>
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE: TokenState = {
  data: {},
  loading: [],
  error: null
}

export type TokenReducerAction =
  | FetchTokensRequestAction
  | FetchTokensSuccessAction
  | FetchTokensFailureAction
  | FetchPollsRequestAction
  | FetchPollsSuccessAction
  | FetchPollsFailureAction
  | FetchPollRequestAction
  | FetchPollSuccessAction
  | FetchPollFailureAction

export const tokenReducer: Reducer<TokenState> = (
  state = INITIAL_STATE,
  action: TokenReducerAction
): TokenState => {
  switch (action.type) {
    case FETCH_TOKENS_REQUEST:
    case FETCH_POLLS_REQUEST:
    case FETCH_POLL_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_TOKENS_SUCCESS: {
      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: toObjectByKey<Token>(action.payload.tokens, state.data, 'address')
      }
    }
    case FETCH_POLLS_SUCCESS: {
      const data = { ...state.data }

      for (const poll of action.payload.polls) {
        if (poll.token) {
          data[poll.token.address] = { ...poll.token }
        }
      }

      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data
      }
    }
    case FETCH_POLL_SUCCESS: {
      const { token } = action.payload

      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: {
          ...state.data,
          [token.address]: { ...token }
        }
      }
    }
    case FETCH_TOKENS_FAILURE:
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
