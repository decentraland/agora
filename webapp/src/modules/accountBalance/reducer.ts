import { Reducer } from 'redux'
import { loadingReducer, LoadingState } from '@dapps/modules/loading/reducer'
import { ModelById } from '@dapps/lib/types'
import { AccountBalance } from 'modules/accountBalance/types'
import {
  COMPUTE_BALANCES_SUCCESS,
  ComputeBalancesSuccessAction,
  ComputeBalancesFailureAction
} from 'modules/wallet/actions'
import { buildId } from 'modules/accountBalance/utils'
import {
  FetchAccountBalancesFailureAction,
  FetchAccountBalancesRequestAction,
  FetchAccountBalancesSuccessAction,
  FETCH_ACCOUNT_BALANCES_REQUEST,
  FETCH_ACCOUNT_BALANCES_SUCCESS,
  FETCH_ACCOUNT_BALANCES_FAILURE
} from 'modules/accountBalance/actions'

export type AccountBalanceState = {
  data: ModelById<AccountBalance>
  loading: LoadingState
  error: string | null
}

const INITIAL_STATE: AccountBalanceState = {
  data: {},
  loading: [],
  error: null
}

export type AccountBalanceReducerAction =
  | FetchAccountBalancesRequestAction
  | FetchAccountBalancesSuccessAction
  | FetchAccountBalancesFailureAction
  | ComputeBalancesSuccessAction
  | ComputeBalancesFailureAction

export const accountBalanceReducer: Reducer<AccountBalanceState> = (
  state = INITIAL_STATE,
  action: AccountBalanceReducerAction
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
