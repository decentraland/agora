import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import { RootState } from 'types'
import { accountBalanceReducer as accountBalance } from 'modules/accountBalance/reducer'
import { optionReducer as option } from 'modules/option/reducer'
import { pollReducer as poll } from 'modules/poll/reducer'
import { tokenReducer as token } from 'modules/token/reducer'
import { translationReducer as translation } from 'modules/translation/reducer'
import { voteReducer as vote } from 'modules/vote/reducer'
import { walletReducer as wallet } from 'modules/wallet/reducer'

// TODO: Consider spliting individual reducers into { data, loading, error }
export const rootReducer = combineReducers<RootState>({
  accountBalance,
  option,
  poll,
  token,
  translation,
  router,
  vote,
  wallet
})
