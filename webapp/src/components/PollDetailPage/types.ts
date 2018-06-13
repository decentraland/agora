import { match } from 'react-router'
import { PollWithAssociations } from 'modules/poll/types'
import { Vote } from 'modules/vote/types'

export interface URLParams {
  id: string
}

export interface PollDetailPageProps {
  match: match<URLParams>
  poll: PollWithAssociations | null
  currentVote: Vote | null
  isLoading: boolean
  onFetchPoll: Function
}
