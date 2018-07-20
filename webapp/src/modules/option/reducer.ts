import { Reducer } from 'redux'
import { loadingReducer } from '@dapps/modules/loading/reducer'
import {
  FETCH_POLL_OPTIONS_REQUEST,
  FETCH_POLL_OPTIONS_SUCCESS,
  FETCH_POLL_OPTIONS_FAILURE,
  Option,
  OptionState,
  OptionActions
} from 'modules/option/types'
import {
  FETCH_POLLS_REQUEST,
  FETCH_POLLS_SUCCESS,
  FETCH_POLLS_FAILURE,
  FETCH_POLL_REQUEST,
  FETCH_POLL_SUCCESS,
  FETCH_POLL_FAILURE,
  PollActions
} from 'modules/poll/types'
import { toObjectById } from '@dapps/lib/utils'

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
        Object.assign(data, toObjectById<Option>(poll.options))
      }

      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data
      }
    }
    case FETCH_POLL_OPTIONS_SUCCESS:
    case FETCH_POLL_SUCCESS: {
      const { options } = action.payload

      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: toObjectById<Option>(options, state.data)
      }
    }
    case FETCH_POLL_OPTIONS_FAILURE:
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
