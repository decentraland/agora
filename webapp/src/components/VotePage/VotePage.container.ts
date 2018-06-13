import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RootState } from 'types'
import { PollActions } from 'modules/poll/types'
import { Wallet } from 'modules/wallet/types'
import { NewVote } from 'modules/vote/types'
import { fetchOptionsByPollIdRequest } from 'modules/option/actions'
import {
  fetchVotesByPollIdRequest,
  createVoteRequest
} from 'modules/vote/actions'
import { getPolls } from 'modules/poll/selectors'
import { getData as getWallet } from 'modules/wallet/selectors'
import { isLoading as isVoteLoading } from 'modules/vote/selectors'
import { isLoading as isOptionLoading } from 'modules/option/selectors'
import { findWalletVote } from 'modules/vote/utils'
import { VotePageProps } from 'components/VotePage/types'

import VotePage from './VotePage'

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
    isLoading
  }
}

const mapDispatch = (dispatch: Dispatch<PollActions>) => ({
  onFetchPollOptions: (id: string) => dispatch(fetchOptionsByPollIdRequest(id)),
  onFetchPollVotes: (id: string) => dispatch(fetchVotesByPollIdRequest(id)),
  onCreateVote: (newVote: NewVote) => dispatch(createVoteRequest(newVote))
})

export default connect<VotePageProps>(mapState, mapDispatch)(VotePage)
