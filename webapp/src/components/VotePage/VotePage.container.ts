import { connect } from 'react-redux'
import { RootDispatch, RootState } from 'types'
import { navigateTo } from 'modules/location/actions'
import { getPolls, isLoading as isPollLoading } from 'modules/poll/selectors'
import { getWallet, isConnected } from 'modules/wallet/selectors'
import { fetchPollRequest } from 'modules/poll/actions'
import { createVoteRequest } from 'modules/vote/actions'
import { PollActions } from 'modules/poll/types'
import { Wallet } from 'modules/wallet/types'
import { VoteActions, NewVote } from 'modules/vote/types'
import { LocationActions } from 'modules/location/types'
import { VotePageProps } from 'components/VotePage/types'
import { findWalletVote } from 'modules/vote/utils'

import VotePage from './VotePage'

const mapState = (state: RootState, ownProps: VotePageProps): VotePageProps => {
  const pollId = ownProps.match.params.id
  const isLoading = isPollLoading(state)
  const wallet = getWallet(state) as Wallet
  const polls = getPolls(state)

  const poll = polls[pollId] || null
  const currentVote = poll ? findWalletVote(wallet, poll.votes) : null

  return {
    ...ownProps,
    pollId,
    poll,
    wallet,
    currentVote,
    isLoading,
    isConnected: isConnected(state)
  }
}

const mapDispatch = (
  dispatch: RootDispatch<PollActions | VoteActions | LocationActions>
) => ({
  onFetchPoll: (id: string) => dispatch(fetchPollRequest(id)),
  onCreateVote: (newVote: NewVote) => dispatch(createVoteRequest(newVote)),
  onNavigate: (url: string) => dispatch(navigateTo(url))
})

export default connect<VotePageProps>(mapState, mapDispatch)(VotePage)
