import { all } from 'redux-saga/effects'

import { accountBalanceSaga } from 'modules/accountBalance/sagas'
import { analyticsSaga } from 'modules/analytics/sagas'
import { locationSaga } from 'modules/location/sagas'
import { optionSaga } from 'modules/option/sagas'
import { pollSaga } from 'modules/poll/sagas'
import { voteSaga } from 'modules/vote/sagas'
import { tokenSaga } from 'modules/token/sagas'
import { translationSaga } from 'modules/translation/sagas'
import { walletSaga } from 'modules/wallet/sagas'

export function* rootSaga() {
  yield all([
    accountBalanceSaga(),
    analyticsSaga(),
    locationSaga(),
    optionSaga(),
    pollSaga(),
    voteSaga(),
    tokenSaga(),
    translationSaga(),
    walletSaga()
  ])
}
