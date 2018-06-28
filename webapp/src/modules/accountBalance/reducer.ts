import { Reducer } from 'redux'
import {
  FETCH_ACCOUNT_BALANCES_FAILURE,
  FETCH_ACCOUNT_BALANCES_SUCCESS,
  FETCH_ACCOUNT_BALANCES_REQUEST,
  AccountBalanceState,
  AccountBalanceActions
} from 'modules/accountBalance/types'
import { loadingReducer } from 'modules/loading/reducer'

const INITIAL_STATE: AccountBalanceState = {
  data: {},
  loading: [],
  error: null
}

export const accountBalanceReducer: Reducer<AccountBalanceState> = (
  state = INITIAL_STATE,
  action: AccountBalanceActions
): AccountBalanceState => {
  switch (action.type) {
    case FETCH_ACCOUNT_BALANCES_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_ACCOUNT_BALANCES_SUCCESS: {
      let data = { ...state.data }

      for (const accountBalance of action.payload.accountBalances) {
        data[accountBalance.address] = { ...accountBalance }
      }

      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data
      }
    }
    case FETCH_ACCOUNT_BALANCES_FAILURE: {
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
