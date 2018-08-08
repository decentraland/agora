import { Reducer } from 'redux'
import { loadingReducer, LoadingState } from '@dapps/modules/loading/reducer'
import { Option } from 'modules/option/types'
import { toObjectById } from '@dapps/lib/utils'
import { ModelById } from '@dapps/lib/types'
import {
  FETCH_POLL_OPTIONS_REQUEST,
  FETCH_POLL_OPTIONS_SUCCESS,
  FETCH_POLL_OPTIONS_FAILURE,
  FetchPollOptionsRequestAction,
  FetchPollOptionsSuccessAction,
  FetchPollOptionsFailureAction
} from 'modules/option/actions'
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

export type OptionState = {
  data: ModelById<Option>
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE: OptionState = {
  data: {},
  loading: [],
  error: null
}

export type OptionReducerAction =
  | FetchPollOptionsRequestAction
  | FetchPollOptionsSuccessAction
  | FetchPollOptionsFailureAction
  | FetchPollsRequestAction
  | FetchPollsSuccessAction
  | FetchPollsFailureAction
  | FetchPollRequestAction
  | FetchPollSuccessAction
  | FetchPollFailureAction

export const optionReducer: Reducer<OptionState> = (
  state = INITIAL_STATE,
  action: OptionReducerAction
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
