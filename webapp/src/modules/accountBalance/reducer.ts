import { Reducer } from 'redux'
import {
  FETCH_ACCOUNT_BALANCES_FAILURE,
  FETCH_ACCOUNT_BALANCES_SUCCESS,
  FETCH_ACCOUNT_BALANCES_REQUEST,
  AccountBalanceState,
  AccountBalanceActions
} from 'modules/accountBalance/types'
import { COMPUTE_BALANCES_SUCCESS, WalletActions } from 'modules/wallet/types'
import { loadingReducer } from 'modules/loading/reducer'
import { buildId } from 'modules/accountBalance/utils'

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
      let data = { ...state.data }

      for (const accountBalance of action.payload.accountBalances) {
        data[buildId(accountBalance)] = { ...accountBalance }
      }

      return {
        loading: loadingReducer(state.loading, action),
        error: null,
        data
      }
    }
    case COMPUTE_BALANCES_SUCCESS: {
      const { address, balances } = action.payload
      const data = { ...state.data }

      for (const tokenAddress in balances) {
        const id = buildId({
          address,
          token_address: tokenAddress
        })

        const current = state.data[id]
        data[id] = {
          id: current ? current.id : id,
          address,
          token_address: tokenAddress,
          balance: balances[tokenAddress]
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
