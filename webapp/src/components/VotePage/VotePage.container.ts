import { connect } from 'react-redux'
import { RootDispatch, RootState } from 'types'
import { navigateTo } from 'modules/location/actions'
import { getPolls } from 'modules/poll/selectors'
import { getData as getWallet, isConnected } from 'modules/wallet/selectors'
import { isLoading as isVoteLoading } from 'modules/vote/selectors'
import { isLoading as isOptionLoading } from 'modules/option/selectors'
import { fetchPollRequest } from 'modules/poll/actions'
import { PollActions } from 'modules/poll/types'
import { Wallet } from 'modules/wallet/types'
import { LocationActions } from 'modules/location/types'
import { VotePageProps } from 'components/VotePage/types'
import { findWalletVote } from 'modules/vote/utils'

import VotePage from './VotePage'

const mapState = (state: RootState, ownProps: VotePageProps): VotePageProps => {
  const pollId = ownProps.match.params.id
  const isLoading = isVoteLoading(state) || isOptionLoading(state)
  const wallet = getWallet(state) as Wallet
  const polls = getPolls(state)

  const poll = polls[pollId] || null
  let options = null
  let currentVote = null

  if (poll) {
    options = poll.options
    currentVote = findWalletVote(wallet, poll.votes)
  }

  return {
    ...ownProps,
    pollId,
    poll,
    wallet,
    options,
    currentVote,
    isLoading,
    isConnected: isConnected(state)
  }
}

const mapDispatch = (
  dispatch: RootDispatch<PollActions | LocationActions>
) => ({
  onFetchPoll: (id: string) => dispatch(fetchPollRequest(id)),
  onNavigate: (url: string) => dispatch(navigateTo(url))
})

export default connect<VotePageProps>(mapState, mapDispatch)(VotePage)
