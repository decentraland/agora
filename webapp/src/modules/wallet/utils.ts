import { Wallet } from 'modules/wallet/types'
import { Poll } from 'modules/poll/types'

export function getBalanceInPoll(wallet: Wallet, poll: Poll) {
  return wallet.balances[poll.token_address]
}
