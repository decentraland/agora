import { match } from 'react-router'
import { PollWithAssociations } from 'modules/poll/types'

export interface URLParams {
  id: string
}

export interface PollDetailPageProps {
  match: match<URLParams>
  poll: PollWithAssociations | null
  isLoading: boolean
  onFetchPoll: Function
}
