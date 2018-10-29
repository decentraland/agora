import { fetchPollsRequest } from 'modules/poll/actions'
import { PollWithAssociations } from 'modules/poll/types'

export interface Props {
  decentralandPolls: PollWithAssociations[]
  districtPolls: PollWithAssociations[]
  isLoading: boolean
  onFetchPolls: typeof fetchPollsRequest
  onNavigate: (location: string) => void
}

export type MapStateProps = Pick<
  Props,
  'isLoading' | 'decentralandPolls' | 'districtPolls'
>
export type MapDispatchProps = Pick<Props, 'onFetchPolls' | 'onNavigate'>
