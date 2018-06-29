import { Reducer } from 'redux'
import { loadingReducer } from 'modules/loading/reducer'
import {
  FETCH_TOKENS_REQUEST,
  FETCH_TOKENS_SUCCESS,
  FETCH_TOKENS_FAILURE,
  TokenActions,
  TokenState,
  Token
} from 'modules/token/types'
import {
  FETCH_POLLS_REQUEST,
  FETCH_POLLS_SUCCESS,
  FETCH_POLLS_FAILURE,
  FETCH_POLL_REQUEST,
  FETCH_POLL_SUCCESS,
  FETCH_POLL_FAILURE,
  PollActions
} from 'modules/poll/types'
import { toObjectByKey } from 'lib/utils'

const INITIAL_STATE: TokenState = {
  data: {},
  loading: [],
  error: null
}

export const tokenReducer: Reducer<TokenState> = (
  state = INITIAL_STATE,
  action: TokenActions | PollActions
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
