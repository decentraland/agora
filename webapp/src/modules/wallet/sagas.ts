import { call, select, takeEvery, put } from 'redux-saga/effects'
import { eth, contracts } from 'decentraland-eth'
import {
  CONNECT_WALLET_REQUEST,
  COMPUTE_BALANCES_REQUEST,
  ERC20Token,
  BaseWallet
} from 'modules/wallet/types'
import {
  connectWalletSuccess,
  connectWalletFailure,
  computeBalancesSuccess,
  computeBalancesFailure
} from 'modules/wallet/actions'
import { fetchAccountBalancesRequest } from 'modules/accountBalance/actions'
import { fetchTokensRequest } from 'modules/token/actions'
import { getData, getAddress } from 'modules/wallet/selectors'
import { getContractTokens } from 'modules/token/selectors'
import { connectEthereumWallet } from 'modules/wallet/utils'
import { Network } from 'decentraland-eth/dist/ethereum/eth'

export function* walletSaga() {
  yield takeEvery(CONNECT_WALLET_REQUEST, handleConnectWalletRequest)
  yield takeEvery(COMPUTE_BALANCES_REQUEST, handleComputeBalancesRequest)
}

function* handleConnectWalletRequest() {
  try {
    if (!eth.isConnected()) {
      const { address, derivationPath } = yield select(getData)

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

    const wallet: BaseWallet = {
      address,
      network: network.name,
      type: eth.wallet.type,
      derivationPath: eth.wallet.derivationPath
    }

    yield handleConnectWalletSuccess(address)
    yield put(connectWalletSuccess(wallet))
  } catch (error) {
    yield put(connectWalletFailure(error.message))
  }
}

function* handleComputeBalancesRequest() {
  try {
    const contractTokens = yield select(getContractTokens)
    const walletAddress = yield select(getAddress)

    const balances = {}
    const tokenContracts: ERC20Token[] = []

    for (const tokenAddress in contractTokens) {
      const token = contractTokens[tokenAddress]
      const tokenContract = Object.create(
        new contracts.ERC20Token(token.address)
      )
      tokenContract.getContractName = () => token.name
      tokenContracts.push(tokenContract)
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

function* handleConnectWalletSuccess(address: string) {
  yield put(fetchTokensRequest())
  yield put(fetchAccountBalancesRequest(address))
}
