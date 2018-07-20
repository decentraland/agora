import { action } from 'typesafe-actions'
import {
  COMPUTE_BALANCES_REQUEST,
  COMPUTE_BALANCES_SUCCESS,
  COMPUTE_BALANCES_FAILURE,
  Wallet
} from 'modules/wallet/types'

export const computeBalancesRequest = () => action(COMPUTE_BALANCES_REQUEST, {})
export const computeBalancesSuccess = (
  address: string,
  balances: Wallet['balances']
) => action(COMPUTE_BALANCES_SUCCESS, { address, balances })
export const computeBalancesFailure = (error: string) =>
  action(COMPUTE_BALANCES_FAILURE, { error })
