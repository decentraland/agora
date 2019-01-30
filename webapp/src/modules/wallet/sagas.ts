import { call, select, takeEvery, put, all } from 'redux-saga/effects'
import { eth, contracts } from 'decentraland-eth'
import { env } from 'decentraland-commons'
import { getAddress } from '@dapps/modules/wallet/selectors'
import { ERC20Token } from '@dapps/modules/wallet/types'
import { createWalletSaga } from '@dapps/modules/wallet/sagas'
import {
  ConnectWalletSuccessAction,
  CONNECT_WALLET_SUCCESS
} from '@dapps/modules/wallet/actions'
import {
  COMPUTE_BALANCES_REQUEST,
  computeBalancesSuccess,
  computeBalancesFailure
} from 'modules/wallet/actions'
import { fetchAccountBalancesRequest } from 'modules/accountBalance/actions'
import { fetchTokensRequest } from 'modules/token/actions'
import { getContractTokens } from 'modules/token/selectors'
import { MANAToken } from 'contracts'

const baseWalletSaga = createWalletSaga({
  provider: env.get('REACT_APP_PROVIDER_URL'),
  contracts: [MANAToken],
  eth
})

export function* walletSaga() {
  yield all([baseWalletSaga(), walletBalanceSaga()])
}

function* walletBalanceSaga() {
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
  yield takeEvery(COMPUTE_BALANCES_REQUEST, handleComputeBalancesRequest)
}

function* handleComputeBalancesRequest() {
  try {
    const contractTokens = yield select(getContractTokens)
    const walletAddress = yield select(getAddress)

    const balances = {}
    const tokenContracts: ERC20Token[] = []

    for (const tokenAddress in contractTokens) {
      const token = contractTokens[tokenAddress]
      const tokenContract = new contracts.ERC20Token(token.address)

      tokenContract.getContractName = () => token.name
      tokenContracts.push(tokenContract as any)
    }

    yield call(() => eth.setContracts(tokenContracts))

    for (const tokenContract of tokenContracts) {
      const balance = yield call(() => tokenContract.balanceOf(walletAddress))
      const decimals = yield call(() => tokenContract.decimals())

      balances[tokenContract.address] =
        decimals.toNumber() >= 18
          ? eth.utils.fromWei(balance.toNumber())
          : balance.toNumber()
    }

    yield put(computeBalancesSuccess(walletAddress, balances))
  } catch (error) {
    yield put(computeBalancesFailure(error.message))
  }
}

function* handleConnectWalletSuccess(action: ConnectWalletSuccessAction) {
  yield put(fetchTokensRequest())
  yield put(fetchAccountBalancesRequest(action.payload.wallet.address))
}
