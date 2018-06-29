import { MiddlewareAPI, AnyAction } from 'redux'
import { Store } from 'react-redux'
import { RouterState, RouterAction } from 'react-router-redux'

import { AccountBalanceState } from 'modules/accountBalance/types'
import { OptionState, OptionActions } from 'modules/option/types'
import { PollState, PollActions } from 'modules/poll/types'
import { TokenState } from 'modules/token/types'
import { TranslationState, TranslationActions } from 'modules/translation/types'
import { VoteState, VoteActions } from 'modules/vote/types'
import { WalletState, WalletActions } from 'modules/wallet/types'

export type RootState = {
  accountBalance: AccountBalanceState
  router: RouterState
  option: OptionState
  poll: PollState
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
