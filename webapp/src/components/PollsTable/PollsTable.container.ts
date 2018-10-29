import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as queryString from 'query-string'
import PollsTable from './PollsTable'
import { RootState } from 'types'
import {
  Props,
  MapStateProps,
  MapDispatchProps,
  QueryParams
} from './PollsTable.types'
import { getPolls, getTotal } from 'modules/ui/polls/selectors'
import { navigateTo } from 'decentraland-dapps/dist/modules/location/actions'
import { locations } from 'locations'
import { PollsRequestFilters, FilterStatus } from 'modules/poll/types'
import { fetchPollsRequest } from 'modules/poll/actions'

const mapState = (state: RootState, ownProps: Props): MapStateProps => {
  const queryParams: QueryParams = queryString.parse(ownProps.location.search)
  return {
    type: ownProps.type || queryParams.type || 'all',
    status: ownProps.status || queryParams.status || 'all',
    page: +queryParams.page || 1,
    polls: getPolls(state),
    totalRows: getTotal(state)
  }
}

const mapDispatch = (dispatch: any, ownProps: any): MapDispatchProps => {
  const queryParams: QueryParams = queryString.parse(ownProps.location.search)
  const type = ownProps.type || queryParams.type || 'all'
  const status = ownProps.status || queryParams.status || 'all'
  return {
    onPageChange: (page: number) =>
      dispatch(navigateTo(locations.pollsTable(page, type, status))),
    onStatusChange: (status: FilterStatus) =>
      dispatch(navigateTo(locations.pollsTable(1, type, status))),
    onFetchPolls: (pagination: PollsRequestFilters) =>
      dispatch(fetchPollsRequest(pagination)),
    onNavigate: (location: string) => dispatch(navigateTo(location))
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(PollsTable)
)
