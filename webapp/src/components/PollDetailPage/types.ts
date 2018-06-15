import { match } from 'react-router'
import { PollWithAssociations } from 'modules/poll/types'
import { Vote } from 'modules/vote/types'
import { Option } from 'modules/option/types'

export interface URLParams {
  id: string
}

export interface PollDetailPageProps {
  match: match<URLParams>
  poll: PollWithAssociations | null
  currentVote: Vote | null
  isLoading: boolean
  hasError: boolean
  isConnected: boolean
  onFetchPoll: Function
  onNavigate: Function
}

export interface Tally {
  [optionId: string]: { votes: number; option: Option }
}
