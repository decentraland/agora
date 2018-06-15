import { connect } from 'react-redux'
import { RootDispatch, RootState } from 'types'
import { fetchOptionsByPollIdRequest } from 'modules/option/actions'
import {
  fetchVotesByPollIdRequest,
  createVoteRequest
} from 'modules/vote/actions'
import { navigateTo } from 'modules/location/actions'
import { getPolls } from 'modules/poll/selectors'
import { getData as getWallet, isConnected } from 'modules/wallet/selectors'
import { isLoading as isVoteLoading } from 'modules/vote/selectors'
import { isLoading as isOptionLoading } from 'modules/option/selectors'
import { Wallet } from 'modules/wallet/types'
import { NewVote, VoteActions } from 'modules/vote/types'
import { LocationActions } from 'modules/location/types'
import { VotePageProps } from 'components/VotePage/types'
import { findWalletVote } from 'modules/vote/utils'

import VotePage from './VotePage'
import { OptionActions } from 'modules/option/types'

const mapState = (state: RootState, ownProps: VotePageProps): VotePageProps => {
  const pollId = ownProps.match.params.id
  const isLoading = isVoteLoading(state) || isOptionLoading(state)
  const polls = getPolls(state)
  const poll = polls[pollId]
  const wallet = getWallet(state) as Wallet

  let votes = null
  let options = null
  let currentVote = null

  if (poll) {
    votes = poll.votes
    options = poll.options
    currentVote = findWalletVote(wallet, votes)
  }

  return {
    ...ownProps,
    pollId,
    wallet,
    votes,
    options,
    currentVote,
    isLoading,
    isConnected: isConnected(state)
  }
}

const mapDispatch = (
  dispatch: RootDispatch<VoteActions | OptionActions | LocationActions>
) => ({
  onFetchPollOptions: (id: string) => dispatch(fetchOptionsByPollIdRequest(id)),
  onFetchPollVotes: (id: string) => dispatch(fetchVotesByPollIdRequest(id)),
  onCreateVote: (newVote: NewVote) => dispatch(createVoteRequest(newVote)),
  onNavigate: (url: string) => dispatch(navigateTo(url))
})

export default connect<VotePageProps>(mapState, mapDispatch)(VotePage)
