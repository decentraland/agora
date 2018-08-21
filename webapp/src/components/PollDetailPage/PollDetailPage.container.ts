import { connect } from 'react-redux'
import { isConnected } from '@dapps/modules/wallet/selectors'
import { navigateTo } from '@dapps/modules/location/actions'
import { RootState, RootDispatch } from 'types'
import { fetchPollRequest } from 'modules/poll/actions'
import {
  getPolls,
  isLoading as isPollLoading,
  getError
} from 'modules/poll/selectors'
import { getWallet } from 'modules/wallet/selectors'
import { Wallet } from 'modules/wallet/types'
import { findWalletVote } from 'modules/vote/utils'
import { Props, MapStateProps, MapDispatchProps } from './PollDetailPage.types'
import PollDetailPage from './PollDetailPage'

const mapState = (state: RootState, ownProps: Props): MapStateProps => {
  const pollId = ownProps.match.params.id
  const isLoading = isPollLoading(state)
  const wallet = getWallet(state) as Wallet
  const polls = getPolls(state)

  const poll = polls[pollId]
  const currentVote = poll ? findWalletVote(wallet, poll.votes) : null

  return {
    pollId,
    poll,
    wallet,
    currentVote,
    isLoading,
    hasError: !!getError(state),
    isConnected: isConnected(state)
  }
}

const mapDispatch = (dispatch: RootDispatch): MapDispatchProps => ({
  onFetchPoll: (id: string) => dispatch(fetchPollRequest(id)),
  onNavigate: (url: string) => dispatch(navigateTo(url))
})

export default connect(
  mapState,
  mapDispatch
)(PollDetailPage)
