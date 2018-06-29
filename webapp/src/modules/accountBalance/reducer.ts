import { Reducer } from 'redux'
import {
  FETCH_ACCOUNT_BALANCES_FAILURE,
  FETCH_ACCOUNT_BALANCES_SUCCESS,
  FETCH_ACCOUNT_BALANCES_REQUEST,
  AccountBalanceState,
  AccountBalanceActions,
  AccountBalance
} from 'modules/accountBalance/types'
import { COMPUTE_BALANCES_SUCCESS, WalletActions } from 'modules/wallet/types'
import { loadingReducer } from 'modules/loading/reducer'
import { toObjectById } from 'lib/utils'

const INITIAL_STATE: AccountBalanceState = {
  data: {},
  loading: [],
  error: null
}

export const accountBalanceReducer: Reducer<AccountBalanceState> = (
  state = INITIAL_STATE,
  action: WalletActions | AccountBalanceActions
): AccountBalanceState => {
  switch (action.type) {
    case FETCH_ACCOUNT_BALANCES_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_ACCOUNT_BALANCES_SUCCESS: {
      const { accountBalances } = action.payload

      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data: toObjectById<AccountBalance>(accountBalances, state.data)
      }
    }
    case COMPUTE_BALANCES_SUCCESS: {
      const { address, balances } = action.payload
      const data = { ...state.data }

      for (const accountBalance of Object.values(state.data)) {
        if (
          accountBalance.address === address &&
          balances[accountBalance.token_address] != null
        ) {
          data[accountBalance.id].balance =
            balances[accountBalance.token_address]
        }
      }

      return { ...state, data }
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
