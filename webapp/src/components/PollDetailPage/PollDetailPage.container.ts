import { connect } from 'react-redux'
import { RootState, RootDispatch } from 'types'
import { Wallet } from 'modules/wallet/types'
import { fetchPollRequest } from 'modules/poll/actions'
import { navigateTo } from 'modules/location/actions'
import {
  getPolls,
  isLoading as isPollLoading,
  getError
} from 'modules/poll/selectors'
import { getData as getWallet, isConnected } from 'modules/wallet/selectors'
import { isLoading as isTokenLoading } from 'modules/token/selectors'
import { isLoading as isVoteLoading } from 'modules/vote/selectors'
import { isLoading as isOptionLoading } from 'modules/option/selectors'
import { findWalletVote } from 'modules/vote/utils'
import { PollActions } from 'modules/poll/types'
import { LocationActions } from 'modules/location/types'
import { PollDetailPageProps } from 'components/PollDetailPage/types'

import PollDetailPage from './PollDetailPage'

const mapState = (
  state: RootState,
  ownProps: PollDetailPageProps
): PollDetailPageProps => {
  const polls = getPolls(state)
  const pollId = ownProps.match.params.id
  const poll = polls[pollId]
  const wallet = getWallet(state) as Wallet

  const currentVote = poll ? findWalletVote(wallet, poll.votes) : null

  const isLoading =
    isPollLoading(state) ||
    isTokenLoading(state) ||
    isVoteLoading(state) ||
    isOptionLoading(state)

  return {
    ...ownProps,
    poll,
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
