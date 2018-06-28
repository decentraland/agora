import { MiddlewareAPI, AnyAction } from 'redux'
import { Store } from 'react-redux'
import { RouterState, RouterAction } from 'react-router-redux'

import { AccountState } from 'modules/account/types'
import { OptionState, OptionActions } from 'modules/option/types'
import { PollState, PollActions } from 'modules/poll/types'
import { TokenState } from 'modules/token/types'
import { TransactionState, TransactionActions } from 'modules/transaction/types'
import { TranslationState, TranslationActions } from 'modules/translation/types'
import { VoteState, VoteActions } from 'modules/vote/types'
import { WalletState, WalletActions } from 'modules/wallet/types'

export type RootState = {
  account: AccountState
  router: RouterState
  option: OptionState
  poll: PollState
  token: TokenState
  transaction: TransactionState
  translation: TranslationState
  vote: VoteState
  wallet: WalletState
}

export type RootAction =
  | RouterAction
  | PollActions
  | OptionActions
  | VoteActions
  | TransactionActions
  | TranslationActions
  | WalletActions

export type RootStore = Store<RootState>

export interface RootDispatch<A = RootAction> {
  (action: A): A
}

export type RootMiddleware = (
  store: MiddlewareAPI<any>
) => (next: RootDispatch<AnyAction>) => (action: AnyAction) => any
