import { AnyAction } from 'redux'
import {
  walletReducer as baseWallerReducer,
  INITIAL_STATE as BASE_INITIAL_STATE,
  WalletState as BaseWalletState,
  WalletReducerAction as BaseWalletReducerAction
} from '@dapps/modules/wallet/reducer'
import { Wallet } from './types'

export interface WalletState extends BaseWalletState {
  data: Partial<Wallet>
}

const INITIAL_STATE: WalletState = {
  ...BASE_INITIAL_STATE
}

export function walletReducer(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    default:
      return baseWallerReducer(state, action as BaseWalletReducerAction)
  }
}
