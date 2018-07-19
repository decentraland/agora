import { createSelector } from 'reselect'
import { RootState } from 'types'
import { Wallet } from 'modules/wallet/types'
import { AccountBalanceState } from 'modules/accountBalance/types'
import { getData as getAccountBalances } from 'modules/accountBalance/selectors'
import { getData } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { WalletState } from 'decentraland-dapps/dist/modules/wallet/types'

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
