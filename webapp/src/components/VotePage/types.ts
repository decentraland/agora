import { match } from 'react-router'
import { PollWithAssociations } from 'modules/poll/types'
import { Vote } from 'modules/vote/types'
import { Wallet } from 'modules/wallet/types'

export interface URLParams {
  id: string
}

export interface VotePageProps {
  match: match<URLParams>
  pollId: string
  poll: PollWithAssociations | null
  wallet: Wallet
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
