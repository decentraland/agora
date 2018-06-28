import { connect } from 'react-redux'
import { RootState, RootDispatch } from 'types'
import { fetchPollRequest } from 'modules/poll/actions'
import { navigateTo } from 'modules/location/actions'
import {
  getPolls,
  isLoading as isPollLoading,
  getError
} from 'modules/poll/selectors'
import { getWallet, isConnected } from 'modules/wallet/selectors'
import { Wallet } from 'modules/wallet/types'
import { PollActions } from 'modules/poll/types'
import { LocationActions } from 'modules/location/types'
import { PollDetailPageProps } from 'components/PollDetailPage/types'
import { findWalletVote } from 'modules/vote/utils'

import PollDetailPage from './PollDetailPage'

const mapState = (
  state: RootState,
  ownProps: PollDetailPageProps
): PollDetailPageProps => {
  const pollId = ownProps.match.params.id
  const isLoading = isPollLoading(state)
  const wallet = getWallet(state) as Wallet
  const polls = getPolls(state)

  const poll = polls[pollId]
  const currentVote = poll ? findWalletVote(wallet, poll.votes) : null

  return {
    ...ownProps,
    pollId,
    poll,
    wallet,
    currentVote,
    isLoading,
    hasError: !!getError(state),
    isConnected: isConnected(state)
  }
}

const mapDispatch = (
  dispatch: RootDispatch<PollActions | LocationActions>
) => ({
  onFetchPoll: (id: string) => dispatch(fetchPollRequest(id)),
  onNavigate: (url: string) => dispatch(navigateTo(url))
})

export default connect<PollDetailPageProps>(mapState, mapDispatch)(
  PollDetailPage
)
