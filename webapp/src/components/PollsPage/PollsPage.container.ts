import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RootState } from 'types'
import { PollActions } from 'modules/poll/types'
import { fetchPollsRequest } from 'modules/poll/actions'
import { getPolls, isLoading } from 'modules/poll/selectors'
import { PollsPageProps } from 'components/PollsPage/types'

import PollsPage from './PollsPage'

const mapState = (
  state: RootState,
  ownProps: PollsPageProps
): PollsPageProps => ({
  ...ownProps,
  isLoading: isLoading(state),
  polls: getPolls(state)
})

const mapDispatch = (dispatch: Dispatch<PollActions>) => ({
  onFetchPolls: () => dispatch(fetchPollsRequest())
})

export default connect<PollsPageProps>(mapState, mapDispatch)(PollsPage)
