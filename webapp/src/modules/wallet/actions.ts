import { action } from 'typesafe-actions'
import {
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  CONNECT_WALLET_FAILURE,
  COMPUTE_BALANCES_REQUEST,
  COMPUTE_BALANCES_SUCCESS,
  COMPUTE_BALANCES_FAILURE,
  BaseWallet,
  Wallet
} from 'modules/wallet/types'

export const connectWalletRequest = () => action(CONNECT_WALLET_REQUEST, {})
export const connectWalletSuccess = (wallet: BaseWallet) =>
  action(CONNECT_WALLET_SUCCESS, { wallet })
export const connectWalletFailure = (error: string) =>
  action(CONNECT_WALLET_FAILURE, { error })

export const computeBalancesRequest = () => action(COMPUTE_BALANCES_REQUEST, {})
export const computeBalancesSuccess = (
  address: string,
  balances: Wallet['balances']
) => action(COMPUTE_BALANCES_SUCCESS, { address, balances })
export const computeBalancesFailure = (error: string) =>
  action(COMPUTE_BALANCES_FAILURE, { error })
