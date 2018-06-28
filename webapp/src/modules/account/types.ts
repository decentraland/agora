import { ActionType } from 'typesafe-actions'
import { LoadingState } from 'modules/loading/types'
import * as actions from 'modules/account/actions'

export const FETCH_ACCOUNT_BALANCES_REQUEST = '[Request] Fetch Account Balances'
export const FETCH_ACCOUNT_BALANCES_SUCCESS = '[Success] Fetch Account Balances'
export const FETCH_ACCOUNT_BALANCES_FAILURE = '[Failure] Fetch Account Balances'

// Interface and type definitions

export type FetchAccountBalancesRequest = ReturnType<
  typeof actions.fetchAccountBalancesRequest
>

export type AccountActions = ActionType<typeof actions>

export interface AccountBalance {
  address: string
  token_address: string
  balance: number
}

export interface Account {
  address: string
  tokens: {
    [address: string]: number
  }
}

export type AccountState = {
  data: {
    [address: string]: Account
  }
  loading: LoadingState
  error: string | null
}
