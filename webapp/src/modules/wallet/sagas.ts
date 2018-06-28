import { call, select, takeEvery, put } from 'redux-saga/effects'
import { eth } from 'decentraland-eth'
import { CONNECT_WALLET_REQUEST, Wallet } from 'modules/wallet/types'
import {
  connectWalletSuccess,
  connectWalletFailure
} from 'modules/wallet/actions'
import { getData as getWallet } from 'modules/wallet/selectors'
import { connectEthereumWallet } from 'modules/wallet/utils'
import { watchLoadingTransactions } from 'modules/transaction/actions'
import { Network } from 'decentraland-eth/dist/ethereum/eth'

export function* walletSaga() {
  yield takeEvery(CONNECT_WALLET_REQUEST, handleConnectWalletRequest)
}

function* handleConnectWalletRequest() {
  try {
    if (!eth.isConnected()) {
      const { address, derivationPath } = yield select(getWallet)

      yield call(() =>
        connectEthereumWallet({
          address,
          derivationPath
        })
      )
    }

    let address: string = yield call(() => eth.getAddress())
    address = address.toLowerCase()

    const network: Network = yield call(eth.getNetwork)
    const manaTokenContract = eth.getContract('MANAToken')

    const mana = yield call(() => manaTokenContract.balanceOf(address))

    const wallet: Wallet = {
      address,
      network: network.name,
      type: eth.wallet.type,
      derivationPath: eth.wallet.derivationPath,
      manaBalance: mana,
      balances: { mana }
    }
    yield handleConnectWalletSuccess()
    yield put(connectWalletSuccess(wallet))
  } catch (error) {
    yield put(connectWalletFailure(error.message))
  }
}

function* handleConnectWalletSuccess() {
  yield put(watchLoadingTransactions())
}
