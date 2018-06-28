import { ActionType } from 'typesafe-actions'
import { LoadingState } from 'modules/loading/types'
import * as actions from 'modules/wallet/actions'

// Action Types

export const CONNECT_WALLET_REQUEST = '[Request] Connect Wallet'
export const CONNECT_WALLET_SUCCESS = '[Success] Connect Wallet'
export const CONNECT_WALLET_FAILURE = '[Failure] Connect Wallet'

// Interface and type definitions

export type ConnectWalletSuccess = ReturnType<
  typeof actions.connectWalletSuccess
>

export type WalletActions = ActionType<typeof actions>

export interface Wallet {
  type: string
  network: string
  address: string
  locale?: string
  derivationPath?: string
  manaBalance: number
  balances: {
    [symbol: string]: number
  }
}

export type WalletState = {
  data: Partial<Wallet>
  loading: LoadingState
  error: string | null
}
