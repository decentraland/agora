import { createSelector } from 'reselect'
import { RootState } from 'types'
import {
  CONNECT_WALLET_REQUEST,
  WalletState,
  Wallet
} from 'modules/wallet/types'
import { AccountBalanceState } from 'modules/accountBalance/types'
import { isLoadingType } from 'modules/loading/selectors'
import { getData as getAccountBalances } from 'modules/accountBalance/selectors'

export const getState: (state: RootState) => WalletState = state => state.wallet
export const getData: (state: RootState) => WalletState['data'] = state =>
  getState(state).data
export const getLoading: (state: RootState) => WalletState['loading'] = state =>
  getState(state).loading
export const getError: (state: RootState) => WalletState['error'] = state =>
  getState(state).error

export const getNetwork: (
  state: RootState
) => WalletState['data']['network'] = state => getData(state).network

export const getAddress: (
  state: RootState
) => WalletState['data']['address'] = state => getData(state).address

export const getLocale: (
  state: RootState
) => WalletState['data']['locale'] = state => getData(state).locale

export const isConnected: (state: RootState) => boolean = state =>
  !!getData(state).address

export const isConnecting: (state: RootState) => boolean = state =>
  isLoadingType(getLoading(state), CONNECT_WALLET_REQUEST)

export const getWallet = createSelector<
  RootState,
  WalletState['data'],
  AccountBalanceState['data'],
  Partial<Wallet>
>(getData, getAccountBalances, (wallet, accountBalances) => {
  const balances = {}

  for (const accountBalance of Object.values(accountBalances)) {
    balances[accountBalance.token_address] = Number(accountBalance.balance)
  }

  return {
    ...wallet,
    balances
  }
})
