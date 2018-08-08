import { action } from 'typesafe-actions'
import { Wallet } from 'modules/wallet/types'

export const COMPUTE_BALANCES_REQUEST = '[Request] Compute Wallet Balances'
export const COMPUTE_BALANCES_SUCCESS = '[Success] Compute Wallet Balances'
export const COMPUTE_BALANCES_FAILURE = '[Failure] Compute Wallet Balances'

export const computeBalancesRequest = () => action(COMPUTE_BALANCES_REQUEST, {})
export const computeBalancesSuccess = (
  address: string,
  balances: Wallet['balances']
) => action(COMPUTE_BALANCES_SUCCESS, { address, balances })
export const computeBalancesFailure = (error: string) =>
  action(COMPUTE_BALANCES_FAILURE, { error })

export type ComputeBalancesRequestAction = ReturnType<
  typeof computeBalancesRequest
>
export type ComputeBalancesSuccessAction = ReturnType<
  typeof computeBalancesSuccess
>
export type ComputeBalancesFailureAction = ReturnType<
  typeof computeBalancesFailure
>
