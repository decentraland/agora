import { fetchPollsRequest } from 'modules/poll/actions'
import { PollWithAssociations } from 'modules/poll/types'
import { RouteComponentProps } from 'react-router'

export interface Props extends RouteComponentProps<Props> {
  activePolls: PollWithAssociations[]
  expiredPolls: PollWithAssociations[]
  totalActive: number
  totalExpired: number
  isLoading: boolean
  onFetchPolls: typeof fetchPollsRequest
  onPageChange: (activePage: number, expiredPage: number) => void
}

export type MapStateProps = Pick<
  Props,
  'isLoading' | 'activePolls' | 'expiredPolls' | 'totalActive' | 'totalExpired'
>
export type MapDispatchProps = Pick<Props, 'onFetchPolls' | 'onPageChange'>
