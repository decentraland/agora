import { connect } from 'react-redux'
import { RootState } from 'types'
import { fetchPollsRequest } from 'modules/poll/actions'
import { isLoading } from 'modules/poll/selectors'
import HomePage from './HomePage'
import { MapStateProps, MapDispatchProps } from './HomePage.types'
import { AnyAction, Dispatch } from 'redux'
import { getDecentralandPolls } from 'modules/ui/decentralandPolls/selectors'
import { getDistrictPolls } from 'modules/ui/districtPolls/selectors'
import { PollsRequestFilters } from 'modules/poll/types'
import { push } from 'react-router-redux'

const mapState = (state: RootState): MapStateProps => ({
  isLoading: isLoading(state),
  decentralandPolls: getDecentralandPolls(state),
  districtPolls: getDistrictPolls(state)
})

const mapDispatch = (dispatch: Dispatch<AnyAction>): MapDispatchProps => ({
  onFetchPolls: (pagination: PollsRequestFilters) =>
    dispatch(fetchPollsRequest(pagination)),
  onNavigate: (location: string) => dispatch(push(location))
})

export default connect(
  mapState,
  mapDispatch
)(HomePage)
