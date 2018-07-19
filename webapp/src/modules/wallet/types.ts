import { BaseWallet } from '@dapps/modules/wallet/types'
import {
  WalletState as BaseWalletState,
  WalletActions as BaseWalletAction
} from '@dapps/modules/wallet/types'
import { ActionType } from 'typesafe-actions'
import * as actions from './actions'

// Action Types

export const COMPUTE_BALANCES_REQUEST = '[Request] Compute Wallet Balances'
export const COMPUTE_BALANCES_SUCCESS = '[Success] Compute Wallet Balances'
export const COMPUTE_BALANCES_FAILURE = '[Failure] Compute Wallet Balances'

// Interface and type definitions
export type WalletActions = ActionType<typeof actions> | BaseWalletAction

export interface Wallet extends BaseWallet {
  balances: {
    [address: string]: number
  }
}

export interface WalletState extends BaseWalletState {
  data: Partial<Wallet>
}
