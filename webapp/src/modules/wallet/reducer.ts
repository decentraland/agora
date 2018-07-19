import { AnyAction } from 'redux'
import {
  walletReducer as baseWallerReducer,
  INITIAL_STATE as BASE_INITIAL_STATE
} from 'decentraland-dapps/dist/modules/wallet/reducer'
import { WalletActions } from 'decentraland-dapps/dist/modules/wallet/types'
import { WalletState } from './types'

const INITIAL_STATE: WalletState = {
  ...BASE_INITIAL_STATE
}

export function walletReducer(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    default:
      return baseWallerReducer(state, action as WalletActions)
  }
}
