import { action } from 'typesafe-actions'
import { AccountBalance } from 'modules/accountBalance/types'

// Fetch Account Balances

export const FETCH_ACCOUNT_BALANCES_REQUEST = '[Request] Fetch Account Balances'
export const FETCH_ACCOUNT_BALANCES_SUCCESS = '[Success] Fetch Account Balances'
export const FETCH_ACCOUNT_BALANCES_FAILURE = '[Failure] Fetch Account Balances'

export const fetchAccountBalancesRequest = (address: string) =>
  action(FETCH_ACCOUNT_BALANCES_REQUEST, { address })
export const fetchAccountBalancesSuccess = (
  accountBalances: AccountBalance[]
) => action(FETCH_ACCOUNT_BALANCES_SUCCESS, { accountBalances })
export const fetchAccountBalancesFailure = (error: string) =>
  action(FETCH_ACCOUNT_BALANCES_FAILURE, { error })

export type FetchAccountBalancesRequestAction = ReturnType<
  typeof fetchAccountBalancesRequest
>
export type FetchAccountBalancesSuccessAction = ReturnType<
  typeof fetchAccountBalancesSuccess
>
export type FetchAccountBalancesFailureAction = ReturnType<
  typeof fetchAccountBalancesFailure
>
