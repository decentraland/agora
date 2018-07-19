import { MiddlewareAPI, AnyAction, Reducer } from 'redux'
import { Store } from 'react-redux'
import { RouterState, RouterAction } from 'react-router-redux'

import { AccountBalanceState } from 'modules/accountBalance/types'
import { OptionState, OptionActions } from 'modules/option/types'
import { PollState, PollActions } from 'modules/poll/types'
import { StorageState } from 'decentraland-dapps/dist/modules/storage/types'
import { TokenState } from 'modules/token/types'
import {
  TranslationState,
  TranslationActions
} from 'decentraland-dapps/dist/modules/translation/types'
import { VoteState, VoteActions } from 'modules/vote/types'
import { WalletState } from 'modules/wallet/types'
import { WalletActions } from 'decentraland-dapps/dist/modules/wallet/types'

export type RootState = {
  accountBalance: AccountBalanceState
  router: RouterState
  option: OptionState
  poll: PollState
  storage: StorageState
  token: TokenState
  translation: TranslationState
  vote: VoteState
  wallet: WalletState
}

export type RootAction =
  | RouterAction
  | PollActions
  | OptionActions
  | VoteActions
  | TranslationActions
  | WalletActions

export type RootStore = Store<RootState>

export interface RootDispatch<A = RootAction> {
  (action: A): A
}

export type RootMiddleware = (
  store: MiddlewareAPI<any>
) => (next: RootDispatch<AnyAction>) => (action: AnyAction) => any

export type RootReducer = Reducer<RootState>
