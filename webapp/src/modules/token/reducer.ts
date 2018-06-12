import { Reducer } from 'redux'
import { TokenState } from 'modules/token/types'
import { loadingReducer } from 'modules/loading/reducer'
import {
  FETCH_POLL_REQUEST,
  FETCH_POLL_SUCCESS,
  PollActions
} from 'modules/poll/types'

const INITIAL_STATE: TokenState = {
  data: {},
  loading: [],
  error: null
}

export const tokenReducer: Reducer<TokenState> = (
  state = INITIAL_STATE,
  action: PollActions
): TokenState => {
  switch (action.type) {
    case FETCH_POLL_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
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
    default:
      return state
  }
}
