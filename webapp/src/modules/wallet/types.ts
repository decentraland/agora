import { BaseWallet } from '@dapps/modules/wallet/types'

export interface Wallet extends BaseWallet {
  balances: {
    [address: string]: number
  }
}
