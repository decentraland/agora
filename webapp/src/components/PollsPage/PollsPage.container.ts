import { connect } from 'react-redux'
import { RootState, RootDispatch } from 'types'
import { Wallet } from 'modules/wallet/types'
import {
  fetchPollsRequest,
  FetchPollsRequestAction
} from 'modules/poll/actions'
import { getPolls, isLoading } from 'modules/poll/selectors'
import { getWallet } from 'modules/wallet/selectors'
import { PollsPageProps } from 'components/PollsPage/types'

import PollsPage from './PollsPage'

const mapState = (
  state: RootState,
  ownProps: PollsPageProps
): PollsPageProps => ({
  ...ownProps,
  isLoading: isLoading(state),
  polls: getPolls(state),
  wallet: getWallet(state) as Wallet
})

const mapDispatch = (dispatch: RootDispatch<FetchPollsRequestAction>) => ({
  onFetchPolls: () => dispatch(fetchPollsRequest())
})

export default connect<PollsPageProps>(
  mapState,
  mapDispatch
)(PollsPage)
