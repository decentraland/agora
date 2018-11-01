import { all } from 'redux-saga/effects'
import { analyticsSaga } from '@dapps/modules/analytics/sagas'
import { locationSaga } from '@dapps/modules/location/sagas'
import { accountBalanceSaga } from 'modules/accountBalance/sagas'
import { optionSaga } from 'modules/option/sagas'
import { locationSaga as agoraLocationSaga } from 'modules/location/sagas'
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
    agoraLocationSaga(),
    optionSaga(),
    pollSaga(),
    voteSaga(),
    tokenSaga(),
    translationSaga(),
    walletSaga()
  ])
}
