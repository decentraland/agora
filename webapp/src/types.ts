import { AnyAction } from 'redux'
import { Store, Dispatch } from 'react-redux'
import { RouterState, RouterAction } from 'react-router-redux'

import { OptionState } from 'modules/option/types'
import { PollState, PollActions } from 'modules/poll/types'
import { TokenState } from 'modules/token/types'
import { TransactionState, TransactionActions } from 'modules/transaction/types'
import { TranslationState, TranslationActions } from 'modules/translation/types'
import { VoteState } from 'modules/vote/types'
import { WalletState, WalletActions } from 'modules/wallet/types'

export type RootState = {
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
  | TransactionActions
  | TranslationActions
  | WalletActions

export type RootStore = Store<RootState>

export type RootMiddleware = (
  store: RootStore
) => (next: Dispatch<AnyAction>) => (action: AnyAction) => any
