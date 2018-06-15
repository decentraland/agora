import { match } from 'react-router'
import { Vote } from 'modules/vote/types'
import { Option } from 'modules/option/types'
import { Wallet } from 'modules/wallet/types'

export interface URLParams {
  id: string
}

export interface VotePageProps {
  match: match<URLParams>
  pollId: string
  wallet: Wallet
  votes: Vote[] | null
  options: Option[] | null
  currentVote: Vote | null
  isLoading: boolean
  isConnected: boolean
  onFetchPollOptions: Function
  onFetchPollVotes: Function
  onCreateVote: Function
  onNavigate: Function
}

export interface VotePageState {
  selectedOptionId: string
}
