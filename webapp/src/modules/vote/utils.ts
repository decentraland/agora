import { Vote } from 'modules/vote/types'
import { BaseWallet } from 'decentraland-dapps/dist/modules/wallet/types'

export function findWalletVote(wallet: BaseWallet, votes: Vote[]): Vote | null {
  const vote = votes.find(vote => vote.account_address === wallet.address)
  return vote || null
}
