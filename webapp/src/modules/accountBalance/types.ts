import { ActionType } from 'typesafe-actions'
import { LoadingState } from '@dapps/modules/loading/types'
import * as actions from 'modules/accountBalance/actions'
import { ModelById } from '@dapps/lib/types'

export const FETCH_ACCOUNT_BALANCES_REQUEST = '[Request] Fetch Account Balances'
export const FETCH_ACCOUNT_BALANCES_SUCCESS = '[Success] Fetch Account Balances'
export const FETCH_ACCOUNT_BALANCES_FAILURE = '[Failure] Fetch Account Balances'

// Interface and type definitions

export type FetchAccountBalancesRequest = ReturnType<
  typeof actions.fetchAccountBalancesRequest
>

export type AccountBalanceActions = ActionType<typeof actions>

export interface AccountBalance {
  id: string
  address: string
  token_address: string
  balance: number
}

export type AccountBalanceState = {
  data: ModelById<AccountBalance>
  loading: LoadingState
  error: string | null
}
