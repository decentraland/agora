import { MiddlewareAPI, AnyAction, Reducer, Store } from 'redux'
import { RouterState } from 'react-router-redux'
import { AccountBalanceState } from 'modules/accountBalance/reducer'
import { StorageState } from '@dapps/modules/storage/reducer'
import { TranslationState } from '@dapps/modules/translation/reducer'
import { WalletState } from 'modules/wallet/reducer'
import { OptionState } from 'modules/option/reducer'
import { PollState } from 'modules/poll/reducer'
import { TokenState } from 'modules/token/reducer'
import { VoteState } from 'modules/vote/reducer'

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

export type RootStore = Store<RootState>

export interface RootDispatch<A = AnyAction> {
  (action: A): A
}

export type RootMiddleware = (
  store: MiddlewareAPI<any>
) => (next: RootDispatch<AnyAction>) => (action: AnyAction) => any

export type RootReducer = Reducer<RootState>
