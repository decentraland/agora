import { Reducer } from 'redux'
import {
  FETCH_ACCOUNT_BALANCES_FAILURE,
  FETCH_ACCOUNT_BALANCES_SUCCESS,
  FETCH_ACCOUNT_BALANCES_REQUEST,
  AccountState,
  Account,
  AccountActions
} from 'modules/account/types'
import { loadingReducer } from 'modules/loading/reducer'

const INITIAL_STATE: AccountState = {
  data: {},
  loading: [],
  error: null
}

export const accountReducer: Reducer<AccountState> = (
  state = INITIAL_STATE,
  action: AccountActions
): AccountState => {
  switch (action.type) {
    case FETCH_ACCOUNT_BALANCES_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_ACCOUNT_BALANCES_SUCCESS: {
      const accountBalances = action.payload.accountBalances
      let data: AccountState['data'] = {
        ...state.data
      }

      if (accountBalances.length > 0) {
        const account: Account = {
          address: accountBalances[0].address,
          tokens: {}
        }

        accountBalances.reduce((account, response) => {
          account.tokens[response.token_address] = response.balance
          return account
        }, account)

        data[account.address] = account
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
