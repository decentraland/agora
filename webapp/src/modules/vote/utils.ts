import { Vote } from 'modules/vote/types'
import { Wallet } from 'modules/wallet/types'

export function findWalletVote(wallet: Wallet, votes: Vote[]): Vote | null {
  const vote = votes.find(vote => vote.account_address === wallet.address)
  return vote || null
}
