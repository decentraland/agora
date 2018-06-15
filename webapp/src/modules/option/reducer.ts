import { Reducer } from 'redux'
import {
  FETCH_POLL_OPTIONS_SUCCESS,
  Option,
  OptionState,
  OptionActions,
  FETCH_POLL_OPTIONS_REQUEST,
  FETCH_POLL_OPTIONS_FAILURE
} from 'modules/option/types'
import { loadingReducer } from 'modules/loading/reducer'
import {
  FETCH_POLL_REQUEST,
  FETCH_POLL_SUCCESS,
  FETCH_POLL_FAILURE,
  PollActions
} from 'modules/poll/types'
import { toObjectById } from 'lib/utils'

const INITIAL_STATE: OptionState = {
  data: {},
  loading: [],
  error: null
}

export const optionReducer: Reducer<OptionState> = (
  state = INITIAL_STATE,
  action: OptionActions | PollActions
): OptionState => {
  switch (action.type) {
    case FETCH_POLL_OPTIONS_REQUEST:
    case FETCH_POLL_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_POLL_OPTIONS_SUCCESS:
    case FETCH_POLL_SUCCESS: {
      const { options } = action.payload

      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: {
          ...state.data,
          ...toObjectById<Option>(options)
        }
      }
    }
    case FETCH_POLL_OPTIONS_FAILURE:
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
