import { Reducer } from 'redux'
import { OptionState, Option } from 'modules/option/types'
import { loadingReducer } from 'modules/loading/reducer'
import {
  FETCH_POLL_REQUEST,
  FETCH_POLL_SUCCESS,
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
  action: PollActions
): OptionState => {
  switch (action.type) {
    case FETCH_POLL_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
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
    default:
      return state
  }
}
