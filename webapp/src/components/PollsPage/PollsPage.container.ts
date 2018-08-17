import { connect } from 'react-redux'
import { RootState } from 'types'
import { fetchPollsRequest } from 'modules/poll/actions'
import { isLoading } from 'modules/poll/selectors'
import PollsPage from './PollsPage'
import { MapStateProps, MapDispatchProps } from './PollsPage.types'
import { AnyAction, Dispatch } from 'redux'
import {
  getActivePolls,
  getState as getActivePollsTable
} from 'modules/ui/activePolls/selectors'
import {
  getExpiredPolls,
  getState as getExpiredPollsTable
} from 'modules/ui/expiredPolls/selectors'
import { withRouter } from 'react-router'
import { navigateTo } from 'decentraland-dapps/dist/modules/location/actions'
import { locations } from 'locations'
import { PollsRequestFilters } from 'modules/poll/types'

const mapState = (state: RootState): MapStateProps => ({
  isLoading: isLoading(state),
  totalActive: getActivePollsTable(state).total,
  totalExpired: getExpiredPollsTable(state).total,
  activePolls: getActivePolls(state),
  expiredPolls: getExpiredPolls(state)
})

const mapDispatch = (dispatch: Dispatch<AnyAction>): MapDispatchProps => ({
  onFetchPolls: (pagination: PollsRequestFilters) =>
    dispatch(fetchPollsRequest(pagination)),
  onPageChange: (activePage, expiredPage) =>
    dispatch(navigateTo(locations.polls(activePage, expiredPage)))
})

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(PollsPage)
)
