import { all } from 'redux-saga/effects'

import { analyticsSaga } from 'modules/analytics/sagas'
import { locationSaga } from 'modules/location/sagas'
import { optionSaga } from 'modules/option/sagas'
import { pollSaga } from 'modules/poll/sagas'
import { voteSaga } from 'modules/vote/sagas'
import { transactionSaga } from 'modules/transaction/sagas'
import { translationSaga } from 'modules/translation/sagas'
import { walletSaga } from 'modules/wallet/sagas'

export function* rootSaga() {
  yield all([
    analyticsSaga(),
    locationSaga(),
    optionSaga(),
    pollSaga(),
    voteSaga(),
    transactionSaga(),
    translationSaga(),
    walletSaga()
  ])
}
