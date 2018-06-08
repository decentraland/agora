import { createSelector } from 'reselect'
import { RootState } from 'types'
import { utils } from 'decentraland-commons'
import { PollState, PollWithAssociations, Poll } from 'modules/poll/types'
import { getData as getOptions } from 'modules/option/selectors'
import { getData as getTokens } from 'modules/token/selectors'
import { getData as getVotes } from 'modules/vote/selectors'
import { OptionState } from 'modules/option/types'
import { VoteState } from 'modules/vote/types'
import { TokenState } from 'modules/token/types'
import { ModelById } from 'lib/types'

export const getState: (state: RootState) => PollState = state => state.poll

export const getData: (state: RootState) => PollState['data'] = state =>
  getState(state).data

export const isLoading: (state: RootState) => boolean = state =>
  getState(state).loading.length > 0

export const getError: (state: RootState) => PollState['error'] = state =>
  getState(state).error

export const getPolls = createSelector<
  RootState,
  PollState['data'],
  OptionState['data'],
  TokenState['data'],
  VoteState['data'],
  ModelById<PollWithAssociations>
>(getData, getOptions, getTokens, getVotes, (polls, options, tokens, votes) =>
  Object.keys(polls).reduce<ModelById<PollWithAssociations>>(
    (result, pollId) => {
      const poll = polls[pollId]

      const fullPoll: PollWithAssociations = {
        ...utils.omit<Poll>(poll, ['option_ids', 'token_address', 'vote_ids']),
        options: poll.option_ids.map(optionIds => options[optionIds]),
        token: tokens[poll.token_address],
        votes: poll.vote_ids.map(voteId => votes[voteId])
      }

      return {
        ...result,
        [pollId]: fullPoll
      }
    },
    {}
  )
)
