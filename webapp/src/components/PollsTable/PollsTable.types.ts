import { RouteComponentProps } from 'react-router'
import {
  PollWithAssociations,
  FilterStatus,
  FilterType,
  PollsRequestFilters
} from 'modules/poll/types'

export type QueryParams = {
  type: FilterType
  status: FilterStatus
  page: number
}

export type Props = RouteComponentProps<{}> & {
  title: React.ReactNode
  polls: PollWithAssociations[]
  status: FilterStatus
  type: FilterType
  page: number
  rowsPerPage: number
  totalRows: number
  onPageChange: (page: number) => void
  onStatusChange: (status: FilterStatus) => void
  onFetchPolls: (pagination: PollsRequestFilters) => void
  onNavigate: (location: string) => void
}

export type MapStateProps = Pick<
  Props,
  'polls' | 'status' | 'type' | 'page' | 'totalRows'
>
export type MapDispatchProps = Pick<
  Props,
  'onPageChange' | 'onStatusChange' | 'onFetchPolls' | 'onNavigate'
>
