import { getPolls } from 'modules/poll/selectors'
import { Wallet } from 'modules/wallet/types'

export interface PollsPageProps {
  isLoading: boolean
  polls: ReturnType<typeof getPolls>
  onFetchPolls: Function
  wallet: Wallet
}
