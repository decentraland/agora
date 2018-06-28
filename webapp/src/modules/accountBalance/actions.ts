import { action } from 'typesafe-actions'
import {
  FETCH_ACCOUNT_BALANCES_REQUEST,
  FETCH_ACCOUNT_BALANCES_SUCCESS,
  FETCH_ACCOUNT_BALANCES_FAILURE,
  AccountBalance
} from 'modules/accountBalance/types'

export const fetchAccountBalancesRequest = (address: string) =>
  action(FETCH_ACCOUNT_BALANCES_REQUEST, { address })
export const fetchAccountBalancesSuccess = (
  accountBalances: AccountBalance[]
) => action(FETCH_ACCOUNT_BALANCES_SUCCESS, { accountBalances })
export const fetchAccountBalancesFailure = (error: string) =>
  action(FETCH_ACCOUNT_BALANCES_FAILURE, { error })
