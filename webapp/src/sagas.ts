import { all } from 'redux-saga/effects'

import { pollSaga } from 'modules/poll/sagas'
import { transactionSaga } from 'modules/transaction/sagas'
import { translationSaga } from 'modules/translation/sagas'
import { walletSaga } from 'modules/wallet/sagas'

export function* rootSaga() {
  yield all([pollSaga(), transactionSaga(), translationSaga(), walletSaga()])
}
