import { match } from 'react-router'
import { Poll } from 'modules/poll/types'
import { Vote } from 'modules/vote/types'
import { Option } from 'modules/option/types'
import { Wallet } from 'modules/wallet/types'

export interface URLParams {
  id: string
}

export interface VotePageProps {
  match: match<URLParams>
  pollId: string
  poll: Poll | null
  wallet: Wallet
  options: Option[] | null
  currentVote: Vote | null
  isLoading: boolean
  isConnected: boolean
  onFetchPoll: Function
  onCreateVote: Function
  onNavigate: Function
}

export interface VotePageState {
  selectedOptionId: string
}
